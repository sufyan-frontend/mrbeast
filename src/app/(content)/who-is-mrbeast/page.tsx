import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/pages";
import { channels, faqs, site } from "@/lib/site";

export const metadata = pageMetadata("who-is-mrbeast");

const page = getPage("who-is-mrbeast");

/** Definition list of entity attributes — mirrors the Person node in the graph. */
const facts = [
  { term: "Full name", value: "James Stephen Donaldson" },
  { term: "Known as", value: "Jimmy Donaldson, MrBeast" },
  { term: "Born", value: "7 May 1998" },
  { term: "Age", value: "28" },
  { term: "Birthplace", value: site.birthPlace },
  { term: "Nationality", value: site.nationality },
  { term: "First upload", value: "February 2012, aged 13" },
  { term: "Original username", value: "MrBeast6000" },
  { term: "Occupation", value: "YouTuber, entrepreneur, philanthropist" },
] as const;

const timeline = [
  {
    year: "2012",
    title: "First upload, aged 13",
    body: "Starts posting as MrBeast6000 — Let's Plays, commentary and videos estimating other creators' earnings. Almost nobody watches.",
  },
  {
    year: "2015–2016",
    title: "Studying the algorithm",
    body: "Spends years dissecting what makes a video spread: thumbnails, titles, retention curves. The output is unremarkable; the research is not.",
  },
  {
    year: "2017",
    title: "Counting to 100,000",
    body: "A 40-hour endurance video breaks through. The lesson he takes from it is that a single absurd, instantly-explainable idea beats a good one that needs setup.",
  },
  {
    year: "2018–2020",
    title: "The giveaway format",
    body: "Prizes scale from hundreds to hundreds of thousands of dollars. Revenue is pushed straight back into production rather than taken out.",
  },
  {
    year: "2021",
    title: "Squid Game in real life",
    body: "A full recreation of the show's sets for 456 contestants — at the time the largest production he had attempted, and the video that made him globally famous.",
  },
  {
    year: "2022",
    title: "Feastables launches",
    body: "A chocolate brand of his own, and the first serious revenue stream not dependent on YouTube's algorithm.",
  },
  {
    year: "2024",
    title: "Most-subscribed channel on YouTube",
    body: "Passes T-Series to take the overall number-one spot, having already been the most-subscribed individual creator.",
  },
  {
    year: "2025 onward",
    title: "Beast Industries",
    body: "The operation is consolidated into a company spanning the channels, Feastables, Beast Games and MrBeast Lab.",
  },
] as const;

export default function WhoIsMrBeastPage() {
  return (
    <>
      {/* ProfilePage + the shared Person entity, plus the two identity questions
          that this page — not the home page — is the canonical answer for. */}
      <SchemaGraph
        pageKey="who-is-mrbeast"
        faqEntries={faqs.filter((faq) =>
          [
            "What is MrBeast's real name?",
            "How old is MrBeast?",
            "Where is MrBeast from?",
          ].includes(faq.question),
        )}
      />

      <PageHero page={page} eyebrow="Biography" />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="prose">
          <h2 id="real-name">What is MrBeast&rsquo;s real name?</h2>
          <p>
            MrBeast&rsquo;s real name is{" "}
            <strong>James Stephen &ldquo;Jimmy&rdquo; Donaldson</strong>. He goes by
            Jimmy. The stage name comes from his original 2012 YouTube username,
            MrBeast6000 — chosen at thirteen, kept because by the time it mattered it
            was already the brand.
          </p>

          <h2 id="early-years">Early years</h2>
          <p>
            Donaldson was born on 7 May 1998 in Wichita, Kansas, and grew up largely in
            Greenville, North Carolina — which is where he later based the production
            operation rather than moving it to Los Angeles. He uploaded his first video
            in February 2012, aged thirteen.
          </p>
          <p>
            The first five years produced almost nothing. What they did produce was an
            unusual amount of study: he spent them picking apart why some videos spread
            and others don&rsquo;t — thumbnails, titles, the exact second viewers leave
            — while his own channel sat in obscurity. That research, not a lucky video,
            is the part of the story that actually explains what came next.
          </p>

          <h2 id="breakthrough">The breakthrough and the format</h2>
          <p>
            The turn came in 2017 with a 40-hour video of him counting to 100,000. It
            was an endurance stunt whose entire premise fit in the title, and it worked.
            Everything since has been a variation on that principle: one idea, legible
            from the thumbnail alone, executed at a scale nobody else will pay for.
          </p>
          <p>
            The formats that came out of it are now a genre —{" "}
            <Link href="/videos">last-to-leave competitions, versus comparisons,
            survival challenges and philanthropy films</Link>. Each has a clear stake, a
            countable prize, and no explanation required.
          </p>

          <h2 id="money">How the money works</h2>
          <p>
            The economics are deliberate and unusual: rather than taking profit out,
            Donaldson reinvests the overwhelming majority of ad and sponsorship revenue
            straight back into the next production. Bigger budget produces a bigger
            audience, which produces a bigger budget. That loop is the whole strategy,
            and it is also why{" "}
            <Link href="/net-worth">estimates of his net worth vary so wildly</Link> —
            most of the value never leaves the business.
          </p>

          <h2 id="businesses">The businesses</h2>
          <p>
            Alongside the channels he has built a set of real companies:{" "}
            <strong>Feastables</strong> in snacks, <strong>Beast Games</strong> in
            television, and <strong>MrBeast Lab</strong> in collectibles. Separately,{" "}
            <strong>Beast Philanthropy</strong> operates as a non-profit, running a food
            bank and funding community projects with 100% of its profits.
          </p>

          <h2 id="channels">Channels</h2>
          <p>
            A large share of the audience watches in a language other than English,
            through a family of dubbed channels rather than the main one:
          </p>
          <ul className="not-prose flex list-none flex-wrap gap-2 pl-0">
            {channels.map((channel) => (
              <li
                key={channel}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-foreground"
              >
                {channel}
              </li>
            ))}
          </ul>
        </div>

        {/* Timeline */}
        <section aria-labelledby="timeline-heading" className="mt-16">
          <h2
            id="timeline-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            MrBeast: a timeline
          </h2>

          <ol className="mt-8 space-y-0">
            {timeline.map((entry) => (
              <li
                key={entry.year}
                className="relative border-l border-line pb-8 pl-6 last:pb-0 sm:pl-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-brand"
                />
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                  {entry.year}
                </p>
                <h3 className="mt-1.5 text-base font-bold tracking-tight sm:text-lg">
                  {entry.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  {entry.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Quick facts */}
        <section aria-labelledby="facts-heading" className="mt-16">
          <h2 id="facts-heading" className="text-2xl font-black tracking-tight sm:text-3xl">
            Quick facts
          </h2>

          <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-surface p-5 sm:p-7">
            {facts.map((fact) => (
              <div key={fact.term} className="flex flex-col gap-1 py-3.5 sm:flex-row sm:gap-6">
                <dt className="shrink-0 text-sm font-bold text-muted sm:w-44">
                  {fact.term}
                </dt>
                <dd className="text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </article>

      <RelatedPages current="who-is-mrbeast" />
    </>
  );
}
