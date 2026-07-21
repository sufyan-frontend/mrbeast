import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { homeSections, site, socials } from "@/lib/site";
import { pages } from "@/lib/pages";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label={`${site.name} — home`}>
              <BrandMark />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          {/*
            Every page links to every other page from here. That is what turns
            six isolated URLs into one crawlable cluster — internal links are how
            crawl budget and link equity reach the deeper pages at all.
          */}
          <nav aria-labelledby="footer-pages">
            <h2 id="footer-pages" className="text-sm font-bold uppercase tracking-[0.14em]">
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5">
              {pages.map((page) => (
                <li key={page.path}>
                  <Link
                    href={page.path}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {page.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Home-page anchors, root-relative so they work from any route. */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-sm font-bold uppercase tracking-[0.14em]">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {homeSections.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav aria-labelledby="footer-social">
            <h2 id="footer-social" className="text-sm font-bold uppercase tracking-[0.14em]">
              Follow
            </h2>
            <ul className="mt-4 space-y-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {social.label}{" "}
                    <span className="text-muted/60">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">© {year} — built with Next.js.</p>

          {/*
            A visible review date is a real E-E-A-T signal, and it matches the
            `dateModified` in the JSON-LD. Only move site.lastReviewed when the
            facts have genuinely been rechecked.
          */}
          <p className="text-sm text-muted">
            Facts last reviewed{" "}
            <time dateTime={site.lastReviewed}>
              {new Date(site.lastReviewed).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
        </div>

        {/*
          Required disclosure. This is an unofficial fan project: it uses no
          official logos or photography, and it is not affiliated with, endorsed
          by, or connected to MrBeast or any of his companies. Do not remove
          this notice while the site describes a real public figure.
        */}
        {site.isFanSite ? (
          <p className="mt-6 rounded-xl border border-line bg-background/60 p-4 text-xs leading-relaxed text-muted">
            <strong className="font-bold text-foreground">Unofficial fan site.</strong> This
            is an independent fan project and is not affiliated with, endorsed by, or
            connected to MrBeast, Jimmy Donaldson, Beast Industries or any related company.
            All artwork here is original; no official logos or photography are used. All
            trademarks belong to their respective owners. For anything official, visit{" "}
            <a
              href="https://www.youtube.com/@MrBeast"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-400 underline underline-offset-2"
            >
              the official YouTube channel
            </a>
            .
          </p>
        ) : null}
      </div>
    </footer>
  );
}
