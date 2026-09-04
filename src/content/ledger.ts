/**
 * The status ledger — the centrepiece of the home page.
 *
 * index.html listed status alone, which meant six consecutive rows reading
 * "Not yet ___". Honest, but on a page sent to a sponsor it reads as drift.
 * Each row now carries the next concrete step and the month it is due, taken
 * from the workstreams in plan.html, so the same candour reads as a plan.
 *
 * Keep this current. A stale ledger is worse than no ledger.
 */

export type LedgerState = "open" | "underway" | "set";

export type LedgerRow = {
  item: string;
  status: string;
  state: LedgerState;
  next: string;
  by: string;
};

export const ledger: LedgerRow[] = [
  {
    item: "The founding group",
    status: "Forming now",
    state: "underway",
    next: "Agree a mission statement and confirm the working name.",
    by: "Oct 2026",
  },
  {
    item: "A venue at the university",
    status: "Not yet discussed",
    state: "open",
    next: "Identify the right contact and send a first approach.",
    by: "Sep 2026",
  },
  {
    item: "The organization itself",
    status: "Not yet formed",
    state: "open",
    next: "Decide the legal structure, then file articles of incorporation in New Mexico.",
    by: "Oct 2026",
  },
  {
    item: "Which show we'd stage",
    status: "Not yet chosen",
    state: "open",
    next: "Shortlist candidates once the venue and dates are known.",
    by: "Nov 2026",
  },
  {
    item: "Funding",
    status: "Not yet raised",
    state: "open",
    next: "Set a preliminary budget range, then open the first sponsor conversations.",
    by: "Oct 2026",
  },
  {
    item: "A first production",
    status: "Targeted for spring 2027",
    state: "set",
    next: "Rehearsals begin roughly eight weeks before opening.",
    by: "Feb 2027",
  },
];
