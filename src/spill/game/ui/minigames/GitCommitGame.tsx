import { useState } from "react";
import type { GitCommitConfig, Lang } from "../../engine/types";
import { t } from "../../engine/i18n";
import styles from "../../../skamlos-rpg.module.css";

interface Props {
  config: GitCommitConfig;
  lang: Lang;
  onDone: () => void;
}

type Step = "stage" | "message" | "commit" | "done";

// Conceptual git commit — stage → message → commit. No real git execution.
export default function GitCommitGame({ config, lang, onDone }: Props) {
  const [step, setStep] = useState<Step>("stage");
  const [chosen, setChosen] = useState<string | null>(null);
  const [nudge, setNudge] = useState<string | null>(null);

  return (
    <div className={styles.miniBody}>
      <p className={styles.miniPrompt}>{t(config.setup, lang)}</p>

      <ul className={styles.fileList}>
        {config.files.map((f) => (
          <li key={f} data-staged={step !== "stage"}>
            <span className={styles.fileMark}>
              {step === "stage" ? "M" : "+"}
            </span>
            {f}
          </li>
        ))}
      </ul>

      {step === "stage" && (
        <div className={styles.miniActions}>
          <button
            className={styles.primaryBtn}
            onClick={() => setStep("message")}
          >
            {t(config.stageLabel, lang)}
          </button>
        </div>
      )}

      {step === "message" && (
        <div className={styles.commitMsgArea}>
          <p className={styles.miniPrompt}>{t(config.messagePrompt, lang)}</p>
          <div className={styles.msgOptions}>
            {config.messageOptions.map((opt) => (
              <button
                key={opt.id}
                className={styles.msgOption}
                onClick={() => {
                  if (opt.good) {
                    setChosen(opt.text);
                    setNudge(null);
                    setStep("commit");
                  } else {
                    setNudge(opt.nudge ? t(opt.nudge, lang) : "");
                  }
                }}
              >
                <span className={styles.msgPrefix}>git commit -m</span>
                <span className={styles.msgText}>&quot;{opt.text}&quot;</span>
              </button>
            ))}
          </div>
          {nudge && <p className={styles.miniRetry}>{nudge}</p>}
        </div>
      )}

      {step === "commit" && (
        <div className={styles.commitConfirm}>
          <pre className={styles.codeBlock}>
            <div className={styles.codeLine}>
              <span>git commit -m &quot;{chosen}&quot;</span>
            </div>
          </pre>
          <div className={styles.miniActions}>
            <button
              className={styles.primaryBtn}
              onClick={() => setStep("done")}
            >
              {t(config.commitLabel, lang)}
            </button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div className={styles.miniActions}>
          <p className={styles.miniSuccess}>{t(config.successText, lang)}</p>
          <button className={styles.primaryBtn} onClick={onDone}>
            {lang === "no" ? "Fullfør" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
