import { useState, memo, useCallback, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Project } from "../../types/content";
import { DEFAULT_TRANSITION } from "../../constants/motion";
import { useProjectPreviewLoop } from "../../hooks/useProjectPreviewLoop";
import { ProjectMediaFrame } from "./ProjectMediaFrame";
import { ProjectInteractionPreview } from "./ProjectInteractionPreview";
import { ProjectTimelineOverlay } from "./ProjectTimelineOverlay";
import { ProjectMetaOverlay } from "./ProjectMetaOverlay";
import { VideoIndicator } from "./ProjectPlaceholders";
import { WorkCategoryIcon } from "./WorkCategoryIcon";

interface ProjectCardProps {
  item: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export const ProjectCard = memo(({ item, index, onSelect }: ProjectCardProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(false);

  // 1. Centralized Preview State
  const {
    activeSegmentIndex,
    activeSegmentProgress,
    videoDuration,
    videoRef,
    handleLoadedMetadata,
    handleVideoError,
    manualAdvance,
    isVideoActive,
    isImageSequenceActive,
    isIdle,
    previewImages,
    previewVideo,
    hasVideo: hookHasVideo,
    isHoverSupported
  } = useProjectPreviewLoop(item, isActive);

  // Check if hover is supported (desktop vs mobile)
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  useEffect(() => {
    setIsHoverDevice(window.matchMedia("(hover: hover)").matches);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isHoverDevice) {
      setIsActive(true);
    }
  }, [isHoverDevice]);

  const handleMouseLeave = useCallback(() => {
    if (isHoverDevice) {
      setIsActive(false);
    }
  }, [isHoverDevice]);

  const handleClick = useCallback(() => {
    // Desktop: Open detail immediately
    if (isHoverDevice) {
      onSelect(item);
      return;
    }

    // Mobile: Toggle preview or open detail
    if (!isActive) {
      setIsActive(true);
    } else {
      // If already active on mobile, open detail
      onSelect(item);
    }
  }, [isHoverDevice, isActive, item, onSelect]);

  return (
    <motion.article 
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ ...DEFAULT_TRANSITION, delay: shouldReduceMotion ? 0 : index * 0.05 }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="relative aspect-[4/5] card-base group-hover:border-white/20 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] cursor-pointer">
        
        {/* Layer 1: Media Frame (Static Poster) */}
        <ProjectMediaFrame 
          poster={`/assets/work/${item.folder}/${item.poster}`} 
          webpPoster={item.webpPoster ? `/assets/work/${item.folder}/${item.webpPoster}` : undefined}
          title={item.title} 
          isIdle={isIdle} 
          isActive={isActive} 
        />

        {/* Category Icon (Top Left Corner) */}
        <div className="absolute top-6 left-6 z-30 p-2.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white/40 pointer-events-none opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500">
          <WorkCategoryIcon category={item.category} />
        </div>

        {/* Layer 2: Interaction Preview Layer (Images/Videos) */}
        <ProjectInteractionPreview 
          item={item}
          isActive={isActive}
          isImageSequenceActive={isImageSequenceActive}
          isVideoActive={isVideoActive}
          activeSegmentIndex={activeSegmentIndex}
          shouldReduceMotion={shouldReduceMotion ?? false}
          videoRef={videoRef}
          handleLoadedMetadata={handleLoadedMetadata}
          handleVideoError={handleVideoError}
          isHoverSupported={isHoverSupported}
          hasVideo={hookHasVideo}
          previewImages={previewImages}
          previewVideo={previewVideo}
        />

        {/* Layer 3: Timeline Overlay Layer (Progress) */}
        <ProjectTimelineOverlay 
          isImageSequenceActive={isImageSequenceActive}
          isVideoActive={isVideoActive}
          previewImages={previewImages}
          activeSegmentIndex={activeSegmentIndex}
          activeSegmentProgress={activeSegmentProgress}
          videoDuration={videoDuration}
          isHoverSupported={isHoverSupported}
        />

        {/* Video Indicator (Signals interactivity) */}
        {hookHasVideo && (
          <VideoIndicator isVisible={isIdle} />
        )}

        {/* Layer 4: Visual Effects Layer (Gradient & Sweep) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 z-20 pointer-events-none" />
        
        <motion.div
          key={isActive ? "active" : "inactive"}
          initial={{ x: "-150%", skewX: -20 }}
          animate={isActive ? { x: "150%" } : { x: "-150%" }}
          transition={isActive ? { 
            duration: 0.8, 
            ease: [0.43, 0.13, 0.23, 0.96] 
          } : { duration: 0 }}
          className="absolute inset-0 z-25 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
        />

        {/* Layer 5: Text/Meta Overlay Layer */}
        <ProjectMetaOverlay
          item={item}
          onSelect={() => onSelect(item)}
        />
      </div>
    </motion.article>
  );
});

ProjectCard.displayName = "ProjectCard";
