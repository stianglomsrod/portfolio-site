# Bildeanalyse: Kaleido-oppslag + gradueringsreferanser (Sporing v3)

Analysert 2026-07-17 for Sporing-verktøyet (stianglomsrod.no/sandbox/sporing).
Metode: Read av PNG-ene + crop/oppskalering (System.Drawing) av nøkkelområder
for å telle linjer og se veiledningsmerker. Zoom-croppene ligger i samme
scratchpad-mappe (`11-crop-topp-4x.png`, `11-crop-bunn-4x.png`,
`kaleido-boks-crop-3x.png`, `kaleido-tomboks-crop-7x.png`).

Analyserte filer:

- `overlevering-sporing/research-dumper/kaleido-oppslag-2.png` (Issuu s. 4–5)
- `overlevering-sporing/research-dumper/kaleido-oppslag-4.png` (Issuu s. 8–9, bokside 6–7)
- `overlevering-sporing/research-dumper/kaleido-oppslag-6.png` (Issuu s. 12–13, bokside 10–11)
- `overlevering-sporing/stians-referansebilder/10-handwriting-practice-prikkede.png`
- `overlevering-sporing/stians-referansebilder/11-Mm-ark-retning-inni-modellen.png`

---

## 1. Kaleido skriftforming (Cappelen Damm) — didaktikken i lærersiden (oppslag 2)

Skjermbildet viser kolofon + siden «Til lærere og foresatte» fra Issuu-dokumentet
«Kaleido skriftforming Stavskrift A (utdrag)», publisert 20.08.2018 av Cappelen
Damm. Kolofon: © Cappelen Damm AS, Oslo, 2018 · Illustrasjoner: Solveig Lid Ball ·
Håndskrift: Tone Goberg · ISBN 978-82-02-45311-4 · www.cdu.no.

**Viktig forbehold:** Selv om Issuu-tittelen sier «Stavskrift A», omtaler
lærersiden «innlæringen av sammenhengende håndskrift», og skriveprøvene i
oppslag 4/6 er tydelig løkkeskrift med bindinger. Utdraget viser altså
sammenhengende-skrift-bindet i serien (eller gjenbrukt intro). Layoutsystemet
(bokser, linjefarger, modell→tom-graduering) er uansett seriegjennomgående og
er det overførbare.

Nøkkelpunkter fra lærerteksten (parafrasert):

1. **Startpunkt og skriveretning vises av den voksne, ikke av trykte merker.**
   «Elevene trenger at læreren eller foresatte viser riktig startpunkt og
   skriveretning for bokstavene, og at dette repeteres med jevne mellomrom.»
   Boka trykker ALTSÅ INGEN piler, prikker eller tall på selve øvingssidene —
   retningsopplæringen er delegert til demonstrasjon, og modellteksten står
   helt ren.
2. **Kopiering under modellen er hovedmetoden:** Elevene skal «kopiere»
   teksten ved å skrive den inn i bokstavhuset UNDER teksten. Begrunnelsen er
   eksplisitt: da kan eleven se modellteksten mens de skriver — «både for
   venstre- og høyrehendte elever» (en modell til venstre på samme linje
   dekkes av hånden til venstrehendte; modell på egen linje over løser dette).
3. **Sporing oppå modellen er et frivillig FORTRINN, ikke hovedløypa:»
   «Eleven kan også starte med å spore oppå teksten, som en forøving til egen
   skriving.» Sporing er altså trinn 0, kopiering er trinn 1.
4. Boka starter med **introduserende bevegelsesøvelser** (grunnleggende
   skrivebevegelser) før bokstaver/ord; deretter de første enkle ordene; hver
   bokstav får to sider (én for små bokstaver, én som inkluderer store).
5. Lærer/foresatt skal også følge med på blyantgrep og sittestilling.
6. **Forskriften er håndskrevet** (Tone Goberg): «Forskriften i denne boka er
   skrevet for hånd, så det forekommer noen ujevnheter.» Forlaget velger bevisst
   levende håndskrift som modell fremfor perfekt fontgeometri.

## 2. Kaleido — layoutsystemet (oppslag 4, bokside 6–7: bevegelsesøvelser)

Sideoppbygging per side:

- Øverst: én liten akvarell-illustrasjon (epler i kurv / votter) — kun
  motivasjon/tema, ingen instruksjonsfunksjon. Eneste dekor på siden.
- Deretter **6 skrivebokser per side i 3 par**: én boks med full modellrad +
  én HELT TOM identisk boks rett under. Vertikal luft (tydelig mellomrom)
  mellom hvert par. Ingen overskrifter, ingen tekst, ingen nummerering av
  øvelsene.

Boksen («bokstavhuset») — verifisert i 7x-zoom av tom boks:

- **Innrammet rektangel med 4 skrivelinjer**: topplinje, x-topplinje,
  grunnlinje, bunnlinje. Rammens venstre/høyre kant lukker boksen.
