"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./DnbWorkflow.module.css";

const content = {
  no: {
    label: "Arbeidsflyt",
    title: "Slik bygger jeg med AI",
    lede: "AI-agenter gjør meg raskere, men de får ikke siste ord. Jeg jobber i en fast flyt der hvert steg har en eier og en grense, slik at farten ikke går på bekostning av kontrollen.",
    stepsAria: "Utviklingsprosessen steg for steg",
    steps: [
      {
        num: "01",
        label: "Kontekst",
        desc: "Jeg starter med mål, rammer, kilder og hva som faktisk teller som ferdig.",
      },
      {
        num: "02",
        label: "Krav",
        desc: "Jeg bryter oppgaven ned i små, reviewbare steg med tydelige akseptansekriterier.",
      },
      {
        num: "03",
        label: "Menneskelig gjennomgang",
        desc: "Alt modellen foreslår behandles som utkast, ikke fasit. Jeg leser, vurderer og avgjør.",
      },
      {
        num: "04",
        label: "Korreksjon",
        desc: "Jeg tester antagelser, retter feil, strammer scope og følger opp avvik.",
      },
      {
        num: "05",
        label: "QA",
        desc: "Sjekklister for påstander, teknisk risiko og dokumentasjon før noe markeres som klart.",
      },
      {
        num: "06",
        label: "Dokumentasjon",
        desc: "Beslutninger, avgrensninger og usikkerheter logges underveis.",
      },
      {
        num: "07",
        label: "Overlevering",
        desc: "Handoff skrevet slik at andre kan ta arbeidet videre uten muntlig kontekst.",
      },
      {
        num: "08",
        label: "Kontrollpunkter",
        desc: "Ingen påstander uten dekning, ingen private data i feil kontekst, ingen «ferdig» uten verifisering.",
      },
    ],
    relevance:
      "Jeg har skrevet ned denne arbeidsmåten slik at andre kan plukke den opp, ikke bare jeg. Det er den samme enablement-tankegangen DNB AI Tech beskriver, i praktisk skala.",
    stripLabel: "Tre prosjekter · samme mønster",
    stripLede:
      "Tre ulike prosjekter, men samme arbeidsmåte går igjen: et produkt, en langvarig utviklingsflyt og en overlevering til en ekte eier.",
    stripAria: "Prosjekter",
    projects: [
      {
        tag: "Fullstack AI-produkt",
        name: "Klar",
        proof:
          "Next.js · React · TypeScript · Supabase/PostgreSQL · innlogging og rolletilgang · AI-assistert import med forhåndsvisning.",
        note: "Det nærmeste jeg har et helhetlig produkt.",
        href: "https://klar-sigma.vercel.app/",
        linkLabel: "Åpne Klar",
      },
      {
        tag: "Dokumentert utviklingsflyt",
        name: "Companion",
        proof:
          "Flutter · Dart · Drift/SQLite · lokal-first arkitektur · PROJECT_DNA, planer, epics og tester.",
        note: "Langsiktig, dokumentert utviklingsdisiplin i praksis.",
        href: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "Se repoet",
      },
      {
        tag: "Enablement og overlevering",
        name: "Lori Frisør",
        proof:
          "Astro · Keystatic (eierredigering) · Vercel · handoff-dokumentasjon · valgte å integrere Timma framfor å bygge booking på nytt.",
        note: "Pragmatisk leveranse for en ekte eier.",
        href: "https://lori-frisor.vercel.app/",
        linkLabel: "Åpne nettstedet",
      },
    ],
    boundary:
      "Eksemplene viser arbeidsmåte og tekniske vurderinger, i prototypeskala.",
  },
  en: {
    label: "Workflow",
    title: "How I build with AI",
    lede: "AI agents make me faster, but they don't get the last word. I work in a fixed flow where every step has an owner and a boundary, so speed never comes at the cost of control.",
    stepsAria: "The development process, step by step",
    steps: [
      {
        num: "01",
        label: "Context",
        desc: "I start with goals, constraints, sources and what actually counts as done.",
      },
      {
        num: "02",
        label: "Requirements",
        desc: "I break the task into small, reviewable steps with clear acceptance criteria.",
      },
      {
        num: "03",
        label: "Human review",
        desc: "Everything the model suggests is treated as a draft, not fact. I read it, weigh it and decide.",
      },
      {
        num: "04",
        label: "Correction",
        desc: "I test assumptions, fix mistakes, tighten scope and follow up on anything that's off.",
      },
      {
        num: "05",
        label: "QA",
        desc: "Checklists for claims, technical risk and documentation before anything is marked done.",
      },
      {
        num: "06",
        label: "Documentation",
        desc: "Decisions, limitations and open questions get logged as I go.",
      },
      {
        num: "07",
        label: "Handoff",
        desc: "A handoff written so others can pick the work up without needing me to explain it.",
      },
      {
        num: "08",
        label: "Guardrails",
        desc: "No claims without backing, no private data in the wrong place, nothing called “done” without verification.",
      },
    ],
    relevance:
      "I've written this way of working down so others can pick it up, not just me. It's the same enablement mindset DNB AI Tech describes, at a practical scale.",
    stripLabel: "Three projects · one pattern",
    stripLede:
      "Three different projects, but the same way of working runs through them: a product, a long-running dev workflow and a handoff to a real owner.",
    stripAria: "Projects",
    projects: [
      {
        tag: "Full-stack AI product",
        name: "Klar",
        proof:
          "Next.js · React · TypeScript · Supabase/PostgreSQL · sign-in and role-based access · AI-assisted import with a preview gate.",
        note: "The closest thing I have to a complete product.",
        href: "https://klar-sigma.vercel.app/",
        linkLabel: "Open Klar",
      },
      {
        tag: "Documented dev workflow",
        name: "Companion",
        proof:
          "Flutter · Dart · Drift/SQLite · local-first architecture · PROJECT_DNA, plans, epics and tests.",
        note: "Long-running, documented development discipline in practice.",
        href: "https://github.com/stianglomsrod/nikkoprogging",
        linkLabel: "View the repo",
      },
      {
        tag: "Enablement and handoff",
        name: "Lori Frisør",
        proof:
          "Astro · Keystatic (owner editing) · Vercel · handoff documentation · chose to integrate Timma instead of rebuilding booking from scratch.",
        note: "Pragmatic delivery for a real owner.",
        href: "https://lori-frisor.vercel.app/",
        linkLabel: "Open the site",
      },
    ],
    boundary:
      "These examples show how I work and the technical judgement behind it, at prototype scale.",
  },
} as const;

