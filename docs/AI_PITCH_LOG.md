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
     application itself _demonstrate_ AI-native prototyping, interaction design and modern frontend —
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
     "Skann-mål" list of `<button aria-pressed>` elements. Focus/hover/select there drive _and_ mirror
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

---

## 2026-06-18 — Slice 6: "Stians verden" explorable hub (replaces the constellation as hero)

1. **What changed**
   - Replaced the 3D fit-constellation as the Skamløs hero with a fully **explorable 2D world** —
     **"Stians verden"**: a navigable learning-journey map you travel through. A glowing **avatar**
     (the "agent" diamond) travels along a winding trail between **9 places** (8 real milestones + the
     **VG X-portalen**). Each place is a focusable `<button>` that, when visited, moves the avatar there,
     marks it visited, and opens a rich **side dock** (non-blocking `<aside>`, not a modal).
   - Skill/unlock states are visible on the map and in the journal: **unlocked** (colourful, pulsing,
     visitable beacon), **visited** (calm green + check badge), **next-quest** (the VG X portal — dashed,
     shimmering violet, framed positively as the next arena, never as a deficiency).
   - Added a **HUD** with an exploration progress bar (`X / 8 områder utforsket`, `role="progressbar"`)
     plus **"Åpne journal"** and **"Nullstill"** controls.
   - Added a collapsible **Reisejournal** (map/overview) for fast recruiter scanning: every place grouped
     by thematic area with state badges and click-to-jump, plus a **VG X-match** panel surfacing the four
     VG X user needs (Oversikt / Forståelse / Relevans / Avkobling) with honest fit badges.
   - New files:
     - `app/components/skamlos/worldNodes.ts` — derives world nodes from `fitScan.milestones` (source of
       truth), adds presentational flavour only (place name, thematic area, icon key, 2D map position),
       plus the synthetic VG X portal and the reused `fitScan.needs` summary.
     - `app/components/SkamlosWorld.tsx` — the client hub: avatar travel, visited/selection state,
       journal, dock, inline stroke-icon set, reduced-motion external store.
     - `app/components/SkamlosWorld.module.css` — world/map/journal/dock styling + reduced-motion +
       responsive (dock stacks under the map < 880px).
   - `Portfolio.tsx` now renders `{mode === "agentic" && <SkamlosWorld />}` in the slot previously held by
     `<SkamlosPitchScene />` (same position: right after the Hero). Fit Scan + Journey remain below.

2. **Why it changed**
   - User feedback: the constellation was "still too much like an alternative content view with a 3D
     visualization on top." The brief asked to push Skamløs into a genuinely **navigable, playful,
     memorable** experience — a controllable presence, explorable nodes with unlock states, rich info
     panels, and a recruiter-friendly overview. A robust, accessible DOM/SVG world demonstrates VG X's
     own values (experiences over pixels, AI-native prototyping, user-centred, accessible) better than a
     fragile 3D toy — and it ships **zero new dependencies**.

3. **R&D performed**
   - Re-read the job ad (`utlysning.md`): VG X = news as **experiences** for digital natives; four needs
     (Oversikt / Forståelse / Relevans / Avkobling); AI-native, "kort vei fra tanke til test", user-centred.
   - Re-read current architecture: `Portfolio.tsx`, `SkamlosPitchScene.tsx`, `FitConstellation.tsx`,
     `pitchNodes.ts`, `fitScan.milestones`, `Shared.module.css`, `globals.css` (CSS variables/tokens).
   - Reviewed the React-19 `react-hooks/set-state-in-effect` constraint and Next 16 dynamic/SSR notes
     already documented in earlier slices (informed the external-store + handler-driven state design).

4. **Technology options considered**
   - **A. Extend three.js into a walkable 3D world** — max wow, reuses the dep, but heavy, fragile on
     mobile GPUs, hard to make keyboard/AT-robust, long build, collision/camera complexity.
   - **B. DOM + SVG 2D world map with an avatar (chosen)** — places are real `<button>`s (keyboard/AT
     native), avatar + trail are CSS/SVG, info in a real `<aside>` dock. Lightweight, robust, responsive,
     trivially reduced-motion-safe, no WebGL failure mode, **no new deps**.
   - **C. HTML Canvas 2D game world** — smooth animation/generative visuals, but canvas content is
     invisible to AT (needs a parallel DOM anyway) and is more code to maintain.
   - **D. Scroll-driven spatial DOM scenes** — cinematic, but weaker on "controllable presence" and
     scroll-jacking hurts accessibility.

