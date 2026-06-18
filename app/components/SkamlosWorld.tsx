"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { caseRefLabels, fitLevelLabels } from "../data/portfolio";
import {
  worldNodes,
  worldPath,
  worldNeeds,
  milestoneCount,
  type WorldIcon,
  type WorldNode,
} from "./skamlos/worldNodes";
import Reveal from "./Reveal";
import shared from "./Shared.module.css";
import styles from "./SkamlosWorld.module.css";

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

/** Tiny inline stroke-icon set (decorative). */
function NodeIcon({ kind }: { kind: WorldIcon }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (kind) {
    case "terminal":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="m7 9 3 3-3 3M13 15h4" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.6 2.6-2.1-.5-.5-2.1Z" />
        </svg>
      );
    case "bridge":
      return (
        <svg {...common}>
          <path d="M3 10c4-4 14-4 18 0M3 10v8M9 12v6M15 12v6M21 10v8M3 18h18" />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "lens":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20a6 6 0 0 1 12 0M17 7a3 3 0 0 1 0 6M16 20a6 6 0 0 0-1-3.3" />
        </svg>
      );
    case "sprout":
      return (
        <svg {...common}>
          <path d="M12 20v-7M12 13c0-3 2-5 6-5 0 3-2 5-6 5ZM12 14c0-3-2-5-6-5 0 3 2 5 6 5Z" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="16" height="11" rx="2" />
          <path d="M12 8V4M9 13h.01M15 13h.01M2 13v2M22 13v2" />
        </svg>
      );
    case "portal":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="12" rx="6" ry="9" />
          <ellipse cx="12" cy="12" rx="2.5" ry="5" />
        </svg>
      );
  }
}

function FitBadge({ fit }: { fit: "sterk" | "god" | "voksende" }) {
  return (
    <span className={styles.fitBadge} data-fit={fit}>
      {fitLevelLabels[fit]}
    </span>
  );
}

