// === REUSABLE ENGINE — type schema for any "application RPG" content pack ===
// The engine knows nothing about DNB, Stian or Skamløs. Everything specific to a
// game lives in a ContentPack (see game/content/<pack-id>/). If you ever feel the
// urge to write `if (pack.id === "dnb-skamlos")` in engine code, the branch belongs
// in pack DATA instead.

export type Lang = "no" | "en";
export type Loc = { no: string; en?: string };
export type LocList = { no: string[]; en?: string[] };
export type Vec2 = { x: number; y: number };
export type Dir = "up" | "down" | "left" | "right";

/** Gating primitive reused everywhere (exits, NPC visibility, quests). */
export type Requirement =
  | { always: true }
  | { flag: string }
  | { allSkills: string[] }
  | { anySkills: string[] }
  | { allQuests: string[] }
  | { and: Requirement[] }
  | { or: Requirement[] }
  | { not: Requirement };

export interface ThemeTokens {
  /** Canvas background shown outside the tiled area. */
  bg: string;
  accent: string;
  ink: string;
  lock: string;
  /** DOM HUD accent — mirrors the in-canvas accent. */
  uiAccent: string;
  playerSpriteKey: string;
}

/** A tile or prop the maps can reference by a single legend character. */
export interface TileSpec {
  /** Texture key (file name without extension) under public/skamlos-rpg/. */
  asset: string;
  /** Blocks movement. Solid tiles ALWAYS carry a visible texture → no invisible walls. */
  solid?: boolean;
  /** Prop taller than one tile: drawn anchored at its bottom and depth-sorted by y. */
  tall?: boolean;
  /** Animation key (for animated ground tiles like water). */
  anim?: string;
  /** Optional render width/height override in px (defaults to the texture size). */
  w?: number;
  h?: number;
}

export interface MapLabel {
  text: Loc | string;
  /** Tile coordinates of the label centre. */
  x: number;
  y: number;
  small?: boolean;
}

/**
 * A building drawn as one facade sprite whose footprint is marked solid except the
 * door tile. ONE definition drives both rendering and collision, so the barrier the
 * player sees is exactly the barrier they feel.
 */
export interface BuildingPlacement {
  id: string;
  textureKey: string;
  /** Top-left tile of the footprint. */
  x: number;
  y: number;
  wTiles: number;
  hTiles: number;
  /** Walkable entrance tile (absolute tile coords). Omitted = no entrance. */
  door?: Vec2;
  label?: Loc | string;
}

export interface GateRef {
  id: string;
  requires: Requirement;
  /** Readable feedback shown when the gate is blocked. Never a silent wall. */
  lockedText: Loc;
  unlockedToast?: Loc;
}

export interface Exit {
  id: string;
  /** Trigger rectangle in tile units. */
  at: { x: number; y: number; w: number; h: number };
  to: { map: string; spawn: string };
  /** Object name shown in the bottom box CTA, e.g. "Døra". */
  name?: Loc;
  /** Prompt verb shown on the door (e.g. "Gå inn" / "Gå ut"). Doors require a key press. */
  prompt?: Loc;
  /** When present and unmet, the exit is blocked and shows lockedText. */
  lock?: GateRef;
}

/** Data-driven map: char-grid layers + object placements (no Tiled needed). */
export interface MapDef {
  id: string;
  kind: "interior" | "world";
  tileSize: number;
  width: number;
  height: number;
  bg: string;
  /** Legend: single char → tile id (resolved against pack.tiles). */
  legend: Record<string, string>;
  /** Ground layer rows (every cell painted). */
  ground: string[];
  /** Optional overlay layer (props); space = nothing. */
  decor?: string[];
  buildings?: BuildingPlacement[];
  /** Non-interactive decorative sprites (e.g. a fluttering insect), optionally animated. */
  decoSprites?: Array<{
    key: string;
    anim?: string;
    x: number;
    y: number;
    tall?: boolean;
  }>;
  spawns: Record<string, Vec2>;
  exits: Exit[];
  npcs: string[];
  interactables: string[];
  labels?: MapLabel[];
  ambient?: Loc;
  /**
   * Generic timed cue fired once when the map becomes active (used by the
   * classroom for the school bell). Engine-generic: any pack can complete a
   * quest, chime and show a line after a delay or on first exit approach.
   */
  cue?: {
    delayMs: number;
    whenActiveQuest?: string;
    completeQuest?: string;
    bell?: boolean;
    line?: Loc;
  };
}

export type NpcRole =
  | "student"
  | "teacher"
  | "reference"
  | "receptionist"
  | "signpost"
  | "companion"
  | "other";

export interface Npc {
  id: string;
  name: Loc;
  spriteKey: string;
  /** Portrait sheet key (2-frame talk) shown in the dialogue box. */
  portrait?: string;
  role: NpcRole;
  position: Vec2;
  facing?: Dir;
  dialogue: string; // dialogue tree id
  showWhen?: Requirement;
}

export type InteractAction =
  | { type: "dialogue"; tree: string }
  | { type: "startMinigame"; minigame: string }
  | { type: "inspect"; text: Loc }
  | { type: "startQuest"; quest: string }
  | { type: "completeQuest"; quest: string }
  | { type: "endgame"; quest?: string }
  | { type: "signpost" };

export type InteractKind =
  | "pc"
  | "duck"
  | "egg"
  | "sign"
  | "prop"
  | "artifact-pickup"
  | "door";

