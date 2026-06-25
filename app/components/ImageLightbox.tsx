"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { HomeCopy } from "../data/homepage";
import type { CaseScreenshot } from "./caseScreenshotData";
import styles from "./ImageLightbox.module.css";

type Props = {
  images: CaseScreenshot[];
  initialIndex: number;
  labels: HomeCopy["caseLabels"];
  onClose: () => void;
};

function clampIndex(index: number, len: number): number {
  if (len <= 0) return 0;
  if (index < 0) return 0;
  if (index >= len) return len - 1;
  return index;
}

export default function ImageLightbox({
  images,
  initialIndex,
  labels,
  onClose,
}: Props) {
  const [index, setIndex] = useState(() =>
    clampIndex(initialIndex, images.length),
  );
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const hasMany = images.length > 1;
  const current = images[index] ?? null;
  const loaded = current != null && loadedSrc === current.src;

  const prev = useCallback(() => {
    setIndex((i) => {
      if (images.length <= 1) return 0;
      return (i - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => {
      if (images.length <= 1) return 0;
      return (i + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    dialogRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, onClose, prev]);

  const title = useMemo(() => {
    if (!current) return labels.screenshotFallback;
    return current.caption;
  }, [current, labels.screenshotFallback]);

  if (!current || typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label={labels.closeViewer}
      />

      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`${labels.viewerLabel}: ${title}`}
        tabIndex={-1}
        onClick={onClose}
      >
        <header
          className={styles.topbar}
          onClick={(event) => event.stopPropagation()}
        >
          <p className={styles.title}>{title}</p>
          <p className={styles.count} aria-live="polite">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label={labels.closeViewer}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.viewport}>
          {hasMany && (
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={(event) => {
                event.stopPropagation();
                prev();
              }}
              aria-label={labels.previousImage}
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          <figure className={styles.figure}>
            <div
              className={styles.frame}
              data-loaded={loaded}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                width={current.width}
                height={current.height}
                className={styles.image}
                sizes="(max-width: 720px) 92vw, min(1200px, 88vw)"
                priority
                onLoad={() => setLoadedSrc(current.src)}
              />
              <span className={styles.spinner} aria-hidden="true" />
            </div>
            <figcaption className={styles.caption}>
              {current.caption}
            </figcaption>
          </figure>

          {hasMany && (
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={(event) => {
                event.stopPropagation();
                next();
              }}
              aria-label={labels.nextImage}
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
