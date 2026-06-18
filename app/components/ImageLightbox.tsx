"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseScreenshot } from "./caseScreenshotData";
import styles from "./ImageLightbox.module.css";

type Props = {
  images: CaseScreenshot[];
  initialIndex: number;
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
  onClose,
}: Props) {
  const [index, setIndex] = useState(() =>
    clampIndex(initialIndex, images.length),
  );
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const hasMany = images.length > 1;
  const current = images[index] ?? null;

  // Derived from the currently loaded src so the new image fades in on every
  // navigation without a setState-in-effect.
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
    // preventScroll stops the browser from scrolling the page to bring the
    // focused dialog into view (the modal is already centered via position: fixed).
    dialogRef.current?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [next, onClose, prev]);

  const title = useMemo(() => {
    if (!current) return "Skjermbilde";
    return current.caption;
  }, [current]);

  if (!current) return null;
  // The lightbox must escape any ancestor with a transform / will-change
  // (e.g. the Reveal wrapper), otherwise position: fixed anchors to that
  // element instead of the viewport. Portalling to <body> guarantees the
  // overlay covers the real viewport and centers correctly.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div className={styles.overlay} role="presentation">
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Lukk bildefremviser"
      />

      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-label={`Bildefremviser: ${title}`}
        tabIndex={-1}
        onClick={onClose}
      >
        <header className={styles.topbar} onClick={(e) => e.stopPropagation()}>
          <p className={styles.title}>{title}</p>
          <p className={styles.count} aria-live="polite">
            {index + 1} / {images.length}
          </p>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Lukk bildefremviser"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.viewport}>
          {hasMany && (
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Forrige bilde"
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          <figure className={styles.figure}>
            <div
              className={styles.frame}
              data-loaded={loaded}
              onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Neste bilde"
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
