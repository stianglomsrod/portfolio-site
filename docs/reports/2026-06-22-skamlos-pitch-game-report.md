# Skamløs Pitch — Playable 3D Portfolio Game (first major version)

## 0. User prompt

(Reconstructed as closely as possible from the working session — the verbatim
text was condensed during context compaction.)

"Let's do a no-holds-barred creative and technical push: build the first major
playable version of a 3D first-person 'Skamløs Pitch' game for the DNB-targeted
portfolio, living at the route /skamlos-pitch. You may install dependencies and
make the big architectural calls yourself. Override the conservative repo
defaults if — and only if — they would block making a genuinely impressive,
genuinely playable experience. Hard constraints stay in force: do not touch or
endanger master / the VG X variant; no PII or private school/student data, no
national ID, nothing medical, nothing from gitignored sources; no DNB logos or
official branding or implied affiliation; don't claim senior platform or
distributed-systems mastery; don't imply that the game means I got or deserve
the job; no unsupported student-outcome or production-scale claims. Do not commit
automatically, do not push automatically, and report exactly what changed."

## 1. Session context

- Branch: feature/skamlos-pitch-game (master / VG X untouched and protected).
- Task type: large feature build — code + 3D UI + docs + QA. Not docs-only.
- VG X protected: yes. The only shared-file change is a behaviour-preserving fix
  to app/components/Reveal.tsx (explained in section 4).
- This session continued an in-progress build: the data, state, i18n and 3D world
  layers existed; this session built the entire UI/orchestrator layer, fixed two
  build-blocking issues, made lint clean, ran runtime QA, and wrote the docs.
- Roles: Copilot (Opus) as implementation agent; user runs the environment and
  evaluates feel; ChatGPT is tech lead / continuity keeper (recipient of this
  report).

## 2. Files and sources read (why each mattered)

- .github/copilot-instructions.md, AGENTS.md — operating model, positioning rules,
  claim boundaries, FILE_TREE rule, report format and delivery rules.
- app/skamlos-pitch/game/state/types.ts — exact shapes for GameState, OverlayKind
  (discriminated union), ActiveTarget, Toast, Loc/LocList; drove every UI prop type.
- app/skamlos-pitch/game/state/gameReducer.ts — actions, reducer behaviour, and the
  selectors (hasSkill, isQuestUnlocked, isQuestComplete, isGateOpen, gateMissingSkills,
  getProgress) the UI and orchestrator consume.
- app/skamlos-pitch/game/state/GameContext.tsx — useGameController()/useGame() and the
  context value; needed to export GameContextValue and to wire the double provider.
- app/skamlos-pitch/game/i18n.ts — the full NO/EN UI string table and CONTACT details;
  every UI label and the endgame copy comes from here.
- app/skamlos-pitch/game/data/quests.ts, world.ts, (and skills/artifacts/easterEggs by
  reference) — quest chain, gate requirements, missions, and the precise ids used by
  selectors and the interaction handler; also the basis for the QUEST_AND_SKILL_TREE doc.
- app/skamlos-pitch/game/world/Player.tsx and Scene.tsx — to confirm the exact
  activeTarget id formats (quest = bare id, artifact = "artifact:<id>", egg = "egg:<id>",
  gate = "dnb-gate") and the Scene props/controls wiring.
- app/skamlos-pitch/game/Game.tsx (minimal placeholder) and SkamlosPitchClient.tsx —
  the route/loading contract (WebGL probe + dynamic ssr:false) the orchestrator had to fit.
- eslint.config.mjs and .gitignore — to scope a lint override correctly and to make the
  skamlos design docs trackable (most markdown is ignored by repo convention).
- node_modules behaviour confirmed earlier in the build (R3F React-19 compatibility).

## 3. Reasoning against project rules

- DNB positioning: the game embodies the "AI-first builder with system understanding"
  framing by being a non-trivial, data-driven, bilingual, accessible software artifact.
  Copy is foundations-and-growth, never senior/distributed-systems mastery. The agentic
  mission explicitly turns "rebuild as a distributed platform, deploy to prod, no review"
  into the WRONG answer, and frames distributed systems as a growth direction.
- Claim boundaries: Klar is described everywhere as a robust prototype evaluated with
  teachers — never students, never enterprise/production scale, never user-outcome
  statistics. Every artifact card carries an honest boundary line. The endgame states the
  application package is "ready" and invites contact; it never says the job is won.
