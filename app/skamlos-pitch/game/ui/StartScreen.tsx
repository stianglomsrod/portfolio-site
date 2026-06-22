"use client";

import Link from "next/link";
import { useGame } from "../state/GameContext";
import { UI } from "../i18n";
import LangToggle from "./LangToggle";
import styles from "../../skamlos-pitch.module.css";

interface StartScreenProps {
  onPlay: () => void;
  onShowFallback: () => void;
}

/** Title / intro screen shown before pointer lock. */
export default function StartScreen({ onPlay, onShowFallback }: StartScreenProps) {
  const { lang } = useGame();
  const ui = UI[lang];

  const controls: Array<[string, string]> = [
    ["W A S D", ui.ctrlMove],
    [lang === "no" ? "Mus" : "Mouse", ui.ctrlLook],
    ["E", ui.ctrlInteract],
    ["Q", ui.ctrlQuests],
    ["K", ui.ctrlSkills],
    ["Shift", ui.ctrlSprint],
    ["Esc", ui.ctrlPause],
  ];

  return (
    <div className={styles.start}>
      <LangToggle />
      <div className={styles.startCard}>
        <p className={styles.startKicker}>{ui.startKicker}</p>
        <h1 className={styles.startTitle}>{ui.startTitle}</h1>
        <p className={styles.startTagline}>{ui.startTagline}</p>
        <p className={styles.startHonest}>{ui.startHonest}</p>

        <div className={styles.controlsGrid}>
          {controls.map(([key, label]) => (
            <div key={label} className={styles.ctrlRow}>
              <span className={styles.key}>{key}</span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <button type="button" className={styles.playBtn} onClick={onPlay}>
          {ui.playButton}
        </button>

        <div className={styles.startLinks}>
          <button type="button" className={styles.startLink} onClick={onShowFallback}>
            {ui.a11yToggle}
          </button>
          <Link href="/" className={styles.startLink}>
            {ui.backToPortfolio}
          </Link>
        </div>

        <div className={styles.a11yBox}>
          <strong>{ui.a11yTitle}.</strong> {ui.a11yNote}
        </div>
      </div>
    </div>
  );
}
