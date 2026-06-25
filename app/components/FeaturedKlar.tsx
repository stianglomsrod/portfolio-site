import type { FeaturedCase, HomeCopy } from "../data/homepage";
import CaseScreenshotGallery from "./CaseScreenshotGallery";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./FeaturedKlar.module.css";

export default function FeaturedKlar({
  copy,
  data,
  labels,
}: {
  copy: HomeCopy["featuredSection"];
  data: FeaturedCase;
  labels: HomeCopy["caseLabels"];
}) {
  return (
    <section
      id="klar"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="klar-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="klar-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
            <p className={shared.sectionLede}>{data.summary}</p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <article className={styles.card} aria-labelledby="klar-case-title">
            <div className={styles.head}>
              <p className={styles.type}>{data.type}</p>
              <h3 id="klar-case-title" className={styles.title}>
                {data.title}
              </h3>
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
            </div>

            <div className={styles.facets}>
              {data.facets.map((facet, index) => (
                <section
                  key={facet.label}
                  className={styles.facet}
                  aria-labelledby={`klar-facet-${index}`}
                >
                  <h4 id={`klar-facet-${index}`} className={styles.facetLabel}>
                    {facet.label}
                  </h4>
                  <p className={styles.facetText}>{facet.text}</p>
                </section>
              ))}
            </div>

            {data.bullets && (
              <div className={styles.lookForBlock}>
                <h4 className={styles.lookForHeading}>
                  {data.lookForHeading}
                </h4>
                <ul className={styles.lookFor}>
                  {data.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.actions}>
              <CaseLink
                href={data.link}
                label={data.linkLabel ?? labels.fallbackLink}
              />
              {data.accessNote && (
                <span className={styles.demoNote}>{data.accessNote}</span>
              )}
            </div>

            {data.screenshots && data.screenshots.length > 0 && (
              <CaseScreenshotGallery
                caseId={data.id}
                screenshots={data.screenshots}
                labels={labels}
                className={styles.gallery}
              />
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
