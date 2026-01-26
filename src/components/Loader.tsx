import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const Loader = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 15;
                if (next >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0d0d0d]"
        >
            <div className="relative">
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 bg-[#0055FF] blur-[80px] opacity-20 transition-opacity duration-300"
                    style={{ opacity: (progress / 100) * 0.3 }}
                />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="relative text-7xl md:text-9xl font-black tracking-tighter leading-none">
                        {/* Base Gray Text */}
                        <span className="text-[#333333] select-none">
                            VERZ<span className="-ml-[0.05em]">Z</span>
                        </span>

                        {/* Filling Blue Text */}
                        <div
                            className="absolute top-0 left-0 text-[#0055FF] select-none overflow-hidden transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        >
                            <span className="whitespace-nowrap">
                                VERZ<span className="-ml-[0.05em]">Z</span>
                            </span>
                        </div>
                    </div>

                    {/* Percentage Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        className="mt-8 font-mono text-sm tracking-[0.3em] text-white/50"
                    >
                        {Math.round(progress)}%
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default Loader;