5. **Technology choice and justification**
   - Chose **B**. It directly embodies the VG X message (accessible, user-centred experiences), is the
     engineering-taste choice (lightweight, maintainable, isolated, removable), keeps lint/build green
     with no dependency churn, and still delivers a memorable, playful, interactive hub.

6. **How the world / navigation works**
   - 9 places positioned by percentage on a responsive stage; an SVG `non-scaling-stroke` trail connects
     them in journey order. Clicking a place (or a journal entry) travels the avatar there (CSS `left/top`
     transition), marks it visited, and opens the dock. Keyboard: places are buttons in journey order, so
     Tab order = the learning path; Enter selects; Escape closes the dock and returns focus to the place.

7. **How unlock / visited / next-quest states work**
   - All 8 milestones are **unlocked** (real, documented achievements) and render as colourful pulsing
     beacons. Visiting one adds it to a `Set` → **visited** styling (green + check badge, calmer pulse).
     The VG X portal is the only **next-quest** node — dashed/shimmering and framed positively. State is
     mirrored identically in the journal badges and the map legend.

8. **How info panels / journal work**
   - **Dock** (non-blocking `<aside aria-label>`): place name + icon, title, short tag, "Hva dette var"
     (evidence), "Låste opp" (skill), "VG X"-relevance, case deep-link (`#<caseRef>`), and metaphor. The
     portal variant shows its positive blurb + the four VG X needs. Focus moves to the dock heading on
     open (`tabIndex=-1`, not a trap) and returns to the triggering place on close.
   - **Journal** (collapsible `aria-expanded`/`hidden`): places grouped by thematic area with state badges
     - click-to-jump, and a VG X-match panel of the four needs with honest fit badges — built for
       time-pressed recruiters.

9. **Files changed**
   - `app/components/skamlos/worldNodes.ts` (new)
   - `app/components/SkamlosWorld.tsx` (new)
   - `app/components/SkamlosWorld.module.css` (new)
   - `app/components/Portfolio.tsx` (swap import + one agentic-gated render line)
   - `docs/AI_PITCH_LOG.md` (this entry)

10. **Dependencies added**

- **None.** The whole experience is DOM + SVG + CSS. (`three` is now unused by the render path — see
  risks; flagged for removal next slice.)

11. **Fallback / reduced-motion / accessibility**

- No WebGL dependency at all → no advanced-rendering failure mode; SVG/DOM is universally supported.
- `prefers-reduced-motion`: tracked via `useSyncExternalStore` (no setState-in-effect) **and** a CSS
  media query — disables avatar travel transition, trail flow, node beacons, quest shimmer and the live
  dot. All interaction stays fully functional.
- Keyboard: every place + journal entry + control is a real button; visible `:focus-visible`; Tab order
  follows the journey; Escape closes the dock; focus is moved/returned politely (no focus trap, no
  hidden-content traps). `role="progressbar"` with aria values; decorative avatar/trail are `aria-hidden`.
- Responsive/mobile: dock stacks under the map < 880px; node/label sizes shrink; HUD stacks < 520px.

12. **Validation results**

- `npm run lint` → ✅ passed (exit 0).
- `npm run build` → ✅ passed (compiled in ~6.4s, TypeScript ok, `/` prerendered **static**).

13. **Manual QA guide**

- Toggle to **Skamløs AI-pitch**: the world appears right under the Hero. Click places → avatar travels,
  dock fills, progress bar advances, check badges appear. Visit all 8 → progress label flips to "Alle
  områder utforsket". Open the VG X portal → positive "neste oppdrag" framing + the four needs.
- Open **journal** → grouped overview + VG X-match; click an entry jumps to that place. **Nullstill**
  clears visited/selection. Tab through the map; Enter to open; Escape to close (focus returns).
  Verify case deep-links (e.g. "Se Klar") scroll to the matching case. Toggle OS reduced-motion → motion
  calms, interaction intact. Resize to mobile → dock stacks under the map. Confirm **Professional** mode
  is unchanged (no world, no journal).

14. **Risks / tradeoffs**

