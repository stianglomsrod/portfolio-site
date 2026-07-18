/* Bildebank-brikken: UI-laget over bildebank.ts, delt av verktøyene i
   Lærerrommet. Verktøyet kaller monter(id, felt, rad) hver gang en
   ordrad tegnes (radene retegnes ofte — tilstanden bor her, per ord-id),
   og spør forslagFor(id)/lagArkElement(id) ved generering.

   Kontrakt (låst i docs/PRD-bildebank.md):
   - Forslag vises som brikke ved ordfeltet (debounce ~250 ms).
   - ⟳ kun når det finnes flere alternativer; ✕ huskes til teksten endres.
   - Lærerens eget bilde vinner alltid — brikken er bare et forslag.
   - Sammensatte ord merkes synlig («siste ledd i ordet»).
   - 404 → neste alternativ; er lista tom får emoji systemglyfen,
     ellers trekkes forslaget stille.
   - Ord uten treff samles i ønskelista (kun i minnet, først ved blur —
     ikke for hvert tastetrykk) — frivillig innsending via mailto.
   - Ekte knapper med aria, reduced motion respekteres, ingen innerHTML
     med brukertekst, brikken vises aldri på utskrift. */

import {
  slaaOpp,
  utvid,
  bildeUrl,
  emojiTegn,
  erEmojiKode,
  normaliserOrd,
  type Bildestil,
  type Forslag,
  type Ordbok,
  type Spraak,
} from './bildebank';

interface Oppsett {
  /** Verktøysidens språk — styrer standardindeks og brikkens tekster. */
  lang: Spraak;
  /** Adresse for den frivillige ønskeliste-mailtoen. */
  epost?: string;
  /** Ord som ikke hører hjemme i en ønskeliste (bannordfilteret). */
  erUpassende?: (ord: string) => boolean;
  /** Kalles når et forslag endrer seg (vist/byttet/fjernet). */
  paaEndring?: () => void;
}

interface Tilstand {
  noekkel: string; // normalisert tekst forslaget gjelder
  forslag: Forslag | null;
  valgt: number;
  fjernet: boolean;
  doede: Set<string>;
  glyfTvang: string | null; // emoji-kode som vises som glyf etter 404
  timer: number | undefined;
  holder: HTMLElement | null;
}

const STIL_NOKKEL = 'bildebank-stil';
const DEBOUNCE_MS = 250;

const TEKSTER = {
  nb: {
    sisteLedd: 'siste ledd i ordet',
    bytt: (ord: string, n: number, av: number) => `Bytt bildeforslag for «${ord}» (${n} av ${av})`,
    fjern: (ord: string) => `Fjern bildeforslaget for «${ord}»`,
    forslagAlt: (ord: string) => `Bildeforslag: ${ord}`,
    spraakvalg: 'Engelske ord',
    stil: 'Bildestil',
    stiler: { farge: 'Farge', strek: 'Strek (til fargelegging)', system: 'Systememoji' },
    onskeliste: (n: number) => (n === 1 ? '1 ord uten bildeforslag' : `${n} ord uten bildeforslag`),
    sendOnskeliste: 'send ønskeliste',
    onskelisteEmne: 'Ønskeliste til bildebanken',
    onskelisteKropp:
      'Hei! Disse ordene fikk ikke bildeforslag i Lærerrommet. Kanskje til en senere utgave?',
  },
  en: {
    sisteLedd: 'last part of the word',
    bytt: (ord: string, n: number, av: number) =>
      `Change picture suggestion for “${ord}” (${n} of ${av})`,
    fjern: (ord: string) => `Remove the picture suggestion for “${ord}”`,
    forslagAlt: (ord: string) => `Picture suggestion: ${ord}`,
    spraakvalg: 'Norwegian words',
    stil: 'Picture style',
    stiler: { farge: 'Colour', strek: 'Outline (for colouring in)', system: 'System emoji' },
    onskeliste: (n: number) =>
      n === 1 ? '1 word without a suggestion' : `${n} words without a suggestion`,
    sendOnskeliste: 'send wish list',
    onskelisteEmne: 'Wish list for the picture bank',
    onskelisteKropp:
      'Hi! These words did not get a picture suggestion in the teacher tools. Maybe for a later version?',
  },
} as const;

