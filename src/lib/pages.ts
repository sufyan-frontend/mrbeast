/**
 * The page registry — one entry per indexable URL.
 *
 * This is the spine of the site's SEO. Every route's <title>, meta description,
 * canonical, H1, breadcrumb trail, sitemap row, nav label, internal-link block
 * and llms.txt line is derived from the entry below. Add a route here and it is
 * wired into all of those at once; nothing can drift out of sync.
 *
 * The keyword split is deliberate. One URL can only win one primary intent, so
 * each page owns a distinct cluster and nothing competes with a sibling:
 *
 *   /                 brand / navigational  — "mrbeast", "mr beast"
 *   /who-is-mrbeast   identity              — "mr beast real name", "jimmy donaldson"
 *   /net-worth        commercial-ish        — "mrbeast net worth"
 *   /videos           content discovery     — "best mrbeast videos"
 *   /best-youtuber    comparison            — "best youtuber in the world"
 *   /faq              long-tail questions   — "how does mrbeast make money"
 */

import { siteUrl } from "./site";

export type PageKey =
  | "home"
  | "who-is-mrbeast"
  | "net-worth"
  | "videos"
  | "best-youtuber"
  | "faq";

export type PageMeta = {
  key: PageKey;
  /** Path with a leading slash. The home page is "/". */
  path: string;
  /** Short label used in the header, footer and breadcrumb trail. */
  navLabel: string;
  /**
   * The literal <title>. Written keyword-first and kept under ~60 characters so
   * Google renders it whole rather than truncating the important part.
   */
  title: string;
  /** The on-page H1. Deliberately close to, but not identical to, the title. */
  h1: string;
  /** Meta description, ~150-160 characters, written to earn the click. */
  description: string;
  /**
   * The AEO/GEO payload: one self-contained paragraph that fully answers the
   * page's primary query without needing any other sentence on the page. This
   * is the passage an AI answer engine lifts and cites, so it always leads with
   * the answer and never with a preamble.
   */
  answer: string;
  /** Primary keyword cluster this URL owns. */
  keywords: readonly string[];
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly";
  /** Whether the page appears in the primary header nav. */
  inNav: boolean;
};

