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
            <ul className={styles.proofList}>
              {copy.proof.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
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

        <Reveal delay={160} className={styles.workPanelWrap}>
          <aside
            id="arbeid"
            className={styles.workPanel}
            aria-labelledby="work-panel-heading"
          >
            <figure className={styles.portraitFrame}>
              <Image
                src="/images/avatar/stian-portrait.webp"
                alt={copy.portraitAlt}
                width={420}
                height={520}
                sizes="(max-width: 560px) 0px, (max-width: 900px) 100vw, 360px"
                className={styles.portrait}
              />
            </figure>

            <div className={styles.identity}>
              <div>
                <p className={styles.identityLabel}>{copy.name}</p>
                <h2 id="work-panel-heading" className={styles.workPanelTitle}>
                  {copy.workPanelTitle}
                </h2>
              </div>
            </div>

            <p className={styles.workPanelIntro}>{copy.workPanelIntro}</p>

            <ol className={styles.workList}>
              {copy.highlights.map((item, index) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.workLink}>
                    <span className={styles.workIndex}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.workText}>
                      <span className={styles.workTitle}>{item.title}</span>
                      <span className={styles.workMeta}>{item.meta}</span>
                      <span className={styles.workDescription}>
                        {item.text}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      </div>
    </header>
  );
}
