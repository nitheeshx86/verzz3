import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DailyQuizzesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll progress for fade in/out effects
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Fade in as it enters, fade out as it leaves
    // 0 -> 0.2: Fade In
    // 0.8 -> 1.0: Fade Out
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <motion.section
            ref={containerRef}
            style={{ opacity, scale }}
            className="w-full h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden"
        >
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border-4 border-white/20 flex items-center justify-center bg-zinc-900 shadow-2xl">
                {/* Clock Markers */}
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-4 bg-white/50"
                        style={{
                            top: '10px',
                            rotate: `${i * 30}deg`,
                            transformOrigin: `50% ${128 - 10}px` // Helper calculation matching half container roughly? No, better use absolute positioning + transform
                        }}
                    />
                ))}
                {/* Better marker drawing using absolute inset */}
                {[...Array(60)].map((_, i) => {
                    const isHour = i % 5 === 0;
                    return (
                        <div
                            key={i}
                            className={`absolute left-1/2 top-0 -translate-x-1/2 origin-[50%_192px] md:origin-[50%_192px] pt-2`} // Radius is 192px (h-96 is 384px)
                            style={{
                                // This creates markers around the circle. 
                                // Using specific container size logic. 
                                // Let's rely on SVG for cleaner graphics.
                                transform: `rotate(${i * 6}deg)`,
                                height: '50%'
                            }}
                        >
                            <div className={`w-[2px] ${isHour ? 'h-6 bg-white' : 'h-2 bg-white/30'}`} />
                        </div>
                    );
                })}

                {/* Use SVG for the Clock Face for precision */}
            </div>
        </motion.section>
    )
}
// Retrying with cleaner implementation in next step
