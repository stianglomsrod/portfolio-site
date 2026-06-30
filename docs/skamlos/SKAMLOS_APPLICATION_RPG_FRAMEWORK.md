# SKAMLOS — Application RPG Framework

> Status: Planning only. Generalized design for a **reusable, top-down "application RPG"**
> that can be re-skinned and re-storied for future job applications.
> The DNB / Skamløs Pitch game is the **first content pack**; the engine itself is
> company-agnostic.
> Companion docs: `SKAMLOS_2D_RPG_IMPLEMENTATION_BRIEF.md` (first slice),
> `SKAMLOS_2D_RPG_WORLD_MAP.md`, `SKAMLOS_2D_RPG_PROLOGUE_SLICE.md`.

---

## 1. Goal & guiding principle

Build the game so that **one engine renders many games**. Each application game is a
top-down RPG where a candidate's real journey becomes explorable places, conversations and
small actions that unlock honest skills and evidence, ending in a "package delivered" beat.

**Guiding principle:** _the engine knows nothing about DNB, Stian, or Skamløs._ Everything
specific lives in a **content pack**. To make a new application game you author a new pack
and swap theme assets — you do not edit the engine.

The litmus test during implementation: if you ever write `if (pack.id === "dnb-skamlos")`
in engine code, that branch belongs in pack **data** instead.

---

## 2. The two layers

```
┌─────────────────────────────────────────────────────────────┐
│ ENGINE  (app/skamlos-rpg/game/engine/)  — reusable, generic  │
│  • Phaser boot/config, scenes (boot, world, ui)              │
│  • movement, collision, camera, interaction                  │
│  • quest engine (requirements → grants → unlocks)            │
│  • gates/locks + readable locked feedback                    │
│  • save/load, language switch, minigame host                 │
│  • React<->Phaser bridge + generic HUD components            │
│  • renders ANY valid ContentPack                             │
└─────────────────────────────────────────────────────────────┘
                         ▲ consumes
                         │
┌─────────────────────────────────────────────────────────────┐
│ CONTENT PACK  (app/skamlos-rpg/game/content/<pack-id>/)      │
│  • meta (company, role, theme, start map)                    │
│  • maps, npcs, interactables                                 │
│  • quests, skills, artifacts, minigames                      │
│  • dialogue, endgame, claim policy                           │
│  • theme assets (tilesets, sprites, music) by key            │
└─────────────────────────────────────────────────────────────┘
```

### What is engine vs pack

| Concern                       | Engine (reusable)                  | Content pack (per company/role)  |
| ----------------------------- | ---------------------------------- | -------------------------------- |
| Game loop, rendering, physics | ✅                                 | —                                |
| Tilemap loading + collisions  | ✅ (generic loader)                | Tiled JSON + tileset keys        |
| Player movement / camera      | ✅                                 | spawn points                     |
| Interaction + prompts         | ✅                                 | which objects, prompt text       |
| Quest progression logic       | ✅ (requirements engine)           | the actual quests + gating       |
| Skills / artifacts model      | ✅ (types + UI)                    | the actual skills/artifacts      |
| Minigame _host_               | ✅                                 | minigame _content/config_        |
| Locked-door feedback          | ✅ (mechanic)                      | the lock text + requirement      |
| Endgame screen                | ✅ (renderer)                      | title, message, contact, actions |
| Claim safety mechanic         | ✅ (boundary rendering + dev lint) | the actual boundaries/denies     |
| Language switch               | ✅                                 | the `Loc` strings                |
| Theme (palette, art, music)   | ✅ (token consumer)                | the tokens + asset keys          |

---

## 3. Content-pack concept

A pack is **one typed object** plus its assets. It is the single source of truth for a game.

```ts
// app/skamlos-rpg/game/content/dnb-skamlos/pack.ts
import type { ContentPack } from "../../engine/types";
import { maps } from "./maps";
import { npcs } from "./npcs";
import { interactables } from "./interactables";
import { quests } from "./quests";
import { skills } from "./skills";
import { artifacts } from "./artifacts";
import { minigames } from "./minigames";
import { endgame } from "./endgame";
import { claims } from "./claims";
import { theme } from "./theme";

export const dnbSkamlosPack: ContentPack = {
  meta: {
    id: "dnb-skamlos",
    title: {
      no: "Skamløs Pitch: Kompetansebyen",
      en: "Shameless Pitch: Competence Town",
    },
    startMap: "classroom",
    startSpawn: "spawn-default",
    lang: { default: "no", available: ["no", "en"] },
    theme,
  },
  maps,
  npcs,
  interactables,
  quests,
  skills,
  artifacts,
  minigames,
  endgame,
  claims,
};
```

