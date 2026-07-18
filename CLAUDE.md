# CLAUDE.md — Build Instructions for Claude Code

You are the lead engineer building a **proof-of-concept website** for a youth-led community
theater organization. Read `SPEC.md` in this directory for full details. This file defines
your working rules, build order, and definition of done.

## Project Summary

- Youth-led community theater (founded by high school students / recent grads)
- Partnering with a local college to use its theater
- Site must feel: Broadway, cinematic, premium, dark theme, stage-lighting inspired
- This is a **POC** — impressive, deployable, demo-ready. Not every future feature.

## Stack (do not substitute)

| Concern | Choice |
|---|---|
| Framework | Next.js 15, App Router, TypeScript, React Server Components by default |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion (client components only, respect `prefers-reduced-motion`) |
| Icons | Lucide |
| CMS | Sanity (embedded Studio at `/studio`) |
| Payments | Stripe Checkout (hosted checkout page, test mode) |
| Email | Resend (contact form + ticket confirmation) |
| Hosting | Vercel |

## Working Rules

1. **Never invent secrets.** All keys come from `.env.local` (see `.env.example`).
   The app must build and run with placeholder/missing keys — degrade gracefully
   (e.g., "Ticketing coming soon" if Stripe env vars are absent).
2. **Server components by default.** Add `"use client"` only where interaction or
   Framer Motion requires it.
3. **No database.** Sanity is the only data store. Stripe holds payment records.
4. **Every commit compiles.** Run `npm run build` before declaring a phase done.
5. **Seed content.** Populate Sanity-shaped fallback content locally (in
   `src/content/fallback/`) so the site looks finished even before Sanity has data.
   Fetch functions try Sanity first, fall back to local content if the project ID
   is missing or the query returns empty.
6. **Accessibility is not optional.** Semantic HTML, focus states, alt text,
   skip-to-content link, WCAG AA contrast on the dark theme.
7. **Commit at each phase boundary** with a conventional commit message.
8. Do not scaffold features marked "Future" in SPEC.md. Leave clean extension
   points (folders, TODO comments, typed interfaces) instead.

## Build Order (do these phases in sequence)

### Phase 0 — Scaffold
- `npx create-next-app@latest` (TypeScript, Tailwind, App Router, src dir, `@/*` alias)
- Install: shadcn/ui (init, dark default), framer-motion, lucide-react,
  next-sanity, @sanity/image-url, sanity, stripe, resend, zod
- Set up folder structure from SPEC.md §3
- Configure `next.config.ts` for Sanity image domains (`cdn.sanity.io`)
- Add `.env.example` (copy from this kit), `.gitignore` includes `.env*.local`
- `git init` + first commit

### Phase 1 — Design System
- Tailwind theme tokens per SPEC.md §5 (colors, fonts, spacing)
- Fonts via `next/font`: Playfair Display (display), Inter (body)
- Global styles: dark background, spotlight/vignette utility classes,
  gold gradient text utility
- Base components: Button variants, Card, SectionHeading, Container, Badge
- Commit

### Phase 2 — Layout & Static Pages
- Root layout: Navbar (sticky, translucent blur on scroll), Footer, skip link
- Pages: Home, About (mission + founders), Auditions, Get Involved
  (volunteer + sponsor sections), Contact, FAQ, Privacy, Terms, 404
- Home page sections per SPEC.md §4.1, using fallback content
- Framer Motion: fade/slide-in-on-scroll wrapper component, hero entrance,
  countdown flip — all subtle, all disabled under reduced motion
- Commit

### Phase 3 — Sanity CMS
- Embedded Studio at `/studio` route
- Schemas per SPEC.md §6: `siteSettings`, `production`, `person`, `newsPost`,
  `sponsor`, `faqItem`
- GROQ queries in `src/lib/sanity/queries.ts`, typed fetch helpers in
  `src/lib/sanity/fetch.ts` with fallback-content behavior
- Wire Productions index + detail pages, News index + detail, founders grid,
  sponsors strip, FAQ — all from Sanity with fallbacks
- ISR: `revalidate = 60` on content pages
- Commit

### Phase 4 — Stripe Ticketing (POC level)
- Each `production` doc has `ticketPrice` (cents) and `ticketsEnabled` boolean
- "Get Tickets" button → server action / route handler creates a Stripe
  Checkout Session (general admission, quantity selector 1–8) → redirect
- Success page `/tickets/success` reads session, thanks buyer
- Webhook route `/api/webhooks/stripe` verifies signature on
  `checkout.session.completed` → sends confirmation email via Resend
- **No reserved seating, no inventory tracking** — POC is general admission
- Guard everything behind env-var presence
- Commit

### Phase 5 — Email & Forms
- Contact form (name, email, subject, message) → server action, zod validation,
  Resend email to `CONTACT_INBOX_EMAIL`, honeypot field for spam
- Newsletter signup on Home → for POC just store nothing; send a "you're on the
  list" email via Resend and log the address to Sanity (`newsletterSignup`
  schema) so nothing is lost. Note this is interim.
- Ticket confirmation email template (React Email-style JSX or simple HTML)
- Commit

### Phase 6 — Polish & Ship
- Metadata API: per-page titles/descriptions, OpenGraph image, sitemap.ts,
  robots.ts
- `next/image` everywhere, lazy loading, priority on hero only
- Run `npm run build`; fix all type errors and warnings
- Lighthouse pass: target 95+ performance/SEO/a11y/best-practices
- Write project `README.md` (setup, env vars, deploy steps)
- Final commit

## Definition of Done

- `npm run build` succeeds with zero type errors
- Site runs with **no env vars at all** (fallback content, ticketing hidden)
- With env vars: Sanity Studio works at `/studio`, Stripe test checkout
  completes, confirmation email arrives, contact form delivers
- All pages responsive at 375px, 768px, 1440px
- Keyboard-navigable, visible focus rings, reduced-motion respected
- Repo is clean: no unused deps, no dead files, conventional commits per phase
