import type { Npc } from "../../engine/types";

// Fictional/composite classroom ambience. They represent the everyday classroom,
// not real, identifiable pupils. No participant or school names anywhere.
export const npcs: Npc[] = [
  {
    id: "elev1",
    name: { no: "Elev", en: "Student" },
    spriteKey: "npc_student1",
    portrait: "portrait_student1",
    role: "student",
    position: { x: 2, y: 4 },
    facing: "right",
    dialogue: "elev1",
  },
  {
    id: "elev2",
    name: { no: "Elev", en: "Student" },
    spriteKey: "npc_student2",
    portrait: "portrait_student2",
    role: "student",
    position: { x: 10, y: 6 },
    facing: "left",
    dialogue: "elev2",
  },
];
