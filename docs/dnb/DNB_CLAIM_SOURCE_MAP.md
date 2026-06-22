# DNB Claim Source Map

## 1. Purpose

This document is a pre-implementation evidence and claim-boundary check for the DNB AI-First Engineering portfolio variant.

Before any page component or route is implemented, each major factual or positioning claim in `docs/dnb/DNB_SECTION_COPY_V1.md` must be mapped to available source documentation. Claims without adequate source support must be softened, rewritten, or held back until the user provides the missing evidence.

This map is not a final content approval. It is a quality gate.

---

## 2. Source inventory

### Available in this repo (tracked)

| Path                                                                      | What it can support                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| docs/dnb/DNB_POSITIONING.md                                               | Positioning intent, what to emphasize, what to avoid, tone guidance                   |
| docs/dnb/DNB_WORKFLOW_DNA.md                                              | Core positioning, agent workflow rules, cost-control, source-of-truth for DNB variant |
| docs/dnb/DNB_CONTENT_OUTLINE.md                                           | Approved section structure, evidence points per section, claims guardrails            |
| docs/dnb/DNB_SECTION_COPY_V1.md                                           | First-pass Norwegian copy under review                                                |
| docs/dnb/DNB_QA_CHECKLIST.md                                              | Candidate narrative checks, evidence checks, DNB fit checks                           |
| docs/dnb/DNB_AGENT_HANDOFF_PROTOCOL.md                                    | Agent workflow discipline evidence                                                    |
| docs/dnb/DNB_IMPLEMENTATION_LOG.md                                        | Documentation output evidence, iterative delivery evidence                            |
| docs/context/2026-06-19-agent-context-pack/02_SKILLS_OG_BEVIS.md          | Skills and evidence matrix (compiled from thesis session)                             |
| docs/context/2026-06-19-agent-context-pack/03_AGENTISK_UX_OG_FELTNOTAT.md | Agentic UX principle, real-world design signal                                        |
| AGENTS.md                                                                 | Project governance, positioning rules, commit/artifact policy                         |

### Missing sources (now resolved)

> Update 2026-06-20: the previously missing primary sources are now available locally and captured in tracked, safe form. Raw sources live in `docs/dnb/sources/` (gitignored, PII-protected); distilled evidence is in `docs/dnb/DNB_SOURCE_EVIDENCE_NOTES.md`. The exact DNB posting is now stored at `docs/dnb/DNB_JOB_POSTING.md`.

| Source                     | Status                                                                                                       | Impact on claims                                                                                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exact DNB job posting text | RESOLVED — stored at `docs/dnb/DNB_JOB_POSTING.md`                                                           | Precise role-fit mapping now possible. Enabler/guardrails/innersource themes confirmed; distributed-systems depth is a senior/staff plus only.                                        |
| Master thesis              | RESOLVED — `sources/thesis.pdf` (local-only); distilled in `DNB_SOURCE_EVIDENCE_NOTES.md`                    | Klar tech stack, Smart Import, human-in-the-loop, participatory design, safety/privacy and learning-velocity claims move from Partial to Strong (primary-source-backed).              |
| Diploma transcript         | RESOLVED — `sources/Results_from_Diploma_registry (3).pdf` (local-only, contains national ID — never commit) | Education/credential claims now primary-source-backed (master in digital learning design; graded participatory design, innovation/prototyping, project management, research methods). |
| Self-authored exam prep    | `sources/Eksamensmanus_ord_for_ord.md`, `sources/QA_bank_samtale.md` (local-only)                            | Useful for reasoning/language only. Treat as supporting, NOT load-bearing proof (circular).                                                                                           |
| Klar live deployment       | klar-sigma.vercel.app                                                                                        | Tech stack visually verifiable; now also thesis-backed.                                                                                                                               |

### Cross-repo project evidence (2026-06-22, observed read-only)

Observed repositories:

- `https://github.com/stianglomsrod/klar`
- `https://github.com/stianglomsrod/nikkoprogging` (focus: `companion_app`)
- `https://github.com/stianglomsrod/lori-frisor`

Observed source examples:

