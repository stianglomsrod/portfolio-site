/* Regneark-kjernen: genererer regnestykker med pedagogiske regler.
   DOM-fri. Reglene: aldri negative svar, divisjon går alltid opp,
   ingen dublett-stykker, og tierovergang kan kreves eller forbys for
   pluss/minus (selve differensieringen på småtrinnet). */

export type Regneart = 'pluss' | 'minus' | 'gange' | 'dele';

export interface Oppgave {
  a: number;
  b: number;
  art: Regneart;
  svar: number;
  aapen: boolean; // åpen oppgave: «a + _ = svar» (finn b)
}

export type RegnearkResultat =
  | { oppgaver: Oppgave[] }
  | { feil: 'ingen-arter' }
  | { feil: 'for-faa-mulige'; klarte: number };

export const TEGN: Record<Regneart, string> = {
  pluss: '+',
  minus: '−',
  gange: '·',
  dele: ':',
};

function tilfeldig(maks: number): number {
  return Math.floor(Math.random() * (maks + 1));
}

/* Tierovergang: pluss krysser tieren når enersifrene summerer ≥ 10,
   minus låner når eners-sifferet i a er mindre enn i b. */
function harOvergang(art: Regneart, a: number, b: number): boolean {
  if (art === 'pluss') return (a % 10) + (b % 10) >= 10;
  if (art === 'minus') return a % 10 < b % 10;
  return false;
}

export function lagRegneark({
  arter,
  maks,
  antall,
  overgang, // 'blandet' | 'uten' | 'med' — kun pluss/minus
  aapneAndel, // 0..1
}: {
  arter: Regneart[];
  maks: number;
  antall: number;
  overgang: 'blandet' | 'uten' | 'med';
  aapneAndel: number;
}): RegnearkResultat {
  if (arter.length === 0) return { feil: 'ingen-arter' };

  const oppgaver: Oppgave[] = [];
  const brukte = new Set<string>();
  let bom = 0;
  const MAKS_BOM = 4000;

  while (oppgaver.length < antall && bom < MAKS_BOM) {
    const art = arter[Math.floor(Math.random() * arter.length)];
    let a = 0, b = 0, svar = 0;

    if (art === 'pluss') {
      a = tilfeldig(maks);
      b = tilfeldig(maks - a);
      svar = a + b;
    } else if (art === 'minus') {
      a = tilfeldig(maks);
      b = tilfeldig(a);
      svar = a - b;
    } else if (art === 'gange') {
      const grense = Math.min(10, maks);
      a = 1 + Math.floor(Math.random() * grense);
      b = 1 + Math.floor(Math.random() * grense);
      if (a * b > maks) { bom++; continue; }
      svar = a * b;
    } else {
      const grense = Math.min(10, maks);
      b = 1 + Math.floor(Math.random() * grense);
      svar = 1 + Math.floor(Math.random() * grense);
      a = b * svar;
      if (a > maks) { bom++; continue; }
    }

    if ((art === 'pluss' || art === 'minus') && overgang !== 'blandet') {
      const kryss = harOvergang(art, a, b);
      if (overgang === 'med' && !kryss) { bom++; continue; }
      if (overgang === 'uten' && kryss) { bom++; continue; }
    }
    // «med tierovergang» på 0–10 er umulig for pluss (summen må ≤ 10);
    // bom-telleren fanger det og gir for-faa-mulige

    const nokkel = `${art}|${a}|${b}`;
    if (brukte.has(nokkel)) { bom++; continue; }
    brukte.add(nokkel);

    oppgaver.push({ a, b, art, svar, aapen: false });
    bom = 0;
  }

  if (oppgaver.length < antall) {
    return { feil: 'for-faa-mulige', klarte: oppgaver.length };
  }

  // Åpne oppgaver: spre dem jevnt via stokket indeksliste
  const antallAapne = Math.round(antall * aapneAndel);
  const indekser = oppgaver.map((_, i) => i);
  for (let i = indekser.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indekser[i], indekser[j]] = [indekser[j], indekser[i]];
  }
  indekser.slice(0, antallAapne).forEach((i) => {
    // b = 0 i åpne minus/dele gir «a − _ = a» der 0 er åpenbar — greit
    oppgaver[i].aapen = true;
  });

  return { oppgaver };
}
