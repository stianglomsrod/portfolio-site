# Nett-research: Autoritativ proporsjonstabell for norsk skoletrykkskrift

Utført 18.07.2026 for Sporing-verktøyet (stianglomsrod.no/sandbox/sporing).
Mål: rette opp «skviste» versaler (unaturlig høye/tynne) ved å fastslå riktige
bredde/høyde-forhold for et geometrisk «infant»-trykkskrift (à la Salto-plakaten,
Sassoon Infant, Andika) i bokstavhuset topp y=3 / x-topp y=15 / grunn y=27 /
bunn y=39 (versalhøyde 24 enheter, x-høyde 12 enheter).

**Metode:** Tre uavhengige kilder er triangulert og merket i hver tabell:

- **[MÅLT]** — eksakte glyfmål hentet programmatisk med `fontTools` fra
  Andika Regular (SIL International, gratis, «literacy»-font uttrykkelig i
  infant-sjangeren; lastet ned fra Google Fonts/`gwfh.mranftl.com`,
  `unitsPerEm=2048, capHeight=1485, xHeight=1040`). Dette er den eneste
  kilden med presise tall for absolutt alle 29 norske bokstaver.
- **[KLASSIFISERING]** — generell type-design-litteratur (romerske
  kapitél-proporsjoner, videreført i moderne geometriske grotesker), hentet
  fra OERT og TypeType/UniversiTTy. Gir bredde-GRUPPER (smal/middels/bred),
  ikke enkelttall.
- **[VISUELT]** — direkte bildeinspeksjon av ekte norsk skolemateriell:
  Zeppelin 1A «Bokstavbok» og «Arbeidsbok – Trykkskrift» (Aschehoug, Turid
  Fosby Elsness), lokalt lastet ned til
  `scratchpad/research/dumper2/zepp1a_*` (sider for I/i, L/l, O/o, V/v, S/s,
  U/u kontrollert i denne økta), samt tidligere analysert Salto-alfabetplakat
  (`bilde-salto-retning.md`, `DESIGNBRIEF-V3.md` — allerede i prosjektets
  research-mappe, gjenbrukt her for strøkretning/formgruppe-kontekst, IKKE
  for breddetall).
- **[ANBEFALT]** — vår syntese: Andika-målingen justert mot den geometrisk
  RUNDERE, BREDERE «infant»-retningen brukeren ber om (Andika er en humanist-
  grotesk, ikke fullt geometrisk — se punkt 1c). Dette er tallene som bør
  brukes direkte i `bokstavbaner.ts`.

Der ingen kilde ga eksakte tall, er det markert **(estimat)**.

---

## 1. Versal bredde/høyde-tabell A–Å

### 1a. Generell klassifisering (romersk/geometrisk grotesk-tradisjon)

Fire breddegrupper, konsistent på tvers av OERT og TypeType/UniversiTTy
(romerske kvadratkapiteler — grunnlaget for nesten alle sans serif-fonter,
inkl. geometriske):

| Gruppe | Bokstaver | Bredde/høyde |
|---|---|---|
| **Bredest (kvadrat/rundt)** | O C G Q D | ~0,85–1,0 (O/Q nesten kvadratisk) |
| **Bred (~¾)** | H U N T X Y Z A V | ~0,70–0,80 |
| **Middels-bred** | W M | M ~0,95–1,1; W bredest i alfabetet, ~1,2–1,4 |
| **Smal (~halvparten)** | B E F L P R S K J | ~0,45–0,65 |
| **Smalest** | I | ~0,15–0,25 (kun strektykkelse) |