Pack selection is trivial and future-proof:

```ts
// app/skamlos-rpg/game/content/index.ts
export const PACKS = {
  "dnb-skamlos": dnbSkamlosPack /* , "next-company": nextPack */,
};
export type PackId = keyof typeof PACKS;
```

For the first slice the route hard-selects `"dnb-skamlos"`. Later, multiple packs can be
served by route param (e.g. `/apply/[pack]`) without engine changes.

### Authoring a new application game (future workflow)

1. `cp -r content/dnb-skamlos content/<new-pack>` and edit the data files.
2. Swap the 9 swappable axes (see §4).
3. Drop new theme assets under `public/skamlos-rpg/<new-pack>/` and point `theme` at them.
4. Register the pack in `content/index.ts`.
5. No engine edits.

---

## 4. The nine swappable axes (per the brief)

A new application game changes only these; the engine is constant:

1. **Target company / role** — `meta.title`, `meta.company`, `meta.role`, endgame copy.
2. **World locations** — `maps[]` (Tiled JSON) + spawns/exits.
3. **Quest chain** — `quests[]` (order, requirements, grants, unlocks, hints).
4. **Skills** — `skills[]` (+ skill logs).
5. **Artifacts** — `artifacts[]` (links, boundaries).
6. **NPCs** — `npcs[]` + `dialogue` trees.
7. **Dialogue** — `dialogue.ts` text.
8. **Final application screen** — `endgame` (title, message, contact, actions).
9. **Claim boundaries** — `claims` (deny list + per-item boundaries).
10. **Visual theme** — `theme` tokens + asset keys (palette, tileset, sprite, music).

---

## 5. Suggested schemas

These extend the subset in the implementation brief. Keep them in
`app/skamlos-rpg/game/engine/types.ts`. All player-facing strings are `Loc`/`LocList` so any
pack can be bilingual; a pack may leave `en` empty to ship single-language.

