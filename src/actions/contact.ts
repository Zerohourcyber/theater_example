"use server";

import { z } from "zod";
import { contactSubjects } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { contactNotificationHtml } from "@/lib/email/contact-notification";
import { fromEmail, getResend } from "@/lib/resend";
import { recordSubmission } from "@/lib/submissions";

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
  message: z.string().min(10, "Please write a few words so we can help."),
  /** Honeypot — real users leave this empty. */
  company: z.string().max(0).optional().or(z.literal("")),
});

/**
 * Contact form submission: zod validation and a honeypot, then the enquiry is
 * recorded and a notification goes to CONTACT_INBOX_EMAIL. Recording happens
 * first and independently of email, so a Resend outage cannot lose a lead.
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
    // A honeypot-only failure returns success so bots learn nothing.
    if (Object.keys(errors).length === 0) {
      return { status: "success", message: "Thanks for reaching out." };
    }
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  const { name, email, subject, message } = parsed.data;

  await recordSubmission({
    receivedAt: new Date().toISOString(),
    name,
    email,
    subject,
    message,
  });

  const resend = getResend();
  const inbox = process.env.CONTACT_INBOX_EMAIL;

  if (resend && inbox) {
    try {
      await resend.emails.send({
        from: `${siteConfig.name} <${fromEmail()}>`,
        to: inbox,
        replyTo: email,
        subject: `[${subject}] ${name}`,
        html: contactNotificationHtml({ name, email, subject, message }),
      });
    } catch (error) {
      // The enquiry is already recorded, so this is a delivery problem rather
      // than a lost lead. Still worth telling the sender, since they are
      // waiting on a reply that may now be slower.
      console.error("[resend] contact notification failed:", error);
      return {
        status: "error",
        message:
          "We saved your message but couldn't send the notification. Please email us directly so we can reply quickly.",
      };
    }
  } else {
    console.warn(
      "[contact] Resend or CONTACT_INBOX_EMAIL not configured; enquiry recorded only."
    );
  }

  return {
    status: "success",
    message: "Thanks for reaching out — someone will reply within a few days.",
  };
}
