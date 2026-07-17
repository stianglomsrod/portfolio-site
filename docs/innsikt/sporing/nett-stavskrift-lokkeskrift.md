# Nett-research: stavskrift og løkkeskrift — begreper, formfasit, teknikk-scan, gjennomførbarhet

Utført 2026-07-17 for Sporing-verktøyet (stianglomsrod.no/sandbox/sporing).
Dagens verktøy: håndlagde SVG-skjelettbaner per tegn (a–å + A–Å, 58 tegn) i
`src/lib/bokstavbaner.ts`, bokstavhus y=3/15/27/39 (topp/x-topp/grunn/bunn),
hvert tegn = flere UAVHENGIGE strøk (egen `M …`-path per strøk, ingen
sammenbinding). Dette er per definisjon trykkbokstaver/formskrift-aktig —
se DEL C for hvor langt unna stavskrift og løkkeskrift dette faktisk er.

Merk: research-mappen inneholdt allerede tre relevante analyser fra tidligere
i dag (`bilde-kaleido-og-graduering.md`, `bilde-salto-retning.md`,
`bilde-bokstavhus-og-soner.md`, `bilde-dagens-verktoy-diagnose.md`) — disse er
lest og vevd inn under, ikke duplisert. De er IKKE skrevet av denne
research-økten, men er brukt som grunnlag der de svarer på oppdraget.

---

## DEL A — Stavskrift og løkkeskrift i norsk skole

### A.1 Begrepsrydding

Fire begreper, ofte forvekslet i dagligtale:

