import type { MetadataRoute } from "next";
import { absoluteUrl, pages } from "@/lib/pages";
import { site } from "@/lib/site";

/**
 * sitemap.xml, generated from the page registry.
 *
 * Because it is derived rather than hand-written, adding a route to
 * `lib/pages.ts` puts it in the sitemap automatically — a sitemap that silently
 * omits a page is one of the easiest ways to leave a URL uncrawled.
 *
 * `lastModified` uses the reviewed date rather than the build time. Stamping
 * every URL with "now" on each deploy tells crawlers the content changed when
 * only the bundle did, and they learn to discount the signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(site.lastReviewed);

  return pages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
