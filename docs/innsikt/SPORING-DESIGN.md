# Sporing — designgrunnlag fra norsk skriftforming-didaktikk

> Research 17.07.2026 for ombygging av Sporing-verktøyet. Grunnlag: 8 skjermbilder
> fra Stian (alfabetplakater m/ piler, bokstavhus-ark, Teaching Funtastic-remser,
> H-sporingsark), egne skjermdumper i `docs/innsikt/sporing/` (Kaleido skriftforming
> Stavskrift A-utdrag, Teaching Funtastic-produkt), og tekstkilder.

## v3 (17.07.2026, del 4) — veiledningen UT av bokstaven

Stians funn etter v2: piler/tall oppå bokstavene ble «veldig busy og krangler
om plass, og gir ikke eleven trygghet». v3 flytter ALL retningsveiledning ut i
det hvite utenfor bokstavformen (Salto-konvensjonen), forankret i en ny
researchrunde mot Gyldendal (Salto/Salaby), Cappelen Damm (Kaleido stavskrift/
løkkeskrift), Aschehoug/Zeppelin og forskning (Lesesenteret, Skrivesenteret,
kognitiv belastning, faded guidance). Kjernefunn og full spesifikasjon i
`docs/innsikt/sporing/DESIGNBRIEF-V3.md`. Hovedpunkter, som er implementert:

- **Piltypen følger strøktypen** (lest av første tegnekommando i banen): rundt
  strøk → kort BUET pil over toppen (mot klokka); loddrett/skrå → kort RETT pil
  ved strøkstart, rotert etter starttangenten; vannrett → rett pil. Alt i det
  hvite utenfor bokstaven, aldri oppå streken.
- **Tall kun ved 3+ strøk** (Salto-ro: nummerer bare når det er reell
  tvetydighet). 2-strøks-bokstaver (a, b, d, g, p, q …) klarer seg med grønt
  startpunkt + piler. Løse tall, aldri i sirkel, i skiferfarge.
- **Grønt startpunkt kun på strøk 1** (ikke hvert strøk → ingen dobbeltprikker).
- **Veiledningsfarge = mørk skifer #3b4a59** (roligst; Stians valg). Modellen er
  fortsatt nøytralt sort; grønt startpunkt er eneste sterke farge.
- **Graduering**: modell (full veiledning) → 2 øvinger med KUN grønn startprikk
  (dus bro) → rene stiplede → tomrom til egenskriving.
- **Baneretting**: A/Å starter i toppspissen (to diagonaler ovenfra), M starter
  øverst til venstre — ikke lenger «1 nede i kjelleren».
- **viewBox** har fått luft over loftet (y ned til −7) så piler/tall ikke klippes.
- Skriftvarianter (stavskrift/løkkeskrift): utredet, se DESIGNBRIEF-V3 §9.
  Stavskrift er neste iterasjon; løkkeskrift dokumentert som vei videre.

Avsnittene under er v2-grunnlaget og gjelder fortsatt for bokstavhus, farger og
metodikk; v3 endrer kun veiledningslaget slik det er beskrevet over.

## Bokstavhuset (linjesystemet)

Fire linjer, tre etasjer — dette er standardrammen i norsk begynneropplæring:

| Etasje | Sone | Farge (vanlig) | Symbol | Bokstaver |
|---|---|---|---|---|
| **Loftet** | topplinje → x-topp | gul | sjiraff (lang hals) | b d f h k l t |
| **Stua** | x-topp → grunnlinje | rosa/lilla | skilpadde | a c e i m n o r s u v w x z æ ø å |
| **Kjelleren** | grunnlinje → bunnlinje | blå | apekatt (lang hale) | g j p q y |

- Huset tegnes ofte bokstavelig: **tak-trekant/hus-ikon til venstre** på linja
  (Stians bilde 5, Teaching Funtastic «Bokstavhuset» med tak og grønn bakke).
- å og æ/ø regnes som **stue-bokstaver** (ringen på å stikker opp, men kroppen bor
  i stua) — bekreftet av bokstavhus-plakatene (bilde 5 og 7).
- Terminologien «loft-, stue- og kjellerbokstaver» brukes ordrett i markedet
  (Teaching Funtastic-produktside).

## Farger og visuell støtte

- **Vokaler røde, konsonanter blå** — gjennomgående konvensjon (alfabetremser,
  bokstavplakater, undervisningsmetoder.com: «Vokaler har røde bokstaver og rød
  ramme, konsonanter har blå»).
