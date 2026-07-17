# Research: Gyldendal (Salto) og Cappelen Damm (Kaleido) — skriveretning, strøkrekkefølge, bokstavhus, graduering

Dato: 2026-07-17. Metode: WebSearch + WebFetch + direkte nedlasting av sideoppslag fra Issuu (offentlige "utdrag"/kapittel-forhåndsvisninger) via `image.isu.pub`-mønsteret, deretter visuell analyse av bildene. Alle nedlastede bilder ligger i
`.../scratchpad/research/dumper/` (filnavn referert under hvert funn).

**Viktig metodenotat:** Issuu-dokumentsider er JS-renderte og gir ingen tekst via vanlig fetch. Jeg fant likevel publication-ID-en i sidens innebygde JSON (`image.isu.pub/<pubid>/jpg/page_N.jpg`) og lastet ned enkeltsider som JPG for direkte visuell inspeksjon. Dette er dokumenterte, kildede funn (URL oppgitt per dokument), ikke andrehånds-referater. Podium.gyldendal.no (Saltos lærerplattform) og skole.salaby.no krever innlogging og var IKKE tilgjengelig — funnene om Salaby og "Salto alfabetplakat" som fysisk plakat er derfor IKKE dokumentert i denne runden (se eget avsnitt "Ikke verifisert" nederst).

---

## 1. Cappelen Damm — Kaleido skriftforming (Stavskrift A og Løkkeskrift A)

Kilder (offentlige Issuu-"utdrag", lastet ned side for side):
- Stavskrift A: https://issuu.com/cdundervisning/docs/kaleido_skriftforming_stavskrift_a_ (© Cappelen Damm AS, Oslo 2018, ISBN 978-82-02-45311-4, forfattere Irene Amundsen og Tone Goborg, håndskrift: Tone Goborg, illustrasjoner: Solveig Lid Ball)
- Løkkeskrift A: https://issuu.com/cdundervisning/docs/kaleidoskriftformloekkea_blaibok (© Cappelen Damm AS 2016, ISBN 978-82-02-45307-7, samme forfattere)
- Begge er "laget til bruk på grunnskolens barnetrinn", curriculum-uavhengige.

Nedlastede sider (dumper/-mappen): `stavskrift_a_page{1,3,4,...19}.jpg` og `loekke_a_page{1,4,5,6,12,13,14,15,16}.jpg`. Presise arrangements-crops: `diagram_check_{16,17,18,19}.png` (a/A/b/B), `ruling_check.png` (linjesystem).

### 1.1 Skriveretning og strøkrekkefølge — PRESIS beskrivelse

Hver bokstav får sin egen side (to sider per bokstav i alfabetrekkefølge: én for liten bokstav, én for stor). Øverst til venstre på siden står en **isolert referansemodell**: bokstaven tegnet stor, i **massivt medium-grått** fyll (ingen kontur, ingen linjer bak — flyter fritt på hvit bakgrunn, IKKE inni et bokstavhus).

Ved siden av/rundt denne grå bokstaven ligger **røde, nummererte piler** som viser strøkrekkefølgen:
- **Pilene ligger i det hvite rommet ved siden av strøket — ALDRI oppå selve den grå bokstavformen.** Der bokstaven har en åpen "motform" (f.eks. buken/telleren i "a" eller "b", eller trekanten i "A"), plasseres pilen INNI denne hvite lommen (fortsatt utenfor selve streken). Der strøket er en yttersving (f.eks. den store runde streken på "B"), tegnes pilen som en bue UTENFOR streken, i margen, parallelt med streken.
- Hver pil har en liten rød prikk ved startpunktet og en pilspiss ved slutten av det aktuelle strøket.
- Tallet (1, 2, 3 — ALDRI i sirkel, bare et lite sort/rødt tall) står plassert **ved startprikken**, altså i pilens haleende, ikke ved spissen.
- Buede piler brukes når strøket buer (f.eks. pil 1 på liten "a": en flat bue over bokstaven, fra topp-høyre og bortover til venstre); rette piler brukes for rette strøk (f.eks. pil 1 på liten "b": en loddrett strek ned til venstre for stammen; pil 2 på stor "A": loddrett strek ned til høyre for den høyre skråstreken).