export default function DnbWorkflow() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="arbeidsflyt" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{t.label}</p>
            <h2 className={shared.sectionTitle}>{t.title}</h2>
            <p className={shared.sectionLede}>{t.lede}</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <ol className={styles.steps} aria-label={t.stepsAria}>
            {t.steps.map((s) => (
              <li key={s.num} className={styles.step}>
                <span className={styles.stepNum} aria-hidden="true">
                  {s.num}
                </span>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>{s.label}</span>
                  <span className={styles.stepDesc}>{s.desc}</span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100}>
          <p className={styles.relevance}>{t.relevance}</p>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.stripHead}>
            <p className={shared.sectionLabel}>{t.stripLabel}</p>
            <p className={styles.stripLede}>{t.stripLede}</p>
          </div>
          <ul className={styles.strip} aria-label={t.stripAria}>
            {t.projects.map((p) => (
              <li key={p.name} className={styles.card}>
                <span className={styles.cardTag}>{p.tag}</span>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardProof}>{p.proof}</p>
                <p className={styles.cardNote}>{p.note}</p>
                <a
                  className={styles.cardLink}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {p.linkLabel}
                  <span aria-hidden="true"> →</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.boundary}>{t.boundary}</p>
        </Reveal>
      </div>
    </section>
  );
}
