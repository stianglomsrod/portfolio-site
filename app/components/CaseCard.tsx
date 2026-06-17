import type { Mode, PortfolioCase } from "../data/portfolio";
import CaseLink from "./CaseLink";
import ScreenshotPlaceholder from "./ScreenshotPlaceholder";
import styles from "./CaseCard.module.css";

export default function CaseCard({
  data,
  mode,
}: {
  data: PortfolioCase;
  mode: Mode;
}) {
  const tier = data.tier ?? "primary";
  const isSecondary = tier === "secondary";
  const showPitch = mode === "agentic" && data.pitch;

  return (
    <article
      id={data.id}
      className={`${styles.card} ${isSecondary ? styles.secondary : styles.primary}`}
    >
      <div className={styles.body}>
        <p className={styles.type}>{data.type}</p>
        <h3 className={styles.title}>{data.title}</h3>

        {showPitch && <p className={styles.pitch}>{data.pitch}</p>}

        {(data.role || data.tech) && (
          <dl className={styles.meta}>
            {data.role && (
              <div className={styles.metaRow}>
                <dt>Rolle</dt>
                <dd>{data.role}</dd>
              </div>
            )}
            {data.tech && (
              <div className={styles.metaRow}>
                <dt>Teknologi</dt>
                <dd>{data.tech}</dd>
              </div>
            )}
          </dl>
        )}

        {/* Secondary cases stay lean: show the first paragraph only */}
        {(isSecondary ? data.description.slice(0, 1) : data.description).map(
          (paragraph, i) => (
            <p key={i} className={styles.paragraph}>
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
          <CaseLink href={data.link} label="Lenke" />
        </div>
      </div>

      {/* Only primary cases carry the screenshot gallery, to keep hierarchy */}
      {!isSecondary && data.screenshots && data.screenshots.length > 0 && (
        <div className={styles.gallery}>
          {data.screenshots.map((label) => (
            <ScreenshotPlaceholder key={label} label={label} />
          ))}
        </div>
      )}
    </article>
  );
}
