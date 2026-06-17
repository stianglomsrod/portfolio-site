import styles from "./CaseCard.module.css";

/**
 * Placeholder area for a screenshot that is not available yet.
 * Replace with a real <Image /> when assets are ready.
 */
export default function ScreenshotPlaceholder({ label }: { label: string }) {
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
