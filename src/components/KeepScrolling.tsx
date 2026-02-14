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
      {/* Pill container */}
      <div className="relative w-4 h-8 border border-gray-500 rounded-full bg-transparent overflow-hidden">
        {/* Animated ball */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full animate-scroll-bounce"
        />
      </div>

      {/* Text */}
      <span className="text-gray-500 text-[10px] md:text-sm font-light uppercase tracking-widest">Keep scrolling</span>
    </motion.div>
  );
};

export default KeepScrolling;
