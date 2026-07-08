/* GitHub-henting ved byggetid (Done 6–7-grunnlag). Kjøres kun server-side —
   GITHUB_TOKEN (uten PUBLIC_-prefiks) når aldri klienten. Feiler alltid
   trygt til statisk snapshot: siden kan ikke bli stale eller knekke bygget. */

import fallback from '../data/github-fallback.json';

export interface SisteCommit {
  repo: string;
  sha: string;
  melding: string;
  tidspunkt: string;
  kilde: 'live' | 'fallback';
}

const BRUKER = 'stianglomsrod';

function apiHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'stianglomsrod-no-build',
  };
  const token = import.meta.env.GITHUB_TOKEN;
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export async function hentSisteCommit(): Promise<SisteCommit> {
  try {
    const eventsRes = await fetch(
      `https://api.github.com/users/${BRUKER}/events?per_page=30`,
      { headers: apiHeaders(), signal: AbortSignal.timeout(5000) }
    );
    if (!eventsRes.ok) throw new Error(`events: ${eventsRes.status}`);
    const events: any[] = await eventsRes.json();
    const push = events.find((e) => e.type === 'PushEvent' && e.payload?.head);
    if (!push) throw new Error('ingen PushEvent');

    // Events-payloaden har ikke lenger commit-meldinger — hent head-committen.
    const commitRes = await fetch(
      `https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`,
      { headers: apiHeaders(), signal: AbortSignal.timeout(5000) }
    );
    if (!commitRes.ok) throw new Error(`commit: ${commitRes.status}`);
    const commit = await commitRes.json();

    const melding: string = (commit.commit?.message ?? '').split('\n')[0];
    return {
      repo: push.repo.name,
      sha: String(push.payload.head).slice(0, 7),
      melding: melding.length > 72 ? melding.slice(0, 69) + '…' : melding,
      tidspunkt: push.created_at,
      kilde: 'live',
    };
  } catch {
    return { ...fallback.sisteCommit, kilde: 'fallback' };
  }
}
