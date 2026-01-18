import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Meteors } from './ui/Meteors';
import { TextReveal } from './ui/TextReveal';

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
      className="relative bg-[rgb(13,13,13)] overflow-hidden"
    >
      {/* Background Overlay - z-0 */}
      <motion.div
        style={{ opacity: sectionOpacity }}
        className="absolute inset-0 bg-[rgb(13,13,13)] pointer-events-none z-0"
      />

      {/* Meteors - z-10 (above overlay) */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <Meteors number={30} />
      </div>

      {/* Content - z-20 (above meteors) */}
      <div className="relative z-20">
        <TextReveal className="text-3xl md:text-5xl lg:text-6xl">
          VERZZ is a SEBI-compliant platform where you discover verified fund managers, learn the basics of investing, and connect safely.
        </TextReveal>
      </div>
    </section>
  );
};

export default BlackSection;
