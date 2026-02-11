import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const KeepScrolling = ({ isLoading }: { isLoading: boolean }) => {
  const { scrollYProgress } = useScroll();

  // Visibility Ranges:
  // Fully visible from start (0%) until the footer appears (98%)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.98, 0.99],
    [isLoading ? 0 : 1, 1, 1, 0]
  );

  const translateY = useTransform(
    scrollYProgress,
    [0.98, 0.99],
    [0, 10]
  );

  // Color Logic:
  // - Starts as WHITE (for the dark Hero section)
  // - Switches to BLACK (for white Finance and Aura sections)around 15% scroll
  // - Switches back to WHITE (for dark Verzz transition and beyond) around 50% scroll
  const color = useTransform(
    scrollYProgress,
    [0.12, 0.18, 0.48, 0.56],
    ["#ffffff", "#000000", "#000000", "#ffffff"]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 0 : 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ 
        opacity, 
        y: translateY,
      }}
      className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[10000] pointer-events-none"
    >
      <motion.div
        animate={{
          y: [0, 4, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        <motion.span
          style={{ color }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.8em] font-bold opacity-60 will-change-transform"
        >
          Keep Scrolling
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default KeepScrolling;
