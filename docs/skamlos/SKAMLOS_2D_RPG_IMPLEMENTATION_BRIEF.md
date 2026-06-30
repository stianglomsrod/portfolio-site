# SKAMLOS 2D RPG — Implementation Brief (Prologue Slice v1)

> Status: Planning only. No game code exists yet on this branch.
> Branch: `feature/skamlos-2d-rpg-planning`.
> Companion docs: `SKAMLOS_APPLICATION_RPG_FRAMEWORK.md`, `SKAMLOS_2D_RPG_WORLD_MAP.md`,
> `SKAMLOS_2D_RPG_PROLOGUE_SLICE.md`, `SKAMLOS_IMPLEMENTATION_LOG.md`.
> Source of creative truth: `SKAMLOS_2D_RPG_GAME_DESIGN_BRIEF.md`.

This brief tells a fresh, high-capability agent exactly what the **first playable slice**
of the top-down 2D RPG should be, what stack to use, where code goes, the data model, the
acceptance criteria, and what must NOT be built yet. It is written so the implementation
prompt that follows can be short and the implementer needs no chat history.

---

## 0. One-paragraph summary

Build a small top-down RPG (Pokémon/Zelda-readable, not abstract) where the player starts
in a classroom on the last lesson of the day, a bell rings, walks home through a small
readable town, sits at a PC, completes a tiny "Ordkryss" coding minigame (one JavaScript
for-loop challenge + one git commit challenge), and is rewarded with the skill
**Grunnleggende programmering** plus two artifacts (CS50x certificate and the Ordkryss
YouTube demo). The DNB building is visible early but clearly locked. The slice ends by
pointing the player toward OsloMet — but the OsloMet/Workshop chain is **not** implemented.
The engine must be built as a **reusable application-RPG framework** with the DNB/Skamløs
story as the first swappable **content pack** (see the framework doc).

---

## 1. Recommended tech stack

### 1.1 Decision: Phaser 3 (primary recommendation)

Use **Phaser 3** (`phaser`, current v3.x, MIT) as the game engine, embedded as a
client-only island inside the existing Next.js 16 app. React stays the thin shell/HUD;
Phaser owns the game loop, tiles, collisions, camera and sprites.

**Why Phaser fits this specific game**

- This is a _real_ top-down RPG: tile maps, per-tile collision, a camera that follows the
  player, sprite animation, keyboard input, multiple scenes (classroom → town → home),
  and persistent gameplay state. Phaser provides all of this out of the box
  (`TilemapLayer`, Arcade Physics, `cameras.main.startFollow`, `Scene` manager, input
  manager, tween/timeline, data registry).
- The previous **3D first-person** experiment (archived branch `feature/skamlos-pitch-game`,
  route `/skamlos-pitch`) proved a game was buildable but had two problems this pivot fixes:
  readability (first-person 3D is disorienting for a "competence town"), and testability
  (pointer-lock gameplay can't be driven in a headless browser — verified in that branch's
  report). A top-down keyboard-driven 2D world is both more _readable_ and more _testable_.
- Building the same thing in **React + Canvas / custom loop** means hand-rolling a tilemap
  renderer, collision system, camera, and sprite animation. The 3D branch already showed
  that per-frame mutation fights React's render model and forces ref-based escape hatches
  and scoped lint exceptions. A dedicated engine removes that whole class of friction.

**Alternatives considered (and why not, for now)**

| Option                       | Verdict          | Reason                                                                                                    |
| ---------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------- |
| React + Canvas / custom loop | Rejected for v1  | Reinvents tilemap/collision/camera; per-frame React friction (seen on 3D branch).                         |
| Pixi.js                      | Rejected         | Excellent renderer, but only a renderer — still need to add collision, tilemap logic, camera, scene mgmt. |
| Excalibur.js                 | Viable runner-up | TypeScript-native, batteries-included. Keep as the fallback if Phaser DX disappoints.                     |
| Kaplay/Kaboom                | Rejected for v1  | Lighter and fun, but less battle-tested for a portfolio centerpiece and Tiled pipelines.                  |
| three.js / R3F (3D)          | Explicitly out   | This is the pivot _away_ from 3D.                                                                         |

