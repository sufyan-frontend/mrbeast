import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * sitemap.xml
 *
 * One page today. When you add routes, append them here — the file is the
 * canonical list crawlers work from, and `robots.ts` already points at it.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
