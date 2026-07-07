"use client";

import { useEffect, useState } from "react";
import type { Lang } from "../engine/types";
import styles from "../../skamlos-rpg.module.css";

/**
 * True when the primary pointer is coarse (touch) — tracks changes live.
 * `?touch=1` forces it on, so the touch UI can be tested with a mouse.
 */
export function useCoarsePointer(): boolean {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("touch")) {
      setCoarse(true);
      return;
    }
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return coarse;
}

type DirName = "up" | "down" | "left" | "right";

const DIRS: Record<DirName, { x: number; y: number }> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const GLYPHS: Record<DirName, string> = {
  up: "▲",
  down: "▼",
  left: "◀",
  right: "▶",
};

const ARIA = {
  no: {
    pad: "Styring",
    up: "Gå opp",
    down: "Gå ned",
    left: "Gå til venstre",
    right: "Gå til høyre",
    action: "Snakk / undersøk",
    advance: "Neste replikk",
  },
  en: {
    pad: "Movement",
    up: "Move up",
    down: "Move down",
    left: "Move left",
    right: "Move right",
    action: "Talk / inspect",
    advance: "Next line",
  },
} as const;

interface Props {
  lang: Lang;
  /** Menus/minigames open — the pad idles (the engine is paused too). */
  disabled: boolean;
  /** Dialogue open — the action button advances it instead of interacting. */
  dialogueOpen: boolean;
  onMove: (dir: { x: number; y: number }) => void;
  onAction: () => void;
}

// Touch controls rendered UNDER the game frame (never on top of the small
// map): a 4-way D-pad on the left, one action button on the right. Movement
// flows through the bridge as cmd:move; the engine merges it with keyboard
// input, so the mechanics stay identical.
export default function VirtualPad({
  lang,
  disabled,
  dialogueOpen,
  onMove,
  onAction,
}: Props) {
  const coarse = useCoarsePointer();

  // Never leave the player running when the pad is disabled or unmounts.
  useEffect(() => {
    if (disabled) onMove({ x: 0, y: 0 });
    return () => onMove({ x: 0, y: 0 });
  }, [disabled, onMove]);

  if (!coarse) return null;
  const A = ARIA[lang];

  const press =
    (dir: DirName) => (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture?.(e.pointerId);
      onMove(DIRS[dir]);
    };
  const release = () => onMove({ x: 0, y: 0 });

  return (
    <div
      className={styles.padRow}
      data-disabled={disabled ? "true" : undefined}
    >
      <div className={styles.dpad} role="group" aria-label={A.pad}>
        {(Object.keys(DIRS) as DirName[]).map((d) => (
          <button
            key={d}
            type="button"
            className={styles.padBtn}
            data-dir={d}
            aria-label={A[d]}
            disabled={disabled}
            onPointerDown={press(d)}
            onPointerUp={release}
            onPointerCancel={release}
            onContextMenu={(e) => e.preventDefault()}
          >
            <span aria-hidden="true">{GLYPHS[d]}</span>
          </button>
        ))}
      </div>
      <button
        type="button"
        className={styles.actionBtn}
        aria-label={dialogueOpen ? A.advance : A.action}
        disabled={disabled}
        onPointerDown={(e) => {
          e.preventDefault();
          onAction();
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <span aria-hidden="true">{dialogueOpen ? "▼" : "E"}</span>
      </button>
    </div>
  );
}
