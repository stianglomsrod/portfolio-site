"use client";

import Reveal from "./Reveal";
import { useLanguage } from "./LanguageContext";
import shared from "./Shared.module.css";
import styles from "./Contact.module.css";

const content = {
  no: {
    ctaTitle: "Ta kontakt hvis du vil vite mer om hvordan jeg jobber.",
    ctaText:
      "Jeg er nysgjerrig på hvordan AI endrer måten vi lager programvare på, og har lyst til å jobbe et sted der det tas på alvor. Send en e-post hvis det kan passe.",
    ctaPrimary: "Send e-post",
    ctaSecondary: "Se arbeidsflyten igjen",
    links: [
      { label: "E-post", href: "mailto:stianglomsrod@gmail.com" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
      },
      { label: "GitHub", href: "https://github.com/stianglomsrod" },
    ],
    footNote:
      "Ja, denne siden er bygget med AI-agenter. Nei, de fikk ikke styre alene.",
  },
  en: {
    ctaTitle: "Get in touch if you want to know how I work.",
    ctaText:
      "I'm curious about how AI is changing the way we build software, and I'd like to work somewhere that takes it seriously. Send an email if it might be a fit.",
    ctaPrimary: "Send an email",
    ctaSecondary: "Back to the workflow",
    links: [
      { label: "Email", href: "mailto:stianglomsrod@gmail.com" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
      },
      { label: "GitHub", href: "https://github.com/stianglomsrod" },
    ],
    footNote:
      "Yes, this page was built with AI agents. No, they didn't get to run the show.",
  },
} as const;

export default function Contact() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer id="kontakt" className={styles.contact}>
      <div className={shared.container}>
        <Reveal>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>{t.ctaTitle}</h2>
            <p className={styles.ctaText}>{t.ctaText}</p>
            <div className={styles.actions}>
              <a
                className={styles.ctaPrimary}
                href="mailto:stianglomsrod@gmail.com"
              >
                {t.ctaPrimary}
              </a>
              <a className={styles.ctaSecondary} href="#arbeidsflyt">
                {t.ctaSecondary}
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.foot}>
            <ul className={styles.footLinks}>
              {t.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.footNote}>{t.footNote}</p>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Stian Glomsrød
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
