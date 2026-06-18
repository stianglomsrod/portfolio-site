export type CaseScreenshot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** CSS object-position for the thumbnail crop. Defaults to "center top". */
  focus?: string;
};

type ScreenshotSource = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focus?: string;
};

// width/height are the real intrinsic pixel dimensions of each file, so both the
// thumbnail and the lightbox render at the correct aspect ratio (no distortion,
// letterboxing or layout shift).
const screenshotMap: Record<string, Record<string, ScreenshotSource>> = {
  klar: {
    "Smart Import": {
      src: "/images/cases/klar/smart-import.png",
      alt: "Klar Smart Import som tolker ukebrev til strukturerte oppgaver",
      width: 1920,
      height: 871,
    },
    "Lærerens landingsside": {
      src: "/images/cases/klar/laererens-landingsside.png",
      alt: "Klar laerergrensesnitt med oversikt og publiseringsflyt",
      width: 1920,
      height: 871,
    },
    "Elevens landingsside": {
      src: "/images/cases/klar/elevens-landingsside.png",
      alt: "Klar elevgrensesnitt med oppgaveoversikt og prioritering",
      width: 1920,
      height: 871,
    },
    Hjelpekø: {
      src: "/images/cases/klar/hjelpeko.png",
      alt: "Klar hjelpekovisning for elevstotte",
      width: 1920,
      height: 871,
    },
    "Elevadministrasjon med opt-ins": {
      src: "/images/cases/klar/elevadministrasjon-med-opt-ins.png",
      alt: "Klar elevadministrasjon med valgfrie opt-ins",
      width: 1920,
      height: 871,
    },
    "Level-up-modal": {
      src: "/images/cases/klar/level-up-modal.png",
      alt: "Klar level-up modal for opt-in motivasjon",
      width: 1920,
      height: 871,
      // The celebratory modal sits in the middle of the screen.
      focus: "center center",
    },
    "Blomsterhage / progresjon": {
      src: "/images/cases/klar/blomsterhage-progresjon.png",
      alt: "Klar blomsterhage som viser progresjon over tid",
      width: 1920,
      height: 871,
      // The garden/progress illustration lives toward the lower half.
      focus: "center bottom",
    },
  },
  forloper: {
    "Prototype-skjermbilde": {
      src: "/images/cases/supporting/forloperprosjektet-til-klar.png",
      alt: "Forloperprosjektet til Klar, tidlig PD-app prototype",
      width: 1920,
      height: 871,
    },
  },
  fagtekst: {
    "Figma-prototype": {
      src: "/images/cases/supporting/ai-og-fagtekstforstaelse.png",
      alt: "Warp Read / AI og fagtekstforstaelse prototype i Figma",
      width: 1888,
      height: 983,
      // Centered "Warp Read" logo/title is the recognizable element.
      focus: "center center",
    },
  },
  "ask-away": {
    "Figma-prototype": {
      src: "/images/cases/supporting/ask-away.png",
      alt: "ASK Away prototype med ASK-symbolstotte i laeringsflate",
      width: 1570,
      height: 1060,
      // The ASK symbol cards sit in the middle of the canvas.
      focus: "center center",
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
