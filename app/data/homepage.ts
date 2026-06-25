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
    metaTitle: "Stian Glomsrød — fullstack utvikler",
    metaDescription:
      "Fullstackutvikling, brukerinnsikt fra workshops og AI som praktisk utviklingsverktøy.",
    skipLink: "Hopp til innhold",
    nav: {
      label: "Hovednavigasjon",
      work: "Arbeid",
      klar: "Klar",
      workflow: "Prosess",
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
      eyebrow: "Fullstack utvikler med AI som verktøy",
      title:
        "Jeg utvikler programvare fra uklare behov til fungerende systemer.",
      intro:
        "Jeg jobber fullstack og bruker AI som støtte i utviklingen. Jeg liker å starte med behov og brukerinnsikt, prøve løsningene i kode, og teste dem opp mot produktmål og designprinsipper.",
      portraitAlt: "Portrett av Stian Glomsrød",
      primaryCta: "Se teknisk arbeid",
      secondaryCta: "Ta kontakt",
      proof: [
        "Klar: Next.js, React, TypeScript og Supabase i en fungerende PWA",
        "Brukerinnsikt fra lærerworkshops, scenarioer og prototypetesting",
        "Python/Django, Vue, Flutter/Dart og Astro i praktiske prosjekter",
      ],
      workPanelTitle: "Konkrete spor",
      workPanelIntro:
        "Noen konkrete spor: et masterprosjekt som ble en fungerende prototype, prosjekter over tid og en arbeidsmåte der valgene kan sjekkes.",
      highlights: [
        {
          href: "#klar",
          title: "Klar",
          meta: "Next.js · Supabase · PWA",
          text: "Fullstack prototype med lærer/elev-roller, auth, dataflyt og AI-assistert Smart Import.",
        },
        {
          href: "#workflow",
          title: "Utviklingsflyt med AI",
          meta: "Krav · review · QA · handoff",
          text: "AI brukes som støtte, men kode, valg og vurderinger må fortsatt forstås og sjekkes.",
        },
        {
          href: "#dev-path",
          title: "Veien hit",
          meta: "CS50x · Python · JS · Flutter",
          text: "En teknisk progresjon fra små verktøy til fullstack og lokal-first apparkitektur.",
        },
      ],
    },
    featuredSection: {
      label: "Hovedcase",
      title: "Klar som hovedcase",
    },
    featuredCase: {
      id: "klar",
      title: "Klar — fullstack PWA for struktur, oversikt og støtte i skolen",
      type: "Masterprosjekt / fungerende fullstack webprototype",
      role: "Produktutvikler, fullstack prototypeutvikler og fasilitator",
      tech: "React, Next.js, TypeScript, Supabase/PostgreSQL, auth/RBAC, PWA, AI-støttet utviklingsflyt",
      link: "https://klar-sigma.vercel.app/",
      linkLabel: "Åpne Klar",
      accessNote: `Demo-/brukertilgang gis ved forespørsel: ${email}`,
      summary:
        "Klar startet i masterprosjektet mitt og ble utviklet gjennom lærerworkshops, scenarioer og en fungerende prototype. Resultatet er en PWA med lærer- og elevrolle, innlogging, strukturert dataflyt og AI-assistert import med kontroll før publisering.",
      facets: [
        {
          label: "Produktet",
          text: "Én React/Next.js-kodebase serverer to ulike grensesnitt: lærer og elev. Valgene er gjort rundt faktisk bruk i skolen: nettleser, Chromebook, mobil, lav terskel og tydelige roller.",
        },
        {
          label: "Data og innlogging",
          text: "Supabase/PostgreSQL gir et standardisert datalag, autentisering og rollebasert tilgang. Det gjør prototypen mer enn en klikkbar demo: den har reelle systemgrenser.",
        },
        {
          label: "Smart Import",
          text: "Smart Import tolker ukebrev og foreslår oppgaver, fag og timeplan. Det løser en konkret flaskehals for læreren, i stedet for å bruke AI som pynt.",
        },
        {
          label: "Kontroll før publisering",
          text: "AI-forslag går gjennom en redigerbar forhåndsvisning før publisering. Læreren beholder kontrollen, og feil kan fanges før elevene ser innholdet.",
        },
      ],
      lookForHeading: "Se spesielt etter",
      description: [],
      bullets: [
        "Next.js/React/TypeScript i fungerende produktkontekst",
        "Supabase/PostgreSQL, innlogging og rollebasert tilgang",
        "AI-import med menneske-i-løkka forhåndsvisning",
        "Brukerinnsikt fra planlagte workshops og scenariobasert evaluering",
        "PWA og plattformuavhengighet som praktisk engineering-valg",
        "En prototype som er klar for videre elevtesting, ikke en ferdig skoleplattform",
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
      title: "Prosjekter som har blitt til noe",
      lede:
        "Jeg vil at porteføljen skal vise hvordan jeg jobber: stackvalg, avgrensninger, dokumentasjon, og når noe bør bygges eller integreres.",
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
          "Det er tidlig kode, men retningen er tydelig: behovsarbeid med elever ble oversatt til et system som kunne prøves.",
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
        type: "Flutter/Dart / lokal-first app og dokumentert utvikling",
        tech: "Flutter, Dart, Drift, SQLite, tester, plan- og epic-dokumenter",
        link: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "Se repoet",
        description: [
          "Companion-prosjektet viser hvordan jeg jobber over tid: små leveranser, plan-dokumenter, databasevalg og tester rundt app-logikken.",
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
      label: "Prosess",
      title: "Hvordan jeg bruker AI i utvikling",
      text:
        "AI gjør meg raskere, men den får ikke siste ord. Jeg prøver å holde arbeidet konkret: forstå målet, dele det opp, teste underveis og skrive ned valgene mens konteksten fortsatt er fersk.",
      note:
        "Målet er ikke å slippe å kunne ting. Målet er å utvikle raskere uten å miste ansvar, testbarhet eller teknisk dømmekraft.",
      stepsAria: "Utviklingsprosessen steg for steg",
      steps: [
        {
          phase: "Kontekst",
          text: "Starte med mål, rammer, kilder, risiko og akseptansekriterier.",
        },
        {
          phase: "Avgrense",
          text: "Bryte arbeidet ned i små steg som kan leses, testes og endres.",
        },
        {
          phase: "Utvikle",
          text: "Bruke AI-output som utkast til kode, struktur, tester eller dokumentasjon.",
        },
        {
          phase: "Lese",
          text: "Lese, teste og vurdere forslagene før de får gå videre.",
        },
        {
          phase: "Korrigere",
          text: "Fange feil antagelser, stramme scope og rette avvik.",
        },
        {
          phase: "Sjekke",
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
      evidenceLabel: "Tre prosjekter · samme arbeidsmåte",
      evidenceTitle: "Produkt, prosess og overlevering",
      evidenceIntro:
        "Prosjektene viser samme mønster i ulike størrelser: forstå behovet, lage noe som virker, og gjøre arbeidet mulig å ta videre.",
      evidenceBoundary:
        "Dette er først og fremst prototype- og produktarbeid. Dypere plattform- og driftsansvar er noe jeg utvikler meg videre mot.",
      evidenceProjects: [
        {
          tag: "Fullstack produkt",
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
          note: "Langsiktig utviklingsarbeid i praksis.",
          primary: {
            label: "Se repoet",
            href: "https://github.com/stianglomsrod/nikkoprogging",
          },
        },
        {
          tag: "Enablement og handoff",
          name: "Lori Frisør",
          proof:
            "Astro, Keystatic, Vercel, owner-editing, handoff og pragmatisk integrasjon uten unødvendig plattformlag.",
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
      label: "Veien hit",
      title: "Hvor jeg står, og hva jeg lærer nå",
      lede:
        "Jeg er ikke en tradisjonell senior plattformutvikler. Det jeg kan vise nå, er høy læringshastighet, fungerende fullstack-prototyper og en ryddig måte å bruke AI i utvikling på.",
      nowTitle: "Det jeg kan vise nå",
      now: [
        "Fungerende webprodukter og prototyper på tvers av Next.js/React, Supabase/PostgreSQL, Python/Django, Vue, Astro og Flutter/Dart.",
        "Jevn produksjon over tid på tvers av kode, dokumentasjon, QA, teknisk gjeld og forbedringsløkker.",
        "Evne til å gjøre ny kunnskap om til noe andre kan bruke: prototyper, sjekklister, handoff-dokumenter og arbeidsflyter.",
      ],
      growthTitle: "Det jeg utvikler videre",
      growthLede:
        "Dette er retningen min videre:",
      growth: [
        "Dypere programmering, verktøyutvikling og plattformtenkning.",
        "Robusthet, observability og mer driftsnær praksis.",
        "Distribuerte systemer, GitHub Actions/API og rammeverk som MCP.",
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
        "Kortversjonen: Jeg står sterkest i fullstack produktutvikling, brukerinnsikt, kvalitetssikret AI-bruk og tydelig overlevering. Dypere plattform- og lavnivåarbeid er retningen videre.",
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
    metaTitle: "Stian Glomsrød — full-stack developer",
    metaDescription:
      "Full-stack development, user insight from workshops, and AI as a practical development tool.",
    skipLink: "Skip to content",
    nav: {
      label: "Main navigation",
      work: "Work",
      klar: "Klar",
      workflow: "Process",
      dev: "Path",
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
      eyebrow: "Full-stack developer using AI as a tool",
      title: "I turn unclear needs into working software.",
      intro:
        "I work full-stack and use AI as support while developing. I like starting from needs and user insight, trying solutions in code, and testing them against product goals and design principles.",
      portraitAlt: "Portrait of Stian Glomsrød",
      primaryCta: "View technical work",
      secondaryCta: "Contact me",
      proof: [
        "Next.js, React, TypeScript and Supabase in a working PWA",
        "AI agents used with requirements, QA, documentation and handoff",
        "Python/Django, Vue, Flutter/Dart, Astro and practical repositories",
      ],
      workPanelTitle: "Concrete work",
      workPanelIntro:
        "A few concrete threads: a master's project that became a working prototype, projects over time, and a way of working where choices can be checked.",
      highlights: [
        {
          href: "#klar",
          title: "Klar",
          meta: "Next.js · Supabase · PWA",
          text: "Full-stack prototype with teacher/student roles, auth, data flow and AI-assisted Smart Import.",
        },
        {
          href: "#workflow",
          title: "AI in my dev flow",
          meta: "Requirements · review · QA · handoff",
          text: "AI helps with drafts, but code, choices and tradeoffs still have to be understood and checked.",
        },
        {
          href: "#dev-path",
          title: "Path here",
          meta: "CS50x · Python · JS · Flutter",
          text: "A technical progression from small tools to full-stack and local-first app architecture.",
        },
      ],
    },
    featuredSection: {
      label: "Main case",
      title: "Klar as the main case",
    },
    featuredCase: {
      id: "klar",
      title:
        "Klar — a full-stack PWA with AI-assisted import and role logic",
      type: "Master's project / working full-stack web prototype",
      role: "Product developer, full-stack prototype developer and facilitator",
      tech: "React, Next.js, TypeScript, Supabase/PostgreSQL, auth/RBAC, PWA, AI-supported development workflow",
      link: "https://klar-sigma.vercel.app/",
      linkLabel: "Open Klar",
      accessNote: `Demo/user access available on request: ${email}`,
      summary:
        "Klar started in my master's project and was developed through teacher workshops, scenarios and a working prototype. The result is a PWA with teacher and student roles, sign-in, structured data flow and AI-assisted import with review before publishing.",
      facets: [
        {
          label: "The product",
          text: "One React/Next.js codebase serves two different interfaces: teacher and student. The choices are built around real school use: browser, Chromebook, mobile, low friction and clear roles.",
        },
        {
          label: "Data and sign-in",
          text: "Supabase/PostgreSQL provides a standardised data layer, authentication and role-based access. That makes the prototype more than a clickable demo: it has real system boundaries.",
        },
        {
          label: "Smart Import",
          text: "Smart Import interprets weekly letters and suggests tasks, subjects and schedules. It solves a concrete teacher bottleneck instead of using AI as decoration.",
        },
        {
          label: "Review before publishing",
          text: "AI suggestions go through an editable preview before publishing. The teacher keeps control, and errors can be caught before students see the content.",
        },
      ],
      lookForHeading: "What to look for",
      description: [],
      bullets: [
        "Next.js/React/TypeScript in a working product context",
        "Supabase/PostgreSQL, sign-in and role-based access",
        "AI import with a human-in-the-loop preview",
        "User insight from planned workshops and scenario-based evaluation",
        "PWA and platform independence as practical engineering choices",
        "A prototype ready for further student testing, not a finished school platform",
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
      title: "Projects that became something",
      lede:
        "I want the portfolio to show how I work: stack choices, boundaries, documentation, and when something should be built or integrated.",
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
          "It is early code, but the direction is clear: needs work with students was translated into a system that could be tried.",
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
        type: "Flutter/Dart / local-first app and documented development",
        tech: "Flutter, Dart, Drift, SQLite, tests, planning and epic documents",
        link: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "View repo",
        description: [
          "The Companion project shows how I work over time: small deliveries, planning documents, database choices and tests around app logic.",
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
      label: "Process",
      title: "How I use AI in development",
      text:
        "AI makes me faster, but it does not get the last word. I try to keep the work concrete: understand the goal, break it down, test as I go, and write down choices while the context is still fresh.",
      note:
        "The goal is not to avoid knowing things. The goal is to develop faster without losing responsibility, testability or technical judgement.",
      stepsAria: "The development process step by step",
      steps: [
        {
          phase: "Context",
          text: "Start with goals, constraints, sources, risks and acceptance criteria.",
        },
        {
          phase: "Scope",
          text: "Break the work into small steps that can be read, tested and changed.",
        },
        {
          phase: "Develop",
          text: "Use AI output as drafts for code, structure, tests or documentation.",
        },
        {
          phase: "Read",
          text: "Read, test and judge the suggestions before they move forward.",
        },
        {
          phase: "Correct",
          text: "Catch false assumptions, tighten scope and fix deviations.",
        },
        {
          phase: "Check",
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
      evidenceLabel: "Three projects · same working style",
      evidenceTitle: "Product, process and handoff",
      evidenceIntro:
        "The projects show the same pattern at different sizes: understand the need, make something that works, and leave the work possible to continue.",
      evidenceBoundary:
        "This is mostly product and prototype work. Deeper platform and operations work is something I am working toward.",
      evidenceProjects: [
        {
          tag: "Full-stack product",
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
          note: "Long-running development work in practice.",
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
      label: "Path here",
      title: "Where I am, and what I am learning now",
      lede:
        "I am not a traditional senior platform engineer. What I can show today is fast learning, working full-stack prototypes and a tidy way of using AI in development.",
      nowTitle: "What I can show now",
      now: [
        "Working web products and prototypes across Next.js/React, Supabase/PostgreSQL, Python/Django, Vue, Astro and Flutter/Dart.",
        "Steady output over time across code, documentation, QA, technical debt and improvement loops.",
        "Ability to turn new knowledge into something others can use: prototypes, checklists, handoff documents and workflows.",
      ],
      growthTitle: "What I am working toward",
      growthLede: "This is the direction I am moving in:",
      growth: [
        "Deeper programming, tooling and platform thinking.",
        "Robustness, observability and more operational practice.",
        "Distributed systems, GitHub Actions/API and frameworks such as MCP.",
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
      linksAria: "Links to programming certificates and technical projects",
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
        "Short version: I am strongest in full-stack product development, user insight, careful AI use and clear handoff. Deeper platform and low-level work is the direction ahead.",
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
