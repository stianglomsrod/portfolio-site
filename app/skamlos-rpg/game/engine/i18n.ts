// === REUSABLE ENGINE — localization helper ===
import type { Lang, Loc, LocList } from "./types";

export function t(value: Loc | string | undefined, lang: Lang): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] ?? value.no;
}

export function tList(value: LocList | undefined, lang: Lang): string[] {
  if (!value) return [];
  return value[lang] ?? value.no;
}
