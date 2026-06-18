// ---------------------------------------------------------------------------
// Single source of truth for all portfolio content.
// Edit text, links and lists here. The page reads everything from this file.
// Links wrapped in [brackets] are placeholders to fill in later.
//
// The site has two presentation modes (see ModeToggle):
//   - "professional": calm, application-ready (default)
//   - "agentic":      the "Skamløs AI-pitch" — a more expressive, AI-native pitch
// Mode-specific copy lives under `professional` / `agentic` keys below.
//
// NOTE: the internal key stays "agentic" on purpose (persistence + data-mode
// contract). Only the user-facing label changes. See the plan + running log:
//   docs/epics/EPIC_SKAMLOS_AI_PITCH.md
//   docs/AI_PITCH_LOG.md  (all agents must update this when touching the pitch)
// ---------------------------------------------------------------------------

export type Mode = "professional" | "agentic";

export type CaseTier = "primary" | "secondary";

export type PortfolioCase = {
  id: string;
  title: string;
  type: string;
  role?: string;
  tech?: string;
  link?: string;
  description: string[];
  bullets?: string[];
  /** Labels for the screenshot placeholder areas shown on the card. */
  screenshots?: string[];
  /** Relative emphasis among supporting cases. */
  tier?: CaseTier;
  /** Short, energetic one-liner shown in agentic pitch mode. */
  pitch?: string;
};

export const modeLabels: Record<Mode, { label: string; hint: string }> = {
  professional: { label: "Profesjonell", hint: "Rolig og søknadsklar" },
  agentic: { label: "Skamløs AI-pitch", hint: "AI-native, ærlig og energisk" },
};

export const hero = {
  name: "Stian Glomsrød",
  professional: {
    eyebrow: "Stian Glomsrød",
    tagline:
      "Brukerinvolvert design, AI-native prototyping og praktisk teknologisk problemløsning",
    intro:
      "Jeg arbeider i skjæringspunktet mellom brukerinnsikt, digital læringsdesign, AI-assistert prototyping og fungerende produktutvikling. Bakgrunnen min som lærer gjør at jeg ofte starter i konkrete problemer: Hva prøver brukeren faktisk å få til, hvor oppstår friksjonen, og hvordan kan teknologi gjøre situasjonen mer håndterbar?",
  },
  agentic: {
    eyebrow: "UX Designer-kandidat · tenker på VG X",
    tagline:
      "Jeg gjør uklare behov om til testbare produkter — med brukere og AI-agenter",
    intro:
      "Lærerbakgrunn, master i digital læringsdesign og en sterk hånd på agentiske AI-workflows. Jeg starter i ekte problemer, involverer brukere, og gjør ideer testbare raskt. Bytt gjerne mellom modusene øverst — samme person, to tonefall.",
  },
  // Primary call-to-action targets. Update href values as links become ready.
  primaryCta: { label: "Se hovedcaset Klar", href: "#klar" },
  secondaryCta: { label: "Min agentiske arbeidsform", href: "#workflow" },
};

export type KlarFacet = { label: string; text: string };

