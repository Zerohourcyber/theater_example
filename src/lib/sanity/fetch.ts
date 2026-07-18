import {
  fallbackFaq,
  fallbackNews,
  fallbackPeople,
  fallbackProductions,
  fallbackSiteSettings,
  fallbackSponsors,
} from "@/content/fallback";
import type {
  FaqItem,
  NewsPost,
  Person,
  Production,
  SiteSettings,
  Sponsor,
} from "@/types";
import { sanityClient } from "./client";
import {
  allNewsQuery,
  allProductionsQuery,
  faqQuery,
  foundersQuery,
  newsBySlugQuery,
  productionBySlugQuery,
  siteSettingsQuery,
  sponsorsQuery,
  upcomingProductionQuery,
} from "./queries";

/** ISR window for content fetches (seconds). */
export const CONTENT_REVALIDATE_SECONDS = 60;

/**
 * Fetch from Sanity with a local-content fallback (CLAUDE.md rule 5):
 * fall back when the project is not configured, the query errors, or it
 * returns an empty result.
 */
async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T
): Promise<T> {
  if (!sanityClient) return fallback;

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      next: { revalidate: CONTENT_REVALIDATE_SECONDS },
    });
    if (
      result == null ||
      (Array.isArray(result) && result.length === 0)
    ) {
      return fallback;
    }
    return result;
  } catch (error) {
    console.error("[sanity] fetch failed, using fallback content:", error);
    return fallback;
  }
}

export function getSiteSettings(): Promise<SiteSettings> {
  return sanityFetch(siteSettingsQuery, {}, fallbackSiteSettings);
}

export function getProductions(): Promise<Production[]> {
  return sanityFetch(allProductionsQuery, {}, fallbackProductions);
}

export async function getProductionBySlug(
  slug: string
): Promise<Production | null> {
  const fallback =
    fallbackProductions.find((p) => p.slug === slug) ?? null;
  return sanityFetch(productionBySlugQuery, { slug }, fallback);
}

export function getUpcomingProduction(): Promise<Production | null> {
  const fallback =
    fallbackProductions.find((p) => p.status === "upcoming") ?? null;
  return sanityFetch(upcomingProductionQuery, {}, fallback);
}

export function getNewsPosts(): Promise<NewsPost[]> {
  return sanityFetch(allNewsQuery, {}, fallbackNews);
}

export async function getNewsPostBySlug(
  slug: string
): Promise<NewsPost | null> {
  const fallback = fallbackNews.find((p) => p.slug === slug) ?? null;
  return sanityFetch(newsBySlugQuery, { slug }, fallback);
}

export function getFounders(): Promise<Person[]> {
  return sanityFetch(
    foundersQuery,
    {},
    fallbackPeople.filter((p) => p.isFounder)
  );
}

export function getSponsors(): Promise<Sponsor[]> {
  return sanityFetch(sponsorsQuery, {}, fallbackSponsors);
}

export function getFaqItems(): Promise<FaqItem[]> {
  return sanityFetch(faqQuery, {}, fallbackFaq);
}
