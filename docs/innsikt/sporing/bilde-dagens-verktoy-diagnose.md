# Diagnose: dagens Sporing-verktøy (v1 → v2) — hvorfor det blir «busy» og utrygt

Bildeanalyse utført 2026-07-17 som del av research-workflowen for Sporing v3.
Alle funn er lest ut av lokale skjermbilder/utskrifter; detaljene er verifisert
med 4–8x forstørrede utsnitt (crops ligger i `scratchpad/research/crops/`).

## Kilder (lokale filer)

| Kilde | Fil |
|---|---|
| v2-ark, små bokstaver (a, b, g, e, s, k, å + ordet «sol») | `scratchpad/overlevering-sporing/verktoyets-utseende-naa/sporing-v2-ark.png` (612×882) |
| v2-ark, store bokstaver (A, K, Å, Æ, M, S + ordet «Ole») | `scratchpad/overlevering-sporing/verktoyets-utseende-naa/sporing-v2-store.png` (612×807) |
| v1-print FØR ombygging («Hei», «på», «DEG») | `scratchpad/overlevering-sporing/stians-referansebilder/01-verktoyets-v1-print-FOER-ombygging.png` (663×605) |
| Referanse: alfabetplakat med bilder (rød vokal / blå konsonant, «©ByML») | `scratchpad/overlevering-sporing/stians-referansebilder/04-alfabetplakat-med-bilder.png` (350×247) |
| v2-skjermbilde av verktøyet i bruk (localhost:4322/sandbox/sporing, «Hei / på / DEG») | `scratchpad/overlevering-sporing/stians-referansebilder/09-verktoyets-v2-skjermbilde.png` (1920×1032) |

Verktøyet i prod: stianglomsrod.no/sandbox/sporing. Banene defineres i
`C:/Users/x_ray/kode 2026/Claude/hjemmeside/src/lib/bokstavbaner.ts`
(bokstavhus: topplinje y=3, x-topp y=15, grunnlinje y=27, bunnlinje y=39).

Målestokk-anslag: v2-arkene er ~612 px brede ≈ A4 210 mm → 1 px ≈ 0,34 mm.
Grønn startprikk ≈ 5–6 px ≈ **1,7–2 mm** på papir; strøktallene ≈ 7 px ≈
**2,4 mm** høye; x-høyden («stua») ≈ 20 px ≈ 7 mm. Veiledningsapparatet er
altså opp mot 1/3 av bokstavens kjernehøyde og ligger oppå den.

---

## A. Hovedfunn per visuell svakhet (v2, dagens tilstand)

### A1. To startprikker oppå hverandre + tall som leses som eksponent («1²») — a, g, å (og pr. konstruksjon d, q)
I a, g og å starter strøk 1 (buen) og strøk 2 (stammen) i praksis i samme
punkt øverst til høyre på buen. Resultat i v2: to grønne prikker overlapper
~70 % og blir én grønn klump, og tallene «1» og «2» render tett inntil
hverandre slik at de leses som **«1²»** — et eksponentuttrykk, ikke en
rekkefølge. Tydelig i crops `ark_a`, `ark_g`, `ark_aa` og i «på»-raden i
09-skjermbildet. En 6-åring kan ikke dekode dette; en lærer ser det som feil.

### A2. Å er et visuelt knutepunkt — ring + prikk + «3» + «1²» + pilspisser på ~15 px
Verstingen i begge høyder (crop `ark_aa`, `store_AA`, `v2s_paa`):
- Ringen over å ligger klemt i loftet og nesten nedpå x-topp-stiplelinja
  (liten å) / nedpå topplinja (stor Å).
- Grønn prikk ligger PÅ selve ringen, med tallet «3» svevende over — ringen
  ser ut som den har en utvekst.
- I 09-skjermbildet peker i tillegg en grå pilspiss INN i ringåpningen, slik
  at å-ringen kan leses som en spiral/ø-aktig figur.
- Rett under ringen ligger «1²»-kollisjonen fra A1 pluss pilspiss i buen.
Summen: 3 prikker, 3 tall, 2–3 pilspisser og en ring innenfor ~5 mm på papir.

### A3. Startprikk dekker akkurat det leddet barnet skal se — b, p, k, r/n/m/h-familien
Strøk 2 i b/p (buen) starter midt på stammen ved x-topp. Den grønne prikken
(bredere enn streken) legger seg PÅ stammen og dekker selve overgangen
bue-møter-stamme; tallet «2» klemmes inn i krysset og er knapt synlig (crop
`ark_b`, p i `v2s_paa`). I k ligger to av tre prikker inntil hverandre i
krysset midt i bokstaven, og det tredje tallet forsvinner bak strøket (crop
`ark_k`). Samme mønster vil ramme r, n, m, h — alle bokstaver der nye strøk
starter på stammen.

