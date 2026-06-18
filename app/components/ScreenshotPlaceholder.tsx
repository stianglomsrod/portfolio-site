import Image from "next/image";
import { getCaseScreenshot } from "./caseScreenshotData";
import styles from "./CaseCard.module.css";

/**
 * Renders a screenshot when an asset mapping exists.
 * Falls back to a tasteful placeholder if an image is still missing.
 */

export default function ScreenshotPlaceholder({
  caseId,
  label,
}: {
  caseId: string;
  label: string;
}) {
  const shot = getCaseScreenshot(caseId, label);
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
