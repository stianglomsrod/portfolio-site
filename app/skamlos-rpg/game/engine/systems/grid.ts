// === REUSABLE ENGINE — pure grid/collision helpers ===
import type { ContentPack, Dir, MapDef, Vec2 } from "../types";

export function tileCenter(tx: number, ty: number, size: number): Vec2 {
  return { x: tx * size + size / 2, y: ty * size + size / 2 };
}

export function pxToTile(px: number, size: number): number {
  return Math.floor(px / size);
}

export function frontTile(pos: Vec2, facing: Dir): Vec2 {
  switch (facing) {
    case "up":
      return { x: pos.x, y: pos.y - 1 };
    case "down":
      return { x: pos.x, y: pos.y + 1 };
    case "left":
      return { x: pos.x - 1, y: pos.y };
    case "right":
      return { x: pos.x + 1, y: pos.y };
  }
}

/**
 * Build a boolean solidity grid for a map. Every solid cell is backed by a
 * VISIBLE tile/prop/building, so the barrier the player feels always matches
 * what they see (no invisible walls).
 */
export function buildSolidGrid(map: MapDef, pack: ContentPack): boolean[][] {
  const grid: boolean[][] = Array.from({ length: map.height }, () =>
    Array.from({ length: map.width }, () => false),
  );

  const markFromLayer = (rows: string[] | undefined) => {
    if (!rows) return;
    for (let y = 0; y < map.height; y++) {
      const row: string = rows[y] ?? "";
      for (let x = 0; x < map.width; x++) {
        const ch: string | undefined = row[x];
        if (!ch || ch === " ") continue;
        const tileId = map.legend[ch];
        if (!tileId) continue;
        if (pack.tiles[tileId]?.solid) grid[y][x] = true;
      }
    }
  };

  markFromLayer(map.ground);
  markFromLayer(map.decor);

  // Building footprints are solid except their door tile.
  for (const b of map.buildings ?? []) {
    for (let y = b.y; y < b.y + b.hTiles; y++) {
      for (let x = b.x; x < b.x + b.wTiles; x++) {
        if (y < 0 || x < 0 || y >= map.height || x >= map.width) continue;
        const isDoor = b.door && b.door.x === x && b.door.y === y;
        if (!isDoor) grid[y][x] = true;
      }
    }
  }

  return grid;
}

/**
 * Dev-only sanity check: every layer row must be exactly `width` chars and every
 * non-space char must resolve to a known tile. Logs warnings instead of throwing
 * so a content typo degrades gracefully rather than crashing the route.
 */
export function validateMap(map: MapDef, pack: ContentPack): string[] {
  const issues: string[] = [];
  const checkLayer = (name: string, rows: string[] | undefined) => {
    if (!rows) return;
    if (rows.length !== map.height)
      issues.push(`${map.id}.${name}: ${rows.length} rows, expected ${map.height}`);
    rows.forEach((row, y) => {
      if (row.length !== map.width)
        issues.push(`${map.id}.${name}[${y}]: ${row.length} cols, expected ${map.width}`);
      for (const ch of row) {
        if (ch === " ") continue;
        const id = map.legend[ch];
        if (!id) issues.push(`${map.id}.${name}[${y}]: char "${ch}" not in legend`);
        else if (!pack.tiles[id]) issues.push(`${map.id}: tile id "${id}" not in pack.tiles`);
      }
    });
  };
  checkLayer("ground", map.ground);
  checkLayer("decor", map.decor);
  return issues;
}