- `three` + `@types/three` are now **unused** by the render path (constellation files remain on disk but
  are no longer imported). They no longer ship in any bundle, but the dep is dead weight — recommend
  removing it (and the orphaned `SkamlosPitchScene.tsx` / `FitConstellation.tsx` / `pitchNodes.ts`) in a
  cleanup slice. Left in place this slice to keep the change focused and reversible.
- Less raw "3D wow" than the constellation — deliberate tradeoff for robustness, accessibility and a
  stronger product narrative.
- Node label collisions are avoided by hand-placed positions; if milestones are added/reordered the map
  positions in `worldNodes.ts` (`FLAVOR`) must be updated.

15. **Recommended next slice**

- **Slice 7 — Cleanup + polish:** delete the now-orphaned constellation files and remove `three` /
  `@types/three` (and the deferred Slice 4 dead `journey` data + unused CSS). Optionally add arrow-key
  travel between adjacent places, a first-visit onboarding hint, and place artwork/illustration slots
  (image/video placeholders) inside the dock for real screenshots of each project.

---

## 2026-06-18 — Slice 7: Playable top-down world ("Stians verden" as a real game)

1. **What changed**
   - Turned the Skamløs map widget into an actual **playable top-down game**. You now control a
     **Stian/cursor avatar** with **WASD/arrow** movement (rAF game loop), idle + walking animation,
     facing/direction, and a shadow. Walk between **8 gym landmarks** that represent Stian's real
     learning journey; a **proximity popover** appears when the avatar is near; **Space** (or **E**, or
     clicking) triggers that gym's contextual **training action**, which marks it visited, fires a
     particle burst + unlock toast, and opens a rich **side dock**.
   - Implemented the gym design doc 1:1: **Systemkilden** (C), **Verktøybenken** (CS50x/Wordhunt),
     **Skisselaboratoriet** (Figma: ASK Away + ACAD + AI-fagtekst), **Meddesignrommet** (participatory
     facet of forløper), **Maskinrommet** (Vue+Django fullstack facet of forløper), **Klar-drivhuset**
     (Klar — its own greenhouse landmark, kept distinct from agentic work), **Agentlabben** (agentic
     workflow / QA), and **VG X-portalen** (next mission). Each has a distinct CSS landmark with a
     distant-readable emblem (no copyrighted logo assets — stylised text + brand-coloured shapes).
   - Added **narrative energy bars** (Prototypekraft / Brukerinnsikt / Forståelseskraft / Agentisk
     kontroll) that fill from the visited gyms' energy contributions (per the doc's mapping) — no fake
     percentage "scores". Plus a progress meter (`X / 8 steder trent`).
   - Contextual action labels exactly per the doc: Kjør løkka, Generer verktøyet, Test prototypen, Samle
     innsikten, Koble systemet, La ukebrevet spire, Kjør QA-sjekk, Åpne neste oppdrag.
   - Visible states: **available/unlocked** (colourful landmark, glowing name), **nearby** (hop + popover
     "Space …"), **visited** (check badge + calmer glow + journal mark), **next-quest** (VG X portal,
     dashed/violet, framed positively).
   - **World juice**: swaying grass tufts, animated energy trail, nearby-hop, training particle bursts,
     unlock toast, portal shimmer, a bobbing start hint, and avatar **upgrades** (terminal glow after
     Systemkilden, prototype border, Klar leaf, Agentlab antenna).
   - **Journal (J / M)** rewritten as an ordered, recruiter-scannable overview (every gym + state +
     unlocked-skill line + jump-to), plus a **VG X-match** panel (the four needs with honest fit badges)
     and a "neste anbefalte stopp" pointer. Works fully without playing.
   - **Touch D-pad** appears on coarse pointers; gyms/journal are also tappable buttons.
   - **Cleanup:** removed the now-orphaned Three.js constellation (`SkamlosPitchScene.tsx` +
     `.module.css`, `FitConstellation.tsx`, `pitchNodes.ts`) and **uninstalled `three` + `@types/three`**.
     Replaced `worldNodes.ts` with the new typed `worldGyms.ts`.

2. **Why it changed**
   - The previous version was still "a dashboard/card/map widget inside a normal webpage". The
     `EPIC_PLAYABLE_SKAMLOS_WORLD` + `SKAMLOS_WORLD_GYMS` docs ask for a genuinely playable, explorable
     learning world — movement, places, proximity, unlocks, juice — that _demonstrates_ VG X's own
     values (AI-native prototyping, user-centred experiences over pixels) instead of describing them.

