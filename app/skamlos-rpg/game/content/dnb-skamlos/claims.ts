import type { ClaimPolicy } from "../../engine/types";

// Claim safety as DATA — mirrors the portfolio's DNB_CLAIM_SOURCE_MAP discipline
// inside the game. The deny list is machine-checkable; the dev claim-lint scans
// pack text against it (see scripts/check-skamlos-claims.mjs).
export const claims: ClaimPolicy = {
  deny: [
    "senior-distributed-systems",
    "enterprise-scale-production",
    "student-outcome-effect",
    "pure-ux-only",
    "prompt-user-only",
    "official-dnb-affiliation",
    "private-medical",
    "pii",
    "cs50-django", // never imply CS50x taught Django
  ],
  boundaries: {
    "cs50x-cert": {
      no: "CS50x dekket C, Python, SQL, Flask, JavaScript og web-grunnmur.",
      en: "CS50x covered C, Python, SQL, Flask, JavaScript and web fundamentals.",
    },
  },
  notes: {
    no: [
      "Django hører til senere arbeid, ikke CS50x.",
      "DNB-bygget er et symbolsk mål, ikke offisiell tilknytning.",
      "Ingen påstander om elevresultater eller produksjonsskala.",
    ],
  },
};
