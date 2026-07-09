# BESLUTNINGER.md — append-only beslutningslogg

Regler: nye oppføringer legges ALLTID nederst, eksisterende oppføringer endres
aldri. Spec-endringer (docs/handoff/) skal ha egen `spec:`-commit, oppføring her
med commit-hash og reverseringskommando, og push til GitHub.

---

## 2026-07-08 · Prosjektmappe og repo-oppsett

- **Hva:** Startpakken for v2 importert til `docs/handoff/` (kildeversjonert).
  Prosjektmappe: `C:\Users\x_ray\kode 2026\Claude\hjemmeside` — valgt eksplisitt
  av Stian i økta (i stedet for standardforslaget om søskenmappe til lori).
- **Begrunnelse:** Startprompten krever handoff-filene versjonert i repoet før
  bygging. Spørsmålet om gjenbruk av portfolio-site-repoet vs. nytt repo avgjøres
  først etter Fase 0 (jf. startprompt punkt 2); inntil da er dette et lokalt repo
  uten remote.
- **Commit:** a48219b
- **Reversering:** `git revert a48219b`

## 2026-07-08 · Nytt repo valgt for v2 (Fase 0-beslutningspunktet)

- **Hva:** Stian valgte «nytt repo» etter Fase 0-presentasjonen: v2 bygges videre
  i dette repoet, som pushes til GitHub som `stianglomsrod-no` (offentlig).
  `portfolio-site` står urørt som kjørende fallback til release-gaten er grønn;
  domene-flip i Vercel ved lansering.
- **Begrunnelse:** Stackbytte (Next → Astro) gjør gjenbruk meningsløst; nylig
  deployet generalisering av dagens side skal ha ro; ren byggehistorikk er selv
  kolofon-innhold. Full vurdering i docs/innsikt/QA-RAPPORT.md.
- **Reversering:** `git remote remove origin` + slett GitHub-repoet; dagens side
  er uberørt uansett.

## 2026-07-09 · HELOMVENDING: Endelig Guide v3 erstatter v1/v2 som kanonisk

- **Hva:** Stian leverte «Endelig Guide v3» (grunnlag 6d «Åpningstider», PDF i
  docs/handoff/) og besluttet omstart av designet. v3 fjerner all kode-estetikk
  (terminaler, kodeblokker, mono-labels), innfører varm grønnsvart palett med
  salvie som eneste meningsbærende farge, Hanken Grotesk + Atkinson, og hero
  som én levende klartekst-setning med aktivitetsmatrisen som bevis.
  Strategi valgt av Stian: **re-skin** — funksjonslaget (GitHub-lib,
  kontakt-API, spillport, tema, fallbacks) beholdes; flatene bygges om.
- **Konsekvens:** PRD-ens Done 2–6 (kodeblokk-hero, Node-REPL, ticker) er
  utdatert inntil overleveringspakka revideres; v1 §09 (harde krav/sjekkliste)
  arves. Ticker, STIAN(1)-manside og korrektur-stempel utgår.
- **Reversering:** `git revert` av spec-commiten + tokens-/flate-commitene på
  v3-grenen; v2-designet ligger komplett i historikken t.o.m. 7d58d89.

## 2026-07-09 · Arbeidet flyttet til portfolio-site (gren v3)

- **Hva:** Stian besluttet at byggingen skal skje i
  github.com/stianglomsrod/portfolio-site (gren `v3`; `main` = dagens
  live-side, urørt til release). Reverserer «nytt repo»-beslutningen fra
  08.07. Repoet stianglomsrod-no arkiveres (read-only) etter flytting —
  også Stians valg.
- **Begrunnelse:** Én kodebase og én historikk for siden hans; grenen bærer
  hele v2-historikken videre så ingenting går tapt.
- **Reversering:** `git push -d origin v3` + av-arkivering av
  stianglomsrod-no på GitHub (begge reversible).

## 2026-07-08 · Guardrails-port kjørt på nytt ved onboarding

- **Hva:** `norwegian-software-guardrails` kjørt; PRD-ens påstand om 🟢 GRØNT
  bekreftet. Register opprettet i `docs/compliance/compliance_register.md`.
- **Begrunnelse:** Fast arbeidsmåte for porteføljeprosjekter (port før kode).
  Ett presiseringspunkt utover PRD-en: Resend/Vercel må dokumenteres som
  databehandlere med EU-region/DPA-vurdering i personvernteksten (Done 17).
- **Commit:** a48219b
- **Reversering:** `git revert a48219b`
