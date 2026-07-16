# Levende logg — stianglomsrod.no v3

> Levende dokument. Oppdateres i hver arbeidsøkt: nye endringer øverst i
> changeloggen, gjeld inn/ut av gjeldslista, regler føyes til når de blir
> til. Claude har ansvar for å holde den à jour.

## Changelog

### 2026-07-17 — Sporing v2: ekte skriftforming med bokstavhus og skriveretning
- **Stians funn**: v1 var langt unna ekte sporingsark. Research gjort
  (8 skjermbilder fra Stian + egne dumper i `docs/innsikt/sporing/` av
  Kaleido skriftforming-utdraget, Teaching Funtastic m.fl.);
  designgrunnlaget er dokumentert i `docs/innsikt/SPORING-DESIGN.md`:
  bokstavhuset (loft gul/stue rosa/kjeller blå + hus-ikon med tak),
  vokal rød/konsonant blå, grønt startpunkt + strøknummer +
  retningspiler, modellrad → tom øverad (Kaleido-mønsteret),
  skriveretningsregler (start øverst, rundinger mot klokka fra kl. 1–2,
  b/p stav først, prikker til slutt).
- **Nytt banebibliotek** `src/lib/bokstavbaner.ts`: skjelettbaner for
  a–å OG A–Å (58 tegn) der path-retningen ER penneføringen — strøk i
  riktig rekkefølge. Verktøyet leser startpunkt, pilposisjon og -vinkel
  rett ut av banene med getTotalLength/getPointAtLength, så dekoren
  følger automatisk hvis en bane justeres.
- **SporingVerktoy skrevet helt om**: bokstavhus-rader i SVG med
  valgfrie sonefarger, modellbokstav i vokal/konsonant-farge (eller
  sort) med grønn startprikk per strøk, nummer ved flere strøk og
  pilspiss ved 55 % av strøket; deretter stiplede sporebokstaver og
  valgfri tom øvelinje. Én bokstav per rad = full skriftforming; ord =
  sporing av hele ordet med startprikker. Ukjente tegn navngis.
- QA: røyk-seksjonen omskrevet (soner, strøkfarger, numre 1-2-3 på k,
  ukjent tegn-feil), visuelt verifisert for både små og store bokstaver,
  PDF 1 side, bygg grønt, axe 0/56, kant 0/56.

### 2026-07-16 — Lærerrommet + bølge 1 fra idébanken (7 nye verktøy)
- **Lærerrommet** (/laerer, EN /en/teacher): kuratert samleside for alle
  utskriftsverktøyene i tre kategorier (Norsk, Matematikk, Lek og
  aktivitet), drevet av delt katalog i `src/lib/verktoykatalog.ts` så
  tvillingsidene ikke drifter. Sandboxen er slanket til spillet + ett
  Lærerrommet-kort + hue-modulen. NB: /laerer er IKKE i hovednavigasjonen
  — det er Stians designvalg å ta.
- **Sju nye verktøy fra research-bølge 1** (hver med egen commit, norsk +
  engelsk tvilling, fasit-mekanikk, utkast, katalog- og QA-registrering):
  Ordkjeder (round-robin-kjeding, bannordfilter på KJEDESTRENGEN — 
  sammensetninger kan danne nye ord), Hundrekartet (SVG, tre moduser),
  Hentediktat (to utskrifter: kort til veggen + elevark, print-kort/
  print-elevark-klasser), Hemmelig kode (tallkode fast/stokket + 29 egne
  SVG-symbolglyfer; «katt» = 11,1,20,20 verifisert), Mengder og tierammer
  (telle/fylle/tiervenner, terningmønstre der 7+ = 6+resten), Ord med
  hull (målrettede grafemer: kj/skj/sj lengstematch, ng/nk, dobbel
  konsonant — ord uten grafemet navngis), Tallpyramider & magiske
  kvadrater (kjerne i `src/lib/tallpyramide.ts`: komplett løsning først,
  grådig hulling med propagerings-garanti → alltid løsbart uten
  gjetting; stresstest 1350 genereringer grønn).
- Lærerrommet har nå 20 verktøykort. QA: røyk-suite 16 verktøy grønn,
  bygg grønt, axe 0/56, kant 0/56, alle kortlenker svarer.
- LÆRDOM (gjentatt for ettertiden): addInitScript reseeder localStorage
  ved reload — tilstandsendring i tester gjøres via UI-hendelser.

### 2026-07-16 — Research: 20 verifiserte kandidater til nye verktøy
- **Multi-agent research** (49 agenter: 8 kildesveip → 198 funn → syntese
  → adversariell verifisering med teknisk + pedagogisk linse per
  kandidat) over Malimo, undervisningsmetoder.com, Kittys oppgaver,
  Spireserien, forlagene (Skolestudio/Salaby/Aunivers/Skolen CD/Multi/
  Ordriket/DragonBox), offentlige kilder (Udir-kartlegging, Statped,
  Lesesenteret, Skrivesenteret, Matematikksenteret, matematikk.org) og
  internasjonale generatorer (WorksheetWorks, Puzzlemaker, SuperTeacher,
  toolsforeducators, Twinkl m.fl.). Manuell nettleser-runde i tillegg.
- **Alt dokumentert varig i `docs/innsikt/VERKTOY-RESEARCH-2026-07.md`**:
  sjangerkart (7 familier), validering av de 13 eksisterende verktøyene
  mot markedet, prioritert topp-20 med panel/ark-spesifikasjon og
  verifiseringsbegrunnelser, anbefalt byggerekkefølge i tre bølger,
  forkastede sjangre med hvorfor, og hele funnkatalogen (198 funn).
- Toppkandidater: Tallforståelses-ark «dagens tall» og Øveord/«ukens
  ord»-ark (begge 5/5/5/5), deretter ordkjeder, hundrekart, hentediktat,
  tallvenner, plassverdi, brøk, sortering, skriverammer. Største
  strukturelle hull mot markedet: tallforståelses-familien og klippbare
  kort-/spillformater (stasjonsundervisning).

### 2026-07-11 (natt) — GREN nye-verktoy: ni nye lærerverktøy til testing
- **Ni nye verktøy på gren `nye-verktoy`** (IKKE pushet — Stian tester
  lokalt på :4322 først). Norsk: Luketekst (/sandbox/luketekst, klikk
  ord for luker + auto hvert n-te, ordbank, fasit), Rablete setninger
  (/sandbox/setningsstokking, stokkede brikker + skrivelinjer),
  Ord og bilde (/sandbox/ord-til-bilde, koblingsark der fasiten tegner
  SVG-streker), Sporing (/sandbox/sporing, stiplet kontur-tekst på
  skrivelinjer — SVG text med fill:none + dasharray + textLength),
  Alfabetisering (/sandbox/alfabetisering, Intl.Collator('nb') så æøå
  sorterer riktig). Matte: Regneark (/sandbox/regneark, kjerne i
  src/lib/regneark.ts med tierovergang-styring, åpne oppgaver, aldri
  negative svar, divisjon går opp — stresstestet 312 genereringer over
  alle oppsett), Klokka (/sandbox/klokke, SVG-urskiver, les/tegn,
  presisjon hel–5 min), Tallinjer (/sandbox/tallinje, sammenhengende
  linjer med hull), Gangetabellen (/sandbox/gangetabell, SVG-rutenett
  10×10). Alle med engelsk tvilling, RUTEKART-oppføring, fasit-mekanikk
  (Ordkryss-mønsteret) der det gir mening, utkast i localStorage, og
  print etter SVG-/understrek-reglene (aldri tomme CSS-kantbokser).
