# Verktøy-research juli 2026 — nye generator-kandidater for /sandbox

> **Formål:** varig kunnskapsbase for hvilke oppgave-/arksjangre som finnes i norske og
> internasjonale læringsressurser, og hvilke som egner seg som nye panel→ark-generatorer
> på stianglomsrod.no/sandbox. Skrevet 16.07.2026 på gren `nye-verktoy`, etter at de 13
> første verktøyene var bygd. Grunnlag: 8 parallelle kildesveip (198 funn), syntese til
> 20 kandidater, og adversariell verifisering av hver kandidat med to uavhengige linser
> (teknisk generator-egnethet og pedagogisk klasseromsverdi). Alle 20 overlevde begge.
> I tillegg: manuell nettleser-runde på malimo.no, undervisningsmetoder.com,
> skolestudio.no og matematikk.org.

## Lesten (kravene alle kandidater er vurdert mot)

Panel der læreren gir input (ordliste, tekst, tallinnstillinger, evt. bilder via Ctrl+V)
→ hvitt A4-ark generert klientside, ofte med fasit-utskrift. Ingen server, ingen
innholdsdatabase, ingen tredjeparts-rettigheter. Kandidater som krever ferdiginnhold
(lesetekster, illustrasjonsbibliotek, lydfiler, symbolbibliotek) er forkastet underveis.

**Eksisterende verktøy (juli 2026):** Ordkryss · Silhuetter · Ordbingo · Kryssord ·
Luketekst · Setningsstokking · Ord-til-bilde · Sporing · Alfabetisering · Regneark ·
Klokkeark · Tallinjer · Gangetabell.

## Sjangerkartet

Funnene fra de åtte sveipene klumper seg i sju familier. (1) TALLFORSTÅELSE-STRUKTURER er det største og mest samstemte hullet: tiervenner/tallvenner, tallfamilier, tierammer, hundrekart, plassverdi/base-ti, tallnaboer, sammenlikning og tallrekker går igjen i alle kilder fra Udir-kartlegging til TpT — alt 100 % algoritmisk, og norsk konkurrent ukemal.no bekrefter etterspørselen. (2) ORDNIVÅ-TRANSFORMASJONER av lærerens egen liste/tekst: ordkjeder (fire uavhengige kilder!), ord med hull, ordstokking, kryptogram, retteark/tegnsetting — samme input-lest som Luketekst/Setningsstokking, nye transformasjoner. (3) KORT- OG SPILLFORMATER dominerer det norske markedet (Malimo, Spireserien): oppgavekort, klypekort, memory/domino, loop-kort, spillbrett, terning-/spinnerark — sandboxen lager i dag bare flate ark, ingen klippbare artefakter. (4) KORT-I-ROMMET-familien (hentediktat, natursti, write the room) er signatursjangeren i norsk stasjons-/uteskole og er ren to-utskrifts-layout. (5) MATTE-PUSLESPILL (mattesøk, regnelabyrint, tallkryssord, magiske kvadrater, sudoku) gir lekenhets-laget dagens rene drillark mangler. (6) SKRIVE- OG STRUKTURMALER (skriverammer, ordarbeids-/gloseark, begrepskart, VØL/tankekart, ukens ord-rutinen) er Skrivesenterets og engelskfagets kjerne — lav algoritme-verdi men enorm bruksfrekvens. (7) SPES.PED-STØTTEARK (repetert lesing-skjema, dagsplan, belønningsskjema, følelsesskala) er ark som ikke er oppgaver, men struktur rundt eleven — genererbare, men flere av dem gir mest verdi med symbolbibliotek vi ikke har. Utenfor lesten faller alt innholdsbårent: lesetekster, myldrebilder, illustrasjonsbasert color-by-code, symbolstøttet tekst (Widgit) og Mattelist-oppgaver.

## Validering av eksisterende verktøy

Kartleggingen bekreftet at dagens verktøy treffer reelle, etterspurte sjangre:

- «Ordsøk høyfrekvente ord» (Malimo) og letekryss-innslagene i temapakkene = Ordkryss (1)
- Bingo-variantene i Malimos «Ett tema — flere spill» og lesebingo-brett (undervisningsmetoder) = Ordbingo (3) — lesebingo kan bli en fri-celletekst-modus
- Kryssord-innslagene i alle temapakker (undervisningsmetoder m.fl.) = Kryssord (4)
- Bokstavhus-arkene (undervisningsmetoder, Malimos BOKSTAVSERIE delvis) = Silhuetter (2)
- «Les og sett strek»-serien og ord→bilde-avkodingsark (spes.ped/Statped-tradisjonen) = Ord-til-bilde-kobling (7)
- Setningsbygging klipp-og-lim (TpT/K–1) og setningspuslespill (helhetslesing) = Setningsstokking (6) — dekkes med to nye avkrysninger (klippelinjer + skrivelinje)
- Tom tallinje (Udir støttemateriell) = Tallinjer med hull (12) — gratis modus-utvidelse
- Alfabetremse med hull (Salaby) = Tallinjer-mekanikken (12) på Alfabetiserings-domenet (9) — billig utvidelse, ikke nytt verktøy
- Gangeprøve med diplom (Kitty) = Gangetabell-utfylling (13) — prøvelayout + diplomark er utvidelse av samme motor
- Navnesporing-bok / klasseliste-batch (createprintables) = Sporing (8) — batch-utskrift per elev som utvidelse
- Sammenhengende skrift/stavskrift (Zeppelin/Salto) = Sporing (8)-utvidelse, men krever skriftbane-SVG for sammenbindinger (stor innsats)
- matematikk.orgs drillgeneratorer (Regnemesteren, Gangetesteren) = Regneark (10) og Gangetabell (13) digitalt — ingen nye print-sjangre
- Bokstavdiktat med bilder, ordlesing flervalg og setningslesing med bildevalg (Udir kartlegging) = varianter av Ord-til-bilde-kobling (7) med Ctrl+V-modellen
- Ordkort/lesekort og flashcards i ren utklippsform ligger produksjonsmessig nær Ordbingo (3)/Ord-til-bilde (7), men spillformatene (memory/domino/loop) er rapportert som egne kandidater

## Prioritert kandidatliste (alle verifisert holdbare)

Sortert etter samlet styrke (pedVerdi × generatorFit, verifiseringsscorene som korrektiv).
«Tek» og «Ped» er de adversarielle linsenes scorer (1–5) — begge forsøkte aktivt å AVVISE
kandidaten og mislyktes for samtlige.

| # | Kandidat | Fag | Trinn | Innsats | Fit | PedV | Tek | Ped |
|---|----------|-----|-------|---------|-----|------|-----|-----|
| 1 | Ordkjeder | norsk | 2.–7. | liten | 5 | 5 | 5 | 4 |
| 2 | Hundrekart med hull | matematikk | 1.–3. | liten | 5 | 5 | 5 | 4 |
| 3 | Hentediktat & postløype | norsk/tverrfaglig/uteskole | 1.–7. | liten | 5 | 5 | 5 | 4 |
| 4 | Tallvenner & tallfamilier | matematikk | 1.–4. | middels | 5 | 5 | 5 | 4 |
| 5 | Tallforståelses-ark (dagens tall) | matematikk | 1.–4. | middels | 5 | 5 | 5 | 5 |
| 6 | Plassverdi-ark (tiere og enere) | matematikk | 1.–4. | middels | 5 | 5 | 5 | 4 |
| 7 | Brøkark (skravering og sammenlikning) | matematikk | 3.–7. | middels | 5 | 5 | 5 | 4 |
| 8 | Sorteringsark (kategorisortering) | norsk/matematikk/naturfag/engelsk | 1.–5. | middels | 5 | 5 | 5 | 4 |
| 9 | Øveord- og glosearbeidsark (ukens ord) | norsk/engelsk | 1.–7. | middels | 5 | 5 | 5 | 5 |
| 10 | Hemmelig kode (kryptogram) | norsk/engelsk/tverrfaglig | 1.–7. | liten | 5 | 4 | 5 | 4 |
| 11 | Tieramme- og mengdeark | matematikk | 1.–2. | liten | 5 | 4 | 5 | 4 |
| 12 | Mattesøk (regnestykke-ordsøk) | matematikk | 2.–7. | liten | 5 | 4 | 5 | 3 |
| 13 | Tallpyramider & magiske kvadrater | matematikk | 2.–7. | liten | 5 | 4 | 5 | 4 |
| 14 | Ord med hull (manglende bokstaver) | norsk | 1.–5. | liten | 5 | 4 | 5 | 4 |
| 15 | Loop-kort («Jeg har … hvem har …?») | matematikk/engelsk/norsk | 2.–7. | liten | 5 | 4 | 5 | 4 |
| 16 | Repetert lesing / listelesing med registrering | norsk (spes.ped) | 1.–7. | liten | 5 | 4 | 5 | 4 |
| 17 | Retteark (fiks setningene) | norsk | 2.–5. | middels | 5 | 4 | 5 | 4 |
| 18 | Skriveramme-generator | norsk/engelsk/tverrfaglig | 1.–7. | middels | 4 | 5 | 4 | 5 |
| 19 | Par-kortgenerator (memory/domino) | norsk/engelsk/matematikk | 1.–7. | middels | 5 | 4 | 5 | 4 |
| 20 | Symmetri- og speilingsark i rutenett | matematikk/K&H | 2.–7. | middels | 5 | 4 | 5 | 3 |

## Anbefalt byggerekkefølge

**Bølge 1 — hurtige gevinster (liten innsats, gjenbruker eksisterende motorer):**
Ordkjeder · Hundrekart med hull · Hentediktat & postløype · Hemmelig kode (kryptogram) ·
Tieramme-/mengdeark · Ord med hull · Tallpyramider & magiske kvadrater.
Alle er små transformasjoner av lesten vi alt har (ordliste-UI, SVG-rutenett, fasit-mekanikk).

**Bølge 2 — flaggskipene (middels innsats, høyest samlet verdi):**
Tallforståelses-arket «dagens tall» (5/5/5/5 — største enkeltmulighet på mattesiden;
tallvenner-, plassverdi- og tierammefeltene kan på sikt bo som seksjoner her) ·
Øveord-/glosearbeidsark «ukens ord» (norskens og engelskens ukesrutine, 5-er på ped-verdi) ·
Skriveramme-generatoren (Skrivesenterets kjernemetodikk; eneste kandidat der verdien ligger
i layout, ikke algoritme).

**Bølge 3 — kort- og spillfamilien (ny produksjonssjanger: klippbare artefakter):**
Par-kort (memory/domino) · Loop-kort · Sorteringsark · Retteark · Repetert lesing-skjema ·
Mattesøk · Symmetriark. Disse innfører klippelinje-layouter (à la Ordbingos trekkelapper)
og dekker stasjonsundervisning — det norske markedets dominerende format.

## Kandidatprofiler

### 1. Ordkjeder

- **Fag/trinn:** norsk · 2.–7. · **innsats:** liten
- **Hva eleven gjør:** 3–4 av lærerens ord kjedes sammen uten mellomrom («solbilhus»); eleven setter strek der ordene skilles. Klassisk avkodings-/dysleksisjanger kjent fra Ordkjedetesten og Udirs kartleggingstradisjon.
- **Panel:** Ordliste (én per linje), ord per kjede (2–4), antall kjeder, skriftstørrelse, ev. skrivelinje under for å skrive ordene ut.
- **Ark:** Nummererte ordkjeder med god luft; fasit-utskrift viser kjedene med skillestreker/markerte ordgrenser.
- **Slektskap:** ingen — helt nytt hull; mekanisk slektning av Setningsstokking (6) på bokstavnivå
- **Norsk gap:** Finnes kun som statiske PDF-prøver og betalprodukter; ingen norsk gratisgenerator fra egen ordliste.
- **Kilder:** malimo.no (spinnerhefte/sommerbøker) · Zeppelin-arbeidsbøker · sprakloyper.uis.no ordkjedeprøve · Statped/lesekurs-tradisjonen
- **Teknisk linse (5/5):** Overlever angrepet: ren strengkonkatenering av lærerens egne ord — ingen innholdsdatabase, bilder, lyd eller server. Fasit er triviell (kjedene med skillestreker). Input-byrden er lik Ordkryss/Ordbingo: én ordliste. Eneste svakhet er segmenteringstvetydighet (sammensatte ord kan gi alternative splitt), men den løses klientside: fast, oppgitt antall ord per kjede + kollisjonssjekk mot lærerens egen liste. Unngå bare navnet «Ordkjedetesten» (beskyttet prøvenavn).
- **Pedagogisk linse (4/5):** Holdbar. Etablert norsk sjanger med sterk gjenkjenning: Ordkjedetesten (Conexus, standardisert 3.–10.), Språkløypers ordkjedeprøve, nasjonal kartleggingstradisjon — og reell øvingsbruk (Ordriket-kapittel, Malimo-stasjonsmateriell, lesekurs/spes.ped.). Gapet verifisert: kun statiske PDF-er og betalprodukter; ingen gratis generator fra egen ordliste. Trekk til 4: jevnlig bruk er mest 2.–4. trinn/stasjoner/intervensjon, ikke ukentlig helklasse 1.–7., og ren testdrilling bør unngås.

### 2. Hundrekart med hull

- **Fag/trinn:** matematikk · 1.–3. · **innsats:** liten
- **Hva eleven gjør:** 1–100-rutenett (eller valgfritt tallområde) der utvalgte ruter er tomme; eleven fyller inn via +1/−1/+10/−10-naboskap. Variant: små 3×3-utsnitt av kartet der naboene til ett tall skal fylles inn, og valgfri fargelegg-mysteriebilde-modus der læreren klikker ruter i et minipanel.
- **Panel:** Tallområde (0–100/120), hulltetthet eller «bare utsnitt», antall utsnittsoppgaver, ev. piksel-tegnepanel for mysteriebilde.
- **Ark:** Hundrekart/utsnitt med tomme ruter; fasit med alle tall utfylt (ev. fargelagt fasitbilde).
- **Slektskap:** Tallinjer med hull (12) — samme hull-i-struktur-idé i 2D; gjenbruker mye kode
- **Norsk gap:** Bare statiske kopioriginaler; ingen norsk generator med valgbar tetthet og utsnitt.
- **Kilder:** undervisningsmetoder.com · Matematikksenteret kopioriginaler · Udir kartleggingsprøver · worksheetfun/dadsworksheets
- **Teknisk linse (5/5):** Tåler adversariell test: hundrekartet er ren struktur der hver rutes verdi er entydig gitt av posisjonen, så hull, utsnitt og fasit genereres 100 % algoritmisk uten innholdsdatabase, bilder, lyd, rettigheter eller server. Input er noen få tallfelt — realistisk for travel lærer; mysteriebilde-klikkpanelet er valgfritt. Fasit triviell (fullt utfylt kart/fargebilde). Eneste felle: 3×3-utsnitt ved kartkant må velge sentrum ≥1 rute fra kanten eller tillate delvise naboer.
- **Pedagogisk linse (4/5):** Tåler press: hundrekart med manglende tall/nabotall er mainstream på 1.–3. trinn — Matematikksenteret bruker det gjennomgående, sjangeren finnes i Udir-kartlegging, og LK20 (plassverdi/tallrekke) treffer direkte. Ingen norsk generator funnet, kun statiske PDF-er og betalark; valgbar tetthet/område/utsnitt gir reell differensieringsverdi. Trekk: tall er språknøytrale (internasjonale generatorer delvis dekkende) og bruken er konsentrert til småtrinnets tallperioder.

### 3. Hentediktat & postløype

