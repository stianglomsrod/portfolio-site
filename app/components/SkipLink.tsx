"use client";

import { useLanguage } from "./LanguageContext";

// Visually hidden until keyboard-focused; lets keyboard and screen-reader
// users jump past the corner controls straight to the content.
export default function SkipLink() {
  const { lang } = useLanguage();
  return (
    <a className="skip-link" href="#innhold">
      {lang === "en" ? "Skip to content" : "Hopp til innholdet"}
    </a>
  );
}
