"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { pitchNodes, pitchPath, type PitchNode } from "./pitchNodes";

const ACCENT = new THREE.Color("#7cc0ff");
const ACCENT_DIM = new THREE.Color("#3f6da3");
const TARGET = new THREE.Color("#b58cff");
const TARGET_DIM = new THREE.Color("#6d54a8");

/** Build a soft radial-gradient glow sprite texture on a 2D canvas. */
function makeGlowTexture(): THREE.Texture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    g.addColorStop(0, "rgba(255,255,255,0.95)");
    g.addColorStop(0.25, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

type Props = {
  activeId: string | null;
  hoveredId: string | null;
  onActivate: (id: string | null) => void;
  onHover: (id: string | null) => void;
  /** Reports the active/hovered node's projected screen position for the HTML label. */
  onLabel: (label: { id: string; x: number; y: number } | null) => void;
  reducedMotion: boolean;
  onUnavailable: () => void;
};

export default function FitConstellation({
  activeId,
  hoveredId,
  onActivate,
  onHover,
  onLabel,
  reducedMotion,
  onUnavailable,
}: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Mutable mirrors so the rAF loop / handlers always read the latest props
  // without re-running the heavy setup effect.
  const activeRef = useRef(activeId);
  const hoveredRef = useRef(hoveredId);
  const reducedRef = useRef(reducedMotion);
  const onActivateRef = useRef(onActivate);
  const onHoverRef = useRef(onHover);
  const onLabelRef = useRef(onLabel);

  useEffect(() => {
    activeRef.current = activeId;
  }, [activeId]);
  useEffect(() => {
    hoveredRef.current = hoveredId;
  }, [hoveredId]);
  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);
  useEffect(() => {
    onActivateRef.current = onActivate;
    onHoverRef.current = onHover;
    onLabelRef.current = onLabel;
  }, [onActivate, onHover, onLabel]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- WebGL capability check (graceful fallback) ---
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    try {
      const probe = document.createElement("canvas");
      gl =
        (probe.getContext("webgl2") as WebGL2RenderingContext | null) ||
        (probe.getContext("webgl") as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }
    if (!gl) {
      onUnavailable();
      return;
    }

    let disposed = false;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      onUnavailable();
      return;
    }

    const width = mount.clientWidth || 600;
    const height = mount.clientHeight || 420;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 14);
    camera.lookAt(0, 0, 0);

    const root = new THREE.Group();
    scene.add(root);

    const glowTex = makeGlowTexture();
    const disposables: { dispose: () => void }[] = [glowTex, renderer];

    // --- Background star field for depth ---
    const starCount = 320;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 46;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 6;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x9fb8d6,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    disposables.push(starGeo, starMat);

    // --- Path lines between milestones + converging lines to VG X ---
    const milestones = pitchNodes.filter((n) => n.kind === "milestone");
    const target = pitchNodes.find((n) => n.kind === "target")!;

    const pathPoints: number[] = [];
    pitchPath.forEach(([a, b]) => {
      const pa = milestones[a].position;
      const pb = milestones[b].position;
      pathPoints.push(...pa, ...pb);
    });
    const pathGeo = new THREE.BufferGeometry();
    pathGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(pathPoints, 3),
    );
    const pathMat = new THREE.LineBasicMaterial({
      color: 0x7cc0ff,
      transparent: true,
      opacity: 0.32,
    });
    const pathLines = new THREE.LineSegments(pathGeo, pathMat);
    root.add(pathLines);
    disposables.push(pathGeo, pathMat);

    const convPoints: number[] = [];
    milestones.forEach((m) => {
      convPoints.push(...m.position, ...target.position);
    });
    const convGeo = new THREE.BufferGeometry();
    convGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(convPoints, 3),
    );
    const convMat = new THREE.LineBasicMaterial({
      color: 0xb58cff,
      transparent: true,
      opacity: 0.1,
    });
    const convLines = new THREE.LineSegments(convGeo, convMat);
    root.add(convLines);
    disposables.push(convGeo, convMat);

    // --- Nodes (sphere + glow sprite) ---
    type NodeObj = {
      data: PitchNode;
      mesh: THREE.Mesh;
      glow: THREE.Sprite;
      mat: THREE.MeshBasicMaterial;
      glowMat: THREE.SpriteMaterial;
      baseScale: number;
      glowScale: number;
      base: THREE.Color;
      dim: THREE.Color;
    };
    const nodeObjs: NodeObj[] = [];
    const pickable: THREE.Mesh[] = [];

    pitchNodes.forEach((node) => {
      const isTarget = node.kind === "target";
      const base = isTarget ? TARGET : ACCENT;
      const dim = isTarget ? TARGET_DIM : ACCENT_DIM;
      const r = isTarget ? 0.6 : 0.32;
      const geo = new THREE.SphereGeometry(r, 24, 24);
      const mat = new THREE.MeshBasicMaterial({ color: base.clone() });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...node.position);
      mesh.userData.id = node.id;
      root.add(mesh);
      pickable.push(mesh);

      const glowMat = new THREE.SpriteMaterial({
        map: glowTex,
        color: base.clone(),
        transparent: true,
        opacity: isTarget ? 0.85 : 0.6,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Sprite(glowMat);
      const glowScale = isTarget ? 4.2 : 2.3;
      glow.scale.setScalar(glowScale);
      glow.position.copy(mesh.position);
      root.add(glow);

      disposables.push(geo, mat, glowMat);
      nodeObjs.push({
        data: node,
        mesh,
        glow,
        mat,
        glowMat,
        baseScale: 1,
        glowScale,
        base,
        dim,
      });
    });

    // --- Interaction state ---
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let dragging = false;
    let moved = false;
    let lastX = 0;
    let lastY = 0;
    let targetRotY = 0.2;
    let targetRotX = -0.05;
    let curRotY = 0.2;
    let curRotX = -0.05;
    let idleSpin = true;
    let pointerInside = false;

    function setPointerFromEvent(e: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function pickAt(): NodeObj | null {
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickable, false);
      if (hits.length === 0) return null;
      const id = hits[0].object.userData.id as string;
      return nodeObjs.find((n) => n.data.id === id) ?? null;
    }

    function onPointerDown(e: PointerEvent) {
      dragging = true;
      moved = false;
      idleSpin = false;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture?.(e.pointerId);
    }

    function onPointerMove(e: PointerEvent) {
      pointerInside = true;
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
        targetRotY += dx * 0.006;
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX + dy * 0.004));
        lastX = e.clientX;
        lastY = e.clientY;
      } else {
        setPointerFromEvent(e);
        const hit = pickAt();
        const id = hit?.data.id ?? null;
        if (id !== hoveredRef.current) onHoverRef.current(id);
        renderer.domElement.style.cursor = id ? "pointer" : "grab";
      }
    }

    function onPointerUp(e: PointerEvent) {
      if (dragging && !moved) {
        setPointerFromEvent(e);
        const hit = pickAt();
        const id = hit?.data.id ?? null;
        // Toggle off if clicking the already-active node, else select.
        onActivateRef.current(id === activeRef.current ? null : id);
      }
      dragging = false;
      renderer.domElement.releasePointerCapture?.(e.pointerId);
    }

    function onPointerLeave() {
      pointerInside = false;
      if (!dragging && hoveredRef.current) onHoverRef.current(null);
    }

    const el = renderer.domElement;
    el.style.cursor = "grab";
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointerleave", onPointerLeave);

    // --- Resize ---
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth || width;
      const h = mount.clientHeight || height;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);

    // --- Animation loop ---
    const tmp = new THREE.Vector3();
    let raf = 0;
    const clock = new THREE.Clock();

    function frame() {
      raf = requestAnimationFrame(frame);
      const reduced = reducedRef.current;
      const t = clock.getElapsedTime();

      if (idleSpin && !reduced && !pointerInside && !dragging) {
        targetRotY += 0.0016;
      }
      // Ease rotation toward target (instant when reduced motion).
      const ease = reduced ? 1 : 0.08;
      curRotY += (targetRotY - curRotY) * ease;
      curRotX += (targetRotX - curRotX) * ease;
      root.rotation.y = curRotY;
      root.rotation.x = curRotX;

      const active = activeRef.current;
      const hovered = hoveredRef.current;

      nodeObjs.forEach((n) => {
        const isActive = n.data.id === active;
        const isHover = n.data.id === hovered;
        const focus = isActive || isHover;
        const pulse =
          reduced || !focus ? 0 : Math.sin(t * 3) * 0.08 + 0.08;
        const targetScale = (focus ? 1.5 : 1) + pulse;
        n.mesh.scale.lerp(
          tmp.set(targetScale, targetScale, targetScale),
          reduced ? 1 : 0.15,
        );
        const gScale = n.glowScale * (focus ? 1.5 : 1);
        n.glow.scale.lerp(
          tmp.set(gScale, gScale, gScale),
          reduced ? 1 : 0.15,
        );
        // Dim non-focused nodes when something is active/hovered.
        const anyFocus = active || hovered;
        const lit = focus || !anyFocus;
        n.mat.color.lerp(lit ? n.base : n.dim, reduced ? 1 : 0.15);
        n.glowMat.opacity +=
          ((focus ? 1 : lit ? (n.data.kind === "target" ? 0.85 : 0.6) : 0.25) -
            n.glowMat.opacity) *
          (reduced ? 1 : 0.15);
      });

      if (!reduced) {
        stars.rotation.y = t * 0.01;
      }

      renderer.render(scene, camera);

      // Project the active (or hovered) node to screen for the HTML label.
      const labelId = active ?? hovered;
      if (labelId) {
        const n = nodeObjs.find((o) => o.data.id === labelId);
        if (n) {
          tmp.copy(n.mesh.position).applyMatrix4(root.matrixWorld);
          tmp.project(camera);
          const rect = renderer.domElement.getBoundingClientRect();
          const x = (tmp.x * 0.5 + 0.5) * rect.width;
          const y = (-tmp.y * 0.5 + 0.5) * rect.height;
          onLabelRef.current({ id: labelId, x, y });
        }
      } else {
        onLabelRef.current(null);
      }
    }
    frame();

    // --- Cleanup ---
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointerleave", onPointerLeave);
      disposables.forEach((d) => d.dispose());
      renderer.forceContextLoss?.();
      if (el.parentNode === mount) mount.removeChild(el);
      void disposed;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}
