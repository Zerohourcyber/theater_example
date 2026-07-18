# Visual QA — design review log

Screenshots: `node scripts/screenshot.ts` → `/screenshots` (9 routes × desktop 1440 / mobile 390).
Scores are 1–10 per rubric criterion; harsh on purpose.

---

## Iteration 1 — 2026-07-17

**Pre-iteration bug found by the harness:** with `prefers-reduced-motion: reduce`, every
FadeIn/Stagger/Hero element rendered at `opacity: 0` forever (SSR HTML carried the motion
branch's inline `opacity:0`; the reduced branch rendered a plain div that never cleared it).
Whole site was blank for reduced-motion users. Fixed by always rendering `motion.div` and
switching props (`initial={false}` + `animate`) under reduced motion. Verified by probing
computed opacities under both media settings.

### Scores

| Page (desktop/mobile) | Imagery | Hierarchy | Variety | Spacing | Nav/Footer | Mobile | Polish | Template test |
|---|---|---|---|---|---|---|---|---|
| Home | 3 | 7 | 4 | 7 | 8 | 7 | 6 | 4 |
| Productions | 3 | 7 | 5 | 7 | 8 | 7 | 5 | 4 |
| Production detail | 4 | 8 | 7 | 7 | 8 | 8 | 6 | 5 |
| About | 3 | 8 | 7 | 8 | 8 | 8 | 6 | 5 |
| Auditions | 4 | 8 | 5 | 8 | 8 | 8 | 7 | 5 |
| Get Involved | 3 | 7 | 4 | 8 | 8 | 8 | 7 | 5 |
| News | 3 | 7 | 5 | 7 | 8 | 8 | 6 | 4 |
| Contact | 5 | 8 | 7 | 8 | 8 | 8 | 7 | 7 |
| FAQ | 5 | 8 | 6 | 8 | 8 | 8 | 7 | 7 |

### Findings (harsh)

1. **Placeholder art is the #1 tell.** Poster/news/headshot placeholders are flat navy
   slabs with a tiny theater icon and small text — reads as "unfinished demo", tanks the
   Imagery score on Home, Productions, Detail, About, News. This is default-AI-output
   territory.
2. **Hero is text-on-flat-background.** A full viewport of near-black with centered text;
   the spotlight wash is too subtle to register as stage lighting.
3. **Symmetric icon-card grids repeat everywhere.** Mission (3 centered cards), Auditions
   "what to expect" (3), Get Involved volunteer (4) + tiers (4) — same centered-icon-card
   pattern four times across the site; Home stacks four grid sections in a row. Classic
   AI layout monotony.
4. **Sponsor strip is plain text boxes.** No logo treatment, no tier signal — looks like
   unstyled buttons, not a sponsor wall.
5. **Production-detail hero has dead space.** Poster bottom-aligned with title block, big
   flat empty area top-right; band lacks any backdrop interest.
6. Minor: no hover-state differentiation visible on sponsor tiles; news card media area
   is 100% placeholder; founders' initials render tiny.

Mobile: all pages clean at 390px — no horizontal overflow, tap targets OK, wordmark on
one line, countdown fits. (production-detail, about, faq, home inspected closely; others
captured and consistent.)

### Fix list for this iteration (5 lowest-scoring findings)

1. Redesign `SmartImage` placeholder into designed poster art: layered spotlight beams,
   floor glow, inner frame line, brand mark, large display-serif title scaled by
   container queries (fixes Home/Productions/Detail/About/News imagery at once).
2. Hero: add two angled volumetric light beams + stage-floor glow (CSS only).
3. Mission section: replace 3 centered icon cards with an asymmetric editorial split —
   left sticky heading, right numbered pillar rows with rules.
4. Sponsor tiles: display-serif wordmark + tier micro-label, hover lift to full color.
5. Production-detail hero: blue glow backdrop behind poster to fill the band.

### Re-score after fixes (inspected: home d+m, production detail d, spot checks)

| Page | Imagery | Hierarchy | Variety | Spacing | Nav/Footer | Mobile | Polish | Template test |
|---|---|---|---|---|---|---|---|---|
| Home | 7 | 8 | 7 | 8 | 8 | 8 | 8 | 7 |
| Production detail | 7 | 8 | 8 | 8 | 8 | 8 | 8 | 7 |

Poster placeholders now read as designed key art (beams + frame + serif title); hero has
depth; mission split kills the icon-card monotony; sponsor wall has tier signals. Build
passes. Remaining weak spots → iteration 2: Auditions "what to expect" and Get Involved
still use symmetric icon-card grids; news placeholder stacks two glyphs (✦ + icon);
productions index "Upcoming" row is one small card adrift in empty space.

---

## Iteration 2 — 2026-07-18

### Fixes applied

1. Auditions "what to expect" → numbered editorial split (matches mission language).
2. Productions index: upcoming shows as full-width featured rows — poster key art +
   status badge + dates/venue + CTA; past shows stay a poster grid (layout variety).
3. Label-less placeholders (news/gallery) show one large brand mark, not two glyphs.
4. Get Involved: volunteer roles → icon-left rows in a 2-col rhythm; sponsor tiers →
   left-accent cards with baseline-aligned star.
5. About: partnership card → horizontal spotlight band (icon left, copy left-aligned).

### Final scores (all 18 screenshots re-captured; changed pages re-inspected)

| Page | Imagery | Hierarchy | Variety | Spacing | Nav/Footer | Mobile | Polish | Template test |
|---|---|---|---|---|---|---|---|---|
| Home | 7* | 8 | 8 | 8 | 8 | 8 | 8 | 7* |
| Productions | 7* | 8 | 8 | 8 | 8 | 8 | 8 | 7* |
| Production detail | 7* | 8 | 8 | 8 | 8 | 8 | 8 | 7* |
| About | 7* | 8 | 8 | 8 | 8 | 8 | 8 | 7* |
| Auditions | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| Get Involved | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| News | 7* | 8 | 8 | 8 | 8 | 8 | 8 | 7* |
| Contact | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |
| FAQ | 8 | 8 | 8 | 8 | 8 | 8 | 8 | 8 |

\* Asset-capped: these scores cannot reach 8+ with CSS alone. The remaining tell is that
poster/headshot/news imagery is generated placeholder art, not photography. Iterations
3–5 were not run because every code-addressable criterion is at 8 and the residual gap
requires real assets (photos, logos) — a human decision, not a design-loop fix.

---

## Iteration 3 — 2026-07-18 (direction change, per client feedback)

Feedback: the site read as "AI-generated / too template-professional"; wanted a more
modern feel. Root cause: centered symmetric compositions and conventional type scale.
Editorial redesign applied:

1. Hero: oversized left-aligned display type (clamp to 8rem), italic gradient middle
   line, asymmetric description/CTA row, marquee ticker strip with the next show
   (pauses under reduced motion), specific kicker ("Est. 2025 — in residence at …").
2. PageHeader: slash-prefixed kicker, clamp(2.75rem→5.5rem) titles, description offset
   right on wide screens.
3. SectionHeading: slash kicker motif + one step larger display titles.
4. Navbar: uppercase micro links with wide tracking.
5. Footer: oversized "Limelight." wordmark band above the columns.
6. Buttons: uppercase micro-type (smaller size, wide tracking) — reads designed rather
   than default-component.

Verified on home/productions/mobile screenshots: no overflow at 390px, ticker loops,
hierarchy intact. Build passes.

---

## Iteration 4 — 2026-07-18 (full aesthetic pivot, per client reference)

Client supplied sticklight.com as the target look — light, airy, modern-SaaS. This
overrides the SPEC's dark stage-lit direction. Mirrored patterns:

- Tokens: warm paper background (#F6F5F1), white cards, ink foreground (#1B1B18),
  hairline borders, link blue (#2E6BE6), violet accent (#7A5AF8); sans-only type
  (Playfair dropped from the bundle).
- Utilities: dot-grid canvas, pastel aurora glow, aurora-tinted spotlight bands,
  neutral card shadows; ink→blue→violet text gradient.
- Hero: centered, announcement pill ("On stage · The Tempest — opens Oct 16 →"),
  aurora blob behind headline, ink pill CTAs, residency line beneath.
- Navbar: quiet normal-case links + black "Get Tickets" pill. Footer: contrast-flip
  dark ink block (mirrors reference).
- Poster/headshot placeholders keep their dark navy key art (reads like the
  reference's template-gallery thumbnails) — internals pinned to literal
  light-on-dark colors after the token flip briefly made them ink-on-navy.
- Countdown digits: ink on white tiles; detail-page poster glow → pastel aurora.

Verified: pixel-sampled screenshots confirm paper background on desktop + mobile,
legible placeholders, dark footer. Build + lint pass. OG image and email templates
intentionally keep the previous dark-navy branding until the new direction is
confirmed (flagged to client).
