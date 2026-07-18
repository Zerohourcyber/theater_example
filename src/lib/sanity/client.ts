import { createClient, type SanityClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-06-01";

/** True when a Sanity project is configured via env vars. */
export const sanityConfigured = Boolean(projectId);

/** Read client (CDN). Null when Sanity is not configured. */
export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      token: process.env.SANITY_API_READ_TOKEN || undefined,
    })
  : null;

/**
 * Write client for server-side mutations (newsletter signups).
 * Null unless both the project and a write token are configured.
 */
export const sanityWriteClient: SanityClient | null =
  sanityConfigured && process.env.SANITY_API_WRITE_TOKEN
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: process.env.SANITY_API_WRITE_TOKEN,
      })
    : null;
