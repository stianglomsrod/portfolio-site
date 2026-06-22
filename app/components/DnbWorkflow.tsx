"use client";

import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DnbWorkflow.module.css";

const steps = [
  {
    num: "01",
    label: "Kontekst",
    desc: "Jeg starter med mål, rammer, kilder og hva som faktisk teller som ferdig.",
  },
  {
    num: "02",
    label: "Krav",
    desc: "Jeg bryter ned oppgaven i små, reviewbare steg med tydelige akseptansekriterier.",
  },
  {
    num: "03",
    label: "Human review",
    desc: "Alt forslag fra modellene behandles som utkast, ikke fasit.",
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
    label: "Handoff",
    desc: "Overlevering skrevet slik at andre kan ta videre uten muntlig kontekst.",
  },
  {
    num: "08",
    label: "Safety gates",
    desc: "Ingen overclaims, ingen private data i feil kontekst, ingen «ferdig» uten verifisering.",
  },
];

const projects = [
  {
    tag: "Fullstack AI-produkt",
    name: "Klar",
    proof:
      "Next.js · React · TypeScript · Supabase/PostgreSQL · auth/RBAC · AI-assistert import med menneske-i-løkka-kontroll.",
    note: "Robust prototype og fullstack bevis — ikke enterprise-plattform.",
  },
  {
    tag: "Agentic utviklingsflyt",
    name: "Companion",
    proof:
      "Flutter · Dart · Drift/SQLite · lokal-first arkitektur · PROJECT_DNA · epics, planer og tester.",
    note: "Langsiktig, dokumentert utviklingsdisiplin i praksis.",
  },
  {
    tag: "Enablement og overlevering",
    name: "Lori Frisør",
    proof:
      "Astro · Keystatic (eierredigering) · Vercel · handoff-dokumentasjon · valgt å integrere Timma fremfor å bygge booking.",
    note: "Pragmatisk leveranse for ekte eier.",
  },
];

export default function DnbWorkflow() {
  return (
    <section id="arbeidsflyt" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>Arbeidsflyt</p>
            <h2 className={shared.sectionTitle}>Slik bygger jeg med AI</h2>
            <p className={shared.sectionLede}>
              Jeg bruker ikke AI som autopilot — jeg bruker AI som en
              disiplinert utviklingsflyt med tydelig ansvar, der hvert steg har
              eier, grenser og kontroll.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <ol
            className={styles.steps}
            aria-label="Utviklingsprosessen steg for steg"
          >
            {steps.map((s) => (
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
          <p className={styles.relevance}>
            Tempo uten kontroll skaper rework. Denne arbeidsformen gir både
            fart og trygghet — og er designet for å kunne deles og læres av
            andre.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.stripHead}>
            <p className={shared.sectionLabel}>Tre prosjekter · ett mønster</p>
            <p className={styles.stripLede}>
              Disse er ikke tre tilfeldige prosjekter. Samlet viser de ett
              reproduserbart mønster: produkt, arbeidsflyt og overlevering.
            </p>
          </div>
          <ul className={styles.strip} aria-label="Prosjektevidens">
            {projects.map((p) => (
              <li key={p.name} className={styles.card}>
                <span className={styles.cardTag}>{p.tag}</span>
                <h3 className={styles.cardName}>{p.name}</h3>
                <p className={styles.cardProof}>{p.proof}</p>
                <p className={styles.cardNote}>{p.note}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
