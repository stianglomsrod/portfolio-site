# Levende logg — stianglomsrod.no v3

> Levende dokument. Oppdateres i hver arbeidsøkt: nye endringer øverst i
> changeloggen, gjeld inn/ut av gjeldslista, regler føyes til når de blir
> til. Claude har ansvar for å holde den à jour.

## Changelog

### 2026-07-10 (natt, del 2) — Stians punchliste etter prod-lansering
- **Spillet i produksjon var grønn rutenett-grafikk** (Phasers
  mangler-tekstur): Phaser 3.9 laster bilder som XHR → blob-URL, og
  CSP-en manglet `blob:` i img-src. I dev er det ingen CSP — derfor
  virket alt lokalt. Fikset i vercel.json (`img-src 'self' data: blob:`).
  LÆRDOM: nye browser-APIer i prod-problemer? Sjekk CSP-en først.
- **Hero-matrisen har aldri mer scrollbar**: rutene ligger i grid
  `repeat(30, minmax(0, 18px))` og krymper med plassen i stedet for å
  scrolle (7,4px på mobil, 18px på desktop).
- **Forsidene rendres per forespørsel** (`prerender = false` + s-maxage
  900/SWR) så matrisen og «aktiv i dag» alltid er ferske. github.ts
  leser tokenet ved kall-tid (process.env i runtime) og events-cachen
  fikk 5 min TTL (varme lambdaer gjenbrukte ellers svaret evig).
  Live heatmap i prod krever GITHUB_TOKEN som Vercel-env (Stians hånd).
- **Flytskjemaet på /slik-jobber-jeg får plass i én viewport** (~785px):
  hvert steg er nå en vannrett rad — node | arm | diamant | nei-piller —
  i grid med delte spor. Returlinjene rutes fortsatt i høyrefeltet;
  rute a går inn nederst i node 3 ('bunn'-inngang). Readme-bredden er
  bundet til samme formel som flyten (`min(940px, 100% - 120px)`) så
  kant-sjekken holder.
- **Ordkryss-tekstene strippet for historie**: «skriv inn ordene elevene
  skal finne», ingen CS50x-omtale på siden eller kortene (begge språk).
- QA: bygg grønt, axe 0/16, kant-sjekk 0/16.

### 2026-07-10 (natt) — Ordkryss-wizard, smooth nav-scroll, v3 til produksjon
- **Ordkryss er nå en wizard i fire steg** (tittel → ord → innstillinger →
  forhåndsvisning) med Forrige/Neste. Bilde per ord er en 48px-knapp i
  selve ordraden (klikk = legg til/bytt, FileReader → data-URL, blir med
  på utskriften). Ordlista tåler utkast fra eldre versjoner med andre
  feltnavn (alt som ikke er streng behandles som tomt) — gamle utkast i
  localStorage krasjet ellers hele skriptet.
- **Nav-auto-hide bygget om fra terskel til proporsjonal glidning**:
  naven følger scrollen piksel for piksel (som om den lå i dokumentet)
  og snapper mykt helt inn/ut i brukerens siste scrollretning når
  scrollen stopper (140ms ro). Transition ligger kun på snapp-klassen
  `.glir` — under aktiv scroll setter JS transformen direkte, ellers
  blir det gummistrikk-lag. Fokus i naven overstyrer alltid skjuling.
  Det gamle «ett tick ingenting, to tick hopp»-mønsteret er borte.
- **v3 er produksjonsgrenen**: main på GitHub = v3-koden. Den gamle
  Next.js-siten (2e07486, siste deployede) er bevart som branch
  `legacy-nextjs` på GitHub — ikke slett den.
- **Vercel**: repoet er koblet til TRE prosjekter (stianglomsrod = prod
  med domenet, portfolio-site-v3, vgx-pitch). Prod-prosjektet sto med
  Framework Preset = Next.js og avviste Astro-bygget i stillhet — flippet
  til Astro med `vercel project update stianglomsrod --framework astro`
  (godkjent av Stian; reverseres med `--framework nextjs`).
- QA før push: bygg grønt, axe 0 brudd på 16 ruter, kant-sjekk 0 avvik,
  wizard testet ende-til-ende i preview.

