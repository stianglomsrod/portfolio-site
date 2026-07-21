# PRD: Vipps-donasjon for Lærerrommet

> Produsert med goal-prd 2026-07-21 fra Stians brief (alle seks intervjusvar
> forhåndsgitt). Compliance-port kjørt først: 🟢 GRØNT — se
> `docs/compliance/compliance_register.md` rad 20. Gren: `feat/vipps`.

## Scope

Endring av eksisterende side: en rolig, ærlig «spandér en kaffe»-donasjonsmulighet
via Vipps for Lærerrommet — donasjonsblokk nederst på `/laerer`, én diskré linje i
footeren på norske verktøysider. Ingen betalingslogikk på siden: kun offisiell QR
og lenke inn i Vipps-appen (Vippsnummer 59882, valgfritt beløp).

## Stack

Astro 6 statisk (som i dag), stil fra `src/styles/tokens.css`, ingen klient-JS.
Byggetid: Node-skript med `jsqr` + `pngjs` (nye devDependencies, pinnet) som
dekoder den offisielle QR-PNG-en. QA: Playwright-riggen i `_baseline/qa/`
(gitignored).

## Surfaces

- `public/vipps/vipps-qr-59882.png` — offisiell QR fra Vipps-bedriftsportalen
  («Plakater og QR-koder»), uendret.
- `public/vipps/vipps-merke.svg` + `public/vipps/vipps-navn.svg` — offisielle
  RGB-merkefiler fra Vipps' retningslinjer, uendret (aldri omtegnet/omfarget).
- `scripts/vipps-dekod-qr.mjs` — byggetids-dekoding av QR-en; validerer
  `https://qr.vipps.no/…`, feiler bygget ellers (fail-closed).
- `src/data/vipps.json` — generert av skriptet: nummer + eksakt dekodet URL.
- `src/components/VippsDonasjon.astro` — blokka (mobil: knapp, desktop: QR).
- `src/components/Footer.astro` — betinget én-linje på nb-verktøysider
  (oppslag i `VERKTOY`-katalogen; en-sider aldri).
- `src/pages/laerer.astro` — blokka inn nederst, etter at verdien er vist.
- `src/pages/kolofon.astro` + `src/pages/en/colophon.astro` — driftstransparens:
  navn + org.nr 838 126 782 der krediteringene bor.
- `package.json` — prebuild-kjede + pinnede devDeps.
- `_baseline/qa/vipps-print-sjekk.mjs` — ny QA: print-emulering av SAMTLIGE
  verktøysider + synlighetskrav + nettverkssjekk.
- `docs/LOGG.md`, `docs/compliance/compliance_register.md` — oppdatert.

## Data

Input: offisiell QR-PNG (dekodes i byggetid til qr.vipps.no-URL), Vippsnummer
59882, Stians donasjonstekster. Output: statisk HTML med utelukkende lokale
assets. Ingen lagring, ingen skjemaer, ingen persondata, ingen eksterne kall.

## Constraints

- Sidens løfter er ufravikelige: ingen konto, 0 cookies, 0 sporing, 0 nye
  eksterne requests — nettverkspanelet identisk før og etter.
- **Print-regelen er viktigst:** donasjonsblokk/-linje skal ALDRI kunne havne på
  utskrift (ark deles ut til barn). Belte og bukseseler: print-skjuling i selve
  komponenten i tillegg til verktøyenes eksisterende print-CSS.
- Vipps-merket: kun offisielle filer, aldri tegnet på nytt eller omfarget.
  QR-en er offisiell vare — genereres aldri selv.
- Lenkeformat gjettes ikke: href = eksakt URL dekodet fra QR-en. Beløp kan ikke
  forhåndsutfylles («valgfritt beløp»-produktet); teksten kan foreslå.
- Teksten antyder aldri motytelse — gave, ikke kjøp.
- Rolig plassering: ingen popup, ingen banner, ingenting som avbryter
  arbeidsflyten i verktøyene. Engelske sider uendret.
- Eksisterende krediteringer i kolofonen skal bestå urørt.

## Done

1. **Plassering:** Donasjonsblokka er synlig på `/laerer`, footer-linja på alle
   norske verktøysider, og begge er fraværende på samtlige `/en/`-sider.
   *Verifiser:* `_baseline/qa/vipps-print-sjekk.mjs` sjekker skjermvisning på
   alle nb-verktøysider + `/laerer` + alle en-tvillinger.
2. **Print:** Utskrift av hvert enkelt verktøy (og `/laerer`) viser aldri QR,
   Vippsnummer eller donasjonstekst. *Verifiser:* print-emulering per side i
   samme QA-skript — testet, ikke antatt.
3. **Personvern:** Ingen nye eksterne requests; QR og merker serveres lokalt;
   0 cookies, ingen sporing. *Verifiser:* nettverkslogg per side i QA-skriptet
   (kun localhost) + cookie-sjekk.
4. **Lenken:** Mobilknappens href er nøyaktig URL-en fra den dekodede offisielle
   QR-en (host `qr.vipps.no`). *Verifiser:* byggetidsskriptet feiler ved avvik;
   QA sammenlikner DOM-href mot `src/data/vipps.json`. Fysisk telefontest
   (åpner Vipps-appen) gjør Stian.
5. **Tilgjengelighet:** QR-en har beskrivende alt-tekst, knapp/lenker har synlig
   fokus, kontrast holder AA. *Verifiser:* axe + kant-sjekk på `/laerer` og
   verktøysider; fokusstil via tokens.
6. **Kolofon:** Navn + org.nr 838 126 782 vises, eksisterende krediteringer er
   intakte. *Verifiser:* innholdssjekk av `/kolofon` og `/en/colophon` i QA.
7. **Merkevare:** Vipps-merket bruker de offisielle filene uendret (offisiell
   oransje, ingen omtegning). *Verifiser:* filene i `public/vipps/` er
   byte-identiske med de leverte originalene (`fc`-sammenlikning).
