// Generates ALL original pixel-art assets for the Skamløs 2D RPG prologue slice.
//
// Zero runtime dependencies: PNGs are encoded by hand using Node's built-in
// `zlib` plus a small CRC32 implementation. No `sharp`, `canvas`, `pngjs`, etc.
// Every sprite/tile/building below is drawn procedurally in code here — there
// are NO external, copyrighted or brand-derived assets.
//
// Output: public/skamlos-rpg/{tiles,props,buildings,sprites}/*.png
// Run with: node scripts/build-skamlos-rpg-assets.mjs
// Re-run whenever the palette or any sprite definition below changes.

import { deflateSync } from "node:zlib";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "skamlos-rpg");

/* ----------------------------------------------------------------------- *
 * Zero-dependency PNG encoder (RGBA, 8-bit, no interlace, filter 0)
 * ----------------------------------------------------------------------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const body = Buffer.concat([Buffer.from(type, "latin1"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body), 0);
  return Buffer.concat([len, body, crc]);
}

function encodePNG(c) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(c.w, 0);
  ihdr.writeUInt32BE(c.h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // colour type RGBA
  const stride = c.w * 4;
  const raw = Buffer.alloc((stride + 1) * c.h);
  for (let y = 0; y < c.h; y++) {
    raw[y * (stride + 1)] = 0; // filter: none
    raw.set(
      c.data.subarray(y * stride, y * stride + stride),
      y * (stride + 1) + 1,
    );
  }
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

/* ----------------------------------------------------------------------- *
 * Tiny pixel canvas helpers
 * ----------------------------------------------------------------------- */

function Canvas(w, h) {
  return { w, h, data: new Uint8Array(w * h * 4) };
}
function hex(s) {
  s = s.replace("#", "");
  return [
    parseInt(s.slice(0, 2), 16),
    parseInt(s.slice(2, 4), 16),
    parseInt(s.slice(4, 6), 16),
    255,
  ];
}
function shade(col, f) {
  return [
    Math.max(0, Math.min(255, Math.round(col[0] * f))),
    Math.max(0, Math.min(255, Math.round(col[1] * f))),
    Math.max(0, Math.min(255, Math.round(col[2] * f))),
    col[3] ?? 255,
  ];
}
function px(c, x, y, col) {
  x = x | 0;
  y = y | 0;
  if (!col || x < 0 || y < 0 || x >= c.w || y >= c.h) return;
  const i = (y * c.w + x) * 4;
  c.data[i] = col[0];
  c.data[i + 1] = col[1];
  c.data[i + 2] = col[2];
  c.data[i + 3] = col[3] ?? 255;
}
function rect(c, x, y, w, h, col) {
  for (let yy = y; yy < y + h; yy++)
    for (let xx = x; xx < x + w; xx++) px(c, xx, yy, col);
}
// rounded-ish filled circle
function disc(c, cx, cy, r, col) {
  for (let yy = -r; yy <= r; yy++)
    for (let xx = -r; xx <= r; xx++)
      if (xx * xx + yy * yy <= r * r + r * 0.5) px(c, cx + xx, cy + yy, col);
}
// stamp a char grid with a palette, scaled by `s`
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ----------------------------------------------------------------------- *
 * Palette (warm, handmade RPG — original, not borrowed from any brand)
 * ----------------------------------------------------------------------- */

const P = {
  grass: hex("#5fa64d"),
  grassD: hex("#4d8c3e"),
  grassL: hex("#74bd5b"),
  path: hex("#d8c195"),
  pathD: hex("#c2a974"),
  pathL: hex("#e6d4ac"),
  water: hex("#5a9bd4"),
  waterD: hex("#4684bf"),
  waterL: hex("#86b9e3"),
  trunk: hex("#7a5230"),
  trunkD: hex("#5e3e23"),
  leaf: hex("#3f7d3a"),
  leafD: hex("#316030"),
  leafL: hex("#4f964a"),
  bush: hex("#4e9645"),
  bushD: hex("#3c7536"),
  wood: hex("#9c6b3f"),
  woodD: hex("#7d5430"),
  woodL: hex("#b9854f"),
  stone: hex("#9aa0a6"),
  stoneD: hex("#787e84"),
  stoneL: hex("#bcc2c8"),
  floorClass: hex("#caa06a"),
  floorClassD: hex("#b78a55"),
  wallClass: hex("#e7d7bb"),
  wallClassD: hex("#d3bd97"),
  floorHome: hex("#c08f56"),
  floorHomeD: hex("#a87b48"),
  wallHome: hex("#efd9b6"),
  wallHomeD: hex("#dcc196"),
  roof: hex("#c0532f"),
  roofD: hex("#a3421f"),
  roofL: hex("#d96a44"),
  // neutral corporate glass tower for the symbolic "Drømmejobben" building.
  // Deliberately cool slate/steel — not any brand's colour.
  tower: hex("#5b6b7a"),
  towerD: hex("#46535f"),
  towerL: hex("#76879a"),
  glass: hex("#9fc4dc"),
  glassD: hex("#7ba6c4"),
  glassLit: hex("#d6ecf7"),
  brick: hex("#a8553f"),
  brickD: hex("#8a4332"),
  brickL: hex("#c06b50"),
  cottage: hex("#e7c9a0"),
  cottageD: hex("#cda775"),
  ink: hex("#2b3640"),
  white: hex("#f4efe6"),
  black: hex("#20262c"),
  yellow: hex("#f2c84b"),
  yellowD: hex("#d6a82f"),
  beak: hex("#e8893a"),
  red: hex("#cf4d4d"),
  green: hex("#4f9d54"),
  screen: hex("#1f6f6b"),
  screenL: hex("#3fb3ac"),
  chalk: hex("#2f5e44"),
  metal: hex("#b8bdc4"),
  glow: hex("#ffe9a8"),
};

