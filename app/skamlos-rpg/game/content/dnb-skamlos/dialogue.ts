import type { DialogueTree } from "../../engine/types";

// Short, claim-safe, Norwegian-first lines. No metaphor lecturing, no "ærlig
// grense" as visible text — the honesty lives in WHAT is shown, not in lecturing.
export const dialogue: Record<string, DialogueTree> = {
  "duck-hint": [
    {
      speaker: { no: "Badeanda" },
      text: {
        no: "Forklar koden høyt for meg. Det er sånn rubber duck-debugging funker.",
        en: "Explain the code out loud to me. That's how rubber-duck debugging works.",
      },
    },
    {
      speaker: { no: "Badeanda" },
      text: {
        no: "…og ta én løkke av gangen.",
        en: "…and take one loop at a time.",
      },
    },
  ],
  "duck-hint-retry": [
    {
      speaker: { no: "Badeanda" },
      text: { no: "Tell fra 1 til 5. Ikke noe mer." },
    },
  ],
  "home-pc-idle": [
    {
      text: {
        no: "PC-en surrer rolig. Alt er lagret og pushet.",
        en: "The PC hums quietly. Everything is saved and pushed.",
      },
    },
  ],
  kari: [
    {
      speaker: { no: "Kari" },
      text: {
        no: "Vi jobba jo sammen på forløperen. Du bygger ferdig det du starter på.",
        en: "We worked together on the precursor. You finish what you start.",
      },
    },
    {
      speaker: { no: "Kari" },
      text: {
        no: "Du burde sjekke om DNB har noe ute. Det miljøet tror jeg kan passe deg.",
        en: "You should check if DNB has an opening. I think that environment could suit you.",
      },
    },
  ],
  "dnb-egg": [
    {
      text: {
        no: "Du prøver å lese teksten, men den er altfor liten.",
        en: "You try to read the text, but it's far too small.",
      },
    },
  ],
  // Nikko in town: invites the player into his house once the master's is done.
  "nikko-invite": [
    {
      speaker: { no: "Nikko" },
      text: {
        no: "Endelig! Jeg har en idé jeg vil bygge — en app som hjelper vennene mine som er nevrodivergente med hverdagsoppgaver.",
        en: "Finally! I've got an idea I want to build — an app that helps my neurodivergent friends with everyday tasks.",
      },
    },
    {
      speaker: { no: "Nikko" },
      text: {
        no: "Kom inn og sett deg ved maskinen ved siden av meg, så tar vi den sammen.",
        en: "Come in and take the seat at the machine next to me, and we'll do it together.",
      },
    },
  ],
  // Nikko at his desk (inside): nudge the player to the second station.
  "nikko-desk": [
    {
      speaker: { no: "Nikko" },
      text: {
        no: "Sett deg ved maskinen ved siden av meg, så starter vi.",
        en: "Take the seat at the machine next to me, and we'll start.",
      },
    },
  ],
  elev1: [
    {
      speaker: { no: "Elev" },
      text: { no: "Endelig snart helg. Hva skal du gjøre?" },
    },
    {
      speaker: { no: "Du" },
      portrait: "stian",
      text: { no: "Gjøre ferdig Ordkryss. Det er nesten i mål." },
    },
  ],
  elev2: [
    { speaker: { no: "Elev" }, text: { no: "Koding ser vanskelig ut." } },
    {
      speaker: { no: "Du" },
      portrait: "stian",
      text: { no: "Det ser verre ut enn det er. Én bit av gangen." },
    },
  ],
  // Locked-building lines (read on E). Readable feedback, never silent walls.
  "dnb-locked": [
    {
      text: {
        no: "DNB AI Tech — målet for reisen. Grunnmur, mastergrad og prototype i sekken.",
        en: "DNB AI Tech — the goal of the journey. Foundation, master's and prototype in the bag.",
      },
    },
    {
      text: {
        no: "Slutt på det som er bygget foreløpig. Takk for at du spilte! Resten bygges stein for stein.",
        en: "End of what's built for now. Thanks for playing! The rest is built stone by stone.",
      },
    },
  ],
  // OsloMet studio stations (the master's chapter).
  "oslomet-board": [
    {
      text: {
        no: "Master i digital læringsdesign. Kjernen: design SAMMEN med folk, ikke bare FOR dem.",
        en: "Master in digital learning design. The core: design WITH people, not just FOR them.",
      },
    },
    {
      text: {
        no: "Probe → workshops → bygg → evaluer. Uklare behov blir til noe man kan ta på.",
        en: "Probe → workshops → build → evaluate. Unclear needs become something tangible.",
      },
    },
  ],
  "oslomet-klar": [
    {
      text: {
        no: "Klar — masterprosjektet. En fullstack AI-prototype, bygget for å vise at retningen bærer.",
        en: "Klar — the master's project. A fullstack AI prototype, built to show the direction holds.",
      },
    },
    {
      text: {
        no: "Robust prototype, ikke en ferdig plattform. Poenget var å bevise ideen.",
        en: "A robust prototype, not a finished platform. The point was to prove the idea.",
      },
    },
  ],
  "oslomet-method": [
    {
      text: {
        no: "Vitenskapsteori og metode: still spørsmålene skikkelig før du bygger.",
        en: "Philosophy of science and method: ask the questions properly before you build.",
      },
    },
    {
      text: {
        no: "Prosjektledelse: sett omfang, milepæler og lever — også når det er uklart.",
        en: "Project management: set scope, milestones and deliver — even when it's unclear.",
      },
    },
  ],
  // Lærerworkshop journey-map notes (participatory design WITH teachers).
  "ws-note-green": [
    {
      text: {
        no: "Grønn lapp — behov: «Gi meg verktøy som sparer tid, ikke lager mer arbeid.»",
        en: "Green note — need: “Give me tools that save time, not make more work.”",
      },
    },
  ],
  "ws-note-red": [
    {
      text: {
        no: "Rød lapp — friksjon: «Terskelen for å be om hjelp er høy.»",
        en: "Red note — friction: “The threshold for asking for help is high.”",
      },
    },
    {
      text: {
        no: "En hjelpekø kan senke terskelen — be om hjelp uten å rekke opp hånda foran alle.",
        en: "A help queue can lower it — ask for help without raising your hand in front of everyone.",
      },
    },
  ],
  "ws-note-blue": [
    {
      text: {
        no: "Blå lapp — designgrep: «Spillelementer, men opt-in — ikke påtvunget.»",
        en: "Blue note — design move: “Game elements, but opt-in — not mandatory.”",
      },
    },
    {
      text: {
        no: "Støtte når det passer, ikke tvang for alle.",
        en: "Support when it fits, not a mandate for everyone.",
      },
    },
  ],
  "schoolside-locked": [
    {
      text: {
        no: "Skolens sideinngang er låst. Den åpner når du starter et oppdrag om lærerinnsikt.",
        en: "The school side entrance is locked. It opens when you start a teacher-insight quest.",
      },
    },
  ],
};
