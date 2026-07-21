import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph, netWorthQaNode } from "@/lib/schema";
import { getPage } from "@/lib/pages";
import { netWorth, site } from "@/lib/site";

const page = getPage("net-worth");

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

export default function NetWorthPage() {
  return (
    <>
      <SchemaGraph pageKey="net-worth" extraNodes={[netWorthQaNode()]} />

      <PageHero page={page} eyebrow="Net worth" answerLabel="The short answer" />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/*
          The range is presented as a range, prominently, because that is what
          the sources actually support. A single confident number here would be
          the most clickable and least honest thing on the page.
        */}
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-400">
            Reported estimate range
          </h2>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span className="text-3xl font-black tracking-tight sm:text-5xl">
              {netWorth.low}
            </span>
            <span aria-hidden="true" className="text-2xl font-black text-muted sm:text-3xl">
              —
            </span>
            <span className="text-3xl font-black tracking-tight sm:text-5xl">
              {netWorth.high}
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            This is a <strong className="text-foreground">range of third-party
            estimates</strong>, not a published or audited figure. Jimmy Donaldson has
            never released his personal finances, and no outlet has access to them. Treat
            any article quoting an exact number to the nearest million as guesswork
            dressed up as reporting.
          </p>
        </div>

        <div className="prose">
          <h2 id="why-estimates-disagree">Why the published estimates disagree so much</h2>
          <p>
            A spread from half a billion to over a billion is not sloppiness — it reflects
            four genuine structural facts about how the money is held and moved.
          </p>
        </div>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {netWorth.reasons.map((reason, index) => (
            <li
              key={reason.title}
              className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              <span
                aria-hidden="true"
                className="text-xs font-black tabular-nums text-brand-400"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-base font-bold leading-snug tracking-tight sm:text-lg">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{reason.body}</p>
            </li>
          ))}
        </ol>

        <div className="prose">
          <h2 id="where-the-money-comes-from">Where the money actually comes from</h2>
          <p>
            Four streams, roughly in order of reported significance. Note that only the
            first is dependent on YouTube itself — the diversification away from it is the
            whole strategic point of the last two.
          </p>
        </div>

        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {netWorth.streams.map((stream) => (
            <li key={stream.name} className="p-5 sm:p-6">
              <h3 className="text-base font-bold tracking-tight sm:text-lg">
                {stream.name}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{stream.body}</p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2 id="person-vs-company">The person is not the company</h2>
          <p>
            This is the single most common error in net-worth articles, and it is worth
            being precise about. <strong>Beast Industries</strong> is the private parent
            company behind the channels, Feastables and the rest. Reported valuations for
            that company run several times higher than any estimate of Donaldson&rsquo;s
            personal fortune.
          </p>
          <p>
            He owns a large stake in it, but a stake in a private company is not cash, and
            a valuation is not a bank balance — it is whatever the most recent funding
            round implied. Headlines that quote the company&rsquo;s valuation as
            &ldquo;MrBeast&rsquo;s net worth&rdquo; are comparing two different things.
          </p>

          <h2 id="how-to-read-this">How to read any net-worth figure</h2>
          <p>
            Ask three questions of any source: does it distinguish personal wealth from
            company valuation, does it say what the estimate is based on, and does it give
            a range rather than a single number? Very few do all three. The facts on this
            page were last reviewed on{" "}
            <time dateTime={site.lastReviewed}>
              {new Date(site.lastReviewed).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </time>
            .
          </p>
          <p>
            For the background on how the business got here, see{" "}
            <Link href="/who-is-mrbeast">who MrBeast is and how he started</Link>.
          </p>
        </div>
      </article>

      <RelatedPages current="net-worth" />
    </>
  );
}
