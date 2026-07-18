# Salto/Zeppelin/Ordriket trykkbokstav-materiell for 1. trinn — nettresearch

Utført 2026-07-18. Metode: Issuu-triks (fant publication-ID i rå HTML via
curl, lastet ned enkeltsider som `image.isu.pub/<doc-id>/jpg/page_<n>.jpg`,
leste bildene direkte + kroppet/zoomet nøkkelområder med Python/PIL for
mikrotypografi). Alle dumpede bilder ligger i
`scratchpad/research/dumper2/` i undermapper per dokument.

**Ærlighet om dekning:** Jeg fant IKKE en offentlig, fullstendig Salto
ARBEIDSBOK (den faktiske skriveøvingsboka med piler/tall) — kun Salto
ELEVBOK (lesebok). Salto sine «Lærerens bok»-lenker på Issuu ga 404 (fjernet/
privatisert siden de ble indeksert av søkemotorer). Zeppelin (Aschehoug) ga
derimot full tilgang til selve ARBEIDSBOKA i trykkskrift, inkl. pil-/tall-
systemet — dette er hoveddfunnet. Jeg fant INGEN eksempler på hale-forming
for g/j/y/q i noe faktisk 1.-trinns arbeidsbok-materiale (verken Salto eller
Zeppelin) — se §5 for hva som finnes om dette fra tidligere kjent kilde
(Salto-alfabetplakaten, allerede analysert i en tidligere økt, IKKE
reverifisert nå).

---

## 1. Salto 1A Elevbok (Gyldendal) — bokstavsider er LESEBOK, ikke skriveøving

Kilde: «Bli kjent med Salto 1A Elevbok» (salgsbrosjyre/forhåndsvisning),
Issuu, utgiver Gyldendal Norsk Forlag.
https://issuu.com/gyldendalnorskforlag/docs/salto_1a_bib
(dokument-ID `190211133023-ec2cc8b2fd60a5f07179ef8d054dce1b`, 11 sider)

**Bokstavsiden («bokstavhuset») — verifisert i 2x-zoom av C c-oppslaget:**

- Et hus tegnet med tynn SORT strek (enkel takvinkel + rektangel), delt av
  ÉN horisontal strek i to «rom»: et stort øvre rom (~65–70 % av høyden) med
  de store bokstavformene, og et lite tomt nedre rom (~30–35 %) som er
  HELT BLANKT — ingen skrivelinjer, ingen sporing, bare hvit dekorflate.
  **Huset er et rent grafisk/merkevare-motiv, ikke et linjesystem for
  håndskrift.**
- Modellbokstavene (f.eks. «C c») står i **massivt, avrundet, fet
  sans-serif i merkevareblått** (samme blåfarge som Salto-logoen) — dette er
  en DISPLAY-/brand-skrift, ikke en skoleskrift-font med jevn strøkbredde.
  Stor bokstav klart større enn liten (versal ~2× x-høyde). INGEN
  retningspiler, INGEN tall, INGEN startpunktmarkering noe sted på siden.
- Et lite temaikon (f.eks. campingvogn for C, fløyte for F) plassert OPPÅ
  taklinja, delvis overlappende — representerer lyd/tema, ikke skriveretning.
- Alfabetstripe øverst på hver bokstavside: **vokaler i rødt, konsonanter i
  blått**; bokstaven som behandles er større/fetere og i mettet merkevareblå,
  øvrige konsonanter i en lysere/dusere blågrå. Stripen er adskilt fra
  sideinnholdet med en svart PRIKKET linje.
- Selve lesesiden under huset har «Snakk om»-ord, en skriveoppgave-ikon
  (blyant) nederst med tekst som «Skriv ord med C/c i seg» — men dette er en
  ÅPEN skriveoppgave i et hefte utenfor boka, ikke en trykt sporerad.

**Konklusjon:** Salto Elevbok 1A gir IKKE piler/tall/sporerader — bokstavsiden
er en lese-/vokabular-side. All faktisk skriveopplæring med retning skjer i
Salto sin egen Arbeidsbok, som jeg ikke fant offentlig tilgjengelig (se over).

