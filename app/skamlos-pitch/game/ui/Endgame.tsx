"use client";

import Link from "next/link";
import { useGame } from "../state/GameContext";
import { getProgress } from "../state/gameReducer";
import { QUESTS } from "../data/quests";
import { SKILL_BY_ID } from "../data/skills";
import { ARTIFACT_BY_ID } from "../data/artifacts";
import { EGG_BY_ID } from "../data/easterEggs";
import { UI, CONTACT } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface EndgameProps {
  onReplay: () => void;
}

/** The application-package summary shown when the gate is delivered. */
export default function Endgame({ onReplay }: EndgameProps) {
  const { state, lang } = useGame();
  const ui = UI[lang];
  const progress = getProgress(state);

  const serious: Array<[number | string, string]> = [
    [progress.questsDone, ui.statProjects],
    [progress.skillsUnlocked, ui.statSkills],
    [progress.artifactsCollected, ui.statEvidence],
    [state.guardrailsPassed, ui.statGuardrails],
  ];

  const playful: string[] = [
    `🤖 ${ui.statAgentic}: ${ui.yes}`,
    `🛡️ ${ui.statOverclaim}`,
    `📐 ${ui.statScope}`,
    `🧌 ${ui.statMerge}`,
    `👻 ${ui.statDemo}`,
    `🥚 ${ui.statEggs}: ${progress.eggsFound}/${EGG_BY_ID.size}`,
  ];

  const completedQuests = QUESTS.filter((q) =>
    state.completedQuests.includes(q.id),
  );
  const skills = state.skills
    .map((id) => SKILL_BY_ID.get(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const evidence = state.collectedArtifacts
    .map((id) => ARTIFACT_BY_ID.get(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const eggs = state.foundEggs
    .map((id) => EGG_BY_ID.get(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div className={styles.end}>
      <div className={styles.endCard}>
        <p className={styles.startKicker}>{ui.winKicker}</p>
        <h1 className={styles.endTitle}>{ui.winTitle}</h1>
        <p className={styles.endLead}>{ui.winLead}</p>

        <div className={styles.statBlock}>
          <p className={styles.statBlockTitle}>{ui.statsSeriousTitle}</p>
          <div className={styles.statGrid}>
            {serious.map(([value, label]) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statValue}>{value}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statBlock}>
          <p className={styles.statBlockTitle}>{ui.statsPlayfulTitle}</p>
          <div className={styles.playful}>
            {playful.map((chip) => (
              <span key={chip} className={styles.playfulChip}>
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.endCols}>
          <div>
            <p className={styles.endColTitle}>{ui.completedQuestsTitle}</p>
            <div className={styles.tagWrap}>
              {completedQuests.length === 0 ? (
                <span className={styles.emptyNote}>{ui.none}</span>
              ) : (
                completedQuests.map((q) => (
                  <span key={q.id} className={styles.tag}>
                    {q.title[lang]}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <p className={styles.endColTitle}>{ui.skillsTitle}</p>
            <div className={styles.tagWrap}>
              {skills.map((s) => (
                <span key={s.id} className={styles.tag}>
                  {s.glyph} {s.label[lang]}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className={styles.endColTitle}>{ui.evidenceTitle}</p>
            <div className={styles.tagWrap}>
              {evidence.length === 0 ? (
                <span className={styles.emptyNote}>{ui.none}</span>
              ) : (
                evidence.map((a) => (
                  <span key={a.id} className={styles.tag}>
                    {a.title[lang]}
                  </span>
                ))
              )}
            </div>
          </div>
          <div>
            <p className={styles.endColTitle}>{ui.eggsTitle}</p>
            <div className={styles.tagWrap}>
              {eggs.length === 0 ? (
                <span className={styles.emptyNote}>{ui.none}</span>
              ) : (
                eggs.map((e) => (
                  <span key={e.id} className={styles.tag}>
                    {e.name[lang]}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div className={styles.message}>
          <p className={styles.messageTitle}>{ui.messageTitle}</p>
          <p className={styles.messageText}>{ui.winMessage}</p>
          <p className={styles.messageTail}>{ui.winMessageTail}</p>
        </div>

        <p className={styles.statBlockTitle}>{ui.contactTitle}</p>
        <div className={styles.contactRow}>
          <a className={styles.contactBtn} href={`mailto:${CONTACT.email}`}>
            ✉ {ui.contactEmail}
          </a>
          <a className={styles.contactBtn} href={CONTACT.phoneHref}>
            ☎ {ui.contactPhone}
          </a>
          <a
            className={styles.contactBtn}
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            in {ui.contactLinkedIn}
          </a>
          <a
            className={styles.contactBtn}
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            ↗ {ui.contactGitHub}
          </a>
        </div>

        <div className={styles.endActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onReplay}
          >
            {ui.replay}
          </button>
          <Link href="/" className={`${styles.btn} ${styles.btnGhost}`}>
            {ui.backToPortfolioWin}
          </Link>
        </div>
      </div>
    </div>
  );
}