/* ---------- indekslasting (lazy, cache per språk) ---------- */

const INDEKS_FILER: Record<Spraak, string[]> = {
  nb: [
    '/bildebank/indeks/nb.json',
    '/bildebank/indeks/nb-cldr.json',
    '/bildebank/indeks/mulberry-nb.json',
  ],
  en: ['/bildebank/indeks/en.json', '/bildebank/indeks/en-cldr.json'],
};

const indeksCache = new Map<Spraak, Promise<Ordbok>>();

function somOrdbok(data: unknown): Ordbok {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return {};
  const ut: Ordbok = {};
  for (const [ord, koder] of Object.entries(data as Record<string, unknown>)) {
    if (Array.isArray(koder)) {
      const rene = koder.filter((k): k is string => typeof k === 'string');
      if (rene.length) ut[ord] = rene;
    }
  }
  return ut;
}

function lastIndeks(spraak: Spraak): Promise<Ordbok> {
  let loefte = indeksCache.get(spraak);
  if (!loefte) {
    loefte = Promise.allSettled(
      INDEKS_FILER[spraak].map(async (sti) => {
        const svar = await fetch(sti);
        if (!svar.ok) throw new Error(String(svar.status));
        return somOrdbok(await svar.json());
      })
    ).then((utfall) => {
      const lag = utfall
        .filter((u): u is PromiseFulfilledResult<Ordbok> => u.status === 'fulfilled')
        .map((u) => u.value);
      // utvid validerer kodene — indeksfiler behandles ikke som betrodde
      return utvid({}, ...lag);
    });
    indeksCache.set(spraak, loefte);
  }
  return loefte;
}

/* ---------- stilvalg (funksjonelt, lagres lokalt som tema/hue) ---------- */

function lesStil(): Bildestil {
  try {
    const raa = localStorage.getItem(STIL_NOKKEL);
    if (raa === 'farge' || raa === 'strek' || raa === 'system') return raa;
  } catch {}
  return 'farge';
}

function lagreStil(stil: Bildestil) {
  try {
    localStorage.setItem(STIL_NOKKEL, stil);
  } catch {}
}

/* ---------- modul-CSS (én gang per side; panelet er allerede skjult i
   print — print-regelen her er belte og bukseseler) ---------- */

function injiserCss() {
  if (document.getElementById('bb-stil')) return;
  const stil = document.createElement('style');
  stil.id = 'bb-stil';
  stil.textContent = `
    .bb-brikke { flex-basis: 100%; display: flex; align-items: center; gap: 6px;
      padding: 3px 4px 3px 8px; border: 1px dashed var(--linje);
      border-radius: var(--radius-sm); background: var(--bg); max-width: max-content; }
    @media (prefers-reduced-motion: no-preference) {
      .bb-brikke { animation: bb-inn 160ms ease-out; }
      @keyframes bb-inn { from { opacity: 0; transform: translateY(-2px); } }
    }
    .bb-bilde { width: 34px; height: 34px; object-fit: contain; display: block; }
    .bb-glyf { font-size: 26px; line-height: 34px; width: 34px; text-align: center; }
    .bb-merke { font-family: var(--font-hd); font-size: 12px; color: var(--dempet); }
    .bb-knapp { font: inherit; min-width: 44px; min-height: 44px; border: 1px solid var(--linje);
      border-radius: var(--radius-sm); background: var(--bg); color: var(--tekst);
      cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
    .bb-knapp:hover { border-color: var(--salvie); }
    .bb-innstillinger { display: flex; flex-direction: column; gap: 8px; margin-top: 6px; }
    .bb-valg { display: flex; align-items: center; gap: 8px; font-size: 14.5px;
      color: var(--tekst); min-height: 24px; }
    .bb-valg input[type='checkbox'] { width: 18px; height: 18px; accent-color: var(--salvie); }
    .bb-valg select { font-family: var(--font-sans); font-size: 14.5px; padding: 6px 8px;
      border: 1px solid var(--linje); border-radius: var(--radius-sm);
      background: var(--bg); color: var(--tekst); min-height: 36px; }
    .bb-onskeliste { margin: 0; font-size: 13.5px; color: var(--dempet); }
    .bb-onskeliste a { color: var(--salvie); }
    .bb-ark-glyf { display: inline-block; text-align: center; }
    @media print { .bb-brikke, .bb-innstillinger { display: none !important; } }
  `;
  document.head.appendChild(stil);
}

