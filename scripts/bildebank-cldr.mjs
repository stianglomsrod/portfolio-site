#!/usr/bin/env node
/* Bildebank: full ordindeks fra Unicode CLDR (offisielle emoji-navn og
   søkenøkkelord per språk), filtrert for skolebruk.

   Kilder (pinnede versjoner, permissiv Unicode-lisens):
   - cldr-annotations-full/annotations/<språk>/annotations.json
   - cldr-annotations-derived-full/annotationsDerived/<språk>/annotations.json
     (dekker ZWJ-sekvenser som isbjørn 🐻‍❄️)
   Kun emojier som finnes i OpenMoji-settet vårt tas med (metadataene
   avgjør tegn → hexcode, og hudtone-varianter droppes der).

   Filtre (redigerbare — ikke hardkodet moralisme):
   - scripts/bildebank/skolefilter.json  (blokkerte koder + ordmønstre)
   - scripts/bildebank/cldr-kuratering.json (fjernOrd/fjernKobling —
     «viskelær» skal ikke gi svamp)

   Ut: public/bildebank/indeks/<språk>-cldr.json (lastes som utvid-lag
   OVER den kuraterte basisen; basisens koder står alltid først).
   Kjør scripts/bildebank-hent-svg.mjs etterpå for selvhosting.

   Bruk: node scripts/bildebank-cldr.mjs [--spraak=nb,en] (nn støttes) */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CLDR_VERSJON = '48.2.0';
const OPENMOJI_VERSJON = '15.1.0';
const MAKS_KODER_PER_ORD = 4;

const ROT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const KONFIG_MAPPE = path.join(ROT, 'scripts', 'bildebank');
const UT_MAPPE = path.join(ROT, 'public', 'bildebank', 'indeks');

const spraakArg = process.argv.find((a) => a.startsWith('--spraak='));
const SPRAAK = spraakArg ? spraakArg.slice(9).split(',') : ['nb', 'en'];

// CLDR 43+ bruker «no» som primærlocale for bokmål; vi beholder nb i
// filnavn og indeksnavn (matcher sidene våre).
const CLDR_LOCALE = { nb: 'no', nn: 'nn', en: 'en' };

// Oppslagsord: bokstaver (inkl. æøå m.fl.), ev. bindestrek/apostrof inni,
// maks to ord. Tall, kolon, «flagg: Norge»-navn osv. ryker.
const GYLDIG_ORD = /^\p{L}[\p{L}'-]*( \p{L}[\p{L}'-]*)?$/u;

async function hentJson(url) {
  const svar = await fetch(url, { headers: { 'user-agent': 'bildebank-cldr' } });
  if (!svar.ok) throw new Error(`${url} svarte ${svar.status}`);
  return svar.json();
}

function tilNokler(raatt) {
  // CLDR-verdier kan inneholde | -delte alternativer i selve strengen.
  return String(raatt)
    .split('|')
    .map((del) => del.trim().toLowerCase().normalize('NFC'))
    .filter(Boolean);
}

