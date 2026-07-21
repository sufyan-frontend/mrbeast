import Link from "next/link";
import { relatedPages, type PageKey } from "@/lib/pages";

/**
 * Internal-link block, rendered at the foot of every page.
 *
 * Internal linking is the least glamorous and most reliable part of this whole
 * job. It is how crawl budget and link equity reach the deeper URLs, how a
 * reader who landed on one page discovers the other five, and how an AI answer
 * engine finds the rest of the site after fetching a single URL.
 *
 * The anchor text is each target's real H1 rather than "read more" or "click
 * here" — the anchor text is the strongest single hint about what the page it
 * points at is *for*, and generic anchors throw that away entirely.
 */
export function RelatedPages({ current }: { current: PageKey }) {
  const related = relatedPages(current);

  return (
    <section
      aria-labelledby="related-heading"
      className="border-t border-line bg-surface/30 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2
          id="related-heading"
          className="text-2xl font-black tracking-tight sm:text-3xl"
        >
          Keep reading
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((page) => (
            <li key={page.key}>
              <Link
                href={page.path}
                className="group flex h-full flex-col rounded-2xl border border-line bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-400/50 hover:shadow-xl hover:shadow-brand/10"
              >
                <h3 className="text-balance text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-brand-400">
                  {page.h1}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {page.description}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-sm font-bold text-brand-400"
                >
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
