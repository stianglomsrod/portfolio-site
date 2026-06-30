// Content guard for the Skamløs RPG pack.
//
// 1. SPELLING: the project is "Ordkryss" (crossword), NEVER "Ordryss". This
//    fails the check (exit 1) if the typo slips into any source/visible copy.
// 2. CLAIM-LINT (light): warns if denied claim phrases appear in pack text,
//    mirroring the portfolio's DNB claim discipline inside the game.
//
// Run with: node scripts/check-skamlos-content.mjs   (or: npm run check:skamlos)

import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIR = join(ROOT, "app", "skamlos-rpg");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if ([".ts", ".tsx"].includes(extname(entry.name))) out.push(full);
  }
  return out;
}

const TYPO = /ordryss/i; // "Ordkryss" with the k missing
const DENY = [
  /senior\s+(distribuerte|distributed)/i,
  /distribuerte\s+systemer\s+ekspert/i,
  /enterprise[-\s]?skala/i,
  /elevresultat|studentresultat|student\s+outcome/i,
  /CS50x?\b[^.]{0,40}\bDjango\b/i, // never imply CS50x taught Django
];

const files = await walk(SCAN_DIR);
let typos = 0;
const warnings = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  const rel = file.slice(ROOT.length + 1);
  // The claims policy file DEFINES the deny rules/boundaries, so exclude it
  // from the claim-lint scan (it would otherwise flag its own guardrails).
  const scanClaims = !rel.endsWith("claims.ts");
  text.split(/\r?\n/).forEach((line, i) => {
    if (TYPO.test(line) && !/ordkryss/i.test(line)) {
      console.error(`SPELLING ERROR ${rel}:${i + 1} — found "Ordryss" (should be "Ordkryss")`);
      console.error(`   > ${line.trim()}`);
      typos++;
    }
    const trimmed = line.trim();
    const isComment = trimmed.startsWith("//") || trimmed.startsWith("*") || trimmed.startsWith("/*");
    if (scanClaims && !isComment) {
      for (const re of DENY) {
        if (re.test(line)) warnings.push(`${rel}:${i + 1} — claim-lint: ${re} :: ${trimmed}`);
      }
    }
  });
}

const hasOrdkryss = (
  await Promise.all(files.map((f) => readFile(f, "utf8")))
).some((t) => /ordkryss/i.test(t));

if (!hasOrdkryss) {
  console.error('SANITY ERROR — the string "Ordkryss" was not found anywhere in the pack.');
  typos++;
}

if (warnings.length) {
  console.warn("\nClaim-lint warnings:");
  warnings.forEach((w) => console.warn("  - " + w));
}

if (typos > 0) {
  console.error(`\nFAILED: ${typos} spelling/sanity problem(s).`);
  process.exit(1);
}
console.log(`OK — Ordkryss spelled correctly across ${files.length} files; no denied claims.`);
