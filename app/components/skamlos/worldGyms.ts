import { fitScan, type CaseRef } from "../../data/portfolio";

/**
 * Data model for the playable Skamløs world ("Stians verden").
 *
 * Each gym represents a REAL chapter in Stian's learning journey. Factual
 * claims stay aligned with `fitScan.milestones` / the case data — the world
 * only adds playful place names, training labels, energy mapping and 2D
 * positions on top of the real story. No invented metrics or achievements.
 *
 * Note on the forløper project: it is one real project with two facets —
 * participatory design (Meddesignrommet) and a running fullstack prototype
 * (Maskinrommet). Both gyms point to the same `forloper` case, emphasising a
 * different, truthful facet. This mirrors the gym design doc.
 */

/** Virtual world dimensions (gameplay coordinate space). */
export const WORLD_W = 1000;
export const WORLD_H = 640;

export type Energy =
  | "prototypekraft"
  | "brukerinnsikt"
  | "forstaelseskraft"
  | "agentisk";

export const energyMeta: Record<Energy, { label: string }> = {
  prototypekraft: { label: "Prototypekraft" },
  brukerinnsikt: { label: "Brukerinnsikt" },
  forstaelseskraft: { label: "Forståelseskraft" },
  agentisk: { label: "Agentisk kontroll" },
};

export type GymKind = "gym" | "portal";

export type Gym = {
  id: string;
  /** Visual landmark style key (drives the CSS look). */
  landmark: string;
  /** Distant-readable emblem text (no copyrighted logo assets). */
  emblem: string;
  /** Personal place name shown in the proximity popover. */
  worldName: string;
  /** Real journey-chapter title. */
  title: string;
  /** One-line hook. */
  short: string;
  /** Training theme (shown in the proximity popover). */
  trainingTheme: string;
  /** Contextual action verb (Space to trigger). */
  actionLabel: string;
  /** Name of the skill unlocked here. */
  unlockName: string;
  energies: Partial<Record<Energy, number>>;
  /** Panel copy: what this place represents / what was built. */
  whatItWas: string;
  /** Panel copy: what Stian learned. */
  learned: string;
  /** Panel copy: why it matters for VG X. */
  vgxRelevance: string;
  /** Panel copy: how it unlocked the next step. */
  nextStep: string;
  /** Evidence / supporting case deep-links. */
  caseRefs: CaseRef[];
  kind: GymKind;
  /** Position in virtual world units. */
  pos: { x: number; y: number };
};