- **Fag/trinn:** norsk/tverrfaglig/uteskole · 1.–7. · **innsats:** liten
- **Hva eleven gjør:** Lærerens ord/setninger/spørsmål blir til to sammenhengende utskrifter: store nummererte kort som henges opp i rommet/ute (hentediktat, «skriv rundt i rommet», natursti/quiz-løype), og et matchende nummerert svarark eleven fyller ut. Signatursjangeren i norsk stasjons- og uteskole.
- **Panel:** Liste med ord/setninger/spørsmål (ev. med svaralternativer for natursti-modus), kortstørrelse (A5/A6/4-per-A4), modus (diktat/postløype).
- **Ark:** Utskrift 1: opphengskort i stor skrift med nummer og klippelinjer. Utskrift 2: svarark med nummererte linjer. Fasit for natursti-modus.
- **Slektskap:** Setningsstokking (6) i input; artefaktet (kort + svarark-par) er helt nytt
- **Norsk gap:** Enormt utbredt, men alt er håndlagde PDF-er per tema; ingen generator som lager kort+svarark-paret fra egen liste.
- **Kilder:** undervisningsmetoder.com (fast i hver temapakke) · idebank.malimo.no · kittysoppgaver.com · The Printable Princess (write the room)
- **Teknisk linse (5/5):** Overlever adversariell test. Sterkeste angrep — at sjangeren krever bildekort — faller: kildene viser at bilder er valgfri skrivestøtte, kjernemekanikken er les-ord-løp-skriv, og tekstrene hentediktater finnes. Alt genereres fra lærerens egen liste: nummererte kort + svarark er ren print-CSS, fasit er triviell (diktat: listen selv; natursti: lærer markerer riktig alternativ, generator stokker). Input-byrde som Ordbingo. Eneste friksjon: font-krymp på A6 og page-breaks — kjent terreng.
- **Pedagogisk linse (4/5):** Holder: hentediktat er dokumentert av Skrivesenteret og fast innslag i ukentlig stasjonsundervisning på småtrinnet; «ukas ord» gir ukentlig input, og ingen generator for kort+svarark+fasit fra egen liste finnes — kun ferdiglagde tema-PDF-er (undervisningsmetoder.com, Lekolar). Trekk fra 5 til 4: tyngdepunktet er 1.–3. trinn (ikke hele 1.–7.), postløype-/naturstimodus er sporadisk uteskolebruk, og verdien er ren layoutautomatisering uten algoritmisk innhold.

### 4. Tallvenner & tallfamilier

- **Fag/trinn:** matematikk · 1.–4. · **innsats:** middels
- **Hva eleven gjør:** Del-del-hele-representasjoner: number-bond-sirkler og tallhus for tiervenner (målsum 5/10/20/100) og regnetrekanter/tallfamilier der eleven skriver alle fire regnestykkene (3-4-7 → 3+4=7 …). Kjernestoff i norsk 1.–3. og i Multi/DragonBox-strategiapparatet.
- **Panel:** Målsum eller tallområde, representasjon (bond-sirkler/tallhus/trekant), hva som skjules (del/helhet/blandet), antall oppgaver, +/− eller ·/:.
- **Ark:** SVG-diagrammer med hull + ev. de fire tomme regnestykkelinjene per familie; komplett fasit.
- **Slektskap:** Regneark (10) i domene, men helt annen visuell representasjon — dekkes ikke av linjestykker
- **Norsk gap:** Tiervenner er overalt som betalkort/statiske ark; ingen norsk gratisgenerator med valgbar målsum og representasjon.
- **Kilder:** malimo.no oppgavekort · undervisningsmetoder.com · matematikk.org · DragonBox 1 · Education.com/TpT fact families
- **Teknisk linse (5/5):** Overlever adversariell test: ren aritmetikk — par/tripler genereres komplett fra målsum eller tallområde, ingen innholdsdatabase, bilder, lyd eller server. Bond-sirkler/tallhus/trekanter er generiske pedagogiske former tegnet som enkel SVG (samme teknikk som kryssord-rutenettet). Fasit kjennes før hull skjules. Panelinput er 4–5 valg, lettere enn Regneark. Forbehold: små målsummer gir få unike par (cap/dedup trengs, jf. Regneark-fiksen), og unngå Multi/DragonBox-visuell etterligning.
- **Pedagogisk linse (4/5):** Forsøkt avvist, men holder: tiervenner/tallhus er dokumentert kjernestoff i norsk 1.–3. (LK20 regnestrategier). Gratis statiske ark finnes (undervisningsmetoder, spireserien, ressurseriklasserommet), tallfamilier selges som betalkort — men ingen norsk gratisgenerator med valgbar målsum/representasjon funnet (ukemal.no mangler sjangeren). Trekk til 4: mye gratis statisk for standardtilfellet (sum 10), verdi konsentrert i småskolen, ·/:-trekanter svakt etablert i Norge.

### 5. Tallforståelses-ark (dagens tall)

- **Fag/trinn:** matematikk · 1.–4. · **innsats:** middels
- **Hva eleven gjør:** Ett ark som utforsker tall fra flere kanter: tallnaboer (før/etter), sammenlikning med <, >, = (tall eller regnestykke på hver side), tallrekker/hoppetelling med hull, partall/oddetall, plasser på tallinja. Kan kjøres som «dagens tall»-mal (ett tall, mange felt) eller som blandet drillark. Speiler Udir-kartleggingsprøvenes deloppgaver 1:1.
- **Panel:** Tallområde, avkryssing per deloppgavetype, antall oppgaver per type, ev. ett «dagens tall» + feltvalg.
- **Ark:** Seksjonert A4 med valgte oppgavetyper; automatisk fasit (unntatt tegne-/åpne felt).
- **Slektskap:** Regneark (10) i panelfilosofi, Tallinjer (12) tematisk; oppgaveformene er nye
- **Norsk gap:** Kildesveipet peker eksplisitt på dette som største enkeltmulighet på mattesiden; ukemal.no dekker bare biter.
- **Kilder:** Udir kartleggingsprøver i regning · The Curriculum Corner (number of the day) · Math-Drills number sense · ukemal.no (norsk konkurrent, bekrefter etterspørsel)
- **Teknisk linse (5/5):** Overlever adversariell test: alle deloppgaver (naboer, <>=, hoppetelling med hull, partall/oddetall, tallinjeplassering) er deterministisk aritmetikk + SVG — tallinjeteknikken finnes alt i verktøy 12. Ingen innholdsdatabase, bilder, lyd eller server. Fasit trivielt for alle lukkede felt; åpne felt eksplisitt unntatt. Panelbyrde ≈ Regneark (10). To forbehold: speil Udirs oppgaveFORMER, aldri ordrette prøveitems; A4-seksjonspakking i print gjør innsatsen middels+, ikke lav.
- **Pedagogisk linse (5/5):** «Dagens tall» er etablert daglig rutine i norsk begynneropplæring (Matematikksenteret, matematikk.org), og ark-versjoner selges/deles aktivt — utskriftsformen er reell. Udir-prøven dekker faktisk nabotall, sammenligning, tallrekker og tallinje («1:1» lett overdrevet: prøven er digital/adaptiv, men oppfølging skjer på papir). Gratis norske alternativer er statiske PDF-er eller ukemal.nos faste miks — ingen gir konfigurerbart tallområde, feltvalg og fasit. Kun liten overlapp med Tallinjer (12).

### 6. Plassverdi-ark (tiere og enere)

- **Fag/trinn:** matematikk · 1.–4. · **innsats:** middels
- **Hva eleven gjør:** Eleven leser/tegner base-ti-klosser (tierstaver og enerklosser som ren SVG-geometri), fyller H/T/E-posisjonsskjema og skriver tall på utvidet form (347 = 300+40+7) og omvendt.
- **Panel:** Tallområde (0–20 til 0–1000+), oppgaveretning (klosser→tall, tall→klosser, utvidet form begge veier), antall oppgaver.
- **Ark:** Blanding av kloss-figurer, posisjonsskjema og utvidet form-linjer; fasit.
- **Slektskap:** Regneark (10) berører tierovergang, men posisjonssystemet som representasjon er udekket
- **Norsk gap:** Egen hovedkategori hos undervisningsmetoder — men bare statiske ark, ingen generator.
- **Kilder:** undervisningsmetoder.com («Tiere og enere», egen hovedkategori) · Math-Drills · TpT number sense-pakker
- **Teknisk linse (5/5):** Overlever alle avvisningsforsøk: klossene er ren SVG-geometri (kvadrat/stav/10×10-plate) generert deterministisk fra tallet, fasit er trivielt avledbar begge veier, og panelinput (område+retning+antall) er lavere byrde enn eksisterende verktøy. Ingen innholdsdatabase, lyd eller rettigheter. To håndterbare forbehold: A4-arealbudsjett ved store tall (skaler/capp oppgaver per ark) og tusenkuben er 3D — capp på 999 i v1. Dedup av trekk trengs, samme mønster som Regneark.
- **Pedagogisk linse (4/5):** Ordrett LK20-treff: «beskrive posisjonssystemet ved hjelp av ulike representasjonar» (etter 2. trinn) — klosser/skjema/utvidet form ER representasjonene målet krever, og 3.–4. bygger videre til 1000. Sjangeren brukes beviselig i Norge (egen kategori hos undervisningsmetoder, ark hos kittysoppgaver m.fl.), men KUN som statiske PDF-er — ingen norsk generator med kloss-SVG, tallområde og fasit funnet. Trekk: temaet er periodisert, ikke ukentlig året rundt, og gratis statiske ark demper nøden. 4/5.

### 7. Brøkark (skravering og sammenlikning)

- **Fag/trinn:** matematikk · 3.–7. · **innsats:** middels
- **Hva eleven gjør:** Eleven skraverer angitt brøkdel av sirkler/rektangler/staver, leser av skraverte figurer og skriver brøken, eller sammenlikner to brøker med figurstøtte og <, >, =. Fyller sandboxens største fag-hull: null brøkverktøy for 3.–7.
- **Panel:** Nevnerområde, oppgaveretning (brøk→skraver, figur→skriv brøk, sammenlikning), figurtype, antall oppgaver.
- **Ark:** SVG-brøkfigurer med oppgavelinjer; fasit med korrekt skravering/brøk/tegn.
- **Slektskap:** ingen
- **Norsk gap:** Norske kilder har bare statiske brøkark; ingen gratisgenerator med valgbar nevner og retning.
- **Kilder:** undervisningsmetoder.com/matematikk/brok · kittysoppgaver.com · math-drills.com/fractions
- **Teknisk linse (5/5):** Avvisning mislyktes: alt er ren geometri + aritmetikk. Sirkelsektorer, rektangler og staver tegnes som SVG-paths klientside (samme lest som kryssord/klokkeark); ingen innholdsdatabase, illustrasjoner eller server. Fasit er deterministisk (skravering, brøk, <>=). Panelinput er fire enkle valg — lavere byrde enn ordliste-verktøyene. Eneste reelle designvalg: forenkling (2/4 vs 1/2) i figur→brøk-retning og lik figurbredde ved sammenlikning — begge trivielle regler, ikke blokkere.
- **Pedagogisk linse (4/5):** Tåler angrepet: LK20-målene etter 5. trinn krever ordrett det arket øver («del av en hel», «representere brøker på ulike måter og oversette mellom representasjonene», vurdere størrelser), og brøk er mellomtrinnets mest øvingstunge tema. Norsk-gapet verifisert: kun statiske PDF-er (kittysoppgaver, planetpsyd) eller betalt/digitalt (Salaby, Twinkl). To trekk: «3.–7.» er overdrevet — brøk inn først fra 5. trinn i LK20 (reelt 4.–7.), og temaet er bolkbasert, ikke ukentlig hele året.

### 8. Sorteringsark (kategorisortering)

- **Fag/trinn:** norsk/matematikk/naturfag/engelsk · 1.–5. · **innsats:** middels
- **Hva eleven gjør:** Stokket ord-/elementbank øverst (ev. klippebrikker nederst); eleven skriver eller klipper-og-limer elementene i 2–4 kategorikolonner: kj-/sj-lyd, substantiv/verb, partall/oddetall, levende/ikke-levende, engelske ordklasser. Universell lest på tvers av fag, hel serie hos Malimo («Vi sorterer» 1–14) og Wordwall-kjernesjanger.
- **Panel:** 2–4 kategorinavn + elementer per kategori (tekst, ev. Ctrl+V-bilder); modus skriv/klipp-og-lim; regelmodus (partall/oddetall autogenererer tall).
- **Ark:** Kolonneark + stokket bank/klippebrikker med kuttelinjer; fasit viser riktig fordeling.
- **Slektskap:** Ord-til-bilde-kobling (7) deler bildeinnliming; sorterings-artefaktet er nytt
- **Norsk gap:** Selges stykkevis hos Malimo per tema; ingen generator der læreren definerer egne kategorier.
- **Kilder:** malimo.no «Vi sorterer» · kittysoppgaver.com · wordwall.net printables · K5 Learning · lessoncraftstudio.com (norsk konkurrent)
- **Teknisk linse (5/5):** Overlever adversariell test. Alt innhold kommer fra læreren (kategorinavn + elementer) eller genereres algoritmisk (partall/oddetall); ingen innholdsdatabase, illustrasjonsbibliotek, lyd eller server. Bildeinnliming følger samme Ctrl+V-lest som verktøy 7. Fasit er triviell: input ER fasiten, arket er stokket visning av samme data. Inputbyrde (2–4 navn + 8–20 elementer) er på Ordbingo-nivå. Eneste felle: element som passer i flere kategorier — løses med duplikatvarsel, ikke lestbrudd.
- **Pedagogisk linse (4/5):** Overlever. Malimos «Vi sorterer» teller minst 39 sett (700+ oppgaver) knyttet til LK20-mål; Undervisningsbyen og Teaching Funtastic selger tilsvarende; Statped anbefaler ordsortering i begrepsopplæringen. Stasjonsarbeid 1.-4. gir ukentlig behov for sortering med ukas egne ord. Gratisalternativ er faste PDF-er (kittysoppgaver) eller Wordwall (digital, betalingsmur) - ingen norsk gratis generator med egne kategorier. Trekk: tyngdepunkt 1.-4.

### 9. Øveord- og glosearbeidsark (ukens ord)

- **Fag/trinn:** norsk/engelsk · 1.–7. · **innsats:** middels
- **Hva eleven gjør:** Én ordliste (øveord eller norsk↔engelsk-gloser) kjøres gjennom valgbare aktivitetsblokker på samme ark/hefte: les–dekk til–skriv–sjekk-kolonner, skriv tre ganger, stiplet førsteskrift, del i stavelser (lærermarkert), sett i setning, ordstudiebokser (skriv/tegn/bruk), pluss egen gloseprøve-utskrift med fasit. Ukesrutinen i praktisk talt alle norske klasserom.
- **Panel:** Ordliste eller ordpar-liste (norsk↔engelsk), avkryssing per aktivitetsblokk, linjetype, ev. prøvemodus.
- **Ark:** Sammensatt øveark (ev. flersiders hefte) + valgfri prøveutskrift med fasit.
- **Slektskap:** Alfabetisering (9) og Sporing (8) som delblokker — kan gjenbrukes som moduler
- **Norsk gap:** Ukens ord-rutinen finnes overalt, men læreren håndlager arkene i Word hver uke — ingen generator.
- **Kilder:** malimo.no Ordarbeidspakke · kittysoppgaver.com ukeslekse/work with words · Ordriket/Salto-tradisjonen · blogg.spraknokler.no
- **Teknisk linse (5/5):** Avvisning feiler: alt genereres fra lærerens egen ordliste. Stavelsesdeling er lærermarkert (bindestrek i input) — ingen NLP. Stiplet skrift gjenbruker Sporing (8); tegnebokser er tomme ruter, ingen bildebase. Fasit triviell: gloseprøve = ordparlisten, øveordsprøve = nummererte linjer + lista. Input (10–12 ord/par + avkryssing) er ukesrutine læreren alt har digitalt. Eneste kost: paginering av modulhefte — innsats snarere middels-høy.
- **Pedagogisk linse (5/5):** Overlever adversariell test. Reelle ukeplaner fra mange norske skoler bekrefter øveord/ukens ord som ukentlig rutine 1.–7. trinn («Jeg kan øveordene», «skriv øveordene og lag setninger»). Gratis-alternativene er statiske blanke skjema (kittysoppgaver) eller betalt (Malimo); ingen generator trykker lærerens egne ord ferdig (stiplet førsteskrift, les–dekk–skriv–sjekk, gloseprøve m/fasit). Ukentlig behov + reelt gap + perfekt generator-fit; gjenbruker Sporing/Alfabetisering.

