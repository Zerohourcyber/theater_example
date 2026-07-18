import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { siteConfig } from "@/config/site";
import { ticketConfirmationHtml } from "@/lib/email/ticket-confirmation";
import { fromEmail, getResend } from "@/lib/resend";
import { getProductionBySlug } from "@/lib/sanity/fetch";
import { getStripe } from "@/lib/stripe";
import { formatDateTime } from "@/lib/utils";

/**
 * Stripe webhook: verifies the signature, and on checkout.session.completed
 * sends the buyer a confirmation email via Resend. Both integrations are
 * guarded by env-var presence (CLAUDE.md rule 1).
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { error: "Webhook not configured." },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const payload = await request.text();
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    console.error("[stripe] webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      await sendTicketConfirmation(stripe, event.data.object);
    } catch (error) {
      // Log but still 200: Stripe retries only on non-2xx, and a failed
      // email should not make Stripe re-deliver the whole event forever.
      console.error("[stripe] confirmation email failed:", error);
    }
  }

  return NextResponse.json({ received: true });
}

async function sendTicketConfirmation(
  stripe: Stripe,
  sessionSummary: Stripe.Checkout.Session
) {
  const resend = getResend();
  if (!resend) {
    console.warn("[resend] not configured; skipping confirmation email");
    return;
  }

  // Re-retrieve with line items expanded (webhook payloads omit them).
  const session = await stripe.checkout.sessions.retrieve(sessionSummary.id, {
    expand: ["line_items"],
  });

  const email = session.customer_details?.email;
  if (!email) {
    console.warn("[stripe] session has no customer email; skipping");
    return;
  }

  const lineItem = session.line_items?.data[0];
  const slug = session.metadata?.productionSlug;
  const production = slug ? await getProductionBySlug(slug) : null;

  const html = ticketConfirmationHtml({
    buyerName: session.customer_details?.name?.split(" ")[0] ?? null,
    productionTitle:
      production?.title ?? lineItem?.description ?? "Your show",
    venue: production?.venue,
    openingInfo: production?.openingNight
      ? formatDateTime(production.openingNight)
      : undefined,
    quantity: lineItem?.quantity ?? 1,
    amountTotalCents: session.amount_total ?? 0,
    orderReference: session.id.slice(-8).toUpperCase(),
  });

  await resend.emails.send({
    from: `${siteConfig.name} <${fromEmail()}>`,
    to: email,
    subject: `Your tickets: ${production?.title ?? "order confirmed"}`,
    html,
  });
}