export default function SkamlosWorld() {
  const reducedMotion = useSyncExternalStore(subscribeRM, getRM, getServerRM);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [avatarId, setAvatarId] = useState<string>(worldNodes[0].id);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const [journalOpen, setJournalOpen] = useState(false);

  const dockHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const selected = selectedId
    ? (worldNodes.find((n) => n.id === selectedId) ?? null)
    : null;
  const avatar = worldNodes.find((n) => n.id === avatarId) ?? worldNodes[0];

  const visitedMilestones = worldNodes.filter(
    (n) => n.kind === "milestone" && visited.has(n.id),
  ).length;
  const allExplored = visitedMilestones >= milestoneCount;

  const select = useCallback(
    (id: string, trigger?: HTMLButtonElement | null) => {
      if (trigger) lastTriggerRef.current = trigger;
      setSelectedId(id);
      setAvatarId(id);
      setVisited((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    },
    [],
  );

  const close = useCallback(() => {
    setSelectedId(null);
    lastTriggerRef.current?.focus();
  }, []);

  const reset = useCallback(() => {
    setSelectedId(null);
    setVisited(new Set());
    setAvatarId(worldNodes[0].id);
  }, []);

  // Move focus into the dock when a node is opened (polite, non-trapping).
  useEffect(() => {
    if (selectedId) dockHeadingRef.current?.focus();
  }, [selectedId]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape" && selectedId) {
        e.stopPropagation();
        close();
      }
    },
    [selectedId, close],
  );

  // Group nodes by thematic area for the journal overview.
  const areas: { area: string; nodes: WorldNode[] }[] = [];
  for (const n of worldNodes) {
    const last = areas[areas.length - 1];
    if (last && last.area === n.area) last.nodes.push(n);
    else areas.push({ area: n.area, nodes: [n] });
  }

  return (
    <section
      id="pitch-scene"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="world-heading"
      data-reduced={reducedMotion ? "true" : "false"}
      onKeyDown={onKeyDown}
    >
      <div className={shared.container}>
        <Reveal>
          <div className={shared.sectionHead}>
            <p className={shared.sectionLabel}>
              <span className={styles.live} aria-hidden="true" />
              Interaktiv prototype · utforsk
            </p>
            <h2 id="world-heading" className={shared.sectionTitle}>
              Stians verden
            </h2>
            <p className={shared.sectionLede}>
              Ikke en CV — et lite landskap du kan utforske. Hvert sted er et
              ekte steg i læringsreisen min. Reis mellom dem, lås opp historien,
              og se hvordan stien peker mot VG X-portalen.
            </p>
          </div>
        </Reveal>

        {/* HUD: progress + controls */}
        <Reveal>
          <div className={styles.hud}>
            <div className={styles.progress}>
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={milestoneCount}
                aria-valuenow={visitedMilestones}
                aria-label="Utforskede områder"
              >
                <span
                  className={styles.progressFill}
                  style={{
                    width: `${(visitedMilestones / milestoneCount) * 100}%`,
                  }}
                />
              </div>
              <p className={styles.progressLabel}>
                {allExplored ? (
                  <>Alle områder utforsket — VG X-portalen lyser opp.</>
                ) : (
                  <>
                    {visitedMilestones} / {milestoneCount} områder utforsket
                  </>
                )}
              </p>
            </div>
            <div className={styles.hudControls}>
              <button
                type="button"
                className={styles.hudBtn}
                aria-expanded={journalOpen}
                aria-controls="world-journal"
                onClick={() => setJournalOpen((o) => !o)}
              >
                {journalOpen ? "Skjul journal" : "Åpne journal"}
              </button>
              <button
                type="button"
                className={styles.hudBtn}
                onClick={reset}
                disabled={visited.size === 0 && selectedId === null}
              >
                Nullstill
              </button>
            </div>
          </div>
        </Reveal>

        {/* Journal / map overview (collapsible, recruiter-friendly) */}
        <div
          id="world-journal"
          className={styles.journal}
          data-open={journalOpen ? "true" : "false"}
          hidden={!journalOpen}
        >
          <div className={styles.journalGrid}>
            <div className={styles.journalCol}>
              <h3 className={styles.journalTitle}>Reisejournal</h3>
              <p className={styles.journalIntro}>
                Rask oversikt for deg som scanner i farta. Hopp rett til et
                sted.
              </p>
              {areas.map((group) => (
                <div key={group.area} className={styles.journalGroup}>
                  <p className={styles.journalArea}>{group.area}</p>
                  <ul className={styles.journalList}>
                    {group.nodes.map((n) => {
                      const isVisited = visited.has(n.id);
                      const state =
                        n.kind === "portal"
                          ? "quest"
                          : isVisited
                            ? "visited"
                            : "unlocked";
                      return (
                        <li key={n.id}>
                          <button
                            type="button"
                            className={styles.journalEntry}
                            data-state={state}
                            aria-current={
                              selectedId === n.id ? "true" : undefined
                            }
                            onClick={(e) => select(n.id, e.currentTarget)}
                          >
                            <span
                              className={styles.journalDot}
                              aria-hidden="true"
                            />
                            <span className={styles.journalEntryText}>
                              <span className={styles.journalName}>
                                {n.worldName}
                              </span>
                              <span className={styles.journalSub}>
                                {n.title}
                              </span>
                            </span>
                            <span
                              className={styles.journalState}
                              data-state={state}
                            >
                              {state === "visited"
                                ? "Besøkt"
                                : state === "quest"
                                  ? "Neste oppdrag"
                                  : "Låst opp"}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className={styles.journalCol}>
              <h3 className={styles.journalTitle}>VG X-match</h3>
              <p className={styles.journalIntro}>
                De fire behovene VG X bygger for — og hvor reisen treffer dem.
              </p>
              <ul className={styles.needList}>
                {worldNeeds.map((need) => (
                  <li key={need.id} className={styles.needItem}>
                    <div className={styles.needHead}>
                      <span className={styles.needLabel}>{need.label}</span>
                      <FitBadge fit={need.fit} />
                    </div>
                    <p className={styles.needMeaning}>{need.meaning}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The world + the detail dock */}
        <div className={styles.worldGrid}>
          <Reveal className={styles.stageWrap}>
            <div
              className={styles.stage}
              data-reduced={reducedMotion ? "true" : "false"}
            >
              {/* Trail between nodes (decorative) */}
              <svg
                className={styles.trail}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {worldPath.map(([a, b]) => {
                  const from = worldNodes[a].pos;
                  const to = worldNodes[b].pos;
                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className={styles.trailLine}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {/* The travelling avatar (decorative; mirrors selection) */}
              <span
                className={styles.avatar}
                aria-hidden="true"
                style={{ left: `${avatar.pos.x}%`, top: `${avatar.pos.y}%` }}
              >
                <span className={styles.avatarCore} />
                <span className={styles.avatarRing} />
              </span>

              {/* Place nodes (accessible buttons, journey order = tab order) */}
              {worldNodes.map((n) => {
                const isVisited = visited.has(n.id);
                const state =
                  n.kind === "portal"
                    ? "quest"
                    : isVisited
                      ? "visited"
                      : "unlocked";
                return (
                  <button
                    key={n.id}
                    type="button"
                    className={styles.node}
                    data-state={state}
                    data-selected={selectedId === n.id ? "true" : "false"}
                    aria-current={selectedId === n.id ? "true" : undefined}
                    aria-label={`${n.worldName} — ${n.title}. ${
                      state === "visited"
                        ? "Besøkt."
                        : state === "quest"
                          ? "Neste oppdrag."
                          : "Låst opp."
                    }`}
                    style={{ left: `${n.pos.x}%`, top: `${n.pos.y}%` }}
                    onClick={(e) => select(n.id, e.currentTarget)}
                  >
                    <span className={styles.nodeIcon}>
                      <NodeIcon kind={n.icon} />
                    </span>
                    <span className={styles.nodeLabel}>{n.worldName}</span>
                    {isVisited && n.kind === "milestone" && (
                      <span className={styles.nodeCheck} aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
            <p className={styles.hint}>
              <span className={styles.hintKey}>Klikk</span> et sted for å reise
              dit · <span className={styles.hintKey}>Tab</span> +{" "}
              <span className={styles.hintKey}>Enter</span> for tastatur · åpne
              journalen for rask oversikt.
            </p>
          </Reveal>

          {/* Detail dock — non-blocking aside, not a modal */}
          <aside
            className={styles.dock}
            aria-label="Detaljer om valgt sted"
            data-open={selected ? "true" : "false"}
          >
            {selected ? (
              <div className={styles.dockBody}>
                <div className={styles.dockHead}>
                  <p className={styles.dockArea}>
                    <span className={styles.dockIcon} aria-hidden="true">
                      <NodeIcon kind={selected.icon} />
                    </span>
                    {selected.worldName}
                  </p>
                  <button
                    type="button"
                    className={styles.dockClose}
                    onClick={close}
                    aria-label="Lukk detaljer"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>

                <h3
                  className={styles.dockTitle}
                  ref={dockHeadingRef}
                  tabIndex={-1}
                >
                  {selected.title}
                </h3>
                <p className={styles.dockShort}>{selected.short}</p>

                <div className={styles.dockSection} aria-live="polite">
                  {selected.kind === "portal" ? (
                    <>
                      <p className={styles.dockText}>{selected.unlocked}</p>
                      <p className={styles.dockBlock}>
                        <span className={styles.dockTag} data-vgx="true">
                          VG X
                        </span>
                        {selected.vgxRelevance}
                      </p>
                      <p className={styles.dockSubhead}>Behov dette møter</p>
                      <ul className={styles.dockNeeds}>
                        {worldNeeds.map((need) => (
                          <li key={need.id}>
                            <FitBadge fit={need.fit} />
                            <span>{need.label}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <>
                      {selected.whatItWas && (
                        <p className={styles.dockBlock}>
                          <span className={styles.dockTag}>Hva dette var</span>
                          {selected.whatItWas}
                        </p>
                      )}
                      <p className={styles.dockBlock}>
                        <span className={styles.dockTag} data-unlock="true">
                          Låste opp
                        </span>
                        {selected.unlocked}
                      </p>
                      <p className={styles.dockBlock}>
                        <span className={styles.dockTag} data-vgx="true">
                          VG X
                        </span>
                        {selected.vgxRelevance}
                      </p>
                      {selected.caseRef && (
                        <a
                          className={styles.dockLink}
                          href={`#${selected.caseRef}`}
                        >
                          Se {caseRefLabels[selected.caseRef]}
                          <span
                            className={styles.linkArrow}
                            aria-hidden="true"
                          />
                        </a>
                      )}
                      {selected.metaphor && (
                        <p className={styles.dockMetaphor}>
                          {selected.metaphor}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className={styles.dockEmpty}>
                <p className={styles.dockEmptyTitle}>Velg et sted</p>
                <p className={styles.dockEmptyText}>
                  Reis til et lysende sted i kartet — eller bruk journalen — for
                  å se hva som ble bygget, hva det lærte meg, og hvordan det
                  kobler seg til VG X.
                </p>
                <p className={styles.dockLegend}>
                  <span className={styles.legendItem} data-state="unlocked">
                    Låst opp
                  </span>
                  <span className={styles.legendItem} data-state="visited">
                    Besøkt
                  </span>
                  <span className={styles.legendItem} data-state="quest">
                    Neste oppdrag
                  </span>
                </p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