/* ---------- selve fabrikken ---------- */

export interface Bildebank {
  /** Kobler brikken til en ordrad. Kalles på nytt ved hver retegning. */
  monter(id: number, felt: HTMLInputElement, rad: HTMLElement): void;
  /** Rydder tilstanden når et ord slettes. */
  nullstill(id: number): void;
  /** Gjeldende forslag (null hvis fjernet/uten treff). */
  forslagFor(id: number): { kode: string; sammensatt: boolean } | null;
  /** Element til selve arket: <img class="bb-ark-bilde"> eller
      glyf-<span class="bb-ark-glyf">. Størrelsen eies av verktøyets
      ark-CSS (print bruker mm). null = intet forslag. */
  lagArkElement(id: number): HTMLElement | null;
  /** Innstillingsrad (språkavhuking + stilvalg + ønskeliste) til panelet. */
  innstillinger(): HTMLElement;
}

export function opprettBildebank(oppsett: Oppsett): Bildebank {
  const t = TEKSTER[oppsett.lang];
  let aktivtSpraak: Spraak = oppsett.lang;
  let stil: Bildestil = lesStil();
  const tilstander = new Map<number, Tilstand>();
  const felter = new Map<number, HTMLInputElement>();
  const onsker = new Set<string>();
  let onskelisteEl: HTMLElement | null = null;

  injiserCss();

  const hentTilstand = (id: number): Tilstand => {
    let s = tilstander.get(id);
    if (!s) {
      s = {
        noekkel: '',
        forslag: null,
        valgt: 0,
        fjernet: false,
        doede: new Set(),
        glyfTvang: null,
        timer: undefined,
        holder: null,
      };
      tilstander.set(id, s);
    }
    return s;
  };

  /** Kodene som fortsatt er i live (404-ede hoppes over). */
  const levendeKoder = (s: Tilstand): string[] =>
    s.forslag ? s.forslag.koder.filter((k) => !s.doede.has(k)) : [];

  /** Hva skal vises nå: en kode + om glyfen tvinges (etter 404). */
  function gjeldendeVisning(s: Tilstand): { kode: string; somGlyf: boolean } | null {
    if (s.fjernet || !s.forslag) return null;
    if (s.glyfTvang) return { kode: s.glyfTvang, somGlyf: true };
    const koder = levendeKoder(s);
    if (!koder.length) return null;
    return { kode: koder[s.valgt % koder.length], somGlyf: false };
  }

  const meldFra = () => oppsett.paaEndring?.();

  function oppdaterOnskeliste() {
    if (!onskelisteEl) return;
    onskelisteEl.replaceChildren();
    if (!onsker.size || !oppsett.epost) {
      onskelisteEl.hidden = true;
      return;
    }
    onskelisteEl.hidden = false;
    const tekst = document.createElement('span');
    tekst.textContent = `${t.onskeliste(onsker.size)} · `;
    const lenke = document.createElement('a');
    const kropp = `${t.onskelisteKropp}\n\n${[...onsker].join('\n')}`;
    lenke.href = `mailto:${oppsett.epost}?subject=${encodeURIComponent(
      t.onskelisteEmne
    )}&body=${encodeURIComponent(kropp)}`;
    lenke.textContent = t.sendOnskeliste;
    onskelisteEl.append(tekst, lenke);
  }

  /** 404 på gjeldende bilde: neste alternativ; tom liste → emoji blir
      glyf, ellers trekkes forslaget stille (feilen er vår, ikke et ønske). */
  function haandterBildefeil(id: number, kode: string) {
    const s = tilstander.get(id);
    if (!s || !s.forslag) return;
    s.doede.add(kode);
    if (!levendeKoder(s).length) {
      const foersteEmoji = s.forslag.koder.find(erEmojiKode);
      if (foersteEmoji) s.glyfTvang = foersteEmoji;
      else s.forslag = null;
    }
    tegnBrikke(id);
    meldFra();
  }

  /** <img> for SVG-stilene, glyf-<span> for systememoji/tvang. */
  function lagBildeElement(
    kode: string,
    somGlyf: boolean,
    alt: string
  ): HTMLElement | null {
    const url = somGlyf ? null : bildeUrl(kode, stil);
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = alt;
      img.className = 'bb-bilde';
      img.width = 34;
      img.height = 34;
      return img;
    }
    const glyf = emojiTegn(kode);
    if (!glyf) return null;
    const span = document.createElement('span');
    span.className = 'bb-glyf';
    span.textContent = glyf;
    span.setAttribute('role', 'img');
    span.setAttribute('aria-label', alt);
    return span;
  }

  /** Tegn brikken for én rad ut fra gjeldende tilstand. */
  function tegnBrikke(id: number) {
    const s = tilstander.get(id);
    if (!s?.holder) return;
    const holder = s.holder;
    holder.replaceChildren();
    holder.hidden = true;

    const visning = gjeldendeVisning(s);
    if (!visning || !s.forslag) return;
    const ord = s.forslag.ord;

    const bilde = lagBildeElement(visning.kode, visning.somGlyf, t.forslagAlt(ord));
    if (!bilde) return;
    if (bilde instanceof HTMLImageElement) {
      bilde.addEventListener('error', () => haandterBildefeil(id, visning.kode));
    }
    holder.appendChild(bilde);

    if (s.forslag.sammensatt) {
      const merke = document.createElement('span');
      merke.className = 'bb-merke';
      merke.textContent = t.sisteLedd;
      holder.appendChild(merke);
    }

    const koder = levendeKoder(s);
    if (!visning.somGlyf && koder.length > 1) {
      const bytt = document.createElement('button');
      bytt.type = 'button';
      bytt.className = 'bb-knapp';
      bytt.textContent = '⟳';
      bytt.setAttribute('aria-label', t.bytt(ord, (s.valgt % koder.length) + 1, koder.length));
      bytt.addEventListener('click', () => {
        s.valgt = (s.valgt + 1) % koder.length;
        tegnBrikke(id);
        meldFra();
      });
      holder.appendChild(bytt);
    }

    const fjern = document.createElement('button');
    fjern.type = 'button';
    fjern.className = 'bb-knapp';
    fjern.textContent = '✕';
    fjern.setAttribute('aria-label', t.fjern(ord));
    fjern.addEventListener('click', () => {
      s.fjernet = true;
      tegnBrikke(id);
      meldFra();
    });
    holder.appendChild(fjern);

    holder.hidden = false;
  }

  async function slaaOppOgTegn(id: number, tekst: string, registrerOnske: boolean) {
    const s = hentTilstand(id);
    const noekkel = normaliserOrd(tekst);
    if (noekkel !== s.noekkel) {
      s.noekkel = noekkel;
      s.fjernet = false;
      s.valgt = 0;
      s.doede.clear();
      s.glyfTvang = null;
      s.forslag = null;
    }
    if (!noekkel || noekkel.length < 2) {
      tegnBrikke(id);
      meldFra();
      return;
    }
    const ordbok = await lastIndeks(aktivtSpraak);
    // Teksten kan ha endret seg mens indeksen lastet:
    if (hentTilstand(id).noekkel !== noekkel) return;
    s.forslag = slaaOpp(ordbok, noekkel, aktivtSpraak);
    if (!s.forslag && registrerOnske && !oppsett.erUpassende?.(noekkel)) {
      onsker.add(noekkel);
      oppdaterOnskeliste();
    }
    tegnBrikke(id);
    meldFra();
  }

  function planleggOppslag(id: number, tekst: string) {
    const s = hentTilstand(id);
    if (s.timer !== undefined) clearTimeout(s.timer);
    s.timer = window.setTimeout(() => {
      s.timer = undefined;
      void slaaOppOgTegn(id, tekst, false);
    }, DEBOUNCE_MS);
  }

  function oppdaterAlle() {
    for (const [id, felt] of felter) {
      if (felt.isConnected) void slaaOppOgTegn(id, felt.value, false);
    }
  }

  return {
    monter(id, felt, rad) {
      const s = hentTilstand(id);
      felter.set(id, felt);

      const holder = document.createElement('div');
      holder.className = 'bb-brikke';
      holder.hidden = true;
      s.holder = holder;
      rad.appendChild(holder);

      felt.addEventListener('input', () => planleggOppslag(id, felt.value));
      felt.addEventListener('blur', () => {
        if (s.timer !== undefined) clearTimeout(s.timer);
        s.timer = undefined;
        void slaaOppOgTegn(id, felt.value, true);
      });

      // Utkast kan ha tekst allerede ved montering; ellers vises brikken
      // først når det finnes noe å foreslå.
      if (felt.value.trim()) void slaaOppOgTegn(id, felt.value, false);
    },

    nullstill(id) {
      const s = tilstander.get(id);
      if (s?.timer !== undefined) clearTimeout(s.timer);
      tilstander.delete(id);
      felter.delete(id);
    },

    forslagFor(id) {
      const s = tilstander.get(id);
      if (!s) return null;
      const visning = gjeldendeVisning(s);
      return visning && s.forslag
        ? { kode: visning.kode, sammensatt: s.forslag.sammensatt }
        : null;
    },

    lagArkElement(id) {
      const s = tilstander.get(id);
      if (!s) return null;
      const visning = gjeldendeVisning(s);
      if (!visning) return null;
      const url = visning.somGlyf ? null : bildeUrl(visning.kode, stil);
      if (url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = '';
        img.className = 'bb-ark-bilde';
        return img;
      }
      const glyf = emojiTegn(visning.kode);
      if (!glyf) return null;
      const span = document.createElement('span');
      span.className = 'bb-ark-glyf';
      span.textContent = glyf;
      span.setAttribute('aria-hidden', 'true');
      return span;
    },

    innstillinger() {
      const rot = document.createElement('div');
      rot.className = 'bb-innstillinger';

      const spraakValg = document.createElement('label');
      spraakValg.className = 'bb-valg';
      const boks = document.createElement('input');
      boks.type = 'checkbox';
      boks.addEventListener('change', () => {
        aktivtSpraak = boks.checked ? (oppsett.lang === 'nb' ? 'en' : 'nb') : oppsett.lang;
        onsker.clear();
        oppdaterOnskeliste();
        oppdaterAlle();
      });
      spraakValg.append(boks, document.createTextNode(` ${t.spraakvalg}`));

      const stilValg = document.createElement('label');
      stilValg.className = 'bb-valg';
      const stilNavn = document.createElement('span');
      stilNavn.textContent = t.stil;
      const velger = document.createElement('select');
      for (const verdi of ['farge', 'strek', 'system'] as const) {
        const valg = document.createElement('option');
        valg.value = verdi;
        valg.textContent = t.stiler[verdi];
        velger.appendChild(valg);
      }
      velger.value = stil;
      velger.addEventListener('change', () => {
        const verdi = velger.value;
        if (verdi === 'farge' || verdi === 'strek' || verdi === 'system') {
          stil = verdi;
          lagreStil(verdi);
          for (const id of tilstander.keys()) tegnBrikke(id);
          meldFra();
        }
      });
      stilValg.append(stilNavn, velger);

      onskelisteEl = document.createElement('p');
      onskelisteEl.className = 'bb-onskeliste';
      onskelisteEl.hidden = true;

      rot.append(spraakValg, stilValg, onskelisteEl);
      return rot;
    },
  };
}