Andre relevante funn i samme dokument:
- Innholdsside (side 4–5 i PDF-en) bekrefter full bokstavrekkefølge og
  sidetall for Salto 1A: I i (6–7), S s (8–9), E e (12–13), L l (14–15),
  R r (18–19), O o (20–21), M m (24–25), V v (26–27), A a (30–31),
  N n (32–33), J j (36–37), F f (38–39), Å å (42–43), T t (44–45),
  G g (48–49), U u (50–51), Ø ø (54–55), D d (56–57), H h (60–61),
  Y y (62–63), P p (66–67), K k (68–69), Æ æ (72–73), B b (74–75),
  Q q (78–79), W w (80–81), C c (84–85), X x (86–87), Z z (90–91).
  (Nyttig for å vite Saltos bokstav-progresjon, selv om selve
  formingsinstruksjonen for g/j/y/q ikke er synlig i dette utdraget.)

---

## 2. Zeppelin 1A/1B Bokstavbok (Aschehoug) — samme mønster som Salto

Kilde: «Nye Zeppelin 1A. Bokstavbok», Issuu, Aschehoug Utdanning.
https://issuu.com/aschehougundervisning/docs/nye_zepp_1a_bokstavbok_bm_2-23
(dok-ID `181012085750-5a0a10dc7f148d01e90106ee714bf576`, 23 sider)

Samme funksjon som Salto Elevbok (leseboka), samme fravær av piler/tall.
Bokstavhus-motivet er likt i konsept, men modellbokstavene er **RØDE**
(ikke blå som Salto) og litt tynnere/mer typografisk normale (nærmere en
vanlig fet skolebokskrift enn Saltos massive brand-font). Referanser til
«Arbeidsbok til 1A side X–Y» trykt under hvert bokstavoppslag bekrefter at
selve formingsøvelsen skjer i arbeidsboka (se §3).

---

## 3. Zeppelin Arbeidsbok — Trykkskrift (HOVEDFUNN: fullt pil-/tall-/linjesystem)

To dokumenter, samme forfatter (Turid Fosby Elsness), samme system:

- **1A**: https://issuu.com/aschehougundervisning/docs/zepp1a_arb_t_nn_s1til27
  (dok-ID `140522083628-44eaded63710d909f315a6a1f82348a1`, 28 sider —
  «trykkskrift NN» = nynorsk-utgave av trykte bokstaver)
- **1B**: https://issuu.com/aschehougundervisning/docs/zepp1b_ab_t_nn_s1til26
  (dok-ID `140522131819-615ab7a92408d85098b0317b4558e4e7`, 27 sider)

Bokstaver med FULL formingsdiagram funnet i disse utdragene: **I/i, L/l,
O/o, V/v, U/u** (1A) og **F/f** (1B). Utdragene er kuraterte forhåndsvisninger
(«s1til27»/«s1til26» = et utvalg av bokas første sider), så ikke alle
bokstaver er representert — spesielt manglet **g, j, y, q** (halebokstaver)
i begge utdrag, samt S, E, A, R, T, N, Å (som finnes i 1A, men ikke i denne
forhåndsvisningen).

### 3.1 Sidestruktur per bokstavoppslag (verifisert side «I i 10–11»)

1. **Boks 1 — modell + piler** (øverst): stor grå/lys strek-bokstav (IKKE
   en tynn kontur, men en TYKK, avrundet, fylt STANG/form — bokstavene er
   forenklet til geometriske «fyll dette»-former, ikke ekte typografi) med
   en egen, ADSKILT tynn SORT pil til venstre for/over strøket.
2. **Boks 2 — to skrivelinjerader** (praksis): 3 grå modell-repetisjoner +
   resten av rada tom, for hver av stor/liten bokstav.
3. **Boks 3 — fargelegging/tegneoppgaver** tematisk til lyden.
4. Nummererte oppgavetekster nederst (rødt punkt = nivå 1-oppgave osv.).

### 3.2 Pil-/tall-mikrotypografi — verifisert i 4x zoom (`zoom_zepp_Ii_top.png`)

- **«×» markerer alltid STARTPUNKTET** for strøk 1 på hele bokstaven (kun
  én gang per bokstav/bokstavpar, ikke per delstrøk).
- **Tall (1, 2, 3 …) markerer strøkrekkefølge**, plassert løst ved/over
  starten av HVERT delstrøk (ikke bare det første).
- **Rett strøk (I, L-stav, V-diagonal, U-stav):** tynn SORT rett pil,
  plassert et godt stykke (~1 strøkbredde) til VENSTRE for/utenfor selve
  den grå modellformen, med pilspiss (åpen V) kun i strøkets slutt-ende.
  Pilen strekker seg over hele strøkets høyde, fra toppunkt (×) til
  bunnpunkt.
