"use client";

import Link from "next/link";
import type { StateSnapshot } from "../engine/bridge";
import type { Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  lang: Lang;
  objective: Loc | null;
  prompt: Loc | null;
  snapshot: StateSnapshot | null;
  onOpenQuest: () => void;
  onOpenSkill: () => void;
  onToggleLang: () => void;
}

export default function Hud({
  lang,
  objective,
  prompt,
  snapshot,
  onOpenQuest,
  onOpenSkill,
  onToggleLang,
}: Props) {
  const skills = snapshot?.skills.length ?? 0;
  const artifacts = snapshot?.artifacts.length ?? 0;
  const objLabel = lang === "no" ? "Mål" : "Goal";

  return (
    <>
      <div className={styles.hudTop}>
        <div className={styles.objective}>
          <span className={styles.objectiveTag}>{objLabel}</span>
          <span className={styles.objectiveText}>{objective ? t(objective, lang) : "—"}</span>
        </div>
        <div className={styles.hudButtons}>
          <button className={styles.hudChip} onClick={onOpenQuest} title="Q">
            🗒 <span>{snapshot?.completedQuests.length ?? 0}</span>
          </button>
          <button className={styles.hudChip} onClick={onOpenSkill} title="K">
            💻 <span>{skills}</span>
          </button>
          <span className={styles.hudChip} title="bevis">
            📜 <span>{artifacts}</span>
          </span>
          <button className={styles.hudChip} onClick={onToggleLang}>
            {lang === "no" ? "EN" : "NO"}
          </button>
          <Link href="/" className={styles.hudChip} title="portefølje">
            ⏏
          </Link>
        </div>
      </div>

      <div className={styles.hudBottom}>
        {prompt ? (
          <div className={styles.promptPill}>
            <kbd>E</kbd> {t(prompt, lang)}
          </div>
        ) : (
          <div className={styles.controlsHint}>WASD · E/mellomrom · Q · K · Esc</div>
        )}
      </div>
    </>
  );
}
