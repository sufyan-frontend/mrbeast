import { netWorth, site, siteUrl, socials, videos } from "./site";
import { absoluteUrl, getPage, type PageKey } from "./pages";

/**
 * Schema.org JSON-LD, built as a single connected `@graph` per page.
 *
 * Two rules drive the design:
 *
 * 1. One graph, not several loose blobs. Every node cross-references others by
 *    `@id`, so Google and AI answer engines resolve them to the *same* entities
 *    instead of guessing that a `Person` on one page is the `Person` on another.
 *    The entity `@id`s below are site-absolute and identical on every route —
 *    that is what makes the whole site describe one MrBeast rather than six.
 *
 * 2. Nothing is asserted that isn't true on the page. Deliberately NOT emitted:
 *      - `VideoObject`, which requires a real `uploadDate`, `contentUrl` and
 *        `thumbnailUrl` per video. Inventing those is structured-data spam.
 *      - `Product` / `Offer`, which requires live, accurate pricing and
 *        availability. The shop prices on this site are indicative only.
 *      - `aggregateRating` anywhere, since no ratings are collected.
 *    Add any of them back the moment you have genuine data.
 */

/* Site-wide entity ids. Stable across every route — see rule 1 above. */
const ids = {
  website: `${siteUrl}/#website`,
  person: `${siteUrl}/#person`,
  publisher: `${siteUrl}/#publisher`,
  logo: `${siteUrl}/#logo`,
} as const;

/** Per-page node ids, derived from the page's own canonical URL. */
function pageIds(path: string) {
  const url = absoluteUrl(path);
  return {
    url,
    webpage: `${url}#webpage`,
    breadcrumb: `${url}#breadcrumb`,
    primaryImage: `${url}#primaryimage`,
    faq: `${url}#faq`,
    videoList: `${url}#videos`,
  };
}

/** OG image for a route — Next serves one per segment from opengraph-image.tsx. */
function ogImageUrl(path: string): string {
  return path === "/" ? `${siteUrl}/opengraph-image` : `${siteUrl}${path}/opengraph-image`;
}

/* ---------------- Shared entities ---------------- */

/**
 * The entity that publishes THIS site — kept deliberately separate from
 * MrBeast himself, because a fan project must never claim to be its subject.
 */
const publisherNode = {
  "@type": "Organization",
  "@id": ids.publisher,
  name: `${site.name} Fan Hub`,
  url: `${siteUrl}/`,
  description:
    "An independent fan-built hub covering MrBeast's videos, ventures and philanthropy. Not affiliated with MrBeast or any related company.",
  logo: {
    "@type": "ImageObject",
    "@id": ids.logo,
    url: ogImageUrl("/"),
    width: 1200,
    height: 630,
  },
} as const;

const websiteNode = {
  "@type": "WebSite",
  "@id": ids.website,
  url: `${siteUrl}/`,
  name: `${site.name} — Fan Hub`,
  description: site.description,
  inLanguage: site.lang,
  publisher: { "@id": ids.publisher },
  about: { "@id": ids.person },
} as const;

/** The subject of the site. Referenced by `@id` from every page's WebPage node. */
const personNode = {
  "@type": "Person",
  "@id": ids.person,
  name: site.name,
  alternateName: ["Jimmy Donaldson", "James Stephen Donaldson", "MrBeast6000", "Mr Beast"],
  givenName: "Jimmy",
  familyName: "Donaldson",
  birthDate: site.birthDate,
  birthPlace: { "@type": "Place", name: site.birthPlace },
  nationality: { "@type": "Country", name: site.nationality },
  jobTitle: ["YouTuber", "Entrepreneur", "Philanthropist"],
  description:
    "Jimmy Donaldson, known as MrBeast, is an American YouTuber and entrepreneur known for large-budget challenge videos, giveaways and philanthropy. He is the most-subscribed individual creator on YouTube.",
  knowsAbout: [
    "YouTube content creation",
    "Challenge videos",
    "Philanthropy",
    "Consumer brands",
  ],
  sameAs: [...socials.map((social) => social.href), "https://en.wikipedia.org/wiki/MrBeast"],
} as const;

/** Ventures, linked back to their founder so the entities connect. */
const ventureNodes = [
  {
    "@type": "Organization",
    "@id": `${siteUrl}/#feastables`,
    name: "Feastables",
    url: "https://feastables.com",
    description:
      "A chocolate and snack brand founded by MrBeast, sold in major retailers.",
    founder: { "@id": ids.person },
  },
  {
    "@type": "NGO",
    "@id": `${siteUrl}/#beast-philanthropy`,
    name: "Beast Philanthropy",
    url: "https://www.beastphilanthropy.org/",
    description:
      "A non-profit organisation founded by MrBeast that runs a food bank and funds community projects, directing 100% of its profits to charitable work.",
    founder: { "@id": ids.person },
  },
] as const;

/* ---------------- Per-page graph ---------------- */

type GraphOptions = {
  /** Which registry page this graph describes. */
  pageKey: PageKey;
  /**
   * FAQ entries actually rendered on this page. Only pass what is visible —
   * FAQPage markup for answers a user cannot see on the page is a structured
   * data violation and a manual-action risk.
   */
  faqEntries?: readonly { question: string; answer: string }[];
  /** Extra nodes specific to one route (e.g. the ItemList on /videos). */
  extraNodes?: readonly object[];
};

