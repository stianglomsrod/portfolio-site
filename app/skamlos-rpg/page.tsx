import type { Metadata } from "next";
import SkamlosRpgClient from "./SkamlosRpgClient";

// Deep-link playable pitch — not an indexable marketing page.
export const metadata: Metadata = {
  title: "Skamløs Pitch: Kompetansebyen — Stian Glomsrød",
  description:
    "Et lite spillbart eventyr om å bygge kompetanse, stein for stein. Topp-ned RPG-prolog.",
  robots: { index: false, follow: false },
};

export default function SkamlosRpgPage() {
  return <SkamlosRpgClient />;
}
