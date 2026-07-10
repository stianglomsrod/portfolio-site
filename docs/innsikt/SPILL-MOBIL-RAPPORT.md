# Skamløs Pitch på mobil — funnrapport

> **ADDENDUM 10.07.2026 (sein kveld):** Alle funn under er FIKSET samme
> kveld (se LOGG.md). I tillegg kom tapp-navigasjon: trykk på en rute for
> å gå dit, trykk på NPC-er/dører/objekter for å gå bort og utløse dem.
> Rapporten under står som «før»-dokumentasjon. Verifisert med full
> touch-gjennomspilling mot prod-bygg (0 gjenstående funn), tapp-suite
> 12/12, alle 4 viewports grønne og desktop-regresjon 6/6. Nye
> «etter»-skjermbilder ligger i spill-mobil/ (tap-*.png, desktop-*.png og
> re-genererte viewport-bilder).

> Full touch-gjennomspilling av /sandbox/skamlos-pitch i emulert mobil
> (Playwright/Chromium, ekte touch-events). Testet 10.07.2026 mot dev-server.
> Skjermbilder ligger i `docs/innsikt/spill-mobil/`.

## Oppsummering — hvor spillbart er det?

**Stående telefon: spillbart fra start til slutt.** Hele oppdragskjeden
(klasserom → Ordkryss → OsloMet → pd-app → master → workshop → Nikko →
portefølje → Drømmejobben → endgame) lot seg fullføre kun med touch på
375×812, 360×640 og 430×932. D-paden fungerer, holde-inne gir kontinuerlig
gange, dialoger kan bles både med E-knappen og ved å tappe tekstboksen,
lagring/«Fortsett» etter reload virker, språkbytte og mute virker, låste
dører sier tydelig fra hvorfor de er låst.

**Men tre ting trekker ned:** (1) E-knappen «tapper gjennom» til
valg-minispillene og auto-velger svaret under tommelen — 5 av 6 quizer
besvarte seg selv før jeg rakk å se dem. (2) Slutt-skjermen — selve poenget
med pitchen, med kontaktlenker og bevis — er sperret inne i den lille
spillramma og vises som en avkuttet stripe. (3) **Liggende telefon er i
praksis ubrukelig**: startkortet klippes så Spill-knappen ikke synes, og
HUD-en legger seg oppå hele spillflaten.

Ærlig dom: en tålmodig besøkende på stående mobil kommer seg gjennom og får
med seg historien, men kvitteringsøyeblikkene (belønning og levert søknad)
er akkurat de som er ødelagt — og det er de øyeblikkene pitchen lever av.

## Slik ble det testet

- Playwright 1.61 (fra `_baseline/qa/node_modules`), Chromium med
  `hasTouch: true, isMobile: true, deviceScaleFactor: 2` og iOS-UA.
- All styring med touch: `page.tap` og CDP-touch (ekte pointer-events) på
  D-pad og E-knapp; hold-inne for kontinuerlig gange; select-felter via
  native picker-ekvivalent.
- Viewports: 375×812 (full gjennomspilling), 360×640, 430×932, 812×375 og
  932×430 (nøkkelskjermer: start, spill, dialog, minispill, meny, endgame).
- Ingen JS-feil i konsollen under hele gjennomspillingen. Ingen sidelengs
  scrolling i noe format.
- Forbehold: emulert Chromium, ikke ekte iOS Safari. Tap-through-mekanismen
  (funn 2) er standard touch-oppførsel og vil ramme Safari også, men bør
  verifiseres på ekte enhet før man stoler blindt på detaljene.

---

## Funn

### Blokkerende

#### 1. Liggende telefon: startkort klippet, HUD oppå spillet, pad under folden

Mobil-tilpasningene er portet på `@media (max-width: 680px)`
([skamlos-rpg.module.css:1405](../../src/spill/skamlos-rpg.module.css)) — men en
liggende telefon er 812–932 px bred. Da gjelder ingen av fiksene, samtidig
som `(pointer: coarse)`-reglene krymper spillramma for å gi plass til
paden. Resultatet:

- Startkortet tegnes inne i den lille ramma og klippes — tittelen kuttes
  midt i, og **Spill-knappen er ikke synlig og kan ikke nås** (kortet har
  ingen scroll i denne tilstanden). Spillet kan ikke startes.
  Skjermbilde: `spill-mobil/812x375-liggende-1-start.png`
