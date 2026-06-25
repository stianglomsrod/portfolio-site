export type Locale = "no" | "en";

export const htmlLang: Record<Locale, string> = {
  no: "nb",
  en: "en",
};

export const localeLabels: Record<Locale, string> = {
  no: "NO",
  en: "EN",
};

export type ScreenshotCopy = {
  lookup: string;
  label: string;
  alt: string;
};

export type ShowcaseCase = {
  id: string;
  title: string;
  type: string;
  role?: string;
  tech?: string;
  link?: string;
  linkLabel?: string;
  accessNote?: string;
  description: string[];
  bullets?: string[];
  screenshots?: ScreenshotCopy[];
  tier?: "primary" | "secondary";
};

export type FeaturedFacet = {
  label: string;
  text: string;
};

export type FeaturedCase = ShowcaseCase & {
  summary: string;
  facets: FeaturedFacet[];
  lookForHeading: string;
};

type EvidenceProject = {
  tag: string;
  name: string;
  proof: string;
  note: string;
  primary: { label: string; href: string };
  repo?: { label: string; href: string };
};

type DeveloperLink = {
  label: string;
  href: string;
};

export type HomeCopy = {
  metaTitle: string;
  metaDescription: string;
  skipLink: string;
  nav: {
    label: string;
    work: string;
    klar: string;
    workflow: string;
    dev: string;
    contact: string;
  };
  languageToggle: {
    label: string;
    no: string;
    en: string;
  };
  caseLabels: {
    role: string;
    tech: string;
    fallbackLink: string;
    screenshotFallback: string;
    closeViewer: string;
    viewerLabel: string;
    previousImage: string;
    nextImage: string;
  };
  hero: {
    name: string;
    eyebrow: string;
    title: string;
    intro: string;
    portraitAlt: string;
    primaryCta: string;
    secondaryCta: string;
    proof: string[];
    workPanelTitle: string;
    workPanelIntro: string;
    highlights: {
      href: string;
      title: string;
      meta: string;
      text: string;
    }[];
  };
  featuredSection: {
    label: string;
    title: string;
  };
  featuredCase: FeaturedCase;
  supportingSection: {
    label: string;
    title: string;
    lede: string;
    secondaryLabel: string;
  };
  supportingCases: ShowcaseCase[];
  workflow: {
    label: string;
    title: string;
    text: string;
    note: string;
    stepsAria: string;
    steps: { phase: string; text: string }[];
    evidenceLabel: string;
    evidenceTitle: string;
    evidenceIntro: string;
    evidenceBoundary: string;
    evidenceProjects: EvidenceProject[];
  };
  developer: {
    label: string;
    title: string;
    lede: string;
    nowTitle: string;
    now: string[];
    growthTitle: string;
    growthLede: string;
    growth: string[];
    learningTitle: string;
    learningLede: string;
    learning: string[];
    linksAria: string;
    links: DeveloperLink[];
    honest: string;
  };
  footer: {
    title: string;
    links: { label: string; href: string }[];
    privacyLabel: string;
    copyrightPrefix: string;
  };
};

const email = "stianglomsrod@gmail.com";

