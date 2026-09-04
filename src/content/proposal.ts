/**
 * Audience variants for the proposal leave-behind.
 *
 * The ask section and the closing change; everything else on the page stays
 * the same. Send each contact the version written for them:
 *
 *   /proposal                 general
 *   /proposal?for=enmu        the university
 *   /proposal?for=sponsor     local businesses
 *   /proposal?for=city        city and county
 *
 * To add an audience or reword an ask, edit this object. No other file needs
 * to change.
 */

export type Audience = {
  eyebrow: string;
  heading: string;
  items: Array<[title: string, detail: string]>;
  benefits?: { heading: string; text: string };
  close: string;
  closeHeading: string;
  closeText: string;
};

export const audiences: Record<string, Audience> = {
  general: {
    eyebrow: "A proposal — prepared for discussion",
    heading: "What we're asking",
    items: [
      [
        "A conversation",
        "We would like to explain what we're doing and hear whether it interests you.",
      ],
      [
        "Your honest assessment",
        "If you think this is unrealistic, we would rather hear it now than in March 2027.",
      ],
      [
        "An introduction, if you have one",
        "To someone who should know about this, or who could help.",
      ],
    ],
    close: "We are not asking for a commitment or a decision today.",
    closeHeading: "The next step",
    closeText:
      "We would welcome a conversation. There is no decision to make today — we are looking for guidance on whether this is worth pursuing.",
  },

  enmu: {
    eyebrow:
      "A proposal — prepared for discussion with Eastern New Mexico University",
    heading: "What we're asking of ENMU",
    items: [
      [
        "A conversation about venue availability",
        "For a student production in spring 2027, and what dates could realistically work around the department's own season. We understand that season comes first.",
      ],
      [
        "An understanding of the requirements",
        "Insurance minimums, technical staffing, deposits, box office arrangements, custodial, supervision expectations for minors on campus, and how far in advance a request needs to be made.",
      ],
      [
        "Guidance on the right process and office",
        "We would rather follow the university's procedure correctly than ask for an exception to it.",
      ],
      [
        "Whether a partnership interests you at all",
        "And if so, in what form. We are not assuming one.",
      ],
    ],
    benefits: {
      heading: "What ENMU might get from it",
      text: "A pipeline. Students who have directed, stage-managed or run a budget before they arrive on campus are better prospects for the theatre programme and likelier to stay in it. Beyond that: a standing local audience, a place for majors to mentor younger students, and a community partner that intends to carry its own costs and eventually its own equipment.",
    },
    close:
      "We are not asking for money, and we are not asking for a decision today.",
    closeHeading: "The next step",
    closeText:
      "We would welcome a short meeting with whoever is best placed to discuss this — the Department of Theatre and Digital Filmmaking, facilities scheduling, or community engagement. We are happy to be directed elsewhere if that's more appropriate.",
  },

  sponsor: {
    eyebrow: "A proposal — prepared for local business partners",
    heading: "What we're asking of local businesses",
    items: [
      [
        "Consider sponsoring the founding production",
        "Tiers run from programme advertising through to headline production sponsorship. We'll bring the full structure to a conversation.",
      ],
      [
        "Or contribute in kind",
        "Printing, advertising, materials, storage, transport, hospitality, or professional services. Every donated item is money we don't have to raise.",
      ],
      [
        "Tell us what would make this worth your while",
        "We would rather design recognition around what actually matters to you than offer a standard package.",
      ],
    ],
    benefits: {
      heading: "What a sponsor gets",
      text: "Recognition in the programme, in marketing, and from the stage, in front of an audience drawn from across Roosevelt County. Association with the founding of something intended to last, and with young people from this town learning to run it. For most businesses sponsorship is treated as a marketing expense rather than a charitable gift — worth confirming with your own accountant, particularly while our nonprofit status is still in progress.",
    },
    close:
      "We have not approached anyone yet, and nothing here implies any business has agreed to take part.",
    closeHeading: "Let's talk",
    closeText:
      "We're happy to come to you, explain the plan in fifteen minutes, and leave you the sponsorship structure to consider.",
  },

  city: {
    eyebrow: "A proposal — prepared for civic leadership",
    heading: "What we're asking of the city and county",
    items: [
      [
        "Guidance on lodgers' tax eligibility",
        "Whether a group in formation, or a fiscally sponsored project, may apply — and when the advisory board meets.",
      ],
      [
        "Awareness and, where appropriate, endorsement",
        "A letter of support costs nothing and carries real weight with funders and with the university.",
      ],
      [
        "Introductions",
        "To economic development, tourism, the schools, and anyone else who should know this is happening.",
      ],
      [
        "Your view on where this fits",
        "You know the calendar and the community pressures better than we do.",
      ],
    ],
    benefits: {
      heading: "What it could mean for Portales",
      text: "Somewhere for teenagers to be after school that is neither sport nor a screen, and one that teaches budgets, deadlines and public speaking alongside performance. An additional reason for residents to spend an evening in town rather than driving to Clovis or Lubbock. And a volunteer organisation that builds local capacity rather than consuming it.",
    },
    close: "We are not requesting funding in this conversation.",
    closeHeading: "The next step",
    closeText:
      "We would welcome fifteen minutes to explain the plan and hear where you think it fits.",
  },
};

export function resolveAudience(key: string | undefined): Audience {
  if (!key) return audiences.general;
  return audiences[key.toLowerCase()] ?? audiences.general;
}
