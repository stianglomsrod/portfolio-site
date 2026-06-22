import type { Metadata } from "next";
import SkamlosPitchClient from "./SkamlosPitchClient";

// Standalone immersive route. Intentionally not linked from the main DNB page
// yet; it is a self-contained playable pitch experience.
export const metadata: Metadata = {
  title: "Skamløs Pitch — Stian Glomsrød",
  description:
    "Et spillbart førsteperson-portefølje: gå gjennom kompetanseverdenen, lås opp ferdigheter, samle bevis og åpne DNB AI Tech-porten.",
  robots: { index: false, follow: false },
};

export default function SkamlosPitchPage() {
  return <SkamlosPitchClient />;
}
