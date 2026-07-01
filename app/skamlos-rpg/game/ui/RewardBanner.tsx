"use client";

import type { Artifact, Lang, Skill } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  reward: { skills: Skill[]; artifacts: Artifact[] };
  lang: Lang;
  onOpen?: (focusId?: string) => void;
  onClose?: () => void;
}

export default function RewardBanner({ reward, lang, onOpen, onClose }: Props) {
  const no = lang === "no";
  return (
    <div className={styles.rewardBanner} role="status">
      <button
        type="button"
        className={styles.rewardClose}
        onClick={onClose}
        aria-label={no ? "Lukk" : "Close"}
      >
        ✕
      </button>
      <p className={styles.rewardKicker}>{no ? "Belønning" : "Reward"}</p>
      {reward.skills.map((s) => (
        <button
          key={s.id}
          type="button"
          className={styles.rewardItem}
          onClick={() => onOpen?.(`skill:${s.id}`)}
        >
          <span className={styles.rewardGlyph} aria-hidden>
            {s.glyph}
          </span>
          <div>
            <strong>{t(s.label, lang)}</strong>
            <span className={styles.rewardSub}>
              {no ? "Ny ferdighet" : "New skill"}
            </span>
          </div>
          <span className={styles.rewardChev} aria-hidden>
            ›
          </span>
        </button>
      ))}
      {reward.artifacts.map((a) => (
        <button
          key={a.id}
          type="button"
          className={styles.rewardItem}
          onClick={() => onOpen?.(`art:${a.id}`)}
        >
          <span className={styles.rewardGlyph} aria-hidden>
            📜
          </span>
          <div>
            <strong>{t(a.title, lang)}</strong>
            <span className={styles.rewardSub}>
              {no ? "Nytt bevis" : "New evidence"}
            </span>
          </div>
          <span className={styles.rewardChev} aria-hidden>
            ›
          </span>
        </button>
      ))}
      <button
        type="button"
        className={styles.rewardHint}
        onClick={() => onOpen?.()}
      >
        {no
          ? "Åpne menyen for detaljer og lenker →"
          : "Open the menu for details and links →"}
      </button>
      <button type="button" className={styles.rewardContinue} onClick={onClose}>
        {no ? "Fortsett" : "Continue"}
      </button>
    </div>
  );
}
