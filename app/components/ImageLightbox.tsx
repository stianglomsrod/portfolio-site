"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const hasMany = images.length > 1;
  const current = images[index] ?? null;

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
    dialogRef.current?.focus();

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

  return (
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
      >
        <header className={styles.topbar}>
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
              onClick={prev}
              aria-label="Forrige bilde"
            >
              <span aria-hidden="true">‹</span>
            </button>
          )}

          <figure className={styles.figure}>
            <Image
              src={current.src}
              alt={current.alt}
              width={1800}
              height={1200}
              className={styles.image}
              priority
            />
            <figcaption className={styles.caption}>{current.caption}</figcaption>
          </figure>

          {hasMany && (
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={next}
              aria-label="Neste bilde"
            >
              <span aria-hidden="true">›</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
