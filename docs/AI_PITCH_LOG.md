# AI Pitch Log — Skamløs AI-pitch

Running log for the **Skamløs AI-pitch** mode of Stian Glomsrød's VG X portfolio site.
Epic: [`docs/epics/EPIC_SKAMLOS_AI_PITCH.md`](epics/EPIC_SKAMLOS_AI_PITCH.md).

---

## ⛳ Persistent rule — READ BEFORE WORKING

**Every agent that touches anything related to Skamløs AI-pitch MUST append a new dated entry to
this file, using the template below, before ending its turn.** No exceptions, even for tiny changes.

An entry must cover all eight points:

1. **What changed**
2. **Why it changed**
3. **Files changed**
4. **Validation run** (commands + results)
5. **What was intentionally NOT changed**
6. **Remaining placeholders**
7. **Risks or concerns**
8. **Recommended next slice**

Additional standing rules:

- **Never break Professional mode.** It is the safe default and must stay application-ready.
- **No invented facts:** no fake metrics, awards, seniority, or sensitive/private project data.
- Keep `npm run lint` and `npm run build` green at the end of every slice.
- Prefer additive, mode-gated (`mode === "agentic"`) changes over edits to shared professional code.
- Keep the internal mode key `"agentic"` stable (persistence + `data-mode` contract). Rename labels only.

### Entry template (copy this)

```
## YYYY-MM-DD — <slice name>

1. What changed:
2. Why it changed:
3. Files changed:
4. Validation run:
5. Intentionally NOT changed:
6. Remaining placeholders:
7. Risks / concerns:
8. Recommended next slice:
```

---

## 2026-06-18 — Slice 0: Planning & naming

1. **What changed**
   - Created the epic `docs/epics/EPIC_SKAMLOS_AI_PITCH.md` (job-ad analysis, profile match,
     5 concept options, recommended concept, staged slices, QA strategy, mode-preservation notes).
   - Created this log with the persistent update rule.
   - Renamed the second mode's **user-facing label** from "Agentisk pitch" to "Skamløs AI-pitch"
     in `app/data/portfolio.ts` (`modeLabels.agentic.label`). Updated its hint copy.
   - Added a pointer comment in `app/data/portfolio.ts` to these docs.

2. **Why it changed**
   - Establish a strategic, documented foundation so future agents can build the interactive mode in
     safe, independently-shippable slices aimed squarely at the VG X UX Designer role.
   - The new label sets the intended tone (memorable, self-aware) without any structural risk.

3. **Files changed**
   - `docs/epics/EPIC_SKAMLOS_AI_PITCH.md` (new)
   - `docs/AI_PITCH_LOG.md` (new)
   - `app/data/portfolio.ts` (label + hint + docs-pointer comment)

4. **Validation run**
   - `npm run lint` → ✅ passed (exit 0, no errors/warnings)
   - `npm run build` → ✅ passed (compiled successfully, `/` prerendered static)
   - Only a label string + comments changed in code, so no behavior change.

5. **Intentionally NOT changed**
   - Internal `Mode` key stays `"agentic"` (no refactor of the union, `localStorage` value,
     `data-mode`, or content branches).
   - No new interactive components, no UI/layout changes, no Professional-mode changes.
   - No new dependencies.

6. **Remaining placeholders**
   - Footer humor line still a TODO (no joke written yet) in `SiteFooter.tsx`.
   - All `[bracketed]` links (email, LinkedIn, GitHub, CV, Figma, repo/demo) still unfilled.
   - Klar teacher/student demo credentials still TODO.
   - `fitScan` data structure (Slice 1) not yet created.

7. **Risks / concerns**
   - Tone risk for "skamløs": future copy must stay confident-not-arrogant, funny-not-unserious.
   - Keep boldness in tone/framing only — not in motion, deps, or accessibility.

8. **Recommended next slice**
   - **Slice 1 — Content model for the fit scan:** add a typed `fitScan` to `app/data/portfolio.ts`
     mapping the four VG X needs + key role requirements to concrete evidence from existing cases.
     No UI yet. Keep Professional mode untouched.

---

## 2026-06-18 — Slice 1: Fit scan content model

