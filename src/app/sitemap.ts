import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getNewsPosts, getProductions } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/productions",
    "/news",
    "/auditions",
    "/get-involved",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const [productions, posts] = await Promise.all([
    getProductions(),
    getNewsPosts(),
  ]);

  return [
    ...staticRoutes,
    ...productions.map((p) => ({
      url: `${base}/productions/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${base}/news/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
