// Enhetstester for bildebank-kjernen — Done-kriteriene i
// docs/PRD-bildebank.md, kjørbare uten byggesteg:
//   node --test tests/
// (Node ≥ 22.18 kjører TypeScript-modulen direkte med type-stripping.)
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import {
  slaaOpp,
  utvid,
  bildeUrl,
  emojiTegn,
  erGyldigKode,
  erMulberryKode,
  normaliserOrd,
} from '../src/lib/bildebank.ts';

const lesJson = async (sti) =>
  JSON.parse(await readFile(new URL(sti, import.meta.url), 'utf8'));

const basisNb = await lesJson('../public/bildebank/indeks/nb.json');
const basisEn = await lesJson('../public/bildebank/indeks/en.json');
const mulberryNb = await lesJson('../public/bildebank/indeks/mulberry-nb.json');

const nb = utvid(basisNb, mulberryNb);
const en = utvid(basisEn);

test('Done 1 — direkte oppslag og bøyning (nb)', () => {
  for (const ord of ['ku', 'kua', 'kuene', 'hunden', 'eplet', 'jenta']) {
    const f = slaaOpp(nb, ord, 'nb');
    assert.ok(f && f.koder.length > 0, `«${ord}» skal treffe`);
    assert.equal(f.sammensatt, false, `«${ord}» er ikke sammensatt`);
  }
  assert.equal(slaaOpp(nb, 'vaflene', 'nb')?.ord, 'vaffel', 'el-synkope');
  assert.equal(slaaOpp(nb, 'sykler', 'nb')?.ord, 'sykkel', 'el-synkope med dobling');
  assert.equal(slaaOpp(nb, 'klokka', 'nb')?.ord, 'klokke');
  assert.equal(slaaOpp(nb, 'KUA ', 'nb')?.ord, 'ku', 'normalisering (case + trim)');
  assert.equal(slaaOpp(nb, 'kua'.normalize('NFD'), 'nb')?.ord, 'ku', 'NFD-input');
});

test('Done 2 — sammensatte ord foreslår hodet, med merking', () => {
  const tilfeller = [
    ['eplekake', 'kake'],
    ['fotballsko', 'sko'],
    ['tomatsuppe', 'suppe'],
    ['håndball', 'ball'],
    ['arbeidsbok', 'bok'],
    ['tyttebær', 'bær'],
    ['sjokoladeis', 'is'],
    ['hostesaft', 'saft'],
  ];
  for (const [ord, hode] of tilfeller) {
    const f = slaaOpp(nb, ord, 'nb');
    assert.ok(f, `«${ord}» skal gi forslag`);
    assert.equal(f.ord, hode, `«${ord}» → «${hode}»`);
    assert.equal(f.sammensatt, true, `«${ord}» merkes som sammensatt`);
  }
});

test('Done 3 — ærlig tomt der forslag ville vært feil', () => {
  for (const ord of ['ostehøvel', 'avis', 'format', 'rådhus', 'paradis', 'hummus', 'bøkene']) {
    assert.equal(slaaOpp(nb, ord, 'nb'), null, `«${ord}» skal IKKE gi forslag`);
  }
});

test('Done 4 — verb, følelser og adjektiv i norsk indeks', () => {
  for (const ord of ['løpe', 'løper', 'gråter', 'glad', 'sint', 'trøtt', 'rask']) {
    assert.ok(slaaOpp(nb, ord, 'nb'), `«${ord}» skal treffe`);
  }
});

test('Done 4 — engelsk modus: cow treffer, norsk gjør det ikke', () => {
  assert.ok(slaaOpp(en, 'cow', 'en'), '«cow» skal treffe i engelsk indeks');
  assert.ok(slaaOpp(en, 'cows', 'en'), 'enkel flertalls-stripp');
  assert.ok(slaaOpp(en, 'polar bear', 'en'), 'flerords-nøkkel eksakt');
  for (const ord of ['ku', 'hunden', 'eplekake']) {
    assert.equal(slaaOpp(en, ord, 'en'), null, `«${ord}» skal ikke treffe i engelsk modus`);
  }
});

