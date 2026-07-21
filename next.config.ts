import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // There is another package-lock.json further up in the user's home directory.
  // Pin the root so Turbopack never picks that one and traces the wrong tree.
  turbopack: {
    root: __dirname,
  },

  images: {
    // Serve modern formats automatically — smaller payloads, better LCP.
    formats: ["image/avif", "image/webp"],
    // Set a `youtubeId` on any entry in lib/site.ts and the card renders
    // YouTube's own thumbnail through next/image instead of local artwork.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/vi/**" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        // Generated artwork is immutable — let the CDN keep it forever.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