3. **R&D performed**
   - Read both new design docs in full (`EPIC_PLAYABLE_SKAMLOS_WORLD.md`, `SKAMLOS_WORLD_GYMS.md`), the
     existing epic, `utlysning.md`, `AGENTS.md`, `package.json`, and the current Skamløs components.
   - Evaluated game tech: **Phaser**, **PixiJS**, **custom Canvas 2D**, **existing Three.js**, and
     **DOM + CSS + rAF** against game-feel, speed, maintainability, accessibility, Next 16/Turbopack
     compatibility, performance, fallback and "does it demonstrate the application concept".

4. **Concept and technology chosen**
   - **Custom DOM + CSS top-down game with a `requestAnimationFrame` movement loop — zero new deps.**
     The avatar is a real DOM element moved by direct ref writes each frame (no per-frame React
     re-render); gyms are real `<button>`s; popover/dock/journal are React/DOM. Rejected Phaser/PixiJS:
     both are heavy WebGL/canvas layers, invisible to assistive tech (would force a parallel DOM info
     layer anyway), and add SSR/Turbopack integration risk — the docs explicitly say "don't choose tech
     because it sounds impressive." Shipping a polished playable world with **zero dependencies** is
     itself the engineering-taste signal VG X wants, and it satisfies every accessibility/fallback rule.

5. **What was implemented** — see point 1. New typed data model `worldGyms.ts` derives factual content
   from `fitScan` (milestones/needs/case labels) and adds only playful place names, action labels, energy
   mapping and 2D positions. No invented metrics/achievements.

6. **How movement & interaction work**
   - A single setup effect runs the rAF loop: reads a held-keys `Set` (WASD + arrows mapped to logical
     directions), integrates velocity by `dt`, clamps to world bounds, writes `left/top` % straight to
     the avatar node, derives facing from the dominant axis, and computes the nearest gym within the
     proximity radius. Discrete changes (facing, moving, nearby) update React state only on change.
   - **Space/E/Enter** train the nearby gym; **Esc** closes the dock; **J/M** toggle the journal; clicking
     a gym or journal entry walks the avatar there (auto-target steering in the same loop) and opens it.
     Movement keys `preventDefault` only while the stage (`role="application"`, `tabIndex=0`) is focused.

7. **How gym states work**
   - All 8 gyms are real achievements → **unlocked** (colourful). Visiting adds to a `Set` → **visited**
     (check badge, calmer glow, journal "Besøkt"). Being within radius → **nearby** (hop + popover). The
     VG X portal is the only **next-quest** (dashed violet, positive framing). States are mirrored in the
     map, the popover, the legend and the journal badges.

8. **How panels / journal work**
   - **Dock** (non-blocking `<aside>`): place name, title, one-liner, "Hva dette var", "Hva jeg lærte",
     "VG X"-relevance, energy chips, case deep-links (`#<caseRef>`), portal needs summary, "Neste steg",
     and a contextual **action button**. Focus moves to the dock heading on open (`tabIndex=-1`, no trap)
     and returns to the trigger on close.
   - **Journal**: ordered list of all gyms (state badge + unlocked-skill + jump-to) and a VG X-match panel
     — usable entirely without playing, for time-pressed recruiters.

9. **Files changed**
   - `app/components/skamlos/worldGyms.ts` (new typed data model)
   - `app/components/SkamlosWorld.tsx` (rewritten into the playable game)
   - `app/components/SkamlosWorld.module.css` (rewritten: world, landmarks, avatar, juice, dock, journal)
   - Removed: `app/components/skamlos/worldNodes.ts`, `app/components/SkamlosPitchScene.tsx`,
     `app/components/SkamlosPitchScene.module.css`, `app/components/skamlos/FitConstellation.tsx`,
     `app/components/skamlos/pitchNodes.ts`
   - `package.json` / `package-lock.json` (uninstalled `three`, `@types/three`)
   - `docs/AI_PITCH_LOG.md` (this entry)
   - `Portfolio.tsx` unchanged this slice (already renders `<SkamlosWorld />` agentic-gated after Hero).

10. **Dependencies added** — **none** (net **removed** two: `three`, `@types/three`). Project deps are
    back to next/react/react-dom only.

