# Levende logg — stianglomsrod.no v3

> Levende dokument. Oppdateres i hver arbeidsøkt: nye endringer øverst i
> changeloggen, gjeld inn/ut av gjeldslista, regler føyes til når de blir
> til. Claude har ansvar for å holde den à jour.

## Changelog

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
| Release-gate ikke kjørt på ekte preview | Venter på Vercel-prosjekt fra v3 + env-vars (GITHUB_TOKEN, RESEND_API_KEY) + Resend-DNS (Stians hånd) | Lighthouse ≥95 alle ruter + manuell gjennomspilling på preview-URL, så domene-flipp |
| Kontaktskjema svarer 503 uten RESEND_API_KEY | Villet fail-closed til nøkkelen er satt | Sett env-var i Vercel |
| Ordkryss v2 er ikke deployet og ikke i git | Bygget lokalt i cs50x-mappa; porteføljens ordkryssDemo-lenke peker fortsatt på YouTube-videoen | git init + deploy (f.eks. Vercel/Pages), så oppdatere prosjekter.json |
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

**Design/kode**
- Fargetokens: kun oklch med LÅST L/C; toner styres av --hue (flater/
  tekst) og --hue2 (aksent). Endrer du L/C, må kontrasten måles på nytt.
- Ingen permanente transitions på rot-elementet (ga scroll-glitcher);
  bruk midlertidig klasse rundt endringen.
- Ikke `scale()` på flater med tekst i hover (shimmer) — bruk translateY.
- Flex-elementer som skal kunne krympe trenger `min-width: 0`.
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
