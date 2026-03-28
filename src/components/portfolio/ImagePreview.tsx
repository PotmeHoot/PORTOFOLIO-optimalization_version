import { motion } from "motion/react";
import { Asset } from "../ui/Asset";
import { ImagePlaceholder } from "./ProjectPlaceholders";

interface ImagePreviewProps {
  images: string[];
  activeSegmentIndex: number;
  isVisible: boolean;
  shouldReduceMotion: boolean;
  projectTitle: string;
  isHoverSupported: boolean;
}

export const ImagePreview = ({
  images,
  activeSegmentIndex,
  isVisible,
  shouldReduceMotion,
  projectTitle,
  isHoverSupported,
}: ImagePreviewProps) => {
  if (images.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{
            opacity: isVisible && idx === activeSegmentIndex ? 1 : 0,
            scale: isVisible && idx === activeSegmentIndex ? 1 : 1.03,
          }}
          transition={{
            opacity: {
              duration: idx === 0 && activeSegmentIndex === 0 ? 0.4 : (isHoverSupported ? 1 : 0.4),
              ease: [0.22, 1, 0.36, 1],
            },
            scale: {
              duration: shouldReduceMotion ? 0 : (isHoverSupported ? 1 : 0.6),
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          style={{ willChange: "opacity, transform" }}
        >
          <Asset
            src={src}
            alt={`${projectTitle} - Preview ${idx + 1}`}
            className="w-full h-full object-cover"
            loading={idx === 0 ? "eager" : "lazy"}
            containerClassName="w-full h-full"
            errorFallback={<ImagePlaceholder />}
          />
        </motion.div>
      ))}
    </div>
  );
};
