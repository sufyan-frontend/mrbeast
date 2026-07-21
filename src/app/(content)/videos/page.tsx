import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { RelatedPages } from "@/components/related-pages";
import { SchemaGraph, videoListNode } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { getPage } from "@/lib/pages";
import { videos, type Video } from "@/lib/site";

export const metadata = pageMetadata("videos");

const page = getPage("videos");

/**
 * The formats, named.
 *
 * This section is why `/videos` is a page and not just a grid of links: it
 * answers the question behind the query ("what are MrBeast videos actually
 * like?") rather than only listing titles. Query-behind-the-query coverage is
 * what earns a citation over a bare listing page.
 */
const formats = [
  {
    name: "Last to leave",
    premise: "Whoever stays longest wins.",
    body: "A single elimination rule, no scoring to explain, and a clock the audience can feel. The cheapest possible premise to communicate and the hardest to stop watching.",
  },
  {
    name: "$1 vs $1,000,000",
    premise: "The cheapest version against the most expensive.",
    body: "A comparison ladder — hotels, flights, meals, cars. The entire idea is legible from the thumbnail, which is exactly the point.",
  },
  {
    name: "Endurance",
    premise: "Survive something for an absurd length of time.",
    body: "Buried alive, stranded at sea, 100 hours underwater. The stake is time and discomfort rather than money, which makes the prize feel earned.",
  },
  {
    name: "Recreation",
    premise: "Rebuild something famous, for real.",
    body: "Squid Game and Willy Wonka's factory being the largest. Borrows a premise the audience already understands and spends the budget on execution.",
  },
  {
    name: "Philanthropy",
    premise: "Fix something expensive for people who can't.",
    body: "Cataract surgeries, wells, houses. These sit on Beast Philanthropy as well as the main channel and are the least algorithmic thing on it.",
  },
  {
    name: "Ages 1–100",
    premise: "One contestant per age, one prize.",
    body: "A cast structure rather than a challenge — the format supplies the drama before any rule is introduced.",
  },
] as const;

function posterFor(video: Video) {
  return video.youtubeId
    ? `https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`
    : video.poster;
}

function hrefFor(video: Video) {
  return video.youtubeId
    ? `https://www.youtube.com/watch?v=${video.youtubeId}`
    : "https://www.youtube.com/@MrBeast";
}

export default function VideosPage() {
  return (
    <>
      {/* CollectionPage + the ItemList of featured videos. No VideoObject —
          that requires a real uploadDate and contentUrl per video, and
          inventing them would be structured-data spam. */}
      <SchemaGraph pageKey="videos" extraNodes={[videoListNode(page.path)]} />

      <PageHero page={page} eyebrow="Videos" answerLabel="In short" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section aria-labelledby="featured-heading">
          <h2
            id="featured-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            Featured videos
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Six of the most-watched, one per format. Every one is free on YouTube — this
            site hosts no video and earns nothing from these links.
          </p>

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <li key={video.title}>
                <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand/10">
                  <a
                    href={hrefFor(video)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block focus-visible:outline-offset-[-3px]"
                  >
                    {/* Fixed aspect ratio reserves the space up front — no CLS. */}
                    <div className="relative aspect-video overflow-hidden bg-surface-2">
                      <Image
                        src={posterFor(video)}
                        alt={`Thumbnail for the video ${video.title}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-brand-400 backdrop-blur-sm">
                        {video.category}
                      </span>
                      {video.duration ? (
                        <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 text-xs font-bold tabular-nums text-white">
                          {video.duration}
                        </span>
                      ) : null}
                    </div>

                    <div className="p-5">
                      <h3 className="text-balance text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-brand-400">
                        {video.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {video.blurb}
                      </p>
                    </div>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="formats-heading" className="mt-20">
          <h2
            id="formats-heading"
            className="text-2xl font-black tracking-tight sm:text-3xl"
          >
            The formats, explained
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
            Nearly every MrBeast video is one of six repeatable shapes. Knowing them is
            the quickest way to understand why the channel works the way it does.
          </p>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {formats.map((format) => (
              <div
                key={format.name}
                className="rounded-2xl border border-line bg-surface p-5 sm:p-6"
              >
                <dt className="text-base font-bold tracking-tight sm:text-lg">
                  {format.name}
                </dt>
                <dd className="mt-2">
                  <p className="text-sm font-semibold text-brand-400">
                    {format.premise}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {format.body}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="watch-heading" className="mt-20">
          <div className="prose">
            <h2 id="watch-heading">Where to watch MrBeast videos</h2>
            <p>
              Every MrBeast video is published free on YouTube. There is no paywall, no
              subscription and no app — if a site is charging you to watch one, it is
              not an official channel.
            </p>
            <p>
              Beyond the main channel, videos are re-published on{" "}
              <strong>Beast Philanthropy</strong>, <strong>MrBeast Gaming</strong>, and a
              family of dubbed channels in Spanish, Portuguese, Hindi, Arabic, French and
              Japanese among others — which is how a large share of the international
              audience actually watches. <Link href="/best-youtuber">The dubbed
              channels are also a big part of why the subscriber numbers look the way
              they do</Link>.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@MrBeast/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-bold transition-colors hover:border-brand-400/60 hover:bg-surface-2"
          >
            Browse every video on YouTube
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>

      <RelatedPages current="videos" />
    </>
  );
}
