import type { Quest } from "../state/types";

// The quest chain. Each zone is a station in a symbolic competence world.
// Copy is deliberately truthful and claim-safe: foundations and growth, never
// senior/distributed-systems mastery, never student-outcome claims, and Klar is
// always framed as a robust prototype evaluated with teachers.
export const QUESTS: Quest[] = [
  {
    id: "teacher",
    order: 1,
    kicker: { no: "Sone 01", en: "Zone 01" },
    title: { no: "Lærer & Needfinding", en: "Teacher & Needfinding" },
    intro: {
      no: "Alt starter her. Et ekte klasserom, ekte behov, ekte rot. Før koden kommer mennesket.",
      en: "It all starts here. A real classroom, real needs, real mess. Before the code comes the human.",
    },
    objective: {
      no: "Finn det første ekte behovet i klasserommet.",
      en: "Find the first real need in the classroom.",
    },
    body: {
      no: [
        "Læringsreisen min starter ikke fra et CS-studium, men fra et klasserom.",
        "Jeg brukte programmering som lærer: micro:bit og Kitronik-elektronikk, og små opplegg i Python og JavaScript/HTML/CSS.",
        "Her lærte jeg å se et behov før jeg foreslår en løsning — needfinding, problemramme­setting og undervisningsdesign.",
        "Det er denne vanen som senere gjør at jeg bygger ut fra ekte behov, ikke innbilte krav.",
      ],
      en: [
        "My learning journey doesn't start from a CS degree, but from a classroom.",
        "I used programming as a teacher: micro:bit and Kitronik electronics, and small exercises in Python and JavaScript/HTML/CSS.",
        "This is where I learned to see a need before proposing a solution — needfinding, problem framing and teaching design.",
        "That habit is what later makes me build from real needs, not imagined requirements.",
      ],
    },
    requires: [],
    grantsSkills: [
      "needfinding",
      "classroom-insight",
      "problem-framing",
      "teaching-design",
    ],
    grantsArtifacts: ["teacher-note"],
    position: [-12, -6],
    color: "#f2a65a",
  },
  {
    id: "cs50x",
    order: 2,
    kicker: { no: "Sone 02", en: "Zone 02" },
    title: { no: "CS50x Foundation-lab", en: "CS50x Foundation lab" },
    intro: {
      no: "Grunnmuren. Ikke en grad — men stein for stein, fra C til web. Sett deg ned ved terminalen.",
      en: "The foundation. Not a degree — but piece by piece, from C to the web. Sit down at the terminal.",
    },
    objective: {
      no: "Bygg programmerings­grunnmuren med CS50x.",
      en: "Build the programming foundation with CS50x.",
    },
    body: {
      no: [
        "Jeg er ikke utdannet programmerer. Grunnlaget har jeg bygget stein for stein.",
        "Gjennom Harvards CS50x lærte jeg C, Python, SQL og webfundamentene HTML, CSS og JavaScript.",
        "Dette er foundational læring — en ærlig grunnmur, ikke en CS-grad og ikke ekspertnivå.",
        "Sertifikatet er offentlig verifiserbart. Python og JavaScript sitter løsest i hendene i dag.",
      ],
      en: [
        "I'm not a formally trained programmer. I've built the foundation piece by piece.",
        "Through Harvard's CS50x I learned C, Python, SQL and the web basics HTML, CSS and JavaScript.",
        "This is foundational learning — an honest base, not a CS degree and not expert level.",
        "The certificate is publicly verifiable. Python and JavaScript are the most familiar in my hands today.",
      ],
    },
    requires: [],
    grantsSkills: [
      "cs-foundations",
      "c-basics",
      "python-basics",
      "js-basics",
      "sql-basics",
      "web-fundamentals",
    ],
    grantsArtifacts: ["cs50-cert"],
    position: [12, -10],
    color: "#6aa6ee",
  },
  {
    id: "participatory-design",
    order: 3,
    kicker: { no: "Sone 03", en: "Zone 03" },
    title: {
      no: "Participatory Design-verksted",
      en: "Participatory Design workshop",
    },
    intro: {
      no: "Her bygger vi med folk, ikke for dem. Lærere som meddesignere. Lapper på veggen, ikke gjetning.",
      en: "Here we build with people, not for them. Teachers as co-designers. Notes on the wall, not guesswork.",
    },
    objective: {
      no: "Lær å bygge med ekte brukere og behov.",
      en: "Learn to build with real users and needs.",
    },
    body: {
      no: [
        "Participatory Design er både en eksaminert metode i masteroppgaven og et karaktersatt masterfag.",
        "Konkret prosess: empatikart og personas, Crazy Eights og dot-voting, og scenariebasert journey mapping.",
        "Skalaen er liten og ikke-representativ med vilje — verdien ligger i overførbare prinsipper, ikke statistikk.",
        "Dette låser opp evnen til å bygge ut fra faktiske behov, ikke innbilte krav.",
      ],
      en: [
        "Participatory design is both an examined method in the thesis and a graded master's course.",
        "Concrete process: empathy maps and personas, Crazy Eights and dot-voting, and scenario-based journey mapping.",
        "The scale is deliberately small and non-representative — the value is transferable principles, not statistics.",
        "This unlocks the ability to build from actual needs, not imagined requirements.",
      ],
    },
    requires: [],
    grantsSkills: [
      "participatory-design",
      "co-design",
      "design-thinking",
      "workshop-methods",
      "needs-synthesis",
    ],
    grantsArtifacts: ["pd-method"],
    position: [-22, -22],
    color: "#7ad1c0",
  },
  {
    id: "pd-app",
    order: 4,
    kicker: { no: "Sone 04", en: "Zone 04" },
    title: { no: "PD-app prototype-lab", en: "PD-app prototype lab" },
    intro: {
      no: "Forløperen til Klar. To kodebaser, én idé. Her ble frontend og backend ekte for første gang.",
      en: "The predecessor to Klar. Two codebases, one idea. Here frontend and backend first became real.",
    },
    objective: {
      no: "Bygg den første fullstack-prototypen — forløperen til Klar.",
      en: "Build the first fullstack prototype — the predecessor to Klar.",
    },
    body: {
      no: [
        "Dette prosjektet var forløperen til Klar, gjennomført med elever som meddesignere.",
        "Frontend ble bygget i JavaScript/Vue, backend i Python/Django.",
        "Her lærte jeg frontend/backend-splitten i praksis — to deler som må snakke sammen.",
        "Det er en tidlig prototype, ikke et ferdig produkt. Men det er her broen mot Klar begynner.",
      ],
      en: [
        "This project was the predecessor to Klar, carried out with pupils as co-designers.",
        "The frontend was built in JavaScript/Vue, the backend in Python/Django.",
        "Here I learned the frontend/backend split in practice — two parts that must talk to each other.",
        "It's an early prototype, not a finished product. But this is where the bridge to Klar begins.",
      ],
    },
    requires: ["cs-foundations", "participatory-design"],
    grantsSkills: ["fullstack-split", "django", "vue"],
    grantsArtifacts: ["pd-frontend", "pd-backend"],
    position: [2, -26],
    color: "#9b8cff",
    gateHint: {
      no: "Krever Programmerings­grunnmur + Participatory Design.",
      en: "Requires Programming foundation + Participatory design.",
    },
  },
  {
    id: "design-science",
    order: 5,
    kicker: { no: "Sone 05", en: "Zone 05" },
    title: { no: "Design Science-porten", en: "Design Science gate" },
    intro: {
      no: "Hvorfor er dette en god løsning? Bevis det. Bygg, evaluer, begrunn — ikke bare lag.",
      en: "Why is this a good solution? Prove it. Build, evaluate, justify — don't just make.",
    },
    objective: {
      no: "Koble problem, artefakt og evaluering med design science.",
      en: "Connect problem, artifact and evaluation with design science.",
    },
    body: {
      no: [
        "Design science gir disiplinen: bygg, evaluer, teoretiser og begrunn.",
        "Artefaktet er en instantiering — en realisert, kjørende ting som viser at noe er mulig.",
        "Det framstilles som et begrunnet designforslag, ikke som en ferdig plattform.",
        "Denne porten låser opp masterprosjektet: Klar.",
      ],
      en: [
        "Design science provides the discipline: build, evaluate, theorise and justify.",
        "The artifact is an instantiation — a realised, running thing that shows feasibility.",
        "It is framed as a justified design proposal, not as a finished platform.",
        "This gate unlocks the master project: Klar.",
      ],
    },
    requires: ["participatory-design"],
    grantsSkills: [
      "design-science",
      "build-evaluate-justify",
      "artifact-thinking",
    ],
    grantsArtifacts: ["design-science-frame"],
    position: [24, -26],
    color: "#5ad1f0",
    gateHint: {
      no: "Krever Participatory Design.",
      en: "Requires Participatory design.",
    },
  },
  {
    id: "klar",
    order: 6,
    kicker: { no: "Sone 06", en: "Zone 06" },
    title: { no: "Klar / Smart Import-lab", en: "Klar / Smart Import lab" },
    intro: {
      no: "Masterartefaktet. En ekte fullstack-PWA. Mat et ukebrev inn i Smart Import-maskinen — men husk hvem som har ansvaret.",
      en: "The master artifact. A real fullstack PWA. Feed a weekly letter into the Smart Import machine — but remember who's responsible.",
    },
    objective: {
      no: "Kjør Smart Import — og godkjenn før du publiserer.",
      en: "Run Smart Import — and approve before you publish.",
    },
    body: {
      no: [
        "Klar er masterartefaktet: en responsiv fullstack-PWA i nettleseren, med tydelige lærer- og elevroller.",
        "Stack: React/Next.js i frontend, Supabase/PostgreSQL i backend, auth + rollebasert tilgang.",
        "Smart Import er den sterkeste AI-først-historien: en AI leser et vanlig ukebrev og foreslår timeplan, oppgaver, fag og klasser.",
        "Alt er redigerbart i en forhåndsvisning før publisering — menneske-i-løkka er innebygd. Ingenting går ut automatisk.",
        "Klar er en robust prototype, evaluert med lærere. Det er ikke en enterprise-plattform, og den er ikke testet med elever.",
      ],
      en: [
        "Klar is the master artifact: a responsive fullstack PWA in the browser, with clear teacher and student roles.",
        "Stack: React/Next.js frontend, Supabase/PostgreSQL backend, auth + role-based access.",
        "Smart Import is the strongest AI-first story: an AI reads an ordinary weekly letter and proposes timetable, tasks, subjects and classes.",
        "Everything is editable in a preview before publishing — human-in-the-loop is built in. Nothing goes out automatically.",
        "Klar is a robust prototype, evaluated with teachers. It is not an enterprise platform, and it was not tested with students.",
      ],
    },
    requires: ["fullstack-split", "design-science"],
    grantsSkills: [
      "ai-first-fullstack",
      "react-next",
      "supabase-postgres",
      "auth-roles",
      "smart-import",
      "human-in-the-loop",
    ],
    grantsArtifacts: ["klar-live", "klar-repo", "smart-import-artifact"],
    position: [-16, -42],
    color: "#6ee7a8",
    gateHint: {
      no: "Krever Frontend/backend-splitt + Design Science.",
      en: "Requires Frontend/backend split + Design science.",
    },
    mission: {
      kind: "smart-import",
      setup: {
        no: "Maskinen har lest et ukebrev og foreslår en strukturert timeplan med oppgaver. Hva gjør du?",
        en: "The machine has read a weekly letter and proposes a structured timetable with tasks. What do you do?",
      },
      prompt: {
        no: "SMART IMPORT: «Jeg har tolket ukebrevet og laget 12 oppgaver, 4 fag og en timeplan. Klar til å sende til alle elever.»",
        en: "SMART IMPORT: \u201cI've parsed the weekly letter and created 12 tasks, 4 subjects and a timetable. Ready to send to all students.\u201d",
      },
      options: [
        {
          id: "publish",
          label: {
            no: "Publiser direkte til elevene",
            en: "Publish straight to the students",
          },
          correct: false,
          tag: { no: "Guardrail utløst", en: "Guardrail triggered" },
          feedback: {
            no: "Stopp. AI-en kan ha mistolket noe, og dette er elevdata. Uten en menneskelig godkjenning kan feil eller sensitiv info flyte rett ut. Det er nettopp dette forhåndsvisningen finnes for.",
            en: "Stop. The AI may have misread something, and this is student data. Without human approval, errors or sensitive info can flow straight out. This is exactly what the preview exists for.",
          },
        },
        {
          id: "review",
          label: {
            no: "Forhåndsvis, rett opp, og godkjenn først",
            en: "Preview, correct, then approve first",
          },
          correct: true,
          tag: { no: "Menneske-i-løkka", en: "Human-in-the-loop" },
          feedback: {
            no: "Riktig. Du går gjennom forslaget, retter det AI-en bommet på, og godkjenner bevisst før publisering. Læreren beholder kontroll og ansvar — AI-en er en assistent, ikke en autopilot.",
            en: "Correct. You review the proposal, fix what the AI got wrong, and deliberately approve before publishing. The teacher keeps control and responsibility — the AI is an assistant, not an autopilot.",
          },
        },
        {
          id: "delete",
          label: {
            no: "Slett alt — AI er for skummelt",
            en: "Delete everything — AI is too scary",
          },
          correct: false,
          tag: { no: "Overkorreksjon", en: "Over-correction" },
          feedback: {
            no: "Litt for forsiktig. Poenget er ikke å unngå AI, men å sette en kontrollert gate rundt den. Verktøyet løste en ekte flaskehals — det fortjener en forhåndsvisning, ikke en sletteknapp.",
            en: "A touch too cautious. The point isn't to avoid AI, but to put a controlled gate around it. The tool solved a real bottleneck — it deserves a preview, not a delete button.",
          },
        },
      ],
    },
  },
  {
    id: "agentic",
    order: 7,
    kicker: { no: "Sone 07", en: "Zone 07" },
    title: {
      no: "Agentisk arbeidsflyt-verksted",
      en: "Agentic Workflow workshop",
    },
    intro: {
      no: "En AI-agent vil hjelpe. Veldig gjerne. Litt for gjerne. Din jobb: gi den rammer den kan stole på.",
      en: "An AI agent wants to help. Very eagerly. A bit too eagerly. Your job: give it boundaries it can trust.",
    },
    objective: {
      no: "Temm agenten med kontekst, krav, review og QA.",
      en: "Tame the agent with context, requirements, review and QA.",
    },
    body: {
      no: [
        "Jeg bruker AI-agenter som utviklingspartnere — med klare krav, review-looper og aktiv korreksjon.",
        "Arbeidsflyten er dokumentert på tvers av repoer: PROJECT_DNA, FILE_TREE, TECH_DEBT, QA-sjekklister og handoff-protokoller.",
        "Disse dokumentene er ikke pynt — de er selve beviset på arbeidsformen, levende artefakter i repoene.",
        "Den riktige bevegelsen er ikke «mer agent», men «agent innenfor rammer»: kontekst, krav, review, korreksjon, QA og overlevering.",
        "Dette er en disiplinert solo-arbeidsflyt, designet for å kunne deles og læres i et team.",
      ],
      en: [
        "I use AI agents as development partners — with clear requirements, review loops and active correction.",
        "The workflow is documented across repos: PROJECT_DNA, FILE_TREE, TECH_DEBT, QA checklists and handoff protocols.",
        "These documents aren't decoration — they are the evidence of the way of working, living artifacts in the repos.",
        "The right move isn't \u201cmore agent\u201d, but \u201cagent within boundaries\u201d: context, requirements, review, correction, QA and handoff.",
        "This is a disciplined solo workflow, designed to be shared and learned in a team.",
      ],
    },
    requires: ["ai-first-fullstack"],
    grantsSkills: [
      "agentic-engineering",
      "copilot-partner",
      "context-discipline",
      "qa-handoff",
      "claim-boundaries",
    ],
    grantsArtifacts: ["agentic-dna"],
    position: [16, -46],
    color: "#b58cff",
    gateHint: {
      no: "Krever AI-først fullstack-bygging (Klar).",
      en: "Requires AI-first fullstack building (Klar).",
    },
    mission: {
      kind: "agentic",
      setup: {
        no: "Agenten er ivrig og foreslår noe stort. Overclaim-monsteret våkner i bakgrunnen. Hva svarer du?",
        en: "The agent is eager and proposes something big. The Overclaim Monster stirs in the background. How do you respond?",
      },
      prompt: {
        no: "AGENT: «La oss skrive om master-branchen, rebygge alt som en distribuert plattform, og deploye rett til prod. Jeg fikser alt selv, uten review — det går kjempefort!»",
        en: "AGENT: \u201cLet's rewrite the master branch, rebuild everything as a distributed platform, and deploy straight to prod. I'll do it all myself, no review — super fast!\u201d",
      },
      options: [
        {
          id: "yolo",
          label: {
            no: "Kjør på! Mer agent, mindre review.",
            en: "Go for it! More agent, less review.",
          },
          correct: false,
          tag: {
            no: "Scope Creep Slime vokser",
            en: "Scope Creep Slime grows",
          },
          feedback: {
            no: "Og dermed vokste Scope Creep Slime seg dobbelt så stor. Å rebygge alt som en distribuert plattform er ikke der jeg er — det er en vekstretning, ikke en quick win. Master skal dessuten ikke røres.",
            en: "And so the Scope Creep Slime grew twice as large. Rebuilding everything as a distributed platform isn't where I am — that's a growth direction, not a quick win. Also: don't touch master.",
          },
        },
        {
          id: "discipline",
          label: {
            no: "Gi kontekst, krav, review og QA — og hold scope.",
            en: "Give context, requirements, review and QA — and hold scope.",
          },
          correct: true,
          tag: {
            no: "Overclaim-monsteret beseiret",
            en: "Overclaim Monster defeated",
          },
          feedback: {
            no: "Riktig. Du gir agenten kontekst og krav, krever review og QA, og holder deg til et trygt scope. Overclaim-monsteret krymper. Distribuerte systemer er noe jeg er motivert for å vokse inn i — ikke noe jeg påstår å mestre i dag.",
            en: "Correct. You give the agent context and requirements, demand review and QA, and keep a safe scope. The Overclaim Monster shrinks. Distributed systems are something I'm motivated to grow into — not something I claim to master today.",
          },
        },
        {
          id: "ignore",
          label: {
            no: "Ignorer agenten helt, kod alt for hånd.",
            en: "Ignore the agent entirely, hand-code everything.",
          },
          correct: false,
          tag: { no: "Poenget mistet", en: "Missing the point" },
          feedback: {
            no: "Da mister du fordelen. Poenget er ikke å droppe agenten, men å bruke den innenfor rammer: krav, review, korreksjon, QA og overlevering. Partner, ikke autopilot — og ikke noe du gjemmer bort.",
            en: "Then you lose the advantage. The point isn't to drop the agent, but to use it within boundaries: requirements, review, correction, QA and handoff. A partner, not an autopilot — and not something you hide from.",
          },
        },
      ],
    },
  },
];

export const QUEST_BY_ID = new Map(QUESTS.map((q) => [q.id, q]));
