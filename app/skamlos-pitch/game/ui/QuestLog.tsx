"use client";

import { useGame } from "../state/GameContext";
import { isQuestComplete, isQuestUnlocked } from "../state/gameReducer";
import { QUESTS } from "../data/quests";
import { UI } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface QuestLogProps {
  onClose: () => void;
}

/** Side panel listing every zone and its status. */
export default function QuestLog({ onClose }: QuestLogProps) {
  const { state, lang } = useGame();
  const ui = UI[lang];
  const sorted = [...QUESTS].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeX} onClick={onClose} aria-label={ui.close}>
          ×
        </button>
        <h2 className={styles.panelTitle}>{ui.questLogTitle}</h2>
        {sorted.map((quest) => {
          const done = isQuestComplete(state, quest.id);
          const unlocked = isQuestUnlocked(state, quest.id);
          const statusClass = done
            ? styles.qStatusDone
            : unlocked
              ? styles.qStatusOpen
              : styles.qStatusLocked;
          const statusLabel = done ? ui.done : unlocked ? ui.inProgress : ui.locked;
          return (
            <div key={quest.id} className={styles.questItem}>
              <div className={styles.questItemTop}>
                <span className={styles.questItemTitle}>
                  {quest.kicker[lang]} · {quest.title[lang]}
                </span>
                <span className={`${styles.qStatus} ${statusClass}`}>{statusLabel}</span>
              </div>
              <p className={styles.questItemObj}>
                {done
                  ? quest.body[lang][0]
                  : unlocked
                    ? quest.objective[lang]
                    : (quest.gateHint ?? quest.objective)[lang]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
