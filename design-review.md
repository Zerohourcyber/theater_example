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