### A4. Grå pilspisser ligger PÅ strøket — usynlige på modellen, «skitt» på sporebokstavene
Pilspissene er små grå trekanter plassert midt på strøkbanen:
- På den svarte/fargede **modellbokstaven** forsvinner grå-på-svart nesten
  helt (a-, g-, sol-radene) eller blir en grå flekk på rød/blå strek (A-ens
  toppunkt, M-ens midtparti, O-ens nedre bue i «Ole»). Veiledningen er altså
  svakest akkurat der den skulle vært tydeligst.
- På de **stiplede** sporebokstavene har pilspissen samme farge og omtrent
  samme størrelse som en dash — den leses som en ekstra/skjev dash, ikke som
  retning (tydelig i s og o i «sol»-raden, stammen i l/k/b).
- Pilspissene er rette trekanter som ikke følger buen: i s, e, o og a peker
  de stivt i tangentretning og ser «påklistret» ut. Dette er nøyaktig det
  Stian vil bort fra: pilene buer ikke der strøket buer.

### A5. M og store bokstaver: alle pilspisser samler seg i midten, tall bryter ut av linjesystemet
- **M** (crop `store_M`): tre grå pilspisser havner på nesten samme høyde
  midt i bokstaven, akkurat der den stiplede x-topp-linja krysser — fire
  grå elementer i én stripe. Tallene 2 og 3 svever over topplinja.
- **A/Å** (crop `store_A`, `store_AA`): tallet «2» klemmes inn i det trange
  rommet mellom de to skråstrekene (der tverrstreken skal gå); pilspissen på
  toppunktet ligger oppå topplinja. I Å kolliderer toppunkt-pil og ring.
- **K** (crop `store_K`): prikk 1 og 2 med tall ligger over topplinja, prikk 3
  + tall «3» + pilspiss klumper seg i krysset; «3» delvis skjult bak
  skråstrøket.
- Gjennomgående: tall plasseres noen ganger til høyre, noen ganger over, noen
  ganger inne i bokstaven — ingen fast, forutsigbar posisjon å lete etter.

### A6. Æ er verst av versalene: 4 prikker + 4 tall + pilspisser på én bokstav
Crop `store_AE`: prikk 1 (nede venstre) og prikk 4 (nede ved tverrstreken)
ligger begge på grunnlinja få mm fra hverandre; tallene 2, 3, 4 stables
nedover langs den sonen der E-tverrstrekene fester seg i A-delen; pilspisser
overlapper prikkene på øverste og nederste tverrstrek. Én bokstav bærer
minst 10 veiledningselementer.

### A7. Dobbel prikk-semantikk: grønn startprikk vs. bokstavens egen prikk (i, j — og ringen i å)
I «Hei» (crop `v2s_hei`) ligger i-ens røde prikk og den grønne startprikken
vertikalt rett over hverandre, omtrent like store. To prikker med helt ulik
betydning (del av bokstaven vs. «start her») uten noe som skiller dem —
barnet kan spore i-prikken som startpunkt eller hoppe over den. Samme
konflikt gjelder å-ringen (A2): sirkulære symboler brukes både som bokstavdel
og veiledning.

### A8. Fire farger og tre symbolsystemer samtidig på modellordene
I 09-skjermbildet har modellordet «Hei» blå H (konsonant), rød e/i (vokal),
grønne prikker, grå piler og grønne tall — fire farger med tre ulike
betydninger (lydklasse, startpunkt, retning) oppå hverandre i ett ord.
Referanseplakaten (04) viser kontrasten: den er rolig nettopp fordi fargen
har ÉN betydning (rød vokal / blå konsonant) og null apparat ellers.

### A9. Sporebokstavene arver apparatet — «Salto-gradueringen» fjerner det for sent og ujevnt
På småbokstav-arket har både modellen OG sporebokstav 1 og 2 grønne prikker
(uten tall), først fra repetisjon 3 er raden ren. En å-rad har dermed 9
grønne prikker på de tre første cellene; «sol»-raden får prikker strødd
over s, o og l i modell + to repetisjoner. På store-arket er derimot ALLE
repetisjonene rene (kun modellen har apparat) — de to arkene følger altså
ulik regel, hvilket tyder på inkonsistent graduering mellom moduser/bygg.
UI-teksten lover dessuten «Et ord gir sporing av hele ordet» (uten apparat),
men «sol»-raden har likevel prikker og pilspisser.

### A10. Stiplet veilinje og stiplet sporebokstav er samme visuelle språk
Topplinje og x-topp er stiplet grått med omtrent samme valør og rytme som
sporebokstavenes dashes. Overalt der bokstaven tangerer linja (toppen av a,
e, s, o; rundingen på å) flettes bokstav-dash og linje-dash i hverandre.
På store-arket (generert uten fargebånd) er dette verst: hele raden er
grå dash på grå dash. X-topp-stripa er sidens travleste sone: linje + dash
+ prikk + tall + pilspiss innenfor ~2–3 mm.

### A11. Ingen ro i raden: full bredde, kuttede bokstaver, repetert husikon
- Repetisjonene fyller radbredden helt ut uten fast høyremarg; siste bokstav
  kuttes midt i formen (halv «p» ytterst i «på»-raden i 09-skjermbildet,
  halv g/a ytterst på småbokstav-arket). En avkuttet bokstav underminerer
  «slik ser ferdig ut»-følelsen.