11. **Fallback / reduced-motion / accessibility**
    - No WebGL/canvas → no advanced-rendering failure mode. If the game layer ever failed, the journal +
      dock (real DOM) still carry every fact and link, and gyms remain clickable buttons.
    - `prefers-reduced-motion` (external store + CSS query): disables walk bob, grass sway, trail flow,
      nearby-hop, particles, toast/portal animation; movement still works (and is slightly faster to
      compensate for no animation).
    - Keyboard: stage is `role="application"` with a descriptive label; gyms/journal/controls are real
      buttons with visible `:focus-visible`; dock focus is moved/returned politely (no trap); Esc closes;
      `role="progressbar"` with aria values; decorative layers are `aria-hidden`.
    - Touch: on-screen D-pad on coarse pointers + tap-to-select gyms. Responsive: dock/journal/HUD stack
      under the world < 900px; landmarks scale down < 520px. No audio. No external/required assets.

12. **Validation results**
    - `npm run lint` → ✅ passed (exit 0).
    - `npm run build` → ✅ passed (compiled ~8.5s, TypeScript ok, `/` prerendered **static**) before and
      after removing `three`.

13. **Manual QA guide**
    - **Professional** mode: no world, no journal, unchanged and sendable. **Mode persistence**: toggle,
      reload — saved mode restored.
    - **Skamløs**: world appears under the Hero. Click the stage, then **WASD/arrows** move the avatar
      (idle vs walk animation, facing flips). Walk near a gym → **popover** appears; walk away → it
      disappears. **Space** trains it → particle burst, toast, check badge, dock opens, energy bars +
      progress advance. Click a distant gym/journal entry → avatar walks there + opens. Visit all 8 →
      "Alle steder trent" + portal shimmer. Open **VG X-portalen** → positive "neste arena" framing + the
      four needs + CTA-style action. **J/M** toggle journal; click an entry to jump. **Esc** closes (focus
      returns). Case deep-links (e.g. "Se Klar") scroll to the case. Mobile/touch → **D-pad** + tappable
      gyms; dock stacks below. OS **reduced-motion** → animations calm, play still works. **No console
      errors** expected.

14. **Risks / tradeoffs**
    - Per-frame DOM writes are cheap (one element, `left/top`), but movement is %-based on an
      `aspect-ratio` stage, so proximity distance is mildly anisotropic — fine at these sizes; revisit if
      the world grows.
    - Landmark positions are hand-placed in `worldGyms.ts`; reordering/adding gyms needs position tweaks.
    - Landmarks are CSS approximations of brand languages (no logo images) — intentional, to avoid asset/
      licensing issues and keep "no required external assets".
    - The dock has placeholder-free copy but **no real media yet** (screenshots/video) — slots are a
      natural next addition. Footer contact links are still placeholders (pre-existing).

15. **Recommended next slice**
    - **Slice 8 — Media + polish:** add image/video slots in the dock for real project screenshots
      (Klar, Wordhunt, Figma prototypes), an optional Ctrl+C easter egg in Systemkilden/Agentlabben
      ("Process stopped. Curiosity continues."), a subtle camera/parallax on larger worlds, and a
      first-visit guided arrow toward Systemkilden. Then revisit whether Fit Scan / JourneyTimeline below
      the world are now partly duplicated and can be trimmed.

---

## 2026-06-18 — Slice 8: Game-first app shell (the game IS the Skamløs interface)