async function save(dir, name, c) {
  await mkdir(join(OUT, dir), { recursive: true });
  await writeFile(join(OUT, dir, name), encodePNG(c));
}

/* ----------------------------------------------------------------------- *
 * GROUND TILES (32×32) — procedural, seamless-ish
 * ----------------------------------------------------------------------- */

function groundTile(base, dark, light, seed, density = 0.1) {
  const c = Canvas(32, 32);
  rect(c, 0, 0, 32, 32, base);
  const rnd = mulberry32(seed);
  for (let i = 0; i < 32 * 32 * density; i++) {
    const x = (rnd() * 32) | 0;
    const y = (rnd() * 32) | 0;
    px(c, x, y, rnd() > 0.5 ? dark : light);
  }
  return c;
}

function pathTile(seed) {
  const c = groundTile(P.path, P.pathD, P.pathL, seed, 0.14);
  // a few small pebbles
  const rnd = mulberry32(seed + 7);
  for (let i = 0; i < 6; i++) {
    const x = 2 + ((rnd() * 28) | 0);
    const y = 2 + ((rnd() * 28) | 0);
    px(c, x, y, P.pathD);
    px(c, x + 1, y, P.pathD);
    px(c, x, y + 1, shade(P.pathD, 0.9));
  }
  return c;
}

function waterTile(seed) {
  // Two 32×32 frames side by side (64×32). Frame 1 nudges the highlights so
  // the tile shimmers when BootScene's 2-frame "water" animation alternates.
  const c = Canvas(64, 32);
  rect(c, 0, 0, 64, 32, P.water);
  const rnd = mulberry32(seed);
  for (let y = 2; y < 32; y += 6) {
    const off = (rnd() * 8) | 0;
    for (const [frameX, shift] of [
      [0, 0],
      [32, 3],
    ]) {
      rect(c, frameX + off + shift, y, 7, 1, P.waterL);
      rect(c, frameX + off + shift + 16, y + 2, 6, 1, P.waterD);
    }
  }
  return c;
}

function classFloor() {
  const c = Canvas(32, 32);
  rect(c, 0, 0, 32, 32, P.floorClass);
  // subtle plank grid
  for (let x = 0; x < 32; x += 16) rect(c, x, 0, 1, 32, P.floorClassD);
  for (let y = 0; y < 32; y += 16) rect(c, 0, y, 32, 1, P.floorClassD);
  return c;
}
function homeFloor() {
  const c = Canvas(32, 32);
  rect(c, 0, 0, 32, 32, P.floorHome);
  for (let y = 0; y < 32; y += 8) rect(c, 0, y, 32, 1, P.floorHomeD);
  // stagger plank seams
  rect(c, 10, 0, 1, 8, P.floorHomeD);
  rect(c, 22, 8, 1, 8, P.floorHomeD);
  rect(c, 6, 16, 1, 8, P.floorHomeD);
  rect(c, 18, 24, 1, 8, P.floorHomeD);
  return c;
}
function wallTile(base, dark) {
  const c = Canvas(32, 32);
  rect(c, 0, 0, 32, 32, base);
  // brick courses
  for (let y = 0; y < 32; y += 8) {
    rect(c, 0, y, 32, 1, dark);
    const off = (y / 8) % 2 ? 8 : 0;
    for (let x = off; x < 32; x += 16) rect(c, x, y, 1, 8, dark);
  }
  rect(c, 0, 0, 32, 2, shade(base, 1.08)); // top highlight
  return c;
}
function rug() {
  const c = Canvas(32, 32);
  rect(c, 1, 4, 30, 24, P.brick);
  rect(c, 3, 6, 26, 20, P.brickL);
  rect(c, 6, 9, 20, 14, P.brickD);
  rect(c, 9, 12, 14, 8, P.brickL);
  return c;
}