**Konkrete eksempler (pixel-nøyaktig observert):**

| Bokstav | Antall piler | Pil 1 | Pil 2 | Pil 3 |
|---|---|---|---|---|
| liten **a** (s.14) | 3 | Buet pil OVER bokstaven, fra høyre mot venstre (innføringsstrøket til bøylen) | Kort diagonal pil INNI buken (telleren), pekende opp-høyre | Liten buet pil i "lommen" mellom bøyle og hale, pekende høyre (inn i halens oppsving) |
| stor **A** (s.15) | 3 | Buet pil NEDE TIL VENSTRE, i foten/kroken, pekende høyre | Rett loddrett pil ØVERST TIL HØYRE, utenfor den høyre skråstreken, pekende ned | Kort rett pil MIDT I, inni trekant-åpningen over tverrstreken, pekende høyre mot tverrstreken |
| liten **b** (s.16) | 2 | Rett loddrett pil til VENSTRE for stammen (i margen), pekende ned | Buet pil INNI bøylens åpning, pekende høyre/opp |
| stor **B** (s.17) | 3 | Rett pil som løper parallelt med/tett inntil venstre loddrette stamme, fra prikk øverst til pilspiss nederst | Stor buet pil som sveiper RUNDT YTTERKANTEN av den øvre bøylen (i margen utenfor streken) og lander med pilspiss i midje-lommen mellom bøylene | Stor buet pil som sveiper RUNDT YTTERKANTEN av den nedre bøylen og lander nederst til venstre ved grunnlinjen |

Konklusjon: **piler ligger konsekvent utenfor selve strekens fyll — enten i ytre margin (for rette/enkle strøk) eller i bokstavens egne "hulrom"/moteform (for buede/lukkede strøk) — aldri oppå streken.** Tall sitter ved startpunktet (halen), ikke ved pilspissen. Ingen sirkel rundt tallet.

### 1.2 Linjesystem / "bokstavhus"

Selve praksis-linjene (der eleven sporer og skriver) er et **enkelt, fargenøytralt 3-linjesystem**: topplinje, midtlinje (x-høyde) og grunnlinje, alle i **samme tynne turkis/cyan farge** — ingen fargekoding av soner (ingen "kjeller/loft"-farging, ingen ulik strektykkelse for grunnlinjen). Se `ruling_check.png`.

Teksten "Til lærere og foresatte" (identisk ordlyd i BÅDE Stavskrift A og Løkkeskrift A) bruker likevel begrepet **"bokstavhuset"**: *"Elevene skal «kopiere» teksten ved å skrive den inn i bokstavhuset under teksten."* — altså er "bokstavhus" her bare navnet på den linjerte skrivesonen, IKKE et fargekodet hus med kjeller/stue/loft slik generiske norske undervisningsressurser (Pedly, Malimo, TPT-selgere) ofte bruker begrepet.

### 1.3 Graduering på et oppslag

Fast mønster funnet på hver side (7 mitten-øvelser, s.7–8, og bokstavsidene s.14–17):
1. Én rad med **modellord/mønster i modell-svart**, gjentatt 5–7 ganger på samme linje (f.eks. "ell ell ell ell ell ell ell").
2. 2–3 **blanke linjerte rader** rett under, uten modell — ren repetisjonsskriving.
3. Neste rad: nytt mønster/ord, samme struktur.
4. Bokstavsidene (14 osv.) starter med referansediagrammet (grå bokstav + røde piler) øverst, deretter 5 rader: (a) bokstaven alene ×5, (b) bokstaven i par-mønstre, (c) bokstaven i 2–3 korte ord, (d) blanke linjer, (e) bokstaven i en setning/navn.

