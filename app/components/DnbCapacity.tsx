"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./DnbCapacity.module.css";

const content = {
  no: {
    label: "Kapasitet og retning",
    title: "Læringshastighet og ærlig vekstretning",
    nowTitle: "Det jeg kan vise nå",
    velocity: [
      "Vist rask overgang fra nytt teknisk domene til fungerende prototype. Bakgrunnen min er ikke primært software engineering, så fullstack-bygget er reelt bevis på rask, tverrfaglig læring.",
      "Holder jevn produksjon over tid, på tvers av utvikling, dokumentasjon, QA og forbedringsløkker.",
      "Programmeringsnysgjerrighet som spenner bredt: fra web og fullstack til interesse for lavnivå C og maskinvarenær koding.",
      "Gjør ny kunnskap om til systemer andre kan bruke: prototyper, sjekklister, handoff-dokumenter og repeterbare arbeidsflyter.",
    ],
    nextTitle: "Det jeg vil bygge videre",
    growthLede:
      "Jeg er motivert for å vokse inn i mer krevende engineering. Dette er retning, ikke en påstand om senior erfaring i dag:",
    growth: [
      "Lavnivå-engineering, verktøybygging og plattformtenkning.",
      "Robusthet, observability og sterkere driftsnær praksis.",
      "Distribuerte systemer, GitHub-automatisering (Actions og API) og agentiske rammeverk / MCP.",
    ],
    honest:
      "Det jeg trygt kan vise i dag, er AI-first fullstack produktbygging med disiplinert arbeidsflyt, kvalitetssikring og tydelig overlevering. Resten vil jeg heller være ærlig på enn å overselge.",
  },
  en: {
    label: "Capacity and direction",
    title: "Learning speed and an honest growth path",
    nowTitle: "What I can show now",
    velocity: [
      "A demonstrated fast move from a new technical domain to a working prototype. My background isn't primarily software engineering, so the full-stack build is real evidence of fast, cross-disciplinary learning.",
      "Steady output over time, across development, documentation, QA and improvement loops.",
      "Programming curiosity that ranges wide: from web and full-stack to an interest in low-level C and hardware-near code.",
      "Turning new knowledge into systems others can use: prototypes, checklists, handoff documents and repeatable workflows.",
    ],
    nextTitle: "What I want to build next",
    growthLede:
      "I'm motivated to grow into more demanding engineering. This is direction, not a claim of senior experience today:",
    growth: [
      "Low-level engineering, tooling and platform thinking.",
      "Robustness, observability and stronger operational practice.",
      "Distributed systems, GitHub automation (Actions and API) and agentic frameworks / MCP.",
    ],
    honest:
      "What I can safely show today is AI-first full-stack product building with a disciplined workflow, quality control and a clear handoff. The rest I'd rather be honest about than oversell.",
  },
} as const;

export default function DnbCapacity() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="kapasitet" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{t.label}</p>
            <h2 className={shared.sectionTitle}>{t.title}</h2>
          </div>
        </Reveal>

        <div className={styles.grid}>
          <Reveal delay={60} className={styles.col}>
            <h3 className={styles.colTitle}>{t.nowTitle}</h3>
            <ul className={styles.list}>
              {t.velocity.map((v) => (
                <li key={v} className={styles.item}>
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className={styles.col}>
            <h3 className={styles.colTitle}>{t.nextTitle}</h3>
            <p className={styles.growthLede}>{t.growthLede}</p>
            <ul className={`${styles.list} ${styles.growthList}`}>
              {t.growth.map((g) => (
                <li key={g} className={styles.item}>
                  {g}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <p className={styles.honest}>{t.honest}</p>
        </Reveal>
      </div>
    </section>
  );
}