/* ----------------------------------------------------------------------- *
 * PROPS (transparent, anchored to bottom of frame)
 * ----------------------------------------------------------------------- */

function tree() {
  const c = Canvas(32, 44);
  rect(c, 14, 30, 5, 14, P.trunk);
  rect(c, 14, 30, 1, 14, P.trunkD);
  // canopy
  disc(c, 16, 16, 13, P.leafD);
  disc(c, 16, 15, 12, P.leaf);
  disc(c, 13, 12, 7, P.leafL);
  disc(c, 21, 18, 5, P.leafL);
  // shadow base
  rect(c, 11, 42, 12, 2, shade(P.leafD, 0.7));
  return c;
}
function bush() {
  const c = Canvas(32, 32);
  disc(c, 10, 22, 8, P.bushD);
  disc(c, 21, 22, 8, P.bushD);
  disc(c, 16, 19, 9, P.bush);
  disc(c, 12, 17, 4, P.leafL);
  disc(c, 22, 19, 3, P.leafL);
  return c;
}
function hedge() {
  const c = Canvas(32, 32);
  rect(c, 0, 10, 32, 20, P.bushD);
  rect(c, 0, 8, 32, 4, P.bush);
  for (let x = 2; x < 32; x += 6) disc(c, x, 11, 3, P.bush);
  for (let x = 4; x < 32; x += 7) px(c, x, 10, P.leafL);
  return c;
}
function fence() {
  const c = Canvas(32, 32);
  rect(c, 0, 16, 32, 3, P.woodD); // top rail
  rect(c, 0, 24, 32, 3, P.woodD); // bottom rail
  for (let x = 2; x < 32; x += 10) {
    rect(c, x, 10, 4, 20, P.wood);
    rect(c, x, 10, 1, 20, P.woodL);
    rect(c, x, 10, 4, 1, P.woodL);
  }
  return c;
}
function flowers() {
  const c = Canvas(32, 32);
  const cols = [P.red, P.yellow, P.white, P.glassLit];
  const rnd = mulberry32(42);
  for (let i = 0; i < 7; i++) {
    const x = 3 + ((rnd() * 26) | 0);
    const y = 14 + ((rnd() * 14) | 0);
    const col = cols[(rnd() * cols.length) | 0];
    px(c, x, y, col);
    px(c, x + 1, y, col);
    px(c, x, y + 1, col);
    px(c, x + 1, y + 1, col);
    px(c, x, y + 2, P.grassD);
  }
  return c;
}
function rock() {
  const c = Canvas(32, 32);
  disc(c, 16, 22, 9, P.stoneD);
  disc(c, 15, 20, 8, P.stone);
  disc(c, 13, 17, 4, P.stoneL);
  rect(c, 8, 29, 16, 2, shade(P.stoneD, 0.7));
  return c;
}
function lamp() {
  const c = Canvas(32, 48);
  rect(c, 14, 10, 4, 36, P.ink); // pole
  rect(c, 15, 10, 1, 36, shade(P.ink, 1.4));
  rect(c, 10, 4, 12, 8, P.black); // housing
  disc(c, 16, 8, 3, P.glow); // light
  rect(c, 9, 44, 14, 3, shade(P.ink, 0.8)); // base
  return c;
}
function bench() {
  const c = Canvas(32, 24);
  rect(c, 3, 10, 26, 4, P.wood);
  rect(c, 3, 6, 26, 3, P.woodL);
  rect(c, 5, 14, 3, 8, P.woodD);
  rect(c, 24, 14, 3, 8, P.woodD);
  return c;
}
function sign() {
  const c = Canvas(32, 32);
  rect(c, 14, 14, 4, 18, P.woodD); // post
  rect(c, 4, 6, 24, 12, P.wood); // board
  rect(c, 4, 6, 24, 2, P.woodL);
  rect(c, 6, 10, 20, 1, P.woodD);
  rect(c, 6, 13, 16, 1, P.woodD);
  return c;
}
function doorProp() {
  const c = Canvas(32, 32);
  rect(c, 6, 4, 20, 28, P.woodD);
  rect(c, 8, 6, 16, 26, P.wood);
  rect(c, 8, 18, 16, 1, P.woodD);
  px(c, 21, 19, P.yellow); // handle
  px(c, 21, 20, P.yellowD);
  return c;
}
function windowProp() {
  const c = Canvas(32, 24);
  rect(c, 4, 2, 24, 20, P.woodD);
  rect(c, 6, 4, 20, 16, P.glass);
  rect(c, 6, 4, 20, 6, P.glassLit);
  rect(c, 15, 4, 2, 16, P.woodD);
  rect(c, 6, 11, 20, 2, P.woodD);
  return c;
}
function chalkboard() {
  const c = Canvas(48, 28);
  rect(c, 0, 0, 48, 28, P.woodD);
  rect(c, 2, 2, 44, 22, P.chalk);
  rect(c, 6, 6, 18, 1, P.white);
  rect(c, 6, 10, 26, 1, shade(P.white, 0.85));
  rect(c, 6, 14, 14, 1, shade(P.white, 0.85));
  rect(c, 6, 18, 22, 1, shade(P.white, 0.7));
  return c;
}
function clock() {
  const c = Canvas(16, 16);
  disc(c, 8, 8, 7, P.white);
  disc(c, 8, 8, 7, P.ink);
  disc(c, 8, 8, 6, P.white);
  rect(c, 8, 4, 1, 4, P.ink);
  rect(c, 8, 8, 4, 1, P.ink);
  return c;
}
function deskClass() {
  // top-down small school desk + chair
  const c = Canvas(32, 32);
  rect(c, 6, 8, 20, 14, P.woodD);
  rect(c, 7, 9, 18, 12, P.wood);
  rect(c, 7, 9, 18, 2, P.woodL);
  rect(c, 11, 22, 10, 6, P.woodD); // chair
  rect(c, 12, 23, 8, 4, P.wood);
  return c;
}
function deskHome() {
  const c = Canvas(48, 28);
  rect(c, 2, 8, 44, 16, P.woodD);
  rect(c, 3, 9, 42, 12, P.wood);
  rect(c, 3, 9, 42, 2, P.woodL);
  rect(c, 4, 22, 4, 6, P.woodD);
  rect(c, 40, 22, 4, 6, P.woodD);
  return c;
}
function pc() {
  // two monitors + keyboard, top-down-ish front view
  const c = Canvas(48, 32);
  // left monitor
  rect(c, 2, 4, 20, 15, P.black);
  rect(c, 3, 5, 18, 13, P.screen);
  rect(c, 4, 6, 16, 5, P.screenL);
  rect(c, 5, 13, 10, 1, P.glassLit);
  // right monitor
  rect(c, 26, 4, 20, 15, P.black);
  rect(c, 27, 5, 18, 13, P.screen);
  rect(c, 28, 6, 16, 5, P.screenL);
  rect(c, 29, 13, 12, 1, P.glassLit);
  // stands
  rect(c, 11, 19, 3, 3, P.metal);
  rect(c, 35, 19, 3, 3, P.metal);
  // keyboard
  rect(c, 14, 24, 20, 5, P.stoneD);
  rect(c, 15, 25, 18, 3, P.stoneL);
  return c;
}
function duck() {
  const c = Canvas(32, 32);
  // body
  disc(c, 15, 22, 7, P.yellowD);
  disc(c, 15, 21, 6, P.yellow);
  // head
  disc(c, 21, 15, 4, P.yellowD);
  disc(c, 21, 14, 4, P.yellow);
  // beak + eye
  rect(c, 24, 14, 4, 2, P.beak);
  px(c, 22, 13, P.ink);
  // water shadow
  rect(c, 9, 29, 14, 2, shade(P.yellowD, 0.7));
  return c;
}
function coffee() {
  const c = Canvas(16, 16);
  rect(c, 4, 6, 8, 7, P.white);
  rect(c, 4, 6, 8, 2, shade(P.white, 0.85));
  rect(c, 5, 5, 6, 1, P.woodD); // coffee
  rect(c, 12, 8, 2, 3, P.white); // handle
  return c;
}
function books() {
  const c = Canvas(20, 18);
  rect(c, 2, 10, 16, 5, P.red);
  rect(c, 3, 5, 14, 5, P.green);
  rect(c, 4, 1, 12, 4, P.glassD);
  rect(c, 2, 10, 16, 1, shade(P.red, 1.2));
  return c;
}
function journeymap() {
  // A paper journey-map with green/red/blue sticky notes and a timeline line.
  const c = Canvas(30, 22);
  rect(c, 1, 1, 28, 20, hex("#efe6cf"));
  rect(c, 1, 1, 28, 2, hex("#ffffff"));
  rect(c, 0, 0, 30, 1, P.ink);
  rect(c, 0, 21, 30, 1, P.ink);
  rect(c, 0, 0, 1, 22, P.ink);
  rect(c, 29, 0, 1, 22, P.ink);
  rect(c, 3, 15, 24, 1, hex("#b9ab8c"));
  rect(c, 4, 4, 4, 4, hex("#5aa06a"));
  rect(c, 13, 4, 4, 4, hex("#c0563f"));
  rect(c, 22, 4, 4, 4, hex("#4f7fb0"));
  rect(c, 8, 9, 4, 4, hex("#c0563f"));
  rect(c, 18, 9, 4, 4, hex("#5aa06a"));
  return c;
}
function egg() {
  // Ovoid silhouette: pointed top, round fat belly widest ~60% down,
  // ~1.3:1 height:width like a real hen's egg. [y, xStart, width] per row.
  const c = Canvas(16, 20);
  const base = hex("#f5ebd4");
  const mid = hex("#e6d6b3");
  const deep = hex("#d3bf94");
  const hi = hex("#fffdf5");
  const rows = [
    [1, 7, 2],
    [2, 6, 4],
    [3, 5, 6],
    [4, 4, 8],
    [5, 4, 8],
    [6, 3, 10],
    [7, 3, 10],
    [8, 2, 12],
    [9, 2, 12],
    [10, 1, 14],
    [11, 1, 14],
    [12, 1, 14],
    [13, 1, 14],
    [14, 2, 12],
    [15, 2, 12],
    [16, 3, 10],
    [17, 4, 8],
    [18, 6, 4],
  ];
  // Base fill.
  for (const [y, x, w] of rows) rect(c, x, y, w, 1, base);
  // Core shadow across the right hemisphere (light from top-left).
  for (const [y, x, w] of rows) {
    if (y < 4) continue;
    const s = x + Math.round(w * 0.56);
    rect(c, s, y, x + w - s, 1, mid);
  }
  // Deep crescent lower-right + shaded underside for grounding.
  for (const [y, x, w] of rows) {
    if (y < 11) continue;
    const s = x + Math.round(w * 0.72);
    rect(c, s, y, x + w - s, 1, deep);
  }
  rect(c, 6, 18, 4, 1, deep);
  // Top-left specular highlight.
  disc(c, 6, 7, 2, hi);
  px(c, 5, 5, hi);
  px(c, 8, 6, hi);
  return c;
}
function papers() {
  const c = Canvas(24, 20);
  rect(c, 2, 6, 18, 12, hex("#e8e0cc"));
  rect(c, 3, 4, 18, 12, hex("#f4eed9"));
  rect(c, 4, 2, 18, 12, hex("#ffffff"));
  rect(c, 4, 2, 18, 1, hex("#d9cdb0"));
  rect(c, 6, 5, 12, 1, hex("#b9ab8c"));
  rect(c, 6, 8, 12, 1, hex("#b9ab8c"));
  rect(c, 6, 11, 8, 1, hex("#b9ab8c"));
  return c;
}
function bed() {
  const c = Canvas(28, 36);
  rect(c, 2, 2, 24, 32, P.woodD);
  rect(c, 3, 6, 22, 26, P.glassD); // blanket
  rect(c, 3, 6, 22, 8, P.white); // pillow area
  rect(c, 4, 7, 9, 5, P.glassLit); // pillow
  return c;
}
function plant() {
  const c = Canvas(24, 30);
  rect(c, 7, 20, 10, 9, P.brick); // pot
  rect(c, 7, 20, 10, 2, P.brickL);
  disc(c, 12, 13, 7, P.leafD);
  disc(c, 9, 11, 4, P.leaf);
  disc(c, 15, 12, 4, P.leafL);
  return c;
}

