import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripeConfigured } from "@/lib/stripe";
import { formatPriceCents } from "@/lib/utils";
import type { Production } from "@/types";

/**
 * Ticket call-to-action for a production page. When Stripe is configured,
 * posts to /api/checkout which redirects to Stripe's hosted checkout.
 * Without env vars it degrades to a "coming soon" state (CLAUDE.md rule 1).
 * POC: general admission only — no reserved seating, no inventory.
 */
export function TicketCta({ production }: { production: Production }) {
  if (!production.ticketsEnabled || production.status === "past") return null;

  const ticketingLive =
    stripeConfigured() &&
    !!production.ticketPriceCents &&
    production.ticketPriceCents > 0;

  return (
    <div className="rounded-lg border border-primary/40 bg-surface p-6">
      <p className="font-display text-2xl">
        General admission
        {production.ticketPriceCents ? (
          <span className="ml-3 text-primary">
            {formatPriceCents(production.ticketPriceCents)}
          </span>
        ) : null}
      </p>
      <p className="mt-1 text-sm text-muted">
        Open seating · doors 30 minutes before curtain
      </p>

      {ticketingLive ? (
        <form action="/api/checkout" method="POST" className="mt-5 space-y-4">
          <input type="hidden" name="slug" value={production.slug} />
          <div>
            <label
              htmlFor="ticket-quantity"
              className="mb-1.5 block text-sm font-medium"
            >
              Tickets
            </label>
            <select
              id="ticket-quantity"
              name="quantity"
              defaultValue="2"
              className="w-full rounded-md border border-border bg-background px-4 py-2.5 text-base text-foreground"
            >
              {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "ticket" : "tickets"}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full">
            <Ticket aria-hidden />
            Get Tickets
          </Button>
          <p className="text-xs text-muted">
            Secure checkout via Stripe. You&rsquo;ll get an email confirmation.
          </p>
        </form>
      ) : (
        <Button className="mt-5" disabled>
          <Ticket aria-hidden />
          Ticketing coming soon
        </Button>
      )}
    </div>
  );
}
