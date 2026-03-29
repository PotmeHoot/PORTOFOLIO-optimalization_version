/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { ScrollProgress } from "./components/ScrollProgress";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Showreel } from "./components/Showreel";
import { Portfolio } from "./components/Portfolio";

// Lazy load non-critical sections that are further down the page
const About = lazy(() => import("./components/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("./components/Services").then(m => ({ default: m.Services })));
const ARShowcase = lazy(() => import("./components/ARShowcase").then(m => ({ default: m.ARShowcase })));
const Expertise = lazy(() => import("./components/Expertise").then(m => ({ default: m.Expertise })));
const Collaboration = lazy(() => import("./components/Collaboration").then(m => ({ default: m.Collaboration })));
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })));
const Footer = lazy(() => import("./components/Footer").then(m => ({ default: m.Footer })));

import { ContentProvider, useContent } from "./context/ContentContext";
import { LazySection } from "./components/ui/LazySection";

function SectionLoader() {
  return (
    <div className="w-full h-[400px] flex items-center justify-center bg-bg-secondary/50 rounded-[32px] animate-pulse">
      <div className="w-8 h-8 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
    </div>
  );
}

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
        <Suspense fallback={<SectionLoader />}>
          <LazySection id="about"><About /></LazySection>
          <LazySection id="services"><Services /></LazySection>
          <LazySection id="ar"><ARShowcase /></LazySection>
          <LazySection id="experience"><Expertise /></LazySection>
          <LazySection id="collaboration" rootMargin="1200px"><Collaboration /></LazySection>
          <LazySection id="contact" rootMargin="1200px"><Contact /></LazySection>
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <LazySection minHeight="100px"><Footer /></LazySection>
      </Suspense>
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
