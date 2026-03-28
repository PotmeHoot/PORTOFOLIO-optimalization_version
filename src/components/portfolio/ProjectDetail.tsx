import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, Play, Image as ImageIcon } from "lucide-react";
import { Project } from "../../types/content";
import { Asset } from "../ui/Asset";
import { PillLabel } from "../ui/PillLabel";
import { useSiteContent } from "../../hooks/useSiteContent";
import { useEffect } from "react";

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetail = ({ project, onClose }: ProjectDetailProps) => {
  const { content } = useSiteContent();
  const { portfolio } = content;

  // Prevent scrolling when detail is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  const heroAsset = project.assets.find(a => a.type === 'video') || project.assets[0];
  const heroUrl = heroAsset ? `/assets/work/${project.folder}/${heroAsset.file}` : `/assets/work/${project.folder}/${project.poster}`;
  const isHeroVideo = heroAsset?.type === 'video';

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black overflow-y-auto scrollbar-hide"
        >
          {/* Navigation Bar */}
          <div className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between bg-black/80 backdrop-blur-xl border-b border-white/5">
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">{portfolio.backToProjectsLabel}</span>
            </button>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Hero Section */}
          <section className="relative w-full aspect-video md:aspect-[21/9] bg-neutral-900 overflow-hidden">
            {isHeroVideo ? (
              <Asset
                src={heroUrl}
                alt={project.title}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <Asset
                src={`/assets/work/${project.folder}/${project.poster}`}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <PillLabel className="bg-white/10 border-white/20 mb-4">
                    {project.category}
                  </PillLabel>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                    {project.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Info Column */}
              <div className="lg:col-span-1 space-y-12">
                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-6">{portfolio.projectDetailsLabel}</h2>
                  <div className="space-y-6">
                    {project.client && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{portfolio.clientLabel}</span>
                        <span className="text-lg text-white/80">{project.client}</span>
                      </div>
                    )}
                    {project.agency && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{portfolio.agencyLabel}</span>
                        <span className="text-lg text-white/80">{project.agency}</span>
                      </div>
                    )}
                    {project.year && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">{portfolio.yearLabel}</span>
                        <span className="text-lg text-white/80">{project.year}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20 mb-6">{portfolio.descriptionLabel}</h2>
                  <p className="text-lg text-white/60 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>
              </div>

              {/* Gallery Column */}
              <div className="lg:col-span-2 space-y-12">
                <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">{portfolio.galleryLabel}</h2>
                <div className="grid grid-cols-1 gap-8">
                  {project.assets.map((asset, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/5"
                    >
                      {asset.type === 'video' ? (
                        <div className="relative group">
                          <Asset
                            src={`/assets/work/${project.folder}/${asset.file}`}
                            alt={`${project.title} video ${index + 1}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-auto"
                          />
                          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <Play className="w-3 h-3 text-white/60" />
                          </div>
                        </div>
                      ) : (
                        <div className="relative group">
                          <Asset
                            src={`/assets/work/${project.folder}/${asset.file}`}
                            alt={`${project.title} asset ${index + 1}`}
                            className="w-full h-auto"
                          />
                          <div className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <ImageIcon className="w-3 h-3 text-white/60" />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <footer className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform"
            >
              <span>{portfolio.backToProjectsLabel}</span>
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