- Klar: `PROJECT_DNA.md`, `FILE_TREE.md`, `src/middleware.ts`, `src/app/page.tsx`, `src/app/auth/callback/route.ts`, `src/app/(dashboard)/student/page.tsx`, `src/app/(dashboard)/teacher/students/[id]/page.tsx`, `HANDOVER_STATE.md`, `CODE_AUDIT.md`, `TECH_DEBT.md`.
- Companion: `companion_app/PROJECT_DNA.md`, `companion_app/README.md`, `companion_app/DB_NOTES.md`, `companion_app/docs/plans/PLAN_HISTORY_AND_STATS.md`, `companion_app/docs/plans/PLAN_COMPANION_EVENTS.md`, `companion_app/lib/core/database/app_database.dart`, `companion_app/lib/core/history/drift_history_repository.dart`, `companion_app/test/core/history/drift_history_repository_test.dart`.
- Lori Frisor: `PROJECT_DNA.md`, `DECISIONS.md`, `HANDOFF.md`, `AGENTS.md`, `astro.config.mjs`, `keystatic.config.ts`, `src/lib/content.ts`, `src/layouts/BaseLayout.astro`.

Claim support this enables:

- Cross-project workflow discipline claim support: **Strong project evidence**.
- Enablement/handoff/pragmatic build-vs-integrate claim support: **Strong project evidence**.
- Enterprise-scale platform/distributed-systems claim support: **Not supported** (must remain out of scope).

---

## 3. Claim map

### Hero section

Claim: "Jeg bygger AI-foerst programvare som gjoer komplekse behov om til trygge, fungerende loesninger."
Claim type: Positioning
Source support: Strong
Supporting sources: DNB_POSITIONING.md, DNB_WORKFLOW_DNA.md, DNB_CONTENT_OUTLINE.md
Notes: Consistent with approved positioning. "Trygge, fungerende loesninger" is appropriate framing for AI-first engineering with safety gates.
Action: Keep

Claim: "Bygget Klar som fullstack PWA med tydelige roller, arbeidsflyt og praktiske sikkerhetsrammer."
Claim type: Factual / evidence
Source support: Strong (primary-source-backed)
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §3–4, sources/thesis.pdf, klar-sigma.vercel.app
Notes: Tech stack (React/Next.js, Supabase/PostgreSQL, auth+RBAC, PWA) and roles are now confirmed by the thesis and captured in tracked evidence notes. Upgraded from Partial.
Action: Keep

Claim: "Bruker AI-agenter som utviklingspartnere med klare krav, review-looper og aktiv korreksjon."
Claim type: Factual / evidence
Source support: Strong
Supporting sources: AGENTS.md, DNB_AGENT_HANDOFF_PROTOCOL.md, DNB_IMPLEMENTATION_LOG.md, DNB_WORKFLOW_DNA.md
Notes: This is fully evidenced by the repo documentation itself. The workflow docs, QA checklists, and implementation logs are live artifacts of exactly this behavior.
Action: Keep

Claim: "Kobler innsikt fra brukere og forskning til konkrete tekniske valg i frontend, backend, data og auth."
Claim type: Positioning / interpretation
Source support: Partial
Supporting sources: DNB_POSITIONING.md, DNB_CONTENT_OUTLINE.md section 4
Notes: The participatory design and workshops claim traces to the master thesis. The thesis is not tracked in this repo branch. Repo docs support the intent but not the specific evidence.
Action: Keep — soften if thesis not added: say "basert paa strukturert prosess" rather than implying formal research citations

Claim: "Dokumenterer beslutninger, QA og handoff slik at arbeidet kan etterproeves og viderefoeres."
Claim type: Evidence
Source support: Strong
Supporting sources: DNB_IMPLEMENTATION_LOG.md, DNB_QA_CHECKLIST.md, DNB_AGENT_HANDOFF_PROTOCOL.md, AGENTS.md
Notes: Fully evidenced by the repo documentation artifact set itself.
Action: Keep

---

### How I build with AI section

Claim: Agentic workflow with context, requirements, human review, correction, QA, documentation, handoff, safety gates.
Claim type: Factual / evidence
Source support: Strong
Supporting sources: AGENTS.md (report delivery rule, commit policy), DNB_AGENT_HANDOFF_PROTOCOL.md, DNB_IMPLEMENTATION_LOG.md, DNB_QA_CHECKLIST.md, DNB_WORKFLOW_DNA.md
Notes: This is the most thoroughly evidenced section. The workflow docs, protocol, and log are direct artifacts of the described behavior.
Action: Keep — this is the safest section to implement first

