import type { Mode } from "../data/portfolio";
import { supportingCases, sectionCopy } from "../data/portfolio";
import CaseCard from "./CaseCard";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SupportingCases.module.css";

export default function SupportingCases({ mode }: { mode: Mode }) {
  const copy = sectionCopy.supporting[mode];
  const primary = supportingCases.filter(
    (c) => (c.tier ?? "primary") === "primary",
  );
  const secondary = supportingCases.filter((c) => c.tier === "secondary");

  return (
    <section className={shared.section} aria-labelledby="cases-heading">
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{copy.label}</p>
            <h2 id="cases-heading" className={shared.sectionTitle}>
              {copy.title}
            </h2>
            <p className={shared.sectionLede}>
              Samme mønster går igjen: finn et reelt problem, involver brukere,
              gjør ideen testbar.
            </p>
          </div>
        </Reveal>

        <div className={styles.primaryGrid}>
          {primary.map((item, i) => (
            <Reveal key={item.id} delay={i * 70}>
              <CaseCard data={item} mode={mode} />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 && (
          <>
            <Reveal>
              <p className={styles.secondaryLabel}>
                Tidligere og støttende arbeid
              </p>
            </Reveal>
            <div className={styles.secondaryGrid}>
              {secondary.map((item, i) => (
                <Reveal key={item.id} delay={i * 70}>
                  <CaseCard data={item} mode={mode} />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
