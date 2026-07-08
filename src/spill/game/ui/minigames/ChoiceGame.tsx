import { useState } from "react";
import type { ChoiceConfig, Lang } from "../../engine/types";
import { t } from "../../engine/i18n";
import styles from "../../../skamlos-rpg.module.css";

interface Props {
  config: ChoiceConfig;
  lang: Lang;
  onDone: () => void;
}

// A single multiple-choice beat (e.g. the master's-defense question). No eval,
// no scoring model — the player picks, sees feedback, and continues once the
// correct answer is chosen.
export default function ChoiceGame({ config, lang, onDone }: Props) {
  const [pickedId, setPickedId] = useState<string | null>(null);
  const no = lang === "no";
  const picked = config.options.find((o) => o.id === pickedId) ?? null;
  const solved = !!picked?.correct;

  return (
    <div className={styles.miniBody}>
      <p className={styles.miniPrompt}>{t(config.setup, lang)}</p>
      <p className={styles.choicePrompt}>{t(config.prompt, lang)}</p>

      <div className={styles.choiceList}>
        {config.options.map((o) => {
          const isPicked = pickedId === o.id;
          const state = isPicked ? (o.correct ? "correct" : "wrong") : "idle";
          return (
            <button
              key={o.id}
              type="button"
              className={styles.choiceOption}
              data-state={state}
              disabled={solved}
              onClick={() => setPickedId(o.id)}
            >
              {t(o.label, lang)}
            </button>
          );
        })}
      </div>

      {picked && (
        <p className={solved ? styles.miniSuccess : styles.miniRetry}>
          {t(picked.feedback, lang)}
        </p>
      )}

      {solved && config.outro && (
        <p className={styles.miniOutro}>{t(config.outro, lang)}</p>
      )}

      {solved && (
        <div className={styles.miniActions}>
          <button className={styles.primaryBtn} onClick={onDone}>
            {no ? "Fullfør" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}
