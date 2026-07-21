/**
 * Generates the site's original placeholder artwork as SVG files.
 *
 * Everything here is drawn from scratch — gradients, geometry and type — so the
 * site ships with no third-party or copyrighted imagery. Swap any file in
 * /public/images with a real photo of the same aspect ratio and it just works.
 *
 * Run:  node scripts/generate-art.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), "../public/images");
mkdirSync(outDir, { recursive: true });

/** Deterministic PRNG so re-running produces byte-identical files. */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * A 16:9 poster: deep gradient, orbiting rings, confetti burst and a huge
 * ghosted label. Used for video cards.
 */
function poster({ id, label, hue, accentHue, seed }) {
  const r = rng(seed);
  const W = 1280;
  const H = 720;

  const confetti = Array.from({ length: 26 }, (_, i) => {
    const x = r() * W;
    const y = r() * H;
    const size = 8 + r() * 26;
    const rot = r() * 360;
    const h = r() > 0.5 ? hue : accentHue;
    const o = (0.18 + r() * 0.4).toFixed(2);
    return r() > 0.55
      ? `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(size / 2).toFixed(0)}" fill="hsl(${h} 95% 62%)" opacity="${o}"/>`
      : `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${size.toFixed(0)}" height="${(size * 0.5).toFixed(0)}" rx="3" fill="hsl(${h} 95% 62%)" opacity="${o}" transform="rotate(${rot.toFixed(0)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`;
  }).join("");

  const rings = [220, 330, 450, 580]
    .map(
      (rad, i) =>
        `<circle cx="${W - 210}" cy="${H / 2}" r="${rad}" fill="none" stroke="hsl(${hue} 95% 62%)" stroke-width="${2 - i * 0.3}" opacity="${(0.3 - i * 0.06).toFixed(2)}"/>`,
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(label)}">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 70% 12%)"/>
      <stop offset="0.55" stop-color="#070b16"/>
      <stop offset="1" stop-color="hsl(${accentHue} 70% 14%)"/>
    </linearGradient>
    <radialGradient id="glow-${id}" cx="0.72" cy="0.5" r="0.55">
      <stop offset="0" stop-color="hsl(${hue} 100% 60%)" stop-opacity="0.55"/>
      <stop offset="1" stop-color="hsl(${hue} 100% 60%)" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="type-${id}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.03"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <rect width="${W}" height="${H}" fill="url(#glow-${id})"/>
  ${rings}
  ${confetti}

  <!-- play glyph -->
  <g transform="translate(${W - 210} ${H / 2})">
    <circle r="86" fill="#ffffff" opacity="0.1"/>
    <circle r="86" fill="none" stroke="#ffffff" stroke-opacity="0.35" stroke-width="3"/>
    <path d="M -24 -38 L 46 0 L -24 38 Z" fill="#ffffff" opacity="0.9"/>
  </g>

  <text x="72" y="${H - 96}" font-family="Impact, 'Arial Black', system-ui, sans-serif"
        font-size="132" fill="url(#type-${id})" letter-spacing="-4">${esc(label)}</text>
  <rect x="72" y="${H - 62}" width="150" height="8" rx="4" fill="hsl(${accentHue} 95% 60%)"/>
</svg>
`;
}

/**
 * A 1:1 tile: bold diagonal bands and a centred glyph. Used for ventures
 * and shop products.
 */
function tile({ id, glyph, hue, accentHue, seed }) {
  const r = rng(seed);
  const S = 800;

  const bands = Array.from({ length: 7 }, (_, i) => {
    const x = -260 + i * 170;
    const w = 40 + r() * 70;
    return `<rect x="${x.toFixed(0)}" y="-200" width="${w.toFixed(0)}" height="${S + 400}" fill="hsl(${i % 2 ? accentHue : hue} 95% 60%)" opacity="${(0.06 + r() * 0.1).toFixed(2)}" transform="rotate(22 ${S / 2} ${S / 2})"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}" role="img" aria-label="${esc(glyph)}">
  <defs>
    <linearGradient id="tbg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${hue} 65% 14%)"/>
      <stop offset="1" stop-color="#080d1a"/>
    </linearGradient>
    <radialGradient id="tglow-${id}" cx="0.5" cy="0.42" r="0.5">
      <stop offset="0" stop-color="hsl(${accentHue} 100% 62%)" stop-opacity="0.45"/>
      <stop offset="1" stop-color="hsl(${accentHue} 100% 62%)" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${S}" height="${S}" fill="url(#tbg-${id})"/>
  ${bands}
  <rect width="${S}" height="${S}" fill="url(#tglow-${id})"/>
  <circle cx="${S / 2}" cy="${S / 2}" r="248" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2"/>
  <circle cx="${S / 2}" cy="${S / 2}" r="196" fill="#ffffff" fill-opacity="0.05"/>
  <text x="${S / 2}" y="${S / 2}" text-anchor="middle" dominant-baseline="central"
        font-family="Impact, 'Arial Black', system-ui, sans-serif" font-size="188"
        fill="#ffffff" fill-opacity="0.9" letter-spacing="-6">${esc(glyph)}</text>
</svg>
`;
}

/** Wide portrait-style hero panel with a silhouette-free abstract figure block. */
function heroPanel() {
  const W = 900;
  const H = 1100;
  const r = rng(99);
  const sparks = Array.from({ length: 40 }, () => {
    const x = r() * W;
    const y = r() * H;
    const rad = 1 + r() * 3.5;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${rad.toFixed(1)}" fill="#ffffff" opacity="${(0.15 + r() * 0.5).toFixed(2)}"/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Abstract stage lighting artwork">
  <defs>
    <linearGradient id="hp" x1="0.2" y1="0" x2="0.8" y2="1">
      <stop offset="0" stop-color="#0a84ff" stop-opacity="0.9"/>
      <stop offset="0.5" stop-color="#0b1020"/>
      <stop offset="1" stop-color="#ff2d55" stop-opacity="0.75"/>
    </linearGradient>
    <radialGradient id="hpg" cx="0.5" cy="0.3" r="0.7">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#060a14"/>
  <g opacity="0.9">
    <path d="M450 -60 L900 700 L0 700 Z" fill="url(#hp)" opacity="0.55"/>
    <path d="M450 40 L760 720 L140 720 Z" fill="#0a84ff" opacity="0.28"/>
    <path d="M450 40 L620 760 L280 760 Z" fill="#4aa8ff" opacity="0.22"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#hpg)"/>
  ${sparks}
  <g transform="translate(450 620)">
    <circle r="150" fill="#0b1020" stroke="#0a84ff" stroke-width="4" opacity="0.95"/>
    <circle r="150" fill="none" stroke="#ffffff" stroke-opacity="0.2" stroke-width="1.5"/>
    <path d="M -46 -74 L 92 0 L -46 74 Z" fill="#ffffff"/>
  </g>
  <g transform="translate(450 900)" opacity="0.5">
    <rect x="-300" y="0" width="600" height="6" rx="3" fill="#0a84ff"/>
    <rect x="-200" y="30" width="400" height="4" rx="2" fill="#ff2d55"/>
    <rect x="-120" y="54" width="240" height="4" rx="2" fill="#ffb020"/>
  </g>
</svg>
`;
}

