"use server";

import { z } from "zod";

export interface NewsletterState {
  status: "idle" | "success" | "error";
  message: string;
}

const schema = z.object({
  email: z.email("Please enter a valid email address."),
  /** Honeypot — real users leave this empty. */
  company: z.string().max(0).optional().or(z.literal("")),
});

/**
 * Newsletter signup. Phase 2 stub: validates only.
 * Phase 5 adds the Resend welcome email + Sanity interim storage.
 */
export async function subscribeToNewsletter(
  _prev: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    company: formData.get("company"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Something went wrong.",
    };
  }

  return {
    status: "success",
    message: "You're on the list! Watch your inbox for show announcements.",
  };
}