test('Done 5 — Mulberry-laget etter utviding', () => {
  // Avvik fra oppdraget, dokumentert i PRD-en: «cough»/hoste finnes ikke
  // i Mulberry v3.6.0 — «nyse» (sneeze_cold) tester samme mekanisme.
  for (const ord of ['nyse', 'fange', 'snekker']) {
    const f = slaaOpp(nb, ord, 'nb');
    assert.ok(f, `«${ord}» skal treffe etter utviding`);
    assert.ok(f.koder.every(erMulberryKode), `«${ord}» kommer fra Mulberry-laget`);
  }
  assert.equal(slaaOpp(basisNb, 'fange', 'nb'), null, 'uten utviding: tomt');
});

test('Done 5 — «gammel» gir emoji først og Mulberry bakerst', () => {
  const f = slaaOpp(nb, 'gammel', 'nb');
  assert.ok(f && f.koder.length >= 4);
  const foersteMulberry = f.koder.findIndex(erMulberryKode);
  assert.ok(foersteMulberry > 0, 'emoji først');
  assert.ok(
    f.koder.slice(foersteMulberry).every(erMulberryKode),
    'alle m:-koder samlet bakerst'
  );
});

test('Done 5 — m:-koder gir gyldig URL med URL-kodet komma, ingen systemglyf', () => {
  const url = bildeUrl('m:catch_2_,_to', 'farge');
  assert.equal(url, '/bildebank/mulberry/catch_2_%2C_to.svg');
  assert.ok(!url.includes(','), 'komma er URL-kodet');
  assert.equal(emojiTegn('m:catch_2_,_to'), null, 'ingen systemglyf for m:-koder');
  // Mulberry rendres som bilde uansett stil:
  assert.ok(bildeUrl('m:old_person_2', 'system'));
});

test('URL-bygging og kodevalidering (sikkerhet)', () => {
  assert.equal(bildeUrl('1F404', 'farge'), '/bildebank/color/svg/1F404.svg');
  assert.equal(bildeUrl('1F404', 'strek'), '/bildebank/black/svg/1F404.svg');
  assert.equal(bildeUrl('1F404', 'system'), null, 'systemstil bruker glyfen');
  assert.equal(bildeUrl('1F43B-200D-2744-FE0F', 'farge'), '/bildebank/color/svg/1F43B-200D-2744-FE0F.svg');
  // Ugyldige/fiendtlige koder skal aldri bli URL-er:
  for (const stygg of ['../etc/passwd', 'm:../../x', 'm:a/b', '1F404;rm', '<img>', 'm:a%2e%2e', '']) {
    assert.equal(erGyldigKode(stygg), false, `«${stygg}» avvises`);
    assert.equal(bildeUrl(stygg, 'farge'), null, `«${stygg}» gir ingen URL`);
  }
  assert.equal(emojiTegn('1F404'), '🐄');
  assert.equal(emojiTegn('2600'), '☀️', 'tekstsymbol får FE0F i systemstil');
});

test('utvid: dedup, ugyldige koder forkastes, tomme ord fjernes', () => {
  const resultat = utvid(
    { ku: ['1F404'], tom: ['NIX ugyldig'] },
    { ku: ['1F404', '1F42E', 'm:cow_1'], ny: ['m:new_1'] }
  );
  assert.deepEqual(resultat.ku, ['1F404', '1F42E', 'm:cow_1']);
  assert.deepEqual(resultat.ny, ['m:new_1']);
  assert.equal(resultat.tom, undefined, 'ord uten gyldige koder finnes ikke');
});

