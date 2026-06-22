// Core type definitions for the Skamløs Pitch game. The whole game is
// data-driven: zones, quests, skills, artifacts and easter eggs are described
// as plain data and the 3D world + UI render from these structures.

export type Lang = "no" | "en";

/** A bilingual string. */
export interface Loc {
  no: string;
  en: string;
}

/** A bilingual list of strings. */
export interface LocList {
  no: string[];
  en: string[];
}

export type SkillGroup =
  | "foundation"
  | "design"
  | "fullstack"
  | "ai"
  | "craft";

export interface Skill {
  id: string;
  /** Short label shown in the skill tree + unlock toast. */
  label: Loc;
  group: SkillGroup;
  /** Tiny glyph (emoji) used as a lightweight icon. */
  glyph: string;
}

export type ArtifactKind = "cert" | "repo" | "live" | "concept";

export interface Artifact {
  id: string;
  title: Loc;
  description: Loc;
  kind: ArtifactKind;
  /** External link. Omitted for "concept" artifacts that have no public URL. */
  href?: string;
  linkLabel?: Loc;
  /** Honest claim boundary shown on the artifact card. */
  boundary?: Loc;
}

/** A choice in a decision mission (Smart Import / Agentic Workflow). */
export interface MissionOption {
  id: string;
  label: Loc;
  correct: boolean;
  /** Shown after the player picks this option. */
  feedback: Loc;
  /** Optional playful consequence label (e.g. a defeated monster). */
  tag?: Loc;
}

export interface Mission {
  kind: "smart-import" | "agentic";
  /** The machine/agent prompt the player must respond to. */
  prompt: Loc;
  /** Short framing line above the options. */
  setup: Loc;
  options: MissionOption[];
}

export interface Quest {
  id: string;
  order: number;
  /** Small over-title, e.g. "Sone 02". */
  kicker: Loc;
  title: Loc;
  /** What the terminal/NPC says when first opened. */
  intro: Loc;
  /** One-line objective shown in the HUD + quest log. */
  objective: Loc;
  /** The truthful, claim-safe evidence shown in the quest modal. */
  body: LocList;
  /** Skill ids required to unlock this zone's gate. Empty = open. */
  requires: string[];
  /** Skill ids granted on completion. The first is the "signature" key. */
  grantsSkills: string[];
  /** Artifact ids revealed/collectible on completion. */
  grantsArtifacts: string[];
  /** Optional decision mission that must be solved to complete the quest. */
  mission?: Mission;
  /** World position [x, z]. The platform sits on the ground plane. */
  position: [number, number];
  /** Accent colour (hex) for beacon / platform glow. */
  color: string;
  /** Label shown on the locked gate, e.g. what is required. */
  gateHint?: Loc;
}

export type EasterEggKind = "flutterfly" | "egg" | "duck";

export interface EasterEgg {
  id: string;
  kind: EasterEggKind;
  name: Loc;
  /** Flavour text shown when found. */
  lore: Loc;
  /** Optional badge unlocked. */
  badge?: Loc;
  /** Optional external link (e.g. companion repo for the Flutterfly). */
  href?: string;
  linkLabel?: Loc;
  position: [number, number, number];
  color: string;
}

/** What the player is currently looking at / standing near. */
export interface ActiveTarget {
  id: string;
  kind: "quest" | "artifact" | "egg" | "gate";
  /** Verb shown in the interaction prompt. */
  action: Loc;
  locked?: boolean;
}

export type Phase = "start" | "playing" | "won";

export type OverlayKind =
  | { type: "quest"; id: string }
  | { type: "artifact"; id: string }
  | { type: "egg"; id: string }
  | { type: "log" }
  | { type: "skills" }
  | { type: "gate-locked"; missing: string[] };

export interface GameState {
  phase: Phase;
  /** Active modal/panel. Null = free play. */
  overlay: OverlayKind | null;
  /** Unlocked skill ids. */
  skills: string[];
  /** Completed quest ids. */
  completedQuests: string[];
  /** Collected artifact ids (a subset of revealed). */
  collectedArtifacts: string[];
  /** Artifact ids that exist in the world (revealed by quest completion). */
  revealedArtifacts: string[];
  /** Found easter egg ids. */
  foundEggs: string[];
  /** Quests whose decision mission was solved correctly. */
  solvedMissions: string[];
  /** Transient unlock toasts (skill/artifact/egg messages). */
  toasts: Toast[];
  /** Monotonic id source for toasts. */
  nextToastId: number;
  /** Playful counters. */
  overclaimsBlocked: number;
  guardrailsPassed: number;
}

export interface Toast {
  id: string;
  text: Loc;
  glyph: string;
}
