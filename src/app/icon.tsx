import { ImageResponse } from "next/og";

/** App icon — generated so it always matches the brand mark in the header. */

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4aa8ff, #0b6bdc)",
          color: "#ffffff",
          fontSize: 300,
          fontWeight: 900,
          fontFamily: "sans-serif",
          letterSpacing: -12,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
