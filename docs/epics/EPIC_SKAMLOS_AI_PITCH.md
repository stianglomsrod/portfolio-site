# EPIC — Skamløs AI-pitch (VG X UX Designer)

> Status: **Planning slice (concept defined, not yet built)**
> Owner: portfolio-site
> Related: [`docs/AI_PITCH_LOG.md`](../AI_PITCH_LOG.md) · job ad: `../../utlysning.md`
> Goal in one line: **Help Stian Glomsrød land the UX Designer role at VG X** by turning the
> second site mode into a memorable, credible, strategically-cool pitch that makes his unusual
> profile feel like an unfair advantage for _this exact job_.

---

## 0. Naming

- Current internal mode key: `"agentic"` (unchanged — see "Why we keep the key").
- Current user-facing label (after this slice): **"Skamløs AI-pitch"**.
- Professional mode label is unchanged: **"Profesjonell"**.

**Why we keep the key `"agentic"`:** the `Mode` union, `localStorage` value (`portfolio-mode`),
`data-mode` attribute and all per-mode content branches key off `"agentic"`. Renaming the _key_
touches ~12 files and the persistence contract for zero user benefit. We rename only the **label**
in `modeLabels`. A future slice may introduce a friendlier alias if desired, but it is not required.

---

## 1. Job-ad analysis (source: `utlysning.md`)

VG X is a new VG product reinventing news for a generation that struggles with today's formats.
"We don't make articles. We make experiences." Small cross-functional team (content, design,
product, tech, analysis). **AI-native by construction.**

What they explicitly ask for, and how it maps to Stian:

| VG X asks for                                             | Signal in the ad                                                                 | Stian's evidence                                                                               |
| --------------------------------------------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| AI to work smarter, not just Figma hours                  | "Vi er ikke så opptatt av hvor mye du bruker Figma… om du har begynt å bruke AI" | Agentic workflow as a _method_; Klar's Smart Import as AI-as-product                           |
| Experiment with AI to prototype ideas                     | "eksperimenterer aktivt med AI-verktøy for å prototype ideer"                    | Klar (functioning PWA), fullstack precursor, Figma AI/fagtekst                                 |
| Solve problems with machine power + intuition, not pixels | "ikke handle om piksler, men… maskinkraft og intuisjon"                          | Teacher's needfinding instinct + agentic build skill                                           |
| Short path from thought to test                           | "kort vei fra tanke til test"                                                    | Pattern across every project: make it testable fast                                            |
| User-centric, real insight                                | "ekte forstå menneskene som faktisk bruker det"                                  | Participatory design with students/teachers as co-designers                                    |
| Self-driven, ship rough to learn                          | "tør å få ut idéer raskt for å lære, uten at alt er ferdig"                      | Prototypes shipped with limited resources                                                      |
| Complex content → understandable experiences              | Core needs: Oversikt, Forståelse, Relevans, Avkobling                            | Klar = structure/priority for overloaded users; AI/fagtekst = complex text made understandable |
| Bonus: show AI-tool use — to what, why, challenges        | "Bonuspoeng… bruk av AI-verktøy: til hva, formål, utfordringer"                  | The site itself + the agentic workflow section                                                 |

**Strategic read:** VG X is **not** hiring a senior visual designer. They are hiring an early-career,
AI-native, user-centric _experimenter_ who turns insight into testable experiences. That is almost
a literal description of Stian's real profile. The pitch must lean into this, not apologize for the
non-traditional path.

### The four VG X user needs (use as a spine)

1. **Oversikt** — help people keep up with the conversation.
2. **Forståelse** — explain why it matters and how it affects lives.
3. **Relevans** — surface what's relevant to me and my interests.
4. **Avkobling** — disconnect from everyday stress.

Klar already speaks directly to **Oversikt** and **Forståelse** (structure, priority, reduced load,
AI parsing of complex input). This parallel is the single strongest pitch hook and must be explicit.

---

## 2. Profile-match analysis — strong but unusual

**The frame:** "Not a standard UX applicant — and that's the point."

