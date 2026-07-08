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

## 2026-07-08 · Guardrails-port kjørt på nytt ved onboarding

- **Hva:** `norwegian-software-guardrails` kjørt; PRD-ens påstand om 🟢 GRØNT
  bekreftet. Register opprettet i `docs/compliance/compliance_register.md`.
- **Begrunnelse:** Fast arbeidsmåte for porteføljeprosjekter (port før kode).
  Ett presiseringspunkt utover PRD-en: Resend/Vercel må dokumenteres som
  databehandlere med EU-region/DPA-vurdering i personvernteksten (Done 17).
- **Commit:** a48219b
- **Reversering:** `git revert a48219b`
