import type { Metadata } from "next";
import Link from "next/link";
import { pages } from "@/lib/pages";

/**
 * 404.
 *
 * `noindex` matters here: without it a soft-404 can be indexed and dilute the
 * site. The link list is not decoration — it gives a crawler that hit a dead URL
 * a route back into the real pages instead of a dead end.
 */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-backdrop" />
        <div className="glow left-1/2 top-0 size-96 -translate-x-1/2 bg-brand/30" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-400">
          404
        </p>

        <h1 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl lg:text-6xl">
          That page doesn&rsquo;t exist
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted sm:text-lg">
          The link may be broken or the page may have moved. Everything on the site is
          one click away below.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {pages.map((page) => (
            <li key={page.path}>
              <Link
                href={page.path}
                className="inline-flex rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-bold transition-colors hover:border-brand-400/60 hover:bg-surface-2"
              >
                {page.navLabel}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
