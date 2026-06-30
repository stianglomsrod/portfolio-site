import type { EndgameDef } from "../../engine/types";

// Endgame DATA only this slice — the screen is deferred (the prologue ends by
// pointing toward OsloMet). Kept here so the next pass can render it unchanged.
// Reuses the existing DNB contact source; does NOT hardcode a second copy.
export const endgame: EndgameDef = {
  title: { no: "Søknadspakke levert", en: "Application delivered" },
  message: {
    no: "Jeg søker ikke fordi jeg tror jeg er ferdig utlært. Jeg søker fordi jeg har bygget nok, stein for stein, til å vite at jeg lærer raskt og bygger ferdig det jeg starter på.",
    en: "I'm not applying because I think I'm done learning. I'm applying because I've built enough, stone by stone, to know that I learn fast and finish what I start.",
  },
  show: ["quests", "skills", "artifacts"],
  contactSource: "reuse-dnb-contact",
  actions: ["replay", "back-to-portfolio"],
};
