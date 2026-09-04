# Portales Community Theater — site files

Four standalone HTML files. No build step, no dependencies, no accounts beyond hosting. Deploy the folder to Vercel and everything works.

| File | Who sees it | Job |
|---|---|---|
| `index.html` | Anyone | Public landing page. Short, honest, email capture |
| `packet.html` | Partners you send it to | The proposal. Tailored by URL per audience |
| `plan.html` | Founding team | Working checklist and meeting board |
| `funding.html` | Founding team | Funding research and 90-day plan |

Only the first two are meant to be shared.

---

## Before you send the packet to anyone

Open `packet.html` and search for **`[FILL]`**. Five places:

1. Organisation name on the cover
2. **Section 08 — the founding team.** Four placeholder cards. Replace with real people, delete what you don't need
3. Contact email
4. Contact name, role, phone

Section 08 is the one that matters. A partner reading this is deciding whether the group can finish what it starts, and three named people with visible local roots does more for that than any amount of planning detail. Leaving the placeholders in would be worse than having no section at all.

Also verify the claim in section 02 that no community theater company currently operates in Portales outside the university. It's stated as our understanding rather than as fact, but check it — being wrong about that in a meeting would be costly.

## Tailoring the packet

Add `?for=` to the URL. The ask section and the closing change; everything else stays.

| Link | Audience |
|---|---|
| `packet.html` | General |
| `packet.html?for=enmu` | The university |
| `packet.html?for=sponsor` | Local businesses |
| `packet.html?for=city` | City and county |

Send each contact the version written for them. To add an audience or change wording, edit the `AUDIENCES` object near the bottom of the file — it's plain text, no code knowledge needed.

Every version prints to a clean PDF. Use that as the leave-behind.

## Keep these two off the public web

`plan.html` and `funding.html` carry internal notes and candid risk assessments. Both are `noindex`, which stops search engines but not people with the link. Keep them local, or put them behind Vercel's password protection.

`plan.html` also supports `internal: true` on any item, which hides that note in presentation mode and in print.

## Publish

Drag the folder onto vercel.com/new. Or push to GitHub and import it — better if more than one person will edit.

Set up the contact email first, on an address at least two people can reach. Not a personal account.

## Updating

Each file holds its data in a plain object near the bottom. Change a status, a date, or a line of text, save, push. Nothing else to touch.

Two things to keep current or they stop being credible: the status ledger on `index.html`, and the checklist statuses in `plan.html`.
