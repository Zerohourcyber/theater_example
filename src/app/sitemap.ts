import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/**
 * Public routes only. /proposal is deliberately absent: it is unlisted, sent
 * directly to the person it was written for, and carries a noindex header.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/plan", "/support", "/who-we-are", "/contact"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
