import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const LearnSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[60vh] bg-white dark:bg-black overflow-hidden flex items-center justify-center py-20"
        >
            {/* Centered Text - "Learn." */}
            <div className="absolute z-10 flex items-center justify-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={isInView ? {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)"
                    } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut"
                    }}
                    className="text-6xl md:text-8xl font-bold text-blue-600 relative z-20"
                >
                    Learn.
                </motion.h2>
            </div>
        </section>
    );
};

export default LearnSection;
