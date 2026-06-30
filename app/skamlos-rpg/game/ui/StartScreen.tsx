"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  lang: Lang;
  hasProgress: boolean;
  onPlay: () => void;
  onRestart: () => void;
  onToggleLang: () => void;
}

const TAGLINE: Record<Lang, string> = {
  no: "Et lite eventyr om å bygge kompetanse — stein for stein.",
  en: "A small adventure about building skill — stone by stone.",
};

const LABELS = {
  no: {
    kicker: "Spillbar pitch",
    move: "Beveg deg",
    moveVal: "WASD / piltaster",
    act: "Snakk / undersøk",
    actVal: "E eller mellomrom",
    logs: "Oppdrag / ferdigheter",
    logsVal: "Q / K",
    close: "Lukk",
    closeVal: "Esc",
    play: "Spill",
    cont: "Fortsett",
    restart: "Start på nytt",
    back: "Tilbake til portefølje",
  },
  en: {
    kicker: "Playable pitch",
    move: "Move",
    moveVal: "WASD / arrow keys",
    act: "Talk / inspect",
    actVal: "E or space",
    logs: "Quests / skills",
    logsVal: "Q / K",
    close: "Close",
    closeVal: "Esc",
    play: "Play",
    cont: "Continue",
    restart: "Restart",
    back: "Back to portfolio",
  },
} as const;

export default function StartScreen({
  pack,
  lang,
  hasProgress,
  onPlay,
  onRestart,
  onToggleLang,
}: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") onPlay();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPlay]);

  const L = LABELS[lang];

  return (
    <div className={styles.startScreen}>
      <div className={styles.startCard}>
        <button
          className={styles.langChip}
          onClick={onToggleLang}
          aria-label="language"
        >
          {lang === "no" ? "EN" : "NO"}
        </button>
        <p className={styles.kicker}>{L.kicker}</p>
        <h1 className={styles.startTitle}>{t(pack.meta.title, lang)}</h1>
        <p className={styles.tagline}>{TAGLINE[lang]}</p>
        <dl className={styles.controls}>
          <div>
            <dt>{L.move}</dt>
            <dd>{L.moveVal}</dd>
          </div>
          <div>
            <dt>{L.act}</dt>
            <dd>{L.actVal}</dd>
          </div>
          <div>
            <dt>{L.logs}</dt>
            <dd>{L.logsVal}</dd>
          </div>
          <div>
            <dt>{L.close}</dt>
            <dd>{L.closeVal}</dd>
          </div>
        </dl>
        <div className={styles.startActions}>
          <button className={styles.primaryBtn} onClick={onPlay}>
            {hasProgress ? L.cont : L.play}
          </button>
          {hasProgress && (
            <button className={styles.ghostBtn} onClick={onRestart}>
              {L.restart}
            </button>
          )}
          <Link href="/" className={styles.ghostBtn}>
            {L.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
