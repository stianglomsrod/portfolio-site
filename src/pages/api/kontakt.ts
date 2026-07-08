import type { APIRoute } from 'astro';

export const prerender = false;

/* /api/kontakt (Done 8–9): validerer og videresender som e-post via Resend.
   Ingenting lagres, ingenting logges. Sikkerhetsvalg:
   - Origin må finnes og matche Host (avviser cross-site og headerløse POST-er)
   - allowlist-validering + lengdegrenser på alle felt; CR/LF strippes slik at
     e-postheadere (Reply-To) ikke kan injiseres
   - e-posten sendes som REN TEKST — ingen HTML-flate å injisere i
   - honeypot + tidssjekk avvises STILLE (falsk suksess til bots)
   - enkel rate-limit per IP (instans-lokal på serverless — bevisst «enkel»)
   - feiler trygt: generiske svar, aldri stacktrace eller innsendt innhold */

const MAKS_BODY_BYTES = 16_384;
const MAKS_NAVN = 100;
const MAKS_EPOST = 254;
const MAKS_MELDING = 5_000;
const MIN_MS_FOER_INNSENDING = 3_000;
const RATE_ANTALL = 5;
const RATE_VINDU_MS = 10 * 60 * 1000;

const EPOST_MONSTER = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const rateLog = new Map<string, number[]>();

function rateLimitert(ip: string): boolean {
  const naa = Date.now();
  const logg = (rateLog.get(ip) ?? []).filter((t) => naa - t < RATE_VINDU_MS);
  if (logg.length >= RATE_ANTALL) {
    rateLog.set(ip, logg);
    return true;
  }
  logg.push(naa);
  rateLog.set(ip, logg);
  if (rateLog.size > 5_000) rateLog.clear();
  return false;
}

function rensTekst(verdi: unknown, maksLengde: number): string {
  if (typeof verdi !== 'string') return '';
  return verdi
    .replace(/[\r\n\0]/g, ' ')
    .replace(/[\p{Cc}\p{Cf}]/gu, '')
    .trim()
    .slice(0, maksLengde);
}

function svar(status: number, data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const OK = { ok: true } as const;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Origin må finnes og peke på samme vert som requesten traff
    // (dekker prod, preview-deploys og lokal dev uten allowlist-vedlikehold).
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');
    if (!origin || !host || new URL(origin).host !== host) {
      return svar(403, { ok: false });
    }

    if (!request.headers.get('content-type')?.includes('application/json')) {
      return svar(400, { ok: false });
    }

    const lengde = Number(request.headers.get('content-length') ?? '0');
    if (!Number.isFinite(lengde) || lengde > MAKS_BODY_BYTES) {
      return svar(413, { ok: false });
    }

    const raatekst = await request.text();
    if (raatekst.length > MAKS_BODY_BYTES) {
      return svar(413, { ok: false });
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raatekst);
    } catch {
      return svar(400, { ok: false });
    }
    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      return svar(400, { ok: false });
    }

    // Honeypot + tidssjekk: bots får falsk suksess, ingen e-post sendes.
    const honeypot = rensTekst(body.hjemmeside, 200);
    const ts = Number(body.ts);
    const forRaskt =
      !Number.isFinite(ts) || Date.now() - ts < MIN_MS_FOER_INNSENDING || Date.now() - ts < 0;
    if (honeypot !== '' || forRaskt) {
      return svar(200, OK);
    }

    // Kun kjente felt leses — alt annet i body ignoreres.
    const navn = rensTekst(body.navn, MAKS_NAVN);
    const epost = rensTekst(body.epost, MAKS_EPOST);
    const melding = typeof body.melding === 'string'
      ? body.melding.replace(/\0/g, '').trim().slice(0, MAKS_MELDING)
      : '';

    const feil: Record<string, string> = {};
    if (!epost) {
      feil.epost = 'E-postadressen mangler.';
    } else if (!EPOST_MONSTER.test(epost)) {
      feil.epost = 'E-postadressen mangler et gyldig domene — f.eks. kari@nordmann.no.';
    }
    if (!melding) {
      feil.melding = 'Meldingen er tom.';
    }
    if (Object.keys(feil).length > 0) {
      return svar(400, { ok: false, feil });
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'ukjent';
    if (rateLimitert(ip)) {
      return svar(429, { ok: false, grunn: 'for-mange' });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fallback-først: skjemaet er bygget før e-postutsendingen er koblet på.
      return svar(503, { ok: false, grunn: 'ikke-konfigurert' });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: import.meta.env.KONTAKT_FRA ?? 'kontakt@stianglomsrod.no',
        to: ['stianglomsrod@gmail.com'],
        reply_to: epost,
        subject: 'Melding via kontaktskjemaet på stianglomsrod.no',
        text: [
          `Navn: ${navn || '(ikke oppgitt)'}`,
          `E-post: ${epost}`,
          '',
          melding,
        ].join('\n'),
      }),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      return svar(502, { ok: false });
    }
    return svar(200, OK);
  } catch {
    return svar(500, { ok: false });
  }
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
