"use client";

import type { StateSnapshot } from "../engine/bridge";
import type { Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  lang: Lang;
  objective: Loc | null;
  snapshot: StateSnapshot | null;
  muted: boolean;
  onOpenMenu: () => void;
  onToggleLang: () => void;
  onToggleMute: () => void;
}

export default function Hud({
  lang,
  objective,
  snapshot,
  muted,
  onOpenMenu,
  onToggleLang,
  onToggleMute,
}: Props) {
  const skills = snapshot?.skills.length ?? 0;
  const artifacts = snapshot?.artifacts.length ?? 0;
  const objLabel = lang === "no" ? "Mål" : "Goal";

  return (
    <div className={styles.hudTop}>
      <div className={styles.objective}>
        <span className={styles.objectiveTag}>{objLabel}</span>
        <span className={styles.objectiveText}>
          {objective ? t(objective, lang) : "—"}
        </span>
      </div>
      <div className={styles.hudButtons}>
        <button
          className={styles.hudChip}
          onClick={onOpenMenu}
          title="Oppdrag (Q)"
        >
          🗒 <span>{snapshot?.completedQuests.length ?? 0}</span>
        </button>
        <button
          className={styles.hudChip}
          onClick={onOpenMenu}
          title="Ferdigheter (K)"
        >
          💻 <span>{skills}</span>
        </button>
        <button className={styles.hudChip} onClick={onOpenMenu} title="Bevis">
          📜 <span>{artifacts}</span>
        </button>
        <button className={styles.hudChip} onClick={onToggleLang}>
          {lang === "no" ? "EN" : "NO"}
        </button>
        <button
          className={styles.hudChip}
          onClick={onToggleMute}
          title={muted ? "Skru på lyd" : "Demp lyd"}
          aria-label={muted ? "Skru på lyd" : "Demp lyd"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
        <button
          className={styles.hudChip}
          onClick={onOpenMenu}
          title="Meny (Esc)"
        >
          ☰
        </button>
      </div>
    </div>
  );
}
