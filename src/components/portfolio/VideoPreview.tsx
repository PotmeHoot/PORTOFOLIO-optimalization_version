import { motion } from "motion/react";
import { RefObject } from "react";
import { VideoPlaceholder } from "./ProjectPlaceholders";
import { Asset } from "../ui/Asset";

interface VideoPreviewProps {
  src: string;
  isVisible: boolean;
  onLoadedMetadata: () => void;
  onError: () => void;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export const VideoPreview = ({
  src,
  isVisible,
  onLoadedMetadata,
  onError,
  videoRef,
}: VideoPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(0px)" }}
      animate={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? ["blur(4px)", "blur(0px)"] : "blur(0px)",
      }}
      transition={{
        opacity: { duration: 0.5 },
        filter: { duration: 0.4 },
      }}
      style={{ 
        willChange: "opacity, filter",
        backgroundColor: "transparent" 
      }}
      className="absolute inset-0"
    >
      <Asset
        ref={videoRef}
        src={src}
        alt="Project Preview Video"
        className="w-full h-full object-cover"
        containerClassName="w-full h-full"
        onLoad={onLoadedMetadata}
        onError={onError}
        errorFallback={<VideoPlaceholder className="opacity-100" />}
        autoPlay={isVisible}
        muted
        loop
        playsInline
      />
    </motion.div>
  );
};
