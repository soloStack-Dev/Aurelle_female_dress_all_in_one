import type { MetadataRoute } from "next";
import { posts, site } from "@/lib/data/site";

/**
 * Static routes plus every journal article. `lastModified` uses a fixed build
 * date rather than `new Date()` so the sitemap is deterministic between
 * builds; bump it when content changes.
 */
const lastUpdated = new Date("2026-10-01T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/collection", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  return [
    ...pages.map((page) => ({
      url: `${site.url}${page.path}`,
      lastModified: lastUpdated,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(`${post.date}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
