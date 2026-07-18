#!/usr/bin/env node
/* Bildebank / Mulberry-pipelinen, steg 1 av 3: HENT.

   Henter siste release av Mulberry Symbols (CC BY-SA), leser fillista i
   EN/ via git trees-API-et og symbol-info.csv fra release-assets, og
   parser filnavn til etikett + verbflagg etter Mulberrys konvensjon:
   understrek for mellomrom, varianttall sist («carpenter_1a»,
   «old_person_2»), verb med «_,_to»-hale («catch_2_,_to» = «catch»).

   Skriver scripts/bildebank/mulberry-symboler.json som steg 2 (oversett)
   leser. Kjøres på nytt uten bivirkninger (ren nedlasting + parse).

   Bruk:  node scripts/bildebank-mulberry-hent.mjs
   Steg 2: bildebank-mulberry-oversett.mjs (Claude API, ANTHROPIC_API_KEY)
   Steg 3: bildebank-mulberry-kompiler.mjs (gjennomgått TSV → indeks) */

import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const UT_MAPPE = path.join(ROT, 'scripts', 'bildebank');
const UT_FIL = path.join(UT_MAPPE, 'mulberry-symboler.json');

const REPO = 'mulberrysymbols/mulberry-symbols';
const API = `https://api.github.com/repos/${REPO}`;
// Kun trygge basenavn slipper gjennom — fillista er eksterne data og
// navnene ender som URL-er og filstier hos oss. (Store forbokstaver
// forekommer: «Advent.svg», «CD_player_personal.svg».)
const TRYGT_FILNAVN = /^[A-Za-z0-9_,()'-]+\.svg$/;

async function hentJson(url) {
  const svar = await fetch(url, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'bildebank-hent' },
  });
  if (!svar.ok) throw new Error(`${url} svarte ${svar.status}`);
  return svar.json();
}

async function hentTekst(url) {
  const svar = await fetch(url, { headers: { 'user-agent': 'bildebank-hent' } });
  if (!svar.ok) throw new Error(`${url} svarte ${svar.status}`);
  return svar.text();
}

/** «catch_2_,_to.svg» → { etikett: 'catch', verb: true } */
export function parseFilnavn(filnavn) {
  let navn = filnavn.replace(/\.svg$/, '');
  const verb = /_,_to$/.test(navn);
  if (verb) navn = navn.replace(/_,_to$/, '');
  navn = navn.replace(/_\d+[a-z]?$/, '');
  const etikett = navn.replace(/_/g, ' ').trim();
  return { etikett, verb };
}

/** Minimal CSV-parser (komma, doble anførselstegn). */
function parseCsv(tekst) {
  const rader = [];
  let rad = [];
  let felt = '';
  let iAnfoersel = false;
  for (let i = 0; i < tekst.length; i++) {
    const tegn = tekst[i];
    if (iAnfoersel) {
      if (tegn === '"' && tekst[i + 1] === '"') { felt += '"'; i++; }
      else if (tegn === '"') iAnfoersel = false;
      else felt += tegn;
    } else if (tegn === '"') iAnfoersel = true;
    else if (tegn === ',') { rad.push(felt); felt = ''; }
    else if (tegn === '\n') { rad.push(felt.replace(/\r$/, '')); rader.push(rad); rad = []; felt = ''; }
    else felt += tegn;
  }
  if (felt || rad.length) { rad.push(felt.replace(/\r$/, '')); rader.push(rad); }
  return rader.filter((r) => r.some((f) => f.trim() !== ''));
}

async function main() {
  console.log('Henter siste Mulberry-release …');
  const release = await hentJson(`${API}/releases/latest`);
  const versjon = release.tag_name;
  console.log(`  versjon: ${versjon}`);

  // Fillista i EN/ via git trees (contents-API-et klipper ved 1000 filer).
  const ref = await hentJson(`${API}/commits/${encodeURIComponent(versjon)}`);
  const treSha = ref.commit.tree.sha;
  const tre = await hentJson(`${API}/git/trees/${treSha}?recursive=1`);
  if (tre.truncated) throw new Error('git trees-svaret er avkortet — kan ikke stole på fillista');

  const filer = tre.tree
    .filter((n) => n.type === 'blob' && n.path.startsWith('EN/') && n.path.endsWith('.svg'))
    .map((n) => n.path.slice(3));

  const avvist = filer.filter((f) => !TRYGT_FILNAVN.test(f));
  const trygge = filer.filter((f) => TRYGT_FILNAVN.test(f));
  console.log(`  ${trygge.length} SVG-filer i EN/ (${avvist.length} avvist av navnefilteret)`);
  if (avvist.length) console.log(`  avvist: ${avvist.slice(0, 10).join(', ')}${avvist.length > 10 ? ' …' : ''}`);

  // symbol-info.csv fra release-assets (id + kategori).
  const kategorier = {};
  const csvAsset = (release.assets ?? []).find((a) => a.name === 'symbol-info.csv');
  if (csvAsset) {
    console.log('  leser symbol-info.csv …');
    const rader = parseCsv(await hentTekst(csvAsset.browser_download_url));
    const hode = rader[0].map((h) => h.trim().toLowerCase());
    const idKol = hode.findIndex((h) => /^(id|symbol|file|filename|image)/.test(h));
    const katKol = hode.findIndex((h) => /categor/.test(h));
    if (idKol >= 0 && katKol >= 0) {
      for (const rad of rader.slice(1)) {
        const id = (rad[idKol] ?? '').trim().replace(/\.svg$/, '');
        if (id) kategorier[id] = (rad[katKol] ?? '').trim();
      }
      console.log(`  kategorier for ${Object.keys(kategorier).length} symboler`);
    } else {
      console.log(`  fant ikke id-/kategorikolonner (hode: ${hode.join(', ')}) — hopper over`);
    }
  } else {
    console.log('  symbol-info.csv ikke i release-assets — hopper over kategorier');
  }

  const symboler = trygge
    .map((fil) => {
      const id = fil.replace(/\.svg$/, '');
      const { etikett, verb } = parseFilnavn(fil);
      return { fil: id, etikett, verb, kategori: kategorier[id] ?? '' };
    })
    .sort((a, b) => a.fil.localeCompare(b.fil));

  await mkdir(UT_MAPPE, { recursive: true });
  await writeFile(
    UT_FIL,
    JSON.stringify({ versjon, hentet: new Date().toISOString(), symboler }, null, 2)
  );
  console.log(`Skrev ${symboler.length} symboler til ${path.relative(ROT, UT_FIL)}`);
  const verb = symboler.filter((s) => s.verb).length;
  console.log(`  (${verb} verb etter «_,_to»-konvensjonen)`);
}

main().catch((feil) => {
  console.error(`FEIL: ${feil.message}`);
  process.exit(1);
});
