"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./Method.module.css";

const content = {
  no: {
    label: "Metode",
    title: "Fra uklare behov til byggbare systemer",
    lede: "Mye av styrken min ligger i å gå fra rotete, virkelige behov til konkrete systemvalg. Hver innsikt ender i et konkret teknisk valg.",
    basisLead: "Metodisk hviler dette på ",
    basisPd: "participatory design",
    basisMid: " (lærere som med-designere) og ",
    basisDs: "design science",
    basisTail:
      " (bygg → evaluer → begrunn), gjennom workshops som samlet inn og prioriterte behovene. Det er dokumentert og eksaminert arbeid fra masteroppgaven.",
    mapAria: "Fra behov til teknisk valg",
    needTag: "Behov",
    decisionTag: "Teknisk valg",
    mappings: [
      {
        need: "Lav terskel og tidssparing for læreren",
        decision:
          "Smart Import: en AI tolker ukebrevet, læreren godkjenner i en forhåndsvisning før noe publiseres.",
      },
      {
        need: "Verktøyet må virke på alt utstyret skolen har",
        decision:
          "Responsiv PWA med Supabase/PostgreSQL og én delt React/Next.js-kodebase som dekker alle plattformene.",
      },
      {
        need: "Lærer og elev har helt ulike behov",
        decision:
          "Rollebasert tilgang og to grensesnitt på samme datalag, ikke to separate systemer.",
      },
      {
        need: "Hjelp uten stigma",
        decision:
          "Støtte bygget inn i det felles grensesnittet, ikke skilt ut i et eget «spesial»-spor.",
      },
      {
        need: "Motivasjon uten å presse",
        decision:
          "Spillelementer er valgfri støtte som er av som standard. Læreren vurderer om de passer for eleven, og slår dem på.",
      },
    ],
    relevance:
      "Dette er hvorfor metodebakgrunnen er relevant for AI-first engineering: en god modell hjelper lite uten presis problemramming. Den samme disiplinen gjør at AI-arbeid treffer riktig problem fra start.",
  },
  en: {
    label: "Method",
    title: "From unclear needs to buildable systems",
    lede: "A lot of my strength is in getting from messy, real-world needs to concrete system choices. Every insight ends in a concrete technical decision.",
    basisLead: "Methodologically this rests on ",
    basisPd: "participatory design",
    basisMid: " (teachers as co-designers) and ",
    basisDs: "design science",
    basisTail:
      " (build → evaluate → justify), through workshops that gathered and prioritised the needs. It's documented and examined work from my master's thesis.",
    mapAria: "From need to technical decision",
    needTag: "Need",
    decisionTag: "Technical choice",
    mappings: [
      {
        need: "Low barrier and time saved for the teacher",
        decision:
          "Smart Import: an AI reads the weekly letter, the teacher approves in a preview before anything is published.",
      },
      {
        need: "The tool has to work on whatever hardware the school has",
        decision:
          "A responsive PWA with Supabase/PostgreSQL and one shared React/Next.js codebase that covers every platform.",
      },
      {
        need: "Teachers and students have completely different needs",
        decision:
          "Role-based access and two interfaces on the same data layer, not two separate systems.",
      },
      {
        need: "Help without stigma",
        decision:
          "Support built into the shared interface, not split off into a separate “special” track.",
      },
      {
        need: "Motivation without pressure",
        decision:
          "Game elements are optional support, off by default. The teacher decides whether they suit a student and turns them on.",
      },
    ],
    relevance:
      "This is why the method background matters for AI-first engineering: a good model helps little without precise problem framing. The same discipline means AI work targets the right problem from the start.",
  },
} as const;

export default function Method() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="metode" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{t.label}</p>
            <h2 className={shared.sectionTitle}>{t.title}</h2>
            <p className={shared.sectionLede}>{t.lede}</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className={styles.basis}>
            {t.basisLead}
            <strong>{t.basisPd}</strong>
            {t.basisMid}
            <strong>{t.basisDs}</strong>
            {t.basisTail}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className={styles.map} aria-label={t.mapAria}>
            {t.mappings.map((m) => (
              <li key={m.need} className={styles.row}>
                <div className={styles.need}>
                  <span className={styles.needTag}>{t.needTag}</span>
                  <p className={styles.needText}>{m.need}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
                <div className={styles.decision}>
                  <span className={styles.decisionTag}>{t.decisionTag}</span>
                  <p className={styles.decisionText}>{m.decision}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <p className={styles.relevance}>{t.relevance}</p>
        </Reveal>
      </div>
    </section>
  );
}
