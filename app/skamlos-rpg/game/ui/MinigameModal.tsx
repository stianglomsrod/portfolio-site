"use client";

import { useEffect, useState } from "react";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import ForLoopGame from "./minigames/ForLoopGame";
import GitCommitGame from "./minigames/GitCommitGame";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  startId: string;
  lang: Lang;
  onComplete: (lastId: string) => void;
  onCancel: () => void;
}

export default function MinigameModal({
  pack,
  startId,
  lang,
  onComplete,
  onCancel,
}: Props) {
  const [currentId, setCurrentId] = useState(startId);
  const def = pack.minigames.find((m) => m.id === currentId);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onCancel]);

  if (!def) return null;

  const handleDone = () => {
    if (def.next) setCurrentId(def.next);
    else onComplete(def.id);
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <header className={styles.modalHead}>
          <h2>{t(def.title, lang)}</h2>
          <button
            className={styles.panelClose}
            onClick={onCancel}
            aria-label="close"
          >
            ✕
          </button>
        </header>
        <p className={styles.modalIntro}>{t(def.intro, lang)}</p>
        {def.kind === "code-forloop" && (
          <ForLoopGame
            key={def.id}
            config={def.config}
            lang={lang}
            onDone={handleDone}
          />
        )}
        {def.kind === "git-commit" && (
          <GitCommitGame
            key={def.id}
            config={def.config}
            lang={lang}
            onDone={handleDone}
          />
        )}
      </div>
    </div>
  );
}
