"use client";

import { useSyncExternalStore } from "react";
import type { Mode } from "../data/portfolio";
import ModeToggle from "./ModeToggle";
import Hero from "./Hero";
import SkamlosWorld from "./SkamlosWorld";
import FeaturedKlar from "./FeaturedKlar";
import SupportingCases from "./SupportingCases";
import FitScan from "./FitScan";
import JourneyTimeline from "./JourneyTimeline";
import AgenticWorkflow from "./AgenticWorkflow";
import SiteFooter from "./SiteFooter";
import { hero } from "../data/portfolio";
import styles from "./Portfolio.module.css";

const STORAGE_KEY = "portfolio-mode";

// Small external store so the persisted mode is read without setState-in-effect.
// SSR + first client render use "professional"; the client snapshot then
// reconciles to the saved value via useSyncExternalStore.
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Mode {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "agentic" || saved === "professional"
      ? saved
      : "professional";
  } catch {
    return "professional";
  }
}

function getServerSnapshot(): Mode {
  return "professional";
}

function setStoredMode(next: Mode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore persistence errors */
  }
  listeners.forEach((l) => l());
}

export default function Portfolio() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className={styles.root} data-mode={mode}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="#top" className={styles.brand}>
            {hero.name}
          </a>
          <ModeToggle mode={mode} onChange={setStoredMode} />
        </div>
      </header>

      <main id="top" className={styles.main}>
        <Hero mode={mode} />
        {mode === "agentic" && <SkamlosWorld />}
        <FeaturedKlar mode={mode} />
        <SupportingCases mode={mode} />
        {mode === "agentic" && <FitScan />}
        {mode === "agentic" && <JourneyTimeline />}
        <AgenticWorkflow mode={mode} />
        <SiteFooter mode={mode} />
      </main>
    </div>
  );
}
