import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph } from "@/lib/schema";
import { getPage } from "@/lib/pages";
import { channels, site } from "@/lib/site";

const page = getPage("who-is-mrbeast");

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  keywords: [...page.keywords],
  alternates: { canonical: page.path },
  openGraph: {
    type: "profile",
    url: page.path,
    title: page.title,
    description: page.description,
  },
};

/**
 * Career timeline.
 *
 * A dated list is the shape a crawler can parse into a sequence and an answer
 * engine can quote a single row from — much more extractable than the same
 * facts buried in flowing paragraphs.
 */
const timeline = [
  {
    year: "2012",
    title: "First upload, aged 13",
    body: "Jimmy Donaldson posts his first video under the username MrBeast6000, mostly Let's Plays and commentary on other YouTubers' earnings.",
  },
  {
    year: "2013–2016",
    title: "The study years",
    body: "Years of low-view uploads spent analysing what actually makes a video spread — thumbnails, titles, retention — rather than chasing a format.",
  },
  {
    year: "2017",
    title: "Counting to 100,000",
    body: "A 40-hour endurance video becomes his breakout hit and establishes the single-idea, high-commitment format the channel still runs on.",
  },
  {
    year: "2018–2020",
    title: "The giveaway era",
    body: "Challenge and giveaway videos scale up sharply, funded by reinvesting nearly all revenue back into production budgets.",
  },
  {
    year: "2019–2021",
    title: "#TeamTrees and #TeamSeas",
    body: "Two creator-led fundraisers with Mark Rober fund over twenty million trees planted and tens of millions of pounds of waste removed.",
  },
  {
    year: "2021",
    title: "Squid Game in real life",
    body: "A full recreation of the show's arena becomes one of the most-watched videos on the platform and marks a new production ceiling.",
  },
  {
    year: "2022–present",
    title: "Beyond YouTube",
    body: "Feastables launches into retail, Beast Games takes the format to streaming television, and Beast Philanthropy operates as a standalone non-profit.",
  },
] as const;

export default function WhoIsMrBeastPage() {
  return (
    <>
      <SchemaGraph pageKey="who-is-mrbeast" />

      <PageHero page={page} eyebrow="Identity" answerLabel="Short answer" />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="prose">
          <h2 id="real-name">MrBeast&rsquo;s real name</h2>
          <p>
            MrBeast&rsquo;s real name is{" "}
            <strong>James Stephen &ldquo;Jimmy&rdquo; Donaldson</strong>. He was born on{" "}
            <strong>7 May 1998</strong> in <strong>{site.birthPlace}</strong>, and grew up
            in Greenville, North Carolina. He is American, and he is 28 years old in 2026.
          </p>
          <p>
            The name &ldquo;MrBeast&rdquo; comes from his original YouTube username,
            MrBeast6000, which he registered in February 2012 at the age of thirteen. The
            channel has been the same account ever since — it was never rebranded from
            anything else.
          </p>

          <h2 id="how-he-started">How he started on YouTube</h2>
          <p>
            He uploaded for roughly five years before anything worked. Those years were
            not idle: he spent them dissecting other channels&rsquo; performance, testing
            thumbnails and titles, and working out which variables actually moved views.
            That analytical habit — treating the platform as a system to be understood
            rather than a stage to perform on — is the thing that separates his early
            career from most creators who started at the same time.
          </p>
          <p>
            The breakthrough was an endurance video: counting to 100,000 out loud, filmed
            over roughly forty hours. It established the pattern every later video
            follows — one idea, stated plainly enough to fit in a thumbnail, executed at a
            scale nobody else would attempt.
          </p>

          <h2 id="timeline">Career timeline</h2>
        </div>

        {/* Timeline as a real <ol> — an ordered sequence, marked up as one. */}
        <ol className="mt-8 space-y-0">
          {timeline.map((entry, index) => (
            <li key={entry.year} className="relative flex gap-5 pb-8 last:pb-0">
              {/* Connector rail */}
              {index < timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[0.9375rem] top-8 h-full w-px bg-line"
                />
              ) : null}

              <span
                aria-hidden="true"
                className="relative z-10 mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-brand-400/40 bg-surface text-xs font-black text-brand-400"
              >
                {index + 1}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-400">
                  {entry.year}
                </p>
                <h3 className="mt-1 text-lg font-bold tracking-tight">{entry.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  {entry.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="prose">
          <h2 id="channels">His channels</h2>
          <p>
            The main channel is only part of the operation. Beast Philanthropy funds
            charitable work, MrBeast Gaming covers games, and a set of dubbed channels
            republish the main videos in other languages — which is a large share of why
            the total subscriber figure is what it is.
          </p>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2">
          {channels.map((channel) => (
            <li
              key={channel}
              className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold"
            >
              {channel}
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2 id="what-hes-known-for">What he is known for</h2>
          <p>
            Three things, in roughly this order: the scale of the videos, the amount of
            money given away in them, and the philanthropy that runs alongside them. The
            business model behind all three is unusual and deliberate — he takes very
            little out as personal income and pushes it back into production instead,
            which is also{" "}
            <Link href="/net-worth">
              why estimates of his net worth vary so wildly
            </Link>
            .
          </p>
        </div>
      </article>

      <RelatedPages current="who-is-mrbeast" />
    </>
  );
}
