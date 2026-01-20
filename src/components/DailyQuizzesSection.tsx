import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const DailyQuizzesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });

    // Page Transition effects based on Scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Fade In entering, Fade Out leaving
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8], [0.8, 1, 1, 0.9]);

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity, scale }}
            className="w-full min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center relative overflow-hidden py-20"
        >
            {/* Clock Container */}
            <div className="relative w-80 h-80 md:w-96 md:h-96 flex flex-col items-center justify-center">
                {/* SVG Stopwatch Face */}
                <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl overflow-visible">
                    {/* Stopwatch Top Handle */}
                    <rect x="45" y="0" width="10" height="8" rx="1" fill="none" stroke="#2563eb" strokeWidth="2" /> {/* Blue stroke */}
                    <rect x="42" y="8" width="16" height="4" rx="1" fill="#2563eb" /> {/* Blue fill */}
                    <line x1="50" y1="12" x2="50" y2="20" stroke="#2563eb" strokeWidth="3" />

                    {/* Side Button (Angled) */}
                    <line x1="82" y1="25" x2="90" y2="18" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />

                    {/* Main Body Circle */}
                    <circle cx="50" cy="65" r="40" fill="none" stroke="#2563eb" strokeWidth="3" /> {/* Blue stroke */}

                    {/* Markers - Simple 12 hour/minute layout */}
                    {[...Array(12)].map((_, i) => {
                        return (
                            <line
                                key={i}
                                x1="50" y1="32"
                                x2="50" y2="36"
                                stroke="#2563eb"
                                strokeWidth="2"
                                transform={`rotate(${i * 30} 50 65)`}
                            />
                        );
                    })}

                    {/* Needle */}
                    <motion.line
                        x1="50" y1="65"
                        x2="50" y2="35" // Points up towards 12
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ rotate: 0 }}
                        animate={isInView ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ originX: "50%", originY: "65px" }} // Rotate around center (which is cy=65)
                    />

                    {/* Center Dot */}
                    <circle cx="50" cy="65" r="3" fill="#2563eb" />
                </svg>

            </div>

            {/* Text "Daily 2mins lessons" appearing BELOW the clock like Learn section */}
            <div className="mt-8 flex items-center justify-center z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={isInView ? {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)"
                    } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{
                        duration: 0.8,
                        delay: 0.5,
                        ease: "easeOut"
                    }}
                    className="text-4xl md:text-6xl font-bold text-black dark:text-white text-center"
                >
                    Daily 2mins lessons
                </motion.h2>
            </div>

        </motion.section>
    );
};

export default DailyQuizzesSection;
