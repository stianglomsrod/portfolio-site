// === REUSABLE ENGINE — tiny typed event bus (React <-> Phaser) ===
// Deliberately framework-free: this module must NOT import Phaser, so the React
// HUD can share it without pulling the engine into other bundles. Phaser scenes
// and React components both talk through one GameBridge instance.

import type { Artifact, DialogueLine, Lang, Loc, Skill, Vec2 } from "./types";

export interface StateSnapshot {
  currentMap: string;
  skills: string[];
  artifacts: string[];
  completedQuests: string[];
  foundEggs: string[];
  objective: Loc | null;
  questTitle: Loc | null;
  lang: Lang;
}

export type GamePhase = "start" | "playing";

/** A consistent interaction CTA: "Name — [E] Verb" shown in the bottom box. */
export interface CtaPrompt {
  name?: Loc;
  verb: Loc;
}

/** Engine → UI events. */
export interface GameEvents {
  phase: GamePhase;
  state: StateSnapshot;
  objective: Loc | null;
  prompt: CtaPrompt | null;
  dialogue: { id: string; lines: DialogueLine[] };
  /** Transient, non-blocking line (mood/bell) that auto-dismisses. */
  subtitle: Loc;
  toast: { text: Loc; kind: "skill" | "artifact" | "info" };
  reward: { skills: Skill[]; artifacts: Artifact[] };
  locked: Loc;
  bell: undefined;
  openMinigame: string;
  closeMinigame: undefined;
  endgame: undefined;
  ready: undefined;
  // Engine → scene commands
  "scene:loadMap": { map: string; spawn: string };
  "scene:teleport": Vec2;
}

/** UI → engine commands. */
export interface GameCommands {
  "cmd:start": undefined;
  "cmd:restart": undefined;
  "cmd:closeDialogue": undefined;
  "cmd:minigameComplete": string;
  "cmd:minigameCancel": undefined;
  "cmd:setLang": Lang;
  "cmd:interact": undefined;
  "cmd:pause": undefined;
  "cmd:resume": undefined;
}

type AllEvents = GameEvents & GameCommands;
type Handler<T> = (payload: T) => void;

export class GameBridge {
  private listeners = new Map<string, Set<Handler<unknown>>>();

  on<K extends keyof AllEvents>(
    event: K,
    handler: Handler<AllEvents[K]>,
  ): () => void {
    const set = this.listeners.get(event as string) ?? new Set();
    set.add(handler as Handler<unknown>);
    this.listeners.set(event as string, set);
    return () => this.off(event, handler);
  }

  off<K extends keyof AllEvents>(
    event: K,
    handler: Handler<AllEvents[K]>,
  ): void {
    this.listeners.get(event as string)?.delete(handler as Handler<unknown>);
  }

  emit<K extends keyof AllEvents>(
    event: K,
    ...payload: AllEvents[K] extends undefined ? [] : [AllEvents[K]]
  ): void {
    const set = this.listeners.get(event as string);
    if (!set) return;
    const data = (payload[0] as unknown) ?? undefined;
    for (const handler of [...set]) handler(data);
  }

  clear(): void {
    this.listeners.clear();
  }
}