### 10. Hemmelig kode (kryptogram)

- **Fag/trinn:** norsk/engelsk/tverrfaglig · 1.–7. · **innsats:** liten
- **Hva eleven gjør:** Lærerens ord/setning kodes med tilfeldig symbol- eller tallnøkkel (bokstav→symbol); eleven dekoder budskapet med nøkkelen trykt på arket. Høy motivasjonsfaktor, brukes fra 1. trinn og tverrfaglig.
- **Panel:** Ord/setninger, nøkkeltype (tall/enkle SVG-symboler), vis hel eller delvis nøkkel, skriftstørrelse.
- **Ark:** Kodenøkkel + kodede ord med tomme ruter/linjer under; fasit er klarteksten.
- **Slektskap:** ingen
- **Norsk gap:** LessonCraftStudio har norsk betalvariant — bekrefter etterspørsel; gratis finnes ikke.
- **Kilder:** kittysoppgaver.com (kodeskrift) · puzzlemaker.discoveryeducation.com · malimo.no «Knekke kodeord» · lessoncraftstudio.com kryptogram-skaper
- **Teknisk linse (5/5):** Overlever alle avvisningsforsøk: koding er ren algoritme (bokstav→tall/symbol) på lærerens egen tekst, fasit = klartekst + nøkkel, alt klientside med seedet PRNG. Ingen innholdsdatabase — tallnøkkel er gratis; symbolnøkkel krever kun ett engangs sett med ~29 egne inline-SVG-glyfer (a–å), ingen rettigheter. Input = skrive ett ord/én setning: minimal byrde. Småfeller (siffer i tekst ved tallnøkkel, symbol-lesbarhet i print, delvis nøkkel må være entydig løsbar) er løsbare designvalg.
- **Pedagogisk linse (4/5):** Overlever, med korreksjon: gratis norske kryptogram-ark FINNES (LessonCraftStudio gratis-PDF, Kittys kodeskrift), og Malimo-referansen er en annen sjanger (førstelyd-bilder). Men alt er statisk innhold — ingen gratis generator fra lærerens egne ord. Sjangeren er etablert (Kittys, Undervisningsbyen, matematikk.org) og gir selvkorrigerende ukens ord-øving + tidlig ferdig/stasjoner 1.–7. Mer motivasjonskrydder enn kjernedrill, derfor 4, ikke 5. Perfekt generator-fit, liten innsats.

### 11. Tieramme- og mengdeark

- **Fag/trinn:** matematikk · 1.–2. · **innsats:** liten
- **Hva eleven gjør:** Subitisering og mengdeforståelse for de aller ferskeste: tierammer (2×5) å fylle/lese/finne «hvor mange mangler til 10», terningmønstre og prikkgrupper å telle og skrive tallet til, tegne riktig antall. Fyller hullet under Regneark (før regnestykker gir mening).
- **Panel:** Tallområde (0–10/20), oppgavetyper (fyll ramme, les ramme, mangler til 10, tell og skriv, tegn antall), enkel/dobbel tieramme, antall oppgaver.
- **Ark:** SVG-rammer/prikkmønstre med svarruter; fasit.
- **Slektskap:** Klokkeark (11) i lest (tegnet struktur + oppgave)
- **Norsk gap:** Standard i alle 1.-trinnsverk, men ingen norsk generator.
- **Kilder:** worksheetfun.com · superstarworksheets.com · DragonBox 1 (subitisering) · Udir kartleggingsprøve regning 1. trinn
- **Teknisk linse (5/5):** Ren geometri: tierammer, terningmønstre og prikkgrupper tegnes som SVG-sirkler uten innholdsdatabase, bildebibliotek, lyd eller server. Terningmønstre er allmenn struktur (som urskiver/tallinjer). Fasit er triviell aritmetikk (n, 10−n). Input-byrden er sandboxens letteste — fungerer med defaults, null tekstinput. Eneste friksjon er overlappfri prikkplassering (løses med rutenett-jitter). Arkitektonisk tvilling av Klokkeark. Ingen teknisk avvisningsgrunn funnet.
- **Pedagogisk linse (4/5):** Overlever adversariell test: direkte LK20-forankret (etter 2. trinn: «utforske tal, mengder og teljing … representere tala på ulike måtar»), standard i alle norske 1.-trinnsverk og i Matematikksenterets subitiserings-veiledning. Gratis norske alternativer er få og statiske (Spireserien 3 ark, ukemal); Malimo/Undervisningsbyen er betalt — ingen norsk generator. Trekk: smalt trinnvindu (1.–2.) og mye gjøres med konkreter; «tegn antall» svak på papir. Ukentlig stasjons-/ukeplanbruk gir 4, ikke 5.

### 12. Mattesøk (regnestykke-ordsøk)

- **Fag/trinn:** matematikk · 2.–7. · **innsats:** liten
- **Hva eleven gjør:** Regnestykker (f.eks. 4+3=7) gjemmes vannrett/loddrett i et stort tallrutenett fylt med støytall; eleven finner og fargelegger dem. Malimos MATTESTJERNE-ventearbeidsserie i flere nivåer per regneart.
- **Panel:** Regneart(er), tallområde, antall gjemte stykker, rutenettstørrelse.
- **Ark:** Tallrutenett + liste over stykkene som skal finnes; fasit med posisjonene markert.
- **Slektskap:** Ordkryss (1) — samme rutenett-motor kan gjenbrukes med tall
- **Norsk gap:** Betalprodukt hos Malimo; ingen gratisvariant.
- **Kilder:** butikk.malimo.no MATTESTJERNE mattesøk
- **Teknisk linse (5/5):** Overlever avvisningsforsøket. Null ferdiginnhold: alt genereres fra regneart/tallområde/antall — panelinput er lettere enn Ordkryss (ingen ordliste å taste). Fasit triviell: posisjoner kjent ved plassering. Format bekreftet hos Malimo: stykker vannrett/loddrett, liste ved siden — rutenett-motoren fra verktøy 1 gjenbrukes (celler = siffer/symbol). Eneste reelle felle: støytall kan tilfeldig danne gyldige stykker; krever regex-skann + omfylling, kurant klientside. Ingen rettighets-/serverbehov.
- **Pedagogisk linse (3/5):** Reell sjanger: Malimos MATTESTJERNE-serie selger mattesøk i flere nivåer per regneart, og motor-gjenbruk fra Ordkryss gir liten innsats. Men den er eksplisitt ventearbeid/stasjonsfyll, ikke ukentlig kjernetrening; med full stykkeliste kan eleven mønstermatche sifre uten å regne (bør avbøtes med kun-svar-liste eller antall uten liste); og siden mattesøk er språknøytralt dekker gratis engelske generatorer (edu-games.org Math Search) mye av gapet — norsk-gapet er kun UI og A4/fasit-polish.

### 13. Tallpyramider & magiske kvadrater

- **Fag/trinn:** matematikk · 2.–7. · **innsats:** liten
- **Hva eleven gjør:** Grubleark: pyramider der nabotall summeres oppover, addisjonskvadrater med rad-/kolonnesummer og magiske kvadrater med lik sum alle veier — noen felt fylt, eleven finner resten. Gir sandboxen en problemløsingssjanger dagens rene ferdighetsark mangler.
- **Panel:** Figurtype, tallområde, vanskegrad (antall/plassering av hull), antall figurer per ark.
- **Ark:** Utfyllingsfigurer med garantert entydig løsning; fasit.
- **Slektskap:** ingen
- **Norsk gap:** Vanlig i oppgavebøker, men ingen norsk generator med vanskegradsstyring.
- **Kilder:** puzzlemaker.discoveryeducation.com · DragonBox (magiske tallsirkler) · norsk grubliss-tradisjon
- **Teknisk linse (5/5):** Overlever adversariell test. Ren tallstruktur: generatoren lager komplett løsning først (tilfeldig bunnrad → pyramide; parametrisert 3×3 magisk kvadrat), fjerner felt og verifiserer entydighet med propagering/brute force — trivielt raskt klientside. Fasit følger gratis av konstruksjonen. Ingen innholdsdatabase, bilder, lyd eller rettigheter; kun SVG-ruter à la tallinje-/gangetabellverktøyene. Panelinput = fire valg, null skriving. Eneste reelle jobb: holde lav vanskegrad propagerings-løsbar.
- **Pedagogisk linse (4/5):** Avvisning mislyktes for kjernen: regnepyramider står i Multi og norske årsplaner, brukes jevnlig til stasjoner/lekser/differensiering på 1.–4. trinn, og dekker LK20-kjerneelementet utforsking/problemløsing som sandboxens fire rene ferdighetsark mangler. Gratisalternativer er statiske PDF-er eller betalte (Arbeidsark.no, Teaching Funtastic); ingen norsk generator med tallområde-/hullstyring funnet. Magiske kvadrater er derimot sporadisk berikelse, nesten entydig i 3×3 — trekker ned til 4.

### 14. Ord med hull (manglende bokstaver)

- **Fag/trinn:** norsk · 1.–5. · **innsats:** liten
- **Hva eleven gjør:** Øveord med utelatte bokstaver (B_ØD / _RØ_) eller målrettet grafemtrening der valgt lyd fjernes (kj/skj/sj, dobbel konsonant, ng/nk: «__ole», «ba__e»). Luketekst-prinsippet på ord-/grafemnivå — klassisk rettskrivingsdrill.
- **Panel:** Ordliste, hullmodus (tilfeldig N bokstaver / lærermarkert grafem / automatisk mønster som dobbel konsonant), antall hull, ev. ordbank som støtte.
- **Ark:** Ord med hull og skrivelinjer; fasit med hele ordene.
- **Slektskap:** Luketekst (5) — samme motor på bokstavnivå; Silhuetter (2) tematisk
- **Norsk gap:** Rettskrivingsark på typiske norske feil finnes bare statisk.
- **Kilder:** kittysoppgaver.com rettskriving · superteacherworksheets.com missing letters
- **Teknisk linse (5/5):** Overlever avvisningsforsøkene: alt innhold er lærerens egen ordliste, hulling er ren strengmanipulasjon (tilfeldig N, markert grafem, regex for dobbel konsonant/ng/nk/kj-skj-sj), fasit = originalordene. Ingen bilder, lyd, database eller server. Inputbyrde lik Ordkryss/Ordbingo. Edge-caser løses klientside: lengstematch skj>sj/kj, flere grafemforekomster, tak på antall hull, ordbank mot flertydighet (B_L). Eneste svakhet er produktmessig motoroverlapp med Luketekst.
- **Pedagogisk linse (4/5):** Overlever. Sjangeren er standard norsk rettskrivingsdidaktikk (kj/skj/sj, dobbel konsonant, ng/nk hos Kittys, Undervisningsbyen, Salaby) og treffer LK20s rettskrivingsmål etter 4./7. trinn; ukas øveord gir reell ukentlig bruk 1.–5. Alle norske alternativer funnet er statiske PDF-er med faste ordsett — ingen gratis generator for lærerens egne ord. Trekk: tilfeldig-hull-modus (B_ØD) er svak, mer gjettepuslespill enn rettskriving; verdien ligger i grafemmodus. 4/5.

### 15. Loop-kort («Jeg har … hvem har …?»)

- **Fag/trinn:** matematikk/engelsk/norsk · 2.–7. · **innsats:** liten
- **Hva eleven gjør:** Kortstokk for hel klasse der svaret på ett kort er starten på neste («Jeg har 12 — hvem har 3·5?»); kjeden er garantert lukket. Brukes for gangetabell, klokka, gloser, begreper. Enorm sjanger internasjonalt, godt kjent i norske idébanker.
- **Panel:** Parliste (oppgave→svar) eller autogenererte regnestykker fra tallinnstillinger; antall kort; kortstørrelse.
- **Ark:** Klippekort med «Jeg har/Hvem har»-tekst + lærerens kontrollark med kjeden i rekkefølge.
- **Slektskap:** ingen
- **Norsk gap:** Ingen norsk generator; håndlages i dag i PowerPoint.
- **Kilder:** superteacherworksheets.com/i-have-who-has · ressurseriklasserommet.no · TpT-storselger
- **Teknisk linse (5/5):** Ren algoritmikk: parliste med unike svar gir garantert lukket kjede ved konstruksjon; fasit (kontrollark) er biprodukt. Ingen innholdsdatabase, bilder, lyd eller server — klokkevariant gjenbruker Klokkeark-SVG. Input-byrde som Ordbingo (typede par); mattevariant autogenereres fra tallinnstillinger. Eneste felle: duplikate svar (f.eks. 3·4=2·6=12) må dedupliseres — samme løsning som Regnearks kommutative dedup. Eksisterende utenlandske generatorer (SEN Teacher, Hive) beviser klientside-fit.
- **Pedagogisk linse (4/5):** Overlever avvisningsforsøket: sjangeren er etablert i Norge under navnet «loop» (Malimo selger egen LOOP-spill-kategori, kittysoppgaver/eleviki/FN.no/Matematikksenteret bruker formatet). Ingen norsk generator finnes — kun ferdigkjøpte/håndlagde sett, og generatoren løser det håndarbeid feiler på: lukket kjede uten duplikatsvar. Trekk til 4, ikke 5: aktivitetskortstokk gjenbrukes, så genereringsbehovet er per tema, ikke ukentlig, og gratis-PDF-er dekker delvis gangetabell/klokka.

### 16. Repetert lesing / listelesing med registrering

- **Fag/trinn:** norsk (spes.ped) · 1.–7. · **innsats:** liten
- **Hva eleven gjør:** Lærerens ordliste/tekst settes i lesekolonner med stor skrift (ev. samme ord gjentatt stokket for automatisering, Tempolex-stil) + registreringsskjema for dato, tid og feil per gjennomlesing, med tomt fremgangsdiagram. Kjernetiltak for leseflyt ved dysleksi og i intensive lesekurs.
- **Panel:** Ordliste/tekst, modus (repetert tekst / stokket listelesing), antall gjennomlesinger, skriftstørrelse, makkerkolonner (parlesing).
- **Ark:** Leseark i stor typografi + registreringstabell + diagram med akser; ingen fasit nødvendig.
- **Slektskap:** ingen — første ikke-oppgave-støtteark i sandboxen
- **Norsk gap:** Tempolex er betal-abonnement og digitalt; papirvarianten håndlages av spes.ped-lærere i dag.
- **Kilder:** Lesesenteret/På sporet · tempolex.no · lesetiltak.blogspot.com · Refsahl/Frost-tradisjonen
- **Teknisk linse (5/5):** Overlever adversariell test: arket er ren typografi/layout av lærerens egen liste/tekst — gjentakelse og stokking er trivielle algoritmer, registreringstabellen og det tomme diagrammet (akser + rutenett i SVG) er statisk struktur uten innholdsbehov. Ingen illustrasjoner, lyd, database eller server; fasit trengs ikke per design. Inputbyrden (ordliste + få valg) er identisk med Ordkryss/Ordbingo. Eneste forbehold: ikke bruk varemerket «Tempolex» i UI; listekvalitet hviler på læreren.
- **Pedagogisk linse (4/5):** Overlever avvisning: oppll. § 11-3 pålegger alle skoler intensiv leseopplæring 1.–4. trinn, og repetert lesing m/ registreringsskjema + frekvensdiagram er dokumentert kjernemetode — Lesesenteret/Statped/Dysleksi Norge beskriver eksakt dette arket. Alternativene (Tempolex, Relemo, Aski Raski) er betalte og digitale; papirskjemaet håndlages i dag. Repetert leselekse m/ kvittering brukes også bredt på 1.–2. trinn. Trekk til 4: full versjon er spes.ped-sentrert, ikke ukentlig helklasse.

