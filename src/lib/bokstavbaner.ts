/* Bokstavbaner: skjelettbaner for a–å og A–Å med STRØKREKKEFØLGE og
   SKRIVERETNING etter norsk skriftforming-konvensjon (se
   docs/innsikt/SPORING-DESIGN.md): staver ovenfra og ned, rundinger mot
   klokka med start ca. kl. 1–2, b/p stav først så bolle, prikker til
   slutt. Banene tegnes i et 40 enheter høyt bokstavhus:
   topplinje y=3 · x-topp y=15 · grunnlinje y=27 · bunnlinje y=39.
   Retningen i pathene ER penneføringen — sporingverktøyet leser
   startpunkt og pilretning rett ut av dem med getPointAtLength. */

export const LINJER = { topp: 3, xtopp: 15, grunn: 27, bunn: 39 } as const;

export interface Strok {
  d: string;
  /** prikk-strøk (i/j): tegnes som fylt punkt, ikke strek */
  prikk?: boolean;
}

export interface Bane {
  bredde: number;
  strok: Strok[];
}

const K = 0.7071; // cos/sin 45°

/** Full sirkel MOT klokka fra kl. 13.30 (to halvbuer). */
function sirkel(cx: number, cy: number, r: number): string {
  const x0 = +(cx + r * K).toFixed(2);
  const y0 = +(cy - r * K).toFixed(2);
  const x1 = +(cx - r * K).toFixed(2);
  const y1 = +(cy + r * K).toFixed(2);
  return `M ${x0} ${y0} A ${r} ${r} 0 0 0 ${x1} ${y1} A ${r} ${r} 0 0 0 ${x0} ${y0}`;
}

/** Åpen c-bue MOT klokka fra kl. 13.30 til kl. 16.30. */
function cBue(cx: number, cy: number, r: number): string {
  const x0 = +(cx + r * K).toFixed(2);
  const y0 = +(cy - r * K).toFixed(2);
  const x1 = +(cx + r * K).toFixed(2);
  const y1 = +(cy + r * K).toFixed(2);
  return `M ${x0} ${y0} A ${r} ${r} 0 1 0 ${x1} ${y1}`;
}

/* Småbokstavenes runde kropp: senter i stua */
const CY = 21; // midt mellom x-topp (15) og grunnlinje (27)
const R = 6;

