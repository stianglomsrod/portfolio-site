import { QUESTS } from "../data/quests";

// Derived world layout. Artifacts float on an arc on the "entrance" side
// (toward +z) of the zone that grants them, so the player walks up to collect
// them after completing the quest.
const ARTIFACT_RADIUS = 5.8;
const ARTIFACT_HEIGHT = 1.5;
const ARC = Math.PI * 0.7; // total spread of the arc

export interface PlacedArtifact {
  id: string;
  questId: string;
  pos: [number, number, number];
  color: string;
}

const placed: PlacedArtifact[] = [];

for (const quest of QUESTS) {
  const [qx, qz] = quest.position;
  const n = quest.grantsArtifacts.length;
  quest.grantsArtifacts.forEach((id, i) => {
    // Spread artifacts along an arc centred on the +z (entrance) direction.
    const t = n === 1 ? 0 : i / (n - 1) - 0.5; // -0.5..0.5
    const angle = Math.PI / 2 + t * ARC; // around +z
    const x = qx + Math.cos(angle) * ARTIFACT_RADIUS;
    const z = qz + Math.sin(angle) * ARTIFACT_RADIUS;
    placed.push({ id, questId: quest.id, pos: [x, ARTIFACT_HEIGHT, z], color: quest.color });
  });
}

export const PLACED_ARTIFACTS: PlacedArtifact[] = placed;
export const ARTIFACT_POS = new Map(placed.map((p) => [p.id, p.pos] as const));