1. **What changed**
   - **Product/IA shift:** Skamløs AI-pitch is no longer "game + long webpage". It is now **game-first**:
     in Skamløs mode the page renders only the **Hero** (orientation) + the **playable world**, and a
     one-line fallback link back to Professional mode. The duplicate long sections (FeaturedKlar,
     SupportingCases, Fit Scan, Quest Log/JourneyTimeline, AgenticWorkflow, footer) are **gated out of
     Skamløs mode**; their content is reframed inside the world's gym panels + journal.
   - **Bigger world shell:** the stage is now a viewport-dominant surface (`clamp(440px, 78vh, 760px)`,
     ~66vh on tablets) instead of a small aspect-boxed card. The world is the main thing on screen.
   - **Journal is now an in-game overlay** (`role="dialog"`, slide-in panel + backdrop) with **four
     tabs**: **Reise** (the journey as jump-to gym list), **Bevis** (the real cases behind the gyms —
     Klar + side projects, with the live Klar link), **VG X-match** (the four VG X needs with honest fit
     badges + "hvorfor Stian"), and **Kontakt** (footer contact links + closing line). It opens over the
     world without scrolling the page or pushing content down. `J`/`M`, the HUD button, and the Hero
     "Åpne journal" CTA all open it; `Esc` / backdrop / × close it and return focus to the world.
   - **Focus/input fixed:** removed the effect that auto-moved focus into the dock on every interaction
     (the cause of "game dies after Space"). Now the avatar keeps focus; `close()` returns focus to the
     stage. The stage keydown handler only drives the game when **the stage itself is focused**
     (`e.target === stage`), so tabbing into the dock/journal pauses game input (accessible) but normal
     play never loses focus. Dock & journal have their own `Esc` handlers since focus may sit inside them.
   - **Reduced in-world clutter:** gym name labels are now hidden at distance and only appear when the
     avatar is **near**, on **hover/focus**, or for **visited/next-quest** gyms. The world reads through
     landmarks, colour, glow, states and the proximity popover; text lives in the panel/journal.
   - **Compact-first dock → details on demand:** the side panel is now an overlay drawer that slides in
     from the right inside the world. It shows the essentials first (title, one-liner, "Låser opp", a
     one-line VG X relevance, primary action) with a **"Les mer"** expander for the full
     what/learned/energy/evidence/next-step. Case links now **open the journal Bevis tab** (anchors to the
     removed long sections would otherwise dangle in Skamløs mode). The VG X portal panel surfaces an
     **"Åpne kontakt"** CTA.
   - **Hero (agentic) CTAs** changed to game actions: **"Start reisen"** (into the world) and **"Åpne
     journal"** (dispatches a decoupled `skamlos:openjournal` event the world listens for). Professional
     Hero CTAs are unchanged.

2. **Why it changed**
   - The brief: _"Skamløs AI-pitch should not be game + webpage. It should be the game as the interface."_
     The previous slice made a real game but left it sitting atop a long duplicate portfolio, `J` jumped
     into document flow, and Space could drop game focus. This slice makes the world the actual
     information architecture and fixes the input/focus and clutter problems.

3. **Files changed**
   - `app/components/SkamlosWorld.tsx` — rewritten: game-first shell, overlay dock, tabbed journal modal,
     focus fixes, `skamlos:openjournal` listener, compact/expandable panel, Bevis/Kontakt content.
   - `app/components/SkamlosWorld.module.css` — scene head, viewport-tall stage, label-on-proximity,
     overlay dock (slide-in + mobile bottom sheet), journal modal + tabs, Bevis/Kontakt/fallback styles,
     updated reduced-motion + responsive rules.
   - `app/components/Portfolio.tsx` — Skamløs mode now renders only Hero + SkamlosWorld; removed
     `FitScan` / `JourneyTimeline` imports.
   - `app/components/Hero.tsx` — `"use client"`; agentic CTAs become "Start reisen" / "Åpne journal".
   - `docs/AI_PITCH_LOG.md` — this entry.

4. **Validation run**
   - `npm run lint` → ✅ passed (after fixing a `react-hooks/refs` error: replaced a handler-factory
     called during render with two concrete `useCallback` Esc handlers).
   - `npm run build` → ✅ passed; `/` prerendered **static**; TypeScript clean.

5. **Intentionally NOT changed**
   - **Professional mode** is untouched: same Hero CTAs, FeaturedKlar, SupportingCases, AgenticWorkflow,
     footer, and all `#klar` / `#forloper` / `#workflow` anchors still exist there.
   - The gym roster, real journey, copy, energy mapping and Klar-as-its-own-landmark rule are unchanged.
   - Internal mode key stays `"agentic"`; mode persistence (localStorage) untouched.
   - No invented facts/metrics; all panel/journal text comes from existing data.

6. **Remaining placeholders**
   - Contact links (`footer.links`) and the footer humour line are still placeholders (pre-existing).
   - No real media yet — the dock/Bevis have no screenshots/video (only the live Klar URL renders).
   - `FitScan.tsx` / `JourneyTimeline.tsx` (+ their CSS) are now **orphaned** on disk; their content was
     reframed into the journal's VG X-match / Reise tabs. Kept for reference / Professional reuse.

