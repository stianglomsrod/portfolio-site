import styles from "../../skamlos-rpg.module.css";

// Shown when the browser cannot provide a canvas. The route must never hard-crash.
export default function Fallback() {
  return (
    <div className={styles.fallback}>
      <h1>Skamløs Pitch: Kompetansebyen</h1>
      <p>
        Dette er et lite topp-ned RPG som trenger en nettleser med
        canvas-støtte. Nettleseren din ser ikke ut til å støtte det akkurat nå.
      </p>
      <p>
        Du kan fortsatt lese om reisen i porteføljen — fra klasserom og CS50x
        til prototyper og agentisk utvikling.
      </p>
      <a href="/sandbox" className={styles.fallbackLink}>
        ← Tilbake til portefølje
      </a>
    </div>
  );
}
