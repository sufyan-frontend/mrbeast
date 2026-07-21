/**
 * Single source of truth for the whole site.
 *
 * Everything the pages render — copy, links, stats, SEO strings — comes from
 * here. Change a value once and it updates the UI, the metadata, the JSON-LD
 * schema, the sitemap and the OG image together.
 *
 * >>> BEFORE YOU DEPLOY <<<
 *  1. Set `url` to your real production domain (canonical URLs + OG tags need it).
 *  2. Re-check every number under `stats` — they are rounded public figures and
 *     they go stale. Search engines and AI answer engines quote these.
 *  3. Drop real images into /public/images and swap the `image` fields.
 */

/** Production origin. No trailing slash. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://mr-beast-s.vercel.app";

export const site = {
  name: "MrBeast",
  legalName: "Jimmy Donaldson",
  /** Shown in the header/footer lockup. */
  wordmark: "MRBEAST",
  tagline: "The biggest videos on the internet.",
  /**
   * ~155 chars. This is the meta description and the first thing an AI answer
   * engine reads, so it leads with the answer, not with marketing.
   */
  description:
    "MrBeast is Jimmy Donaldson, the most-subscribed creator on YouTube. Explore his videos, Feastables, Beast Games, and Beast Philanthropy — all in one place.",
  url: siteUrl,
  locale: "en_US",
  lang: "en",
  /** Used by the fan-site disclaimer. Set to false if you own the brand. */
  isFanSite: true,
  founded: "2012-02-20",
  birthDate: "1998-05-07",
  birthPlace: "Wichita, Kansas, United States",
  nationality: "American",
  /**
   * Date the facts on this site were last checked, in ISO form.
   *
   * Surfaced as `dateModified` in the JSON-LD and as a visible "last reviewed"
   * line on every page. Both Google and AI answer engines weight freshness for
   * queries like net worth and subscriber counts, and a visible review date is
   * a genuine E-E-A-T signal — so only move it when you have actually rechecked
   * the numbers.
   */
  lastReviewed: "2026-07-21",
} as const;

/**
 * In-page anchors on the home page.
 *
 * Each href is root-relative (`/#videos`, not `#videos`) so the same link works
 * from `/net-worth` or any other route — a bare `#videos` would silently jump
 * to nothing on every page except the home page.
 */
