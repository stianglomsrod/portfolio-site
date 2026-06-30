import type { Artifact } from "../../engine/types";

// Public, verified evidence. Each artifact carries an honest boundary line.
export const artifacts: Artifact[] = [
  {
    id: "cs50x-cert",
    title: { no: "CS50x-sertifikat", en: "CS50x certificate" },
    description: {
      no: "Harvards CS50x — en ærlig grunnmur i programmering.",
      en: "Harvard's CS50x — an honest foundation in programming.",
    },
    kind: "cert",
    href: "https://certificates.cs50.io/0e9210d1-86f5-445a-b4d6-46fad1a5fd45.pdf?size=letter",
    linkLabel: { no: "Åpne sertifikatet", en: "Open the certificate" },
    boundary: {
      no: "Foundational læring, ikke en CS-grad eller ekspertnivå.",
      en: "Foundational learning, not a CS degree or expert level.",
    },
  },
  {
    id: "ordkryss-video",
    title: { no: "Ordkryss – demo", en: "Ordkryss – demo" },
    description: {
      no: "CS50x-sluttprosjektet: et kryssord som genereres og fylles ut.",
      en: "The CS50x final project: a crossword that is generated and filled in.",
    },
    kind: "video",
    href: "https://youtu.be/tI5fU1aAAvI",
    linkLabel: { no: "Se demoen", en: "Watch the demo" },
    boundary: {
      no: "Et lite, ekte studentprosjekt — ikke et produkt i drift.",
      en: "A small, real student project — not a production product.",
    },
  },
];
