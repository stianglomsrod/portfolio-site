# Sporing v3 — designbrief for veiledningslaget

Samlet 17.07.2026 fra: 4 bildeanalyser (diagnose, Kaleido/graduering, bokstavhus/
soner, Salto-plakat), nettresearch (Aschehoug/didaktikk, stavskrift/løkkeskrift),
og validert i prototype-harness (alle 58 tegn rendret og inspisert). Denne
briefen er selvbærende — implementøren trenger ikke lese researchfilene.

## 1. Kjerneprinsipp (forskningsforankret)

**Veiledning og bokstavstrek deler ALDRI blekk.** Alle forlag og generatorer
(Salto, Kaleido, HWT, Zaner-Bloser, NSW/QLD, Grundschrift) plasserer piler og
tall i det HVITE utenfor bokstavformen. Dagens verktøys rotproblem er at pil/
prikk/tall ankres PÅ strøkbanen (start/55 %/slutt) → kollisjoner på a/g/å, Æ, K,
M (se diagnose). v3 snur ankringen: ett lite veiledningsglyf i det hvite nær
hvert strøks start.

Forskningsstøtte (Aschehoug/didaktikk-funn): startpunkt + skriveretning er
kjernespråket hos alle norske aktører; nummererte retningspiler + gjenkalling
ga best resultat for 1.-klassinger i risikosonen; kognitiv belastning taler for
minst mulig visuell støy oppå formen. LK20 vil ha FUNKSJONELL håndskrift, ikke
kalligrafisk perfeksjon → verktøyet skal veilede, ikke overvåke.

## 2. Fire pil-typer — piltypen følger strøktypen (Salto-fasit)

Verifisert bokstav-for-bokstav på Salto-alfabetplakaten (Stians bilde 12):

| Strøktype (fra banen) | Glyf | Plassering |
|---|---|---|
| Loddrett/skrå stav (første kommando `L`) | kort RETT pil, rotert etter starttangenten | hode like utenfor strøkstart, leder inn ovenfra |
| Rundt strøk (første kommando `A`/`C`) | kort BUET pil, buer mot klokka (hode peker venstre) | ~kl. 12 over toppen av bollen, i det hvite |
| Vannrett strøk | kort RETT pil → (starttangent er vannrett) | like til venstre for/over strøkstart |
| Diakritisk (å/Å-ring, ø/Ø-strek) | ring → egen liten buepil over ringen; strek → tall + kort diagonalpil | adskilt med luft over resten |

Nøkkel: **klassifiseringen leses av FØRSTE tegnekommando etter `M`**, ikke av om
banen inneholder en bue et sted (ellers får t, u, j, J feilaktig buepil på en
loddrett stav — verifisert bug, nå fikset i prototypen).

## 3. Startprikk og tall