- **Alle linjer er tynn, lys turkis — UNNTATT grunnlinja, som er tydelig
  mørkere/mer mettet turkis.** Hierarki lages altså med metning/vekt i samme
  farge, ikke med ekstra farger (ingen rød grunnlinje, ingen flerfargesystem).
  Dette er en direkte overførbar «rolig» teknikk.
- Modellstrøkene står i mørk gråsvart håndskrift oppå de turkise linjene —
  høy kontrast modell mot lav-kontrast linjer, så bokstavformen alltid vinner
  visuelt.
- Boksene er i full spaltebredde og alle bokser på siden er like brede.

Modellradene (bevegelsesmønstre: løkke-l, løkke-e, buet i/u, prikket i;
u-buer, c-buer, småbølger, åttetallsløkker):

- Mønsteret skrives i **grupper på 3 like elementer** («lll»), med tydelig
  gruppemellomrom (ca. én gruppebredde luft), **7 grupper per rad** — radene
  fylles helt ut.
- **Ingen veiledningsmerker overhodet** i modellradene: ingen startprikk,
  ingen pil, ingen tall. Gruppering + luft er den eneste «pedagogikken» som
  er trykket.

## 3. Kaleido — første ord (oppslag 6, bokside 10–11)

Samme system uendret når ordene kommer:

- Venstre side: leie (×8 per rad), ull (×7), lue (×8), lulle (×5).
  Høyre side: alle (×6), aiai (×6), alene (×5), lalle (×5).
- **Repetisjonstallet er ikke et pedagogisk tall — raden fylles bare til
  spaltebredden**; kortere ord gir flere repetisjoner. Jevn luft mellom hver
  ordforekomst.
- Fortsatt modellboks → tom boks (1:1), fortsatt null trykte
  veiledningsmerker, fortsatt én illustrasjon øverst (bamse med garnnøste /
  katt med garnnøste — tematisk knyttet til ordene: ull, lue, leie).
- Gradueringen over sider: bevegelsesmønstre (s. 6–7) → korte ord (s. 10–11).
  Innenfor sida: modell → tom. Sporing-oppå er alltid tilgjengelig som
  forøving (jf. lærersiden), men aldri trykket som egen «sporerad».

## 4. Bilde 10 — prikket alfabetark («Harry's Handwriting Practice»)

Personalisert A4-/US Letter-ark («Digital file — I personalise, you print»,
typisk Etsy-produkt; ingen kjent URL, ukjent selger). Britisk precursive
skriftstil (små bokstaver med inngangs-/utgangskroker, løkke-f).

- **Bokstavsporet av runde prikker er den ENESTE veiledningen.** Ingen piler,
  ingen tall, ingen fargede startprikker — hele alfabetet Aa–Zz + 0–9 i
  prikkede konturer.
- Linjesystem: 3 linjer per rad — heltrukket topplinje, STIPLET midtlinje
  (x-høyde), heltrukket grunnlinje. Ingen egen underlengdelinje; underlengder
  henger ned i lufta mellom radene.
- 5–6 bokstavpar per rad, raus luft mellom parene og mellom radene. Ett lite
  fargeikon (eple over Aa osv.) over hver bokstav — lydknagg/tema, plassert
  OVER skrivelinja så det aldri kolliderer med bokstaven.
- Personalisering som engasjementsgrep: barnets navn øverst, selv satt i
  prikkede sporbokstaver på gul stripe — navnet er første sporeøvelse.
- Ingen graduering på arket (alt er sporing, ingen tomme felt) — roen kommer
  fra én repetisjon per bokstav + mye luft, ikke fra progresjon.

## 5. Bilde 11 — retning INNI konturbokstav (Mm-ark)

Foto av masseprodusert engelskspråklig sporebok («Mm is for mouse», ukjent
forlag). Dette er referansen for «retning inni modellen» — verifisert i
4x-zoom:

Den store modellen øverst (én stor M + én stor m):

- Bokstaven er tegnet som **hul konturbokstav** (to parallelle konturer som
  danner en åpen kanal, avrundede ender).
- **Inni kanalen løper en prikket/stiplet midtbane** som viser strøkbanen.
- **Fylte svarte prikker markerer startpunktet for hvert strøk** (M: prikk
  øverst på hvert nedstrøk; m: prikk øverst på stammen).
- **Små pilspisser på midtbanen viser retningen** (nedover langs stammene).
  Ingen strøknummer på denne utgaven — bare prikk + bane + pilspiss.
- Dette fungerer visuelt fordi bokstaven er STOR og TOM: veiledningen ligger
  i den hvite kanalen og konkurrerer aldri med en fylt strek. Det er samme
  prinsipp i negativ: veiledning og bokstavstrøk deler aldri blekk.

