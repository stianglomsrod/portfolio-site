import { fitScan, caseRefLabels, sectionCopy } from "../data/portfolio";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./JourneyTimeline.module.css";

/**
 * Agentic-only learning-journey progression.
 * Renders `fitScan.milestones` as a "mission log": each step shows what was
 * unlocked, the evidence (with a deep-link to the relevant case when one
 * exists), why it matters for VG X, and a small framing metaphor. Ends with
 * VG X framed as the next quest. Static markup — fully keyboard/JS-safe.
 */
export default function JourneyTimeline() {
  const copy = sectionCopy.journey.agentic;

  return (
    <section
      id="journey"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="journey-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="journey-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
            <p className={shared.sectionLede}>
              Ikke «lærer på vei inn i tech» — en jevn progresjon der hvert steg
              låser opp noe nytt, fram mot VG X som neste oppdrag.
            </p>
          </div>
        </Reveal>

        <ol className={styles.timeline}>
          {fitScan.milestones.map((m, i) => (
            <Reveal
              as="li"
              key={m.id}
              delay={i * 60}
              className={styles.itemWrap}
            >
              <div className={styles.item}>
                <span className={styles.node} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.content}>
                  <span className={styles.shortLabel}>{m.shortLabel}</span>
                  <h3 className={styles.title}>{m.title}</h3>
                  <p className={styles.unlocked}>
                    <span className={styles.unlockedTag}>Låst opp</span>
                    {m.unlocked}
                  </p>
                  <p className={styles.evidence}>
                    {m.evidence}
                    {m.caseRef && (
                      <a className={styles.evidenceLink} href={`#${m.caseRef}`}>
                        Se {caseRefLabels[m.caseRef]}
                        <span className={styles.linkArrow} aria-hidden="true" />
                      </a>
                    )}
                  </p>
                  <p className={styles.relevance}>{m.vgxRelevance}</p>
                  <p className={styles.metaphor}>{m.metaphor}</p>
                </div>
              </div>
            </Reveal>
          ))}

          {/* VG X framed as the next quest — aspirational framing, not a claim. */}
          <Reveal
            as="li"
            delay={fitScan.milestones.length * 60}
            className={styles.itemWrap}
          >
            <div className={`${styles.item} ${styles.questItem}`}>
              <span className={styles.questNode} aria-hidden="true">
                →
              </span>
              <div className={styles.content}>
                <span className={styles.questLabel}>Neste oppdrag</span>
                <h3 className={styles.title}>VG X</h3>
                <p className={styles.unlocked}>
                  Alle ferdighetene over peker samme vei: AI-native,
                  brukersentrert, eksperimentell produktutvikling.
                </p>
                <p className={styles.relevance}>
                  Ikke et sluttpunkt — det neste stedet å bygge, teste og lære.
                </p>
              </div>
            </div>
          </Reveal>
        </ol>
      </div>
    </section>
  );
}
