# PRD: Bildebank for Lærerrommet

> Produsert med goal-prd 2026-07-18 fra Stians oppdragstekst (validert arkitektur,
> låste designbeslutninger). Compliance-port kjørt først: 🟢 GRØNT
> (compliance_register.md rad 19) — forutsetter at alt forblir klientside.
> Ligger i docs/ (ikke docs/handoff/): feature-PRD, ikke frossen spec.

## Scope

Endring i eksisterende kodebase: en bildebank for oppgavearkverktøyene i
Lærerrommet. Læreren skriver et ord («ku») og får et bildeforslag som beholdes
implisitt, byttes (⟳) eller fjernes (✕). Norsk er standard; engelsk aktiveres
med avhuking. Alt skjer i nettleseren — ingen konto, ingen opplasting, ingen
informasjonskapsler, ingen eksterne kall i produksjon. Ufravikelig.

## Stack

Astro 6 (statisk output), TypeScript i `src/lib/`, verktøy som .astro-komponenter
med inline `<script>`. Design: `docs/handoff/tokens.css` / `src/styles/tokens.css`
er kilden til sannhet. Node-skript uten avhengigheter i `scripts/`.
Grafikk: OpenMoji 15.1.0 (CC BY-SA 4.0, farge + svart strek) og Mulberry Symbols
v3.5.2 (CC BY-SA). Ordkoblinger: Unicode CLDR (nb + en). ARASAAC/Sclera er
forkastet (NC-lisens) og skal ikke inn.

## Surfaces

- `src/lib/bildebank.ts` — ren kjerne (DOM-fri): normalisering, oppslag,
  bøyningsfallback, sammensatt-analyse, lagvis `utvid`-fletting, kode→URL.
- `src/lib/bildebank-brikke.ts` — UI-brikken: kobles til ordfelt i verktøyene
  (debounce ~250 ms, ⟳/✕, aria, reduced motion, aldri innerHTML med brukertekst).
- Basisindekser (kuratert): norsk (~460 ord: substantiv, verb, følelser,
  adjektiv, årstider) + engelsk (~300 ord). Mulberry-demolag med ekte filnavn
  fra v3.5.2 så Done-ordene treffer før full pipeline er kjørt.
- Integrasjon i 5 verktøy: `OrdTilBildeVerktoy` (bilde påkrevd — først),
  `OrdbingoVerktoy`, `SilhuettVerktoy`, `OrdkryssVerktoy`, `KryssordVerktoy`
  (bilde valgfritt) — samme brikke, verktøyets regler styrer.
- `scripts/bildebank-cldr.mjs` — full CLDR-indeks (nb + en, valgfritt nn) med
  redigerbart skolefilter (blokkeringsliste, ikke hardkodet moralisme).
- Mulberry-pipeline: `scripts/bildebank-mulberry-hent.mjs`,
  `-oversett.mjs` (Claude API, gjennomgangs-TSV), `-kompiler.mjs` (TSV → indeks).
  Stian kjører oversettelse + gjennomgang; gjenopptakbare, `--maks`-flagg.
- `scripts/bildebank-hent-svg.mjs` — selvhosting: laster ned nøyaktig de SVG-ene
  indeksene bruker til `public/bildebank/{color,black,mulberry}/` (pinnet versjon).
- Kreditering i kolofonen (nb + en): OpenMoji · Mulberry Symbols · Unicode CLDR.
- Ønskeliste: ord uten treff samles i økta, frivillig innsending via mailto.
- Enhetstester for kjernen + indeksene (Node, kjørbare lokalt og i QA).

## Data

Inn: lærerens enkeltord (aldri persondata etter formålet). Ut: symbolkoder →
`ord → ["1F404", "1F1F3-1F1F4", "m:catch_2_,_to"]` (emoji som hex-strenger,
sekvenser med bindestrek; Mulberry med `m:`-prefiks; emoji først, Mulberry
bakerst; flere koder = ⟳-alternativer). Koder → URL-er under `/bildebank/…`
(m:-filnavn URL-kodes — komma!). Tre stiler: systememoji, OpenMoji farge
(standard, konsistent utskrift), OpenMoji strek; Mulberry alltid bilde.
Stilvalg + fjernede forslag: kun i minnet/localStorage (funksjonelt). Ingenting
sendes ut. Indekser lastes fra egen origin (`public/bildebank/indeks/*.json`).

## Constraints

- Klientside-løftet er ufravikelig; selvhosting i prod (CDN kun i dev-skript).
- Lærerens egne innlimte bilder (Ctrl+V-flyten) vinner ALLTID over forslag;
  eksisterende flyt og fasit-mekanikk i verktøyene må ikke brekke.
