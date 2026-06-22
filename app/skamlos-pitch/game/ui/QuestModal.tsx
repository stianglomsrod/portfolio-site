"use client";

import { useState } from "react";
import { useGame } from "../state/GameContext";
import { isQuestComplete, isQuestUnlocked } from "../state/gameReducer";
import { QUEST_BY_ID } from "../data/quests";
import { SKILL_BY_ID } from "../data/skills";
import { UI } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface QuestModalProps {
  questId: string;
  onClose: () => void;
}

/** The zone terminal: evidence body, optional decision mission, completion. */
export default function QuestModal({ questId, onClose }: QuestModalProps) {
  const { state, dispatch, lang } = useGame();
  const ui = UI[lang];
  const quest = QUEST_BY_ID.get(questId);
  const [pickedId, setPickedId] = useState<string | null>(null);

  if (!quest) return null;

  const unlocked = isQuestUnlocked(state, quest.id);
  const complete = isQuestComplete(state, quest.id);
  const missing = quest.requires.filter((s) => !state.skills.includes(s));

  const picked = quest.mission?.options.find((o) => o.id === pickedId) ?? null;

  function completePlain() {
    dispatch({ type: "COMPLETE_QUEST", questId: quest!.id });
  }

  function pickOption(optionId: string) {
    const option = quest!.mission?.options.find((o) => o.id === optionId);
    if (!option) return;
    setPickedId(optionId);
    dispatch({ type: "MISSION_RESULT", questId: quest!.id, correct: option.correct });
  }

  const rewardSkills = quest.grantsSkills
    .map((id) => SKILL_BY_ID.get(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles.modalWide}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.closeX} onClick={onClose} aria-label={ui.close}>
          ×
        </button>
        <p className={styles.modalKicker}>{quest.kicker[lang]}</p>
        <h2 className={styles.modalTitle}>{quest.title[lang]}</h2>
        <p className={styles.modalIntro}>{quest.intro[lang]}</p>

        {!unlocked ? (
          <div className={styles.lockedBox}>
            <h4>{ui.questLocked}</h4>
            <p style={{ marginBottom: 8 }}>{ui.questLockedBody}</p>
            <div className={styles.skillReward}>
              {missing.map((id) => {
                const skill = SKILL_BY_ID.get(id);
                return (
                  <span key={id} className={styles.skillChip}>
                    <span>{skill?.glyph ?? "🔒"}</span>
                    {skill?.label[lang] ?? id}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <>
            <ul className={styles.bodyList}>
              {quest.body[lang].map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>

            {complete ? (
              <>
                <p className={styles.doneTag}>✓ {ui.questDone}</p>
                <div className={styles.skillReward}>
                  {rewardSkills.map((skill) => (
                    <span key={skill.id} className={styles.skillChip}>
                      <span>{skill.glyph}</span>
                      {skill.label[lang]}
                    </span>
                  ))}
                </div>
                <div className={styles.btnRow}>
                  <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
                    {ui.close}
                  </button>
                </div>
              </>
            ) : quest.mission ? (
              <div className={styles.mission}>
                <p className={styles.missionSetup}>{quest.mission.setup[lang]}</p>
                <p className={styles.missionPrompt}>{quest.mission.prompt[lang]}</p>
                {!picked || !picked.correct ? (
                  <div className={styles.options}>
                    {quest.mission.options.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`${styles.optionBtn} ${pickedId === option.id ? styles.optionPicked : ""}`}
                        onClick={() => pickOption(option.id)}
                      >
                        {option.label[lang]}
                      </button>
                    ))}
                  </div>
                ) : null}

                {picked && (
                  <div
                    className={`${styles.feedback} ${picked.correct ? styles.feedbackOk : styles.feedbackBad}`}
                  >
                    <span
                      className={`${styles.feedbackTag} ${picked.correct ? styles.feedbackTagOk : styles.feedbackTagBad}`}
                    >
                      {picked.correct ? ui.missionSolved : ui.missionRetry}
                      {picked.tag ? ` · ${picked.tag[lang]}` : ""}
                    </span>
                    <div>{picked.feedback[lang]}</div>
                    <div className={styles.btnRow} style={{ marginTop: 12 }}>
                      {picked.correct ? (
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnPrimary}`}
                          onClick={onClose}
                        >
                          {ui.close}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={`${styles.btn} ${styles.btnGhost}`}
                          onClick={() => setPickedId(null)}
                        >
                          {ui.missionRetry}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className={styles.skillReward}>
                  {rewardSkills.map((skill) => (
                    <span key={skill.id} className={styles.skillChip}>
                      <span>{skill.glyph}</span>
                      {skill.label[lang]}
                    </span>
                  ))}
                </div>
                <div className={styles.btnRow}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={completePlain}
                  >
                    {ui.acceptComplete}
                  </button>
                  <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
                    {ui.close}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
