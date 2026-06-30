"use client";

import type { Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

export default function Subtitle({ text, lang }: { text: Loc; lang: Lang }) {
  return (
    <div className={styles.subtitle}>
      <span>{t(text, lang)}</span>
    </div>
  );
}
