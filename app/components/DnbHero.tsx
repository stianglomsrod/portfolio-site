"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./DnbHero.module.css";

const content = {
  no: {
    eyebrow: "Stian Glomsrød",
    title:
      "Jeg bygger AI-first programvare som gjør sammensatte behov om til noe folk faktisk kan bruke.",
    intro:
      "Jeg jobber fullstack og bruker AI-agenter aktivt i utviklingen, med tydelige sjekkpunkter for kvalitet underveis. Det handler om å komme fra en uklar problemstilling til noe som faktisk virker og tåler å bli testet.",
    bulletsLabel: "Kort om arbeidet mitt",
    bullets: [
      "Bygget Klar, en fullstack PWA-prototype med roller, arbeidsflyt, innlogging og AI-assistert import med menneske-i-løkka-kontroll.",
      "Bruker AI-agenter som utviklingspartnere med klare krav, review-løkker, QA og aktiv korreksjon.",
      "Dokumenterer beslutninger, handoff og sikkerhetsgrenser slik at arbeidet kan etterprøves og videreføres.",
    ],
    ctaPrimary: "Slik bygger jeg med AI",
    ctaSecondary: "Ta kontakt",
  },
  en: {
    eyebrow: "Stian Glomsrød",
    title:
      "I build AI-first software that turns messy, real-world needs into something people can actually use.",
    intro:
      "I work full-stack and use AI agents actively while building, with clear quality checkpoints along the way. The point is getting from a vague problem to something that genuinely works and holds up to testing.",
    bulletsLabel: "A quick note on how I work",
    bullets: [
      "Built Klar, a full-stack PWA prototype with roles, workflows, sign-in and AI-assisted import with a human-in-the-loop check.",
      "Use AI agents as development partners, with clear requirements, review loops, QA and active correction.",
      "Document decisions, handoff and safety boundaries so the work can be verified and carried on by someone else.",
    ],
    ctaPrimary: "How I build with AI",
    ctaSecondary: "Get in touch",
  },
} as const;

export default function DnbHero() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <header className={styles.hero}>
      <div className={shared.container}>
        <Reveal delay={40}>
          <p className={styles.eyebrow}>{t.eyebrow}</p>
        </Reveal>

        <Reveal delay={80}>
          <h1 className={styles.title}>{t.title}</h1>
        </Reveal>

        <Reveal delay={140}>
          <p className={styles.intro}>{t.intro}</p>
        </Reveal>

        <Reveal delay={200}>
          <ul className={styles.bullets} aria-label={t.bulletsLabel}>
            {t.bullets.map((b) => (
              <li key={b} className={styles.bullet}>
                {b}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={260}>
          <div className={styles.actions}>
            <a className={styles.ctaPrimary} href="#arbeidsflyt">
              {t.ctaPrimary}
            </a>
            <a
              className={styles.ctaSecondary}
              href="mailto:stianglomsrod@gmail.com"
              aria-label={t.ctaSecondary}
            >
              {t.ctaSecondary}
            </a>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
