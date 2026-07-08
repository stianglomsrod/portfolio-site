import { LanguageProvider } from "./components/LanguageContext";
import LanguageToggle from "./components/LanguageToggle";
import GameTab from "./components/GameTab";
import SkipLink from "./components/SkipLink";
import Hero from "./components/Hero";
import Workflow from "./components/Workflow";
import KlarCase from "./components/KlarCase";
import Method from "./components/Method";
import Capacity from "./components/Capacity";
import Contact from "./components/Contact";

export default function HomePage() {
  return (
    <LanguageProvider>
      <SkipLink />
      <GameTab />
      <LanguageToggle />
      <main id="innhold">
        <Hero />
        <Workflow />
        <KlarCase />
        <Method />
        <Capacity />
      </main>
      {/* Contact renders a <footer>; it lives outside <main> so assistive
          tech exposes it as the page's contentinfo landmark. */}
      <Contact />
    </LanguageProvider>
  );
}
