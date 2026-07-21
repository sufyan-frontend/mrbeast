import { Breadcrumbs } from "./breadcrumbs";
import { AnswerBox } from "./answer-box";
import { site } from "@/lib/site";
import type { PageMeta } from "@/lib/pages";

/**
 * Standard opening block for every non-home route: breadcrumb, single H1,
 * the answer-first passage, and a visible review date.
 *
 * Exactly one <h1> per page, and it is the first heading in the document —
 * a page with two H1s or with an H2 above the H1 gives a crawler no unambiguous
 * statement of what the page is about.
 */
export function PageHero({
  page,
  eyebrow,
  answerLabel,
}: {
  page: PageMeta;
  eyebrow: string;
  answerLabel?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-backdrop" />
        <div className="glow -left-32 -top-28 size-[26rem] bg-brand/35" />
        <div className="glow -right-20 top-24 size-[20rem] bg-accent/25" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-8 sm:px-6 sm:pb-16 sm:pt-10 lg:px-8 lg:pb-20">
        <Breadcrumbs page={page} />

        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-400">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
          {eyebrow}
        </p>

        <h1 className="mt-4 text-balance text-[2.1rem] font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
          {page.h1}
        </h1>

        <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg">
          {page.description}
        </p>

        <AnswerBox answer={page.answer} label={answerLabel} />

        {/* Freshness, shown to humans as well as declared in `dateModified`. */}
        <p className="mt-5 text-xs text-muted">
          Last reviewed{" "}
          <time dateTime={site.lastReviewed}>
            {/* Pinned to UTC: "2026-07-21" parses as UTC midnight, so without
                this the build machine's timezone can render it a day early. */}
            {new Date(site.lastReviewed).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })}
          </time>{" "}
          · Independent fan site, not affiliated with MrBeast
        </p>
      </div>
    </header>
  );
}
