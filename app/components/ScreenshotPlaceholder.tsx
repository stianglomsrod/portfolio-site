import Image from "next/image";
import styles from "./CaseCard.module.css";

/**
 * Renders a screenshot when an asset mapping exists.
 * Falls back to a tasteful placeholder if an image is still missing.
 */
const screenshotMap: Record<string, Record<string, { src: string; alt: string }>> = {
  klar: {
    "Smart Import": {
      src: "/images/cases/klar/smart-import.png",
      alt: "Klar Smart Import som tolker ukebrev til strukturerte oppgaver",
    },
    "Lærerens landingsside": {
      src: "/images/cases/klar/laererens-landingsside.png",
      alt: "Klar lærergrensesnitt med oversikt og publiseringsflyt",
    },
    "Elevens landingsside": {
      src: "/images/cases/klar/elevens-landingsside.png",
      alt: "Klar elevgrensesnitt med oppgaveoversikt og prioritering",
    },
    Hjelpekø: {
      src: "/images/cases/klar/hjelpeko.png",
      alt: "Klar hjelpekø-visning for elevstøtte",
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
      alt: "Forløperprosjektet til Klar, tidlig PD-app prototype",
    },
  },
  fagtekst: {
    "Figma-prototype": {
      src: "/images/cases/supporting/ai-og-fagtekstforstaelse.png",
      alt: "Warp Read / AI og fagtekstforståelse prototype i Figma",
    },
  },
  "ask-away": {
    "Figma-prototype": {
      src: "/images/cases/supporting/ask-away.png",
      alt: "ASK Away prototype med ASK-symbolstøtte i læringsflate",
    },
  },
};

export default function ScreenshotPlaceholder({
  caseId,
  label,
}: {
  caseId: string;
  label: string;
}) {
  const shot = screenshotMap[caseId]?.[label];
  if (shot) {
    return (
      <figure className={styles.screenshotFigure}>
        <Image
          className={styles.screenshotImage}
          src={shot.src}
          alt={shot.alt}
          width={960}
          height={600}
        />
        <figcaption className={styles.screenshotLabel}>{label}</figcaption>
      </figure>
    );
  }

  return (
    <div
      className={styles.screenshot}
      role="img"
      aria-label={`Skjermbilde: ${label}`}
    >
      <span className={styles.screenshotLabel}>{label}</span>
    </div>
  );
}
