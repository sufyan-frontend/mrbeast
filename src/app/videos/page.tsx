import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { Videos } from "@/components/videos";
import { SchemaGraph, videoListNode } from "@/lib/schema";
import { getPage } from "@/lib/pages";

const page = getPage("videos");

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

/**
 * The repeatable formats.
 *
 * This is the part a listicle leaves out, and it is the reason this page can
 * rank for "best MrBeast videos" against a hundred thin roundups: it explains
 * the mechanism rather than just naming titles.
 */
const formats = [
  {
    name: "Endurance",
    hook: "Can a person survive X?",
    body: "One participant, one uncomfortable constraint, and a clock. The tension is entirely in whether someone can keep going — no editing trick required.",
    examples: "100 hours underwater · 50 hours buried alive · 7 days at sea",
  },
  {
    name: "Versus",
    hook: "$1 vs $1,000,000",
    body: "The cheapest version of a thing against the most expensive. It works because the viewer already has an opinion about which is worth it before the video starts.",
    examples: "$1 vs $1,000,000 hotel room · $1 vs $500,000 plane ticket",
  },
  {
    name: "Last to leave",
    hook: "Last one standing wins the prize",
    body: "A group, a boundary, and a prize that grows more absurd the longer people stay. Elimination gives it a natural structure with no narration needed.",
    examples: "Last to leave the circle · Last to take hand off the jet",
  },
  {
    name: "Competition at scale",
    hook: "100 people fight for $500,000",
    body: "A large cast filtered down through rounds. Expensive to produce, but it generates dozens of small stories inside one video.",
    examples: "Ages 1–100 · $456,000 Squid Game in real life",
  },
  {
    name: "Philanthropy",
    hook: "I gave away something life-changing",
    body: "The giving is the video, not a postscript to it. These consistently outperform on watch time because the payoff is emotional rather than numerical.",
    examples: "1,000 blind people see · 100 wells in Africa · 100 houses built",
  },
] as const;

export default function VideosPage() {
  return (
    <>
      <SchemaGraph pageKey="videos" extraNodes={[videoListNode(page.path)]} />

      <PageHero page={page} eyebrow="Videos" answerLabel="In short" />

      {/* Reuses the same card grid as the home page — one component, one set of
          image sizes and alt-text rules to maintain. */}
      <Videos />

      <article className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="prose">
          <h2 id="formats">The five formats almost every video uses</h2>
          <p>
            The catalogue looks endlessly varied, but nearly all of it reduces to a
            handful of repeatable shapes. Recognising them is the fastest way to
            understand why the channel works.
          </p>
        </div>

        <ul className="mt-8 space-y-4">
          {formats.map((format) => (
            <li
              key={format.name}
              className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg font-black tracking-tight">{format.name}</h3>
                <p className="text-sm font-semibold text-brand-400">
                  &ldquo;{format.hook}&rdquo;
                </p>
              </div>

              <p className="mt-2.5 text-sm leading-relaxed text-muted sm:text-base">
                {format.body}
              </p>

              <p className="mt-3 border-t border-line pt-3 text-xs text-muted">
                <span className="font-bold uppercase tracking-[0.14em]">Examples</span>{" "}
                &middot; {format.examples}
              </p>
            </li>
          ))}
        </ul>

        <div className="prose">
          <h2 id="where-to-watch">Where to watch them</h2>
          <p>
            Every video is free on YouTube — there is no paywall, subscription or app. The
            main channel carries the flagship uploads, Beast Philanthropy carries the
            charitable work, and the dubbed channels republish the same videos in Spanish,
            Portuguese, Hindi, Arabic, French, Japanese and other languages.
          </p>
          <p>
            Anything asking you to pay to watch, or to enter a &ldquo;casting call&rdquo;
            for a fee, is not official. Real casting is announced only through his verified
            accounts and YouTube community posts — see{" "}
            <Link href="/faq">the FAQ</Link> for how that actually works.
          </p>

          <h2 id="why-they-cost-so-much">Why the budgets are so large</h2>
          <p>
            Individual videos have carried budgets in the millions. That is possible
            because nearly all revenue is reinvested rather than taken out, which is also{" "}
            <Link href="/net-worth">
              why his personal net worth is so hard to pin down
            </Link>
            . The loop is the strategy: bigger budget produces a bigger audience, which
            funds a bigger budget.
          </p>
        </div>
      </article>

      <RelatedPages current="videos" />
    </>
  );
}
