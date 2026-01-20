import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const LevelProgressSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: false, amount: 0.5 });
    const [level, setLevel] = useState(1);
    const [showHat, setShowHat] = useState(false);

    useEffect(() => {
        if (isInView) {
            // Reset state on re-entry
            setLevel(1);
            setShowHat(false);

            let startTimestamp: number;
            const duration = 2000; // 2 seconds to count to 10

            const animate = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                // Map progress 0-1 to levels 1-10
                const currentLevel = Math.floor(progress * 9) + 1;
                setLevel(currentLevel);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Animation complete, show hat after a brief pause
                    setTimeout(() => setShowHat(true), 500);
                }
            };

            requestAnimationFrame(animate);
        }
    }, [isInView]);

    return (
        <section
            ref={containerRef}
            className="w-full min-h-screen bg-black flex flex-col items-center justify-center py-64 px-4 overflow-hidden"
        >
            <div className="relative flex items-center justify-center h-40">
                <AnimatePresence mode="wait">
                    {!showHat ? (
                        <motion.div
                            key="text"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center"
                        >
                            {/* Neon Text Effect matching the image */}
                            <h2
                                className="text-6xl md:text-9xl font-bold tracking-wider font-mono"
                                style={{
                                    color: 'transparent',
                                    WebkitTextStroke: '2px #8b5cf6', // Violet-500
                                    textShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3), 0 0 40px rgba(139, 92, 246, 0.1)'
                                }}
                            >
                                LEVEL-{level}
                            </h2>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="hat"
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20
                            }}
                            className="flex flex-col items-center p-8"
                        >
                            {/* Neon Graduation Hat */}
                            <div className="relative">
                                {/* Glow effect behind */}
                                <div className="absolute inset-0 bg-violet-600 blur-3xl opacity-40 animate-pulse" />

                                <GraduationCap
                                    size={120}
                                    className="text-transparent stroke-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                                    strokeWidth={1.5}
                                />
                            </div>

                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 text-2xl font-bold text-violet-400 tracking-widest uppercase"
                                style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}
                            >
                                Completed
                            </motion.span>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2, duration: 1 }}
                                className="mt-4 text-white text-xl md:text-2xl font-medium tracking-tight"
                            >
                                learn across 10 learning levels
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LevelProgressSection;
