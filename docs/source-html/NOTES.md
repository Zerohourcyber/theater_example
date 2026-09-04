# Source HTML — reference only

These are the four standalone files the site was built from. They are kept for
provenance and because two of them are still live working documents. Nothing
here is served by the app.

| File | What became of it |
|---|---|
| `index.html` | The home page. Its status ledger gained a next-step and target-date column |
| `packet.html` | The `/proposal` route, audience variants and print stylesheet intact |
| `plan.html` | Still internal. Seeds the dashboard's tasks module in a later phase |
| `funding.html` | Still internal. Seeds the dashboard's fundraising module in a later phase |
| `README.md` | The original operating instructions for the four-file version |

`plan.html` and `funding.html` were never meant for the public web — they carry
candid risk levels and internal notes, and both are marked `noindex`. Keep them
off the deployed site until the private dashboard exists to hold them properly.

## What changed in the port

- **All-ages became youth-led.** The original copy described adults with no
  route onto a stage — "teachers, students, retirees, shift workers... on a
  stage for the first time at forty-five." The company is youth-led, so the
  argument inverts: the underserved group is high school and first-year college
  students, and `packet.html` section 02's market case was rebuilt rather than
  edited.
- **The production is unnamed.** MTI's performance licence forbids advertising,
  announcing, selling tickets or holding auditions before a signed contract and
  deposit clear. `productionAnnounced` in `src/config/site.ts` reveals the title
  everywhere once that is done.
- **Placeholders moved.** The scattered `[FILL]`, `CHANGE-NAME`, `CHANGE-EMAIL`
  and `CHANGE-DATE` markers are now single values in `src/config/site.ts`,
  reported by a banner that shows outside production until they are resolved.
