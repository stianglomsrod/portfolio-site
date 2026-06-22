"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Lang = "no" | "en";

const STORAGE_KEY = "dnb-lang";

let listeners: Array<() => void> = [];

function getSnapshot(): Lang {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "no";
  } catch {
    return "no";
  }
}

function getServerSnapshot(): Lang {
  return "no";
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
    window.removeEventListener("storage", callback);
  };
}

function setLang(next: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* localStorage unavailable — nothing to persist */
  }
  listeners.forEach((l) => l());
}

/**
 * Reads the active content language from a tiny localStorage-backed external
 * store. SSR and the first client render return "no", so hydration matches; a
 * stored preference is picked up right after. Defaults to Norwegian.
 */
export function useLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { lang, setLang };
}

/**
 * Keeps the document `lang` attribute in sync with the chosen language for
 * accessibility. Renders children unchanged.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "nb";
  }, [lang]);

  return <>{children}</>;
}
