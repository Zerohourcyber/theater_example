import { Resend } from "resend";

let client: Resend | null = null;

/** True when Resend env vars are present (read at call time, not import). */
export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

/**
 * Lazily-initialized Resend client; null when RESEND_API_KEY is absent so
 * email features degrade gracefully instead of crashing.
 */
export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  client ??= new Resend(process.env.RESEND_API_KEY);
  return client;
}

/** Sender address; onboarding@resend.dev works before a domain is verified. */
export function fromEmail(): string {
  return process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
}
