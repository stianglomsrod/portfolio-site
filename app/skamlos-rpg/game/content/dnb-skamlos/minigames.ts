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
      hint: { no: "Tell fra 1 til 5. Ikke noe mer.", en: "Count from 1 to 5. Nothing more." },
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
      stageLabel: { no: "Legg til alle endringer (git add .)", en: "Stage all changes (git add .)" },
      messagePrompt: { no: "Velg en commit-melding.", en: "Choose a commit message." },
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
      successText: { no: "Committed. Arbeidet er lagret.", en: "Committed. The work is saved." },
    },
  },
];