async function main() {
  const skolefilter = JSON.parse(
    await readFile(path.join(KONFIG_MAPPE, 'skolefilter.json'), 'utf8')
  );
  const kuratering = JSON.parse(
    await readFile(path.join(KONFIG_MAPPE, 'cldr-kuratering.json'), 'utf8')
  );
  const blokkerteKoder = new Set(skolefilter.blokkerteKoder ?? []);
  const fjernOrd = new Set(kuratering.fjernOrd ?? []);
  const fjernKobling = kuratering.fjernKobling ?? {};

  console.log(`Leser OpenMoji-metadata (${OPENMOJI_VERSJON}) …`);
  const openmoji = await hentJson(
    `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@${OPENMOJI_VERSJON}/data/openmoji.json`
  );

  // tegn → {hexcode, order}; hudtoner droppes her når filteret sier det.
  // (Både metadata-feltet og selve kodeleddene sjekkes — kombinasjons-
  // varianter har tomt skintone-felt i metadataene.)
  const HUDTONE = /(^|-)1F3F[B-F]($|-)/;
  const KJOENNET = /-200D-26(40|42)-FE0F$/;
  const tegnTilKode = new Map();
  for (const m of openmoji) {
    if (skolefilter.droppHudtoner && m.skintone !== '' && m.skintone !== undefined) continue;
    if (skolefilter.droppHudtoner && HUDTONE.test(m.hexcode)) continue;
    if (skolefilter.droppKjonnsvarianter && KJOENNET.test(m.hexcode)) continue;
    if (!m.emoji || !m.hexcode) continue;
    tegnTilKode.set(m.emoji, { kode: m.hexcode, orden: m.order ?? 99999 });
    // CLDR-nøkler kan mangle variantselektoren:
    const utenFe0f = m.emoji.replaceAll('️', '');
    if (utenFe0f && !tegnTilKode.has(utenFe0f)) {
      tegnTilKode.set(utenFe0f, { kode: m.hexcode, orden: m.order ?? 99999 });
    }
  }

  for (const spraak of SPRAAK) {
    const locale = CLDR_LOCALE[spraak];
    if (!locale) throw new Error(`Ukjent språk «${spraak}» (kjenner: nb, nn, en)`);
    console.log(`\n${spraak}: henter CLDR ${CLDR_VERSJON} (locale «${locale}») …`);
    const ordMonster = skolefilter.ordMonstre?.[spraak]
      ? new RegExp(skolefilter.ordMonstre[spraak], 'iu')
      : null;

    const [vanlige, avledede] = await Promise.all([
      hentJson(
        `https://cdn.jsdelivr.net/npm/cldr-annotations-full@${CLDR_VERSJON}/annotations/${locale}/annotations.json`
      ),
      hentJson(
        `https://cdn.jsdelivr.net/npm/cldr-annotations-derived-full@${CLDR_VERSJON}/annotationsDerived/${locale}/annotations.json`
      ),
    ]);

    const kilder = [
      vanlige.annotations?.annotations ?? {},
      avledede.annotationsDerived?.annotations ?? {},
    ];

    // ord → [{kode, orden, erNavn}]
    const kandidater = new Map();
    let brukteEmojier = 0;

    for (const kilde of kilder) {
      for (const [tegn, felt] of Object.entries(kilde)) {
        const funn = tegnTilKode.get(tegn) ?? tegnTilKode.get(tegn.replaceAll('️', ''));
        if (!funn || blokkerteKoder.has(funn.kode)) continue;
        brukteEmojier++;

        const navneOrd = new Set((felt.tts ?? []).flatMap(tilNokler));
        const alleOrd = new Set([...navneOrd, ...(felt.default ?? []).flatMap(tilNokler)]);

        for (const ord of alleOrd) {
          if (!GYLDIG_ORD.test(ord) || ord.length < 2 || ord.length > 24) continue;
          if (ordMonster?.test(ord)) continue;
          if (fjernOrd.has(ord)) continue;
          if (fjernKobling[ord]?.includes(funn.kode)) continue;
          let liste = kandidater.get(ord);
          if (!liste) kandidater.set(ord, (liste = []));
          if (!liste.some((k) => k.kode === funn.kode)) {
            liste.push({ kode: funn.kode, orden: funn.orden, erNavn: navneOrd.has(ord) });
          }
        }
      }
    }

    // Navnetreff foran nøkkelordtreff, deretter Unicode-rekkefølge; cap.
    const indeks = {};
    for (const [ord, liste] of [...kandidater.entries()].sort(([a], [b]) =>
      a.localeCompare(b, spraak)
    )) {
      liste.sort((a, b) => Number(b.erNavn) - Number(a.erNavn) || a.orden - b.orden);
      indeks[ord] = liste.slice(0, MAKS_KODER_PER_ORD).map((k) => k.kode);
    }

    // Kompakt JSON — fila er generert (redigér kildene, ikke denne).
    const utFil = path.join(UT_MAPPE, `${spraak}-cldr.json`);
    await writeFile(utFil, JSON.stringify(indeks));
    console.log(
      `  ${Object.keys(indeks).length} oppslagsord fra ${brukteEmojier} emoji-oppføringer → ${path.relative(ROT, utFil)}`
    );
  }

  console.log('\nHusk: node scripts/bildebank-hent-svg.mjs (selvhosting av nye koder).');
}

main().catch((feil) => {
  console.error(`FEIL: ${feil.message}`);
  process.exit(1);
});
