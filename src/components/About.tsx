import { motion, useReducedMotion } from "motion/react";
import { useSiteContent } from "../hooks/useSiteContent";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../constants/motion";
import { SectionHeader } from "./ui/SectionHeader";
import { SectionWrapper } from "./ui/SectionWrapper";

export const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const { content } = useSiteContent();
  const { about, projects } = content;

  // Extract unique clients
  const clients = Array.from(new Set(projects.map(p => p.client))).filter(c => c !== "Personal / R&D");

  return (
    <SectionWrapper className="bg-black" containerClassName="max-w-5xl">
      {/* Subtle Accent Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
      
      <motion.div
        initial={shouldReduceMotion ? { opacity: 0 } : FADE_UP_VARIANTS.initial}
        whileInView={FADE_UP_VARIANTS.animate}
        viewport={{ once: true, margin: "-100px" }}
        transition={DEFAULT_TRANSITION}
      >
        <SectionHeader 
          eyebrow={about.eyebrow}
          className="!mb-12"
        />
        
        <div className="space-y-10 md:space-y-16">
          <p className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight text-white/90">
            {about.title}
          </p>
          
          <p className="text-xl md:text-3xl font-medium leading-[1.4] text-text-secondary max-w-4xl">
            {about.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 border-t border-white/10">
            <div className="lg:col-span-2 space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">{about.brandsLabel}</h4>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {clients.map((client) => (
                  <span key={client} className="text-xl md:text-2xl font-bold text-white/40 hover:text-white transition-colors cursor-default">
                    {client}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">{about.expertiseLabel}</h4>
              <div className="space-y-4">
                {about.expertise.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span className="text-lg font-medium text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};
