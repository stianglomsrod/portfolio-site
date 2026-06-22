import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DnbCapacity.module.css";

const velocity = [
  "Vist rask overgang fra nytt teknisk domene til fungerende prototype. Bakgrunnen min er ikke primært software engineering, så fullstack-bygget er reelt bevis på rask, tverrfaglig læring.",
  "Leverer vedvarende output over tid — på tvers av utvikling, dokumentasjon, QA og forbedringsløkker.",
  "Programmeringsnysgjerrighet som spenner bredt: fra web og fullstack til interesse for lavnivå C og maskinvarenær koding.",
  "Gjør ny kunnskap om til systemer andre kan bruke: prototyper, sjekklister, handoff-dokumenter og repeterbare arbeidsflyter.",
];

const growth = [
  "Lavnivå-engineering, verktøybygging og plattformtenkning.",
  "Robusthet, observability og sterkere driftsnær praksis.",
  "Distribuerte systemer, GitHub-automatisering (Actions og API) og agentiske rammeverk / MCP.",
];

export default function DnbCapacity() {
  return (
    <section id="kapasitet" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>Kapasitet og retning</p>
            <h2 className={shared.sectionTitle}>
              Læringshastighet og ærlig vekstretning
            </h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={60} className={styles.col}>
            <h3 className={styles.colTitle}>Det jeg kan vise nå</h3>
            <ul className={styles.list}>
              {velocity.map((v) => (
                <li key={v} className={styles.item}>
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className={styles.col}>
            <h3 className={styles.colTitle}>Det jeg vil bygge videre</h3>
            <p className={styles.growthLede}>
              Jeg er motivert for å vokse i mer krevende engineering. Dette er
              retning, ikke en påstand om senior erfaring i dag:
            </p>
            <ul className={`${styles.list} ${styles.growthList}`}>
              {growth.map((g) => (
                <li key={g} className={styles.item}>
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className={styles.honest}>
            Den sterkeste dokumenterte evidensen min nå er AI-first fullstack
            produktbygging med disiplinert arbeidsflyt, kvalitetssikring og
            tydelig overlevering. Resten er retning jeg er ærlig på at jeg vil
            bygge — ikke noe jeg later som jeg allerede mestrer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
