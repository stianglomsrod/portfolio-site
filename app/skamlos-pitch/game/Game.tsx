"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { GameContext, useGameController } from "./state/GameContext";
import { gateMissingSkills } from "./state/gameReducer";
import { EYE_HEIGHT } from "./data/world";
import type { GameContextValue } from "./state/GameContext";
import Scene, { type PlcRef } from "./world/Scene";
import StartScreen from "./ui/StartScreen";
import Hud from "./ui/Hud";
import QuestModal from "./ui/QuestModal";
import ArtifactModal from "./ui/ArtifactModal";
import EggModal from "./ui/EggModal";
import QuestLog from "./ui/QuestLog";
import SkillTree from "./ui/SkillTree";
import GateLockedModal from "./ui/GateLockedModal";
import Endgame from "./ui/Endgame";
import Fallback from "./ui/Fallback";
import styles from "../skamlos-pitch.module.css";

/** Acts on the currently focused target (the E key / interaction). */
function interact(value: GameContextValue) {
  const at = value.activeTarget;
  if (!at) return;
  switch (at.kind) {
    case "quest":
      value.dispatch({ type: "OPEN_OVERLAY", overlay: { type: "quest", id: at.id } });
      break;
    case "artifact":
      value.dispatch({
        type: "OPEN_OVERLAY",
        overlay: { type: "artifact", id: at.id.replace("artifact:", "") },
      });
      break;
    case "egg": {
      const eggId = at.id.replace("egg:", "");
      value.dispatch({ type: "FIND_EGG", eggId });
      value.dispatch({ type: "OPEN_OVERLAY", overlay: { type: "egg", id: eggId } });
      break;
    }
    case "gate":
      if (!at.locked) {
        value.dispatch({ type: "WIN" });
      } else {
        value.dispatch({
          type: "OPEN_OVERLAY",
          overlay: { type: "gate-locked", missing: gateMissingSkills(value.state) },
        });
      }
      break;
  }
}

export default function Game({ webglSupported }: { webglSupported: boolean }) {
  const value = useGameController();
  const controlsRef = useRef<PlcRef | null>(null);
  const lockedRef = useRef(false);
  const [locked, setLocked] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Keep the latest controller value in a ref so the global key listener stays
  // stable but always sees fresh state. Synced in an effect (after commit) so we
  // never read/write the ref during render.
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  });

  const closeOverlay = useCallback(() => {
    valueRef.current.dispatch({ type: "CLOSE_OVERLAY" });
  }, []);

  const handlePlay = useCallback(() => {
    value.dispatch({ type: "START" });
    controlsRef.current?.lock();
  }, [value]);

  const handleResume = useCallback(() => {
    controlsRef.current?.lock();
  }, []);

  const handleReplay = useCallback(() => {
    value.dispatch({ type: "RESET" });
    controlsRef.current?.lock();
  }, [value]);

  // Global keyboard controls (E interact, Q log, K skills, Esc close).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const v = valueRef.current;
      if (v.state.phase !== "playing") return;
      const key = e.key.toLowerCase();
      if (key === "escape") {
        if (v.state.overlay) {
          e.preventDefault();
          v.dispatch({ type: "CLOSE_OVERLAY" });
        }
        return;
      }
      if (key === "q") {
        v.dispatch(
          v.state.overlay?.type === "log"
            ? { type: "CLOSE_OVERLAY" }
            : { type: "OPEN_OVERLAY", overlay: { type: "log" } },
        );
        return;
      }
      if (key === "k") {
        v.dispatch(
          v.state.overlay?.type === "skills"
            ? { type: "CLOSE_OVERLAY" }
            : { type: "OPEN_OVERLAY", overlay: { type: "skills" } },
        );
        return;
      }
      if (key === "e") {
        if (v.state.overlay) return;
        e.preventDefault();
        interact(v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Release the pointer lock whenever a modal/panel opens, so the cursor is
  // free to click it.
  useEffect(() => {
    if (value.state.overlay !== null && lockedRef.current) {
      controlsRef.current?.unlock();
    }
  }, [value.state.overlay]);

  if (!webglSupported) return <Fallback />;
  if (showFallback) return <Fallback onBack={() => setShowFallback(false)} />;

  const { phase, overlay } = value.state;

  return (
    <GameContext.Provider value={value}>
      <div className={styles.root}>
        <div className={styles.canvasWrap}>
          <Canvas
            camera={{ fov: 72, near: 0.1, far: 200, position: [0, EYE_HEIGHT, 8] }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, powerPreference: "high-performance" }}
          >
            <GameContext.Provider value={value}>
              <Scene
                controlsRef={controlsRef}
                lockedRef={lockedRef}
                onLockChange={setLocked}
              />
            </GameContext.Provider>
          </Canvas>
        </div>

        {phase === "start" && (
          <StartScreen onPlay={handlePlay} onShowFallback={() => setShowFallback(true)} />
        )}

        {phase === "won" && <Endgame onReplay={handleReplay} />}

        {phase === "playing" && (
          <>
            <Hud
              locked={locked}
              onOpenLog={() =>
                value.dispatch({ type: "OPEN_OVERLAY", overlay: { type: "log" } })
              }
              onOpenSkills={() =>
                value.dispatch({ type: "OPEN_OVERLAY", overlay: { type: "skills" } })
              }
              onResume={handleResume}
            />

            {overlay?.type === "quest" && (
              <QuestModal questId={overlay.id} onClose={closeOverlay} />
            )}
            {overlay?.type === "artifact" && (
              <ArtifactModal artifactId={overlay.id} onClose={closeOverlay} />
            )}
            {overlay?.type === "egg" && (
              <EggModal eggId={overlay.id} onClose={closeOverlay} />
            )}
            {overlay?.type === "log" && <QuestLog onClose={closeOverlay} />}
            {overlay?.type === "skills" && <SkillTree onClose={closeOverlay} />}
            {overlay?.type === "gate-locked" && (
              <GateLockedModal missing={overlay.missing} onClose={closeOverlay} />
            )}
          </>
        )}
      </div>
    </GameContext.Provider>
  );
}
