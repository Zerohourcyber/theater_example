# SPEC.md — Youth Community Theater Website (POC)

## 1. Mission Context

A youth-led community theater founded by high school students and recent graduates.
Students perform, direct, produce, design sets, and manage productions. Initial
productions will be staged in partnership with a local college theater. The website
must establish credibility ("this organization is professional") and document the
journey from idea to established company. Placeholder org name: **"Limelight Youth
Theater"** — make the name a single constant in `src/config/site.ts` so it can be
changed in one place.

## 2. POC Scope

**In scope:** marketing pages, Sanity-managed productions/news/people/sponsors/FAQ,
general-admission Stripe Checkout in test mode, contact form + confirmation emails
via Resend, newsletter capture, countdown to opening night, gallery on production
pages.

**Explicitly out of scope (leave extension points only):** reserved seating,
inventory, member accounts, admin dashboard, donations, search, volunteer shift
management, blog comments, event calendar.

## 3. Folder Structure

```
src/
  app/
    (site)/                  # public site route group
      page.tsx               # Home
      about/page.tsx
      productions/page.tsx
      productions/[slug]/page.tsx
      news/page.tsx
      news/[slug]/page.tsx
      auditions/page.tsx
      get-involved/page.tsx  # volunteer + sponsor
      contact/page.tsx
      faq/page.tsx
      privacy/page.tsx
      terms/page.tsx
      tickets/success/page.tsx
    studio/[[...tool]]/page.tsx   # embedded Sanity Studio
    api/
      checkout/route.ts
      webhooks/stripe/route.ts
    layout.tsx  globals.css  sitemap.ts  robots.ts  not-found.tsx
  components/
    ui/          # shadcn primitives
    layout/      # Navbar, Footer, Container, SkipLink
    sections/    # Hero, MissionSection, UpcomingProduction, NewsGrid,
                 # SponsorStrip, NewsletterCta, FoundersGrid, Countdown
    cards/       # ProductionCard, NewsCard, PersonCard, SponsorCard
    forms/       # ContactForm, NewsletterForm
    motion/      # FadeIn, StaggerChildren, reduced-motion-aware wrappers
  lib/
    sanity/      # client.ts, queries.ts, fetch.ts, image.ts
    stripe.ts    # lazy-initialized client, null if env missing
    resend.ts
    utils.ts     # cn(), date formatting
  content/
    fallback/    # typed fallback data mirroring Sanity shapes
  config/
    site.ts      # org name, nav links, socials, contact email
  types/
    index.ts     # Production, Person, NewsPost, Sponsor, FaqItem
  actions/       # server actions: contact.ts, newsletter.ts
sanity/
  schemas/       # schema files
  sanity.config.ts
```

Why: route groups keep marketing pages separate from studio/api; `content/fallback`
lets the site demo without a configured CMS; `actions/` isolates server mutations;
everything else is standard Next.js separation so future features (donations,
accounts, dashboard) slot in as new folders, not rewrites.

## 4. Pages

