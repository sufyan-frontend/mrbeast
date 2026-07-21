import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { keywords, site, siteUrl } from "@/lib/site";

/**
 * One variable font, self-hosted by next/font.
 *
 * next/font inlines the @font-face at build time and applies `display: swap`, so
 * there is no render-blocking request to Google and no flash of invisible text —
 * both of which show up directly in LCP.
 */
const display = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  // Deliberately not capped at 1 — pinch-zoom must stay available (WCAG 1.4.4).
  maximumScale: 5,
};

export const metadata: Metadata = {
  // Lets every relative URL below resolve to an absolute one.
  metadataBase: new URL(siteUrl),

  title: {
    default: `${site.name} — ${site.tagline}`,
    // Any child route you add gets "Page name | MrBeast" for free.
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...keywords],
  applicationName: site.name,
  category: "entertainment",
  authors: [{ name: `${site.name} Fan Hub`, url: siteUrl }],
  creator: `${site.name} Fan Hub`,
  publisher: `${site.name} Fan Hub`,

  // Self-referencing canonical — the strongest duplicate-content signal there is.
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    // Image is resolved automatically from app/opengraph-image.tsx.
  },

  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    creator: "@MrBeast",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Allow full-size previews and untruncated snippets, so rich results and
      // AI answer engines can quote the page rather than clipping it.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  verification: {
    google: "c9kuPX5v5fXLP2XDi8VoPNP7_Zx2ZabD7CSnDZZCg4w",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.lang} className={`${display.variable} h-full antialiased`}>
      <head>
        {/* next/image hits YouTube's thumbnail CDN once you add video IDs. */}
        <link rel="preconnect" href="https://i.ytimg.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />

        {/*
          Scroll-reveal is progressive enhancement. Without JavaScript the
          .reveal rule would leave content stuck at opacity:0, so undo it here.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>

      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="skip-link rounded-full bg-brand px-5 py-3 font-bold text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
