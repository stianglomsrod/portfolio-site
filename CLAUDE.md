# stianglomsrod.no v2 — prosjekthukommelse

Nybygg av stianglomsrod.no: personlig utviklerportefølje + sandbox, «et kjørende
program, ikke en brosjyre». Bygges med goal-loop i Claude Code.

## Goal

`docs/handoff/PRD-stianglomsrod-no-v2.md` er `/goal`. Done-kriteriene 1–22 er
suksesskriteriene; goalen er ikke oppfylt før alle passerer.

## Kildeprioritet ved konflikt (revidert 09.07.2026)

**Endelig Guide v3 («Åpningstider», PDF i docs/handoff/) er kanonisk for alt
design** og erstatter Guide v1/v2 og PRD-ens estetikk-punkter. Fra v1 arves
KUN harde krav og sjekklista (§09). PRD-en gjelder fortsatt for funksjonelle
krav (datakilder, sikkerhet, spill, gate) — men hero-/terminal-/tickerpunktene
(Done 2–6) er utdaterte til overleveringspakka er revidert (guiden: «neste:
oppdatere overleveringspakka»).

v3s kjerneprinsipper: klartekst aldri kostyme (ingen terminaler, kodeblokker,
mono-labels) · påstand + kvittering · salvie kun om levende/handlekraftig ·
lekenhet i detaljene. Hero = én levende setning fra now.json + GitHub med
aktivitetsmatrisen som bevis under.

## Repo (revidert 11.07.2026)

Repo: github.com/stianglomsrod/portfolio-site. **`main` er produksjonsgrenen**
— v3-koden gikk til prod (stianglomsrod.no) 2026-07-10, og alt arbeid skjer nå
på main. Den gamle Next.js-siden er bevart som gren `legacy-nextjs` (ikke
slett). Grenen `v3` er historisk og synces ikke lenger. Det tidligere repoet
stianglomsrod-no er arkivert (historikk t.o.m. flyttingen).

Push til main bygger prod-prosjektet «stianglomsrod» på Vercel direkte —
push er altså prod-deploy og krever grønn QA (bygg + axe + kant-sjekk) først.

**`docs/LOGG.md` er levende logg** og kilden til sannhet om tilstand, teknisk
gjeld og regler som har blitt til underveis. Les den ved onboarding; oppdater
den hver økt.

## Invarianter (gjelder hver iterasjon)

- **Rødt blokkerer:** nye/endrede features sjekkes mot compliance-porten
  (skill: `norwegian-software-guardrails`) før kode. Status per 08.07.2026:
  🟢 GRØNT — se `docs/compliance/compliance_register.md`.
- **Grønn release-gate før done:** Done-kriterium 20 må passere før prod-deploy.
- Secrets (`GITHUB_TOKEN`, `RESEND_API_KEY`) kun i miljøvariabler — aldri i
  repo eller klient. Ingen cookies, ingen tredjeparts-requests fra klient,
  ingen analytics.
- Bruk av lagret legitimasjon og irreversible remote-operasjoner (branch-/tag-
  sletting, force-push, repo-innstillinger) krever eksplisitt ja fra Stian i
  sanntid. **Unntak (Stians beslutning 2026-07-11): push til main etter
  fullført arbeid trenger ikke eget klarsignal** — forutsatt grønn QA først
  (bygg + axe + kant-sjekk, og verktøy-/spillsuiter der de er berørt).

## Rapportformat

Etter hver økt: status per kriterienummer, `✓`/`✗` med konkret årsak.

## Endringsregel for spesifikasjonen

Filene i `docs/handoff/` er spesifikasjon og endres KUN når Stian eksplisitt
godkjenner det i økta. Hver godkjent endring får:

- (a) egen commit med prefiks `spec:` og kort beskrivelse — aldri blandet med kode,
- (b) oppføring i `docs/BESLUTNINGER.md` (append-only): tidspunkt, endring,
  begrunnelse, commit-hash og reverseringskommando (`git revert <hash>`),
- (c) umiddelbar push til GitHub (når remote finnes).

## Praktisk

- Levende data (hero-setningen m.m.) bor i `src/data/now.json` — redigeres
  fritt uten spec-prosess. ALDRI legg en fil som heter `now.json` i repo-rota:
  navnet er legacy Vercel-konfig og stopper bygget.
- `_baseline/` er gitignored arbeidsområde for Fase 0 (klon av dagens
  portfolio-site + QA-verktøy). Fase 0-leveransene ligger i `docs/innsikt/`.
- All tekst i guidene er sample (lo-fi); struktur/stil/tilstander er hi-fi og
  følger `docs/handoff/tokens.css` 1:1.
- Redaksjonell tone: brief §10 — tørt, presist, selvironisk der det passer;
  aldri hype, aldri løfter uten kvittering. Klarspråk i alt som ikke er kode.
