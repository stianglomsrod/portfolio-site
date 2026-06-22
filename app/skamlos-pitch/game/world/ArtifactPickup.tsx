"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useGame } from "../state/GameContext";

const reduced =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

interface Props {
  id: string;
  pos: [number, number, number];
  color: string;
}

export default function ArtifactPickup({ id, pos, color }: Props) {
  const group = useRef<THREE.Group>(null);
  const { activeTarget } = useGame();
  const active = activeTarget?.id === `artifact:${id}`;

  useFrame((s) => {
    if (!group.current) return;
    const t = s.clock.elapsedTime;
    if (!reduced) {
      group.current.rotation.y = t * 1.1;
      group.current.position.y = pos[1] + Math.sin(t * 2 + pos[0]) * 0.18;
    }
  });

  return (
    <group ref={group} position={pos}>
      <mesh castShadow>
        <icosahedronGeometry args={[active ? 0.42 : 0.34, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.6 : 1.0}
          roughness={0.2}
          metalness={0.5}
          flatShading
        />
      </mesh>
      <pointLight
        color={color}
        intensity={active ? 6 : 3}
        distance={6}
        decay={2}
      />
      <Sparkles
        count={14}
        scale={1.6}
        size={2}
        speed={reduced ? 0 : 0.4}
        color={color}
        opacity={0.8}
      />
    </group>
  );
}