Ingen tellbar "spor → skriv"-kolonneinndeling som i Salto (se pkt. 2) — Kaleido er ren **repetisjon av modell etterfulgt av blanke linjer**, uten ghost-spor-tekst ved siden av modellen.

### 1.4 Stavskrift vs. Løkkeskrift — viktig presisering

Til tross for navnet er Kaleidos "stavskrift" IKKE frittstående (usammenhengende) trykte bokstaver — det er en **sammenhengende, ikke-løkket kursiv** ("bokstaver som henger sammen uten å bruke løkker", jf. Saltos lærerveiledning pkt. 2 nedenfor, som bruker identisk definisjon). Løkkeskrift A er nesten identisk produkt (samme øvelser, samme ord, samme sidetall) med full løkket kursiv og noe ekstra sammenhengende alfabet-rad på oversiktssiden. Kun forskjell i pedagogisk presentasjon: omslagsfarge (rosa vs. blå) og selve skriftformen.

---

## 2. Gyldendal — Salto Håndskrift Stavskrift 1 (2026)

Dette er IKKE Salaby og IKKE en alfabetplakat, men et **dedikert håndskrift-hefte** i Salto-serien (forfatter Siw Monica Fjeld) — trolig helt nytt (Issuu-publiseringsdato 2026-05-21 og 2026-07-06). Dette er det mest direkte, dokumenterte funnet om HVORDAN Gyldendal/Salto viser skriveretning i praksis, og er trolig enda mer representativt enn en alfabetplakat siden det er selve skriveopplæringsproduktet.

Kilder (offentlige Issuu-forhåndsvisninger):
- Kapittel 5 ("Utenfor verden", romtema): https://issuu.com/gyldendalnorskforlag/docs/7071415021082_kapittel5_saltostavskrift
- Særtrykk (inkl. "Til læreren"-siden): https://issuu.com/gyldendalnorskforlag/docs/7071415021082_saltostavskrift_srtry_a03918f7416f73

Nedlastede sider: `saltostav_kap5_{1-8}.jpg`, `saltostav_srtry_{1-10}.jpg`. Presise crops: `salto_arrow_zoom1.png` (vi/er/av), `salto_p50_lower.png` (is/og/lys/rom/tid), `salto_p51_jupiter.png` (jorda/Mars/Jupiter), `salto_arrow_zoom2.png`/`salto_arrow_zoom3.png` (fingerbevegelse-sirkel).

### 2.1 Skriveretning og strøkrekkefølge — PRESIS beskrivelse

Saltos metode er **fundamentalt annerledes enn Kaleidos**: i stedet for én stor isolert referansebokstav per side, plasseres en **liten blå retningspil DIREKTE ved inngangsstrøket til hvert praksisord**, integrert i selve skrivelinjen.

Format per ord ("Spor og skriv"): [modellord i mørk antrasitt/nesten-sort skrift] + [samme ord i lys grå "spøkelsestekst" til høyre, for sporing] — på linjen under: blank linjert rad for fri gjenskriving.

- **Pilen(e) sitter ØVERST TIL VENSTRE for ordets første bokstav**, i mellomrommet/oppstrøks-sonen over/ved siden av bokstaven — altså utenfor selve bokstavformen, i venstre margin.
- Farge: **blå/teal** (IKKE rød som hos Kaleido).
- Buede piler for buede innføringsstrøk, rette piler for rette: f.eks. "vi" får en kort rett pil som peker ned-venstre (innføring til v); "er" får en oppsvingende buet pil (innføring til e); "og" får en halvsirkel-buet pil mot klokka over o-en; "av" får en løkke-aktig buet pil over a-en.
- **Tall brukes KUN når bokstaven trenger to atskilte merker** (prikk over i/j, eller kryss på t) — IKKE for hvert strøk i hele ordet slik Kaleido gjør for hver bokstav. Eksempler:
  - "is": "2" (med prikk) øverst = i-prikken; "1" (med pil ned) rett under = hovedstrøket på i-en.
  - "tid": "2" (med vannrett kryssende pilstrek) øverst = kryssingen av t; "1" (med pil ned) = hovedstammen på t.
  - "jorda": samme mønster som "is" — "2"+prikk for j-prikken, "1"+pil for nedstrøket.
  - "Jupiter": "1" med pil mot høyre øverst og "2" med pil mot høyre litt lenger ned = to parallelle vannrette strøk i den store J-ens topp-buekrok.