```ts
type Loc = { no: string; en?: string };
type LocList = { no: string[]; en?: string[] };
type Vec2 = { x: number; y: number };
type Dir = "up" | "down" | "left" | "right";

// --- Requirements: the heart of gating, reused everywhere ---
type Requirement =
  | { always: true }
  | { flag: string }
  | { allSkills: string[] }
  | { anySkills: string[] }
  | { allQuests: string[] }
  | { and: Requirement[] }
  | { or: Requirement[] }
  | { not: Requirement };

// --- Theme tokens ---
interface ThemeTokens {
  palette: { bg: string; accent: string; ink: string; lock: string };
  tilesetKeys: string[]; // preloaded by BootScene
  playerSpriteKey: string;
  musicKey?: string;
  uiAccent: string; // matches DOM HUD accent
}

// --- Maps & navigation ---
interface MapDef {
  id: string;
  kind: "interior" | "world";
  tilemapKey: string; // Tiled JSON (loaded from public/)
  tilesetKeys: string[];
  collisionLayer: string; // name of the Tiled layer with collision
  spawns: Record<string, Vec2>;
  exits: Exit[];
  npcs: string[];
  interactables: string[];
  music?: string;
  ambient?: Loc; // optional one-line mood text on enter
}

interface Exit {
  id: string;
  at: { x: number; y: number; w: number; h: number }; // trigger rect (tiles)
  to: { map: string; spawn: string };
  lock?: GateRef;
}

interface GateRef {
  id: string;
  requires: Requirement;
  lockedText: Loc; // readable feedback when blocked
  unlockedToast?: Loc; // optional toast when it opens
}

// --- Actors & objects ---
interface Npc {
  id: string;
  name: Loc;
  spriteKey: string;
  role:
    | "student"
    | "teacher"
    | "reference"
    | "receptionist"
    | "signpost"
    | "companion"
    | "other";
  position: Vec2;
  facing?: Dir;
  wander?: boolean;
  dialogue: string; // dialogue tree id
  showWhen?: Requirement; // appears only when met (e.g. Kari after master)
}

interface Interactable {
  id: string;
  kind: "pc" | "duck" | "egg" | "sign" | "prop" | "artifact-pickup" | "door";
  position: Vec2;
  prompt: Loc;
  action: InteractAction;
  showWhen?: Requirement;
}

type InteractAction =
  | { type: "dialogue"; tree: string }
  | { type: "startMinigame"; minigame: string }
  | { type: "inspect"; text: Loc }
  | { type: "startQuest"; quest: string }
  | { type: "completeQuest"; quest: string }
  | { type: "collectArtifact"; artifact: string }
  | { type: "endgame" };

// --- Progression ---
interface Quest {
  id: string;
  order: number;
  title: Loc;
  objective: Loc;
  intro?: Loc;
  requires: Requirement; // when the quest becomes available
  completeWhen?: Requirement; // optional auto-complete condition
  grantsSkills: string[];
  grantsArtifacts: string[];
  setsFlags?: string[];
  unlocks?: string[]; // gate ids / map ids opened on completion
  nextHint?: Loc; // direction only, never the whole metaphor
}

interface Skill {
  id: string;
  label: Loc;
  group: "foundation" | "design" | "fullstack" | "ai" | "craft";
  glyph: string;
  log: LocList; // skill-log detail (where the depth lives)
}

interface Artifact {
  id: string;
  title: Loc;
  description: Loc;
  kind: "cert" | "repo" | "live" | "video" | "concept";
  href?: string;
  linkLabel?: Loc;
  boundary?: Loc; // honest claim boundary, rendered on the card
}

// --- Minigames (host is engine, content is pack) ---
type MinigameDef =
  | { id: string; kind: "code-forloop"; title: Loc; config: ForLoopConfig }
  | { id: string; kind: "git-commit"; title: Loc; config: GitCommitConfig }
  | { id: string; kind: "choice"; title: Loc; config: ChoiceConfig };

interface ForLoopConfig {
  prompt: Loc; // task description
  starter: string; // starter code shown
  // a safe, sandboxed check — see §7 (no eval of arbitrary user code)
  expectedOutput: string[]; // what the loop should print
  hint: Loc; // the duck's hint
}

interface GitCommitConfig {
  prompt: Loc;
  files: string[]; // "changed" files shown
  steps: Array<"stage" | "message" | "commit">;
  goodMessageHints: Loc; // what makes a sensible message
}

interface ChoiceConfig {
  setup: Loc;
  prompt: Loc;
  options: Array<{
    id: string;
    label: Loc;
    correct: boolean;
    tag?: Loc;
    feedback: Loc;
  }>;
}

// --- Endgame ---
interface EndgameDef {
  title: Loc;
  message: Loc;
  show: Array<"quests" | "skills" | "artifacts" | "eggs">;
  contactSource: "reuse-dnb-contact" | ContactInfo; // reuse existing data when possible
  actions: Array<"replay" | "back-to-portfolio">;
}

interface ContactInfo {
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
}

// --- Claim safety as data ---
interface ClaimPolicy {
  deny: string[]; // forbidden claim categories (machine-checkable tags)
  boundaries: Record<string, Loc>; // id -> honest boundary string
  notes: LocList; // human guidance for pack authors
}

// --- Runtime state ---
interface SaveState {
  packId: string;
  flags: Record<string, boolean>;
  skills: string[];
  completedQuests: string[];
  artifacts: string[];
  foundEggs: string[];
  currentMap: string;
  player: Vec2;
  lang: "no" | "en";
}

interface ContentPack {
  meta: {
    id: string;
    title: Loc;
    company?: Loc;
    role?: Loc;
    startMap: string;
    startSpawn: string;
    lang: { default: "no" | "en"; available: ("no" | "en")[] };
    theme: ThemeTokens;
  };
  maps: MapDef[];
  npcs: Npc[];
  interactables: Interactable[];
  quests: Quest[];
  skills: Skill[];
  artifacts: Artifact[];
  minigames: MinigameDef[];
  endgame: EndgameDef;
  claims: ClaimPolicy;
}
```

