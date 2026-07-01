import type { Quest } from "../../engine/types";

export const quests: Quest[] = [
  {
    id: "siste-time",
    order: 1,
    title: { no: "Siste time", en: "Last lesson" },
    objective: { no: "Vent ut timen.", en: "Wait out the lesson." },
    intro: {
      no: "Siste time er snart ferdig. Etterpå venter Ordkryss hjemme.",
      en: "The last lesson is almost over. Ordkryss is waiting at home.",
    },
    requires: { always: true },
    grantsSkills: [],
    grantsArtifacts: [],
  },
  {
    id: "hjem-til-ordkryss",
    order: 2,
    title: { no: "Hjem til Ordkryss", en: "Home to Ordkryss" },
    objective: {
      no: "Gå hjem og fullfør CS50x-sluttprosjektet: Ordkryss.",
      en: "Go home and finish the CS50x final project: Ordkryss.",
    },
    requires: { allQuests: ["siste-time"] },
    grantsSkills: ["grunnleggende-programmering"],
    grantsArtifacts: ["cs50x-cert", "ordkryss-video"],
    nextHint: {
      no: "Hjem ligger bortover til høyre. Ordkryss venter.",
      en: "Home is over to the right. Ordkryss is waiting.",
    },
    guides: [
      { map: "town", target: "home", kind: "go" },
      { map: "home", target: "home-pc", kind: "deliver" },
    ],
  },
  {
    id: "til-oslomet",
    order: 3,
    title: { no: "Mot OsloMet", en: "Toward OsloMet" },
    objective: { no: "Gå inn på OsloMet.", en: "Enter OsloMet." },
    requires: { allQuests: ["hjem-til-ordkryss"] },
    grantsSkills: [],
    grantsArtifacts: [],
    nextHint: {
      no: "OsloMet ligger oppover veien. Grunnmuren gjør deg klar.",
      en: "OsloMet is up the road. The foundation makes you ready.",
    },
    guides: [{ map: "town", target: "oslomet", kind: "go" }],
  },
  {
    id: "oslomet-pd",
    order: 4,
    title: { no: "Bygg med folk", en: "Build with people" },
    objective: {
      no: "Snakk med veilederen på OsloMet.",
      en: "Talk to the supervisor at OsloMet.",
    },
    intro: {
      no: "Deltakende design: bygg SAMMEN med dem det gjelder — fremtidige brukere som meddesignere.",
      en: "Participatory design: build WITH those it concerns — future users as co-designers.",
    },
    requires: { allQuests: ["til-oslomet"] },
    grantsSkills: [],
    grantsArtifacts: [],
    nextHint: {
      no: "Bygg forløperprototypen (pd-app) hjemme ved PC-en.",
      en: "Build the precursor prototype (pd-app) at home.",
    },
    guides: [{ map: "oslomet", at: { x: 6, y: 4 }, kind: "start" }],
  },
  {
    id: "pd-app-bygg",
    order: 5,
    title: { no: "Forløperprototypen", en: "The precursor prototype" },
    objective: {
      no: "Bygg pd-app hjemme: koble frontend, backend og brukerbehov.",
      en: "Build pd-app at home: connect frontend, backend and user needs.",
    },
    intro: {
      no: "Python/Django + JavaScript/Vue. Brukerinnsikt blir til en kjørende prototype.",
      en: "Python/Django + JavaScript/Vue. User insight becomes a running prototype.",
    },
    requires: { allQuests: ["oslomet-pd"] },
    grantsSkills: ["deltakende-design", "grunnleggende-fullstack"],
    grantsArtifacts: ["pd-app-frontend", "pd-app-backend"],
    nextHint: {
      no: "Ta forløperen tilbake til OsloMet — masteren venter.",
      en: "Take the precursor back to OsloMet — the master's awaits.",
    },
    guides: [
      { map: "town", target: "home", kind: "go" },
      { map: "home", at: { x: 8, y: 2 }, kind: "deliver" },
    ],
  },
  {
    id: "oslomet-master",
    order: 6,
    title: { no: "Masteroppgaven", en: "The master's thesis" },
    objective: {
      no: "Snakk med veilederen om masteroppgaven.",
      en: "Talk to the supervisor about the master's thesis.",
    },
    intro: {
      no: "Master i digital læringsdesign. Nå: fra forløper til Klar, sammen med lærerne.",
      en: "Master in digital learning design. Now: from precursor to Klar, together with the teachers.",
    },
    requires: { allQuests: ["pd-app-bygg"] },
    grantsSkills: [],
    grantsArtifacts: [],
    unlocks: ["workshop"],
    nextHint: {
      no: "Skolens workshop-inngang er åpen. Hent lærerinnsikter.",
      en: "The school's workshop entrance is open. Gather teacher insights.",
    },
    guides: [{ map: "oslomet", at: { x: 6, y: 4 }, kind: "start" }],
  },
  {
    id: "laererworkshop",
    order: 7,
    title: { no: "Lærerworkshop", en: "Teacher workshop" },
    objective: {
      no: "Hent lærerinnsikter i workshoprommet på skolen.",
      en: "Gather teacher insights in the school workshop room.",
    },
    intro: {
      no: "Design SAMMEN med lærerne: behov → friksjon → designprinsipp.",
      en: "Design WITH the teachers: needs → friction → design principle.",
    },
    requires: { allQuests: ["oslomet-master"] },
    grantsSkills: ["forskningsbasert-design"],
    grantsArtifacts: ["master-oslomet", "klar-prototype"],
    nextHint: {
      no: "Reisen peker videre mot DNB.",
      en: "The journey points onward to DNB.",
    },
    guides: [
      { map: "town", at: { x: 9, y: 21 }, kind: "go" },
      { map: "workshop", target: "ws-board", kind: "deliver" },
    ],
  },
  {
    id: "portefolje",
    order: 8,
    title: { no: "DNB-porteføljen", en: "The DNB portfolio" },
    objective: {
      no: "Bygg DNB-porteføljesiden hjemme ved PC-en.",
      en: "Build the DNB portfolio site at home.",
    },
    intro: {
      no: "Kari tipset om DNB. Nå: gjør alt du har bygget om til én ærlig søknad.",
      en: "Kari mentioned DNB. Now: turn everything you've built into one honest application.",
    },
    requires: { allQuests: ["laererworkshop"] },
    grantsSkills: ["agentisk-workflow"],
    grantsArtifacts: ["dnb-portefolje"],
    unlocks: ["dnb"],
    nextHint: {
      no: "Med en komplett søknad åpner DNB-resepsjonen.",
      en: "With a complete application, the DNB reception opens.",
    },
    guides: [
      { map: "town", target: "home", kind: "go" },
      { map: "home", at: { x: 8, y: 2 }, kind: "deliver" },
    ],
  },
  {
    id: "lever-soknad",
    order: 9,
    title: { no: "Lever søknaden", en: "Deliver the application" },
    objective: {
      no: "Gå inn i DNB-resepsjonen og lever søknaden.",
      en: "Enter the DNB reception and deliver the application.",
    },
    requires: { allQuests: ["portefolje"] },
    grantsSkills: [],
    grantsArtifacts: [],
    nextHint: {
      no: "DNB-bygget står nord i byen.",
      en: "The DNB building stands to the north.",
    },
    guides: [
      { map: "town", target: "dnb", kind: "go" },
      { map: "dnb", target: "dnb-deliver", kind: "deliver" },
    ],
  },
  {
    id: "nikko-sidequest",
    order: 90,
    title: { no: "Nikkos idé", en: "Nikko's idea" },
    objective: {
      no: "Valgfritt: hjelp Nikko med companion-appen.",
      en: "Optional: help Nikko with the companion app.",
    },
    requires: { always: true },
    grantsSkills: ["flutter-dart", "lokal-first"],
    grantsArtifacts: ["nikkoprogging"],
    guides: [{ map: "town", target: "nikko", kind: "start" }],
  },
];
