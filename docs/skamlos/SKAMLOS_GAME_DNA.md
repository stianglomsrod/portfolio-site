# SKAMLOS_GAME_DNA.md — "Skamløs Pitch" Playable Portfolio

> Route: `/skamlos-pitch` (DNB variant, `feature/skamlos-pitch-game` branch).
> A first-person 3D "competence world" where the player walks through zones,
> completes quests, unlocks skills, collects evidence, and opens the DNB AI Tech
> Gate. Built with React Three Fiber on top of the existing Next.js app.

## 1. Intent

A "shameless in ambition, honest in content" interactive pitch. It demonstrates
— by *being* a non-trivial, data-driven, bilingual, accessible, agentically-built
software artifact — exactly the AI-first builder profile the DNB role targets.

The endgame never says "I got the job." It says "the application package is
ready, here is the evidence, please get in touch."

## 2. Tech stack

- **Next.js 16.2.9** (App Router, Turbopack) — existing app.
- **React 19.2.4**.
- **@react-three/fiber 9** + **@react-three/drei 10** + **three 0.180** — WebGL.
- No new state library: a custom `useReducer` store.
- Reuses the existing **`LanguageContext`** (`useLanguage()`, NO/EN, localStorage
  key `dnb-lang`) so the game's language follows the rest of the DNB site.

## 3. Route & loading pattern

`ssr:false` dynamic import is illegal in a Server Component under Next 16, so the
route is split into three layers:

    app/skamlos-pitch/page.tsx            server component, exports metadata (robots: noindex)
    app/skamlos-pitch/SkamlosPitchClient.tsx  'use client'; WebGL probe + dynamic import (ssr:false)
    app/skamlos-pitch/game/Game.tsx       the actual game (only ever loads on the client)

`page.tsx` sets `robots: { index: false }` — the game is a deep-link pitch, not an
indexable marketing page.

## 4. Architecture (data → state → world → ui)

The whole game is **data-driven**. Adding a zone/skill/artifact/egg is a data edit,
not a code change.

    game/
      data/        plain-data definitions (single source of truth)
        skills.ts        SKILLS[] + SKILL_BY_ID
        artifacts.ts     ARTIFACTS[] + ARTIFACT_BY_ID (honest claim boundaries live here)
        quests.ts        QUESTS[] + QUEST_BY_ID (the chain, gates, missions)
        easterEggs.ts    EASTER_EGGS[] + EGG_BY_ID
        world.ts         tuning constants + DNB_GATE + GATE_CHECKS
      state/
        types.ts         all shared types
        gameReducer.ts   reducer + pure selectors (hasSkill, isQuestUnlocked, isGateOpen, getProgress…)
        GameContext.tsx  useGameController() builds the shared value; useGame() consumes it
      i18n.ts            all UI chrome strings (NO/EN) + CONTACT details
      world/             react-three-fiber components (the 3D scene)
        placement.ts     derives artifact world positions from quests
        Scene.tsx        composes the world + PointerLockControls
        Player.tsx       first-person controller (movement, head-bob, interaction scan)
        Zone.tsx, ArtifactPickup.tsx, EasterEggs.tsx, DnbGate.tsx, Decor.tsx
      ui/                DOM overlay (HUD + modals + panels + screens)
        StartScreen, Hud, QuestModal, ArtifactModal, EggModal,
        QuestLog, SkillTree, GateLockedModal, Endgame, Fallback, LangToggle
      Game.tsx           orchestrator: state, canvas, keyboard, pointer-lock, overlay routing

### Why a "double provider"

React context does **not** cross the react-three-fiber `<Canvas>` renderer
boundary. So the same `GameContextValue` is provided twice: once around the DOM
UI tree, and again *inside* the `<Canvas>` around `<Scene>`. Both share the exact
same object from `useGameController()`, so DOM and 3D stay in lockstep.

### Why movement uses refs, not state

The first-person controller mutates `camera.position` every frame inside
`useFrame`. Per-frame React state would thrash. Movement, velocity, head-bob and
the proximity scan all run on refs; only the *result* of the proximity scan
(`activeTarget`) is pushed to React state, and only when the focused id changes.

## 5. Controls & flow

