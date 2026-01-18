import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const VerzzSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Extremely slow start, aggressive acceleration
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [1, 250], {
    ease: (v) => Math.pow(v, 5) // Quintic ease-in for almost stationary start
  });
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.7, 0.85], [0, 1, 1, 0]);

  // New: "enter" text opacity - stays visible longer and starts solid
  const enterOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);

  // Background transitions from white to black as you scroll
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.55, 0.8],
    ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(13, 13, 13)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative flex items-center justify-center">
          {/* "enter" label - positioned relative to the main text */}
          <motion.div
            style={{ opacity: enterOpacity }}
            className="absolute -top-16 md:-top-24 text-base md:text-xl uppercase tracking-[0.8em] text-gray-500 font-medium select-none pointer-events-none z-0"
          >
            enter
          </motion.div>

          <motion.div
            style={{ scale, opacity: textOpacity, color: 'rgb(13, 13, 13)' }}
            className="verzz-text select-none relative z-10"
          >
            VERZZ
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default VerzzSection;
