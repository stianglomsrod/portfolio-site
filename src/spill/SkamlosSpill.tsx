import { lazy, Suspense, useEffect, useState } from "react";
import Fallback from "./game/ui/Fallback";
import styles from "./skamlos-rpg.module.css";

/* Phaser rører window/canvas og skal aldri SSR-es. Øya rendres med
   client:only="react", og lazy-importen holder Phaser-bundelen utenfor
   sidens første last til canvas-proben har svart. */
const GameMount = lazy(() => import("./game/GameMount"));

function hasCanvas(): boolean {
  try {
    const c = document.createElement("canvas");
    return typeof c.getContext === "function" && !!c.getContext("2d");
  } catch {
    return false;
  }
}

export default function SkamlosSpill() {
  // null = ikke probet ennå (rendrer ingenting for å unngå blink).
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(hasCanvas());
  }, []);

  if (supported === null) return <div className={styles.booting} aria-hidden />;
  if (!supported) return <Fallback />;
  return (
    <Suspense
      fallback={<div className={styles.booting}>Laster Kompetansebyen …</div>}
    >
      <GameMount />
    </Suspense>
  );
}
