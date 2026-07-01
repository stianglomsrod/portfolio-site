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
  // A deadpan optional interaction (treated as a completely normal build step).
  "flutterfly-compile": [
    { text: { no: "$ kompiler flutterfly", en: "$ compile flutterfly" } },
    {
      text: {
        no: "Bygget uten feil. 0 advarsler. Den fladrer videre.",
        en: "Built with no errors. 0 warnings. It flutters on.",
      },
    },
  ],
  // Locked-building lines (read on E). Readable feedback, never silent walls.
  "dnb-locked": [
    { text: { no: "Resepsjonen tar bare imot komplette søknadspakker." } },
  ],
  "oslomet-locked": [
    {
      text: {
        no: "OsloMet står klart — men porten hit hører til neste kapittel.",
        en: "OsloMet stands ready — but the gate here belongs to the next chapter.",
      },
    },
    {
      text: {
        no: "Slutt på første del. Takk for at du spilte! Resten bygges stein for stein.",
        en: "End of part one. Thanks for playing! The rest is built stone by stone.",
      },
    },
  ],
  "nikko-locked": [
    {
      text: {
        no: "Det er noen hjemme, men du har ingen grunn til å banke på ennå.",
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
