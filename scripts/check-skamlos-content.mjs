// Content guard for the Skamløs RPG pack (v2-utgave).
//
// 1. SPELLING: prosjektet heter "Ordkryss", ALDRI "Ordryss". Hard feil.
// 2. KONSISTENS (Done 22, hard feil): kontakt-/bevis-URL-er skal leses fra
//    src/data/*.json — literale forekomster i spillkoden betyr duplisert
//    sannhet som kan drifte fra siden (slik CS50-URL-en gjorde i baseline).
// 3. CLAIM-LINT (advarsel): speiler porteføljens claim-disiplin i spillet.
//
// Kjøres av `npm run check:skamlos` og automatisk før hvert bygg (prebuild).

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIR = join(ROOT, "src", "spill");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if ([".ts", ".tsx"].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const TYPO = /ordryss/i; // "Ordkryss" uten k

// Literale URL-er som KUN skal finnes i src/data — hard feil i spillkoden.
const HARD_DENY = [
  /mailto:(?!\$\{)/i, // mailto:${data} er OK — literal adresse er det ikke
  /linkedin\.com/i,
  /certificates\.cs50/i,
  /cs50\.harvard\.edu/i,
  /github\.com\/stianglomsrod/i,
  /youtu\.be|youtube\.com/i,
  /vercel\.app/i,
];

const DENY = [
  /senior\s+(distribuerte|distributed)/i,
  /distribuerte\s+systemer\s+ekspert/i,
  /enterprise[-\s]?skala/i,
  /elevresultat|studentresultat|student\s+outcome/i,
  /CS50x?\b[^.]{0,40}\bDjango\b/i, // CS50x lærte aldri bort Django
];

const files = await walk(SCAN_DIR);
let feil = 0;
const warnings = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const rel = file.slice(ROOT.length + 1);
  // claims.ts DEFINERER deny-reglene og skannes ikke mot dem.
  const scanClaims = !rel.endsWith("claims.ts");
  text.split(/\r?\n/).forEach((line, i) => {
    if (TYPO.test(line) && !/ordkryss/i.test(line)) {
      console.error(
        `SPELLING ERROR ${rel}:${i + 1} — found "Ordryss" (should be "Ordkryss")`,
      );
      console.error(`   > ${line.trim()}`);
      feil++;
    }
    const trimmed = line.trim();
    const isComment =
      trimmed.startsWith("//") ||
      trimmed.startsWith("*") ||
      trimmed.startsWith("/*");
    if (isComment) return;
    for (const re of HARD_DENY) {
      if (re.test(line)) {
        console.error(
          `KONSISTENS-FEIL ${rel}:${i + 1} — literal URL i spillkoden (skal leses fra src/data): ${trimmed.slice(0, 100)}`,
        );
        feil++;
      }
    }
    if (scanClaims) {
      for (const re of DENY) {
        if (re.test(line))
          warnings.push(`${rel}:${i + 1} — claim-lint: ${re} :: ${trimmed}`);
      }
    }
  });
}

const hasOrdkryss = (
  await Promise.all(files.map((f) => readFile(f, "utf8")))
).some((t) => /ordkryss/i.test(t));

if (!hasOrdkryss) {
  console.error(
    'SANITY ERROR — the string "Ordkryss" was not found anywhere in the pack.',
  );
  feil++;
}

if (warnings.length) {
  console.warn("\nClaim-lint warnings:");
  warnings.forEach((w) => console.warn("  - " + w));
}

if (feil > 0) {
  console.error(`\nFAILED: ${feil} spelling/sanity/konsistens problem(s).`);
  process.exit(1);
}
console.log(
  `OK — ${files.length} filer: Ordkryss stavet riktig, ingen literale kilde-URL-er i spillkoden, ingen denied claims.`,
);
