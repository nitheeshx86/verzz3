import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const VerzzSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Extremely slow start, aggressive acceleration
  const scale = useTransform(scrollYProgress, [0.05, 1.0], [1, 350], {
    ease: (v) => Math.pow(v, 4)
  });
  const textOpacity = useTransform(scrollYProgress, [0.05, 0.15, 0.9, 1.0], [0, 1, 1, 0]);

  // New: Text color also transitions to pure black as it scales
  const textColor = useTransform(
    scrollYProgress,
    [0.1, 0.6],
    ["rgb(13, 13, 13)", "rgb(0, 0, 0)"]
  );

  // New: "enter" label opacity
  const enterOpacity = useTransform(scrollYProgress, [0.1, 0.25], [1, 0]);

  // Background transitions from white to pure black earlier to avoid seams
  const backgroundColor = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6],
    ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(0, 0, 0)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[250vh] bg-black"
    >
      <motion.div
        style={{ backgroundColor }}
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative flex items-center justify-center">
          {/* "enter" label - positioned relative to the main text */}
          <motion.div
            style={{ opacity: enterOpacity }}
            className="absolute -top-16 md:-top-24 text-base md:text-xl uppercase tracking-[0.8em] text-white font-medium select-none pointer-events-none z-0 mix-blend-difference opacity-50"
          >
            enter
          </motion.div>

          <motion.div
            style={{ scale, opacity: textOpacity, color: textColor }}
            className="verzz-text select-none relative z-10"
          >
            VERZ<span className="-ml-[0.05em]">Z</span>
          </motion.div>


        </div>
      </motion.div>
    </section>
  );
};

export default VerzzSection;
