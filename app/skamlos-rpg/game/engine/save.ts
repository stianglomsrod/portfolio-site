// === REUSABLE ENGINE — localStorage save/load (namespaced per pack) ===
import type { ContentPack, SaveState } from "./types";

const PREFIX = "skamlos-rpg:save:";

export function freshState(pack: ContentPack): SaveState {
  const startMap = pack.maps.find((m) => m.id === pack.meta.startMap);
  const spawn = startMap?.spawns[pack.meta.startSpawn] ?? { x: 2, y: 2 };
  return {
    packId: pack.meta.id,
    flags: {},
    skills: [],
    completedQuests: [],
    artifacts: [],
    foundEggs: [],
    currentMap: pack.meta.startMap,
    player: { x: spawn.x, y: spawn.y },
    facing: "down",
    lang: pack.meta.lang.default,
  };
}

export function loadState(pack: ContentPack): SaveState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PREFIX + pack.meta.id);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SaveState;
    if (parsed.packId !== pack.meta.id) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveState(state: SaveState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PREFIX + state.packId, JSON.stringify(state));
  } catch {
    /* storage may be unavailable (private mode) — fail silently */
  }
}

export function clearState(packId: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(PREFIX + packId);
  } catch {
    /* ignore */
  }
}
