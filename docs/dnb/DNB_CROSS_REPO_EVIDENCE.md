# DNB Cross-Repo Evidence Synthesis

## 1. Purpose

This document maps observed evidence across three repositories to the DNB AI-First Engineering role fit.

Goal: show one coherent pattern, not three disconnected projects.

- `stianglomsrod/klar` = main proof of fullstack AI-first product building.
- `stianglomsrod/nikkoprogging` (especially `companion_app`) = main proof of long-running, documented agentic development discipline.
- `stianglomsrod/lori-frisor` = main proof of enablement, handoff, and pragmatic delivery decisions.

This supports a nuanced answer to whether Klar should also carry workflow/documentation proof: partly yes, but the stronger strategy is to let each repository carry what it proves best.

---

## 2. Source inventory

### 2.1 Repositories inspected

1. `https://github.com/stianglomsrod/klar`
2. `https://github.com/stianglomsrod/nikkoprogging`
3. `https://github.com/stianglomsrod/lori-frisor`

### 2.2 Observed files and what claim types they can support

#### A) `stianglomsrod/klar`

Observed files:

- `PROJECT_DNA.md`
- `FILE_TREE.md`
- `src/app/page.tsx`
- `src/middleware.ts`
- `src/app/auth/callback/route.ts`
- `src/app/(dashboard)/student/page.tsx`
- `src/app/(dashboard)/student/fag/page.tsx`
- `src/app/(dashboard)/teacher/students/[id]/page.tsx`
- `src/app/(dashboard)/teacher/timeplan/useClassStudentSelection.ts`
- `src/app/actions/parse-weekly-plan.ts` (referenced through docs/inventory)
- `src/app/actions/save-weekly-plan.ts` (referenced through docs/inventory)
- `src/app/api/push/send/route.ts`
- `src/app/api/push/react/route.ts`
- `HANDOVER_STATE.md`
- `CODE_AUDIT.md`
- `TECH_DEBT.md`

Claim types supported by observed evidence:

- Stack and architecture: Next.js/React/TypeScript + Supabase/Postgres.
- Auth and role/access control patterns (teacher/student routing, middleware checks).
- AI-assisted product workflow evidence around weekly-plan parsing/import pipeline.
- Human control and operational guardrail patterns in routes/docs.
- Product complexity and architecture ownership over time.

Interpretation notes:

- Observed repository evidence supports "robust prototype + serious engineering process".
- It does not, by itself, justify enterprise-scale production claims.

#### B) `stianglomsrod/nikkoprogging` (focus: `companion_app`)

Observed files:

- `companion_app/PROJECT_DNA.md`
- `companion_app/README.md`
- `companion_app/FILE_TREE.md`
- `companion_app/DB_NOTES.md`
- `companion_app/docs/epics/EPIC_COMPANION_EVENTS.md`
- `companion_app/docs/plans/PLAN_HISTORY_AND_STATS.md`
- `companion_app/docs/plans/PLAN_COMPANION_EVENTS.md`
- `companion_app/docs/plans/PLAN_GLOBAL_FEEDBACK_IMPLEMENTATION.md`
- `companion_app/lib/main.dart`
- `companion_app/lib/core/database/app_database.dart`
- `companion_app/lib/core/events/drift_companion_event_state_repository.dart`
- `companion_app/lib/core/history/drift_history_repository.dart`
- `companion_app/test/core/history/drift_history_repository_test.dart`
- `companion_app/test/core/database/app_database_migration_test.dart`
- `companion_app/test/core/events/drift_companion_event_state_repository_test.dart`
- platform-generated plugin files indicating sqlite integration (`linux/flutter/generated_plugin_registrant.cc`, `windows/flutter/generated_plugins.cmake`, `macos/Flutter/GeneratedPluginRegistrant.swift`)

Claim types supported by observed evidence:

- Long-running documentation discipline (`PROJECT_DNA`, plan docs, epics, handoff-like artifacts).
- Small safe slices / chunked delivery style with acceptance criteria and explicit non-goals.
- Local-first architecture direction and implementation reality.
- Flutter/Dart product implementation with Drift + SQLite persistence and tests.
- Engineering habit of repository boundaries and staged migration plans.

Interpretation notes:

- Strong evidence for process maturity and repeatable agentic workflow behavior over time.
- Not evidence of large-scale distributed backend/platform engineering.

#### C) `stianglomsrod/lori-frisor`

Observed files:

- `AGENTS.md`
- `PROJECT_DNA.md`
- `DECISIONS.md`
- `HANDOFF.md`
- `IMPLEMENTATION_REPORT.md`
- `TECH_DEBT.md`
- `README.md`
- `astro.config.mjs`
- `keystatic.config.ts`
- `src/lib/content.ts`
- `src/layouts/BaseLayout.astro`
- `src/components/Hero.astro`
- `src/components/Products.astro`
- `src/components/Contact.astro`
- `src/components/Footer.astro`

Claim types supported by observed evidence:

- Astro/static architecture and Vercel deployment direction.
- Keystatic-based owner-editable content workflow.
- Explicit owner-facing handoff and operational docs.
- Pragmatic build-vs-integrate decision: keep Timma booking, avoid rebuilding booking system.
- Low-maintenance delivery strategy (simple stack, clear boundaries, practical tradeoffs).

Interpretation notes:

- Strong evidence for enablement and pragmatic product engineering judgement.
- Not meant as AI-first core product proof; it is delivery/enablement proof.

---

## 3. Strategic synthesis

### Core answer to the strategy question

Should Klar also be used as workflow/documentation proof?

- **Yes, but not as the primary workflow proof.**
- Klar should remain the main technical/product evidence case.
- `nikkoprogging/companion_app` should carry the main long-running workflow and discipline evidence.
- `lori-frisor` should carry the main enablement/handoff/pragmatic delivery evidence.