> Net recommendation: **Phaser 3 primary, Excalibur.js as the documented fallback.**

### 1.2 Dependency policy (requires explicit approval)

Per `AGENTS.md`, dependencies need explicit justification and approval. The implementation
pass should add **exactly one** runtime dependency:

- `phaser` (the engine).

No other runtime deps. Specifically **do not** add: a state-management library (use
Phaser's data registry + a tiny React store/context), a tilemap-editor runtime (author maps
offline in **Tiled**, export JSON, load as static assets), an ECS library, or an audio
library (Phaser has audio). This keeps the bundle lean and avoids dependency sprawl.

> ACTION FOR USER/TECH LEAD: approve adding `phaser` before the implementation pass. The
> first slice cannot be built without it. If approval is withheld, fall back to Excalibur.js
> (still one dependency) or, as a last resort, a minimal custom canvas loop (zero deps, much
> more engine code).

### 1.3 Next.js 16 integration (carry forward the verified pattern)

Phaser touches `window`/`canvas`, so it must run **client-only**. The archived 3D branch
already validated the correct Next 16 loading contract in _this_ repo; reuse it:

1. `ssr: false` dynamic imports are **illegal inside a Server Component** under Next 16.
   The dynamic import must live in a Client Component.
2. The route is therefore split into three layers (server shell → client probe → game):

```
app/skamlos-rpg/page.tsx              Server Component. Exports metadata
                                      { robots: { index: false } }. Renders the client probe.
app/skamlos-rpg/SkamlosRpgClient.tsx  'use client'. Capability check (canvas/WebGL),
                                      then dynamic import of GameMount with { ssr: false }.
app/skamlos-rpg/game/GameMount.tsx    'use client'. Creates the Phaser.Game in useEffect,
                                      mounts into a <div ref>, destroys on unmount.
```

3. `page.tsx` sets `robots: { index: false }` — this is a deep-link playable pitch, not an
   indexable marketing page (same posture as the 3D route).
4. Before writing code, the implementer must read the local Next guides in
   `node_modules/next/dist/docs/` (per `AGENTS.md`) to confirm the current dynamic-import,
   metadata and client-component APIs — they may differ from training data.

### 1.4 Keeping the engine OUT of the DNB portfolio page

Hard rule: **the DNB portfolio page must not bundle Phaser.**

- The existing portfolio page (`app/components/Portfolio.tsx`) currently embeds the
  DOM/CSS world `SkamlosWorld`. Leave that untouched for this slice.
- The new RPG lives only at the `/skamlos-rpg` route subtree. Because `phaser` is imported
  only inside `GameMount` (dynamically, client-only), Next code-splits it into the route
  chunk; it never enters the main portfolio bundle.
- The portfolio page integrates with the game by **link only** (a card/button to
  `/skamlos-rpg`). Wiring that link is optional for the first slice and can be deferred.

### 1.5 Reusability hook

All game logic must read from a **content pack** object (see
`SKAMLOS_APPLICATION_RPG_FRAMEWORK.md`). The engine (`app/skamlos-rpg/game/engine/`) is
company-agnostic; the DNB/Skamløs story is a single pack
(`app/skamlos-rpg/game/content/dnb-skamlos/`). A future application game = a new pack +
new theme assets, with no engine changes.

---

## 2. Route, file structure & where code goes

