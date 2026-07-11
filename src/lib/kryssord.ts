/* Kryssord-kjernen: legger en ordliste som skjelett-kryssord (criss-cross).
   DOM-fri. Reglene er de klassiske: ord krysser hverandre kun der bokstaven
   er lik, to ord i samme retning kan aldri dele rute, og en tom rute ved
   siden av et ord må forbli tom (ingen sidekontakt). Dermed er hver
   sammenhengende bokstavrekke i rutenettet ALLTID et av lærerens ord —
   det kan aldri oppstå tilfeldige sekvenser. Bannordfilteret på input
   deles med Ordkryss (src/lib/ordkryss-kjerne.ts) og håndheves i UI-et. */

export type Retning = 'vannrett' | 'loddrett';

export interface KryssordPlassering {
  indeks: number; // ordets plass i inn-lista (kobler til ledetråden)
  ord: string; // normalisert, store bokstaver
  rad: number; // 0-basert i det beskårne rutenettet
  kol: number;
  retning: Retning;
  nummer: number; // ledetrådnummeret i ruta
}

export type KryssordResultat =
  | { rutenett: (string | null)[][]; plasseringer: KryssordPlassering[] }
  | { feil: 'for-faa-ord' }
  | { feil: 'fikk-ikke-plass'; ordListe: string[] };

interface Celle {
  bokstav: string;
  vannrett: boolean;
  loddrett: boolean;
}

interface Utkast {
  indeks: number;
  ord: string;
  rad: number;
  kol: number;
  retning: Retning;
}

interface Forsok {
  plasserte: Utkast[];
  manglet: number[]; // indekser som ikke fikk kobling
  areal: number;
}

const nokkel = (r: number, k: number) => `${r},${k}`;

function stokk<T>(liste: T[]): T[] {
  const kopi = [...liste];
  for (let i = kopi.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopi[i], kopi[j]] = [kopi[j], kopi[i]];
  }
  return kopi;
}

/* Gyldighet for én kandidatplassering. Returnerer antall kryssinger,
   eller null når plasseringen bryter reglene. */
function provPlassering(
  celler: Map<string, Celle>,
  ord: string,
  rad: number,
  kol: number,
  retning: Retning
): number | null {
  const dr = retning === 'loddrett' ? 1 : 0;
  const dc = retning === 'vannrett' ? 1 : 0;

  // Ruta før første og etter siste bokstav må være tom — ellers ville
  // ordet vokse sammen med et annet ord i samme retning
  if (celler.has(nokkel(rad - dr, kol - dc))) return null;
  if (celler.has(nokkel(rad + dr * ord.length, kol + dc * ord.length))) return null;

  let kryss = 0;
  for (let i = 0; i < ord.length; i++) {
    const r = rad + dr * i;
    const k = kol + dc * i;
    const eksisterende = celler.get(nokkel(r, k));

    if (eksisterende) {
      if (eksisterende.bokstav !== ord[i]) return null;
      // Ruta kan bare deles med et ord i MOTSATT retning (ekte kryssing)
      if (retning === 'vannrett' ? eksisterende.vannrett : eksisterende.loddrett) return null;
      kryss++;
    } else {
      // Ny rute: naboene på tvers må være tomme (ingen sidekontakt)
      const naboer =
        retning === 'vannrett'
          ? [nokkel(r - 1, k), nokkel(r + 1, k)]
          : [nokkel(r, k - 1), nokkel(r, k + 1)];
      if (naboer.some((n) => celler.has(n))) return null;
    }
  }
  return kryss;
}

function skrivInn(celler: Map<string, Celle>, u: Utkast) {
  const dr = u.retning === 'loddrett' ? 1 : 0;
  const dc = u.retning === 'vannrett' ? 1 : 0;
  for (let i = 0; i < u.ord.length; i++) {
    const nk = nokkel(u.rad + dr * i, u.kol + dc * i);
    const eksisterende = celler.get(nk);
    if (eksisterende) {
      if (u.retning === 'vannrett') eksisterende.vannrett = true;
      else eksisterende.loddrett = true;
    } else {
      celler.set(nk, {
        bokstav: u.ord[i],
        vannrett: u.retning === 'vannrett',
        loddrett: u.retning === 'loddrett',
      });
    }
  }
}

