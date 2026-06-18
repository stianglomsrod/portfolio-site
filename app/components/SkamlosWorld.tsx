"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  caseRefLabels,
  fitLevelLabels,
  featuredCase,
  supportingCases,
  fitScan,
  footer,
  type CaseRef,
} from "../data/portfolio";
import {
  gyms,
  gymPath,
  gymCount,
  energyMeta,
  energyMax,
  energyOrder,
  WORLD_W,
  WORLD_H,
  type Energy,
  type Gym,
} from "./skamlos/worldGyms";
import CaseLink from "./CaseLink";
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

// --- gameplay constants (virtual world units) ---
const SPEED = 330; // units / second
const PROXIMITY = 132; // interaction radius
const ARRIVE = 8; // auto-walk arrival threshold
const PAD = 46; // world edge padding

type Dir = "up" | "down" | "left" | "right";
type Vec = { x: number; y: number };
type PopoverPlacement = {
  xPct: number;
  yPct: number;
  vertical: "top" | "bottom";
};

const KEY_MAP: Record<string, Dir> = {
  w: "up",
  arrowup: "up",
  s: "down",
  arrowdown: "down",
  a: "left",
  arrowleft: "left",
  d: "right",
  arrowright: "right",
};

const POP_X_PAD = 13;
const POP_Y_PAD = 12;

function getPopoverPlacement(gym: Gym): PopoverPlacement {
  const rawX = (gym.pos.x / WORLD_W) * 100;
  const rawY = (gym.pos.y / WORLD_H) * 100;

  const xPct = Math.max(POP_X_PAD, Math.min(100 - POP_X_PAD, rawX));
  const vertical: PopoverPlacement["vertical"] = rawY < 22 ? "bottom" : "top";
  const yPct =
    vertical === "top"
      ? Math.max(POP_Y_PAD, Math.min(100 - POP_Y_PAD, rawY))
      : Math.max(POP_Y_PAD, rawY);

  return { xPct, yPct, vertical };
}

// Journal tabs (in-game overlay).
const TABS = [
  { id: "reise", label: "Reise" },
  { id: "bevis", label: "Bevis" },
  { id: "vgx", label: "VG X-match" },
  { id: "kontakt", label: "Kontakt" },
] as const;
type JournalTab = (typeof TABS)[number]["id"];

// Cases shown in the Bevis tab (real projects behind the world's gyms).
const bevisCases = [featuredCase, ...supportingCases];

function isLiveLink(href?: string): boolean {
  return !!href && /^https?:\/\//.test(href.trim());
}

function gymState(
  g: Gym,
  visited: Set<string>,
): "unlocked" | "visited" | "quest" {
  if (g.kind === "portal") return "quest";
  return visited.has(g.id) ? "visited" : "unlocked";
}

/** Decorative landmark built from CSS layers; emblem stays readable at distance. */
function Landmark({ gym }: { gym: Gym }) {
  return (
    <span
      className={styles.landmark}
      data-landmark={gym.landmark}
      aria-hidden="true"
    >
      <span className={styles.lmBase} />
      <span className={styles.lmDetailA} />
      <span className={styles.lmDetailB} />
      <span className={styles.lmGlow} />
      <span className={styles.lmEmblem}>{gym.emblem}</span>
    </span>
  );
}

