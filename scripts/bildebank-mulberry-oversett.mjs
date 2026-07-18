#!/usr/bin/env node
/* Bildebank / Mulberry-pipelinen, steg 2 av 3: OVERSETT.

   KI foreslår, menneske godkjenner: oversetter Mulberrys engelske
   etiketter til norsk med Claude-API-et og skriver en gjennomgangsfil
   (TSV) som åpnes i Excel/LibreOffice. INGENTING publiseres herfra —
   steg 3 (kompiler) kjøres først ETTER menneskelig gjennomgang.

   Oversettelsesregler (ligger i systemprompten):
   - substantiv i ubestemt entall («carpenter» → «snekker»)
   - verb i infinitiv uten «å» («cough» → «hoste») — da treffer
     lærerens naturlige ord (bøyningsfallbacken tar «hoster»/«hostet»)
   - små bokstaver, æøå; 1–3 synonymer; uoversettelig → tom liste

   TSV-kolonner: status  fil  engelsk  verb  kategori  norsk  kommentar
   - status «ja»: KI-forslag klart til gjennomgang
   - status «sjekk»: skolefilter-treff (redigerbart regex i
     scripts/bildebank/skolefilter.json) — sett til «nei» eller behold
   - status «nei» eller tomt norsk-felt: steg 3 hopper over raden
   MERK: steg 3 kompilerer ALT som har norsk tekst og ikke er «nei» —
   gjennomgangen skjer FØR kompilering, ikke i den.

   Gjenopptakbart: filer som alt står i TSV-en hoppes over ved ny kjøring.
   Bruk:
     ANTHROPIC_API_KEY=…  node scripts/bildebank-mulberry-oversett.mjs
       [--maks=160]   billig testrunde først (antall symboler)
       [--modell=haiku]  claude-haiku-4-5-20251001 (billigst); standard
                         er claude-sonnet-4-6
   Oppsett/API-referanse: docs.claude.com/en/api/overview */

import { readFile, writeFile, appendFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const MAPPE = path.join(ROT, 'scripts', 'bildebank');
const SYMBOLFIL = path.join(MAPPE, 'mulberry-symboler.json');
const TSV_FIL = path.join(MAPPE, 'mulberry-gjennomgang.tsv');
const TSV_HODE = 'status\tfil\tengelsk\tverb\tkategori\tnorsk\tkommentar\n';

const BATCH = 80;
const maksArg = process.argv.find((a) => a.startsWith('--maks='));
const MAKS = maksArg ? parseInt(maksArg.slice(7), 10) : Infinity;
const MODELL = process.argv.includes('--modell=haiku')
  ? 'claude-haiku-4-5-20251001'
  : 'claude-sonnet-4-6';

const API_NOKKEL = process.env.ANTHROPIC_API_KEY;
if (!API_NOKKEL) {
  console.error('FEIL: sett ANTHROPIC_API_KEY i miljøet (aldri i kode/repo).');
  process.exit(1);
}

const SYSTEM = `Du oversetter engelske symbol-etiketter til norsk bokmål for en bildebank i skoleverktøy (1.–4. trinn). Regler:
- Substantiv: ubestemt entall («carpenter» → «snekker»).
- Verb (merket "verb": true): infinitiv UTEN «å» («cough» → «hoste»).
- Små bokstaver, norske tegn (æ, ø, å). 1–3 gode synonymer per etikett — bare ord en lærer faktisk ville skrevet. Færre er bedre enn tvilsomme.
- Uoversettelig, for spesiell eller meningsløs for norsk småskole → tom liste.
Svar KUN med et JSON-objekt: {"<fil>": ["synonym1", "synonym2"], …} — én nøkkel per fil du fikk, ingen andre nøkler, ingen tekst utenfor JSON.`;

/** Kall Claude-API-et; returnerer tekstinnholdet i svaret. */
async function kallClaude(brukertekst) {
  const svar = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': API_NOKKEL,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODELL,
      max_tokens: 4096,
      system: SYSTEM,
      messages: [{ role: 'user', content: brukertekst }],
    }),
  });
  if (!svar.ok) {
    const kropp = await svar.text().catch(() => '');
    throw new Error(`Claude-API-et svarte ${svar.status}: ${kropp.slice(0, 300)}`);
  }
  const data = await svar.json();
  return (data.content ?? [])
    .filter((blokk) => blokk.type === 'text')
    .map((blokk) => blokk.text)
    .join('');
}