export const featuredCase: PortfolioCase & {
  summary: string;
  facets: KlarFacet[];
} = {
  id: "klar",
  title:
    "Klar — fungerende prototype for struktur, prioritering og autonomistøtte",
  type: "Masterprosjekt / fungerende webprototype",
  role: "Forskerdesigner, produktdesigner og agentisk utviklingsleder",
  tech: "React, Next.js, Supabase, PWA, AI-støttet utviklingsworkflow",
  link: "https://klar-sigma.vercel.app/",
  pitch:
    "Fra reelt klasseromsproblem til en fungerende PWA der AI er en bevisst produktbeslutning.",
  summary:
    "Klar støtter elever med eksekutive vansker i å strukturere og prioritere skolearbeid — bygget som en fungerende prototype, ikke bare et konsept.",
  facets: [
    {
      label: "Hva",
      text: "En PWA med to grensesnitt: ett for lærer og ett for elev. Smart Import lar AI tolke ukebrev og gjøre dem om til strukturerte oppgaver og timeplaner som kan redigeres før publisering.",
    },
    {
      label: "Hvorfor det betyr noe",
      text: "Elever med eksekutive vansker bruker mye energi på å holde oversikt. Klar flytter den kognitive belastningen fra eleven til et verktøy som støtter uten å stigmatisere.",
    },
    {
      label: "Min rolle",
      text: "Forskerdesigner, produktdesigner og agentisk utviklingsleder — fra behovsinnsikt og deltakende design med lærere som meddesignere til selve byggingen.",
    },
    {
      label: "AI som produktbeslutning",
      text: "AI brukes der den fjerner reell friksjon: Smart Import kutter lærerens manuelle arbeid og gjør adopsjon realistisk. AI er et produktgrep, ikke pynt.",
    },
  ],
  description: [
    "Klar er hovedprosjektet fra masteroppgaven min i digital læringsdesign. Prototypen er laget for å støtte elever med eksekutive vansker i å strukturere og prioritere skolearbeid. Arbeidet bygger på designvitenskap og deltakende design med lærere som meddesignere, og viderefører erfaringer fra et tidligere prosjekt med elever som meddesignere.",
    "Prototypen har to brukergrensesnitt: ett for lærer og ett for elev. Lærersiden inneholder blant annet Smart Import, der AI tolker ukebrev og gjør dem om til strukturerte oppgaver og timeplaner som kan redigeres før publisering. Elevsiden gir oversikt over oppgaver, støtte for prioritering, hjelpekø, tidsindikatorer og et opt-in motivasjonssystem med level-up og blomsterhage.",
  ],
  // Shown as "Hva du bør se etter" in the demo.
  bullets: [
    "AI som produktgrep, ikke pynt",
    "Redusert lærerfriksjon som adopsjonsstrategi",
    "Støtte uten stigma",
    "Autonomistøtte og opt-in motivasjon",
    "Fungerende prototype, ikke bare konsept",
  ],
  // Demo access: Lærerbruker og elevbruker legges til senere.
  screenshots: [
    "Smart Import",
    "Lærerens landingsside",
    "Elevens landingsside",
    "Hjelpekø",
    "Elevadministrasjon med opt-ins",
    "Level-up-modal",
    "Blomsterhage / progresjon",
  ],
};

