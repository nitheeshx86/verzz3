import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FlowingMenu from './FlowingMenu';
import GradientText from './GradientText';

const BlackSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  const demoItems = [
    { link: '#', text: 'SWIPE', image: 'https://images.unsplash.com/photo-1611974714851-12513f59620a?q=80&w=600&h=400&fit=crop' },
    { link: '#', text: 'DISCOVER', image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&h=400&fit=crop' },
    { link: '#', text: 'LEARN', image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&h=400&fit=crop' }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[120vh] bg-[rgb(13,13,13)] flex flex-col pt-32"
    >
      {/* Fade overlay from white to black if needed, or keeping it for consistency */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-[rgb(13,13,13)] pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col w-full h-full">
        {/* Eyebrow text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 px-6"
        >
          <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-medium">
            VERZZ is like dark mode, once you try it just feels right
          </p>
        </motion.div>

        {/* Gradient Text Effect */}
        <div className="mb-12">
          <GradientText
            colors={["#0066FF", "#4158D0", "#00C2FF", "#6366F1", "#0066FF"]}
            animationSpeed={7}
            showBorder={false}
            className="text-4xl md:text-6xl font-bold tracking-tighter"
          >
            With VERZZ, You Just
          </GradientText>
        </div>

        {/* Flowing Menu */}
        <div style={{ height: '600px', position: 'relative' }}>
          <FlowingMenu
            items={demoItems}
            bgColor="rgb(13,13,13)"
            marqueeBgColor="#FFFFFF"
            marqueeTextColor="rgb(13,13,13)"
            textColor="#FFFFFF"
            borderColor="rgba(255,255,255,0.1)"
          />
        </div>
      </div>
    </section>
  );
};

export default BlackSection;