- I spill ligger HUD-en (mål + alle chips) *inni* ramma og dekker nesten
  hele spillflaten; undertekster flyter utenfor ramma.
  Skjermbilde: `spill-mobil/812x375-liggende-2-spill.png`
- D-paden ligger under folden (siden må scrolles for å nå den), på en
  ellers tom side der spillramma bare bruker ~1/3 av bredden.
  Skjermbilde: `spill-mobil/812x375-liggende-2b-spill-scrollet.png`
- Samme bilde på 932×430: `spill-mobil/932x430-liggende-1-start.png` m.fl.

**Reproduksjon:** 812×375 (touch), åpne ruta → startkortet er klippet.
Start i stående, roter til liggende → HUD oppå spillet.

**Forslag:** utvid vilkåret for mobil-layouten fra ren bredde til også å
treffe lave touch-skjermer, f.eks.
`@media (max-width: 680px), ((pointer: coarse) and (max-height: 500px))`
på alle stedene som i dag bruker 680px-brekkpunktet. Vurder samtidig et
ekte landskapsoppsett (pad til venstre/høyre for ramma i stedet for under)
— men det er en større jobb. Billig førstehjelp: et «snu telefonen»-hint i
liggende til layouten er på plass.
**Størrelse:** breakpoint-fiksen ½–1 dag inkl. testing i begge
orienteringer; ekte landskapsoppsett 1–2 dager; «snu telefonen»-hint ~1 t.

### Store

#### 2. E-knappen tapper gjennom og auto-løser valg-minispillene (ghost click)

E-knappen fyrer på `pointerdown` ([VirtualPad.tsx:141](../../src/spill/game/ui/VirtualPad.tsx)).
Modalen rekker å tegnes før fingeren slipper, og nettleserens syntetiske
klikk (som kommer ved touchend) treffer da det som nå ligger under
tommelen — som på mobil er midt i den fullskjerms modalen. I praksis:
**minispillet åpner ferdig besvart**, med feedback og «Fullfør» allerede
synlig. Spilleren får aldri sett spørsmålet.

På 375×812 skjedde dette i 5 av 6 valg-quizer (forløperoppdraget, pd-app,
workshop-oppsummeringen, Nikko-byggingen, porteføljen). Master-quizen
slapp unna fordi dens layout er høyere, så klikket bommet på knappene —
det er altså flaks per modal, ikke trygghet.

Skjermbilde (modalen rett etter åpning — merk grønt svar + «Fullfør»):
`spill-mobil/375x812-12-pd-brief-a-sporsmal.png`, samme mønster i
`...-14-pd-app-...`, `...-16-synth-...`, `...-17-nikko-bygg-...`,
`...-18-portefolje-...`. Normal oppførsel til sammenlikning (master):
`spill-mobil/375x812-15-master-a-sporsmal.png` → `-b-feilvalg` → `-c-riktig`.

**Reproduksjon:** 375×812, gå til veilederen på OsloMet, trykk E →
modalen åpner med svaret valgt.

**Forslag:** la modalen ignorere pekerhendelser de første ~400 ms etter
åpning (`pointer-events: none` + timeout i MinigameModal), eller flytt
E-knappens handling fra `pointerdown` til `pointerup`/`click`. Det første
er mest robust (dekker også dialog-CTA-er og fremtidige modaler).
**Størrelse:** ~1 t inkl. retest av alle seks minispillene.

#### 3. Endgame-skjermen er sperret inne i spillramma

`.endgameBackdrop` er ikke med i lista over overlays som løftes ut til
`position: fixed` på smale skjermer (panel/modal/meny er med —
[skamlos-rpg.module.css:1458](../../src/spill/skamlos-rpg.module.css)). Kortet
tegnes derfor inne i den ~240 px høye ramma: man ser «LEVERT», en grønn
(uleselig, se funn 4) tittel og 3–4 linjer tekst. Stats, bevislenkene,
kontaktlenkene (e-post/LinkedIn/GitHub!) og «Spill på nytt» ligger bak en
usynlig indre scroll uten noen affordance. Sluttpoenget med hele pitchen
er i praksis borte. Gjelder alle testede formater.