test('indeksene inneholder kun gyldige koder og normaliserte nøkler', () => {
  for (const [navn, indeks] of [['nb', basisNb], ['en', basisEn], ['mulberry-nb', mulberryNb]]) {
    for (const [ord, koder] of Object.entries(indeks)) {
      assert.equal(ord, normaliserOrd(ord), `${navn}: nøkkelen «${ord}» er normalisert`);
      assert.ok(Array.isArray(koder) && koder.length > 0, `${navn}: «${ord}» har koder`);
      for (const kode of koder) {
        assert.ok(erGyldigKode(kode), `${navn}: «${ord}» har gyldig kode «${kode}»`);
      }
    }
  }
});

test('mulberry-demolaget peker bare på filer som finnes i symbollista', async () => {
  const symboler = await lesJson('../scripts/bildebank/mulberry-symboler.json');
  const fins = new Set(symboler.symboler.map((s) => s.fil));
  for (const koder of Object.values(mulberryNb)) {
    for (const kode of koder) {
      assert.ok(fins.has(kode.slice(2)), `${kode} finnes i Mulberry ${symboler.versjon}`);
    }
  }
});

test('skolefilter-stikkprøver: øl, pistol og sigarett gir ingen forslag', () => {
  for (const ord of ['øl', 'pistol', 'sigarett', 'vin', 'kniv']) {
    assert.equal(slaaOpp(nb, ord, 'nb'), null, `«${ord}» skal ikke finnes i indeksen`);
  }
});

test('Done 9 — generert CLDR-indeks: skolefilteret holder, kodene er gyldige', async () => {
  const cldrNb = await lesJson('../public/bildebank/indeks/nb-cldr.json');
  const cldrEn = await lesJson('../public/bildebank/indeks/en-cldr.json');
  const full = utvid(basisNb, cldrNb, mulberryNb);

  for (const ord of ['øl', 'pistol', 'sigarett']) {
    assert.equal(slaaOpp(full, ord, 'nb'), null, `«${ord}» er filtrert bort`);
  }
  // Dekningen fra CLDR virker (ord utenfor den kuraterte basisen):
  for (const ord of ['traktoren', 'glisefjes', 'avis']) {
    assert.ok(slaaOpp(full, ord, 'nb'), `«${ord}» treffer med CLDR-laget`);
  }
  // Kuratering fra prototypen står ved lag:
  assert.equal(cldrNb['viskelær'], undefined, '«viskelær» skal ikke gi svamp');
  assert.equal(cldrNb['bringebær'], undefined, '«bringebær» skal ikke gi jordbær');

  for (const [navn, indeks] of [['nb-cldr', cldrNb], ['en-cldr', cldrEn]]) {
    for (const [ord, koder] of Object.entries(indeks)) {
      for (const kode of koder) {
        assert.ok(erGyldigKode(kode), `${navn}: «${ord}» har gyldig kode «${kode}»`);
        assert.ok(!/(^|-)1F3F[B-F]($|-)/.test(kode), `${navn}: «${ord}» uten hudtone`);
      }
    }
  }
});

test('alle koder i alle indekser har en selvhostet SVG-fil', async () => {
  const { access } = await import('node:fs/promises');
  const fins = async (sti) => access(new URL(sti, import.meta.url)).then(() => true, () => false);
  const indekser = await Promise.all(
    ['nb', 'en', 'nb-cldr', 'en-cldr', 'mulberry-nb'].map((n) =>
      lesJson(`../public/bildebank/indeks/${n}.json`)
    )
  );
  const koder = new Set(indekser.flatMap((i) => Object.values(i).flat()));
  const mangler = [];
  for (const kode of koder) {
    const stier = kode.startsWith('m:')
      ? [`../public/bildebank/mulberry/${kode.slice(2)}.svg`]
      : [
          `../public/bildebank/color/svg/${kode}.svg`,
          `../public/bildebank/black/svg/${kode}.svg`,
        ];
    for (const sti of stier) {
      if (!(await fins(sti))) mangler.push(sti);
    }
  }
  assert.deepEqual(mangler.slice(0, 10), [], `${mangler.length} SVG-filer mangler`);
});
