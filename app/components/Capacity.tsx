"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./Capacity.module.css";

const content = {
  no: {
    label: "Kapasitet og retning",
    title: "Læringshastighet og ærlig vekstretning",
    nowTitle: "Det jeg kan vise nå",
    velocity: [
      "Vist rask overgang fra et nytt teknisk domene til en fungerende prototype. Bakgrunnen min er tverrfaglig og ikke primært software engineering, så et fullstack-bygg fra grunnen sier mye om læringstempoet mitt.",
      "Holder jevn produksjon over tid, på tvers av utvikling, dokumentasjon, QA og forbedringsløkker.",
      "Gjør ny kunnskap om til systemer andre kan bruke: prototyper, sjekklister, handoff-dokumenter og repeterbare arbeidsflyter.",
    ],
    nextTitle: "Det jeg vil bygge videre",
    growthLede:
      "Jeg er motivert for å vokse inn i mer krevende engineering. Her er det jeg jobber mot å bli bedre på, ærlig sagt fra der jeg står i dag:",
    growth: [
      "Lavnivå-engineering, verktøybygging og plattformtenkning.",
      "Robusthet, observability og sterkere driftsnær praksis.",
      "Distribuerte systemer, GitHub-automatisering (Actions og API) og agentiske rammeverk / MCP.",
    ],
    learnTitle: "Programmering og veien hit",
    learnLede:
      "Jeg er ikke utdannet programmerer. Grunnlaget har jeg bygget stein for stein, og jeg fortsetter på det.",
    learn: [
      "Lærte grunnmuren gjennom CS50x hos Harvard: C, Python, SQL og webfundamentene HTML, CSS og JavaScript.",
      "Bygde videre i Python/Django og JavaScript/Vue i forløperprosjektet til Klar, sammen med elever som meddesignere.",
      "Har brukt programmering som lærer også, med micro:bit og Kitronik-elektronikk og små opplegg i Python og JavaScript/HTML/CSS.",
      "Nå lærer jeg Java gjennom et kursløp på Coursera. Mye er gjenkjennelig fra C og JavaScript, så fundamentet flytter med.",
      "Python og JavaScript sitter løsest i hendene. Jeg lærer fortsatt, og koding er noe av det jeg får mest energi av.",
    ],
    linksAria: "Lenker til CS50x-sertifikat og tidligere prosjekter",
    learnLinks: [
      {
        label: "CS50x-sertifikat",
        href: "https://cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45",
      },
      {
        label: "Forløperprosjekt: frontend (Vue)",
        href: "https://github.com/stianglomsrod/pd-app-frontend",
      },
      {
        label: "Forløperprosjekt: backend (Django)",
        href: "https://github.com/stianglomsrod/pd-app-backend",
      },
    ],
    learnClose:
      "Det jeg tar med inn i en slik rolle, er et ekte driv for å bli en virkelig god programmerer, og lyst til å gjøre det et sted der læring og bidrag teller.",
    honest:
      "Det jeg trygt kan vise i dag, er AI-first fullstack produktbygging med disiplinert arbeidsflyt, kvalitetssikring og tydelig overlevering. Resten vil jeg heller være ærlig på enn å overselge.",
  },
  en: {
    label: "Capacity and direction",
    title: "Learning speed and an honest growth path",
    nowTitle: "What I can show now",
    velocity: [
      "A demonstrated fast move from a new technical domain to a working prototype. My background is cross-disciplinary and not primarily software engineering, so a full-stack build from the ground up says a lot about how fast I learn.",
      "Steady output over time, across development, documentation, QA and improvement loops.",
      "Turning new knowledge into systems others can use: prototypes, checklists, handoff documents and repeatable workflows.",
    ],
    nextTitle: "What I want to build next",
    growthLede:
      "I'm motivated to grow into more demanding engineering. Here's what I'm working toward, honestly from where I stand today:",
    growth: [
      "Low-level engineering, tooling and platform thinking.",
      "Robustness, observability and stronger operational practice.",
      "Distributed systems, GitHub automation (Actions and API) and agentic frameworks / MCP.",
    ],
    learnTitle: "Programming and how I got here",
    learnLede:
      "I'm not a formally trained programmer. I've built the foundation piece by piece, and I keep building on it.",
    learn: [
      "Learned the fundamentals through Harvard's CS50x: C, Python, SQL and the web basics HTML, CSS and JavaScript.",
      "Kept building in Python/Django and JavaScript/Vue on the project that preceded Klar, with pupils as co-designers.",
      "Used programming as a teacher too, with micro:bit and Kitronik electronics and small exercises in Python and JavaScript/HTML/CSS.",
      "Right now I'm learning Java through a Coursera course. A lot of it carries over from C and JavaScript, so the foundation moves with me.",
      "Python and JavaScript are the most familiar in my hands. I'm still learning, and coding is one of the things that gives me the most energy.",
    ],
    linksAria: "Links to the CS50x certificate and earlier projects",
    learnLinks: [
      {
        label: "CS50x certificate",
        href: "https://cs50.harvard.edu/certificates/0e9210d1-86f5-445a-b4d6-46fad1a5fd45",
      },
      {
        label: "Predecessor project: frontend (Vue)",
        href: "https://github.com/stianglomsrod/pd-app-frontend",
      },
      {
        label: "Predecessor project: backend (Django)",
        href: "https://github.com/stianglomsrod/pd-app-backend",
      },
    ],
    learnClose:
      "What I bring to a role like this is a real drive to become a genuinely good programmer, and a wish to do it somewhere learning and contribution count.",
    honest:
      "What I can safely show today is AI-first full-stack product building with a disciplined workflow, quality control and a clear handoff. The rest I'd rather be honest about than oversell.",
  },
} as const;

export default function Capacity() {
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

        <Reveal delay={120}>
          <div className={styles.learn}>
            <h3 className={styles.colTitle}>{t.learnTitle}</h3>
            <p className={styles.growthLede}>{t.learnLede}</p>
            <ul className={styles.list}>
              {t.learn.map((l) => (
                <li key={l} className={styles.item}>
                  {l}
                </li>
              ))}
            </ul>
            <ul className={styles.learnLinks} aria-label={t.linksAria}>
              {t.learnLinks.map((l) => (
                <li key={l.href}>
                  <a
                    className={styles.learnLink}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {l.label}
                    <span aria-hidden="true"> →</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.learnClose}>{t.learnClose}</p>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <p className={styles.honest}>{t.honest}</p>
        </Reveal>
      </div>
    </section>
  );
}