Skjermbilder: `spill-mobil/375x812-19-endgame.png`,
`spill-mobil/360x640-6-endgame.png`, `spill-mobil/430x932-6-endgame.png`,
`spill-mobil/812x375-liggende-6-endgame.png`.

**Reproduksjon:** fullfør spillet (eller lever søknaden) på 375×812 →
endgame-kortet er en avkuttet stripe midt på skjermen.

**Forslag:** legg `.endgameBackdrop` til i samme fixed-regel som
`.panelBackdrop, .modalBackdrop, .menuBackdrop` i 680px-blokka (og i den
utvidede liggende-regelen fra funn 1).
**Størrelse:** ~15 min + visuell sjekk i alle formater.

#### 4. Grønn, nesten uleselig overskrift i endgame og pausemeny (global h2-lekkasje)

Sidens globale `h2 { color: var(--overskrift) }` i
[Base.astro:114](../../src/layouts/Base.astro) lekker inn i spill-overlayet
der CSS-modulen ikke setter egen farge: `.menuHead h2` («Meny») og
`.endgameTitle` («Søknadspakke levert»). Begge rendres i sidens mørkegrønne
overskriftsfarge på spillets mørke paneler — tittelen på endgame er så
vidt synlig. Modal- og panel-overskrifter har eksplisitt farge og er fine.

Skjermbilder: `spill-mobil/375x812-19-endgame.png` (tittelen),
`spill-mobil/375x812-10-meny-topp.png` («Meny» øverst til venstre).

**Reproduksjon:** åpne pausemenyen, eller nå endgame — på hvilken som
helst skjermstørrelse (gjelder trolig desktop også).

**Forslag:** sett `color: var(--parch)` på `.menuHead h2` og
`.endgameTitle` i CSS-modulen.
**Størrelse:** 2 linjer, ~5 min.

#### 5. Belønningsbanneret klippes av ramma og kolliderer med CTA-boksen

`.rewardBanner` ligger absolutt i ramma (top 18 %) og løftes ikke ut på
smale skjermer. Etter Ordkryss-commiten stakk banneret ut under
rammekanten (klippet av `overflow: hidden`), «NYTT BEVIS»-punktet var
halvvekk, og «Undersøk PC-en»-CTA-boksen lå *oppå* banneret. Belønningen
er spillets «kvittering» — akkurat den skal ikke se sånn ut.

Skjermbilde: `spill-mobil/375x812-08-belonning.png`.

**Reproduksjon:** 375×812, fullfør Ordkryss-minispillet hjemme → banneret
klippes og CTA-en overlapper.

**Forslag:** løft `.rewardBanner` ut til `position: fixed` på smale
skjermer (samme mønster som HUD-en), og ikke vis CTA-boksen mens banneret
står (den informasjonen er uansett skjult bak banneret).
**Størrelse:** 1–2 t.

### Små

#### 6. Select-feltene i Ordkryss er 55×21 px

De tre nedtrekksfeltene i for-løkka (`.codeBlank`) måler ~55×21 px —
godt under 44×44-kravet som resten av spillet fikk i mobilrunden
(Done 21). Native picker gjør dem brukbare, men de er vanskelige å treffe.
Skjermbilde: `spill-mobil/375x812-07-ordkryss-tom.png`.
**Forslag:** `min-height: 44px` (og litt padding) på `.codeBlank` under
`(pointer: coarse)`; kodeblokka tåler det.
**Størrelse:** ~30 min.

#### 7. Lenker og ekspandere under 44 px i meny og endgame

Målt på 375×812: bevis-/kontaktlenkene på endgame-kortet er 22–23 px høye
(9 lenker), skill-/bevis-ekspanderne i pausemenyen 34 px, og et par
HUD-chips er smalere enn 44 px (☰ «Meny» 37×44, språk 43×44 — høyden er
på plass, bredden mangler noen piksler). Full liste i målingene i
`spill-mobil/`-skjermbildene og funn-JSON-en fra kjøringen.
**Forslag:** padding/`min-width: 44px` på chips; større klikkflate
(padding + negativ margin) på lenkene og ekspanderne.
**Størrelse:** ~1 t samlet.

#### 8. Undertekster fortrenger interaksjons-CTA-en i inntil 4 sekunder

