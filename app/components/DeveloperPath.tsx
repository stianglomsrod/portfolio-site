import type { HomeCopy } from "../data/homepage";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DeveloperPath.module.css";

export default function DeveloperPath({
  copy,
}: {
  copy: HomeCopy["developer"];
}) {
  return (
    <section
      id="dev-path"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="dev-path-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="dev-path-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
            <p className={shared.sectionLede}>{copy.lede}</p>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.current}>
            <article className={styles.panel} aria-labelledby="dev-now-title">
              <h3 id="dev-now-title" className={styles.panelTitle}>
                {copy.nowTitle}
              </h3>
              <ul className={styles.evidenceList}>
                {copy.now.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>

          <div className={styles.stack}>
            <Reveal delay={80}>
              <article
                className={styles.panel}
                aria-labelledby="dev-growth-title"
              >
                <h3 id="dev-growth-title" className={styles.panelTitle}>
                  {copy.growthTitle}
                </h3>
                <p className={styles.panelLede}>{copy.growthLede}</p>
                <ul className={styles.compactList}>
                  {copy.growth.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={140}>
              <article
                className={styles.panel}
                aria-labelledby="dev-learning-title"
              >
                <h3 id="dev-learning-title" className={styles.panelTitle}>
                  {copy.learningTitle}
                </h3>
                <p className={styles.panelLede}>{copy.learningLede}</p>
                <ol className={styles.timeline}>
                  {copy.learning.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </article>
            </Reveal>
          </div>
        </div>

        <Reveal delay={180}>
          <aside className={styles.honestNote} aria-label={copy.label}>
            <p>{copy.honest}</p>
            <nav aria-label={copy.linksAria}>
              <ul className={styles.links}>
                {copy.links.map((link) => (
                  <li key={link.href}>
                    <CaseLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