### 2026-07-10 — Kant-flukt løst systemisk: border-box + kant-sjekk i QA
- **Global `box-sizing: border-box`** i Base: rotårsaken til alle
  «skjeve kanter» var content-box, der padded blokker (readme, moduler)
  stakk forbi naboer med samme max-width. Nå ER oppgitt bredde
  ytterkanten.
- **Sandbox**: kortene og hue-modulen deler grid (to eksplisitte spor,
  modulen spenner raden) — målt piksel-eksakt lik høyrekant. Merk:
  auto-fit fungerte IKKE her (full-rad-elementet holdt et tomt tredje
  spor i live). HueVelger har ikke lenger egen max-width; konteksten
  bestemmer. Readme-blokka på how-i-work deler kant med flyt-nodene.
- **Ny programmatisk vakt**: `_baseline/qa/kant-sjekk.mjs` måler alle 16
  ruter og feiler hvis en blokk-flate verken har nabo til høyre eller
  når sidens/containerens høyre kant. Inne i grids sjekkes hver rad
  unntatt den siste (ufullstendig sisterad er normal brekking). Kjøres
  sammen med axe før commit av UI-endringer.

### 2026-07-09 (natt, del 2) — Tospråklig side, tema-switch, Ordkryss i /sandbox
- **Engelsk versjon av hele siden** under /en/ med engelske slugger
  (/en/projects, /en/journey, /en/how-i-work, /en/about, /en/colophon,
  /en/sandbox, /en/sandbox/wordsearch). Tvilling-kartet og delte
  UI-tekster bor i `src/lib/i18n.ts`. REGEL: hver norsk side har en
  engelsk tvilling — endrer du innhold på den ene, endre den andre
  (kommentar øverst i hver tvilling sier hvor).
- **Språkvelger** i nav: lenke til tvillingsiden (EN/NO) med hreflang;
  URL-en er språkvalget, ingen JS-tilstand. `<html lang>` og
  hreflang-alternates settes per side.
- **Tema er nå en ekte switch** (role="switch", aria-checked, spor med
  sol/måne og glidende kule) i stedet for tekstknapp.
- **Ordkryss inn i /sandbox** som eget verktøy på begge språk:
  kjerne i `src/lib/ordkryss-kjerne.ts`, UI i
  `src/components/OrdkryssVerktoy.astro` (print-CSS skjuler nav/footer,
  arket er alltid hvitt). Sandbox har nå kortgrid med spill + verktøy.
  CS50x-kortet lenker til verktøyet i stedet for YouTube-demoen.
- **UU**: lysboks-telleren fikk aria-live, relativ-tid følger sidens
  språk, Kontaktskjema/HueVelger/Hero/Nav/Footer tar lang-prop, skjema-
  meldinger følger `<html lang>`. Axe: 0 brudd på alle 16 ruter.

### 2026-07-09 (natt) — Mobilnav som rad, kolofon-tekst, Ordkryss v2
- **Mobilnav**: menyen brekker til egen rad under merket/tema-knappen —
  alle seks punktene synlige, ingen hamburger (guiden) og ingen
  halvskjult horisontal scroll. Portrettet på /om sentreres på mobil.
- **Kolofon/Prosessen** omskrevet etter Stians diktat: Claude Design
  fikk god kontekst for å iterere designguiden; guiden ble overlevert
  Claude Code som jobbet med skills Stian har laget (/prd,
  /norwegian-software-guardrails, /secure-dev-guardrails).
- **CS50x-kortet**: «… et lite, ekte studentprosjekt der bugs og worst
  practices er ivaretatt.» Tankestreker fjernet i prosjekter.json og
  om-ingressen.
- **Ordkryss v2 bygget** i `C:\Users\x_ray\kode 2026\Claude\cs50x final
  project` (ikke git-repo): nytt ordletingsark-verktøy for lærere i ren
  vanilla JS (index.html + ordkryss.css + ordkryss.js). Vannrett/
  loddrett/diagonal innsetting med kryssing, bilde per ord (valgfritt,
  også «bare bilder»-modus), utskrift + fasit-utskrift, bannordfilter
  på input OG hele rutenettet i alle leseretninger (norsk, engelsk,
  svensk/dansk, tysk, spansk, fransk), utkast i localStorage. 34
  Node-tester grønne (plassering alle retninger, skann alle retninger,
  100 rene stress-genereringer). Originalfilene står som tidsdokument.

