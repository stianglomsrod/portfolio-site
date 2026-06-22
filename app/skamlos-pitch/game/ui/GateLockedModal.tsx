"use client";

import { useGame } from "../state/GameContext";
import { SKILL_BY_ID } from "../data/skills";
import { UI } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface GateLockedModalProps {
  missing: string[];
  onClose: () => void;
}

/** Shown when the player reaches the DNB gate before unlocking the signatures. */
export default function GateLockedModal({
  missing,
  onClose,
}: GateLockedModalProps) {
  const { lang } = useGame();
  const ui = UI[lang];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeX}
          onClick={onClose}
          aria-label={ui.close}
        >
          ×
        </button>
        <span className={styles.kindBadge}>DNB AI Tech</span>
        <h2 className={styles.modalTitle}>{ui.gateLockedTitle}</h2>
        <p className={styles.cardDesc}>{ui.gateMissing}</p>
        <div className={styles.skillReward}>
          {missing.map((id) => {
            const skill = SKILL_BY_ID.get(id);
            return (
              <span key={id} className={styles.skillChip}>
                <span>{skill?.glyph ?? "🔒"}</span>
                {skill?.label[lang] ?? id}
              </span>
            );
          })}
        </div>
        <div className={styles.btnRow}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onClose}
          >
            {ui.close}
          </button>
        </div>
      </div>
    </div>
  );
}