- Bilde påkrevd kun i Ord og bilde (Ctrl+V som fallback, manglende rader
  markeres som i dag); i de fire andre er tomt greit.
- Norsk-reglene er låst (se Done 1–3); vokalskifte («bøkene») er akseptert hull.
- Kuratering over dekning: ingen forslag er bedre enn feil forslag.
- ARASAAC/Sclera skal ikke inn (NC). Widgit/egen Grindverk-bank er fremtidsspor —
  ikke bygg dem, ikke bygg dem bort (utvid-mekanismen er åpningen).
- KI kun i produksjonslinja med menneskelig gjennomgang; aldri API-nøkler i klient.
- docs/handoff/ røres ikke. Repo-regler gjelder (tokens, axe 0, kant-sjekk,
  tvillingsider nb/en, print-CSS-mønsteret, `git commit -F`).
- Ute av v1: nynorsk-indeks som standard (skriptet kan generere), Widgit,
  egen bildegenerering, backend av noe slag.

## Done

1. **Bøyning (nb):** `ku`, `kua`, `kuene`, `hunden`, `eplet`, `jenta` treffer;
   `vaflene`→vaffel, `sykler`→sykkel (el/er-synkope), `klokka`→klokke.
   Verifiseres med enhetstester.
2. **Sammensatte ord (kun nb, ≥6 tegn):** `eplekake`→kake, `fotballsko`→sko,
   `tomatsuppe`→suppe, `håndball`→ball, `arbeidsbok`→bok, `tyttebær`→bær,
   `sjokoladeis`→is, `hostesaft`→saft — alle merket «siste ledd i ordet».
   Enhetstester.
3. **Ærlig tomt:** `ostehøvel`, `avis`, `format`, `rådhus`, `paradis`, `hummus`,
   `bøkene` gir ingen forslag. Enhetstester.
4. **Verb/følelser/adjektiv:** `løpe`, `løper`, `gråter`, `glad`, `sint`,
   `trøtt`, `rask` treffer i norsk indeks. Engelsk modus: `cow` treffer, norske
   ord gjør det ikke. Enhetstester.
5. **Mulberry-laget:** etter `utvid` treffer `nyse`, `fange`, `snekker`
   (avvik fra oppdragets «hoste»: «cough» finnes ikke noe sted i Mulberry
   v3.6.0 — verifisert mot git-treet 2026-07-18. Kuratering vinner over
   bokstaven; «nyse» = `sneeze_cold` tester samme mekanisme);
   `gammel` gir emoji først og Mulberry bakerst; m:-koder gir gyldig URL med
   URL-kodet komma og har ingen systemglyf; 404 på en m:-fil degraderer pent
   (neste alternativ, ellers stille tilbaketrekking). Enhetstester + manuell
   nettverkssjekk.
6. **UX-kontrakten:** brikke ved ordfeltet (debounce ~250 ms), ⟳ kun ved flere
   alternativer, ✕ huskes til teksten endres, innlimt bilde vinner, Ord og
   bilde bruker forslaget som radens bilde og markerer fortsatt rader uten
   bilde. Verifiseres i nettleser (dev-server) i alle 5 verktøy, nb + en.
7. **Sikkerhet/kvalitet:** ingen innerHTML med brukertekst (grep + review);
   ⟳/✕/brikke-knapper borte i print (utskriftstest); prefers-reduced-motion
   respektert; ekte `<button>` med aria-merking; axe 0 brudd og kant-sjekk 0
   avvik på berørte ruter.
8. **Ingen eksterne kall i produksjon:** selvhosting under `public/bildebank/`,
   alle URL-er samme origin; verifiseres med nettverksfanen (kun egen origin) og
   grep etter cdn-URL-er i src/. Versjoner pinnet i skriptene.
9. **Skolefilter:** CLDR-skriptet blokkerer alkohol/tobakk/våpen/sprøyte/
   langfinger/pengespill/18-års/hudtoner via redigerbar liste; stikkprøve viser
   at `øl`, `pistol`, `sigarett` ikke gir forslag. Enhetstest på generert indeks.
10. **Kreditering:** kolofonen (nb + en) krediterer OpenMoji (CC BY-SA 4.0),
    Mulberry Symbols (CC BY-SA) og Unicode CLDR. Visuell sjekk + grep.
11. **Ønskeliste:** ord uten treff samles i økta; mailto-lenke med forhåndsutfylt
    liste; ingenting sendes automatisk. Manuell sjekk.
12. **Grønn QA-gate:** `npm run build` grønt, axe 0/alle ruter, kant-sjekk 0,
    verktøy-røyksuiten grønn og utvidet med bildebank-sjekker; compliance-status
    fortsatt 🟢 (register oppdatert).
