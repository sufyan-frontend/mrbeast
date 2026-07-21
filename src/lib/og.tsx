import { ImageResponse } from "next/og";
import { getPage, type PageKey } from "./pages";
import { site } from "./site";

/**
 * Shared social-card renderer.
 *
 * Every route gets its own OG image showing that page's actual H1, rather than
 * all six sharing one generic card. It matters more than it looks: the social
 * preview is the entire creative for a link shared into a group chat or a
 * social post, and a card that says something specific is the difference
 * between a click and a scroll past.
 *
 * Built with ImageResponse so the card is generated from `lib/pages.ts` at
 * build time — change a page's H1 and its card follows, with nothing to
 * re-export from a design tool.
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Short kicker per page, since the meta description is too long for a card. */
const kickers: Record<PageKey, string> = {
  home: "Videos, ventures and philanthropy — all in one place.",
  "who-is-mrbeast": "Real name, age, and how a 13-year-old became the biggest creator on YouTube.",
  "net-worth": "Where the money comes from, and why every published figure disagrees.",
  videos: "Squid Game, $1 vs $1,000,000, and the six formats behind all of it.",
  "best-youtuber": "The most-subscribed creator on YouTube — and what that does and doesn't prove.",
  faq: "Straight answers to what people actually ask.",
};

export function ogImage(pageKey: PageKey) {
  const page = getPage(pageKey);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0a2a5e 0%, #05070d 45%, #3d0c22 100%)",
          color: "#f5f7fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "#0a84ff",
            opacity: 0.35,
            filter: "blur(120px)",
          }}
        />

        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 17,
              background: "linear-gradient(135deg, #4aa8ff, #0b6bdc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 900,
              letterSpacing: -0.5,
              textTransform: "uppercase",
            }}
          >
            {site.wordmark}
          </div>
        </div>

        {/* Headline — the page's own H1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              // Long H1s get a smaller size so nothing overflows the card.
              fontSize: page.h1.length > 34 ? 66 : 82,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 960,
            }}
          >
            {page.h1}
          </div>

          <div style={{ fontSize: 28, color: "#9aa8c4", maxWidth: 900, lineHeight: 1.35 }}>
            {kickers[pageKey]}
          </div>
        </div>

        {/* Footer rule */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 120, height: 8, borderRadius: 4, background: "#0a84ff" }} />
          <div style={{ width: 60, height: 8, borderRadius: 4, background: "#ff2d55" }} />
          <div style={{ width: 30, height: 8, borderRadius: 4, background: "#ffb020" }} />
          <div style={{ marginLeft: "auto", fontSize: 22, color: "#9aa8c4" }}>
            Unofficial fan site
          </div>
        </div>
      </div>
    ),
    size,
  );
}
