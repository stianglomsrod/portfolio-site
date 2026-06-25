import type { HomeCopy, ShowcaseCase } from "../data/homepage";
import CaseScreenshotGallery from "./CaseScreenshotGallery";
import CaseLink from "./CaseLink";
import styles from "./CaseCard.module.css";

export default function CaseCard({
  data,
  labels,
}: {
  data: ShowcaseCase;
  labels: HomeCopy["caseLabels"];
}) {
  const tier = data.tier ?? "primary";
  const isSecondary = tier === "secondary";

  return (
    <article
      id={data.id}
      className={`${styles.card} ${isSecondary ? styles.secondary : styles.primary}`}
      aria-labelledby={`${data.id}-title`}
    >
      <div className={styles.body}>
        <p className={styles.type}>{data.type}</p>
        <h3 id={`${data.id}-title`} className={styles.title}>
          {data.title}
        </h3>

        {(data.role || data.tech) && (
          <dl className={styles.meta}>
            {data.role && (
              <div className={styles.metaRow}>
                <dt>{labels.role}</dt>
                <dd>{data.role}</dd>
              </div>
            )}
            {data.tech && (
              <div className={styles.metaRow}>
                <dt>{labels.tech}</dt>
                <dd>{data.tech}</dd>
              </div>
            )}
          </dl>
        )}

        {(isSecondary ? data.description.slice(0, 1) : data.description).map(
          (paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ),
        )}

        {data.bullets && (
          <ul className={styles.bullets}>
            {data.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}

        <div className={styles.actions}>
          <CaseLink
            href={data.link}
            label={data.linkLabel ?? labels.fallbackLink}
          />
          {data.accessNote && (
            <span className={styles.accessNote}>{data.accessNote}</span>
          )}
        </div>
      </div>

      {!isSecondary && data.screenshots && data.screenshots.length > 0 && (
        <CaseScreenshotGallery
          caseId={data.id}
          screenshots={data.screenshots}
          labels={labels}
          className={styles.gallery}
        />
      )}
    </article>
  );
}