const files = {
  // Video posters (16:9)
  "video-squid-game.svg": poster({ id: "sg", label: "456", hue: 210, accentHue: 340, seed: 11 }),
  "video-blind.svg": poster({ id: "bl", label: "1000", hue: 160, accentHue: 200, seed: 22 }),
  "video-sea.svg": poster({ id: "se", label: "7 DAYS", hue: 195, accentHue: 230, seed: 33 }),
  "video-hotel.svg": poster({ id: "ht", label: "$1 vs $1M", hue: 42, accentHue: 210, seed: 44 }),
  "video-ages.svg": poster({ id: "ag", label: "1-100", hue: 275, accentHue: 340, seed: 55 }),
  "video-wells.svg": poster({ id: "we", label: "100", hue: 190, accentHue: 150, seed: 66 }),

  // Venture tiles (1:1)
  "venture-feastables.svg": tile({ id: "vf", glyph: "F", hue: 42, accentHue: 28, seed: 71 }),
  "venture-beast-games.svg": tile({ id: "vg", glyph: "BG", hue: 212, accentHue: 195, seed: 72 }),
  "venture-philanthropy.svg": tile({ id: "vp", glyph: "BP", hue: 145, accentHue: 170, seed: 73 }),
  "venture-lab.svg": tile({ id: "vl", glyph: "LAB", hue: 340, accentHue: 300, seed: 74 }),

  // Shop tiles (1:1)
  "shop-chocolate.svg": tile({ id: "sc", glyph: "BAR", hue: 30, accentHue: 45, seed: 81 }),
  "shop-hoodie.svg": tile({ id: "sh", glyph: "HOOD", hue: 212, accentHue: 240, seed: 82 }),
  "shop-tee.svg": tile({ id: "st", glyph: "TEE", hue: 220, accentHue: 200, seed: 83 }),
  "shop-cap.svg": tile({ id: "sp", glyph: "CAP", hue: 340, accentHue: 20, seed: 84 }),

  // Hero panel
  "hero-panel.svg": heroPanel(),
};

for (const [name, contents] of Object.entries(files)) {
  writeFileSync(resolve(outDir, name), contents, "utf8");
}

console.log(`Wrote ${Object.keys(files).length} SVG files to public/images/`);