- Bokstavhus-ikonet gjentas i venstremargen på alle 8 rader — samme statiske
  ikon, hvitt/ufarget selv når radene har gule/rosa/blå bånd, og med tak og
  kjeller som stikker utenfor radhøyden. Det konkurrerer med modellbokstaven
  om «start her»-posisjonen ytterst til venstre og gir kantstøy, ikke
  orientering.
- Småbokstav-arket stabler 8 rader uten tomme øvelinjer; siden har ikke noe
  sted for øyet å hvile.

### A12. Tall og prikker er under lesbarhetsgrensen på papir
Med ~2,4 mm talhøyde og 1,7–2 mm prikkdiameter på A4 er tallene på grensen
av det lesbare for voksne og reelt ulesbare for målgruppen — samtidig som de
er store NOK til å forstyrre bokstavformen. Apparatet taper altså begge
veier: for smått til å veilede, for stort til å ignoreres.

---

## B. Sammenlikning v1 → v2

| Aspekt | v1 (01-print) | v2 (dagens) | Vurdering |
|---|---|---|---|
| Bokstavform | Dobbel stiplet KONTUR (hul outline) — «trådnett-labyrint», e-ens indre nesten tettes igjen, DEG blir et gitter | Én skjelettbane med runde dashes | Klar forbedring i v2 |
| Linjesystem | 3–4 nakne linjer, stiplet midtlinje med samme vekt som bokstavene | Bokstavhus med fargebånd (loft/stue/kjeller) | Forbedring, men fargebånd er valgfritt og store-arket mister effekten |
| Modell | Første ord bare litt mørkere enn resten — knapt synlig modell | Tydelig svart/farget modellbokstav | Forbedring |
| Veiledning (prikk/tall/pil) | Bakt inn i mikroskala — leses som smuss/støy, i praksis usynlig på print («Hei»-raden) | Stor og synlig, men PÅ bokstavformen → kollisjonene i A1–A8 | v1: usynlig støy → v2: synlig rot. Samme rotårsak begge steder |
| Artefakter | p-ens underlengde klippes ved grunnlinja og etterlater løse «L»-fragmenter under linja i «på»-raden | Kuttede bokstaver i høyre kant (A11) | Begge har kant-/klippefeil |
| Å | Ring smelter sammen med a-buens kontur | Ring + prikk + tall + pil-knute (A2) | Å er uløst i begge versjoner |

**Rotårsaken er felles for v1 og v2:** veiledningen ankres i punkter PÅ
strøkbanen (start-, medial- og sluttpunkter i `bokstavbaner.ts`) i stedet for
i en sone UTENFOR bokstavens omriss. v2 gjorde apparatet større og tydeligere
uten å flytte det — dermed ble kollisjonene synlige i stedet for usynlige.
Styling kan ikke reparere dette; det trengs en egen ankringsmodell
(offset-posisjoner utenfor glyf-konvolutten + buede piler langs banen), som
er nettopp v3-målet.

## C. Hva referanseplakaten (04) faktisk viser — og ikke viser

- Plakaten («©ByML», klippekunst-stil, and/ball/kake/løve/øy-bilder) er IKKE
  Gyldendals Salto-plakat med piler: den har **ingen** piler, prikker eller
  tall i det hele tatt.
- Det den demonstrerer, er ro gjennom én-betydning-per-element: rød = vokal,
  blå = konsonant (presedensen for v2-fargevalget), rene modellbokstaver på
  et enkelt 3-linjesystem, ett minnebilde per bokstav, romslige celler.
- Konsekvens for v3: Salto-plakaten med piler utenfor bokstavformen må
  hentes inn som egen referanse (den ligger ikke blant disse fem bildene);
  04 kan brukes som referanse for fargesemantikk og «rolig celle», ikke for
  pilplassering.

## D. Prioritert kollisjonstopp (hvor v3 må vinne)

1. **å/Å** — ring-sonen (A2): flytt hele apparatet ut av loftet.
2. **a, g, d, q** — dobbelstart topp-høyre (A1): én markering utenfor buen,
   aldri to prikker i samme punkt.
3. **b, p, k, r, n, m, h** — prikk på stammen ved x-topp (A3): markér utenfor
   venstre/høyre for stammen.
4. **Æ, M, K, A** — tall inne i trange mellomrom og over topplinja (A5/A6):
   fast tallposisjon i en margsone.
5. **i, j** — grønn prikk vs. bokstavprikk (A7): trenger ulik form/størrelse
   eller plassering utenfor.
6. **Alle kurvebokstaver (s, o, e, c, a-buer)** — rette pilspisser på buede
   strøk (A4): pilene må bues langs banen og ligge utenfor formen.
7. **Radnivå** — fast høyremarg uten kutt, ren sporing etter modellen,
   dempet linjestipling, husikon én gang (eller integrert i første celle),
   luft mellom rader (A9–A11).
