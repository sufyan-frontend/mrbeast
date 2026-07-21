import Image from "next/image";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { videos, type Video } from "@/lib/site";

/**
 * If a video has a `youtubeId`, use YouTube's own thumbnail and link straight to
 * the video. Otherwise fall back to the local artwork so a card is never broken.
 */
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

export function Videos() {
  return (
    <section id="videos" className="relative scroll-mt-24 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Videos"
          title="The videos that broke the internet"
          lede="MrBeast videos are large-scale challenge, survival and giveaway films produced with feature-film budgets and published free on YouTube. These are among the most-watched."
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {videos.map((video, index) => (
            <Reveal as="li" key={video.title} delay={(index % 3) * 90}>
              <article className="group h-full overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-2xl hover:shadow-brand/10">
                <a
                  href={hrefFor(video)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block focus-visible:outline-offset-[-3px]"
                >
                  {/* Fixed aspect ratio reserves the space up-front — no layout shift (CLS) */}
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

                    {/* Play affordance */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    >
                      <span className="flex size-14 items-center justify-center rounded-full bg-brand/90 shadow-xl">
                        <svg viewBox="0 0 24 24" className="ml-0.5 size-6 text-white" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      </span>
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-balance text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-brand-400">
                      {video.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{video.blurb}</p>
                  </div>
                </a>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120} className="mt-12 text-center">
          <a
            href="https://www.youtube.com/@MrBeast/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-bold transition-colors hover:border-brand-400/60 hover:bg-surface-2"
          >
            Browse every video on YouTube
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
