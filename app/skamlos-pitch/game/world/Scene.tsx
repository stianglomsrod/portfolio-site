"use client";

import { type ComponentRef, type RefObject } from "react";
import { PointerLockControls } from "@react-three/drei";
import { useGame } from "../state/GameContext";
import { QUESTS } from "../data/quests";
import { EASTER_EGGS } from "../data/easterEggs";
import { PLACED_ARTIFACTS } from "./placement";
import Player from "./Player";
import Decor from "./Decor";
import Zone from "./Zone";
import ArtifactPickup from "./ArtifactPickup";
import EggPickup from "./EasterEggs";
import DnbGate from "./DnbGate";

export type PlcRef = ComponentRef<typeof PointerLockControls>;

interface SceneProps {
  controlsRef: RefObject<PlcRef | null>;
  lockedRef: RefObject<boolean>;
  onLockChange: (locked: boolean) => void;
}

export default function Scene({ controlsRef, lockedRef, onLockChange }: SceneProps) {
  const { state } = useGame();

  return (
    <>
      <color attach="background" args={["#0a0c10"]} />
      <fogExp2 attach="fog" args={["#0a0c10", 0.017]} />

      <ambientLight intensity={0.35} color="#9fb6d6" />
      <hemisphereLight args={["#2b3d57", "#05070a", 0.5]} />
      <directionalLight position={[12, 24, 8]} intensity={0.3} color="#cfe0ff" />

      <Decor />

      {QUESTS.map((q) => (
        <Zone key={q.id} quest={q} />
      ))}

      {PLACED_ARTIFACTS.filter(
        (p) =>
          state.revealedArtifacts.includes(p.id) &&
          !state.collectedArtifacts.includes(p.id),
      ).map((p) => (
        <ArtifactPickup key={p.id} id={p.id} pos={p.pos} color={p.color} />
      ))}

      {EASTER_EGGS.filter((e) => !state.foundEggs.includes(e.id)).map((e) => (
        <EggPickup key={e.id} egg={e} />
      ))}

      <DnbGate />

      <Player lockedRef={lockedRef} />

      <PointerLockControls
        ref={controlsRef}
        onLock={() => {
          lockedRef.current = true;
          onLockChange(true);
        }}
        onUnlock={() => {
          lockedRef.current = false;
          onLockChange(false);
        }}
      />
    </>
  );
}