export const pages: readonly PageMeta[] = [
  {
    key: "home",
    path: "/",
    navLabel: "Home",
    title: "MrBeast (Jimmy Donaldson) — Videos, Ventures & Philanthropy",
    h1: "I make the biggest videos on the internet.",
    description:
      "MrBeast is Jimmy Donaldson, the most-subscribed creator on YouTube. Explore his videos, Feastables, Beast Games, and Beast Philanthropy — all in one place.",
    answer:
      "MrBeast is Jimmy Donaldson, an American YouTuber and entrepreneur who runs the most-subscribed channel on YouTube. He is known for large-budget challenge videos, multi-million-dollar giveaways, the snack brand Feastables, the competition series Beast Games, and the non-profit Beast Philanthropy.",
    keywords: [
      "MrBeast",
      "Mr Beast",
      "Jimmy Donaldson",
      "MrBeast videos",
      "MrBeast channel",
    ],
    priority: 1,
    changeFrequency: "weekly",
    inNav: false,
  },

  {
    key: "who-is-mrbeast",
    path: "/who-is-mrbeast",
    navLabel: "Who is MrBeast",
    title: "Who Is MrBeast? Real Name, Age & Full Story (Jimmy Donaldson)",
    h1: "Who is MrBeast?",
    description:
      "MrBeast's real name is Jimmy Donaldson, born 7 May 1998 in Wichita, Kansas. Full biography: how he started on YouTube in 2012 and became the most-subscribed creator.",
    answer:
      "MrBeast's real name is James Stephen Donaldson, known as Jimmy Donaldson. He is an American YouTuber, entrepreneur and philanthropist, born on 7 May 1998 in Wichita, Kansas. He began uploading to YouTube in February 2012 at the age of thirteen under the username MrBeast6000, and now runs the most-subscribed individual channel on the platform.",
    keywords: [
      "who is MrBeast",
      "MrBeast real name",
      "Jimmy Donaldson",
      "MrBeast age",
      "MrBeast biography",
      "how old is MrBeast",
      "where is MrBeast from",
    ],
    priority: 0.9,
    changeFrequency: "monthly",
    inNav: true,
  },

  {
    key: "net-worth",
    path: "/net-worth",
    navLabel: "Net worth",
    title: "MrBeast Net Worth: How Much Is Jimmy Donaldson Worth?",
    h1: "MrBeast's net worth, explained",
    description:
      "How much is MrBeast worth? Where the money comes from, why published estimates disagree so widely, and why his company is valued far above his personal net worth.",
    answer:
      "MrBeast's personal net worth is an estimate, not a published figure, and reputable outlets have placed it anywhere from roughly $500 million to over $1 billion. The wide spread exists because Jimmy Donaldson reinvests the overwhelming majority of his income back into video production and holds most of his wealth as equity in Beast Industries — a private company whose reported valuation is several times any estimate of his personal fortune.",
    keywords: [
      "MrBeast net worth",
      "how much is MrBeast worth",
      "Jimmy Donaldson net worth",
      "MrBeast earnings",
      "how much money does MrBeast make",
      "Beast Industries valuation",
    ],
    priority: 0.9,
    changeFrequency: "monthly",
    inNav: true,
  },

  {
    key: "videos",
    path: "/videos",
    navLabel: "Videos",
    title: "Best MrBeast Videos: Squid Game, $1 vs $1,000,000 & More",
    h1: "The best MrBeast videos",
    description:
      "A guide to MrBeast's most-watched videos — Squid Game in real life, $1 vs $1,000,000, 7 days at sea — plus what makes each format work and where to watch them free.",
    answer:
      "MrBeast's best-known videos are large-budget challenge films published free on YouTube, including \"$456,000 Squid Game In Real Life\", \"$1 vs $1,000,000 Hotel Room\", \"Ages 1 - 100 Fight For $500,000\" and \"1,000 Blind People See For The First Time\". They fall into a handful of repeatable formats — endurance challenges, versus comparisons, last-to-leave competitions and philanthropy films — each built around a single idea a viewer can understand from the thumbnail alone.",
    keywords: [
      "best MrBeast videos",
      "MrBeast videos",
      "MrBeast Squid Game",
      "MrBeast challenges",
      "most viewed MrBeast videos",
      "MrBeast giveaway videos",
    ],
    priority: 0.8,
    changeFrequency: "weekly",
    inNav: true,
  },

  {
    key: "best-youtuber",
    path: "/best-youtuber",
    navLabel: "Best YouTuber",
    title: "Is MrBeast the Best YouTuber? The Numbers, Compared",
    h1: "Is MrBeast the best YouTuber in the world?",
    description:
      "MrBeast is the most-subscribed individual creator on YouTube. Here is how he compares to T-Series and Cocomelon — and why \"biggest\" and \"best\" are not the same question.",
    answer:
      "By subscriber count, MrBeast runs the most-subscribed channel on YouTube and is the most-subscribed individual creator, ahead of corporate channels such as T-Series and Cocomelon. \"Best\", however, is subjective and depends on the measure: MrBeast leads on scale, production budget and reach, while other creators lead on watch time in specific categories, revenue per video, or influence within a niche.",
    keywords: [
      "best YouTuber",
      "best YouTuber in the world",
      "most subscribed YouTuber",
      "who is the biggest YouTuber",
      "MrBeast vs T-Series",
      "top YouTuber 2026",
    ],
    priority: 0.8,
    changeFrequency: "monthly",
    inNav: true,
  },

  {
    key: "faq",
    path: "/faq",
    navLabel: "FAQ",
    title: "MrBeast FAQ: Real Name, Subscribers, Money & Casting",
    h1: "MrBeast: frequently asked questions",
    description:
      "Direct answers to the most-asked MrBeast questions — his real name, subscriber count, how he makes money, whether the philanthropy is real, and how casting actually works.",
    answer:
      "The questions people most often ask about MrBeast are his real name (Jimmy Donaldson), his subscriber count (the largest on YouTube), how he makes money while giving so much away (ad revenue, sponsorships and his own brands, nearly all reinvested into production), and how to appear in a video (casting is announced only through his official YouTube community posts and verified accounts, and is always free to enter).",
    keywords: [
      "MrBeast FAQ",
      "MrBeast questions",
      "how does MrBeast make money",
      "how to get on a MrBeast video",
      "is MrBeast philanthropy real",
      "how many subscribers does MrBeast have",
    ],
    priority: 0.7,
    changeFrequency: "monthly",
    inNav: true,
  },
] as const;

const byKey = new Map(pages.map((page) => [page.key, page]));

/** Look up a page. Throws at build time if the key is wrong, so a typo can
 *  never ship as a silently missing canonical or breadcrumb. */
export function getPage(key: PageKey): PageMeta {
  const page = byKey.get(key);
  if (!page) throw new Error(`Unknown page key: ${key}`);
  return page;
}

/** Absolute URL for a page — needed by canonicals, JSON-LD @ids and the sitemap. */
export function absoluteUrl(path: string): string {
  return path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
}

/** Pages shown in the header/footer navigation. */
export const navPages = pages.filter((page) => page.inNav);

/**
 * Sibling pages to link to from `key`, in registry order.
 *
 * Every page linking to every other page is what turns six isolated URLs into
 * a crawlable cluster: internal links are how PageRank and crawl budget reach
 * the deeper pages, and how an AI answer engine discovers the rest of the site
 * after landing on just one of them.
 */
export function relatedPages(key: PageKey, limit = 3): PageMeta[] {
  return pages.filter((page) => page.key !== key && page.key !== "home").slice(0, limit);
}
