# Portales Community Theater — support and buy-in site

One link to send a sponsor, a venue contact, a volunteer or a city official
that explains what the group is building, why Portales needs it, and how to
help. Built from the four standalone HTML files that preceded it, which are
kept for reference in [`docs/source-html/`](docs/source-html/).

The organisation is youth-led: high school and first-year college students run
the company, on stage and behind it. It is not yet incorporated, has no
confirmed venue, and has raised no money — and the site says so throughout,
because at this stage candour is the only credibility available.

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000. The site runs with no environment variables at
all; the contact form validates and records enquiries, it just cannot send the
notification email until Resend is configured.

## Pages

| Route | Who it's for |
|---|---|
| `/` | Anyone. The pitch, and the status ledger |
| `/plan` | Anyone weighing whether this is serious. Full narrative, timeline, risks |
| `/support` | Sponsors and donors. How a first production gets paid for |
| `/who-we-are` | Partners assessing the group. Structure, safeguarding, people |
| `/contact` | Everyone. Form with subject presets, plus the email address |
| `/proposal` | **Unlisted.** The tailored leave-behind — see below |

## Two things to get right before sending this to anyone

### 1. The show cannot be named yet

MTI's performance licence forbids advertising, announcing, selling tickets, or
**holding auditions** before a signed contract and deposit have cleared. Until
that is done the site describes "our founding production" and never the title.

When the licence is in hand, set `productionAnnounced: true` in
[`src/config/site.ts`](src/config/site.ts) and the title appears everywhere.
Nothing else needs editing.

### 2. Fill the placeholders

Anything still unresolved is marked `TODO:` in
[`src/config/site.ts`](src/config/site.ts), and a red banner lists them on
every page in development and on Vercel previews. It never renders in
production, so the banner is a reminder, not a safety net.

Still needed:

- A shared contact email at least two people can reach, not a personal account
- Contact name, role and phone for the proposal cover
- Three or four founding members in [`src/content/team.ts`](src/content/team.ts)
- Confirmation of the target opening date
- Verification that no other youth theater operates in Portales — it is stated
  on `/plan` as our understanding, but being wrong about it in a meeting would
  be costly

**The founding team matters most.** Until someone is real, entries stay flagged
`placeholder` and are never rendered publicly; `/who-we-are` and the proposal
show an honest "still forming" state instead. A grid of cards reading "Name /
Role in the founding group" would be worse than an empty section, and a partner
reading the proposal is mostly deciding whether this group can finish what it
starts.

## The tailored proposal

`/proposal` is the leave-behind for meetings. Add `?for=` and the ask section
and closing change; everything else stays the same.

| Link | Audience |
|---|---|
| `/proposal` | General |
| `/proposal?for=enmu` | The university |
| `/proposal?for=sponsor` | Local businesses |
| `/proposal?for=city` | City and county |

Every version prints to a clean PDF — use that as the physical leave-behind.
To reword an ask or add an audience, edit
[`src/content/proposal.ts`](src/content/proposal.ts); no other file changes.

The page is unlisted rather than secret: `noindex`, absent from the sitemap,
and not linked from the navigation. You send someone the URL written for them.

## Editing content

Content lives in plain typed objects under [`src/content/`](src/content/) —
the same "edit one object, save, push" workflow as the original HTML files.

| File | What it holds |
|---|---|
| `ledger.ts` | The status ledger on the home page |
| `timeline.ts` | The six phases |
| `risks.ts` | The published risk table |
| `funding.ts` | Funding sources, and the ways to support |
| `figures.ts` | The four statistics on `/plan` |
| `team.ts` | The founding group |
| `proposal.ts` | The proposal's audience variants |
| `ways-to-help.ts` | The three routes on the home page |

**Keep the ledger current.** A status board that hasn't moved in six months
does more damage than not having one.

## Environment variables

Copy `.env.example` to `.env.local`. All optional; each degrades gracefully.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, Open Graph tags and the sitemap. **Set this in Vercel** — without it they all point at localhost |
| `RESEND_API_KEY` | Enables the contact notification email |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` works before a domain is verified |
| `CONTACT_INBOX_EMAIL` | Where contact form submissions are delivered |

## Deploying

1. Push to GitHub and import the repo at vercel.com. Defaults are fine.
2. Add the environment variables above. `NEXT_PUBLIC_SITE_URL` must be the
   real public URL.
3. Point a domain at it. A link at someone else's domain undercuts the
   credibility the site exists to build.

## Where enquiries go

The contact form records every submission through one function,
[`recordSubmission`](src/lib/submissions.ts), and then sends a notification to
`CONTACT_INBOX_EMAIL`. Recording happens first, so a Resend outage cannot lose
a lead.

**This is interim.** With no datastore in this phase, "recording" means a
structured line in the platform log; the durable copies are the inbox and
Resend's own record of what it sent. The enquiry list is the volunteer roster
and the donor pipeline, and it deserves better than an inbox. When the
dashboard lands, replace the body of that one function with a database insert.

## What's deliberately not here

No ticketing, no CMS, no accounts, no database. Tickets cannot be sold before
a licence and a venue exist, and every one of those adds a service to hand over
later. They are additions, not rewrites, when the time comes.

The private team dashboard — tasks, fundraising pipeline, contacts, documents —
is a later phase. [`plan.html`](docs/source-html/plan.html) and
[`funding.html`](docs/source-html/funding.html) are its seed data, which is why
they were kept intact rather than folded into this site.

## Handing this over

Built to transfer. When the organisation is ready:

- Host the repo in a GitHub organisation, not a personal account — handing over
  is then adding owners and removing yourself
- No credentials are in the code; everything is an environment variable
- Two services to transfer: Vercel and Resend, both with free tiers that
  comfortably cover a site at this stage