Bunnboksen viser én ting om gangen med prioritet dialog > undertekst >
CTA. Når en ambient-/cue-tekst står («*Det ringer ut.*», «*Du er inne på
OsloMet.*»), forsvinner «E Gå ut»-prompten selv om man står ved døra —
spillet føles dødt i de sekundene, spesielt på mobil der man nettopp har
lært at boksen er interaksjonspunktet.
**Forslag:** la CTA vinne over undertekst, eller vis undertekster som
toast over boksen. Kan også være et bevisst designvalg — se spørsmålene.
**Størrelse:** 1–2 t hvis det skal endres.

### Polish

- **Badeanda kan blokkere døra hjemme**: den vandrende anda stilte seg i
  døråpningen (5,8) under én av kjøringene og sperret utgangen fysisk til
  den ruslet videre. Sjarmerende første gang, mindre sjarmerende med
  quest-stress. Mulig fiks: unnta dør-/exit-fliser fra vandringsruta.
  (~30 min.)
- **Dialogboksen dekker ~40 % av spillflaten på mobil** (f.eks.
  `spill-mobil/375x812-03-dialog-elev.png`). Zelda-konvensjonen sier
  bunnboks, og den fungerer — men på en 240 px høy flate er det mye.
  Tatt med som observasjon, ikke som feil.
- **GPU-advarsler i konsollen** («GPU stall due to ReadPixels», 4 stk.)
  stammer fra skjermbilde-taking i testharnessen, ikke fra spillet. Ingen
  aksjon.

---

## Spørsmål til Stian (bug eller designvalg?)

1. **Undertekst-fortrengningen (funn 8):** er «boksen viser én ting om
   gangen» et bevisst valg, eller skal CTA-en vinne?
2. **Klokke-cuen i klasserommet:** 4,6 sekunder der ingenting kan gjøres
   før klokka ringer. Bevisst pacing/stemning, eller skal den kortes ned
   på mobil?
3. **Dialogboksens størrelse** på den lille flaten (se polish): godt nok,
   eller ønskes en mer kompakt mobilvariant?

## Det som virker (og som ikke må ødelegges av fiksene)

- Hele oppdragskjeden er fullførbar med touch i stående format; ingen
  JS-feil underveis.
- D-pad med hold-inne, E-knapp som bytter til ▼ i dialog, tapp-på-boksen
  for å bla — alt fungerer som dokumentert på startkortet.
- Lagring/«Fortsett» etter reload gjenopptar riktig rom og posisjon
  (`spill-mobil/375x812-09-gjenopptatt.png`), «Spill på nytt» nullstiller.
- Språkbytte (EN/NO) slår igjennom umiddelbart i HUD, CTA-er og dialoger
  (`spill-mobil/375x812-10-engelsk.png`); mute-knappen bytter tilstand.
- Låste dører gir tydelig, hyggelig beskjed
  (`spill-mobil/375x812-05-workshop-laast.png`); guide-pilen i kanten
  peker mot neste mål.
- Startkort, pausemeny, oppdrags-/ferdighets-/bevislister og minispill-
  modalene ser gode ut og skalerer fint i alle stående formater.

## Anbefalt rekkefølge hvis «fiks alt»

1. **Funn 4 — grønn overskrift** (5 min): størst effekt per minutt;
   endgame-tittelen blir lesbar igjen.
2. **Funn 3 — endgame ut av ramma** (15 min): sluttpoenget med pitchen
   tilbake på skjermen. 1+2 bør tas i samme økt.
3. **Funn 2 — tap-through i minispillene** (1 t): quizene er kjernen i
   «spillbar pitch»; i dag besvarer de seg selv.
4. **Funn 5 — belønningsbanneret** (1–2 t): kvitteringsøyeblikket.
5. **Funn 1 — liggende format** (quickfix «snu telefonen»-hint først ~1 t,
   deretter breakpoint-fiksen ½–1 dag): største jobben, men til hinten er
   på plass bør liggende regnes som ustøttet.
6. **Funn 6+7 — 44 px-runden** (1,5 t samlet): selects, lenker, chips.
7. **Funn 8 + polish** (etter svar på spørsmålene).

Etter 1–4 er spillet ærlig talt godt på stående mobil; etter 5 kan man
slutte å håpe at ingen snur telefonen.
