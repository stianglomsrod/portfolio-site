"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { HomeCopy, ScreenshotCopy } from "../data/homepage";
import ImageLightbox from "./ImageLightbox";
import { getCaseScreenshot } from "./caseScreenshotData";
import styles from "./CaseCard.module.css";

export default function CaseScreenshotGallery({
  caseId,
  screenshots,
  labels,
  className,
}: {
  caseId: string;
  screenshots: ScreenshotCopy[];
  labels: HomeCopy["caseLabels"];
  className: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const entries = useMemo(
    () =>
      screenshots.map((copy) => ({
        ...copy,
        shot: getCaseScreenshot(caseId, copy.lookup),
      })),
    [caseId, screenshots],
  );

  const items = useMemo(
    () =>
      entries
        .filter((entry) => entry.shot !== null)
        .map((entry) => ({
          ...entry.shot!,
          caption: entry.label,
          alt: entry.alt,
        })),
    [entries],
  );

  const openFromLabel = (label: string, trigger: HTMLButtonElement) => {
    const index = items.findIndex((item) => item.caption === label);
    if (index < 0) return;
    triggerRef.current = trigger;
    setOpenIndex(index);
  };

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus();
  };

  return (
    <>
      <div className={className}>
        {entries.map((entry) => {
          if (!entry.shot) {
            return (
              <div
                key={entry.lookup}
                className={styles.screenshot}
                role="img"
                aria-label={`${labels.screenshotFallback}: ${entry.alt}`}
              >
                <span className={styles.screenshotLabel}>{entry.label}</span>
              </div>
            );
          }

          return (
            <button
              key={entry.lookup}
              type="button"
              className={styles.screenshotButton}
              onClick={(event) => openFromLabel(entry.label, event.currentTarget)}
              aria-label={entry.alt}
            >
              <figure className={styles.screenshotFigure}>
                <span className={styles.screenshotThumb}>
                  <Image
                    className={styles.screenshotImage}
                    src={entry.shot.src}
                    alt={entry.alt}
                    width={entry.shot.width}
                    height={entry.shot.height}
                    sizes="(max-width: 600px) 45vw, 280px"
                    style={{ objectPosition: entry.shot.focus ?? "center top" }}
                  />
                </span>
                <figcaption className={styles.screenshotLabel}>
                  {entry.label}
                </figcaption>
              </figure>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <ImageLightbox
          key={`${caseId}-${openIndex}`}
          images={items}
          initialIndex={openIndex}
          labels={labels}
          onClose={close}
        />
      )}
    </>
  );
}
