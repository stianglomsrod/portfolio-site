import type { HomeCopy } from "../data/homepage";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./EvidenceOverview.module.css";

export default function EvidenceOverview({
  copy,
}: {
  copy: HomeCopy["hero"];
}) {
  return (
    <section
      id="arbeid"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="evidence-heading"
    >
      <div className={shared.container}>
        <div className={styles.layout}>
          <Reveal className={styles.lead}>
            <p className={shared.sectionLabel}>{copy.workPanelTitle}</p>
            <h2 id="evidence-heading" className={styles.title}>
              {copy.workPanelIntro}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <ul className={styles.proofList}>
              {copy.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol className={styles.highlights} aria-label={copy.workPanelTitle}>
          {copy.highlights.map((item, index) => (
            <Reveal
              as="li"
              key={item.href}
              delay={120 + index * 40}
              className={styles.highlightWrap}
            >
              <a href={item.href} className={styles.highlight}>
                <span className={styles.index} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.highlightText}>
                  <span className={styles.highlightTitle}>{item.title}</span>
                  <span className={styles.highlightMeta}>{item.meta}</span>
                  <span className={styles.highlightDescription}>
                    {item.text}
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
