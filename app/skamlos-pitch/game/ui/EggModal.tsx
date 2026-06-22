"use client";

import { useGame } from "../state/GameContext";
import { EGG_BY_ID } from "../data/easterEggs";
import { UI } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface EggModalProps {
  eggId: string;
  onClose: () => void;
}

const GLYPH: Record<string, string> = {
  flutterfly: "🦋",
  egg: "🥚",
  duck: "🦆",
};

/** Easter-egg discovery card. */
export default function EggModal({ eggId, onClose }: EggModalProps) {
  const { lang } = useGame();
  const ui = UI[lang];
  const egg = EGG_BY_ID.get(eggId);
  if (!egg) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeX} onClick={onClose} aria-label={ui.close}>
          ×
        </button>
        <span className={styles.kindBadge}>Easter egg</span>
        <h2 className={styles.modalTitle}>
          {GLYPH[egg.kind] ?? "✨"} {egg.name[lang]}
        </h2>
        <p className={styles.cardDesc}>{egg.lore[lang]}</p>
        {egg.badge && (
          <div className={styles.skillReward}>
            <span className={styles.skillChip}>🏅 {egg.badge[lang]}</span>
          </div>
        )}
        <div className={styles.btnRow}>
          {egg.href && (
            <a
              className={`${styles.btn} ${styles.btnGhost} ${styles.extLink}`}
              href={egg.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {egg.linkLabel?.[lang] ?? ui.visitLink}
            </a>
          )}
          <button type="button" className={`${styles.btn} ${styles.btnPrimary}`} onClick={onClose}>
            {ui.close}
          </button>
        </div>
      </div>
    </div>
  );
}