/* ----------------------------------------------------------------------- *
 * BUILDINGS (facade sprites sized to footprint; door gap bottom-centre)
 * ----------------------------------------------------------------------- */

function buildingBase(w, h, wall, wallD, roof, roofD, opts = {}) {
  const c = Canvas(w, h);
  const roofH = opts.roofH ?? Math.round(h * 0.34);
  // body
  rect(c, 2, roofH - 2, w - 4, h - roofH + 2, wall);
  rect(c, 2, roofH - 2, 2, h - roofH + 2, shade(wall, 0.88)); // left shade
  rect(c, w - 4, roofH - 2, 2, h - roofH + 2, shade(wall, 0.88)); // right shade
  // brick texture lines
  for (let y = roofH + 2; y < h - 2; y += 6) rect(c, 3, y, w - 6, 1, wallD);
  // roof (trapezoid)
  for (let y = 0; y < roofH; y++) {
    const inset = Math.round((roofH - y) * (w / 2 / roofH)) - 2;
    rect(c, inset, y, w - inset * 2, 1, y < 3 ? roofD : roof);
  }
  rect(c, 0, roofH - 3, w, 3, roofD); // eave
  return { c, roofH };
}

function addWindows(c, x0, y0, cols, rows, dx, dy, lit = false) {
  for (let r = 0; r < rows; r++)
    for (let q = 0; q < cols; q++) {
      const x = x0 + q * dx;
      const y = y0 + r * dy;
      rect(c, x, y, 7, 8, P.woodD);
      rect(c, x + 1, y + 1, 5, 6, lit ? P.glassLit : P.glass);
      rect(c, x + 1, y + 1, 5, 2, P.glassLit);
    }
}
function addDoor(c, w, h, col = P.woodD) {
  const dw = 12;
  const x = Math.round(w / 2 - dw / 2);
  rect(c, x, h - 16, dw, 16, col);
  rect(c, x + 1, h - 14, dw - 2, 14, shade(col, 1.18));
  rect(c, x + 1, h - 8, dw - 2, 1, col);
  px(c, x + dw - 3, h - 8, P.yellow);
  return { x: x + dw / 2, y: h };
}