- **Rundt strøk (O/o):** buet pil som starter kl. 12 (×), går MOT KLOKKA
  langs YTTERSIDEN av ringen ned til bunnen, og pilspissen ender inni/på
  innsiden nederst til høyre (rundt kl. 4–5) — dvs. strøket er ÉN
  sammenhengende bane fra topp, mot klokka, nesten hele veien rundt, uten
  å fullføre helt til start. Verifisert i `zoom_zepp_Oo_top.png` for både
  stor O og liten o (identisk retning, bare mindre).
- **L (vinkel, to delstrøk i én bevegelse):** pilen er en svart
  vinkel-diagram (miniatyr-«veikart») plassert til venstre for bokstaven —
  ned fra × øverst, så 90°-sving og rett bort mot høyre, pilspiss til
  slutt på den horisontale enden.
- **V (diagonal, to delstrøk):** × øverst venstre, strek rett ned-skrått
  til bunnpunktet, så opp-skrått til toppunkt høyre med pilspiss der — én
  sammenhengende V-bevegelse, ingen løft.
- **U (rett ned + buet bunn + rett opp):** × øverst venstre, ned, buet
  gjennom bunnen, opp til høyre med pilspiss øverst. Liten «u» har i
  tillegg en egen liten AVSLUTTENDE pilspiss nedover på høyre fot — fordi
  modellbokstaven «u» har en liten fot-serif/hale nederst til høyre
  (skriftdesignet har altså en synlig detalj der, ikke en ren geometrisk
  U-form).
- **F (tre delstrøk):** × + tall «1» ved toppen av stammen (rett ned,
  lang pil), tall «2» ved toppbjelken (kort pil mot høyre), tall «3» ved
  midtbjelken (kort pil mot høyre). Liten «f»: «×1» øverst til høyre
  markerer starten på kroken (buet ned-venstre-ned i én bevegelse inn i
  stammen, pilspiss nederst), «2» for den korte tverrstreken.
- Alle piler er **tynne, sorte, uten tykkelse-variasjon** — tydelig
  adskilt fra de tykke grå modellstrøkene i form/farge/plassering (aldri
  oppå eller inni bokstavformen).

### 3.3 Linjesystem i selve skriveradene — verifisert i 2x zoom (`zoom_zepp_practicerows.png`)

- **4 tynne, sorte/mørkegrå linjer** per øvingsrad → 3 bånd: topplinje,
  øvre midtlinje, nedre midtlinje, bunnlinje. **Ingen fargekoding, ingen
  stiplet midtlinje, ingen tykkere grunnlinje** — rent monokromt, alle 4
  linjer samme (tynne) strekvekt.
- Store bokstaver/oversving fyller bånd 1+2 (topp til nedre midtlinje).
  x-høyde-bokstaver (som liten i uten hale) bruker KUN bånd 2 (øvre til
  nedre midtlinje) — bånd 1 og 3 står tomme rundt dem. (Halebokstaver ville
  etter samme logikk bruke bånd 2+3, men ingen slikt eksempel var i
  utdraget.)
- Prikken over liten «i» flyter FRITT over topplinja (utenfor bånd-systemet
  helt), ikke inni bånd 1.
- Modellrepetisjon: 3 grå modeller etterfulgt av tom resten-av-rad (samme
  «modell → tomt felt»-graduering som er kjent fra Kaleido, se tidligere
  analyse i `bilde-kaleido-og-graduering.md`).

---

## 4. Zeppelin Lærerveiledning 1A+1B (kombinert) — ingen kopiark-tilgang

https://issuu.com/aschehougundervisning/docs/zepp1ab_lv_s1til69
(dok-ID `140618071126-a66af80da027a393a2bb3b4ae8c9e215`, 71 sider)

Lastet ned og skummet alle 71 sider. Dette er RENT metodikk-/didaktikk-tekst
(bakgrunnsteori om syntetisk/analytisk lesemetode, leker, sanger, kunst- og
håndverksoppgaver). Forordet i arbeidsboka (se `zepp1b_arb_trykkskrift/page_1.jpg`)
nevner eksplisitt at et eget «treningsark» for bokstavskriving finnes i
Lærerveiledningen som «kopiark 4» og på sider 60–63 i arbeidsboka selv — men
INGEN av disse spesifikke sidene var innenfor det 71-siders utdraget jeg fikk
tilgang til (Issuu-forhåndsvisningen stopper før kopiark-vedlegget). Dette er
altså et bekreftet hull: kopiarket som trolig viser ALLE bokstavformer
samlet (inkl. g/j/y/q) eksisterer, men var ikke hentbart i denne økta.

