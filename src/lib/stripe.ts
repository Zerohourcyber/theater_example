import Stripe from "stripe";

let client: Stripe | null = null;

/** True when Stripe env vars are present (read at call time, not import). */
export function stripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

/**
 * Lazily-initialized Stripe client; null when STRIPE_SECRET_KEY is absent
 * so the site builds and runs without any payment configuration.
 */
export function getStripe(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  client ??= new Stripe(process.env.STRIPE_SECRET_KEY);
  return client;
}
