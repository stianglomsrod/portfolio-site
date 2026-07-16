/* Verktøykatalogen: én kilde til sannhet for kortene i Lærerrommet
   (/laerer og /en/teacher). Begge språksidene renderer herfra, så
   tvillingene ikke kan drifte. Nye verktøy registreres HER (+ RUTEKART
   i i18n.ts) når de er bygd — aldri før, da får de døde lenker. */

export type Kategori = 'norsk' | 'matte' | 'lek';

export interface Verktoykort {
  slugNb: string; // full sti, f.eks. /sandbox/ordkryss
  slugEn: string;
  kategori: Kategori;
  nb: { tittel: string; tekst: string; cta: string };
  en: { tittel: string; tekst: string; cta: string };
}

export const KATEGORINAVN: Record<Kategori, { nb: string; en: string }> = {
  norsk: { nb: 'Norsk', en: 'Language' },
  matte: { nb: 'Matematikk', en: 'Maths' },
  lek: { nb: 'Lek og aktivitet', en: 'Games and activities' },
};

export const VERKTOY: Verktoykort[] = [
  // ---- Norsk ----
  {
    slugNb: '/sandbox/ordkryss',
    slugEn: '/en/sandbox/wordsearch',
    kategori: 'norsk',
    nb: {
      tittel: 'Ordkryss',
      tekst: 'Ordletingsark til utskrift: tre retninger, bilder per ord, fasit og bannordfilter.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Word search',
      tekst: 'Printable word search sheets: three directions, pictures per word, an answer key and a profanity filter.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/silhuett',
    slugEn: '/en/sandbox/word-shapes',
    kategori: 'norsk',
    nb: {
      tittel: 'Silhuetter',
      tekst: 'Skriveark der elevene fyller bokstavene inn i ordets silhuett. Valgfritt bilde og ordbank.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Word shapes',
      tekst: "Writing sheets where pupils fill the letters into the word's silhouette. Optional picture and word bank.",
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/kryssord',
    slugEn: '/en/sandbox/crossword',
    kategori: 'norsk',
    nb: {
      tittel: 'Kryssord',
      tekst: 'Kryssord med tekst eller bilde som ledetråd, nummererte ruter, ordbank og fasit.',
      cta: 'lag et kryssord',
    },
    en: {
      tittel: 'Crossword',
      tekst: 'Crosswords with a text or picture clue, numbered squares, a word bank and an answer key.',
      cta: 'make a crossword',
    },
  },
  {
    slugNb: '/sandbox/luketekst',
    slugEn: '/en/sandbox/gap-fill',
    kategori: 'norsk',
    nb: {
      tittel: 'Luketekst',
      tekst: 'Lim inn en tekst og velg hvilke ord som blir luker — med ordbank og fasit.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Gap-fill text',
      tekst: 'Paste a text and choose which words become gaps — with a word bank and an answer key.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/setningsstokking',
    slugEn: '/en/sandbox/sentence-scramble',
    kategori: 'norsk',
    nb: {
      tittel: 'Rablete setninger',
      tekst: 'Setningene stokkes til brikker — elevene skriver dem riktig på linja under.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Scrambled sentences',
      tekst: 'Sentences become shuffled tiles — pupils write them correctly on the line below.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/ord-til-bilde',
    slugEn: '/en/sandbox/word-match',
    kategori: 'norsk',
    nb: {
      tittel: 'Ord og bilde',
      tekst: 'Trekk strek fra ordet til riktig bilde. Fasit-utskriften tegner strekene.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Word and picture',
      tekst: 'Draw a line from the word to the right picture. The answer key draws the lines.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/sporing',
    slugEn: '/en/sandbox/tracing',
    kategori: 'norsk',
    nb: {
      tittel: 'Sporing',
      tekst: 'Stiplede bokstaver og ord på skrivelinjer — for håndskrifttrening.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Tracing',
      tekst: 'Dotted letters and words on writing lines — for handwriting practice.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/alfabetisering',
    slugEn: '/en/sandbox/abc-order',
    kategori: 'norsk',
    nb: {
      tittel: 'Alfabetisk rekkefølge',
      tekst: 'Elevene sorterer ordene alfabetisk — æ, ø og å havner riktig i fasiten.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Alphabetical order',
      tekst: 'Pupils sort the words alphabetically — with a proper answer key.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/ordkjeder',
    slugEn: '/en/sandbox/word-chains',
    kategori: 'norsk',
    nb: {
      tittel: 'Ordkjeder',
      tekst: 'Ordene kjedes sammen uten mellomrom — eleven setter strek der de skilles. Avkodingstrening med fasit.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Word chains',
      tekst: 'Words are chained together without spaces — the pupil draws lines where they split. Decoding practice with a key.',
      cta: 'make a sheet',
    },
  },
  // ---- Matematikk ----
  {
    slugNb: '/sandbox/regneark',
    slugEn: '/en/sandbox/math-sheets',
    kategori: 'matte',
    nb: {
      tittel: 'Regneark',
      tekst: 'Pluss, minus, gange og dele — med tallområde, tierovergang og fasit.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Math sheets',
      tekst: 'Addition, subtraction, multiplication and division — with range, regrouping and an answer key.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/klokke',
    slugEn: '/en/sandbox/clock',
    kategori: 'matte',
    nb: {
      tittel: 'Klokka',
      tekst: 'Les av urskiver eller tegn viserne selv — hele timer til femminutter.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'The clock',
      tekst: 'Read clock faces or draw the hands — whole hours down to five minutes.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/tallinje',
    slugEn: '/en/sandbox/number-line',
    kategori: 'matte',
    nb: {
      tittel: 'Tallinjer',
      tekst: 'Tallinjer med hull elevene fyller inn — tell med 1, 2, 5 eller 10.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Number lines',
      tekst: 'Number lines with gaps to fill in — count in 1s, 2s, 5s or 10s.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/gangetabell',
    slugEn: '/en/sandbox/times-tables',
    kategori: 'matte',
    nb: {
      tittel: 'Gangetabellen',
      tekst: '10 × 10-tabellen som utfyllingsark — tom eller delvis utfylt.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Times table',
      tekst: 'The 10 × 10 table as a fill-in sheet — empty or partly filled.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/hemmelig-kode',
    slugEn: '/en/sandbox/secret-code',
    kategori: 'norsk',
    nb: {
      tittel: 'Hemmelig kode',
      tekst: 'Ordene kodes med tall eller symboler — elevene knekker koden med nøkkelen. Fasit følger med.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Secret code',
      tekst: 'Words are encoded with numbers or symbols — pupils crack the code with the key. Answer key included.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/hundrekart',
    slugEn: '/en/sandbox/hundred-chart',
    kategori: 'matte',
    nb: {
      tittel: 'Hundrekartet',
      tekst: 'Kartet 1–100 med tomme ruter elevene fyller inn — eller helt tomt. Fasit følger med.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Hundred chart',
      tekst: 'The 1–100 chart with empty squares to fill in — or completely empty. Answer key included.',
      cta: 'make a sheet',
    },
  },
  {
    slugNb: '/sandbox/tierammer',
    slugEn: '/en/sandbox/ten-frames',
    kategori: 'matte',
    nb: {
      tittel: 'Mengder og tierammer',
      tekst: 'Telle prikker, tegne mengder eller finne tiervenner — tierammer og terningmønstre for 1.–2. trinn.',
      cta: 'lag et ark',
    },
    en: {
      tittel: 'Quantities and ten frames',
      tekst: 'Count dots, draw quantities or find friends of ten — ten frames and dice patterns for early maths.',
      cta: 'make a sheet',
    },
  },
  // ---- Lek og aktivitet ----
  {
    slugNb: '/sandbox/hentediktat',
    slugEn: '/en/sandbox/running-dictation',
    kategori: 'lek',
    nb: {
      tittel: 'Hentediktat',
      tekst: 'Nummererte kort å henge rundt i rommet + elevark med skrivelinjer. To utskrifter fra samme oppsett.',
      cta: 'lag kort og ark',
    },
    en: {
      tittel: 'Running dictation',
      tekst: 'Numbered cards to hang around the room + a pupil sheet with writing lines. Two printouts from one setup.',
      cta: 'make cards and sheet',
    },
  },
  {
    slugNb: '/sandbox/ordbingo',
    slugEn: '/en/sandbox/word-bingo',
    kategori: 'lek',
    nb: {
      tittel: 'Ordbingo',
      tekst: 'Unike bingobrett til hele klassen — velg brettstørrelse og antall. Valgfrie bilder og trekkelapper.',
      cta: 'lag brett',
    },
    en: {
      tittel: 'Word bingo',
      tekst: 'Unique bingo boards for the whole class — pick a board size and a count. Optional pictures and calling slips.',
      cta: 'make boards',
    },
  },
];
