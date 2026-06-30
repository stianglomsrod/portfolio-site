import type { ContentPack } from "../engine/types";
import { dnbSkamlosPack } from "./dnb-skamlos/pack";

// Pack registry. The route hard-selects "dnb-skamlos" for v1; later, multiple
// packs can be served by route param without engine changes.
export const PACKS: Record<string, ContentPack> = {
  "dnb-skamlos": dnbSkamlosPack,
};

export type PackId = keyof typeof PACKS;

export const DEFAULT_PACK_ID = "dnb-skamlos";