export default function SkamlosWorld() {
  const reducedMotion = useSyncExternalStore(subscribeRM, getRM, getServerRM);

  // --- React UI state (discrete) ---
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [nearbyId, setNearbyId] = useState<string | null>(null);
  const [visited, setVisited] = useState<Set<string>>(() => new Set());
  const [facing, setFacing] = useState<Dir>("down");
  const [moving, setMoving] = useState(false);
  const [trainingId, setTrainingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [dockExpanded, setDockExpanded] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [journalTab, setJournalTab] = useState<JournalTab>("reise");
  const [bevisFocus, setBevisFocus] = useState<CaseRef | null>(null);
  const [started, setStarted] = useState(false);

  // --- mutable game refs (never trigger renders) ---
  const stageRef = useRef<HTMLDivElement | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const dockHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const journalCloseRef = useRef<HTMLButtonElement | null>(null);
  const journalContentRef = useRef<HTMLDivElement | null>(null);
  const posRef = useRef<Vec>({ x: 140, y: 588 });
  const keysRef = useRef<Set<Dir>>(new Set());
  const autoTargetRef = useRef<Vec | null>(null);
  const nearbyRef = useRef<string | null>(null);
  const facingRef = useRef<Dir>("down");
  const movingRef = useRef(false);
  const trainTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);
  const reducedRef = useRef(reducedMotion);
  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  const selected = selectedId
    ? (gyms.find((g) => g.id === selectedId) ?? null)
    : null;
  const nearby = nearbyId
    ? (gyms.find((g) => g.id === nearbyId) ?? null)
    : null;
  const popoverPlacement = nearby ? getPopoverPlacement(nearby) : null;

  // Accumulated energies from visited gyms.
  const energies = useMemo(() => {
    const acc: Record<Energy, number> = {
      prototypekraft: 0,
      brukerinnsikt: 0,
      forstaelseskraft: 0,
      agentisk: 0,
    };
    for (const g of gyms) {
      if (!visited.has(g.id)) continue;
      for (const key of Object.keys(g.energies) as Energy[]) {
        acc[key] += g.energies[key] ?? 0;
      }
    }
    return acc;
  }, [visited]);

  const visitedCount = useMemo(
    () => gyms.filter((g) => g.kind === "gym" && visited.has(g.id)).length,
    [visited],
  );
  const allExplored = visitedCount >= gymCount;
  const nextStop = useMemo(
    () =>
      gyms.find((g) => g.kind === "gym" && !visited.has(g.id))?.worldName ??
      "VG X-portalen",
    [visited],
  );

  // --- interaction: train a gym (visit + juice + dock) ---
  const interact = useCallback((id: string) => {
    const g = gyms.find((n) => n.id === id);
    if (!g) return;
    setSelectedId(id);
    setDockExpanded(false);
    setVisited((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    // training juice burst
    setTrainingId(id);
    if (trainTimer.current) window.clearTimeout(trainTimer.current);
    trainTimer.current = window.setTimeout(() => setTrainingId(null), 900);
    // unlock toast
    setToast(g.kind === "portal" ? g.unlockName : `Låst opp: ${g.unlockName}`);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2000);
  }, []);

  // Keep a live ref so the rAF loop calls the latest interact.
  const interactRef = useRef(interact);
  useEffect(() => {
    interactRef.current = interact;
  }, [interact]);

  // Select from journal / click: walk there + open immediately.
  const select = useCallback((id: string) => {
    const g = gyms.find((n) => n.id === id);
    if (g) autoTargetRef.current = { ...g.pos };
    interactRef.current(id);
  }, []);

  // Close the dock and return focus to the game shell.
  const close = useCallback(() => {
    setSelectedId(null);
    setDockExpanded(false);
    stageRef.current?.focus();
  }, []);

  const reset = useCallback(() => {
    setSelectedId(null);
    setDockExpanded(false);
    setVisited(new Set());
    setToast(null);
    autoTargetRef.current = null;
  }, []);

  // --- journal overlay controls ---
  const openJournal = useCallback(
    (tab: JournalTab = "reise", caseRef?: CaseRef) => {
      setJournalTab(tab);
      setBevisFocus(caseRef ?? null);
      setJournalOpen(true);
    },
    [],
  );
  const closeJournal = useCallback(() => {
    setJournalOpen(false);
    setBevisFocus(null);
    stageRef.current?.focus();
  }, []);
  const toggleJournal = useCallback(() => {
    setJournalOpen((o) => {
      if (o) {
        setBevisFocus(null);
        stageRef.current?.focus();
        return false;
      }
      return true;
    });
  }, []);

  // Live refs for loop-driven handlers (stage keydown reads the latest).
  const closeRef = useRef(close);
  const toggleJournalRef = useRef(toggleJournal);
  useEffect(() => {
    closeRef.current = close;
    toggleJournalRef.current = toggleJournal;
  }, [close, toggleJournal]);

  // Let the Hero (or anything) open the journal via a decoupled event.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { tab?: JournalTab } | null;
      openJournal(detail?.tab ?? "reise");
      stageRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    };
    window.addEventListener("skamlos:openjournal", onOpen as EventListener);
    return () =>
      window.removeEventListener(
        "skamlos:openjournal",
        onOpen as EventListener,
      );
  }, [openJournal]);

  // Move focus into the journal when it opens (polite; Esc / backdrop returns it).
  useEffect(() => {
    if (!journalOpen) return;
    if (journalTab === "bevis" && bevisFocus) {
      const el = journalContentRef.current?.querySelector<HTMLElement>(
        `[data-case="${bevisFocus}"]`,
      );
      if (el) {
        el.focus();
        return;
      }
    }
    journalCloseRef.current?.focus();
  }, [journalOpen, journalTab, bevisFocus]);

  // Clear timers on unmount.
  useEffect(() => {
    return () => {
      if (trainTimer.current) window.clearTimeout(trainTimer.current);
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  // --- the game loop (movement, facing, proximity) ---
  useEffect(() => {
    const stage = stageRef.current;
    const avatarEl = avatarRef.current;
    if (!stage || !avatarEl) return;

    let raf = 0;
    let last = performance.now();

    const applyAvatar = () => {
      const p = posRef.current;
      avatarEl.style.left = `${(p.x / WORLD_W) * 100}%`;
      avatarEl.style.top = `${(p.y / WORLD_H) * 100}%`;
    };
    applyAvatar();

    const loop = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      const keys = keysRef.current;
      const p = posRef.current;

      let dx = 0;
      let dy = 0;
      const manual =
        keys.has("up") ||
        keys.has("down") ||
        keys.has("left") ||
        keys.has("right");

      if (manual) {
        autoTargetRef.current = null;
        if (keys.has("up")) dy -= 1;
        if (keys.has("down")) dy += 1;
        if (keys.has("left")) dx -= 1;
        if (keys.has("right")) dx += 1;
      } else if (autoTargetRef.current) {
        const tx = autoTargetRef.current.x - p.x;
        const ty = autoTargetRef.current.y - p.y;
        const d = Math.hypot(tx, ty);
        if (d <= ARRIVE) {
          autoTargetRef.current = null;
        } else {
          dx = tx / d;
          dy = ty / d;
        }
      }

      if (dx !== 0 || dy !== 0) {
        const len = Math.hypot(dx, dy) || 1;
        p.x += (dx / len) * SPEED * dt;
        p.y += (dy / len) * SPEED * dt;
        p.x = Math.max(PAD, Math.min(WORLD_W - PAD, p.x));
        p.y = Math.max(PAD, Math.min(WORLD_H - PAD, p.y));
        applyAvatar();

        // facing from dominant axis
        let dir: Dir = facingRef.current;
        if (Math.abs(dx) >= Math.abs(dy)) dir = dx < 0 ? "left" : "right";
        else dir = dy < 0 ? "up" : "down";
        if (dir !== facingRef.current) {
          facingRef.current = dir;
          setFacing(dir);
        }
        if (!movingRef.current) {
          movingRef.current = true;
          setMoving(true);
        }
      } else if (movingRef.current) {
        movingRef.current = false;
        setMoving(false);
      }

      // proximity: nearest gym within radius
      let best: string | null = null;
      let bestD = PROXIMITY;
      for (const g of gyms) {
        const gd = Math.hypot(g.pos.x - p.x, g.pos.y - p.y);
        if (gd < bestD) {
          bestD = gd;
          best = g.id;
        }
      }
      if (best !== nearbyRef.current) {
        nearbyRef.current = best;
        setNearbyId(best);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const onKeyDown = (e: KeyboardEvent) => {
      // Only drive the game when the stage itself holds focus. If the user has
      // explicitly tabbed into the dock or journal, let those controls work
      // normally instead of stealing the keystroke for movement.
      if (e.target !== stage) return;
      const k = e.key.toLowerCase();
      if (KEY_MAP[k]) {
        keysRef.current.add(KEY_MAP[k]);
        setStarted(true);
        e.preventDefault();
        return;
      }
      if (k === " " || k === "spacebar" || k === "enter" || k === "e") {
        e.preventDefault();
        const n = nearbyRef.current;
        if (n) interactRef.current(n);
        return;
      }
      if (k === "escape") {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (k === "j" || k === "m") {
        e.preventDefault();
        toggleJournalRef.current();
        return;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (KEY_MAP[k]) keysRef.current.delete(KEY_MAP[k]);
    };
    const clearKeys = () => keysRef.current.clear();

    stage.addEventListener("keydown", onKeyDown);
    stage.addEventListener("keyup", onKeyUp);
    stage.addEventListener("blur", clearKeys);
    window.addEventListener("blur", clearKeys);

    return () => {
      cancelAnimationFrame(raf);
      stage.removeEventListener("keydown", onKeyDown);
      stage.removeEventListener("keyup", onKeyUp);
      stage.removeEventListener("blur", clearKeys);
      window.removeEventListener("blur", clearKeys);
    };
  }, []);

  // --- touch D-pad handlers ---
  const press = useCallback((dir: Dir) => {
    keysRef.current.add(dir);
    setStarted(true);
  }, []);
  const release = useCallback((dir: Dir) => {
    keysRef.current.delete(dir);
  }, []);

  // Esc inside an overlay (focus may be in the dock / modal, not the stage).
  const onDockKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        close();
      }
    },
    [close],
  );
  const onJournalKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeJournal();
      }
    },
    [closeJournal],
  );

  // Avatar upgrade flags (visual only, from visited set).
  const upTerminal = visited.has("c-foundations");
  const upPrototype = visited.has("maskinrommet") || visited.has("skisselab");
  const upLeaf = visited.has("klar");
  const upAgent = visited.has("agentic-workflow");

  return (
    <section
      id="pitch-scene"
      className={`${shared.section} ${styles.section}`}
      aria-labelledby="world-heading"
      data-reduced={reducedMotion ? "true" : "false"}
    >
      <div className={shared.container}>
        <div className={styles.sceneHead}>
          <p className={styles.sceneLabel}>
            <span className={styles.live} aria-hidden="true" />
            Spillbar prototype · gå inn i verden
          </p>
          <h2 id="world-heading" className={styles.sceneTitle}>
            Stians verden
          </h2>
          <p className={styles.sceneLede}>
            Ikke en CV — en liten verden du kan gå rundt i. Styr Stian-avataren
            mellom treningsstedene fra den ekte læringsreisen, tren hvert sted,
            og se stien peke mot VG X-portalen. Vil du bare skanne? Trykk{" "}
            <kbd>J</kbd> for journalen.
          </p>
        </div>

        {/* Slim HUD toolbar (above the world; keeps the world itself clean) */}
        <div className={styles.hud}>
          <div className={styles.hudProgress}>
            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={gymCount}
              aria-valuenow={visitedCount}
              aria-label="Utforskede treningssteder"
            >
              <span
                className={styles.progressFill}
                style={{ width: `${(visitedCount / gymCount) * 100}%` }}
              />
            </div>
            <p className={styles.progressLabel}>
              {allExplored
                ? "Alle steder trent — VG X-portalen lyser opp."
                : `${visitedCount} / ${gymCount} steder trent`}
            </p>
          </div>

          <ul className={styles.energies} aria-label="Energier samlet">
            {energyOrder.map((key) => {
              const val = energies[key];
              const max = energyMax[key] || 1;
              return (
                <li key={key} className={styles.energy}>
                  <span className={styles.energyLabel}>
                    {energyMeta[key].label}
                  </span>
                  <span className={styles.energyBar} data-energy={key}>
                    <span
                      className={styles.energyFill}
                      style={{ width: `${(val / max) * 100}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>

          <div className={styles.hudControls}>
            <button
              type="button"
              className={styles.hudBtn}
              data-active={journalOpen ? "true" : "false"}
              aria-expanded={journalOpen}
              aria-controls="world-journal"
              onClick={() => (journalOpen ? closeJournal() : openJournal())}
            >
              {journalOpen ? "Lukk journal" : "Journal (J)"}
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

        {/* World shell — the dominant, game-first surface */}
        <div className={styles.worldGrid}>
          <div className={styles.stageWrap}>
            <div
              ref={stageRef}
              className={styles.stage}
              data-reduced={reducedMotion ? "true" : "false"}
              tabIndex={0}
              role="application"
              aria-label="Spillbar verden. Bruk WASD eller piltaster for å gå, mellomrom for å trene, J for journal. All informasjon finnes også i journalen."
              onMouseDown={() => stageRef.current?.focus()}
            >
              {/* ground texture + ambient juice */}
              <div className={styles.ground} aria-hidden="true">
                {!reducedMotion &&
                  Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className={styles.grass}
                      style={{
                        left: `${((i * 67) % 96) + 2}%`,
                        top: `${((i * 41) % 86) + 8}%`,
                        animationDelay: `${(i % 5) * 0.4}s`,
                      }}
                    />
                  ))}
              </div>

              {/* trail between gyms */}
              <svg
                className={styles.trail}
                viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {gymPath.map(([a, b]) => (
                  <line
                    key={`${a}-${b}`}
                    x1={gyms[a].pos.x}
                    y1={gyms[a].pos.y}
                    x2={gyms[b].pos.x}
                    y2={gyms[b].pos.y}
                    className={styles.trailLine}
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* gyms */}
              {gyms.map((g) => {
                const state = gymState(g, visited);
                return (
                  <button
                    key={g.id}
                    type="button"
                    className={styles.gym}
                    data-state={state}
                    data-near={nearbyId === g.id ? "true" : "false"}
                    data-selected={selectedId === g.id ? "true" : "false"}
                    data-training={trainingId === g.id ? "true" : "false"}
                    aria-label={`${g.worldName} — ${g.title}. ${
                      state === "visited"
                        ? "Besøkt."
                        : state === "quest"
                          ? "Neste oppdrag."
                          : "Klar til trening."
                    } ${g.actionLabel}.`}
                    style={{
                      left: `${(g.pos.x / WORLD_W) * 100}%`,
                      top: `${(g.pos.y / WORLD_H) * 100}%`,
                    }}
                    onClick={() => {
                      select(g.id);
                      stageRef.current?.focus();
                    }}
                  >
                    <Landmark gym={g} />
                    <span className={styles.gymName}>{g.worldName}</span>
                    {state === "visited" && (
                      <span className={styles.gymCheck} aria-hidden="true" />
                    )}
                    {trainingId === g.id && (
                      <span className={styles.burst} aria-hidden="true">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <span
                            key={i}
                            className={styles.spark}
                            style={{ ["--i" as string]: i }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}

              {/* avatar */}
              <div
                ref={avatarRef}
                className={styles.avatar}
                data-facing={facing}
                data-moving={moving ? "true" : "false"}
                data-up-terminal={upTerminal ? "true" : "false"}
                data-up-prototype={upPrototype ? "true" : "false"}
                data-up-leaf={upLeaf ? "true" : "false"}
                data-up-agent={upAgent ? "true" : "false"}
                aria-hidden="true"
              >
                <span className={styles.avatarShadow} />
                <span className={styles.avatarBody}>
                  <span className={styles.avatarFace} />
                  <span className={styles.avatarPointer} />
                </span>
              </div>

              {/* proximity popover */}
              {nearby && popoverPlacement && (
                <div
                  className={styles.popover}
                  data-portal={nearby.kind === "portal" ? "true" : "false"}
                  data-v={popoverPlacement.vertical}
                  style={{
                    ["--pop-x" as string]: `${popoverPlacement.xPct}%`,
                    ["--pop-y" as string]: `${popoverPlacement.yPct}%`,
                  }}
                  aria-hidden="true"
                >
                  <p className={styles.popName}>{nearby.worldName}</p>
                  <p className={styles.popTheme}>{nearby.trainingTheme}</p>
                  <p className={styles.popHint}>
                    <kbd>Space</kbd> {nearby.actionLabel}
                  </p>
                </div>
              )}

              {/* unlock toast */}
              {toast && (
                <div className={styles.toast} role="status">
                  {toast}
                </div>
              )}

              {/* start hint */}
              {!started && (
                <div className={styles.startHint} aria-hidden="true">
                  <span className={styles.startKeys}>WASD / piltaster</span>
                  <span>Gå inn i verden</span>
                </div>
              )}

              {/* touch D-pad (shown on coarse pointers via CSS) */}
              <div className={styles.dpad} aria-hidden="true">
                {(["up", "left", "right", "down"] as Dir[]).map((dir) => (
                  <button
                    key={dir}
                    type="button"
                    className={styles.dpadBtn}
                    data-dir={dir}
                    tabIndex={-1}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      press(dir);
                    }}
                    onPointerUp={() => release(dir)}
                    onPointerLeave={() => release(dir)}
                    onPointerCancel={() => release(dir)}
                  >
                    <span aria-hidden="true" />
                  </button>
                ))}
              </div>

              {/* ---- Detail dock (overlay panel inside the world) ---- */}
              <aside
                className={styles.dock}
                data-open={selected ? "true" : "false"}
                aria-hidden={selected ? "false" : "true"}
                aria-label="Detaljer om valgt sted"
                onKeyDown={onDockKeyDown}
              >
                {selected && (
                  <div className={styles.dockBody}>
                    <div className={styles.dockHead}>
                      <p className={styles.dockArea}>{selected.worldName}</p>
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

                    {/* Compact essentials first */}
                    <p className={styles.dockKey}>
                      <span className={styles.dockTag} data-unlock="true">
                        Låser opp
                      </span>
                      {selected.unlockName}
                    </p>
                    <p className={styles.dockKey}>
                      <span className={styles.dockTag} data-vgx="true">
                        VG X
                      </span>
                      {selected.vgxRelevance}
                    </p>
                    <p className={styles.dockFlavor}>
                      <span className={styles.dockTag} data-flavor="true">
                        Utforskning
                      </span>
                      {selected.actionLabel}
                    </p>

                    <div className={styles.dockActions}>
                      {selected.kind === "portal" && (
                        <button
                          type="button"
                          className={styles.dockPortalAction}
                          onClick={() => openJournal("kontakt")}
                        >
                          Åpne kontakt
                        </button>
                      )}
                      <button
                        type="button"
                        className={styles.dockMore}
                        aria-expanded={dockExpanded}
                        onClick={() => setDockExpanded((v) => !v)}
                      >
                        {dockExpanded ? "Skjul detaljer" : "Les mer"}
                      </button>
                    </div>

                    {/* Detailed text behind an expanded state */}
                    {dockExpanded && (
                      <div className={styles.dockDetails}>
                        <p className={styles.dockBlock}>
                          <span className={styles.dockTag}>Hva dette var</span>
                          {selected.whatItWas}
                        </p>
                        <p className={styles.dockBlock}>
                          <span className={styles.dockTag} data-learn="true">
                            Hva jeg lærte
                          </span>
                          {selected.learned}
                        </p>

                        {Object.keys(selected.energies).length > 0 && (
                          <p className={styles.dockEnergies}>
                            {(Object.keys(selected.energies) as Energy[]).map(
                              (key) => (
                                <span
                                  key={key}
                                  className={styles.dockEnergyChip}
                                >
                                  {energyMeta[key].label} +
                                  {selected.energies[key]}
                                </span>
                              ),
                            )}
                          </p>
                        )}

                        {selected.caseRefs.length > 0 && (
                          <p className={styles.dockLinks}>
                            {selected.caseRefs.map((ref) => (
                              <button
                                key={ref}
                                type="button"
                                className={styles.dockLink}
                                onClick={() => openJournal("bevis", ref)}
                              >
                                Se {caseRefLabels[ref]}
                                <span
                                  className={styles.linkArrow}
                                  aria-hidden="true"
                                />
                              </button>
                            ))}
                          </p>
                        )}

                        {selected.kind === "portal" && (
                          <ul className={styles.dockNeeds}>
                            {fitScan.needs.map((need) => (
                              <li key={need.id}>
                                <span
                                  className={styles.fitBadge}
                                  data-fit={need.fit}
                                >
                                  {fitLevelLabels[need.fit]}
                                </span>
                                <span>{need.label}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        <p className={styles.dockNext}>
                          <span className={styles.dockTag} data-next="true">
                            Neste steg
                          </span>
                          {selected.nextStep}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </aside>
            </div>

            <p className={styles.hint}>
              <span className={styles.hintKey}>WASD</span>/
              <span className={styles.hintKey}>piler</span> gå ·{" "}
              <span className={styles.hintKey}>Space</span> tren ·{" "}
              <span className={styles.hintKey}>Esc</span> lukk ·{" "}
              <span className={styles.hintKey}>J</span> journal · eller klikk et
              sted.
            </p>
          </div>

          {/* ---- Journal overlay (in-game, no page scroll) ---- */}
          {journalOpen && (
            <div
              id="world-journal"
              className={styles.journalModal}
              role="dialog"
              aria-modal="true"
              aria-label="Journal — oversikt over reisen"
              onKeyDown={onJournalKeyDown}
            >
              <button
                type="button"
                className={styles.journalBackdrop}
                aria-label="Lukk journal"
                tabIndex={-1}
                onClick={closeJournal}
              />
              <div className={styles.journalPanel}>
                <header className={styles.journalTop}>
                  <div
                    className={styles.journalTabs}
                    role="tablist"
                    aria-label="Journal-faner"
                  >
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={journalTab === tab.id}
                        className={styles.journalTab}
                        data-active={journalTab === tab.id ? "true" : "false"}
                        onClick={() => {
                          setJournalTab(tab.id);
                          setBevisFocus(null);
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                  <button
                    ref={journalCloseRef}
                    type="button"
                    className={styles.journalClose}
                    onClick={closeJournal}
                    aria-label="Lukk journal"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </header>

                <div
                  ref={journalContentRef}
                  className={styles.journalContent}
                  role="tabpanel"
                >
                  {journalTab === "reise" && (
                    <>
                      <p className={styles.journalIntro}>
                        Hele reisen som steder i verden. Hopp rett til et sted —
                        avataren går dit selv.
                      </p>
                      <ol className={styles.journalList}>
                        {gyms.map((g) => {
                          const state = gymState(g, visited);
                          return (
                            <li key={g.id}>
                              <button
                                type="button"
                                className={styles.journalEntry}
                                data-state={state}
                                aria-current={
                                  selectedId === g.id ? "true" : undefined
                                }
                                onClick={() => {
                                  select(g.id);
                                  closeJournal();
                                }}
                              >
                                <span
                                  className={styles.journalDot}
                                  aria-hidden="true"
                                />
                                <span className={styles.journalEntryText}>
                                  <span className={styles.journalName}>
                                    {g.worldName}
                                  </span>
                                  <span className={styles.journalSub}>
                                    {g.title}
                                  </span>
                                  {state !== "quest" && (
                                    <span className={styles.journalUnlock}>
                                      {visited.has(g.id)
                                        ? `Låst opp: ${g.unlockName}`
                                        : g.unlockName}
                                    </span>
                                  )}
                                </span>
                                <span
                                  className={styles.journalBadge}
                                  data-state={state}
                                >
                                  {state === "visited"
                                    ? "Besøkt"
                                    : state === "quest"
                                      ? "Neste oppdrag"
                                      : "Klar til trening"}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ol>
                    </>
                  )}

                  {journalTab === "bevis" && (
                    <>
                      <p className={styles.journalIntro}>
                        De faktiske prosjektene bak stedene i verden —
                        kortversjon.
                      </p>
                      <ul className={styles.bevisList}>
                        {bevisCases.map((c) => (
                          <li
                            key={c.id}
                            className={styles.bevisItem}
                            data-focus={bevisFocus === c.id ? "true" : "false"}
                          >
                            <h4
                              className={styles.bevisTitle}
                              data-case={c.id}
                              tabIndex={-1}
                            >
                              {c.title}
                            </h4>
                            <p className={styles.bevisType}>
                              {c.type}
                              {c.role ? ` · ${c.role}` : ""}
                            </p>
                            <p className={styles.bevisPitch}>{c.pitch}</p>
                            {isLiveLink(c.link) && (
                              <a
                                className={styles.bevisLink}
                                href={c.link}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Åpne live
                                <span
                                  className={styles.linkArrow}
                                  aria-hidden="true"
                                />
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {journalTab === "vgx" && (
                    <>
                      <p className={styles.journalIntro}>
                        De fire behovene VG X bygger for — og hvorfor reisen
                        treffer dem.
                      </p>
                      <ul className={styles.needList}>
                        {fitScan.needs.map((need) => (
                          <li key={need.id} className={styles.needItem}>
                            <div className={styles.needHead}>
                              <span className={styles.needLabel}>
                                {need.label}
                              </span>
                              <span
                                className={styles.fitBadge}
                                data-fit={need.fit}
                              >
                                {fitLevelLabels[need.fit]}
                              </span>
                            </div>
                            <p className={styles.needMeaning}>
                              {need.vgxMeaning}
                            </p>
                            <p className={styles.needWhy}>{need.whyStian}</p>
                          </li>
                        ))}
                      </ul>
                      <p className={styles.journalNext}>
                        Neste anbefalte stopp: <strong>{nextStop}</strong>
                      </p>
                    </>
                  )}

                  {journalTab === "kontakt" && (
                    <>
                      <p className={styles.journalIntro}>
                        Vil du ta praten videre? Her er veiene inn — og en demo
                        som faktisk kjører.
                      </p>
                      <ul className={styles.kontaktLinks}>
                        {footer.links.map((item) => (
                          <li key={item.label}>
                            <CaseLink href={item.href} label={item.label} />
                          </li>
                        ))}
                      </ul>
                      <p className={styles.kontaktNote}>
                        {footer.humorPlaceholder}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <p className={styles.fallback}>
          Foretrekker du en vanlig, scrollbar portefølje? Bytt til{" "}
          <strong>Profesjonell</strong> modus øverst på siden — samme person, to
          tonefall.
        </p>
      </div>
    </section>
  );
}
