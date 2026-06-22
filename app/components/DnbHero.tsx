"use client";

import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DnbHero.module.css";

const bullets = [
  "Bygget Klar — en fullstack PWA-prototype med roller, arbeidsflyt, auth og AI-assistert import med menneske-i-løkka-kontroll.",
  "Bruker AI-agenter som utviklingspartnere med klare krav, review-løkker, QA og aktiv korreksjon.",
  "Dokumenterer beslutninger, handoff og sikkerhetgrenser slik at arbeidet kan etterprøves og videreføres.",
];

export default function DnbHero() {
  return (
    <header className={styles.hero}>
      <div className={shared.container}>
        <Reveal delay={40}>
          <p className={styles.eyebrow}>Stian Glomsrød</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>
            Jeg bygger AI-første programvare som gjør komplekse behov om til
            trygge, fungerende løsninger.
          </h1>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.intro}>
            Jeg kombinerer fullstack produktbygging, tydelige kvalitetsporter og
            agentisk utviklingspraksis for å gå fra uklar problemstilling til
            konkret, testbar leveranse.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <ul className={styles.bullets} aria-label="Kort om arbeidet mitt">
            {bullets.map((b) => (
              <li key={b} className={styles.bullet}>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={260}>
          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href="#arbeidsflyt">
              Slik bygger jeg med AI
            </a>
            <a
              className={styles.ctaSecondary}
              href="mailto:stianglomsrod@gmail.com"
              aria-label="Ta kontakt"
            >
              Ta kontakt
            </a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
