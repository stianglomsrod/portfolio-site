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
  // --- Town: signpost ---
  {
    id: "bykryss-sign",
    kind: "sign",
    spriteKey: "sign",
    position: { x: 14, y: 17 },
    prompt: { no: "Les skiltet", en: "Read the sign" },
    action: { type: "signpost" },
  },
  // --- Town: locked building doors (readable feedback, never silent) ---
  {
    id: "dnb-door",
    kind: "door",
    position: { x: 11, y: 6 },
    prompt: { no: "DNB AI Tech — inngang", en: "DNB AI Tech — entrance" },
    action: { type: "dialogue", tree: "dnb-locked" },
  },
  {
    id: "oslomet-door",
    kind: "door",
    position: { x: 5, y: 12 },
    prompt: { no: "OsloMet — inngang", en: "OsloMet — entrance" },
    action: { type: "dialogue", tree: "oslomet-locked" },
  },
  {
    id: "nikko-door",
    kind: "door",
    position: { x: 20, y: 12 },
    prompt: { no: "Nikkos hus", en: "Nikko's house" },
    action: { type: "dialogue", tree: "nikko-locked" },
  },
  {
    id: "workshop-door",
    kind: "door",
    spriteKey: "door",
    position: { x: 7, y: 16 },
    prompt: { no: "Verkstedinngang", en: "Workshop entrance" },
    action: { type: "dialogue", tree: "workshop-locked" },
  },
];
