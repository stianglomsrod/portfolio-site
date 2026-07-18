#!/usr/bin/env node
/* Bildebank: selvhosting av SVG-ene («ingenting hentes utenfra» i prod).

   Leser alle indeksfiler i public/bildebank/indeks/, finner hver kode som
   er i bruk, og laster ned nøyaktig de SVG-ene fra PINNEDE versjoner:
   - OpenMoji (CC BY-SA 4.0): color/svg + black/svg → public/bildebank/
   - Mulberry Symbols (CC BY-SA): EN/ → public/bildebank/mulberry/

   Kodene valideres mot OpenMojis metadata (openmoji.json) — en kode som
   ikke finnes der stopper skriptet (rett indeksen; kuratering er poenget).
   FE0F-varianter aksepteres stille: fila lastes fra OpenMojis navn og
   lagres under vår kode, siden URL-ene i klienten bygges av koden.

   Idempotent: filer som alt finnes lastes ikke på nytt.
   Bruk: node scripts/bildebank-hent-svg.mjs [--tving] */

import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const OPENMOJI_VERSJON = '15.1.0';
const MULBERRY_VERSJON = 'v3.6.0';
const OPENMOJI_CDN = `https://cdn.jsdelivr.net/gh/hfg-gmuend/openmoji@${OPENMOJI_VERSJON}`;
const MULBERRY_CDN = `https://cdn.jsdelivr.net/gh/mulberrysymbols/mulberry-symbols@${MULBERRY_VERSJON}`;

const ROT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BANK = path.join(ROT, 'public', 'bildebank');
const INDEKS_MAPPE = path.join(BANK, 'indeks');

