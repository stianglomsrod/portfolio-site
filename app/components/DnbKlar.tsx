import Reveal from "./Reveal";
import CaseScreenshotGallery from "./CaseScreenshotGallery";
import shared from "./Shared.module.css";
import styles from "./DnbKlar.module.css";

const spec = [
  {
    label: "Frontend",
    value:
      "React og Next.js i TypeScript. Én delt kodebase serverer to ulike grensesnitt — lærer og elev.",
  },
  {
    label: "Backend og data",
    value:
      "Supabase med PostgreSQL. Et åpent, standardisert datalag framfor en lukket, proprietær løsning.",
  },
  {
    label: "Innlogging og roller",
    value:
      "Autentisering med rollebasert tilgang. Lærer og elev har ulike behov, og dermed ulike grensesnitt og rettigheter.",
  },
  {
    label: "Plattform",
    value:
      "Responsiv PWA som kjører i nettleseren på PC, Chromebook, nettbrett og mobil. Plattformuavhengighet var et bevisst designvalg.",
  },
];

const smartImport = [
  {
    label: "Flaskehalsen",
    text: "Lærere bruker mye tid på å omsette ukeplan og ukebrev til en strukturert oversikt for elevene. Det var det tydeligste behovet.",
  },
  {
    label: "AI som valgt verktøy",
    text: "Smart Import lar en AI tolke et helt vanlig ukebrev og foreslå timeplan, oppgaver, fag og klasser — automatisk.",
  },
  {
    label: "Menneske i løkka",
    text: "Alt AI-en tolker vises i en redigerbar forhåndsvisning før publisering. Ingenting går ut automatisk; læreren beholder kontroll og ansvar.",
  },
  {
    label: "Validert med brukere",
    text: "I evalueringen med lærere var nettopp denne importen det sterkeste funnet og den klareste grunnen til å ta verktøyet i bruk.",
  },
];

export default function DnbKlar() {
  return (
    <section id="klar" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>Hovedbevis</p>
            <h2 className={shared.sectionTitle}>
              Klar — et fullstack AI-produkt, bygget i praksis
            </h2>
            <p className={shared.sectionLede}>
              Klar er en fullstack PWA-prototype som støtter struktur,
              prioritering og hjelp underveis i skolehverdagen. Den viser
              hvordan brukerbehov kan oversettes til roller, arbeidsflyt, data,
              innlogging og AI-assistert import med menneske-i-løkka-kontroll.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h3 className={styles.blockTitle}>Systemet</h3>
          <dl className={styles.spec}>
            {spec.map((s) => (
              <div key={s.label} className={styles.specRow}>
                <dt className={styles.specLabel}>{s.label}</dt>
                <dd className={styles.specValue}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.argued}>
            Arkitekturen er argumentert, ikke tilfeldig: valgene (PWA,
            Supabase/PostgreSQL, én React/Next.js-kodebase) henger sammen med
            designprinsippene om plattformuavhengighet og lav terskel for å ta i
            bruk.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h3 className={styles.blockTitle}>
            Smart Import — AI som et bevisst produktvalg
          </h3>
          <p className={styles.blockLede}>
            Ingen ba om «en AI som leser ukebrevet mitt». Det var mitt tekniske
            svar på det sterkeste behovet — og det med en kontrollert
            sikkerhetsgrense rundt seg.
          </p>
          <ol className={styles.arc} aria-label="Smart Import, steg for steg">
            {smartImport.map((s, i) => (
              <li key={s.label} className={styles.arcStep}>
                <span className={styles.arcNum} aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.arcLabel}>{s.label}</p>
                  <p className={styles.arcText}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={100}>
          <h3 className={styles.blockTitle}>Fra produktet</h3>
          <p className={styles.blockLede}>
            Skjermbilder fra Klar. Klikk for å se dem i full størrelse.
          </p>
          <CaseScreenshotGallery
            caseId="klar"
            labels={[
              "Smart Import",
              "Lærerens landingsside",
              "Elevens landingsside",
              "Elevadministrasjon med opt-ins",
              "Hjelpekø",
              "Blomsterhage / progresjon",
            ]}
            className={styles.gallery}
          />
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.note}>
            <p>
              <strong>Personvern og ansvar:</strong> løsningen er bygget med
              dataminimering og ansvarlig AI-bruk. Forhåndsvisningen før
              publisering fungerer også som en kontroll mot feiltolkning og mot
              at noe sensitivt flyter videre uten godkjenning.
            </p>
            <p className={styles.disclaimer}>
              Klar presenteres som en robust prototype og et fullstack-bevis —
              ikke som en ferdig plattform i enterprise-skala. Evalueringen ble
              gjort med lærere, ikke elever; det er en bevisst og dokumentert
              avgrensning.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
