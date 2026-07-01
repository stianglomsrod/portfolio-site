import type { MinigameDef } from "../../engine/types";

// "Ordkryss" (NEVER "Ordryss") runs as two short challenges chained together:
// a fill-in-the-blanks JavaScript for-loop, then a conceptual git commit.
// SECURITY: the for-loop is token-pick / fill-in-the-blank — it NEVER evals
// arbitrary player code.
export const minigames: MinigameDef[] = [
  {
    id: "ordkryss-forloop",
    kind: "code-forloop",
    title: { no: "Ordkryss", en: "Ordkryss" },
    intro: {
      no: "Ordkryss — CS50x-sluttprosjektet ditt. To små ting gjenstår.",
      en: "Ordkryss — your CS50x final project. Two small things left.",
    },
    next: "ordkryss-commit",
    config: {
      prompt: {
        no: "Skriv en løkke som skriver tallene 1 til 5 (én per linje).",
        en: "Write a loop that prints the numbers 1 to 5 (one per line).",
      },
      templateLines: [
        "for (let i = ___; i ___ 5; i___) {",
        "  console.log(i);",
        "}",
      ],
      blanks: [
        { id: "start", options: ["0", "1", "5"], correct: "1" },
        { id: "test", options: ["<", "<=", "=="], correct: "<=" },
        { id: "step", options: ["++", "--", "+= 2"], correct: "++" },
      ],
      expected: ["1", "2", "3", "4", "5"],
      successText: {
        no: "5 linjer, 1 til 5. Løkka går rundt akkurat nok ganger.",
        en: "5 lines, 1 to 5. The loop runs exactly enough times.",
      },
      hint: {
        no: "Tell fra 1 til 5. Ikke noe mer.",
        en: "Count from 1 to 5. Nothing more.",
      },
    },
  },
  {
    id: "ordkryss-commit",
    kind: "git-commit",
    title: { no: "Ordkryss", en: "Ordkryss" },
    intro: {
      no: "Ordkryss funker. På tide å lagre arbeidet i git.",
      en: "Ordkryss works. Time to save the work in git.",
    },
    completesQuest: "hjem-til-ordkryss",
    config: {
      setup: {
        no: "Tre filer er endret. Stage, skriv en melding, og commit.",
        en: "Three files changed. Stage, write a message, and commit.",
      },
      files: ["index.html", "ordkryss.js", "styles.css"],
      stageLabel: {
        no: "Legg til alle endringer (git add .)",
        en: "Stage all changes (git add .)",
      },
      messagePrompt: {
        no: "Velg en commit-melding.",
        en: "Choose a commit message.",
      },
      messageOptions: [
        {
          id: "good",
          text: "Fullfør Ordkryss: generering og utfylling av kryssord",
          good: true,
        },
        {
          id: "stuff",
          text: "stuff",
          good: false,
          nudge: {
            no: "En commit-melding bør si hva som faktisk ble gjort.",
            en: "A commit message should say what was actually done.",
          },
        },
        {
          id: "asdf",
          text: "asdf",
          good: false,
          nudge: {
            no: "En commit-melding bør si hva som faktisk ble gjort.",
            en: "A commit message should say what was actually done.",
          },
        },
      ],
      commitLabel: { no: "Commit", en: "Commit" },
      successText: {
        no: "Committed. Arbeidet er lagret.",
        en: "Committed. The work is saved.",
      },
    },
  },
  {
    id: "oslomet-pd-brief",
    kind: "choice",
    title: { no: "Forløperoppdrag", en: "Precursor briefing" },
    intro: {
      no: "Veilederen gir deg det første oppdraget.",
      en: "The supervisor gives you the first assignment.",
    },
    completesQuest: "oslomet-pd",
    config: {
      setup: {
        no: "«Hvordan bygger du en prototype som treffer?»",
        en: '"How do you build a prototype that hits the mark?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "kult",
          label: {
            no: "Bygg det du selv synes er kult.",
            en: "Build what you think is cool.",
          },
          correct: false,
          feedback: {
            no: "Da bommer du lett på behovet.",
            en: "That easily misses the real need.",
          },
        },
        {
          id: "med",
          label: {
            no: "Bygg SAMMEN med fremtidige brukere som meddesignere.",
            en: "Build TOGETHER with future users as co-designers.",
          },
          correct: true,
          feedback: {
            no: "Ja. Deltakende design gir realistisk retning.",
            en: "Yes. Participatory design gives a realistic direction.",
          },
        },
        {
          id: "vent",
          label: {
            no: "Vent til alt er ferdig, så spør.",
            en: "Wait until it's all done, then ask.",
          },
          correct: false,
          feedback: {
            no: "For sent å endre retning da.",
            en: "Too late to change direction by then.",
          },
        },
      ],
      outro: {
        no: "Oppdrag: bygg forløperprototypen (pd-app) hjemme ved PC-en — Python/Django + JavaScript/Vue, med brukerne som meddesignere.",
        en: "Assignment: build the precursor prototype (pd-app) at home — Python/Django + JavaScript/Vue, with the users as co-designers.",
      },
    },
  },
  {
    id: "pd-app-build",
    kind: "choice",
    title: { no: "pd-app", en: "pd-app" },
    intro: {
      no: "Forløperprototypen skal kobles sammen ved PC-en.",
      en: "The precursor prototype gets wired together at the PC.",
    },
    completesQuest: "pd-app-bygg",
    config: {
      setup: {
        no: "«Hva binder prototypen sammen?»",
        en: '"What ties the prototype together?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "frontend",
          label: { no: "Bare en fin frontend.", en: "Just a nice frontend." },
          correct: false,
          feedback: {
            no: "Uten backend og behov henger det ikke sammen.",
            en: "Without a backend and real needs it falls apart.",
          },
        },
        {
          id: "full",
          label: {
            no: "Frontend (Vue) + backend (Django) + brukerbehov.",
            en: "Frontend (Vue) + backend (Django) + user needs.",
          },
          correct: true,
          feedback: {
            no: "Nettopp. Full sløyfe fra behov til funksjon.",
            en: "Exactly. A full loop from need to feature.",
          },
        },
        {
          id: "mal",
          label: {
            no: "Kopier en tilfeldig mal.",
            en: "Copy a random template.",
          },
          correct: false,
          feedback: {
            no: "Da mister du brukerinnsikten.",
            en: "Then you lose the user insight.",
          },
        },
      ],
      outro: {
        no: "pd-app kjører. Ta den med tilbake til OsloMet — masteroppgaven venter.",
        en: "pd-app runs. Take it back to OsloMet — the master's thesis awaits.",
      },
    },
  },
  {
    id: "oslomet-master-brief",
    kind: "choice",
    title: { no: "Masteroppgaven", en: "Master's thesis" },
    intro: {
      no: "Veilederen gir deg masteroppdraget.",
      en: "The supervisor gives you the master's assignment.",
    },
    completesQuest: "oslomet-master",
    config: {
      setup: {
        no: "«Hva skal du gjøre for å skrive en god oppgave?»",
        en: '"What should you do to write a good thesis?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "bygg",
          label: {
            no: "Å bygge noe som funker.",
            en: "Building something that works.",
          },
          correct: false,
          feedback: {
            no: "Ikke nok — det må begrunnes og evalueres.",
            en: "Not enough — it must be justified and evaluated.",
          },
        },
        {
          id: "alle-tre",
          label: {
            no: "Bygge, begrunne og evaluere.",
            en: "Build, justify and evaluate.",
          },
          correct: true,
          feedback: {
            no: "Ja. Artefakt + begrunnelse + evaluering.",
            en: "Yes. Artefact + justification + evaluation.",
          },
        },
        {
          id: "rapport",
          label: {
            no: "Skrive rapport uten å bygge.",
            en: "Writing a report without building.",
          },
          correct: false,
          feedback: {
            no: "Design Science bygger faktisk artefakten.",
            en: "Design Science actually builds the artefact.",
          },
        },
      ],
      outro: {
        no: "Design Science, altså. Neste steg: hent lærerinnsikter i skolens workshop — gjør behov til designprinsipper for Klar.",
        en: "Design Science, then. Next: gather teacher insights in the school workshop — turn needs into design principles for Klar.",
      },
    },
  },
  {
    id: "workshop-synth",
    kind: "choice",
    title: { no: "Journey map", en: "Journey map" },
    intro: {
      no: "Behov, friksjon og et designgrep ligger på bordet.",
      en: "Needs, friction and a design move lie on the table.",
    },
    completesQuest: "laererworkshop",
    config: {
      setup: {
        no: "«Hvordan bruker du lærerinnsiktene i Klar?»",
        en: '"How do you use the teacher insights in Klar?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "overse",
          label: {
            no: "Overse lærerne og lag ting du synes er kult.",
            en: "Ignore the teachers and build what you think is cool.",
          },
          correct: false,
          feedback: {
            no: "Da mister du hele poenget med medvirkning.",
            en: "That loses the whole point of participation.",
          },
        },
        {
          id: "prinsipper",
          label: {
            no: "Bruk designprinsippene fra lærerne som rammen for utvikling.",
            en: "Use the teachers' design principles as the frame for development.",
          },
          correct: true,
          feedback: {
            no: "Nettopp. Behovene blir prinsipper som styrer Klar.",
            en: "Exactly. The needs become principles that steer Klar.",
          },
        },
        {
          id: "backflip",
          label: {
            no: "Ta en backflip og spis krittet ved tavla.",
            en: "Do a backflip and eat the chalk by the board.",
          },
          correct: false,
          feedback: {
            no: "Fristende, men neppe god metode.",
            en: "Tempting, but hardly sound method.",
          },
        },
      ],
      outro: {
        no: "Klar tar form — bygget på lærernes prinsipper. Masteren er i havn. Reisen peker mot DNB.",
        en: "Klar takes shape — built on the teachers' principles. The master's is done. The journey points to DNB.",
      },
    },
  },
  {
    id: "portefolje-build",
    kind: "choice",
    title: { no: "DNB-porteføljen", en: "The DNB portfolio" },
    intro: {
      no: "Bygg søknadssiden ved PC-en — med AI, styrt av deg.",
      en: "Build the application site at the PC — with AI, steered by you.",
    },
    completesQuest: "portefolje",
    config: {
      setup: {
        no: "«AI-agenten foreslår brede påstander. Hva gjør du?»",
        en: '"The AI agent suggests broad claims. What do you do?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "behold",
          label: {
            no: "Behold alt — det høres imponerende ut.",
            en: "Keep it all — it sounds impressive.",
          },
          correct: false,
          feedback: {
            no: "Overclaims sprekker i første samtale.",
            en: "Overclaims fall apart in the first conversation.",
          },
        },
        {
          id: "stram",
          label: {
            no: "Stram inn: fjern overclaims, vis ekte bevis.",
            en: "Tighten it: remove overclaims, show real evidence.",
          },
          correct: true,
          feedback: {
            no: "Nettopp. Klar som hovedcase, arbeidsflyt som bevis, ærlige grenser.",
            en: "Exactly. Klar as the lead case, workflow as evidence, honest boundaries.",
          },
        },
        {
          id: "ekspert",
          label: {
            no: "Slett alt og skriv «ekspert» overalt.",
            en: 'Delete it all and write "expert" everywhere.',
          },
          correct: false,
          feedback: {
            no: "Da er du like langt — bare mindre ærlig.",
            en: "That gets you nowhere — just less honest.",
          },
        },
      ],
      outro: {
        no: "Porteføljen er klar. DNB tar bare imot komplette søknadspakker — nå har du en. Gå og lever den.",
        en: "The portfolio is ready. DNB only accepts complete application packages — now you have one. Go deliver it.",
      },
    },
  },
  {
    id: "nikko-build",
    kind: "choice",
    title: { no: "Nikkos idé", en: "Nikko's idea" },
    intro: {
      no: "Nikko har en idé til en companion-app. Du bygger den med arbeidsflyten din.",
      en: "Nikko has an idea for a companion app. You build it with your workflow.",
    },
    completesQuest: "nikko-sidequest",
    config: {
      setup: {
        no: "«Hvordan bygger du Nikkos idé skikkelig?»",
        en: '"How do you build Nikko\'s idea properly?"',
      },
      prompt: { no: "Velg.", en: "Choose." },
      options: [
        {
          id: "fritt",
          label: {
            no: "La AI-agenten kjøre helt fritt.",
            en: "Let the AI agent run completely free.",
          },
          correct: false,
          feedback: {
            no: "Da eier du ikke resultatet. Du har fortsatt ansvaret.",
            en: "Then you don't own the result. You're still responsible.",
          },
        },
        {
          id: "workflow",
          label: {
            no: "Agentisk arbeidsflyt: krav, review, QA, dokumentasjon, lokal-first.",
            en: "Agentic workflow: requirements, review, QA, docs, local-first.",
          },
          correct: true,
          feedback: {
            no: "Nettopp. Langvarig, dokumentert disiplin — companion_app.",
            en: "Exactly. Long-running, documented discipline — companion_app.",
          },
        },
        {
          id: "manuelt",
          label: {
            no: "Skriv alt for hånd og dropp verktøy.",
            en: "Write everything by hand and skip the tools.",
          },
          correct: false,
          feedback: {
            no: "Tregt. Poenget er å bruke AI godt, ikke å nekte.",
            en: "Slow. The point is to use AI well, not to refuse it.",
          },
        },
      ],
      outro: {
        no: "Companion-appen lever i nikkoprogging — lokal-first og dokumentert. Se repoet i menyen.",
        en: "The companion app lives in nikkoprogging — local-first and documented. See the repo in the menu.",
      },
    },
  },
];
