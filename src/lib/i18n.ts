/* Tospråklig side (nb/en). Norsk bor på rot-rutene, engelsk under /en/
   med engelske slugger. Språkvelgeren er en lenke til tvillingsiden —
   URL-en ER språkvalget (ingen JS-tilstand, ingen cookies).

   VIKTIG VEDLIKEHOLD: hver norsk side har en engelsk tvilling under
   src/pages/en/. Endrer du innhold på den ene, endre tvillingen. */

export type Spraak = 'nb' | 'en';

/** nb-sti → en-sti. Kilden til both nav-lenker og språkvelgeren. */
export const RUTEKART: Record<string, string> = {
  '/': '/en/',
  '/prosjekter': '/en/projects',
  '/reisen': '/en/journey',
  '/sandbox': '/en/sandbox',
  '/sandbox/ordkryss': '/en/sandbox/wordsearch',
  '/slik-jobber-jeg': '/en/how-i-work',
  '/om': '/en/about',
  '/kolofon': '/en/colophon',
};

const EN_TIL_NB = Object.fromEntries(
  Object.entries(RUTEKART).map(([nb, en]) => [en, nb])
);

/** Tvillingsiden på det andre språket. Spillet har ingen engelsk
    tvilling; derfra peker velgeren til engelsk sandbox. */
export function motpart(sti: string, fra: Spraak): string {
  const ren = sti.replace(/\/$/, '') || '/';
  if (fra === 'nb') {
    if (ren.startsWith('/sandbox/skamlos-pitch')) return '/en/sandbox';
    return RUTEKART[ren] ?? '/en/';
  }
  const medSkraa = ren === '/en' ? '/en/' : ren;
  return EN_TIL_NB[medSkraa] ?? '/';
}

/** Delte UI-tekster for komponentene (sideprosa bor i sidene selv). */
export const UI = {
  nb: {
    hoppTil: 'Hopp til innholdet',
    hovedmeny: 'Hovedmeny',
    meny: [
      { href: '/', label: 'hjem' },
      { href: '/prosjekter', label: 'prosjekter' },
      { href: '/reisen', label: 'reisen' },
      { href: '/sandbox', label: '/sandbox' },
      { href: '/slik-jobber-jeg', label: 'slik jobber jeg' },
      { href: '/om', label: 'om meg' },
    ],
    merkeAria: 'Stian Glomsrød, til forsiden',
    temaAria: 'Mørkt tema',
    spraakAria: 'Read this page in English',
    spraakLabel: 'EN',
    bunnLinje: 'Ingen informasjonskapsler ·',
    bunnKolofon: 'slik ble siden til',
    bunnUu: 'tilgjengelighet',
    bunnEpost: 'e-post',
  },
  en: {
    hoppTil: 'Skip to content',
    hovedmeny: 'Main menu',
    meny: [
      { href: '/en/', label: 'home' },
      { href: '/en/projects', label: 'projects' },
      { href: '/en/journey', label: 'journey' },
      { href: '/en/sandbox', label: '/sandbox' },
      { href: '/en/how-i-work', label: 'how I work' },
      { href: '/en/about', label: 'about' },
    ],
    merkeAria: 'Stian Glomsrød, to the front page',
    temaAria: 'Dark theme',
    spraakAria: 'Les denne siden på norsk',
    spraakLabel: 'NO',
    bunnLinje: 'No cookies ·',
    bunnKolofon: 'how this site was made',
    bunnUu: 'accessibility',
    bunnEpost: 'email',
  },
} as const;
