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
      no: "Hjem er nedover veien. Ordkryss venter.",
      en: "Home is down the road. Ordkryss is waiting.",
    },
  },
  {
    id: "til-oslomet",
    order: 3,
    title: { no: "Mot OsloMet", en: "Toward OsloMet" },
    objective: { no: "Neste: dra til OsloMet.", en: "Next: head to OsloMet." },
    // Handoff pointer — stays active for the rest of this slice (chain deferred).
    requires: { allQuests: ["hjem-til-ordkryss"] },
    grantsSkills: [],
    grantsArtifacts: [],
    nextHint: {
      no: "OsloMet ligger oppover veien. Det kan være verdt en tur.",
      en: "OsloMet is up the road. It might be worth a visit.",
    },
  },
];
