"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { StateSnapshot } from "../engine/bridge";
import type { ContentPack, Lang } from "../engine/types";
import { t, tList } from "../engine/i18n";
import styles from "../../skamlos-rpg.module.css";

interface Props {
  pack: ContentPack;
  snapshot: StateSnapshot | null;
  lang: Lang;
  focus?: string | null;
  onResume: () => void;
  onRestart: () => void;
}

// Pause / main menu (Esc or the top-right button). Lets the player resume,
// restart, and inspect everything they have collected (quests/skills/artifacts).
export default function PauseMenu({
  pack,
  snapshot,
  lang,
  focus,
  onResume,
  onRestart,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(focus ?? null);
  const toggle = (id: string) => setOpenId((o) => (o === id ? null : id));
  const focusRef = useRef<HTMLLIElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
  }, []);
  useEffect(() => {
    if (focus) focusRef.current?.scrollIntoView({ block: "center" });
  }, [focus]);

  const done = snapshot?.completedQuests ?? [];
  const ownedSkills = snapshot?.skills ?? [];
  const ownedArtifacts = snapshot?.artifacts ?? [];
  const quests = [...pack.quests].sort((a, b) => a.order - b.order);
  const activeTitle = snapshot?.questTitle
    ? t(snapshot.questTitle, lang)
    : null;
  const no = lang === "no";

  return (
    <div className={styles.menuBackdrop} onClick={onResume}>
      <div
        ref={panelRef}
        className={styles.menu}
        role="dialog"
        aria-modal="true"
        aria-label={no ? "Meny" : "Menu"}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles.menuHead}>
          <h2>{no ? "Meny" : "Menu"}</h2>
          <button
            className={styles.panelClose}
            onClick={onResume}
            aria-label={no ? "Lukk" : "Close"}
          >
            ✕
          </button>
        </header>

        <div className={styles.menuActions}>
          <button className={styles.primaryBtn} onClick={onResume}>
            {no ? "Fortsett" : "Resume"}
          </button>
          <button className={styles.ghostBtn} onClick={onRestart}>
            {no ? "Spill på nytt" : "Restart"}
          </button>
          <Link href="/" className={styles.ghostBtn}>
            {no ? "Tilbake til portefølje" : "Back to portfolio"}
          </Link>
        </div>

        <div className={styles.menuBody}>
          <section className={styles.menuSection}>
            <h3>{no ? "Oppdrag" : "Quests"}</h3>
            <ul className={styles.questList}>
              {quests.map((q) => {
                const isDone = done.includes(q.id);
                const isActive = !isDone && t(q.title, lang) === activeTitle;
                const status = isDone ? "done" : isActive ? "active" : "todo";
                return (
                  <li
                    key={q.id}
                    className={styles.questItem}
                    data-status={status}
                  >
                    <span className={styles.questDot} data-status={status} />
                    <div>
                      <strong>{t(q.title, lang)}</strong>
                      <span className={styles.questObjective}>
                        {t(q.objective, lang)}
                      </span>
                    </div>
                    <span className={styles.questBadge}>
                      {isDone
                        ? no
                          ? "Ferdig"
                          : "Done"
                        : isActive
                          ? no
                            ? "Aktiv"
                            : "Active"
                          : "—"}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className={styles.menuSection}>
            <h3>{no ? "Ferdigheter" : "Skills"}</h3>
            {ownedSkills.length === 0 ? (
              <p className={styles.emptyNote}>
                {no ? "Ingen ennå." : "None yet."}
              </p>
            ) : (
              <ul className={styles.skillList}>
                {pack.skills
                  .filter((s) => ownedSkills.includes(s.id))
                  .map((s) => {
                    const open = openId === `skill:${s.id}`;
                    const boundary = pack.claims.boundaries[s.id];
                    return (
                      <li
                        key={s.id}
                        className={styles.skillItem}
                        ref={focus === `skill:${s.id}` ? focusRef : undefined}
                      >
                        <button
                          className={styles.menuItemHead}
                          onClick={() => toggle(`skill:${s.id}`)}
                        >
                          <span className={styles.skillGlyph}>{s.glyph}</span>
                          <strong>{t(s.label, lang)}</strong>
                          <span className={styles.chev}>
                            {open ? "▴" : "▾"}
                          </span>
                        </button>
                        {open && (
                          <div className={styles.menuItemBody}>
                            <div className={styles.skillTags}>
                              {tList(s.log, lang).map((tag) => (
                                <span key={tag} className={styles.skillTag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                            {boundary && (
                              <em className={styles.boundary}>
                                {t(boundary, lang)}
                              </em>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>

          <section className={styles.menuSection}>
            <h3>{no ? "Bevis" : "Evidence"}</h3>
            {ownedArtifacts.length === 0 ? (
              <p className={styles.emptyNote}>
                {no ? "Ingen ennå." : "None yet."}
              </p>
            ) : (
              <ul className={styles.skillList}>
                {pack.artifacts
                  .filter((a) => ownedArtifacts.includes(a.id))
                  .map((a) => {
                    const open = openId === `art:${a.id}`;
                    return (
                      <li
                        key={a.id}
                        className={styles.skillItem}
                        ref={focus === `art:${a.id}` ? focusRef : undefined}
                      >
                        <button
                          className={styles.menuItemHead}
                          onClick={() => toggle(`art:${a.id}`)}
                        >
                          <span className={styles.skillGlyph}>📜</span>
                          <strong>{t(a.title, lang)}</strong>
                          <span className={styles.chev}>
                            {open ? "▴" : "▾"}
                          </span>
                        </button>
                        {open && (
                          <div className={styles.menuItemBody}>
                            <p className={styles.artDesc}>
                              {t(a.description, lang)}
                            </p>
                            {a.href && (
                              <a
                                className={styles.rewardLink}
                                href={a.href}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                {a.linkLabel
                                  ? t(a.linkLabel, lang)
                                  : no
                                    ? "Åpne"
                                    : "Open"}{" "}
                                ↗
                              </a>
                            )}
                            {a.boundary && (
                              <em className={styles.boundary}>
                                {t(a.boundary, lang)}
                              </em>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
              </ul>
            )}
          </section>

          <section className={styles.menuSection}>
            <h3>{no ? "Kontroller" : "Controls"}</h3>
            <dl className={styles.controlsList}>
              <div>
                <dt>{no ? "Beveg" : "Move"}</dt>
                <dd>WASD / {no ? "piltaster" : "arrows"}</dd>
              </div>
              <div>
                <dt>{no ? "Undersøk / snakk" : "Interact / talk"}</dt>
                <dd>E / {no ? "mellomrom" : "space"}</dd>
              </div>
              <div>
                <dt>{no ? "Meny" : "Menu"}</dt>
                <dd>Esc</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}
