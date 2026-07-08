import { useEffect } from "react";
import type { ContentPack, Lang } from "../engine/types";
import { t } from "../engine/i18n";
import { useCoarsePointer } from "./VirtualPad";
import now from "../../../../now.json";
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
    moveValTouch: "Pilknappene under spillet",
    act: "Snakk / undersøk",
    actVal: "E eller mellomrom",
    actValTouch: "E-knappen, eller trykk på tekstboksen",
    logs: "Oppdrag / ferdigheter",
    logsVal: "Q / K",
    logsValTouch: "Menyknappen ☰ oppe til høyre",
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
    moveValTouch: "The arrow buttons under the game",
    act: "Talk / inspect",
    actVal: "E or space",
    actValTouch: "The E button, or tap the text box",
    logs: "Quests / skills",
    logsVal: "Q / K",
    logsValTouch: "The ☰ button in the top right",
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
  const touch = useCoarsePointer();

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
        <p className={styles.nowLinje}>
          {lang === "no" ? "nå: " : "now: "}
          {now.fullstack} · {now.ki}
        </p>
        <dl className={styles.controls}>
          <div>
            <dt>{L.move}</dt>
            <dd>{touch ? L.moveValTouch : L.moveVal}</dd>
          </div>
          <div>
            <dt>{L.act}</dt>
            <dd>{touch ? L.actValTouch : L.actVal}</dd>
          </div>
          <div>
            <dt>{L.logs}</dt>
            <dd>{touch ? L.logsValTouch : L.logsVal}</dd>
          </div>
          {!touch && (
            <div>
              <dt>{L.close}</dt>
              <dd>{L.closeVal}</dd>
            </div>
          )}
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
          <a href="/sandbox" className={styles.ghostBtn}>
            {L.back}
          </a>
        </div>
      </div>
    </div>
  );
}