| Begrep | Definisjon (SNL) | Bindinger | Helning |
|---|---|---|---|
| **Trykkskrift/trykkbokstaver** | Adskilte, "trykte" bokstavformer — ingen sammenbinding | Ingen | Rett |
| **Formskrift** | «Håndskrift med oppreiste, runde bokstaver uten løkker», utviklet i Norge i mellomkrigstiden (Alvhild Bjerkenes, *Innføring i form-skrift*, 1947) som alternativ til løkkeskrift | Delvis/ingen (varierer) | Oppreist |
| **Stavskrift** | «Håndskrift med sammenhengende bokstaver uten løkker», som i motsetning til formskrift heller forover; introdusert 1962 av Kari Wessel (utformet av Odd Karlberg, *Fabritius' skriveverk* 1953), inspirert av italiensk renessansekursiv og en UNESCO-anbefaling fra 1961 | Sammenhengende, men med brudd ved «kjellerbokstaver» (g, j, y …) | Foroverhellende |
| **Løkkeskrift** | «Sammenhengende skrift med løkker», i Norge fra 1870 (erstattet gotisk skrift), engelsk/fransk inspirert, dominerte til ca. 1970 | Helt sammenhengende, med krøller/løkker på bl.a. t, k, g | Skrå (copperplate-aktig) |

Kilder: [stavskrift – SNL](https://snl.no/stavskrift), [løkkeskrift – SNL](https://snl.no/l%C3%B8kkeskrift), [formskrift – SNL](https://snl.no/formskrift), [skoleskrift – SNL](https://snl.no/skoleskrift).

**Historikk i korte trekk:** Løkkeskrift dominerte norsk skole til ~1970.
Formskrift fantes 1947–ca.1962 som konkurrerende (upreist, løkkefri) modell.
Stavskrift (1962) tok over som den forover-hellende, delvis sammenhengende
standarden og var enerådende sammen med/etter løkkeskrift utover 1970–80-tallet.
**I læreplanene fra 2020 (LK20) ble kravet om at elevene skal lære en bestemt
skrivestil fjernet** — elevene skal utvikle en personlig, funksjonell
håndskrift. Udir sine kompetansemål (NOR01-06/07, `udir.no/lk20/nor01-06` og
`nor01-07`) spesifiserer ikke lenger stavskrift eller løkkeskrift som krav,
kun «sammenhengende og funksjonell håndskrift» (4. trinn) / «sammenhengende
med personlig og funksjonell håndskrift» (7. trinn) — se sitat i Kaleido
løkkeskrift-boka lenger ned. (Fulltekst på udir.no ble ikke hentet direkte i
denne økta pga. søkeindeksbegrensning, men kompetansemål-formuleringen er
bekreftet indirekte via Kaleido-lærersiden, som siterer den ordrett — se A.2.)

**Hva bruker forlagene i dag?** Alle tre store LK20-verk tilbyr «stavskrift»
som eksplisitt merkevare/produktlinje, IKKE trykkbokstaver-only og IKKE
løkkeskrift som hovedspor:

- **Gyldendal/Salto**: egne produkter «Salto 1/2, Arbeidsbok A/B, **Stavskrift**»
  og «Salto Håndskrift Stavskrift 1» — beskrevet som «en ny arbeidsbok som skal
  hjelpe elevene med å mestre en funksjonell, sammenhengende håndskrift».
  Gyldendals egen artikkel om håndskrift vs. tastatur nevner eksplisitt tre
  aksepterte standarder i dag: **trykte bokstaver, stavskrift, eller
  løkkeskrift (sammenhengende med løkker)** — funksjonell håndskrift er
  definert som lesbar ved normal lesehastighet, ikke en bestemt form.
  Kilder: [Salto 1 Arbeidsbok A, Stavskrift](https://www.gyldendal.no/grs/salto/salto-1-arbeidsbok-a-stavskrift/p-10012823/),
  [Håndskrift vs. tastatur i skolen](https://www.gyldendal.no/artikler/norsk/haandskrift-vs-tastatur-i-skolen).
- **Cappelen Damm/Kaleido**: eget bind «Kaleido Skriftforming Stavskrift A»
  (Irene Amundsen og Tone Goborg, 2018) — se detaljert bildeanalyse i A.2:
  boka heter stavskrift, men innholdet er i praksis en sammenhengende,
  løkke-influert kursiv (se forbehold under). `kaleido.no`/`kaleido1-4.cappelendamm.no`
  har i tillegg en «Bokstavforming»-seksjon med animasjoner som viser
  skriveretning per bokstav (klikk-på-bokstav på smartboard).
  Kilde: [Kaleido 1-4 Bokstavforming](https://kaleido1-4.cappelendamm.no/lt/seksjon.html) (nettsiden var util­gjengelig for direkte henting i denne økta — DNS-feil — men omtalt i søketreff), [Kaleido skriftforming Løkkeskrift A (Issuu)](https://issuu.com/cdundervisning/docs/kaleidoskriftformloekkea_blaibok).
- **Aschehoug/Zeppelin**: arbeidsbøker finnes eksplisitt i to skriftvarianter
  — «trykkskrift» og «stavskrift» — for både bokmål og nynorsk («Zeppelin 1B
  arbeidsbok. trykkskrift», stavskrift-parallell nevnt i produktkatalogen).
  Dette er det klareste eksempelet på et forlag som lar SKOLEN velge mellom
  trykte bokstaver og stavskrift som spor, i tråd med LK20s valgfrihet.
  Kilde: [Nye Zeppelin | Aschehoug Skole](https://skole.aschehoug.no/produktkatalog/nye-zeppelin).

**Konklusjon A.1:** Dagens Sporing-verktøy (frittstående strøk, ingen
sammenbinding, rett/oppreist) er formmessig nærmest **trykkskrift/trykkbokstaver**
— den fjerde, udiskuterte kategorien fra Gyldendal-sitatet over, og den som i
praksis brukes i leseopplæringens første fase før noen skrivestil innføres.
Det ligger nærmere trykkskrift enn formskrift, fordi formskrift historisk
hadde en viss (om enn løkkefri) sammenbindingsintensjon; dagens verktøy har
ingen sammenbinding i det hele tatt.

### A.2 Formfasit: bokstavformer, inn-/utstrøk, bindinger

**Kilde brukt (nedlastet og lest med Read):** «Kaleido Skriftforming Stavskrift A»
(Irene Amundsen og Tone Goborg, © Cappelen Damm AS 2018, ISBN 978-82-02-45311-4,
håndskrift Tone Goberg, ill. Solveig Lid Ball) — Issuu-utdrag lastet ned i
en TIDLIGERE økt i dag til
`scratchpad/research/dumper/stavskrift_a_page1.jpg … page19.jpg` (19 sider)
og lest på nytt i DENNE økta for bindingsdetaljer. Kilde-URL:
issuu.com (søk «Kaleido skriftforming stavskrift» — nøyaktig utdrags-URL ikke
reetablert i denne økta, men kolofonside og alle 19 sidebilder er lokalt
verifisert).

**Viktig empirisk funn — avviker fra ordbokdefinisjonen:** Selv om boka heter
«Stavskrift», viser lærerteksten («Til lærere og foresatte») at den lærer
«sammenhengende håndskrift» generelt, og de faktiske øvingssidene (bevegelses-
mønstre, ord som «leie, ull, lue, lulle, alle, aiai, alene, lalle», og siden
med bokstaven «A»/«B») har **tydelige løkker**: stor «A» har en krøllete
inngangsstrøk (pil 1: liten hase/krøll nederst til venstre FØR strøket går
opp til toppunktet), stor «B» har en stor sløyfe-utgang, og småbokstaven «l»
har en løkke i oppstreken (typisk for løkkeskrift, ikke «uten løkker» slik
SNL-definisjonen av stavskrift tilsier). **Praktisk konklusjon: den kommersielle
skillelinjen stavskrift/løkkeskrift er mindre skarp enn leksikon-definisjonen
i faktisk undervisningsmateriell** — Kaleido-utdraget kan være en gjenbrukt
løkkeskrift-modul, eller forlaget kan bevisst blande inn løkke-elementer i sin
«stavskrift». Dette er en reell fallgruve å være obs på hvis man skal bygge en
«ren» stavskrift-modell etter ordboka — den vil se annerledes ut enn det
lærere faktisk kjenner igjen fra Kaleido.

**Konkrete observasjoner fra materialet (bokstavhus-system, strøkveiledning,
bindinger):**

1. **Startpunkt/retning vises IKKE med trykte piler/tall på selve øvingssidene**
   i løpende tekst-linjene — lærerteksten er eksplisitt: «Elevene trenger at
   læreren eller foresatte viser riktig startpunkt og skriveretning for
   bokstavene». Derimot har hver NY bokstav en egen liten «slik gjør du»-modell
   øverst på siden: stor, tykk grå bokstav med **nummererte røde piler**
   (1, 2, 3 — startpunkt nederst/øverst avhengig av bokstav, pil viser retning
   langs strøket, tallet ved strøkstart). Eksempel «A»: pil 1 = liten buet pil
   fra en krøll nederst-venstre og oppover (inngangsstrøk), pil 2 = rett ned
   fra toppunktet (høyre skråstrek), pil 3 = vannrett pil ved tverrstreken.
   Eksempel «B»: pil 1+2 er én lang bue som går fra toppen av staven, rundt en
   stor sløyfe, tilbake til start (loop-inngang), pil 3 = rett ned langs
   staven.
2. **Bindingsmønster (hvordan bokstaver kobles):** Illustrert med par-øvelser
   der samme forbokstav kombineres med ulike etterbokstaver, f.eks.
   «Ada, Atle, Abba» (A-binding til d/t/b — ulik utgangshøyde og -vinkel per
   etterbokstav) og «Bob, Berit, Bjarne, Brasil» (B-binding til o/e/j/r).
   Ordene «Anna og Agnar liker ananas» og «Berit og Boris bygger en bro» viser
   flytende bindinger midt i ord — streken går aldri av papiret mellom
   bokstavene i et ord. Dette bekrefter at bindingen MÅ være
   kontekstavhengig: utgangspunktet for neste strøk avhenger av hvilken
   bokstav som kommer før (høyde og vinkel på utstrøket varierer).
3. **Grunnøvelser før bokstaver:** Siden lærer først isolerte
   bevegelsesmønstre — bølgeformer, C-buer, "8-tall"-kryssløkker — som er de
   ATOMÆRE komponentene bindingene og løkkene er bygget av. Dette er nyttig
   som et sjekklistenivå: en programmatisk løkkeskrift-generator trenger
   sannsynligvis de samme atomære byggeklossene (rett stav, c-bue, løkke,
   bindestrek) fremfor 58×58 hardkodede overgangspar.
4. **Sidelayout (bekrefter og utdyper tidligere analyse i
   `bilde-kaleido-og-graduering.md`):** Modellboks (full modellrad) →
   identisk TOM boks rett under, ingen veiledningsmerker i selve
   øvingsradene, kun på engangs-introduksjonsmodellen per bokstav.
   4-linjers bokstavhus med tynn lys turkis linjefarge, mørkere/mer mettet
   grunnlinje. Repetisjon i grupper av 3, 7 grupper per rad for
   bevegelsesmønstre; ord repeteres til raden er full (5–8 ganger avhengig av
   ordlengde).

**Andre nedlastede/leste kilder (denne økta):**

- **Norsk løkkeskrift, ekte selvinstruksjonshefte:**
  `Form_bokstav_loekke_selvinstruksjon_29_store-smaa_bokstaver_Karstad.pdf`
  lastet ned til `scratchpad/research/dumper/lokkeskrift-fokus-selvinstruksjon.pdf`
  fra <https://fokus.no/wp-content/uploads/2025/10/Form_bokstav_loekke_selvinstruksjon_29_store-smaa_bokstaver_Karstad.pdf>
  (FOKUS/Karstad — spesialpedagogisk selvinstruksjonsmateriell for
  løkkeskrift, store og små bokstaver a–å). Ikke fullstendig sidelest i denne
  runden (PDF, 711 KB, 29 bokstaver store+små) — flagges som en RIK, konkret
  norsk løkkeskrift-kilde for videre banestudier hvis stavskrift/løkkeskrift
  skal bygges; anbefales lest side-for-side før man designer bindingsreglene.
- **Tysk Vereinfachte Ausgangsschrift, offisiell alfabettavle** (Wikimedia
  Commons, PD/fri lisens): lastet ned til
  `scratchpad/research/dumper/vereinfachte-ausgangsschrift.png`
  fra <https://upload.wikimedia.org/wikipedia/commons/5/57/Vereinfachte_Ausgangsschrift.png>.
  Viser hele alfabetet A–Z/a–z + Ä/Ö/Ü/ß + tall, løkkeskrift-aktig med
  konsekvent inn-/utstrøk fra x-topp-linjen («Nesten alle småbokstaver
  begynner og slutter ved øvre midtlinje» — dette designprinsippet, at
  UTGANGSPUNKTET for én bokstav ALLTID er STARTPUNKTET for neste, er nøyaktig
  det som gjør sammenhengende skrift mekanisk generaliserbar — se DEL C).
- **Tysk Schulausgangsschrift 1968 (DDR), offisiell alfabettavle** (Wikimedia
  Commons, CC BY-SA 4.0, av Renate Tost 1967/68): lastet ned til
  `scratchpad/research/dumper/schulausgangsschrift-1968.png`
  fra <https://upload.wikimedia.org/wikipedia/commons/6/60/Schulausgangsschrift_1968.png>.
  Mer avrundet/vinklet variant enn VA, samme prinsipp om enhetlig
  inn-/utstrøkshøyde.

### A.3 Åpne/frie kilder til baneformer

Dette var det viktigste funnet i DEL A: det finnes reelle, fritt lisensierte
kilder til FAKTISKE strøk-/baneformer (ikke bare illustrasjoner) for
sammenhengende skoleskrift — dog ingen er norske.

1. **CTAN `schulschriften`-pakken** (Walter Entenmann,
   <https://ctan.org/tex-archive/tex-archive/fonts/schulschriften>) —
   **METAFONT-kildekode** (`.mf`-filer) med eksplisitte strøkbane-
   definisjoner for FEM tyske skoleskrifter: Sütterlin (1911), Deutsche
   Normalschrift (1941), **Lateinische Ausgangsschrift** (1953),
   **Schulausgangsschrift** (1968, DDR), **Vereinfachte Ausgangsschrift**
   (1972). Lisens: **LPPL** (LaTeX Project Public License — fri, tillater
   modifikasjon med krav om at endrede versjoner gis nytt navn). Dette er den
   eneste kilden funnet med maskinlesbare, faktiske PENN-BANER (ikke bare
   rasterbilder) for sammenhengende skoleskrift — direkte overførbar
   METODIKK (hvordan strøk kodes som kurver med inn/utpunkt) selv om
   bokstavformene er tyske, ikke norske.
2. **`AU-School-Handwriting-Fonts`** (Corey & Tina Anderson, GitHub:
   <https://github.com/MezMerrit/AU-School-Handwriting-Fonts>) — **variable
   OpenType-fonter** (400–700 vekt) bygget fra `.glyphs`-kildefiler, dekker
   australske delstatsstiler: NSW Foundation (manuscript + **precursive**),
   QLD Beginners (print + **precursive**), SA/TAS Beginner/Precursive,
   VIC/WA/NT Label/Infant Cursive. Lisens: **SIL Open Font License 1.1**
   (fri, kommersielt bruk tillatt med kreditering). Inkluderer
   OpenType-alternativ-glyffer for overgangen fra løs print til precursive
   (delvis bundet skrift med inngangs-/utgangskroker — akkurat det
   stavskrift-varianten trenger), pluss dotted-thirds/plain-thirds
   linjemaler. Full løkkeskrift-kursiv er per dokumentasjon (v1.001,
   juni 2022) fortsatt under utvikling for noen delstater. Dette er trolig
   den mest direkte overførbare TEKNISKE referansen: åpen kildekode i et
   moderne, lesbart format (glyffkonturer, ikke METAFONT), med eksplisitt
   presursiv/print-dualitet bygget inn som font-features.
3. **Peter Wiegel — frie tyske skoleskrift-fonter**
   (<https://www.peter-wiegel.de/Fonts/index.html>) — «alle FREEWARE»,
   inkluderer **Bienchen SAS** (fri variant av Schulausgangsschrift) og
   **Gruenewald** (fri variant av Vereinfachte Ausgangsschrift), begge
   beskrevet som «lateinische verbundene Schreibschrift» (forbundet
   skrivskrift). Eksakt lisensmerkelapp (OFL/GPL/CC) per font ble ikke
   verifisert i denne økta utover den generelle «freeware»-merkingen på
   siden — bør dobbeltsjekkes før evt. bruk, men er en ekstra kandidat for
   TrueType-baserte baneuttrekk (kontur → SVG-path via fonttools) om man
   ønsker et rikere kildeutvalg enn CTAN/AU-repoet.
4. **Dansk formskrift/Grundskrift**: Undervisningsministeriet (Børne- og
   Undervisningsministeriet) anbefaler i dag INGEN bestemt skrivemodell —
   skoler og lærere velger fritt. Det finnes altså ikke noen "offisiell,
   fritt lisensiert" dansk baneform å hente; Christian Clemens' Grundskrift
   (1981, oval grunnform, med og uten løkker) er den nærmeste standarden,
   men ble ikke funnet i noe åpent/fritt digitalt banefil-format i denne
   økta. Kilde: [Denmark – Primarium](https://primarium.info/countries/denmark/).
5. **Svensk skrivstil**: Tilsvarende situasjon — SÖ-stilen (1975) var
   tidligere nasjonal standard, men er nå valgfri; ingen sentral, fritt
   lisensiert digital baneform funnet. Kilde:
   [Skrivstil – Wikipedia (svensk)](https://sv.wikipedia.org/wiki/Skrivstil).

**Konklusjon A.3:** Ingen norsk stavskrift/løkkeskrift finnes i åpen,
maskinlesbar baneform. De tyske og australske kildene (CTAN + AU-repoet) er
gode METODE-referanser (hvordan strøk/bindinger kodes teknisk, og at
inn-/utstrøkspunkt standardiseres til én høyde per bokstav), men bokstav-
FORMENE må uansett tegnes for hånd for å matche norsk skoletradisjon (se
Kaleido-referansen i A.2) — akkurat slik dagens 58 trykkbokstav-baner allerede
er håndlaget. Dette senker gjennomførbarhets-risikoen for METODEN (bindinger,
kontekstavhengighet), men ikke for selve FORMTEGNINGEN, som uansett må gjøres
manuelt bokstav for bokstav slik det er gjort i dag.

---

## DEL B — Teknikk-scan: hvordan generatorer plasserer piler/tall

Konkrete, målbare designparametre funnet, organisert per system:

### B.1 Norske referanser (fra tidligere bildeanalyser i dag + denne økta)

- **Salto-alfabetplakat** (Gyldendal): piler ALLTID i det hvite UTENFOR
  bokstavformen, aldri oppå streken. Firepilsystem etter strøktype: rett
  nedpil for loddrette stav, buet pil (mot klokka) for runde strøk, rett
  vannrett pil for tverrstreker, kort diagonal pil langs strøket for
  skråstreker. Tall: SMÅ, LØSE (ingen sirkel), plassert ved strøkstart i det
  hvite, kun på flerstrøksbokstaver. Fargekode: rød=vokal, blå=konsonant.
  (Kilde: intern analyse `bilde-salto-retning.md`, fra
  `12-salto-alfabetplakat-piler-utenfor.png`.)
- **Kaleido skriftforming**: INGEN trykte piler/tall/prikker i selve
  øvingsradene — kun én engangs stor «slik gjør du»-modell per bokstav med
  nummererte (1-2-3) røde piler. Kopiering skjer i egen tom rad UNDER
  modellen (eksplisitt begrunnet med venstrehendthet). Denne økta bekreftet
  konkret pilform: buet inngangskrøll + rett/vannrett pil per strøk (se A.2).
  (Kilde: `bilde-kaleido-og-graduering.md` + denne øktas Kaleido-sidelesing.)
- **Teaching Funtastic** (norsk klasseromsmateriell,
  teachingfuntastic.no): etablerer og selger «loft / stue / kjeller»-
  terminologien for bokstavhus-soner eksplisitt i produkttekst. Soner farges
  svakt pastell (gul loft / rosa-lilla stue / blå kjeller), grunnlinje/bakke
  ofte grønn stripe. Formgrupper: stuebokstaver (kun x-høyde) a c e i m n o
  r s u v w x z æ ø å; loftbokstaver (oppstrek) b d f h k l t; kjeller-
  bokstaver (nedstrek) g j p q y. (Kilde: `bilde-bokstavhus-og-soner.md`.)
- **Dagens Sporing-verktøy (v2), målt i px/mm fra faktisk generert A4-ark**:
  arkbredde ~612 px ≈ A4 210 mm → 1 px ≈ 0,34 mm. Grønn startprikk ≈ 5–6 px
  ≈ **1,7–2 mm**. Strøktall ≈ 7 px ≈ **2,4 mm** høye. x-høyde («stua») ≈
  20 px ≈ **7 mm**. Diagnosen slår fast at 2,4 mm tallhøyde er på/under
  lesbarhetsgrensen for målgruppen, mens apparatet samtidig er stort nok til
  å kollidere med bokstavformen — «for smått til å veilede, for stort til å
  ignorere». (Kilde: `bilde-dagens-verktoy-diagnose.md`.)

### B.2 Internasjonale generatorer/skolefonter

| System | Piler | Tall | Bokstavhøyde/linjer | Kilde |
|---|---|---|---|---|
| **Handwriting Without Tears (HWT)** | Piler + «Go dots» (startprikker), viser topp-til-bunn ett-strøks formasjon | Ikke sirkel-basert (rene stroke-anvisninger) | Wide Double Lines (K–1), Regular Double Lines (fra 1. trinn når klar) — offisiell «Letter & Number Formation Charts» finnes som gratis PDF | [lwtears.com/letter-number-formation-charts](https://www.lwtears.com/letter-number-formation-charts) |
| **Zaner-Bloser** | Rad 1 = sporing MED retningspiler, rad 2 = sporing UTEN piler, rad 3 = fri linje | Tallformasjon 0–9 med egen stegvisning | Se tabell B.3 for eksakte mm/tommer per trinn | [Zaner-Bloser K Practice Package (PDF)](https://media.zaner-bloser.com/handwriting/pdfs/ZB_HW_Grade_K_Practice_Package.pdf) |
| **D'Nealian** | Kontinuerlig «slant»-strøk med avrundede inn-/utkroker (forberedelse til kursiv) | — | Se tabell B.3 | [Cursive Workshop: line height per grade](https://cursiveworkshop.com/article/line-height-grade-two-handwriting-curricula) |
| **NSW Foundation (Australia)** | Piler viser strøkretning for hver bokstav OG hvert tall; egne fontvarianter MED/UTEN piler (regular/outline/dot) | Løse tall ved strøkstart (font-innebygd) | «Dotted thirds» i 6 standardstørrelser: **24, 18, 14 (×2 var.), 12, 10, 8 mm** | [Writeboards NSW Foundation](https://writeboards.com.au/products/nsw-foundation-font-alphabet-and-number-worksheets), [Dotted Thirds sizes](https://www.teacherspayteachers.com/Product/Dotted-Thirds-Handwriting-Support-All-Australian-Fonts-10194297) |
| **QLD Beginners (Australia)** | Egne fontvarianter: Regular/Outline/Dotted × med/uten piler; «Thick»-variant også | Egne tallstrimler (100 stk.) i dotted+outline | 4-linje/3-rom guidelines innebygd i fontsystemet, av/på uten fontbytte | [QLD Font Info](https://www.australianschoolfonts.com.au/font-info/qld-font-info/) |
| **Sassoon Primary** | Retningspiler for startpunkt; DESIGN-trekk (ikke overlegg): innebygde **utgangsstrøk (exit strokes) på grunnlinjen** i selve bokstavformen for å oppmuntre spontan sammenbinding | — | Forlenget over-/underlengde for lesbarhet på skjerm/print | [Fonts In Use: Sassoon Primary](https://fontsinuse.com/typefaces/30/sassoon-primary) |
| **Twinkl** | Farge-/prikk-overlegg gruppert i 4 bokstavfamilier: «Curly Caterpillar», «Ladder», «One-Armed Robot», «Zigzag Monster» (formgrupper, samme idé som norsk loft/stue/kjeller men med figurnavn) | Nummer-rekkefølge på strøk der aktuelt | Egen «Create»-editor for tilpasning | [Twinkl Letter Formation Pack](https://www.twinkl.com/resource/t-l-1287-handwriting-and-letter-formation-resource-pack) |
| **Tysk Grundschrift** | «Schreibrichtungspfeile» — pil UTEN prikk = kun retningsskifte; pil MED dott = «her løftes pennen» (penn-reset-markør). 26+26 kort (store+små) med én pil per bokstav som viser startpunkt | — | — | [Zebrafanclub: Lautblock Schreibrichtungspfeile](https://zebrafanclub.de/material/lautblock-schreibrichtungspfeile-grundschrift/) |

### B.3 Bokstavhøyde per trinn — eksakte tall (amerikanske systemer, konvertert)

Fra Cursive Workshop-artikkelen (sammenligner D'Nealian og Zaner-Bloser,
begge svært utbredte i USA):

| Trinn | D'Nealian bokstavhøyde | D'Nealian linjeavstand | Zaner-Bloser bokstavhøyde | Zaner-Bloser linjeavstand |
|---|---|---|---|---|
| K (barnehage/førskole) | 0,75" ≈ **19 mm** | 1,125" ≈ 28,6 mm | 0,75" ≈ **19 mm** | 1,125" ≈ 28,6 mm |
| 1. trinn | 0,50" ≈ **12,7 mm** | 0,75" ≈ 19 mm | 0,625" ≈ **15,9 mm** | 0,938" ≈ 23,8 mm |
| 2. trinn | 0,50" ≈ **12,7 mm** | 0,75" ≈ 19 mm | 0,50" ≈ **12,7 mm** | 0,75" ≈ 19 mm |
| 3. trinn | 0,50" ≈ 12,7 mm | 0,50" ≈ 12,7 mm | 0,375" ≈ **9,5 mm** | 0,563" ≈ 14,3 mm |

Nøkkelforskjell: **D'Nealian holder samme bokstavstørrelse i opptil 3 år,
Zaner-Bloser trapper ned nesten hvert år.** For australske systemer
(dotted-thirds) er de vanlige størrelsene **24 mm og 18 mm** for
1.–2. trinn, ned mot 14/12 mm for øvede skrivere — se tabell B.2. Til
sammenligning: dagens Sporing-verktøy har x-høyde ≈ **7 mm** på A4 (målt i
`bilde-dagens-verktoy-diagnose.md`) — vesentlig LAVERE enn både de
amerikanske (13–19 mm for 1.–2. trinn) og australske (18–24 mm)
referansene. Dette er en selvstendig innsikt utover oppdragets kjerne­spørsmål,
men relevant nok til å noteres: dagens bokstavhøyde kan være i minste laget
sammenlignet med internasjonal praksis for 1.–2. trinn, uavhengig av
skriftvariant-spørsmålet.

Kilder: [Line height per grade in two handwriting curricula](https://cursiveworkshop.com/article/line-height-grade-two-handwriting-curricula), [Dotted Thirds sizes (Australia)](https://www.teacherspayteachers.com/Product/Dotted-Thirds-Handwriting-Support-All-Australian-Fonts-10194297).

### B.4 Antall øvebokstaver per rad

- Kaleido: bevegelsesmønstre i grupper på 3, 7 grupper/rad; ord repeteres
  5–8× til raden er full (avhengig av ordlengde) — se A.2/`bilde-kaleido-og-graduering.md`.
  - HWT/Zaner-Bloser: typisk 1 modellrad m/piler → 1 rad uten piler → 1 fri
  linje (3-rads mikrosyklus per bokstav).
- «Mm is for mouse»-type masseproduserte hefter (analysert tidligere i dag):
  ~10 tette bokstaver per rad for store bokstaver, ~6 spredte for små —
  vurdert i den interne analysen som et negativt eksempel («busy») dagens
  redesign bør unngå.

---

## DEL C — Programmatisk gjennomførbarhet i vårt system

### C.1 Dagens arkitektur (grunnlag for vurderingen)

`src/lib/bokstavbaner.ts`: hvert tegn er et objekt `{ bredde, strok: Strok[] }`
der hvert strøk er en HELT UAVHENGIG SVG-path (`d: string`), tegnet i et
bokstavhus med faste linjer (topp=3, x-topp=15, grunn=27, bunn=39 — 36
enheter totalt). Path-retningen ER penneføringen; sporingsverktøyet leser
startpunkt og pilretning direkte ut fra banen med `getPointAtLength`. Typisk
1–3 strøk per bokstav (enkleste: o, c, l = 1 strøk; mest komplekse: æ = 3
strøk, Æ = 5 strøk). Ingen strøk kobles til noe utenfor sitt eget tegn i dag
— hvert tegn genereres og posisjoneres uavhengig av naboene.

### C.2 Hva kreves for en STAVSKRIFT-variant

Stavskrift (i egentlig, "leksikalsk" forstand: sammenhengende UTEN løkker,
forover-hellende) krever minst:

1. **Utstrøk (exit strokes) lagt til på HVERT strøks siste segment** — en
   kort hale som peker mot der neste bokstav sannsynligvis begynner. Dette
   er en per-bokstav endring (legg til et ekstra kurvesegment på slutten av
   siste strøk i `strok[]`), IKKE en per-par endring — altså relativt billig:
   ~58 baneendringer, ingen ny datastruktur for bokstavPAR.
2. **Innstrøk (entry hooks) på strøkets FØRSTE segment**, symmetrisk med
   utstrøket — samme kompleksitet.
3. **Helningstransform** (skew) på hele bokstavhuset eller per-strøk, siden
   stavskrift heller forover (typisk 5–10°). Dette er en ren
   transformasjons-endring, triviell i SVG (`transform: skewX(...)` eller
   matematisk skjæring av kontrollpunktene).
4. **Brudd-håndtering ved kjellerbokstaver** (g, j, y — og p, q): siden ekte
   stavskrift IKKE er 100 % sammenhengende (jf. SNL: «det blir noen brudd i
   flyten» ved kjellerbokstaver), trengs en enkel regel: disse bokstavene får
   IKKE utstrøk mot neste bokstav, pennen «løftes». Dette er en liten,
   eksplisitt liste (5 tegn) å holde styr på, ikke en generell kontekst-
   motor.
5. **Ingen ekte kontekstavhengig BINDING kreves** for stavskrift — kroken
   peker «typisk» retning, og fordi formen ikke er fullt sammenhengende,
   tolererer den visuelt at overgangen ikke er perfekt. Dette gjør
   stavskrift betydelig BILLIGERE å bygge enn løkkeskrift.

**Vurdering:** Stavskrift-varianten er en moderat utvidelse av dagens
system — i praksis en ny variant av `bokstavbaner.ts` (eller en
transformfunksjon som post-prosesserer eksisterende baner med skew + hooks)
pluss en liten brudd-liste. Ingen ny geometri-motor nødvendig.

### C.3 Hva kreves for en LØKKESKRIFT-variant

Ekte løkkeskrift er fundamentalt en annen oppgave: **bindingen mellom to
bokstaver er kontekstavhengig av BEGGE naboene**, ikke bare en fast utstrøk-
form per bokstav. Dette er nøyaktig samme problem som fonter løser med
OpenType-mekanismene `GPOS cursive attachment` (entry/exit-ankerpunkter per
glyf, automatisk kjedet av layout-motoren) eller `calt`/contextual alternates
(bytt ut glyfen basert på kontekst) — se
[MDN: OpenType font features](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/OpenType_fonts)
og [Simon Cozens: Substitution and Positioning Rules](https://simoncozens.github.io/fonts-and-layout/features-2.html).
Vår SVG-baserte, ikke-font-baserte arkitektur må bygge en forenklet variant
av dette selv:

1. **Standardisert utstrøks-/innstrøks-ANKER per bokstav** (samme idé som
   Vereinfachte Ausgangsschrift, jf. A.2: «nesten alle småbokstaver begynner
   og slutter ved øvre midtlinje»). Hvis vi VELGER samme designprinsipp —
   ALLE småbokstaver ender og begynner på nøyaktig samme y-høyde (f.eks.
   x-topp, y=15) — reduseres antall bindingstyper drastisk, fordi
   bindekurven da blir en ren funksjon av VANNRETT avstand (bokstavbredde),
   ikke av vilkårlig høydeforskjell. Dette er det enkeltvalget som avgjør om
   løkkeskrift blir realistisk eller ikke.
2. **Realistisk antall bindingstyper — grov overslagsanalyse:**
   - Hvis alle bokstaver ender/begynner i SAMME punkt (prinsippet over):
     **1 generisk bindingskurve** (en enkel Bézier fra forrige tegns
     utpunkt til nestes innpunkt, skalert til mellomrommet) dekker
     størstedelen av alfabetet. Realistisk antall SPESIALTILFELLER (bokstaver
     som bryter mønsteret og trenger egen bindingslogikk): kjellerbokstaver
     (g, j, y, p — 4 stk., som stavskrift), avsluttende s/x/z/diakritika
     (b, o, v, w, r — buede/spisse avslutninger som trenger justert
     ankervinkel, ikke ny kurvetype), og å/æ/ø (diakritika kompliserer
     toppsonen, men påvirker ikke selve bindingen mellom BOKSTAVER — kun
     ringen/streken over). **Grovt overslag: 1 generisk bindingsfunksjon +
     3–5 spesialregler (ikke 58×58 par),** forutsatt at ankerpunkt-
     standardiseringen i punkt 1 gjennomføres strengt i banedesignet.
   - Hvis vi IKKE standardiserer ankerhøyde (dvs. lar hver bokstav beholde
     sin naturlige avslutningshøyde slik dagens 58 baner allerede har),
     eksploderer kompleksiteten mot ekte per-par-logikk (nærmere 58×58/2 ≈
     1600 potensielle par, om enn med gjenbrukbare kategorier) — dette
     frarådes.
3. **Løkke-elementer på oppstrek-bokstaver** (b, f, h, k, l — evt. stor B,
   L, F): en løkke er geometrisk en ekstra kurve-sløyfe lagt til toppen av
   den eksisterende oppstreken, IKKE en ny bokstavform — kan implementeres
   som en gjenbrukbar "løkke-hale"-funksjon som appliseres på strøk som
   allerede går til topplinja.
4. **Bredde-/kerning-avhengighet:** bindekurven må vite bredden på BEGGE
   nabobokstaver (for å style S-kurven mellom dem), noe som betyr at
   render-laget må gå fra "tegn ett tegn om gangen" til "tegn ett ORD om
   gangen med kontekst" — en arkitekturendring i hvordan
   `SporingVerktoy.astro` bygger opp SVG-en, men ikke i selve banedataene.

**Vurdering:** Løkkeskrift er betydelig dyrere enn stavskrift, men IKKE
urealistisk MED riktig forenkling: nøkkelen er å designe ALLE bokstavenes
inn-/utstrøk til å treffe et lite, standardisert sett med ankerpunkter (i
praksis 1–2 høyder: x-topp for de fleste, grunnlinje for kjellerbokstaver),
slik ekte skoleskrifter (VA, Schulausgangsschrift) allerede gjør — se A.2/A.3.
Da holder man seg til «1 generisk bindingskurve + en håndfull spesialregler»
i stedet for en kombinatorisk eksplosjon av bokstavpar.

### C.4 Anbefalt scope

**Bygg nå (denne eller neste iterasjon):**

- **Stavskrift-variant**: moderat kostnad (C.2), gir umiddelbar verdi siden
  ALLE tre store forlag (Salto, Kaleido, Zeppelin) allerede selger «stavskrift»
  som eget spor, og det er det LK20-lærere faktisk etterspør nest etter
  trykkbokstaver. Konkret: (a) skew-transform, (b) inn-/utstrøks-hooks lagt
  til hvert strøks ende/start i en NY banefil (eller en post-prosesserings-
  funksjon over eksisterende `bokstavbaner.ts`), (c) brudd-liste for
  kjellerbokstaver.

**Dokumenter som vei videre (ikke bygg nå):**

- **Løkkeskrift-variant**: krever en arkitekturendring (ord-kontekst i
  rendering, ikke bare per-tegn), et re-design av ALLE 58 baner til
  standardiserte ankerpunkter (x-topp-prinsippet fra VA), og en egen
  bindingsmotor (1 generisk kurve + 3–5 spesialregler). Dette er et eget
  prosjekt-scope, ikke en utvidelse av stavskrift-arbeidet — de to bør IKKE
  bygges som «stavskrift pluss litt mer», fordi ankerpunkt-standardiseringen
  løkkeskrift krever kan tvinge en omdesign av selve stavskrift-banene også
  hvis man vil gjenbruke geometrien. **Anbefaling: hvis løkkeskrift er et
  reelt fremtidsmål, bør ankerpunkt-standardiseringen (ett sett x-topp-
  forankrede inn/ut-punkter) vedtas SOM PRINSIPP allerede når
  stavskrift-banene tegnes, selv om løkke-bindingen ikke bygges før senere.**
  Det koster lite å tegne stavskrift-hookene med et standardisert
  ankerpunkt fra dag én, og sparer en fullstendig omtegning av 58 baner
  senere.
- Vurder å hente METODE-inspirasjon (ikke bokstavformer) fra
  `AU-School-Handwriting-Fonts` (SIL OFL, `.glyphs`-kilde) for hvordan en
  precursive/print-dualitet kan bygges som "alternativ glyf" fremfor egen
  full font — samme idé kan overføres til vårt SVG-system som en
  `variant: "trykk" | "stav" | "lokke"`-parameter per `Bane`.
- Norsk løkkeskrift-formfasit bør hentes fra FOKUS/Karstad-heftet
  (`lokkeskrift-fokus-selvinstruksjon.pdf`, lastet ned i denne økta) og evt.
  et kjøpt/lånt eksemplar av Kaleido eller Salto sitt løkkeskrift-spor —
  Issuu-utdragene gir kun et lite utvalg bokstaver, ikke fullt alfabet.

---

## Nedlastede filer (denne økta)

Alle i `scratchpad/research/dumper/`:

| Fil | Kilde | Lisens/status |
|---|---|---|
| `vereinfachte-ausgangsschrift.png` | upload.wikimedia.org/wikipedia/commons/5/57/ | Public domain |
| `schulausgangsschrift-1968.png` | upload.wikimedia.org/wikipedia/commons/6/60/ | CC BY-SA 4.0 |
| `lokkeskrift-fokus-selvinstruksjon.pdf` | fokus.no (Karstad) | Opphavsrettslig beskyttet undervisningsmateriell — kun til intern referanse, ikke til gjenbruk/republisering |

Fra TIDLIGERE økt i dag (gjenbrukt, ikke lastet ned nå):
`stavskrift_a_page1.jpg`–`page19.jpg` (Kaleido Skriftforming Stavskrift A,
© Cappelen Damm 2018, Issuu-utdrag — opphavsrettslig beskyttet, kun intern
referanse).

## Kildeliste (alle URL-er brukt)

- https://snl.no/stavskrift
- https://snl.no/l%C3%B8kkeskrift
- https://snl.no/formskrift
- https://snl.no/skoleskrift
- https://www.gyldendal.no/grs/salto/salto-1-arbeidsbok-a-stavskrift/p-10012823/
- https://www.gyldendal.no/artikler/norsk/haandskrift-vs-tastatur-i-skolen
- https://skole.aschehoug.no/produktkatalog/nye-zeppelin
- https://issuu.com/cdundervisning/docs/kaleidoskriftformloekkea_blaibok
- https://primarium.info/countries/denmark/
- https://sv.wikipedia.org/wiki/Skrivstil
- https://ctan.org/tex-archive/fonts/schulschriften
- https://github.com/MezMerrit/AU-School-Handwriting-Fonts
- https://www.peter-wiegel.de/Fonts/index.html
- https://commons.wikimedia.org/wiki/File:Vereinfachte_Ausgangsschrift.png
- https://commons.wikimedia.org/wiki/File:Schulausgangsschrift_1968.png
- https://fokus.no/wp-content/uploads/2025/10/Form_bokstav_loekke_selvinstruksjon_29_store-smaa_bokstaver_Karstad.pdf
- https://www.lwtears.com/letter-number-formation-charts
- https://media.zaner-bloser.com/handwriting/pdfs/ZB_HW_Grade_K_Practice_Package.pdf
- https://media.zaner-bloser.com/hw21summit/public/Written-Language_ProductionStandards.pdf
- https://cursiveworkshop.com/article/line-height-grade-two-handwriting-curricula
- https://writeboards.com.au/products/nsw-foundation-font-alphabet-and-number-worksheets
- https://www.teacherspayteachers.com/Product/Dotted-Thirds-Handwriting-Support-All-Australian-Fonts-10194297
- https://www.australianschoolfonts.com.au/font-info/qld-font-info/
- https://fontsinuse.com/typefaces/30/sassoon-primary
- https://www.twinkl.com/resource/t-l-1287-handwriting-and-letter-formation-resource-pack
- https://zebrafanclub.de/material/lautblock-schreibrichtungspfeile-grundschrift/
- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Fonts/OpenType_fonts
- https://simoncozens.github.io/fonts-and-layout/features-2.html
- https://teachingfuntastic.no/product/bokstavhus/
- (interne, tidligere i dag) `scratchpad/research/bilde-kaleido-og-graduering.md`,
  `bilde-salto-retning.md`, `bilde-bokstavhus-og-soner.md`,
  `bilde-dagens-verktoy-diagnose.md`
- (kode) `src/lib/bokstavbaner.ts`
