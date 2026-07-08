"use client";

import type { StateSnapshot } from "../engine/bridge";
import type { Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  lang: Lang;
  objective: Loc | null;
  snapshot: StateSnapshot | null;
  muted: boolean;
  onOpenMenu: () => void;
  onToggleLang: () => void;
  onToggleMute: () => void;
}

export default function Hud({
  lang,
  objective,
  snapshot,
  muted,
  onOpenMenu,
  onToggleLang,
  onToggleMute,
}: Props) {
  const quests = snapshot?.completedQuests.length ?? 0;
  const skills = snapshot?.skills.length ?? 0;
  const artifacts = snapshot?.artifacts.length ?? 0;
  const L =
    lang === "no"
      ? {
          obj: "Mål",
          quests: `Oppdrag: ${quests} fullført`,
          skills: `Ferdigheter: ${skills}`,
          proofs: `Bevis: ${artifacts}`,
          langBtn: "Switch to English",
          mute: "Demp lyd",
          unmute: "Skru på lyd",
          menu: "Meny",
        }
      : {
          obj: "Goal",
          quests: `Quests: ${quests} completed`,
          skills: `Skills: ${skills}`,
          proofs: `Proof: ${artifacts}`,
          langBtn: "Bytt til norsk",
          mute: "Mute",
          unmute: "Unmute",
          menu: "Menu",
        };

  return (
    <div className={styles.hudTop}>
      <div className={styles.objective}>
        <span className={styles.objectiveTag}>{L.obj}</span>
        <span className={styles.objectiveText}>
          {objective ? t(objective, lang) : "—"}
        </span>
      </div>
      <div className={styles.hudButtons}>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onOpenMenu}
          title={`${L.quests} (Q)`}
          aria-label={L.quests}
        >
          <span aria-hidden="true">🗒</span>{" "}
          <span>{quests}</span>
        </button>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onOpenMenu}
          title={`${L.skills} (K)`}
          aria-label={L.skills}
        >
          <span aria-hidden="true">💻</span> <span>{skills}</span>
        </button>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onOpenMenu}
          title={L.proofs}
          aria-label={L.proofs}
        >
          <span aria-hidden="true">📜</span> <span>{artifacts}</span>
        </button>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onToggleLang}
          aria-label={L.langBtn}
        >
          {lang === "no" ? "EN" : "NO"}
        </button>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onToggleMute}
          title={muted ? L.unmute : L.mute}
          aria-label={muted ? L.unmute : L.mute}
        >
          <span aria-hidden="true">{muted ? "🔇" : "🔊"}</span>
        </button>
        <button
          type="button"
          className={styles.hudChip}
          onClick={onOpenMenu}
          title={`${L.menu} (Esc)`}
          aria-label={L.menu}
        >
          <span aria-hidden="true">☰</span>
        </button>
      </div>
    </div>
  );
}