1. **What changed**
   - Added a typed, data-only `fitScan` structure to `app/data/portfolio.ts` (no UI).
   - New exported types: `CaseRef`, `FitLevel`, `FitNeed`, `FitRequirement`, `FitRisk`,
     `FitMilestone`, `FitScan`, plus the `fitScan` const.
   - `fitScan` contains four sub-models mapped to the job ad (`utlysning.md`):
     - `needs[4]` — VG X's four user needs (Oversikt, Forståelse, Relevans, Avkobling), each with
       `vgxMeaning`, `whyStian`, `evidence[]`, `caseRefs[]`, `pitchAngle`, `fit`.
     - `requirements[9]` — role themes (AI-native, rapid prototyping, user-centered design,
       experimentation, experiences-not-content, machine+intuition, reflected AI use, early-career,
       visual/product sense), each with interpretation, evidence, `caseRefs[]`, `fit`, optional
       `counterpoint`.
     - `risks[4]` — candidate counterpoints (not-senior-visual, teaching context, unconventional
       path, AI-hype misread), each with `honestFraming`, `counterEvidence[]`, `flipToStrength`.
     - `milestones[8]` — enriched learning-journey steps (C foundations → CS50x/Wordhunt → ASK Away
       → ACAD → AI/fagtekst → Forløperprosjektet → Klar → agentic workflow), each with `unlocked`,
       `evidence`, optional `caseRef`, `vgxRelevance`, `metaphor`.

2. **Why it changed**
   - Gives the future interactive "Candidate Fit Scan" scene (Concept A spine) a single, typed source
     of truth that connects the job ad to real evidence — so UI slices can render data without
     re-deriving the argument.

3. **Files changed**
   - `app/data/portfolio.ts` (additive: new types + `fitScan` const inserted between
     `agenticWorkflow` and `footer`).
   - `docs/AI_PITCH_LOG.md` (this entry).

4. **Validation run**
   - `npm run lint` → ✅ passed (exit 0, no errors/warnings).
   - `npm run build` → ✅ passed (compiled in 4.5s, TypeScript ok, `/` prerendered static).

5. **Intentionally NOT changed**
   - No UI, no components, no layout. Nothing renders `fitScan` yet.
   - Professional mode untouched.
   - Existing exports (`journey`, `storyline`, `agenticWorkflow`, cases, etc.) left intact — added a
     separate `fitScan.milestones` rather than refactoring `journey` to avoid touching
     `JourneyTimeline.tsx`.
   - Internal mode key `"agentic"` unchanged. No new dependencies.

6. **Remaining placeholders**
   - All prior placeholders still open (footer humor line, `[bracketed]` links, Klar demo creds).
   - `fitScan` is not yet consumed by any UI.
   - `caseRefs`/`caseRef` use string-literal ids matching existing `PortfolioCase.id` values; not yet
     runtime-validated against the case arrays (could add a dev-time assertion in a later slice).

7. **Risks / concerns**
   - Content fidelity: all evidence is drawn from existing cases/journey/workflow with no invented
     metrics, awards, links or seniority. `fit` levels ("sterk"/"god"/"voksende") are honest
     self-assessments, not external ratings — the UI should frame them as such.
   - `avkobling` is the need with the thinnest direct news-product evidence (flagged `fit: "voksende"`).

8. **Recommended next slice**
   - **Slice 2 — Fit scan UI (agentic-only):** build an accessible `FitScan` component that renders
     `fitScan.needs` + `fitScan.requirements`, mode-gated to `mode === "agentic"`, reusing existing
     Reveal/CSS-module patterns. Keep risks/milestones for a later slice. Do not touch Professional
     mode or existing sections.

---

## 2026-06-18 — Slice 2: Fit scan UI (agentic-only)

1. **What changed**
   - Added a new agentic-only **Candidate Fit Scan** section that renders the `fitScan` data from
     Slice 1.
   - New files: `app/components/FitScan.tsx` + `app/components/FitScan.module.css`.
   - The section has three blocks:
     - **Four need cards** (Oversikt, Forståelse, Relevans, Avkobling) in a responsive 2-col grid —
       each shows the VG X meaning, why Stian fits, an evidence list, supporting-case chips and a
       signal-strength "fit" badge.
     - **Requirement mapping** — all nine `fitScan.requirements` as native `<details>` accordions
       (label + fit badge in the summary; interpretation, evidence, case chips and optional
       counterpoint on expand).
     - **Risk module** — the four `fitScan.risks` as native `<details>` with a "Snu til styrke" hint;
       expands to honest framing, counter-evidence and a highlighted flip-to-strength.
   - Added two small display-label maps to `app/data/portfolio.ts`: `caseRefLabels` (CaseRef → short
     project name) and `fitLevelLabels` (FitLevel → Norwegian badge text), so the UI does not
     duplicate content.
   - Wired `FitScan` into `app/components/Portfolio.tsx`, rendered only when `mode === "agentic"`,
     placed after `SupportingCases` and before `JourneyTimeline`.

