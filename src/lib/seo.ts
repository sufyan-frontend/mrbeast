import type { Metadata } from "next";
import { getPage, type PageKey } from "./pages";
import { site } from "./site";

/**
 * Builds a route's `metadata` export from its registry entry.
 *
 * Every page goes through here so no route can ship missing a canonical, an OG
 * tag or a description — the three things most commonly forgotten when pages
 * are added by hand, and the three that cost the most when they are.
 *
 * `title.absolute` is used rather than the root layout's `%s | MrBeast`
 * template: these titles are already written keyword-first and sized to fit
 * Google's ~60-character render width, so appending a suffix would only push
 * the meaningful half out of the SERP.
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = getPage(key);
  const isHome = page.path === "/";

  return {
    title: { absolute: page.title },
    description: page.description,
    keywords: [...page.keywords],

    // Relative — the root layout's `metadataBase` resolves it to an absolute
    // URL, so the origin is configured in exactly one place.
    alternates: { canonical: page.path },

    openGraph: {
      type: isHome ? "website" : "article",
      url: page.path,
      siteName: site.name,
      locale: site.locale,
      title: page.title,
      description: page.description,
      // Image resolves automatically from the route's opengraph-image.tsx.
      ...(isHome
        ? {}
        : { publishedTime: site.lastReviewed, modifiedTime: site.lastReviewed }),
    },

    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      creator: "@MrBeast",
    },
  };
}
