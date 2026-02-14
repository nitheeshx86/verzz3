import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './KeepScrolling.css';

interface KeepScrollingProps {
  isLoading: boolean;
}

const KeepScrolling: React.FC<KeepScrollingProps> = ({ isLoading }) => {
  const { scrollYProgress } = useScroll();

  // Fade out as we reach the footer (approx 98% scroll)
  const opacity = useTransform(
    scrollYProgress,
    [0.95, 0.98],
    [1, 0]
  );

  if (isLoading) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center justify-center gap-3 animate-in fade-in duration-1000"
    >
      {/* Pulsating dot */}
      <div
        className="w-1.5 h-1.5 bg-gray-500 rounded-full flex-shrink-0 animate-pulse-dot"
      />

      {/* Text */}
      <span className="text-gray-500 text-[10px] md:text-sm font-light uppercase tracking-widest leading-none">
        Keep scrolling
      </span>
    </motion.div>
  );
};

export default KeepScrolling;
