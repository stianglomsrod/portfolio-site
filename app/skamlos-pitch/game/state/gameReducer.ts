import type { GameState, OverlayKind, Toast } from "./types";
import { QUEST_BY_ID, QUESTS } from "../data/quests";
import { ARTIFACT_BY_ID } from "../data/artifacts";
import { EGG_BY_ID } from "../data/easterEggs";
import { SKILL_BY_ID } from "../data/skills";
import { DNB_GATE } from "../data/world";

export const initialState: GameState = {
  phase: "start",
  overlay: null,
  skills: [],
  completedQuests: [],
  collectedArtifacts: [],
  revealedArtifacts: [],
  foundEggs: [],
  solvedMissions: [],
  toasts: [],
  nextToastId: 1,
  overclaimsBlocked: 0,
  guardrailsPassed: 0,
};

export type Action =
  | { type: "START" }
  | { type: "OPEN_OVERLAY"; overlay: OverlayKind }
  | { type: "CLOSE_OVERLAY" }
  | { type: "COMPLETE_QUEST"; questId: string }
  | { type: "MISSION_RESULT"; questId: string; correct: boolean }
  | { type: "COLLECT_ARTIFACT"; artifactId: string }
  | { type: "FIND_EGG"; eggId: string }
  | { type: "WIN" }
  | { type: "DISMISS_TOAST"; id: string }
  | { type: "RESET" };

function pushToast(
  state: GameState,
  text: Toast["text"],
  glyph: string,
): { toasts: Toast[]; nextToastId: number } {
  const toast: Toast = { id: `t${state.nextToastId}`, text, glyph };
  return {
    toasts: [...state.toasts, toast].slice(-4),
    nextToastId: state.nextToastId + 1,
  };
}

function completeQuest(state: GameState, questId: string): GameState {
  if (state.completedQuests.includes(questId)) return state;
  const quest = QUEST_BY_ID.get(questId);
  if (!quest) return state;

  const newSkills = quest.grantsSkills.filter((s) => !state.skills.includes(s));
  const signature = SKILL_BY_ID.get(quest.grantsSkills[0]);

  const next: GameState = {
    ...state,
    skills: [...state.skills, ...newSkills],
    completedQuests: [...state.completedQuests, questId],
    revealedArtifacts: [
      ...state.revealedArtifacts,
      ...quest.grantsArtifacts.filter(
        (a) => !state.revealedArtifacts.includes(a),
      ),
    ],
  };

  const t = pushToast(
    next,
    {
      no: `${quest.title.no} fullført — ${newSkills.length} ferdighet${newSkills.length === 1 ? "" : "er"} låst opp`,
      en: `${quest.title.en} complete — ${newSkills.length} skill${newSkills.length === 1 ? "" : "s"} unlocked`,
    },
    signature?.glyph ?? "★",
  );
  return { ...next, ...t };
}

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START":
      return { ...state, phase: "playing", overlay: null };

    case "OPEN_OVERLAY":
      return { ...state, overlay: action.overlay };

    case "CLOSE_OVERLAY":
      return { ...state, overlay: null };

    case "COMPLETE_QUEST":
      return completeQuest(state, action.questId);

    case "MISSION_RESULT": {
      if (!action.correct) {
        // Wrong choice: count it as a guardrail caught + overclaim blocked.
        return {
          ...state,
          overclaimsBlocked: state.overclaimsBlocked + 1,
        };
      }
      // Correct: record the solved mission, pass a guardrail, complete quest.
      const withMission: GameState = {
        ...state,
        solvedMissions: state.solvedMissions.includes(action.questId)
          ? state.solvedMissions
          : [...state.solvedMissions, action.questId],
        guardrailsPassed: state.guardrailsPassed + 1,
      };
      return completeQuest(withMission, action.questId);
    }

    case "COLLECT_ARTIFACT": {
      if (state.collectedArtifacts.includes(action.artifactId)) return state;
      const artifact = ARTIFACT_BY_ID.get(action.artifactId);
      const next: GameState = {
        ...state,
        collectedArtifacts: [...state.collectedArtifacts, action.artifactId],
      };
      if (!artifact) return next;
      const t = pushToast(
        next,
        {
          no: `Bevis samlet: ${artifact.title.no}`,
          en: `Evidence collected: ${artifact.title.en}`,
        },
        "📦",
      );
      return { ...next, ...t };
    }

    case "FIND_EGG": {
      if (state.foundEggs.includes(action.eggId)) return state;
      const egg = EGG_BY_ID.get(action.eggId);
      const next: GameState = {
        ...state,
        foundEggs: [...state.foundEggs, action.eggId],
      };
      if (!egg) return next;
      const t = pushToast(
        next,
        { no: `Easter egg: ${egg.name.no}`, en: `Easter egg: ${egg.name.en}` },
        egg.kind === "flutterfly" ? "🦋" : egg.kind === "egg" ? "🥚" : "🦆",
      );
      return { ...next, ...t };
    }

    case "WIN":
      return { ...state, phase: "won", overlay: null };

    case "DISMISS_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    case "RESET":
      return { ...initialState, phase: "playing" };

    default:
      return state;
  }
}

// ---- derived selectors -----------------------------------------------------

export function hasSkill(state: GameState, id: string): boolean {
  return state.skills.includes(id);
}

export function isQuestUnlocked(state: GameState, questId: string): boolean {
  const quest = QUEST_BY_ID.get(questId);
  if (!quest) return false;
  return quest.requires.every((s) => state.skills.includes(s));
}

export function isQuestComplete(state: GameState, questId: string): boolean {
  return state.completedQuests.includes(questId);
}

export function isGateOpen(state: GameState): boolean {
  return DNB_GATE.requires.every((s) => state.skills.includes(s));
}

export function gateMissingSkills(state: GameState): string[] {
  return DNB_GATE.requires.filter((s) => !state.skills.includes(s));
}

export interface Progress {
  questsDone: number;
  questsTotal: number;
  skillsUnlocked: number;
  artifactsCollected: number;
  artifactsRevealed: number;
  eggsFound: number;
}

export function getProgress(state: GameState): Progress {
  return {
    questsDone: state.completedQuests.length,
    questsTotal: QUESTS.length,
    skillsUnlocked: state.skills.length,
    artifactsCollected: state.collectedArtifacts.length,
    artifactsRevealed: state.revealedArtifacts.length,
    eggsFound: state.foundEggs.length,
  };
}