/* Ett forsøk: lengste ord som anker, deretter pass over resten til ingen
   flere fester seg. To rekkefølge-strategier veksler mellom forsøkene:
   «lengde» (lengst først) bygger kompakt, «sjeldenhet» tar de dårligst
   koblede ordene tidlig — ord som bare deler bokstav med ett annet ord
   (à la KIWI i en fruktliste) må inn før krysspunktene deres bygges
   igjen. Kandidater skåres på kryssinger og hvor lite de blåser opp
   rutenettet; blant de beste velges én tilfeldig så gjentatte forsøk
   gir ulike fasonger. */
function ettForsok(
  ord: { indeks: number; ord: string }[],
  strategi: 'lengde' | 'sjeldenhet'
): Forsok {
  let rekkefolge = stokk(ord).sort((a, b) => b.ord.length - a.ord.length);
  if (strategi === 'sjeldenhet') {
    const partnere = new Map<number, number>();
    for (const a of ord) {
      let antall = 0;
      for (const b of ord) {
        if (a !== b && [...a.ord].some((t) => b.ord.includes(t))) antall++;
      }
      partnere.set(a.indeks, antall);
    }
    const anker = rekkefolge[0];
    rekkefolge = [
      anker,
      ...stokk(rekkefolge.slice(1)).sort(
        (a, b) => (partnere.get(a.indeks) ?? 0) - (partnere.get(b.indeks) ?? 0)
      ),
    ];
  }
  const celler = new Map<string, Celle>();
  const plasserte: Utkast[] = [];

  const forste: Utkast = {
    ...rekkefolge[0],
    rad: 0,
    kol: 0,
    retning: Math.random() < 0.5 ? 'vannrett' : 'loddrett',
  };
  skrivInn(celler, forste);
  plasserte.push(forste);

  let venter = rekkefolge.slice(1);
  let fremgang = true;
  while (venter.length > 0 && fremgang) {
    fremgang = false;
    const rest: typeof venter = [];

    for (const kandidatOrd of venter) {
      type Kandidat = { utkast: Utkast; skaar: number };
      const kandidater: Kandidat[] = [];
      const provd = new Set<string>();

      // Grenser før plassering (for areal-straffen)
      let minR = Infinity, maxR = -Infinity, minK = Infinity, maxK = -Infinity;
      for (const nk of celler.keys()) {
        const [r, k] = nk.split(',').map(Number);
        if (r < minR) minR = r;
        if (r > maxR) maxR = r;
        if (k < minK) minK = k;
        if (k > maxK) maxK = k;
      }
      const arealFoer = (maxR - minR + 1) * (maxK - minK + 1);

      for (const [nk, celle] of celler) {
        const [r, k] = nk.split(',').map(Number);
        for (let i = 0; i < kandidatOrd.ord.length; i++) {
          if (kandidatOrd.ord[i] !== celle.bokstav) continue;
          for (const retning of ['vannrett', 'loddrett'] as Retning[]) {
            const dr = retning === 'loddrett' ? 1 : 0;
            const dc = retning === 'vannrett' ? 1 : 0;
            const rad = r - dr * i;
            const kol = k - dc * i;
            const id = `${rad},${kol},${retning}`;
            if (provd.has(id)) continue;
            provd.add(id);

            const kryss = provPlassering(celler, kandidatOrd.ord, rad, kol, retning);
            if (kryss === null || kryss === 0) continue;

            const nyMinR = Math.min(minR, rad);
            const nyMaxR = Math.max(maxR, rad + dr * (kandidatOrd.ord.length - 1));
            const nyMinK = Math.min(minK, kol);
            const nyMaxK = Math.max(maxK, kol + dc * (kandidatOrd.ord.length - 1));
            const arealEtter = (nyMaxR - nyMinR + 1) * (nyMaxK - nyMinK + 1);

            kandidater.push({
              utkast: { ...kandidatOrd, rad, kol, retning },
              skaar: kryss * 20 - (arealEtter - arealFoer),
            });
          }
        }
      }

      if (kandidater.length === 0) {
        rest.push(kandidatOrd);
        continue;
      }

      kandidater.sort((a, b) => b.skaar - a.skaar);
      const topp = kandidater.slice(0, 3);
      const valgt = topp[Math.floor(Math.random() * topp.length)];
      skrivInn(celler, valgt.utkast);
      plasserte.push(valgt.utkast);
      fremgang = true;
    }

    venter = rest;
  }

  let minR = Infinity, maxR = -Infinity, minK = Infinity, maxK = -Infinity;
  for (const nk of celler.keys()) {
    const [r, k] = nk.split(',').map(Number);
    if (r < minR) minR = r;
    if (r > maxR) maxR = r;
    if (k < minK) minK = k;
    if (k > maxK) maxK = k;
  }

  return {
    plasserte,
    manglet: venter.map((v) => v.indeks),
    areal: (maxR - minR + 1) * (maxK - minK + 1),
  };
}

