import type { HomeCopy } from "../data/homepage";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./AgenticWorkflow.module.css";

export default function AgenticWorkflow({
  copy,
}: {
  copy: HomeCopy["workflow"];
}) {
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
            <p className={styles.leadText}>{copy.text}</p>
            <p className={styles.leadNote}>{copy.note}</p>
          </Reveal>

          <ol className={styles.steps} aria-label={copy.stepsAria}>
            {copy.steps.map((step, i) => (
              <Reveal
                as="li"
                key={step.phase}
                delay={i * 60}
                className={styles.stepWrap}
              >
                <div className={styles.step}>
                  <span className={styles.stepNum} aria-hidden="true">
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

        <Reveal delay={120}>
          <section
            className={styles.evidence}
            aria-labelledby="workflow-evidence-heading"
          >
            <div className={styles.evidenceHead}>
              <p className={styles.evidenceLabel}>{copy.evidenceLabel}</p>
              <h3
                id="workflow-evidence-heading"
                className={styles.evidenceTitle}
              >
                {copy.evidenceTitle}
              </h3>
              <p className={styles.evidenceIntro}>{copy.evidenceIntro}</p>
            </div>

            <div className={styles.evidenceGrid}>
              {copy.evidenceProjects.map((project, index) => (
                <article
                  key={project.name}
                  className={styles.evidenceCard}
                  aria-labelledby={`workflow-evidence-${index}`}
                >
                  <p className={styles.evidenceTag}>{project.tag}</p>
                  <h4
                    id={`workflow-evidence-${index}`}
                    className={styles.projectName}
                  >
                    {project.name}
                  </h4>
                  <p className={styles.projectProof}>{project.proof}</p>
                  <p className={styles.projectNote}>{project.note}</p>
                  <ul className={styles.projectLinks}>
                    <li>
                      <CaseLink
                        href={project.primary.href}
                        label={project.primary.label}
                      />
                    </li>
                    {project.repo && (
                      <li>
                        <CaseLink
                          href={project.repo.href}
                          label={project.repo.label}
                        />
                      </li>
                    )}
                  </ul>
                </article>
              ))}
            </div>

            <p className={styles.boundary}>{copy.evidenceBoundary}</p>
          </section>
        </Reveal>
      </div>
    </section>
  );
}
