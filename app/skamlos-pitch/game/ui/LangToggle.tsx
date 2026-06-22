"use client";

import { useGame } from "../state/GameContext";
import styles from "../../skamlos-pitch.module.css";

/** Small NO/EN switch reused on the start screen and HUD. */
export default function LangToggle() {
  const { lang, setLang } = useGame();
  return (
    <div className={styles.langToggle} role="group" aria-label="Language">
      <button
        type="button"
        className={`${styles.langBtn} ${lang === "no" ? styles.langBtnActive : ""}`}
        aria-pressed={lang === "no"}
        onClick={() => setLang("no")}
      >
        NO
      </button>
      <button
        type="button"
        className={`${styles.langBtn} ${lang === "en" ? styles.langBtnActive : ""}`}
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
      >
        EN
      </button>
    </div>
  );
}
