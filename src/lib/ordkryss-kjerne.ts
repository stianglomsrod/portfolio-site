/* Ordkryss-kjernen: generering av ordletingsark + bannordfilter.
   DOM-fri. Samme logikk som i det frittstående verktøyet i
   «cs50x final project»-mappa (der ligger også Node-testene). */

export const ALFABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ';

export const RETNINGER = {
  vannrett: { dr: 0, dc: 1 },
  loddrett: { dr: 1, dc: 0 },
  diagonal: { dr: 1, dc: 1 },
} as const;

export type RetningsNavn = keyof typeof RETNINGER;

/* Bannord som ikke skal kunne leses i et ark som havner i et klasserom.
   Norsk, engelsk, svensk/dansk, tysk, spansk og fransk. Brukes to steder:
   mot lærerens egne ord (hele/lange treff) og mot alle leselinjer i det
   ferdige rutenettet (substring, begge leseretninger). */
const BANNORD = [
  // norsk
  'faen', 'fitte', 'fitta', 'kuk', 'kukk', 'pikk', 'hore', 'horunge',
  'jævel', 'jævla', 'jævlig', 'helvete', 'satan', 'dritt', 'ræva',
  'rævhøl', 'pule', 'puler', 'knulle', 'knuller', 'homo', 'homse',
  'neger', 'svarting', 'mongo', 'hestkuk', 'forpult', 'føkk', 'føkka',
  'bæsjepikk', 'kødd', 'kødda',
  // engelsk
  'fuck', 'fucker', 'fucking', 'shit', 'bitch', 'cunt', 'cock', 'dick',
  'pussy', 'asshole', 'arse', 'bastard', 'slut', 'whore', 'nigger',
  'nigga', 'faggot', 'retard', 'wanker', 'twat', 'bollocks', 'penis',
  // svensk/dansk
  'knulla', 'hora', 'jävla', 'fanden', 'luder', 'kusse',
  // tysk
  'scheisse', 'arschloch', 'ficken', 'fotze', 'hurensohn',
  // spansk
  'puta', 'puto', 'mierda', 'cabron', 'polla', 'joder', 'gilipollas',
  // fransk
  'merde', 'putain', 'salope', 'connard', 'encule',
];

export interface Plassering {
  ord: string;
  celler: [number, number][];
}

export type OrdkryssResultat =
  | { rutenett: string[][]; plasseringer: Plassering[]; feil?: undefined }
  | { feil: 'ingen-retninger' | 'fikk-ikke-plass' }
  | { feil: 'for-langt'; ordListe: string[] };

/* Store bokstaver, vanlige aksenter foldes, alt utenfor A–Å strippes. */
export function normaliserOrd(raatekst: string): string {
  const foldinger: Record<string, string> = {
    É: 'E', È: 'E', Ê: 'E', Ü: 'U', Ö: 'Ø', Ä: 'Æ', À: 'A', Á: 'A',
  };
  return raatekst
    .toUpperCase()
    .split('')
    .map((t) => foldinger[t] ?? t)
    .filter((t) => ALFABET.includes(t))
    .join('');
}

/* Uskyldige ord som inneholder et bannord som delstreng: «sofaen»
   inneholder faen, «slutt» inneholder slut, «homogen» inneholder homo.
   Et ord frikjennes bare når HVER forekomst av bannordet ligger inni
   et av unntaksordene — «faenskapsofaen» stoppes fortsatt. */
const UNNTAK: Record<string, string[]> = {
  faen: ['sofaen'],
  slut: ['slutt', 'slutn'], // slutte/til slutt + avslutning/beslutning
  homo: ['homogen', 'homofon', 'homonym'],
  pule: ['spule'],
  kukk: ['kukkelure'],
  puta: ['amputa'],
  cock: ['cocktail'],
  merde: ['merden', 'merder', 'merdene'],
};

function erFrikjent(norm: string, bann: string): boolean {
  const unntak = UNNTAK[bann];
  if (!unntak) return false;
  let fra = norm.indexOf(bann);
  while (fra !== -1) {
    const dekket = unntak.some((u) => {
      const offset = u.indexOf(bann);
      if (offset === -1) return false;
      const start = fra - offset;
      return start >= 0 && norm.slice(start, start + u.length) === u;
    });
    if (!dekket) return false;
    fra = norm.indexOf(bann, fra + 1);
  }
  return true;
}

/* Korte bannord må treffe hele ordet, lengre (4+) også som del av det.
   Da stoppes «FAENSKAP», mens «KLASSE» — og «sofaen» — går fint. */
export function ordErUpassende(ord: string): boolean {
  const norm = normaliserOrd(ord).toLowerCase();
  if (!norm) return false;
  return BANNORD.some((b) =>
    b.length >= 4 ? norm.includes(b) && !erFrikjent(norm, b) : norm === b
  );
}

