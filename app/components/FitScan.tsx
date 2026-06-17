import {
  fitScan,
  caseRefLabels,
  fitLevelLabels,
  type CaseRef,
  type FitLevel,
} from "../data/portfolio";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./FitScan.module.css";

function FitBadge({ level }: { level: FitLevel }) {
  return (
    <span className={styles.fitBadge} data-fit={level}>
      <span className={styles.fitDot} aria-hidden="true" />
      {fitLevelLabels[level]}
    </span>
  );
}

function CaseRefs({ refs }: { refs: CaseRef[] }) {
  if (refs.length === 0) return null;
  return (
    <ul
      className={styles.refs}
      aria-label="Støttende prosjekter — hopp til caset"
    >
      {refs.map((ref) => (
        <li key={ref}>
          <a className={styles.refChip} href={`#${ref}`}>
            {caseRefLabels[ref]}
            <span className={styles.refArrow} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Candidate Fit Scan — agentic-only section.
 * Renders the typed `fitScan` data: VG X's four user needs, the role
 * requirements mapped to concrete evidence, and an honest risk module.
 * Uses native <details> for the expandable parts so it stays fully
 * keyboard-accessible and fail-safe if JS never runs.
 */
export default function FitScan() {
  return (
    <section
      id="fit-scan"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="fit-scan-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>
              <span className={styles.scanPulse} aria-hidden="true" />
              VG X fit scan
            </p>
            <h2 id="fit-scan-heading" className={shared.sectionTitle}>
              Kandidat-match: uvanlig profil, høy relevans
            </h2>
            <p className={shared.sectionLede}>{fitScan.intro}</p>
          </div>
        </Reveal>

        {/* --- Four VG X user needs --- */}
        <Reveal>
          <h3 className={styles.blockTitle}>
            De fire behovene VG X bygger for
          </h3>
        </Reveal>
        <ul className={styles.needGrid}>
          {fitScan.needs.map((need, i) => (
            <Reveal
              as="li"
              key={need.id}
              delay={i * 70}
              className={styles.needWrap}
            >
              <article className={styles.needCard}>
                <header className={styles.needHead}>
                  <h4 className={styles.needLabel}>{need.label}</h4>
                  <FitBadge level={need.fit} />
                </header>
                <p className={styles.needMeaning}>{need.vgxMeaning}</p>
                <p className={styles.needWhy}>{need.whyStian}</p>
                <p className={styles.evidenceTag}>Bevis</p>
                <ul className={styles.evidenceList}>
                  {need.evidence.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <CaseRefs refs={need.caseRefs} />
              </article>
            </Reveal>
          ))}
        </ul>

        {/* --- Role requirements mapped to evidence --- */}
        <Reveal>
          <h3 className={styles.blockTitle}>
            Det rollen ber om — og hvor beviset ligger
          </h3>
        </Reveal>
        <Reveal>
          <p className={styles.blockNote}>
            Åpne et krav for å se hvordan VG X rammer det inn og hvilke
            prosjekter som faktisk dekker det.
          </p>
        </Reveal>
        <div className={styles.reqList}>
          {fitScan.requirements.map((req, i) => (
            <Reveal key={req.id} delay={i * 40}>
              <details className={styles.req}>
                <summary className={styles.reqSummary}>
                  <span className={styles.reqLabel}>{req.label}</span>
                  <span className={styles.reqMeta}>
                    <FitBadge level={req.fit} />
                    <span className={styles.chevron} aria-hidden="true" />
                  </span>
                </summary>
                <div className={styles.reqBody}>
                  <p className={styles.reqInterpretation}>
                    {req.vgxInterpretation}
                  </p>
                  <p className={styles.evidenceTag}>Bevis</p>
                  <ul className={styles.evidenceList}>
                    {req.evidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <CaseRefs refs={req.caseRefs} />
                  {req.counterpoint && (
                    <p className={styles.counterpoint}>{req.counterpoint}</p>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </div>

        {/* --- Risks honestly flipped to strengths --- */}
        <Reveal>
          <h3 className={styles.blockTitle}>
            Innvendinger — møtt på ærlig vis
          </h3>
        </Reveal>
        <Reveal>
          <p className={styles.blockNote}>
            Den utradisjonelle profilen reiser noen rimelige spørsmål. Her er
            de, uten pynt — og hvorfor de blir en styrke.
          </p>
        </Reveal>
        <div className={styles.riskList}>
          {fitScan.risks.map((risk, i) => (
            <Reveal key={risk.id} delay={i * 40}>
              <details className={styles.risk}>
                <summary className={styles.riskSummary}>
                  <span className={styles.riskText}>{risk.risk}</span>
                  <span className={styles.riskHint}>Snu til styrke</span>
                  <span className={styles.chevron} aria-hidden="true" />
                </summary>
                <div className={styles.riskBody}>
                  <p className={styles.riskFraming}>{risk.honestFraming}</p>
                  <p className={styles.evidenceTag}>Motbevis</p>
                  <ul className={styles.evidenceList}>
                    {risk.counterEvidence.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className={styles.flip}>
                    <span className={styles.flipTag}>Styrke</span>
                    {risk.flipToStrength}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
