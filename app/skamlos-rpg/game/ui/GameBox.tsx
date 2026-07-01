"use client";

import { useEffect, useState } from "react";
import type { CtaPrompt } from "../engine/bridge";
import type { DialogueLine, Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  dialogue: { line: DialogueLine; hasNext: boolean } | null;
  subtitle: Loc | null;
  cta: CtaPrompt | null;
  lang: Lang;
  onAdvance: () => void;
  onInteract: () => void;
}

// A single, consistent Zelda-/RPG-style box pinned to the bottom of the
// viewport. It is ALWAYS in the same place and style, and hosts every textual
// cue: dialogue, mood/hint lines, and the interaction CTA ("Name — [E] Verb").
export default function GameBox({
  dialogue,
  subtitle,
  cta,
  lang,
  onAdvance,
  onInteract,
}: Props) {
  const [talkFrame, setTalkFrame] = useState(0);

  useEffect(() => {
    if (!dialogue?.line.portrait) return;
    const id = window.setInterval(() => setTalkFrame((f) => (f + 1) % 2), 260);
    return () => window.clearInterval(id);
  }, [dialogue?.line.portrait, dialogue?.line.text]);

  // While a dialogue is open, E / Space / Enter / Esc advance it.
  useEffect(() => {
    if (!dialogue) return;
    const onKey = (e: KeyboardEvent) => {
      if (["e", "E", " ", "Enter", "Escape"].includes(e.key)) {
        e.preventDefault();
        onAdvance();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialogue, onAdvance]);

  const mode = dialogue ? "dialogue" : subtitle ? "subtitle" : cta ? "cta" : null;

  const handleClick = () => {
    if (dialogue) onAdvance();
    else if (cta) onInteract();
  };

  // The box is a focused narrative/interaction surface: it only appears when it
  // has something to say. Controls live at the start + in the pause menu.
  if (!mode) return null;

  return (
    <div
      className={styles.gameBox}
      data-mode={mode}
      onClick={handleClick}
      role={mode === "dialogue" || mode === "cta" ? "button" : undefined}
      tabIndex={-1}
    >
      {mode === "dialogue" && dialogue && (
        <div className={styles.boxRow}>
          {dialogue.line.portrait && (
            <span
              className={styles.portrait}
              data-avatar={dialogue.line.portrait === "stian" ? "true" : undefined}
              style={
                dialogue.line.portrait === "stian"
                  ? { backgroundImage: "url(/images/avatar/stian-face.png)" }
                  : {
                      backgroundImage: `url(/skamlos-rpg/sprites/${dialogue.line.portrait}.png)`,
                      backgroundPosition: `${-talkFrame * 56}px 0`,
                    }
              }
              aria-hidden
            />
          )}
          <span className={styles.boxCol}>
            {dialogue.line.speaker && (
              <span className={styles.speaker}>{t(dialogue.line.speaker, lang)}</span>
            )}
            <span className={styles.boxText}>{t(dialogue.line.text, lang)}</span>
          </span>
          <span className={styles.boxAdvance}>{dialogue.hasNext ? "▼" : "✕"}</span>
        </div>
      )}

      {mode === "subtitle" && subtitle && (
        <span className={styles.boxSubtitle}>{t(subtitle, lang)}</span>
      )}

      {mode === "cta" && cta && (
        <span className={styles.boxCta}>
          {cta.name && <strong className={styles.ctaName}>{t(cta.name, lang)}</strong>}
          {cta.name && <span className={styles.ctaDash}>—</span>}
          <kbd className={styles.keycap}>E</kbd>
          <span className={styles.ctaVerb}>{t(cta.verb, lang)}</span>
        </span>
      )}
    </div>
  );
}
