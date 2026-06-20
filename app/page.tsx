import type { Metadata } from "next";
import DnbHero from "./components/DnbHero";

// Page-level metadata overrides the layout-level defaults for the DNB deploy.
export const metadata: Metadata = {
  title: "Stian Glomsrød — AI-first engineering",
  description:
    "Fullstack produktbygging, agentisk utviklingspraksis og tydelige kvalitetsporter. Portef\u00f8lje for DNB AI Tech.",
};

export default function DnbPage() {
  return (
    <main>
      <DnbHero />
      {/* Remaining sections (workflow, Klar, method, velocity, growth, contact)
          will be added in subsequent implementation chunks. */}
    </main>
  );
}