- **BUGFIKS I DELT KJERNE (gjelder også prod-Ordkryss!)**: bannord-
  filterets substring-regel blokkerte uskyldige norske ord — «sofaen»
  inneholder faen, «slutt»/«avslutning» inneholder slut, «homogen»
  homo, «spule» pule. Røyk-testen av Luketekst/Setningsstokking avslørte
  det. Fikset med UNNTAK-liste i ordkryss-kjerne.ts: et ord frikjennes
  når HVER forekomst av bannordet ligger inni et kjent uskyldig ord
  («faenskapsofaen» stoppes fortsatt). MERK: den frittstående kopien i
  cs50x-mappa er nå usynkron (jf. gjeldslista) — og fiksen bør til main
  selv om resten av grenen skulle vrakes.
- **Sandbox-gridet**: spillet tilbake til vanlig kortbredde — 14 kort =
  7 hele rader + modul på full rad. Kort-tagger «Verktøy · norsk/matte».
- QA på grenen: bygg grønt (40 ruter), axe 0/40, kant 0/40, røyk-suite
  alle 9 verktøy grønn (generering, verktøyspesifikke kjennetegn,
  fasit-toggle, ren konsoll), regneark-kjernen stresstestet, bingo- og
  kryssord-suitene regresjonskjørt grønne etter filterendringen.

### 2026-07-11 (kveld, del 4) — Kryssord-print runde 4 (ENDELIG): rutenettet er SVG
- **Gjennombruddet i feilsøkinga**: Stians skjermbilder viste at FASIT-
  utskriften (bokstaver i rutene) tegnet alle kanter, mens elevarket
  (tomme ruter) mistet dem — hans Chrome culler kantene på TOMME bokser
  i print-pipelinen. Det forklarer alle tre CSS-rundene: bare celler med
  synlig innhold beholdt kantene.
