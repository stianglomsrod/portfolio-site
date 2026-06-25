"use client";

import Image from "next/image";
import type { HomeCopy } from "../data/homepage";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./Hero.module.css";

export default function Hero({ copy }: { copy: HomeCopy["hero"] }) {
  return (
    <header id="top" className={styles.hero} aria-labelledby="home-title">
      <div className={`${shared.container} ${styles.layout}`}>
        <div className={styles.copyBlock}>
          <Reveal delay={60}>
            <p className={styles.eyebrow}>{copy.eyebrow}</p>
            <h1 id="home-title" className={styles.title}>
              {copy.title}
            </h1>
          </Reveal>

          <Reveal delay={120}>
            <p className={styles.intro}>{copy.intro}</p>
          </Reveal>

          <Reveal delay={160}>
            <div className={styles.actions}>
              <a className={styles.ctaPrimary} href="#arbeid">
                {copy.primaryCta}
              </a>
              <a className={styles.ctaSecondary} href="#kontakt">
                {copy.secondaryCta}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className={styles.portraitPanel}>
          <figure className={styles.portraitFigure}>
            <span className={styles.portraitRing}>
              <Image
                src="/images/avatar/stian-portrait.webp"
                alt={copy.portraitAlt}
                width={420}
                height={420}
                sizes="(max-width: 760px) 0px, 320px"
                className={styles.portrait}
              />
            </span>
            <figcaption className={styles.portraitCaption}>
              <span>{copy.name}</span>
              <span>{copy.eyebrow}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </header>
  );
}