/* Alle leselinjer: rader, kolonner og begge diagonalretninger — hver av
   dem også baklengs. */
export function alleLinjer(rutenett: string[][]): string[] {
  const n = rutenett.length;
  const linjer: string[] = [];

  for (let r = 0; r < n; r++) linjer.push(rutenett[r].join(''));
  for (let k = 0; k < n; k++) linjer.push(rutenett.map((rad) => rad[k]).join(''));

  for (let start = -(n - 1); start <= n - 1; start++) {
    let nedHoyre = '';
    let nedVenstre = '';
    for (let r = 0; r < n; r++) {
      const k1 = r - start;
      if (k1 >= 0 && k1 < n) nedHoyre += rutenett[r][k1];
      const k2 = n - 1 - r + start;
      if (k2 >= 0 && k2 < n) nedVenstre += rutenett[r][k2];
    }
    if (nedHoyre.length >= 3) linjer.push(nedHoyre);
    if (nedVenstre.length >= 3) linjer.push(nedVenstre);
  }

  return linjer.flatMap((l) => [l, l.split('').reverse().join('')]);
}

/* Bannord som er del av et av lærerens egne ord unntas (ellers kunne et
   lovlig ord gjort generering umulig). */
export function rutenettErRent(rutenett: string[][], egneOrd: string[]): boolean {
  const egne = egneOrd.map((o) => o.toLowerCase());
  const skanneliste = BANNORD.filter((b) => !egne.some((o) => o.includes(b)));
  const linjer = alleLinjer(rutenett).map((l) => l.toLowerCase());
  return !linjer.some((l) => skanneliste.some((b) => l.includes(b)));
}

function tilfeldigBokstav(): string {
  return ALFABET[Math.floor(Math.random() * ALFABET.length)];
}

/* Ord kan krysse hverandre der bokstaven er lik. Bannord i sluttresultatet
   gir ny runde. */
export function lagOrdkryss({
  ord,
  storrelse,
  retninger,
}: {
  ord: string[];
  storrelse: number;
  retninger: Partial<Record<RetningsNavn, boolean>>;
}): OrdkryssResultat {
  const aktiveRetninger = (Object.keys(RETNINGER) as RetningsNavn[])
    .filter((navn) => retninger[navn])
    .map((navn) => RETNINGER[navn]);

  if (aktiveRetninger.length === 0) return { feil: 'ingen-retninger' };

  const forLange = ord.filter((o) => o.length > storrelse);
  if (forLange.length > 0) return { feil: 'for-langt', ordListe: forLange };

  const YTRE_FORSOK = 80;
  const INDRE_FORSOK = 250;

  for (let runde = 0; runde < YTRE_FORSOK; runde++) {
    const rutenett: string[][] = Array.from({ length: storrelse }, () =>
      Array(storrelse).fill('')
    );
    const plasseringer: Plassering[] = [];
    const sortert = [...ord].sort((a, b) => b.length - a.length);
    let alleInne = true;

    for (const o of sortert) {
      let plassert = false;

      for (let i = 0; i < INDRE_FORSOK && !plassert; i++) {
        const ret = aktiveRetninger[Math.floor(Math.random() * aktiveRetninger.length)];
        const maksRad = storrelse - (ret.dr ? o.length : 1);
        const maksKol = storrelse - (ret.dc ? o.length : 1);
        const rad = Math.floor(Math.random() * (maksRad + 1));
        const kol = Math.floor(Math.random() * (maksKol + 1));

        let passer = true;
        for (let j = 0; j < o.length; j++) {
          const eksisterende = rutenett[rad + ret.dr * j][kol + ret.dc * j];
          if (eksisterende && eksisterende !== o[j]) {
            passer = false;
            break;
          }
        }
        if (!passer) continue;

        const celler: [number, number][] = [];
        for (let j = 0; j < o.length; j++) {
          rutenett[rad + ret.dr * j][kol + ret.dc * j] = o[j];
          celler.push([rad + ret.dr * j, kol + ret.dc * j]);
        }
        plasseringer.push({ ord: o, celler });
        plassert = true;
      }

      if (!plassert) {
        alleInne = false;
        break;
      }
    }

    if (!alleInne) continue;

    for (let r = 0; r < storrelse; r++) {
      for (let k = 0; k < storrelse; k++) {
        if (!rutenett[r][k]) rutenett[r][k] = tilfeldigBokstav();
      }
    }

    if (!rutenettErRent(rutenett, ord)) continue;

    return { rutenett, plasseringer };
  }

  return { feil: 'fikk-ikke-plass' };
}
