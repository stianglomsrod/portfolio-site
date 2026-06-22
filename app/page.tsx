import type { Metadata } from "next";
import DnbHero from "./components/DnbHero";
import DnbWorkflow from "./components/DnbWorkflow";

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
      <DnbWorkflow />
      {/* Remaining sections (Klar, method, velocity, growth, contact)
          will be added in subsequent implementation chunks. */}
    </main>
  );
}
