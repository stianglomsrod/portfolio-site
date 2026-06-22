"use client";

import { useGame } from "../state/GameContext";
import { SKILLS } from "../data/skills";
import { UI } from "../i18n";
import type { Lang, SkillGroup } from "../state/types";
import styles from "../../skamlos-pitch.module.css";

const GROUP_LABEL: Record<SkillGroup, Record<Lang, string>> = {
  foundation: { no: "Grunnmur", en: "Foundation" },
  design: { no: "Design & forskning", en: "Design & research" },
  fullstack: { no: "Fullstack", en: "Fullstack" },
  ai: { no: "AI-first", en: "AI-first" },
  craft: { no: "Håndverk & disiplin", en: "Craft & discipline" },
};

const GROUP_ORDER: SkillGroup[] = [
  "foundation",
  "design",
  "fullstack",
  "ai",
  "craft",
];

interface SkillTreeProps {
  onClose: () => void;
}

/** Side panel showing every skill grouped, lit when unlocked. */
export default function SkillTree({ onClose }: SkillTreeProps) {
  const { state, lang } = useGame();
  const ui = UI[lang];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.closeX}
          onClick={onClose}
          aria-label={ui.close}
        >
          ×
        </button>
        <h2 className={styles.panelTitle}>{ui.skillTreeTitle}</h2>
        {state.skills.length === 0 && (
          <p className={styles.emptyNote}>{ui.noSkillsYet}</p>
        )}
        {GROUP_ORDER.map((group) => {
          const groupSkills = SKILLS.filter((s) => s.group === group);
          if (groupSkills.length === 0) return null;
          return (
            <div key={group} className={styles.skillGroup}>
              <p className={styles.skillGroupTitle}>
                {GROUP_LABEL[group][lang]}
              </p>
              <div className={styles.skillGrid}>
                {groupSkills.map((skill) => {
                  const on = state.skills.includes(skill.id);
                  return (
                    <span
                      key={skill.id}
                      className={`${styles.skill} ${on ? styles.skillOn : styles.skillOff}`}
                    >
                      <span>{skill.glyph}</span>
                      {skill.label[lang]}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