export const gyms: Gym[] = [
  {
    id: "c-foundations",
    landmark: "systemkilden",
    emblem: "C",
    worldName: "Systemkilden",
    title: "Programmeringsgrunnlaget (C)",
    short: "Der systemfascinasjonen startet.",
    trainingTheme: "Systemforståelse",
    actionLabel: "Kjør løkka",
    unlockName: "Systemblikk",
    energies: { prototypekraft: 1 },
    whatItWas:
      "Tidlig programmeringsglede i C — for-løkker, pekere, malloc og følelsen av å forstå hvordan et system oppfører seg på lavt nivå.",
    learned:
      "At små, presise instruksjoner, gjentatt nøyaktig, kan styre hva et system gjør.",
    vgxRelevance:
      "Roten til systemtenkningen min: nysgjerrighet på hvordan verktøy oppfører seg, hvorfor output avviker fra forventning, og hvordan logikk blir nyttig interaksjon.",
    nextStep:
      "Systemblikket gjorde det naturlig å bygge et faktisk verktøy — ikke bare lese om det.",
    caseRefs: [],
    kind: "gym",
    pos: { x: 110, y: 540 },
  },
  {
    id: "cs50x-wordhunt",
    landmark: "verktoybenken",
    emblem: "CS50",
    worldName: "Verktøybenken",
    title: "CS50x / Wordhunt",
    short: "Det første nyttige verktøyet i beltet.",
    trainingTheme: "Praksisproblem → artefakt",
    actionLabel: "Generer verktøyet",
    unlockName: "Praksisproblem → artefakt",
    energies: { prototypekraft: 1, brukerinnsikt: 1 },
    whatItWas:
      "CS50x og Wordhunt — et lite HTML/CSS/JavaScript-verktøy som genererer utskriftsvennlige ordjakt-oppgaver for lærere.",
    learned: "Å gjøre et reelt praksisproblem om til et brukbart verktøy.",
    vgxRelevance:
      "Viser mønsteret jeg gjentar: start i en ekte brukersituasjon, bygg noe testbart, lær av artefakten. Kort vei fra tanke til ting.",
    nextStep:
      "Når ett verktøy funket, ble neste steg å skissere større ideer før de ble bygget.",
    caseRefs: ["wordhunt"],
    kind: "gym",
    pos: { x: 252, y: 408 },
  },
  {
    id: "skisselab",
    landmark: "skisselab",
    emblem: "Fig",
    worldName: "Skisselaboratoriet",
    title: "Figma-prototyper",
    short: "Der ideer ble noe man kunne ta på.",
    trainingTheme: "Prototypeblikk",
    actionLabel: "Test prototypen",
    unlockName: "Prototypeblikk",
    energies: { prototypekraft: 1, forstaelseskraft: 1 },
    whatItWas:
      "Tidlige designprototyper i Figma: ASK Away (symbolstøtte og tilgjengelighet), ACAD Collaborate (metode → produktflyt) og AI for fagtekstforståelse (forklaring på ulike nivåer, hypertekst, quiz).",
    learned:
      "Å utforske og teste løsningsideer — inkludert tilgjengelighet og AI for forståelse — før de blir hele produkter.",
    vgxRelevance:
      "Viser at jeg tenker i grensesnitt, interaksjon, læringsbehov og innholdsforståelse — ikke bare implementasjon. Direkte relevant for AI-drevne innholdsopplevelser.",
    nextStep:
      "Skissene pekte mot å designe med ekte brukere, ikke bare for dem.",
    caseRefs: ["ask-away", "acad", "fagtekst"],
    kind: "gym",
    pos: { x: 432, y: 522 },
  },
  {
    id: "meddesign",
    landmark: "meddesign",
    emblem: "◎",
    worldName: "Meddesignrommet",
    title: "Deltakende design",
    short: "Fra «jeg har en idé» til «brukerne former dette».",
    trainingTheme: "Design med, ikke bare for",
    actionLabel: "Samle innsikten",
    unlockName: "Design med, ikke bare for",
    energies: { brukerinnsikt: 2 },
    whatItWas:
      "Deltakende design med elever som meddesignere, i forløperprosjektet før masteren.",
    learned:
      "Å la brukerne forme designretningen — innsikt som ikke er abstrakt, men praktisert.",
    vgxRelevance:
      "Direkte støtte til brukersentrert design: jeg har gjort behov om til prototyperetning sammen med ekte deltakere.",
    nextStep:
      "Innsikten trengte et system som faktisk kjørte for å kunne testes på ordentlig.",
    caseRefs: ["forloper"],
    kind: "gym",
    pos: { x: 524, y: 322 },
  },
  {
    id: "maskinrommet",
    landmark: "maskinrommet",
    emblem: "</>",
    worldName: "Maskinrommet",
    title: "Vue + Django (forløperprosjektet)",
    short: "En prototype som faktisk kjører.",
    trainingTheme: "Prototype som kjører",
    actionLabel: "Koble systemet",
    unlockName: "Prototype som faktisk kjører",
    energies: { prototypekraft: 2 },
    whatItWas:
      "Forløper-prototypen bygget fullstack med Python, Django, SQLite og Vue.js.",
    learned:
      "Forskjellen på å beskrive en idé og å lage et kjørende system folk kan teste.",
    vgxRelevance:
      "Viser at jeg forstår skillet mellom mockup og testbart produkt — og kan samarbeide tett med utviklere om hva som faktisk kan bygges.",
    nextStep:
      "Et kjørende fullstack-grunnlag gjorde det mulig å satse på masterprosjektet Klar.",
    caseRefs: ["forloper"],
    kind: "gym",
    pos: { x: 694, y: 470 },
  },
  {
    id: "klar",
    landmark: "klar",
    emblem: "✿",
    worldName: "Klar-drivhuset",
    title: "Klar",
    short: "Hovedcaset: AI som produktbeslutning, ikke pynt.",
    trainingTheme: "AI som produktbeslutning",
    actionLabel: "La ukebrevet spire",
    unlockName: "AI som produktbeslutning",
    energies: { brukerinnsikt: 1, forstaelseskraft: 2, agentisk: 1 },
    whatItWas:
      "Masterprosjektet Klar: en fungerende PWA-prototype for elever med eksekutive vansker, med lærer-/elevgrensesnitt og AI-støttet Smart Import.",
    learned:
      "Å koble brukerbehov, designprinsipper, AI og fungerende prototype — med autonomistøtte og uten stigma.",
    vgxRelevance:
      "AI brukt som svar på et reelt brukerbehov, ikke dekorasjon. Jobber med oversikt, kompleksitet, motivasjon og støtte uten å overvelde — VG X' Oversikt og Forståelse i praksis.",
    nextStep:
      "Å bygge Klar med AI gjorde arbeidsformen rundt AI-agenter til et eget fagfelt.",
    caseRefs: ["klar"],
    kind: "gym",
    pos: { x: 732, y: 250 },
  },
  {
    id: "agentic-workflow",
    landmark: "agentlab",
    emblem: "QA",
    worldName: "Agentlabben",
    title: "Agentisk workflow / QA-tankesett",
    short: "Å lede AI-agenter uten å miste produktdømmet.",
    trainingTheme: "Agentisk arbeidsledelse",
    actionLabel: "Kjør QA-sjekk",
    unlockName: "Agentisk arbeidsledelse",
    energies: { agentisk: 3, prototypekraft: 1 },
    whatItWas:
      "Dagens arbeidsform: strukturerte prompts, epics, logger, persistente regler, kontekststyring, QA, edge cases og ekstern LLM-kritikk.",
    learned:
      "Å ramme inn oppgaven, fange feilmoduser, beskytte produktintensjon og gjøre vage ideer om til fungerende artefakter.",
    vgxRelevance:
      "Trolig den mest direkte AI-native matchen: jeg kan bidra ikke bare ved å bruke AI-verktøy, men ved å forme pålitelige arbeidsflyter rundt AI-assistert design og prototyping.",
    nextStep:
      "Hele reisen peker nå mot én arena der alt dette brukes sammen.",
    caseRefs: [],
    kind: "gym",
    pos: { x: 862, y: 360 },
  },
  {
    id: "vgx",
    landmark: "vgx",
    emblem: "VG X",
    worldName: "VG X-portalen",
    title: "VG X",
    short: "Neste arena — ikke en trofé.",
    trainingTheme: "Neste oppdrag",
    actionLabel: "Åpne neste oppdrag",
    unlockName: "Neste arena",
    energies: {},
    whatItWas:
      "Jobbsøknaden og neste arena: et tverrfaglig team som lager AI-native prototyper og fremtidens nyhetsopplevelser.",
    learned:
      "Å bruke hele reisen sammen — system, prototyping, brukersentrering, deltakende design, kjørende produkter, AI som produktbeslutning og agentisk arbeidsledelse.",
    vgxRelevance:
      "Det er her alle de tidligere ferdighetene peker. Ikke fordi reisen er ferdig, men fordi dette er nettopp miljøet der den bør fortsette.",
    nextStep:
      "Herfra: profesjonell portefølje, Klar-demo, kontakt og CV.",
    caseRefs: [],
    kind: "portal",
    pos: { x: 912, y: 122 },
  },
];

