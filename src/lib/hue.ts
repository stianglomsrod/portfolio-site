/* Hue-parametre: klient-hjelper for sliderne (/sandbox) og 404. Grunnfarge
   ('hue') styrer flater og tekst, aksent ('hue2') styrer salvie/overskrifter/
   heatmap. Aksenten følger grunnfargen til den er løsnet (egen lagret verdi).
   Verdier clampes alltid 0–360; innlesing ved sidelast skjer i Base.astro. */

const NOKKEL = 'hue';
const NOKKEL2 = 'hue2';
export const STANDARD_HUE = 158;

export function clampHue(verdi: unknown): number {
  const n = Math.round(Number(verdi));
  if (!Number.isFinite(n)) return STANDARD_HUE;
  return Math.min(360, Math.max(0, n));
}

function les(nokkel: string): number | null {
  try {
    const raa = localStorage.getItem(nokkel);
    return raa === null ? null : clampHue(raa);
  } catch {
    return null;
  }
}

export function lesHue(): number | null {
  return les(NOKKEL);
}

export function lesHue2(): number | null {
  return les(NOKKEL2);
}

export function settHue(verdi: number, lagre: boolean): void {
  const h = clampHue(verdi);
  document.documentElement.style.setProperty('--hue', String(h));
  // Aksenten følger med til den har egen lagret verdi
  if (lesHue2() === null) {
    document.documentElement.style.setProperty('--hue2', String(h));
  }
  if (lagre) {
    try {
      localStorage.setItem(NOKKEL, String(h));
    } catch {}
  }
}

export function settHue2(verdi: number, lagre: boolean): void {
  const h = clampHue(verdi);
  document.documentElement.style.setProperty('--hue2', String(h));
  if (lagre) {
    try {
      localStorage.setItem(NOKKEL2, String(h));
    } catch {}
  }
}

/** Fabrikkinnstilling: tilbake til guidens grønne palett (158/158). */
export function tilbakestillHue(): void {
  try {
    localStorage.removeItem(NOKKEL);
    localStorage.removeItem(NOKKEL2);
  } catch {}
  // Fjern inline-verdiene så stylesheet-defaulten (158) tar over; @property
  // gjør at også dette animeres mykt.
  document.documentElement.style.removeProperty('--hue');
  document.documentElement.style.removeProperty('--hue2');
}

/** Brukes av 404: arv lagrede verdier uten å vise kontroller. */
export function arvHue(): void {
  const lagret = lesHue();
  if (lagret !== null) settHue(lagret, false);
  const lagret2 = lesHue2();
  if (lagret2 !== null) settHue2(lagret2, false);
}