### 4.1 Home (in order)
1. **Hero** — full-viewport, dark, subtle spotlight radial gradient sweeping,
   grain texture overlay, display-serif headline ("Youth-led. Community-built.
   Stage-ready."), two CTAs: *See Our Next Show* / *Get Involved*
2. **Countdown** — to opening night of the next production (hidden if none)
3. **Upcoming Production** — poster, title, dates, venue, Get Tickets button
4. **Mission** — 3 pillars (Perform · Lead · Serve) with Lucide icons
5. **Latest News** — 3 most recent posts
6. **Founders teaser** — faces + link to About
7. **Sponsor strip** — logos, grayscale → color on hover
8. **Newsletter CTA** — spotlight-lit band

### 4.2 Productions
Index: grid of ProductionCards split "Upcoming" / "Past". Detail: hero poster,
synopsis (portable text), dates/venue, cast & crew list (Person references with
roles), photo gallery grid (lightbox optional, keep simple), Get Tickets (if
enabled), share-worthy OG image.

### 4.3 About
Mission statement, the story/timeline (simple vertical timeline component,
content from siteSettings or hardcoded fallback), founders grid (PersonCards
with role + bio), college partnership acknowledgment.

### 4.4 Auditions
Current audition call (from the next production's `auditionInfo` field) or a
"no open auditions — join the newsletter" state. What-to-expect section.

### 4.5 Get Involved
Two halves: Volunteer (roles: stage crew, front of house, marketing, design)
and Sponsors/Partners (why sponsor, tiers described in prose, CTA to contact).
Both CTAs route to the contact form with a preselected subject.

### 4.6 Contact / FAQ / Legal
Contact form + org email + socials. FAQ accordion from Sanity. Privacy & Terms:
clear, plain-language placeholder legal text marked for review.

## 5. Design System

**Colors (Tailwind tokens):**
- `background` #0A0A0F (near-black, slight blue)
- `surface` #14141C
- `primary` / "limelight gold" #D9A441 (hover #E8BC66)
- `accent` crimson #8E2434 (curtain red, used sparingly)
- `foreground` #F5F2EA (warm off-white), `muted` #9A97A3
- Focus ring: gold. All text combos must pass WCAG AA on their backgrounds.

**Typography:** Playfair Display for h1–h3 and display numerals (countdown);
Inter for body/UI. Scale: 12/14/16/18/24/32/48/64. Generous line-height on body
(1.7), tight on display (1.1).

**Signature effects:** radial "spotlight" gradient utility
(`bg-[radial-gradient(...)]`), thin gold rules/borders, film-grain overlay at
low opacity on hero only, cards lift 2px + gold border glow on hover.

**Motion:** 200–400ms ease-out; scroll-triggered fade+8px rise via a reusable
`<FadeIn>`; hero elements stagger on load; countdown digits animate on change.
Everything gated by `useReducedMotion`.

## 6. Sanity Schemas

- **siteSettings** (singleton): orgName, tagline, contactEmail, socials[],
  aboutStory (portable text), timeline[] {year, title, description}
- **production**: title, slug, status (upcoming|current|past), poster (image),
  synopsis (portable text), venue, performances[] {dateTime}, openingNight
  (datetime, drives countdown), ticketsEnabled (bool), ticketPriceCents (number),
  cast[] {person→person, role}, crew[] {person→person, role}, gallery[] (images),
  auditionInfo (portable text, optional)
- **person**: name, slug, headshot, roleTitle (e.g. "Co-Founder & Artistic
  Director"), bio, isFounder (bool), order
- **newsPost**: title, slug, publishedAt, coverImage, excerpt, body (portable text)
- **sponsor**: name, logo, url, tier (partner|gold|silver|community), order
- **faqItem**: question, answer (portable text), order
- **newsletterSignup**: email, createdAt (written via server action; interim
  storage until a real email platform is chosen)

## 7. Integrations

**Stripe:** Checkout Sessions, `mode: payment`, one line item (production title,
`ticketPriceCents`, quantity 1–8 via `adjustable_quantity`), metadata
`{productionSlug}`, success/cancel URLs. Webhook verifies signature, on
`checkout.session.completed` emails the buyer a confirmation with show name,
date, quantity, and order reference. Test mode only for POC.

**Resend:** `from` uses `RESEND_FROM_EMAIL` (onboarding@resend.dev works before
a domain is verified). Two templates: contact-notification (to org inbox) and
ticket-confirmation (to buyer). Simple, on-brand HTML.

## 8. Environment Variables (mirror in .env.example)

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=            # optional for POC (public dataset)
SANITY_API_WRITE_TOKEN=           # for newsletterSignup writes
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
RESEND_FROM_EMAIL=
CONTACT_INBOX_EMAIL=
```

## 9. Non-Functional Requirements

- Lighthouse ≥ 95 across the board on Home and a production detail page
- ISR (60s) for CMS pages; static for legal/FAQ shells
- Metadata API on every page; OG images (static branded image is fine for POC)
- sitemap.ts + robots.ts
- Skip link, landmark elements, form labels, `aria-live` on form status,
  focus-visible rings, alt text required in Sanity image fields
- No layout shift: explicit image dimensions, font `display: swap`

## 10. Future Roadmap (document in README, do not build)

Phase 2+: reserved seating (needs a real inventory DB — Postgres/Neon + Drizzle
when the time comes), donations (Stripe Payment Links first), member accounts
(Auth.js), admin dashboard, real email marketing (move newsletter to
Resend Audiences or Buttondown), event calendar, search, production archive
filters, photo upload workflows for students.