/** The number of real, visitable gyms (excludes the VG X portal). */
export const gymCount = gyms.filter((g) => g.kind === "gym").length;

/** Trail segments between gyms, in journey order. */
export const gymPath: [number, number][] = gyms
  .slice(0, -1)
  .map((_, i) => [i, i + 1] as [number, number]);

/** Maximum value each energy can reach when every gym is visited. */
export const energyMax: Record<Energy, number> = (() => {
  const max: Record<Energy, number> = {
    prototypekraft: 0,
    brukerinnsikt: 0,
    forstaelseskraft: 0,
    agentisk: 0,
  };
  for (const g of gyms) {
    for (const key of Object.keys(g.energies) as Energy[]) {
      max[key] += g.energies[key] ?? 0;
    }
  }
  return max;
})();

/** Order energies appear in the HUD. */
export const energyOrder: Energy[] = [
  "prototypekraft",
  "brukerinnsikt",
  "forstaelseskraft",
  "agentisk",
];

/**
 * The four VG X user needs, reused verbatim from the fit scan for the
 * journal's "VG X-match" summary (no invented claims).
 */
export const worldNeeds = fitScan.needs.map((n) => ({
  id: n.id,
  label: n.label,
  meaning: n.vgxMeaning,
  fit: n.fit,
}));
