import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/** PWA manifest — makes the site installable and controls the splash colours. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#05070d",
    theme_color: "#0a84ff",
    categories: ["entertainment", "video"],
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
