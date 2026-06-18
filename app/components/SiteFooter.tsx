import type { Mode } from "../data/portfolio";
import { footer, hero } from "../data/portfolio";
import CaseLink from "./CaseLink";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SiteFooter.module.css";

export default function SiteFooter({ mode }: { mode: Mode }) {
  return (
    <footer className={styles.footer}>
      <div className={shared.container}>
        <Reveal>
          <h2 className={styles.title}>Kontakt</h2>
          <ul className={styles.links}>
            {footer.links.map((item) => (
              <li key={item.label}>
                <CaseLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>

          {/* Light, self-aware closing line — agentic mode only. */}
          {mode === "agentic" && (
            <p className={styles.humorSlot}>{footer.closingLine}</p>
          )}

          <p className={styles.note}>
            © {new Date().getFullYear()} {hero.name}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