/** Streng JSON-kontrakt: objekt av streng-lister. Modellsvar er utrustet
    input — alt annet forkastes. */
function parseOversettelser(tekst, forventedeFiler) {
  const start = tekst.indexOf('{');
  const slutt = tekst.lastIndexOf('}');
  if (start < 0 || slutt <= start) throw new Error('fant ikke JSON i svaret');
  const raa = JSON.parse(tekst.slice(start, slutt + 1));
  const ut = {};
  for (const fil of forventedeFiler) {
    const verdi = raa[fil];
    if (!Array.isArray(verdi)) {
      ut[fil] = [];
      continue;
    }
    ut[fil] = verdi
      .filter((v) => typeof v === 'string')
      .map((v) => v.trim().toLowerCase().normalize('NFC'))
      .filter((v) => /^\p{L}[\p{L} '-]{0,30}$/u.test(v))
      .slice(0, 3);
  }
  return ut;
}

/** TSV-felt: tab/linjeskift kan ikke forekomme (injeksjonsvern + format). */
const tsvFelt = (verdi) => String(verdi).replace(/[\t\r\n]+/g, ' ').trim();

async function main() {
  const { versjon, symboler } = JSON.parse(await readFile(SYMBOLFIL, 'utf8'));
  const skolefilter = JSON.parse(await readFile(path.join(MAPPE, 'skolefilter.json'), 'utf8'));
  const monsterNb = new RegExp(skolefilter.ordMonstre.nb, 'iu');
  const monsterEn = new RegExp(skolefilter.ordMonstre.en, 'iu');

  // Gjenopptak: hopp over filer som alt har en rad.
  let gjort = new Set();
  try {
    await access(TSV_FIL);
    const rader = (await readFile(TSV_FIL, 'utf8')).split('\n').slice(1);
    gjort = new Set(rader.map((r) => r.split('\t')[1]).filter(Boolean));
  } catch {
    await writeFile(TSV_FIL, TSV_HODE);
  }

  const gjenstaar = symboler.filter((s) => !gjort.has(s.fil)).slice(0, MAKS);
  console.log(
    `Mulberry ${versjon}: ${symboler.length} symboler, ${gjort.size} alt oversatt, ` +
      `${gjenstaar.length} i denne runden (modell: ${MODELL})`
  );

  for (let i = 0; i < gjenstaar.length; i += BATCH) {
    const batch = gjenstaar.slice(i, i + BATCH);
    const filer = batch.map((s) => s.fil);
    const bestilling =
      'Oversett disse etikettene:\n' +
      JSON.stringify(
        batch.map((s) => ({ fil: s.fil, etikett: s.etikett, verb: s.verb })),
        null,
        1
      );

    let oversatt;
    try {
      oversatt = parseOversettelser(await kallClaude(bestilling), filer);
    } catch (feil) {
      console.log(`  batch ${i / BATCH + 1}: ${feil.message} — prøver én gang til …`);
      oversatt = parseOversettelser(await kallClaude(bestilling), filer);
    }

    let linjer = '';
    for (const symbol of batch) {
      const norsk = oversatt[symbol.fil] ?? [];
      const filterTreff =
        monsterEn.test(symbol.etikett) ||
        symbol.etikett.split(' ').some((o) => monsterEn.test(o)) ||
        norsk.some((o) => monsterNb.test(o) || o.split(' ').some((d) => monsterNb.test(d)));
      const status = filterTreff ? 'sjekk' : 'ja';
      const kommentar = filterTreff ? 'skolefilter-treff — vurder' : '';
      linjer +=
        [
          status,
          tsvFelt(symbol.fil),
          tsvFelt(symbol.etikett),
          symbol.verb ? 'verb' : '',
          tsvFelt(symbol.kategori),
          tsvFelt(norsk.join('; ')),
          kommentar,
        ].join('\t') + '\n';
    }
    await appendFile(TSV_FIL, linjer);
    console.log(`  ${Math.min(i + BATCH, gjenstaar.length)}/${gjenstaar.length} skrevet`);
  }

  console.log(`\nGjennomgangsfil: ${path.relative(ROT, TSV_FIL)}`);
  console.log('Åpne i Excel/LibreOffice, rett norsk-feltet, sett «nei» på rader som');
  console.log('ikke skal med. Deretter: node scripts/bildebank-mulberry-kompiler.mjs');
}

main().catch((feil) => {
  console.error(`FEIL: ${feil.message}`);
  process.exit(1);
});
