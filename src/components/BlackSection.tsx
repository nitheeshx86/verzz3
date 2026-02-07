import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Meteors } from './ui/Meteors';
import { TextReveal } from './ui/TextReveal';
import { ScrollVelocity } from './ScrollVelocity';

const BlackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const sectionOpacity = useTransform(sectionProgress, [0, 0.5], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black overflow-hidden pb-24"
    >
      {/* Background Overlay - z-0 */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="absolute inset-0 bg-black pointer-events-none z-0"
      />

      {/* Meteors - z-10 (restored) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Meteors number={30} />
      </div>

      {/* Content - z-20 (above everything) */}
      <div className="relative z-20 -mt-24 md:-mt-32">
        <div className="mb-0">
          <TextReveal className="text-3xl md:text-5xl lg:text-6xl text-white">
            VERZZ is a SEBI-compliant platform where you discover verified fund managers, learn the basics of investing, and connect safely.
          </TextReveal>
        </div>

        {/* Tilted ScrollVelocity with significantly more vertical padding to prevent clipping */}
        <div className="w-full overflow-hidden py-60 -mt-[35vh] md:-mt-[55vh]">
          <div className="w-[150%] -rotate-[10deg] origin-center translate-x-[-10%] opacity-60">
            <ScrollVelocity
              texts={['DISCOVER.', 'LEARN.', 'INVEST.']}
              velocity={50}
              className="text-6xl md:text-[10rem] font-black tracking-tighter text-white/20 uppercase leading-[0.9]"
            />
          </div>
        </div>

      </div>

      {/* Bottom Gradient Overlay - Transition from rgb(13,13,13) to black */}
      <div className="absolute inset-x-0 bottom-0 h-[800px] bg-gradient-to-b from-transparent via-black/40 to-black pointer-events-none z-30" />
    </section>
  );
};

export default BlackSection;
