/**
 * Domain types shared across the app. These mirror the Sanity schemas
 * (see sanity/schemas) so the same components render CMS data and the
 * local fallback content in src/content/fallback.
 */

import type { PortableTextBlock } from "@portabletext/react";

/** Portable Text is an array of blocks; alias for readability. */
export type PortableText = PortableTextBlock[];

/**
 * A Sanity image reference. When content comes from the CMS the `asset._ref`
 * is present and resolved via `urlForImage`. Fallback content instead supplies
 * a plain `url` (or omits the image entirely, letting a gradient placeholder
 * render). `alt` is always encouraged for accessibility.
 */
export interface ImageRef {
  _type?: "image";
  asset?: { _ref?: string; _type?: string; url?: string };
  alt?: string;
  /** Convenience URL used by fallback/resolved images. */
  url?: string;
}

export type ProductionStatus = "upcoming" | "current" | "past";

export interface Performance {
  _key?: string;
  dateTime: string; // ISO
}

export interface CreditMember {
  _key?: string;
  person: Person;
  role: string;
}

export interface Production {
  _id: string;
  title: string;
  slug: string;
  status: ProductionStatus;
  poster?: ImageRef;
  synopsis?: PortableText;
  venue?: string;
  performances?: Performance[];
  /** Drives the home-page countdown. ISO datetime. */
  openingNight?: string;
  ticketsEnabled?: boolean;
  ticketPriceCents?: number;
  cast?: CreditMember[];
  crew?: CreditMember[];
  gallery?: ImageRef[];
  auditionInfo?: PortableText;
}

export interface Person {
  _id: string;
  name: string;
  slug?: string;
  headshot?: ImageRef;
  roleTitle?: string;
  bio?: PortableText;
  isFounder?: boolean;
  order?: number;
}

export interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string; // ISO
  coverImage?: ImageRef;
  excerpt?: string;
  body?: PortableText;
}

export type SponsorTier = "partner" | "gold" | "silver" | "community";

export interface Sponsor {
  _id: string;
  name: string;
  logo?: ImageRef;
  url?: string;
  tier: SponsorTier;
  order?: number;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: PortableText;
  order?: number;
}

export interface TimelineItem {
  _key?: string;
  year: string;
  title: string;
  description: string;
}

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface SiteSettings {
  orgName?: string;
  tagline?: string;
  contactEmail?: string;
  socials?: SocialLink[];
  aboutStory?: PortableText;
  timeline?: TimelineItem[];
}
