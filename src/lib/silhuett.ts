/* Silhuett-kjernen: klassifiserer bokstaver i høye, lave og dype bokser
   slik skriveopplæringsark gjør det. Høye bokser rager over x-høyden
   (b, d, f …), dype henger under grunnlinja (g, j, p …), resten er lave.
   Ordene silhuetteres med små bokstaver — store bokstaver senkes først. */

export type BoksType = 'hoy' | 'lav' | 'dyp';

export interface Boks {
  tegn: string;
  type: BoksType;
}

const HOYE = new Set(['b', 'd', 'f', 'h', 'k', 'l', 't', 'å']);
const DYPE = new Set(['g', 'j', 'p', 'q', 'y']);
const BOKSTAV = /[a-zæøå]/;

/** Silhuett-boksene for et ord: én boks per bokstav, alt annet droppes. */
export function bokstavBokser(ord: string): Boks[] {
  return [...ord.toLowerCase()]
    .filter((tegn) => BOKSTAV.test(tegn))
    .map((tegn) => ({
      tegn,
      type: HOYE.has(tegn) ? 'hoy' : DYPE.has(tegn) ? 'dyp' : 'lav',
    }));
}