### 17. Retteark (fiks setningene)

- **Fag/trinn:** norsk · 2.–5. · **innsats:** middels
- **Hva eleven gjør:** Læreren limer inn korrekte setninger; generatoren injiserer et kontrollert antall feil av valgte typer (liten forbokstav, manglende punktum/spørsmålstegn, valgfri feilstaving via bokstavbytte) — eller stripper all tegnsetting (tegnsettingsmodus) eller alle mellomrom (setningskjede-modus). Eleven finner og retter, eller skriver setningen riktig.
- **Panel:** Setninger (korrekte), feiltyper med avkryssing, antall feil per setning, modus (rett feilene / sett inn tegn / setningskjede).
- **Ark:** Setninger med feil + skrivelinjer; fasit med hver feil markert og originalsetningen.
- **Slektskap:** Luketekst (5) og Setningsstokking (6) — samme input-lest, ny transformasjon
- **Norsk gap:** Daily edit-sjangeren finnes ikke som norsk generator i det hele tatt.
- **Kilder:** 123homeschool4me (fix-it sentences) · skole.salaby.no arbeidsark tegnsetting · Salto-arbeidsbøkene · USN helhetslesing (setningskjeder)
- **Teknisk linse (5/5):** Ren teksttransformasjon av lærerens egne setninger — ingen innholdsdatabase, bilder, lyd eller server. Fasit er deterministisk siden generatoren selv injiserer feilene og kjenner originalen. Input-byrden (lim inn setninger + avkryssing) er identisk med eksisterende Setningsstokking. Eneste svakhet: bokstavbytte-feilstaving kan tilfeldig gi et gyldig ord uten ordliste å sjekke mot — men modusen er valgfri og kan avbøtes heuristisk. Tåler adversariell testing; klart holdbar.
- **Pedagogisk linse (4/5):** Overlever avvisning. Direkte LK20-treff (etter 2. trinn: setninger med stor forbokstav og punktum; etter 4.: tegnsetting, utforske rettskriving, revidere tekst). «Finn feilene» og setningskjeder er dokumentert norsk praksis (undervisningsmetoder.com, helhetslesing/Statped) — ingen norsk generator finnes, kun statiske ark. Trekk: forskningsskepsis mot å vise feilstavede former gjør feilstavingsmodusen svakest, og reell kjernebruk er 2.–4. trinn, smalere enn oppgitt.

### 18. Skriveramme-generator

- **Fag/trinn:** norsk/engelsk/tverrfaglig · 1.–7. · **innsats:** middels
- **Hva eleven gjør:** Strukturerte skriveark: bokser for innledning/hoveddel/avslutning med lærerens setningsstartere, ordbank i margen, valgbar linjetype og -antall, tegnerute/tegneserieruter, akrostikon-modus (ordet vertikalt, én linje per bokstav) og VØL/tankekart-varianter. Skrivesenterets kjernemetodikk — sandboxen har i dag ingen ren skrivesjanger.
- **Panel:** Maltype (fri/sjangerramme/akrostikon/tegneserie/VØL/tankekart), overskrift, setningsstartere, ordbank, antall linjer/ruter, linjetype.
- **Ark:** Skriveark med bokser, startere og linjer; ingen fasit (elevprodusert innhold).
- **Slektskap:** ingen
- **Norsk gap:** Skrivesenteret har statiske PDF-maler; ingen konfigurerbar generator.
- **Kilder:** skrivesenteret.no/ressurs/skriverammer · Salto/Kaleido-arbeidsbøkene · malimo.no Tekstarbeid · twinkl (akrostikon)
- **Teknisk linse (4/5):** Overlever avvisningsforsøket: alt er ren layout fra lærerens egen tekst — bokser, linjer, startere, ordbank og skriveruter er SVG/CSS klientside. Ingen innholdsdatabase, illustrasjoner, lyd eller rettigheter; tegneruter er tomme rammer. Manglende fasit er sjangeriboende (jf. Sporing), ikke lestebrudd. Input-byrden er lav når alle felt utover maltype/overskrift er valgfrie. Trekk: seks maltyper er scope-creep — tegneserie/tankekart er nesten egne verktøy; kutt til fri/sjanger/akrostikon/VØL i v1.
- **Pedagogisk linse (5/5):** Overlever adversariell test. Skriverammer er kjernemetodikk hos Skrivesenteret og Språkløyper (egne barnetrinnsmoduler), forankret i LK20 og stillas-forskning — ukentlig reelt behov. Gratis alternativer er kun statiske PDF-er (Skrivesenteret bekreftet) eller betalte (Malimo, Lingit); ingen konfigurerbar generator finnes. Svakhet: lav algoritmisk kjerne (Word-DIY mulig), men linjetyper, ordbank og akrostikon er fiklete manuelt. Fyller sandboxens skrivesjanger-hull.

### 19. Par-kortgenerator (memory/domino)

- **Fag/trinn:** norsk/engelsk/matematikk · 1.–7. · **innsats:** middels
- **Hva eleven gjør:** Lærerens parliste (ord↔bilde via Ctrl+V, ord↔oversettelse, regnestykke↔svar, begrep↔forklaring) blir klippbare spillkort: memory-rutenett med valgfritt baksidemønster, eller dominobrikker lenket i lukket kjede. Grunnmuren i Malimos og idébankenes stasjonsmateriell.
- **Panel:** Parliste (tekst/tekst eller tekst/Ctrl+V-bilde) eller autogenererte regnestykke↔svar-par; format (memory/domino), kortstørrelse.
- **Ark:** Kortark med kuttelinjer (memory: par stokket; domino: brikker i tilfeldig rekkefølge); fasit = parlisten/kjeden.
- **Slektskap:** Ord-til-bilde-kobling (7) — samme datainput, klippbart spillartefakt er nytt
- **Norsk gap:** Selges per tema hos Malimo; generator fra egen liste finnes ikke på norsk.
- **Kilder:** malimo.no (puslekort, «Ett tema — flere spill») · undervisningsmetoder.com domino · toolsforeducators.com · kittysoppgaver.com
- **Teknisk linse (5/5):** Overlever avvisningsforsøket: alt innhold kommer fra lærerens egen parliste — ingen innholdsdatabase, illustrasjonsbibliotek, lyd eller server. Ctrl+V-bilder er alt bevist i OrdTilBildeVerktoy, autogenererte regnestykkepar i Regneark. Fasit trivielt genererbar (parlisten/kjederekkefølgen). Input-byrde lik Ordbingo. To krav til implementasjon: baksidemønster som eget speilvendt ark (duplex-registrering upålitelig), og dedup-varsling for like svar i dominokjeden (flertydig kjede).
- **Pedagogisk linse (4/5):** Overlever. Memory er dokumentert kjernestasjon i begynneropplæringen og regnestykke-domino etablert mattestasjonssjanger (matematikk.org, undervisningsmetoder.com). Malimo/Undervisningsbyen selger dette per tema — bevist betalingsvilje for det en generator lager fra ukas ord. LK20s lekkrav i 1.–2. styrker fit. Trekk: Puzzel.org har gratis norsk memory med print, og laminerte sett gjenbrukes — men ingen gratisløsning gir dominokjede, fasit og Ctrl+V-bilder uten konto.

### 20. Symmetri- og speilingsark i rutenett

- **Fag/trinn:** matematikk/K&H · 2.–7. · **innsats:** middels
- **Hva eleven gjør:** Halv figur tegnet i rutenett med symmetriakse (vertikal/horisontal); eleven tegner speilbildet. Variant: kopier figur fra ett rutenett til et tomt/forstørret (ruteteknikk, som også bærer K&H og målestokk). Speiling er LK20-kjernestoff uten dekning i sandboxen.
- **Panel:** Rutenettstørrelse, vanskegrad (antall ruter, med/uten diagonaler), akseretning, modus (speil/kopier/forstørr), ev. Ctrl+V-bilde for ruteteknikk-modus.
- **Ark:** Rutenett med halv figur + tom side; fasit med hele figuren.
- **Slektskap:** ingen
- **Norsk gap:** Bare statiske kopioriginaler; ingen generator med vanskegradsstyring.
- **Kilder:** Multi geometrikapitler (kopioriginaler) · Matematikksenteret «Matematikk i kunst og håndverk» · TpT/worksheetfun
- **Teknisk linse (5/5):** Består adversariell test. Krever ingen innholdsdatabase: halvfigurer genereres algoritmisk (tilfeldig polyomino/strektrekk forankret i symmetriaksen), og fasit er en deterministisk speiltransform — trivielt klientside. Rutenett-som-SVG er alt bevist i kryssordverktøyet. Panelinput er lettere enn oppgitt: læreren kan bare trykke «generer». Eneste forbehold: Ctrl+V-ruteteknikk-modus mangler generérbar fasit og bør være valgfritt tillegg; RNG-figurer blir abstrakte, ikke sommerfugler.
- **Pedagogisk linse (3/5):** Holdbar, men smalere enn hevdet. LK20-ankeret er reelt, men eksplisitt mål kommer først etter 6. trinn («utforske og beskrive symmetri i mønster og utføre kongruensavbildingar»); 3./4. trinn nevner ikke speiling — «2.–7.» er overdrevet. Sjangeren er autentisk (Mattelist, Matematikksenteret, lærebøker), men emneperiodisk, ikke ukentlig. Arket er språknøytralt: gratis engelske statiske ark dekker basisbehovet. Reell merverdi: vanskegradsstyring, fasit og ruteteknikk fra Ctrl+V-bilde.

## Forkastet underveis (utenfor lesten)

Disse sjangrene går igjen i kildene, men krever ting lesten ikke har — dokumentert her så
vi ikke re-vurderer dem hver gang:

- **Lesetekster med spørsmål / lesekurs / leseteater** (undervisningsmetoder, Lesevinduet,
  LESEGLØD): krever forfattet innhold. Størst i Norge, men utenfor generator-lesten.
- **Illustrasjonsbårne ark** — myldrebilder, color-by-code med motiv, dot-to-dot, rebus
  (festisite), «tell sceneelementene»: krever bildebibliotek/motiver. Ctrl+V-innliming
  dekker bare del-behov (kort/memory).
- **Symbolstøttet materiell (Widgit/InPrint-sjangeren)** og flere spes.ped-støtteark
  (dagsplan m/ symboler, følelsesskala): genererbare i struktur, men gir mest verdi med
  symbolbibliotek vi ikke har rettigheter til.
- **KI-genererte tekstoppgaver** (Twinkl AI m.fl.): krever server/KI — bryter klientside-lesten.
- **Lyttebaserte ark** (lyd) og **adaptive digitale drillspill** (Kikora, Multi Smart Øving,
  matematikk.orgs Regnemesteren): feil medium.

## Kildekart med observasjoner

### malimo.no (butikk.malimo.no + idebank.malimo.no) — norsk markedsplass for lærerlagd undervisningsmateriell, kartlagt via søk og produktingresser 16.07.2026

*25 funn.* Butikkdomenet blokkerer direkte henting (Cloudflare 525), så kartleggingen er gjort via søkesnutter og malimo.no/idebank-sider. Det som DOMINERER er ikke klassiske arbeidsark, men KORT-formater (oppgavekort, tekstoppgavekort, klypekort, begrepskort, kortstokker) laget for stasjonsundervisning, parøving og TPO — nesten alt selges med bokmål+nynorsk-varianter og fasit. Tydelige serier: «Vi øver» (temahefter), «Vi sorterer» (sorteringskort), «Ventearbeid/Jeg er ferdig» (mengdetrening for raske elever — en hel sjangerfamilie: mattesøk, sant/usant, bondesjakk, tegneserier, les-og-tegn), «MATTESTJERNE», «TANNLØS» (spillkort+brett), «Knekke kodeord», BOKSTAVSERIEN og skrivestartere. Påfallende mange produkter er illustrasjonsbårne (myldrebilder, ord-/bildekort, tellebestilling med sceneelementer) — dårlig generator-fit uten bildebibliotek, men Ctrl+V-innliming av lærerens egne bilder kan dekke noe. Innholdstunge familier (Lesevinduet-lesekurs, LESEGLØD-faghefter, leseteater-manus) er uaktuelle for panel→ark-lesten. Småfunn som ikke fikk plass: matematikkdiplomer/utmerkelser (navn+prestasjon → pyntet A4, fit 5 men lav didaktisk verdi) og «Positiv-its»-lapper. Rent overlapp som ikke er egne funn: «Ordsøk høyfrekvente ord» = Ordkryss (1), bingo-variantene i «Ett tema — flere spill» = Ordbingo (3). Største hull hos oss målt mot Malimos katalog: mengdetrenings-/ventearbeidsformatene (mattesøk, sant/usant, tallfamilier), sorteringsark, kortgeneratorer (oppgavekort/klypekort/memory) og spillbrett-formater.

### undervisningsmetoder.com + kittysoppgaver.com (tidl. kittysoppgaver.no) + spireserien.no + gruble.net

*25 funn.* Undervisningsmetoder.com dominerer sjangeren totalt: hver temapakke består av samme faste knippe — faktatekst med spørsmål, hentediktat, kryssord, les-klipp-lim, natursti, domino, glosebok. Kittysoppgaver er drill-/prøvebanken (matteinnføringer i tre farge-nivåer, gangeprøver med diplom, diktater, ordskjema, kodeskrift). Spireserien er ren spillark-bank (terningspill, brettspill-løyper, tiervenner-spill). Gruble.net er nesten helt interaktiv/digital og ga lite printbart. Det mest påfallende: en hel FAMILIE av «klipp/laminer/heng opp»-formater (hentediktat-kort, natursti-poster, domino, memory, klypekort) som sandboxen mangler fullstendig — alle er bare en annen A4-layout av lærerens egen ordliste/oppgaveliste og passer panel→ark-lesten perfekt, ofte med svarark + fasit som naturlig andre utskrift. I matte er tiervenner, plassverdi (tiere/enere), butikk/penger og brøk-skravering de store hullene; alle er 100 % algoritmiske. Merk også at nettsidenes «kryssord», «letekryss», «bokstavhus» og «setningsstokking» bekrefter at eksisterende verktøy 1, 2, 4 og 6 treffer reell etterspørsel.

### Norske forlags læreverk og digitale læremidler for barnetrinnet: Gyldendal (Multi, Multi Smart Øving, Salto, Salaby, Skolestudio), Aschehoug (Zeppelin, Matemagisk, Aunivers), Cappelen Damm (Kaleido, Matematikk 1–4, Skolen), Fagbokforlaget (Ordriket), DragonBox Skole

*24 funn.* Selve arbeidsbøkene ligger bak innlogging/Issuu-blaibøker uten tekstuttrekk, så sjangrene er triangulert fra komponentlister, produktomtaler, Salabys URL-struktur (egne «arbeidsark»-noder per tema), DragonBox' åpne innholdslister og lærerveiledningsomtaler. Påfallende mønstre: (1) ALLE verkene har kopieringsoriginaler/utskriftsark som fast lærerressurs-komponent — panel→A4-lesten treffer altså midt i forlagenes eget format. (2) Differensiering på to nivåer («repetisjon og utfordring», Salaby tekstoppgaver nivå 1/2) er gjennomgående — et generisk «to nivåer på samme ark/to ark»-valg i oppsettspanelet ville speile bransjestandarden. (3) I nyere norskverk (Salto, Kaleido, Ordriket) dominerer skriverammer, korttekster m/ oppgaver og kameratvurdering; i matte 1–4 dominerer tallvenner/tiervenner, veksling/penger, mønster og regnefortellinger. (4) Multi har flyttet mengdetreningen til øvebok/Smart Øving — nettopp den sjangeren generatorverktøy erstatter best. Blokkerte kilder: docplayer.me, uis.brage.unit.no og digitalt.fagbokforlaget.no var utilgjengelige (DNS), gyldendal.no/artikler/oppgavetyper-i-nye-multi ga 404, dragonbox.no/skole ga 403 — men staging-siden til DragonBox 1 lå åpen og var svært innholdsrik.

