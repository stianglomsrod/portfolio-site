"use client";

import type { StateSnapshot } from "../engine/bridge";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  snapshot: StateSnapshot | null;
  lang: Lang;
  onClose: () => void;
}

export default function QuestLog({ pack, snapshot, lang, onClose }: Props) {
  const done = snapshot?.completedQuests ?? [];
  const activeTitle = snapshot?.questTitle ? t(snapshot.questTitle, lang) : null;
  const quests = [...pack.quests].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.panelBackdrop} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <header className={styles.panelHead}>
          <h2>{lang === "no" ? "Oppdrag" : "Quests"}</h2>
          <button className={styles.panelClose} onClick={onClose} aria-label="close">
            ✕
          </button>
        </header>
        <ul className={styles.questList}>
          {quests.map((q) => {
            const isDone = done.includes(q.id);
            const isActive = !isDone && t(q.title, lang) === activeTitle;
            const status = isDone ? "done" : isActive ? "active" : "todo";
            return (
              <li key={q.id} className={styles.questItem} data-status={status}>
                <span className={styles.questDot} data-status={status} />
                <div>
                  <strong>{t(q.title, lang)}</strong>
                  <span className={styles.questObjective}>{t(q.objective, lang)}</span>
                </div>
                <span className={styles.questBadge}>
                  {isDone
                    ? lang === "no"
                      ? "Ferdig"
                      : "Done"
                    : isActive
                      ? lang === "no"
                        ? "Aktiv"
                        : "Active"
                      : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