function school() {
  const { c } = buildingBase(192, 132, P.cottage, P.cottageD, P.roof, P.roofD, {
    roofH: 44,
  });
  // bell cupola
  rect(c, 88, 4, 16, 14, P.cottageD);
  rect(c, 90, 6, 12, 10, P.cottage);
  disc(c, 96, 11, 3, P.yellow);
  rect(c, 84, 2, 24, 3, P.roofD);
  addWindows(c, 18, 60, 3, 2, 30, 34, true);
  addWindows(c, 120, 60, 2, 2, 36, 34, true);
  addDoor(c, 192, 132, P.woodD);
  // double-door framing
  rect(c, 88, 116, 16, 16, P.woodD);
  rect(c, 89, 118, 6, 14, P.wood);
  rect(c, 97, 118, 6, 14, P.wood);
  return c;
}
function homeExt() {
  const { c } = buildingBase(128, 112, P.wood, P.woodD, P.roof, P.roofD, {
    roofH: 40,
  });
  addWindows(c, 16, 56, 2, 1, 34, 0, true);
  addWindows(c, 90, 56, 1, 1, 0, 0, true);
  addDoor(c, 128, 112, P.woodD);
  // chimney
  rect(c, 96, 6, 10, 20, P.brick);
  rect(c, 96, 6, 10, 3, P.brickL);
  return c;
}
function tower() {
  // tall, neutral glass office tower — the symbolic "Drømmejobben" building
  const c = Canvas(160, 208);
  rect(c, 10, 8, 140, 200, P.towerD);
  rect(c, 12, 10, 136, 198, P.tower);
  rect(c, 12, 10, 4, 198, P.towerL);
  // glass curtain wall grid
  for (let y = 18; y < 188; y += 14)
    for (let x = 22; x < 140; x += 16) {
      const lit = (x + y) % 3 === 0;
      rect(c, x, y, 12, 10, P.glassD);
      rect(c, x + 1, y + 1, 10, 8, lit ? P.glassLit : P.glass);
    }
  // entrance
  rect(c, 64, 184, 32, 24, P.towerD);
  rect(c, 68, 188, 24, 20, P.glassLit);
  rect(c, 79, 188, 2, 20, P.towerD);
  rect(c, 6, 200, 148, 8, P.stoneD); // plaza base
  return c;
}
function university() {
  const { c } = buildingBase(
    192,
    140,
    P.brick,
    P.brickD,
    P.stoneD,
    shade(P.stoneD, 0.8),
    { roofH: 30 },
  );
  // columned institutional front
  for (let x = 24; x < 170; x += 24) {
    rect(c, x, 44, 8, 80, P.stoneL);
    rect(c, x, 44, 2, 80, P.white);
  }
  rect(c, 14, 36, 164, 10, P.stoneL); // architrave
  rect(c, 12, 30, 168, 8, shade(P.stoneD, 0.85)); // pediment band
  addDoor(c, 192, 140, P.woodD);
  rect(c, 84, 120, 24, 20, P.woodD);
  rect(c, 86, 122, 9, 18, P.wood);
  rect(c, 97, 122, 9, 18, P.wood);
  return c;
}
function nikkoHouse() {
  const { c } = buildingBase(
    128,
    104,
    P.cottage,
    P.cottageD,
    P.green,
    shade(P.green, 0.8),
    { roofH: 38 },
  );
  addWindows(c, 18, 52, 1, 1, 0, 0, false);
  addWindows(c, 92, 52, 1, 1, 0, 0, true);
  addDoor(c, 128, 104, P.woodD);
  // little garden box
  rect(c, 14, 92, 18, 6, P.woodD);
  for (let x = 16; x < 30; x += 4) px(c, x, 92, P.red);
  return c;
}

