import type { Skill } from "../../engine/types";

// Foundational programming skill rewarded by the Ordkryss minigame.
// CLAIM DISCIPLINE: CS50x covered C, Python, SQL, Flask, JavaScript and
// HTML/CSS / web fundamentals. Django belongs to LATER predecessor work, not
// CS50x — the log spans both, framed as a foundation, never "CS50x taught Django".
// This is foundational learning: not a CS degree, not expert level.
export const skills: Skill[] = [
  {
    id: "grunnleggende-programmering",
    label: { no: "Grunnleggende programmering", en: "Programming fundamentals" },
    group: "foundation",
    glyph: "💻",
    log: {
      no: [
        "C",
        "Python",
        "SQL",
        "Flask",
        "Django",
        "JavaScript",
        "HTML/CSS",
        "web-grunnmur",
        "git-basics",
      ],
      en: [
        "C",
        "Python",
        "SQL",
        "Flask",
        "Django",
        "JavaScript",
        "HTML/CSS",
        "web fundamentals",
        "git basics",
      ],
    },
  },
];
