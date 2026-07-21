import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/pages";
import { faqs, subscriberRanking } from "@/lib/site";

export const metadata = pageMetadata("best-youtuber");

const page = getPage("best-youtuber");

/**
 * The measures, each answered separately.
 *
 * "Best YouTuber" is a subjective query, and the useful thing to do with a
 * subjective query is to decompose it into the objective ones underneath. That
 * is also what gets cited: an answer engine can lift a single row here and be
 * correct, which it cannot do with a page that just declares a winner.
 */
const measures = [
  {
    measure: "Subscribers",
    winner: "MrBeast",
    body: "The most-subscribed channel on YouTube overall, and the most-subscribed individual creator. This is the only measure on which the answer is unambiguous.",
  },
  {
    measure: "Total views",
    winner: "T-Series",
    body: "Decades of music catalogue uploaded at enormous volume still outpaces any single creator on lifetime views. Volume of uploads, not popularity per video.",
  },
  {
    measure: "Production scale",
    winner: "MrBeast",
    body: "Per-video budgets in the millions, with set builds and casts closer to television than to YouTube. Nobody else spends at this level on the platform.",
  },
  {
    measure: "Watch time per viewer",
    winner: "Cocomelon and children's channels",
    body: "Repeat viewing by small children produces watch-time figures no adult-facing channel can match. A quirk of the audience, not a quality signal.",
  },
  {
    measure: "Revenue per video",
    winner: "Depends heavily on niche",
    body: "Finance, tech and business channels command far higher advertising rates per thousand views than entertainment. A channel a fraction of the size can out-earn one per view.",
  },
  {
    measure: "Influence within a niche",
    winner: "Not MrBeast",
    body: "For cooking, repair, education or games, the creators people actually trust are specialists with far smaller audiences. Reach and authority are different things.",
  },
] as const;

export default function BestYouTuberPage() {
  return (
    <>
      <SchemaGraph
        pageKey="best-youtuber"
        faqEntries={faqs.filter((faq) =>
          [
            "Is MrBeast the most subscribed YouTuber?",
            "How many subscribers does MrBeast have?",
            "How many YouTube channels does MrBeast have?",
          ].includes(faq.question),
        )}
      />

      <PageHero page={page} eyebrow="Comparison" answerLabel="Short answer" />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section aria-labelledby="ranking-heading">
          <h2
            id="ranking-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            Most-subscribed channels, compared
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Figures are rounded on purpose. Subscriber counts move every day, so a
            number quoted to the thousand would be wrong within hours — check YouTube
            for the live count.
          </p>

          {/*
            A real <table> with proper scope attributes, not a grid of divs.
            Comparison data in a semantic table is directly extractable by both
            screen readers and answer engines. The wrapper scrolls horizontally
            so a four-column table cannot push the page wide on a phone.
          */}
          <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[38rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                YouTube channels ranked by approximate subscriber count
              </caption>
              <thead>
                <tr className="border-b border-line bg-surface">
                  <th scope="col" className="px-4 py-3.5 font-bold sm:px-5">
                    Channel
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold sm:px-5">
                    Subscribers
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold sm:px-5">
                    Type
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold sm:px-5">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {subscriberRanking.map((row) => (
                  <tr key={row.channel} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="px-4 py-4 font-bold text-foreground sm:px-5"
                    >
                      {row.channel}
                    </th>
                    <td className="px-4 py-4 font-black tabular-nums text-brand-400 sm:px-5">
                      {row.approxSubscribers}
                    </td>
                    <td className="px-4 py-4 text-muted sm:px-5">
                      <span
                        className={`inline-block whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-semibold ${
                          row.isCreator
                            ? "border-brand-400/40 text-brand-400"
                            : "border-line text-muted"
                        }`}
                      >
                        {row.kind}
                      </span>
                    </td>
                    <td className="px-4 py-4 leading-relaxed text-muted sm:px-5">
                      {row.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="prose mt-16">
          <h2 id="biggest-vs-best">&ldquo;Biggest&rdquo; and &ldquo;best&rdquo; are different questions</h2>
          <p>
            Most articles answering this one quietly swap the two. They are not the
            same. <strong>Biggest</strong> is a measurement, and it has an answer:
            MrBeast, on subscribers. <strong>Best</strong> is a judgement, and the
            honest response is to say what you are measuring first.
          </p>
          <p>
            There is also a category question underneath. T-Series is a music and film
            label; Cocomelon is an animation studio. Neither is a person making videos.
            When people ask who the biggest YouTuber is, they usually mean the biggest{" "}
            <em>creator</em> — and on that reading MrBeast has been ahead for years, and
            took the overall top spot in 2024 as well.
          </p>

          <h2 id="measures">Six measures, six answers</h2>
        </div>

        <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-surface">
          {measures.map((row) => (
            <div key={row.measure} className="p-5 sm:p-6">
              <dt className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-base font-bold tracking-tight sm:text-lg">
                  {row.measure}
                </span>
                <span className="text-sm font-bold text-brand-400">
                  → {row.winner}
                </span>
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {row.body}
              </dd>
            </div>
          ))}
        </dl>

        <div className="prose mt-16">
          <h2 id="verdict">So is MrBeast the best YouTuber?</h2>
          <p>
            On reach, scale and ambition — the things YouTube itself rewards — nobody is
            close. He has more subscribers than any other channel, spends more per video
            than anyone on the platform, and has taken the format further into
            television and consumer products than any creator before him.
          </p>
          <p>
            On &ldquo;best&rdquo; in the sense most viewers actually mean it — the
            creator whose videos you would rather watch — the answer is personal and
            always will be. A channel with two million subscribers in a subject you care
            about will beat four hundred million subscribers in one you don&rsquo;t.
          </p>
          <p>
            The defensible version of the claim is the narrow one:{" "}
            <strong>MrBeast is the most-subscribed creator on YouTube, and the largest
            entertainment operation on the platform.</strong> Everything past that is
            taste. More on{" "}
            <Link href="/who-is-mrbeast">how he got there</Link>, and{" "}
            <Link href="/net-worth">what it is worth</Link>.
          </p>
        </div>
      </div>

      <RelatedPages current="best-youtuber" />
    </>
  );
}