/* ----------------------------------------------------------------------- *
 * CHARACTERS (16×16 base, scaled ×2 → 32×32 frames)
 * ----------------------------------------------------------------------- */

function drawChar(c, ox, oy, colors, dir, frame, s = 2) {
  const { hair, hairD, skin, skinD, top, topD, pants, shoe } = colors;
  const O = P.ink; // outline
  const put = (x, y, col) => rect(c, ox + x * s, oy + y * s, s, s, col);

  // head outline + hair (x4..11, y1..6)
  for (let y = 1; y <= 6; y++) for (let x = 4; x <= 11; x++) put(x, y, hair);
  for (let x = 4; x <= 11; x++) {
    put(x, 0, O);
    put(x, 1, hairD);
  }
  put(3, 2, O);
  put(12, 2, O);
  for (let y = 1; y <= 6; y++) {
    put(3, y, O);
    put(12, y, O);
  }
  put(3, 6, O);
  put(12, 6, O);

  if (dir === "down" || dir === "left" || dir === "right") {
    // face
    for (let y = 3; y <= 6; y++) for (let x = 5; x <= 10; x++) put(x, y, skin);
    put(5, 6, skinD);
    put(10, 6, skinD);
    if (dir === "down") {
      put(6, 4, O);
      put(9, 4, O); // two eyes
      put(7, 6, skinD);
      put(8, 6, skinD);
    } else if (dir === "right") {
      put(9, 4, O); // one eye, facing right
      put(10, 5, skinD);
    } else {
      put(6, 4, O);
      put(5, 5, skinD);
    }
  }

  // body / hoodie (x4..11, y7..11)
  for (let y = 7; y <= 11; y++) for (let x = 4; x <= 11; x++) put(x, y, top);
  for (let y = 7; y <= 11; y++) {
    put(3, y, O);
    put(12, y, O);
  }
  for (let x = 4; x <= 11; x++) put(x, 7, topD); // collar shade
  put(7, 9, topD);
  put(8, 9, topD); // zipper hint
  // arms
  for (let y = 7; y <= 10; y++) {
    put(3, y, dir === "left" ? top : topD);
    put(12, y, dir === "right" ? top : topD);
  }

  // legs (y12..15) with simple walk cycle
  const step = frame === 1 ? 1 : frame === 2 ? -1 : 0;
  const lY = 12 + Math.max(0, step);
  const rY = 12 + Math.max(0, -step);
  for (let y = 0; y < 3; y++) {
    put(5, lY + y, pants);
    put(6, lY + y, pants);
    put(9, rY + y, pants);
    put(10, rY + y, pants);
  }
  put(5, lY + 3, shoe);
  put(6, lY + 3, shoe);
  put(9, rY + 3, shoe);
  put(10, rY + 3, shoe);
  // outline legs
  put(4, lY + 1, O);
  put(11, rY + 1, O);
}

