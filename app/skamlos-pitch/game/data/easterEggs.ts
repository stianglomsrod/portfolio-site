import type { EasterEgg } from "../state/types";

// Optional collectibles + a hidden duck. Found eggs surface in the endgame
// stats. Positions are [x, y, z] in world units.
export const EASTER_EGGS: EasterEgg[] = [
  {
    id: "flutterfly",
    kind: "flutterfly",
    name: { no: "Flutterfly", en: "Flutterfly" },
    lore: {
      no: "En glødende sommerfugl i Flutter-blått flagrer forbi. Den peker mot et sideprosjekt i Flutter/Dart: local-first, rolig UX, Drift + SQLite. Rolige, lokale systemer betyr også noe.",
      en: "A glowing butterfly in Flutter blue flutters past. It points to a side project in Flutter/Dart: local-first, calm UX, Drift + SQLite. Calm, local systems matter too.",
    },
    badge: {
      no: "Badge: «Rolige systemer betyr også noe»",
      en: "Badge: \u201cCalm systems matter too\u201d",
    },
    href: "https://github.com/stianglomsrod/nikkoprogging",
    linkLabel: { no: "Se companion-appen", en: "See the companion app" },
    position: [6, 2.4, -16],
    color: "#54c5f8",
  },
  {
    id: "laser-egg",
    kind: "egg",
    name: {
      no: "De Urimelige Søknaders Egg",
      en: "The Egg of Unreasonable Applications",
    },
    lore: {
      no: "Et gyllent egg, gravert med laser, ligger gjemt i utkanten. Noen søker på papir. Noen søker på egg. Du valgte en spillbar kompetansesti. Legendarisk gjenstand låst opp.",
      en: "A golden egg, laser-engraved, lies hidden at the edge. Some apply on paper. Some apply on an egg. You chose a playable competence path. Legendary item unlocked.",
    },
    badge: {
      no: "Legendarisk: «De Urimelige Søknaders Egg»",
      en: "Legendary: \u201cThe Egg of Unreasonable Applications\u201d",
    },
    position: [-30, 1.1, -52],
    color: "#ffcf5c",
  },
  {
    id: "rubber-duck",
    kind: "duck",
    name: { no: "Sannhetens Badeand", en: "The Rubber Duck of Truth" },
    lore: {
      no: "En liten gul badeand ser på deg. «Forklar koden for meg,» sier den ikke, men du hører det likevel. Den minner deg på å holde påstandene ærlige: bygg det du kan vise, vær åpen om resten.",
      en: "A small yellow rubber duck looks at you. \u201cExplain the code to me,\u201d it doesn't say, yet you hear it anyway. It reminds you to keep your claims honest: build what you can show, be open about the rest.",
    },
    badge: {
      no: "Badge: «Rubber duck-debugget pitchen»",
      en: "Badge: \u201cRubber-ducked the pitch\u201d",
    },
    position: [13, 1.0, -44],
    color: "#ffe14d",
  },
];

export const EGG_BY_ID = new Map(EASTER_EGGS.map((e) => [e.id, e]));