7. **Risks / concerns**
   - The dock lives inside the `overflow:hidden` stage; a gym very close to the right edge can sit behind
     the open dock (acceptable — the dock is the focus then).
   - Stage is now free-aspect (height-driven); proximity is computed in world units so distance is
     mildly anisotropic. At desktop sizes the box aspect (~1.57) is near the world's 1.5625, so distortion
     is minimal; revisit if the world grows.
   - Game input is gated to `e.target === stage`; this is deliberate (tab-into-panel pauses play) but
     means a user who tabs to a gym button and presses WASD won't move until they refocus the stage.

8. **Recommended next slice**
   - **Slice 9 — Media + delete orphans:** add screenshot/video slots to the dock & Bevis tab (Klar,
     Wordhunt, Figma), then **delete the orphaned `FitScan` / `JourneyTimeline` files** (content now lives
     in the journal) to remove the duplicate source of truth. Optional: Ctrl+C easter egg in
     Systemkilden/Agentlabben, a first-visit guided arrow toward Systemkilden, and a sound-off toggle.

---

## 2026-06-18 — Slice 8b: Focused gameplay cleanup (popover safety + no panel train-buttons + Avkobling framing)

1. **What changed**

- Added a reusable popover placement helper in the world component:
  `getPopoverPlacement(gym)` now clamps popover anchor X within safe bounds and flips vertically when
  nodes are near the top edge. The popover now uses CSS vars (`--pop-x`, `--pop-y`) plus `data-v`
  (`top`/`bottom`) so all gyms, including the VG X portal in the top-right, stay readable in-shell.
- Updated popover CSS to support edge-safe placement: directional transform for top/bottom placement,
  directional pointer arrow, and a neutral fade/scale-in animation that no longer assumes one fixed
  direction.
- Removed in-panel **training action buttons** from gyms. Visiting/interacting (`Space`, click) remains
  the single unlock action; panel now shows the action label as compact flavor copy (`Utforskning`) and
  keeps only utility actions ("Les mer" + portal contact button for VG X).
- Rewrote `fitScan.needs.avkobling` wording to avoid "Koble av fra hverdagsstress" as a personal skill.
  It is now framed as a **VG X product need** around calmer access, reduced friction and lower cognitive
  load, with honest evidence strength still marked `fit: "voksende"`.

2. **Why it changed**

- This pass targets concrete UX friction in the current game-first slice: corner-cramped popovers,
  unnecessary panel button tasks that interrupt exploration flow, and awkward Avkobling phrasing that
  sounded like a personal skill instead of a product-experience need.

3. **Files changed**

- `app/components/SkamlosWorld.tsx`
- `app/components/SkamlosWorld.module.css`
- `app/data/portfolio.ts`
- `docs/AI_PITCH_LOG.md`

4. **Validation run**

- `npm run lint` → ✅ passed.
- `npm run build` → ✅ passed; `/` prerendered static.

5. **Intentionally NOT changed**

- Professional mode composition and behavior unchanged.
- No new major features or architecture changes; game-first shell from Slice 8 remains intact.
- Gym order, milestones, and real-case mapping unchanged.

6. **Remaining placeholders**

- Contact links and humor line placeholders remain unchanged.
- No new media assets were added in this pass.

7. **Risks / concerns**

- Popover uses heuristic edge thresholds (safe and predictable, but not collision-measured against
  dynamic panel widths). If scene density increases, consider precise pixel-based collision checks.
- Action labels still appear as flavor text in panel/popover; copy should stay short to avoid clutter.

8. **Recommended next slice**

- **Slice 9 (continue):** add manual placement QA snapshots (all gyms, desktop + mobile), then remove
  fully orphaned components (`FitScan`, `JourneyTimeline`) once verified no references remain.

---

## 2026-06-18 — Slice 9a: Real case assets + real links integration

1. **What changed**

- Integrated real external URLs for supporting cases in `portfolio.ts`:
  - Forløperprosjektet → PD app frontend
  - ASK Away → Figma prototype
  - AI og fagtekstforståelse (Warp Read) → Figma prototype
  - ACAD Collaborate → Figma prototype
  - Wordhunt → YouTube video
- Replaced screenshot placeholders with real images where files were provided.
  A screenshot mapping now resolves by case id + screenshot label and renders actual images from
  `public/images/cases/...`, with fallback placeholder only when an image is missing.