/**
 * The most specific WebPage subtype that is actually true for each route.
 *
 * Being specific is free precision: `ProfilePage` tells a crawler the page is
 * *about a person* and `CollectionPage` that it indexes other items, which is
 * information a generic `WebPage` throws away. Anything not listed stays a
 * plain WebPage rather than being stretched to fit a subtype it isn't.
 */
const webPageTypes: Partial<Record<PageKey, string>> = {
  "who-is-mrbeast": "ProfilePage",
  videos: "CollectionPage",
  faq: "FAQPage",
};

export function buildPageGraph({ pageKey, faqEntries, extraNodes = [] }: GraphOptions) {
  const page = getPage(pageKey);
  const id = pageIds(page.path);
  const isHome = page.path === "/";

  const questions =
    faqEntries?.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })) ?? [];

  /* On /faq the page *is* the FAQ, so the WebPage node carries the questions
     directly. Everywhere else the FAQ is one section of a broader page, so it
     becomes its own FAQPage node. Emitting both shapes at once would put two
     competing FAQPage entities in one graph. */
  const faqIsThePage = webPageTypes[pageKey] === "FAQPage" && questions.length > 0;

  const webPage = {
    "@type": webPageTypes[pageKey] ?? "WebPage",
    "@id": id.webpage,
    url: id.url,
    name: page.title,
    description: page.description,
    inLanguage: site.lang,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.person },
    publisher: { "@id": ids.publisher },
    primaryImageOfPage: { "@id": id.primaryImage },
    breadcrumb: { "@id": id.breadcrumb },
    /**
     * Freshness. AI answer engines and Google both weight a recency signal for
     * volatile queries (net worth, subscriber counts), and this one is honest:
     * it moves only when `site.lastReviewed` is moved by hand.
     */
    datePublished: site.lastReviewed,
    dateModified: site.lastReviewed,
    /**
     * Marks the answer-first paragraph as the passage worth reading aloud.
     * The selector matches the block rendered by <AnswerBox>, which is the same
     * text as `page.answer` — so the markup and the visible page cannot diverge.
     */
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".speakable"],
    },
    potentialAction: { "@type": "ReadAction", target: [id.url] },
    ...(faqIsThePage ? { mainEntity: questions } : {}),
  };

  const primaryImage = {
    "@type": "ImageObject",
    "@id": id.primaryImage,
    url: ogImageUrl(page.path),
    contentUrl: ogImageUrl(page.path),
    width: 1200,
    height: 630,
    caption: page.h1,
  };

  /* Breadcrumbs: Home > This page. Mirrors the visible <Breadcrumbs> trail
     exactly — Google cross-checks the two and drops the rich result if the
     markup describes a trail the user cannot see. */
  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": id.breadcrumb,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      ...(isHome
        ? []
        : [{ "@type": "ListItem", position: 2, name: page.navLabel, item: id.url }]),
    ],
  };

  const faqNode =
    questions.length > 0 && !faqIsThePage
      ? [
          {
            "@type": "FAQPage",
            "@id": id.faq,
            isPartOf: { "@id": id.webpage },
            mainEntity: questions,
          },
        ]
      : [];

  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode,
      publisherNode,
      webPage,
      primaryImage,
      personNode,
      ...ventureNodes,
      breadcrumb,
      ...faqNode,
      ...extraNodes,
    ],
  };
}

/* ---------------- Route-specific extra nodes ---------------- */

/** The featured-video list, used by the home page and /videos. */
export function videoListNode(path: string) {
  return {
    "@type": "ItemList",
    "@id": pageIds(path).videoList,
    name: "Featured MrBeast videos",
    description:
      "A selection of the most-watched MrBeast videos, including challenge, survival and philanthropy films.",
    numberOfItems: videos.length,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: videos.map((video, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: video.title,
      description: video.blurb,
      url: video.youtubeId
        ? `https://www.youtube.com/watch?v=${video.youtubeId}`
        : "https://www.youtube.com/@MrBeast",
    })),
  };
}

/**
 * The net-worth explainer, marked up as a Q&A pair rather than a bare number.
 *
 * `QAPage` is the honest shape here: the page answers a question whose answer
 * is a contested range, not a fact. Emitting a single figure as structured data
 * would state as certain something no source actually knows.
 */
export function netWorthQaNode() {
  const id = pageIds(getPage("net-worth").path);
  const answer = getPage("net-worth").answer;

  return {
    "@type": "QAPage",
    "@id": `${id.url}#qa`,
    isPartOf: { "@id": id.webpage },
    mainEntity: {
      "@type": "Question",
      name: "How much is MrBeast worth?",
      text: "What is MrBeast's (Jimmy Donaldson's) net worth, and why do published estimates disagree?",
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: `${answer} Estimates commonly fall between ${netWorth.low} and ${netWorth.high}.`,
        url: `${id.url}#answer`,
      },
    },
  };
}

/* ---------------- Renderer ---------------- */

/**
 * Renders a page's graph as <script type="application/ld+json">.
 *
 * JSON.stringify output has `<` escaped so a value can never close the script
 * element early. Content is generated from our own config — no user input.
 */
export function SchemaGraph(options: GraphOptions) {
  const json = JSON.stringify(buildPageGraph(options)).replace(/</g, "\\u003c");

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
