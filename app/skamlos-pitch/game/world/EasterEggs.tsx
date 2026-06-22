"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../state/GameContext";
import type { EasterEgg } from "../state/types";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function EggPickup({ egg }: { egg: EasterEgg }) {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Group>(null);
  const rightWing = useRef<THREE.Group>(null);
  const { activeTarget } = useGame();
  const active = activeTarget?.id === `egg:${egg.id}`;
  const [ax, ay, az] = egg.position;

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    if (!group.current) return;

    if (egg.kind === "flutterfly") {
      // Drift along a gentle lissajous loop around the anchor.
      group.current.position.set(
        ax + Math.sin(t * 0.6) * 2.4,
        ay + Math.sin(t * 1.3) * 0.5,
        az + Math.cos(t * 0.5) * 2.0,
      );
      const flap = reduced ? 0.5 : Math.sin(t * 9) * 0.7 + 0.4;
      if (leftWing.current) leftWing.current.rotation.y = flap;
      if (rightWing.current) rightWing.current.rotation.y = -flap;
      group.current.rotation.y = Math.atan2(
        Math.cos(t * 0.6) * 2.4 * 0.6,
        -Math.sin(t * 0.5) * 2.0 * 0.5,
      );
    } else if (!reduced) {
      group.current.rotation.y = t * (egg.kind === "egg" ? 0.6 : 0.0);
      group.current.position.y =
        ay + Math.sin(t * 2 + ax) * (egg.kind === "duck" ? 0.12 : 0.06);
    }
  });

  const glow = active ? 2.2 : 1.3;

  return (
    <group ref={group} position={egg.position}>
      {egg.kind === "flutterfly" && (
        <>
          <mesh>
            <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
            <meshStandardMaterial
              color="#0e2630"
              emissive={egg.color}
              emissiveIntensity={0.6}
            />
          </mesh>
          <group ref={leftWing} position={[0, 0.05, 0]}>
            <mesh position={[-0.28, 0, 0]}>
              <planeGeometry args={[0.55, 0.42]} />
              <meshStandardMaterial
                color={egg.color}
                emissive={egg.color}
                emissiveIntensity={glow}
                transparent
                opacity={0.92}
                side={THREE.DoubleSide}
                roughness={0.3}
              />
            </mesh>
          </group>
          <group ref={rightWing} position={[0, 0.05, 0]}>
            <mesh position={[0.28, 0, 0]}>
              <planeGeometry args={[0.55, 0.42]} />
              <meshStandardMaterial
                color={egg.color}
                emissive={egg.color}
                emissiveIntensity={glow}
                transparent
                opacity={0.92}
                side={THREE.DoubleSide}
                roughness={0.3}
              />
            </mesh>
          </group>
        </>
      )}

      {egg.kind === "egg" && (
        <>
          {/* Pedestal */}
          <mesh position={[0, -0.55, 0]}>
            <cylinderGeometry args={[0.45, 0.55, 0.3, 16]} />
            <meshStandardMaterial
              color="#161b22"
              emissive="#3a2f12"
              emissiveIntensity={0.3}
            />
          </mesh>
          <mesh scale={[1, 1.32, 1]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial
              color={egg.color}
              emissive={egg.color}
              emissiveIntensity={glow * 0.7}
              roughness={0.15}
              metalness={0.8}
            />
          </mesh>
        </>
      )}

      {egg.kind === "duck" && (
        <>
          <mesh>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial
              color={egg.color}
              emissive={egg.color}
              emissiveIntensity={active ? 0.8 : 0.35}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0.32, 0.12]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial
              color={egg.color}
              emissive={egg.color}
              emissiveIntensity={active ? 0.8 : 0.35}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0.3, 0.34]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.08, 0.2, 12]} />
            <meshStandardMaterial
              color="#ff9b21"
              emissive="#ff7a00"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[0.09, 0.38, 0.27]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#10141a" />
          </mesh>
          <mesh position={[-0.09, 0.38, 0.27]}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial color="#10141a" />
          </mesh>
        </>
      )}

      <pointLight
        color={egg.color}
        intensity={active ? 5 : 2.4}
        distance={7}
        decay={2}
      />
      <Sparkles
        count={16}
        scale={2}
        size={2.2}
        speed={reduced ? 0 : 0.5}
        color={egg.color}
        opacity={0.85}
      />
    </group>
  );
}
