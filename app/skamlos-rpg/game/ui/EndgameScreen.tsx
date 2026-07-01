"use client";

import Link from "next/link";
import type { StateSnapshot } from "../engine/bridge";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  snapshot: StateSnapshot | null;
  lang: Lang;
  onReplay: () => void;
}

// Reuses the DNB contact source rather than inventing a second copy.
const CONTACT = [
  { label: "E-post", href: "mailto:stianglomsrod@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stian-glomsr%C3%B8d-156968265/",
  },
  { label: "GitHub", href: "https://github.com/stianglomsrod" },
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

  return (
    <div className={styles.endgameBackdrop}>
      <div className={styles.endgameCard}>
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
          <Link href="/" className={styles.ghostBtn}>
            {no ? "Tilbake til portefølje" : "Back to portfolio"}
          </Link>
        </div>
      </div>
    </div>
  );
}