function playerSheet() {
  // 3 cols (idle, walkA, walkB) × 4 rows (down,left,right,up), 32×32 frames
  const c = Canvas(96, 128);
  const colors = {
    hair: hex("#6b4a2b"),
    hairD: hex("#523a22"),
    skin: hex("#eab489"),
    skinD: hex("#d49a6f"),
    top: hex("#3d6ea8"),
    topD: hex("#2f5685"),
    pants: hex("#3a4654"),
    shoe: hex("#242a30"),
  };
  const dirs = ["down", "left", "right", "up"];
  for (let r = 0; r < 4; r++)
    for (let q = 0; q < 3; q++)
      drawChar(c, q * 32, (r * 128) / 4, colors, dirs[r], q, 2);
  return c;
}

function npc(colors) {
  const c = Canvas(32, 32);
  drawChar(c, 0, 0, colors, "down", 0, 2);
  return c;
}

function flutterfly() {
  // 2-frame decorative butterfly (16×16 base ×2 → 32×32)
  const c = Canvas(64, 32);
  const frames = [4, 6]; // wing spread per frame
  frames.forEach((spread, f) => {
    const ox = f * 32;
    const put = (x, y, col) => rect(c, ox + x * 2, y * 2, 2, 2, col);
    // body
    for (let y = 5; y <= 11; y++) put(8, y, P.ink);
    put(7, 4, P.ink);
    put(9, 4, P.ink); // antennae tips
    // wings
    for (let dy = -spread; dy <= spread; dy++) {
      const wx = Math.round((spread - Math.abs(dy)) * 0.9);
      for (let x = 0; x <= wx; x++) {
        put(7 - 1 - x, 7 + dy, dy < 0 ? P.glassLit : P.glassD);
        put(9 + 1 + x, 7 + dy, dy < 0 ? P.glassLit : P.glassD);
      }
    }
    put(4, 6, P.yellow);
    put(12, 6, P.yellow);
  });
  return c;
}

/* ----------------------------------------------------------------------- *
 * MAIN
 * ----------------------------------------------------------------------- */