- **Startpunkt** markeres med prikk (ofte grønn — «start på grønt») og **tall**
  når bokstaven har flere strøk (Stians bilde 3: H med ①②③).
- **Retningspiler** langs strøkene viser penneføringen (bilde 2: alfabetplakat med
  pil + tall per bokstav; kaleido.no viser skriveretning digitalt per bokstav).

## Metodikken (Kaleido skriftforming, lærerveiledningen — skjermdump)

Ordrett fra «Til lærere og foresatte»:
- «Elevene trenger at læreren eller foresatte viser **riktig startpunkt og
  skriveretning** for bokstavene»
- Eleven kan «starte med å **sporeskrive oppå** teksten» og deretter «skrive den
  inn i **bokstavhuset under** teksten»
- Oppslagene (dumper: kaleido-oppslag-4/6) viser mønsteret: **modellrad → tom
  øverad**, gjentatt nedover arket, i firelinjers bokser med lyseblå linjer.

## Skriveretningsregler (norsk konvensjon, stavskrift/trykkbokstaver)

- Bokstaver **starter øverst**; staver trekkes **ovenfra og ned**.
- **Rundinger tegnes mot klokka**, med start ca. kl. 1–2 (som c): gjelder a c d e g o q æ ø å.
- b og p: **stav først**, deretter bolle (med klokka).
- Prikkene på i og j settes **til slutt**.
- Flerstrøks-bokstaver nummereres i strøkrekkefølge.

## Designbeslutninger for Sporing v2

1. **Bokstavhus-linjesystem** i hver rad: 4 linjer, fargede soner (gul/rosa/blå,
   kan slås av for ren sort-hvitt-print), hus-ikon med tak til venstre.
2. **Skjelettbaner per bokstav** (`src/lib/bokstavbaner.ts`): hvert tegn = 1–3
   SVG-strøk i riktig rekkefølge og retning. Små a–å og store A–Å.
3. **Modellbokstav først på rada**: solid strek (vokal rød/konsonant blå, valgfritt
   sort), grønn startprikk per strøk, strøknummer når >1, pilspiss langs strøket
   (posisjon/vinkel beregnes med getPointAtLength — banene trenger bare riktig
   retning).
4. **Sporebokstaver etter modellen**: samme baner, stiplet grå.
5. **Tom øvelinje under** (valgfritt, som før) — Kaleido-mønsteret.
6. **Ordmodus** beholdes: ord settes med skjelettbanene, stiplet, med startprikker
   på første forekomst.

## Kilder

- Stians 8 skjermbilder (alfabetplakat m/piler, H-ark, bokstavhus-ark/plakat,
  alfabetremser, «Skriv bokstavene»-ark med fargede soner)
- `docs/innsikt/sporing/kaleido-*.png` — Kaleido skriftforming Stavskrift A
  (Cappelen Damm, Issuu-utdrag): lærerveiledning + oppslagsmønster
- `docs/innsikt/sporing/funtastic-bokstavhus.png` — «loft-, stue- og
  kjellerbokstaver», rosa/blå-varianter
- [Teaching Funtastic: Bokstavhus](https://teachingfuntastic.no/product/bokstavhus/) ·
  [Bokstavhuset – stave og skrive](https://teachingfuntastic.no/product/bokstavhus-stave-og-skrive/)
- [Malimo idébank: Skriftforming](https://idebank.malimo.no/skriftforming/) —
  håndskrift/stavskrift/løkkeskrift i bokstavhus; størrelse, rekkefølge, retning
- [undervisningsmetoder.com: Skriveopplæring](https://undervisningsmetoder.com/norsk/skriveopplaering/) —
  vokal rød/konsonant blå; [Introduksjon av ny bokstav](https://undervisningsmetoder.com/norsk/introduksjon-av-ny-bokstav/) —
  markere startpunkt, kaleido.no viser skriveretning
- [Lesesenteret (UiS): Spørsmål og svar om bokstavlæring](https://www.uis.no/nb/nasjonalt-lesesenter/forskning/sporsmal-og-svar-om-bokstavlaering-pa-forste-trinn) ·
  [Språkløyper: Bokstavlæring, bokstavforming og ordlesing](https://sprakloyper.uis.no/bruk-av-pakken-bokstavlaering-bokstavforming-og-ordlesing-og-bokstavproven)
- [Kaleido skriftforming Stavskrift A (utdrag, Issuu)](https://issuu.com/cdundervisning/docs/kaleido_skriftforming_stavskrift_a_)