### Offentlige/gratis norske ressurser: matematikk.org, Udir (kartleggingsprøver + støttemateriell), Statped, Lesesenteret/Språkløyper (UiS), Skrivesenteret (NTNU), Matematikksenteret/Mattelist, Kikora (markedssider), NRK Skole/Super

*25 funn.* Rikeste åre: kartleggingsprøve-tradisjonen (Udir 1.-3. trinn + Statpeds Arbeidsprøven) — den består nesten utelukkende av panel-til-ark-vennlige formater (ordkjeder, nonord, bokstavdiktat, tall/mengde, tallnaboer, tallrekker, sammenligning, penger, tom tallinje), og lærere kjenner formatene fra før. matematikk.orgs «generatorer» (Regnemesteren, Gangetesteren, Regneregn) er digitale drillspill for ganging/deling — de overlapper Regneark (10) og Gangetabell (13) og gir ingen nye print-sjangre; print-bidraget deres er heller sudoku/kakuro i spillsamlingen. Mattelist og NRK Skole/Super er rene ferdiginnhold-kilder (LIST-oppgaver, videoklipp + undervisningsopplegg med refleksjonsspørsmål) og faller utenfor lesten; Kikora er adaptiv digital drill + blokkprogrammering, heller ikke print-relevant. Skrivesenteret er det største udekkede feltet: skriverammer/setningsstartere/ordbank er en hel verktøyfamilie i seg selv, og sandboxen har i dag ingen ren skrive-sjanger. Matematikksenterets kopioriginal-tradisjon (hundrekart, prikkark, ruteark, geobrett) er ren struktur à la klokkeark. Statped/Lesesenteret-sidene blokkerte WebFetch (403) — funnene derfra er belagt via veiledninger (Arbeidsprøven-PDF-er), kommunale håndbøker og søkeutdrag. Observasjon i forbifarten: ukemal.no/matteoppgaver er en norsk konkurrent med samme A4-generator-modell (telleøvelser, regnestykker, tallrekker) — bekrefter at sjangervalgene over er etterspurt, og at tallforståelses-arket (tallvenner+naboer+sammenligning+rekker samlet) trolig er den største enkeltmuligheten på mattesiden.

### Internasjonale arbeidsark-generatorer: WorksheetWorks.com, Discovery Puzzlemaker, The Teacher's Corner, SuperTeacherWorksheets (full-generators-index), Education.com worksheet generator, toolsforeducators.com, Wordwall (printables), Twinkl (Create/AI-tools), Math-Drills, worksheetfun, ESL-galaxy, festisite

*25 funn.* Sjangerbildet er påfallende samstemt på tvers av kildene: (1) Ordpusling dominerer — word search, crossword, scramble og cryptogram finnes hos nesten alle, noe som validerer våre eksisterende valg (Ordkryss, Kryssord, Ordbingo, Luketekst, Alfabetisering, Sporing, Klokkeark, Tallinjer og Gangetabell har alle direkte motsvar hos flere kilder). (2) Det største hullet vårt mot feltet er MATTE-PUSLESPILL (regnelabyrint, tallkryssord, addisjons-/magiske kvadrater — WorksheetWorks alene har åtte slike) og TALLFORSTÅELSE-STRUKTURER (tierammer, tallfamilier/tiervenner, hundrerark, plassverdi, sammenligning, brøkskyggelegging) — alt 100 % algoritmisk. (3) Nest størst: KLIPP-OG-SPILL-formater (flashkort, domino, brettspill, foldeterning) hos toolsforeducators/ESL-galaxy — panel→print passer, bare med saks som ekstra ledd. (4) Prøvegeneratorer (flervalg/kortsvar/fyll-inn hos SuperTeacher) er ren layout over lærerens tekst og dekker mellomtrinnet vi ellers treffer dårlig. Forkastet pga. innholdskrav: rebus (festisite, trenger symbolbibliotek), dot-to-dot/fargelegg-etter-tall (trenger motiver), lesetekst-/reading-comprehension-generatorer (Twinkl løser med KI = server), lyttetester (lyd). Wordwalls printable-modus bekrefter group sort/match up/quiz som de bærende ikke-pusle-sjangrene. Twinkl har flyttet hele generator-satsingen til KI-verktøy — men flere av dem (akrostikon, sentence scrambler, cloze) er i praksis rene layout-problemer som klarer seg uten KI. Kilder: worksheetworks.com, puzzlemaker.discoveryeducation.com, worksheets.theteacherscorner.net, superteacherworksheets.com/full-generators-index.html, education.com/worksheet-generator, toolsforeducators.com, wordwall.net/en/features, twinkl.com/ai-tools, math-drills.com, worksheetfun.com, esl-galaxy.com, festisite.com

### Teachers Pay Teachers + Pinterest-økosystemet (K–5 printables): TpT-kategorisider, selgerblogger (Beth Ann Averill, The Printable Princess, The Mountain Teacher), Super Teacher Worksheets, K5 Learning, Superstar Worksheets, PreKinders, 123Homeschool4Me, Pinterest-tavler

*25 funn.* Printables utgjør ca. 70 % av TpT-materialet og 52 % av brukerne er K–5-lærere — markedet belønner «no-prep, print-and-go». Det som dominerer salgslistene er ikke enkeltemner, men FORMAT-lester som gjenbrukes på tvers av fag: task cards, color by code, centers-spill (terning/spinner), klipp-og-lim, «I have who has», editable templates der læreren skriver inn eget innhold. Det siste er påfallende: TpTs storselgere er i praksis manuelle generatorer (PowerPoint-maler læreren fyller ut) — nøyaktig det sandboxen automatiserer. Størst hvit flekk mot de 13 eksisterende verktøyene: tallforståelses-sjangrene (tierammer, tallvenner, regnefamilier, dagens tall, hundrerark), spill-lestene (terning-/spinnerark, kjedespill, oppgavekort) og feilretting (fix-it-sentences). Dårligst fit: alt illustrasjonstungt (color by code med clipart, dot-to-dot-figurer, sesongtema) og alt digitalt (Boom cards). Escape rooms selger svært godt men er sammensatte produkter, ikke ett ark.

### Spesialpedagogikk og tilpasset opplæring i Norge: Statped (ASK, helhetslesing, matematikkvansker), Widgit/InPrint-sjangre, Nordvoll/autismefeltet (sosiale historier, visuell struktur), atferdsstøtte (tegnøkonomi, DUÅ, UNN), selvregulering (KAT-kassen, habiliteringsverktøy), lesetrening for dysleksi (Refsahl/Frost, Språkløyper, Tempolex, Aski Raski, GraphoGame), logopedi

*25 funn.* To familier dominerer og passer lesten uvanlig godt: (1) strukturerings-/reguleringsark fra autisme-/ADHD-feltet (dagsplaner, først–så, belønningsskjema, skalaer, rutinekort) — nesten ren struktur som genereres fra få innstillinger, og Ctrl+V-bildeliming erstatter symbolbibliotek i mange tilfeller; (2) intensiv lesetrening på ord-/stavelsesnivå i Refsahl/Frost-tradisjonen (ordkjeder, stavelsesdeling, listelesing på tid, repetert lesing med registrering) — der læreren ALLTID jobber ut fra egne ordlister, altså perfekt input-modell. Ordkjeder er trolig største enkeltfunn: klassisk dyslexi-sjanger, triviell å generere kommutativt fra ordliste, med opplagt fasit, og finnes ikke i sandboxen. Rene symbolsjangre (symbolstøttet tekst à la Widgit, ferdige piktogrambiblioteker) og innholdstunge sjangre (munnmotorikk-øvelser, sosiale historie-TEKSTEN selv) faller utenfor uten innholdsdatabase — men skjelettene/oppsettene deres er generbare. Aski Raski/GraphoGame er digitale og adaptive; papir-analogene deres (finn ordet, bokstav-lyd) overlapper stort sett eksisterende verktøy. Merk også at flere sjangre her treffer et lærerbehov sandboxen ikke dekker i dag: ark som IKKE er oppgaver, men støttestruktur rundt eleven.

### Engelskfaget i norsk barneskole (Explore/Quest/Link m.fl.) + naturfag/samfunnsfag/musikk/K&H — forlagenes komponentsider, idébanker (Malimo, Kittys oppgaver, Ressurser i klasserommet, Undervisningsmetoder, Undervisningsbyen, Musicificium) og generelle søk etter kopioriginaler/arbeidsark

*24 funn.* Forlagenes workbooks (Quest/Link/Explore) er innholdsbundne og lot seg ikke lese direkte (Issuu-flipbooks er bildebaserte), men sjangrene rundt dem er godt dokumentert i lærernes idébanker. Det som dominerer engelskfaget er glose-økosystemet: ukas ord, gloseprøver, hentediktat, ordkort, loop-kort, ordstokking — nesten alt genererbart fra lærerens egen ordliste med norsk↔engelsk-par, og påfallende lite av det er dekket av dagens 13 verktøy. I naturfag/samfunnsfag dominerer strukturmaler (VØL, tankekart, begrepskart/Frayer, tidslinje, sorteringsark) som er ren struktur + lærerens tekst — perfekt panel→ark-fit. Tre rene algoritme-sjangre uten innholdsbehov peker seg ut: rytmekort (musikk), labyrint og symbolsudoku. K&H-sjangrene rutenett-tegning og symmetri-fullføring utnytter Ctrl+V-bildeinnliming som lesten allerede støtter. Kommersielt belegg: lessoncraftstudio.com driver en hel norskspråklig generator-butikk på nettopp denne lesten (kryptogram, bildesudoku, labyrint, matching) — bekrefter etterspørselen, men de fleste av deres varianter lener seg på illustrasjonsbibliotek, som vår klientside-lest bevisst unngår. Sjangre som IKKE passer lesten og derfor er utelatt: leseforståelsestekster, differensierte leseserier, myldrebilder, rebus — alle krever ferdiginnhold/illustrasjoner.

## Vedlegg: hele funnkatalogen (198 funn)

Fit = generator-egnethet 1–5 slik sveip-agenten vurderte den. «Likner» peker på
eksisterende verktøy der sjangeren alt er dekket.

