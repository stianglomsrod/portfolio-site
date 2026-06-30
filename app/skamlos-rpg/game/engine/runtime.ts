// === REUSABLE ENGINE — authoritative game state controller ===
// Holds the single source of truth (SaveState) for one ContentPack and emits
// discrete changes to the UI via the bridge. Continuous motion stays in Phaser;
// only discrete state (quest/skill/artifact/map/objective) flows through here.

import { GameBridge } from "./bridge";
import { isMet } from "./requirements";
import { freshState, loadState, saveState } from "./save";
import type {
  Artifact,
  ContentPack,
  GateRef,
  Lang,
  Quest,
  Requirement,
  SaveState,
  Skill,
} from "./types";

export class GameRuntime {
  state: SaveState;

  constructor(
    readonly pack: ContentPack,
    readonly bridge: GameBridge,
  ) {
    this.state = loadState(pack) ?? freshState(pack);
  }

  /* ---- queries ---- */

  met(req: Requirement): boolean {
    return isMet(req, this.state);
  }

  hasSkill(id: string): boolean {
    return this.state.skills.includes(id);
  }
  hasArtifact(id: string): boolean {
    return this.state.artifacts.includes(id);
  }
  questDone(id: string): boolean {
    return this.state.completedQuests.includes(id);
  }

  /** Lowest-order incomplete quest whose `requires` is satisfied. */
  activeQuest(): Quest | null {
    return (
      [...this.pack.quests]
        .sort((a, b) => a.order - b.order)
        .find((q) => !this.questDone(q.id) && this.met(q.requires)) ?? null
    );
  }

  /* ---- mutations ---- */

  setFlag(flag: string, value = true): void {
    this.state.flags[flag] = value;
    this.persist();
  }

  grantSkill(id: string): Skill | null {
    if (this.hasSkill(id)) return null;
    const skill = this.pack.skills.find((s) => s.id === id);
    if (!skill) return null;
    this.state.skills.push(id);
    return skill;
  }

  grantArtifact(id: string): Artifact | null {
    if (this.hasArtifact(id)) return null;
    const artifact = this.pack.artifacts.find((a) => a.id === id);
    if (!artifact) return null;
    this.state.artifacts.push(id);
    return artifact;
  }

  findEgg(id: string): void {
    if (!this.state.foundEggs.includes(id)) {
      this.state.foundEggs.push(id);
      this.persist();
      this.pushState();
    }
  }

  completeQuest(id: string): void {
    if (this.questDone(id)) return;
    const quest = this.pack.quests.find((q) => q.id === id);
    if (!quest) return;

    this.state.completedQuests.push(id);

    const grantedSkills = quest.grantsSkills
      .map((s) => this.grantSkill(s))
      .filter((s): s is Skill => !!s);
    const grantedArtifacts = quest.grantsArtifacts
      .map((a) => this.grantArtifact(a))
      .filter((a): a is Artifact => !!a);

    quest.setsFlags?.forEach((f) => (this.state.flags[f] = true));
    quest.unlocks?.forEach((u) => (this.state.flags[`open:${u}`] = true));

    this.persist();

    if (grantedSkills.length || grantedArtifacts.length) {
      this.bridge.emit("reward", { skills: grantedSkills, artifacts: grantedArtifacts });
      grantedSkills.forEach((s) =>
        this.bridge.emit("toast", { text: { no: `Ny ferdighet: ${s.label.no}` }, kind: "skill" }),
      );
      if (grantedArtifacts.length) {
        this.bridge.emit("toast", {
          text: { no: `Nytt bevis samlet: ${grantedArtifacts.map((a) => a.title.no).join(" + ")}` },
          kind: "artifact",
        });
      }
    }

    this.pushObjective();
    this.pushState();
  }

  setLang(lang: Lang): void {
    this.state.lang = lang;
    this.persist();
    this.pushState();
  }

  setPlayer(x: number, y: number, facing: SaveState["facing"]): void {
    this.state.player = { x, y };
    this.state.facing = facing;
  }

  setMap(mapId: string): void {
    this.state.currentMap = mapId;
    this.persist();
  }

  reset(): void {
    this.state = freshState(this.pack);
    this.persist();
  }

  /* ---- gates ---- */

  /** Returns the GateRef when blocked, or null when the exit is open. */
  evaluateGate(gate: GateRef | undefined): GateRef | null {
    if (!gate) return null;
    return this.met(gate.requires) ? null : gate;
  }

  /* ---- emit helpers ---- */

  pushObjective(): void {
    const q = this.activeQuest();
    this.bridge.emit("objective", q ? q.objective : null);
  }

  pushState(): void {
    const q = this.activeQuest();
    this.bridge.emit("state", {
      currentMap: this.state.currentMap,
      skills: [...this.state.skills],
      artifacts: [...this.state.artifacts],
      completedQuests: [...this.state.completedQuests],
      foundEggs: [...this.state.foundEggs],
      objective: q ? q.objective : null,
      questTitle: q ? q.title : null,
      lang: this.state.lang,
    });
  }

  persist(): void {
    saveState(this.state);
  }
}
