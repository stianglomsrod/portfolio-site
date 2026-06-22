import type { Metadata } from "next";
import { LanguageProvider } from "./components/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import DnbHero from "./components/DnbHero";
import DnbWorkflow from "./components/DnbWorkflow";
import DnbKlar from "./components/DnbKlar";
import DnbMethod from "./components/DnbMethod";
import DnbCapacity from "./components/DnbCapacity";
import DnbContact from "./components/DnbContact";

// Page-level metadata overrides the layout-level defaults for the DNB deploy.
export const metadata: Metadata = {
  title: "Stian Glomsrød — AI-first engineering",
  description:
    "Fullstack produktbygging, agentisk utviklingspraksis og tydelige kvalitetsporter. Portef\u00f8lje for DNB AI Tech.",
};

export default function DnbPage() {
  return (
    <LanguageProvider>
      <LanguageToggle />
      <main>
        <DnbHero />
        <DnbWorkflow />
        <DnbKlar />
        <DnbMethod />
        <DnbCapacity />
        <DnbContact />
      </main>
    </LanguageProvider>
  );
}
