"use client";

import { useGame } from "../state/GameContext";
import { ARTIFACT_BY_ID } from "../data/artifacts";
import { UI } from "../i18n";
import type { ArtifactKind, Lang } from "../state/types";
import styles from "../../skamlos-pitch.module.css";

const KIND_LABEL: Record<ArtifactKind, Record<Lang, string>> = {
  cert: { no: "Sertifikat", en: "Certificate" },
  repo: { no: "Kodebase", en: "Repository" },
  live: { no: "Live demo", en: "Live demo" },
  concept: { no: "Metode / konsept", en: "Method / concept" },
};

interface ArtifactModalProps {
  artifactId: string;
  onClose: () => void;
}

/** Evidence card with an honest claim boundary and an optional public link. */
export default function ArtifactModal({ artifactId, onClose }: ArtifactModalProps) {
  const { state, dispatch, lang } = useGame();
  const ui = UI[lang];
  const artifact = ARTIFACT_BY_ID.get(artifactId);
  if (!artifact) return null;

  const collected = state.collectedArtifacts.includes(artifact.id);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeX} onClick={onClose} aria-label={ui.close}>
          ×
        </button>
        <span className={styles.kindBadge}>{KIND_LABEL[artifact.kind][lang]}</span>
        <h2 className={styles.modalTitle}>{artifact.title[lang]}</h2>
        <p className={styles.cardDesc}>{artifact.description[lang]}</p>

        {artifact.boundary && (
          <div className={styles.boundary}>
            <span className={styles.boundaryLabel}>{ui.boundaryLabel}:</span>
            <span>{artifact.boundary[lang]}</span>
          </div>
        )}

        <div className={styles.btnRow}>
          {collected ? (
            <span className={styles.doneTag}>✓ {ui.collected}</span>
          ) : (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() => dispatch({ type: "COLLECT_ARTIFACT", artifactId: artifact.id })}
            >
              {ui.collect}
            </button>
          )}
          {artifact.href && (
            <a
              className={`${styles.btn} ${styles.btnGhost} ${styles.extLink}`}
              href={artifact.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              ↗ {artifact.linkLabel?.[lang] ?? ui.visitLink}
            </a>
          )}
          <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={onClose}>
            {ui.close}
          </button>
        </div>
      </div>
    </div>
  );
}
