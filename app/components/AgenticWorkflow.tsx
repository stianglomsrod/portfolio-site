import type { Mode } from "../data/portfolio";
import { agenticWorkflow, sectionCopy } from "../data/portfolio";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./AgenticWorkflow.module.css";

export default function AgenticWorkflow({ mode }: { mode: Mode }) {
  const copy = sectionCopy.workflow[mode];

  return (
    <section
      id="workflow"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="workflow-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="workflow-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
          </div>
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.lead}>
            <p className={styles.leadText}>{agenticWorkflow.text}</p>
            <p className={styles.leadNote}>
              Kort sagt: jeg hjelper en arbeidsplass å bruke AI-agenter
              produktivt <em>og</em> kritisk.
            </p>
          </Reveal>

          <ol className={styles.steps}>
            {agenticWorkflow.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.phase}
                delay={i * 60}
                className={styles.stepWrap}
              >
                <div className={styles.step}>
                  <span className={styles.stepNum}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className={styles.stepPhase}>{step.phase}</p>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
