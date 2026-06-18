// Builds the Skamløs world face-avatar from the source portrait.
//
// Source : public/images/stian.jpg (full-body photo, EXIF-rotated)
// Output : public/images/avatar/stian-face.png (circular, masked, 256px)
//
// Run with: node scripts/build-avatar.mjs
// Re-run whenever the source photo or crop box changes.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public/images/stian.jpg");
const OUT_DIR = join(root, "public/images/avatar");
const OUT = join(OUT_DIR, "stian-face.png");

// Face crop box in the EXIF-oriented (portrait) source — cap to collar,
// centred on the face. Derived from a 300×400 preview scaled ×10.08.
const CROP = { left: 1109, top: 151, width: 1159, height: 1159 };
const SIZE = 256; // output sprite resolution

const circleMask = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}">
     <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="${SIZE / 2}" fill="#fff"/>
   </svg>`,
);

await mkdir(OUT_DIR, { recursive: true });

const face = await sharp(SRC)
  .rotate() // honour EXIF orientation
  .extract(CROP)
  .resize(SIZE, SIZE, { fit: "cover" })
  .modulate({ saturation: 1.08, brightness: 1.03 }) // a touch of pop
  .toBuffer();

await sharp(face)
  .composite([{ input: circleMask, blend: "dest-in" }])
  .png()
  .toFile(OUT);

console.log("wrote", OUT);