- **Teacher + master in digital learning design** → professional-grade needfinding and an instinct
  for making complex content understandable (exactly VG X's Forståelse need).
- **Participatory design** → he designs _with_ users, not just for them.
- **Figma prototypes** (ASK Away, ACAD Collaborate, AI/fagtekst) → he has the prototyping craft the
  role lists, including early AI-for-comprehension exploration.
- **Functioning prototypes** (Django/Vue precursor, Klar PWA) → he ships testable artifacts, not
  just mockups. Rare and credible.
- **Agentic workflows** → his differentiator: he can help a team figure out _how AI agents should
  actually be used_ in product/design/dev — proactively, critically, with QA and failure-mode awareness.
- **This application is itself a demo** → the site is an AI-native prototype that argues its own thesis.

**Honest gaps to acknowledge (not hide):** not a senior visual designer; early in a UX career.
The pitch reframes these as _fit_, because the ad explicitly wants early-career and de-emphasizes
visual seniority. Never invent seniority, metrics, or awards.

---

## 3. Concept options for Skamløs AI-pitch

Each concept is evaluated on: **Credible · Memorable · True-to-Stian · Job-relevant · Buildable
(accessible, reduced-motion-safe, no heavy deps).**

### Concept A — "Candidate Fit Scan" (mission-control dashboard)

A calm dashboard that "scans" Stian against the VG X requirements. Each VG X need
(Oversikt/Forståelse/Relevans/Avkobling) and each role requirement gets a card that, on interaction,
reveals the concrete evidence from his journey. Feels like a product analytics view.

- ✅ Extremely job-relevant; maps 1:1 to the ad; reads as "this person thinks in product terms".
- ✅ Accessible (cards + disclosure), reduced-motion-friendly.
- ⚠️ Risk of feeling like a self-graded scorecard — must avoid fake "98% match" metrics.

### Concept B — "Skill-tree / Questline" (learning-journey progression)

Stian's journey as an unlockable progression: C/pointers → CS50x/Wordhunt → Figma prototypes →
participatory fullstack → Klar → agentic workflows. Each node expands to problem→prototype→workflow→
artifact. Light "progression" framing, not arcade.

- ✅ Tells the true story; memorable; nerdy-in-a-good-way.
- ✅ Builds on the existing `journey` data + `JourneyTimeline`.
- ⚠️ Skill-tree clichés risk childishness — must stay typographic and restrained.

### Concept C — "Problem → Prototype → Workflow → Artifact" interactive storyline

The hero storyline (already in data as `storyline`) becomes the organizing interaction: pick a
project, walk its four-beat arc, see how AI + users shaped each beat.

- ✅ Reinforces his core method; low complexity; reuses existing structures.
- ⚠️ Least novel; risks feeling like Professional mode with motion.

### Concept D — "Can Stian land VG X?" self-aware run

A playful, self-aware narrative framing ("la oss være ærlige om oddsen") that walks the recruiter
through the match while winking at the format. Energy without arcade aesthetics.

- ✅ Most personality; "skamløs" in spirit; funny-but-true.
- ⚠️ Highest tone risk — closest to desperation/AI-bro if mishandled.

### Concept E — "AI-native build, shown live" (meta/agentic demo)

A small, honest "behind the workflow" panel: how this very site was specced, prompted, QA'd and
critiqued with an external LLM — concrete artifact of agentic method.

- ✅ Directly answers the ad's bonus question (to what / why / challenges).
- ✅ Uniquely true to Stian; hard to fake; very on-thesis.
- ⚠️ Must avoid exposing private/sensitive content; keep it curated.

---

## 4. Recommended concept

**Primary: Concept A ("Candidate Fit Scan") as the spine, with B (journey progression) and E
(agentic build, shown) as two scenes inside it.**

Rationale for _this_ job:

- The ad is essentially a requirements list around four user needs. A "fit scan" that mirrors that
  structure makes a recruiter's evaluation effortless — we hand them the mapping, backed by real
  evidence. That is _strategically_ cool, not just cool.
- The journey progression (B) supplies the credibility narrative ("real learning journey from
  pointers to agentic workflows") inside the scan, so the scan is never an empty scorecard.
- The "agentic build, shown" scene (E) answers the explicit bonus question and proves the thesis
  that _this application is itself an AI-native prototype_.
- All three reuse existing data (`storyline`, `journey`, `agenticWorkflow`, `profileTags`) and the
  `Reveal` + `Mode` infrastructure — low dependency, accessible, reduced-motion-safe.

**Deliberately bold (the "skamløs" part):** confident, self-aware microcopy; an explicit
"here's why I'm a match" framing; a visible nod that the site was built with the same AI-native
method the role asks for. **Bold in tone and framing, conservative in motion and dependencies.**

Hard "no" list: fake match percentages, invented metrics/awards, arcade/childish visuals, dated
memes, desperation, generic "future of work" filler, hidden-content traps, hydration-risky cleverness.

---

## 5. Staged implementation plan (small slices for fresh agents)

Each slice must end green (`lint` + `build`) and update `docs/AI_PITCH_LOG.md`.

- **Slice 0 — Planning & naming (this slice).** Docs + label rename. ✅
- **Slice 1 — Content model for the fit scan.** Add a typed `fitScan` structure to
  `app/data/portfolio.ts`: VG X needs + role requirements, each with `evidence` referencing existing
  cases/journey. No UI yet. QA: types compile, no UI change in Professional mode.
- **Slice 2 — `FitScan` component (static, accessible).** Render the mapping as semantic
  cards with native disclosure (`<details>`/`<summary>` or button + `aria-expanded`). Agentic mode
  only. QA: keyboard, reduced-motion, mobile, Professional unchanged.
- **Slice 3 — Journey-as-progression upgrade.** Enhance `JourneyTimeline` (agentic variant) into the
  progression scene with the four-beat arc per node. Reuse `storyline`. QA: focus order, no motion traps.
- **Slice 4 — "How this was built" agentic scene (Concept E).** A curated, honest panel answering
  to-what/why/challenges. Content reviewed for no sensitive data. QA: copy review + a11y.
- **Slice 5 — Tone & microcopy polish pass.** Tighten "skamløs" voice; ensure Professional stays calm.
- **Slice 6 — Optional motion delight.** Only subtle, reduced-motion-gated enhancements. No new deps.

Keep slices independently shippable; never let an unfinished slice degrade Professional mode.

---

## 6. Components / data likely to be touched

- `app/data/portfolio.ts` — new `fitScan` data; possibly extend `journey`/`storyline` shapes.
- `app/components/ModeToggle.tsx` / `modeLabels` — label only (done in Slice 0).
- `app/components/Portfolio.tsx` — mount new agentic-only scenes conditionally.
- `app/components/JourneyTimeline.tsx` (+ `.module.css`) — progression upgrade (Slice 3).
- New: `app/components/FitScan.tsx` (+ `.module.css`) (Slice 2).
- New: `app/components/AgenticBuild.tsx` (+ `.module.css`) (Slice 4).
- `app/components/Hero.tsx` — possibly surface a one-line scan entry point (optional).

Professional-mode components (`FeaturedKlar`, `CaseCard`, `SiteFooter`, etc.) should **not** change
behavior; any shared edits must be additive and mode-gated.

---

## 7. QA strategy (per slice)

- **Build/lint:** `npm run lint` and `npm run build` must pass before closing a slice.
- **Mode isolation:** verify Professional mode is byte-for-byte behavior-identical (visual diff by eye
  - confirm no new DOM in professional branch).
- **Accessibility:** keyboard-only walkthrough; visible focus; `aria-expanded`/disclosure semantics;
  heading order; color contrast on accent tokens.
- **Reduced motion:** emulate `prefers-reduced-motion: reduce` — all content present, no transforms.
- **Progressive enhancement:** with JS disabled, content remains visible (Reveal fail-safe already in place).
- **Responsive:** 360px, 768px, 1280px.
- **Persistence:** toggle choice survives reload (`localStorage` `portfolio-mode`).
- **Content truth check:** no invented metrics/awards; no sensitive project data.

---

## 8. Preserving Professional mode as the safe default

- Professional remains the **default** (SSR + first paint) and the application-ready artifact.
- All new work is **gated behind `mode === "agentic"`**; never alter professional branches.
- New scenes mount only in agentic mode (as `JourneyTimeline` already does).
- If in doubt, a reviewer should be able to send the Professional view to an employer at any commit.

---

## 9. What should be deliberately bold in Skamløs AI-pitch

- **Framing:** openly map Stian to the ad ("here's the fit, with receipts").
- **Voice:** smart, self-aware, job-hungry, a little nerdy; funny without being unserious.
- **Meta-move:** acknowledge the site is itself an AI-native prototype — proof, not just claim.
- **Visual energy:** stronger accent + glow tokens (already supported), never arcade.
- Boldness lives in **tone, framing and copy** — not in motion, dependencies, or accessibility risk.