Avgjørende bruksregel observert: **retning-inni brukes KUN én gang — på den
store displaymodellen øverst.** Alle øvingsradene under er stiplede bokstaver
UTEN prikker, piler eller tall.

Graduering nedover siden (verifisert i zoom av nederste rader):

1. Stor hul modell med full retningsveiledning (×1 per bokstavform).
2. Rader med stiplet stor M, tett satt (~10 per rad).
3. Rader med stiplet liten m, **færre og bredt spredt (~6 per rad) med
   lukerom mellom** — stiplet midtlinje løper videre i lukene, så eleven kan
   skrive egne bokstaver mellom modellene (spor én – skriv én).
4. Ingen helt tomme rader på siden.

Linjesystem: 3 linjer (heltrukket topp, stiplet midt, heltrukket grunn) i
svart/grått. **Siden er ellers det travle moteksemplet:** 10+ tettpakkede
rader, minimal luft, stiplet rammebord rundt alt — nøyaktig det «busy»
Stian vil bort fra, med unntak av topmodell-behandlingen som er verdt å låne.

## 6. Syntese — implikasjoner for Sporing v3

1. **Flytt veiledningen til ÉN stor «slik gjør du»-modell per bokstav**
   (Salto/bilde 11-prinsippet): stor bokstav med startprikk, buet retningsbane
   og pilspiss — og la alle sporeradene stå rene (kun stiplet/prikket spor).
   Både Kaleido og bilde 11 slipper veiledningen etter modellen; ingen av dem
   gjentar piler på øvingsrader.
2. **To gyldige plasseringer av retningsveiledning:** (a) UTENFOR bokstavformen
   ved fylt/solid modell (Salto-plakaten, Stians mål), eller (b) INNI en hul
   konturbokstav som prikket midtbane + startprikk + pilspiss (bilde 11).
   Felles regel: veiledning og bokstavstrøk deler aldri samme strek — enten
   utenfor formen eller inne i en tom kanal.
3. **Kaleido-gradueringen er radpar:** full modellrad → helt tom identisk rad,
   med sporing-oppå som frivillig forøving. Kopiering skjer på egen linje
   UNDER modellen (uttalt venstrehendt-argument: modell til venstre på samme
   linje dekkes av hånden). Sporing v3 bør ha modellen over/først, aldri bare
   til venstre på samme skrivelinje.
4. **Repetisjon i grupper med luft:** Kaleido setter elementer i grupper på 3
   med ca. én gruppebredde luft, 7 grupper per rad; ord gjentas til raden er
   full (5–8 ganger). Gruppering + luft er det som gjør fulle rader rolige.
5. **Linjehierarki med én farge:** alle hjelpelinjer tynn lys turkis, kun
   grunnlinja mørkere/mer mettet. Rammet boks (bokstavhus) med lik bredde for
   alle rader. Lav kontrast på linjer, høy kontrast på bokstav.
6. **Spor én – skriv én:** bilde 11s nederste rader (spredte stiplede modeller
   med luker imellom) er en mellomtrapp mellom «spor alt» og «tom rad» som
   Sporing v3 kan tilby som gradueringstrinn.
7. **Én illustrasjon/lydknagg, plassert utenfor skrivefeltet** (Kaleido: én
   akvarell øverst; bilde 10: mini-ikon over linja). Aldri dekor inne i
   skrivelinjene.
8. **Levende, håndskrevet modell er et forlagsvalg** (Kaleido: håndskrevet
   forskrift med innrømmede ujevnheter) — perfeksjon i modellen er ikke et
   krav fra proffene; ro og konsistens er.

## 7. Kilder

- «Kaleido skriftforming Stavskrift A (utdrag)», Issuu, publisert 20.08.2018
  (utgiver Cappelen Damm; skjermbildene viser Issuu-viseren, s. 4–5, 8–9 og
  12–13 av 19). Søk på tittelen på issuu.com. NB: utdragssidene viser
  sammenhengende skrift — se forbehold i §1.
- Kolofon: © Cappelen Damm AS 2018 · Illustrasjoner Solveig Lid Ball ·
  Håndskrift Tone Goberg · ISBN 978-82-02-45311-4 · forlagsside www.cdu.no
  (Cappelen Damm Undervisning; Kaleido 1–2 skriftforming).
- Bilde 10: personalisert «Handwriting Practice»-ark, «Digital file — I
  personalise, you print — A4 or US Letter size» (Etsy-type produkt, ukjent
  selger/URL; lokal fil `10-handwriting-practice-prikkede.png`).
- Bilde 11: foto av engelskspråklig sporebok «Mm is for mouse» (ukjent
  forlag/URL; lokal fil `11-Mm-ark-retning-inni-modellen.png`).
- Zoom-crops generert under analysen ligger i
  `scratchpad/research/` (11-crop-topp-4x, 11-crop-bunn-4x,
  kaleido-boks-crop-3x, kaleido-tomboks-crop-7x).
