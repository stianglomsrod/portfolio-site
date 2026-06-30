# Skamløs Pitch 2D RPG — Game Design Brief v1

**Status:** Storyboard og worldmap-retning før ny agent-iterasjon.  
**Formål:** Erstatte 3D-prototypen som hovedretning med et mer sjarmerende, tydelig og spillbart top-down RPG inspirert av lesbarheten i Pokémon og den varme eventyrfølelsen i klassisk Zelda — uten å kopiere assets, IP eller visuell identitet.  
**Arbeidstittel:** *Skamløs Pitch: Kompetansebyen*.

## 1. Hovedidé

Spillet er et top-down RPG der spilleren styrer Stian gjennom en liten by. Byen representerer reisen fra lærerhverdag og egen programmeringslæring til deltakende design, forløperprototype, masterprosjekt, agentisk workflow og til slutt en DNB-rettet søknad.

Spillet skal ikke føles som en teksttung CV med sprites. Det skal føles som et lite, personlig eventyr der kompetansen vokser ut av steder, samtaler og handlinger.

**Kjerne-loop:**

```text
Utforsk byen → snakk med NPC / undersøk objekt → få quest → gjør en konkret handling → lås opp skill → få artifact/bevis → åpne ny bygning eller ny del av byen → nærm deg DNB-bygget
```

**Viktig designregel:** Spill først, forklaring etterpå. Dialoger og modaltekster skal være korte. Skill-loggen og artifact-loggen kan inneholde mer forklaring for den som vil lese.

## 2. Overordnet worldmap

Byen skal være liten, lesbar og håndlaget: grusveier, trær, busker, gjerder, skilt, benker, lyktestolper, postkasser og små miljødetaljer. Bygninger låses opp gjennom progresjon. Låste bygg skal ha synlige dører/porter og tydelig feedback — aldri usynlige vegger.

```text
                         [ DNB AI Tech-bygget ]
                                  │
                         låst til søknadspakken er klar
                                  │
                    [ OsloMet / Universitetet ]
                                  │
                         grusvei med trær og skilt
                                  │
 [ Skolen: hovedinngang ] ── [ Bykryss / skiltpost ] ── [ Nikkos hus ]
              │                         │                      │
 [ Skolen: workshop-inngang ]           │              Flutterfly-sidequest
                                        │
                                [ Stians hjem ]
                         PC, to skjermer, badeand, CS50x,
                         prototyping, master, portefølje
```

### Worldmap-prinsipper

- DNB-bygget er synlig tidlig, men låst. Det gir spilleren et mål i horisonten.
- Skolen har to innganger: hovedinngang til klasserom/elevinnsikt og workshop-inngang til lærerinnsikt senere.
- Stians hjem er quest-hubben der programmering, prototyping, masterbygging og porteføljebygging skjer ved PC-en.
- OsloMet starter metode- og masterchainen, og Kari plasseres her som tidligere medstudent / referanseperson.
- Nikkos hus er et valgfritt sideområde knyttet til Flutterfly og companion/kompis-app.
- Bykrysset har skiltpost og gjør verden lett å navigere. En eventuell NPC ved skiltet skal bare gi praktisk retning, ikke forklare spillets metafor.

## 3. Steder og funksjon

### 3.1 Skolen — hovedinngang

**Rolle:** Startområde og sted for elevinnsikt.

Spillet starter inne i et klasserom på slutten av dagen. Det er to elever der. De er fiktive/composite NPC-er som representerer behov, ikke virkelige elever.

**Props:** tavle, kateter, pulter, klokke, sekker, dør ut, kanskje en liten “siste time”-stemning.

**Startstemning:**

```text
Siste time er snart ferdig. Etterpå venter Ordkryss hjemme.
```

Når det ringer ut får spilleren questet om å dra hjem og fullføre CS50x-sluttprosjektet.

### 3.2 Skolen — workshop-inngang

**Rolle:** Egen inngang/rom for lærerworkshop og idéarbeid. Låst frem til master-/workshopquesten er aktivert fra OsloMet.

**Når låst:**

```text
Workshoprommet er låst. Du trenger et metodeoppdrag fra OsloMet først.
```

**Interiør:**

- stort bord
- enkelt journey map på bordet
- grønne, røde og noen få blå lapper
- tusjer, post-its, kaffekopper, papirrot
- tavle/whiteboard
- lærer-NPC-er

**Fargelogikk i rommet:**

- grønne lapper = behov som peker mot støtte / ting som kan fungere
- røde lapper = friksjon, barrierer, tidstyver
- blå lapper = mulige designgrep

Her hentes lærerinnsiktene til master/Klar-chainen.

### 3.3 Stians hjem

