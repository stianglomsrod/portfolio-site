"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { caseRefLabels } from "../data/portfolio";
import { pitchNodes } from "./skamlos/pitchNodes";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SkamlosPitchScene.module.css";

// three.js is heavy and client-only — load it lazily so it never touches SSR
// or the Professional-mode bundle. Only fetched when this scene mounts.
const FitConstellation = dynamic(() => import("./skamlos/FitConstellation"), {
  ssr: false,
});

// --- prefers-reduced-motion as an external store (no setState-in-effect) ---
const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeRM(cb: () => void) {
  const m = window.matchMedia(RM_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}
function getRM() {
  return window.matchMedia(RM_QUERY).matches;
}
function getServerRM() {
  return false;
}

type LabelState = { id: string; x: number; y: number } | null;

export default function SkamlosPitchScene() {
  const reducedMotion = useSyncExternalStore(subscribeRM, getRM, getServerRM);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [label, setLabel] = useState<LabelState>(null);
  const [webglFailed, setWebglFailed] = useState(false);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const onUnavailable = useCallback(() => setWebglFailed(true), []);
  const onLabel = useCallback((l: LabelState) => setLabel(l), []);

  const active = pitchNodes.find((n) => n.id === activeId) ?? null;
  const labelNode = label
    ? (pitchNodes.find((n) => n.id === label.id) ?? null)
    : null;

  return (
    <section
      id="pitch-scene"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="pitch-scene-heading"
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>
              <span className={styles.live} aria-hidden="true" />
              Interaktiv pitch · live
            </p>
            <h2 id="pitch-scene-heading" className={shared.sectionTitle}>
              VG X fit-konstellasjon
            </h2>
            <p className={shared.sectionLede}>
              Ikke en CV — en liten, kjørbar prototype. Hvert punkt er et steg i
              læringsreisen min, koblet sammen mot VG X. Skann et punkt for å se
              hvordan det matcher jobben.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className={styles.stageWrap}>
            <div
              ref={stageRef}
              className={styles.stage}
              data-empty={activeId ? "false" : "true"}
            >
              {!webglFailed ? (
                <FitConstellation
                  activeId={activeId}
                  hoveredId={hoveredId}
                  onActivate={setActiveId}
                  onHover={setHoveredId}
                  onLabel={onLabel}
                  reducedMotion={reducedMotion}
                  onUnavailable={onUnavailable}
                />
              ) : (
                <div className={styles.fallbackStage} aria-hidden="true">
                  <div className={styles.fallbackConstellation}>
                    {pitchNodes.map((n) => (
                      <span
                        key={n.id}
                        className={styles.fallbackStar}
                        data-kind={n.kind}
                        data-active={n.id === activeId ? "true" : "false"}
                      />
                    ))}
                  </div>
                  <p className={styles.fallbackNote}>
                    3D-visning er ikke tilgjengelig her — men hele pitchen
                    virker via listen under.
                  </p>
                </div>
              )}

              {/* Floating label follows the active/hovered node (decorative). */}
              {!webglFailed && labelNode && label && (
                <span
                  className={styles.floatLabel}
                  aria-hidden="true"
                  style={{ left: `${label.x}px`, top: `${label.y}px` }}
                >
                  {labelNode.short}
                </span>
              )}
            </div>

            <p className={styles.hint}>
              <span className={styles.hintKey}>Dra</span> for å rotere ·{" "}
              <span className={styles.hintKey}>klikk</span> et punkt for å
              skanne · eller bruk knappene under.
            </p>
          </div>
        </Reveal>

        <div className={styles.console}>
          {/* Accessible source of truth: the constellation is decorative, this
              list of buttons drives + mirrors the same selection state. */}
          <Reveal className={styles.targets}>
            <h3 className={styles.consoleTitle} id="scan-targets-heading">
              Skann-mål
            </h3>
            <ul
              className={styles.targetList}
              aria-labelledby="scan-targets-heading"
            >
              {pitchNodes.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    className={styles.target}
                    data-kind={n.kind}
                    aria-pressed={n.id === activeId}
                    onClick={() =>
                      setActiveId((cur) => (cur === n.id ? null : n.id))
                    }
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(n.id)}
                    onBlur={() => setHoveredId(null)}
                  >
                    <span className={styles.targetShort}>{n.short}</span>
                    <span className={styles.targetTitle}>{n.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={styles.readout} delay={80}>
            <h3 className={styles.consoleTitle}>Skann-resultat</h3>
            <div className={styles.readoutBody} aria-live="polite">
              {active ? (
                <>
                  <p className={styles.readoutShort}>{active.short}</p>
                  <p className={styles.readoutTitle}>{active.title}</p>
                  <p className={styles.readoutBlurb}>{active.blurb}</p>
                  {active.evidence && (
                    <p className={styles.readoutEvidence}>
                      <span className={styles.readoutTag}>Bevis</span>
                      {active.evidence}
                    </p>
                  )}
                  <p className={styles.readoutRelevance}>
                    <span className={styles.readoutTag} data-vgx="true">
                      VG X
                    </span>
                    {active.vgxRelevance}
                  </p>
                  {active.caseRef && (
                    <a
                      className={styles.readoutLink}
                      href={`#${active.caseRef}`}
                    >
                      Se {caseRefLabels[active.caseRef]}
                      <span className={styles.linkArrow} aria-hidden="true" />
                    </a>
                  )}
                  {active.metaphor && (
                    <p className={styles.readoutMetaphor}>{active.metaphor}</p>
                  )}
                </>
              ) : (
                <p className={styles.readoutEmpty}>
                  Velg et punkt i konstellasjonen — eller et skann-mål — for å
                  se hvordan steget kobler seg til VG X.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
