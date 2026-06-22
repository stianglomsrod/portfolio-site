"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../state/GameContext";
import {
  isQuestUnlocked,
  isQuestComplete,
  isGateOpen,
} from "../state/gameReducer";
import { QUESTS } from "../data/quests";
import { EASTER_EGGS } from "../data/easterEggs";
import { PLACED_ARTIFACTS } from "./placement";
import {
  ACCEL,
  DECEL,
  DNB_GATE,
  EYE_HEIGHT,
  INTERACT_RADIUS,
  SPAWN,
  SPRINT_MULT,
  WALK_SPEED,
  WORLD_BOUND,
} from "../data/world";
import type { ActiveTarget } from "../state/types";

interface ScanTarget {
  id: string;
  kind: ActiveTarget["kind"];
  x: number;
  z: number;
  radius: number;
  locked: boolean;
  action: ActiveTarget["action"];
}

const UP = new THREE.Vector3(0, 1, 0);

interface PlayerProps {
  lockedRef: RefObject<boolean>;
}

export default function Player({ lockedRef }: PlayerProps) {
  const { camera } = useThree();
  const { state, setActiveTarget } = useGame();

  const keys = useRef<Record<string, boolean>>({});
  const velocity = useRef(new THREE.Vector3());
  const bobPhase = useRef(0);
  const reducedMotion = useRef(false);

  // Pause movement when not in free play (modal/panel open, start, or won).
  const paused = state.phase !== "playing" || state.overlay !== null;

  // Spawn the camera once.
  useEffect(() => {
    camera.position.set(SPAWN[0], EYE_HEIGHT, SPAWN[1]);
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, [camera]);

  // Keyboard movement input.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.code] = true;
    };
    const up = (e: KeyboardEvent) => {
      keys.current[e.code] = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  // Build the interactable target list from current state.
  const targets = useMemo<ScanTarget[]>(() => {
    const list: ScanTarget[] = [];

    for (const quest of QUESTS) {
      const locked = !isQuestUnlocked(state, quest.id);
      const complete = isQuestComplete(state, quest.id);
      list.push({
        id: quest.id,
        kind: "quest",
        x: quest.position[0],
        z: quest.position[1],
        radius: INTERACT_RADIUS,
        locked,
        action: complete
          ? { no: "Se igjen", en: "Revisit" }
          : locked
            ? { no: "Låst sone", en: "Locked zone" }
            : { no: "Aktiver", en: "Activate" },
      });
    }

    for (const p of PLACED_ARTIFACTS) {
      if (!state.revealedArtifacts.includes(p.id)) continue;
      if (state.collectedArtifacts.includes(p.id)) continue;
      list.push({
        id: `artifact:${p.id}`,
        kind: "artifact",
        x: p.pos[0],
        z: p.pos[2],
        radius: INTERACT_RADIUS,
        locked: false,
        action: { no: "Samle bevis", en: "Collect evidence" },
      });
    }

    for (const egg of EASTER_EGGS) {
      if (state.foundEggs.includes(egg.id)) continue;
      list.push({
        id: `egg:${egg.id}`,
        kind: "egg",
        x: egg.position[0],
        z: egg.position[2],
        radius: INTERACT_RADIUS,
        locked: false,
        action: { no: "Undersøk", en: "Inspect" },
      });
    }

    const gateOpen = isGateOpen(state);
    list.push({
      id: DNB_GATE.id,
      kind: "gate",
      x: DNB_GATE.position[0],
      z: DNB_GATE.position[1],
      radius: INTERACT_RADIUS + 1.4,
      locked: !gateOpen,
      action: gateOpen
        ? { no: "Lever søknadspakken", en: "Deliver application package" }
        : { no: "Sjekk porten", en: "Check the gate" },
    });

    return list;
  }, [state]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05); // clamp to avoid tunnelling on lag spikes
    const locked = lockedRef.current && !paused;

    // ---- movement ----
    const k = keys.current;
    let moveZ = 0;
    let moveX = 0;
    if (locked) {
      if (k["KeyW"] || k["ArrowUp"]) moveZ += 1;
      if (k["KeyS"] || k["ArrowDown"]) moveZ -= 1;
      if (k["KeyD"] || k["ArrowRight"]) moveX += 1;
      if (k["KeyA"] || k["ArrowLeft"]) moveX -= 1;
    }

    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, UP).normalize();

    const desired = new THREE.Vector3()
      .addScaledVector(forward, moveZ)
      .addScaledVector(right, moveX);
    if (desired.lengthSq() > 1) desired.normalize();

    const sprint = k["ShiftLeft"] || k["ShiftRight"] ? SPRINT_MULT : 1;
    desired.multiplyScalar(WALK_SPEED * sprint);

    const moving = desired.lengthSq() > 0.001;
    const rate = moving ? ACCEL : DECEL;
    const smooth = 1 - Math.exp(-rate * dt);
    velocity.current.x += (desired.x - velocity.current.x) * smooth;
    velocity.current.z += (desired.z - velocity.current.z) * smooth;

    camera.position.x += velocity.current.x * dt;
    camera.position.z += velocity.current.z * dt;

    // Clamp to the playfield.
    camera.position.x = THREE.MathUtils.clamp(
      camera.position.x,
      -WORLD_BOUND,
      WORLD_BOUND,
    );
    camera.position.z = THREE.MathUtils.clamp(
      camera.position.z,
      -WORLD_BOUND,
      WORLD_BOUND,
    );

    // Subtle head bob while moving (skipped for reduced motion).
    if (!reducedMotion.current) {
      const speed = velocity.current.length();
      bobPhase.current += dt * speed * 1.1;
      const bob =
        Math.sin(bobPhase.current) * Math.min(speed, WALK_SPEED) * 0.006;
      camera.position.y = EYE_HEIGHT + bob;
    } else {
      camera.position.y = EYE_HEIGHT;
    }

    // ---- interaction scan ----
    let best: ScanTarget | null = null;
    let bestDist = Infinity;
    for (const t of targets) {
      const dx = camera.position.x - t.x;
      const dz = camera.position.z - t.z;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d <= t.radius && d < bestDist) {
        best = t;
        bestDist = d;
      }
    }
    setActiveTarget(
      best
        ? {
            id: best.id,
            kind: best.kind,
            action: best.action,
            locked: best.locked,
          }
        : null,
    );
  });

  return null;
}
