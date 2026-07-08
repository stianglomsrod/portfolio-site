import { useEffect, useRef } from "react";
import type { StateSnapshot } from "../engine/bridge";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import profil from "../../../data/profil.json";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  snapshot: StateSnapshot | null;
  lang: Lang;
  onReplay: () => void;
}

// Én sannhet (Done 22): kontaktlenkene leses fra samme kilde som siden.
const CONTACT = [
  { label: "E-post", href: `mailto:${profil.kontakt.epost}` },
  { label: "LinkedIn", href: profil.kontakt.linkedin },
  { label: "GitHub", href: profil.kontakt.github },
];

export default function EndgameScreen({
  pack,
  snapshot,
  lang,
  onReplay,
}: Props) {
  const no = lang === "no";
  const eg = pack.endgame;
  const skills = pack.skills.filter((s) => snapshot?.skills.includes(s.id));
  const artifacts = pack.artifacts.filter((a) =>
    snapshot?.artifacts.includes(a.id),
  );
  const questCount = snapshot?.completedQuests.length ?? 0;
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    cardRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className={styles.endgameBackdrop}>
      <div
        ref={cardRef}
        className={styles.endgameCard}
        role="dialog"
        aria-modal="true"
        aria-label={t(eg.title, lang)}
        tabIndex={-1}
      >
        <p className={styles.endgameKicker}>{no ? "Levert" : "Delivered"}</p>
        <h2 className={styles.endgameTitle}>{t(eg.title, lang)}</h2>
        <p className={styles.endgameMessage}>{t(eg.message, lang)}</p>

        <div className={styles.endgameStats}>
          <span>
            🗒 {questCount} {no ? "oppdrag" : "quests"}
          </span>
          <span>
            💻 {skills.length} {no ? "ferdigheter" : "skills"}
          </span>
          <span>
            📜 {artifacts.length} {no ? "bevis" : "evidence"}
          </span>
        </div>

        {artifacts.length > 0 && (
          <div className={styles.endgameArtifacts}>
            {artifacts.map((a) =>
              a.href ? (
                <a
                  key={a.id}
                  className={styles.rewardLink}
                  href={a.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {t(a.title, lang)} ↗
                </a>
              ) : (
                <span key={a.id} className={styles.endgameArtifact}>
                  {t(a.title, lang)}
                </span>
              ),
            )}
          </div>
        )}

        <div className={styles.endgameContact}>
          {CONTACT.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {c.label}
            </a>
          ))}
        </div>

        <div className={styles.endgameActions}>
          <button className={styles.primaryBtn} onClick={onReplay}>
            {no ? "Spill på nytt" : "Play again"}
          </button>
          <a href="/sandbox" className={styles.ghostBtn}>
            {no ? "Tilbake til portefølje" : "Back to portfolio"}
          </a>
        </div>
      </div>
    </div>
  );
}
