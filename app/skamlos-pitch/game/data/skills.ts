import type { Skill } from "../state/types";

// Skill registry. Quests grant these on completion; gates check for them.
// Keep labels honest: foundations and growth, never senior/expert claims.
export const SKILLS: Skill[] = [
  // Teacher / Needfinding
  {
    id: "needfinding",
    label: { no: "Needfinding", en: "Needfinding" },
    group: "design",
    glyph: "🔎",
  },
  {
    id: "classroom-insight",
    label: { no: "Klasseromsinnsikt", en: "Classroom insight" },
    group: "design",
    glyph: "🏫",
  },
  {
    id: "problem-framing",
    label: { no: "Problemramme­setting", en: "Problem framing" },
    group: "design",
    glyph: "🧩",
  },
  {
    id: "teaching-design",
    label: { no: "Undervisningsdesign", en: "Teaching design" },
    group: "design",
    glyph: "✏️",
  },

  // CS50x Foundation
  {
    id: "cs-foundations",
    label: { no: "Programmerings­grunnmur", en: "Programming foundation" },
    group: "foundation",
    glyph: "🧱",
  },
  {
    id: "c-basics",
    label: { no: "C-grunnlag", en: "C basics" },
    group: "foundation",
    glyph: "🔧",
  },
  {
    id: "python-basics",
    label: { no: "Python-grunnlag", en: "Python basics" },
    group: "foundation",
    glyph: "🐍",
  },
  {
    id: "js-basics",
    label: { no: "JavaScript-grunnlag", en: "JavaScript basics" },
    group: "foundation",
    glyph: "📜",
  },
  {
    id: "sql-basics",
    label: { no: "SQL-grunnlag", en: "SQL basics" },
    group: "foundation",
    glyph: "🗃️",
  },
  {
    id: "web-fundamentals",
    label: {
      no: "Web­fundamenter (HTML/CSS)",
      en: "Web fundamentals (HTML/CSS)",
    },
    group: "foundation",
    glyph: "🌐",
  },

  // Participatory Design
  {
    id: "participatory-design",
    label: { no: "Participatory Design", en: "Participatory design" },
    group: "design",
    glyph: "🤝",
  },
  {
    id: "co-design",
    label: { no: "Meddesign", en: "Co-design" },
    group: "design",
    glyph: "👥",
  },
  {
    id: "design-thinking",
    label: { no: "Design thinking", en: "Design thinking" },
    group: "design",
    glyph: "💡",
  },
  {
    id: "workshop-methods",
    label: { no: "Workshop-metoder", en: "Workshop methods" },
    group: "design",
    glyph: "📋",
  },
  {
    id: "needs-synthesis",
    label: { no: "Behovssyntese", en: "Needs synthesis" },
    group: "design",
    glyph: "🧪",
  },

  // PD-app Prototype
  {
    id: "fullstack-split",
    label: { no: "Frontend/backend-splitt", en: "Frontend/backend split" },
    group: "fullstack",
    glyph: "🔀",
  },
  {
    id: "django",
    label: { no: "Python / Django", en: "Python / Django" },
    group: "fullstack",
    glyph: "🎸",
  },
  {
    id: "vue",
    label: { no: "JavaScript / Vue", en: "JavaScript / Vue" },
    group: "fullstack",
    glyph: "💚",
  },

  // Design Science
  {
    id: "design-science",
    label: { no: "Design Science", en: "Design science" },
    group: "design",
    glyph: "🔬",
  },
  {
    id: "build-evaluate-justify",
    label: { no: "Bygg → evaluer → begrunn", en: "Build → evaluate → justify" },
    group: "design",
    glyph: "♻️",
  },
  {
    id: "artifact-thinking",
    label: { no: "Artefakt-tenkning", en: "Artifact thinking" },
    group: "design",
    glyph: "📐",
  },

  // Klar / Smart Import
  {
    id: "ai-first-fullstack",
    label: {
      no: "AI-først fullstack-bygging",
      en: "AI-first fullstack building",
    },
    group: "ai",
    glyph: "⚡",
  },
  {
    id: "react-next",
    label: { no: "React / Next.js", en: "React / Next.js" },
    group: "fullstack",
    glyph: "⚛️",
  },
  {
    id: "supabase-postgres",
    label: { no: "Supabase / PostgreSQL", en: "Supabase / PostgreSQL" },
    group: "fullstack",
    glyph: "🐘",
  },
  {
    id: "auth-roles",
    label: { no: "Auth + rollestyring", en: "Auth + role access" },
    group: "fullstack",
    glyph: "🔐",
  },
  {
    id: "smart-import",
    label: { no: "Smart Import (AI-parsing)", en: "Smart Import (AI parsing)" },
    group: "ai",
    glyph: "📥",
  },
  {
    id: "human-in-the-loop",
    label: { no: "Menneske-i-løkka", en: "Human-in-the-loop" },
    group: "ai",
    glyph: "🧑‍⚖️",
  },

  // Agentic Workflow
  {
    id: "agentic-engineering",
    label: { no: "Agentisk engineering", en: "Agentic engineering" },
    group: "craft",
    glyph: "🛠️",
  },
  {
    id: "copilot-partner",
    label: {
      no: "AI-agent som utviklingspartner",
      en: "AI agent as dev partner",
    },
    group: "ai",
    glyph: "🤖",
  },
  {
    id: "context-discipline",
    label: {
      no: "Kontekst- og kravdisiplin",
      en: "Context & requirement discipline",
    },
    group: "craft",
    glyph: "🎯",
  },
  {
    id: "qa-handoff",
    label: { no: "QA og overlevering", en: "QA & handoff" },
    group: "craft",
    glyph: "✅",
  },
  {
    id: "claim-boundaries",
    label: { no: "Claim-grenser", en: "Claim boundaries" },
    group: "craft",
    glyph: "🚧",
  },
];

export const SKILL_BY_ID = new Map(SKILLS.map((s) => [s.id, s]));
