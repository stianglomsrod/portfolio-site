"use client";

import type { StateSnapshot } from "../engine/bridge";
import type { ContentPack, Lang } from "../engine/types";
import { t, tList } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  snapshot: StateSnapshot | null;
  lang: Lang;
  onClose: () => void;
}

export default function SkillLog({ pack, snapshot, lang, onClose }: Props) {
  const owned = snapshot?.skills ?? [];
  const skills = pack.skills.filter((s) => owned.includes(s.id));

  return (
    <div className={styles.panelBackdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <header className={styles.panelHead}>
          <h2>{lang === "no" ? "Ferdigheter" : "Skills"}</h2>
          <button
            className={styles.panelClose}
            onClick={onClose}
            aria-label="close"
          >
            ✕
          </button>
        </header>
        {skills.length === 0 ? (
          <p className={styles.emptyNote}>
            {lang === "no"
              ? "Ingen ferdigheter ennå. Fullfør Ordkryss hjemme."
              : "No skills yet. Finish Ordkryss at home."}
          </p>
        ) : (
          <ul className={styles.skillList}>
            {skills.map((s) => {
              const boundary = pack.claims.boundaries[s.id];
              return (
                <li key={s.id} className={styles.skillItem}>
                  <div className={styles.skillHead}>
                    <span className={styles.skillGlyph} aria-hidden>
                      {s.glyph}
                    </span>
                    <strong>{t(s.label, lang)}</strong>
                  </div>
                  <div className={styles.skillTags}>
                    {tList(s.log, lang).map((tag) => (
                      <span key={tag} className={styles.skillTag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {boundary && (
                    <em className={styles.boundary}>{t(boundary, lang)}</em>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