2. **Why it changed**
   - Turns the Slice 1 data into a scannable, job-targeted evaluation that makes Stian's unusual match
     immediately legible — the strategic spine of the Skamløs AI-pitch mode.

3. **Files changed**
   - `app/components/FitScan.tsx` (new)
   - `app/components/FitScan.module.css` (new)
   - `app/components/Portfolio.tsx` (import + one agentic-gated render line)
   - `app/data/portfolio.ts` (additive: `caseRefLabels`, `fitLevelLabels`)
   - `docs/AI_PITCH_LOG.md` (this entry)

4. **Validation run**
   - `npm run lint` → ✅ passed (exit 0, no errors/warnings).
   - `npm run build` → ✅ passed (compiled, TypeScript ok, `/` prerendered static).

5. **Intentionally NOT changed**
   - Professional mode untouched — the section is fully gated behind `mode === "agentic"` and never
     renders in professional mode (verified by the conditional in `Portfolio.tsx`).
   - No changes to existing sections (Hero, FeaturedKlar, SupportingCases, JourneyTimeline,
     AgenticWorkflow, SiteFooter) or their CSS.
   - `fitScan.milestones` is NOT yet rendered (reserved for a later journey-merge slice).
   - Internal mode key `"agentic"` unchanged. No new dependencies. No data content rewritten.

6. **Remaining placeholders**
   - All prior placeholders still open (footer humor line, `[bracketed]` links, Klar demo creds).
   - `fitScan.milestones` not yet surfaced in any UI.
   - Case chips are display-only labels; they do not yet deep-link to the matching case anchors.

7. **Risks / concerns**
   - Native `<details>` is used for the accordions → fully keyboard-accessible and fail-safe with no
     JS, but its default open/close is not animated (intentional, keeps reduced-motion trivially safe).
   - Section length: three stacked blocks make the agentic page noticeably longer; acceptable for a
     job-specific scan but worth watching if more sections are added.
   - The pulsing scan dot is purely decorative and disabled under `prefers-reduced-motion`.

8. **Recommended next slice**
   - **Slice 3 — Deep-link case chips + milestone strip:** make the fit-scan case chips link/scroll to
     the relevant case anchors, and render `fitScan.milestones` as a compact journey strip (or merge
     with `JourneyTimeline`). Keep it agentic-only and additive; do not touch Professional mode.

---

## 2026-06-18 — Slice 3: Connected fit scan + milestone journey

1. **What changed**
   - **Deep-link chips:** Fit Scan case chips are now anchor links (`<a href="#caseId">`) that jump to
     the matching case section. Affects need cards and requirement rows in `FitScan.tsx`/`.module.css`.
   - **Anchor offset:** added `scroll-margin-top: 80px` to `CaseCard.module.css .card` so supporting
     cases (`forloper`, `fagtekst`, `ask-away`, `acad`, `wordhunt`) land below the sticky topbar.
     (The `klar` target is the `FeaturedKlar` `<section>`, which already inherits section scroll-margin.)
   - **Milestone journey:** upgraded the agentic-only `JourneyTimeline` to render `fitScan.milestones`
     (8 steps) as a numbered "mission log" — each node shows shortLabel, title, "Låst opp" unlock line,
     evidence (+ a "Se <case>" deep-link when a `caseRef` exists), VG X relevance and a framing
     metaphor — plus a final highlighted **"Neste oppdrag: VG X"** node.

2. **Why it changed**
   - Makes the Skamløs AI-pitch mode feel connected and intentional: evidence in the scan now navigates
     to the real cases, and the learning journey reads as a deliberate progression toward the role.

3. **How chip navigation works**
   - Chips/links use existing stable DOM ids (`CaseCard` renders `id={data.id}`; `FeaturedKlar` is
     `<section id="klar">`). Native `href="#id"` anchors → keyboard-operable, no JS, fail-safe.
   - Smooth scroll comes from the existing global `html { scroll-behavior: smooth }`, which is already
     overridden to `auto` under `prefers-reduced-motion`. All six `CaseRef` ids always have a visible
     target in agentic mode (all cases render in both modes), so no missing-target case occurs.