### malimo.no (butikk.malimo.no + idebank.malimo.no) — norsk markedsplass for lærerlagd undervisningsmateriell, k…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Mattesøk (regnestykke-ordsøk) | matematikk | 5 | Ordkryss (1) i mekanikk, me… | Eleven finner regnestykker gjemt i et stort tallrutenett (vannrett/loddrett) og fargelegger dem; stykkene som skal finnes står listet ved siden av. S… |
| Ordkjeder | norsk | 5 |  | To-tre ord er skrevet sammen uten mellomrom («solbilhus»); eleven setter streker der ordene skilles. Går igjen i Malimos sommer-/julebøker, spinnerhe… |
| Ukens ord / ordarbeidshefte | norsk/engelsk | 5 | delvis Alfabetisering (9) o… | Én ordliste (øveord/gloser) kjøres gjennom mange småformater på samme ark/hefte: skriv ordet, del i stavelser, sett i setning, finn ordet blant feils… |
| Sorteringsark (klipp og lim i kategorier) | norsk/matematikk | 5 |  | Eleven klipper ut ord/elementer og limer/skriver dem i riktig kolonne: kj-/sj-lyd, substantiv/verb, store/små bokstaver, partall/oddetall, antonympar… |
| Tallfamilier / regnetriangler | matematikk | 5 | Regneark (10) i tema, men a… | Tre tall som hører sammen (3, 4, 7) presenteres i trekant/hus, og eleven skriver alle fire regnestykkene i familien; finnes som oppgavekort for 1.-2.… |
| Tiervenner/tallvenner-ark | matematikk | 5 | Regneark (10) delvis — men … | Oppgaver der eleven finner parene som blir 10 (eller 20/100): fyll inn manglende venn, koble par, fargelegg venner. Egen oppgavekortpakke hos Malimo … |
| Sant eller usant-regneark | matematikk (og norsk) | 5 |  | Liste med påstander/regnestykker (4+3=8) der eleven krysser sant/usant eller klyper med klesklype; MATTESTJERNE-serien har dette i 3 nivåer for alle … |
| Fargelegg etter svar / regnestykke-fargelegging | matematikk | 4 |  | Eleven løser regnestykker og fargelegger felt etter en svar→farge-nøkkel; Malimos påskepakke lar til og med elevene «lage egne fargeleggingsoppgaver … |
| Hemmelig kode / knekke kodeord | norsk | 4 |  | Eleven dekoder et hemmelig ord: hos Malimo ved å lytte ut første lyd i bilder som til sammen staver ordet (serie i 5 pakker med fasit på baksiden); k… |
| Oppgavekort-format (kort 4-per-ark + svarark) | alle fag | 4 | Regneark (10) i innhold, me… | Malimos desidert største format: nummererte spørsmålskort som skrives ut 4-8 per ark, brukes på stasjoner, som «rundt i rommet»-aktivitet eller pulta… |
| Klypekort | norsk/matematikk | 4 |  | Kort med oppgave og 3-4 svaralternativer langs kanten; eleven setter klesklype på riktig svar (selvrettende ved prikk bak). Malimo har serier for alf… |
| Todelte puslekort / memory-par | norsk/matematikk | 4 | Ord-til-bilde-kobling (7) i… | Kortpar som hører sammen og klippes fra ark: sammensatte ord i to deler (pyramide/sirkelpuslespill), regnestykke↔svar, brøk↔desimal, ord↔bilde, rimpa… |
| Spinner-spillark | norsk/matematikk | 4 |  | Ark med lykkehjul-sektorer (binders + blyant som spinner): eleven spinner og gjør oppgaven sektoren viser — rimord, ordkjeder, regnestykker; Malimos … |
| Spillbrett med oppgavekort (TANNLØS-lesten) | alle fag | 4 |  | Generisk brettspill (stigespill-aktig bane) som kombineres med utskiftbare fagkort — Malimo selger brettet for ALLE emner og kortpakker per tema (div… |
| Bondesjakk med oppgaver | matematikk | 4 |  | Tre-på-rad-brett der hver rute inneholder et regnestykke — du må svare riktig for å få sette kryss; MATTESTJERNE-serien har det i 3 nivåer per regnea… |
| Hentediktat / stafettdiktat | norsk | 4 | Setningsstokking (6) i inpu… | Lærerens setninger henges opp som kort i rommet; eleven løper, leser, husker og skriver setningen på svararket sitt. Nevnes i Malimos idebank som sta… |
| Les og tegn (leseforståelse og tegning) | norsk/engelsk | 4 |  | Eleven leser en kort tekst og tegner det som beskrives i en tegneramme — hos Malimo ofte med deler av tegningen ferdig; stor ventearbeid-serie i fler… |
| Tegning etter instruksjoner | norsk/engelsk | 4 |  | Nummererte instruksjoner («tegn en sol øverst til venstre, en katt under treet») som eleven følger steg for steg i en ramme eller et rutenett; ventea… |
| Pultstriper | norsk/matematikk | 5 | Tallinjer (12) og Silhuette… | Laminerbare striper til pulten med alfabetet (store/små, skriveretningspiler) eller tallinje 0-20/0-100; Malimo selger pakker med 20-22 varianter. |
| Plakater og støttekort | norsk/matematikk | 4 | Gangetabell-utfylling (13) … | A3/A4-plakater som også skrives ut smått som støttekort: gangetabeller med strategier, ordklasser, alfabetplakater; Malimo anbefaler eksplisitt «fler… |
| Skriverammer og tekstskjema (tankekart, sekvensskjema) | norsk/tverrfaglig | 4 |  | Redigerbare skjema/maler for alt tekstarbeid: tankekart i to varianter, sekvens-/handlingsskjema som tabell eller flytskjema, rammer for ulike sjangr… |
| Skrivestartere | norsk/engelsk | 3 |  | Kort/ark med en setningsåpner eller situasjon som eleven skriver videre på; Malimos storselger (190 stk + sesongpakker for halloween/påske-krim, på b… |
| Tekstoppgavekort / regnefortellinger | matematikk | 3 | Regneark (10) delvis | Matematiske tekstoppgaver som kort, sortert per tema (ukjent tall, dobling/halvering, vei-fart-tid, prosent) i felles 1.-4.-samling fordi lesenivå va… |
| Visuell dagsplan / first-then-kort | klasseledelse/TPO | 3 |  | Bildekort for dagsrytme som lamineres og henges på tavla eller settes på ring for enkeltelever; to varianter (én handling / samleplakat) + redigerbar… |
| Bokstavhefte (én bokstav, mange oppgavetyper) | norsk | 3 | Sporing (8) og Silhuetter (… | 26-36-siders hefte per bokstav: kjenne igjen bokstaven blant andre, spore, store/små, lytte ut lyd, med forside til elevens «bokstavbok» (BOKSTAVSERI… |

### undervisningsmetoder.com + kittysoppgaver.com (tidl. kittysoppgaver.no) + spireserien.no + gruble.net

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Hentediktat-kort med svarark | norsk/tverrfaglig | 5 |  | Nummererte ordkort (gjerne med bilde) henges opp i rommet; eleven løper, leser/memorerer ordet, løper tilbake og staver det til partneren som skriver… |
| Kodeskrift / hemmelig alfabet | norsk | 5 |  | Eleven får en symbolnøkkel (bokstav→symbol) og ord/setninger skrevet i kode som skal dekodes — eller skriver egne ord i kode. Fasit er klarteksten. |
| Tiervenner/tallvenner-ark | matematikk | 5 | Regneark (delvis, men egen … | Eleven fyller inn manglende tallvenn som sammen blir 10 (eller 20/100): tallpar i sirkler, «3 + _ = 10», tallvennskjema, «fyll opp tieren». Finnes på… |
| Butikk og penger / vekslepenger-ark | matematikk | 5 |  | Eleven regner med priser og penger: «Jeg har 10 kr» — handler varer, summerer og finner vekslepenger. Mynter/sedler og prislapper på arket. |
| Domino-kort (ord/bilde/regnestykke) | tverrfaglig | 5 |  | Brikker der høyre halvdel av én brikke matcher venstre halvdel av neste (ord↔bilde, regnestykke↔svar, begrep↔forklaring). Klippes ut og legges som kj… |
| Klypekort med svaralternativer | tverrfaglig | 5 |  | Kort med oppgave og 3–4 svaralternativer langs kanten; eleven setter klesklype på riktig svar. Selvrettende hvis fasitprikk trykkes på baksiden. |
| Natursti/postløype-kort | tverrfaglig/uteskole | 5 |  | Nummererte poster med spørsmål/oppgaver som henges opp ute eller i skolebygget; elevene går løypa med et svarark og fyller inn per post. |
| Terningskjema («trill og skriv/gjør») | norsk/tverrfaglig | 5 |  | Rutenett med 6 alternativer per kolonne (person/sted/hendelse, eller oppgavetyper); eleven kaster terning per kolonne og skriver/gjør det terningen b… |
| Skriverammer (med tegnerute og tegneserieramme) | norsk | 5 | Silhuetter (kun linjetype-d… | Ark med overskriftsfelt, tegnerute og skrivelinjer i valgbart antall/nivå; varianter for enkle setninger, bildefortelling og tegneserie (ruter i sekv… |
| Tiere og enere / plassverdi-ark | matematikk | 5 | Regneark (delvis) | Eleven deler tall i tiere og enere, tegner/teller tierstaver og enerklosser, fyller posisjonsskjema (H/T/E) og utvidet form (47 = 40 + 7). |
| Brøk-skravering (brøksirkler/brøkstaver) | matematikk | 5 |  | Eleven skraverer angitt brøkdel av sirkler/rektangler, eller leser av skravert figur og skriver brøken. Også sammenlikning av brøker med figurstøtte. |
| Måling og enhetsomgjøring | matematikk | 5 |  | Eleven gjør om mellom enheter (cm↔m, g↔kg, dl↔l) og løser småoppgaver om lengde, masse og volum. Kitty har egne «hjelpeskjema» for omgjøring. |
| Areal og omkrets på rutenett | matematikk | 5 |  | Figurer tegnet på cm-rutenett; eleven teller ruter for areal og kanter for omkrets, eller tegner egen figur med gitt areal/omkrets (åpen oppgave). |
| Hundrebrett med hull / talljakt | matematikk | 5 | Tallinjer med hull (samme i… | Utsnitt av hundrebrettet (eller helt brett) der celler er tomme; eleven fyller inn tallene som mangler ved å bruke +1/−1/+10/−10-naboskap. |
| Øveord-ark (ukas ord) | norsk | 5 | Sporing (kun stiplet-delen) | Ett skjema per ordliste: les ordet, skriv det tre ganger, skriv det i en setning, evt. del i stavelser. Standard ukelekse-format på småtrinnet. |
| Brettspill-løype med oppgavefelter | matematikk/norsk | 4 |  | Spillebrett med nummerert løype (start→mål); elevene kaster terning, flytter og løser oppgaven på feltet (regnestykke, les ordet, lag setning). Eks. … |
| Memory-/parkort | tverrfaglig | 4 | Ord-til-bilde-kobling (samm… | Kortpar som klippes ut og legges med baksiden opp: ord↔bilde, ord↔synonym, regnestykke↔svar, engelsk↔norsk. Brukes til par-jakt i smågrupper. |
| Regnefortelling-ark (tegn og skriv regnestykket) | matematikk | 4 |  | Eleven velger/får to tall, tegner en regnefortelling i en rute og skriver regnestykket som passer under. Tre nivåer for differensiering. Motsatt vei:… |
| Les-klipp-lim | norsk | 4 | Ord-til-bilde-kobling (nær … | Eleven leser setninger/ord, klipper ut biter (bilder eller ord) nederst på arket og limer dem på riktig plass. Svært populær serie fordi elevene elsk… |
| Rettskriving: sett inn manglende lyd/bokstav | norsk | 4 | Luketekst (samme prinsipp p… | Ord der målgrafemet er fjernet (kj/skj/sj, dobbel konsonant, ng/nk): «__ole», «ba__e». Eleven fyller inn riktig lyd. Kitty har egne rettskrivingsoppg… |
| Gangeprøve med diplom | matematikk | 4 | Gangetabell-utfylling (utvi… | Tidsavgrensede prøver per tabell (2–4-gangen opp til hele tabellen) med tilhørende utskrivbart diplom når eleven består. Drilloppgaver per enkelttabe… |
| Ordskjema (ordanalyse) | norsk | 4 |  | Strukturert skjema der eleven analyserer ord fra egen liste: stavemåte, betydning, ordklasse, setning ordet brukes i, evt. stavelser og alfabetplasse… |
| Lesebingo/leselogg-brett | norsk | 4 | Ordbingo (samme motor, anne… | Rutenett med leseutfordringer («les under bordet», «les for en voksen», «les en faktabok»); eleven krysser av ruter etter hvert og jakter bingo/fullt… |
| Tell og skriv antall (mengdeforståelse 0–20) | matematikk | 4 |  | Eleven teller objekter i en rute og skriver tallet, eller tegner riktig antall til et gitt tall; også koble tall↔mengde og ringe rundt angitt antall. |
| Faktatekst med spørsmål (layout-hjelp) | tverrfaglig | 3 | Luketekst (deler tekst-inpu… | Kort faktatekst med tilhørende spørsmål under — den absolutt vanligste kopioriginalen i temapakkene. Læreren må selv skrive både tekst og spørsmål. |

### Norske forlags læreverk og digitale læremidler for barnetrinnet: Gyldendal (Multi, Multi Smart Øving, Salto, …

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Ordkjeder (ordkjede-ark) | norsk | 5 |  | Tre-fire ord er skrevet sammen uten mellomrom (solhusbilfisk); eleven setter strek der ordene skilles. Brukes både som øving og som normert avkodings… |
| Øveord-/diktatark (ukas ord, se–dekk–skriv–sjekk) | norsk | 5 |  | Ukas øveord i venstre kolonne; eleven leser, dekker til, skriver ordet i neste kolonne og retter selv. Ord- og stavetrening med øveord er kjernekompo… |
| Les og tegn | norsk | 5 | Ord-til-bilde-kobling (7), … | Eleven leser en setning («Katten sover under bordet») og tegner innholdet i en tom rute. Trener setningslesing og leseforståelse på småtrinnet; stand… |
| Skriveramme-ark | norsk | 4 |  | Strukturert skrivemal: overskriftsfelt, startsetninger/setningsstartere, momentbokser og linjerte felt, ev. ordbank i margen. Salto-arbeidsbøkene og … |
| Kameratvurderingsskjema (to stjerner og et ønske) | norsk | 3 |  | Sjekkliste-/responsskjema der medelev krysser av mot kriterier («har overskrift», «stor bokstav og punktum») og skriver ros + ett ønske. Fast kompone… |
| Tegnsettingsark (sett inn punktum, spørsmålstegn, stor bokstav) | norsk | 5 | Luketekst (5) i mekanikk | Setninger/kort tekst uten tegnsetting og/eller med små bokstaver; eleven setter inn punktum, spørsmålstegn, utropstegn og retter til stor bokstav. Sa… |
| Ordsortering i kolonner (ordklasser m.m.) | norsk | 5 |  | Blandet ordliste øverst; eleven sorterer ordene i kolonner (substantiv/verb/adjektiv, én/flere stavelser, å-lyd-skrivemåter …). Grammatikk- og rettsk… |
| Velg riktig ord (og/å, kj/skj, enkel/dobbel konsonant) | norsk | 4 | Luketekst (5) delvis | Setninger med to alternativer i parentes («Han skal (og/å) bade»); eleven ringer rundt riktig form. Klassisk rettskrivingssjanger i alle norskverkene… |
| Ordstudieark (skriv – tegn – bruk i setning) | norsk | 5 |  | Én rute per øveord: eleven skriver ordet, tegner det, deler i stavelser og bruker det i egen setning. Ord- og begrepstrening «har fått stor plass» i … |
| Store↔små bokstaver-kobling | norsk | 5 | Sporing (8) og Silhuetter (… | Eleven kobler stor og liten variant av bokstavene (strek mellom kolonner) eller skriver motstykket i tom rute. Egen arbeidsark-node i Salaby («Store … |
| Språklig bevissthet-ark (rimpar, stavelsestelling) | norsk | 4 |  | Eleven kobler ord som rimer, eller teller/markerer stavelser i ord (klapp og sett strek). Zeppelin START/1-arbeidsbøkene «stimulerer språklig bevisst… |
| Alfabetremse med hull | norsk | 5 | Alfabetisering (9) i domene… | Alfabetet på rekke der utvalgte bokstaver mangler; eleven fyller inn. Også variant «hvilken bokstav kommer før/etter». Salaby har egne ABC-arbeidsark… |
| Korttekst med leseforståelsesspørsmål i tre lag | norsk | 3 |  | Kort tekst + spørsmål sortert i kategorier à la Ordrikets «ord i teksten / husk / tenk» (finn i teksten, husk detaljer, tenk selv). Salto/Kaleido-arb… |
| Høyfrekvente ord-treningsark (100 vanligste ord) | norsk | 4 | Ordbingo (3) delvis — høyfr… | Repetert lesing av høyfrekvente småord: les ordet i isolasjon, finn det igjen i setninger, kryss av for hver gjennomlesing. Egen etablert arksjanger … |
| Sammenhengende skrift (stavskrift/løkkeskrift) | norsk | 4 | Sporing (8) — direkte utvid… | Håndskriftbøker med sammenbindinger: eleven sporer og skriver ord i stavskrift eller løkkeskrift, ikke bare enkeltbokstaver. Zeppelin har egne stavsk… |
| Tallvenner-/tiervennerhus (number bonds) | matte | 5 | Regneark (10) i domene, men… | Del-del-hele-figurer (tallhus, bonds, togvogner) der én del mangler: 10 = 8 + __. Kjernesjanger i matte 1.–3.: eksplisitt i Multi/Multi Smart Øvings … |
| Hundrekart med hull / hundrekart-utsnitt | matte | 5 | Tallinjer med hull (12) i m… | 1–100-rutenett der tall mangler, eller små utklipp av kartet (3×3-vindu) der eleven fyller inn naboene. Trener posisjonssystem og tierstruktur; stand… |
| Regnefortellingsark (tegn – fortell – regn) | matte | 4 | Regneark (10) — kan gjenbru… | Todelt/tredelt ramme: eleven tegner situasjonen, skriver regnefortellingen og skriver regnestykket — eller motsatt: får et regnestykke og lager forte… |
| Sammenlikning med relasjonstegn (<, >, =) | matte | 5 | Regneark (10) — naturlig ut… | Eleven setter riktig tegn mellom to tall, to regnestykker eller to mengdebilder (7+2 __ 10−2). DragonBox 1 har egne «relasjonstegn og terning»-økter;… |
| Subitisering-/mengdebildeark (tell og skriv tallet) | matte | 5 |  | Terningmønstre, tiervenn-rammer (ten frames) og prikkgrupper; eleven skriver antallet, eller kobler mengde til tallsymbol. DragonBox har subitisering… |
| Mønsterfortsettelse (figur- og tallmønster) | matte | 4 |  | Eleven fortsetter et mønster: gjentakende figurrekker (○△△○△△…), voksende mønstre eller tallfølger med hull. «Mønster» er eget kapittel i Multi 2B; D… |
| Pengeark (mynter og sedler: telle beløp, betale, veksle) | matte | 4 |  | Eleven teller opp tegnede mynter/sedler og skriver beløpet, krysser av mynter for å betale en pris, eller veksler (hvor mye tilbake av 100 kr?). Drag… |
| Tallpyramider og magiske kvadrater | matte | 5 |  | Utfyllingsfigurer der nabotall summeres oppover (pyramide) eller rader/kolonner/diagonaler skal gi samme sum (magisk kvadrat); noen felt er fylt ut, … |
| Symmetri- og speilingsark i rutenett | matte | 5 |  | Halv figur tegnet i rutenett med symmetrilinje; eleven tegner speilbildet. Også kopiering av figur fra ett rutenett til et tomt (ev. forstørret). Fas… |

### Offentlige/gratis norske ressurser: matematikk.org, Udir (kartleggingsprøver + støttemateriell), Statped, Les…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Ordkjeder (ordkjedeark) | norsk | 5 |  | Eleven får sammenhengende bokstavstrenger av 3-4 småord uten mellomrom (f.eks. «solkattbilhus») og setter strek mellom ordene. Standardformat i Udirs… |
| Skriverammer med setningsstartere og ordbank | norsk | 5 |  | Strukturert skriveark per tekstsjanger: bokser for innledning/hoveddel/avslutning med setningsstartere, bindeord og ordbank som stillas. Skrivesenter… |
| Tiervenner/tallvenner-ark (number bonds) | matte | 5 | Regneark (10), men egen vis… | Eleven fyller ut tallpar som gir 10 (eller 5/20/100): tomme «venne-diagrammer», regnestykker med hull (7+_=10) og fargelegging av par. Udirs veiledni… |
| Hundrekart med hull / tomme hundrekart | matte | 5 | Slektskap med Tallinjer med… | 1-100-rutenett der utvalgte ruter er tomme og eleven fyller inn, eller utsnitt av hundrekartet («naborutene til 47»). Klassisk kopioriginal hos Matem… |
| Sammenligningsark: sett inn <, > eller = | matte | 5 | Regneark (10) i innstilling… | Eleven sammenligner to tall/mengder/regnestykker og setter inn riktig tegn, eller ringer rundt størst/minst. Fast deloppgave i Udirs kartleggingsprøv… |
| Tallrekker og mønsterfortsettelse | matte | 5 | Tallinjer med hull (12) | Eleven fortsetter en tallfølge (hopp på 2, 5, 10, synkende, voksende mønstre) eller fyller hull midt i følgen. Deloppgave i kartleggingsprøvene i reg… |
| Nonord-/tulleordlesing (avkodingsark) | norsk | 4 |  | Liste med uttalbare tulleord («mip», «skral», «bruf») som eleven leser høyt — ren teknisk avkoding uten meningsstøtte. Obligatorisk delprøve i Statpe… |
| Repetert lesing med registreringsskjema | norsk | 4 |  | Samme ordliste/tekst leses flere ganger; arket har lesekolonner pluss skjema for tid og antall feil per gjennomlesing. Kjernemetode i Lesesenterets P… |
| Ordkort/lesekort til utklipp (høyfrekvente ord) | norsk | 4 | Ordbingo (3) i teknikk | Rutenett av kort med ett ord per kort (typisk de 100 vanligste norske ordene eller ukas ord) som klippes ut til lesetrening, memory og setningsbyggin… |
| Rimord-kobling | norsk | 4 | Ord-til-bilde-kobling (7) i… | Eleven trekker strek mellom ord som rimer (eller stryker ordet som ikke rimer i en rekke). Kjerneaktivitet i språklig bevissthet-tradisjonen (Språklø… |
| Stavelsesdeling-ark | norsk | 3 |  | Eleven deler ord i stavelser (skriver med skråstrek, klapper og teller stavelser, eller setter sammen oppdelte stavelser til ord). Fast innslag i spr… |
| Bokstavdiktat med bilder (første lyd) | norsk | 4 | Ord-til-bilde-kobling (7) o… | Eleven ser et bilde og skriver bokstaven for første lyd i ordet (evt. siste lyd eller alle lydene). Delprøve i Udirs kartleggingsprøve i lesing 1. tr… |
| Ordlesing flervalg (kryss av riktig ord til bildet) | norsk | 4 | Ord-til-bilde-kobling (7) | Bilde med 3-4 ordalternativer under (katt/kast/kort) — eleven krysser av ordet som passer. Kartleggingsprøve-format som skiller seg fra ren strek-kob… |
| Diktatark med skrivelinjer og rettekolonne | norsk | 3 |  | Nummererte skrivelinjer for orddiktat/setningsdiktat, ofte med kolonne for selvretting («skriv riktig»-kolonne). Arbeidsprøven bruker diktat av lydre… |
| Telleark: mengde til tall | matte | 4 |  | Eleven teller objekter i en rute og skriver antallet (eller tegner riktig antall til et gitt tall). Første deloppgave i kartleggingsprøven i regning … |
| Pengeregning-ark (mynter og sedler) | matte | 4 |  | Eleven teller opp tegnede norske mynter/sedler og skriver beløpet, eller finner hvilke mynter som trengs for et beløp. Fast tema i kartleggingsprøven… |
| Tallnaboer-ark | matte | 5 | Tallinjer med hull (12) tem… | Eleven skriver tallet før og etter et gitt tall (naboer/tiernaboer). Egen deloppgave i kartleggingsprøven i regning for 1. trinn. |
| Barnesudoku (4x4/6x6 med tall eller symboler) | matte | 4 |  | Forenklet sudoku for barnetrinnet; matematikk.org har sudoku og kakuro i spillsamlingen for 1.-4. trinn, og utskriftsvarianten er vanlig i norske kla… |
| Prikkark, ruteark og geobrett-ark (strukturark) | matte | 5 |  | Kopioriginaler med prikkgitter, cm-ruter eller geobrett-punkter til areal-, mønster- og geometriarbeid. Standard kopioriginal hos Matematikksenteret. |
| Tom tallinje (strategiark) | matte | 5 | Tallinjer med hull (12) — d… | Udirs støttemateriell i regning anbefaler arbeid med tom tallinje der eleven selv plasserer tall og tegner hoppene sine — tallinje uten tall som doku… |
| Tankekart- og VØL-skjema (førskrivingsark) | tverrfaglig | 4 |  | Strukturskjemaer til før- og etterarbeid: tankekart med tema i midten, VØL-skjema (Vet / Ønsker å lære / har Lært), styrkenotat. Gjennomgående i Skri… |
| Uke- og værbok (kalenderskrivark) | norsk | 4 |  | Daglig skriveark med fast struktur: dato, ukedag, vær (kryss av/tegn symbol) og skrivelinjer — Skrivesenterets «uke- og værbok» for daglig skrivetren… |
| Dagsplan/ukeplan med visuell støtte | tverrfaglig | 4 |  | Statped anbefaler egne utskrevne dags- og ukeplaner med symboler/bilder og avkryssing for elever som trenger struktur og forutsigbarhet; nedlastbare … |
| Setningslesing med bildevalg | norsk | 3 | Ord-til-bilde-kobling (7) | Eleven leser en kort setning og krysser av bildet som passer (eller omvendt). Delprøve i kartleggingsprøvene i lesing 1.-3. trinn og i Statpeds setni… |
| LIST-/tekstnøtter (rike problemløsningsoppgaver) | matte | 1 |  | Ferdiglagde utforskingsoppgaver med lav inngangsterskel og stor takhøyde — Mattelist (592 oppgaver, filtrert på trinn/tema) og matematikk.orgs tekstn… |

### Internasjonale arbeidsark-generatorer: WorksheetWorks.com, Discovery Puzzlemaker, The Teacher's Corner, Super…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Regnelabyrint (math maze) | matematikk | 5 |  | Eleven finner veien gjennom en labyrint ved å løse regnestykker: bare ruter med riktig svar (eller en gitt tallfølge, f.eks. 3-gangen) gir farbar vei… |
| Tallkryssord (cross-number) | matematikk | 5 | Kryssord (form), Regneark (… | Kryssord der svarene er tall: ledetrådene er regnestykker vannrett og loddrett, og sifrene må stemme i kryssene. |
| Addisjonskvadrater / magiske kvadrater | matematikk | 5 |  | Rutenett der rader og kolonner skal summere til oppgitte summer; eleven fyller inn manglende tall. Varianter: magisk kvadrat med lik sum alle veier. |
| Hemmelig skrift (kryptogram/kodeknekker) | norsk | 5 |  | Læreren skriver en setning; arket viser den kodet (symbol- eller tallnøkkel per bokstav) og eleven dekoder budskapet med nøkkelen. |
| Dobbeltpuslespill (double puzzle) | norsk | 5 | Setningsstokking (stokke-me… | Eleven avstokker en liste ord; nummererte bokstaver fra svarene overføres til ruter som til slutt staver et hemmelig løsningsord/-setning. |
| Bokstavfall (fallen phrase) | norsk | 4 |  | Bokstavene i en setning har «falt ned» under et rutenett; eleven flytter dem opp i riktige kolonner for å gjenskape setningen. |
| Ordstokking / anagram-ark | norsk | 5 | Setningsstokking (samme idé… | Bokstavene i hvert enkelt ord er stokket om (RBDØ → BRØD); eleven skriver ordet riktig, eventuelt med bildestøtte eller skrivelinje. |
| Manglende bokstaver (missing letters) | norsk | 5 | Luketekst (hull-prinsippet,… | Øveord skrives med utelatte bokstaver (B_ØD eller _RØ_); eleven fyller inn. Vanskegrad = antall og plassering av hull. |
| Labyrintgenerator (ren labyrint) | tverrfaglig | 5 |  | Klassisk strek-labyrint fra start til mål, i valgfri størrelse/vanskegrad; brukes til finmotorikk og belønningsoppgaver. |
| Barnesudoku (4×4/6×6, tall eller symboler) | matematikk/logikk | 5 |  | Sudoku i barnestørrelser, gjerne med figurer/bokstaver i stedet for tall for de yngste; eleven fyller rutenettet etter reglene. |
| Prøvegenerator (flervalg / kortsvar / fyll-inn) | tverrfaglig | 5 |  | Læreren skriver egne spørsmål og alternativer; arket blir en ferdig oppsatt prøve med nummerering, avkryssingsbokser/svarlinjer og fasit. |
| Ordkort-/flashkortgenerator | norsk/engelsk | 5 | Ordbingo (kort-estetikken),… | Lærerens ordliste (evt. med innlimte bilder) settes opp som utklippbare kort i rutenett — til ordbank, pargspill (memory) eller drilling; dobbeltsidi… |
| Dominogenerator | norsk/matematikk | 5 | Ord-til-bilde-kobling (pare… | Utklippbare dominobrikker der venstre og høyre halvdel skal kobles i kjede: ord–bilde, regnestykke–svar, ord–definisjon. |
| Brettspillgenerator | tverrfaglig | 4 |  | Printbart spillbrett (rute-løype fra start til mål) der lærerens ord/spørsmål/regnestykker legges i feltene; spilles med terning og brikker. |
| Sorteringsark (kategorisortering / group sort) | norsk/matematikk | 5 |  | Eleven sorterer ord i to–fire kolonner/bokser etter kategori (substantiv/verb, é/e-lyd, partall/oddetall) — som skrive- eller klipp-og-lim-oppgave. |
| Tallfamilier / tiervenner-ark (fact families, number bonds) | matematikk | 5 | Regneark (delvis, men visue… | Eleven fyller ut tallfamilie-trekanter (3-4-7 gir 3+4=7, 7−4=3 …) eller number-bond-sirkler for tiervenner/tallvenner. |
| Hundrerark med hull + hoppetelling/nabotall | matematikk | 5 | Tallinjer med hull (nær sle… | 1–100-rutenett der utvalgte ruter er tomme, eller sekvenser med hoppetelling (2, 5, 10) og nabotall (tallet før/etter) som eleven fullfører. |
| Tieramme-ark (ten frames) | matematikk | 5 |  | Eleven tegner/teller prikker i tierammer (2×5-rutenett), kobler ramme til tall, eller finner hvor mange som mangler til ti. |
| Brøkark (skyggelegging og sammenligning) | matematikk | 5 |  | Eleven fargelegger brøkdeler av sirkler/rektangler, leser av skyggelagte figurer, eller sammenligner brøker med <, >, =. |
| Plassverdiark (utvidet form) | matematikk | 5 | Regneark (samme panel-lest) | Eleven deler tall i enere/tiere/hundrere, skriver tall på utvidet form (345 = 300+40+5) og omvendt. |
| Sammenligne og ordne tall (<, >, =) | matematikk | 5 | Alfabetisering (samme ordne… | Eleven setter riktig tegn mellom tallpar (krokodillemunnen) eller ordner tallrekker fra minst til størst. |
| Mønsterark (fortsett mønsteret) | matematikk | 4 |  | Eleven fortsetter figur- eller tallmønstre (sirkel-firkant-sirkel-?, 2-4-6-?) og lager egne mønstre. |
| Pengeark (myntregning i kroner) | matematikk | 4 | Klokkeark (samme «tegnet st… | Eleven teller opp tegnede mynter/sedler, finner beløp, betaler og regner ut veksel. |
| Måleark med linjal | matematikk | 5 |  | Arket tegner streker/enkle figurer i eksakt lengde; eleven måler med linjal og skriver svar i cm/mm, evt. tegner streker i oppgitt lengde selv. |
| Akrostikon-skriveark | norsk | 5 |  | Lærerens valgte ord (SOMMER, VENNSKAP) skrives vertikalt med stor bokstav og skrivelinjer bortover; eleven dikter en linje per bokstav. |

### Teachers Pay Teachers + Pinterest-økosystemet (K–5 printables): TpT-kategorisider, selgerblogger (Beth Ann Av…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Tierammer (ten frames) | matematikk | 5 |  | Eleven fyller ut eller leser tierammer (2×5-rutenett med prikker): tegner riktig antall, skriver tallet, eller finner hvor mange som mangler til 10/2… |
| Tallvenner / part–part–whole (number bonds) | matematikk | 5 | Regneark (åpne oppgaver, fj… | Sirkeldiagram med en helhet og to deler; eleven fyller inn den manglende delen eller helheten (missing addend). Brukes intensivt for tiervenner og op… |
| Regnefamilier (fact families) | matematikk | 5 | Gangetabell-utfylling (fjer… | Tre tall i en trekant/hus; eleven skriver de fire regnestykkene familien gir (to addisjoner, to subtraksjoner — eller gange/dele). Klassisk TpT-stors… |
| Hundrerark-mysteriebilde | matematikk | 5 | Tallinjer med hull (samme i… | Eleven fargelegger gitte ruter i et 100-kart (eller løser oppgaver som peker til ruter) og et pikselbilde trer fram. Finnes også som hundrerark med m… |
| Fargelegg etter kode (color by code, tegningsbasert) | matematikk/norsk | 2 |  | Strektegning delt i felter; hvert felt har et regnestykke/ord, og svaret bestemmer fargen. En av TpTs mest solgte sjangre for morgenarbeid og stasjon… |
| Klipp-og-lim-sortering | norsk/matematikk/naturf… | 5 | Ord-til-bilde-kobling (dele… | Ark med to–fire kategorikolonner og en stripe med brikker (ord eller bilder) nederst; eleven klipper ut brikkene og limer dem i riktig kolonne. Gjenn… |
| Oppgavekort (task cards) | alle | 4 |  | Sett med nummererte kort (4–8 per ark) med én oppgave per kort, pluss eget svarark eleven fyller ut og fasit til læreren. Omtales i selgermiljøet som… |
| «Jeg har … hvem har …?»-kjedespill | alle | 5 |  | Kortstokk der hvert kort sier «Jeg har [svar], hvem har [neste oppgave]?»; klassen leser i kjede til sirkelen er sluttet. Enorm sjanger på TpT for ga… |
| Kast og dekk / kast og skriv (terningark) | matematikk/norsk | 5 |  | Spillebrett der eleven kaster én eller to terninger, regner ut summen og dekker/fargelegger/skriver i feltet med svaret. Svært utbredt K–2-sjanger fo… |
| Spinner-ark (snurr og skriv / snurr og tell) | matematikk/norsk | 5 |  | Ark med en spinner (deles med binders og blyant) fylt med tall, bokstaver eller ord, pluss registreringsfelt: snurr, og skriv ordet / regn ut / sett … |
| Dagens tall | matematikk | 5 |  | Malark der ett tall utforskes fra alle kanter: tiere/enere, +1/−1, +10/−10, partall/oddetall, tegn det, plasser det på tallinja, skriv nabotallene. F… |
| Dagens ord | norsk | 4 |  | Tilsvarende mal for ett ord: skriv det, del i stavelser, sett det i setning, finn synonym/antonym, tegn det. Brukes som fast innslag i word work-ruti… |
| Retteark («fiks setningene») | norsk | 5 | Setningsstokking (samme inp… | Setninger med innlagte feil — liten forbokstav, manglende punktum/spørsmålstegn, feilstavet ord — som eleven skal finne og rette. Stor sjanger som «f… |
| Tellestreker og søylediagram (dataark) | matematikk | 5 |  | Eleven teller objekter eller leser tellestreker, fyller ut søylediagram/piktogram og svarer på spørsmål («hvor mange flere …?»). Standard data-og-sta… |
| Hoppetelling-labyrint | matematikk | 5 | Gangetabell-utfylling (tren… | Rutenett der eleven finner veien fra start til mål ved å følge tallrekka (2, 4, 6 … eller 5, 10, 15 …); feil tall er blindveier. Populær som «skip co… |
| Les–spor–skriv-ark (høyfrekvente ord) | norsk | 5 | Sporing (deler stiplet skri… | Rader per ord: les ordet, spor det stiplet, skriv det selv, ring det inn blant distraktorer, finn det i en setning. Sight words-praksisark er en av d… |
| Bokstavrutenett (Boggle-ark) | norsk | 3 | Ordkryss (bokstavrutenett, … | 4×4- eller 5×5-rutenett med bokstaver; eleven lager så mange ord som mulig av nabobokstaver og skriver dem på linjer under. Brukes som ukens klassisk… |
| Ordstige (word ladders) | norsk | 3 |  | Eleven går fra ett ord til et annet ved å endre én bokstav per trinn (sol→sal→sag), gjerne med en ledetråd per trinn. Etablert sjanger hos Super Teac… |
| Rimfamilie-hus (word families) | norsk | 4 | Silhuetter (begge jobber på… | Hus/blomst per endelse (-at, -an) der eleven bygger og skriver alle ordene i familien ved å bytte førstebokstav. Kjernen i amerikansk K–1 word work; … |
| Lydbokser (Elkonin-bokser) | norsk | 4 | Silhuetter (ordanalyse, men… | Ordbilde/ord med én boks per språklyd; eleven skriver én lyd i hver boks (s-o-l). Standardverktøy i phonics-/lydmetodikk, hyppig i CVC-pakkene på TpT. |
| Skriv rundt i rommet (write the room) | norsk/matematikk | 4 | Ordbingo (kort-og-brett-sle… | Kortsett med ord/bilder som henges opp i klasserommet, pluss registreringsark der eleven med skriveplate finner kortene og skriver ordene. Meget popu… |
| Kodeløype / escape room-ark | alle | 3 |  | Sekvens av småoppgaver der hvert svar gir en kode (bokstav→tall, symbolnøkkel) som låser opp neste post, til slutthemmelig ord/tall. Escape rooms er … |
| Posisjonssystem-ark (base-ti-klosser) | matematikk | 5 | Regneark (fjernt) | Eleven leser tegnede tier-staver og ener-klosser og skriver tallet, eller motsatt; utvidet form (347 = 300+40+7) og sammenlikning. Fast del av number… |
| Navnesporing-bok (editable name tracing) | norsk | 5 | Sporing (samme kjerne, batc… | Ark/hefte der elevens eget navn spores stiplet, regnbueskrives (samme ord i flere farger) og bygges med utklipte bokstaver. En av de mest søkte edita… |
| Setningsbygging klipp-og-lim | norsk | 5 | Setningsstokking (nesten id… | Eleven fargelegger, sporer, klipper ut ordene i en setning, limer dem i riktig rekkefølge og skriver setningen på linje under. Utbredt sight word-sja… |

### Spesialpedagogikk og tilpasset opplæring i Norge: Statped (ASK, helhetslesing, matematikkvansker), Widgit/InP…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Ordkjeder | norsk | 5 |  | 3–4 ord skrevet sammen uten mellomrom (f.eks. «solbilhus»); eleven setter loddrette streker mellom ordene. Klassisk avkodings-/dysleksisjanger (jf. O… |
| Repetert lesing-skjema (leseflyt-logg) | norsk | 5 |  | Eleven leser samme tekst/ordliste flere ganger på tid; fyller selv ut skjema med dato, antall rett leste ord og tid, og plotter fremgang i et frekven… |
| Listelesing på tid (Tempolex-stil) | norsk/matte | 5 |  | Kolonner der de samme ordene/stavelsene/tallfakta gjentas i tilfeldig rekkefølge for automatisering; eleven leser høyt på tid, presisjon og tempo not… |
| Stavelsesdeling med stavelsesbuer | norsk | 4 |  | Ord der eleven deler i stavelser: tegner buer under hver stavelse, setter streker, eller skriver stavelsene i egne ruter. Kjernetiltak i Refsahl/Fros… |
| Sammensatte ord / morfemkobling | norsk | 4 | Ord-til-bilde-kobling (samm… | Sammensatte ord deles i to; eleven trekker strek mellom forledd og etterledd i to kolonner, eller bygger nye sammensetninger. Morfemnivået i helhetsl… |
| Setningskjeder (skriv setningen riktig) | norsk | 5 | Setningsstokking (samme inp… | En hel setning skrevet sammen uten mellomrom og uten stor bokstav/punktum; eleven skriver setningen riktig på linjer under. Trener både avkoding og s… |
| Høyfrekvente ordkort (lesekort/ordbilder) | norsk | 5 | Ordbingo (kort-generering),… | Utklippskort med ett ord per kort i stor skrift (ofte de 100 vanligste ordene / ikke-lydrette ord) til drilling av ortografisk ordgjenkjenning; bruke… |
| Begrepskart (ett begrep per ark) | norsk/tverrfaglig | 5 |  | Ett ord i midten og faste felt rundt: hva er det (kategori), egenskaper (form, farge, størrelse — Nyborgs analytiske begreper), hva ligner det, bruk … |
| Sorteringsark (ordbank → kategorier) | norsk/tverrfaglig | 5 |  | Stokket ordbank øverst; eleven skriver/klipper ordene inn i riktige kategorikolonner (f.eks. frukt/dyr/klær, eller substantiv/verb). Sentral øvelse i… |
| Dagsplan/dagtavle med visuell støtte | tverrfaglig | 4 |  | Dagens aktiviteter i rekkefølge, én rute per aktivitet med tekst og evt. bilde, ofte med avkryssing/«ferdig»-kolonne. Kjerneverktøy for elever med au… |
| Først–så-tavle | tverrfaglig | 4 |  | To store felt: «Først» (oppgaven) og «Så» (belønningen/neste aktivitet), med tekst og evt. bilde. Det enkleste struktureringsverktøyet for elever som… |
| Rutinekort / steg-for-steg-sjekkliste | tverrfaglig | 4 |  | Aktivitetsplan i TEACCH-tradisjonen: nummererte steg for en rutine (håndvask, morgenrutine, garderobe) med rute for avkryssing og evt. bilde per steg… |
| Belønningsskjema / tegnøkonomi | tverrfaglig | 5 |  | Skjema der eleven samler tegn (stjerner, klistremerker, klipp) mot et avtalt mål: navn, målatferd, N ruter/tokens, belønning. Brukes bredt i skolen (… |
| Hjem–skole-dagrapport (atferdsavtale) | tverrfaglig | 4 |  | Enkel tabell: dagens økter/timer × 1–3 avtalte mål, med smilefjes/avkryssing per økt og felt for underskrift hjemme. «Daglige meldinger»-sjangeren fr… |
| Sosial historie-hefte | tverrfaglig | 4 |  | Kort, skreddersydd fortelling (Carol Gray-tradisjonen) som beskriver en konkret situasjon og hva eleven kan gjøre — én setning per side, gjerne med b… |
| Følelsesskala / -termometer (1–5-skala) | tverrfaglig | 4 |  | Termometer eller femtrinnsskala (KAT-kassen, «Incredible 5-point scale») der hvert trinn har farge + lærerens tekst: «slik kjennes det» / «dette kan … |
| Behovs-/pause-/hjelpekort | tverrfaglig | 4 | Ordbingo/ordkort (samme kor… | Små utklippskort eleven kan peke på eller levere: «pause», «hjelp», «do», «for mye lyd» — tekst + evt. bilde, i laminerbar kortstørrelse. ASK-lavters… |
| Valgtavle | tverrfaglig | 3 |  | Ark med 2–6 store ruter («Jeg vil …») som eleven peker på for å velge aktivitet; brukes i ASK og med elever med utviklingshemming. |
| Tematavle / kommunikasjonstavle (ASK) | tverrfaglig | 3 |  | Rutenett med ord for én situasjon (matpakke, lek, gym): kjerneord + situasjonsord, eleven peker mens den voksne snakker. Statped publiserer ferdige e… |
| Colourful semantics-setningsbygging | norsk | 4 | Setningsstokking | Setningsledd fargekodes etter rolle (hvem = oransje, gjør = gul, hva = grønn, hvor = blå); eleven bygger setninger av kort/kolonner med riktig farge.… |
| Setningspuslespill (klippeark) | norsk | 5 | Setningsstokking (direkte o… | Setninger kuttet i ordkort som eleven klipper ut, stokker og limer i riktig rekkefølge — setningsnivået i helhetslesing. |
| Les og sett strek (ord → bilde) | norsk | 5 | Ord-til-bilde-kobling (dire… | 18-arks-serien «Les og sett strek»: eleven leser lydrette ord og trekker strek til riktig bilde — standard avkodingsark i begynneropplæring og spes.p… |
| Munnmotorikk-øvelseskort | spes.ped/logopedi | 2 |  | Kort med én oralmotorisk øvelse per kort (blås, smask, tungespiss opp …), ofte som spill der barnet trekker kort og gjør bevegelsen. Logopedsjanger. |
| Symbolstøttet tekst | tverrfaglig | 1 |  | Løpende tekst der hvert ord får symbol over seg (Widgit/SymWriter): beskjeder, sanger, regler og fagtekst symboliseres automatisk. Den mest brukte AS… |
| Parlesing-/veksellesing-skjema | norsk | 4 |  | To elever (eller lærer og elev) leser vekselvis samme tekst; makkeren registrerer feil og tid med stoppeklokke, resultat føres i felles skjema med di… |

### Engelskfaget i norsk barneskole (Explore/Quest/Link m.fl.) + naturfag/samfunnsfag/musikk/K&H — forlagenes kom…

| Funn | Fag | Fit | Likner | Hva det er |
|------|-----|-----|--------|------------|
| Hentediktat (løpediktat) | engelsk/norsk | 5 |  | Lærerens ord/fraser skrives ut som nummererte kort som henges rundt i rommet; eleven løper bort, leser, husker og skriver ordet på riktig plass på eg… |
| Gloseark «ukas ord» + gloseprøve | engelsk | 5 |  | Øveark med look–cover–write–check-kolonner (les, dekk til, skriv, sjekk), «skriv ordet tre ganger», norsk↔engelsk-kolonner — og en egen prøveutskrift… |
| Ordstokking (scrambled words) | engelsk/norsk | 5 | Setningsstokking (samme pri… | Bokstavene i hvert ord stokkes om; eleven skriver ordet riktig på linjen ved siden av, ev. med norsk oversettelse som hint. Fast innslag i engelske w… |
| Kryptogram / hemmelig kode | norsk/engelsk/tverrfagl… | 5 |  | Hver bokstav tildeles et symbol eller tall; eleven knekker koden og avdekker lærerens ord eller hemmelige setning. Klassisk «knekk koden»-ark, brukt … |
| Loop-kort («I have … who has …» / ordsløyfe) | engelsk/matte/naturfag | 5 |  | Kortkjede for hel klasse: svaret på ett kort er starten på neste («Jeg har dog — hvem har katt?»). Genereres fra parliste: ord↔oversettelse, begrep↔d… |
| Ordkort/flashcards for memory og par-spill | engelsk/norsk/begrepstr… | 5 | Ord-til-bilde-kobling (samm… | Klippekort i rutenett: engelsk ord på ett kort, norsk oversettelse (eller innlimt bilde) på makkerkortet. Brukes til memory, snap og pardannelse — gr… |
| Trekk strek: tekst-til-tekst-kobling | engelsk/naturfag/samfun… | 5 | Ord-til-bilde-kobling (samm… | To kolonner der eleven trekker strek mellom sammenhørende par: engelsk↔norsk ord, begrep↔definisjon, land↔hovedstad. «Draw a line» er standard i alle… |
| Natursti / quiz-løype med poster | naturfag/tverrfaglig/ut… | 5 |  | Læreren skriver spørsmål med 2–3 svaralternativer; arket genererer nummererte postkort (A5/A6 til opphenging/laminering), elevens svarskjema og fasit… |
| VØL-skjema | naturfag/samfunnsfag | 5 |  | Tre kolonner — Vet / Ønsker å lære / har Lært — med lærerens tema i toppen. Standardverktøy for å aktivere forkunnskaper ved oppstart av tema i natur… |
| Tankekart-mal | alle fag | 5 |  | Sentral boble med lærerens emneord og N tomme grener/bobler rundt — ev. med lærerens delspørsmål ferdig plassert på grenene. Brukes til forkunnskaper… |
| Begrepskart (Frayer-modell, firefeltsark) | naturfag/samfunnsfag/no… | 5 |  | Ett ark (eller fire-per-ark) per begrep fra lærerens liste: begrepet i midten, felter for definisjon, kjennetegn, eksempler og ikke-eksempler, ev. te… |
| Tidslinje-ark | samfunnsfag/historie/na… | 4 |  | Læreren legger inn hendelser med årstall; arket tegner en skalert tidslinje der enten hendelsene står ferdig (oppslagsvariant), eller feltene er tomm… |
| Diagram-utfyllingsark (telling → søylediagram, observasjonslogg) | naturfag/matte | 4 |  | Læreren angir kategorier (og ev. et datasett); arket genererer aksekors med rutenett der eleven teller opp med tellestreker og fargelegger søyler — f… |
| Rytmekort + rytmediktat | musikk | 5 |  | Klippekort med rytmemønstre (ta/ti-ti/pause — fjerdedeler, åttedelspar, pauser) i 4/4, 3/4 eller 6/8, generert i stigende vanskegrad; ev. diktatark d… |
| Rutenett-tegning (ruteteknikk / forstørring) | K&H/matte | 5 |  | Læreren limer inn et bilde (Ctrl+V); arket viser bildet med rutenett over og et tomt, ev. forstørret rutenett ved siden av som eleven kopierer rute f… |
| Symmetri-fullføring (speil den andre halvdelen) | K&H/matte | 4 |  | Arket viser venstre halvdel av et motiv med symmetriakse og rutenett; eleven tegner speilbildet. Motivet er enten et algoritmisk rutemønster (pikself… |
| Labyrint | aktivitet/norsk/begynne… | 5 |  | Algoritmisk generert labyrint i valgfri størrelse og vanskegrad, ev. med lærerens ord/bokstaver plassert langs riktig vei (samle bokstavene → løsning… |
| Symbol-/bokstavsudoku (4×4, 6×6) | matte/aktivitet | 5 |  | Forenklet sudoku for barn der symbolene er bokstaver, tall, enkle former eller innlimte bilder; med fasit. Vanlig som logikk-/stasjonsark på småtrinn… |
| Sorteringsark (klipp og lim i kategorier) | naturfag/engelsk/norsk | 5 |  | Læreren angir 2–3 kategorier og elementene som hører hjemme i dem; arket genererer klippebrikker med ordene og et kolonneark eleven limer dem inn på,… |
| «Find someone who»-rutenett (intervju-bingo) | engelsk/sosial kompetan… | 4 | Ordbingo (samme rutenettlay… | Rutenett der hver rute har en påstand fra læreren («has a pet», «can swim»); eleven går rundt, spør medelever på engelsk og samler navn/underskrifter… |
| Spillbrett med ordfelter (terningspill) | engelsk/norsk/matte | 4 |  | Slange-/sti-spillbrett der feltene fylles med lærerens gloser eller regnestykker; eleven kaster terning, flytter og må oversette/lese/løse feltet den… |
| Skriveramme med setningsstartere og ordbank | engelsk/norsk/naturfag | 4 |  | Strukturert skriveark: lærerens setningsstartere står ferdig på linjene, ordbank i boks øverst, ev. tegnerute. Brukes i engelsk («My family is …») og… |
| Minibok/flipbook-mal (brettebok) | engelsk/norsk/naturfag | 4 |  | A4-ark som brettes/klippes til en liten bok; læreren angir tittel og sideoverskrifter, arket plasserer dem riktig (delvis rotert) med skrivelinjer og… |
| Les og fargelegg (read and colour) | engelsk | 2 | Ord-til-bilde-kobling (nærm… | Eleven leser enkle engelske setninger («colour the cat brown») og fargelegger et motiv riktig. Svært vanlig i engelske workbooks og på Undervisningsb… |

---

*Generert 16.07.2026 med multi-agent research (49 agenter, 8 kildesveip, adversariell
verifisering). Rådata: workflow wf_3caf7dbd-daa i øktens transcript-katalog.*
