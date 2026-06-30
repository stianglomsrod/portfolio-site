"use client";

import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import { GameBridge } from "./engine/bridge";
import { wireCommands } from "./engine/commands";
import { makeConfig } from "./engine/config";
import { GameRuntime } from "./engine/runtime";
import { BootScene } from "./engine/scenes/BootScene";
import { WorldScene } from "./engine/scenes/WorldScene";
import { DEFAULT_PACK_ID, PACKS } from "./content";
import GameUI from "./ui/GameUI";
import styles from "../skamlos-rpg.module.css";

const BASE_W = 480;
const BASE_H = 320;

export default function GameMount() {
  const parentRef = useRef<HTMLDivElement>(null);
  const pack = PACKS[DEFAULT_PACK_ID];
  // Stable singletons created once (lazy initialisers, never during re-render).
  const [bridge] = useState(() => new GameBridge());
  const [runtime] = useState(() => new GameRuntime(pack, bridge));

  useEffect(() => {
    if (!parentRef.current) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const game = new Phaser.Game(
      makeConfig({
        parent: parentRef.current,
        width: BASE_W,
        height: BASE_H,
        backgroundColor: pack.meta.theme.bg,
        scenes: [BootScene, WorldScene],
        reducedMotion: !!reduced,
      }),
    );

    const hasProgress =
      runtime.state.completedQuests.length > 0 ||
      runtime.state.currentMap !== pack.meta.startMap;

    game.registry.set("pack", pack);
    game.registry.set("runtime", runtime);
    game.registry.set("bridge", bridge);
    game.registry.set("reducedMotion", !!reduced);
    game.registry.set("startMap", runtime.state.currentMap);
    game.registry.set("startSpawn", hasProgress ? "__resume__" : pack.meta.startSpawn);
    game.registry.set("phase", "start");

    const unwire = wireCommands(runtime, bridge, {
      restart: () => {
        game.registry.set("startMap", pack.meta.startMap);
        game.registry.set("startSpawn", pack.meta.startSpawn);
        game.registry.set("phase", "start");
        game.scene.getScene("WorldScene")?.scene.stop();
        game.scene.start("BootScene");
      },
    });

    return () => {
      unwire();
      game.destroy(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.stage}>
      <div className={styles.canvasFrame}>
        <div ref={parentRef} className={styles.canvasParent} />
        <GameUI bridge={bridge} runtime={runtime} pack={pack} />
      </div>
    </div>
  );
}
