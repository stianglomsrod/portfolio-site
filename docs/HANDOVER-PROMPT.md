# Handover-prompt: stianglomsrod.no v3

> Lim inn denne som første melding til en ny Claude Code-økt i repo-rota
> (`C:\Users\x_ray\kode 2026\Claude\hjemmeside`). Alt under er konteksten
> økta trenger for å plukke opp tråden.

---

Du overtar arbeidet med **stianglomsrod.no** — porteføljesiden til Stian
Glomsrød (lærer på Kongeveien skole, på vei inn i utviklerrollen, søker
utvikler/UX/AI-native-jobb). Les denne fila og skum `BESLUTNINGER.md` +
`docs/handoff/` før du gjør noe.

## Repo og grener

- Repo: `github.com/stianglomsrod/portfolio-site`, arbeidskatalog
  `C:\Users\x_ray\kode 2026\Claude\hjemmeside`.
- **`v3` er produksjonsgrenen** — alt arbeid skjer her, og Vercel skal bygge
  fra v3. `main` er dagens gamle live-side og skal stå urørt til
  domene-flippen. Det skal IKKE merges til main.
- Repoet `stianglomsrod-no` er arkivert og skal ikke brukes.

## Stack

Astro 6 (output `static`, `prerender = false` kun i `/api`-ruter) +
@astrojs/vercel 10 + @astrojs/react (kun spill-øya) + @astrojs/sitemap +
Phaser 3.90 (spillet «Skamløs pitch» på /sandbox/skamlos-pitch).
Self-hostede fonter (subsettet med pyftsubset): Hanken Grotesk (overskrifter,
labels), Atkinson Hyperlegible (brødtekst), Anybody (KUN navnetrekket
«stiglo.», subsettet til s/t/i/g/l/o/punktum i `anybody-stiglo.woff2`).

## Designgrunnlag (kanonisk)

`docs/handoff/Endelig_Guide_v3.pdf` («Åpningstider»). Kjerneprinsipper:

- Klartekst uten kode-estetikk. Ingen terminal-/mono-pynt.
- Varm grønnsvart bakgrunn, salvie som aksent — salvie brukes **kun** om det
  som er levende/handlekraftig (API-drevne ord, puls, CTA, lenker).
- Hero = én levende setning fra `src/data/now.json` (H1), med
  GitHub-aktivitetsmatrisen som bevis rett under.
- Mørkt tema er standard; lys følger prefers-color-scheme, manuell
  overstyring i localStorage `data-theme`. Cookiefritt, ingen sporing.

## Fargesystemet (viktig å forstå før du rører tokens)

Hele paletten i `src/styles/tokens.css` er **hue-drevet oklch**: hver farge
er `oklch(L% C var(--hue))` eller `var(--hue2)` med LÅST lysstyrke/metning.
Kontrast er målt og holder AA uansett tone — så lenge du aldri endrer L/C.

- `--hue` (grunnfarge): flater, bakgrunn, tekst, dempet, linjer.
- `--hue2` (aksent): salvie, overskrifter, heatmap nivå 1–4, sandbox-aksent.
  Følger grunnfargen til brukeren løsner den.
- Begge er `@property`-registrert med initial 158 (kalibrert fra guidens
  grønne hex-verdier) og har 500 ms transition på `html` — rotasjonen skal
  være myk.
- Slidere + «tilbakestill fargene» bor i `src/components/HueVelger.astro`
  (/sandbox). Persistens: localStorage `hue`/`hue2`, leses før first paint i
  `src/layouts/Base.astro`. Klient-API i `src/lib/hue.ts`.
- `--feil` er `calc(var(--hue) + 216)` — L er senket i lys modus så AA
  holder på alle toner (verst målt 4,82:1).

## Sannhetsregler (absolutte — brutt tekst har blitt rettet flere ganger)

- Klar er **ikke** i produksjon eller daglig bruk. Riktig: «fungerende
  prototype, evaluert med lærere», bygd med participatory design som metode.
  Elever deltok kun i forløperprosjektet.
- Aldri finn på tall, brukere eller effekter. Aldri overselg.
- Lori Frisør vises på dagens offentlige nivå til skriftlig godkjenning
  foreligger (ikke blokkerende, men ingen NY eksponering).
- Spør Stian om du er usikker på om en påstand stemmer.