```
app/skamlos-rpg/
  page.tsx                         server shell, metadata noindex
  SkamlosRpgClient.tsx             'use client' capability probe + dynamic import
  skamlos-rpg.module.css           HUD/overlay styling (DOM layer only)
  game/
    GameMount.tsx                  'use client' — boots Phaser.Game, React<->Phaser bridge
    engine/                        === REUSABLE FRAMEWORK (company-agnostic) ===
      config.ts                    Phaser.Game config factory (scale, physics, scenes)
      types.ts                     ContentPack + all schema types (see framework doc)
      bridge.ts                    Phaser registry/events <-> React HUD events
      save.ts                      localStorage load/save of SaveState (namespaced per pack)
      scenes/
        BootScene.ts               preload tilesets/sprites/audio for the active pack
        WorldScene.ts              generic top-down scene: renders a MapDef, handles
                                   movement, collisions, exits, NPC + interactable triggers
        UIScene.ts                 (optional) in-canvas prompts; most UI is React DOM
      systems/
        movement.ts                grid/arcade movement + facing
        interaction.ts             proximity + "press E/Space" target resolution
        questEngine.ts             requirement checks, grant skills/artifacts, gate unlocks
        gates.ts                   lock evaluation + readable locked feedback
    content/                       === SWAPPABLE CONTENT PACKS ===
      dnb-skamlos/                 the first content pack (this game)
        pack.ts                    assembles & exports the ContentPack
        maps.ts                    classroom, town, home (Tiled JSON keys + spawns/exits)
        npcs.ts                    students, signpost (prologue needs very few)
        interactables.ts           PC, rubber duck, signs, DNB locked door, egg (later)
        quests.ts                  prologue quests (siste time, hjem til Ordkryss)
        skills.ts                  Grunnleggende programmering (+ skill log)
        artifacts.ts               CS50x cert, Ordkryss video
        minigames.ts               for-loop + git-commit minigame configs
        dialogue.ts                short NPC/duck/sign lines (claim-safe)
        endgame.ts                 endgame definition (data only; screen deferred)
        claims.ts                  claim policy / honest boundaries for this pack
    ui/                            React DOM overlay (renders above the canvas)
      Hud.tsx                      objective tracker, skill/artifact counters
      DialogueBox.tsx              bottom dialogue box (NPC, duck, signs, locked doors)
      QuestLog.tsx                 list of quests + status
      SkillLog.tsx                 skills + their detail log
      MinigameModal.tsx            hosts the for-loop and git-commit minigames
      StartScreen.tsx              title, controls, play, back-to-portfolio
public/skamlos-rpg/                static assets (tilesets, sprite sheets, Tiled JSON, audio)
  tiles/ sprites/ maps/ audio/
```

> Asset location: prefer `public/skamlos-rpg/` for Tiled JSON, tilesets and sprite sheets so
> Phaser loads them by URL. Keep all art **original or properly licensed** (CC0/CC-BY with
> attribution). No Pokémon/Zelda/Nintendo assets — inspiration only.

---

## 3. Data model (engine-level, used by the prologue pack)

Full schemas live in `SKAMLOS_APPLICATION_RPG_FRAMEWORK.md`. The prologue slice only needs
this subset. Types are bilingual-capable (`Loc`) but the prologue ships **Norwegian-first**;
English is optional and may be left empty for v1.