### Cross-project pattern (recommended framing)

1. **Klar:** "I can build AI-assisted fullstack products with real system boundaries."
2. **Companion/nikkoprogging:** "I can sustain an agentic engineering workflow over time with plans, slices, tests, and documentation."
3. **Lori Frisor:** "I can deliver practical outcomes for a real owner, document handoff, and choose integration over reinvention when that is best."

### Why this is stronger than forcing Klar to carry every claim

- Reduces overclaim pressure on one project.
- Improves claim precision: each repository proves a different dimension.
- Better alignment with DNB role themes: tooling, guardrails, enablement, reusable ways of working.
- More credible and honest narrative boundary management.

---

## 4. DNB role-fit mapping

### AI-first tooling

- Klar supports AI-assisted product implementation evidence.
- Companion docs/plans support workflow-as-tooling evidence.

### Guardrails and human review

- Klar: role/access boundaries and review-oriented patterns.
- Companion: explicit chunking, acceptance criteria, and test gates.

### Enablement / force multiplier

- Companion: reusable docs, epics, plans, and repository boundaries.
- Lori: owner-focused handoff and editable content model.

### Innersource / working in the open / reusable artifacts

- Companion + Klar: `PROJECT_DNA`, plan docs, debt/audit/handover artifacts.

### Runbooks, standards, reference repos

- Companion and Klar both show persistent reference-doc practice.
- Lori shows operational handoff docs for non-developer stakeholders.

### Teaching, workshops, demos, making others more capable

- Lori handoff and editing model are direct enablement artifacts.
- Companion planning docs reflect explicit "make work understandable and transferable" behavior.

### Practical engineering judgement

- Lori `DECISIONS.md` (keep Timma) is a clear "do not overbuild" signal.
- Companion phased persistence and non-goals show scope discipline.

### Senior distributed systems boundary

- None of these repos should be framed as proof of senior/staff distributed-systems depth.
- Keep this as growth direction only.

---

## 5. Page strategy impact

### Structural impact

- Keep Hero focused and concise; do not expand unless needed.
- Use "How I build with AI" as the next implementation section.
- Add a compact **cross-repo evidence strip** inside or directly under that section.
- Keep Klar as a separate dedicated section/chunk later.

### Evidence strip/card model (recommended)

- Three compact cards in one row/stack:
  1. Klar: AI-first fullstack product evidence.
  2. Companion: long-running workflow/process evidence.
  3. Lori: enablement/handoff/pragmatic delivery evidence.

### Section-by-section mention guidance

- **Hero:** mention cross-project pattern in one short phrase only (visual: minimal).
- **How I build with AI:** include evidence strip/cards + short text mapping pattern (visual + text).
- **Klar evidence section:** deep technical/product details and screenshots (visual-heavy).
- **Proof/documentation section:** reference docs/runbooks/process artifacts from all three (text-first).
- **Learning velocity:** use companion + klar continuity as evidence (text-first).
- **Contact/CTA:** one concise line on cross-project practice and enablement mindset (text-only).

### Visual vs text guidance

- Visual: strip/cards, small repo badges/tags, compact evidence bullets.
- Text: claim-boundary statements and "what this proves / does not prove" phrasing.

---

## 6. Copy recommendations (safe Norwegian snippets)

### Evidence strip intro

"Dette er ikke tre tilfeldige prosjekter. Samlet viser de hvordan jeg bygger med AI i praksis: produkt, arbeidsflyt og overlevering."

### Card 1: Klar

"**Klar:** Fullstack AI-assistert produktbygging med tydelige roller, dataflyt og kontrollpunkter."

### Card 2: Companion

"**Companion (nikkoprogging):** Langsiktig, dokumentert utviklingsflyt med små trygge leveranser, planer og tester."

### Card 3: Lori Frisor

"**Lori Frisor:** Pragmatisk levering for ekte bruker/eier, tydelig handoff og bevisst valg om aa integrere i stedet for aa overbygge."

### Boundary line (recommended near strip)

"Eksemplene viser arbeidsmaate og engineering judgement i praksis, men er ikke paastander om enterprise-skala eller senior plattformansvar."

---

## 7. Claim-boundary updates

### Claims that become stronger

- "Dokumentert agentic arbeidsflyt over tid" (strengthened by companion plans/docs/tests).
- "Enablement og overlevering" (strengthened by Lori handoff + Keystatic model).
- "Pragmatisk build-vs-integrate judgement" (strengthened by Lori Timma decision docs).
- "Cross-project reproducibility of process" (same patterns across repos).

### Claims still partial

- Organization-wide innersource adoption impact (no broad adoption metrics shown).
- AI-first CI/CD automation at enterprise scale.
- Measured productivity uplift across teams.

### Claims that must not be made

- Senior distributed systems/platform authority.
- Enterprise-scale production maturity inferred from these repos.
- "Widely adopted standard used across many teams" unless verified evidence is added.

### Source-strength note

- Strength level for cross-repo synthesis is **strong project evidence** (observed repositories/docs).
- It is not equivalent to audited enterprise production evidence.

---

## 8. Implementation implications

### Updated next implementation priority

1. Next UI chunk should be **"How I build with AI" + cross-repo evidence strip**.
2. Klar should remain a separate later chunk for deep technical case evidence.
3. Do not expand Hero unless a gap appears in review.

### Safe Copilot Auto chunks after this docs pass

1. Implement `How I build with AI` section with compact cross-repo strip/cards and strict claim-safe copy.
2. Run claims QA against updated checklist/map (no overclaims from external repos).
3. Implement Klar deep-dive section as separate chunk (existing plan order preserved).

This ordering keeps momentum while reducing overclaim risk and preserving clear evidence boundaries.