export interface Interactable {
  id: string;
  kind: InteractKind;
  /** Texture key drawn on the map, or null for an invisible anchor over a building. */
  spriteKey?: string;
  tall?: boolean;
  position: Vec2;
  /** Optional object name shown in the bottom-box CTA; `prompt` is the action verb. */
  name?: Loc;
  prompt: Loc;
  action: InteractAction;
  showWhen?: Requirement;
  /** Ambient prop that idly wanders the room (e.g. the rubber duck). */
  wander?: boolean;
}

/** WoW-style guidance: where to go for the active quest, on a given map. */
export interface QuestGuide {
  map: string;
  /** Resolve a target by id (interactable / npc / building / exit). */
  target?: string;
  /** Or a raw tile position. */
  at?: Vec2;
  /** "go"/"start" → exclamation marker, "deliver" → question marker. */
  kind: "go" | "start" | "deliver";
}

export interface Quest {
  id: string;
  order: number;
  title: Loc;
  objective: Loc;
  intro?: Loc;
  requires: Requirement;
  grantsSkills: string[];
  grantsArtifacts: string[];
  setsFlags?: string[];
  unlocks?: string[];
  /** Direction-only hint for the next step (never the whole metaphor). */
  nextHint?: Loc;
  /** On-map guidance markers + edge arrow targets. */
  guides?: QuestGuide[];
}

export type SkillGroup = "foundation" | "design" | "fullstack" | "ai" | "craft";

export interface Skill {
  id: string;
  label: Loc;
  group: SkillGroup;
  glyph: string;
  /** Where the depth lives: the technologies/competences behind the skill. */
  log: LocList;
}

export type ArtifactKind = "cert" | "repo" | "live" | "video" | "concept";

export interface Artifact {
  id: string;
  title: Loc;
  description: Loc;
  kind: ArtifactKind;
  href?: string;
  linkLabel?: Loc;
  /** Honest claim boundary rendered on the card. */
  boundary?: Loc;
}

export interface BlankSpec {
  id: string;
  options: string[];
  correct: string;
}

export interface ForLoopConfig {
  prompt: Loc;
  /** Code lines; `___` marks a blank, indexed in order against `blanks`. */
  templateLines: string[];
  blanks: BlankSpec[];
  expected: string[];
  successText: Loc;
  hint: Loc;
}

export interface CommitMessageOption {
  id: string;
  text: string;
  good: boolean;
  nudge?: Loc;
}

export interface GitCommitConfig {
  setup: Loc;
  files: string[];
  stageLabel: Loc;
  messagePrompt: Loc;
  messageOptions: CommitMessageOption[];
  commitLabel: Loc;
  successText: Loc;
}

export interface ChoiceConfig {
  setup: Loc;
  prompt: Loc;
  options: Array<{ id: string; label: Loc; correct: boolean; feedback: Loc }>;
  /** Optional explanatory screen shown after the correct answer (why/what next). */
  outro?: Loc;
}

interface MinigameBase {
  id: string;
  title: Loc;
  intro: Loc;
  /** Chain to another minigame on completion (e.g. for-loop → git-commit). */
  next?: string;
  /** Quest completed when the player finishes this minigame (last in a chain). */
  completesQuest?: string;
  setsFlags?: string[];
}

export type MinigameDef =
  | (MinigameBase & { kind: "code-forloop"; config: ForLoopConfig })
  | (MinigameBase & { kind: "git-commit"; config: GitCommitConfig })
  | (MinigameBase & { kind: "choice"; config: ChoiceConfig });

export interface EndgameDef {
  title: Loc;
  message: Loc;
  show: Array<"quests" | "skills" | "artifacts" | "eggs">;
  contactSource: "reuse-dnb-contact";
  actions: Array<"replay" | "back-to-portfolio">;
}

export interface ClaimPolicy {
  /** Forbidden claim categories (machine-checkable tags). */
  deny: string[];
  boundaries: Record<string, Loc>;
  notes: LocList;
}

/** Dialogue is a map of tree id → ordered lines (Loc). Speaker optional. */
export interface DialogueLine {
  speaker?: Loc;
  /** Portrait sheet key (2-frame talk) shown beside the line. */
  portrait?: string;
  text: Loc;
}
export type DialogueTree = DialogueLine[];

export interface PackMeta {
  id: string;
  title: Loc;
  company?: Loc;
  role?: Loc;
  startMap: string;
  startSpawn: string;
  lang: { default: Lang; available: Lang[] };
  theme: ThemeTokens;
}

export interface SpriteSheetSpec {
  url: string;
  frameWidth: number;
  frameHeight: number;
}

/** All textures a pack needs; the engine's BootScene loads these generically. */
export interface AssetManifest {
  images: Record<string, string>;
  spritesheets: Record<string, SpriteSheetSpec>;
}

export interface ContentPack {
  meta: PackMeta;
  assets: AssetManifest;
  tiles: Record<string, TileSpec>;
  maps: MapDef[];
  npcs: Npc[];
  interactables: Interactable[];
  quests: Quest[];
  skills: Skill[];
  artifacts: Artifact[];
  minigames: MinigameDef[];
  dialogue: Record<string, DialogueTree>;
  endgame: EndgameDef;
  claims: ClaimPolicy;
}

/** Persisted progress (localStorage, namespaced per pack). */
export interface SaveState {
  packId: string;
  flags: Record<string, boolean>;
  skills: string[];
  completedQuests: string[];
  artifacts: string[];
  foundEggs: string[];
  currentMap: string;
  player: Vec2;
  facing: Dir;
  lang: Lang;
}
