/* Hue-parametre: klient-hjelper for sliderne (/sandbox) og 404. Grunnfarge
   ('hue') styrer flater og tekst, aksent ('hue2') styrer salvie/overskrifter/
   heatmap. Koblingen er en avstandsmodell: grunnfargen flytter ALLTID hele
   paletten — har du valgt en egen aksent, beholdes vinkel-avstanden mellom
   dem (wrappes rundt fargehjulet). Aksent-slideren justerer bare avstanden.
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

/* Myk rotasjon uten permanent rot-transition: klassen med transitionen
   settes på før endringen og fjernes når den har fått gli ferdig.
   Gjentatte kall (slider-drag) forlenger vinduet. */
let glirTimer: ReturnType<typeof setTimeout> | undefined;

function gliMykt(): void {
  document.documentElement.classList.add('hue-glir');
  clearTimeout(glirTimer);
  glirTimer = setTimeout(() => {
    document.documentElement.classList.remove('hue-glir');
  }, 650);
}

export function lesHue(): number | null {
  return les(NOKKEL);
}

export function lesHue2(): number | null {
  return les(NOKKEL2);
}

/** Gjeldende grunnfarge slik den faktisk står (inline-var > lagret > standard). */
export function gjeldendeHue(): number {
  const inline = document.documentElement.style.getPropertyValue('--hue');
  if (inline !== '') return clampHue(inline);
  return lesHue() ?? STANDARD_HUE;
}

/** Gjeldende aksent (inline-var > lagret > følger grunnfargen). */
export function gjeldendeHue2(): number {
  const inline = document.documentElement.style.getPropertyValue('--hue2');
  if (inline !== '') return clampHue(inline);
  return lesHue2() ?? gjeldendeHue();
}

const rundtHjulet = (h: number) => ((h % 360) + 360) % 360;

export function settHue(verdi: number, lagre: boolean): void {
  const h = clampHue(verdi);
  const delta = h - gjeldendeHue();
  gliMykt();
  document.documentElement.style.setProperty('--hue', String(h));
  // Aksenten følger alltid med: uten egen verdi speiler den grunnfargen,
  // med egen verdi flyttes den like langt (avstanden bevares rundt hjulet).
  if (lesHue2() === null) {
    document.documentElement.style.setProperty('--hue2', String(h));
  } else if (delta !== 0) {
    const nyAksent = rundtHjulet(gjeldendeHue2() + delta);
    document.documentElement.style.setProperty('--hue2', String(nyAksent));
    if (lagre) {
      try {
        localStorage.setItem(NOKKEL2, String(nyAksent));
      } catch {}
    }
  }
  if (lagre) {
    try {
      localStorage.setItem(NOKKEL, String(h));
    } catch {}
  }
}

export function settHue2(verdi: number, lagre: boolean): void {
  const h = clampHue(verdi);
  gliMykt();
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
  gliMykt();
  document.documentElement.style.removeProperty('--hue');
  document.documentElement.style.removeProperty('--hue2');
}

/** Brukes av 404: arv lagrede verdier uten å vise kontroller.
    Settes direkte (uten glid) — dette er sidelast, ikke en endring. */
export function arvHue(): void {
  const lagret = lesHue();
  if (lagret !== null) {
    document.documentElement.style.setProperty('--hue', String(lagret));
    if (lesHue2() === null) {
      document.documentElement.style.setProperty('--hue2', String(lagret));
    }
  }
  const lagret2 = lesHue2();
  if (lagret2 !== null) {
    document.documentElement.style.setProperty('--hue2', String(lagret2));
  }
}
