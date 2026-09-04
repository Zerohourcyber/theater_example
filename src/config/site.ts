/**
 * Central site configuration.
 *
 * The four source HTML files scattered their placeholders through the markup
 * as `[FILL]`, `CHANGE-NAME`, `CHANGE-EMAIL` and `CHANGE-DATE` comments. They
 * are consolidated here instead: anything still unresolved is prefixed with
 * `TODO:` and reported by `unresolvedPlaceholders()`, which drives a banner
 * that shows in development and on Vercel previews but never in production.
 */

/** Marker for a value the founding group still has to supply. */
export const TODO_PREFIX = "TODO:";

export function isPlaceholder(value: string): boolean {
  return value.startsWith(TODO_PREFIX);
}

/** Strip the marker so placeholder text still reads sensibly if it ships. */
export function placeholderText(value: string): string {
  return isPlaceholder(value) ? value.slice(TODO_PREFIX.length).trim() : value;
}

export const siteConfig = {
  name: "Portales Community Theater",
  /** Shown under the wordmark; the name is not yet settled or incorporated. */
  nameQualifier: "working name",
  tagline: "A youth-led theater company for Portales",
  description:
    "A group working to establish a youth-led community theater in Portales, New Mexico — run by high school and first-year college students, with a founding production in spring 2027.",

  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",

  /* --- Contact. Needs a shared address at least two people can reach. --- */
  contactEmail: "TODO: hello@example.org",
  contactName: "TODO: Contact name",
  contactRole: "TODO: Role in the founding group",
  contactPhone: "TODO: (000) 000-0000",

  /* --- The founding production --- */
  targetOpening: "2027-04-16",
  /** Prose form used throughout the copy. */
  targetOpeningLabel: "spring 2027",
  /**
   * MTI's performance license forbids advertising, announcing, selling
   * tickets or holding auditions before a signed contract and deposit clear.
   * Until that is done the show stays unnamed everywhere on the site. Flip
   * this to true once the licence is in hand and the title appears
   * throughout; nothing else needs editing.
   */
  productionAnnounced: false,
  productionTitle: "Dear Evan Hansen",

  /* --- The university we hope to partner with. Not affiliated. --- */
  collegePartner: "Eastern New Mexico University",
  collegePartnerShort: "ENMU",
} as const;

/** How the production may be referred to in public copy right now. */
export function productionName(): string {
  return siteConfig.productionAnnounced
    ? siteConfig.productionTitle
    : `our founding production`;
}

export const navLinks = [
  { label: "The plan", href: "/plan" },
  { label: "Support us", href: "/support" },
  { label: "Who we are", href: "/who-we-are" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Every placeholder still awaiting real information, for the pre-launch
 * banner. Keep this in sync when adding new `TODO:` values.
 */
export function unresolvedPlaceholders(): string[] {
  const fields: Array<[string, string]> = [
    ["Contact email", siteConfig.contactEmail],
    ["Contact name", siteConfig.contactName],
    ["Contact role", siteConfig.contactRole],
    ["Contact phone", siteConfig.contactPhone],
  ];
  return fields
    .filter(([, value]) => isPlaceholder(value))
    .map(([label]) => label);
}

export type SiteConfig = typeof siteConfig;
