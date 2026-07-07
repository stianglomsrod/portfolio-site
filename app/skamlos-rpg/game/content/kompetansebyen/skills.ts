import type { Skill } from "../../engine/types";

// Foundational programming skill rewarded by the Ordkryss minigame.
// CLAIM DISCIPLINE: CS50x covered C, Python, SQL, Flask, JavaScript and
// HTML/CSS / web fundamentals. Django belongs to LATER predecessor work, not
// CS50x — the log spans both, framed as a foundation, never "CS50x taught Django".
// This is foundational learning: not a CS degree, not expert level.
export const skills: Skill[] = [
  {
    id: "grunnleggende-programmering",
    label: {
      no: "Grunnleggende programmering",
      en: "Programming fundamentals",
    },
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
  {
    id: "forskningsbasert-design",
    label: {
      no: "Forskningsbasert designkompetanse",
      en: "Research-based design competence",
    },
    group: "design",
    glyph: "🎓",
    log: {
      no: [
        "Participatory design",
        "Digital læringsdesign",
        "Innovasjon & prototyping",
        "Prosjektledelse",
        "Vitenskapsteori & metode",
      ],
      en: [
        "Participatory design",
        "Digital learning design",
        "Innovation & prototyping",
        "Project management",
        "Philosophy of science & method",
      ],
    },
  },
  {
    id: "deltakende-design",
    label: { no: "Deltakende design", en: "Participatory design" },
    group: "design",
    glyph: "🧩",
    log: {
      no: [
        "Journey mapping",
        "Medvirkning med lærere",
        "Behov → designgrep",
        "Opt-in framfor tvang",
        "Hjelpekø",
      ],
      en: [
        "Journey mapping",
        "Participation with teachers",
        "Needs → design moves",
        "Opt-in over mandatory",
        "Help queue",
      ],
    },
  },
  {
    id: "grunnleggende-fullstack",
    label: { no: "Grunnleggende fullstack", en: "Fullstack fundamentals" },
    group: "fullstack",
    glyph: "🛠️",
    log: {
      no: [
        "Python/Django",
        "JavaScript/Vue",
        "Frontend + backend",
        "API-er",
        "Brukerbehov → funksjon",
      ],
      en: [
        "Python/Django",
        "JavaScript/Vue",
        "Frontend + backend",
        "APIs",
        "User needs → features",
      ],
    },
  },
  {
    id: "agentisk-workflow",
    label: { no: "Agentisk arbeidsflyt", en: "Agentic workflow" },
    group: "ai",
    glyph: "🤖",
    log: {
      no: [
        "AI som utviklingspartner",
        "Krav & rammer",
        "Review & QA",
        "Dokumentasjon & handoff",
        "Claim boundaries",
        "Portefølje som produkt",
      ],
      en: [
        "AI as a development partner",
        "Requirements & guardrails",
        "Review & QA",
        "Documentation & handoff",
        "Claim boundaries",
        "Portfolio as a product",
      ],
    },
  },
  {
    id: "flutter-dart",
    label: { no: "Flutter/Dart-nysgjerrighet", en: "Flutter/Dart curiosity" },
    group: "craft",
    glyph: "🦋",
    log: {
      no: [
        "Flutter/Dart",
        "Companion-app",
        "Cross-platform",
        "Nysgjerrig utforsking",
      ],
      en: [
        "Flutter/Dart",
        "Companion app",
        "Cross-platform",
        "Curious exploration",
      ],
    },
  },
  {
    id: "lokal-first",
    label: { no: "Lokal-first tenkning", en: "Local-first thinking" },
    group: "craft",
    glyph: "📦",
    log: {
      no: [
        "Lokal-first data",
        "Offline-tenkning",
        "Persistering med Drift/SQLite",
        "Langvarig, dokumentert arbeidsflyt",
      ],
      en: [
        "Local-first data",
        "Offline thinking",
        "Persistence with Drift/SQLite",
        "Long-running, documented workflow",
      ],
    },
  },
];
