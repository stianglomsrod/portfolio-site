import type { ContentPack } from "../../engine/types";
import { artifacts } from "./artifacts";
import { assets, theme } from "./theme";
import { claims } from "./claims";
import { dialogue } from "./dialogue";
import { endgame } from "./endgame";
import { interactables } from "./interactables";
import { maps } from "./maps";
import { minigames } from "./minigames";
import { npcs } from "./npcs";
import { quests } from "./quests";
import { skills } from "./skills";
import { tiles } from "./tiles";

// The DNB / Skamløs Pitch content pack — the FIRST swappable pack for the
// reusable application-RPG engine. A future application game = a new pack + new
// theme assets, with no engine changes.
export const dnbSkamlosPack: ContentPack = {
  meta: {
    id: "dnb-skamlos",
    title: { no: "Skamløs Pitch: Kompetansebyen", en: "Shameless Pitch: Competence Town" },
    company: { no: "DNB AI Tech" },
    role: { no: "Software Engineer, AI-First Engineering" },
    startMap: "classroom",
    startSpawn: "spawn-default",
    lang: { default: "no", available: ["no", "en"] },
    theme,
  },
  assets,
  tiles,
  maps,
  npcs,
  interactables,
  quests,
  skills,
  artifacts,
  minigames,
  dialogue,
  endgame,
  claims,
};
