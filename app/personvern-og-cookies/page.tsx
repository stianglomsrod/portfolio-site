import type { Metadata } from "next";
import Link from "next/link";
import shared from "../components/Shared.module.css";

const email = "stianglomsrod@gmail.com";

export const metadata: Metadata = {
  title: "Personvern og cookies — Stian Glomsrød",
  description:
    "Informasjon om personvern, cookies og lokal lagring på stianglomsrod.no.",
};

export default function PrivacyAndCookiesPage() {
  return (
    <main className={shared.section} aria-labelledby="privacy-heading">
      <div className={shared.container}>
        <p className={shared.sectionLabel}>Personvern / Privacy</p>
        <h1 id="privacy-heading" className={shared.sectionTitle}>
          Personvern og cookies
        </h1>
        <p className={shared.sectionLede}>
          Sist oppdatert: 25. juni 2026
        </p>

        <section aria-labelledby="privacy-no-heading">
          <h2 id="privacy-no-heading" className={shared.sectionTitle}>
            Norsk
          </h2>
          <p className={shared.sectionLede}>
            Denne nettsiden setter ikke cookies, bruker ikke analyse- eller
            markedsføringsscript, og lagrer ikke språk- eller temavalg i
            nettleseren. Språkvalg skjer kun i den åpne fanen og nullstilles ved
            ny lasting av siden.
          </p>
          <p className={shared.sectionLede}>
            Behandlingsansvarlig for innholdet på denne siden er Stian Glomsrød.
            Du kan ta kontakt på{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p className={shared.sectionLede}>
            Kontaktlenker til e-post, LinkedIn, GitHub, Figma, YouTube og
            eksterne demoer går til tredjepartstjenester. Disse tjenestene kan
            behandle data etter sine egne vilkår når du åpner dem.
          </p>
          <p className={shared.sectionLede}>
            Dersom siden senere får analyse, markedsføring eller andre
            ikke-nødvendige cookies, skal samtykke innhentes før slike cookies
            settes, i tråd med norsk ekomregelverk, GDPR/ePrivacy-prinsipper og
            relevante internasjonale krav.
          </p>
        </section>

        <section aria-labelledby="privacy-en-heading" lang="en">
          <h2 id="privacy-en-heading" className={shared.sectionTitle}>
            English
          </h2>
          <p className={shared.sectionLede}>
            This website does not set cookies, does not use analytics or
            marketing scripts, and does not store language or theme preferences
            in the browser. The language toggle only affects the current open
            tab and resets when the page is loaded again.
          </p>
          <p className={shared.sectionLede}>
            The controller for the content on this site is Stian Glomsrød. You
            can contact me at <a href={`mailto:${email}`}>{email}</a>.
          </p>
          <p className={shared.sectionLede}>
            Links to email, LinkedIn, GitHub, Figma, YouTube, and external demos
            lead to third-party services. Those services may process data under
            their own terms when you open them.
          </p>
          <p className={shared.sectionLede}>
            If analytics, marketing, or other non-essential cookies are added in
            the future, consent should be collected before those cookies are set,
            in line with Norwegian e-com rules, GDPR/ePrivacy principles, and
            relevant international requirements.
          </p>
        </section>

        <p className={shared.sectionLede}>
          <Link href="/">Tilbake til forsiden / Back to home</Link>
        </p>
      </div>
    </main>
  );
}
