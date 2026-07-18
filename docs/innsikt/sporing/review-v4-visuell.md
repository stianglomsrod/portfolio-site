# Adversariell visuell review — Sporing v4 (prototype-galleri)

Kilder gjennomgått: `proto/proto.png` (58-tegns modell-galleri + rad-kontekst,
generert av `lag-proto.mjs`/`bokstavbaner.js`), produksjonsarkene
`sporing-v3-sma.png`/`sporing-v3-store.png`, og Salto-referanseplakaten.
Alle funn under er verifisert med pikselnøyaktig crop/zoom av selve PNG-en
(ikke antatt fra kildekoden alene), og krysset mot `bokstavbaner.js` for å
forklare *hvorfor* feilen oppstår der den gjør.

Metanotat: galleriets rutenett viste seg IKKE å være a-f/g-l/.../A-F/G-L slik
en naiv lesning av `alle`-arrayet + 6 kolonner skulle tilsi — siste
småbokstavrad er `y z æ ø å A` (6 tegn, ikke 5), som forskyver alle
store bokstav-radene ett hakk. Dette er ren telling, ikke et produktfunn,
men nevnes fordi det påvirker hvilken bokstav som sitter i hvilken celle.

---

## KRITISK (må fikses før deploy)

1. **Piler tegnes INNI bokstavformen / oppå blekket — systematisk, ikke
   enkelttilfelle.** Rotårsak (fra `lag-proto.mjs`): `luft()`-scoringen som
   velger pilens side ekskluderer strøkets EGEN blekk (`egneIdx`) fra
   kollisjonssjekken, så et strøk kan aldri «se» sin egen runding som en
   hindring. For tettkrummede strøk (bolle, hempe) havner pilen da inni
   telehullet eller oppå selve streken:
   - **d** (liten): pilen for strøk 1 (sirkelen) er en liten sammenkrøllet
     krusedull som ligger INNI telehullet på "d", oppå/ved siden av den
     grønne startprikken — nesten ulesbar.
   - **e** (liten) — reprodusert BÅDE i galleriet og i ordraden «Ole»:
     pilen for enestrøket ligger rett OPPÅ tverrstreken i "e", ikke utenfor.
     Skaftet og pilhodet overlapper direkte med blekket.
   - **h** (liten): pilhodet for strøk 2 (hempa) er en liten, nesten usynlig
     markering plassert INNI hullet under hempa, ikke utenfor bokstaven.
   - **å** (liten): pilen for strøk 1 (hovedsirkelen) er en liten krusedull
     inni telehullet, tallet «1» er nær ulesbart mot det svarte blekket.

2. **Tallnummerering kolliderer eller forsvinner helt der to strøk deler
   (nesten) samme startpunkt.** Når to strøk starter på identisk koordinat
   OG går i nesten samme retning innledningsvis, havner nummer-tekstene
   oppå hverandre (SVG-tegnerekkefølgen gjør at det senere tallet skjuler
   det tidligere):
   - **m** (liten): «1» og «2» (rett strek + første hempe) klumper seg
     sammen rett ved nedpilen, vanskelig å skille rekkefølgen.
   - **æ** (liten): tallet «3» ligger rett oppå blekket/den grønne prikken
     der de tre strøkene møtes — praktisk talt ulesbart.
   - **E** (stor): «1» og «2» (stav + toppstrek) er stablet oppå hverandre
     øverst til venstre; «1» er nesten skjult bak «2».
   - **F** (stor): samme mønster som E — «1»/«2» stablet i hjørnet.
   - **R** (stor): samme mønster — «1»/«2» stablet der stav møter bolle.
   - **Æ** (stor): tallet «1» (venstre skråstrek) er HELT USYNLIG — skjult
     under «2»/«3» som klumper seg sammen på det felles startpunktet der
     tre strøk møtes i toppen.
   - **Å** (stor): tallene «1» og «2» (de to hoveddiagonalene) er HELT
     USYNLIGE — sannsynligvis skjult under ring-diakritikkens egen pil/tall
     «4» som ligger rett over samme toppunkt.
   - Motsatt eksempel som viser at det IKKE er uunngåelig: uppercase **M**
     deler startpunkt for strøk 1/2, men fordi de to strøkene peker i klart
     ulik retning med det samme, separeres pil/tall pent — dette er trolig
     mønsteret en fiks bør strekke seg mot.

