"use client";

import type { Lang, Loc } from "../engine/types";
import { t } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

export interface ToastItem {
  id: number;
  text: Loc;
  kind: "skill" | "artifact" | "info";
}

const ICON: Record<ToastItem["kind"], string> = {
  skill: "💻",
  artifact: "📜",
  info: "✨",
};

export default function Toasts({ items, lang }: { items: ToastItem[]; lang: Lang }) {
  if (items.length === 0) return null;
  return (
    <div className={styles.toasts}>
      {items.map((item) => (
        <div key={item.id} className={styles.toast} data-kind={item.kind}>
          <span aria-hidden>{ICON[item.kind]}</span>
          <span>{t(item.text, lang)}</span>
        </div>
      ))}
    </div>
  );
}
