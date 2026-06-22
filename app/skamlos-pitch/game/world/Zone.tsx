"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../state/GameContext";
import { isQuestComplete, isQuestUnlocked } from "../state/gameReducer";
import { PLATFORM_RADIUS } from "../data/world";
import type { Quest } from "../state/types";
import styles from "./world.module.css";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Zone({ quest }: { quest: Quest }) {
  const { state, activeTarget, lang } = useGame();
  const monolith = useRef<THREE.Mesh>(null);
  const beam = useRef<THREE.Mesh>(null);

  const [x, z] = quest.position;
  const locked = !isQuestUnlocked(state, quest.id);
  const complete = isQuestComplete(state, quest.id);
  const active = activeTarget?.id === quest.id;

  const color = useMemo(() => new THREE.Color(quest.color), [quest.color]);

  useFrame((stateThree) => {
    const t = stateThree.clock.elapsedTime;
    if (monolith.current && !reduced) {
      monolith.current.rotation.y = t * 0.5;
      monolith.current.position.y = 2.1 + Math.sin(t * 1.5 + x) * 0.12;
    }
    if (beam.current) {
      const mat = beam.current.material as THREE.MeshBasicMaterial;
      const base = complete ? 0.32 : locked ? 0.05 : 0.16;
      mat.opacity = reduced ? base : base + Math.sin(t * 2 + z) * 0.05;
    }
  });

  const monolithColor = locked ? "#33404d" : quest.color;
  const monolithEmissive = locked ? "#1a2530" : quest.color;
  const monolithIntensity = complete ? 1.2 : locked ? 0.25 : 0.7;

  const statusClass = complete
    ? styles.statusDone
    : locked
      ? styles.statusLocked
      : styles.statusOpen;
  const statusText = complete
    ? lang === "no"
      ? "✓ Fullført"
      : "✓ Completed"
    : locked
      ? lang === "no"
        ? "🔒 Låst"
        : "🔒 Locked"
      : lang === "no"
        ? "● Tilgjengelig"
        : "● Available";

  return (
    <group position={[x, 0, z]}>
      {/* Platform */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry
          args={[PLATFORM_RADIUS, PLATFORM_RADIUS + 0.4, 0.2, 48]}
        />
        <meshStandardMaterial
          color="#11161c"
          emissive={monolithEmissive}
          emissiveIntensity={complete ? 0.35 : locked ? 0.05 : 0.16}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      {/* Glowing rim ring */}
      <mesh position={[0, 0.22, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[PLATFORM_RADIUS - 0.15, PLATFORM_RADIUS + 0.05, 64]}
        />
        <meshBasicMaterial
          color={quest.color}
          transparent
          opacity={complete ? 0.9 : locked ? 0.18 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Active highlight pulse */}
      {active && (
        <mesh position={[0, 0.24, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry
            args={[PLATFORM_RADIUS + 0.2, PLATFORM_RADIUS + 0.55, 64]}
          />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.55}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Light beam */}
      <mesh ref={beam} position={[0, 6, 0]}>
        <cylinderGeometry args={[0.18, 0.5, 12, 16, 1, true]} />
        <meshBasicMaterial
          color={quest.color}
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Interactable monolith / terminal */}
      <mesh ref={monolith} position={[0, 2.1, 0]} castShadow>
        <octahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial
          color={monolithColor}
          emissive={monolithEmissive}
          emissiveIntensity={monolithIntensity}
          roughness={0.25}
          metalness={0.4}
          flatShading
        />
      </mesh>

      {/* Coloured fill light */}
      <pointLight
        position={[0, 3, 0]}
        color={color}
        intensity={complete ? 14 : locked ? 2 : 7}
        distance={16}
        decay={2}
      />

      {/* Access barrier (visual lock cue; not a physical wall) */}
      {locked && (
        <mesh position={[0, 1.7, PLATFORM_RADIUS + 0.1]}>
          <planeGeometry args={[PLATFORM_RADIUS * 1.9, 3.2]} />
          <meshBasicMaterial
            color="#ff5b5b"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Floating label */}
      <Html
        position={[0, 4.4, 0]}
        center
        distanceFactor={16}
        zIndexRange={[20, 0]}
        prepend
      >
        <div className={styles.label}>
          <div className={styles.kicker}>{quest.kicker[lang]}</div>
          <div className={styles.title}>{quest.title[lang]}</div>
          <div className={`${styles.status} ${statusClass}`}>{statusText}</div>
        </div>
      </Html>
    </group>
  );
}
