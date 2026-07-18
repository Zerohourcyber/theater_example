import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getProductionBySlug } from "@/lib/sanity/fetch";
import { getStripe } from "@/lib/stripe";

const checkoutSchema = z.object({
  slug: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(8),
});

/**
 * Creates a Stripe Checkout Session for general-admission tickets and
 * redirects to Stripe's hosted checkout page. POC: no reserved seating,
 * no inventory tracking (SPEC §7).
 */
export async function POST(request: NextRequest) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Ticketing is not configured." },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const parsed = checkoutSchema.safeParse({
    slug: formData.get("slug"),
    quantity: formData.get("quantity"),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { slug, quantity } = parsed.data;

  // Price and availability always come from the CMS, never the client.
  const production = await getProductionBySlug(slug);
  if (
    !production ||
    !production.ticketsEnabled ||
    production.status === "past" ||
    !production.ticketPriceCents ||
    production.ticketPriceCents <= 0
  ) {
    return NextResponse.json(
      { error: "Tickets are not available for this production." },
      { status: 400 }
    );
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${production.title} — General Admission`,
              description: production.venue
                ? `${production.venue}. Open seating; doors 30 minutes before curtain.`
                : "Open seating; doors 30 minutes before curtain.",
            },
            unit_amount: production.ticketPriceCents,
          },
          quantity,
          adjustable_quantity: { enabled: true, minimum: 1, maximum: 8 },
        },
      ],
      metadata: { productionSlug: production.slug },
      success_url: `${siteUrl}/tickets/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/productions/${production.slug}`,
    });

    if (!session.url) {
      throw new Error("Stripe session created without a URL");
    }
    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("[stripe] checkout session failed:", error);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 }
    );
  }
}