- **Løsningen forlater CSS-kanter helt**: rutenettet tegnes nå som SVG —
  én vektor-rect per rute (fill hvit, stroke #333), nummer og fasit-
  bokstav som SVG-text i <g class=kv-rute data-r data-k>. Streken ER
  innholdet og kan ikke culles; kvadratene ligger fast i viewBox-
  geometrien (bredde = --kv-celle × kolonner, høyden følger forholdet).
  Fasit-mekanikken uendret (CSS display på .kv-bokstav).
- **Print-verifiseringen er nå eksakt**: Chromium maler SVG-rutene som
  strøkne rektangler (1×1 viewBox-enhet) i PDF-strømmen — vakten krever
  1:1 mellom ruter i DOM og mørke strøkne KVADRATER i PDF-en (45/45 i
  både elev og fasit, 0 skjeve). Kvadrat-sjekk i print-CSS: 0,00px.
- QA: UI-suite 22/22 (matrise via data-r/data-k), bygg grønt, axe 0/22,
  kant 0/22. LÆRDOM: print-geometri verifiseres mot PDF-ens FAKTISKE
  tegneoperasjoner (Chromium maler SVG-rect-strøk som «re S» i lokale
  enheter — størrelsesfiltre i pt kastet dem); og når en brukers
  nettleser culler tomme boksers kanter, er svaret vektorgrafikk, ikke
  mer CSS.

### 2026-07-11 (kveld, del 3) — Kryssord-print runde 3: tabellen kastet, grid tvinger kvadrater
- **Stians retest nr. 2**: kantene kom, men rutene var ikke kvadrater —
  tabellens radhøyder gled i hans Chrome-print og ga silhuett-aktige
  bokser. Tabellen har dermed feilet to ganger på to ulike måter, og er
  KASTET: rutenettet er nå CSS-grid med faste spor
  (grid-template-columns: repeat(n, var(--kv-celle)) + grid-auto-rows)
  — layoutmotoren garanterer kvadratene, samme oppskrift som
  bingobrettene. Cellene er divs (rolle img på containeren, aria-label
  består); kant-eierskapet uendret.
- **Ny vakt i print-verifiseringen**: kvadrat-sjekk under print-CSS —
  hver rute måles med getBoundingClientRect, krav ≤ 0,5px avvik
  bredde/høyde og mellom ruter. Målt: 0,00px på begge.
- QA: geometri grønn i alle fire print-varianter (elev + fasit),
  UI-suite 22/22 (matrise leses nå via data-kolonner), bygg grønt,
  axe 0/22, kant 0/22. REGEL (herdet): rutenett som skal PRINTES bygges
  med CSS-grid og faste spor — aldri <table> (radhøyder og kantmaling
  er upålitelige i print på tvers av Chrome-versjoner).

### 2026-07-11 (kveld, del 2) — Print-fiks runde 2: kantene UT av tabellcellene
- **Stians retest viste resthull**: separate borders hjalp (boksene kom),
  men de innvendige loddrette skillene manglet fortsatt i HANS Chrome —
  ikke reproduserbart i Playwright-Chromium selv med topptekst/marger/
  skalering (repro-skript prøvde fire innstillingsvarianter, alle
  komplette). Fellesnevner i begge feilrundene: position: relative på
  selve tabellcellene. Ordkryss (tabellkanter, ingen relpos-celler)
  printer fint hos ham.
- **Fiksen fjerner mistenkte helt**: cellene er nå rene layoutbokser;
  kanter, nummer og fasitbokstav bor i en indre .kv-boks (vanlig span
  med borders — Silhuett-sjangeren, print-bevist). Kant-eierskapet
  (høyre/bunn + kv-kant-topp/-venstre der nabo mangler) er uendret.
- QA: geometri-målingen grønn i alle fire print-varianter + hovedsjekken
  (elev/fasit 60+53 striper, krav 1021pt per retning), UI-suite 22/22,
  bygg grønt, axe 0/22, kant 0/22. LÆRDOM: print-bugs i brukerens
  nettleser kan være versjonsspesifikke og umulige å reprodusere lokalt
  — fjern hele den mistenkte mekanismen (tabellkant-maling) i stedet
  for å flikke på den, og be brukeren reteste.

### 2026-07-11 (kveld) — Print-fiks for Kryssord: kantene forsvant i utskrift
- **Stians funn i prod**: utskriftsforhåndsvisningen viste rutenettet
  nesten uten kantlinjer (bare spredte streker), mens skjermen var
  korrekt. To feil rettet i KryssordVerktoy:
  (1) `border-collapse: collapse` byttet til `separate` + border-spacing
  0 — hver rute eier høyre/bunn-kanten, topp/venstre legges på med
  klasser (kv-kant-topp/-venstre) der naboruta mangler. Chromiums
  print-pipeline mister kollapsede tabellkanter når cellene har
  position: relative (som nummer-hjørnet krever).
  (2) rutestørrelsen ble satt inline som `--kv-celle` og overstyrte
  dermed print-regelen i mm — nå settes `--kv-celle-skjerm`/`-print`
  inline og kartlegges til `--kv-celle` i CSS-en, så @media print vinner.
- **Verifisering uten pdftoppm** (`kryssord-print-verifisering.mjs`):
  PDF-ens innholdsstrøm inflateres og parses geometrisk — mørke, tynne
  fylte rektangler er kantstripene. Elev OG fasit: 63 vannrette
  (Σ 2403pt) + 50 loddrette (Σ 1894pt), godt over kravet på 1021pt per
  retning for 45 ruter à 10mm. Print-emulert skjermbilde bekrefter
  layouten. LÆRDOM: sideantall i PDF er IKKE print-verifisering —
  mål kantverket geometrisk, og A/B-testen viste at også kollapsede
  kanter legger tegneoperasjoner (bortfallet skjer i malingen), så
  positiv geometri-måling er den pålitelige sjekken.
- QA: bygg grønt, UI-suite 22/22, axe 0/22, kant 0/22.

### 2026-07-11 — Nytt lærerverktøy: Kryssord (skjelett-kryssord)
- **Kryssord** (/sandbox/kryssord, EN: /en/sandbox/crossword): læreren
  skriver ord med ledetrådtekst OG/ELLER bilde (minst én per ord, valgt
  av Stian), og verktøyet fletter dem til et skjelett-kryssord med
  nummererte ruter og Vannrett →/Loddrett ↓-lister under. Fasit-mekanikk
  og STORE/små-valg er Ordkryss sitt mønster (fasit-paa/print-fasit +
  afterprint); ordbank (stokket) er valgfri. Rutestørrelsen regnes i mm
  så rutenettet alltid får plass på A4-bredden.
- **Kjernen** (`src/lib/kryssord.ts`, DOM-fri): klassiske criss-cross-
  regler — kryssing kun på lik bokstav, aldri to ord samme retning i
  samme rute, ingen sidekontakt, alt henger sammen. Dermed er hver
  sammenhengende bokstavrekke i rutenettet ALLTID et av lærerens ord.
  Legging med opptil 240 omstarter og to vekslende strategier (lengst
  først / dårligst koblede tidlig — «KIWI-problemet»: ord med sjeldne
  bokstaver må inn før krysspunktene bygges igjen). Ord som ikke deler
  nok bokstaver med resten navngis i feilmeldingen i stedet for å
  droppes stille.
- **Sandbox-gridet lagt om for fem kort**: spillet spenner hele første
  rad (eks-bred), de fire verktøyene står 2×2, modulen på full rad —
  alle rader hele, så kant-flukten holder.
- QA: kjerne-stresstest 200 genereringer × 5 ordbanker (alle rekker =
  ord, sammenheng, radvis nummerering, feilstier; verstefall 35 ms),
  UI-suite 22/22 grønn (`_baseline/qa/kryssord-test.mjs`): DOM-rutenett
  uten tilfeldige sekvenser, fasit-toggle, elev- og fasit-PDF 1 side,
  ordbank + små bokstaver uten ny legging, valideringsfeil, bilde som
  eneste ledetråd, utkast med ledetråder over reload. Bygg grønt,
  axe 0/22, kant 0/22. LÆRDOM (Playwright): addInitScript kjører på
  nytt ved HVER navigasjon — scenarier med egen localStorage må ha egen
  context, ellers overskrives det du satte i evaluate før reload.
- Ordbingo fra tidligere i dag verifisert live i prod (200 på begge
  språk) etter push.

### 2026-07-11 — Nytt lærerverktøy: Ordbingo
- **Ordbingo** (/sandbox/ordbingo, EN: /en/sandbox/word-bingo): læreren
  skriver ordlista (samme rad-UI som søsknene: bilde per ord via knapp
  eller Ctrl+V, bannordfilter, utkast i localStorage uten bilder), velger
  brettstørrelse (3×3/4×4) og antall (1–40), og verktøyet trekker unike
  brett — helst ulike ORDSETT, ved få ord godtas ulik plassering (to
  nivåer i `src/lib/bingo.ts`, DOM-fri). Duplikatord fjernes før trekking
  (ville gitt dobbeltruter). Utskrift: to brett per A4-side med stiplet
  klippelinje mellom (brett brytes aldri over sider), og valgfrie
  trekkelapper på egen side til å klippe opp. Compliance-porten kjørt
  først: 🟢 (rad 18 i compliance_register.md — klientside, ingen data ut).
- **Sandbox-gridet er nå to spor** (fire kort i to hele rader + modul på
  full rad) — tre spor ville latt fjerdekortet stå alene mot kant-sjekken.
- QA: bygg grønt, axe 0/20, kant 0/20 (begge vaktene kan de to nye
  rutene), funksjonell Playwright-suite 20/20 grønn
  (`_baseline/qa/bingo-test.mjs`): unikhet på sett OG plassering,
  dublett-, bannord- og for-få-ord-flyt, simulert bilde-paste helt ut i
  rute og trekkelapp, PDF-sideantall verifisert med page.pdf() i mørkt
  tema (2 brett/side + lappeside), utkast over reload.

### 2026-07-11 — Dokumentavvik rettet: main er produksjonsgrenen overalt
- CLAUDE.md og docs/HANDOVER-PROMPT.md sa fortsatt at arbeidet skjer på
  gren v3 og at main var den gamle live-siden — to dager etter at v3 gikk
  til prod og main tok over. Begge er rettet: main = produksjonsgren, push
  = prod-deploy (krever grønn QA først), legacy-nextjs bevares, v3 er
  historisk. CLAUDE.md peker nå på LOGG.md som kilde til sannhet for
  tilstand, og now.json-fella (aldri i rota) er presisert der.
- HANDOVER-PROMPT: «Tilstand akkurat nå» peker til LOGG-en i stedet for å
  duplisere den; gjenstående-lista oppdatert (GITHUB_TOKEN er satt,
  release-gate kjøres mot prod, ikke preview).

### 2026-07-10 (sein kveld) — Spillet mobiloptimalisert + tapp-navigasjon
- **Alle funn fra SPILL-MOBIL-RAPPORT er fikset** (kun filer i src/spill/):
  liggende format virker nå (breakpoint utvidet til `(pointer: coarse) and
  (max-height: 520px)` + eget gamepad-oppsett: D-pad/E fixed på sidene,
  ramma bruker nesten hele høyden, Spill-knappen løftet over kontroll-
  lista); ghost click-en som auto-løste valg-minispillene er borte
  (E-knappen fyrer på pointerup + modal/endgame ignorerer pekere første
  400 ms); endgame-kortet og belønningsbanneret er fullskjerms/fixed på
  mobil; grønn h2-lekkasje fikset med eksplisitt farge i CSS-modulen
  (Base.astro urørt — annen økt eier den); 44px-runde på selects, chips,
  valg-knapper, meny-ekspandere og endgame-lenker; undertekster viser seg
  som sekundærlinje i boksen i stedet for å fortrenge CTA-en; badeanda
  holder seg unna døråpninger.
- **Ny styring: tapp-navigasjon** (best practice for casual topp-ned på
  touch): trykk på en rute → BFS-sti på solid-gridet + markør-blink;
  trykk på NPC/dør/objekt → gå innen rekkevidde og utløs interaksjonen
  (låste dører gir beskjeden). D-pad/tastatur avbryter ruta; stuck-vakt
  ved kollisjon; pek-og-gå virker også med mus på desktop. D-paden består.
- **Stale prompt-race fikset**: dør-CTA kunne overleve kartbyttet
  (updateTarget re-emitte i transisjonsframen) — nå nullstilles prompten
  eksplisitt i doTransition + ved scene-create.
- QA (Playwright, ekte touch): full gjennomspilling grønn mot prod-bygg
  (0 tap-through, alle seks valgspill viser feil→riktig-flyt), 4 viewports
  grønne (inkl. liggende), tapp-suite 12/12, desktop-regresjon 6/6
  (tastatur + mus + ingen pad + fargefiks), tsc + build grønt. Alle
  endgame-/reward-flater ≥ 44px. MERK: lange QA-løp kjøres mot statisk
  bygg (`_baseline/qa/statisk-server.mjs`, port 4323) — dev-serverens HMR
  full-reloader midt i løp når parallelle økter lagrer.
- Skjermbilder oppdatert i `docs/innsikt/spill-mobil/`; addendum i
  `docs/innsikt/SPILL-MOBIL-RAPPORT.md`. Ikke committet.

### 2026-07-11 — Lim inn bilder med Ctrl+V i begge lærerverktøy
- **Bilde-paste i ordfeltene** (Ordkryss + Silhuetter): kopier et bilde
  på nettet (høyreklikk → «Kopier bilde») eller en bildefil i
  filutforskeren, og lim inn med Ctrl+V i ordfeltet — bildet legger seg
  på ordet akkurat som ved opplasting (miniatyr + fjern-badge). Leses
  fra clipboardData.items (bitmap) OG .files (kopiert fil); vanlig
  tekstliming kapres aldri (preventDefault kun ved bildefunn).
  Hint-teksten under ordlista forklarer trikset på begge språk.
- Verifisert med simulert ClipboardEvent i begge verktøy: bilde satt,
  badge på plass, tekst-paste upåvirket. Bygg grønt, axe 0/18, kant 0/18.

### 2026-07-11 — Silhuetter: stokket ordbank + dynamisk layout (A4/A3)
- **Ordbanken stokkes** (Fisher-Yates) ved hver generering så rekkefølgen
  aldri speiler silhuettene — eleven kan ikke skrive av ovenfra og ned.
- **Dynamisk layout**: --si-skala regnes i print-mm ut fra antall ord,
  lengste ord (i bokser), bilder og ordbank-linjer. Få ord = store
  silhuetter (tak 2.0), mange = mindre; over ~6 ord vurderes to kolonner
  (grid), og faller beste A4-skala under 0.85 velges A3 (egen
  @page-regel injiseres som style-element — @page kan ikke styres med
  klasser). Skjermforhåndsvisningen speiler skalaen (px-basert).
  MAKS_ORD 10 → 24. Status forteller layouten («… i to kolonner på A3»).
- **To brekk-lærdommer**: (1) print-emulering på skjerm måler i
  VIEWPORT-bredde — mm-brekk må verifiseres med page.pdf(), ikke
  emulateMedia; (2) flex-wrap i silhuetten lot en boks brekke ned og
  blåse radhøyden (side 2) — print har nowrap, breddebudsjettet har 3mm
  slakk og skala rundes NED.
- QA: PDF-verifisert 3/8/14/22 ord + ekstremtilfelle (22-bokstavs ord)
  — alle på ÉN side (A4/A4/A4/A3/A4). Bygg grønt, axe 0/18, kant 0/18.

### 2026-07-11 — UX-QA av header/meny/scroll + terskel-fiks
- **Playwright-gjennomgang** av hele header-maskineriet: tilstandsmaskinen
  (transparent topp → glass ved scroll → auto-hide → glass tilbake ved
  scroll opp → transparent på topp) er korrekt i alle overganger; åpen
  meny materialiserer flaten også øverst og lukkes ved scroll;
  avsløringen etterlater 0 skjulte elementer etter full gjennomscroll;
  fokusrekkefølgen er skip-link → merke → menypunkter, og tastaturfokus
  henter tilbake auto-skjult nav.
- **FUNN FIKSET: usynlig meny-klipping i 681–790px-sonen** — rad-menyen
  hadde intern horisontal overflow (83px på 690: «om meg» helt borte,
  «slik jobber jeg» halvklippet) uten synlig scrollbar. Hamburger-
  terskelen er flyttet 680 → 800; verifisert 0 overflow på 690/768/810/
  1024. Liggende telefon (812×375) får dermed fortsatt rad-nav — bevisst
  (812 > 800, og raden får plass der).
- QA: bygg grønt, axe 0/18, kant-sjekk 0/18.

### 2026-07-10 (natt mot 11.) — Glass-header og lagdelte skygger
- **Headeren er tintet glass med scroll-tilstand** (Stians funn: den
  opake tint-platen ble brå): øverst på siden er headeren HELT
  transparent (ingen plate — headeren er siden), og ved scroll (y ≥ 24)
  materialiserer den seg som gjennomskinnelig aksent-tint
  (color-mix 78 % + backdrop-blur 14px saturate 1.4) med myk --nav-skygge
  i stedet for hard kantlinje. Overgangen glir 280ms. Fallback uten
  backdrop-filter: opak tint. Nedtrekkslista er samme glass, tettere
  (92 %). Åpen meny tvinger materialtilstanden også øverst.
- **Lagdelte skygger som felles flate-språk**: --kort-skygge er nå
  ambient + key i BEGGE temaer (mørk hadde none), med
  --kort-skygge-hover som dypnes i takt med kortenes løft (.kort og
  .eksperiment, begge språk). Kantlinjer består for struktur i mørkt.
- QA: Playwright-skjermbilder av topp/scrollet i lys standard, lys
  rosa-palett (hue 340) og mørk — glasset følger paletten. Bygg grønt,
  axe 0/18, kant-sjekk 0/18.

### 2026-07-10 (sen kveld) — Nav-finpuss: hamburger til høyre, verktøy i menyen, aksent-tintet header
- **Hamburgeren står ytterst til høyre** (konvensjonen), og på mobil er
  topplinja nå bare merke + Meny: språkvelgeren («English version» med
  full tekst) og tema-switchen bor nederst i nedtrekkslista, bak en
  skillelinje. To tema-switcher (topplinje desktop + mobilmeny) deler
  tilstand via [data-tema-toggle] og holdes i synk. Desktop uendret.
- **Verktøyradene i menyen er nå entydige** (Stians funn: tema-switchen
  uten synlig etikett leste seg som om den hørte til «Norsk versjon»):
  språket er en lenke med pil og ENDONYM («English»/«Norsk» — W3C-praksis,
  aldri flagg: flagg er land, ikke språk; Facebook endte på ren tekst
  etter brukertesting), og temaet er en merket switch («Mørkt tema»/«Dark
  theme») der hele raden er knappen. CSS-felle: .tema sin all:unset lå
  senere i kaskaden og nullet width — løst med .tema.meny-tema.
- **Headeren er en hevet flate tintet med AKSENTEN** (Material 3-
  prinsippet: tonal forskjell viser hvor flater begynner/slutter, og
  hevede flater tintes med primærfargen): --nav-bg er nå
  oklch(22.5% 0.028 var(--hue2)) mørk / oklch(90% 0.032 var(--hue2))
  lys — synlig men nøktern, og følger aksent-slideren i Modul C live.
  L holdt nær de gamle verdiene så kontrasten står (axe 0/18).

### 2026-07-10 (kveld) — Hamburgermeny på mobil, scroll-avsløring, trykkflater
- **Hamburgermeny på mobil** (≤680px, kun med JS): den synlige to-raders
  menyen kostet 166px = 20 % av førstevisningen på 375×812 — nå er
  topplinja 53px med «Meny»-knapp (ikon + tekstetikett, NN/g: ikon+tekst
  slår ikon alene) som åpner nedtrekksliste med 48px-rader.
  Disclosure-mønsteret: aria-expanded/aria-controls, lukk ved lenkevalg,
  Escape (fokus tilbake til knappen), tapp utenfor og scroll. Desktop er
  urørt (NN/g: aldri hamburger der), og UTEN JS vises full meny også på
  mobil (`html.har-js`-flagg settes i Base før first paint).
- **Scroll-avsløring** (`src/lib/avslor.ts` + CSS i Base): innhold under
  folden glir inn første gang det synes — kun opacity/transform (ingen
  CLS), førstevisningen røres aldri (ingen LCP-straff), én gang per
  sidelast, stagger 70ms (maks 3 trinn), prefers-reduced-motion → helt
  av, print viser alltid alt, og tastaturfokus inn i uavslørt element
  avslører det straks. Løvverk-filter så kort animerer for seg og
  seksjonen rundt ikke dobbelt-animerer.
- **Trykkflater på berøringsskjerm** (pointer: coarse): kortfot-lenkene
  («repo →», var 23px) og footer-lenkene (18px) har fått utvidet
  trykkflate uten visuell endring; valg-etikettene i Ordkryss/Silhuetter
  har min-height 44px.
- Mobil-audit (Playwright 375×812, alle 9 nb-ruter): ingen horisontal
  overflow noe sted; målingene ligger til grunn for punktene over.
- **Mobil-hero eier første skjermbilde**: min-height 100svh minus
  topplinja, CTA-en ankret nederst (margin-top: auto) — «Utvalgte
  prosjekter» synes først ved scroll (målt: starter 833px på 812-skjerm).
  Pila i «native-jobb →» droppes på mobil (den peker på knappen når de
  deler linje på desktop; på mobil brakk knappen ned og pila pekte ut i
  lufta), og knappen står som egen blokk med luft (margin s-4).
- **Navnetrekket lever på touch også**: dra fingeren bortover «stiglo»
  («strumming») for samme kinetikk som hover — bokstaven under fingeren
  vides ut og farges med naboregelen. En drag (>10px vannrett) svelger
  det påfølgende klikket, så lenka navigerer bare ved tapp; vertikal
  sveip scroller som normalt (touch-action: pan-y). RETTELSE samme
  kveld: pointer-events byttet til rå touch-events med preventDefault
  når horisontal intensjon er avklart — Chrome på Android sluker
  pointermove på lenker (gest-arbitrering) selv med pan-y, så strum
  virket i emulator men ikke på ekte telefon. user-select/touch-callout
  av på merket så selection/lenke-meny ikke kaprer gesten. Ankomstbølge én gang
  per merke per sidelast (IntersectionObserver, terskel 0.6) viser at
  navnet er levende — helt av ved prefers-reduced-motion. Hover, strum
  og bølge deler tenn/slukk-logikken.
- QA: bygg grønt, axe 0/18, kant-sjekk 0/18, desktop-regresjon og
  reduced-motion verifisert programmatisk.

### 2026-07-10 (kveld) — QA: mobil-gjennomspilling av Skamløs Pitch
- **Full touch-gjennomspilling** av spillet i emulert mobil (Playwright,
  ekte touch-events): hele kjeden fullført på 375×812; nøkkelskjermer
  også testet på 360×640, 430×932 og liggende 812×375/932×430. Rapport:
  `docs/innsikt/SPILL-MOBIL-RAPPORT.md`, skjermbilder i
  `docs/innsikt/spill-mobil/` (61 stk). Kun rapport — ingenting fikset.
- Hovedfunn: liggende format er ubrukelig (mobil-CSS-en er portet på
  bredde ≤680px, liggende telefoner er bredere); E-knappen tapper gjennom
  og auto-løser 5 av 6 valg-minispill (ghost click); endgame-kortet og
  belønningsbanneret er sperret inne i/klippes av spillramma; global
  h2-farge lekker inn og gjør «Søknadspakke levert» nesten uleselig.
  Positivt: kjeden er fullførbar med touch, save/Fortsett, språkbytte,
  mute og låste dører virker; ingen JS-feil.
- Testskriptene ligger gitignored i `_baseline/qa/mobil-*.mjs` og kan
  kjøres om igjen mot dev-serveren (port 4322).

### 2026-07-10 (ettermiddag) — Nytt lærerverktøy: Silhuetter
- **Silhuetter** (/sandbox/silhuett, EN: /en/sandbox/word-shapes):
  skriveark der elevene fyller bokstavene inn i ordets silhuett — høye
  bokser (b d f h k l t å + store bokstaver via senking), dype (g j p q
  y) og lave (resten). Bokstavlogikken bor i `src/lib/silhuett.ts`;
  bannordfilter og normalisering deles med Ordkryss. Panel-layout,
  bilde per ord (med fjern-badge), valgfri ordbank på arket, utkast i
  localStorage (uten bilder, som Ordkryss), print-CSS etter
  print-reglene (color-scheme light, aldri skjul .ramme,
  break-inside: avoid per rad). Verifisert: klassifisering programmatisk
  (blåmeis/gråmåke/pjokk), Playwright-PDF i mørkt tema = rent hvitt ark
  i sjangeren.
- **Sandbox-grid er nå tre spor** (spill + to verktøy + modul på full
  rad); bryter til én kolonne under 900px. QA-vaktene kjenner de to nye
  rutene — axe og kant-sjekk går nå over 18 ruter.
- **Vercel-kvote**: v3-branchen synces IKKE lenger ved push (Stians
  valg) — halverer deploy-forbruket som traff rate-limiten i natt.

### 2026-07-10 (natt, del 4) — Punchliste 3: Ordkryss-panel tilbake, ekte flytskjema
- **Ordkryss er tilbake til panel-layouten** (oppsett i venstremargen +
  ark til høyre) — Stian foretrakk den over wizard-stegene. Hentet fra
  git (a28b93b) med to påplussinger: plassholderen er «Skriv tittelen
  her» (ikke «Ukas ord»), og lastUtkast tåler utkast fra andre versjoner
  (strenger ELLER {tekst, bilde}-objekter). Wizard-koden er forkastet.
- **Flytskjemaet er nå et ekte flytskjema** (runde 3): aktivitetene
  munner ut i betingelsen sin PÅ ryggraden, JA fortsetter nedover fra
  diamantbunnen, og NEI-pilene tegnes helt fram til målsteget — «alt
  grønt?»-nei looper til steg 3 (høyre), «godkjent?»-nei går til steg 1
  (høyre) og steg 2 (VENSTRE felt — symmetri), prikket syklus til steg 1.
  Stubb fra diamantspiss gjennom etiketten gjør pilene sammenhengende.
  «→ 1»-målnumrene i pillene vises kun på mobil (der linjene ikke tegnes).
  Eierfargene og tegnforklaringen består. Høyde ~895px.
- **Kort-notater dempet**: .note i ProsjektKort og .testbruker på
  /prosjekter er nå kursiv + dempet (bifagsrolle, ikke konkurrent til
  brødteksten).
- **Hue-koblingen re-verifisert** etter Stians rapport: avstandsmodellen
  er korrekt i koden (aksent først → grunn etterpå bevarer avstanden,
  også over reload og rundt hjulet) — det han så var prod FØR nattens
  deploy.
- QA: bygg grønt, axe 0/16, kant-sjekk 0/16.
- **Print-fiks (etterslep)**: utskriften var en svart tom side — .ramme
  (main, arkets forelder!) sto i display:none-lista, og uten
  color-scheme: light malte Chrome sidebakgrunnen mørk i mørkt tema.
  REGEL: aldri skjul arkets forfedre i print-CSS, og tving alltid
  html/body til color-scheme light + hvit bakgrunn. Verifisert med
  Playwright page.pdf() i mørkt tema mot BÅDE dev og produksjon.

### 2026-07-10 (natt, del 3) — Punchliste 2: spill-mobil, hue-avstand, flyt-farger
- **Spillet er mobilvennlig**: på ≤680px løftes overlays UT av den lille
  3/2-ramma med position: fixed — startskjermen dekker hele viewporten
  (hele kortet + Spill-knappen synlig), HUD-chipsene ligger i den ledige
  sonen OVER spillet (kartet dekkes ikke), hint-banneret brekker nederst,
  og meny/paneler/minispill bruker hele skjermen. VirtualPad (D-pad + E)
  fantes fra før. Verifisert med Playwright 375×812 (start, i spill,
  meny) — 0 konsollfeil. MERK: preview-verktøyets screenshot er upålitelig
  ved emulert mobil — bruk Playwright for mobil-visuelt.
- **Hue-koblingen er en avstandsmodell**: grunnfargen flytter ALLTID hele
  paletten; har du valgt egen aksent, bevares vinkel-avstanden (wrappes
  rundt hjulet). Verdiene vises som hex (canvas-piksellesing av chipene —
  computed er oklch-strenger; leses på nytt etter 650ms-gliden). Knappen
  heter «fabrikkinnstillinger».
- **Flyten fargekodet etter eierskap** (sidens poeng): salvie = mennesket
  (steg 1+4), egen agent-tone oklch(58% 0.11 hue2+80) = agenten (steg
  2+3, blå ved standard — hue-aksent var for lik salvie i lyst tema),
  NEI-tags i --feil. Statement-rader (1/2/5) spenner til diamant-sporet
  så høyresiden ikke gaper. Tegnforklaringen fikk eier-chips.
- **Tekstvask**: navnetrekket er «stiglo» (uten punktum), hero-CTA bruker
  → i stedet for tankestrek, footer sier bare «Ingen informasjonskapsler»,
  «Bygd med Claude Design og Claude Code» erstatter «åpen dialog» overalt,
  claude-first-kortet sier «små og mellomstore bedrifter», Ordkryss-intro
  uten «ukas ord». Alt på begge språk.
- **DNS-avklaring**: Webhuset-DNS-en peker allerede riktig til Vercel
  (A 216.198.79.1 + www-CNAME til vercel-dns). Prosjektvalget styres i
  Vercel, ikke DNS. Resend-records skal inn i Webhuset senere.
- QA: bygg grønt, axe 0/16, kant-sjekk 0/16, mobil-Playwright grønn.

### 2026-07-10 (natt, del 2) — Stians punchliste etter prod-lansering
- **Spillet i produksjon var grønn rutenett-grafikk** (Phasers
  mangler-tekstur): Phaser 3.9 laster bilder som XHR → blob-URL, og
  CSP-en manglet `blob:` i img-src. I dev er det ingen CSP — derfor
  virket alt lokalt. Fikset i vercel.json (`img-src 'self' data: blob:`).
  LÆRDOM: nye browser-APIer i prod-problemer? Sjekk CSP-en først.
- **Hero-matrisen har aldri mer scrollbar**: rutene ligger i grid
  `repeat(30, minmax(0, 18px))` og krymper med plassen i stedet for å
  scrolle (7,4px på mobil, 18px på desktop).
- **Forsidene rendres per forespørsel** (`prerender = false` + s-maxage
  900/SWR) så matrisen og «aktiv i dag» alltid er ferske. github.ts
  leser tokenet ved kall-tid (process.env i runtime) og events-cachen
  fikk 5 min TTL (varme lambdaer gjenbrukte ellers svaret evig).
  GITHUB_TOKEN er SATT som Vercel-env (production, kryptert) og
  verifisert live: «7 bidrag 10. juli» i tooltip samme kveld.
- **Flytskjemaet på /slik-jobber-jeg får plass i én viewport** (~785px):
  hvert steg er nå en vannrett rad — node | arm | diamant | nei-piller —
  i grid med delte spor. Returlinjene rutes fortsatt i høyrefeltet;
  rute a går inn nederst i node 3 ('bunn'-inngang). Readme-bredden er
  bundet til samme formel som flyten (`min(940px, 100% - 120px)`) så
  kant-sjekken holder.
- **Ordkryss-tekstene strippet for historie**: «skriv inn ordene elevene
  skal finne», ingen CS50x-omtale på siden eller kortene (begge språk).
- **Vercel ryddet**: portfolio-site-v3 og vgx-pitch er koblet FRA repoet
  (git disconnect) — hver push bygger nå kun prod-prosjektet
  «stianglomsrod», og commit-statusen på GitHub blir grønn. Spillet
  verifisert i prod med Playwright: ekte teksturer, 0 konsollfeil.
- QA: bygg grønt, axe 0/16, kant-sjekk 0/16.

### 2026-07-10 (natt) — Ordkryss-wizard, smooth nav-scroll, v3 til produksjon
- **Ordkryss er nå en wizard i fire steg** (tittel → ord → innstillinger →
  forhåndsvisning) med Forrige/Neste. Bilde per ord er en 48px-knapp i
  selve ordraden (klikk = legg til/bytt, FileReader → data-URL, blir med
  på utskriften). Ordlista tåler utkast fra eldre versjoner med andre
  feltnavn (alt som ikke er streng behandles som tomt) — gamle utkast i
  localStorage krasjet ellers hele skriptet.
- **Nav-auto-hide bygget om fra terskel til proporsjonal glidning**:
  naven følger scrollen piksel for piksel (som om den lå i dokumentet)
  og snapper mykt helt inn/ut i brukerens siste scrollretning når
  scrollen stopper (140ms ro). Transition ligger kun på snapp-klassen
  `.glir` — under aktiv scroll setter JS transformen direkte, ellers
  blir det gummistrikk-lag. Fokus i naven overstyrer alltid skjuling.
  Det gamle «ett tick ingenting, to tick hopp»-mønsteret er borte.
- **v3 er produksjonsgrenen**: main på GitHub = v3-koden. Den gamle
  Next.js-siten (2e07486, siste deployede) er bevart som branch
  `legacy-nextjs` på GitHub — ikke slett den.
- **Vercel**: repoet er koblet til TRE prosjekter (stianglomsrod = prod
  med domenet, portfolio-site-v3, vgx-pitch). Prod-prosjektet sto med
  Framework Preset = Next.js og avviste Astro-bygget i stillhet — flippet
  til Astro med `vercel project update stianglomsrod --framework astro`
  (godkjent av Stian; reverseres med `--framework nextjs`).
- QA før push: bygg grønt, axe 0 brudd på 16 ruter, kant-sjekk 0 avvik,
  wizard testet ende-til-ende i preview.

### 2026-07-10 — Kant-flukt løst systemisk: border-box + kant-sjekk i QA
- **Global `box-sizing: border-box`** i Base: rotårsaken til alle
  «skjeve kanter» var content-box, der padded blokker (readme, moduler)
  stakk forbi naboer med samme max-width. Nå ER oppgitt bredde
  ytterkanten.
- **Sandbox**: kortene og hue-modulen deler grid (to eksplisitte spor,
  modulen spenner raden) — målt piksel-eksakt lik høyrekant. Merk:
  auto-fit fungerte IKKE her (full-rad-elementet holdt et tomt tredje
  spor i live). HueVelger har ikke lenger egen max-width; konteksten
  bestemmer. Readme-blokka på how-i-work deler kant med flyt-nodene.
- **Ny programmatisk vakt**: `_baseline/qa/kant-sjekk.mjs` måler alle 16
  ruter og feiler hvis en blokk-flate verken har nabo til høyre eller
  når sidens/containerens høyre kant. Inne i grids sjekkes hver rad
  unntatt den siste (ufullstendig sisterad er normal brekking). Kjøres
  sammen med axe før commit av UI-endringer.

### 2026-07-09 (natt, del 2) — Tospråklig side, tema-switch, Ordkryss i /sandbox
- **Engelsk versjon av hele siden** under /en/ med engelske slugger
  (/en/projects, /en/journey, /en/how-i-work, /en/about, /en/colophon,
  /en/sandbox, /en/sandbox/wordsearch). Tvilling-kartet og delte
  UI-tekster bor i `src/lib/i18n.ts`. REGEL: hver norsk side har en
  engelsk tvilling — endrer du innhold på den ene, endre den andre
  (kommentar øverst i hver tvilling sier hvor).
- **Språkvelger** i nav: lenke til tvillingsiden (EN/NO) med hreflang;
  URL-en er språkvalget, ingen JS-tilstand. `<html lang>` og
  hreflang-alternates settes per side.
- **Tema er nå en ekte switch** (role="switch", aria-checked, spor med
  sol/måne og glidende kule) i stedet for tekstknapp.
- **Ordkryss inn i /sandbox** som eget verktøy på begge språk:
  kjerne i `src/lib/ordkryss-kjerne.ts`, UI i
  `src/components/OrdkryssVerktoy.astro` (print-CSS skjuler nav/footer,
  arket er alltid hvitt). Sandbox har nå kortgrid med spill + verktøy.
  CS50x-kortet lenker til verktøyet i stedet for YouTube-demoen.
- **UU**: lysboks-telleren fikk aria-live, relativ-tid følger sidens
  språk, Kontaktskjema/HueVelger/Hero/Nav/Footer tar lang-prop, skjema-
  meldinger følger `<html lang>`. Axe: 0 brudd på alle 16 ruter.

### 2026-07-09 (natt) — Mobilnav som rad, kolofon-tekst, Ordkryss v2
- **Mobilnav**: menyen brekker til egen rad under merket/tema-knappen —
  alle seks punktene synlige, ingen hamburger (guiden) og ingen
  halvskjult horisontal scroll. Portrettet på /om sentreres på mobil.
- **Kolofon/Prosessen** omskrevet etter Stians diktat: Claude Design
  fikk god kontekst for å iterere designguiden; guiden ble overlevert
  Claude Code som jobbet med skills Stian har laget (/prd,
  /norwegian-software-guardrails, /secure-dev-guardrails).
- **CS50x-kortet**: «… et lite, ekte studentprosjekt der bugs og worst
  practices er ivaretatt.» Tankestreker fjernet i prosjekter.json og
  om-ingressen.
- **Ordkryss v2 bygget** i `C:\Users\x_ray\kode 2026\Claude\cs50x final
  project` (ikke git-repo): nytt ordletingsark-verktøy for lærere i ren
  vanilla JS (index.html + ordkryss.css + ordkryss.js). Vannrett/
  loddrett/diagonal innsetting med kryssing, bilde per ord (valgfritt,
  også «bare bilder»-modus), utskrift + fasit-utskrift, bannordfilter
  på input OG hele rutenettet i alle leseretninger (norsk, engelsk,
  svensk/dansk, tysk, spansk, fransk), utkast i localStorage. 34
  Node-tester grønne (plassering alle retninger, skann alle retninger,
  100 rene stress-genereringer). Originalfilene står som tidsdokument.

### 2026-07-09 (kveld) — UX-opprydding: scroll, hover, mobil/UU
- **Scroll-glitchen fikset** (blanke felt og klippet hero under scroll):
  den permanente `transition: --hue/--hue2` på `html` holdt hele siden i
  animasjonsberedskap og ødela scroll-compositing i Chromium. Transitionen
  ligger nå på en midlertidig `.hue-glir`-klasse som hue.ts setter rundt
  slider-/tilbakestill-endringer. I tillegg fikk sticky-naven
  `will-change: transform` (eget compositor-lag).
- **Mobil-overflow fikset**: nav-menyen presset siden 330px utover skjermen
  på 375px — flex-elementet manglet `min-width: 0`, så menyens interne
  scroll aldri slo inn. Alle 7 ruter er nå målt til 0 horisontal overflow.
- **Hover roet ned**: kort og sandbox-kort løfter seg 3px uten skalering
  (scale ga tekst-shimmer), 160ms. Galleri 1.02.
- **Nav-auto-hide**: slår først inn ved y > 160 og hysterese 16px (mindre
  flimring rundt heroen).
- **UU**: nav-punkter, hue-slidere og tilbakestill-knappen har min. 44px
  trykkflate. Testet: lysboks (åpne/bla/piltast/lukk), tema-toggle,
  kortklikk gjennom brødtekst, scroll ned/opp. Axe: 0 brudd på 7 ruter.
- **Hero-setningen**: «Jobber med del 2 av 15 i Full Stack Open.
  Tokenmaxxer med Fable 5 etter nok en reset.» («og rydder i gamle
  prosjekter …» er ute; «Tar del» → «Jobber med del»).

### 2026-07-09 — Flytskjema med etablert symbolspråk (1e3b1d7)
- /slik-jobber-jeg: beslutningsdiamanter («alt grønt?», «godkjent?») med
  merkede utganger, vannrette nei-piller med mål (↺ 3, → 1, → 2),
  strektype per funksjon (heltrukket/stiplet/prikket) og tegnforklaring.
  Roterte SVG-etiketter og duplikate ↺-rader fjernet.
- Tokenmaxx-notisen flyttet fra egen linje til slutten av H1.
- Sandbox-ingress omskrevet.

### 2026-07-09 — Flukt, klikkbare kort, aksent-hue, større tekst (d665fd6)
- Hovedcase/kort-grid/reisen-blokk fyller ramma (1060px) — kantene flukter.
- Typografi opp: brødtekst 17px, småtekst +0,5–1px.
- Kort klikkbare (strukket lenke; historie-lenke vinner, ellers første),
  lenkesone-fot beholdt klikkbar over.
- Hue-modul: grunnfarge + aksent (hue2) + «tilbakestill fargene».
- docs/HANDOVER-PROMPT.md opprettet.

### 2026-07-09 — Hue-drevet helsidepalett + auto-hide nav (79a3649)
- Hele paletten oklch(L C var(--hue/--hue2)), L/C låst → AA uansett tone.
- Sticky nav med auto-hide og egen --nav-bg-nyanse.
- Kortfot for lenker, pil-hover, --overskrift-token.
- Lys feilfarge senket til L 49,5 % (verst målt 4,82:1).

*(Eldre historikk: se git-loggen på v3.)*

## Teknisk gjeld

| Hva | Hvorfor det ligger | Neste steg |
| --- | --- | --- |
| Release-gate ikke fullført mot produksjon | v3 gikk til prod 2026-07-10 før Lighthouse-gate; env-vars (GITHUB_TOKEN, RESEND_API_KEY) + Resend-DNS gjenstår (Stians hånd) | Lighthouse ≥95 alle ruter mot stianglomsrod.no + manuell gjennomspilling |
| Kontaktskjema svarer 503 uten RESEND_API_KEY | Villet fail-closed til nøkkelen er satt | Sett env-var i Vercel |
| Ordkryss finnes i to utgaver | Siten har den levende (/sandbox/ordkryss, kjerne i src/lib); den frittstående i cs50x-mappa har Node-testene og er ikke i git | Hold kjernene i synk ved endring; vurder å flytte testene inn i repoet |
| mp3-diett for spilllyd | ffmpeg mangler på maskinen | Komprimer når ffmpeg finnes |
| size-adjust-fallbacks for fonter | Ikke prioritert | Reduserer CLS ved font-swap |
| OG-delingsbilde | Tilbudt, ubesvart | Lag hvis ønsket |
| PRD/overleveringspakke utdatert mot guide v3 | Helomvendingen | Revider dokumentene |
| Lori Frisør skriftlig godkjenning | Ikke blokkerende (dagens nivå) | Arkiver når den kommer |
| `data-node`-attributtene i flytskjemaet er ubrukte | Script bruker rekkefølge, ikke attributt | Fjern eller ta i bruk ved neste berøring |

## Regler som har blitt til underveis

**Sannhet**
- Klar er fungerende prototype (evaluert med lærere), IKKE i produksjon
  eller daglig bruk. Participatory design som metode; elever kun i
  forløperprosjektet. Aldri finn på tall/brukere/effekter.
- Lori Frisør: kun dagens offentlige nivå til skriftlig godkjenning.
- Usikker på en påstand? Spør Stian.

**Språk**
- Bokmål, klartekst. Ingen AI-markører: ikke tankestrek-mani, ikke
  «ikke bare X, men Y», ikke aforismer, ikke konsulentspråk.
- «digitalt læringsdesign». Tooling-arbeid (skills, persistent rules,
  loops) kommuniseres uten å si «ikke bare vibecoding».

**Tospråklighet**
- Norsk bor på rot, engelsk under /en/ med engelske slugger. Tvilling-
  kartet er `RUTEKART` i src/lib/i18n.ts — nye sider registreres der.
- Endrer du innhold i en side, endre den engelske/norske tvillingen.
  Sannhets- og språkreglene gjelder begge språk (EN: klar engelsk uten
  buzzwords, samme ærlighet om prototype-status).

**Design/kode**
- Fargetokens: kun oklch med LÅST L/C; toner styres av --hue (flater/
  tekst) og --hue2 (aksent). Endrer du L/C, må kontrasten måles på nytt.
- Ingen permanente transitions på rot-elementet (ga scroll-glitcher);
  bruk midlertidig klasse rundt endringen.
- Ikke `scale()` på flater med tekst i hover (shimmer) — bruk translateY.
- Flex-elementer som skal kunne krympe trenger `min-width: 0`.
- Blokk-flater får ALDRI egen max-width i px når de står i en kolonne
  med naboer — de fyller sporet sitt, og grid-en eier bredden. Kjør
  `node _baseline/qa/kant-sjekk.mjs` etter layoutendringer.
- auto-fit kollapser bare helt tomme spor: et element med
  `grid-column: 1/-1` holder alle sporene i live. Bruk eksplisitt
  spor-antall når grid-en har fullrads-elementer.
- Salvie kun om det levende/handlekraftige. Ingen kode-estetikk.
- Trykkflater min. 44px. Axe skal stå i 0 brudd på alle 7 ruter.
- Etiketter i diagrammer står alltid vannrett; beslutninger = diamant med
  alle utganger merket.

**Rigg**
- Push til main etter fullført arbeid trenger ikke eget klarsignal fra
  Stian (hans beslutning 2026-07-11) — men ALLTID grønn QA først, og
  push er fortsatt prod-deploy. Andre irreversible remote-operasjoner
  krever fortsatt eksplisitt ja.
- Commit med `git commit -F <fil>` (PS 5.1 brekker anførselstegn).
- Datafila heter `src/data/now.json` — aldri `now.json` i rota (Vercel).
- `vercel.json` = security-headers, må ikke overskrives.
- Fonter: nytt filnavn ved glyf-endring (cache-bust);
  font-variation-settings, ikke font-stretch %.
- QA: `node _baseline/qa/axe-v3.mjs` (dev-server på :4322).
- Dev-server må restartes etter mange raske filskrivinger hvis HMR
  serverer gamle scoped styles.
- Astro dev-toolbar er den mørke pillen nederst i dev — finnes ikke i
  produksjonsbygg.
