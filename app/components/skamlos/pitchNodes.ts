import { fitScan, type CaseRef } from "../../data/portfolio";

/**
 * A node in the VG X fit-constellation. Derived from `fitScan.milestones`
 * (single source of truth) plus a synthetic "VG X" destination node.
 * Positions are computed procedurally so the data file stays presentation-free.
 */
export type PitchNode = {
  id: string;
  title: string;
  short: string;
  /** What this step unlocked (milestones) or a framing line (target). */
  blurb: string;
  vgxRelevance: string;
  evidence?: string;
  caseRef?: CaseRef;
  metaphor?: string;
  kind: "milestone" | "target";
  position: [number, number, number];
};

/**
 * Lay the milestones out as a gentle spiral that climbs and winds inward,
 * converging on the VG X star at the centre. Deterministic = stable render.
 */
function spiralPosition(index: number, count: number): [number, number, number] {
  const t = count <= 1 ? 0 : index / (count - 1);
  const angle = t * Math.PI * 1.7 + Math.PI * 0.15;
  const radius = 6.4 - t * 2.1;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = (t - 0.5) * 4.2;
  return [x, y, z];
}

const milestoneNodes: PitchNode[] = fitScan.milestones.map((m, i) => ({
  id: m.id,
  title: m.title,
  short: m.shortLabel,
  blurb: m.unlocked,
  vgxRelevance: m.vgxRelevance,
  evidence: m.evidence,
  caseRef: m.caseRef,
  metaphor: m.metaphor,
  kind: "milestone",
  position: spiralPosition(i, fitScan.milestones.length),
}));

const targetNode: PitchNode = {
  id: "vgx",
  title: "VG X",
  short: "Neste oppdrag",
  blurb:
    "Alle ferdighetene peker samme vei: AI-native, brukersentrert, eksperimentell produktutvikling.",
  vgxRelevance:
    "Stedet der teknisk dybde, læringsdesign og agentiske workflows møter nye digitale nyhetsopplevelser.",
  kind: "target",
  position: [0, 0, 0],
};

export const pitchNodes: PitchNode[] = [...milestoneNodes, targetNode];

/** Index pairs for the path lines drawn between consecutive milestones. */
export const pitchPath: [number, number][] = milestoneNodes.map((_, i) => [
  i,
  i + 1 < milestoneNodes.length ? i + 1 : milestoneNodes.length - 1,
]);
