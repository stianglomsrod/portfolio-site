import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DnbMethod.module.css";

const mappings = [
  {
    need: "Lav terskel og tidssparing for læreren",
    decision:
      "Smart Import: en AI tolker ukebrevet, læreren godkjenner i en forhåndsvisning før noe publiseres.",
  },
  {
    need: "Verktøyet må virke på alt utstyret skolen har",
    decision:
      "Responsiv PWA med Supabase/PostgreSQL og én delt React/Next.js-kodebase, framfor en app per plattform.",
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
      "Spillelementer som valgfrie opt-ins, slått av som standard — eleven velger selv.",
  },
];

export default function DnbMethod() {
  return (
    <section id="metode" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>Metode</p>
            <h2 className={shared.sectionTitle}>
              Fra uklare behov til byggbare systemer
            </h2>
            <p className={shared.sectionLede}>
              Mye av styrken min ligger i å gå fra rotete, virkelige behov til
              konkrete systemvalg. Det er ikke ren UX — hver innsikt lander på en
              teknisk beslutning om data, roller, flyt eller arkitektur.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <p className={styles.basis}>
            Metodisk hviler dette på{" "}
            <strong>participatory design</strong> (lærere som med-designere) og{" "}
            <strong>design science</strong> (bygg → evaluer → begrunn), gjennom
            workshops for innsamling, prioritering og beslutning. Det er
            dokumentert og eksaminert arbeid fra masteroppgaven, ikke en påstand.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <ul className={styles.map} aria-label="Fra behov til teknisk valg">
            {mappings.map((m) => (
              <li key={m.need} className={styles.row}>
                <div className={styles.need}>
                  <span className={styles.needTag}>Behov</span>
                  <p className={styles.needText}>{m.need}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
                <div className={styles.decision}>
                  <span className={styles.decisionTag}>Teknisk valg</span>
                  <p className={styles.decisionText}>{m.decision}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100}>
          <p className={styles.relevance}>
            Dette er hvorfor metodebakgrunnen er relevant for AI-first
            engineering: en god modell hjelper lite uten presis problemramming.
            Den samme disiplinen sikrer at AI-arbeid treffer riktig problem — og
            kan tas videre av et team.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
