"use server";

import { z } from "zod";
import { contactSubjects } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { contactNotificationHtml } from "@/lib/email/contact-notification";
import { fromEmail, getResend } from "@/lib/resend";

export interface ContactState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors keyed by input name. */
  errors?: Partial<Record<"name" | "email" | "subject" | "message", string>>;
}

const schema = z.object({
  name: z.string().min(2, "Please tell us your name."),
  email: z.email("Please enter a valid email address."),
  subject: z.enum(contactSubjects, "Please choose a subject."),
  message: z.string().min(10, "Please write a few words about your question."),
  /** Honeypot — real users leave this empty. */
  company: z.string().max(0).optional().or(z.literal("")),
});

/**
 * Contact form submission: zod validation + honeypot, then a Resend
 * notification to CONTACT_INBOX_EMAIL. Degrades gracefully (still succeeds,
 * logs a warning) when email env vars are absent.
 */
export async function submitContactForm(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        field === "name" ||
        field === "email" ||
        field === "subject" ||
        field === "message"
      ) {
        errors[field] ??= issue.message;
      }
    }
    // Silently accept honeypot-only failures so bots learn nothing.
    if (Object.keys(errors).length === 0) {
      return { status: "success", message: "Thanks for reaching out!" };
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const { name, email, subject, message } = parsed.data;
  const resend = getResend();
  const inbox = process.env.CONTACT_INBOX_EMAIL;

  if (resend && inbox) {
    try {
      await resend.emails.send({
        from: `${siteConfig.name} <${fromEmail()}>`,
        to: inbox,
        replyTo: email,
        subject: `[Contact] ${subject} — ${name}`,
        html: contactNotificationHtml({ name, email, subject, message }),
      });
    } catch (error) {
      console.error("[resend] contact notification failed:", error);
      return {
        status: "error",
        message:
          "We couldn't send your message just now. Please try again, or email us directly.",
      };
    }
  } else {
    console.warn(
      "[contact] Resend/CONTACT_INBOX_EMAIL not configured; submission logged only:",
      { name, email, subject }
    );
  }

  return {
    status: "success",
    message: "Thanks for reaching out — we'll reply within a few days.",
  };
}
