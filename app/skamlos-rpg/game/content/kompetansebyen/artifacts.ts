import type { Artifact } from "../../engine/types";

// Public, verified evidence. Each artifact carries an honest boundary line.
export const artifacts: Artifact[] = [
  {
    id: "cs50x-cert",
    title: { no: "CS50x-sertifikat", en: "CS50x certificate" },
    description: {
      no: "Harvards CS50x — grunnleggende programmering.",
      en: "Harvard's CS50x — programming fundamentals.",
    },
    kind: "cert",
    href: "https://certificates.cs50.io/0e9210d1-86f5-445a-b4d6-46fad1a5fd45.pdf?size=letter",
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
    href: "https://youtu.be/tI5fU1aAAvI",
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
      no: "Master i digital læringsdesign (MAIKT), OsloMet.",
      en: "Master in digital learning design (MAIKT), OsloMet.",
    },
    kind: "cert",
  },
  {
    id: "klar-prototype",
    title: { no: "Klar — masterprosjekt", en: "Klar — master's project" },
    description: {
      no: "Fullstack AI-prototype, bygget som masterprosjekt.",
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
    href: "https://github.com/stianglomsrod/pd-app-frontend",
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
    href: "https://github.com/stianglomsrod/pd-app-backend",
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
      no: "Nikkos idé, bygget med agentisk arbeidsflyt: lokal-first, dokumentert, langvarig.",
      en: "Nikko's idea, built with an agentic workflow: local-first, documented, long-running.",
    },
    kind: "repo",
    href: "https://github.com/stianglomsrod/nikkoprogging",
    linkLabel: { no: "Åpne repoet", en: "Open the repo" },
  },
];
