"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../state/GameContext";
import { isGateOpen } from "../state/gameReducer";
import { DNB_GATE, GATE_CHECKS } from "../data/world";
import styles from "./world.module.css";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function DnbGate() {
  const portal = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const { state, activeTarget, lang } = useGame();

  const open = isGateOpen(state);
  const active = activeTarget?.id === DNB_GATE.id;
  const [x, z] = DNB_GATE.position;
  const passed = GATE_CHECKS.filter((c) =>
    state.skills.includes(c.skill),
  ).length;

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (portal.current) {
      const mat = portal.current.material as THREE.MeshBasicMaterial;
      const base = open ? 0.55 : 0.22;
      mat.opacity = reduced
        ? base
        : base + Math.sin(t * 2.2) * (open ? 0.18 : 0.06);
    }
    if (ring.current && open && !reduced) {
      ring.current.rotation.z = t * 0.8;
    }
  });

  const portalColor = open ? "#7cf0ff" : "#2c4a72";

  return (
    <group position={[x, 0, z]}>
      {/* Pillars */}
      {[-3.4, 3.4].map((px) => (
        <mesh key={px} position={[px, 3.6, 0]} castShadow>
          <boxGeometry args={[0.9, 7.2, 0.9]} />
          <meshStandardMaterial
            color="#0f1822"
            emissive={DNB_GATE.color}
            emissiveIntensity={open ? 1.1 : 0.4}
            roughness={0.4}
            metalness={0.5}
          />
        </mesh>
      ))}
      {/* Lintel */}
      <mesh position={[0, 7.4, 0]}>
        <boxGeometry args={[8.4, 0.9, 0.9]} />
        <meshStandardMaterial
          color="#0f1822"
          emissive={DNB_GATE.color}
          emissiveIntensity={open ? 1.1 : 0.4}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Base platform */}
      <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.0, 6.0, 64]} />
        <meshBasicMaterial
          color={DNB_GATE.color}
          transparent
          opacity={open ? 0.7 : 0.25}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Portal field */}
      <mesh ref={portal} position={[0, 3.6, 0]}>
        <planeGeometry args={[6.4, 6.8]} />
        <meshBasicMaterial
          color={portalColor}
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Spinning ring (only meaningful when open) */}
      {open && (
        <mesh ref={ring} position={[0, 3.6, 0.1]}>
          <torusGeometry args={[2.4, 0.12, 12, 64]} />
          <meshBasicMaterial
            color="#aef4ff"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      <pointLight
        position={[0, 4, 1.5]}
        color={DNB_GATE.color}
        intensity={open ? 22 : 8}
        distance={20}
        decay={2}
      />

      {active && (
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[6.0, 6.5, 64]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      <Html
        position={[0, 8.6, 0]}
        center
        distanceFactor={22}
        zIndexRange={[20, 0]}
        prepend
      >
        <div className={styles.label}>
          <div className={styles.gateLabel}>{DNB_GATE.title[lang]}</div>
          <div
            className={`${styles.status} ${open ? styles.statusDone : styles.statusOpen}`}
          >
            {open
              ? lang === "no"
                ? "✦ Klar til levering"
                : "✦ Ready to deliver"
              : `${passed}/${GATE_CHECKS.length} ${lang === "no" ? "sjekker bestått" : "checks passed"}`}
          </div>
        </div>
      </Html>
    </group>
  );
}
