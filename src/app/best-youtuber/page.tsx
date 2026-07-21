import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph } from "@/lib/schema";
import { getPage, absoluteUrl } from "@/lib/pages";
import { subscriberRanking } from "@/lib/site";

const page = getPage("best-youtuber");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: [...page.keywords],
  alternates: { canonical: page.path },
  openGraph: {
    url: page.path,
    title: page.title,
    description: page.description,
  },
};

/** The comparison table, marked up as an ItemList in the graph. */
const rankingNode = {
  "@type": "ItemList",
  "@id": `${absoluteUrl(page.path)}#ranking`,
  name: "Most-subscribed YouTube channels",
  description:
    "YouTube channels by approximate subscriber count, distinguishing individual creators from corporate media channels.",
  numberOfItems: subscriberRanking.length,
  itemListOrder: "https://schema.org/ItemListOrderDescending",
  itemListElement: subscriberRanking.map((entry, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: entry.channel,
    description: `${entry.approxSubscribers} subscribers — ${entry.kind}. ${entry.note}`,
  })),
};

/** The measures under which a different creator wins. */
const measures = [
  {
    measure: "Subscribers",
    winner: "MrBeast",
    body: "The most-subscribed channel on YouTube overall, and the most-subscribed individual creator by a wide margin.",
  },
  {
    measure: "Total watch time",
    winner: "Cocomelon and children's studios",
    body: "Nursery-rhyme content is rewatched on loop by the same viewers, which produces watch-time figures no challenge channel competes with.",
  },
  {
    measure: "Upload volume",
    winner: "T-Series",
    body: "A music and film label publishing at industrial scale — hundreds of uploads where MrBeast publishes a handful a year.",
  },
  {
    measure: "Production budget per video",
    winner: "MrBeast",
    body: "Individual videos have carried budgets in the millions, which is far beyond typical creator economics.",
  },
  {
    measure: "Influence within a niche",
    winner: "Varies entirely",
    body: "Education, tech review, cooking and gaming each have creators whose authority within their field exceeds any generalist's.",
  },
] as const;

export default function BestYoutuberPage() {
  return (
    <>
      <SchemaGraph pageKey="best-youtuber" extraNodes={[rankingNode]} />

      <PageHero page={page} eyebrow="Comparison" answerLabel="The honest answer" />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="prose">
          <h2 id="most-subscribed">The most-subscribed channels</h2>
          <p>
            &ldquo;Biggest&rdquo; is a measurable question, so start there. These counts
            are rounded on purpose — they move daily, and quoting them to the nearest
            thousand would be false precision that is stale within hours.
          </p>
        </div>

        {/*
          A real <table> with scope'd headers and a caption. Crawlers extract
          tabular data reliably; a grid of <div>s carries none of the same
          row/column relationships, and screen readers can't navigate it.
        */}
        <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-125 border-collapse text-left">
            <caption className="sr-only">
              YouTube channels by approximate subscriber count
            </caption>

            <thead className="bg-surface-2">
              <tr>
                <th scope="col" className="px-4 py-3.5 text-xs font-black uppercase tracking-[0.12em]">
                  #
                </th>
                <th scope="col" className="px-4 py-3.5 text-xs font-black uppercase tracking-[0.12em]">
                  Channel
                </th>
                <th scope="col" className="px-4 py-3.5 text-xs font-black uppercase tracking-[0.12em]">
                  Subscribers
                </th>
                <th scope="col" className="px-4 py-3.5 text-xs font-black uppercase tracking-[0.12em]">
                  Type
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line bg-surface/40">
              {subscriberRanking.map((entry, index) => (
                <tr key={entry.channel} className={entry.isCreator ? "bg-brand/5" : undefined}>
                  <td className="px-4 py-4 text-sm font-black tabular-nums text-muted">
                    {index + 1}
                  </td>

                  <th scope="row" className="px-4 py-4 font-bold">
                    {entry.channel}
                    <span className="mt-1 block text-xs font-normal leading-relaxed text-muted">
                      {entry.note}
                    </span>
                  </th>

                  <td className="whitespace-nowrap px-4 py-4 text-sm font-black tabular-nums">
                    {entry.approxSubscribers}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${
                        entry.isCreator
                          ? "bg-brand/15 text-brand-400"
                          : "bg-white/5 text-muted"
                      }`}
                    >
                      {entry.kind}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted">
          Counts are rounded and approximate. Check YouTube for live figures.
        </p>

        <div className="prose">
          <h2 id="creator-vs-company">Creator or company — the distinction that matters</h2>
          <p>
            Most &ldquo;biggest YouTuber&rdquo; arguments are really an argument about this
            one point. T-Series is an Indian music and film label; Cocomelon is an
            animation studio. Both are companies with staff uploading at volume. MrBeast
            and PewDiePie are individual creators whose channels are built around a person.
          </p>
          <p>
            Comparing a person to a record label tells you very little. Restricted to
            individual creators, the ranking is unambiguous: MrBeast is first, and took the
            overall number-one spot from T-Series in 2024.
          </p>

          <h2 id="best-vs-biggest">&ldquo;Best&rdquo; is a different question</h2>
          <p>
            Biggest is countable. Best depends entirely on what you decide to measure — and
            under several reasonable measures, someone else wins.
          </p>
        </div>

        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {measures.map((item) => (
            <li key={item.measure} className="p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-bold tracking-tight sm:text-lg">
                  {item.measure}
                </h3>
                <p className="text-sm font-bold text-brand-400">{item.winner}</p>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2 id="verdict">So is he the best?</h2>
          <p>
            On reach, scale and production ambition, there is no serious competition — and
            the gap is widening rather than closing. On craft within a specialism, on
            watch time, or on how much a creator has shaped a particular community, the
            answer is somewhere else entirely.
          </p>
          <p>
            If what you actually want is the work rather than the ranking, start with{" "}
            <Link href="/videos">the videos and the formats they use</Link>.
          </p>
        </div>
      </article>

      <RelatedPages current="best-youtuber" />
    </>
  );
}
