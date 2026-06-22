import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./DnbContact.module.css";

const receipts = [
  {
    name: "Klar",
    desc: "Live fullstack-prototype",
    href: "https://klar-sigma.vercel.app/",
  },
  {
    name: "Lori Frisør",
    desc: "Levert nettsted for en ekte eier",
    href: "https://lori-frisor.vercel.app/",
  },
  {
    name: "GitHub",
    desc: "Repoer, dokumentasjon og arbeid i åpent",
    href: "https://github.com/stianglomsrod",
  },
];

const contactLinks = [
  { label: "E-post", href: "mailto:stianglomsrod@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
  },
  { label: "GitHub", href: "https://github.com/stianglomsrod" },
];

export default function DnbContact() {
  return (
    <footer id="kontakt" className={styles.contact}>
      <div className={shared.container}>
        <Reveal>
          <div className={styles.receiptsHead}>
            <p className={shared.sectionLabel}>Bevis</p>
            <p className={styles.receiptsLede}>
              Noen få, etterprøvbare holdepunkter — ikke en vegg av lenker.
            </p>
          </div>
          <ul className={styles.receipts} aria-label="Bevis og lenker">
            {receipts.map((r) => (
              <li key={r.name}>
                <a
                  className={styles.receipt}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <span className={styles.receiptName}>{r.name}</span>
                  <span className={styles.receiptDesc}>{r.desc}</span>
                  <span className={styles.receiptArrow} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>
              La oss snakke om AI-first engineering
            </h2>
            <p className={styles.ctaText}>
              Jeg er en solid bygger som er nysgjerrig på hvordan AI endrer
              måten programvare lages på, og motivert for å gå dypt på det. Ta
              kontakt hvis det er en match.
            </p>
            <div className={styles.actions}>
              <a
                className={styles.ctaPrimary}
                href="mailto:stianglomsrod@gmail.com"
              >
                Send e-post
              </a>
              <a className={styles.ctaSecondary} href="#arbeidsflyt">
                Se arbeidsflyten igjen
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className={styles.foot}>
            <ul className={styles.footLinks}>
              {contactLinks.map((l) => (
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
            <p className={styles.footNote}>
              Ja, denne siden er bygget med AI-agenter. Nei, de fikk ikke styre
              alene.
            </p>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Stian Glomsrød
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
