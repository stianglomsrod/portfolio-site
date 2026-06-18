"use client";

import type { Mode } from "../data/portfolio";
import { hero, profileTags, storyline } from "../data/portfolio";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./Hero.module.css";

export default function Hero({ mode }: { mode: Mode }) {
  const copy = hero[mode];
  const agentic = mode === "agentic";

  return (
    <header className={styles.hero}>
      <div className={shared.container}>
        <Reveal>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
        </Reveal>
        <Reveal delay={60}>
          <h1 className={styles.title}>{copy.tagline}</h1>
        </Reveal>
        <Reveal delay={120}>
          <p className={styles.intro}>{copy.intro}</p>
        </Reveal>

        {agentic && (
          <Reveal delay={160}>
            <ul className={styles.tags} aria-label="Kort om Stian">
              {profileTags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className={styles.actions}>
            {agentic ? (
              <>
                <a className={styles.ctaPrimary} href="#pitch-scene">
                  Start reisen
                </a>
                <a
                  className={styles.ctaSecondary}
                  href="#pitch-scene"
                  onClick={() =>
                    window.dispatchEvent(new CustomEvent("skamlos:openjournal"))
                  }
                >
                  Åpne journal
                </a>
              </>
            ) : (
              <>
                <a className={styles.ctaPrimary} href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                </a>
                <a
                  className={styles.ctaSecondary}
                  href={hero.secondaryCta.href}
                >
                  {hero.secondaryCta.label}
                </a>
              </>
            )}
          </div>
        </Reveal>

        {agentic && (
          <Reveal delay={240}>
            <ol
              className={styles.storyline}
              aria-label="Mønsteret i arbeidet mitt"
            >
              {storyline.map((item, i) => (
                <li key={item.step} className={styles.storyStep}>
                  <span className={styles.storyIndex}>{i + 1}</span>
                  <span className={styles.storyLabel}>{item.step}</span>
                  <span className={styles.storyText}>{item.text}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        )}
      </div>
    </header>
  );
}
