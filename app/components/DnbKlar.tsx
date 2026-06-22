"use client";

import Reveal from "./Reveal";
import CaseScreenshotGallery from "./CaseScreenshotGallery";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./DnbKlar.module.css";

const content = {
  no: {
    label: "Hovedprosjekt",
    title: "Klar — et fullstack AI-produkt, bygget i praksis",
    lede: "Klar er en fullstack PWA-prototype som støtter struktur, prioritering og hjelp underveis i skolehverdagen. Den viser hvordan brukerbehov kan oversettes til roller, arbeidsflyt, data, innlogging og AI-assistert import.",
    systemTitle: "Systemet",
    spec: [
      {
        label: "Frontend",
        value:
          "React og Next.js i TypeScript. Én delt kodebase serverer to ulike grensesnitt, ett for lærer og ett for elev.",
      },
      {
        label: "Backend og data",
        value:
          "Supabase med PostgreSQL. Et standardisert datalag jeg kan bygge videre på.",
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
    ],
    argued:
      "Valgene henger sammen. PWA, Supabase/PostgreSQL og én delt React/Next.js-kodebase trekker mot de samme målene: at løsningen fungerer på utstyret skolene allerede har, og at terskelen for å ta den i bruk er lav.",
    smartTitle: "Smart Import — AI som et bevisst produktvalg",
    smartLede:
      "Ingen ba om «en AI som leser ukebrevet mitt». Det var mitt tekniske svar på det tydeligste behovet, med en kontrollert grense rundt seg.",
    smartAria: "Smart Import, steg for steg",
    smartImport: [
      {
        label: "Flaskehalsen",
        text: "Lærere bruker mye tid på å omsette ukeplan og ukebrev til en strukturert oversikt for elevene. Det var det tydeligste behovet.",
      },
      {
        label: "AI som valgt verktøy",
        text: "Smart Import lar en AI tolke et helt vanlig ukebrev og foreslå timeplan, oppgaver, fag og klasser automatisk.",
      },
      {
        label: "Menneske i løkka",
        text: "Alt AI-en tolker vises i en redigerbar forhåndsvisning før publisering. Ingenting går ut automatisk; læreren beholder kontroll og ansvar.",
      },
      {
        label: "Evaluert med lærere",
        text: "I evalueringen med lærere var nettopp denne importen det sterkeste funnet og den klareste grunnen til å ta verktøyet i bruk.",
      },
    ],
    galleryTitle: "Fra produktet",
    galleryLede: "Skjermbilder fra Klar. Klikk for å se dem i full størrelse.",
    galleryLabels: [
      "Smart Import",
      "Lærerens landingsside",
      "Elevens landingsside",
      "Elevadministrasjon med opt-ins",
      "Hjelpekø",
      "Blomsterhage / progresjon",
    ],
    noteStrong: "Personvern og ansvar:",
    noteText:
      " løsningen er bygget med dataminimering og ansvarlig AI-bruk. Forhåndsvisningen før publisering fungerer også som en kontroll mot feiltolkning og mot at noe sensitivt flyter videre uten godkjenning.",
    disclaimer:
      "Klar er en robust prototype i full bredde, men ikke en ferdig plattform i stor skala. Evalueringen ble gjort med lærere, ikke elever, og det er en bevisst og dokumentert avgrensning.",
  },
  en: {
    label: "Main project",
    title: "Klar — a full-stack AI product, built for real",
    lede: "Klar is a full-stack PWA prototype that supports structure, prioritisation and help during the school day. It shows how user needs can be translated into roles, workflows, data, sign-in and AI-assisted import.",
    systemTitle: "The system",
    spec: [
      {
        label: "Frontend",
        value:
          "React and Next.js in TypeScript. One shared codebase serves two different interfaces, one for teachers and one for students.",
      },
      {
        label: "Backend and data",
        value:
          "Supabase with PostgreSQL. A standardised data layer I can keep building on.",
      },
      {
        label: "Sign-in and roles",
        value:
          "Authentication with role-based access. Teachers and students have different needs, and therefore different interfaces and permissions.",
      },
      {
        label: "Platform",
        value:
          "A responsive PWA that runs in the browser on PC, Chromebook, tablet and phone. Platform independence was a deliberate design choice.",
      },
    ],
    argued:
      "The choices hang together. The PWA, Supabase/PostgreSQL and a single shared React/Next.js codebase all pull toward the same goals: that the solution works on the hardware schools already have, and that the barrier to adopting it stays low.",
    smartTitle: "Smart Import — AI as a deliberate product choice",
    smartLede:
      "Nobody asked for “an AI that reads my weekly letter”. It was my technical answer to the clearest need, with a controlled boundary around it.",
    smartAria: "Smart Import, step by step",
    smartImport: [
      {
        label: "The bottleneck",
        text: "Teachers spend a lot of time turning the weekly plan and letter into a structured overview for students. That was the clearest need.",
      },
      {
        label: "AI as a chosen tool",
        text: "Smart Import lets an AI read an ordinary weekly letter and propose a schedule, tasks, subjects and classes automatically.",
      },
      {
        label: "Human in the loop",
        text: "Everything the AI interprets shows up in an editable preview before publishing. Nothing goes out on its own; the teacher keeps control and responsibility.",
      },
      {
        label: "Evaluated with teachers",
        text: "In the evaluation with teachers, this import was the strongest finding and the clearest reason to start using the tool.",
      },
    ],
    galleryTitle: "From the product",
    galleryLede: "Screenshots from Klar. Click to view them full size.",
    galleryLabels: [
      "Smart Import",
      "Teacher landing page",
      "Student landing page",
      "Student administration with opt-ins",
      "Help queue",
      "Flower garden / progress",
    ],
    noteStrong: "Privacy and responsibility:",
    noteText:
      " the solution is built with data minimisation and responsible AI use. The preview before publishing also acts as a check against misreadings and against anything sensitive flowing onward without approval.",
    disclaimer:
      "Klar is a robust, full-width prototype, but not a finished platform at large scale. The evaluation was done with teachers, not students, and that's a deliberate, documented limitation.",
  },
} as const;

export default function DnbKlar() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section id="klar" className={shared.section}>
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>{t.label}</p>
            <h2 className={shared.sectionTitle}>{t.title}</h2>
            <p className={shared.sectionLede}>{t.lede}</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h3 className={styles.blockTitle}>{t.systemTitle}</h3>
          <dl className={styles.spec}>
            {t.spec.map((s) => (
              <div key={s.label} className={styles.specRow}>
                <dt className={styles.specLabel}>{s.label}</dt>
                <dd className={styles.specValue}>{s.value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.argued}>{t.argued}</p>
        </Reveal>

        <Reveal delay={80}>
          <h3 className={styles.blockTitle}>{t.smartTitle}</h3>
          <p className={styles.blockLede}>{t.smartLede}</p>
          <ol className={styles.arc} aria-label={t.smartAria}>
            {t.smartImport.map((s, i) => (
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
          <h3 className={styles.blockTitle}>{t.galleryTitle}</h3>
          <p className={styles.blockLede}>{t.galleryLede}</p>
          <CaseScreenshotGallery
            caseId="klar"
            labels={[...t.galleryLabels]}
            className={styles.gallery}
          />
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.note}>
            <p>
              <strong>{t.noteStrong}</strong>
              {t.noteText}
            </p>
            <p className={styles.disclaimer}>{t.disclaimer}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
