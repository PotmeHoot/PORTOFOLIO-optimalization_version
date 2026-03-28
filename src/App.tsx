/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { Showreel } from "./components/Showreel";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { ARShowcase } from "./components/ARShowcase";
import { Expertise } from "./components/Expertise";
import { Collaboration } from "./components/Collaboration";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

import { ContentProvider, useContent } from "./context/ContentContext";
import { SiteContent } from "./types/content";

function AppContent() {
  const { content, isLoading, error } = useContent();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !content) {
    const errorTitle = content?.error?.title || "Nepodarilo sa načítať obsah";
    const errorDesc = content?.error?.description || "Skúste, prosím, obnoviť stránku.";
    const retryLabel = content?.error?.retryLabel || "Skúsiť znova";

    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">{errorTitle}</h1>
          <p className="text-text-secondary mb-8">{errorDesc}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-white text-black rounded-xl font-bold"
          >
            {retryLabel}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="selection:bg-white selection:text-black">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <Portfolio />
        <About />
        <Services />
        <ARShowcase />
        <Expertise />
        <Collaboration />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}
