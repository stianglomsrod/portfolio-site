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
];

const projects = [
  {
    tag: "Fullstack AI-produkt",
    name: "Klar",
    proof:
      "Next.js · React · TypeScript · Supabase/PostgreSQL · innlogging og rolletilgang · AI-assistert import med menneske-i-løkka-kontroll.",
    note: "Robust prototype og fullstack-bevis — ikke en ferdig plattform.",
    href: "https://klar-sigma.vercel.app/",
    linkLabel: "Åpne Klar",
  },
  {
    tag: "Agentisk utviklingsflyt",
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
              Jeg bruker ikke AI som autopilot. Jeg bruker AI som en disiplinert
              utviklingsflyt der hvert steg har en eier, en grense og en
              kontroll — fart og trygghet i samme bevegelse.
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
            Tempo uten kontroll skaper rework. Denne arbeidsformen er ikke noe
            jeg bruker solo — den er skrevet ned slik at den kan deles, læres og
            følges av andre. Det er enablement-tankegangen DNB AI Tech beskriver,
            i praktisk skala.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className={styles.stripHead}>
            <p className={shared.sectionLabel}>Tre prosjekter · samme mønster</p>
            <p className={styles.stripLede}>
              Dette er ikke tre tilfeldige prosjekter. Samme arbeidsmåte går
              igjen i alle tre: produkt, utviklingsflyt og overlevering.
            </p>
          </div>
          <ul className={styles.strip} aria-label="Prosjektevidens">
            {projects.map((p) => (
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
          <p className={styles.boundary}>
            Eksemplene viser arbeidsmåte og engineering-skjønn i praksis. De er
            ikke påstander om enterprise-skala eller senior plattformansvar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