export const supportingCases: PortfolioCase[] = [
  {
    id: "forloper",
    tier: "primary",
    title: "Forløperprosjektet til Klar",
    type: "Deltakende design-prosjekt / fungerende prototype",
    role: "Utvikler og meddesigner",
    tech: "Python, Django, SQLite, Vue.js",
    link: "https://pd-app-frontend.vercel.app/",
    pitch: "Fullstack-prototype bygget sammen med elever som meddesignere.",
    description: [
      "Dette prosjektet var forløperen til Klar. Målet var å utvikle et digitalt hjelpemiddel som kunne støtte elever i å holde oversikt over og prioritere skolearbeid. Prosjektet ble gjennomført med medstudenter og ungdomsskoleelever som meddesignere.",
      "Jeg utviklet selve prototypen med de kodeferdighetene jeg hadde på det tidspunktet. Backend ble bygget i Python/Django med SQLite, og frontend i Vue.js.",
    ],
    bullets: [
      "Tidlig praktisk fullstack-erfaring",
      "Elevmedvirkning som designprinsipp",
      "Evne til å bygge noe testbart med begrensede ressurser",
    ],
    screenshots: ["Prototype-skjermbilde"],
  },
  {
    id: "fagtekst",
    tier: "primary",
    title: "AI og fagtekstforståelse",
    type: "Figma-prototype / konseptuell AI-utforsking",
    role: "Meddesigner",
    link: "https://www.figma.com/proto/CH7TbwA8ImoHzZ6FvBj8Bf/Arbeidskrav-3?node-id=27-44&starting-point-node-id=27%3A44&t=dm0tzpdCkHy75Ldm-1",
    pitch: "Nye grensesnitt der AI gjør fagtekst mer forståelig og interaktiv.",
    description: [
      "En Figma-prototype som utforsket hvordan generativ AI kunne hjelpe studenter med å forstå fagtekst gjennom ulike nivåer, endret kompleksitet, hypertekst og quizer.",
    ],
    bullets: [
      "Tidlig AI-utforsking",
      "Nye grensesnitt for tekst og forståelse",
      "Relevant for AI-drevne nyhets- og innholdsopplevelser",
    ],
    screenshots: ["Figma-prototype"],
  },
  {
    id: "ask-away",
    tier: "primary",
    title: "ASK Away",
    type: "Figma-prototype / tilgjengelighetscase",
    role: "Initiativtaker og prototypeutvikler",
    link: "https://www.figma.com/proto/u7vwxKdeBTXxGwCBgJZPk8/Skolestudio-med-ASK?node-id=103-1056&starting-point-node-id=75%3A2&t=xMWyRa5weOfYpB11-1",
    pitch:
      "Inkluderende design som tetter gapet mellom verktøy og faktiske brukerforutsetninger.",
    description: [
      "ASK Away sprang ut av praksiserfaring med elever som bruker alternativ og supplerende kommunikasjon. Prototypen viser hvordan en lærer kan aktivere ASK-symbolstøtte på elevnivå i en digital læringsplattform.",
    ],
    bullets: [
      "Praksisnær needfinding",
      "Inkluderende design",
      "Universell utforming og tilgjengelighet",
    ],
    screenshots: ["Figma-prototype"],
  },
  {
    id: "acad",
    tier: "secondary",
    title: "ACAD Collaborate",
    type: "Figma-prototype / metodeoversettelse",
    role: "Meddesigner",
    link: "https://www.figma.com/proto/lC2Z78lDDnAYEQbNPKuFjz/Arbeidskrav-ACAD?node-id=95-542&starting-point-node-id=95%3A542&t=fgAQS2I2P7tIjetm-1",
    pitch: "Teori gjort om til produktflyt for læreres samarbeid.",
    description: [
      "ACAD Collaborate utforsket hvordan Activity-Centred Analysis and Design kunne digitaliseres som en mobil samarbeidsapp for lærere.",
    ],
    bullets: [
      "Teori til produktflyt",
      "Figma-basert prototyping",
      "Samarbeid om designprosess",
    ],
    screenshots: ["Figma-prototype"],
  },
  {
    id: "wordhunt",
    tier: "secondary",
    title: "Wordhunt / CS50x final project",
    type: "Tidlig selvstendig kodeprosjekt",
    tech: "HTML, CSS, JavaScript",
    link: "https://www.youtube.com/watch?v=tI5fU1aAAvI",
    pitch: "Et lite, ekte verktøy — der teknologi-nysgjerrigheten startet.",
    description: [
      "En enkel webapp der læreren skriver inn ord, og applikasjonen genererer en 10x10 ordjakt med ordene plassert i et rutenett av tilfeldige bokstaver. Med print-CSS blir resultatet formatert som et utskriftsvennlig arbeidsark.",
    ],
    bullets: [
      "Tidlig teknisk problemløsning",
      "Små verktøy for ekte behov",
      "Praktisk JavaScript-erfaring",
    ],
    screenshots: ["Skjermbilde / demo"],
  },
];

export const sectionCopy = {
  klar: {
    professional: { label: "Hovedcase", title: "Klar" },
    agentic: { label: "Hovedcase · boss-nivå", title: "Klar" },
  },
  supporting: {
    professional: { label: "Flere prosjekter", title: "Støttende caser" },
    agentic: { label: "Side-quests", title: "Flere prosjekter, samme mønster" },
  },
  workflow: {
    professional: { label: "Arbeidsform", title: "Min agentiske arbeidsform" },
    agentic: {
      label: "Superkraft",
      title: "Slik bygger jeg robuste AI-workflows",
    },
  },
  journey: {
    agentic: { label: "Quest-logg", title: "Læringsreisen så langt" },
  },
} as const;

// The recurring pattern across every project. Shown in agentic mode.
export const storyline = [
  {
    step: "Problem",
    text: "Et reelt brukerproblem, identifisert tett på praksis.",
  },
  {
    step: "Prototype",
    text: "Gjort testbart raskt, ofte med brukere som meddesignere.",
  },
  {
    step: "Agentisk workflow",
    text: "AI brukt med kontekst, kontrollpunkter og kritisk testing.",
  },
  {
    step: "Testet artefakt",
    text: "Et fungerende produkt som kan vises, prøves og forbedres.",
  },
];

// Truthful profile tags derived from the existing content (agentic mode).
export const profileTags = [
  "Lærerbakgrunn",
  "Master i digital læringsdesign",
  "Deltakende design & needfinding",
  "Figma-prototyping",
  "Fullstack-prototyping",
  "Agentiske AI-workflows",
];