**Rolle:** Hjemmebase og PC-hub.

**Props:** pult, PC med to skjermer, badeand, kaffekopp, bøker/notater, litt rot, men hyggelig. Hjemmet skal føles personlig.

PC-en brukes til flere quests:

- CS50x / Ordkryss
- forløperprototype
- master/Klar
- porteføljeside

**Badeanda:** hintsystem og recurring sidekick. Den bør gi korte, tørre hint, ikke AI-vitser.

Eksempel:

```text
Anda: “Ta én løkke av gangen.”
```

Senere:

```text
Anda: “Hvis agenten får for mye frihet, er det fortsatt du som har ansvaret.”
```

### 3.4 OsloMet / Universitetet

**Rolle:** Metode, master og Kari.

Visuelt skal bygget være større og mer institusjonelt enn husene, men uten logo eller offisiell branding.

**Funksjoner:**

- starter Workshop-/deltakende design-chainen
- starter masteroppgave-/Design Science-chainen
- rommer Kari som NPC
- graduation-scene etter masteroppdraget

**Kari:** tidligere medstudent og referanseperson. Hun har jobbet med Stian på flere prosjekter, blant annet forløperprototypen. Hun bør være på OsloMet, ikke bare dukke opp som et tilfeldig telefonvarsel. Etter master/graduation kan hun gi DNB-sporet ved å foreslå at Stian sjekker DNB.

Mulig kort dialog:

```text
Kari: “Du burde sjekke om DNB har noe ute. Det miljøet tror jeg kan passe deg.”
```

### 3.5 Nikkos hus

**Rolle:** Valgfritt sideområde for Flutterfly / companion-app / lokal-first-tenkning.

Utenfor huset flyr en liten Flutterfly. Den kan være en blå sommerfugl som beveger seg i et lite mønster. Hvis spilleren interagerer, låses et lite sidequest opp.

**Belønning:**

- skill: Flutter/Dart-nysgjerrighet
- skill: lokal-first tenkning
- artifact: companion/nikkoprogging repo

Dette skal være sideinnhold, ikke hovedchain.

### 3.6 DNB AI Tech-bygget

**Rolle:** Sluttmål. Synlig fra tidlig i spillet, men låst til søknadspakken er klar.

Bygget skal ikke bruke DNB-logo, DNB-palett eller gi inntrykk av offisiell DNB-tilknytning. Det er et symbolsk sluttsted.

**Før unlock:**

```text
Resepsjonen tar bare imot komplette søknadspakker.
```

**Etter unlock:** spilleren går inn i resepsjonen og leverer søknaden.

I resepsjonen ligger:

- en bunke søknader
- Stians søknadspakke
- et egg med mikroskopisk skrift ved siden av søknadsbunken

Hvis spilleren undersøker egget:

```text
Du prøver å lese teksten, men den er altfor liten.
```

Ikke forklar mer. Egget skal fungere som et stille easter egg for dem som skjønner referansen.

## 4. Quest chain v1

### Prolog — Siste time og Ordkryss

**Quest 1: Siste time**

- Start inne i klasserommet.
- Det er siste time.
- Spilleren får en kort intro til lærerhverdagen.
- Når det ringer ut, får spilleren neste quest.

**Quest 2: Hjem til Ordkryss**

- Gå ut av skolen.
- Naviger hjem gjennom byen.
- Sett deg ved PC-en.
- Fullfør en liten JavaScript-/for-loop-oppgave knyttet til Ordkryss.
- Fullfør en enkel git commit-sekvens.

**Reward:**

- skill: Grunnleggende programmering
- artifact: CS50x-sertifikat
- artifact: Ordkryss-video (`https://youtu.be/tI5fU1aAAvI`)

Skill-loggen kan forklare at CS50x ga grunnmur i C, Python, SQL, Flask/web, JavaScript og HTML/CSS. Dette skal ikke framstilles som en CS-grad eller ekspertnivå.

### Akt 1 — Workshop og første prototype

**Quest 3: OsloMet — Bygg med folk**

- Spilleren går til OsloMet.
- Får oppdrag om å samle elevinnsikter på skolen.
- Tema: prototyping og deltakende design.

**Quest 4: Skolen — elevinnsikter**

- Gå til klasserommet.
- Snakk med to elever.

Elev 1:

```text
“Jeg trenger oversikt og struktur.”
```

Elev 2:

```text
“Jeg trenger motivasjon gjennom spill.”
```

**Quest 5: Hjemme-PC — bygg forløperprototype**

- Gå hjem.
- Bygg første prototype ved PC-en.
- Kan være et minigame der spilleren kobler frontend, backend og brukerbehov.
- Stack/retning: Python/Django og JavaScript/Vue.