- **Grønn startprikk (#1a8a3a)** kun på STRØK 1 (bokstavens aller første punkt).
  Etterfølgende strøk markeres av tallet, ikke av ny grønn prikk → mindre grønt
  rot (dagens versjon setter prikk på hvert strøk → dobbeltprikker på a/g/å).
- **Tall**: små, LØSE (ingen sirkel), kun på flerstrøksbokstaver, plassert i det
  hvite ved strøkstart, sammen med (ikke oppå) pilen. Font ~4,4 enheter,
  vekt 700, farge mørk skifer (#2c3e50).
- Per-bokstav-forskyvning (hint) for de få der auto-plassering klumper (a, b, d,
  g, p, q: bolle- og stavnummer nær hverandre → bolletall til venstre for
  buepilen, stavtall til høyre/over; k, R, m: 3. strøk starter inne → skyv
  tallet ut i venstremargen). ~25 hint-oppføringer totalt; billig for 58 tegn.

## 4. Farge og form på veiledningen

- Modellbokstaven er NØYTRAL SORT (#222) — beholdes fra 17.07 del 2. Fargen bor
  i veiledningen.
- Pilfarge: én varm, dempet retningsfarge (prototype: terrakotta #c0392b).
  Vurder mot sidens salvie-palett; skal lese tydelig på gul/rosa/blå soner OG på
  hvitt (store bokstaver uten fargebånd). AA-kontrast mot alle soner.
- Pil: strek 0,9, buet pil radius ~2,4, pilhode ~1,7×2,9. Rett pil lengde ~4,2.

## 5. Graduering over raden (Salto + Kaleido + bilde 11)

Modell (full veiledning) → øving → egenhånd. To skoler:
- **Forlagskonsensus** (Kaleido, bilde 11, Salto-plakat): veiledning KUN på
  modellen; alle øvingene er rene stiplede. Roligst.
- **Stians runde-3-ønske**: pil/tall utenfor på de 2–3 første øvingene, så
  egenhånd.

Kompromiss i v3 (prototypen): modell = full veiledning; øving 1–2 = KUN grønn
startprikk (dus bro, ingen piler/tall); resten rene stiplede; siste del av rada
tom til egenskriving; valgfri helt tom øvelinje under. Dette gir en mykere
nedtrapping enn «alt eller ingenting» og holder øvingene rolige.
→ Gjør bro-nivået konfigurerbart så Stian kan velge «kun modell» vs «modell +
  bro» i panelet hvis ønskelig (lav kostnad).

## 6. Linjesystem, hus-ikon og størrelse

- Bokstavhus: 4 linjer, soner loft gul #FFF3C6 / stue rosa #FBE3EF / kjeller blå
  #DDEFF8 (kan slås av). Hierarki: grunnlinja mørkest/tykkest (Kaleido-teknikk),
  topp/x-topp lyse stiplede, bunn lysest. Sørg for at LINJESTIPLINGEN er tydelig
  svakere/annerledes enn sporebokstavenes stipling (diagnose A10: i dag samme
  visuelle språk → fletter i hverandre). Forslag: linjer prikket fint (1 0.8),
  sporebokstav dash grovere (3 2.6).
- Hus-ikon: bredt, lavt tak med takskjegg (bredere enn kroppen), ett per rad i
  venstremargen. Ikke gjenta per bokstav.
- **Størrelse**: dagens x-høyde ~7 mm på A4 er LAVERE enn alle internasjonale
  referanser (D'Nealian/Zaner-Bloser 12,7–19 mm; australske 8–24 mm for
  1.–2. trinn). Øk «stor»-størrelsen så x-høyden lander ~10–12 mm og loft-til-
  grunn ~18–22 mm. Sjekk at 6–8 rader fortsatt får plass på én A4-side.

## 7. Hva som FJERNES fra dagens design

- Pilspiss ved 55 % av strøket, oppå banen (diagnose A4). Erstattes av pil ved
  strøkstart, utenfor.
- Grønn prikk på hvert strøk (A1/A7). Kun strøk 1.
- Tall klistret på startprikken inne i formen (A1/A3/A5). Ut i det hvite.
- Veiledning (prikk/pil) på ALLE sporebokstaver (A9). Kun modell + evt. dus bro.
- Inkonsistent graduering mellom små- og store-ark (A9). Én regel.

## 8. Kollisjonsregler og print-minima

- Pilhode ≥ ~1,5 mm, tall ≥ ~2,5 mm på ferdig A4 (lesbart for lærer/elev).
- Programmatisk avstandsvakt i QA: mål at ingen veiledningsglyf-bokser
  overlapper bokstavstrøk/linjer/nabo (per alle 58 tegn + utvalgte ord).
- Fast høyremarg i raden så ingen bokstav kuttes (diagnose A11).

## 9. Skriftvarianter (Stians «hvis det lar seg gjøre»)

Fire norske skriftformer: trykkskrift (det verktøyet ER nå), formskrift
(historisk død), stavskrift (1962, sammenhengende u/løkker), løkkeskrift (m/
løkker). LK20 fjernet stilkravet, men Salto/Kaleido/Zeppelin selger fortsatt
stavskrift.

- **Stavskrift = realistisk å bygge**: inn-/utstrøk per strøk + lett fremover-
  skew + bruddliste for kjellerbokstaver. ~58 baneendringer, ingen ny
  arkitektur. Moderat kostnad, høy etterspørsel.
- **Løkkeskrift = dokumenteres som vei videre**: krever kontekstavhengig binding
  mellom tegn. Gjennomførbart HVIS alle baner forankres til ett felles inn-/
  utstrøkspunkt ved x-topp (VA/Schulausgangsschrift-prinsippet) → 1 generisk
  bindingskurve + 3–5 spesialregler, ikke 58×58 par. Vedta ankerpunkt-
  standardiseringen som prinsipp allerede nå.
- Anbefaling: bygg trykkskrift-v3 (denne briefen) FØRST og få den perfekt.
  Legg stavskrift som «skrivestil»-valg i panelet DERETTER (egen iterasjon).
  Ingen åpen norsk løkkeskrift-baneform finnes; hent formfasit fra Karstad/
  FOKUS-heftet + fullstendig Kaleido/Salto-eksemplar før baneteg­ning.

## 10. Åpne spørsmål / risiko

- Strøkretning/-rekkefølge i noen baner kan avvike fra norsk konvensjon (A/Å og
  M starter nede i dagens bane; T stav-først). Gjør en strøkretnings-audit mot
  Salto-plakaten som egen sjekk før/under implementasjon.
- Pilfarge vs. sidens palett (salvie) — velg én som ikke roper, men leser på
  alle soner.
- «Modell + bro» vs «kun modell»: la Stian se begge og velge.
- gyldendal-cappelen-researchagenten var ikke ferdig da briefen ble skrevet;
  fold inn ekstra Salto/Salaby-detaljer hvis den lander med noe nytt.
