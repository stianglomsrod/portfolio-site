"use client";

import { useSyncExternalStore } from "react";
import type { Mode } from "../data/portfolio";
import ModeToggle from "./ModeToggle";
import Hero from "./Hero";
import SkamlosWorld from "./SkamlosWorld";
import FeaturedKlar from "./FeaturedKlar";
import SupportingCases from "./SupportingCases";
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

  // On a user toggle, bring the relevant content into view: in Skamløs mode the
  // playable stage (the game IS the pitch), in Normal mode the top of the page.
  function handleModeChange(next: Mode) {
    setStoredMode(next);
    if (next === "agentic") {
      // Wait for the world to mount, then center the stage in the viewport.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          document
            .getElementById("world-stage")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }),
      );
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className={styles.root} data-mode={mode}>
      <header className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="#top" className={styles.brand}>
            {hero.name}
          </a>
          <ModeToggle mode={mode} onChange={handleModeChange} />
        </div>
      </header>

      <main id="top" className={styles.main}>
        {mode === "agentic" ? (
          // Skamløs AI-pitch is a game-first experience: the game IS the pitch.
          // No text-heavy hero preamble — the playable world is the entry point
          // and the interface for the whole journey, cases, VG X-match and
          // contact. The essential framing lives in the world's compact header.
          <SkamlosWorld />
        ) : (
          <>
            <Hero mode={mode} />
            <FeaturedKlar mode={mode} />
            <SupportingCases mode={mode} />
            <AgenticWorkflow mode={mode} />
            <SiteFooter mode={mode} />
          </>
        )}
      </main>
    </div>
  );
}