Claim: "Denne arbeidsformen gir baade fart og trygghet. Den er lagbar, laerbar og mulig aa standardisere paa tvers av team."
Claim type: Interpretation / positioning
Source support: Partial
Supporting sources: DNB_POSITIONING.md (enablement section), DNB_COST_CONTROL.md
Notes: "Lagbar og laerbar" is an interpretation claim. The repo shows Stian uses this workflow, not that others have adopted it from him. Softening is appropriate.
Action: Soften — rephrase as "designet for aa kunne deles og laeres av andre" rather than asserting it has been proven reusable

---

### Klar as evidence section

Claim: Fullstack PWA
Claim type: Factual
Source support: Strong (primary-source-backed)
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §3, sources/thesis.pdf, klar-sigma.vercel.app
Notes: PWA + responsive cross-device confirmed by thesis and live site.
Action: Keep

Claim: React og Next.js i frontend
Claim type: Factual
Source support: Strong (primary-source-backed)
Notes: Single React/Next.js codebase serving teacher + student interfaces, confirmed by thesis.
Action: Keep

Claim: Supabase backend med PostgreSQL, autentisering og RBAC
Claim type: Factual
Source support: Strong (primary-source-backed)
Notes: Confirmed by thesis (Supabase/PostgreSQL, auth + role-based access).
Action: Keep

Claim: Tydelige laerer- og elevroller med ulike behov og grensesnitt
Claim type: Factual
Source support: Strong (primary-source-backed)
Notes: Teacher/student role split confirmed by thesis.
Action: Keep

Claim: Smart Import ble valgt for aa loese et konkret flaskehalsproblem
Claim type: Factual / evidence
Source support: Strong (primary-source-backed)
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §4, sources/thesis.pdf, DNB_CONTENT_OUTLINE.md section 3
Notes: AI parsing of weekly letters to structured tasks, chosen to solve the teacher time bottleneck; validated in evaluation workshop as strongest adoption driver.
Action: Keep

Claim: Menneske-i-loekka-forhaandsvisning foer publisering
Claim type: Factual / evidence
Source support: Strong (primary-source-backed)
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §4, sources/thesis.pdf
Notes: Editable preview before publish confirmed by thesis; doubles as a privacy/error-control gate. Maps to the posting's "agent guardrails" theme.
Action: Keep

Claim: "Loesningen er utviklet med tydelige begrensninger for datahåndtering og ansvar."
Claim type: Factual / positioning
Source support: Strong (primary-source-backed) for general framing
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §6, sources/thesis.pdf
Notes: Sikt approval, consent, data minimisation, declared AI use are all in the thesis. Keep general on-page; do not name Sikt/GDPR unless user approves.
Action: Keep general framing

Claim: "Klar presenteres som robust prototype/fullstack bevis, ikke som ferdig plattform i enterprise-skala."
Claim type: Positioning / honest disclaimer
Source support: Strong
Supporting sources: DNB_CONTENT_OUTLINE.md, DNB_POSITIONING.md, 02_SKILLS_OG_BEVIS.md
Notes: This disclaimer is present in all planning docs and is critical to maintain.
Action: Keep — this is a required disclaimer

---

### Participatory Design / workshop / user-centered design section

Claim: Participatory Design for medvirkning og realistisk problemforstaelse
Claim type: Factual / evidence
Source support: Strong (primary-source-backed)
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §2,§5, sources/thesis.pdf, sources/diploma (graded Participatory Design course)
Notes: Participatory design is both an examined method in the thesis and a graded master course on the diploma. Specific workshop techniques (empathy maps, Crazy Eights, journey mapping) are now primary-source-backed and may be referenced soberly.
Action: Keep

Claim: Design Science for aa koble problem, artefakt og evaluering
Claim type: Factual / evidence
Source support: Strong (primary-source-backed)
Notes: Design-science (build/evaluate/theorize/justify, instantiation) is the thesis's explicit frame.
Action: Keep

Claim: Translating needs into technical requirements and system decisions
Claim type: Interpretation / positioning
Source support: Strong
Supporting sources: DNB_CONTENT_OUTLINE.md section 4, DNB_POSITIONING.md (research-based strength, AI needs precise framing)
Notes: This interpretation is well-supported across positioning docs.
Action: Keep