- Ord med kun ett enkelt innføringsstrøk (vi, er, av, og, lys, rom, Mars, sola, Merkur osv.) får **ingen tallmerking, bare selve pilen** — tall reserveres for reell tvetydighet (flere merker på samme bokstav).

Dette er en vesentlig innsikt for design: **Salto nummererer ikke "for nummereringens skyld"** — tall brukes sparsomt, kun der det er genuint mer enn ett anker-punkt på bokstaven. Ellers holder én pil.

### 2.2 Linjesystem / "bokstavhus"

Tynt, lyseblått linjesystem, enkel to-linjers skriverad (ingen synlig fargesone-koding, ingen kjeller/loft-farging observert på disse sidene). "Til læreren"-siden (identisk begrep som Kaleido) bruker også ordet **"bokstavhus"**: *"Elevene vil nok ha ulik motivasjon for å skrive stavskrift utenfor sidene med bokstavhus."* — igjen: "bokstavhus" = navnet på den linjerte skrivesonen i heftet, ikke et fargekodet sonesystem.

### 2.3 Graduering på et oppslag

Ordorganisert **tematisk** (ikke alfabetisk!) — kapittel 5 heter "Utenfor verden" (romtema) og drilling ord som "vi, er, av, is, og, lys, rom, tid" → "sola, Merkur, Venus, jorda, Mars, Jupiter, Saturn, Uranus, Neptun, solsystem, Melkeveien" → "univers, galakse, himmel, planet, måne, stjerne, komet, meteor, asteroide, svart hull" → hele setninger ("Han har måne.", "Hun får stjerner i øynene.", "Jeg fikk ballen midt i planeten.").

Per oppslag/side: kun **1 gjentakelse av modell + 1 sporing (ghost-tekst) + 1 blank linje** per ord — MYE mindre repetisjon enn Kaleido (som kjører 5–7 repetisjoner per rad). Kompleksiteten øker gradvis gjennom kapitlet: enkeltord (2-3 bokstaver) → egennavn/fagord (6-10 bokstaver) → hele setninger uten støttepiler i det hele tatt (side 53 har ingen piler — bare modell+ghost på setningsnivå, retningsstøtten er "sluppet" helt).

### 2.4 Andre pedagogiske elementer (ikke spurt om, men relevant for design)

- **Blyantgrep-illustrasjon**: to enkle strek-tegninger av hender som holder blyant riktig.
- **"Fingerbevegelsene"-diagram**: en sirkel med kryssende linjer (4 farger, håndtegnet) og 4 nummererte piler rundt sirkelen (1. Ned og opp, 2. Ut og inn, 3. Rundt og rundt, 4. Rundt den andre veien) — en ren finmotorikk-oppvarmingsøvelse FØR bokstavskriving, atskilt fra bokstavpilene.
- **Lærervurderings-sjekkliste**: "Bruker eleven mest tid på selve bokstaven med blyanten på papiret eller mens blyanten er i lufta? Virker eleven trygg på start og stopp? Har bokstavene jevn høyde? Har bokstavdelene riktig fasong? Er bokstavdelene riktig plassert? Hvordan holder eleven blyanten?"
- Stavskrift defineres eksplisitt: *"Stavskrift er bokstaver som henger sammen uten å bruke løkker. Den likner på de trykte bokstavene, og kan derfor være både enklere å lese og skrive."* — samme norske fagbegrep-logikk som hos Cappelen Damm.

---

## 3. Ikke verifisert / ikke tilgjengelig i denne runden