### Why this shape (lessons carried from the 3D experiment)

The archived 3D branch (`feature/skamlos-pitch-game`) was already fully **data-driven**
(`quests.ts`, `skills.ts`, `artifacts.ts`, `easterEggs.ts`, a `useReducer` store, bilingual
`Loc` strings, and per-artifact honest boundaries). That data model worked well; the pivot
keeps it and generalizes it into a pack. The main changes for 2D:

- `position` becomes 2D tile coordinates per map (was 3D `[x, z]`).
- Add `MapDef`/`Exit`/`GateRef` for an explicit multi-room top-down world (the 3D version
  was a single open zone field).
- Promote everything pack-specific out of the engine into `content/<pack>/`.
- Generalize "missions" into a typed `MinigameDef` union so new minigame kinds are additive.

---

## 6. How claim boundaries are represented

Claim safety is a **first-class data concern**, mirroring the portfolio's
`DNB_CLAIM_SOURCE_MAP.md` discipline inside the game:

1. **Per-artifact / per-skill boundary strings.** Every `Artifact.boundary` (and skill-log
   framing) states the honest limit, rendered on the card the player sees (e.g. "Foundational
   læring, ikke en CS-grad", "Klar er en robust prototype evaluert med lærere — ikke testet
   med elever, ikke enterprise-skala").
2. **A pack-level `claims.deny` list** of forbidden claim categories as machine-checkable
   tags, e.g.:
   - `senior-distributed-systems`
   - `enterprise-scale-production`
   - `student-outcome-effect`
   - `pure-ux-only` / `prompt-user-only`
   - `official-dnb-affiliation`
   - `private-medical`
   - `pii` (national ID, participant/school names)
3. **A dev-only "claim lint"** (engine utility, optional but recommended): scans pack text
   for denied phrases/patterns and fails loudly in development. This turns the QA checklist
   into an automated guardrail and is itself on-brand evidence of claim discipline.
4. **Endgame honesty:** the endgame renderer must use the pack's `message` verbatim and must
   never assert the job is won — only that a package is _ready/delivered_.

This makes "honest positioning" a reusable engine feature, not a per-game manual review.

---

## 7. Minigame host design (safe & extensible)

- The engine provides a **minigame host** (`MinigameModal` + a small registry mapping
  `kind → React component`). Packs only supply `MinigameDef.config`.
- **Security:** never `eval()` arbitrary player code. The `code-forloop` minigame should use
  a constrained interaction (fill-in-the-blank / pick-the-correct-loop / a tiny whitelisted
  interpreter checking expected output), not a live JS evaluator on user input. This avoids
  an injection foot-gun and keeps the bundle small.
- New minigame kinds are additive: add a `kind` to the `MinigameDef` union + a component in
  the registry. Existing packs are unaffected.

---

## 8. React ↔ Phaser bridge (engine)

- Source of truth for gameplay state is the engine store (a small React context/reducer)
  plus Phaser's data registry for in-canvas needs. Keep **one** authoritative store; mirror
  into Phaser's registry as needed.
- Communication is event-based: Phaser emits semantic events (`interact:pc`,
  `exit:blocked`, `quest:complete`) that the React layer listens to; React commands
  (`start`, `loadMap`, `grant`) are dispatched into the engine which tells Phaser what to do.
- Avoid per-frame React state (the 3D branch lesson): only push to React when a _discrete_
  thing changes (active target id, quest state, overlay open). Continuous motion stays in
  Phaser.

---

## 9. Routing options for multiple packs (future)

- **v1 (now):** single route `/skamlos-rpg`, pack hard-selected.
- **Later:** `/apply/[pack]` dynamic route; `generateStaticParams` over `PACKS`; each pack
  `noindex` unless a specific one should be shareable. The engine and HUD are identical
  across packs; only the selected `ContentPack` differs.

---

## 10. Non-goals for the framework (avoid over-engineering)

- Do **not** build a pack editor UI, a visual quest editor, or a plugin system now.
- Do **not** abstract for hypothetical non-RPG genres.
- Do **not** add multiplayer, accounts, or a backend — these games are static, client-only,
  deep-link pitches.
- Build exactly enough generality to support the nine swap axes; prove it with the one DNB
  pack first.