- No DNB official branding: the gate is a clearly symbolic goal; no logos, no implied
  affiliation. Route metadata sets robots noindex so it stays a deep-link pitch.
- Cost control: reused the existing LanguageContext and globals.css palette; added no new
  state library (custom useReducer); no new runtime dependencies beyond the R3F stack that
  was already installed earlier in the build.
- Agent role discipline: implemented in reviewable layers (data -> state -> world -> ui ->
  orchestrator), validated, documented. Did not commit or push.
- Privacy: no PII, no medical framing, nothing from docs/dnb/sources (gitignored).

## 4. Files created, modified, moved, deleted (full relative paths)

Created — page shell and styling:

- app/skamlos-pitch/skamlos-pitch.module.css — HUD, modals, side panels, start screen,
  endgame and fallback styling (dark-tech, accents #6aa6ee / #7cc0ff / #b58cff).

Created — UI overlay layer (app/skamlos-pitch/game/ui/):

- LangToggle.tsx — NO/EN switch reused on start screen and HUD.
- StartScreen.tsx — title, tagline, honesty note, controls grid, play button, accessibility
  note, fallback toggle, back-to-portfolio link.
- Hud.tsx — crosshair (active state), live objective tracker, quest/skill/evidence counters,
  interaction prompt, controls hint, panel buttons, toasts with auto-dismiss, resume layer.
- QuestLog.tsx — side panel listing all zones with locked/available/done status.
- SkillTree.tsx — side panel, skills grouped (foundation/design/fullstack/ai/craft), lit on unlock.
- QuestModal.tsx — zone terminal: evidence body, locked-state with missing skills, plain
  completion, and the full decision-mission flow (pick -> feedback -> retry/complete).
- ArtifactModal.tsx — evidence card with kind badge, honest boundary, Collect, external link.
- EggModal.tsx — easter-egg discovery card with optional badge and link.
- GateLockedModal.tsx — shown at the gate before the signature skills are unlocked.
- Endgame.tsx — serious stats, playful stats, completed quests / skills / evidence / eggs,
  the honest closing message (NO/EN), contact buttons (email, phone, LinkedIn, GitHub),
  replay and back-to-portfolio.
- Fallback.tsx — accessible no-WebGL text version of the entire pitch (all zones with links,
  skills, contacts); uses the shared language store directly.

Created — orchestrator (replaced the temporary placeholder):

- app/skamlos-pitch/game/Game.tsx — builds the controller value, renders the Canvas with the
  double GameContext.Provider, owns the controls/locked refs, the global keyboard listener
  (E interact, Q log, K skills, Esc close), the pointer-lock coordination, overlay routing,
  and the start/playing/won phase switch.

Created — docs:

- docs/skamlos/SKAMLOS_GAME_DNA.md — architecture, route pattern, double-provider rationale,
  controls, claim-safety, accessibility, validation status, and how to extend.
- docs/skamlos/QUEST_AND_SKILL_TREE.md — zone dependency graph (mermaid), per-zone table,
  decision-mission tables, evidence + boundaries table, easter eggs, skill groups.

Moved / renamed:

- app/skamlos-pitch/game/world/layout.ts -> app/skamlos-pitch/game/world/placement.ts
  (a file named layout.ts anywhere under app/ is treated by Next.js as a reserved route
  Layout and breaks the build). Updated the two importers (Scene.tsx, Player.tsx).

Modified — game internals:

- app/skamlos-pitch/game/state/GameContext.tsx — exported GameContextValue; replaced the
  ReturnType-helper state type with the direct GameState type (removed an unused-symbol warning).
- app/skamlos-pitch/game/world/Scene.tsx — typed controlsRef via ComponentRef<typeof
  PointerLockControls> (PlcRef) instead of importing three-stdlib directly; dropped the unused
  controlsRef prop from Player; updated the placement import.
- app/skamlos-pitch/game/world/Player.tsx — simplified props to lockedRef only; updated import.
- app/skamlos-pitch/SkamlosPitchClient.tsx — one justified eslint-disable on the post-mount
  WebGL probe (client-only detection).

Modified — shared / config:

- app/components/Reveal.tsx (SHARED, used by VG X) — behaviour-preserving fix for the
  whole-program build error caused by react-three-fiber's global JSX augmentation. Kept JSX,
  removed the `as React.ElementType` widening (Tag stays the narrow union
  "div"|"section"|"li"|"article"), and cast the ref. Output markup and behaviour are identical.
- eslint.config.mjs — added a scoped override turning off react-hooks/immutability only for
  app/skamlos-pitch/game/world/\*\*, because R3F mutates the camera (a useThree value) every
  frame inside useFrame. No global lint posture changed.
- .gitignore — added !docs/skamlos/ and !docs/skamlos/\*.md so the design docs and this report
  are trackable (the repo otherwise ignores all markdown except dnb/ and reports/).
- FILE_TREE.md — added the full app/skamlos-pitch/ subtree, the docs/skamlos/ docs, and this report.

Deleted: none.

## 5. What was delivered

A complete, playable first-person 3D "competence world" at /skamlos-pitch:

- Walk (WASD + mouse / Pointer Lock, Shift to sprint) through seven zones arranged as a
  symbolic journey from classroom needfinding to agentic engineering, ending at the DNB AI
  Tech Gate.
- Interact (E) with zones to read truthful, claim-safe evidence; complete them to unlock
  skills and reveal collectible evidence artifacts (with public verified links).
- Two decision missions dramatize honest engineering discipline: Smart Import
  (human-in-the-loop wins) and the Agentic workflow (context/requirements/review/QA and
  holding scope wins; "rebuild as a distributed platform, no review" loses).
- Locked zones gate on prerequisite skills; the final gate opens only on the five signature
  skills and triggers an endgame that presents the "application package" with serious and
  playful stats, an honest closing message, and contact buttons — explicitly not a
  "you got the job" screen.
- Fully bilingual (NO/EN) via the existing language store; reduced-motion aware; and a
  complete accessible no-WebGL text fallback of the whole pitch.

## 6. Claim and risk QA

- No senior / distributed-systems mastery claim — distributed systems appear only as the
  wrong, over-scoped mission choice and as a stated growth direction.
- No lower-level / pure-UX / prompt-user-only framing — positioned as AI-first builder with
  system understanding and research-based design competence.
- Klar = robust prototype evaluated with teachers; not enterprise, not student-tested, no
  user-outcome or production-scale claims. Every artifact card has an honest boundary.
- No student user-testing claims; participatory design framed as small, non-representative,
  value-in-principles.
- No private / medical content. No PII. Nothing from gitignored sources.
- No DNB official branding or implied affiliation; gate is clearly symbolic; route is noindex.
- Endgame invites contact and states the package is ready; never implies the job is won/deserved.
- External links are public and verified (CS50x cert, Klar live + repo, PD app repos, companion
  repo, GitHub, LinkedIn); contact details centralised in i18n.ts.

## 7. Validation performed

- npm run build — PASS. Output: "Compiled successfully", "Finished TypeScript", static
  generation of 5 pages, route /skamlos-pitch prerendered (○ Static). The whole-program
  TypeScript check passes (this is what caught the Reveal.tsx and layout.ts issues).
- npm run lint — PASS, clean (no output). Achieved by: scoped immutability override for the
  R3F world layer, one justified disable on the WebGL probe, syncing the orchestrator's
  value ref in an effect instead of during render, and removing an unused-symbol warning.
- Runtime QA — dev server (port 3000) + integrated headless browser:
  - Start screen renders bilingual with controls grid, play button, a11y note, lang toggle.
  - Canvas mounts; WebGL context confirmed; ZERO console / page errors after load + start.
  - Start -> play transition shows the HUD with the live objective ("Find the first real
    need in the classroom"), 0/7 quests, 0 skills, 0 evidence, controls hint, panel buttons.
  - Quest log panel and skill-tree panel open and render all content (all 5 skill groups,
    every skill greyed with the "no skills yet" note).
  - NO/EN toggle updates the live HUD (Objective/Quests/Skills/Evidence/Move/Sprint/Resume).
  - Fallback text version renders all 7 zones with titles, the three section headings, and
    8 external links.
  - Not automatable: pointer-lock gameplay (walking, E-interaction, quest completion, gate
    win) — the headless browser declines Pointer Lock without a real user gesture, so the
    resume layer correctly appears. That path rests on the type-checked reducer/selectors and
    is for manual play verification by the user.
- git status captured (section 9). No commit, no push (per rules).

## 8. File tree / path updates

- FILE_TREE.md updated: YES.
- Added (full relative paths):
  - app/skamlos-pitch/page.tsx
  - app/skamlos-pitch/SkamlosPitchClient.tsx
  - app/skamlos-pitch/skamlos-pitch.module.css
  - app/skamlos-pitch/game/Game.tsx
  - app/skamlos-pitch/game/i18n.ts
  - app/skamlos-pitch/game/data/skills.ts
  - app/skamlos-pitch/game/data/artifacts.ts
  - app/skamlos-pitch/game/data/quests.ts
  - app/skamlos-pitch/game/data/easterEggs.ts
  - app/skamlos-pitch/game/data/world.ts
  - app/skamlos-pitch/game/state/types.ts
  - app/skamlos-pitch/game/state/gameReducer.ts
  - app/skamlos-pitch/game/state/GameContext.tsx
  - app/skamlos-pitch/game/world/placement.ts
  - app/skamlos-pitch/game/world/Scene.tsx
  - app/skamlos-pitch/game/world/Player.tsx
  - app/skamlos-pitch/game/world/Decor.tsx
  - app/skamlos-pitch/game/world/Zone.tsx
  - app/skamlos-pitch/game/world/ArtifactPickup.tsx
  - app/skamlos-pitch/game/world/EasterEggs.tsx
  - app/skamlos-pitch/game/world/DnbGate.tsx
  - app/skamlos-pitch/game/world/world.module.css
  - app/skamlos-pitch/game/ui/LangToggle.tsx
  - app/skamlos-pitch/game/ui/StartScreen.tsx
  - app/skamlos-pitch/game/ui/Hud.tsx
  - app/skamlos-pitch/game/ui/QuestLog.tsx
  - app/skamlos-pitch/game/ui/SkillTree.tsx
  - app/skamlos-pitch/game/ui/QuestModal.tsx
  - app/skamlos-pitch/game/ui/ArtifactModal.tsx
  - app/skamlos-pitch/game/ui/EggModal.tsx
  - app/skamlos-pitch/game/ui/GateLockedModal.tsx
  - app/skamlos-pitch/game/ui/Endgame.tsx
  - app/skamlos-pitch/game/ui/Fallback.tsx
  - docs/skamlos/SKAMLOS_GAME_DNA.md
  - docs/skamlos/QUEST_AND_SKILL_TREE.md
  - docs/reports/2026-06-22-skamlos-pitch-game-report.md (this report)
- Moved: app/skamlos-pitch/game/world/layout.ts -> app/skamlos-pitch/game/world/placement.ts
- Modified (not new paths): app/components/Reveal.tsx, eslint.config.mjs, .gitignore,
  FILE_TREE.md, app/skamlos-pitch/game/state/GameContext.tsx,
  app/skamlos-pitch/SkamlosPitchClient.tsx (the last two were created earlier in the build).

## 9. Git / commit status

- Committed: NO (rules: do not commit unless explicitly asked).
- Pushed: NO (rules: do not push automatically).
- Branch: feature/skamlos-pitch-game. No upstream tracking branch is set, so there is no
  ahead/behind count; a push would need an explicit upstream the user chooses.
- Working tree (summary): modified — FILE_TREE.md, app/components/Reveal.tsx, eslint.config.mjs,
  .gitignore, package.json, package-lock.json (the package files reflect the R3F deps installed
  earlier in this build). Untracked — the entire app/skamlos-pitch/ tree and docs/skamlos/.

## 10. Risks, uncertainties, and follow-up

- Pointer-lock gameplay was verified by build/type-safety and component QA, but not by an
  automated end-to-end playthrough (headless browsers refuse Pointer Lock). Please play it
  locally: confirm movement, E-interaction near each zone, quest completion, both missions,
  artifact links opening, egg pickups, the gate opening on the five signature skills, the
  endgame stats/contacts, replay, and the resume-after-Esc loop.
- The shared Reveal.tsx change is behaviour-preserving but touches a VG X file; a quick visual
  pass on the VG X home reveal animations is worth doing for peace of mind.
- The eslint immutability override is intentionally narrow (world layer only); keep new
  per-frame camera code inside app/skamlos-pitch/game/world/ so it stays covered.
- Performance on low-end GPUs: dpr is capped at 1.8 and the world is compact, but worth a
  sanity check on a weaker device.
- The verbatim user prompt in section 0 is reconstructed (context was compacted); intent is
  faithful.

## 11. Recommended next step

Run it locally (npm run dev, open /skamlos-pitch), do a full manual playthrough start to
finish in both NO and EN, and capture a few screenshots so we can tune the visual feel
(lighting, zone spacing, label readability, mission copy). After your feel-pass, decide
whether to commit this slice on feature/skamlos-pitch-game and set an upstream — I will not
commit or push until you say so.