- Added explicit access notes with email for Klar and Forløper links:
  - "Demo-/brukertilgang gis ved forespørsel: stianglomsrod@gmail.com"
  - "Ta kontakt for brukertilgang: stianglomsrod@gmail.com"
- Updated case link labels to readable, specific CTAs (e.g. "Åpne ASK Away i Figma",
  "Se Wordhunt-video").

2. **Why it changed**

- To replace visible placeholder content with real, recruiter-usable evidence and links, while keeping
  both Professional and Skamløs modes stable and truthful.

3. **Files changed**

- `app/data/portfolio.ts`
- `app/components/ScreenshotPlaceholder.tsx`
- `app/components/CaseCard.tsx`
- `app/components/CaseCard.module.css`
- `app/components/FeaturedKlar.tsx`
- `docs/AI_PITCH_LOG.md`
- Added/moved image assets under:
  - `public/images/cases/klar/`
  - `public/images/cases/supporting/`

4. **Validation run**

- `npm run lint` → ✅ passed.
- `npm run build` → ✅ passed; `/` prerendered static.

5. **Intentionally NOT changed**

- No IA or layout redesign.
- No changes to game mechanics or Professional/Skamløs mode gating.
- No invented claims or credentials.

6. **Remaining placeholders**

- No screenshot file was provided for ACAD or Wordhunt, so those remain without real gallery images
  (fallback behavior remains safe).
- Footer contact links/humor placeholders remain as previously (outside this scope).

7. **Risks / concerns**

- If screenshot label text in data changes later, mapping keys must be updated to keep image resolution.
- External prototype/video URLs can change over time; periodic link checks recommended.

8. **Recommended next slice**

- Add optional screenshot assets for ACAD and Wordhunt, then migrate screenshot mapping from label-based
  keys to explicit structured image metadata in `portfolio.ts` for stronger long-term maintainability.

---

## 2026-06-18 — Slice 9b: Clickable screenshot galleries with reusable lightbox carousel

1. **What changed**

- Implemented a reusable, accessible image lightbox/carousel (`ImageLightbox`) for case screenshots.
- Implemented a reusable gallery wrapper (`CaseScreenshotGallery`) that makes available screenshots
  clickable thumbnails and opens the lightbox at the clicked image.
- Wired both featured Klar gallery and supporting primary case galleries to the shared wrapper; no IA
  changes, only interaction upgrade.
- Added shared screenshot data helpers (`caseScreenshotData.ts`) so image source/alt metadata is not
  duplicated across components.
- Updated screenshot card CSS for semantic clickable thumbnail buttons with visible focus states.

2. **Why it changed**

- Screenshots were visible but too small to inspect. Recruiters need larger, inspectable evidence without
  leaving the page.

3. **Files changed**

- `app/components/ImageLightbox.tsx` (new)
- `app/components/ImageLightbox.module.css` (new)
- `app/components/CaseScreenshotGallery.tsx` (new)
- `app/components/caseScreenshotData.ts` (new)
- `app/components/FeaturedKlar.tsx`
- `app/components/CaseCard.tsx`
- `app/components/CaseCard.module.css`
- `app/components/ScreenshotPlaceholder.tsx` (refactored to shared data helper)
- `docs/AI_PITCH_LOG.md`

4. **Validation run**

- `npm run lint` → ✅ passed.
- `npm run build` → ✅ passed; `/` prerendered static.

5. **Intentionally NOT changed**

- No redesign of page layout or IA.
- No changes to mode gating (Professional vs Skamløs).
- No changes to gameplay logic in Skamløs world.

6. **Remaining placeholders**

- ACAD and Wordhunt still have no screenshot assets provided; they retain tasteful placeholders and do not
  open a broken lightbox.

7. **Risks / concerns**

- Lightbox entry index is derived by caption match in the current screenshot labels. If labels are edited,
  mapping should be updated accordingly.
- Body scroll lock uses `document.body.style.overflow`; if future overlays do the same simultaneously,
  a shared scroll-lock utility may be cleaner.

8. **Recommended next slice**

- Add ACAD/Wordhunt screenshots and migrate screenshots in `portfolio.ts` from label-only arrays to typed
  objects (`caption`, `src`, `alt`) for stricter compile-time safety.
