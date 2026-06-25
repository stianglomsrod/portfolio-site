import Link from "next/link";
import type { HomeCopy } from "../data/homepage";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SiteFooter.module.css";

export default function SiteFooter({ copy }: { copy: HomeCopy["footer"] }) {
  return (
    <footer id="kontakt" className={styles.footer}>
      <div className={shared.container}>
        <Reveal>
          <h2 className={styles.title}>{copy.title}</h2>
          <ul className={styles.links}>
            {copy.links.map((item) => (
              <li key={item.label}>
                <CaseLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          <p className={styles.privacy}>
            <Link href="/personvern-og-cookies">{copy.privacyLabel}</Link>
          </p>

          <p className={styles.note}>
            {copy.copyrightPrefix} {new Date().getFullYear()} Stian Glomsrød
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
