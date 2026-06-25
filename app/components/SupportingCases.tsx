import type { HomeCopy, ShowcaseCase } from "../data/homepage";
import CaseCard from "./CaseCard";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SupportingCases.module.css";

export default function SupportingCases({
  copy,
  cases,
  labels,
}: {
  copy: HomeCopy["supportingSection"];
  cases: ShowcaseCase[];
  labels: HomeCopy["caseLabels"];
}) {
  const primary = cases.filter((item) => (item.tier ?? "primary") === "primary");
  const secondary = cases.filter((item) => item.tier === "secondary");

  return (
    <section className={shared.section} aria-labelledby="cases-heading">
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="cases-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
            <p className={shared.sectionLede}>{copy.lede}</p>
          </div>
        </Reveal>

        <div className={styles.primaryGrid}>
          {primary.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <CaseCard data={item} labels={labels} />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 && (
          <>
            <Reveal>
              <p className={styles.secondaryLabel}>{copy.secondaryLabel}</p>
            </Reveal>
            <div className={styles.secondaryGrid}>
              {secondary.map((item, i) => (
                <Reveal key={item.id} delay={i * 70}>
                  <CaseCard data={item} labels={labels} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