```ts
type Loc = { no: string; en?: string };
type LocList = { no: string[]; en?: string[] };
type Vec2 = { x: number; y: number }; // tile coordinates unless noted
type Dir = "up" | "down" | "left" | "right";

type Requirement =
  | { allSkills: string[] }
  | { allQuests: string[] }
  | { flag: string }
  | { and: Requirement[] }
  | { or: Requirement[] }
  | { always: true };

interface ContentPack {
  meta: PackMeta;
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

interface PackMeta {
  id: string; // "dnb-skamlos"
  title: Loc; // "Skamløs Pitch: Kompetansebyen"
  startMap: string; // "classroom"
  startSpawn: string; // "spawn-default"
  lang: { default: "no" | "en"; available: ("no" | "en")[] };
  theme: ThemeTokens; // palette + tileset/sprite keys + music key
}

interface MapDef {
  id: string; // "classroom" | "town" | "home"
  kind: "interior" | "world";
  tilemapKey: string; // Tiled JSON key
  tilesetKeys: string[];
  spawns: Record<string, Vec2>;
  exits: Exit[];
  npcs: string[]; // npc ids on this map
  interactables: string[]; // interactable ids on this map
}

interface Exit {
  id: string;
  at: { x: number; y: number; w: number; h: number }; // trigger rect, tiles
  to: { map: string; spawn: string };
  lock?: GateRef; // if present and unmet => blocked with readable text
}

interface GateRef {
  id: string; // "dnb-reception"
  requires: Requirement;
  lockedText: Loc; // shown when blocked, e.g. DNB reception line
}

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
    | "companion";
  position: Vec2;
  facing?: Dir;
  wander?: boolean;
  dialogue: string; // dialogue tree id (in dialogue.ts)
}

interface Interactable {
  id: string;
  kind: "pc" | "duck" | "egg" | "sign" | "prop" | "artifact-pickup";
  position: Vec2;
  prompt: Loc; // "Undersøk PC-en"
  action: InteractAction;
}

type InteractAction =
  | { type: "dialogue"; tree: string }
  | { type: "startMinigame"; minigame: string }
  | { type: "inspect"; text: Loc } // e.g. the egg easter egg
  | { type: "startQuest"; quest: string }
  | { type: "completeQuest"; quest: string };

interface Quest {
  id: string;
  order: number;
  title: Loc;
  objective: Loc; // one-line HUD text
  intro?: Loc;
  requires: Requirement;
  grantsSkills: string[];
  grantsArtifacts: string[];
  unlocks?: string[]; // gate ids / map ids opened on completion
  nextHint?: Loc; // signpost-style "where to go next" (NOT the metaphor)
}

interface Skill {
  id: string; // "grunnleggende-programmering"
  label: Loc; // "Grunnleggende programmering"
  group: "foundation" | "design" | "fullstack" | "ai" | "craft";
  glyph: string; // emoji/icon key
  log: LocList; // the skill-log detail lines
}

interface Artifact {
  id: string;
  title: Loc;
  description: Loc;
  kind: "cert" | "repo" | "live" | "video" | "concept";
  href?: string; // external link (public, verified)
  linkLabel?: Loc;
  boundary?: Loc; // honest claim boundary line
}

interface MinigameDef {
  id: string;
  kind: "code-forloop" | "git-commit" | "choice";
  title: Loc;
  config: unknown; // narrowed per kind (see prologue slice doc)
}

interface EndgameDef {
  title: Loc; // "Søknadspakke levert"
  message: Loc; // the emotional-core text (see design brief §10)
  show: Array<"quests" | "skills" | "artifacts" | "eggs">;
  contactSource: "reuse-dnb-contact"; // reuse existing contact data, do not invent
  actions: Array<"replay" | "back-to-portfolio">;
}

interface ClaimPolicy {
  deny: string[]; // forbidden claim categories (see §6)
  boundaries: Record<string, Loc>; // id -> honest boundary
  notes: LocList;
}

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
```

### 3.1 Prologue pack content (concrete values)

- **Skill** — `grunnleggende-programmering`, label **"Grunnleggende programmering"**,
  group `foundation`. Skill-log lines (per the design direction): C, Python, SQL, Flask,
  Django, JavaScript, HTML/CSS, web fundamentals, git basics.
  - CLAIM NOTE (must be honored): CS50x itself covered C, Python, SQL, **Flask**, JS and
    HTML/CSS. **Django** comes from the later predecessor prototype, not CS50x. If both
    appear under one skill log, frame it as "grunnmuren spenner over disse teknologiene på
    tvers av CS50x og tidlige prosjekter" — never "CS50x lærte meg Django." Keep the
    foundation framing: not a CS degree, not expert level.
