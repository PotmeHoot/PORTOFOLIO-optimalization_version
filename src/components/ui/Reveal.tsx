import { ReactNode, FC } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FADE_UP_VARIANTS, DEFAULT_TRANSITION } from "../../constants/motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  width?: "fit-content" | "100%";
}

export const Reveal: FC<RevealProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  width = "fit-content" 
}) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : FADE_UP_VARIANTS.initial}
      whileInView={FADE_UP_VARIANTS.animate}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ ...DEFAULT_TRANSITION, delay }}
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};
