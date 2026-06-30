"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Fallback from "./game/ui/Fallback";
import styles from "./skamlos-rpg.module.css";

// The Phaser game touches `window`/canvas, so it must only ever load on the
// client. `ssr:false` is illegal in a Server Component under Next 16, which is
// exactly why this client wrapper exists.
const GameMount = dynamic(() => import("./game/GameMount"), {
  ssr: false,
  loading: () => <div className={styles.booting}>Laster Kompetansebyen …</div>,
});

function hasCanvas(): boolean {
  try {
    const c = document.createElement("canvas");
    return typeof c.getContext === "function" && !!c.getContext("2d");
  } catch {
    return false;
  }
}

export default function SkamlosRpgClient() {
  // null = not yet probed (render nothing to avoid a hydration mismatch).
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(hasCanvas());
  }, []);

  if (supported === null) return <div className={styles.booting} aria-hidden />;
  if (!supported) return <Fallback />;
  return <GameMount />;
}