const tiles = {
  grass: groundTile(P.grass, P.grassD, P.grassL, 1),
  grass2: groundTile(P.grass, P.grassD, P.grassL, 99, 0.16),
  path: pathTile(2),
  water: waterTile(3),
  dirt: groundTile(P.pathD, shade(P.pathD, 0.85), P.path, 5, 0.12),
  floor_class: classFloor(),
  wall_class: wallTile(P.wallClass, P.wallClassD),
  floor_home: homeFloor(),
  wall_home: wallTile(P.wallHome, P.wallHomeD),
  rug: rug(),
};

const props = {
  tree: tree(),
  bush: bush(),
  hedge: hedge(),
  fence: fence(),
  flowers: flowers(),
  rock: rock(),
  lamp: lamp(),
  bench: bench(),
  sign: sign(),
  door: doorProp(),
  window: windowProp(),
  chalkboard: chalkboard(),
  clock: clock(),
  desk_class: deskClass(),
  desk_home: deskHome(),
  pc: pc(),
  duck: duck(),
  coffee: coffee(),
  books: books(),
  bed: bed(),
  plant: plant(),
  journeymap: journeymap(),
  egg: egg(),
  papers: papers(),
};

const buildings = {
  school: school(),
  home: homeExt(),
  drommejobben: tower(),
  oslomet: university(),
  nikko: nikkoHouse(),
};

const sprites = {
  player: playerSheet(),
  npc_student1: npc({
    hair: hex("#3a2e2a"),
    hairD: hex("#241c1a"),
    skin: hex("#d99e74"),
    skinD: hex("#c2855c"),
    top: hex("#b8543f"),
    topD: hex("#974332"),
    pants: hex("#33424f"),
    shoe: hex("#23282d"),
  }),
  npc_student2: npc({
    hair: hex("#caa64a"),
    hairD: hex("#a8862f"),
    skin: hex("#f0c39a"),
    skinD: hex("#d9a577"),
    top: hex("#4f9d72"),
    topD: hex("#3c7a58"),
    pants: hex("#3a3550"),
    shoe: hex("#242a30"),
  }),
  npc_prof: npc({
    hair: hex("#c8c8c8"),
    hairD: hex("#9a9a9a"),
    skin: hex("#e6c39c"),
    skinD: hex("#cda578"),
    top: hex("#33415f"),
    topD: hex("#25304a"),
    pants: hex("#3a3a42"),
    shoe: hex("#23252b"),
  }),
  npc_teacher1: npc({
    hair: hex("#5b3a24"),
    hairD: hex("#432a1a"),
    skin: hex("#e8bd94"),
    skinD: hex("#d0a074"),
    top: hex("#2f8f8f"),
    topD: hex("#236e6e"),
    pants: hex("#3a3550"),
    shoe: hex("#242a30"),
  }),
  npc_teacher2: npc({
    hair: hex("#8a3f2f"),
    hairD: hex("#6a2f22"),
    skin: hex("#f0c8a0"),
    skinD: hex("#d9aa7c"),
    top: hex("#c08a2a"),
    topD: hex("#9a6d1f"),
    pants: hex("#33424f"),
    shoe: hex("#23282d"),
  }),
  npc_teacher3: npc({
    hair: hex("#2e2a28"),
    hairD: hex("#1c1a18"),
    skin: hex("#d9a074"),
    skinD: hex("#c0855c"),
    top: hex("#7a4a86"),
    topD: hex("#5d3866"),
    pants: hex("#333a3f"),
    shoe: hex("#22262a"),
  }),
  npc_kari: npc({
    hair: hex("#8a6a3a"),
    hairD: hex("#6a4f2a"),
    skin: hex("#eec6a0"),
    skinD: hex("#d6a878"),
    top: hex("#2f7f8f"),
    topD: hex("#236470"),
    pants: hex("#3a3550"),
    shoe: hex("#242a30"),
  }),
  npc_nikko: npc({
    hair: hex("#2a2420"),
    hairD: hex("#1a1614"),
    skin: hex("#c98d5e"),
    skinD: hex("#a8734a"),
    top: hex("#c56a2f"),
    topD: hex("#9a4f22"),
    pants: hex("#333a3f"),
    shoe: hex("#22262a"),
  }),
  flutterfly: flutterfly(),
};

let count = 0;
for (const [name, c] of Object.entries(tiles)) {
  await save("tiles", `${name}.png`, c);
  count++;
}
for (const [name, c] of Object.entries(props)) {
  await save("props", `${name}.png`, c);
  count++;
}
for (const [name, c] of Object.entries(buildings)) {
  await save("buildings", `${name}.png`, c);
  count++;
}
for (const [name, c] of Object.entries(sprites)) {
  await save("sprites", `${name}.png`, c);
  count++;
}

console.log(
  `Generated ${count} original Skamløs RPG PNG assets into public/skamlos-rpg/`,
);
