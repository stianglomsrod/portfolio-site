import type { Artifact } from "../state/types";

// Evidence artifacts. Only real, verified public links are used. "concept"
// artifacts deliberately have no URL — they represent methods/notes, not
// publishable assets, and must not imply more than the evidence supports.
export const ARTIFACTS: Artifact[] = [
  {
    id: "teacher-note",
    kind: "concept",
    title: { no: "Klasserom-kodelab", en: "Classroom coding lab" },
    description: {
      no: "Programmering brukt som lærer: micro:bit og Kitronik-elektronikk, og små opplegg i Python og JavaScript/HTML/CSS. Læringsreisen starter fra ekte behov i et klasserom.",
      en: "Programming used as a teacher: micro:bit and Kitronik electronics, plus small exercises in Python and JavaScript/HTML/CSS. The learning journey starts from real classroom needs.",
    },
    boundary: {
      no: "Undervisningserfaring, ikke en produktleveranse.",
      en: "Teaching experience, not a product delivery.",
    },
  },
  {
    id: "cs50-cert",
    kind: "cert",
    title: { no: "CS50x-sertifikat (Harvard)", en: "CS50x certificate (Harvard)" },
    description: {
      no: "Grunnmuren bygget stein for stein: C, Python, SQL og webfundamentene HTML, CSS og JavaScript. Foundational læring — ikke en CS-grad.",
      en: "The foundation built piece by piece: C, Python, SQL and the web basics HTML, CSS and JavaScript. Foundational learning — not a CS degree.",
    },
    href: "https://cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45",
    linkLabel: { no: "Verifiser sertifikatet", en: "Verify the certificate" },
    boundary: {
      no: "Grunnlag i programmering, ikke ekspertnivå.",
      en: "A programming foundation, not expert level.",
    },
  },
  {
    id: "pd-method",
    kind: "concept",
    title: { no: "Participatory Design-metode", en: "Participatory design method" },
    description: {
      no: "Meddesign med lærere som meddesignere: empatikart, Crazy Eights, dot-voting og scenariebasert journey mapping. Liten, ikke-representativ skala — verdien er overførbare prinsipper.",
      en: "Co-design with teachers as co-designers: empathy maps, Crazy Eights, dot-voting and scenario-based journey mapping. Small, non-representative scale — the value is transferable principles.",
    },
    boundary: {
      no: "Forskningsmetode på liten skala, ikke en effektstudie.",
      en: "Small-scale research method, not an effect study.",
    },
  },
  {
    id: "pd-frontend",
    kind: "repo",
    title: { no: "Forløperprosjekt: frontend (Vue)", en: "Predecessor project: frontend (Vue)" },
    description: {
      no: "Forløperen til Klar. Frontend bygget i JavaScript/Vue, sammen med elever som meddesignere.",
      en: "The project that preceded Klar. Frontend built in JavaScript/Vue, with pupils as co-designers.",
    },
    href: "https://github.com/stianglomsrod/pd-app-frontend",
    linkLabel: { no: "Åpne repo", en: "Open repo" },
    boundary: {
      no: "Tidlig prototype, ikke et ferdig produkt.",
      en: "An early prototype, not a finished product.",
    },
  },
  {
    id: "pd-backend",
    kind: "repo",
    title: { no: "Forløperprosjekt: backend (Django)", en: "Predecessor project: backend (Django)" },
    description: {
      no: "Backend bygget i Python/Django. Her ble frontend/backend-splitten ekte for første gang.",
      en: "Backend built in Python/Django. This is where the frontend/backend split first became real.",
    },
    href: "https://github.com/stianglomsrod/pd-app-backend",
    linkLabel: { no: "Åpne repo", en: "Open repo" },
    boundary: {
      no: "Tidlig prototype, ikke et ferdig produkt.",
      en: "An early prototype, not a finished product.",
    },
  },
  {
    id: "design-science-frame",
    kind: "concept",
    title: { no: "Design Science-rammeverk", en: "Design science frame" },
    description: {
      no: "Bygg, evaluer, teoretiser og begrunn — med artefaktet som en instantiering: en realisert, kjørende ting som viser at noe er mulig, framstilt som et begrunnet designforslag.",
      en: "Build, evaluate, theorise and justify — with the artifact as an instantiation: a realised, running thing that shows feasibility, framed as a justified design proposal.",
    },
    boundary: {
      no: "Et begrunnet designforslag, ikke en ferdig plattform.",
      en: "A justified design proposal, not a finished platform.",
    },
  },
  {
    id: "klar-live",
    kind: "live",
    title: { no: "Klar — live PWA", en: "Klar — live PWA" },
    description: {
      no: "Masterartefaktet: en responsiv fullstack-PWA i nettleseren, med lærer- og elevroller. React/Next.js i frontend, Supabase/PostgreSQL i backend, auth + rollebasert tilgang.",
      en: "The master artifact: a responsive fullstack PWA in the browser, with teacher and student roles. React/Next.js frontend, Supabase/PostgreSQL backend, auth + role-based access.",
    },
    href: "https://klar-sigma.vercel.app/",
    linkLabel: { no: "Åpne live-appen", en: "Open the live app" },
    boundary: {
      no: "Robust prototype, evaluert med lærere — ikke en enterprise-plattform, og ikke testet med elever.",
      en: "A robust prototype, evaluated with teachers — not an enterprise platform, and not tested with students.",
    },
  },
  {
    id: "klar-repo",
    kind: "repo",
    title: { no: "Klar — kildekode", en: "Klar — source code" },
    description: {
      no: "Repoet bak Klar, med PROJECT_DNA, FILE_TREE, CODE_AUDIT og TECH_DEBT — arkitektur og prosess dokumentert i åpent lende.",
      en: "The repo behind Klar, with PROJECT_DNA, FILE_TREE, CODE_AUDIT and TECH_DEBT — architecture and process documented in the open.",
    },
    href: "https://github.com/stianglomsrod/klar",
    linkLabel: { no: "Åpne repo", en: "Open repo" },
  },
  {
    id: "smart-import-artifact",
    kind: "concept",
    title: { no: "Smart Import-maskinen", en: "The Smart Import machine" },
    description: {
      no: "En AI leser et vanlig ukebrev og foreslår struktur: timeplan, oppgaver, fag og klasser. Alt er redigerbart i en forhåndsvisning før publisering — ingenting går ut automatisk. Læreren beholder kontroll og ansvar.",
      en: "An AI reads an ordinary weekly letter and proposes structure: timetable, tasks, subjects and classes. Everything is editable in a preview before publishing — nothing goes out automatically. The teacher keeps control and responsibility.",
    },
    boundary: {
      no: "Menneske-i-løkka er innebygd. Forhåndsvisningen er også en personvern- og feilkontroll-gate.",
      en: "Human-in-the-loop is built in. The preview doubles as a privacy and error-control gate.",
    },
  },
  {
    id: "agentic-dna",
    kind: "repo",
    title: { no: "Agentisk arbeidsflyt-DNA", en: "Agentic workflow DNA" },
    description: {
      no: "Dokumentert arbeidsflyt på tvers av repoer: PROJECT_DNA, FILE_TREE, TECH_DEBT, QA-sjekklister og handoff-protokoller. AI-agenter brukt med klare krav, review-looper og aktiv korreksjon.",
      en: "A documented workflow across repos: PROJECT_DNA, FILE_TREE, TECH_DEBT, QA checklists and handoff protocols. AI agents used with clear requirements, review loops and active correction.",
    },
    href: "https://github.com/stianglomsrod",
    linkLabel: { no: "Se repoene", en: "See the repos" },
    boundary: {
      no: "Disiplinert solo-arbeidsflyt, designet for å kunne deles i team.",
      en: "A disciplined solo workflow, designed to be shareable in a team.",
    },
  },
  {
    id: "companion-flutter",
    kind: "repo",
    title: { no: "Companion-app (Flutter/Dart)", en: "Companion app (Flutter/Dart)" },
    description: {
      no: "Et sideprosjekt i Flutter/Dart med local-first arkitektur, Drift + SQLite og tester. Bevis på vedvarende, dokumentert agentisk arbeidsflyt over tid — og nysgjerrighet på rolige, lokale systemer.",
      en: "A side project in Flutter/Dart with local-first architecture, Drift + SQLite and tests. Evidence of sustained, documented agentic workflow over time — and curiosity about calm, local systems.",
    },
    href: "https://github.com/stianglomsrod/nikkoprogging",
    linkLabel: { no: "Åpne repo", en: "Open repo" },
    boundary: {
      no: "Pågående sideprosjekt, ikke et lansert produkt.",
      en: "An ongoing side project, not a launched product.",
    },
  },
  {
    id: "laser-egg",
    kind: "concept",
    title: { no: "De Urimelige Søknaders Egg", en: "The Egg of Unreasonable Applications" },
    description: {
      no: "Legendarisk gjenstand. Noen søker på papir. Noen søker på et egg gravert med laser. Du valgte en spillbar kompetansesti. Alle tre er litt for mye — og det er liksom poenget.",
      en: "Legendary item. Some apply on paper. Some apply on an egg engraved with a laser. You chose a playable competence path. All three are slightly too much — which is sort of the point.",
    },
    boundary: {
      no: "Easter egg. Ærlig om at dette er en skamløs, men sann, pitch.",
      en: "Easter egg. Honest that this is a shameless, but truthful, pitch.",
    },
  },
];

export const ARTIFACT_BY_ID = new Map(ARTIFACTS.map((a) => [a.id, a]));