const EMOJI_KODE = /^[0-9A-F]{2,6}(-[0-9A-F]{2,6})*$/;
const MULBERRY_KODE = /^m:[A-Za-z0-9_,()'-]+$/;
const TVING = process.argv.includes('--tving');

async function finnes(sti) {
  try {
    await access(sti);
    return true;
  } catch {
    return false;
  }
}

async function hent(url) {
  for (let forsok = 1; ; forsok++) {
    try {
      const svar = await fetch(url, { headers: { 'user-agent': 'bildebank-hent-svg' } });
      if (!svar.ok) throw new Error(`HTTP ${svar.status}`);
      return await svar.text();
    } catch (feil) {
      if (forsok >= 2) throw new Error(`${url}: ${feil.message}`);
      await new Promise((r) => setTimeout(r, 800));
    }
  }
}

function serUtSomSvg(tekst) {
  const start = tekst.trimStart().slice(0, 200).toLowerCase();
  return start.startsWith('<?xml') || start.startsWith('<svg') || start.startsWith('<!--');
}

async function lastNedTil(sti, url) {
  if (!TVING && (await finnes(sti))) return 'fantes';
  const tekst = await hent(url);
  if (!serUtSomSvg(tekst)) throw new Error(`${url}: svaret ser ikke ut som SVG`);
  await writeFile(sti, tekst);
  return 'hentet';
}

/** Kjør oppgaver med begrenset samtidighet. */
async function kjoerAlle(oppgaver, samtidige = 8) {
  const feil = [];
  let neste = 0;
  let hentet = 0;
  let fantes = 0;
  const arbeidere = Array.from({ length: samtidige }, async () => {
    while (neste < oppgaver.length) {
      const mine = oppgaver[neste++];
      try {
        const utfall = await mine();
        if (utfall === 'hentet') hentet++;
        else fantes++;
      } catch (e) {
        feil.push(e.message);
      }
    }
  });
  await Promise.all(arbeidere);
  return { hentet, fantes, feil };
}

async function main() {
  // 1) Alle koder i bruk, fra alle indeksfiler.
  const emojiKoder = new Set();
  const mulberryFiler = new Set();
  for (const fil of await readdir(INDEKS_MAPPE)) {
    if (!fil.endsWith('.json')) continue;
    const indeks = JSON.parse(await readFile(path.join(INDEKS_MAPPE, fil), 'utf8'));
    for (const koder of Object.values(indeks)) {
      if (!Array.isArray(koder)) continue;
      for (const kode of koder) {
        if (typeof kode !== 'string') continue;
        if (EMOJI_KODE.test(kode)) emojiKoder.add(kode);
        else if (MULBERRY_KODE.test(kode)) mulberryFiler.add(kode.slice(2));
        else throw new Error(`Ugyldig kode i ${fil}: «${kode}»`);
      }
    }
  }
  console.log(`${emojiKoder.size} emoji-koder og ${mulberryFiler.size} Mulberry-filer i bruk`);

  // 2) OpenMoji-metadata: koder må finnes der (FE0F-varianter godtas).
  console.log(`Leser OpenMoji-metadata (${OPENMOJI_VERSJON}) …`);
  const meta = JSON.parse(await hent(`${OPENMOJI_CDN}/data/openmoji.json`));
  const gyldige = new Set(meta.map((m) => m.hexcode));

  const kodeTilFil = new Map();
  const ukjente = [];
  for (const kode of emojiKoder) {
    if (gyldige.has(kode)) kodeTilFil.set(kode, kode);
    else {
      const utenFe0f = kode
        .split('-')
        .filter((del) => del !== 'FE0F')
        .join('-');
      const medFe0f = `${kode}-FE0F`;
      if (gyldige.has(utenFe0f)) kodeTilFil.set(kode, utenFe0f);
      else if (gyldige.has(medFe0f)) kodeTilFil.set(kode, medFe0f);
      else ukjente.push(kode);
    }
  }
  if (ukjente.length) {
    console.error(`FEIL: ${ukjente.length} koder finnes ikke i OpenMoji ${OPENMOJI_VERSJON}:`);
    for (const kode of ukjente) console.error(`  ${kode}`);
    console.error('Rett indeksene (kuratering) før selvhosting.');
    process.exit(1);
  }
  const varianter = [...kodeTilFil].filter(([kode, fil]) => kode !== fil);
  if (varianter.length) {
    console.log(`  ${varianter.length} FE0F-varianter (lagres under vår kode):`);
    for (const [kode, fil] of varianter) console.log(`    ${kode} ← ${fil}`);
  }

  // 3) Nedlasting.
  for (const mappe of ['color/svg', 'black/svg', 'mulberry']) {
    await mkdir(path.join(BANK, mappe), { recursive: true });
  }

  const oppgaver = [];
  for (const [kode, kildefil] of kodeTilFil) {
    for (const stilmappe of ['color', 'black']) {
      oppgaver.push(() =>
        lastNedTil(
          path.join(BANK, stilmappe, 'svg', `${kode}.svg`),
          `${OPENMOJI_CDN}/${stilmappe}/svg/${kildefil}.svg`
        )
      );
    }
  }
  for (const fil of mulberryFiler) {
    oppgaver.push(() =>
      lastNedTil(
        path.join(BANK, 'mulberry', `${fil}.svg`),
        `${MULBERRY_CDN}/EN/${encodeURIComponent(fil)}.svg`
      )
    );
  }

  console.log(`Laster ned ${oppgaver.length} filer …`);
  const { hentet, fantes, feil } = await kjoerAlle(oppgaver);
  console.log(`  ${hentet} hentet, ${fantes} fantes fra før`);
  if (feil.length) {
    console.error(`FEIL på ${feil.length} filer:`);
    for (const f of feil.slice(0, 20)) console.error(`  ${f}`);
    process.exit(1);
  }

  // 4) Manifest med pinnede versjoner (leses av tester og mennesker).
  await writeFile(
    path.join(BANK, 'versjoner.json'),
    JSON.stringify(
      {
        openmoji: OPENMOJI_VERSJON,
        mulberry: MULBERRY_VERSJON,
        lisenser: {
          openmoji: 'CC BY-SA 4.0 — openmoji.org',
          mulberry: 'CC BY-SA — mulberrysymbols.org',
          ordkoblinger: 'Unicode CLDR (Unicode License)',
        },
      },
      null,
      2
    )
  );
  console.log('Skrev public/bildebank/versjoner.json — selvhosting klar.');
}

main().catch((feil) => {
  console.error(`FEIL: ${feil.message}`);
  process.exit(1);
});
