import { LanguageProvider } from "./components/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import GameTab from "./components/GameTab";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import KlarCase from "./components/KlarCase";
import Method from "./components/Method";
import Capacity from "./components/Capacity";
import Contact from "./components/Contact";

export default function HomePage() {
  return (
    <LanguageProvider>
      <GameTab />
      <LanguageToggle />
      <main>
        <Hero />
        <Workflow />
        <KlarCase />
        <Method />
        <Capacity />
        <Contact />
      </main>
    </LanguageProvider>
  );
}