// Chronological progression for the "quest log" / learning journey.
// Years are intentionally omitted to avoid inventing dates.
export const journey = [
  {
    stage: "01",
    title: "Wordhunt (CS50x)",
    kind: "Første verktøy",
    text: "Bygde et lite, ekte verktøy: en ordjakt-generator med utskriftsvennlig print-CSS.",
    skill: "Teknisk nysgjerrighet",
  },
  {
    stage: "02",
    title: "Forløperprosjektet",
    kind: "Deltakende design + fullstack",
    text: "Fullstack-prototype (Django + Vue) utviklet med elever som meddesignere.",
    skill: "Needfinding + bygging",
  },
  {
    stage: "03",
    title: "Figma-utforskinger",
    kind: "Konseptuell prototyping",
    text: "AI og fagtekstforståelse, ASK Away og ACAD Collaborate: nye grensesnitt, tilgjengelighet og metodeoversettelse.",
    skill: "Produkt- og interaksjonsdesign",
  },
  {
    stage: "04",
    title: "Klar",
    kind: "Master + agentisk utvikling",
    text: "Forskningsbasert, fungerende PWA der AI er en bevisst produktbeslutning.",
    skill: "Agentisk produktutvikling",
  },
];

export type WorkflowStep = { phase: string; text: string };

export const agenticWorkflow = {
  text: "Min sterkeste AI-kompetanse ligger ikke bare i å bruke verktøyene, men i å utvikle robuste agentiske workflows: å gi modeller riktig kontekst, teste output kritisk, finne feilmoduser og bygge kontrollpunkter som gjør at brukerbehov og produktmål fortsatt styrer prosessen.",
  steps: [
    {
      phase: "Definere",
      text: "Definere brukerbehov og produktmål før prompting.",
    },
    {
      phase: "Oversette",
      text: "Oversette uklare behov til konkrete agentoppgaver.",
    },
    {
      phase: "Forankre",
      text: "Vedlikeholde prosjektkontekst gjennom dokumentasjon.",
    },
    {
      phase: "Teste",
      text: "Teste output mot designprinsipper, edge cases og brukerbehov.",
    },
    {
      phase: "Kritisere",
      text: "Bruke ekstern LLM-kritikk for å finne svake punkter.",
    },
    {
      phase: "Forholde seg kritisk",
      text: "Behandle AI som kraftig, nyttig og feilbar.",
    },
  ] as WorkflowStep[],
};

// ---------------------------------------------------------------------------
// CANDIDATE FIT SCAN (Skamløs AI-pitch mode) — DATA ONLY, no UI in this slice.
//
// Maps the VG X job ad (utlysning.md) to concrete evidence from Stian's real
// projects, learning journey and agentic workflow. Designed so a future
// interactive "Candidate Fit Scan" scene can render it directly.
//
// Source of truth:
//   - Job ad:  ../../utlysning.md
//   - Profile: the cases/journey/workflow above + docs/epics/EPIC_SKAMLOS_AI_PITCH.md
//
// Rules honored here: no invented metrics, awards, links or seniority.
// `caseRefs` point to existing PortfolioCase.id values so the UI can deep-link.
// ---------------------------------------------------------------------------

/** Id of an existing PortfolioCase (or "klar" for the featured case). */
export type CaseRef =
  | "klar"
  | "forloper"
  | "fagtekst"
  | "ask-away"
  | "acad"
  | "wordhunt";

/** How strongly the evidence supports a given requirement. */
export type FitLevel = "sterk" | "god" | "voksende";

/** One of VG X's four core user needs, mapped to Stian's experience. */
export type FitNeed = {
  id: "oversikt" | "forstaelse" | "relevans" | "avkobling";
  label: string;
  /** What this need means in the VG X product context. */
  vgxMeaning: string;
  /** Why Stian has relevant experience with this need. */
  whyStian: string;
  /** Concrete evidence drawn from one or more projects. */
  evidence: string[];
  /** Existing cases that back this need (for deep-linking later). */
  caseRefs: CaseRef[];
  /** Idea for how the future UI could make this interactive. */
  pitchAngle: string;
  fit: FitLevel;
};

/** A role requirement / theme extracted from the job ad. */
export type FitRequirement = {
  id: string;
  label: string;
  /** How the ad frames this requirement. */
  vgxInterpretation: string;
  /** Stian's concrete evidence. */
  evidence: string[];
  caseRefs: CaseRef[];
  fit: FitLevel;
  /** Optional honest counterpoint to keep the pitch credible. */
  counterpoint?: string;
};