---

### Learning velocity section

Claim: "Jeg har hoey laeringshastighet i nye tekniske domener, med dokumentert overgang fra ukjent til fungerende prototype."
Claim type: Factual / evidence — risk-sensitive
Source support: Strong (primary-source-backed), but wording still needs care
Supporting sources: DNB_SOURCE_EVIDENCE_NOTES.md §7, sources/thesis.pdf, sources/diploma, DNB_IMPLEMENTATION_LOG.md
Notes: The cross-domain build (music → learning design → fullstack AI app) is now primary-source-backed. "Dokumentert" still implies a public case study that does not exist on-site, so prefer the softened wording.
Action: Soften wording — "Jeg har vist rask overgang fra nytt teknisk domene til fungerende prototype" (evidence is strong; avoid implying a published case study)

Claim: "Jeg leverer vedvarende output over tid paa tvers av utvikling, dokumentasjon, QA og forbedringsloeper."
Claim type: Evidence
Source support: Strong
Supporting sources: DNB_IMPLEMENTATION_LOG.md, DNB_QA_CHECKLIST.md, AGENTS.md, all docs/dnb/ files
Notes: The repo documentation set itself is direct evidence of sustained output across dev, docs, QA, and iteration.
Action: Keep

Claim: "Jeg gjoer ny kunnskap om til systemer andre kan bruke: prototyper, sjekklister, handoff-dokumenter og repeterbare arbeidsflyter."
Claim type: Evidence
Source support: Strong
Supporting sources: All docs/dnb/ files, AGENTS.md, DNB_AGENT_ONBOARDING_INDEX.md
Notes: The repo documentation set is direct evidence of this capability.
Action: Keep

---

### Growth direction section

Claim: Lower-level engineering, verktøybygging, robusthet og plattformtenkning som vekstretning
Claim type: Growth direction / honest ambition
Source support: Strong (as stated aspiration, not current expertise)
Supporting sources: DNB_CONTENT_OUTLINE.md section 6, DNB_POSITIONING.md (what to emphasize)
Notes: This is correctly framed as growth direction throughout all planning docs. It must never be rewritten as current expertise.
Action: Keep — maintain exact framing as trajectory, not current capability

Claim: "observability, feiltaalighet og sterkere driftsnaer praksis"
Claim type: Growth direction — specific terms
Source support: Partial
Notes: These are appropriate aspiration terms for the role. They are not backed by current evidence but are framed as future goals, which is acceptable.
Action: Keep — maintain "motivert for aa bygge" framing, not "har erfaring med"

---

### Negative claims (what must not appear)

Claim: Student user-testing completed with Klar
Status: Correctly absent from DNB_SECTION_COPY_V1.md. Thesis explicitly states student user-testing was not performed.
Action: Confirmed absent — do not add

Claim: Senior distributed systems / platform engineering expertise
Status: Correctly absent.
Action: Confirmed absent — do not add

Claim: Lower-level engineering expertise (beyond aspiration)
Status: Correctly absent — framed as growth direction.
Action: Confirmed absent — maintain

Claim: Official DNB branding or implication of official DNB affiliation
Status: Correctly absent.
Action: Confirmed absent — do not add

---

## 4. Rewrite recommendations

### Claim: "Dokumentert overgang fra ukjent til fungerende prototype"

Current: Jeg har hoey laeringshastighet i nye tekniske domener, med dokumentert overgang fra ukjent til fungerende prototype.

Problem: "Dokumentert" implies available source documentation. The primary source (thesis) is not tracked in this repo branch.

Safer version (Norwegian):
Jeg har vist rask overgang fra nytt teknisk domene til fungerende prototype, noe masterprosjektet er eit godt eksempel paa.

---

### Claim: "Lagbar, laerbar og mulig aa standardisere"

Current: Den er lagbar, laerbar og mulig aa standardisere paa tvers av team.

Problem: Implies adoption/reuse has been proven by others. The evidence is only that Stian follows this workflow himself.

Safer version (Norwegian):
Arbeidsforma er designet for aa kunne deles og tilpasses i team, ikkje berre brukast solo.

---

### Claim: Participatory Design and Design Science specifics