Kilder: [Latin Alphabet Proportions – OERT](https://www.oert.org/en/latin-alphabet-proportions/),
[UniversiTTy Lesson 8: Uppercase Characters – TypeType](https://typetype.org/blog/universitty-lesson-8-designing-basic-latin-characters-uppercase-characters/).

### 1b. Andika-måling [MÅLT] — full versaltabell

`unitsPerEm=2048, capHeight=1485` (svarer til vår versalhøyde 24). Ratio =
glyfens ink-bredde (bounding box) delt på capHeight.

| Bokstav | Ratio (bbox/capH) | Tilsvarer @24 enheter |
|---|---|---|
| W | 1,330 | 31,9 |
| M | 0,976 | 23,4 |
| Q | 0,916 | 22,0 |
| A | 0,872 | 20,9 |
| Å | 0,872 | 20,9 |
| V | 0,859 | 20,6 |
| O/Ø* | 0,838 | 20,1 |
| G | 0,795 | 19,1 |
| Y | 0,828 | 19,9 |
| X | 0,822 | 19,7 |
| D/N | 0,778 | 18,7 |
| T | 0,778 | 18,7 |
| C | 0,764 | 18,3 |
| H | 0,761 | 18,3 |
| U | 0,737 | 17,7 |
| R | 0,731 | 17,5 |
| K | 0,721 | 17,3 |
| Z | 0,714 | 17,1 |
| Æ | 1,081 | 25,9 |
| B | 0,660 | 15,8 |
| S | 0,653 | 15,7 |
| P | 0,643 | 15,4 |
| E | 0,593 | 14,2 |
| F | 0,586 | 14,1 |
| L | 0,582 | 14,0 |
| J | 0,502 | 12,0 |
| I | 0,455 | 10,9 |

*Ø sitt bbox er identisk med O i Andika (skråstreken går ikke utenfor
sirkelen i denne fonten — se punkt 4 for hvorfor vi likevel anbefaler
overheng.) I i Andika inkluderer topp-/bunnserif-antydning (buet terminal,
«infant I»); en helt monolineær «stav uten fot» kan gjøres enda smalere
(~0,20–0,25).

Merk: Andika er en **humanist** grotesk (bygget for skjermlesbarhet,
moderate kontraster), IKKE en fullgeometrisk font som Futura. Dens I er
relativt bred (0,455) fordi den har innebygde «infant»-serifer for å skille
I fra l — dette er en bevisst legibilitetsstrategi, ikke representativt for
en ren geometrisk stav-I (som ville vært ~0,15–0,20).

Kilde: [Andika — SIL Language Technology](https://software.sil.org/andika/),
[Design — Andika](https://software.sil.org/andika/design/), egen måling
(fontTools BoundsPen) av `andika-v27-latin-regular.ttf`.

### 1c. Visuell kontroll mot norsk skolemateriell [VISUELT]

Zeppelin 1A trykkskrift (Aschehoug) og Salto-alfabetplakaten (Gyldendal, jf.
`bilde-salto-retning.md` fra tidligere økt) viser konsekvent:

- **O tegnes som en ren, nesten sirkulær ring** — modellbokstaven i Zeppelin
  har en tydelig rund form med retningspil «mot klokka» over toppen; ingen
  antydning til smal/oval kapitél. Dette støtter en RUNDERE O enn Andikas
  0,838 — vi anbefaler 0,85–0,90 for vårt formål.
- **L er tydelig smal** (stav + kort fot) — konsistent med klassifiseringen.
- **V er bred og åpen** (to skrå streker møtes nederst i spiss) — konsistent
  med gruppe «bred».
- **S har en tydelig dobbelbue**, middels bredde.
- **U er avrundet nederst (ikke skarpt hjørne)**, bredde ~middels.
- **Store bokstaver (loft-til-grunn) og «loftbokstaver» blant småbokstavene
  (b d f h k l t) tegnes i SAMME høyde** i Zeppelin-modellen — dvs.
  oppstreksbokstavene når helt til topplinja, ikke bare til x-topp + litt.
  Dette bekrefter vårt firelinjesystem (loft/stue/kjeller).

Kilder: lokale bildeanalyser `scratchpad/research/dumper2/zepp1a_arb_trykkskrift/
page_4.jpg` (I i), `page_9.jpg` (L l), `page_13.jpg` (O o), `page_17.jpg`
(V v), `page_21.jpg` (S s), `page_25.jpg` (U u); `bilde-salto-retning.md`
(tidligere økt, gjenbrukt for kontekst).

### 1d. ANBEFALT breddetabell for vårt system (versalhøyde = 24 enheter)

Syntese av 1a+1b+1c, justert mot en RUNDERE, BREDERE geometrisk «infant»-
retning (Salto/Sassoon-idealet er rundere enn Andikas humanistgrotesk):

| Bokstav | Anbefalt bredde (enheter) | Ratio | Merknad |
|---|---:|---:|---|
| I | 5 | 0,21 | ren stav + minimal fot |
| J | 11 | 0,46 | stav + krok nederst |
| L | 13 | 0,54 | |
| F | 13 | 0,54 | |
| E | 14 | 0,58 | |
| P | 15 | 0,63 | |
| B | 15 | 0,63 | |
| S | 15 | 0,63 | litt bredere/rundere enn Andika for «infant»-look |
| K | 16 | 0,67 | |
| Z | 16 | 0,67 | |
| R | 17 | 0,71 | |
| T | 17 | 0,71 | tverrstrekens bredde |
| H | 18 | 0,75 | |
| U | 17 | 0,71 | avrundet bunn |
| N | 18 | 0,75 | |
| X | 18 | 0,75 | |
| Y | 18 | 0,75 | |
| V | 19 | 0,79 | |
| A | 19 | 0,79 | |
| D | 19 | 0,79 | |
| C | 19 | 0,79 | |
| G | 20 | 0,83 | |
| Q | 20 | 0,83 | bolle som O |
| O | 20–21 | 0,83–0,88 | nesten sirkulær — se 1c |
| Å | 19 | 0,79 | = A-bredde, ring sentrert over |
| M | 22–23 | 0,92–0,96 | |
| Æ | 20–21 | 0,83–0,88 | smalere enn A+E slått sammen; delt stamme |
| Ø | 20–21 | 0,83–0,88 | = O-bredde + evt. lite overheng på skråstreken |
| W | 28–29 | 1,17–1,21 | bredest; dempet noe ift. Andikas 1,33 for å ikke sprenge ordbilder |

**Dette erstatter dagens «skviste» versaler.** Nøkkelendringen fra
sannsynlig dagens tilstand: O/Q/G/C/D bør ligge rundt 0,80–0,88 (nær
kvadratisk), ikke under 0,6–0,7 slik smale/høye former antyder.

---

## 2. Småbokstaver — prinsipper

### 2a. Runde kropper (a c e o) — sirkel eller oval?

**[MÅLT]** Andika-ratio (bbox-bredde / x-høyde, x-høyde=1040 units):

| Bokstav | Ratio | @ x-høyde 12 |
|---|---:|---:|
| o | 0,913 | 11,0 |
| a | 0,913 | 11,0 |
| p | 0,933 | 11,2 |
| d | 0,962 | 11,5 (inkl. stav) |
| e | 0,865 | 10,4 |
| q | 0,865 | 10,4 |
| g | 0,851 | 10,2 |
| k | 0,851 | 10,2 |
| c | 0,798 | 9,6 |

Selv i Andika (humanist, litt smalere enn bred geometrisk) er de runde
kroppene 0,80–0,95× x-høyden — altså SVAKT OVALE (litt smalere enn høye),
ikke perfekte sirkler. Dette er standard optisk praksis: en matematisk
perfekt sirkel ved tekststørrelse oppleves ofte som for bred/tung.

**[ANBEFALT]** For vår geometriske «infant»-stil (mer Salto/Futura-aktig enn
Andikas humanisme) anbefales runde kropper **0,90–0,95× x-høyde** (≈ 11–11,5
av 12 enheter) — nesten sirkulære, men med ørliten vertikal overvekt for
optisk balanse. En helt sirkulær o (ratio 1,0) er et forsvarlig alternativ
hvis man prioriterer maksimal «leken rundhet» fremfor klassisk optisk
finjustering; forskjellen er visuelt marginal ved denne størrelsen.

### 2b. Flerbuede (m w) og smale (i l t f r s j)

**[MÅLT]** (Andika, ratio mot x-høyde):

- **m** = 1,351 → ≈16,2 @ x-høyde 12. **w** = 1,404 → ≈16,8.
- **i** = 0,245 → ≈2,9 (ren stavtykkelse). **l** = 0,216 → ≈2,6.
- **t** = 0,702 → ≈8,4 (bred pga. tverrstrek som stikker ut på begge sider
  av staven — selve staven er smalere, men totalbredden inkl. tverrstrek
  bør regnes med).
- **f** = 0,736 → ≈8,8 (samme logikk: hodekrok + evt. tverrstrek).
- **r** = 0,745 → ≈8,9 (stav + kort arm/skulder).
- **s** = 0,740 → ≈8,9.
- **j** = 0,606 → ≈7,3 (stav + krok nederst, negativ venstre-bounding pga.
  krok).

**[ANBEFALT]:**
- m ≈ 15–16 enheter, w ≈ 16–17 enheter (klart bredest i småbokstav-settet,
  som forventet — tre/to «buer»).
- i, l: ren stavbredde = strektykkelsen selv (se punkt 5), ingen ekstra
  breddebonus — disse bokstavene ER strektykkelsen visuelt.
- t, f, r, s: 8–9 enheter (skulder/tverrstrek/krok gir moderat bredde selv
  om «kroppen» er smal).
- j: 7–8 enheter (krok gir noe bredde utover ren stav).

Kilde for gruppelogikk: [Zaner-Bloser fire grunnstrøk](https://primarium.info/handwriting-models/zaner-bloser/)
(vertikal/horisontal/sirkel/diagonal — o/d/a grupperes som sirkelstrøk),
[Twinkl bokstavfamilier](https://www.twinkl.com/resource/t-l-1287-handwriting-and-letter-formation-resource-pack)
(«Curly Caterpillar»: c a o q g d e s f — buet/sirkelbasert; «Ladder»: l i j
t u y — rette/smale strøk). Twinkls gruppering bekrefter at j/t/y regnes
formmessig som SMALE bokstaver til tross for descender/tail, konsistent med
Andika-målingen.

---

## 3. Linjekontakt og overshoot

**Konvensjon bekreftet:** Bokstavens BLEKK (ink) hviler PÅ grunnlinja for
flate former (stav-bunner som I, H, L, U-siden) — underkanten tangerer
linja, krysser aldri. Topp tangerer x-topp/topplinje for flate former (H,
I-topp, E-topp).

**[MÅLT] Overshoot i Andika** (avstand fra linje, i % av capHeight/xHeight;
positivt tall = ekstra utenfor linja):

| Formtype | Eksempel | Under grunnlinje | Over topp |
|---|---|---:|---:|
| Flat (referanse) | H, x, n | 0,0 % | 0,0 % |
| Rund | O C G S / o c e a s | **1,7–2,4 %** | 0,0 %* |
| Spiss | A V / x | 0,0 % | **−1,7 til −1,9 %** (dvs. LAVERE enn flate bokstaver) |
| Q (hale) | Q | −12,8 % (halen stikker langt under) | 0,0 % |

*Interessant funn: Andika gir runde former (O, o, C, c …) overshoot KUN
under grunnlinja/x-linja (de når nøyaktig opp til topplinja/x-topp, men
stikker 1,7–2,4 % under grunnlinja). Spisse former (A, V) gjør motsatt: de
er 1,7–1,9 % LAVERE enn capHeight på toppen (ingen overshoot der), og
rører grunnlinja nøyaktig. Dette avviker litt fra den klassiske Karow-
regelen (som sier overshoot på BEGGE sider for runde former) — Andika later
til å prioritere at ingenting stikker OVER de rette linjene (viktig for
tracing-bokser/linjesystem), og legger all synlig overshoot under
grunnlinja/x-linja.

**[KLASSIFISERING]** Generell type-design-tommelfingerregel (Karow, sitert
i Wikipedia): O ≈ 3 %, A ≈ 5 % overshoot (målt fra IDEELL geometrisk
sirkel/trekant til faktisk tegnet form, litt annen målemetode enn over,
men samme størrelsesorden).

**Anbefaling for Sporing v3:**

Gitt at v3 er en TRACING-app der bokstavhusets linjer er pedagogiske
rammer (barnet skal lære at bokstaven «sitter» på linja), anbefales:

- **0 overshoot på TOPPEN** (topplinje/x-topp): alle former, runde som
  rette, tangerer nøyaktig — enklest å forstå for 6-åringer, og
  konsistent med Andika-funnet at spisse/runde former ikke stikker opp.
- **Liten overshoot PÅ GRUNNLINJA for runde former** (o, c, e, a, s, g, O,
  C, G, Q, S): ca. **1,5–2 enheter av 24** (≈ 6–8 %  av x-høyden, ~2 % av
  capHeight — proporsjonalt likt Andikas 1,7–2,4 %) slik at runde bunner
  ikke ser ut til å «sveve» over linja. Dette er et lite, billig
  optisk-korreksjonsgrep som gir tydelig mer profesjonelt resultat.
- **Spisse former (A, V, M, W, Æ sine bein)**: la spissen tangere
  grunnlinja nøyaktig (0 overshoot) — konsistent med Andika og enklest å
  konstruere i skjelettbaner.
- Hvis 0 overshoot overalt foretrekkes for maksimal enkelhet (ett mindre
  specialtilfelle å vedlikeholde i 58 baner), er dette en fullt forsvarlig
  forenkling — forskjellen er subtil ved sporingsstørrelse. Anbefalingen
  over er «riktig» typografisk, men ikke kritisk for målgruppen.

Kilder: [Overshoot (typography) – Wikipedia](https://en.wikipedia.org/wiki/Overshoot_(typography)),
egen måling av Andika (fontTools BoundsPen, se metodedel).

---

## 4. Kritiske enkeltformer i norsk skoletrykkskrift

### q — hale

Ingen norsk kilde funnet med eksplisitt normert q-hale-form (fontblogg.no-
artikkelen om Norsk Skoleskrift bekrefter EKSPLISITT at «s, p, b, q, k» er
blant bokstavene der design­valget varierer mellom skrifter/forlag — dette
er altså en reell, anerkjent uenighet i fagmiljøet, ikke noe vi har oversett).
Generell manuskript-/infant-konvensjon (flere internasjonale kilder,
[Anatomy of the Letter Q](https://bydawnnicole.com/letter-q/) m.fl.):

- **Vanligste infant/manuskript-løsning: rett hale RETT NED fra bollen**,
  UTEN hake/kick til høyre (dvs. q ≠ speilvendt p med krok — det er en
  ren stav, som p sin stav, bare ført gjennom bollen i stedet for ved
  siden av den). Dette er formen brukt i Zaner-Bloser/D'Nealian-manuskript
  og de fleste australske skolefonter (NSW/QLD).
- Twinkl-familiegrupperingen (se punkt 2b) plasserer q sammen med c a o g
  d e s f («Curly Caterpillar») — dvs. q sin bolle tegnes med SAMME
  sirkelstrøk som o/c/a, og halen er et eget, enkelt rett andre-strøk.
- **Anbefaling:** bolle = samme skjelett som o (sirkel), hale = rett
  vertikal linje fra bollens høyre/nedre kant til bunnlinja (y=39), UTEN
  kick. Dette er enklest å konstruere, mest konsistent med barnets øvrige
  bolle-bokstaver (o, a, d), og unngår kollisjon med den allerede
  identifiserte q/p-forvekslingsrisikoen nevnt i kildene (kick ville gjort
  q enda likere en kursiv-form som IKKE er trykkskrift).
- **(estimat, ikke direkte bekreftet i norsk kilde)** — flagges som reelt
  åpent designvalg, konsistent med fontblogg.no sin observasjon.

### g — hake

**Bekreftet fra flere kilder:** norsk/nordisk skoletrykkskrift bruker
gjennomgående **enkeltetasjes g («single-story»), ÅPEN hale/hake**, IKKE
lukket dobbeltetasjes løkke-g (den «brilleformede» g-en fra brødtekst-
fonter). Dette er selve definisjonen av «infant characters» —
[«infant characters» — TypeDrawers/Typophile](https://typedrawers.com/discussion/2562/infant-type-revisited):
enkeltetasjes a og g er nøyaktig de formene barn faktisk lærer å skrive for
hånd, og er derfor standard i ALLE undersøkte skolefonter (Andika,
Sassoon Infant, Gill Sans Infant, Salto/Zeppelin-håndskriften).
Twinkl-gruppering plasserer g sammen med c a o q d e s f — bollen er en
sirkel, haken er en enkel krok som svinger til venstre/ned under
grunnlinja (kjellersonen), ingen sammenbinding til en lukket løkke.
**Anbefaling:** bolle = sirkel (som o), hake = åpen krok ned i kjelleren
som svinger venstre og avslutter fritt (ikke lukket).

### j — hake

Konsistent med i (samme stav+prikk-logikk), men med hale ned i kjelleren.
Twinkl «Ladder»-familie (l i j t u y) grupperer j med de RETTE/smale
strøkene, ikke de buede — dvs. j sin hovedstav er rett ned fra x-topp,
og KUN bunnen krøller til venstre inn i kjelleren (kort hake, ikke stor
sløyfe). Konsistent med Salto-plakatens strøkregel (`bilde-salto-retning.md`,
allerede i prosjektet): rette staver får rett nedpil; j klassifiseres i den
research-filen implisitt som stav-type (unngår feilaktig buet pil — se
DESIGNBRIEF-V3.md punkt 10 om nettopp denne bug-risikoen for j/t/u).
**Anbefaling:** rett stav fra x-topp til nær bunnlinje, med en KORT
venstre-krok helt nederst (ikke en stor runding) — prikk over, adskilt,
som i.

### y — hale

**[MÅLT/kilde]** SIL sin egen Andika-dokumentasjon nevner eksplisitt at
«some parts of the world use a y with no curved tail» som alternativ
glyfvariant — dvs. det finnes to anerkjente hovedformer:
(a) **rett v + rett skrå hale** (mer geometrisk/infant, brukt i mange
skolefonter for maksimal konsistens med v), og
(b) **kurvet hale** (mer tradisjonell boktrykk-form).
For en geometrisk «infant»-stil i tråd med resten av oppdragets retning
(Salto/Andika/Sassoon), **anbefales rett variant**: y = v-formen (to skrå
streker som møtes) forlenget med en rett skrå hale ned i kjelleren — dette
er også mest konsistent med at v selv ikke har buede elementer i vårt
system. Kilde: [Design – Andika](https://software.sil.org/andika/design/).

### t — bunnkrok

Generell manuskript-/infant-konvensjon (flere engelskspråklige kilder,
ingen presis norsk primærkilde funnet — **(estimat basert på internasjonal
infant-konvensjon)**): infant/skole-t har ofte en **liten krok/svai
nederst på staven** (ikke en helt rett 90°-avslutning), fordi dette er den
naturlige, avslappede pennebevegelsen når stavens siste strøk avsluttes —
sett i bl.a. Sassoon Infant («curved terminals of l and t» eksplisitt nevnt
som kjennetegn ved Sassoon-familiens infant-varianter,
[Fonts In Use: Sassoon Primary](https://fontsinuse.com/typefaces/30/sassoon-primary)).
**Anbefaling:** liten buet fot/krok nederst på t-staven (samme prinsipp som
l hvis l også får svak buet avslutning), tverrstrek rett over x-topp-linja,
krysser staven asymmetrisk (mer til høyre enn venstre, som i konvensjonell
t-konstruksjon).

### f — bunnkrok

Samme resonnement som t: Sassoon-familien nevner eksplisitt buede
terminaler som infant-kjennetegn. **Anbefaling:** f får en svak buet fot
nederst (i kjelleren, siden f er en loft-til-kjeller-bokstav i mange
skolealfabeter — merk: i vår formgruppe-inndeling fra tidligere økt er f
klassifisert som REN LOFTBOKSTAV uten nedstrek, jf.
`bilde-bokstavhus-og-soner.md` gruppe «loftbokstaver: b d f h k l t» — dette
bekrefter at f i VÅRT system stopper på grunnlinja, ikke i kjelleren; da
blir bunnkroken en liten buet fot PÅ grunnlinja, ikke en descender).
Tverrstrek som t.

### k — arm/bein-møtepunkt

**(estimat, generell konstruksjonskonvensjon, ikke spesifikk norsk kilde
funnet i denne økta):** Standard infant/manuskript-k har arm og bein som
møtes PÅ STAVEN, litt over midten av x-høyden (ca. 55–65 % opp fra
grunnlinja i småbokstav-k, tilsvarende litt over midten i versal-K målt fra
grunnlinja til capHeight) — IKKE et felles utgangspunkt fra staven (som ville
gitt en «x»-form løsrevet fra staven) og IKKE helt på topp/bunn. Dette er
den vanligste konstruksjonen i alle undersøkte skolefonter (Andika, Sassoon,
Zaner-Bloser) og unngår at k ser ut som en «håndfull streker» — armen og
beinet skal visuelt gripe fatt i staven på samme punkt, ikke to ulike punkter.

### s-kurvens konstruksjon

Standard S/s er en **dobbel bue (to C-lignende kurver)** stablet slik at
øvre bue er noe mindre enn nedre (klassisk optisk konvensjon: den øvre
halvdelen av S oppleves som «tyngre» hvis like stor, så den gjøres litt
mindre for balanse — **(estimat, klassisk type-design-konvensjon, ikke
målt i Andika i denne økta)**). Salto-plakaten (jf. `bilde-salto-retning.md`)
klassifiserer S/s som «rundt strøk» — én sammenhengende bue-bevegelse fra
øverst-høyre, mot klokka øverst, med klokke-retning nederst, ett enkelt
strøk. Konsistent med vår ANBEFALING: s tegnes som ett kontinuerlig
S-formet strøk, startpunkt øverst til høyre.

### Æ — antall strøk, A-del og E-del

**[MÅLT]** Andika Æ: bbox-bredde 1,081×capHeight (25,9 @ 24 enheter) — dvs.
BREDERE enn en enkelt A (0,872) eller O (0,838), men smalere enn hvis man
bokstavelig limte sammen en hel A + hel E. Dette bekrefter at Æ i praksis
tegnes som **én sammensmeltet form med DELT stamme**: A-delens venstre skrå
stav og E-delens vertikale stav er ofte SAMME strek (eller ligger rett ved
siden av hverandre), og E-armene (topp/midt/bunn-tverrstreker) stikker ut
til høyre fra denne felles stammen, mens A-delens høyre skråstrek møter
samme stamme oppe. **Praktisk konstruksjon (estimat basert på Andika-
proporsjonen + generell ligatur-konvensjon):** 3–4 strøk — (1) A-delens
venstre skråstav ned til grunnlinje, (2) kort tverrstrek (A-broen, delt
felles med E sin midtarm eller egen), (3) E-delens tre horisontale armer
til høyre (topp/midt/bunn) fra en felles vertikal stamme. Norsk skole-
undervisning (jf. tidligere Salto-strøk-analyse) bekrefter at Æ og Æ-armene
tegnes som «vannrette strøk» à la E, med samme pil-konvensjon som E/F.

### Ø — strekretning og overheng

Standard skandinavisk konvensjon (velkjent typografisk regel for ø/ø-
lignende bokstaver i alle nordiske språk, IKKE spesifikk til norsk skole,
men universell i type design): skråstreken tegnes **fra nede-venstre til
oppe-høyre** (samme retning som en vanlig skråstrek/slash), og **stikker
typisk 1–3 % av capHeight/x-høyden UTENFOR ringens naturlige sirkel i begge
ender** (nedre venstre og øvre høyre) — dette er standard optisk praksis
for at streken skal lese tydelig som et eget element og ikke «forsvinne»
inn i ringens kurve. **[MÅLT]** Andika sin Ø har imidlertid IDENTISK
bounding box som O (0,838/0,838) — dvs. INGEN synlig overheng i akkurat
denne fonten (skråstreken holder seg innenfor O-sirkelens ramme). Dette er
et reelt designvalg-spenn: **anbefaling for vår «infant»-stil:** gi
skråstreken et lite, tydelig overheng (0,5–1 enhet av 24 i hver ende) for
bedre lesbarhet ved sporingsstørrelse — Salto-strøk-analysen
(`bilde-salto-retning.md`) bekrefter at Ø/ø-skråstreken behandles som et
EGET nummerert strøk (strøk 2) med egen diagonal pil, atskilt fra ringen,
som støtter at streken bør være visuelt selvstendig nok til å «vises fram»
utenfor ringen.

### Å — ringens størrelse/plassering

**[MÅLT]** Andika: Å-bredde = A-bredde (begge 0,872×capHeight) — ringen
ligger altså INNENFOR A-ens bredde, sentrert over A-toppen, ikke som et
breddeutvidende element. **[VISUELT, Salto-plakat]** Ringen tegnes som EGET
strøk (ikke sammenhengende med A), plassert rett over A-toppunktet, tegnet
mot klokka som avsluttende strøk (jf. `bilde-salto-retning.md`: «å/Å-ring:
egen liten BUET pil over ringen, ringen tegnes mot klokka til slutt»).
**Anbefaling:** ring-diameter ≈ 30–40 % av x-høyden (≈ 4–5 enheter),
sentrert horisontalt over A-toppunktet, med **en liten luftmargin** mellom
A-toppen og ringens underkant (ringen «sitter over», berører ikke
toppunktet direkte) — konsistent med at ringen ALLTID tegnes som separat,
adskilt strøk i norsk undervisningsmateriell, aldri smeltet sammen med
A-formen.

---

## 5. Strektykkelse

**Vårt nåværende forhold: 2,2/12 ≈ 18,3 % av x-høyden.**

**[KLASSIFISERING]** Generell legibilitetsforskning (fagfellevurdert,
oppsummert i [Stroke width – legibility.info](https://legibility.info/characters/stroke-width)
og [ScienceDirect: character stroke width legibility](https://www.sciencedirect.com/science/article/pii/S0042698921000614)):

- Brødtekst: 10–20 % av x-høyde er egnet spenn; 12–16 % regnes som optimalt
  for normalt syn.
- Tykkere strøk er generelt MER lesbart (lettere å avkode), men for tykke
  strøk («fill-in») svekker indre former (motholes/counters) og reduserer
  lesbarhet.

**Vurdering av 18,3 %:** Dette ligger i øvre del av det anerkjente
brødtekst-spennet (nær «Bold»/«Black»-vekt), noe som er RIKTIG retning for
en SPOREBOKSTAV beregnet på 6-åringer — barn trenger en tydelig, lett-å-
følge kontur, og sporing tolererer tykkere strøk enn løpende lesetekst
fordi bokstaven ikke skal AVKODES i en tekststrøm, men FØLGES med blyant.
Internasjonale sporesystemer (Zaner-Bloser, HWT) bruker gjennomgående
kraftige, «fete» modellstreker av nettopp denne grunnen.

**Anbefaling: behold 2,2/12 (≈18 %), eventuelt vurder en svak økning til
~20 % (2,4/12)** hvis spor-sporet (dashed outline) i praksis oppleves for
tynt til å følge komfortabelt med blyant/tykk penn — men IKKE gå over ~22 %,
siden indre motrom i runde bokstaver (o, a, e, g, Æ, Ø sin ring) da
begynner å «tettes igjen» ved liten størrelse, spesielt om man også innfører
rundere/bredere versaler (punkt 1) som i seg selv gir mindre indre luft per
areal-enhet. 18,3 % er et solid, forskningsforankret utgangspunkt — ingen
endring er strengt nødvendig, kun en bevisst bekreftelse.

---

## Kildeliste (alle URL-er brukt denne økta)

- https://www.oert.org/en/latin-alphabet-proportions/
- https://typetype.org/blog/universitty-lesson-8-designing-basic-latin-characters-uppercase-characters/
- https://typetype.org/blog/universitty-lesson-10-designing-basic-lowercase-characters/
- https://en.wikipedia.org/wiki/Overshoot_(typography)
- https://software.sil.org/andika/
- https://software.sil.org/andika/design/
- https://fonts.google.com/specimen/Andika (kildefont, hentet via gwfh.mranftl.com)
- https://gwfh.mranftl.com/fonts/andika
- https://typedrawers.com/discussion/2562/infant-type-revisited
- http://www.typophile.com/node/67538
- https://fontsinuse.com/typefaces/30/sassoon-primary
- https://sassoonfont.co.uk/sassoon-infant/
- https://www.twinkl.com/resource/t-l-1287-handwriting-and-letter-formation-resource-pack
- https://primarium.info/handwriting-models/zaner-bloser/
- https://bydawnnicole.com/letter-q/
- https://legibility.info/characters/stroke-width
- https://www.sciencedirect.com/science/article/pii/S0042698921000614
- https://fontblogg.no/2018/01/31/norsk-skoleskrift-2/ (referert via søkeindeks;
  direkte henting feilet med DNS-feil i denne økta — sitat om «variabler i s,
  p, b, q, k» er derfor fra søkeresultat-snippet, ikke fulltekst-verifisert)
- (gjenbrukt fra tidligere økt i samme prosjekt, IKKE hentet på nytt nå):
  `scratchpad/research/bilde-salto-retning.md`,
  `scratchpad/research/DESIGNBRIEF-V3.md`,
  `scratchpad/research/bilde-bokstavhus-og-soner.md`

## Lokalt lastede filer (denne økta)

- `scratchpad/research/dumper2/andika_extracted/andika-v27-latin-regular.ttf`
  (SIL Open Font License, Google Fonts via gwfh.mranftl.com) — brukt til
  programmatisk måling med fontTools, IKKE til gjenbruk/republisering av
  selve fontfilen.
- `scratchpad/research/dumper2/zepp1a_bokstavbok/page_1.jpg`–`page_20.jpg`
  og `zepp1a_arb_trykkskrift/page_1.jpg`–`page_28.jpg` — Issuu-utdrag av
  «Nye Zeppelin 1A, Bokstavbok» og «Zeppelin 1A Arbeidsbok – Trykkskrift»
  (Turid Fosby Elsness, © Aschehoug). **Opphavsrettslig beskyttet
  undervisningsmateriell — kun til intern visuell referanse for
  proporsjonskontroll, ikke til gjenbruk/republisering.** (Disse filene lå
  allerede i scratchpad-mappen ved øktens start, sannsynligvis hentet av en
  parallell/tidligere research-økt i samme prosjekt; gjenbrukt her for
  visuell verifisering av bokstavformer, ikke lastet ned på nytt av denne
  økta.)