## Språkregler (håndheves hardt av Stian)

- Norsk bokmål. Ingen AI-markører: ikke tankestrek-mani, ikke «ikke bare X,
  men Y», ikke aforismer, ikke konsulentspråk («enablement», «pragmatisk
  leveranse»). Skriv korte, konkrete setninger.
- «digitalt læringsdesign» (ikke «digital»).
- Kommuniser at Stian jobber med tooling (skills, persistent rules,
  loops med suksesskriterier) uten å si «ikke bare vibecoding».

## Rigg og gotchas

- **PowerShell 5.1**: doble anførselstegn i here-strings til git brekker
  argumenter — commit med `git commit -F <fil>`. Aldri single-element
  nested arrays (`@(@('a','b'))` flater ut og har korruptert filer før).
- **Vercel**: en fil som heter `now.json` i repo-rota stopper bygget
  (legacy-konfignavn). Datafila bor derfor i `src/data/now.json`.
  `vercel.json` i rota er security-headers (CSP, HSTS preload m.m.) og må
  ikke overskrives.
- **Byggegate**: `scripts/check-skamlos-content.mjs` kjører som prebuild og
  feiler bygget ved literale kilde-URL-er i spillkoden m.m.
- **Fonter**: endrer du glyfer i subsettet, gi fila nytt navn (cache-bust)
  og bruk `font-variation-settings` (ikke `font-stretch %`).
- **QA-rigg** (gitignored): `_baseline/qa/axe-v3.mjs` kjører axe på alle 7
  ruter (`node _baseline/qa/axe-v3.mjs`, krever dev-server på :4322).
  Kontrast måles via canvas-piksler (computed colors er oklch-strenger).
- `.env` (ikke sporet): `GITHUB_TOKEN` for heatmap/commits (GraphQL).
  Fallback: `src/data/github-fallback.json` — siden feiler alltid trygt.
- Dev-server: `npm run dev` på port 4322 (se `.claude/launch.json` i
  Grindverk-repoet hvis du bruker preview-verktøy).

## Tilstand akkurat nå (2026-07-09)

Sist committet på v3: hue-drevet helsidepalett, auto-hide sticky nav med
egen `--nav-bg`-nyanse, prosjektkort med lenkesone som kortfot og pil-hover,
salvie-titler, klikkbare kort (strukket lenke: historie-lenke der den
finnes, ellers første lenke), galleri-hover, hue2-aksentslider +
tilbakestill-knapp, typografi-bump (brødtekst 17px, småtekst +0,5–1px),
breddejustering (hovedcase/kort-grid/reisen-blokk fyller ramma på 1060px så
kantene flukter). Tokenmaxx-notisen bor i `src/data/now.json`
(`notis`/`notisNaar`) og rendres i hero + reisen — slett feltene når den er
utdatert.

Verifisert lokalt: bygg grønt, axe 0 brudd på 7 ruter, kontrastmatrise ved
flere hue-verdier i begge temaer.

## Gjenstående arbeid

1. **Release-gate på Vercel-preview** (venter på Stian: Vercel-prosjekt som
   bygger v3, env-vars `GITHUB_TOKEN` + `RESEND_API_KEY`, Resend
   DNS-verifisering): Lighthouse ≥95 på alle ruter, full manuell
   gjennomspilling, axe på preview-URL. Deretter domene-flipp.
2. Kontaktskjemaet svarer 503 «ikke-konfigurert» til RESEND_API_KEY er satt
   — det er villet oppførsel.
3. Ubesvart tilbud: OG-delingsbilde.
4. TODO-er: mp3-diett for spilllyd (ffmpeg mangler på maskinen),
   size-adjust-fallbacks for fontene.
5. PRD/overleveringspakka skal revideres mot guide v3 («neste: oppdatere
   overleveringspakka»).

## Arbeidsform Stian forventer

- Verifiser alt du påstår (bygg, axe, målinger) og rapporter ærlig — si
  aldri at noe er ferdig før release-gaten er kjørt på ekte preview.
- Still avklaringsspørsmål ved tvil om fakta eller design, ellers jobb
  selvstendig i lengre økter.
- Committene skrives på norsk, med begrunnelse og hva som er verifisert.
- Ved UI-endringer: sjekk begge temaer, flere hue-verdier, reduced motion
  og tastaturnavigasjon.
