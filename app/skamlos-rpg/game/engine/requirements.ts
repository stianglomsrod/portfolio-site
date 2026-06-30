// === REUSABLE ENGINE — requirement evaluator (pure) ===
import type { Requirement, SaveState } from "./types";

export function isMet(req: Requirement, state: SaveState): boolean {
  if ("always" in req) return true;
  if ("flag" in req) return !!state.flags[req.flag];
  if ("allSkills" in req)
    return req.allSkills.every((s) => state.skills.includes(s));
  if ("anySkills" in req)
    return req.anySkills.some((s) => state.skills.includes(s));
  if ("allQuests" in req)
    return req.allQuests.every((q) => state.completedQuests.includes(q));
  if ("and" in req) return req.and.every((r) => isMet(r, state));
  if ("or" in req) return req.or.some((r) => isMet(r, state));
  if ("not" in req) return !isMet(req.not, state);
  return false;
}
