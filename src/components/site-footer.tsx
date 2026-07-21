import Link from "next/link";
import { BrandMark } from "./brand-mark";
import { nav, site, socials } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" aria-label={`${site.name} — home`}>
              <BrandMark />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {site.description}
            </p>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="text-sm font-bold uppercase tracking-[0.14em]">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </a>
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
          <p className="text-sm text-muted">
            © {year} — built with Next.js.
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
