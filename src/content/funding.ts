/**
 * Where a founding production's money realistically comes from.
 *
 * The finding that shaped the plan: state and federal arts grants cannot fund
 * this show. New Mexico Arts requires tax-exempt status and approves awards in
 * July, paying by reimbursement — money would arrive months after opening
 * night. The state tourism programmes run the same July fiscal year. The NEA
 * requires years of prior programming and does not accept fiscally sponsored
 * applicants. So a first production has to be funded locally.
 *
 * Figures and framing are planning estimates for discussion, not quotes.
 */

export type FundingSource = {
  source: string;
  role: string;
  /** Whether the money can arrive before opening night. */
  availability: "Yes" | "Likely" | "Season two";
};

export const fundingSources: FundingSource[] = [
  {
    source: "Local business sponsorship",
    role: "The largest cash share. No eligibility gate, decisions made locally.",
    availability: "Yes",
  },
  {
    source: "Ticket revenue",
    role: "The most predictable line, and proof of demand for later funders.",
    availability: "Yes",
  },
  {
    source: "In-kind support",
    role: "Donated space, equipment, printing and materials. Every item is cash not raised.",
    availability: "Yes",
  },
  {
    source: "Individual founding donors",
    role: "Available once. Deductibility depends on our status at the time.",
    availability: "Yes",
  },
  {
    source: "City lodgers' tax",
    role: "Rolling application, restricted to promotion. Pays marketing, not production.",
    availability: "Likely",
  },
  {
    source: "State and federal grants",
    role: "Eligibility and award calendars both rule them out for this show.",
    availability: "Season two",
  },
];

/** How a sponsor or partner can actually say yes. */
export type SupportRoute = {
  title: string;
  text: string;
};

export const supportRoutes: SupportRoute[] = [
  {
    title: "Sponsor the founding production",
    text: "Tiers run from programme advertising through to headline production sponsorship. We will bring the full structure to a conversation rather than lead with a price list.",
  },
  {
    title: "Contribute in kind",
    text: "Printing, advertising, materials, storage, transport, rehearsal space, hospitality, or professional services. Every donated item is money we don't have to raise, and for a first production it is often worth more than cash.",
  },
  {
    title: "Give as a founding supporter",
    text: "Individual gifts carry a first season. We are not yet incorporated, so a gift today is not tax-deductible — we would rather say that plainly than let anyone assume otherwise.",
  },
  {
    title: "Lend professional help",
    text: "Accounting, legal, insurance and governance advice. A volunteer board of students and parents learns fastest with an experienced person in the room.",
  },
];
