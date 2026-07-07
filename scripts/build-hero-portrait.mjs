// Builds the hero portrait from the source photo.
//
// Source : public/images/stian.jpg (full-body photo, EXIF-rotated to 3024×4032)
// Output : public/images/avatar/stian-portrait.webp (head-and-shoulders bust)
//
// The crop is a calm head-and-shoulders bust. It deliberately excludes the
// raised hand / horns gesture on the left of the frame and caps at the upper
// chest so the result reads as a personal, professional portrait.
//
// Run with: node scripts/build-hero-portrait.mjs
// Re-run whenever the source photo or crop box changes.

import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public/images/stian.jpg");
const OUT_DIR = join(root, "public/images/avatar");
const OUT = join(OUT_DIR, "stian-portrait.webp");

// Bust crop in the EXIF-oriented (3024×4032 portrait) source.
// Left edge stays right of the raised hand; bottom caps at the upper chest.
const CROP = { left: 1080, top: 150, width: 1340, height: 1620 };

// Display size: 4:5-ish portrait at retina density.
const OUT_WIDTH = 760;

await mkdir(OUT_DIR, { recursive: true });

await sharp(SRC)
  .rotate() // honour EXIF orientation
  .extract(CROP)
  .resize({ width: OUT_WIDTH })
  .modulate({ saturation: 0.96, brightness: 1.02 }) // calm, slightly muted
  .webp({ quality: 82 })
  .toFile(OUT);

console.log("wrote", OUT);