- **Artifact** — `cs50x-cert`: title "CS50x-sertifikat", kind `cert`, boundary "Foundational
  læring, ikke en CS-grad eller ekspertnivå." (`href` = the public CS50x certificate URL;
  reuse the link already used on the DNB site if present, otherwise leave as a TODO for the
  user to supply — do not invent a certificate URL).
- **Artifact** — `ordkryss-video`: title "Ordkryss – demo", kind `video`,
  `href: "https://youtu.be/tI5fU1aAAvI"`, linkLabel "Se demoen".
- **Spelling guard:** the project is **"Ordkryss"** (crossword). Never "Ordryss". Add a
  test/lint note so the typo can't slip in.
- **Endgame** message (data only this slice; screen deferred): the design brief §10 text
  beginning "Jeg søker ikke fordi jeg tror jeg er ferdig utlært…".
- **Contact** (endgame, deferred screen): reuse existing canonical values from
  `app/components/DnbContact.tsx` / `app/data/portfolio.ts` (email `stianglomsrod@gmail.com`,
  LinkedIn, GitHub `https://github.com/stianglomsrod`) plus phone **94186688**. Do NOT
  hardcode a second copy — import or reference the existing source.

---

## 4. Controls, camera & feel

- Movement: **WASD + arrow keys**; 4-direction facing; arcade-physics collision against a
  Tiled collision layer. No diagonal-only traps.
- Interaction: **E or Space** acts on the nearest interactable/NPC/exit in front of the
  player; a small on-screen prompt appears when something is interactable.
- Camera: `cameras.main.startFollow(player)` with `setBounds` to the map; deadzone for calm
  movement.
- Readability rules (from the design brief): no invisible walls. Every blocked edge is a
  visible fence/hedge/building/water. Locked doors are visibly doors and produce a dialogue
  line, never silent failure.
- Respect `prefers-reduced-motion` for non-essential tweens (camera shake, idle bobs).
- Pause/close overlays with **Esc**. Quest log and skill log are toggle keys (e.g. **Q** /
  **K**) and/or HUD buttons.

---

## 5. Acceptance criteria (Prologue Slice v1)

The slice is "done" when ALL of the following hold (manually verifiable in `npm run dev`):

1. Route `/skamlos-rpg` loads, is `noindex`, and does not pull Phaser into the main
   portfolio bundle.
2. A start screen shows title, controls, a Play button, and a "Tilbake til portefølje" link.
3. Play begins **inside the classroom** with the player controllable (WASD/arrows) and
   colliding correctly with walls/furniture (no invisible walls; all barriers are visible).
4. A "siste time" mood line shows; **a bell rings** (audio or clear visual+text) and **Quest 1
   completes / Quest 2 starts**: objective "Gå hjem og fullfør Ordkryss".
5. The player can **walk out of the classroom** into the **town worldmap** and navigate to
   **Stian's home**. The town is readable (grusveier, trær, busker, skilt, bygninger).
6. The **DNB building is visible** in town and **clearly locked**: interacting with its door
   shows a readable line (e.g. "Resepsjonen tar bare imot komplette søknadspakker.") — never
   a silent wall.
7. Inside the home there is a **desk, a PC with two monitors, and a rubber duck**. The duck
   gives one short, dry hint. Interacting with the **PC** opens the minigame.
8. The **Ordkryss minigame** runs two challenges in sequence:
   - one simple **JavaScript for-loop** challenge (correct answer accepted, wrong answer gives
     a gentle retry),
   - one **git commit** challenge (compose/confirm a sensible commit step).
9. On completion the player is **rewarded**: skill **Grunnleggende programmering** (with its
   skill log viewable) + artifacts **CS50x-sertifikat** and **Ordkryss-video**
   (`https://youtu.be/tI5fU1aAAvI`). Reward is visible via a toast and in the quest/skill log.
10. The slice then **points toward OsloMet** (a signpost line or quest `nextHint`) but the
    OsloMet/Workshop chain is **not** playable.
