"use client";

import { useMemo } from "react";
import { Grid, Sparkles } from "@react-three/drei";

// Static, low-cost atmosphere: a dark base plane, a tron-style grid that fades
// into the fog, slow floating dust, and a ring of distant glowing pillars that
// frame the playfield without being reachable.
export default function Decor() {
  const pillars = useMemo(() => {
    const items: { pos: [number, number, number]; h: number }[] = [];
    const count = 16;
    const cx = 0;
    const cz = -26;
    const radius = 52;
    for (let i = 0; i < count; i++) {
      const a = (i / count) * Math.PI * 2;
      const h = 10 + ((i * 37) % 9);
      items.push({
        pos: [cx + Math.cos(a) * radius, h / 2, cz + Math.sin(a) * radius],
        h,
      });
    }
    return items;
  }, []);

  return (
    <group>
      {/* Solid dark base under the grid. */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -26]}
        receiveShadow
      >
        <circleGeometry args={[80, 64]} />
        <meshStandardMaterial color="#0a0d10" roughness={1} metalness={0} />
      </mesh>

      <Grid
        position={[0, 0.02, -26]}
        args={[160, 160]}
        cellSize={2}
        cellThickness={0.6}
        cellColor="#16222e"
        sectionSize={10}
        sectionThickness={1.1}
        sectionColor="#27496b"
        fadeDistance={78}
        fadeStrength={2.5}
        followCamera={false}
        infiniteGrid
      />

      <Sparkles
        count={120}
        scale={[100, 16, 100]}
        position={[0, 8, -26]}
        size={2.4}
        speed={0.18}
        opacity={0.45}
        color="#6aa6ee"
      />

      {pillars.map((p, i) => (
        <mesh key={i} position={p.pos}>
          <boxGeometry args={[0.8, p.h, 0.8]} />
          <meshStandardMaterial
            color="#0e151d"
            emissive="#1b3350"
            emissiveIntensity={0.6}
            roughness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
