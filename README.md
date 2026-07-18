# Limelight Youth Theater — Website (POC)

A proof-of-concept website for a youth-led community theater: Broadway-dark,
stage-lighting-inspired, and fully demo-able **with zero environment variables
configured**. Built with Next.js 16 (App Router, RSC), Tailwind CSS v4,
Framer Motion, Sanity, Stripe Checkout (test mode), and Resend.

> The org name is a placeholder. Change it once in
> [`src/config/site.ts`](src/config/site.ts) and it updates everywhere.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. With no env vars the site renders complete
fallback content, ticketing shows "coming soon," and `/studio` shows a
"not configured" screen — nothing crashes.

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router, TypeScript, React Server Components, Turbopack) |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens) + shadcn-style primitives |
| Animation | Framer Motion, gated by `prefers-reduced-motion` |
| CMS | Sanity, embedded Studio at `/studio` |
| Payments | Stripe Checkout (hosted page, test mode) |
| Email | Resend |
| Hosting | Vercel |

## How content works (the fallback system)

Typed fetch helpers in [`src/lib/sanity/fetch.ts`](src/lib/sanity/fetch.ts)
try Sanity first and fall back to local seed content in
[`src/content/fallback/`](src/content/fallback/) when:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` is unset,
- the query errors, or
- the query returns an empty result.

GROQ queries project image URLs (`asset->url` + `alt`) so CMS data and
fallback data render through the same components. Missing images render a
branded gradient placeholder instead of broken tiles. Content pages use ISR
(`revalidate = 60`).

## Environment variables

Copy `.env.example` → `.env.local` and fill in what you have. Everything is
optional; each integration degrades gracefully when its keys are absent.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata/sitemap and Stripe redirects |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Enables Sanity fetches and `/studio` |
| `NEXT_PUBLIC_SANITY_DATASET` | Usually `production` |
| `SANITY_API_READ_TOKEN` | Optional (public datasets don't need it) |
| `SANITY_API_WRITE_TOKEN` | Newsletter signups written to Sanity |
| `STRIPE_SECRET_KEY` | Enables "Get Tickets" checkout (`sk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | Enables webhook signature verification |
| `RESEND_API_KEY` | Enables contact/newsletter/ticket emails |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` works before domain verification |
| `CONTACT_INBOX_EMAIL` | Where contact form submissions are delivered |

## Setting up the integrations

1. **Sanity** — [sanity.io](https://sanity.io) → create a project (free tier),
   dataset `production`. Put the project ID in `.env.local`. Open
   `/studio`, then add: a `production` (with `openingNight` in the future and
   `ticketsEnabled` on), a few `person` docs (`isFounder` for the About grid),
   `newsPost`s, `sponsor`s, `faqItem`s, and the `siteSettings` singleton.
   Create an **Editor** token for `SANITY_API_WRITE_TOKEN` (newsletter capture)
   and add `http://localhost:3000` (and later your Vercel URL) to the
   project's CORS origins.
2. **Stripe** — [dashboard.stripe.com](https://dashboard.stripe.com) → toggle
   **Test mode** → copy the secret key. Test card: `4242 4242 4242 4242`.
   Local webhook: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   and put the printed `whsec_...` in `.env.local`.
3. **Resend** — [resend.com](https://resend.com) → create an API key. With the
   default `onboarding@resend.dev` sender, emails deliver only to your own
   account's address — fine for a POC.

## Deploying to Vercel

1. Push to GitHub, import the repo at vercel.com (defaults are fine).
2. Add all env vars; set `NEXT_PUBLIC_SITE_URL` to the Vercel URL.
3. After deploying: Stripe Dashboard → Developers → Webhooks → Add endpoint
   `https://YOUR-SITE.vercel.app/api/webhooks/stripe` with event
   `checkout.session.completed`; copy the signing secret into
   `STRIPE_WEBHOOK_SECRET` and redeploy.
4. Add the Vercel URL to Sanity's CORS origins so `/studio` works in production.

## Project structure

```
src/
  app/(site)/        # public pages (home, about, productions, news, …)
  app/studio/        # embedded Sanity Studio
  app/api/           # checkout + stripe webhook route handlers
  actions/           # server actions: contact, newsletter
  components/        # ui / layout / sections / cards / forms / motion
  content/fallback/  # typed seed content mirroring Sanity shapes
  lib/sanity/        # client, GROQ queries, fetch-with-fallback, image urls
  lib/               # stripe.ts, resend.ts, email templates, utils
  config/site.ts     # org name (single constant), nav, socials
sanity/              # schema definitions + studio config
```

## Decisions made during the build

- **Next.js 16 instead of 15.** `create-next-app@latest` now ships Next 16
  (Turbopack default, async `params`/`searchParams`, React 19). The spec's
  architecture is unchanged; all current-version APIs are used.
- **Tailwind v4 CSS-first theme.** Design tokens live in `globals.css` under
  `@theme` rather than `tailwind.config.ts` — the v4 way.
- **shadcn-style primitives, hand-rolled.** Button/Card/Badge/Accordion are
  built directly on Radix + cva with the project's tokens rather than via the
  shadcn CLI, which would have overwritten the custom theme. Same patterns,
  same API.
- **Placeholder art instead of binary assets.** Fallback content ships no
  images; posters/headshots render branded gradient placeholders, so the demo
  looks intentional and the repo stays clean. Real images come from Sanity.
- **Honeypot spam control on both forms; bot trips return fake success.**
- **Webhook always returns 200 after signature verification** — a failed
  confirmation email is logged rather than making Stripe retry forever.
- **Newsletter is interim by design**: addresses go to Sanity
  (`newsletterSignup`) + a welcome email; migrate to Resend Audiences or a
  real platform before sending campaigns.

## Honest caveats (POC scope)

- **No inventory** — general admission only; Stripe will happily oversell a
  house. Add inventory (first real reason for a database) or use external
  ticketing before real sales.
- **Test mode only.** Going live with Stripe needs the org's legal/bank
  details.
- **Legal pages are placeholders** and marked as such — review before launch.

## Future roadmap (documented, not built)

Reserved seating (Postgres/Neon + Drizzle when the time comes), donations
(Stripe Payment Links first), member accounts (Auth.js), admin dashboard,
real email marketing (Resend Audiences / Buttondown), event calendar, search,
archive filters, student photo-upload workflows.