11. Optional but recommended: progress persists via `localStorage` (`SaveState`), and a
    "Spill på nytt" reset exists.
12. `npm run build` and `npm run lint` pass; `master`/VG X and the DNB portfolio page are
    untouched; `FILE_TREE.md` updated.

---

## 6. Claim safety (non-negotiable, encoded in `claims.ts`)

Carry the DNB claim discipline into the game text exactly as the portfolio enforces it:

- Foundations-and-growth framing only. **Never** senior/distributed-systems or platform
  mastery. (The job posting marks distributed-systems depth as a senior/staff plus; keep it
  as growth direction.)
- **Grunnleggende programmering** = honest foundation, not a CS degree, not expert level.
- Every artifact carries an honest **boundary** line.
- No DNB logos, palette, or official branding; the DNB building is a clearly **symbolic** goal.
- The egg easter egg gets only: "Du prøver å lese teksten, men den er altfor liten." No more.
- Signpost/NPC text gives **direction**, not the whole metaphor.
- No private/medical/psychological framing. No student-outcome claims. No PII (no national
  ID, no participant/school names) anywhere in pack data.
- External links must be public and verified; do not invent URLs (CS50x cert URL is a TODO
  for the user if not already on the site).

---

## 7. What NOT to build yet (deferred)

Explicitly out of scope for the first slice:

- OsloMet interior + Workshop / Participatory Design chain (Quests 3–5).
- Master / Design Science chain and the Klar/Smart Import build (Quests 6–8).
- Graduation scene (Quest 9), Kari dialogue chain, phone-from-Kari beat (Quest 10).
- Portfolio metaquest (Quest 11) and the full DNB delivery + endgame screen (Quest 12).
- Nikkos hus / Flutterfly companion sidequest and its skills/artifacts.
- The school's **workshop entrance** interior (second entrance) — door may exist but stays
  locked with readable feedback.
- Smart Import and Agentic-workflow decision minigames.
- English translations (types are bilingual-ready; NO-first is fine for v1).
- Audio/music polish beyond a basic bell, mobile/touch controls, save-slot UI, achievements.

Build the engine general enough that the deferred content is "add a pack entry," not "rework
the engine" — but do not pre-build the deferred content.

---

## 8. Implementation order (suggested for the future code pass)

1. Approve `phaser`. Scaffold the 3-layer route (`page` → client probe → `GameMount`).
2. Engine skeleton: `config.ts`, `types.ts`, `WorldScene` that renders one Tiled map with
   collisions + player movement + camera follow.
3. Bridge + minimal React HUD (objective tracker, dialogue box).
4. Author 3 Tiled maps (classroom, town, home) with collision + exit/trigger object layers.
5. Quest engine + gates; wire Quest 1 (bell) and Quest 2 (go home).
6. Interactables: duck hint, PC → `MinigameModal`.
7. Two minigames (for-loop, git commit) + reward grant (skill + 2 artifacts) + toasts.
8. Locked DNB door feedback; OsloMet `nextHint`.
9. Save/load; start screen; reduced-motion; build + lint + manual QA; update `FILE_TREE.md`
   and `SKAMLOS_IMPLEMENTATION_LOG.md`.

---

## 9. Risks & notes for the implementer

- **Next 16 specifics change** — read `node_modules/next/dist/docs/` first; confirm the
  dynamic-import / metadata / client-component APIs before coding.
- **Phaser + React lifecycle** — create the `Phaser.Game` in a `useEffect` and `game.destroy(true)`
  on cleanup to survive React Strict Mode double-invoke in dev; guard against double-mount.
- **Asset licensing** — only original/CC0/CC-BY assets; document attributions.
- **Keep the engine pack-agnostic** — if you find yourself writing `if (pack === "dnb")`,
  move that into pack data instead.
- **Do not touch** `master`, the VG X variant, `app/data/portfolio.ts`, or the existing
  `SkamlosWorld` DOM world for this slice.