### 2026-07-09 (kveld) — UX-opprydding: scroll, hover, mobil/UU
- **Scroll-glitchen fikset** (blanke felt og klippet hero under scroll):
  den permanente `transition: --hue/--hue2` på `html` holdt hele siden i
  animasjonsberedskap og ødela scroll-compositing i Chromium. Transitionen
  ligger nå på en midlertidig `.hue-glir`-klasse som hue.ts setter rundt
  slider-/tilbakestill-endringer. I tillegg fikk sticky-naven
  `will-change: transform` (eget compositor-lag).
- **Mobil-overflow fikset**: nav-menyen presset siden 330px utover skjermen
  på 375px — flex-elementet manglet `min-width: 0`, så menyens interne
  scroll aldri slo inn. Alle 7 ruter er nå målt til 0 horisontal overflow.
- **Hover roet ned**: kort og sandbox-kort løfter seg 3px uten skalering
  (scale ga tekst-shimmer), 160ms. Galleri 1.02.
- **Nav-auto-hide**: slår først inn ved y > 160 og hysterese 16px (mindre
  flimring rundt heroen).
- **UU**: nav-punkter, hue-slidere og tilbakestill-knappen har min. 44px
  trykkflate. Testet: lysboks (åpne/bla/piltast/lukk), tema-toggle,
  kortklikk gjennom brødtekst, scroll ned/opp. Axe: 0 brudd på 7 ruter.
- **Hero-setningen**: «Jobber med del 2 av 15 i Full Stack Open.
  Tokenmaxxer med Fable 5 etter nok en reset.» («og rydder i gamle
  prosjekter …» er ute; «Tar del» → «Jobber med del»).

### 2026-07-09 — Flytskjema med etablert symbolspråk (1e3b1d7)
- /slik-jobber-jeg: beslutningsdiamanter («alt grønt?», «godkjent?») med
  merkede utganger, vannrette nei-piller med mål (↺ 3, → 1, → 2),
  strektype per funksjon (heltrukket/stiplet/prikket) og tegnforklaring.
  Roterte SVG-etiketter og duplikate ↺-rader fjernet.
- Tokenmaxx-notisen flyttet fra egen linje til slutten av H1.
- Sandbox-ingress omskrevet.

### 2026-07-09 — Flukt, klikkbare kort, aksent-hue, større tekst (d665fd6)
- Hovedcase/kort-grid/reisen-blokk fyller ramma (1060px) — kantene flukter.
- Typografi opp: brødtekst 17px, småtekst +0,5–1px.
- Kort klikkbare (strukket lenke; historie-lenke vinner, ellers første),
  lenkesone-fot beholdt klikkbar over.
- Hue-modul: grunnfarge + aksent (hue2) + «tilbakestill fargene».
- docs/HANDOVER-PROMPT.md opprettet.

### 2026-07-09 — Hue-drevet helsidepalett + auto-hide nav (79a3649)
- Hele paletten oklch(L C var(--hue/--hue2)), L/C låst → AA uansett tone.
- Sticky nav med auto-hide og egen --nav-bg-nyanse.
- Kortfot for lenker, pil-hover, --overskrift-token.
- Lys feilfarge senket til L 49,5 % (verst målt 4,82:1).

*(Eldre historikk: se git-loggen på v3.)*

## Teknisk gjeld

