import { faqs, site, siteUrl, socials, videos } from "./site";

/**
 * Builds the page's Schema.org JSON-LD as a single connected `@graph`.
 *
 * Using one graph with `@id` cross-references — rather than several loose,
 * duplicated blobs — lets Google and AI answer engines resolve every node to
 * the same entities instead of guessing that they're related.
 *
 * Deliberately NOT emitted:
 *  - `VideoObject`, which requires a real `uploadDate`, `contentUrl` and
 *    `thumbnailUrl` per video. Inventing those is structured-data spam.
 *  - `Product` / `Offer`, which requires live, accurate pricing and
 *    availability. The shop prices on this page are indicative only.
 * Add either one back the moment you have genuine data for it.
 */

const ids = {
  website: `${siteUrl}/#website`,
  webpage: `${siteUrl}/#webpage`,
  person: `${siteUrl}/#person`,
  publisher: `${siteUrl}/#publisher`,
  faq: `${siteUrl}/#faq`,
  breadcrumb: `${siteUrl}/#breadcrumb`,
  videoList: `${siteUrl}/#videos`,
  logo: `${siteUrl}/#logo`,
  primaryImage: `${siteUrl}/#primaryimage`,
} as const;

export function buildSchemaGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      /* ---------------- The site itself ---------------- */
      {
        "@type": "WebSite",
        "@id": ids.website,
        url: `${siteUrl}/`,
        name: `${site.name} — Official-Style Fan Hub`,
        description: site.description,
        inLanguage: site.lang,
        publisher: { "@id": ids.publisher },
        about: { "@id": ids.person },
      },

      /* The entity that publishes THIS site — kept separate from MrBeast
         himself, because a fan project must not claim to be him. */
      {
        "@type": "Organization",
        "@id": ids.publisher,
        name: `${site.name} Fan Hub`,
        url: `${siteUrl}/`,
        description:
          "An independent fan-built hub covering MrBeast's videos, ventures and philanthropy. Not affiliated with MrBeast or any related company.",
        logo: {
          "@type": "ImageObject",
          "@id": ids.logo,
          url: `${siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
        },
      },

      /* ---------------- This page ---------------- */
      {
        "@type": "WebPage",
        "@id": ids.webpage,
        url: `${siteUrl}/`,
        name: `${site.name} — ${site.tagline}`,
        description: site.description,
        inLanguage: site.lang,
        isPartOf: { "@id": ids.website },
        about: { "@id": ids.person },
        primaryImageOfPage: { "@id": ids.primaryImage },
        breadcrumb: { "@id": ids.breadcrumb },
        potentialAction: {
          "@type": "ReadAction",
          target: [`${siteUrl}/`],
        },
      },

      {
        "@type": "ImageObject",
        "@id": ids.primaryImage,
        url: `${siteUrl}/opengraph-image`,
        contentUrl: `${siteUrl}/opengraph-image`,
        width: 1200,
        height: 630,
        caption: `${site.name} — ${site.tagline}`,
      },

      /* ---------------- The subject ---------------- */
      {
        "@type": "Person",
        "@id": ids.person,
        name: site.name,
        alternateName: ["Jimmy Donaldson", "James Stephen Donaldson", "MrBeast6000"],
        givenName: "Jimmy",
        familyName: "Donaldson",
        birthDate: site.birthDate,
        birthPlace: {
          "@type": "Place",
          name: site.birthPlace,
        },
        nationality: {
          "@type": "Country",
          name: site.nationality,
        },
        jobTitle: ["YouTuber", "Entrepreneur", "Philanthropist"],
        description:
          "Jimmy Donaldson, known as MrBeast, is an American YouTuber and entrepreneur known for large-budget challenge videos, giveaways and philanthropy. He is the most-subscribed individual creator on YouTube.",
        knowsAbout: [
          "YouTube content creation",
          "Challenge videos",
          "Philanthropy",
          "Consumer brands",
        ],
        sameAs: [
          ...socials.map((social) => social.href),
          "https://en.wikipedia.org/wiki/MrBeast",
        ],
        subjectOf: { "@id": ids.webpage },
      },

      /* Ventures, linked back to their founder so the entities connect. */
      {
        "@type": "Organization",
        name: "Feastables",
        url: "https://feastables.com",
        description:
          "A chocolate and snack brand founded by MrBeast, sold in major retailers.",
        founder: { "@id": ids.person },
      },
      {
        "@type": "NGO",
        name: "Beast Philanthropy",
        url: "https://www.beastphilanthropy.org/",
        description:
          "A non-profit organisation founded by MrBeast that runs a food bank and funds community projects, directing 100% of its profits to charitable work.",
        founder: { "@id": ids.person },
      },

      /* ---------------- Navigation ---------------- */
      {
        "@type": "BreadcrumbList",
        "@id": ids.breadcrumb,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${siteUrl}/`,
          },
        ],
      },

      /* ---------------- Featured videos ---------------- */
      {
        "@type": "ItemList",
        "@id": ids.videoList,
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
      },

      /* ---------------- FAQ ----------------
         Powers FAQ rich results and is the single richest source an AI answer
         engine can quote, because each answer is complete on its own. */
      {
        "@type": "FAQPage",
        "@id": ids.faq,
        isPartOf: { "@id": ids.webpage },
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };
}

/**
 * Renders the graph as a <script type="application/ld+json">.
 *
 * JSON.stringify output is escaped for `<` so a value can never break out of
 * the script element.
 */
export function SchemaGraph() {
  const json = JSON.stringify(buildSchemaGraph()).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // Content is generated from our own config — no user input reaches it.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
