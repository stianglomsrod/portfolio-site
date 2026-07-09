import type { Artifact } from "../../engine/types";
import prosjekter from "../../../../data/prosjekter.json";

// Public, verified evidence. Each artifact carries an honest boundary line.
// Én sannhet (Done 22): lenker og faktabeskrivelser leses fra samme
// datakilde som siden — spillet kan ikke drifte fra porteføljen.
export const artifacts: Artifact[] = [
  {
    id: "cs50x-cert",
    title: { no: "CS50x-sertifikat", en: "CS50x certificate" },
    description: {
      no: prosjekter.cs50x.beskrivelse,
      en: "Harvard's CS50x — programming fundamentals.",
    },
    kind: "cert",
    href: prosjekter.cs50x.sertifikat,
    linkLabel: { no: "Åpne sertifikatet", en: "Open the certificate" },
  },
  {
    id: "ordkryss-video",
    title: { no: "Ordkryss – demo", en: "Ordkryss – demo" },
    description: {
      no: "CS50x-sluttprosjektet: et kryssord som genereres og fylles ut.",
      en: "The CS50x final project: a crossword that is generated and filled in.",
    },
    kind: "video",
    href: prosjekter.cs50x.ordkryssDemo,
    linkLabel: { no: "Se demoen", en: "Watch the demo" },
    boundary: {
      no: "Et lite, ekte studentprosjekt — ikke et produkt i drift.",
      en: "A small, real student project — not a production product.",
    },
  },
  {
    id: "master-oslomet",
    title: { no: "Mastergrad — OsloMet", en: "Master's degree — OsloMet" },
    description: {
      no: "Master i digitalt læringsdesign (MAIKT), OsloMet.",
      en: "Master in digital learning design (MAIKT), OsloMet.",
    },
    kind: "cert",
  },
  {
    id: "klar-prototype",
    title: { no: "Klar — masterprosjekt", en: "Klar — master's project" },
    description: {
      no: prosjekter.klar.beskrivelse,
      en: "Fullstack AI prototype, built as the master's project.",
    },
    kind: "concept",
  },
  {
    id: "laererworkshop",
    title: {
      no: "Lærerworkshop — journey map",
      en: "Teacher workshop — journey map",
    },
    description: {
      no: "Deltakende design med lærere: behov, friksjon og designgrep på ett journey map.",
      en: "Participatory design with teachers: needs, friction and design moves on one journey map.",
    },
    kind: "concept",
  },
  {
    id: "pd-app-frontend",
    title: { no: "Forløper: frontend (Vue)", en: "Precursor: frontend (Vue)" },
    description: {
      no: "Forløperprosjektet til Klar — frontend i JavaScript/Vue, med fremtidige brukere som meddesignere.",
      en: "The precursor to Klar — frontend in JavaScript/Vue, with future users as co-designers.",
    },
    kind: "repo",
    href: prosjekter.pdApp.frontend,
    linkLabel: { no: "Åpne repoet", en: "Open the repo" },
  },
  {
    id: "pd-app-backend",
    title: {
      no: "Forløper: backend (Django)",
      en: "Precursor: backend (Django)",
    },
    description: {
      no: "Forløperprosjektet til Klar — backend i Python/Django.",
      en: "The precursor to Klar — backend in Python/Django.",
    },
    kind: "repo",
    href: prosjekter.pdApp.backend,
    linkLabel: { no: "Åpne repoet", en: "Open the repo" },
  },
  {
    id: "portefoljeside",
    title: { no: "Porteføljeside", en: "Portfolio site" },
    description: {
      no: "Søknadssiden: posisjonering, Klar som hovedcase, arbeidsflyt som bevis — bygget med AI, styrt av meg.",
      en: "The application site: positioning, Klar as the lead case, workflow as evidence — built with AI, steered by me.",
    },
    kind: "live",
    href: "/",
    linkLabel: { no: "Åpne porteføljen", en: "Open the portfolio" },
  },
  {
    id: "nikkoprogging",
    title: { no: "Companion (nikkoprogging)", en: "Companion (nikkoprogging)" },
    description: {
      no: prosjekter.companion.beskrivelse,
      en: "Nikko's idea, built with an agentic workflow: local-first, documented, long-running.",
    },
    kind: "repo",
    href: prosjekter.companion.repo,
    linkLabel: { no: "Åpne repoet", en: "Open the repo" },
  },
];