export const BANER: Record<string, Bane> = {
  /* ---------- små bokstaver ---------- */
  a: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 14 15 L 14 27' }] },
  b: { bredde: 17, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 17.5 A 5.8 5.8 0 1 1 4 24.5' }] },
  c: { bredde: 16, strok: [{ d: cBue(8.5, CY, R) }] },
  d: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 14 3 L 14 27' }] },
  e: { bredde: 16, strok: [{ d: 'M 3 21 L 14 21 A 5.6 5.6 0 1 0 12.6 25.2' }] },
  f: { bredde: 14, strok: [{ d: 'M 11.5 5.2 A 4.4 4.4 0 0 0 5 8.6 L 5 27' }, { d: 'M 2 15 L 9.5 15' }] },
  g: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 14 15 L 14 33.4 A 5.2 5.2 0 0 1 4.6 35.2' }] },
  h: { bredde: 17, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 19.5 C 4 14.8 13.5 14.8 13.5 19.5 L 13.5 27' }] },
  i: { bredde: 10, strok: [{ d: 'M 5 15 L 5 27' }, { d: 'M 5 10.6 L 5 10.7', prikk: true }] },
  j: { bredde: 12, strok: [{ d: 'M 8.5 15 L 8.5 33.4 A 4.8 4.8 0 0 1 1.6 35' }, { d: 'M 8.5 10.6 L 8.5 10.7', prikk: true }] },
  k: { bredde: 16, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 13 15.5 L 4.5 21.8' }, { d: 'M 7.4 19.6 L 13.6 27' }] },
  l: { bredde: 10, strok: [{ d: 'M 5 3 L 5 27' }] },
  m: { bredde: 20, strok: [{ d: 'M 4 15.4 L 4 27' }, { d: 'M 4 19.4 C 4 15 10 15 10 19.4 L 10 27' }, { d: 'M 10 19.4 C 10 15 16 15 16 19.4 L 16 27' }] },
  n: { bredde: 17, strok: [{ d: 'M 4 15.4 L 4 27' }, { d: 'M 4 19.4 C 4 14.9 13.5 14.9 13.5 19.4 L 13.5 27' }] },
  o: { bredde: 17, strok: [{ d: sirkel(8.5, CY, R) }] },
  p: { bredde: 17, strok: [{ d: 'M 4 15.4 L 4 39' }, { d: 'M 4 17.5 A 5.8 5.8 0 1 1 4 24.5' }] },
  q: { bredde: 18, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 14 15 L 14 36 A 3.4 3.4 0 0 0 17.2 38.3' }] },
  r: { bredde: 14, strok: [{ d: 'M 4.5 15.4 L 4.5 27' }, { d: 'M 4.5 20 C 4.5 15.4 11.5 14.6 12.7 18.2' }] },
  s: { bredde: 15, strok: [{ d: 'M 12.2 17.4 C 10.8 14.9 4.6 15 4.1 18 C 3.6 21.1 11.8 20.8 12.2 23.9 C 12.6 26.8 5.6 27.8 3.6 25' }] },
  t: { bredde: 14, strok: [{ d: 'M 5.5 5 L 5.5 23.4 A 3.6 3.6 0 0 0 11.8 25.6' }, { d: 'M 2 15 L 10 15' }] },
  u: { bredde: 17, strok: [{ d: 'M 4 15 L 4 22 C 4 27 13.5 27 13.5 22 L 13.5 15' }, { d: 'M 13.5 15 L 13.5 27' }] },
  v: { bredde: 16, strok: [{ d: 'M 3.5 15 L 8.2 27 L 13 15' }] },
  w: { bredde: 20, strok: [{ d: 'M 2.5 15 L 6 27 L 9.6 16.6 L 13.2 27 L 16.6 15' }] },
  x: { bredde: 16, strok: [{ d: 'M 3.5 15 L 13.5 27' }, { d: 'M 13.5 15 L 3.5 27' }] },
  y: { bredde: 17, strok: [{ d: 'M 4 15 L 9.2 27' }, { d: 'M 14.2 15 L 7.4 33.6 C 6.4 36.2 3.4 36.4 2 34.4' }] },
  z: { bredde: 16, strok: [{ d: 'M 3.5 15 L 13.5 15 L 3.5 27 L 13.5 27' }] },
  æ: {
    bredde: 25,
    strok: [
      { d: sirkel(6.5, CY, 5.4) },
      { d: 'M 11.9 15.6 L 11.9 27' },
      { d: 'M 11.9 21 L 22.4 21 A 5.2 5.2 0 1 0 21.1 24.9' },
    ],
  },
  ø: { bredde: 17, strok: [{ d: sirkel(8.5, CY, R) }, { d: 'M 13.6 14.2 L 3.4 27.8' }] },
  å: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 14 15 L 14 27' }, { d: sirkel(9, 9.8, 2.5) }] },

  /* ---------- store bokstaver ---------- */
  A: { bredde: 18, strok: [{ d: 'M 9 3 L 2 27' }, { d: 'M 9 3 L 16 27' }, { d: 'M 4.8 18.6 L 13.2 18.6' }] },
  B: { bredde: 16, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 8.4 3 A 5.7 5.7 0 1 1 8.4 14.6 L 4 14.6 L 8.8 14.6 A 6.1 6.1 0 1 1 8.8 27 L 4 27' }] },
  C: { bredde: 17, strok: [{ d: 'M 14.8 6.8 A 10.4 12 0 1 0 14.8 23.2' }] },
  D: { bredde: 17, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 6.6 3 C 15.8 3 15.8 27 6.6 27 L 4 27' }] },
  E: { bredde: 15, strok: [{ d: 'M 13.5 3 L 4 3 L 4 27 L 13.5 27' }, { d: 'M 4 15 L 11.8 15' }] },
  F: { bredde: 15, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 13.5 3' }, { d: 'M 4 15 L 11.4 15' }] },
  G: { bredde: 18, strok: [{ d: 'M 15 6.8 A 10.6 12 0 1 0 15 23.4 L 15 17 L 10 17' }] },
  H: { bredde: 18, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 15 3 L 15 27' }, { d: 'M 4 15 L 15 15' }] },
  I: { bredde: 9, strok: [{ d: 'M 4.5 3 L 4.5 27' }] },
  J: { bredde: 15, strok: [{ d: 'M 11.6 3 L 11.6 21.6 A 5.2 5.2 0 0 1 2.4 23.8' }] },
  K: { bredde: 17, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 14.6 3 L 4.5 16' }, { d: 'M 7.8 11.9 L 15.2 27' }] },
  L: { bredde: 14, strok: [{ d: 'M 4 3 L 4 27 L 13.2 27' }] },
  M: { bredde: 20, strok: [{ d: 'M 3 3 L 3 27' }, { d: 'M 3 3 L 10 17.4 L 17 3' }, { d: 'M 17 3 L 17 27' }] },
  N: { bredde: 19, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 15.4 27' }, { d: 'M 15.4 3 L 15.4 27' }] },
  O: { bredde: 19, strok: [{ d: 'M 14.2 5.6 A 7.2 12 0 0 0 4.8 24.4 A 7.2 12 0 0 0 14.2 5.6' }] },
  P: { bredde: 16, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 8.6 3 A 6.3 6.3 0 1 1 8.6 15.8 L 4 15.8' }] },
  Q: { bredde: 19, strok: [{ d: 'M 14.2 5.6 A 7.2 12 0 0 0 4.8 24.4 A 7.2 12 0 0 0 14.2 5.6' }, { d: 'M 11.6 21 L 16.6 28.4' }] },
  R: { bredde: 17, strok: [{ d: 'M 4 3 L 4 27' }, { d: 'M 4 3 L 8.6 3 A 6.3 6.3 0 1 1 8.6 15.8 L 4 15.8' }, { d: 'M 8.4 15.8 L 15 27' }] },
  S: { bredde: 16, strok: [{ d: 'M 13.6 6.4 C 11.6 2.6 4.2 3 4 8 C 3.8 13.4 14 12.8 14 20 C 14 25.8 5 28.4 3 23.4' }] },
  T: { bredde: 16, strok: [{ d: 'M 8 3 L 8 27' }, { d: 'M 2 3 L 14 3' }] },
  U: { bredde: 18, strok: [{ d: 'M 3.5 3 L 3.5 19 C 3.5 27.4 14.5 27.4 14.5 19 L 14.5 3' }] },
  V: { bredde: 17, strok: [{ d: 'M 2.6 3 L 8.8 27 L 15 3' }] },
  W: { bredde: 21, strok: [{ d: 'M 2 3 L 6 27 L 9.8 6.6 L 13.6 27 L 17.6 3' }] },
  X: { bredde: 17, strok: [{ d: 'M 3.4 3 L 14.4 27' }, { d: 'M 14.4 3 L 3.4 27' }] },
  Y: { bredde: 17, strok: [{ d: 'M 3.4 3 L 8.9 15.4' }, { d: 'M 14.4 3 L 8.9 15.4' }, { d: 'M 8.9 15.4 L 8.9 27' }] },
  Z: { bredde: 16, strok: [{ d: 'M 3.4 3 L 13.8 3 L 3.4 27 L 13.8 27' }] },
  Æ: {
    bredde: 21,
    strok: [
      { d: 'M 1.6 27 L 9.4 3 L 9.4 27' },
      { d: 'M 9.4 3 L 18.6 3' },
      { d: 'M 9.4 15 L 16.6 15' },
      { d: 'M 9.4 27 L 18.6 27' },
      { d: 'M 4.4 19 L 9.4 19' },
    ],
  },
  Ø: { bredde: 19, strok: [{ d: 'M 14.2 5.6 A 7.2 12 0 0 0 4.8 24.4 A 7.2 12 0 0 0 14.2 5.6' }, { d: 'M 15.8 4 L 3.2 26' }] },
  Å: { bredde: 18, strok: [{ d: 'M 9 8.4 L 2.6 27' }, { d: 'M 9 8.4 L 15.4 27' }, { d: 'M 5.2 20.4 L 12.8 20.4' }, { d: sirkel(9.4, 4, 2.3) }] },
};

export const VOKALER = new Set([...'aeiouyæøå', ...'AEIOUYÆØÅ']);

/** Banen for et tegn, eller null når tegnet ikke finnes i biblioteket. */
export function bane(tegn: string): Bane | null {
  return BANER[tegn] ?? null;
}