Current: Lists these frameworks as metodisk grunnlag without qualification.

Problem: While accurate, the specific workshop evidence (3 workshops, specific techniques) is in the thesis which is not tracked.

Safer version — keep general, add parenthetical:
Participatory Design og Design Science som metodisk grunnlag (dokumentert i masteroppgave, 2026).

---

## 5. Claims approved for implementation

The following claims have strong or partial source support and correct framing. They are safe to implement in the first DNB page build:

- Hero headline and subheadline (positioning framing)
- Agentic workflow bullets (evidenced by repo docs themselves)
- "Bruker AI-agenter som utviklingspartnere med klare krav, review-looper og aktiv korreksjon"
- "Dokumenterer beslutninger, QA og handoff slik at arbeidet kan etterproeves og viderefoeres"
- Full agentic workflow section (section 2) — strongest evidence in the repo
- Klar as fullstack PWA / product prototype — general framing, with non-enterprise-scale disclaimer
- React / Next.js / Supabase / RBAC / teacher-student roles — keep as stated, recommend source file
- Smart Import as AI product decision — keep general framing
- Human-in-the-loop preview — keep, do not add specifics until thesis tracked
- Safety/privacy as general framing (not GDPR/Sikt specifics)
- Growth direction section — correctly framed as trajectory
- "Leverer vedvarende output over tid" and "gjoer ny kunnskap om til systemer andre kan bruke" (evidenced by repo docs)

---

## 6. Claims requiring care (mostly resolved 2026-06-20)

Most previously-blocked claims are now primary-source-backed. Remaining care items are about _wording and discretion_, not missing evidence:

| Claim                                                                    | Status                                 | Recommended action                                                            |
| ------------------------------------------------------------------------ | -------------------------------------- | ----------------------------------------------------------------------------- |
| "Dokumentert overgang fra ukjent til fungerende prototype"               | Evidence now strong                    | Still use softened "vist rask overgang" to avoid implying a public case study |
| Specific workshop techniques (Crazy Eights, journey mapping, empatikart) | RESOLVED (thesis-backed)               | May reference soberly; avoid an academic citation wall on-page                |
| Sikt approval / consent / data minimisation                              | RESOLVED (thesis-backed)               | Keep general on-page; name specifics only if user approves                    |
| Specific diploma grades                                                  | Available but private                  | Do NOT list grades or national ID; use credential-level framing only          |
| Role-fit against exact DNB posting                                       | RESOLVED (`DNB_JOB_POSTING.md` stored) | Map precisely; keep distributed-systems/platform/MCP as growth direction      |
| CS50x / other specific course credentials                                | Verified (CS50x)                       | CS50x completion confirmed by certificate (`CS50x.pdf`, gitignored local; public verify URL cs50.harvard.edu/certificates/0e9210d1-…). Frame as foundational learning, not a CS degree |

---

## 7. Pre-implementation recommendation

Current status (updated 2026-06-20): **Safe to implement.** Primary sources are now available and captured in tracked, safe form (`DNB_SOURCE_EVIDENCE_NOTES.md`), and the exact posting is stored (`DNB_JOB_POSTING.md`). The previous "safe with edits" verdict is upgraded: most Klar, method, safety, and learning-velocity claims move from Partial to Strong (primary-source-backed).

Residual edits still required before/at implementation:

1. Apply the two softening rewrites from section 4 ("vist rask overgang" not "dokumentert overgang"; reuse framing). These remain good practice even though evidence is now stronger, to avoid implying a public case study.
2. Keep safety framing general on-page (no Sikt/GDPR specifics) unless the user approves naming them.
3. Do not list diploma grades or the national ID anywhere. Use credential-level framing only.
4. Keep distributed systems / platform / MCP as growth direction (senior/staff plus per the posting).
5. Run the DNB_QA_CHECKLIST.md checks at each chunk.

GitHub Copilot Auto can safely implement using `DNB_IMPLEMENTATION_BRIEF_FOR_AUTO.md`, because the copy is pre-rated and the agent only assembles — it does not invent claims. 4. Then proceed to implementation chunk: DNB page skeleton with agentic workflow and Klar sections only.

Recommended next single chunk:
Implement the "How I build with AI" section with a compact cross-repo evidence strip (Klar / Companion / Lori), without expanding the hero.
