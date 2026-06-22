"use client";

import Link from "next/link";
import { useLanguage } from "../../../components/LanguageContext";
import { QUESTS } from "../data/quests";
import { ARTIFACT_BY_ID } from "../data/artifacts";
import { SKILLS } from "../data/skills";
import { UI, CONTACT } from "../i18n";
import styles from "../../skamlos-pitch.module.css";

interface FallbackProps {
  onBack?: () => void;
}

/** Accessible, no-WebGL text version of the whole pitch. */
export default function Fallback({ onBack }: FallbackProps) {
  const { lang, setLang } = useLanguage();
  const ui = UI[lang];
  const sorted = [...QUESTS].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.fallback}>
      <div className={styles.fallbackCard}>
        <div
          className={styles.startLinks}
          style={{ justifyContent: "flex-start", marginBottom: 18 }}
        >
          <button
            type="button"
            className={styles.startLink}
            onClick={() => setLang(lang === "no" ? "en" : "no")}
          >
            {lang === "no" ? "English" : "Norsk"}
          </button>
          {onBack ? (
            <button type="button" className={styles.startLink} onClick={onBack}>
              {ui.backToGame}
            </button>
          ) : null}
          <Link href="/" className={styles.startLink}>
            {ui.backToPortfolio}
          </Link>
        </div>

        <p className={styles.startKicker}>{ui.startKicker}</p>
        <h1 className={styles.endTitle}>{ui.fallbackTitle}</h1>
        <p className={styles.endLead}>{ui.fallbackLead}</p>

        <h2 className={styles.statBlockTitle}>{ui.fallbackZones}</h2>
        {sorted.map((quest) => (
          <div key={quest.id} className={styles.fbZone}>
            <p className={styles.fbZoneTitle}>
              {quest.kicker[lang]} · {quest.title[lang]}
            </p>
            <ul className={styles.fbList}>
              {quest.body[lang].map((line, i) => (
                <li key={i}>{line}</li>
              ))}
              {quest.grantsArtifacts.map((id) => {
                const artifact = ARTIFACT_BY_ID.get(id);
                if (!artifact?.href) return null;
                return (
                  <li key={id}>
                    <a
                      className={styles.fbLink}
                      href={artifact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artifact.title[lang]} ↗
                    </a>
                    {artifact.boundary ? ` — ${artifact.boundary[lang]}` : ""}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <h2 className={styles.statBlockTitle}>{ui.fallbackSkills}</h2>
        <div className={styles.tagWrap} style={{ marginBottom: 24 }}>
          {SKILLS.map((skill) => (
            <span key={skill.id} className={styles.tag}>
              {skill.glyph} {skill.label[lang]}
            </span>
          ))}
        </div>

        <h2 className={styles.statBlockTitle}>{ui.fallbackContact}</h2>
        <div className={styles.contactRow}>
          <a className={styles.contactBtn} href={`mailto:${CONTACT.email}`}>
            ✉ {CONTACT.email}
          </a>
          <a className={styles.contactBtn} href={CONTACT.phoneHref}>
            ☎ {CONTACT.phone}
          </a>
          <a
            className={styles.contactBtn}
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            in {ui.contactLinkedIn}
          </a>
          <a
            className={styles.contactBtn}
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            ↗ {ui.contactGitHub}
          </a>
        </div>
      </div>
    </div>
  );
}