- **WASD / arrows** move, **mouse** looks (Pointer Lock), **Shift** sprints.
- **E** interacts with whatever the crosshair is near (zone / evidence / egg / gate).
- **Q** toggles the quest log, **K** toggles the skill tree.
- **Esc** releases the mouse / closes a modal. Click the "resume" layer to re-lock.

Phases: `start → playing → won`. A zone is **locked** until its required signature
skills are unlocked; completing earlier zones grants the skills that open later
ones. The final **DNB AI Tech Gate** opens only when all five signature skills are
held; interacting with the open gate triggers the endgame.

## 6. Decision missions

Two zones contain a small "do the responsible thing" choice that turns a real
working-method into gameplay:

- **Klar / Smart Import** — an AI parses messy input. Do you ship it raw, *review
  it as a human in the loop*, or delete the feature? Correct = human-in-the-loop.
- **Agentic workflow** — an agent proposes a huge unscoped change. Do you YOLO it,
  *hold scope and context discipline*, or ignore the agent? Correct = discipline.

A wrong pick is framed playfully ("scope creep", "overclaim") and can be retried;
the correct pick completes the zone and increments the "guardrails passed" stat.
This dramatizes the *honest engineering discipline* the positioning rules require.

## 7. Claim safety (non-negotiable)

All copy is kept inside what can actually be shown. Encoded directly in the data:

- Foundations & growth framing — **never** senior/distributed-systems mastery.
- **Klar** = robust prototype **evaluated with teachers** — never students, never
  enterprise/production scale, never user-outcome claims.
- Every artifact card carries an **honest boundary** line.
- No DNB logos or official branding; the gate is clearly a *symbolic* goal.
- The endgame states the package is *ready* and invites contact — it never implies
  the job is won or deserved.
- No private/medical framing anywhere.

External links used are public and verified (CS50x certificate, Klar live + repo,
PD app repos, companion repo, GitHub, LinkedIn). Contact details live once in
`i18n.ts` (`CONTACT`).

## 8. Accessibility & resilience

- A **WebGL probe** (`SkamlosPitchClient`) and a **`Fallback`** text version render
  the entire pitch (all zones, evidence with links, skills, contacts) with no
  WebGL and no pointer lock — reachable from the start screen too.
- Head-bob and UI animations respect `prefers-reduced-motion`.
- Fully bilingual (NO/EN) via the shared language store.

## 9. Validation status

- `npm run build` — passes (route prerendered, whole-program TypeScript clean).
- `npm run lint` — clean (see note below).
- Runtime QA (dev server, headless browser): canvas mounts, WebGL OK, **zero
  console/page errors**, start→play→HUD works, live objective tracker, quest log
  and skill-tree panels render, NO/EN toggle updates the live HUD, fallback text
  version renders all 7 zones + links. Pointer-lock gameplay (walking, E-interact,
  quest completion) cannot be driven in an automated headless browser because the
  browser declines pointer lock without a real user gesture — that path is
  verified by type-safe reducer logic and manual play.

### Lint note (R3F vs React Compiler rules)

`eslint-plugin-react-hooks` (v6, React-Compiler-aligned) flags the idiomatic R3F
pattern of mutating the camera (a `useThree` value) every frame. The exception is
**scoped to `app/skamlos-pitch/game/world/**`** in `eslint.config.mjs`
(`react-hooks/immutability: off`). One justified `react-hooks/set-state-in-effect`
disable sits on the post-mount WebGL probe. No global lint posture changed.

## 10. Extending the game

- **Add a zone:** append to `QUESTS` (set `requires`, `grantsSkills`,
  `grantsArtifacts`, `position`, optional `mission`/`gateHint`). The world,
  quest log, objective tracker and gate update automatically.
- **Add evidence:** append to `ARTIFACTS` (with an honest `boundary`) and reference
  its id in a quest's `grantsArtifacts`. `placement.ts` positions it in-world.
- **Add a skill:** append to `SKILLS` (with `group`/`glyph`); reference it in a
  quest's `grantsSkills` and, if it is a signature, in `DNB_GATE.requires`.

> Important: never name a file `layout.ts`/`layout.tsx` anywhere under `app/` —
> Next.js treats it as a reserved route segment file. The world placement module
> is `placement.ts` for exactly this reason.
