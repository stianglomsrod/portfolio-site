import type { ContentPack } from "../engine/types";
import { kompetansebyenPack } from "./kompetansebyen/pack";

// Pack registry. The route hard-selects "kompetansebyen" for v1; later,
// multiple packs can be served by route param without engine changes.
export const PACKS: Record<string, ContentPack> = {
  kompetansebyen: kompetansebyenPack,
};

export type PackId = keyof typeof PACKS;

export const DEFAULT_PACK_ID = "kompetansebyen";
