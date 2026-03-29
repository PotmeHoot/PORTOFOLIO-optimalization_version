import { motion } from "motion/react";
import { Image, Play } from "lucide-react";
import { cn } from "../../lib/utils";
import { useSiteContent } from "../../hooks/useSiteContent";

interface PlaceholderProps {
  className?: string;
}

export const ImagePlaceholder = ({ className }: PlaceholderProps) => {
  const { content } = useSiteContent();
  const { portfolio } = content;

  return (
    <div className={cn("absolute inset-0 flex items-center justify-center bg-[#080808] overflow-hidden", className)}>
      {/* Subtle Animated Gradient Movement */}
      <motion.div 
        animate={{ 
          x: [-10, 10, -10],
          y: [-5, 5, -5],
          opacity: [0.03, 0.06, 0.03]
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,1),transparent_70%)]" 
      />
      
      {/* Visual Suggestion: Social Media Layout Grid */}
      <div className="absolute inset-0 p-8 flex flex-col gap-4 opacity-[0.03]">
        <div className="w-1/3 h-4 bg-white rounded-full" />
        <div className="flex-1 border-2 border-dashed border-white rounded-3xl" />
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-white" />
          <div className="flex-1 h-12 bg-white rounded-xl" />
        </div>
      </div>

      {/* Light Sweep Effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: [0.4, 0, 0.2, 1],
          repeatDelay: 2
        }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent skew-x-[-20deg] pointer-events-none"
      />

      {/* AI-style Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,rgba(255,255,255,0.03),transparent_50%)]" />
      
      {/* Noise Texture */}
      <div className="noise-overlay" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-5"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Soft Opacity Pulse on Icon Container */}
          <motion.div 
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative p-7 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-2xl"
          >
            <Image className="w-12 h-12 text-white/10" strokeWidth={1} />
          </motion.div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">{portfolio.graphicWorkLabel}</span>
          <div className="w-4 h-px bg-white/5" />
        </div>
      </motion.div>
    </div>
  );
};

export const VideoPlaceholder = ({ className }: PlaceholderProps) => {
  const { content } = useSiteContent();
  const { portfolio } = content;

  return (
    <div className={cn("absolute inset-0 flex items-center justify-center bg-[#050505] overflow-hidden", className)}>
      {/* Cinematic Animated Background */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [-20, 20, -20],
          y: [-10, 10, -10]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_80%)]" 
      />

      {/* Visual Suggestion: Video Timeline */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col gap-2 opacity-[0.05]">
        <div className="flex justify-between text-[8px] font-mono text-white">
          <span>00:00:00</span>
          <span>00:00:15</span>
        </div>
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="h-full bg-white"
          />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 h-4 bg-white/10 rounded-sm" />
          ))}
        </div>
      </div>

      {/* Light Sweep Effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: [0.4, 0, 0.2, 1],
          repeatDelay: 3
        }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg] pointer-events-none"
      />

      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(255,255,255,0.05),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(255,255,255,0.03),transparent_50%)]" />
      
      {/* Noise Texture */}
      <div className="noise-overlay" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
        <div className="relative group">
          <div className="absolute inset-0 bg-white/10 blur-[60px] rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-1000" />
          
          {/* Soft Opacity Pulse on Icon Container */}
          <motion.div 
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/10 backdrop-blur-2xl shadow-2xl"
          >
            <Play className="w-16 h-16 text-white/10 fill-white/[0.02]" strokeWidth={1} />
          </motion.div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/10">{portfolio.motionWorkLabel}</span>
          <div className="w-8 h-px bg-white/5" />
        </div>
      </motion.div>
    </div>
  );
};

export const VideoIndicator = ({ isVisible }: { isVisible: boolean }) => {
  const { content } = useSiteContent();
  const { portfolio } = content;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -10 
      }}
      className="absolute top-6 right-6 z-30 flex items-center gap-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 pointer-events-none"
    >
      <span className="text-[9px] font-bold uppercase tracking-[0.2em]">{portfolio.videoIndicatorLabel}</span>
      <div className="w-px h-3 bg-white/10" />
      <Play className="w-3 h-3 fill-white/20" strokeWidth={1.5} />
    </motion.div>
  );
};
