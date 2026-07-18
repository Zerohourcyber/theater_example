"use server";

import { z } from "zod";
import { siteConfig } from "@/config/site";
import { newsletterWelcomeHtml } from "@/lib/email/contact-notification";
import { fromEmail, getResend } from "@/lib/resend";
import { sanityWriteClient } from "@/lib/sanity/client";

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
 * Newsletter signup (POC-interim per SPEC §6): logs the address to Sanity's
 * `newsletterSignup` documents so nothing is lost, and sends a "you're on
 * the list" email via Resend. Both integrations degrade gracefully when
 * env vars are absent. TODO(future): migrate to Resend Audiences or a real
 * email marketing platform.
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
    // Honeypot trips resolve as success so bots learn nothing.
    const onlyHoneypot = parsed.error.issues.every(
      (issue) => issue.path[0] === "company"
    );
    if (onlyHoneypot) {
      return { status: "success", message: "You're on the list!" };
    }
    return {
      status: "error",
      message:
        parsed.error.issues.find((i) => i.path[0] === "email")?.message ??
        "Something went wrong.",
    };
  }

  const { email } = parsed.data;

  // Interim storage in Sanity so no address is lost pre-email-platform.
  if (sanityWriteClient) {
    try {
      await sanityWriteClient.create({
        _type: "newsletterSignup",
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("[sanity] newsletter signup write failed:", error);
    }
  } else {
    console.warn("[newsletter] Sanity write client not configured:", email);
  }

  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: `${siteConfig.name} <${fromEmail()}>`,
        to: email,
        subject: `You're on the list — ${siteConfig.name}`,
        html: newsletterWelcomeHtml(),
      });
    } catch (error) {
      console.error("[resend] newsletter welcome failed:", error);
    }
  }

  return {
    status: "success",
    message: "You're on the list! Watch your inbox for show announcements.",
  };
}
