"use client";

import { useLanguage, type Lang } from "./LanguageContext";
import styles from "./LanguageToggle.module.css";

const ORDER: { value: Lang; label: string; full: string }[] = [
  { value: "no", label: "NO", full: "Norsk" },
  { value: "en", label: "EN", full: "English" },
];

/**
 * Fixed segmented control for switching the page content between Norwegian and
 * English. Mirrors the visual language of the existing ModeToggle.
 */
export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className={styles.wrap}>
      <div className={styles.toggle} role="group" aria-label="Språk / language">
        <span className={styles.thumb} data-active={lang} aria-hidden="true" />
        {ORDER.map(({ value, label, full }) => (
          <button
            key={value}
            type="button"
            className={styles.option}
            aria-pressed={lang === value}
            aria-label={full}
            onClick={() => setLang(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