export const home: Record<Locale, HomeCopy> = {
  no: {
    metaTitle: "Stian Glomsrød — AI-first utviklerportefølje",
    metaDescription:
      "AI-first fullstack produktbygging, dokumentert agentisk arbeidsflyt og praktisk kvalitetssikring.",
    skipLink: "Hopp til innhold",
    nav: {
      label: "Hovednavigasjon",
      work: "Arbeid",
      klar: "Klar",
      workflow: "Arbeidsflyt",
      dev: "Dev-spor",
      contact: "Kontakt",
    },
    languageToggle: {
      label: "Velg språk",
      no: "Norsk",
      en: "English",
    },
    caseLabels: {
      role: "Rolle",
      tech: "Teknologi",
      fallbackLink: "Lenke",
      screenshotFallback: "Skjermbilde",
      closeViewer: "Lukk bildefremviser",
      viewerLabel: "Bildefremviser",
      previousImage: "Forrige bilde",
      nextImage: "Neste bilde",
    },
    hero: {
      name: "Stian Glomsrød",
      eyebrow: "AI-first fullstack bygger",
      title:
        "Jeg bygger programvare fra uklare behov til fungerende systemer.",
      intro:
        "Jeg jobber fullstack og bruker AI-agenter aktivt i utviklingen, men alltid med tydelige krav, review-løkker og menneskelig vurdering. Styrken min er å koble brukerinnsikt, systemforståelse og praktisk bygging til noe som faktisk kan testes.",
      portraitAlt: "Portrett av Stian Glomsrød",
      primaryCta: "Se teknisk arbeid",
      secondaryCta: "Ta kontakt",
      proof: [
        "Next.js, React, TypeScript og Supabase i fungerende PWA",
        "AI-agenter brukt med krav, QA, dokumentasjon og handoff",
        "Python/Django, Vue, Flutter/Dart, Astro og praktiske repoer",
      ],
      workPanelTitle: "Teknisk bevis",
      workPanelIntro:
        "Et konsentrert spor gjennom fullstack produktbygging, agentisk arbeidsflyt og programmeringslæring.",
      highlights: [
        {
          href: "#klar",
          title: "Klar",
          meta: "Next.js · Supabase · PWA",
          text: "Fullstack prototype med lærer/elev-roller, auth, dataflyt og AI-assistert Smart Import.",
        },
        {
          href: "#workflow",
          title: "Agentisk workflow",
          meta: "Krav · review · QA · handoff",
          text: "AI brukes som utviklingspartner, ikke autopilot. Arbeidet styres av kontekst og kontrollpunkter.",
        },
        {
          href: "#dev-path",
          title: "Dev-spor",
          meta: "CS50x · Python · JS · Flutter",
          text: "En ærlig teknisk progresjon fra små verktøy til fullstack og lokal-first arkitektur.",
        },
      ],
    },
    featuredSection: {
      label: "Hovedcase",
      title: "Klar som teknisk bevis",
    },
    featuredCase: {
      id: "klar",
      title: "Klar — fullstack PWA med AI-assistert import og rollelogikk",
      type: "Masterprosjekt / fungerende fullstack webprototype",
      role: "Produktbygger, fullstack prototypeutvikler og agentisk utviklingsleder",
      tech: "React, Next.js, TypeScript, Supabase/PostgreSQL, auth/RBAC, PWA, AI-støttet utviklingsworkflow",
      link: "https://klar-sigma.vercel.app/",
      linkLabel: "Åpne Klar",
      accessNote: `Demo-/brukertilgang gis ved forespørsel: ${email}`,
      summary:
        "Klar er mitt sterkeste eksempel på AI-first produktbygging: en fungerende PWA med to roller, innlogging, strukturert dataflyt og AI-assistert import med menneske-i-løkka-kontroll.",
      facets: [
        {
          label: "Systemet",
          text: "Én React/Next.js-kodebase serverer to ulike grensesnitt: lærer og elev. Valgene er gjort rundt faktisk bruk: nettleser, Chromebook, mobil, lav terskel og tydelige roller.",
        },
        {
          label: "Backend, data og auth",
          text: "Supabase/PostgreSQL gir et standardisert datalag, autentisering og rollebasert tilgang. Det gjør prototypen mer enn en klikkbar demo: den har reelle systemgrenser.",
        },
        {
          label: "AI som produktvalg",
          text: "Smart Import tolker ukebrev og foreslår oppgaver, fag og timeplan. Det løser en konkret flaskehals for læreren, i stedet for å bruke AI som pynt.",
        },
        {
          label: "Kontroll og ansvar",
          text: "AI-output går gjennom en redigerbar forhåndsvisning før publisering. Læreren beholder kontrollen, og systemet får et tydelig kvalitetspunkt.",
        },
      ],
      lookForHeading: "Hva du bør se etter",
      description: [],
      bullets: [
        "Next.js/React/TypeScript i fungerende produktkontekst",
        "Supabase/PostgreSQL, innlogging og rollebasert tilgang",
        "AI-import med menneske-i-løkka forhåndsvisning",
        "PWA og plattformuavhengighet som praktisk engineering-valg",
        "Robust prototype, ikke påstand om enterprise-skala",
      ],
      screenshots: [
        {
          lookup: "Smart Import",
          label: "Smart Import",
          alt: "Klar Smart Import som tolker ukebrev til strukturerte oppgaver",
        },
        {
          lookup: "Lærerens landingsside",
          label: "Lærerens landingsside",
          alt: "Klar lærergrensesnitt med oversikt og publiseringsflyt",
        },
        {
          lookup: "Elevens landingsside",
          label: "Elevens landingsside",
          alt: "Klar elevgrensesnitt med oppgaveoversikt og prioritering",
        },
        {
          lookup: "Hjelpekø",
          label: "Hjelpekø",
          alt: "Klar hjelpekøvisning for elevstøtte",
        },
        {
          lookup: "Elevadministrasjon med opt-ins",
          label: "Elevadministrasjon med opt-ins",
          alt: "Klar elevadministrasjon med valgfrie opt-ins",
        },
        {
          lookup: "Level-up-modal",
          label: "Level-up-modal",
          alt: "Klar level-up modal for opt-in motivasjon",
        },
        {
          lookup: "Blomsterhage / progresjon",
          label: "Blomsterhage / progresjon",
          alt: "Klar blomsterhage som viser progresjon over tid",
        },
      ],
    },
    supportingSection: {
      label: "Flere tekniske spor",
      title: "Prosjekter som viser bygging, ikke bare ideer",
      lede:
        "Jeg vil at porteføljen skal vise hvordan jeg tenker som utvikler: stackvalg, avgrensninger, dokumentasjon, og når noe bør bygges eller integreres.",
      secondaryLabel: "Tidligere og støttende arbeid",
    },
    supportingCases: [
      {
        id: "forloper",
        tier: "primary",
        title: "Forløperprosjektet til Klar",
        type: "Deltakende design / tidlig fullstack prototype",
        role: "Utvikler og meddesigner",
        tech: "Python, Django, SQLite, Vue.js",
        link: "https://pd-app-frontend.vercel.app/",
        linkLabel: "Åpne PD-app",
        accessNote: `Ta kontakt for brukertilgang: ${email}`,
        description: [
          "Dette prosjektet var forløperen til Klar. Jeg bygget en fungerende prototype for oversikt og prioritering av skolearbeid, med backend i Django og frontend i Vue.",
          "Det er tidlig kode, men viktig bevis: jeg gikk fra behovsarbeid til faktisk system, med elever som meddesignere og begrensede ressurser.",
        ],
        bullets: [
          "Python/Django backend og SQLite",
          "Vue frontend og praktisk fullstack-læring",
          "Behov oversatt til testbar programvare",
        ],
        screenshots: [
          {
            lookup: "Prototype-skjermbilde",
            label: "Prototype-skjermbilde",
            alt: "Forløperprosjektet til Klar, tidlig PD-app prototype",
          },
        ],
      },
      {
        id: "companion",
        tier: "primary",
        title: "Companion / nikkoprogging",
        type: "Flutter/Dart / lokal-first app og dokumentert utviklingsflyt",
        tech: "Flutter, Dart, Drift, SQLite, tester, plan- og epic-dokumenter",
        link: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "Se repoet",
        description: [
          "Companion-prosjektet er det tydeligste beviset mitt på langsiktig agentisk utviklingsdisiplin: små trygge leveranser, plan-dokumenter, databasevalg og tester.",
        ],
        bullets: [
          "Lokal-first arkitektur med Drift/SQLite",
          "Planer, epics og PROJECT_DNA som arbeidskontrakt",
          "Tester rundt database, historikk og event state",
        ],
      },
      {
        id: "lori",
        tier: "primary",
        title: "Lori Frisør",
        type: "Astro/Vercel / pragmatisk levering og handoff",
        tech: "Astro, Keystatic, Vercel, eierredigering, handoff-dokumentasjon",
        link: "https://github.com/stianglomsrod/lori-frisor",
        linkLabel: "Se repoet",
        description: [
          "Et lite leveranseprosjekt der poenget var å lage noe vedlikeholdbart for en ekte eier. Jeg valgte å integrere Timma for booking i stedet for å bygge unødvendig kompleksitet.",
        ],
        bullets: [
          "Bevisst build-vs-integrate-valg",
          "Keystatic for eierredigerbart innhold",
          "Handoff, beslutninger og teknisk gjeld dokumentert",
        ],
      },
      {
        id: "wordhunt",
        tier: "secondary",
        title: "Wordhunt / CS50x final project",
        type: "Tidlig selvstendig kodeprosjekt",
        tech: "HTML, CSS, JavaScript",
        link: "https://www.youtube.com/watch?v=tI5fU1aAAvI",
        linkLabel: "Se Wordhunt-video",
        description: [
          "En enkel webapp der læreren skriver inn ord, og applikasjonen genererer en 10x10 ordjakt med ordene plassert i et rutenett av tilfeldige bokstaver. Print-CSS gjør resultatet utskriftsvennlig.",
        ],
        bullets: [
          "Tidlig teknisk problemløsning",
          "Små verktøy for ekte behov",
          "Praktisk JavaScript-erfaring",
        ],
      },
      {
        id: "fagtekst",
        tier: "secondary",
        title: "AI og fagtekstforståelse",
        type: "Figma-prototype / AI-grensesnitt",
        role: "Meddesigner",
        link: "https://www.figma.com/proto/CH7TbwA8ImoHzZ6FvBj8Bf/Arbeidskrav-3?node-id=27-44&starting-point-node-id=27%3A44&t=dm0tzpdCkHy75Ldm-1",
        linkLabel: "Åpne Warp Read i Figma",
        description: [
          "En prototype som utforsket hvordan generativ AI kunne gjøre fagtekst mer forståelig gjennom nivåer, endret kompleksitet, hypertekst og quizer.",
        ],
        bullets: [
          "Tidlig AI-utforsking",
          "Interaksjon rundt tekst og forståelse",
          "Nyttig produktintuisjon for AI-drevne grensesnitt",
        ],
        screenshots: [
          {
            lookup: "Figma-prototype",
            label: "Figma-prototype",
            alt: "Warp Read prototype for AI og fagtekstforståelse i Figma",
          },
        ],
      },
      {
        id: "ask-away",
        tier: "secondary",
        title: "ASK Away",
        type: "Figma-prototype / tilgjengelighetscase",
        role: "Initiativtaker og prototypeutvikler",
        link: "https://www.figma.com/proto/u7vwxKdeBTXxGwCBgJZPk8/Skolestudio-med-ASK?node-id=103-1056&starting-point-node-id=75%3A2&t=xMWyRa5weOfYpB11-1",
        linkLabel: "Åpne ASK Away i Figma",
        description: [
          "ASK Away sprang ut av praksiserfaring med elever som bruker alternativ og supplerende kommunikasjon. Det viser behovsforståelse og tilgjengelighet som teknisk premiss.",
        ],
        bullets: [
          "Praksisnær needfinding",
          "Inkluderende design",
          "Universell utforming som systemkrav",
        ],
        screenshots: [
          {
            lookup: "Figma-prototype",
            label: "Figma-prototype",
            alt: "ASK Away prototype med ASK-symbolstøtte i læringsflate",
          },
        ],
      },
    ],
    workflow: {
      label: "Arbeidsflyt",
      title: "Slik bygger jeg med AI",
      text:
        "AI-agenter gjør meg raskere, men de får ikke siste ord. Jeg jobber i en fast utviklingsflyt der hvert steg har en eier, en grense og et tydelig tegn på hva som teller som ferdig.",
      note:
        "Målet er ikke å være en prompt-person. Målet er å bygge programvare raskere uten å miste ansvar, testbarhet eller teknisk dømmekraft.",
      stepsAria: "Utviklingsprosessen steg for steg",
      steps: [
        {
          phase: "Kontekst",
          text: "Starte med mål, rammer, kilder, risiko og akseptansekriterier.",
        },
        {
          phase: "Krav",
          text: "Bryte arbeidet ned i små, reviewbare steg med tydelig scope.",
        },
        {
          phase: "Bygge",
          text: "Bruke agent-output som utkast til kode, struktur, tester eller docs.",
        },
        {
          phase: "Review",
          text: "Lese, teste og vurdere forslagene før de får gå videre.",
        },
        {
          phase: "Korrigere",
          text: "Fange feil antagelser, stramme scope og rette avvik.",
        },
        {
          phase: "QA",
          text: "Sjekke påstander, edge cases, tilgjengelighet og teknisk risiko.",
        },
        {
          phase: "Dokumentere",
          text: "Logge beslutninger, usikkerhet og handoff mens konteksten er fersk.",
        },
        {
          phase: "Overlevere",
          text: "Gjøre arbeidet forståelig nok til at andre kan ta det videre.",
        },
      ],
      evidenceLabel: "Tre prosjekter · samme mønster",
      evidenceTitle: "Produkt, arbeidsflyt og overlevering",
      evidenceIntro:
        "Dette er ikke tre tilfeldige prosjekter. Samlet viser de hvordan jeg bygger med AI i praksis: produkt, utviklingsdisiplin og enablement.",
      evidenceBoundary:
        "Eksemplene viser arbeidsmåte og engineering judgement i prototypeskala. De er ikke påstander om senior plattformansvar eller enterprise-skala.",
      evidenceProjects: [
        {
          tag: "Fullstack AI-produkt",
          name: "Klar",
          proof:
            "Next.js, React, TypeScript, Supabase/PostgreSQL, auth/RBAC og AI-assistert import med forhåndsvisning.",
          note: "Det nærmeste jeg har et helhetlig produkt.",
          primary: { label: "Åpne Klar", href: "https://klar-sigma.vercel.app/" },
          repo: { label: "Repo", href: "https://github.com/stianglomsrod/klar" },
        },
        {
          tag: "Dokumentert utviklingsflyt",
          name: "Companion",
          proof:
            "Flutter, Dart, Drift/SQLite, lokal-first arkitektur, plan-dokumenter, epics og tester.",
          note: "Langsiktig agentisk utviklingsdisiplin i praksis.",
          primary: {
            label: "Se repoet",
            href: "https://github.com/stianglomsrod/nikkoprogging",
          },
        },
        {
          tag: "Enablement og handoff",
          name: "Lori Frisør",
          proof:
            "Astro, Keystatic, Vercel, owner-editing, handoff og pragmatisk integrasjon fremfor overbygging.",
          note: "Praktisk leveranse for en ekte eier.",
          primary: {
            label: "Se repoet",
            href: "https://github.com/stianglomsrod/lori-frisor",
          },
          repo: {
            label: "Nettsted",
            href: "https://lori-frisor.vercel.app/",
          },
        },
      ],
    },
    developer: {
      label: "Dev-spor",
      title: "Læringshastighet og ærlig vekstretning",
      lede:
        "Jeg er ikke en tradisjonell senior plattformutvikler. Det jeg kan vise nå, er høy læringshastighet, fungerende fullstack-prototyper og en dokumentert måte å bruke AI i utvikling på.",
      nowTitle: "Det jeg kan vise nå",
      now: [
        "Fungerende webprodukter og prototyper på tvers av Next.js/React, Supabase/PostgreSQL, Python/Django, Vue, Astro og Flutter/Dart.",
        "Jevn produksjon over tid på tvers av kode, dokumentasjon, QA, teknisk gjeld og forbedringsløkker.",
        "Evne til å gjøre ny kunnskap om til noe andre kan bruke: prototyper, sjekklister, handoff-dokumenter og arbeidsflyter.",
      ],
      growthTitle: "Det jeg bygger videre",
      growthLede:
        "Dette er retningen min, ikke et forsøk på å overselge dagens nivå:",
      growth: [
        "Dypere programmering, verktøybygging og plattformtenkning.",
        "Robusthet, observability og mer driftsnær praksis.",
        "Distribuerte systemer, GitHub Actions/API og agentiske rammeverk som MCP.",
      ],
      learningTitle: "Programmering og veien hit",
      learningLede:
        "Grunnlaget er bygget stein for stein, fra CS50x og små verktøy til fullstack-prototyper.",
      learning: [
        "CS50x ga grunnmur i C, Python, SQL, HTML, CSS og JavaScript.",
        "Forløperprosjektet til Klar ga praktisk Python/Django, Vue og fullstack-sammenheng.",
        "Klar samlet Next.js, React, Supabase, auth, rollelogikk og AI-assistert import.",
        "Companion-sporet viser interesse for lokal-first arkitektur, SQLite/Drift og testbar app-logikk.",
      ],
      linksAria: "Lenker til programmeringsbevis og tekniske prosjekter",
      links: [
        {
          label: "CS50x-sertifikat",
          href: "https://cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45",
        },
        {
          label: "PD-app frontend",
          href: "https://github.com/stianglomsrod/pd-app-frontend",
        },
        {
          label: "PD-app backend",
          href: "https://github.com/stianglomsrod/pd-app-backend",
        },
      ],
      honest:
        "Den ærlige posisjonen: sterkest bevis i dag er AI-first fullstack produktbygging, kvalitetssikret arbeidsflyt og tydelig overlevering. Dypere plattform- og lavnivåarbeid er vekstretningen.",
    },
    footer: {
      title: "Kontakt",
      links: [
        { label: "E-post", href: `mailto:${email}` },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
        },
        { label: "GitHub", href: "https://github.com/stianglomsrod" },
      ],
      privacyLabel: "Personvern og cookies",
      copyrightPrefix: "©",
    },
  },
  en: {
    metaTitle: "Stian Glomsrød — AI-first developer portfolio",
    metaDescription:
      "AI-first full-stack product building, documented agentic workflow, and practical quality control.",
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      work: "Work",
      klar: "Klar",
      workflow: "Workflow",
      dev: "Dev path",
      contact: "Contact",
    },
    languageToggle: {
      label: "Choose language",
      no: "Norsk",
      en: "English",
    },
    caseLabels: {
      role: "Role",
      tech: "Technology",
      fallbackLink: "Link",
      screenshotFallback: "Screenshot",
      closeViewer: "Close image viewer",
      viewerLabel: "Image viewer",
      previousImage: "Previous image",
      nextImage: "Next image",
    },
    hero: {
      name: "Stian Glomsrød",
      eyebrow: "AI-first full-stack builder",
      title: "I build software from unclear needs into working systems.",
      intro:
        "I work full-stack and use AI agents actively while building, but always with explicit requirements, review loops and human judgement. My strength is connecting user insight, system thinking and practical implementation into something that can actually be tested.",
      portraitAlt: "Portrait of Stian Glomsrød",
      primaryCta: "View technical work",
      secondaryCta: "Contact me",
      proof: [
        "Next.js, React, TypeScript and Supabase in a working PWA",
        "AI agents used with requirements, QA, documentation and handoff",
        "Python/Django, Vue, Flutter/Dart, Astro and practical repositories",
      ],
      workPanelTitle: "Technical evidence",
      workPanelIntro:
        "A focused path through full-stack product building, agentic workflow and programming growth.",
      highlights: [
        {
          href: "#klar",
          title: "Klar",
          meta: "Next.js · Supabase · PWA",
          text: "Full-stack prototype with teacher/student roles, auth, data flow and AI-assisted Smart Import.",
        },
        {
          href: "#workflow",
          title: "Agentic workflow",
          meta: "Requirements · review · QA · handoff",
          text: "AI is used as a development partner, not autopilot. The work is guided by context and checkpoints.",
        },
        {
          href: "#dev-path",
          title: "Dev path",
          meta: "CS50x · Python · JS · Flutter",
          text: "An honest technical progression from small tools to full-stack and local-first architecture.",
        },
      ],
    },
    featuredSection: {
      label: "Main case",
      title: "Klar as technical evidence",
    },
    featuredCase: {
      id: "klar",
      title:
        "Klar — a full-stack PWA with AI-assisted import and role logic",
      type: "Master's project / working full-stack web prototype",
      role: "Product builder, full-stack prototype developer and agentic development lead",
      tech: "React, Next.js, TypeScript, Supabase/PostgreSQL, auth/RBAC, PWA, AI-supported development workflow",
      link: "https://klar-sigma.vercel.app/",
      linkLabel: "Open Klar",
      accessNote: `Demo/user access available on request: ${email}`,
      summary:
        "Klar is my strongest example of AI-first product building: a working PWA with two roles, sign-in, structured data flow and AI-assisted import with a human-in-the-loop check.",
      facets: [
        {
          label: "The system",
          text: "One React/Next.js codebase serves two different interfaces: teacher and student. The choices are built around real use: browser, Chromebook, mobile, low friction and clear roles.",
        },
        {
          label: "Backend, data and auth",
          text: "Supabase/PostgreSQL provides a standardised data layer, authentication and role-based access. That makes the prototype more than a clickable demo: it has real system boundaries.",
        },
        {
          label: "AI as a product choice",
          text: "Smart Import interprets weekly letters and suggests tasks, subjects and schedules. It solves a concrete teacher bottleneck instead of using AI as decoration.",
        },
        {
          label: "Control and responsibility",
          text: "AI output goes through an editable preview before publishing. The teacher keeps control, and the system gets a clear quality checkpoint.",
        },
      ],
      lookForHeading: "What to look for",
      description: [],
      bullets: [
        "Next.js/React/TypeScript in a working product context",
        "Supabase/PostgreSQL, sign-in and role-based access",
        "AI import with a human-in-the-loop preview",
        "PWA and platform independence as practical engineering choices",
        "Robust prototype, not an enterprise-scale claim",
      ],
      screenshots: [
        {
          lookup: "Smart Import",
          label: "Smart Import",
          alt: "Klar Smart Import interpreting weekly letters into structured tasks",
        },
        {
          lookup: "Lærerens landingsside",
          label: "Teacher landing page",
          alt: "Klar teacher interface with overview and publishing flow",
        },
        {
          lookup: "Elevens landingsside",
          label: "Student landing page",
          alt: "Klar student interface with task overview and prioritization",
        },
        {
          lookup: "Hjelpekø",
          label: "Help queue",
          alt: "Klar help queue view for student support",
        },
        {
          lookup: "Elevadministrasjon med opt-ins",
          label: "Student administration with opt-ins",
          alt: "Klar student administration with optional motivation features",
        },
        {
          lookup: "Level-up-modal",
          label: "Level-up modal",
          alt: "Klar level-up modal for opt-in motivation",
        },
        {
          lookup: "Blomsterhage / progresjon",
          label: "Flower garden / progress",
          alt: "Klar flower garden showing progress over time",
        },
      ],
    },
    supportingSection: {
      label: "More technical threads",
      title: "Projects that show building, not just ideas",
      lede:
        "I want the portfolio to show how I think as a developer: stack choices, boundaries, documentation, and when something should be built or integrated.",
      secondaryLabel: "Earlier and supporting work",
    },
    supportingCases: [
      {
        id: "forloper",
        tier: "primary",
        title: "The precursor project to Klar",
        type: "Participatory design / early full-stack prototype",
        role: "Developer and co-designer",
        tech: "Python, Django, SQLite, Vue.js",
        link: "https://pd-app-frontend.vercel.app/",
        linkLabel: "Open PD app",
        accessNote: `Contact me for user access: ${email}`,
        description: [
          "This project was the precursor to Klar. I built a working prototype for overview and prioritization of schoolwork, with a Django backend and Vue frontend.",
          "It is early code, but important evidence: I moved from needs work into an actual system, with students as co-designers and limited resources.",
        ],
        bullets: [
          "Python/Django backend and SQLite",
          "Vue frontend and practical full-stack learning",
          "Needs translated into testable software",
        ],
        screenshots: [
          {
            lookup: "Prototype-skjermbilde",
            label: "Prototype screenshot",
            alt: "Early PD app prototype, the precursor project to Klar",
          },
        ],
      },
      {
        id: "companion",
        tier: "primary",
        title: "Companion / nikkoprogging",
        type: "Flutter/Dart / local-first app and documented dev workflow",
        tech: "Flutter, Dart, Drift, SQLite, tests, planning and epic documents",
        link: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "View repo",
        description: [
          "The Companion project is my clearest evidence of long-running agentic development discipline: small safe deliveries, planning documents, database choices and tests.",
        ],
        bullets: [
          "Local-first architecture with Drift/SQLite",
          "Plans, epics and PROJECT_DNA as a working contract",
          "Tests around database, history and event state",
        ],
      },
      {
        id: "lori",
        tier: "primary",
        title: "Lori Frisør",
        type: "Astro/Vercel / pragmatic delivery and handoff",
        tech: "Astro, Keystatic, Vercel, owner editing, handoff documentation",
        link: "https://github.com/stianglomsrod/lori-frisor",
        linkLabel: "View repo",
        description: [
          "A small delivery project where the point was making something maintainable for a real owner. I chose to integrate Timma for booking instead of building unnecessary complexity.",
        ],
        bullets: [
          "Conscious build-vs-integrate decision",
          "Keystatic for owner-editable content",
          "Handoff, decisions and technical debt documented",
        ],
      },
      {
        id: "wordhunt",
        tier: "secondary",
        title: "Wordhunt / CS50x final project",
        type: "Early independent coding project",
        tech: "HTML, CSS, JavaScript",
        link: "https://www.youtube.com/watch?v=tI5fU1aAAvI",
        linkLabel: "Watch Wordhunt video",
        description: [
          "A simple web app where the teacher enters words and the application generates a 10x10 word search with the words placed in a grid of random letters. Print CSS formats the result as a printable worksheet.",
        ],
        bullets: [
          "Early technical problem solving",
          "Small tools for real needs",
          "Practical JavaScript experience",
        ],
      },
      {
        id: "fagtekst",
        tier: "secondary",
        title: "AI and academic text comprehension",
        type: "Figma prototype / AI interface",
        role: "Co-designer",
        link: "https://www.figma.com/proto/CH7TbwA8ImoHzZ6FvBj8Bf/Arbeidskrav-3?node-id=27-44&starting-point-node-id=27%3A44&t=dm0tzpdCkHy75Ldm-1",
        linkLabel: "Open Warp Read in Figma",
        description: [
          "A prototype exploring how generative AI could make academic text more understandable through levels, adjusted complexity, hypertext and quizzes.",
        ],
        bullets: [
          "Early AI exploration",
          "Interaction around text and comprehension",
          "Useful product intuition for AI-driven interfaces",
        ],
        screenshots: [
          {
            lookup: "Figma-prototype",
            label: "Figma prototype",
            alt: "Warp Read prototype for AI and academic text comprehension in Figma",
          },
        ],
      },
      {
        id: "ask-away",
        tier: "secondary",
        title: "ASK Away",
        type: "Figma prototype / accessibility case",
        role: "Initiator and prototype developer",
        link: "https://www.figma.com/proto/u7vwxKdeBTXxGwCBgJZPk8/Skolestudio-med-ASK?node-id=103-1056&starting-point-node-id=75%3A2&t=xMWyRa5weOfYpB11-1",
        linkLabel: "Open ASK Away in Figma",
        description: [
          "ASK Away grew out of practice experience with students who use augmentative and alternative communication. It shows needs understanding and accessibility as a technical premise.",
        ],
        bullets: [
          "Practice-based needfinding",
          "Inclusive design",
          "Universal design as a system requirement",
        ],
        screenshots: [
          {
            lookup: "Figma-prototype",
            label: "Figma prototype",
            alt: "ASK Away prototype with AAC symbol support in a learning interface",
          },
        ],
      },
    ],
    workflow: {
      label: "Workflow",
      title: "How I build with AI",
      text:
        "AI agents make me faster, but they do not get the last word. I work in a fixed development flow where every step has an owner, a boundary and a clear sign of what counts as done.",
      note:
        "The goal is not to be a prompt person. The goal is to build software faster without losing responsibility, testability or technical judgement.",
      stepsAria: "The development process step by step",
      steps: [
        {
          phase: "Context",
          text: "Start with goals, constraints, sources, risks and acceptance criteria.",
        },
        {
          phase: "Requirements",
          text: "Break the work into small, reviewable steps with clear scope.",
        },
        {
          phase: "Build",
          text: "Use agent output as drafts for code, structure, tests or docs.",
        },
        {
          phase: "Review",
          text: "Read, test and judge the suggestions before they move forward.",
        },
        {
          phase: "Correct",
          text: "Catch false assumptions, tighten scope and fix deviations.",
        },
        {
          phase: "QA",
          text: "Check claims, edge cases, accessibility and technical risk.",
        },
        {
          phase: "Document",
          text: "Log decisions, uncertainty and handoff while context is fresh.",
        },
        {
          phase: "Handoff",
          text: "Make the work understandable enough for others to carry forward.",
        },
      ],
      evidenceLabel: "Three projects · one pattern",
      evidenceTitle: "Product, workflow and handoff",
      evidenceIntro:
        "These are not three random projects. Together they show how I build with AI in practice: product, development discipline and enablement.",
      evidenceBoundary:
        "The examples show how I work and the engineering judgement behind it, at prototype scale. They are not claims of senior platform ownership or enterprise scale.",
      evidenceProjects: [
        {
          tag: "Full-stack AI product",
          name: "Klar",
          proof:
            "Next.js, React, TypeScript, Supabase/PostgreSQL, auth/RBAC and AI-assisted import with a preview gate.",
          note: "The closest thing I have to a complete product.",
          primary: { label: "Open Klar", href: "https://klar-sigma.vercel.app/" },
          repo: { label: "Repo", href: "https://github.com/stianglomsrod/klar" },
        },
        {
          tag: "Documented dev workflow",
          name: "Companion",
          proof:
            "Flutter, Dart, Drift/SQLite, local-first architecture, planning docs, epics and tests.",
          note: "Long-running agentic development discipline in practice.",
          primary: {
            label: "View repo",
            href: "https://github.com/stianglomsrod/nikkoprogging",
          },
        },
        {
          tag: "Enablement and handoff",
          name: "Lori Frisør",
          proof:
            "Astro, Keystatic, Vercel, owner editing, handoff and pragmatic integration instead of overbuilding.",
          note: "Practical delivery for a real owner.",
          primary: {
            label: "View repo",
            href: "https://github.com/stianglomsrod/lori-frisor",
          },
          repo: {
            label: "Site",
            href: "https://lori-frisor.vercel.app/",
          },
        },
      ],
    },
    developer: {
      label: "Dev path",
      title: "Learning speed and an honest growth direction",
      lede:
        "I am not a traditional senior platform engineer. What I can show today is fast learning, working full-stack prototypes and a documented way of using AI in development.",
      nowTitle: "What I can show now",
      now: [
        "Working web products and prototypes across Next.js/React, Supabase/PostgreSQL, Python/Django, Vue, Astro and Flutter/Dart.",
        "Steady output over time across code, documentation, QA, technical debt and improvement loops.",
        "Ability to turn new knowledge into something others can use: prototypes, checklists, handoff documents and workflows.",
      ],
      growthTitle: "What I am building toward",
      growthLede:
        "This is my direction, not an attempt to oversell my current level:",
      growth: [
        "Deeper programming, tooling and platform thinking.",
        "Robustness, observability and more operational practice.",
        "Distributed systems, GitHub Actions/API and agentic frameworks such as MCP.",
      ],
      learningTitle: "Programming and how I got here",
      learningLede:
        "The foundation has been built piece by piece, from CS50x and small tools to full-stack prototypes.",
      learning: [
        "CS50x gave me a foundation in C, Python, SQL, HTML, CSS and JavaScript.",
        "The project before Klar gave me practical Python/Django, Vue and full-stack context.",
        "Klar brought together Next.js, React, Supabase, auth, role logic and AI-assisted import.",
        "The Companion track shows interest in local-first architecture, SQLite/Drift and testable app logic.",
      ],
      linksAria: "Links to programming evidence and technical projects",
      links: [
        {
          label: "CS50x certificate",
          href: "https://cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45",
        },
        {
          label: "PD app frontend",
          href: "https://github.com/stianglomsrod/pd-app-frontend",
        },
        {
          label: "PD app backend",
          href: "https://github.com/stianglomsrod/pd-app-backend",
        },
      ],
      honest:
        "The honest position: my strongest evidence today is AI-first full-stack product building, quality-controlled workflow and clear handoff. Deeper platform and low-level work is the growth direction.",
    },
    footer: {
      title: "Contact",
      links: [
        { label: "Email", href: `mailto:${email}` },
        {
          label: "LinkedIn",
          href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
        },
        { label: "GitHub", href: "https://github.com/stianglomsrod" },
      ],
      privacyLabel: "Privacy and cookies",
      copyrightPrefix: "©",
    },
  },
};
