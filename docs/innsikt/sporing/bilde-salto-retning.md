# Salto-alfabetplakaten — retningsveiledning UTENFOR bokstaven (hovedreferanse)

Analysert 2026-07-17 av hovedagenten selv (inline), fra
`stians-referansebilder/12-salto-alfabetplakat-piler-utenfor.png` (782×450,
identisk med bilde 02). 4x-oppskalerte utsnitt i `research/salto-crops/`.
Dette er DEN kanoniske referansen for Stians krav «piler på utsiden, buet der
det gir mening». Plakaten: store + små bokstaver, vokal rød / konsonant blå,
tynne blå håndtegnede skrivelinjer (4-linjers hus antydet av rammen).

## Regelen: piltypen følger STRØKTYPEN, alltid i det hvite utenfor formen

| Strøktype | Pil | Plassering | Eksempler |
|---|---|---|---|
| **Loddrett stav** | kort RETT nedpil ↓ | rett over toppen av staven, i det hvite over strøkstart | A-bein(1), B/D/E/F/H/K/L/N/P/R/T-stav, b/d/h/k/l/p/r/t-stav, i/j |
| **Rundt strøk** | kort BUET pil, buer mot klokka (pilhode peker venstre) | ~kl. 12 over toppen av bollen/ringen, utenfor | C/G/O/Q/S, a/c/d/e/g/o/q/s-bolle, Ø/ø-ring, æ-bolle, å-bolle |
| **Vannrett strøk** | kort RETT pil → (v→h) | like over/ved streken | A-tverr, E/F-armer, e-startdrag, G-hake, H-tverr, t-tverr, z-strekene, Æ-armer |
| **Diagonal** | kort pil LANGS strøket | ved strøkstart, i strøkretning | v/w/x/y, A/M/N-diagonaler, K/k-armer, Ø/ø-skråstrek |

## Tall (rekkefølge)

- **Små, LØSE tall** (ingen sirkel rundt), plassert like ved START av hvert
  strøk, i det hvite UTENFOR bokstaven — aldri oppå streken.
- Kun på **flerstrøksbokstaver**. Enstrøks (o, c, s, l, C, O, S …) har bare pil.
- Konsistent: tallet står ved/over venstre for strøkstart, sammen med (ikke
  oppå) retningspilen. På E/F stables 1-2-3 nedover langs venstre side. På p:
  1 = stav (ned), 2 = bolle. På A: 1 = venstre bein (ned), 2 = høyre bein, 3 =
  tverrstrek.

## Diakritiske tegn (verifisert i rad4-crop: Ø ø Å å)

- **å/Å-ring**: egen liten BUET pil over ringen (ringen tegnes mot klokka til
  slutt) — helt adskilt fra bolle/stav-veiledningen under.
- **ø/Ø-skråstrek**: eget tall (2) + kort DIAGONAL pil (øverst-høyre → nederst-
  venstre) ved skråstrekens start, utenfor ringen.
- Ringen på Å og bollen på Ø deler ALDRI plass med de andre merkene — de er
  stablet vertikalt med luft.

## Verifisert bokstav-for-bokstav (utsnittene)

- **A** (rad1): «1» + kort nedpil ved venstre bein (nede-venstre, utenfor), kort
  → over tverrstreken. Bein tegnes ovenfra og ned.
- **a** (rad1): liten buet pil ~kl 12–1 over bollen, buer mot klokka. Ingen tall
  (bolle + stav starter samme sted → Salto viser bare pil, ikke to tall).
- **B/b** (rad1): kort nedpil ↓ over toppen av staven. b: bare nedpil.
- **O/o** (rad3): buet pil over toppen, mot klokka. Enstrøks → ingen tall.
- **P/p** (rad3): nedpil ↓ over staven; p har «1» (stav) + «2» (bolle) løst ved
  strøkstart, utenfor.
- **Q/q** (rad3): buet pil over ringen + «2» ved halen/skråstreken.
- **E/F** (rad1-hoyre): «1» + ↓ ved staven (øverst-venstre), «2» + → ved midtarm,
  «3» + → ved bunnarm (E). Tallene stables nedover venstre, utenfor.
- **e** (rad1-hoyre): buet pil ved e-ens start (drar inn og opp mot klokka),
  liten avsluttende buepil nederst. Utenfor.
- **f/g/G** (rad1-hoyre): buet pil over toppen (mot klokka), utenfor.
- **Ø/ø** (rad4): buepil over ringen + «2» og diagonalpil for skråstreken.
- **Å/å** (rad4): A/a-veiledning + egen liten buepil over ringen øverst.

## Konsekvenser for Sporing v3 (design)

1. **Ankringsmodellen snus:** i stedet for merker PÅ banen (start/55%/slutt),
   plasseres ETT lite veiledningsglyf i det hvite UTENFOR hvert strøk, nær
   strøkstart. Vår skjelettbane gir oss startpunkt + starttangent + strøktype
   (arc/curve i `d` → buet; ellers rett) automatisk; resten er per-strøk-hint
   for de få vanskelige (å-ring, ø-strek, tall-stabling på E/F/Æ).
2. **Tre pil-glyfer holder:** (a) rett pil (roteres etter starttangent),
   (b) buet pil (kort bue mot klokka, speiles/roteres etter behov),
   (c) tallet som løs liten tekst ved siden av — aldri i sirkel, aldri oppå.
3. **Modellen bærer veiledningen; sporebokstavene er rene** (både Salto,
   Kaleido og bilde 11 slipper piler etter modellen). Stians runde-3-ønske om
   «piler utenfor på de 2-3 første øvingene» testes som variant, men
   forlagskonsensus = kun modell. → prototypene må vise begge og la Stian velge.
4. **Grønt startpunkt** kan beholdes som liten prikk PÅ strøkstart (det er
   bokstavens faktiske startpunkt), men pilen/tallet flyttes UT. Alternativt
   flyttes også prikken til utsiden. Testes i varianter.
5. Rød/blå på plakaten = vokal/konsonant, men det er PLAKAT-semantikk. På
   sporingsarket er modellen nøytralt sort (LOGG 17.07 del 2) og veiledningen
   bærer ev. farge. Beholdes.
