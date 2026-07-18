/* Bildebank-kjernen: ord → bildekoder, uten DOM og uten nettverk.
   Brukes av bildebank-brikke.ts i verktøyene og av Node-testene direkte.

   Kodeformat i indeksene (låst beslutning):
   - Emoji: store hex-strenger, sekvenser med bindestrek
     ("1F404", "1F1F3-1F1F4", "1F43B-200D-2744-FE0F").
   - Mulberry: "m:" + filnavn uten .svg ("m:catch_2_,_to").
   - Flere koder per ord = alternativene ⟳ sykler gjennom.
     Emoji først, Mulberry bakerst.

   Norsk robusthet (validerte regler — ikke endre uten nye tester):
   1. Bøyningsfallback: eksakt; ellers stripp «ene, en, et, er, a, n, t»
      og test base + base+«e» (base ≥ 2 tegn). El/er-synkope: base som
      ender på konsonant + l/r prøver e-innskudd og konsonantdobling
      («vaflene» → vaffel, «sykler» → sykkel). Kjent hull: vokalskifte
      («bøkene» treffer ikke) — akseptert.
   2. Sammensatte ord (kun norsk, ≥ 6 tegn uten mellomrom/bindestrek):
      foreslå kun hodet (siste ledd) — en ostehøvel er ikke en ost.
      Lengste kjente hode vinner. Fuge-s/-e strippes fra forleddet.
      Hode ≥ 3 tegn krever kjent forledd ELLER forledd ≥ 5 tegn;
      hode på 2 tegn (som «is») krever kjent forledd. Merkes synlig.
   3. Kuratering skjer i indeksene: ingen forslag er bedre enn feil. */

export type Ordbok = Record<string, string[]>;

export type Spraak = 'nb' | 'en';

export interface Forslag {
  /** Ordet forslaget faktisk gjelder (hodet ved sammensatt ord). */
  ord: string;
  /** Alternativene ⟳ sykler gjennom. Emoji først, m:-koder bakerst. */
  koder: string[];
  /** true → forslaget gjelder siste ledd i et sammensatt ord. */
  sammensatt: boolean;
}

