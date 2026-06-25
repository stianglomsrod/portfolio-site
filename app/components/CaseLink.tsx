import styles from "./CaseCard.module.css";

/**
 * Renders a link, or a non-clickable "placeholder" chip when the href is not
 * yet ready. Placeholder hrefs are written as [bracketed text] in the data file.
 */
function isPlaceholder(href?: string): boolean {
  return !href || href.trim().startsWith("[");
}

export default function CaseLink({
  href,
  label,
}: {
  href?: string;
  label: string;
}) {
  if (isPlaceholder(href)) {
    return (
      <span className={styles.placeholderLink} aria-disabled="true">
        {label}: kommer
      </span>
    );
  }

  return (
    <a className={styles.link} href={href}>
      {label}
    </a>
  );
}
