"use client";

import { useEffect } from "react";
import { useGame } from "../state/GameContext";
import {
  getProgress,
  isGateOpen,
  isQuestComplete,
  isQuestUnlocked,
} from "../state/gameReducer";
import { QUESTS } from "../data/quests";
import { UI } from "../i18n";
import type { GameState, Lang } from "../state/types";
import LangToggle from "./LangToggle";
import styles from "../../skamlos-pitch.module.css";

function currentObjective(state: GameState, lang: Lang): string {
  const sorted = [...QUESTS].sort((a, b) => a.order - b.order);
  if (state.completedQuests.length >= QUESTS.length) {
    if (isGateOpen(state)) {
      return lang === "no"
        ? "Gå til DNB AI Tech-porten og lever søknadspakken."
        : "Go to the DNB AI Tech Gate and deliver the application package.";
    }
  }
  const next = sorted.find(
    (q) => !isQuestComplete(state, q.id) && isQuestUnlocked(state, q.id),
  );
  if (next) return next.objective[lang];
  const locked = sorted.find((q) => !isQuestComplete(state, q.id));
  if (locked) return (locked.gateHint ?? locked.objective)[lang];
  return lang === "no" ? "Utforsk verdenen." : "Explore the world.";
}

interface HudProps {
  locked: boolean;
  onOpenLog: () => void;
  onOpenSkills: () => void;
  onResume: () => void;
}

/** Heads-up display + transient toasts. */
export default function Hud({
  locked,
  onOpenLog,
  onOpenSkills,
  onResume,
}: HudProps) {
  const { state, dispatch, activeTarget, lang } = useGame();
  const ui = UI[lang];
  const progress = getProgress(state);
  const showResume =
    state.phase === "playing" && state.overlay === null && !locked;

  // Auto-dismiss the oldest toast on a timer.
  useEffect(() => {
    if (state.toasts.length === 0) return;
    const oldest = state.toasts[0];
    const timer = window.setTimeout(
      () => dispatch({ type: "DISMISS_TOAST", id: oldest.id }),
      3200,
    );
    return () => window.clearTimeout(timer);
  }, [state.toasts, dispatch]);

  return (
    <>
      <div className={styles.hud} aria-hidden={state.overlay !== null}>
        <div
          className={`${styles.crosshair} ${activeTarget ? styles.crosshairActive : ""}`}
        />

        <div className={styles.objective}>
          <span className={styles.objectiveLabel}>{ui.objectiveLabel}</span>
          {currentObjective(state, lang)}
        </div>

        <div className={styles.counters}>
          <div className={styles.counter}>
            <div className={styles.counterNum}>
              {progress.questsDone}/{progress.questsTotal}
            </div>
            <div className={styles.counterLabel}>{ui.questsLabel}</div>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}>{progress.skillsUnlocked}</div>
            <div className={styles.counterLabel}>{ui.skillsLabel}</div>
          </div>
          <div className={styles.counter}>
            <div className={styles.counterNum}>
              {progress.artifactsCollected}
            </div>
            <div className={styles.counterLabel}>{ui.evidenceLabel}</div>
          </div>
        </div>

        {activeTarget && (
          <div
            className={`${styles.prompt} ${activeTarget.locked ? styles.promptLocked : ""}`}
          >
            <span className={styles.promptKey}>E</span>
            <span>{activeTarget.action[lang]}</span>
          </div>
        )}

        <div className={styles.controlsHint}>
          <span>
            <kbd>WASD</kbd>
            {ui.ctrlMove}
          </span>
          <span>
            <kbd>E</kbd>
            {ui.ctrlInteract}
          </span>
          <span>
            <kbd>Shift</kbd>
            {ui.ctrlSprint}
          </span>
          <span>
            <kbd>Esc</kbd>
            {ui.ctrlPause}
          </span>
        </div>

        <div className={styles.panelButtons}>
          <button type="button" className={styles.panelBtn} onClick={onOpenLog}>
            {ui.openQuestLog}
          </button>
          <button
            type="button"
            className={styles.panelBtn}
            onClick={onOpenSkills}
          >
            {ui.openSkills}
          </button>
        </div>

        {state.toasts.length > 0 && (
          <div className={styles.toasts}>
            {state.toasts.map((toast) => (
              <div key={toast.id} className={styles.toast}>
                <span className={styles.toastGlyph}>{toast.glyph}</span>
                <span>{toast.text[lang]}</span>
              </div>
            ))}
          </div>
        )}

        <LangToggle />
      </div>

      {showResume && (
        <div
          className={styles.resumeLayer}
          onClick={onResume}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onResume();
          }}
        >
          <div className={styles.resumeHint}>{ui.resumeHint}</div>
        </div>
      )}
    </>
  );
}
