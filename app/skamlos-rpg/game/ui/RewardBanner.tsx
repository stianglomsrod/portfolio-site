"use client";

import type { Artifact, Lang, Skill } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  reward: { skills: Skill[]; artifacts: Artifact[] };
  lang: Lang;
}

export default function RewardBanner({ reward, lang }: Props) {
  return (
    <div className={styles.rewardBanner} role="status">
      <p className={styles.rewardKicker}>
        {lang === "no" ? "Belønning" : "Reward"}
      </p>
      {reward.skills.map((s) => (
        <div key={s.id} className={styles.rewardItem}>
          <span className={styles.rewardGlyph} aria-hidden>
            {s.glyph}
          </span>
          <div>
            <strong>{t(s.label, lang)}</strong>
            <span className={styles.rewardSub}>
              {lang === "no" ? "Ny ferdighet" : "New skill"}
            </span>
          </div>
        </div>
      ))}
      {reward.artifacts.map((a) => (
        <div key={a.id} className={styles.rewardItem}>
          <span className={styles.rewardGlyph} aria-hidden>
            📜
          </span>
          <div>
            <strong>{t(a.title, lang)}</strong>
            {a.href && (
              <a
                className={styles.rewardLink}
                href={a.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {a.linkLabel
                  ? t(a.linkLabel, lang)
                  : lang === "no"
                    ? "Åpne"
                    : "Open"}{" "}
                ↗
              </a>
            )}
            {a.boundary && (
              <em className={styles.boundary}>{t(a.boundary, lang)}</em>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
