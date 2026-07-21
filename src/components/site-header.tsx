"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "./brand-mark";
import { navPages } from "@/lib/pages";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close the panel on navigation, otherwise it stays open over the new page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Solidify the bar once the user leaves the top of the page.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile panel is open: lock body scroll, close on Escape, and
  // move focus into the panel so keyboard users aren't stranded behind it.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Close the panel if the viewport grows past the mobile breakpoint, otherwise
  // the hidden panel keeps the body scroll-locked on desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6 lg:px-8">
        <Link href="/" aria-label="MrBeast — home" className="shrink-0">
          <BrandMark />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  aria-current={pathname === page.path ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/5 hover:text-foreground ${
                    pathname === page.path ? "bg-white/5 text-foreground" : "text-muted"
                  }`}
                >
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.youtube.com/@MrBeast"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-600 sm:inline-flex"
          >
            Watch on YouTube
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface/70 text-foreground transition-colors hover:bg-surface-2 lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-line bg-background/98 backdrop-blur-xl lg:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col gap-1">
            {navPages.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === page.path ? "page" : undefined}
                  className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors hover:bg-white/5 ${
                    pathname === page.path ? "bg-white/5 text-brand-400" : "text-foreground"
                  }`}
                >
                  {page.navLabel}
                </Link>
              </li>
            ))}
          </ul>

          <a
            href="https://www.youtube.com/@MrBeast"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-3 block rounded-full bg-brand px-5 py-3.5 text-center text-base font-bold text-white transition-colors hover:bg-brand-600"
          >
            Watch on YouTube
          </a>
        </nav>
      </div>
    </header>
  );
}
