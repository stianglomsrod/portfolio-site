"use client";

import { useEffect } from "react";
import type { DialogueLine, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  line: DialogueLine;
  hasNext: boolean;
  lang: Lang;
  onAdvance: () => void;
}

export default function DialogueBox({ line, hasNext, lang, onAdvance }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "e" ||
        e.key === "E" ||
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "Escape"
      ) {
        e.preventDefault();
        onAdvance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onAdvance]);

  return (
    <button className={styles.dialogue} onClick={onAdvance}>
      {line.speaker && (
        <span className={styles.speaker}>{t(line.speaker, lang)}</span>
      )}
      <span className={styles.dialogueText}>{t(line.text, lang)}</span>
      <span className={styles.dialogueHint}>{hasNext ? "▼" : "✕"}</span>
    </button>
  );
}
