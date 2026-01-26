import { useState } from "react";
import { SparklesCore } from "./ui/sparkles";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SparklesSection = () => {
    const [showBetaForm, setShowBetaForm] = useState(false);

    return (
        <div className="min-h-[60rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden mb-[110vh] md:mb-[80vh]">
            <h1 className="md:text-[12rem] text-6xl lg:text-[15rem] font-bold text-center text-white relative z-20 tracking-tighter">
                VERZ<span className="-ml-[0.05em]">Z</span>
            </h1>
            <div className="w-full max-w-[60rem] relative -mt-4">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                <div className="flex flex-col items-center">
                    {/* Sparkles Effect Container */}
                    <div className="w-full h-[200px] relative">
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1.5}
                            particleDensity={1500}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                        {/* Radial Gradient to prevent sharp edges */}
                        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_200px_at_top,transparent_20%,white)]"></div>
                    </div>

                    {/* Content Section - Now after the sparkles effect */}
                    <div className="flex flex-col items-center justify-center relative z-20 px-4 mt-8">
                        <p className="text-white text-xl md:text-3xl font-bold italic mb-16 max-w-4xl text-center leading-relaxed tracking-tight">
                            The platform smart investors wish they had years ago.
                        </p>

                        <div className="flex flex-col items-center gap-12 w-full max-w-xl">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowBetaForm(!showBetaForm);
                                    }}
                                    className={cn(
                                        "waitlist-btn transition-transform duration-300",
                                        showBetaForm && "scale-95 opacity-80"
                                    )}
                                >
                                    <span className="text">{showBetaForm ? "Welcome!" : "Get Early Access"}</span>
                                    <span className="arrow">›</span>
                                </button>
                                <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[16px] text-[15px] font-bold uppercase tracking-[0.2em] border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm shadow-xl min-w-[205px]">
                                    Join Forces
                                </button>
                            </div>

                            <AnimatePresence mode="wait">
                                {showBetaForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: 20 }}
                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: 20 }}
                                        transition={{ duration: 0.4, ease: "circOut" }}
                                        className="flex flex-col items-center w-full overflow-hidden"
                                    >
                                        <motion.h2
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-xl md:text-2xl text-neutral-400 font-bold tracking-tight mb-6"
                                        >
                                            Get the beta access
                                        </motion.h2>
                                        <PlaceholdersAndVanishInput
                                            placeholders={["Enter your email id"]}
                                            onSubmit={(e) => console.log("submitted", e)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SparklesSection;
