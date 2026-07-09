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
    guides: [
      { map: "town", target: "oslomet", kind: "go" },
      { map: "oslomet", at: { x: 6, y: 4 }, kind: "start" },
    ],
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
      no: "Master i digitalt læringsdesign. Nå: fra forløper til Klar, sammen med lærerne.",
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
    guides: [
      { map: "town", target: "oslomet", kind: "go" },
      { map: "oslomet", at: { x: 6, y: 4 }, kind: "start" },
    ],
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
      no: "Nikko har en idé han vil bygge. Reisen peker hjem til huset hans.",
      en: "Nikko has an idea he wants to build. The journey points to his house.",
    },
    guides: [
      { map: "town", at: { x: 9, y: 21 }, kind: "go" },
      { map: "workshop", target: "ws-board", kind: "deliver" },
    ],
  },
  {
    id: "portefolje",
    order: 9,
    title: { no: "Porteføljen", en: "The portfolio" },
    objective: {
      no: "Bygg porteføljesiden hjemme ved PC-en.",
      en: "Build the portfolio site at home.",
    },
    intro: {
      no: "Nå: gjør alt du har bygget — fra Ordkryss til Klar og Nikkos app — om til én ærlig søknad.",
      en: "Now: turn everything you've built — from Ordkryss to Klar and Nikko's app — into one honest application.",
    },
    requires: { allQuests: ["nikko"] },
    grantsSkills: ["agentisk-workflow"],
    grantsArtifacts: ["portefoljeside"],
    unlocks: ["drommejobben"],
    nextHint: {
      no: "Med en komplett søknad åpner resepsjonen i Drømmejobben.",
      en: "With a complete application, the reception at Drømmejobben opens.",
    },
    guides: [
      { map: "town", target: "home", kind: "go" },
      { map: "home", at: { x: 8, y: 2 }, kind: "deliver" },
    ],
  },
  {
    id: "lever-soknad",
    order: 10,
    title: { no: "Lever søknaden", en: "Deliver the application" },
    objective: {
      no: "Gå inn i Drømmejobben og lever søknaden.",
      en: "Enter Drømmejobben and deliver the application.",
    },
    requires: { allQuests: ["portefolje"] },
    grantsSkills: [],
    grantsArtifacts: [],
    nextHint: {
      no: "Drømmejobben ligger nord i byen.",
      en: "Drømmejobben stands to the north.",
    },
    guides: [
      { map: "town", target: "drommejobben", kind: "go" },
      { map: "drommejobben", target: "deliver-soknad", kind: "deliver" },
    ],
  },
  {
    id: "nikko",
    order: 8,
    title: { no: "Nikkos idé", en: "Nikko's idea" },
    objective: {
      no: "Gå hjem til Nikko og sett deg ved maskinen ved siden av ham.",
      en: "Go to Nikko's and take the seat at the machine next to him.",
    },
    intro: {
      no: "Nikko vil lage en app som hjelper vennene hans som er nevrodivergente med hverdagsoppgaver. Dere bygger den sammen.",
      en: "Nikko wants to build an app that helps his neurodivergent friends with everyday tasks. You build it together.",
    },
    requires: { allQuests: ["laererworkshop"] },
    grantsSkills: ["flutter-dart", "lokal-first"],
    grantsArtifacts: ["nikkoprogging"],
    nextHint: {
      no: "Nå: samle alt i én ærlig søknad hjemme ved PC-en.",
      en: "Now: gather it all into one honest application at home.",
    },
    guides: [
      { map: "town", target: "nikko", kind: "go" },
      { map: "nikko-house", target: "nikko-station", kind: "start" },
    ],
  },
];
