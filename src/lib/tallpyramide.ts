/* Tallpyramide- og magisk kvadrat-kjernen. DOM-fri.
   Pyramide: hver stein er summen av de to under. Magisk kvadrat 3×3:
   alle rader, kolonner og diagonaler har samme sum (oppgis på arket).
   Genereringen lager KOMPLETT løsning først og skjuler deretter felter
   grådig — et felt forblir skjult bare hvis resten fortsatt kan løses
   med ren propagering (to kjente i en relasjon gir den tredje). Dermed
   er hver oppgave garantert løsbar og entydig, uten gjetting. */

export interface Pyramide {
  type: 'pyramide';
  rader: number[][]; // rader[0] er toppen (1 celle), siste er bunnen
  skjult: boolean[][];
}

export interface MagiskKvadrat {
  type: 'magisk';
  celler: number[]; // 9 celler, radvis
  skjult: boolean[];
  sum: number;
}

export type Vanskelighet = 'lett' | 'middels' | 'vanskelig';

function tilfeldig(fra: number, til: number): number {
  return fra + Math.floor(Math.random() * (til - fra + 1));
}

function stokk<T>(liste: T[]): T[] {
  const kopi = [...liste];
  for (let i = kopi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopi[i], kopi[j]] = [kopi[j], kopi[i]];
  }
  return kopi;
}

/* Andel felter som forsøkes skjult (vanskelig = alt som går) */
const HULL_ANDEL: Record<Vanskelighet, number> = {
  lett: 0.4,
  middels: 0.6,
  vanskelig: 1,
};

/* ---------- Pyramide ---------- */

/* Relasjoner: (forelder, venstre barn, høyre barn) som flate indekser */
function pyramideRelasjoner(antallRader: number): [number, number, number][] {
  const indeks = (rad: number, pos: number) => (rad * (rad + 1)) / 2 + pos;
  const relasjoner: [number, number, number][] = [];
  for (let rad = 0; rad < antallRader - 1; rad++) {
    for (let pos = 0; pos <= rad; pos++) {
      relasjoner.push([indeks(rad, pos), indeks(rad + 1, pos), indeks(rad + 1, pos + 1)]);
    }
  }
  return relasjoner;
}

/* Kan alt løses med propagering fra de synlige feltene? */
function pyramideLosbar(
  verdier: number[],
  skjult: boolean[],
  relasjoner: [number, number, number][]
): boolean {
  const kjent = skjult.map((s) => !s);
  let fremgang = true;
  while (fremgang) {
    fremgang = false;
    for (const [f, v, h] of relasjoner) {
      const antall = Number(kjent[f]) + Number(kjent[v]) + Number(kjent[h]);
      if (antall === 2) {
        if (!kjent[f]) kjent[f] = true;
        else if (!kjent[v]) kjent[v] = true;
        else kjent[h] = true;
        fremgang = true;
      }
    }
  }
  return kjent.every(Boolean);
}

export function lagPyramide(
  antallRader: number,
  makstopp: number,
  vanskelighet: Vanskelighet
): Pyramide {
  // binomialkoeffisienter bestemmer toppen: sum(koeff[i] * bunn[i])
  const koeff: number[] = [1];
  for (let i = 1; i < antallRader; i++) {
    koeff.unshift(0);
    for (let j = 0; j < koeff.length - 1; j++) koeff[j] += koeff[j + 1];
  }
  const maksBunn = Math.max(1, Math.floor(makstopp / koeff.reduce((a, b) => a + b, 0)));

  // komplett løsning
  let bunn: number[] = [];
  for (let forsok = 0; forsok < 200; forsok++) {
    bunn = Array.from({ length: antallRader }, () => tilfeldig(0, Math.max(2, maksBunn + 2)));
    const topp = bunn.reduce((sum, v, i) => sum + v * koeff[i], 0);
    if (topp <= makstopp && topp > 0) break;
  }
  const rader: number[][] = [bunn];
  while (rader[0].length > 1) {
    const under = rader[0];
    rader.unshift(under.slice(0, -1).map((v, i) => v + under[i + 1]));
  }

  // flat: [topp, rad2..., bunn...] i samme rekkefølge som relasjonene
  const flate = rader.flat();
  const relasjoner = pyramideRelasjoner(antallRader);
  const skjult = flate.map(() => false);
  const kvote = Math.round(flate.length * HULL_ANDEL[vanskelighet]);
  let skjulte = 0;
  for (const i of stokk(flate.map((_, idx) => idx))) {
    if (skjulte >= kvote) break;
    skjult[i] = true;
    if (pyramideLosbar(flate, skjult, relasjoner)) skjulte++;
    else skjult[i] = false;
  }

  // tilbake til radform
  const skjultRader: boolean[][] = [];
  let peker = 0;
  rader.forEach((rad) => {
    skjultRader.push(skjult.slice(peker, peker + rad.length));
    peker += rad.length;
  });

  return { type: 'pyramide', rader, skjult: skjultRader };
}

/* ---------- Magisk kvadrat 3×3 ---------- */

const LINJER: [number, number, number][] = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rader
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolonner
  [0, 4, 8], [2, 4, 6], // diagonaler
];

function magiskLosbar(skjult: boolean[]): boolean {
  const kjent = skjult.map((s) => !s);
  let fremgang = true;
  while (fremgang) {
    fremgang = false;
    for (const [a, b, c] of LINJER) {
      const antall = Number(kjent[a]) + Number(kjent[b]) + Number(kjent[c]);
      if (antall === 2) {
        if (!kjent[a]) kjent[a] = true;
        else if (!kjent[b]) kjent[b] = true;
        else kjent[c] = true;
        fremgang = true;
      }
    }
  }
  return kjent.every(Boolean);
}

export function lagMagiskKvadrat(maks: number, vanskelighet: Vanskelighet): MagiskKvadrat {
  // generell 3×3: senter c, parametre a og b — alle linjer summerer 3c
  let celler: number[] = [];
  for (let forsok = 0; forsok < 500; forsok++) {
    const c = tilfeldig(5, Math.max(6, Math.floor(maks / 2)));
    const a = tilfeldig(1, Math.max(2, Math.floor(c / 2)));
    const b = tilfeldig(1, Math.max(2, Math.floor(c / 2)));
    const kandidat = [
      c + a, c - a - b, c + b,
      c - a + b, c, c + a - b,
      c - b, c + a + b, c - a,
    ];
    const unike = new Set(kandidat);
    if (unike.size === 9 && kandidat.every((v) => v >= 0 && v <= maks)) {
      celler = kandidat;
      break;
    }
  }
  if (celler.length === 0) {
    // fallback: Lo Shu
    celler = [4, 9, 2, 3, 5, 7, 8, 1, 6];
  }

  const skjult = celler.map(() => false);
  const kvote = Math.round(9 * HULL_ANDEL[vanskelighet]);
  let skjulte = 0;
  for (const i of stokk(celler.map((_, idx) => idx))) {
    if (skjulte >= kvote) break;
    skjult[i] = true;
    if (magiskLosbar(skjult)) skjulte++;
    else skjult[i] = false;
  }

  return { type: 'magisk', celler, skjult, sum: celler[4] * 3 };
}
