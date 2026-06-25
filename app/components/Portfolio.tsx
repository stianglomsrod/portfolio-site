"use client";

import { useEffect, useState } from "react";
import { home, htmlLang, localeLabels, type Locale } from "../data/homepage";
import Hero from "./Hero";
import EvidenceOverview from "./EvidenceOverview";
import FeaturedKlar from "./FeaturedKlar";
import SupportingCases from "./SupportingCases";
import AgenticWorkflow from "./AgenticWorkflow";
import DeveloperPath from "./DeveloperPath";
import SiteFooter from "./SiteFooter";
import styles from "./Portfolio.module.css";

export default function Portfolio() {
  const [locale, setLocale] = useState<Locale>("no");
  const copy = home[locale];

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale];
    document.title = copy.metaTitle;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
  }, [copy.metaDescription, copy.metaTitle, locale]);

  return (
    <div className={styles.root}>
      <a className={styles.skipLink} href="#content">
        {copy.skipLink}
      </a>

      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="#top" className={styles.brand}>
            {copy.hero.name}
          </a>

          <div className={styles.headerControls}>
            <nav className={styles.nav} aria-label={copy.nav.label}>
              <a href="#arbeid">{copy.nav.work}</a>
              <a href="#klar">{copy.nav.klar}</a>
              <a href="#workflow">{copy.nav.workflow}</a>
              <a href="#dev-path">{copy.nav.dev}</a>
              <a href="#kontakt">{copy.nav.contact}</a>
            </nav>

            <div
              className={styles.languageToggle}
              role="group"
              aria-label={copy.languageToggle.label}
            >
              {(Object.keys(localeLabels) as Locale[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  className={styles.languageButton}
                  aria-pressed={locale === item}
                  onClick={() => setLocale(item)}
                >
                  <span className={styles.languageCode}>
                    {localeLabels[item]}
                  </span>
                  <span className={styles.languageName}>
                    {copy.languageToggle[item]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main id="content" className={styles.main}>
        <Hero copy={copy.hero} />
        <EvidenceOverview copy={copy.hero} />
        <FeaturedKlar
          copy={copy.featuredSection}
          data={copy.featuredCase}
          labels={copy.caseLabels}
        />
        <SupportingCases
          copy={copy.supportingSection}
          cases={copy.supportingCases}
          labels={copy.caseLabels}
        />
        <AgenticWorkflow copy={copy.workflow} />
        <DeveloperPath copy={copy.developer} />
      </main>

      <SiteFooter copy={copy.footer} />
    </div>
  );
}
