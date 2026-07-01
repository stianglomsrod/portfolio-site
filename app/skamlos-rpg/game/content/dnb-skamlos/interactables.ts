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
    showWhen: { not: { allQuests: ["hjem-til-ordkryss"] } },
  },
  {
    id: "home-pc-pd",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 8, y: 2 },
    prompt: { no: "Bygg pd-app", en: "Build pd-app" },
    action: { type: "startMinigame", minigame: "pd-app-build" },
    showWhen: {
      and: [
        { allQuests: ["oslomet-pd"] },
        { not: { allQuests: ["pd-app-bygg"] } },
      ],
    },
  },
  {
    id: "home-pc-idle",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 8, y: 2 },
    prompt: { no: "Undersøk PC-en", en: "Use the PC" },
    action: { type: "dialogue", tree: "home-pc-idle" },
    showWhen: {
      and: [
        { allQuests: ["hjem-til-ordkryss"] },
        {
          not: {
            and: [
              { allQuests: ["oslomet-pd"] },
              { not: { allQuests: ["pd-app-bygg"] } },
            ],
          },
        },
        {
          not: {
            and: [
              { allQuests: ["nikko"] },
              { not: { allQuests: ["portefolje"] } },
            ],
          },
        },
      ],
    },
  },
  {
    id: "home-duck",
    kind: "duck",
    spriteKey: "duck",
    position: { x: 6, y: 3 },
    prompt: { no: "Snakk med badeanda", en: "Talk to the rubber duck" },
    action: { type: "dialogue", tree: "duck-hint" },
    wander: true,
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
  // Nikko waits by his house once the master's is done, and invites you in.
  {
    id: "nikko-invite",
    kind: "sign",
    spriteKey: "npc_nikko",
    position: { x: 17, y: 13 },
    name: { no: "Nikko", en: "Nikko" },
    prompt: { no: "Snakk med Nikko", en: "Talk to Nikko" },
    action: { type: "dialogue", tree: "nikko-invite" },
    showWhen: {
      and: [
        { allQuests: ["laererworkshop"] },
        { not: { allQuests: ["nikko"] } },
      ],
    },
  },
  {
    id: "kari",
    kind: "sign",
    spriteKey: "npc_kari",
    position: { x: 9, y: 6 },
    name: { no: "Kari", en: "Kari" },
    prompt: { no: "Snakk med Kari", en: "Talk to Kari" },
    action: { type: "dialogue", tree: "kari" },
    showWhen: { allQuests: ["laererworkshop"] },
  },
  {
    id: "home-pc-portfolio",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 8, y: 2 },
    prompt: { no: "Bygg porteføljen", en: "Build the portfolio" },
    action: { type: "startMinigame", minigame: "portefolje-build" },
    showWhen: {
      and: [
        { allQuests: ["nikko"] },
        { not: { allQuests: ["portefolje"] } },
      ],
    },
  },
  {
    id: "dnb-deliver",
    kind: "sign",
    spriteKey: "papers",
    position: { x: 5, y: 4 },
    name: { no: "Søknadsbunken", en: "The application stack" },
    prompt: {
      no: "Legg søknaden i bunken",
      en: "Add your application to the stack",
    },
    action: { type: "endgame", quest: "lever-soknad" },
  },
  {
    id: "dnb-egg",
    kind: "egg",
    spriteKey: "egg",
    position: { x: 6, y: 4 },
    name: { no: "Et egg", en: "An egg" },
    prompt: { no: "Undersøk egget", en: "Examine the egg" },
    action: { type: "dialogue", tree: "dnb-egg" },
  },
  // --- Nikkos hus (interior): two workstations side by side ---
  {
    id: "nikko-desk",
    kind: "sign",
    spriteKey: "npc_nikko",
    position: { x: 5, y: 3 },
    name: { no: "Nikko", en: "Nikko" },
    prompt: { no: "Snakk med Nikko", en: "Talk to Nikko" },
    action: { type: "dialogue", tree: "nikko-desk" },
  },
  {
    id: "nikko-station",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 6, y: 2 },
    prompt: { no: "Sett deg ved maskinen", en: "Sit down at the machine" },
    action: { type: "startMinigame", minigame: "nikko-build" },
    showWhen: { not: { allQuests: ["nikko"] } },
  },
  // --- OsloMet studio stations ---
  {
    id: "oslomet-board",
    kind: "sign",
    position: { x: 6, y: 1 },
    prompt: { no: "Les designprinsippene", en: "Read the design principles" },
    action: { type: "dialogue", tree: "oslomet-board" },
  },
  {
    id: "oslomet-klar",
    kind: "pc",
    spriteKey: "pc",
    position: { x: 10, y: 3 },
    prompt: { no: "Se på Klar", en: "Look at Klar" },
    action: { type: "dialogue", tree: "oslomet-klar" },
  },
  {
    id: "oslomet-method",
    kind: "prop",
    spriteKey: "books",
    position: { x: 2, y: 3 },
    prompt: { no: "Bla i metodehylla", en: "Browse the method shelf" },
    action: { type: "dialogue", tree: "oslomet-method" },
  },
  {
    id: "oslomet-veileder-pd",
    kind: "sign",
    spriteKey: "npc_prof",
    position: { x: 6, y: 4 },
    name: { no: "Veileder", en: "Supervisor" },
    prompt: { no: "Snakk med veilederen", en: "Talk to the supervisor" },
    action: { type: "startMinigame", minigame: "oslomet-pd-brief" },
    showWhen: { not: { allQuests: ["oslomet-pd"] } },
  },
  {
    id: "oslomet-veileder-master",
    kind: "sign",
    spriteKey: "npc_prof",
    position: { x: 6, y: 4 },
    name: { no: "Veileder", en: "Supervisor" },
    prompt: { no: "Snakk med veilederen", en: "Talk to the supervisor" },
    action: { type: "startMinigame", minigame: "oslomet-master-brief" },
    showWhen: {
      and: [
        { allQuests: ["pd-app-bygg"] },
        { not: { allQuests: ["oslomet-master"] } },
      ],
    },
  },
  // --- Skolen lærerworkshop (teacher NPCs around the journey map) ---
  {
    id: "ws-teacher1",
    kind: "sign",
    spriteKey: "npc_teacher1",
    position: { x: 3, y: 4 },
    name: { no: "Lærer", en: "Teacher" },
    prompt: { no: "Snakk med læreren", en: "Talk to the teacher" },
    action: { type: "dialogue", tree: "ws-note-green" },
  },
  {
    id: "ws-teacher2",
    kind: "sign",
    spriteKey: "npc_teacher2",
    position: { x: 8, y: 4 },
    name: { no: "Lærer", en: "Teacher" },
    prompt: { no: "Snakk med læreren", en: "Talk to the teacher" },
    action: { type: "dialogue", tree: "ws-note-red" },
  },
  {
    id: "ws-teacher3",
    kind: "sign",
    spriteKey: "npc_teacher3",
    position: { x: 6, y: 2 },
    name: { no: "Lærer", en: "Teacher" },
    prompt: { no: "Snakk med læreren", en: "Talk to the teacher" },
    action: { type: "dialogue", tree: "ws-note-blue" },
  },
  {
    id: "ws-board",
    kind: "sign",
    spriteKey: "journeymap",
    position: { x: 6, y: 4 },
    name: { no: "Journey map", en: "Journey map" },
    prompt: { no: "Oppsummer workshopen", en: "Summarize the workshop" },
    action: { type: "startMinigame", minigame: "workshop-synth" },
  },
];
