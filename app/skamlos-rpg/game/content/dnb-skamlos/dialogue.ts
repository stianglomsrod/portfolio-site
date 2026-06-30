import type { DialogueTree } from "../../engine/types";

// Short, claim-safe, Norwegian-first lines. No metaphor lecturing, no "ærlig
// grense" as visible text — the honesty lives in WHAT is shown, not in lecturing.
export const dialogue: Record<string, DialogueTree> = {
  "duck-hint": [
    { speaker: { no: "Badeanda" }, text: { no: "Ta én løkke av gangen." } },
  ],
  "duck-hint-retry": [
    { speaker: { no: "Badeanda" }, text: { no: "Tell fra 1 til 5. Ikke noe mer." } },
  ],
  "elev1": [
    { speaker: { no: "Medelev" }, text: { no: "Endelig snart helg. Hva skal du gjøre?" } },
    { speaker: { no: "Du" }, text: { no: "Gjøre ferdig Ordkryss. Det er nesten i mål." } },
  ],
  "elev2": [
    { speaker: { no: "Medelev" }, text: { no: "Koding ser vanskelig ut." } },
    { speaker: { no: "Du" }, text: { no: "Det ser verre ut enn det er. Én bit av gangen." } },
  ],
  // Locked-building lines (read on E). Readable feedback, never silent walls.
  "dnb-locked": [
    { text: { no: "Resepsjonen tar bare imot komplette søknadspakker." } },
  ],
  "oslomet-locked": [
    { text: { no: "Universitetet venter. Du er ikke helt klar for dette ennå." } },
  ],
  "nikko-locked": [
    { text: { no: "Det er noen hjemme, men du har ingen grunn til å banke på ennå." } },
  ],
  "workshop-locked": [
    { text: { no: "Workshoprommet er låst. Du trenger et metodeoppdrag fra OsloMet først." } },
  ],
};
