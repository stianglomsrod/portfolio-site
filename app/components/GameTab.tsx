"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import styles from "./GameTab.module.css";

const COPY = {
  no: { label: "Skamløs pitch", aria: "Åpne det spillbare pitch-eventyret" },
  en: { label: "Shameless pitch", aria: "Open the playable pitch adventure" },
} as const;

/**
 * A small, persistent nav pill that mirrors the language toggle in the opposite
 * (top-left) corner and links to the playable "Skamløs Pitch" game. It is
 * deliberately playful — the game is a shameless job-search move, so its entry
 * point leans into that rather than hiding it. Independent of the NO/EN toggle;
 * it only reads the active language for its own label.
 */
export default function GameTab() {
  const { lang } = useLanguage();
  const copy = COPY[lang] ?? COPY.no;

  return (
    <div className={styles.wrap}>
      <Link href="/skamlos-rpg" className={styles.tab} aria-label={copy.aria}>
        <span className={styles.icon} aria-hidden="true">
          🎮
        </span>
        <span className={styles.label}>{copy.label}</span>
      </Link>
    </div>
  );
}
