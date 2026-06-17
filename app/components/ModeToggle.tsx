"use client";

import type { Mode } from "../data/portfolio";
import { modeLabels } from "../data/portfolio";
import styles from "./ModeToggle.module.css";

const ORDER: Mode[] = ["professional", "agentic"];

/**
 * Accessible segmented control for switching presentation mode.
 * Keyboard: Tab to focus, Enter/Space to select, ArrowLeft/Right to move.
 */
export default function ModeToggle({
  mode,
  onChange,
  idPrefix = "mode",
}: {
  mode: Mode;
  onChange: (mode: Mode) => void;
  idPrefix?: string;
}) {
  function handleKey(e: React.KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const current = ORDER.indexOf(mode);
    const next =
      e.key === "ArrowRight"
        ? (current + 1) % ORDER.length
        : (current - 1 + ORDER.length) % ORDER.length;
    onChange(ORDER[next]);
  }

  return (
    <div
      className={styles.toggle}
      role="group"
      aria-label="Velg presentasjonsmodus"
      onKeyDown={handleKey}
    >
      <span className={styles.thumb} data-active={mode} aria-hidden="true" />
      {ORDER.map((value) => {
        const active = mode === value;
        return (
          <button
            key={value}
            type="button"
            id={`${idPrefix}-${value}`}
            className={styles.option}
            aria-pressed={active}
            onClick={() => onChange(value)}
            tabIndex={active ? 0 : -1}
          >
            <span className={styles.label}>{modeLabels[value].label}</span>
          </button>
        );
      })}
    </div>
  );
}
