import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';
import ElectricBorder from './ElectricBorder';

const BenefitCardsSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
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

    return (
        <section className="w-full py-32 bg-black px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Card 1: Quizzes */}
                    <motion.div
                        variants={cardVariants}
                        className="relative flex flex-col h-full"
                    >
                        <ElectricBorder
                            color="#2563eb"
                            speed={1.5}
                            chaos={0.15}
                            borderRadius={40}
                            className="w-full h-full"
                        >
                            <div className="relative h-full bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-900/50 flex flex-col items-start overflow-hidden">
                                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-lg border border-zinc-800">
                                    <Award className="w-8 h-8 text-orange-500" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight relative z-10">
                                    Quizzes, streak rewards, badges
                                </h3>

                                <p className="text-zinc-400 text-lg leading-relaxed relative z-10">
                                    Gamified learning keeps you motivated. Earn real recognition for your intellectual growth.
                                </p>
                            </div>
                        </ElectricBorder>
                    </motion.div>

                    {/* Card 2: Confidence */}
                    <motion.div
                        variants={cardVariants}
                        className="relative flex flex-col h-full"
                    >
                        <ElectricBorder
                            color="#3b82f6"
                            speed={1.5}
                            chaos={0.15}
                            borderRadius={40}
                            className="w-full h-full"
                        >
                            <div className="relative h-full bg-zinc-950 p-10 rounded-[2.5rem] border border-zinc-900/50 flex flex-col items-start overflow-hidden">
                                <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center mb-8 relative z-10 shadow-lg border border-zinc-800">
                                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight relative z-10">
                                    Builds confidence before real investing
                                </h3>

                                <p className="text-zinc-400 text-lg leading-relaxed relative z-10">
                                    Learn the "why" and "how" in a risk-free environment before committing your hard-earned capital.
                                </p>
                            </div>
                        </ElectricBorder>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default BenefitCardsSection;
