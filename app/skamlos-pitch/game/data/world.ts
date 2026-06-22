import type { Loc } from "../state/types";

// World layout + tuning constants. Keep the world compact: it should feel
// exploratory but is technically a small hub of zones.

/** Eye height of the first-person camera. */
export const EYE_HEIGHT = 1.7;

/** Player spawn position [x, z] (world looks toward -z). */
export const SPAWN: [number, number] = [0, 8];

/** Half-extent of the square playfield; movement is clamped to this. */
export const WORLD_BOUND = 46;

/** Movement tuning (world units / second). */
export const WALK_SPEED = 7.4;
export const SPRINT_MULT = 1.7;
export const ACCEL = 11;
export const DECEL = 12;

/** Interaction proximity radius (world units). */
export const INTERACT_RADIUS = 4.6;
/** Radius of a zone platform. */
export const PLATFORM_RADIUS = 4.2;

/** The final DNB AI Tech Gate. */
export const DNB_GATE = {
  id: "dnb-gate",
  position: [0, -62] as [number, number],
  /** Signature skills required to open the gate. */
  requires: [
    "cs-foundations",
    "participatory-design",
    "design-science",
    "ai-first-fullstack",
    "agentic-engineering",
  ],
  color: "#7cc0ff",
  title: { no: "DNB AI Tech-porten", en: "DNB AI Tech Gate" } as Loc,
  lockedHint: {
    no: "Porten sjekker hele kjeden: grunnmur, brukerbehov, fullstack-prototype, AI-guardrails, dokumentasjon og ærlige claim-grenser.",
    en: "The gate checks the whole chain: foundation, user needs, fullstack prototype, AI guardrails, documentation and honest claim boundaries.",
  } as Loc,
};

/** What the gate verifies, shown as a checklist on approach. */
export const GATE_CHECKS: { id: string; skill: string; label: Loc }[] = [
  {
    id: "foundation",
    skill: "cs-foundations",
    label: { no: "Programmerings­grunnmur", en: "Programming foundation" },
  },
  {
    id: "needs",
    skill: "participatory-design",
    label: { no: "Design og brukerbehov", en: "Design & user needs" },
  },
  {
    id: "science",
    skill: "design-science",
    label: {
      no: "Metode­disiplin (design science)",
      en: "Method discipline (design science)",
    },
  },
  {
    id: "fullstack",
    skill: "ai-first-fullstack",
    label: {
      no: "Fullstack AI-prototype (Klar)",
      en: "Fullstack AI prototype (Klar)",
    },
  },
  {
    id: "agentic",
    skill: "agentic-engineering",
    label: { no: "Agentisk arbeidsflyt + QA", en: "Agentic workflow + QA" },
  },
];