/** Honest-but-strategic framing of a candidate risk. */
export type FitRisk = {
  id: string;
  risk: string;
  honestFraming: string;
  counterEvidence: string[];
  /** How the interactive pitch can turn the risk into a strength. */
  flipToStrength: string;
};

/** A milestone in the learning journey, enriched for the fit scan. */
export type FitMilestone = {
  id: string;
  title: string;
  shortLabel: string;
  /** What was learned / "unlocked" at this step. */
  unlocked: string;
  /** Project or artifact that evidences it. */
  evidence: string;
  caseRef?: CaseRef;
  /** Why it matters for the VG X role specifically. */
  vgxRelevance: string;
  /** A light, non-childish visual metaphor idea for the future UI. */
  metaphor: string;
};

export type FitScan = {
  /** Short framing line for the scan as a whole. */
  intro: string;
  needs: FitNeed[];
  requirements: FitRequirement[];
  risks: FitRisk[];
  milestones: FitMilestone[];
};

export const fitScan: FitScan = {
  intro:
    "En ærlig skanning av hvordan en utradisjonell profil matcher VG X — med konkrete bevis, ikke påstander.",

  needs: [
    {
      id: "oversikt",
      label: "Oversikt",
      vgxMeaning: "Hjelpe folk å henge med i samtalen uten å drukne i innhold.",
      whyStian:
        "Klar er bokstavelig talt bygget for å gi oversikt og prioritering til brukere som lett mister tråden.",
      evidence: [
        "Klar: elevsiden gir oversikt over oppgaver, prioritering, tidsindikatorer og hjelpekø.",
        "Smart Import gjør uoversiktlige ukebrev om til strukturerte oppgaver og timeplaner.",
      ],
      caseRefs: ["klar", "forloper"],
      pitchAngle:
        "Vis hvordan Klars prioriteringslogikk kan oversettes til en nyhetsstrøm: hva må jeg vite nå?",
      fit: "sterk",
    },
    {
      id: "forstaelse",
      label: "Forståelse",
      vgxMeaning:
        "Forklare hvorfor noe er viktig og hvordan det påvirker folks liv.",
      whyStian:
        "Lærerbakgrunn og master i digital læringsdesign handler nettopp om å gjøre komplekst innhold forståelig.",
      evidence: [
        "AI og fagtekstforståelse: AI som forklarer fagtekst på ulike nivåer, endrer kompleksitet og lager quizer.",
        "ASK Away: tilgjengelig forståelse for elever med alternativ og supplerende kommunikasjon.",
      ],
      caseRefs: ["fagtekst", "ask-away", "klar"],
      pitchAngle:
        "La brukeren skru på 'forklar enklere' på en nyhetssak, slik fagtekst-prototypen gjorde.",
      fit: "sterk",
    },
    {
      id: "relevans",
      label: "Relevans",
      vgxMeaning:
        "Oppdatere på det som er relevant for meg og mine interesser.",
      whyStian:
        "Deltakende design og needfinding er metoden hans for å treffe faktiske behov, ikke antatte.",
      evidence: [
        "Forløperprosjektet og Klar: utviklet med elever og lærere som meddesignere for å treffe reelle behov.",
        "Gjennomgående mønster: start i brukerens situasjon, ikke i løsningen.",
      ],
      caseRefs: ["forloper", "klar", "acad"],
      pitchAngle:
        "Bruk needfinding-tilnærmingen til å vise hvordan relevans kan testes med ekte lesere tidlig.",
      fit: "god",
    },
    {
      id: "avkobling",
      label: "Avkobling",
      vgxMeaning:
        "Gi brukeren en roligere inngang til komplekst innhold uten å overvelde.",
      whyStian:
        "Mest relevant som produktbehov: i Klar har jeg jobbet med lavere kognitiv belastning og mindre friksjon, men med svakere direkte nyhetsbevis enn for Oversikt/Forståelse/Relevans.",
      evidence: [
        "Klar: opt-in motivasjonssystem (level-up, blomsterhage) og støtte uten stigma.",
        "Designprinsipp: flytte kognitiv belastning fra brukeren til verktøyet.",
      ],
      caseRefs: ["klar"],
      pitchAngle:
        "Vis hvordan roligere, opt-in interaksjon kan senke friksjon og gjøre nyheter lettere å nærme seg.",
      // Honest: this is the need with the least direct news-product evidence.
      fit: "voksende",
    },
  ],

  requirements: [
    {
      id: "ai-native",
      label: "AI-native arbeidsform",
      vgxInterpretation:
        "Bruke AI for å jobbe smartere i flest mulig steg av designjobben.",
      evidence: [
        "Robuste agentiske workflows som metode: kontekst, kontrollpunkter, kritisk testing.",
        "Klar: AI som bevisst produktbeslutning (Smart Import), ikke pynt.",
        "Denne nettsiden er selv bygget med en AI-native prototypingprosess.",
      ],
      caseRefs: ["klar", "fagtekst"],
      fit: "sterk",
    },
    {
      id: "rapid-prototyping",
      label: "Prototype raskt",
      vgxInterpretation:
        "Eksperimentere aktivt med AI-verktøy for å få ut ideer til test.",
      evidence: [
        "Klar: fungerende PWA, ikke bare mockup.",
        "Forløperprosjektet: fungerende fullstack-prototype med begrensede ressurser.",
        "Flere Figma-prototyper fra konsept til testbar flyt.",
      ],
      caseRefs: ["klar", "forloper", "ask-away", "acad"],
      fit: "sterk",
    },
    {
      id: "user-centered",
      label: "Brukersentrert design",
      vgxInterpretation:
        "Ekte forstå menneskene som faktisk bruker det du lager.",
      evidence: [
        "Deltakende design med elever og lærere som meddesignere.",
        "Praksisnær needfinding (ASK Away sprang ut av faktisk praksiserfaring).",
      ],
      caseRefs: ["forloper", "ask-away", "klar"],
      fit: "sterk",
    },
    {
      id: "experimentation",
      label: "Eksperimentering",
      vgxInterpretation:
        "Selvdreven, tør å få ut ideer raskt for å lære — uten at alt er ferdig.",
      evidence: [
        "Initiativtaker på ASK Away.",
        "Tidlig AI-utforsking i fagtekst-prototypen før det var åpenbart.",
      ],
      caseRefs: ["ask-away", "fagtekst", "wordhunt"],
      fit: "god",
    },
    {
      id: "experiences-not-content",
      label: "Opplevelser, ikke statisk innhold",
      vgxInterpretation: "VG X lager ikke artikler, men opplevelser.",
      evidence: [
        "Klar: interaktiv PWA med to grensesnitt og motivasjonssystem.",
        "Fagtekst-prototypen gjorde tekst interaktiv (nivåer, hypertekst, quiz).",
      ],
      caseRefs: ["klar", "fagtekst"],
      fit: "god",
    },
    {
      id: "machine-plus-intuition",
      label: "Maskinkraft + intuisjon",
      vgxInterpretation:
        "Jobben handler ikke om piksler, men om å løse problemer med AI + menneskelig innsikt.",
      evidence: [
        "Kombinerer lærerens problemintuisjon med agentisk byggekraft.",
        "AI brukes der den fjerner reell friksjon, styrt av brukerbehov.",
      ],
      caseRefs: ["klar"],
      fit: "sterk",
    },
    {
      id: "ai-reflection",
      label: "Reflektert AI-bruk (hva, hvorfor, utfordringer)",
      vgxInterpretation:
        "Bonuspoeng for å vise AI-verktøybruk: til hva, med hvilket formål, og utfordringer.",
      evidence: [
        "Agentisk workflow-seksjon beskriver eksplisitt formål, kontrollpunkter og feilmoduser.",
        "Behandler AI som kraftig, nyttig og feilbar — og bruker ekstern LLM-kritikk.",
      ],
      caseRefs: ["klar"],
      fit: "sterk",
    },
    {
      id: "early-career",
      label: "Tidlig i karrieren, åpen og lærevillig",
      vgxInterpretation:
        "Relativt tidlig i karrieren, med brennende engasjement og lyst til å lære av de beste.",
      evidence: [
        "Tydelig læringsreise fra programmeringsgrunnlag til masternivå designforskning.",
        "Aktiv, selvdreven utforsking på tvers av verktøy.",
      ],
      caseRefs: ["wordhunt", "klar"],
      fit: "god",
    },
    {
      id: "visual-product-sense",
      label: "Visuelt/produktblikk (uten å overselge senior-UI)",
      vgxInterpretation:
        "Sterkt visuelt blikk for en digitalt innfødt målgruppe — men ad-en nedtoner Figma-timer.",
      evidence: [
        "Figma-prototyping på tvers av flere prosjekter.",
        "Produktmessig tenkning rundt innhold, interaktivitet og tilpasning.",
      ],
      caseRefs: ["acad", "fagtekst", "ask-away"],
      fit: "voksende",
      counterpoint:
        "Ikke en tradisjonell senior visuell designer — styrken er produkt- og interaksjonshelhet, ikke ren UI-polish.",
    },
  ],

  risks: [
    {
      id: "not-senior-visual",
      risk: "Ikke en tradisjonell senior visuell UX-designer.",
      honestFraming:
        "Tyngdepunktet ligger på produkt, interaksjon og fungerende prototyper, ikke på ren visuell polish.",
      counterEvidence: [
        "Fungerende prototyper (Klar, forløperprosjektet) viser helhetlig produktforståelse.",
        "Ad-en sier eksplisitt at de er mindre opptatt av Figma-timer.",
      ],
      flipToStrength:
        "Vis at han løser brukerproblemer ende-til-ende — nettopp det VG X etterspør fremfor pikselteller.",
    },
    {
      id: "teaching-context",
      risk: "Kommer fra lærer-/skolekontekst.",
      honestFraming:
        "Bakgrunnen er pedagogikk og læring, ikke et tradisjonelt designbyrå.",
      counterEvidence: [
        "Master i digital læringsdesign = forskningsbasert designkompetanse.",
        "Lærerblikket gir sterk needfinding og evne til å gjøre komplekst innhold forståelig.",
      ],
      flipToStrength:
        "Forståelse er en av VG X' fire kjernebehov — lærerbakgrunnen blir et direkte konkurransefortrinn.",
    },
    {
      id: "unconventional-path",
      risk: "Utradisjonell karrierevei.",
      honestFraming:
        "Veien gikk via programmering, pedagogikk og designforskning, ikke en rett UX-linje.",
      counterEvidence: [
        "Sammenhengende læringsreise fra C og CS50x til agentiske workflows.",
        "Hvert steg bygger på det forrige mot fungerende, testbare produkter.",
      ],
      flipToStrength:
        "Presenter reisen som en progresjon: bredden er grunnen til at han kan koble AI, innhold og brukerbehov.",
    },
    {
      id: "ai-hype-misread",
      risk: "AI-entusiasme kan leses som hype.",
      honestFraming:
        "Sterk AI-interesse kan forveksles med overflatisk 'AI-bro'-begeistring.",
      counterEvidence: [
        "Behandler eksplisitt AI som feilbar; bygger QA, kontrollpunkter og ekstern kritikk inn i prosessen.",
        "AI brukes styrt av brukerbehov og produktmål, ikke for sin egen skyld.",
      ],
      flipToStrength:
        "La pitch-en vise den kritiske, ansvarlige siden — han kan hjelpe teamet bruke AI-agenter produktivt OG kritisk.",
    },
  ],

  milestones: [
    {
      id: "c-foundations",
      title: "Programmeringsgrunnlaget (C)",
      shortLabel: "Grunnlaget",
      unlocked:
        "Forståelse for systemer: for-løkker, pekere, malloc og gleden ved å få kode til å gjøre noe nyttig.",
      evidence: "Tidlig programmeringsmotivasjon i C.",
      vgxRelevance:
        "Teknisk dybde som gjør det enkelt å samarbeide tett med utviklere og forstå hva som faktisk kan bygges.",
      metaphor: "Et fundament som legges før resten av bygget reises.",
    },
    {
      id: "cs50x-wordhunt",
      title: "CS50x / Wordhunt",
      shortLabel: "Første verktøy",
      unlocked:
        "Å bygge et lite, ekte verktøy for et reelt behov med HTML, CSS og JavaScript.",
      evidence: "Wordhunt: ordjakt-generator med utskriftsvennlig print-CSS.",
      caseRef: "wordhunt",
      vgxRelevance:
        "Viser at han lager noe testbart raskt — kort vei fra tanke til ting.",
      metaphor: "Det første verktøyet i beltet.",
    },
    {
      id: "ask-away",
      title: "ASK Away",
      shortLabel: "Tilgjengelighet",
      unlocked:
        "Inkluderende design og evnen til å se gap mellom verktøy og brukerforutsetninger.",
      evidence: "Figma-prototype for ASK-symbolstøtte i digitale læremidler.",
      caseRef: "ask-away",
      vgxRelevance:
        "Universell utforming og tilgjengelighet for en bred målgruppe.",
      metaphor: "En bro over et gap mange overser.",
    },
    {
      id: "acad-collaborate",
      title: "ACAD Collaborate",
      shortLabel: "Teori → flyt",
      unlocked:
        "Å oversette en metode (Activity-Centred Analysis and Design) til en konkret produktflyt.",
      evidence: "Figma-prototype for en mobil samarbeidsapp for lærere.",
      caseRef: "acad",
      vgxRelevance:
        "Evne til å gjøre abstrakte rammeverk om til brukbare grensesnitt.",
      metaphor: "Et kart som gjør et komplekst landskap navigerbart.",
    },
    {
      id: "ai-fagtekst",
      title: "AI og fagtekstforståelse",
      shortLabel: "AI for forståelse",
      unlocked:
        "Tidlig utforsking av generativ AI for å gjøre fagtekst interaktiv og forståelig.",
      evidence:
        "Figma-prototype: forklaring på ulike nivåer, endret kompleksitet, hypertekst, quiz.",
      caseRef: "fagtekst",
      vgxRelevance:
        "Direkte relevant for AI-drevne nyhets- og innholdsopplevelser.",
      metaphor: "En linse som justerer skarpheten på innhold.",
    },
    {
      id: "participatory-precursor",
      title: "Forløperprosjektet",
      shortLabel: "Fullstack + brukere",
      unlocked:
        "Fullstack-bygging gjennom deltakende design med elever som meddesignere.",
      evidence: "Fungerende prototype i Python/Django/SQLite og Vue.js.",
      caseRef: "forloper",
      vgxRelevance:
        "Beviser at han bygger testbare produkter med ekte brukere involvert.",
      metaphor: "Første gang verkstedet og brukerne jobber i samme rom.",
    },
    {
      id: "klar",
      title: "Klar",
      shortLabel: "Boss-nivå",
      unlocked:
        "Forskningsbasert, fungerende PWA der AI er en bevisst produktbeslutning.",
      evidence:
        "Master-prototype med lærer-/elevgrensesnitt, Smart Import, hjelpekø og opt-in motivasjon.",
      caseRef: "klar",
      vgxRelevance:
        "Samler oversikt, forståelse og AI-som-produkt i ett fungerende produkt.",
      metaphor: "Hovedoppdraget der alle ferdighetene møtes.",
    },
    {
      id: "agentic-workflow",
      title: "Agentisk workflow / QA-tankesett",
      shortLabel: "Superkraft",
      unlocked:
        "Robuste AI-workflows: kontekst, kontrollpunkter, edge cases, QA, ekstern LLM-kritikk og feilmoduser.",
      evidence: "Arbeidsformen beskrevet i agentic workflow-seksjonen.",
      vgxRelevance:
        "Kan hjelpe et team å finne ut hvordan AI-agenter faktisk bør brukes — produktivt og kritisk.",
      metaphor: "Ferdigheten som gjør alle de andre raskere og tryggere.",
    },
  ],
};

/** Short, human-readable labels for the cases referenced by the fit scan. */
export const caseRefLabels: Record<CaseRef, string> = {
  klar: "Klar",
  forloper: "Forløperprosjektet",
  fagtekst: "AI og fagtekstforståelse",
  "ask-away": "ASK Away",
  acad: "ACAD Collaborate",
  wordhunt: "Wordhunt",
};

/** Display labels for the honest self-assessed fit levels. */
export const fitLevelLabels: Record<FitLevel, string> = {
  sterk: "Sterk match",
  god: "God match",
  voksende: "Voksende",
};

// Contact / footer links. Replace placeholder values when ready.
export const footer = {
  links: [
    { label: "E-post", href: "[email placeholder]" },
    { label: "LinkedIn", href: "[LinkedIn placeholder]" },
    { label: "GitHub", href: "[GitHub placeholder]" },
    { label: "CV", href: "[CV placeholder]" },
  ],
  // Reserved spot for a future light, AI-related closing line (agentic mode only).
  // Keep it tasteful — no joke written yet.
  humorPlaceholder: "Plass reservert til en liten, lett AI-spøk på tampen.",
};