export const homeSections = [
  { label: "Videos", href: "/#videos" },
  { label: "Ventures", href: "/#ventures" },
  { label: "Philanthropy", href: "/#philanthropy" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/#about" },
] as const;

export const socials = [
  { label: "YouTube", href: "https://www.youtube.com/@MrBeast", handle: "@MrBeast" },
  { label: "Instagram", href: "https://www.instagram.com/mrbeast/", handle: "@mrbeast" },
  { label: "TikTok", href: "https://www.tiktok.com/@mrbeast", handle: "@mrbeast" },
  { label: "X", href: "https://x.com/MrBeast", handle: "@MrBeast" },
] as const;

/**
 * Headline numbers.
 * `value` is a display string so you control the formatting; `machine` is the
 * plain number used in JSON-LD where a schema property expects one.
 */
export const stats = [
  { value: "400M+", label: "YouTube subscribers", machine: 400_000_000 },
  { value: "80B+", label: "Lifetime video views", machine: 80_000_000_000 },
  { value: "$1B+", label: "Given away & reinvested", machine: 1_000_000_000 },
  { value: "20M+", label: "Trees planted with #TeamTrees", machine: 20_000_000 },
] as const;

/** Scrolling ticker strip under the hero. */
export const ticker = [
  "100 hours underwater",
  "$1,000,000 giveaway",
  "1,000 blind people see again",
  "Squid Game in real life",
  "Last to leave wins",
  "50 hours buried alive",
  "Ages 1–100 fight for $500,000",
  "World's most dangerous escape room",
] as const;

/**
 * Featured videos.
 *
 * `youtubeId` is optional. Provide one and the card automatically uses the real
 * YouTube thumbnail and links to the video. Leave it out and the card falls back
 * to the local artwork in `poster` — so nothing is ever broken.
 */
export type Video = {
  title: string;
  blurb: string;
  poster: string;
  youtubeId?: string;
  duration?: string;
  category: string;
};

export const videos: Video[] = [
  {
    title: "$456,000 Squid Game In Real Life",
    blurb:
      "456 players. One recreated arena. The single largest set MrBeast had ever built at the time.",
    poster: "/images/video-squid-game.svg",
    duration: "25:41",
    category: "Challenge",
  },
  {
    title: "1,000 Blind People See For The First Time",
    blurb:
      "Cataract surgeries funded across multiple countries, filmed as recipients open their eyes.",
    poster: "/images/video-blind.svg",
    duration: "12:19",
    category: "Philanthropy",
  },
  {
    title: "7 Days Stranded At Sea",
    blurb: "A week adrift with no land in sight — and a growing pile of problems.",
    poster: "/images/video-sea.svg",
    duration: "18:03",
    category: "Survival",
  },
  {
    title: "$1 vs $1,000,000 Hotel Room",
    blurb:
      "The format that defined a genre: the cheapest version of a thing against the most expensive.",
    poster: "/images/video-hotel.svg",
    duration: "15:27",
    category: "Versus",
  },
  {
    title: "Ages 1 - 100 Fight For $500,000",
    blurb: "One hundred contestants, one per age. Last one standing takes the prize.",
    poster: "/images/video-ages.svg",
    duration: "20:11",
    category: "Competition",
  },
  {
    title: "I Built 100 Wells In Africa",
    blurb: "Clean water infrastructure across communities that had none.",
    poster: "/images/video-wells.svg",
    duration: "14:52",
    category: "Philanthropy",
  },
];

/** Business ventures / brands. */
export const ventures = [
  {
    name: "Feastables",
    kicker: "Snacks",
    description:
      "A chocolate and snack brand built on simple ingredients, sold in major retailers across the US and beyond.",
    href: "https://feastables.com",
    accent: "#ffb020",
    image: "/images/venture-feastables.svg",
  },
  {
    name: "Beast Games",
    kicker: "Competition series",
    description:
      "A large-scale physical competition show — the format scaled up from the channel into full-length television.",
    href: "https://www.amazon.com/",
    accent: "#0a84ff",
    image: "/images/venture-beast-games.svg",
  },
  {
    name: "Beast Philanthropy",
    kicker: "Non-profit",
    description:
      "A separate channel and organisation where 100% of profits fund food banks, shelters and community projects.",
    href: "https://www.beastphilanthropy.org/",
    accent: "#22c55e",
    image: "/images/venture-philanthropy.svg",
  },
  {
    name: "MrBeast Lab",
    kicker: "Collectibles",
    description:
      "Collectible figures and toys built around the channel's characters and challenges.",
    href: "https://mrbeastlab.com/",
    accent: "#ff2d55",
    image: "/images/venture-lab.svg",
  },
] as const;

/** Philanthropy impact list. */
export const philanthropy = [
  {
    title: "#TeamTrees",
    metric: "20M+ trees",
    description:
      "A creator-led fundraiser with Mark Rober that funded the planting of over twenty million trees worldwide.",
  },
  {
    title: "#TeamSeas",
    metric: "30M+ pounds",
    description:
      "A follow-up campaign that removed tens of millions of pounds of trash from oceans, rivers and beaches.",
  },
  {
    title: "Sight restored",
    metric: "1,000+ people",
    description:
      "Funded cataract surgeries that reversed preventable blindness for over a thousand recipients.",
  },
  {
    title: "Clean water",
    metric: "100+ wells",
    description:
      "Wells drilled across African communities, giving hundreds of thousands access to safe drinking water.",
  },
  {
    title: "Homes built",
    metric: "100 houses",
    description:
      "Houses constructed and handed to families in need across several countries.",
  },
  {
    title: "Food distributed",
    metric: "Millions of meals",
    description:
      "Beast Philanthropy's food bank operation distributes meals to families every single week.",
  },
] as const;

/** Shop teaser cards. */
export const shopItems = [
  {
    name: "Feastables Milk Chocolate",
    price: "$3.99",
    image: "/images/shop-chocolate.svg",
    href: "https://feastables.com",
    badge: "Bestseller",
  },
  {
    name: "Beast Classic Hoodie",
    price: "$59.99",
    image: "/images/shop-hoodie.svg",
    href: "https://shopmrbeast.com",
    badge: null,
  },
  {
    name: "Logo Tee — Black",
    price: "$29.99",
    image: "/images/shop-tee.svg",
    href: "https://shopmrbeast.com",
    badge: "New",
  },
  {
    name: "Beast Snapback",
    price: "$34.99",
    image: "/images/shop-cap.svg",
    href: "https://shopmrbeast.com",
    badge: null,
  },
] as const;

/**
 * FAQ — the master list.
 *
 * This block does the heaviest AEO/GEO lifting on the site: every answer opens
 * with a complete, self-contained sentence so an AI answer engine can lift a
 * single passage and cite it without needing the rest of the page. Keep that
 * pattern if you add entries.
 *
 * The home page renders only the first `HOME_FAQ_COUNT` and emits FAQPage
 * schema for exactly those; `/faq` renders and marks up the full list. Serving
 * the same question twice with identical markup on two URLs is a duplicate
 * signal, so the split is what keeps `/faq` a genuinely distinct page rather
 * than a copy of a home-page section.
 */
export const HOME_FAQ_COUNT = 6;

export const faqs = [
  {
    question: "Who is MrBeast?",
    answer:
      "MrBeast is Jimmy Donaldson, an American YouTuber and entrepreneur born on 7 May 1998 in Wichita, Kansas. He is the most-subscribed individual creator on YouTube and is known for large-budget challenge videos, giveaways and philanthropy.",
  },
  {
    question: "What is MrBeast's real name?",
    answer:
      "MrBeast's real name is James Stephen Donaldson, known as Jimmy Donaldson. He began uploading to YouTube in 2012 at the age of thirteen under the username MrBeast6000.",
  },
  {
    question: "How many subscribers does MrBeast have?",
    answer:
      "MrBeast's main YouTube channel has more than 400 million subscribers, making it the most-subscribed channel on the platform. The figure grows continuously, so check YouTube for the live count.",
  },
  {
    question: "What businesses does MrBeast own?",
    answer:
      "MrBeast's ventures include Feastables, a chocolate and snack brand; Beast Games, a large-scale competition series; MrBeast Lab, a collectibles line; and Beast Philanthropy, a non-profit that directs 100% of its profits to charitable work.",
  },
  {
    question: "Is MrBeast's philanthropy real?",
    answer:
      "Yes. Beast Philanthropy is a registered non-profit organisation that operates a food bank and funds community projects, and it publishes its work publicly. Campaigns such as #TeamTrees and #TeamSeas raised money that funded over twenty million trees planted and tens of millions of pounds of ocean waste removed.",
  },
  {
    question: "How does MrBeast make money if he gives so much away?",
    answer:
      "MrBeast earns from YouTube ad revenue, brand sponsorships, and his own product companies such as Feastables, and he reinvests the majority of that income directly back into producing bigger videos. The scale of the giveaways is what drives the viewership that funds them.",
  },
  {
    question: "Where can I watch MrBeast videos?",
    answer:
      "MrBeast videos are published free on YouTube across several channels, including the main channel, Beast Philanthropy, and dubbed channels in Spanish, Portuguese, Hindi, Arabic, French, Japanese and more.",
  },
  {
    question: "How do I get on a MrBeast video?",
    answer:
      "Casting for MrBeast videos is announced through his official YouTube community posts and verified social accounts, and applications open only for specific productions. Any site asking for a fee to enter is not an official channel.",
  },

  /* ---- Questions below appear only on /faq ---- */

  {
    question: "How old is MrBeast?",
    answer:
      "MrBeast was born on 7 May 1998, which makes him 28 years old in 2026. He was thirteen when he uploaded his first YouTube video in February 2012.",
  },
  {
    question: "Where is MrBeast from?",
    answer:
      "MrBeast was born in Wichita, Kansas, and grew up largely in Greenville, North Carolina, which is where he later based his production operation. He is American.",
  },
  {
    question: "How much is MrBeast worth?",
    answer:
      "Estimates of MrBeast's personal net worth vary widely, from roughly $500 million to over $1 billion, because he holds most of his wealth as equity in the private company Beast Industries rather than as cash. No exact figure is published, and any single number you see quoted is a third-party estimate.",
  },
  {
    question: "What is MrBeast's real name?",
    answer:
      "MrBeast's real name is James Stephen Donaldson, and he goes by Jimmy Donaldson. The name \"MrBeast\" comes from his original 2012 YouTube username, MrBeast6000.",
  },
  {
    question: "Is MrBeast the most subscribed YouTuber?",
    answer:
      "Yes. MrBeast's main channel is the most-subscribed channel on YouTube and he is the most-subscribed individual creator, ahead of corporate channels such as T-Series and Cocomelon. He passed T-Series for the top spot in 2024.",
  },
  {
    question: "How long does a MrBeast video take to make?",
    answer:
      "A single MrBeast video typically takes weeks to months from concept to publication, involving set construction, large casts and multiple camera crews. Production budgets for the biggest videos run into the millions of dollars, which is why uploads are spaced weeks apart rather than daily.",
  },
  {
    question: "What is Feastables?",
    answer:
      "Feastables is MrBeast's chocolate and snack brand, launched in 2022 and sold in major retailers across the United States and internationally. It is one of the businesses under Beast Industries and a significant part of how the video operation is funded.",
  },
  {
    question: "What is Beast Games?",
    answer:
      "Beast Games is MrBeast's large-scale physical competition series, which takes the format of his channel's last-to-leave challenges and scales it into full-length streaming television. It is his first major production made for a platform other than YouTube.",
  },
  {
    question: "Does MrBeast really give away the money?",
    answer:
      "Yes. Prizes shown in MrBeast videos are genuinely awarded to contestants, and the giveaways are a production cost rather than a marketing illusion. The scale of the prizes is what drives the viewership, and the advertising and sponsorship revenue that viewership generates is what funds the next video.",
  },
  {
    question: "How many YouTube channels does MrBeast have?",
    answer:
      "MrBeast operates several channels beyond the main one, including Beast Philanthropy, MrBeast Gaming, and a family of dubbed channels publishing his videos in Spanish, Portuguese, Hindi, Arabic, French, Japanese and other languages. The dubbed channels are how a large share of his international audience watches.",
  },
] as const;

/**
 * Net worth.
 *
 * >>> THESE ARE THIRD-PARTY ESTIMATES, NOT PUBLISHED ACCOUNTS. <<<
 * Jimmy Donaldson does not publish his personal finances, and reputable outlets
 * disagree by a factor of two or more. Presenting a single hard number as fact
 * would be wrong about a real person and is exactly the kind of unsourced
 * precision that gets a page demoted rather than cited. Keep the range, keep
 * the hedging language, and re-check `site.lastReviewed` when you touch this.
 */
export const netWorth = {
  low: "$500 million",
  high: "$1 billion+",
  /** Why the published numbers disagree so much. This is the actual answer. */
  reasons: [
    {
      title: "Almost nothing is taken out as cash",
      body: "The overwhelming majority of ad, sponsorship and brand revenue is reinvested straight back into the next video. Wealth that never leaves the business does not show up as personal income.",
    },
    {
      title: "The wealth is equity, not salary",
      body: "Most of it is a stake in Beast Industries, the private parent company behind the channels, Feastables and the rest. Private equity is only worth what the last funding round said it was worth.",
    },
    {
      title: "The company is valued far above the person",
      body: "Reported valuations for Beast Industries run several times higher than any estimate of Donaldson's personal net worth. Conflating the two is the single most common error in net-worth articles.",
    },
    {
      title: "Production costs are enormous",
      body: "Individual videos have carried budgets in the millions. High revenue with high burn produces a much smaller net figure than headline earnings suggest.",
    },
  ],
  /** Revenue streams, roughly ordered by reported significance. */
  streams: [
    {
      name: "YouTube ad revenue",
      body: "Billions of views across the main channel and the dubbed channels, monetised through YouTube's advertising share. The single largest and most predictable line.",
    },
    {
      name: "Brand sponsorships",
      body: "Integrations sold at a premium because of guaranteed reach. Historically these have funded a meaningful share of individual video budgets.",
    },
    {
      name: "Feastables",
      body: "A consumer packaged-goods business with retail distribution — the stream least dependent on YouTube's algorithm, and the reason the valuation is what it is.",
    },
    {
      name: "Beast Games and licensing",
      body: "Streaming production for a platform other than YouTube, plus collectibles through MrBeast Lab and merchandise.",
    },
  ],
} as const;

/**
 * Subscriber ranking, used by /best-youtuber.
 *
 * Rounded on purpose. These counts move every single day, so quoting them to
 * the nearest thousand would be false precision that is stale within hours.
 * `isCreator` separates individual creators from corporate media channels —
 * which is the distinction the "biggest YouTuber" question is really about.
 */
export const subscriberRanking = [
  {
    channel: "MrBeast",
    approxSubscribers: "440M+",
    kind: "Individual creator",
    isCreator: true,
    note: "Took the overall number-one spot from T-Series in 2024 and has held it since.",
  },
  {
    channel: "T-Series",
    approxSubscribers: "300M+",
    kind: "Music label",
    isCreator: false,
    note: "An Indian music and film label uploading at enormous volume — a company, not a creator.",
  },
  {
    channel: "Cocomelon",
    approxSubscribers: "190M+",
    kind: "Children's studio",
    isCreator: false,
    note: "Animated nursery-rhyme content with exceptionally high repeat watch time.",
  },
  {
    channel: "PewDiePie",
    approxSubscribers: "110M+",
    kind: "Individual creator",
    isCreator: true,
    note: "Held the most-subscribed-creator title for most of the 2010s.",
  },
] as const;

/** Alternate-language / secondary channels. */
export const channels = [
  "MrBeast",
  "Beast Philanthropy",
  "MrBeast Gaming",
  "MrBeast en Español",
  "MrBeast em Português",
  "MrBeast in Hindi",
  "MrBeast in Arabic",
  "MrBeast en Français",
] as const;

/**
 * Site-wide keyword set.
 *
 * Google has ignored the `keywords` meta tag for well over a decade, so this
 * earns its place for two other reasons: Bing and several AI answer engines
 * still read it, and keeping the target list in code is what stops the page
 * copy from quietly drifting off-topic. Both spellings of the brand are here
 * because real search traffic splits between "MrBeast" and "Mr Beast".
 *
 * Per-page clusters live in `lib/pages.ts` — this is only the shared trunk.
 */
export const keywords = [
  "MrBeast",
  "Mr Beast",
  "Jimmy Donaldson",
  "Jimmy MrBeast",
  "MrBeast real name",
  "MrBeast videos",
  "MrBeast net worth",
  "best YouTuber",
  "best YouTuber in the world",
  "most subscribed YouTuber",
  "biggest YouTuber",
  "Feastables",
  "Beast Games",
  "Beast Philanthropy",
  "MrBeast challenges",
  "MrBeast giveaway",
  "TeamTrees",
  "TeamSeas",
  "MrBeast merch",
] as const;
