import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { FADE_UP_VARIANTS, SCALE_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";

import { Button } from "./ui/Button";
import { PillLabel } from "./ui/PillLabel";
import { Asset } from "./ui/Asset";

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { hero, settings } = content;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 md:pt-32 md:pb-20 px-6 overflow-hidden">
      {/* Background: Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <Asset 
          src={hero.backgroundImage} 
          alt={`${settings.ownerName} - Hero Background`} 
          className="w-full h-full object-cover" 
          loading="eager"
          containerClassName="w-full h-full"
        />
        {/* Dark Gradient Overlays for Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
      
      <div className="section-container z-10">
        <div className="max-w-4xl">
          <motion.div 
            initial={shouldReduceMotion ? { opacity: 0 } : FADE_UP_VARIANTS.initial}
            animate={FADE_UP_VARIANTS.animate}
            transition={DEFAULT_TRANSITION}
            className="text-left"
          >
            <PillLabel className="mb-8 md:mb-12">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              {hero.availabilityLabel}
            </PillLabel>
            
            <div className="mb-4">
              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-white/40 block mb-4">
                {hero.eyebrow}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 md:mb-8 leading-[1.1] md:leading-[1]">
                {hero.title}
              </h1>
            </div>
            
            <p className="text-lg md:text-2xl text-text-secondary max-w-2xl mb-10 md:mb-12 leading-relaxed font-medium">
              {hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <Button href={hero.ctaPrimary.href} variant="primary">
                {hero.ctaPrimary.label} <ArrowRight className="w-5 h-5" />
              </Button>
              <Button href={hero.ctaSecondary.href} variant="secondary">
                {hero.ctaSecondary.label}
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-white/10 pt-8 max-w-2xl">
              {hero.stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">{hero.scrollLabel}</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
};
