export type CaseScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

const screenshotMap: Record<string, Record<string, { src: string; alt: string }>> = {
  klar: {
    "Smart Import": {
      src: "/images/cases/klar/smart-import.png",
      alt: "Klar Smart Import som tolker ukebrev til strukturerte oppgaver",
    },
    "Lærerens landingsside": {
      src: "/images/cases/klar/laererens-landingsside.png",
      alt: "Klar laerergrensesnitt med oversikt og publiseringsflyt",
    },
    "Elevens landingsside": {
      src: "/images/cases/klar/elevens-landingsside.png",
      alt: "Klar elevgrensesnitt med oppgaveoversikt og prioritering",
    },
    Hjelpeko: {
      src: "/images/cases/klar/hjelpeko.png",
      alt: "Klar hjelpekovisning for elevstotte",
    },
    "Elevadministrasjon med opt-ins": {
      src: "/images/cases/klar/elevadministrasjon-med-opt-ins.png",
      alt: "Klar elevadministrasjon med valgfrie opt-ins",
    },
    "Level-up-modal": {
      src: "/images/cases/klar/level-up-modal.png",
      alt: "Klar level-up modal for opt-in motivasjon",
    },
    "Blomsterhage / progresjon": {
      src: "/images/cases/klar/blomsterhage-progresjon.png",
      alt: "Klar blomsterhage som viser progresjon over tid",
    },
  },
  forloper: {
    "Prototype-skjermbilde": {
      src: "/images/cases/supporting/forloperprosjektet-til-klar.png",
      alt: "Forloperprosjektet til Klar, tidlig PD-app prototype",
    },
  },
  fagtekst: {
    "Figma-prototype": {
      src: "/images/cases/supporting/ai-og-fagtekstforstaelse.png",
      alt: "Warp Read / AI og fagtekstforstaelse prototype i Figma",
    },
  },
  "ask-away": {
    "Figma-prototype": {
      src: "/images/cases/supporting/ask-away.png",
      alt: "ASK Away prototype med ASK-symbolstotte i laeringsflate",
    },
  },
};

export function getCaseScreenshot(
  caseId: string,
  label: string,
): CaseScreenshot | null {
  const shot = screenshotMap[caseId]?.[label];
  if (!shot) return null;
  return {
    ...shot,
    caption: label,
  };
}

export function getCaseScreenshotItems(
  caseId: string,
  labels: string[],
): CaseScreenshot[] {
  return labels
    .map((label) => getCaseScreenshot(caseId, label))
    .filter((item): item is CaseScreenshot => item !== null);
}
