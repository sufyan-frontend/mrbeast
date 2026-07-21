import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * robots.txt
 *
 * AI crawlers are explicitly allowed. That is the whole point of GEO/AEO work:
 * if GPTBot, ClaudeBot, PerplexityBot and friends can't fetch the page, none of
 * the schema or answer-first copy on it can ever be cited.
 *
 * Blocking any of them is a one-line change here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing under /api is useful in an index.
        disallow: ["/api/"],
      },
      // Named explicitly so the intent is obvious to anyone reading the file.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "CCBot",
          "Bingbot",
          "meta-externalagent",
        ],
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