/** Ordene skal være normalisert (normaliserOrd) og uten dubletter.
    indeksene i resultatet peker tilbake til inn-lista. */
export function lagKryssord(ord: string[]): KryssordResultat {
  if (ord.length < 2) return { feil: 'for-faa-ord' };
  const nummererte = ord.map((o, indeks) => ({ indeks, ord: o }));

  // Adaptivt antall forsøk: gi opp kompakthets-jaget tidlig, men jag
  // LENGE etter fullt hus — hvert forsøk koster millisekunder, og en
  // liste der alt henger sammen skal ikke strande på uflaks i rekkefølgen
  const MAKS_FORSOK = 240;
  let beste: Forsok | null = null;
  for (let f = 0; f < MAKS_FORSOK; f++) {
    const forsok = ettForsok(nummererte, f % 2 === 0 ? 'lengde' : 'sjeldenhet');
    if (
      !beste ||
      forsok.manglet.length < beste.manglet.length ||
      (forsok.manglet.length === beste.manglet.length && forsok.areal < beste.areal)
    ) {
      beste = forsok;
    }
    if (beste.manglet.length === 0 && f >= 24) break;
  }

  if (!beste || beste.manglet.length > 0) {
    return {
      feil: 'fikk-ikke-plass',
      ordListe: (beste?.manglet ?? []).map((i) => ord[i]),
    };
  }

  // Beskjær til 0-basert rutenett
  let minR = Infinity, minK = Infinity, maxR = -Infinity, maxK = -Infinity;
  for (const p of beste.plasserte) {
    const dr = p.retning === 'loddrett' ? 1 : 0;
    const dc = p.retning === 'vannrett' ? 1 : 0;
    minR = Math.min(minR, p.rad);
    minK = Math.min(minK, p.kol);
    maxR = Math.max(maxR, p.rad + dr * (p.ord.length - 1));
    maxK = Math.max(maxK, p.kol + dc * (p.ord.length - 1));
  }

  const rutenett: (string | null)[][] = Array.from(
    { length: maxR - minR + 1 },
    () => Array(maxK - minK + 1).fill(null)
  );
  for (const p of beste.plasserte) {
    const dr = p.retning === 'loddrett' ? 1 : 0;
    const dc = p.retning === 'vannrett' ? 1 : 0;
    for (let i = 0; i < p.ord.length; i++) {
      rutenett[p.rad - minR + dr * i][p.kol - minK + dc * i] = p.ord[i];
    }
  }

  // Nummerering: radvis skann, startruter får løpenummer — deler to ord
  // startrute (én vannrett, én loddrett), deler de nummer
  const startNummer = new Map<string, number>();
  let neste = 1;
  const sorterte = [...beste.plasserte].sort((a, b) => {
    const ra = a.rad - minR, rb = b.rad - minR;
    const ka = a.kol - minK, kb = b.kol - minK;
    return ra !== rb ? ra - rb : ka - kb;
  });
  const plasseringer: KryssordPlassering[] = sorterte.map((p) => {
    const start = nokkel(p.rad - minR, p.kol - minK);
    let nummer = startNummer.get(start);
    if (!nummer) {
      nummer = neste++;
      startNummer.set(start, nummer);
    }
    return {
      indeks: p.indeks,
      ord: p.ord,
      rad: p.rad - minR,
      kol: p.kol - minK,
      retning: p.retning,
      nummer,
    };
  });

  return { rutenett, plasseringer };
}
