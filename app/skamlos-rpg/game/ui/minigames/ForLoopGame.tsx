"use client";

import { Fragment, useMemo, useState } from "react";
import type { ForLoopConfig, Lang } from "../../engine/types";
import { t } from "../../engine/i18n";
import styles from "../../../skamlos-rpg.module.css";

interface Props {
  config: ForLoopConfig;
  lang: Lang;
  onDone: () => void;
}

type Status = "editing" | "retry" | "ok";

// Fill-in-the-blanks for-loop. SECURITY: this NEVER evals player input — it only
// compares chosen tokens against the known-correct tokens.
export default function ForLoopGame({ config, lang, onDone }: Props) {
  const [selected, setSelected] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<Status>("editing");
  const [attempts, setAttempts] = useState(0);
  const [ran, setRan] = useState<{ lines: string[]; runaway: boolean } | null>(
    null,
  );
  const no = lang === "no";

  const segments = useMemo(() => {
    let blankIndex = 0;
    return config.templateLines.map((line) => {
      const parts = line.split("___");
      const segs: Array<
        { type: "text"; value: string } | { type: "blank"; index: number }
      > = [];
      parts.forEach((part, pi) => {
        segs.push({ type: "text", value: part });
        if (pi < parts.length - 1)
          segs.push({ type: "blank", index: blankIndex++ });
      });
      return segs;
    });
  }, [config.templateLines]);

  const allChosen = config.blanks.every((_, i) => selected[i]);

  // Safe, bounded simulation of the assembled loop — NEVER eval. We only read
  // the chosen tokens (start / comparison / step) and step a counter by hand,
  // capped so a runaway loop (e.g. i--) can't hang the browser.
  function simulate(): { lines: string[]; runaway: boolean } {
    const pick = (id: string) => {
      const idx = config.blanks.findIndex((b) => b.id === id);
      return selected[idx] ?? "";
    };
    const start = Number(pick("start"));
    const op = pick("test");
    const step = pick("step");
    const bound = 5;
    const cond = (i: number) =>
      op === "<"
        ? i < bound
        : op === "<="
          ? i <= bound
          : op === "=="
            ? i === bound
            : false;
    const advance = (i: number) =>
      step === "++" ? i + 1 : step === "--" ? i - 1 : step === "+= 2" ? i + 2 : i;
    const lines: string[] = [];
    if (!Number.isFinite(start) || !op || !step) return { lines, runaway: false };
    let i = start;
    while (cond(i)) {
      lines.push(String(i));
      const nextI = advance(i);
      if (nextI === i || lines.length >= 12) return { lines, runaway: true };
      i = nextI;
    }
    return { lines, runaway: false };
  }

  function run() {
    setRan(simulate());
    const correct = config.blanks.every((b, i) => selected[i] === b.correct);
    if (correct) {
      setStatus("ok");
    } else {
      setStatus("retry");
      setAttempts((a) => a + 1);
    }
  }

  return (
    <div className={styles.miniBody}>
      <p className={styles.miniPrompt}>{t(config.prompt, lang)}</p>

      <pre className={styles.codeBlock}>
        {segments.map((line, li) => (
          <div key={li} className={styles.codeLine}>
            {line.map((seg, si) =>
              seg.type === "text" ? (
                <span key={si}>{seg.value}</span>
              ) : (
                <select
                  key={si}
                  className={styles.codeBlank}
                  value={selected[seg.index] ?? ""}
                  disabled={status === "ok"}
                  onChange={(e) => {
                    setSelected((prev) => ({
                      ...prev,
                      [seg.index]: e.target.value,
                    }));
                    setRan(null);
                    setStatus("editing");
                  }}
                >
                  <option value="" disabled>
                    ___
                  </option>
                  {config.blanks[seg.index].options.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ),
            )}
          </div>
        ))}
      </pre>

      {ran && (
        <div className={styles.consoleOut}>
          <span className={styles.consolePrompt}>$ node ordkryss.js</span>
          <br />
          {ran.lines.map((l, i) => (
            <Fragment key={i}>
              <span>{l}</span>
              <br />
            </Fragment>
          ))}
          {ran.lines.length === 0 && !ran.runaway && (
            <span className={styles.consoleDim}>
              {no ? "(ingen utskrift)" : "(no output)"}
            </span>
          )}
          {ran.runaway && (
            <span className={styles.consoleWarn}>
              {no
                ? "løkka stopper ikke — juster verdiene"
                : "loop never stops — adjust the values"}
            </span>
          )}
        </div>
      )}

      {status === "retry" && (
        <p className={styles.miniRetry}>
          {lang === "no"
            ? "Ikke helt. Prøv igjen — "
            : "Not quite. Try again — "}
          <em>{t(config.hint, lang)}</em>
          {attempts > 1 ? " 🦆" : ""}
        </p>
      )}

      {status === "ok" ? (
        <div className={styles.miniActions}>
          <p className={styles.miniSuccess}>{t(config.successText, lang)}</p>
          <button className={styles.primaryBtn} onClick={onDone}>
            {lang === "no" ? "Videre" : "Continue"}
          </button>
        </div>
      ) : (
        <div className={styles.miniActions}>
          <button
            className={styles.primaryBtn}
            onClick={run}
            disabled={!allChosen}
          >
            {lang === "no" ? "Kjør" : "Run"}
          </button>
        </div>
      )}
    </div>
  );
}