4. **How the milestone progression works**
   - Decision: **upgraded** the existing `JourneyTimeline` rather than adding a parallel component —
     avoids duplicated content and dead code. It now reads from `fitScan.milestones` (single source of
     truth) instead of the older `journey` array.
   - `journey` (4-stage array) is left in `portfolio.ts` untouched but is now unused by the UI; kept to
     respect "don't refactor unrelated data" and as a safe fallback for a future slice.

5. **Files changed**
   - `app/components/FitScan.tsx` (chips → links)
   - `app/components/FitScan.module.css` (link/arrow/hover/focus styles)
   - `app/components/JourneyTimeline.tsx` (rewritten to use `fitScan.milestones` + VG X quest node)
   - `app/components/JourneyTimeline.module.css` (new node/unlock/evidence/quest styles)
   - `app/components/CaseCard.module.css` (`scroll-margin-top` on `.card`)
   - `docs/AI_PITCH_LOG.md` (this entry)

6. **Validation run**
   - `npm run lint` → ✅ passed (exit 0, no errors/warnings).
   - `npm run build` → ✅ passed (compiled, TypeScript ok, `/` prerendered static).

7. **Intentionally NOT changed**
   - Professional mode untouched in behaviour: FitScan + JourneyTimeline remain gated behind
     `mode === "agentic"`. The only shared edit is the harmless `scroll-margin-top` on `.card`.
   - No new dependencies. Internal mode key `"agentic"` unchanged. No data content invented or rewritten.
   - Did not delete the now-unused `journey` array or the old `.stage/.kind/.text/.skill` CSS classes.

8. **Remaining placeholders**
   - All prior placeholders still open (footer humor line, `[bracketed]` links, Klar demo creds).
   - `journey` array is now unused (candidate for removal in a later cleanup slice).
   - Milestones without a `caseRef` (C foundations, agentic workflow) have no deep-link target — by
     design, since no standalone case section exists for them.

9. **Risks / concerns**
   - Agentic page is now quite long (cases → fit scan → milestone journey → workflow). Acceptable for a
     job-specific pitch; revisit ordering if it feels heavy.
   - Anchor offset uses a fixed 80px to clear the sticky topbar; if the topbar height changes, revisit.
   - Two unused-but-harmless leftovers (`journey` data, old timeline CSS classes) add minor clutter.

10. **Recommended next slice**

- **Slice 4 — Cleanup + entry framing:** remove the dead `journey` array and unused timeline CSS,
  and add a short agentic-only intro/transition tying Hero → Fit Scan → Journey into one narrative.
  Keep it additive and Professional-mode-safe. Optionally add a "tilbake til scan" affordance after
  a chip jump.

---

## 2026-06-18 — Slice 5: Interactive 3D fit-constellation (experimental hero)

1. **What changed**
   - Added a substantial interactive **3D scene** as the first thing in Skamløs AI-pitch mode: the
     **"VG X fit-konstellasjon"**. Stian's 8 learning-journey milestones become glowing stars wired as
     a spiral that converges on a central **VG X** star. Hovering/clicking a star "scans" it and reveals
     its unlock, evidence, VG X relevance, case deep-link and metaphor in an accessible readout.
   - New files:
     - `app/components/skamlos/pitchNodes.ts` — derives constellation nodes from `fitScan.milestones`
       (source of truth) + a synthetic VG X target node; computes deterministic 3D spiral positions.
     - `app/components/skamlos/FitConstellation.tsx` — vanilla three.js scene (client-only): WebGL
       renderer, glow sprites, background star field, path + convergence lines, raycast hover/select,
       drag-to-orbit, idle auto-rotate, screen-projected label, full dispose-on-unmount cleanup.
     - `app/components/SkamlosPitchScene.tsx` — section wrapper: lazy-loads the 3D scene via
       `next/dynamic({ ssr: false })`, owns selection state, renders the accessible "Skann-mål" button
       list + "Skann-resultat" readout, the floating label, and the no-WebGL fallback.
     - `app/components/SkamlosPitchScene.module.css` — mission-control styling.
   - Wired into `Portfolio.tsx`: `{mode === "agentic" && <SkamlosPitchScene />}` placed right after the
     Hero (top of Skamløs mode). Existing Fit Scan + Journey remain as supporting sections below.