**Reward:**

- skill: Deltakende design
- skill: Grunnleggende fullstack
- artifact: pd-app-frontend repo
- artifact: pd-app-backend repo

Dette er forløperprosjektet til Klar.

### Akt 2 — Masteroppgave og Klar

**Quest 6: OsloMet — Masteroppgave**

- Spilleren går tilbake til OsloMet.
- Masteroppgavechainen starter.
- Design Science introduseres: ikke bare bygge, men bygge, begrunne og evaluere.
- Nytt oppdrag: hent lærerinnsikter på skolen.

**Quest 7: Skolen — lærerworkshop**

- Workshop-inngangen på skolen åpnes.
- Rommet er et eget workshopklasserom med journey map, lapper, tusjer og lærer-NPC-er.
- Spilleren samler tre innsikter:
  - Tidsbesparende verktøy
  - Hjelpekø
  - Opt-in spillelementer

Viktig: “Motivasjon gjennom spill” fra elevinnsikten modnes til “opt-in spillelementer” i lærerworkshopen. Dette skal formidle at spillelementer ikke bare “slås på for alle”, men vurderes og brukes som støtte når det passer.

**Quest 8: Hjemme-PC — fullfør master/Klar**

- Spilleren går hjem.
- Bygger Klar ved PC-en.
- Systemelementer:
  - React / Next.js
  - Supabase / PostgreSQL
  - innlogging og roller
  - lærerflate
  - elevflate
  - hjelpekø
  - Smart Import
  - menneske-i-løkka

**Smart Import-minigame:**

- Spilleren finner et ukebrev.
- AI foreslår oppgaver/timeplan.
- Spilleren må reviewe før publisering.
- Hvis spilleren prøver å publisere uten review, stoppes det av en guardrail.

**Reward:**

- skill: Fullstack PWA
- skill: AI som produktvalg
- skill: Menneske-i-løkka
- skill: UX / brukerflyt
- skill: Agentisk workflow
- artifact: Klar live prototype
- artifact: Klar repo

**Quest 9: OsloMet — lever master**

- Spilleren går til OsloMet.
- Graduation-scene.
- Karakteren får graduate cap.

**Reward:**

- credential: Master i digital læringsdesign
- skill: Design Science
- skill: UX
- skill: Agentisk workflow

### Akt 3 — DNB-sporet

**Quest 10: Kari på OsloMet**

- Etter master/graduation møter spilleren Kari på OsloMet.
- Kari er tidligere medstudent og referanseperson, ikke DNB-rekrutterer.
- Hun peker mot DNB som et spennende miljø.

Mulig kort dialog:

```text
Kari: “Du burde sjekke om DNB har noe ute. Det miljøet tror jeg kan passe deg.”
```

**Quest 11: Hjemme-PC — lag porteføljeside**

- Spilleren går hjem.
- Meta-quest: bygg DNB-porteføljesiden.
- Dette kan være den mest meta delen av spillet: spilleren spiller delen der spillet/siden lages.

Minigame-muligheter:

- velg riktig positioning
- fjern overclaims
- legg Klar som hovedcase
- legg workflow som bevis
- legg kontaktinfo
- gjør siden mindre AI-slop

En AI-agent kan foreslå for brede claims, og spilleren må stramme dem inn.

**Reward:**

- skill: Agentisk workflow II
- skill: Claim boundaries
- skill: Portefølje som produkt
- artifact: DNB-porteføljeside
- DNB-bygget låses opp

### Akt 4 — DNB-bygget

**Quest 12: Lever søknaden**

- Gå til DNB AI Tech-bygget.
- Gå inn i resepsjonen.
- Legg søknadspakken i bunken.
- Egg-easter egg ligger ved siden av, med uleselig liten skrift.

**Win condition:**

```text
Søknadspakke levert
```

Ikke “du fikk jobben”. Bare at søknaden er levert.

## 5. Skill-logg

Skill-loggen skal bære detaljene, slik at dialogene kan være korte.

### Grunnleggende programmering

- C
- Python
- SQL
- Flask / web fundamentals
- JavaScript
- HTML/CSS
- Git basics
- Ordkryss som CS50x-sluttprosjekt

### Deltakende design

- behov hentes fra folk som kjenner problemet
- elevinnsikter som utgangspunkt for første prototype
- workshop og idéarbeid
- meddesign

### Grunnleggende fullstack

- frontend/backend-splitt
- Python/Django
- JavaScript/Vue
- enkel dataflyt
- forløperprototype til Klar

### Design Science

- bygge
- begrunne
- evaluere
- iterere
- artefakt-tenkning

### Fullstack PWA / Klar

