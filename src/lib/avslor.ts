/* Scroll-avsløring: innhold under folden glir mykt inn første gang det
   kommer til syne (én gang per sidelast, IntersectionObserver).
   Beste praksis-valgene, med vilje:
   - Kun opacity/transform (aldri layout-egenskaper → ingen CLS).
   - Innhold i førstevisningen røres ALDRI (ingen blink, ingen LCP-straff).
   - prefers-reduced-motion: reduce → ingenting skjules eller animeres.
   - Uten JS finnes ikke skjult-tilstanden (klassene settes herfra).
   - Havner tastaturfokus inni et uavslørt element, avsløres det straks —
     fokus skal aldri stå i usynlig innhold.
   - Stagger på elementer som ankommer samtidig (70 ms trinn, maks 3). */

const MAAL = [
  'main section',
  '.kort',
  '.eksperiment',
  '.hovedcase',
  '.readme',
  '.hue-modul',
  '.node-rad',
  '.tegnforklaring',
  '.skjema',
  '.ok-oppsett',
  '.si-oppsett',
].join(', ');

export function startAvslor(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const alle = [...document.querySelectorAll<HTMLElement>(MAAL)];
  // Løvverk framfor beholdere: et kort avsløres for seg — seksjonen rundt
  // skal ikke animere i tillegg (dobbel bevegelse).
  const kandidater = alle.filter(
    (el) => !alle.some((annen) => annen !== el && el.contains(annen))
  );

  // Bare innhold godt under folden skjules; alt i førstevisningen står i ro.
  const under = kandidater.filter(
    (el) => el.getBoundingClientRect().top > window.innerHeight * 0.92
  );
  if (under.length === 0) return;

  under.forEach((el) => el.classList.add('avslor'));

  const observer = new IntersectionObserver(
    (entries) => {
      const synlige = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.target.getBoundingClientRect().top -
            b.target.getBoundingClientRect().top
        );
      synlige.forEach((e, i) => {
        const el = e.target as HTMLElement;
        el.style.transitionDelay = `${Math.min(i, 3) * 70}ms`;
        el.classList.add('vist');
        observer.unobserve(el);
        el.addEventListener(
          'transitionend',
          () => {
            el.style.transitionDelay = '';
          },
          { once: true }
        );
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  under.forEach((el) => observer.observe(el));

  // Fokus-sikring: tastatur og skjermlesere venter ikke på scroll
  document.addEventListener('focusin', (e) => {
    const skjult = (e.target as HTMLElement | null)?.closest?.(
      '.avslor:not(.vist)'
    );
    if (skjult) {
      skjult.classList.add('vist');
      observer.unobserve(skjult);
    }
  });
}
