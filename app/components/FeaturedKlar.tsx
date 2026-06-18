import type { Mode } from "../data/portfolio";
import { featuredCase, sectionCopy } from "../data/portfolio";
import CaseScreenshotGallery from "./CaseScreenshotGallery";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./FeaturedKlar.module.css";

export default function FeaturedKlar({ mode }: { mode: Mode }) {
  const copy = sectionCopy.klar[mode];
  const k = featuredCase;

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
            <p className={shared.sectionLede}>
              {mode === "agentic" && k.pitch ? k.pitch : k.summary}
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <article className={styles.card}>
            <div className={styles.head}>
              <p className={styles.type}>{k.type}</p>
              <h3 className={styles.title}>{k.title}</h3>
              <dl className={styles.meta}>
                <div className={styles.metaRow}>
                  <dt>Rolle</dt>
                  <dd>{k.role}</dd>
                </div>
                <div className={styles.metaRow}>
                  <dt>Teknologi</dt>
                  <dd>{k.tech}</dd>
                </div>
              </dl>
            </div>

            {/* Pacing: four scannable facets instead of one dense block */}
            <div className={styles.facets}>
              {k.facets.map((facet) => (
                <div key={facet.label} className={styles.facet}>
                  <h4 className={styles.facetLabel}>{facet.label}</h4>
                  <p className={styles.facetText}>{facet.text}</p>
                </div>
              ))}
            </div>

            <div className={styles.lookForBlock}>
              <h4 className={styles.lookForHeading}>Hva du bør se etter</h4>
              <ul className={styles.lookFor}>
                {k.bullets?.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <CaseLink href={k.link} label="Åpne Klar" />
              <span className={styles.demoNote}>
                Demo-/brukertilgang gis ved forespørsel: stianglomsrod@gmail.com
              </span>
            </div>

            {k.screenshots && k.screenshots.length > 0 && (
              <CaseScreenshotGallery
                caseId={k.id}
                labels={k.screenshots}
                className={styles.gallery}
              />
            )}
          </article>
        </Reveal>
      </div>
    </section>
  );
}