- React / Next.js
- Supabase / PostgreSQL
- innlogging og roller
- lærerflate og elevflate
- hjelpekø
- Smart Import
- menneske-i-løkka

### Agentisk workflow

- AI som utviklingspartner
- krav og rammer
- review
- QA
- dokumentasjon
- handoff
- kontekstpraksis

### Agentisk workflow II

- portefølje som produkt
- claim boundaries
- språk- og UX-polish
- styring av agent over flere iterasjoner
- bruk av dokumentasjon som arbeidsminne

## 6. Artifacts / bevis

Artifacts skal være samleobjekter med korte beskrivelser og lenker.

- CS50x-sertifikat
- Ordkryss-video: `https://youtu.be/tI5fU1aAAvI`
- pd-app-frontend repo
- pd-app-backend repo
- Klar live prototype
- Klar repo
- DNB-porteføljeside
- GitHub-profil
- LinkedIn
- eventuelt companion/nikkoprogging repo fra Flutterfly-sidequest

Artifacts bør ikke ha lange forklaringer i questmodalen. De kan ha mer info i en artifact-logg.

## 7. NPC-er og rolle

### Elever

Fiktive/composite NPC-er i klasserommet. Representerer behov, ikke virkelige personer.

- Elev 1: oversikt og struktur
- Elev 2: motivasjon gjennom spill

### Lærere

NPC-er i workshoprommet. Representerer lærerinnsikt.

- tidsbesparende verktøy
- hjelpekø
- opt-in spillelementer

### Kari

Plasseres på OsloMet. Tidligere medstudent og referanseperson. Hun peker mot DNB-sporet etter master/graduation.

### Nikko

Knyttes til sidequest ved Nikkos hus. Kan nevnes via Flutterfly/companion-app, men trenger ikke være tungt til stede i hovedchainen.

### Badeanda

Hintsystem hjemme ved PC-en. Kort, tørr, nyttig. Ikke AI-humor-slop.

### DNB-resepsjonist

Kan være minimal. Skal ikke forklare egget. Kan bare indikere hvor søknaden skal leveres.

## 8. Easter eggs

### Flutterfly

- blå sommerfugl utenfor Nikkos hus
- låser opp sidequest om companion/kompis-app
- gir skill/badge: lokal-first tenkning / rolige systemer teller også

### Egget

- ligger ved søknadsbunken i DNB-resepsjonen
- tekst ved inspeksjon:

```text
Du prøver å lese teksten, men den er altfor liten.
```

Ikke forklar mer.

### Badeanda

Kan ha små kommentarer gjennom spillet. Ikke for mange.

## 9. Dialog- og tekstregler

Spillet må unngå tekstvegger og AI-slop.

### Questdialog maks

- 1 stemningssetning
- 2–3 korte punkter
- 1 tydelig handling
- 1 tydelig reward

### Språkstil

- konkret
- kort
- menneskelig
- litt humor, men tørt
- ingen lange forklaringer av hvorfor ting er smart
- show, don’t tell

### Unngå

- “Dette er ikke X, men Y” gjentatt
- “ærlig grense” overalt
- “claim-safe” som synlig spilltekst hele tiden
- lange akademiske forklaringer
- AI-genererte punchlines
- for mye moraliserende tekst

## 10. Endgame

Når spilleren leverer søknadspakken i DNB-resepsjonen, vises endgame-skjermen.

**Tittel:**

```text
Søknadspakke levert
```

**Kort endgame-tekst:**

```text
Jeg søker ikke fordi jeg tror jeg er ferdig utlært. Jeg søker fordi jeg har funnet ut at programmering, AI-verktøy og systembygging gir meg energi, og fordi jeg vil bli skikkelig god i et miljø der læring og bidrag faktisk betyr noe.
```

**Vis:**

- fullførte quests
- skills låst opp
- artifacts samlet
- optional easter eggs funnet
- kontaktknapper

**Knapper:**

- GitHub
- LinkedIn
- E-post
- Ring meg (`94186688`)
- Spill på nytt
- Tilbake til portefølje

## 11. Neste designsteg

Før agenten bygger 2D-versjonen bør vi lage:

1. interiørkart for hvert bygg
2. detaljerte quest triggers
3. NPC-dialog v1
4. skill-loggtekst v1
5. artifact-loggtekst v1
6. teknisk implementasjonsstrategi

Første playable vertical slice bør være liten:

- worldmap med skole, hjem, OsloMet, Nikkos hus og DNB-bygget
- klasserom-start
- hjem til Ordkryss
- PC-minigame
- skill/artifact unlock
- basic skill-logg og quest-logg
- låste dører som gir tydelig feedback

Når denne fungerer, kan Workshop-, master- og DNB-chainen bygges videre.
