/* Bokstavbaner v4: skjelettbaner for a–å og A–Å med STRØKREKKEFØLGE og
   SKRIVERETNING etter norsk skriftforming-konvensjon, og PROPORSJONER etter
   forlagsfasit (Salto/Kaleido — se docs/innsikt/sporing/FORMPROFIL-V4.md):
   staver ovenfra og ned, rundinger mot klokka fra kl. 1–2, b/p stav først så
   bolle (med klokka), prikker til slutt.

   Bokstavhuset: topplinje y=3 · x-topp y=15 · grunnlinje y=27 · bunnlinje
   y=39. Bokstavene tegnes med strek 2,2 og BLEKKANT-terminaler: banepunktene
   er felt inn med halv strekbredde (1,1) slik at blekket HVILER PÅ linjene i
   stedet for å krysse dem — topp-terminal y=4,1, x-topp-terminal y=16,1,
   grunnlinje-hvile y=25,9, bunnlinje-hvile y=37,9. Runde kropper i stua har
   sentrum y=21 og r=4,9 (blekket fyller sonen 15–27 eksakt). Versalene er
   BREDE (O ≈ 0,78 av høyden) — aldri skviste.

   Retningen i pathene ER penneføringen — verktøyet leser startpunkt, piler
   og krumning rett ut av dem med getPointAtLength. */

export const LINJER = { topp: 3, xtopp: 15, grunn: 27, bunn: 39 } as const;

/** Strekbredden banene er tegnet for (blekkant-terminalene antar denne). */
export const STREK = 2.2;

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
  const y1 = +(cy + r * K).toFixed(2);
  return `M ${x0} ${y0} A ${r} ${r} 0 1 0 ${x0} ${y1}`;
}

/** Bred versal-oval MOT klokka fra kl. 13.30 (to halvbuer). */
function oval(cx: number, cy: number, rx: number, ry: number): string {
  const x0 = +(cx + rx * K).toFixed(2);
  const y0 = +(cy - ry * K).toFixed(2);
  const x1 = +(cx - rx * K).toFixed(2);
  const y1 = +(cy + ry * K).toFixed(2);
  return `M ${x0} ${y0} A ${rx} ${ry} 0 0 0 ${x1} ${y1} A ${rx} ${ry} 0 0 0 ${x0} ${y0}`;
}

/* Småbokstavenes runde kropp: senter i stua, blekket fyller sonen */
const CY = 21;
const R = 4.9;

