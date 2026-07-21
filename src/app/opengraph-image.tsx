import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/**
 * Social preview card, rendered to a real PNG at build time.
 *
 * Generated rather than shipped as a file so it always matches the copy in
 * lib/site.ts — change the tagline there and the card follows.
 */

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          background:
            "linear-gradient(135deg, #0a2a5e 0%, #05070d 45%, #3d0c22 100%)",
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

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            The biggest videos on the internet.
          </div>

          <div style={{ fontSize: 30, color: "#9aa8c4", maxWidth: 900, lineHeight: 1.35 }}>
            Videos, Feastables, Beast Games and Beast Philanthropy — all in one place.
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