---

## 5. Halebokstaver (g, j, y, q) — IKKE funnet i faktisk 1.-trinnsmateriell denne økta

Ingen av dokumentene over (Salto Elevbok, Zeppelin Bokstavbok, Zeppelin
Arbeidsbok 1A/1B-utdrag, Zeppelin Lærerveiledning-utdrag) inneholdt en
bokstavformingsside for g, j, y eller q. Dette er en reell dekningsbegrensning
i det som var offentlig hentbart på Issuu denne økta — ikke en konklusjon om
at slikt materiale ikke finnes.

Eneste kjente kilde til hale-behandling er **Salto-alfabetplakaten**, som
ifølge en TIDLIGERE økt i dette prosjektet (fil
`scratchpad/research/bilde-salto-retning.md`, ikke reverifisert nå) viser:
- g-bollen får samme buete mot-klokka-pil som o/c/a/e/q (kort bue over
  toppen av bollen, pilhode mot venstre).
- Halen selv (nedstrøk under grunnlinja) er IKKE dokumentert med eget
  pilbilde i den forrige analysen — kun q sin hale er nevnt eksplisitt:
  «Q/q: buet pil over ringen + «2» ved halen/skråstreken» — dvs. halen får
  et EGET tall (neste strøknummer) og en kort DIAGONAL pil plassert ved
  halens startpunkt, utenfor ringen, i halens retning. Dette er trolig
  overførbart til g/j/y sine haler (samme prinsipp: hale = eget nummerert
  delstrøk med diagonal/rett pil ved eget startpunkt), men er IKKE
  bildeverifisert for g/j/y spesifikt i noen av øktene.

Anbefaling hvis dette trengs mer presist: søk etter Zeppelin sine G/g, J/j,
Y/y, Q/q-oppslag spesifikt (de ligger i 1A rundt bokstavbok-sidene for disse
bokstavene, men var ikke inkludert i de Issuu-forhåndsvisningene jeg fant),
eller prøv å få tak i «kopiark 4» fra Zeppelin Lærerveiledning i sin helhet
(ikke bare s1–69-utdraget).

---

## 6. Zeppelin «Arbeidsbok stavskrift» 1A — lastet ned, ikke analysert i detalj

https://issuu.com/aschehoug/docs/zeppelin1a_arbeidsbok_stavskrift
(dok-ID `110905125258-be1a138dd07243ed9ad9c96f7ca543a0`, 21 sider, eldre
2011-utgave av «gamle» Zeppelin — ikke «Nye Zeppelin»). Bildene er lastet
ned til `dumper2/zepp1a_stavskrift/` men ikke gjennomgått i denne økta pga.
tidsbudsjett — «stavskrift» her betyr trolig samme som «trykkskrift» (løse,
ikke-sammenbundne trykte bokstaver) i eldre terminologi, men det er ikke
bekreftet at innholdet skiller seg fra §3-funnene. Verdt å sjekke i en
oppfølgingsøkt.

---

## 7. Ordriket «Min håndskrift» (Fagbokforlaget) — CURSIVE, ikke trykkbokstaver

https://issuu.com/fagbokforlaget/docs/bla_i_bok_min_haandskrift_bm-02-06
(dok-ID `240926095350-09e69a2e50aec2820c6c9a72220c656c`, 28 sider)

**Bekreftet ut av scope:** Forsiden viser løkkeskrift/kursiv håndskrift
overalt (ordene «slange», «kopp», «bil» osv. er skrevet i sammenhengende
kursiv), og øvingssidene (f.eks. side 6, «Fullfør bordene og pynt») viser
bølgete/løkkede sporemønstre i stiplet linje — ikke rette/runde
trykkbokstav-strøk. Dette er en løkkeskrift-innføringsbok, uavhengig av
læreverk, IKKE et trykkbokstav-produkt. Eneste overførbare detalj: 3-linjers
linjesystem der MIDTLINJA er farget lys lilla/lavendel (tydelig forskjellig
fra topp-/bunnlinje som er nøytralt grå) — et fargekodings-eksempel som
skiller seg fra både Zeppelin (helt monokromt) og Kaleido (turkis med mørkere
grunnlinje, se tidligere analyse).

