"use server";

import { z } from "zod";
import { contactSubjects } from "@/config/contact";

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
 * Contact form submission. Phase 2 stub: validates only.
 * Phase 5 adds the Resend notification to CONTACT_INBOX_EMAIL.
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
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      errors,
    };
  }

  return {
    status: "success",
    message: "Thanks for reaching out — we'll reply within a few days.",
  };
}
