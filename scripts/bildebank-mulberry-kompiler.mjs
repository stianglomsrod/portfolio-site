#!/usr/bin/env node
/* Bildebank / Mulberry-pipelinen, steg 3 av 3: KOMPILER.

   Gjennomgått TSV (steg 2) → public/bildebank/indeks/mulberry-nb.json
   med formatet ord → ["m:<fil>", …].

   VIKTIG: ALT som har norsk tekst og ikke status «nei» kompileres —
   den menneskelige gjennomgangen skjer FØR dette steget, i TSV-en.
   Rader med status «nei» eller tomt norsk-felt hoppes over. Synonymer
   splittes på semikolon/komma. Maks 4 filer per ord (først i TSV-en
   vinner). Emoji-først-rekkefølgen ordnes i klienten (utvid-flettingen
   legger m:-koder bakerst).

   MERK: fila som skrives ERSTATTER det håndkuraterte demolaget fra
   feat/bildebank-økta — det var midlertidig til pipelinen ble kjørt.

   Etterpå: node scripts/bildebank-hent-svg.mjs  (selvhoster nye SVG-er)
            node --test tests/bildebank.test.mjs (Done-oppslagene)

   Bruk: node scripts/bildebank-mulberry-kompiler.mjs */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const TSV_FIL = path.join(ROT, 'scripts', 'bildebank', 'mulberry-gjennomgang.tsv');
const UT_FIL = path.join(ROT, 'public', 'bildebank', 'indeks', 'mulberry-nb.json');

const MAKS_FILER_PER_ORD = 4;
const TRYGG_FIL = /^[A-Za-z0-9_,()'-]+$/;
const GYLDIG_ORD = /^\p{L}[\p{L} '-]{0,30}$/u;

async function main() {
  const rader = (await readFile(TSV_FIL, 'utf8')).split('\n');
  const hode = rader[0].split('\t');
  const kol = Object.fromEntries(hode.map((navn, i) => [navn.trim(), i]));
  for (const trengs of ['status', 'fil', 'norsk']) {
    if (!(trengs in kol)) throw new Error(`TSV-en mangler kolonnen «${trengs}»`);
  }

  const indeks = {};
  let brukte = 0;
  let hoppet = 0;

  for (const linje of rader.slice(1)) {
    if (!linje.trim()) continue;
    const felt = linje.split('\t');
    const status = (felt[kol.status] ?? '').trim().toLowerCase();
    const fil = (felt[kol.fil] ?? '').trim();
    const norsk = (felt[kol.norsk] ?? '').trim();

    if (status === 'nei' || !norsk || !fil) {
      hoppet++;
      continue;
    }
    if (!TRYGG_FIL.test(fil)) {
      console.log(`  hopper over utrygt filnavn: «${fil}»`);
      hoppet++;
      continue;
    }

    let brukt = false;
    for (const raa of norsk.split(/[;,]/)) {
      const ord = raa.trim().toLowerCase().normalize('NFC');
      if (!ord || !GYLDIG_ORD.test(ord)) continue;
      const koder = (indeks[ord] ??= []);
      const kode = `m:${fil}`;
      if (koder.length < MAKS_FILER_PER_ORD && !koder.includes(kode)) {
        koder.push(kode);
        brukt = true;
      }
    }
    if (brukt) brukte++;
    else hoppet++;
  }

  const sortert = Object.fromEntries(
    Object.entries(indeks).sort(([a], [b]) => a.localeCompare(b, 'nb'))
  );
  await writeFile(UT_FIL, JSON.stringify(sortert, null, 1));
  console.log(
    `${Object.keys(sortert).length} oppslagsord fra ${brukte} symboler ` +
      `(${hoppet} rader hoppet over) → ${path.relative(ROT, UT_FIL)}`
  );
  console.log('Husk: node scripts/bildebank-hent-svg.mjs  og  node --test tests/bildebank.test.mjs');
}

main().catch((feil) => {
  console.error(`FEIL: ${feil.message}`);
  process.exit(1);
});
