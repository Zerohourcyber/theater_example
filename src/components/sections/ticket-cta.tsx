import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPriceCents } from "@/lib/utils";
import type { Production } from "@/types";

/**
 * Ticket call-to-action for a production page.
 * Phase 3 placeholder — Phase 4 replaces the disabled button with a
 * quantity selector + Stripe Checkout redirect, guarded by env vars.
 */
export function TicketCta({ production }: { production: Production }) {
  if (!production.ticketsEnabled || production.status === "past") return null;

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
      <Button className="mt-5" disabled>
        <Ticket aria-hidden />
        Ticketing coming soon
      </Button>
    </div>
  );
}
