import type { Interactable } from "../../engine/types";

export const interactables: Interactable[] = [
  // --- Home interior ---
  {
    id: "home-pc",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 8, y: 2 },
    prompt: { no: "Undersøk PC-en", en: "Use the PC" },
    action: { type: "startMinigame", minigame: "ordkryss-forloop" },
  },
  {
    id: "home-duck",
    kind: "duck",
    spriteKey: "duck",
    position: { x: 6, y: 3 },
    prompt: { no: "Snakk med badeanda", en: "Talk to the rubber duck" },
    action: { type: "dialogue", tree: "duck-hint" },
  },
  // --- Town ---
  {
    id: "bykryss-sign",
    kind: "sign",
    spriteKey: "sign",
    position: { x: 14, y: 15 },
    prompt: { no: "Les skiltet", en: "Read the sign" },
    action: { type: "signpost" },
  },
  // A deadpan optional interaction (the game treats it as totally normal).
  {
    id: "flutterfly-compile",
    kind: "prop",
    position: { x: 17, y: 12 },
    prompt: { no: "Kompiler flutterfly", en: "Compile flutterfly" },
    action: { type: "dialogue", tree: "flutterfly-compile" },
  },
  // Locked building doors (readable feedback, never silent).
  {
    id: "dnb-door",
    kind: "door",
    position: { x: 12, y: 8 },
    prompt: { no: "Prøv DNB-inngangen", en: "Try the DNB entrance" },
    action: { type: "dialogue", tree: "dnb-locked" },
  },
  {
    id: "oslomet-door",
    kind: "door",
    position: { x: 5, y: 14 },
    prompt: { no: "Gå inn på OsloMet", en: "Enter OsloMet" },
    action: { type: "dialogue", tree: "oslomet-locked" },
  },
  {
    id: "nikko-door",
    kind: "door",
    position: { x: 20, y: 14 },
    prompt: { no: "Bank på hos Nikko", en: "Knock at Nikko's" },
    action: { type: "dialogue", tree: "nikko-locked" },
  },
  {
    id: "schoolside-door",
    kind: "door",
    position: { x: 9, y: 21 },
    prompt: { no: "Prøv skolens sideinngang", en: "Try the school side entrance" },
    action: { type: "dialogue", tree: "schoolside-locked" },
  },
];