const EMOJI_KODE = /^[0-9A-F]{2,6}(-[0-9A-F]{2,6})*$/;
// Mulberry-filnavn: bokstaver, tall, understrek, komma, apostrof,
// parenteser og bindestrek ("catch_2_,_to", "Advent_calendar"). Alt annet
// avvises — koden blir del av en URL og skal aldri kunne bære stier.
const MULBERRY_KODE = /^m:[A-Za-z0-9_,()'-]+$/;

export function erEmojiKode(kode: string): boolean {
  return EMOJI_KODE.test(kode);
}

export function erMulberryKode(kode: string): boolean {
  return MULBERRY_KODE.test(kode);
}

export function erGyldigKode(kode: string): boolean {
  return erEmojiKode(kode) || erMulberryKode(kode);
}

/** NFC + trim + små bokstaver — «Å» fra macOS (NFD) og «å» skal være samme
    nøkkel. Indre mellomrom kollapses («ice  cream» → «ice cream»). */
export function normaliserOrd(raa: string): string {
  return raa.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
}

/* ---------- bøyning ---------- */

const SUFFIKSER = ['ene', 'en', 'et', 'er', 'a', 'n', 't'];
const KONSONANT = /[bcdfghjklmnpqrstvwxz]/;

/** Kandidatformer for et bøyd ord, i prioritert rekkefølge (uten ordet selv). */
export function boyningsKandidater(ord: string): string[] {
  const kandidater: string[] = [];
  const leggTil = (k: string) => {
    if (k.length >= 2 && k !== ord && !kandidater.includes(k)) kandidater.push(k);
  };

  for (const suffiks of SUFFIKSER) {
    if (!ord.endsWith(suffiks)) continue;
    const base = ord.slice(0, ord.length - suffiks.length);
    if (base.length < 2) continue;
    leggTil(base);
    // el/er-synkope FØR base+e: «sykler» skal gi sykkel (substantivet),
    // ikke sykle (verbet). «vafl» → vafel/vaffel, «sykl» → sykel/sykkel.
    // Dobbel l/r («ball») er ikke synkope.
    const siste = base[base.length - 1];
    const nestSiste = base[base.length - 2];
    if (
      (siste === 'l' || siste === 'r') &&
      KONSONANT.test(nestSiste) &&
      nestSiste !== siste
    ) {
      const stamme = base.slice(0, -2);
      leggTil(stamme + nestSiste + 'e' + siste);
      leggTil(stamme + nestSiste + nestSiste + 'e' + siste);
    }
    leggTil(base + 'e');
  }
  return kandidater;
}

/** Engelsk holder seg til eksakt + enkel flertalls-stripp. */
function engelskeKandidater(ord: string): string[] {
  const kandidater: string[] = [];
  if (ord.endsWith('es') && ord.length >= 4) kandidater.push(ord.slice(0, -2));
  if (ord.endsWith('s') && ord.length >= 3) kandidater.push(ord.slice(0, -1));
  return kandidater;
}

function eksaktEllerBoyd(ordbok: Ordbok, ord: string, spraak: Spraak): string | null {
  if (ordbok[ord]?.length) return ord;
  const kandidater = spraak === 'nb' ? boyningsKandidater(ord) : engelskeKandidater(ord);
  for (const kandidat of kandidater) {
    if (ordbok[kandidat]?.length) return kandidat;
  }
  return null;
}

/* ---------- sammensatte ord (kun norsk) ---------- */

function erKjentForledd(ordbok: Ordbok, forledd: string): boolean {
  if (ordbok[forledd]?.length) return true;
  // Fuge-s/-e: «arbeids-» → arbeid, «oste-» → ost.
  const siste = forledd[forledd.length - 1];
  if (siste === 's' || siste === 'e') {
    const strippet = forledd.slice(0, -1);
    if (strippet.length >= 2 && ordbok[strippet]?.length) return true;
  }
  return false;
}

function sammensattOppslag(ordbok: Ordbok, ord: string): Forslag | null {
  if (ord.length < 6 || /[\s-]/.test(ord)) return null;
  // i vokser → hodet krymper: første gyldige treff er lengste kjente hode.
  for (let i = 1; i <= ord.length - 2; i++) {
    const hode = ord.slice(i);
    const forledd = ord.slice(0, i);
    const kjentHode = eksaktEllerBoyd(ordbok, hode, 'nb');
    if (!kjentHode) continue;
    const kjentForledd = erKjentForledd(ordbok, forledd);
    if (hode.length === 2 && !kjentForledd) continue;
    if (hode.length >= 3 && !kjentForledd && forledd.length < 5) continue;
    return { ord: kjentHode, koder: [...ordbok[kjentHode]], sammensatt: true };
  }
  return null;
}

/* ---------- oppslag ---------- */

/** Slår opp et ord: eksakt → bøyning → sammensatt (kun nb). null = ærlig tomt.
    Flerords-nøkler («ice cream») slås kun opp eksakt. */
export function slaaOpp(ordbok: Ordbok, raaOrd: string, spraak: Spraak = 'nb'): Forslag | null {
  const ord = normaliserOrd(raaOrd);
  if (!ord) return null;

  if (/\s/.test(ord)) {
    const koder = ordbok[ord];
    return koder?.length ? { ord, koder: [...koder], sammensatt: false } : null;
  }

  const direkte = eksaktEllerBoyd(ordbok, ord, spraak);
  if (direkte) return { ord: direkte, koder: [...ordbok[direkte]], sammensatt: false };

  if (spraak === 'nb') return sammensattOppslag(ordbok, ord);
  return null;
}

/* ---------- lagvis utviding ---------- */

/** Fletter ekstra ordbøker inn i basisen uten duplikater.
    Emoji-koder beholder rekkefølgen og står først; m:-koder havner bakerst.
    Ugyldige koder forkastes (indeksdata behandles ikke som betrodd). */
export function utvid(basis: Ordbok, ...lag: Ordbok[]): Ordbok {
  const resultat: Ordbok = {};
  for (const [ord, koder] of Object.entries(basis)) {
    resultat[normaliserOrd(ord)] = koder.filter(erGyldigKode);
  }
  for (const ordbok of lag) {
    for (const [raaOrd, koder] of Object.entries(ordbok)) {
      const ord = normaliserOrd(raaOrd);
      if (!ord) continue;
      const gamle = resultat[ord] ?? [];
      const nye = [...gamle];
      for (const kode of koder) {
        if (erGyldigKode(kode) && !nye.includes(kode)) nye.push(kode);
      }
      resultat[ord] = nye;
    }
  }
  for (const ord of Object.keys(resultat)) {
    const koder = resultat[ord];
    resultat[ord] = [
      ...koder.filter((k) => !erMulberryKode(k)),
      ...koder.filter(erMulberryKode),
    ];
    if (resultat[ord].length === 0) delete resultat[ord];
  }
  return resultat;
}

/* ---------- koder → bilder ---------- */

export type Bildestil = 'system' | 'farge' | 'strek';

/** Rot for de selvhostede filene. Kan overstyres i dev/test. */
export const BILDEBANK_ROT = '/bildebank';

/** URL til SVG-fila for en kode, eller null hvis koden er ugyldig.
    Mulberry-filnavn URL-kodes (komma!). Systemstil har ingen URL for
    emoji (glyfen brukes), men Mulberry rendres alltid som bilde. */
export function bildeUrl(kode: string, stil: Bildestil, rot: string = BILDEBANK_ROT): string | null {
  if (erMulberryKode(kode)) {
    return `${rot}/mulberry/${encodeURIComponent(kode.slice(2))}.svg`;
  }
  if (erEmojiKode(kode)) {
    if (stil === 'system') return null;
    const mappe = stil === 'strek' ? 'black' : 'color';
    return `${rot}/${mappe}/svg/${kode}.svg`;
  }
  return null;
}

/** Emoji-koden som tegn for systememoji-stilen (null for m:-koder).
    Enkelttegn uten emojipresentasjon får FE0F så de ikke blir smale
    teksttegn («☀» → «☀️»). */
export function emojiTegn(kode: string): string | null {
  if (!erEmojiKode(kode)) return null;
  const deler = kode.split('-').map((del) => parseInt(del, 16));
  if (deler.some((n) => Number.isNaN(n) || n > 0x10ffff)) return null;
  let tegn = String.fromCodePoint(...deler);
  if (deler.length === 1 && deler[0] < 0x1f000) tegn += '️';
  return tegn;
}
