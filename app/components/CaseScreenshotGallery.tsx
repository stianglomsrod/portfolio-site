"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import ImageLightbox from "./ImageLightbox";
import {
  getCaseScreenshot,
  getCaseScreenshotItems,
} from "./caseScreenshotData";
import styles from "./CaseCard.module.css";

export default function CaseScreenshotGallery({
  caseId,
  labels,
  className,
}: {
  caseId: string;
  labels: string[];
  className: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const entries = useMemo(
    () =>
      labels.map((label) => ({
        label,
        shot: getCaseScreenshot(caseId, label),
      })),
    [caseId, labels],
  );

  const items = useMemo(
    () => getCaseScreenshotItems(caseId, labels),
    [caseId, labels],
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
                key={entry.label}
                className={styles.screenshot}
                role="img"
                aria-label={`Skjermbilde: ${entry.label}`}
              >
                <span className={styles.screenshotLabel}>{entry.label}</span>
              </div>
            );
          }

          return (
            <button
              key={entry.label}
              type="button"
              className={styles.screenshotButton}
              onClick={(e) => openFromLabel(entry.label, e.currentTarget)}
              aria-label={`Apne stor visning: ${entry.label}`}
            >
              <figure className={styles.screenshotFigure}>
                <Image
                  className={styles.screenshotImage}
                  src={entry.shot.src}
                  alt={entry.shot.alt}
                  width={960}
                  height={600}
                />
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
          onClose={close}
        />
      )}
    </>
  );
}
