import type { TileSpec } from "../../engine/types";

// Tile id → spec. Map legends map a single character to one of these ids.
// Every SOLID tile carries a visible texture, so a barrier the player feels is
// always a barrier they can see (no invisible walls).
export const tiles: Record<string, TileSpec> = {
  // ground
  grass: { asset: "grass" },
  grass2: { asset: "grass2" },
  path: { asset: "path" },
  dirt: { asset: "dirt" },
  water: { asset: "water", solid: true, anim: "water" },
  floorC: { asset: "floor_class" },
  wallC: { asset: "wall_class", solid: true },
  floorH: { asset: "floor_home" },
  wallH: { asset: "wall_home", solid: true },
  rug: { asset: "rug" },
  // props / decor
  tree: { asset: "tree", solid: true, tall: true },
  bush: { asset: "bush", solid: true },
  hedge: { asset: "hedge", solid: true },
  fence: { asset: "fence", solid: true },
  flowers: { asset: "flowers" },
  rock: { asset: "rock", solid: true },
  lamp: { asset: "lamp", solid: true, tall: true },
  bench: { asset: "bench", solid: true },
  window: { asset: "window" },
  chalk: { asset: "chalkboard", solid: true },
  clock: { asset: "clock" },
  deskC: { asset: "desk_class", solid: true },
  deskH: { asset: "desk_home", solid: true },
  books: { asset: "books" },
  bed: { asset: "bed", solid: true },
  plant: { asset: "plant", solid: true, tall: true },
  guitar: { asset: "guitar", solid: true, tall: true },
  amp: { asset: "amp", solid: true },
  mic: { asset: "mic", solid: true, tall: true },
  door: { asset: "door" },
};
