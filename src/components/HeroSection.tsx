import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GradientBlinds from './GradientBlinds';
import TextType from './TextType';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Reduced shrink effect - only goes to 0.85 instead of 0.7 (half the reduction)
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 32]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-background">
      {/* Sticky hero container - white background visible when hero shrinks */}
      <div className="sticky top-0 h-screen flex items-center justify-center bg-background p-0">
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative w-full h-full origin-center"
        >
          {/* Inner container that clips the content to the border-radius */}
          <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
            {/* Gradient background - fills entire container */}
            <div className="absolute inset-0 w-full h-full">
              <GradientBlinds
                gradientColors={['#6be9ffff', '#4ab1ffff', '#4A6FFF']}
                angle={-15}
                noise={0.25}
                blindCount={14}
                blindMinWidth={80}
                spotlightRadius={0.35}
                spotlightSoftness={0.8}
                spotlightOpacity={0.9}
                mouseDampening={0.22}
                distortAmount={0.5}
                shineDirection="left"
                mixBlendMode="normal"
              />
            </div>

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hero-grid" width="200" height="200" patternUnits="userSpaceOnUse">
                    <path
                      d="M 200 0 L 0 0 0 200"
                      fill="none"
                      stroke="rgba(128, 128, 128, 0.2)"
                      strokeWidth="1"
                    />
                    <circle cx="0" cy="0" r="2.5" fill="rgba(128, 128, 128, 0.3)" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-grid)" />
              </svg>
            </div>

            {/* Hero content */}
            <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:px-20 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-left max-w-4xl"
              >
                <h1 className="hero-text mb-6">
                  <TextType
                    text={["Learn from", "Invest with", "Find Your"]}
                    typingSpeed={80}
                    deletingSpeed={40}
                    pauseDuration={2000}
                    loop={true}
                    showCursor={true}
                    cursorCharacter="|"
                  />
                  <br />
                  <span className="text-[0.75em] inline-block">SEBI Verified Experts.</span>
                </h1>
                <p className="body-large max-w-2xl text-white/80 mb-10">
                  A no-cap way to learn finance. Discover SEBI-verified fund managers,
                  build real financial understanding, and connect with confidence.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 pointer-events-auto">
                  <a href="#sparkles-section" className="waitlist-btn">
                    <span className="text">Join the Waitlist</span>
                    <span className="arrow">›</span>
                  </a>
                  <a href="#sparkles-section" className="text-white/80 hover:text-white font-medium text-lg transition-colors">
                    Build with us
                  </a>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
