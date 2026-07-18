import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe";
import { formatPriceCents } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

interface OrderSummary {
  productionTitle?: string;
  email?: string;
  quantity?: number;
  totalCents?: number;
  reference?: string;
}

async function getOrderSummary(
  sessionId: string | undefined
): Promise<OrderSummary | null> {
  const stripe = getStripe();
  if (!stripe || !sessionId) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
    if (session.status !== "complete") return null;

    const lineItem = session.line_items?.data[0];
    return {
      productionTitle:
        lineItem?.description ?? session.metadata?.productionSlug,
      email: session.customer_details?.email ?? undefined,
      quantity: lineItem?.quantity ?? undefined,
      totalCents: session.amount_total ?? undefined,
      reference: session.id.slice(-8).toUpperCase(),
    };
  } catch (error) {
    console.error("[stripe] could not retrieve session:", error);
    return null;
  }
}

export default async function TicketSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const order = await getOrderSummary(session_id);

  return (
    <section className="spotlight flex min-h-[70svh] items-center py-32">
      <Container className="flex max-w-xl flex-col items-center text-center">
        <CheckCircle2 aria-hidden className="size-14 text-accent" />
        <h1 className="mt-6 text-5xl">See you at the show!</h1>

        {order ? (
          <div className="mt-8 w-full rounded-lg border border-border bg-surface p-6 text-left">
            <dl className="space-y-2 text-sm">
              {order.productionTitle ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Production</dt>
                  <dd className="text-right">{order.productionTitle}</dd>
                </div>
              ) : null}
              {order.quantity ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Tickets</dt>
                  <dd>{order.quantity} × general admission</dd>
                </div>
              ) : null}
              {order.totalCents != null ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Total</dt>
                  <dd>{formatPriceCents(order.totalCents)}</dd>
                </div>
              ) : null}
              {order.reference ? (
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">Order reference</dt>
                  <dd className="font-mono">{order.reference}</dd>
                </div>
              ) : null}
            </dl>
            {order.email ? (
              <p className="mt-4 border-t border-border/60 pt-4 text-sm text-muted">
                A confirmation email is on its way to{" "}
                <span className="text-foreground">{order.email}</span>.
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-4 max-w-md text-muted">
            Thanks for your order! If you completed checkout, a confirmation
            email is on its way. Open seating — doors open 30 minutes before
            curtain.
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/productions">Browse productions</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
