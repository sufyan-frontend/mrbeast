import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";
import { stats } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Decorative backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-backdrop" />
        <div className="glow -left-32 -top-24 size-[28rem] bg-brand/40" />
        <div className="glow -right-24 top-40 size-[24rem] bg-accent/30" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-8 lg:pb-32 lg:pt-24">
        {/* Copy */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
              <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-accent" />
              Most-subscribed creator on YouTube
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1
              id="hero-title"
              className="mt-5 text-balance text-[2.6rem] font-black leading-[0.95] tracking-tighter sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
            >
              MrBeast makes the <span className="text-gradient">biggest videos</span> on the
              internet.
            </h1>
          </Reveal>

          {/*
            Answer-first paragraph. It names the entity, the person behind it and
            what he does in one self-contained passage — the shape an AI answer
            engine can lift and cite without reading the rest of the page.
          */}
          <Reveal delay={140}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
              <strong className="font-semibold text-foreground">MrBeast</strong> is{" "}
              {/* Contextual internal link with the target's own keyword as the
                  anchor text — worth far more than a "learn more" button, and it
                  reads as a normal sentence rather than an SEO artefact. */}
              <Link
                href="/who-is-mrbeast"
                className="font-semibold text-brand-400 underline underline-offset-2 transition-colors hover:text-brand"
              >
                Jimmy Donaldson
              </Link>
              , an American YouTuber and entrepreneur who builds record-breaking
              challenge videos, gives away millions of dollars, and runs Feastables, Beast
              Games and the non-profit Beast Philanthropy.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#videos"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand/30 active:translate-y-0"
              >
                <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
                Watch the videos
              </a>

              <a
                href="#philanthropy"
                className="inline-flex items-center justify-center rounded-full border border-line bg-surface/60 px-7 py-3.5 text-base font-bold text-foreground transition-colors hover:border-brand-400/60 hover:bg-surface-2"
              >
                See the impact
              </a>
            </div>
          </Reveal>

          {/* Stat strip */}
          <Reveal delay={260}>
            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 border-t border-line pt-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd>
                    <span className="block text-2xl font-black tracking-tight text-foreground sm:text-3xl">
                      {stat.value}
                    </span>
                    <span className="mt-1 block text-xs font-medium leading-snug text-muted sm:text-sm">
                      {stat.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Artwork */}
        <Reveal delay={160} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="animate-float relative aspect-[9/11] overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-black/60">
            <Image
              src="/images/hero-panel.svg"
              alt="Abstract stage-lighting artwork representing a MrBeast video set"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1023px) 90vw, 40vw"
              className="object-cover"
            />

            {/* Floating caption chip */}
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/55 p-4 backdrop-blur-md sm:inset-x-5 sm:bottom-5">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-400">
                Now streaming
              </p>
              <p className="mt-1 text-sm font-bold leading-snug text-white sm:text-base">
                New videos every few weeks — free on YouTube.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