- **Salto alfabetplakat** (den fysiske/digitale plakaten med piler og tall PÅ UTSIDEN av bokstavene, nevnt spesifikt i oppdraget): podium.gyldendal.no/salto/laerer/overom-2/sprak/a-bok/alfabetet ga 404 (krever innlogging/er flyttet). Fant IKKE et offentlig Issuu-utdrag av selve plakaten. Kan derfor ikke bekrefte eksakt pil-/tallplassering på DENNE spesifikke plakaten — funnene over (fra selve Salto Håndskrift-heftet) er beste tilgjengelige dokumentasjon av Gyldendals metodikk for skriveretning.
- **Vokaler røde / konsonanter blå**-konvensjonen: dukket opp gjentatte ganger i søk, men KUN i generiske tredjeparts undervisningsressurser (Pedly, Malimo, LaererVeronica, TPT-selgere) — ikke bekreftet som spesifikt Gyldendal/Salto-offisielt. Behandle som en utbredt norsk konvensjon, ikke en Salto-spesifikk kilde.
- **Salaby** (skole.salaby.no/1-2/norsk/sprak/store-og-sma-bokstaver): krever innlogging, ga tomt resultat via WebFetch. Ingen funn.
- **Skolestudio.no**: ikke undersøkt i dybden (kun ett treff, om "skolestart med Salto" — ingen skriveopplæringsdetaljer).
- **Bokstavhus med fargede soner** (kjeller/stue/loft): denne konvensjonen ble bekreftet i FLERE tredjepartskilder (undervisningsmetoder.com, Learning Materials by Martine, Undervisningsbyen.no) som en utbredt norsk praksis — men verken Kaleido eller Salto (de to forlagsproduktene jeg fikk visuell tilgang til) bruker fargede soner selv; begge bruker et nøytralt linjesystem og reserverer begrepet "bokstavhus" for selve den linjerte skrivesonen. Dette er en reell forskjell mellom "generisk norsk bokstavhus-praksis" og de to store forlagenes egne produkter — verdt å merke seg siden oppdraget spesifikt spurte om forlagenes praksis.

---

## Oppsummering — designimplikasjoner for sporingsark-generatoren

1. **Piler hører hjemme i marginen/motformen, ikke oppå streken.** Begge forlag er enige: rette piler for rette strøk, buede piler for buede strøk, alltid i det hvite rommet ved siden av (eller inni en lukket motform av) bokstaven.
2. **To legitime skoler for tallbruk**: Kaleido nummererer HVERT strøk på bokstaven (1-2-3, alltid, uansett kompleksitet). Salto nummererer KUN når det er reell tvetydighet (to atskilte merker på samme bokstav) — ellers bare pil, ingen tall. For en rolig, "ikke overveldende" 6-åring-følelse er Saltos sparsomme tilnærming trolig tryggere; Kaleidos konsekvente 1-2-3 er tryggere for full strøk-pedagogikk.
3. **Tall sitter ved pilens START (halen med prikken), ikke ved spissen** — konsekvent i begge kilder.
4. **Ingen av forlagene sirkler tallet.** Bare et lite, nøytralt sort/farget tall.
5. **"Bokstavhus" = navnet på den linjerte skrivesonen i begge forlag, IKKE et fargekodet kjeller/stue/loft-system.** Fargekodede soner er en tredjeparts-konvensjon, ikke hva de to store forlagene selv bruker i sine offisielle produkter.
6. **Graduering**: Kaleido = høy repetisjon (5-7×) per rad, ren modell→blank (ingen ghost-spor). Salto = lav repetisjon (1× modell + 1× ghost-spor + 1× blank), men bredere ordprogresjon (2 bokstaver → 10 bokstaver → hel setning) og slipper støtte helt på setningsnivå.
7. Fargekoding på selve pilene: Kaleido = rød, Salto = blå. Ingen tydelig bransjestandard — velg det som kontrasterer best mot forlagets/verktøyets egen palett.
