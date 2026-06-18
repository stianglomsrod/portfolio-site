import { fitScan, type CaseRef } from "../../data/portfolio";

/**
 * World data for the explorable "Stian's verden" hub.
 *
 * Every milestone node is DERIVED from `fitScan.milestones` (single source of
 * truth — no invented facts). We only add presentational "world" flavour on
 * top: a place name, a thematic area for the journal, an icon key, and a 2D
 * map position. The VG X portal is a synthetic "next quest" node.
 */

export type WorldIcon =
  | "terminal"
  | "wrench"
  | "bridge"
  | "compass"
  | "lens"
  | "people"
  | "sprout"
  | "bot"
  | "portal";

export type WorldNodeKind = "milestone" | "portal";

export type WorldNode = {
  /** Stable id (matches the milestone id, or "vgx" for the portal). */
  id: string;
  /** Real project / step title (from the milestone). */
  title: string;
  /** Short tag (from the milestone shortLabel). */
  short: string;
  /** Playful place name in the world. */
  worldName: string;
  /** Thematic grouping used by the journal overview. */
  area: string;
  icon: WorldIcon;
  kind: WorldNodeKind;
  /** Map position as percentages of the world stage (0–100). */
  pos: { x: number; y: number };
  /** "Hva dette faktisk var" — the concrete artifact (milestone.evidence). */
  whatItWas?: string;
  /** "Hva som ble låst opp" (milestone.unlocked) or portal blurb. */
  unlocked: string;
  /** Why it matters for VG X (milestone.vgxRelevance). */
  vgxRelevance: string;
  caseRef?: CaseRef;
  metaphor?: string;
};

/** Presentational metadata per milestone id, merged with the real data. */
const FLAVOR: Record<
  string,
  {
    worldName: string;
    area: string;
    icon: WorldIcon;
    pos: { x: number; y: number };
  }
> = {
  "c-foundations": {
    worldName: "Systemkilden",
    area: "Grunnlaget",
    icon: "terminal",
    pos: { x: 9, y: 84 },
  },
  "cs50x-wordhunt": {
    worldName: "Lærerverkstedet",
    area: "Første verktøy",
    icon: "wrench",
    pos: { x: 23, y: 63 },
  },
  "ask-away": {
    worldName: "Brolunden",
    area: "Figma-lunden",
    icon: "bridge",
    pos: { x: 37, y: 80 },
  },
  "acad-collaborate": {
    worldName: "Kartrommet",
    area: "Figma-lunden",
    icon: "compass",
    pos: { x: 49, y: 58 },
  },
  "ai-fagtekst": {
    worldName: "Linsehagen",
    area: "Figma-lunden",
    icon: "lens",
    pos: { x: 43, y: 37 },
  },
  "participatory-precursor": {
    worldName: "Prototypeverket",
    area: "Forskning & bygging",
    icon: "people",
    pos: { x: 64, y: 73 },
  },
  klar: {
    worldName: "Klar-drivhuset",
    area: "Forskning & bygging",
    icon: "sprout",
    pos: { x: 73, y: 49 },
  },
  "agentic-workflow": {
    worldName: "Agentlabben",
    area: "Agentlab",
    icon: "bot",
    pos: { x: 84, y: 29 },
  },
};

/** All milestone nodes, in journey order, enriched with world flavour. */
const milestoneNodes: WorldNode[] = fitScan.milestones.map((m) => {
  const flavor = FLAVOR[m.id];
  return {
    id: m.id,
    title: m.title,
    short: m.shortLabel,
    worldName: flavor.worldName,
    area: flavor.area,
    icon: flavor.icon,
    kind: "milestone",
    pos: flavor.pos,
    whatItWas: m.evidence,
    unlocked: m.unlocked,
    vgxRelevance: m.vgxRelevance,
    caseRef: m.caseRef,
    metaphor: m.metaphor,
  };
});

/** Synthetic "next quest" portal — framed positively, not as a deficiency. */
const vgxPortal: WorldNode = {
  id: "vgx",
  title: "VG X",
  short: "Neste oppdrag",
  worldName: "VG X-portalen",
  area: "Neste oppdrag",
  icon: "portal",
  kind: "portal",
  pos: { x: 92, y: 13 },
  unlocked:
    "En åpen portal, ikke en låst dør. Alt det forrige har bygget peker hit — en arena der oversikt, forståelse og AI-som-produkt får møte ekte lesere i stor skala.",
  vgxRelevance:
    "VG X gjenoppfinner nyheter som opplevelser for en digitalt innfødt generasjon. Det er nøyaktig krysningspunktet mellom innhold, AI og brukerbehov som hele reisen har trent på.",
  metaphor: "Portalen der reisen så langt blir til neste kapittel.",
};

export const worldNodes: WorldNode[] = [...milestoneNodes, vgxPortal];

/** The number of real, "unlocked" milestone areas (excludes the portal). */
export const milestoneCount = milestoneNodes.length;

/** Index pairs describing the winding trail between nodes, in journey order. */
export const worldPath: [number, number][] = worldNodes
  .slice(0, -1)
  .map((_, i) => [i, i + 1] as [number, number]);

/**
 * The four VG X user needs, surfaced in the journal as a fit summary.
 * Reused verbatim from the fit scan (no invented claims).
 */
export const worldNeeds = fitScan.needs.map((n) => ({
  id: n.id,
  label: n.label,
  meaning: n.vgxMeaning,
  fit: n.fit,
}));
