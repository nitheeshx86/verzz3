import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck, Clock, TrendingUp } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

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
            { threshold: 0.1 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.6
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cards = [
        {
            icon: <Award className="w-8 h-8 text-blue-600" />,
            title: "Quizzes, streak rewards, badges",
            description: "Gamified learning keeps you motivated. Earn real recognition for your intellectual growth.",
            borderColor: "#3b82f6",
            titleColor: "text-slate-900"
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
            title: "Builds confidence before real investing",
            description: "Learn the \"why\" and \"how\" in a risk-free environment before committing your hard-earned capital.",
            borderColor: "#3b82f6",
            titleColor: "text-slate-900"
        },
        {
            icon: <Clock className="w-8 h-8 text-blue-600" />,
            title: "Daily 2-minute lessons",
            description: "Bite-sized knowledge designed for busy lifestyles. Master one concept every single day.",
            borderColor: "#3b82f6",
            titleColor: "text-slate-900"
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
            title: "Progress across 10 learning levels",
            description: "From complete novice to confident strategist. Our curriculum scales with your understanding.",
            borderColor: "#3b82f6",
            titleColor: "text-slate-900"
        }
    ];

    return (
        <section
            ref={containerRef}
            className="w-full bg-white flex flex-col items-center py-32 px-6 overflow-hidden"
        >
            {/* Top Text - "Learn." */}
            <div className="mb-20 text-center">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={isInView ? {
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)"
                    } : { opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut"
                    }}
                    className="text-6xl md:text-8xl font-bold text-blue-600"
                >
                    Learn.
                </motion.h2>
            </div>

            {/* Grid Content */}
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="relative flex flex-col h-full"
                        >
                            <ElectricBorder
                                color={card.borderColor}
                                speed={1.5}
                                chaos={0.15}
                                borderRadius={40}
                                className="w-full h-full shadow-lg"
                            >
                                <div className="relative h-full bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-start overflow-hidden">
                                    <div className="w-16 h-16 bg-slate-100/50 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-sm border border-gray-100">
                                        {card.icon}
                                    </div>

                                    <h3 className={`text-2xl md:text-3xl font-bold mb-4 leading-tight relative z-10 ${card.titleColor}`}>
                                        {card.title}
                                    </h3>

                                    <p className="text-slate-600 text-lg leading-relaxed relative z-10">
                                        {card.description}
                                    </p>
                                </div>
                            </ElectricBorder>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LearnSection;