export const BANER: Record<string, Bane> = {
  /* ---------- små bokstaver ---------- */
  a: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 12.9 16.1 L 12.9 25.9' }] },
  b: { bredde: 17, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 17.8 A 4.9 4.9 0 1 1 4 24.2' }] },
  c: { bredde: 15, strok: [{ d: cBue(8, CY, R) }] },
  d: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 12.9 4.1 L 12.9 25.9' }] },
  e: { bredde: 16, strok: [{ d: 'M 3.3 21.6 L 12.6 21.6 A 4.85 4.85 0 1 0 11.7 25.3' }] },
  f: { bredde: 13, strok: [{ d: 'M 10.9 6.2 A 4.1 4.1 0 0 0 4.9 9.7 L 4.9 25.9' }, { d: 'M 2 15 L 9.6 15' }] },
  g: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 12.9 16.1 L 12.9 33.2 A 4.5 4.5 0 0 1 4.6 35.6' }] },
  h: { bredde: 17, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 19.8 C 4 15.5 12.9 15.5 12.9 19.8 L 12.9 25.9' }] },
  i: { bredde: 9, strok: [{ d: 'M 4.5 16.1 L 4.5 25.9' }, { d: 'M 4.5 11.6 L 4.5 11.7', prikk: true }] },
  j: { bredde: 12, strok: [{ d: 'M 8.3 16.1 L 8.3 33 A 4.3 4.3 0 0 1 2 35.4' }, { d: 'M 8.3 11.6 L 8.3 11.7', prikk: true }] },
  k: { bredde: 16, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 12.6 16.4 L 4.6 21.6' }, { d: 'M 7.6 19.7 L 13.1 25.9' }] },
  l: { bredde: 9, strok: [{ d: 'M 4.5 4.1 L 4.5 25.9' }] },
  m: { bredde: 23, strok: [{ d: 'M 4 16.3 L 4 25.9' }, { d: 'M 4 19.7 C 4 15.7 11.45 15.7 11.45 19.7 L 11.45 25.9' }, { d: 'M 11.45 19.7 C 11.45 15.7 18.9 15.7 18.9 19.7 L 18.9 25.9' }] },
  n: { bredde: 17, strok: [{ d: 'M 4 16.3 L 4 25.9' }, { d: 'M 4 19.8 C 4 15.5 12.9 15.5 12.9 19.8 L 12.9 25.9' }] },
  o: { bredde: 16, strok: [{ d: sirkel(8, CY, R) }] },
  p: { bredde: 17, strok: [{ d: 'M 4 16.3 L 4 37.9' }, { d: 'M 4 17.8 A 4.9 4.9 0 1 1 4 24.2' }] },
  q: { bredde: 18, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 12.9 16.1 L 12.9 37.9' }] },
  r: { bredde: 13, strok: [{ d: 'M 4.3 16.3 L 4.3 25.9' }, { d: 'M 4.3 20.6 C 4.3 16.2 10.7 15.4 12.1 18.4' }] },
  s: { bredde: 15, strok: [{ d: 'M 11.7 17.6 C 10.5 15.6 4.9 15.5 4.3 18.1 C 3.7 20.7 11.6 20.5 12.1 23.3 C 12.5 25.9 5.6 26.7 3.8 24.4' }] },
  t: { bredde: 13, strok: [{ d: 'M 5.4 6.4 L 5.4 22.9 A 3.2 3.2 0 0 0 10.8 25.3' }, { d: 'M 2 15 L 9.8 15' }] },
  u: { bredde: 17, strok: [{ d: 'M 4 16.1 L 4 21 C 4 25.9 12.9 25.9 12.9 21 L 12.9 16.1' }, { d: 'M 12.9 16.1 L 12.9 25.9' }] },
  v: { bredde: 16, strok: [{ d: 'M 3.4 16.1 L 8 25.9 L 12.6 16.1' }] },
  w: { bredde: 19, strok: [{ d: 'M 2.6 16.1 L 6.2 25.9 L 9.6 17.4 L 13 25.9 L 16.6 16.1' }] },
  x: { bredde: 16, strok: [{ d: 'M 3.5 16.1 L 12.7 25.9' }, { d: 'M 12.7 16.1 L 3.5 25.9' }] },
  y: { bredde: 17, strok: [{ d: 'M 3.8 16.1 L 8.5 25.9' }, { d: 'M 13.4 16.1 L 7 33.1 C 6.1 35.7 3.3 36 1.9 34.2' }] },
  z: { bredde: 16, strok: [{ d: 'M 3.6 16.1 L 12.6 16.1 L 3.6 25.9 L 12.6 25.9' }] },
  æ: {
    bredde: 27,
    strok: [
      { d: sirkel(7.5, CY, 4.6) },
      { d: 'M 12.4 16.3 L 12.4 25.9' },
      { d: 'M 12.4 21.6 L 21.8 21.6 A 4.85 4.85 0 1 0 20.9 25.3' },
    ],
  },
  ø: { bredde: 16, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 13.2 14.8 L 2.8 27.2' }] },
  å: { bredde: 17, strok: [{ d: sirkel(8, CY, R) }, { d: 'M 12.9 16.1 L 12.9 25.9' }, { d: sirkel(8, 10.9, 2) }] },

  /* ---------- store bokstaver (brede, blekket hviler på linjene) ---------- */
  A: { bredde: 21, strok: [{ d: 'M 9.5 4.1 L 2.3 25.9' }, { d: 'M 9.5 4.1 L 16.7 25.9' }, { d: 'M 5 18.8 L 14 18.8' }] },
  B: { bredde: 19, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 8.9 4.1 A 5.05 5.05 0 1 1 8.9 14.2 L 4 14.2 L 9.4 14.2 A 5.85 5.85 0 1 1 9.4 25.9 L 4 25.9' }] },
  C: { bredde: 22, strok: [{ d: 'M 17.8 8.4 A 8.2 10.9 0 1 0 17.8 21.6' }] },
  D: { bredde: 19, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 7.2 4.1 C 17.6 4.1 17.6 25.9 7.2 25.9 L 4 25.9' }] },
  E: { bredde: 17, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 13.9 4.1' }, { d: 'M 4 15 L 12.2 15' }, { d: 'M 4 25.9 L 13.9 25.9' }] },
  F: { bredde: 17, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 13.9 4.1' }, { d: 'M 4 15 L 12 15' }] },
  G: { bredde: 22, strok: [{ d: 'M 17.8 8.4 A 8.2 10.9 0 1 0 17.8 21.6 L 17.8 16.8 L 12.2 16.8' }] },
  H: { bredde: 21, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 16.6 4.1 L 16.6 25.9' }, { d: 'M 4 15.3 L 16.6 15.3' }] },
  I: { bredde: 9, strok: [{ d: 'M 4.5 4.1 L 4.5 25.9' }] },
  J: { bredde: 16, strok: [{ d: 'M 12.6 4.1 L 12.6 20.9 A 5 5 0 0 1 2.6 20.9' }] },
  K: { bredde: 20, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 15.8 4.1 L 4.5 16' }, { d: 'M 8 12.4 L 16.4 25.9' }] },
  L: { bredde: 16, strok: [{ d: 'M 4 4.1 L 4 25.9 L 13.6 25.9' }] },
  M: { bredde: 22, strok: [{ d: 'M 3.4 4.1 L 3.4 25.9' }, { d: 'M 3.4 4.1 L 10.7 20 L 18 4.1' }, { d: 'M 18 4.1 L 18 25.9' }] },
  N: { bredde: 21, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 16.2 25.9' }, { d: 'M 16.2 4.1 L 16.2 25.9' }] },
  O: { bredde: 23, strok: [{ d: oval(11.2, 15, 8.6, 10.9) }] },
  P: { bredde: 18, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 9 4.1 A 5.65 5.65 0 1 1 9 15.5 L 4 15.5' }] },
  Q: { bredde: 23, strok: [{ d: oval(11.2, 15, 8.6, 10.9) }, { d: 'M 13.4 20.8 L 18.2 26.9' }] },
  R: { bredde: 19, strok: [{ d: 'M 4 4.1 L 4 25.9' }, { d: 'M 4 4.1 L 9 4.1 A 5.65 5.65 0 1 1 9 15.5 L 4 15.5' }, { d: 'M 9.2 15.5 L 16.2 25.9' }] },
  S: { bredde: 18, strok: [{ d: 'M 13.8 7.4 C 12 3.7 4.8 4.2 4.4 8.6 C 4 13.3 13.6 12.6 13.9 18.9 C 14.1 24.3 5.6 27.2 3.5 22.6' }] },
  T: { bredde: 19, strok: [{ d: 'M 9.7 4.1 L 9.7 25.9' }, { d: 'M 2.6 4.1 L 16.8 4.1' }] },
  U: { bredde: 20, strok: [{ d: 'M 3.8 4.1 L 3.8 18.4 C 3.8 27.7 16 27.7 16 18.4 L 16 4.1' }] },
  V: { bredde: 20, strok: [{ d: 'M 2.8 4.1 L 9.9 25.9 L 17 4.1' }] },
  W: { bredde: 23, strok: [{ d: 'M 2.2 4.1 L 6.8 25.9 L 11.1 8.6 L 15.4 25.9 L 20 4.1' }] },
  X: { bredde: 20, strok: [{ d: 'M 3.2 4.1 L 16.4 25.9' }, { d: 'M 16.4 4.1 L 3.2 25.9' }] },
  Y: { bredde: 20, strok: [{ d: 'M 3.4 4.1 L 9.8 15.8' }, { d: 'M 16.2 4.1 L 9.8 15.8' }, { d: 'M 9.8 15.8 L 9.8 25.9' }] },
  Z: { bredde: 19, strok: [{ d: 'M 3.4 4.1 L 15.8 4.1 L 3.4 25.9 L 15.8 25.9' }] },
  Æ: {
    bredde: 23,
    strok: [
      { d: 'M 10.6 4.1 L 2.2 25.9' },
      { d: 'M 10.6 4.1 L 10.6 25.9' },
      { d: 'M 10.6 4.1 L 19.4 4.1' },
      { d: 'M 5.2 18.6 L 17.6 18.6' },
      { d: 'M 10.6 25.9 L 19.4 25.9' },
    ],
  },
  Ø: { bredde: 23, strok: [{ d: oval(11.2, 15, 8.6, 10.9) }, { d: 'M 18.6 3.4 L 3.8 26.6' }] },
  Å: { bredde: 20, strok: [{ d: 'M 9.5 9 L 3 25.9' }, { d: 'M 9.5 9 L 16 25.9' }, { d: 'M 5.6 19.9 L 13.4 19.9' }, { d: sirkel(9.5, 4.4, 1.9) }] },
};

export const VOKALER = new Set([...'aeiouyæøå', ...'AEIOUYÆØÅ']);

/** Banen for et tegn, eller null når tegnet ikke finnes i biblioteket. */
export function bane(tegn: string): Bane | null {
  return BANER[tegn] ?? null;
}