Ordriket sin egen 1.-trinns trykkbokstav-arbeidsbok (hvis den finnes separat
fra «Min håndskrift») ble IKKE funnet i denne økta — bør søkes opp spesifikt
med f.eks. «Ordriket 1» + «arbeidsbok» + «trykkskrift».

---

## 8. Filoversikt — dumpede bilder verdt å se på

Alle stier under `C:/Users/x_ray/AppData/Local/Temp/claude/C--Users-x-ray-kode-2026-Claude-hjemmeside/ebd15d35-b1f3-48bd-a1d2-d04e00cc8309/scratchpad/research/dumper2/`

**Høyest prioritet (kjernefunn):**
- `zoom_zepp_Ii_top.png` — pil-/tall-mikrotypografi for rette strøk (I/i),
  4x oppskalert.
- `zoom_zepp_Oo_top.png` — buet-pil-retning for runde bokstaver (O/o), mot
  klokka fra kl. 12, 4x oppskalert.
- `zoom_zepp_practicerows.png` — 4-linjers/3-bånds skrivelinjesystem, 2x
  oppskalert.
- `zoom_salto_Cc_house.png` — Salto bokstavhus-motivet i høy oppløsning
  (bekrefter INGEN piler/linjer, ren display-typografi).
- `zepp1a_arb_trykkskrift/page_5.jpg` (I i), `page_9.jpg` (L l),
  `page_13.jpg` (O o), `page_17.jpg` (V v), `page_25.jpg` (U u) — fulle
  originalsider med alle 3 oppgaveblokker.
- `zepp1b_arb_trykkskrift/page_9.jpg` — F f, eneste 3-delstrøk-eksempel.

**Sekundært (kontekst):**
- `salto_1a_bib/page_3.jpg` — annotert «Bli kjent med»-oppslag som forklarer
  Saltos bokstavhus-pedagogikk i tekst.
- `salto_1a_bib/page_6.jpg`, `page_8.jpg`, `page_9.jpg` — rene
  elevbok-oppslag i full oppløsning (C c, X x).
- `salto_1a_bib/page_4.jpg`, `page_5.jpg` — full bokstavrekkefølge/sidetall
  for Salto 1A.
- `zepp1a_bokstavbok/page_3.jpg` — Zeppelin sitt tilsvarende «bokstavhus»
  med RØDE modellbokstaver (sammenlign med Saltos blå).
- `min_handskrift/page_1.jpg`, `page_8.jpg` — bekrefter løkkeskrift/cursive,
  ikke trykk.

**Ikke gjennomgått ennå (lastet ned, kan sjekkes i oppfølging):**
- `zepp1a_stavskrift/` (21 sider, eldre Zeppelin-utgave).
- `zepp_lv/` (71 sider lærerveiledning — metodikktekst, ingen kopiark funnet).

---

## 9. Kildeliste (URL-er)

- Salto 1A Elevbok (utdrag): https://issuu.com/gyldendalnorskforlag/docs/salto_1a_bib
- Nye Zeppelin 1A Bokstavbok: https://issuu.com/aschehougundervisning/docs/nye_zepp_1a_bokstavbok_bm_2-23
- Zeppelin 1A Arbeidsbok, trykkskrift NN: https://issuu.com/aschehougundervisning/docs/zepp1a_arb_t_nn_s1til27
- Zeppelin 1B Arbeidsbok, trykkskrift NN: https://issuu.com/aschehougundervisning/docs/zepp1b_ab_t_nn_s1til26
- Zeppelin 1A Arbeidsbok, stavskrift (eldre utg.): https://issuu.com/aschehoug/docs/zeppelin1a_arbeidsbok_stavskrift
- Zeppelin Lærerveiledning 1A+1B: https://issuu.com/aschehougundervisning/docs/zepp1ab_lv_s1til69
- Min håndskrift (Ordriket/Fagbokforlaget): https://issuu.com/fagbokforlaget/docs/bla_i_bok_min_haandskrift_bm-02-06
- (404/ikke tilgjengelig): Salto 1A Lærerens bok — https://issuu.com/gyldendalnorskforlag/docs/salto_1a_lb ,
  Salto 1B Lærerens bok — https://issuu.com/gyldendalnorskforlag/docs/salto_1b_lb
- Gyldendal produktside (bot-blokkert, ikke hentbar via curl):
  https://www.gyldendal.no/grs/salto/salto-1a-2-utgave-elevbok-store-og-smaa-bokstaver/p-10023465/