3. **O, Q, Ø (store bokstaver) er tydelig OVALE, ikke sirkulære.** Direkte
   brudd på eksplisitt krav (a). Årsak i `bokstavbaner.js`: disse tre bruker
   `oval(10.6, 15, 8, 10.9)` — bredde:høyde-forhold 8:10.9 ≈ 0,73, klart
   eggformet/høyere-enn-bred. Til sammenligning bruker liten **o**/**ø**
   riktig en ekte sirkel (`sirkel(8, CY, 4.9)`, forhold 1:1). Bekreftet
   visuelt i både frittstående galleri-celler og i «Ole»-ordraden (stor O).

4. **J (stor) hviler IKKE på grunnlinja — den flyter over den.** Krok-kurven
   avsluttes på y=22,4 mens grunnlinja (`grunn`) ligger på y=27 — et synlig
   rosa gap på ca. 5 enheter mellom bokstavens bunn og linja. Direkte brudd
   på krav (c) «bokstavene skal hvile på grunnlinja».

5. **Ordraden «Ole» reproduserer «e»-pil-på-blekk-feilen i løpende
   ordkontekst**, ikke bare i enkeltbokstav-cellen — bekrefter at feilen
   ikke er et engangs-rendringsartefakt, men vil ramme ethvert ord med "e".

## VIKTIG (bør fikses)

1. **ø** (liten): den grønne startprikken for sirkel-strøket er nesten
   fullstendig dekket av diagonalstreken som tegnes oppå den — vanskelig å
   se hvor man skal starte.
2. **Y** (stor): tallet «3» (den rette stammen) ligger ganske tett inntil
   der de to diagonalene møtes — ikke direkte kollisjon, men trangt nok til
   at det bør få litt mer luft.
3. **Delvise piler på enkeltstrøk med flere retningsskift** (s, z, w): pilen
   viser kun retningen på det FØRSTE segmentet før den kutter
   (`hjornekutt`), så resten av sikksakk-/dobbeltkurve-banen har ingen
   visuell veiledning. For w og z (rene sikksakk-strøk) er dette kanskje
   greit nok som «kom i gang»-hint, men bør sjekkes mot Salto-referansen —
   der ser det ut til at retningsskift ofte får egen pil selv uten tall.
4. Rotårsaken i punkt 1 og 2 under KRITISK er samme kodefeil (own-strøk
   telles aldri som «trangt» i luft-scoringen) — bør fikses ett sted
   (`velgPolylinje`/`luft()` i `lag-proto.mjs`) fremfor lappet per bokstav.

## KOSMETISK

1. Tallene tegnes i mørk marineblå/sort — når de havner oppå svart blekk
   (jf. KRITISK pkt. 2) blir de praktisk talt usynlige. En lys kontur/hvit
   halo rundt tall-glyfene ville gjort fremtidige overlapp-tilfeller langt
   mindre alvorlige, selv om selve plasseringen fortsatt bør fikses.
2. **A** (stor): tallet «3» (tverrstreken) ligger helt inntil venstre bens
   kant — ikke kollisjon, men knapt med luft.

---

## Helhetsvurdering opp mot krav (e)

v4-galleriet er et klart steg opp fra dagens produksjonsark (`sporing-v3-
store.png` viser bl.a. total bokstav-i-bokstav-kollisjon i «Ole»-raden og
enda tettere tallklynger på A/Æ/R/Ø) — brede versaler, grunnlinjehvile og
de fleste enkeltpiler er nå ryddige og «rolige». Men de fem KRITISK-punktene
over (piler inni telehull/oppå blekk, forsvinnende tallnummer, ovale O/Q/Ø,
flytende J, og «Ole»-kollisjonen) er nok til at helheten ennå ikke når
Salto/Kaleido-kvalitet — de er også systematiske (samme rotårsak rammer
5+ bokstaver hver), så en målrettet fiks i pil-/tall-algoritmen og i
sirkel-vs-oval-valget for O/Q/Ø bør rydde opp i mesteparten på én gang.