| Hva | Hvorfor det ligger | Neste steg |
| --- | --- | --- |
| Release-gate ikke fullført mot produksjon | v3 gikk til prod 2026-07-10 før Lighthouse-gate; env-vars (GITHUB_TOKEN, RESEND_API_KEY) + Resend-DNS gjenstår (Stians hånd) | Lighthouse ≥95 alle ruter mot stianglomsrod.no + manuell gjennomspilling |
| Kontaktskjema svarer 503 uten RESEND_API_KEY | Villet fail-closed til nøkkelen er satt | Sett env-var i Vercel |
| Ordkryss finnes i to utgaver | Siten har den levende (/sandbox/ordkryss, kjerne i src/lib); den frittstående i cs50x-mappa har Node-testene og er ikke i git | Hold kjernene i synk ved endring; vurder å flytte testene inn i repoet |
| mp3-diett for spilllyd | ffmpeg mangler på maskinen | Komprimer når ffmpeg finnes |
| size-adjust-fallbacks for fonter | Ikke prioritert | Reduserer CLS ved font-swap |
| OG-delingsbilde | Tilbudt, ubesvart | Lag hvis ønsket |
| PRD/overleveringspakke utdatert mot guide v3 | Helomvendingen | Revider dokumentene |
| Lori Frisør skriftlig godkjenning | Ikke blokkerende (dagens nivå) | Arkiver når den kommer |
| `data-node`-attributtene i flytskjemaet er ubrukte | Script bruker rekkefølge, ikke attributt | Fjern eller ta i bruk ved neste berøring |

## Regler som har blitt til underveis

**Sannhet**
- Klar er fungerende prototype (evaluert med lærere), IKKE i produksjon
  eller daglig bruk. Participatory design som metode; elever kun i
  forløperprosjektet. Aldri finn på tall/brukere/effekter.
- Lori Frisør: kun dagens offentlige nivå til skriftlig godkjenning.
- Usikker på en påstand? Spør Stian.

**Språk**
- Bokmål, klartekst. Ingen AI-markører: ikke tankestrek-mani, ikke
  «ikke bare X, men Y», ikke aforismer, ikke konsulentspråk.
- «digitalt læringsdesign». Tooling-arbeid (skills, persistent rules,
  loops) kommuniseres uten å si «ikke bare vibecoding».

**Tospråklighet**
- Norsk bor på rot, engelsk under /en/ med engelske slugger. Tvilling-
  kartet er `RUTEKART` i src/lib/i18n.ts — nye sider registreres der.
- Endrer du innhold i en side, endre den engelske/norske tvillingen.
  Sannhets- og språkreglene gjelder begge språk (EN: klar engelsk uten
  buzzwords, samme ærlighet om prototype-status).

**Design/kode**
- Fargetokens: kun oklch med LÅST L/C; toner styres av --hue (flater/
  tekst) og --hue2 (aksent). Endrer du L/C, må kontrasten måles på nytt.
- Ingen permanente transitions på rot-elementet (ga scroll-glitcher);
  bruk midlertidig klasse rundt endringen.
- Ikke `scale()` på flater med tekst i hover (shimmer) — bruk translateY.
- Flex-elementer som skal kunne krympe trenger `min-width: 0`.
- Blokk-flater får ALDRI egen max-width i px når de står i en kolonne
  med naboer — de fyller sporet sitt, og grid-en eier bredden. Kjør
  `node _baseline/qa/kant-sjekk.mjs` etter layoutendringer.
- auto-fit kollapser bare helt tomme spor: et element med
  `grid-column: 1/-1` holder alle sporene i live. Bruk eksplisitt
  spor-antall når grid-en har fullrads-elementer.
- Salvie kun om det levende/handlekraftige. Ingen kode-estetikk.
- Trykkflater min. 44px. Axe skal stå i 0 brudd på alle 7 ruter.
- Etiketter i diagrammer står alltid vannrett; beslutninger = diamant med
  alle utganger merket.

**Rigg**
- Commit med `git commit -F <fil>` (PS 5.1 brekker anførselstegn).
- Datafila heter `src/data/now.json` — aldri `now.json` i rota (Vercel).
- `vercel.json` = security-headers, må ikke overskrives.
- Fonter: nytt filnavn ved glyf-endring (cache-bust);
  font-variation-settings, ikke font-stretch %.
- QA: `node _baseline/qa/axe-v3.mjs` (dev-server på :4322).
- Dev-server må restartes etter mange raske filskrivinger hvis HMR
  serverer gamle scoped styles.
- Astro dev-toolbar er den mørke pillen nederst i dev — finnes ikke i
  produksjonsbygg.