2. **Why it changed**
   - The previous Skamløs mode was an alternative content layout, not an experience. This makes the
     application itself *demonstrate* AI-native prototyping, interaction design and modern frontend —
     exactly the VG X brief — instead of only describing it.

3. **Concept chosen**
   - "Skill constellation / fit-scan" hybrid (Concept C + B). It maps Stian's progression (C → CS50x →
     Figma/needfinding → fullstack precursor → Klar → agentic workflow → **VG X**) into one spatial,
     explorable proof-of-fit, and reuses the existing typed data so there are zero new claims.

4. **Dependencies added**
   - `three@^0.180.0` (+ `@types/three`). Chosen over `@react-three/fiber` to avoid React-19/reconciler
     coupling under Next 16 + Turbopack — a single, well-maintained dep, hand-managed render loop and
     disposal (engineering taste over framework weight). Loaded **only** client-side in agentic mode via
     dynamic import, so it never touches SSR or the Professional-mode bundle.

5. **How interaction works**
   - Mouse/touch: drag to orbit; hover a star to highlight + show its floating label; click to scan
     (click again to deselect). Idle auto-rotation until the pointer enters.
   - Keyboard / AT: the constellation is `aria-hidden` decorative; the real control is the semantic
     "Skann-mål" list of `<button aria-pressed>` elements. Focus/hover/select there drive *and* mirror
     the 3D highlight, and the readout is an `aria-live="polite"` region. Full functionality with no
     pointer and no WebGL.

6. **Fallback / reduced-motion**
   - No WebGL (or renderer init failure): `FitConstellation` calls `onUnavailable()`; the scene swaps to
     a static CSS star fallback while the button list + readout keep the pitch fully usable.
   - `prefers-reduced-motion`: tracked via `useSyncExternalStore` (no setState-in-effect); disables idle
     spin, node pulsing, star drift and eases-to-instant. Interaction (drag/select) still works.
   - SSR-safe: `ssr: false` dynamic import means no three.js on the server and no hydration trap; the
     accessible markup renders identically.

7. **Files changed**
   - `app/components/skamlos/pitchNodes.ts` (new)
   - `app/components/skamlos/FitConstellation.tsx` (new)
   - `app/components/SkamlosPitchScene.tsx` (new)
   - `app/components/SkamlosPitchScene.module.css` (new)
   - `app/components/Portfolio.tsx` (import + one agentic-gated render line)
   - `package.json` / `package-lock.json` (three + @types/three)
   - `docs/AI_PITCH_LOG.md` (this entry)

8. **Validation run**
   - `npm run lint` → ✅ passed (exit 0).
   - `npm run build` → ✅ passed (compiled, TypeScript ok, `/` prerendered static — three.js excluded
     from the prerender/SSR path via dynamic import).

9. **Intentionally NOT changed**
   - Professional mode untouched: the scene is gated behind `mode === "agentic"` and three.js is only
     fetched when it mounts, so Professional performance/bundle is unaffected.
   - Existing Fit Scan + Journey kept (now framed as supporting sections below the scene), per the rule
     not to delete prior work.
   - No new claims/metrics — all node copy comes from existing `fitScan.milestones`.
   - Internal mode key `"agentic"` unchanged. No backend/API/auth/analytics. No external assets (glow
     texture is generated on a canvas at runtime).
   - The Slice 4 cleanup (dead `journey` array / old timeline CSS) was deliberately deferred to keep this
     slice focused on the experimental hero.

10. **Risks / concerns**
   - three.js adds ~150KB gzip to the agentic-only async chunk; acceptable and lazy, but worth watching.
   - The constellation is decorative-only for AT (by design); all meaning lives in the parallel HTML —
     verify the readout stays in sync if the data model changes.
   - React Strict Mode double-mounts effects in dev; the scene relies on its dispose cleanup to avoid
     double canvases (handled, but a place to watch if extended).
   - Mobile GPUs: DPR capped at 2 and geometry is light (9 spheres + 320 points), should stay smooth.

11. **Recommended next slice**
   - **Slice 6 — Scan choreography + onboarding:** add an optional guided "scan sweep" that auto-walks
     the path on first view (reduced-motion-safe, skippable), a focus ring/keyboard arrow-cycling on the
     canvas itself, and a "fortsett til bevisene" CTA linking the constellation to the Fit Scan section.
     Then do the deferred Slice 4 cleanup (remove dead `journey` data + unused CSS).
