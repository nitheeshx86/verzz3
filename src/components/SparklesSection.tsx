import { useState } from "react";
import { SparklesCore } from "./ui/sparkles";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const BetaAccessSection = () => {
    const [showBetaForm, setShowBetaForm] = useState(false);

    return (
        <div className="flex flex-col items-center w-full max-w-xl relative">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-16 md:mb-32">
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        setShowBetaForm(!showBetaForm);
                    }}
                    className={cn(
                        "waitlist-btn transition-transform duration-300 relative z-30",
                        showBetaForm && "scale-95 opacity-80"
                    )}
                >
                    <span className="text">{showBetaForm ? "Welcome!" : "Get Early Access"}</span>
                    <span className="arrow">›</span>
                </button>
            </div>

            <div
                className={cn(
                    "absolute top-[280px] md:top-24 left-0 right-0 flex flex-col items-center w-full transition-all duration-500 ease-out",
                    showBetaForm ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
                )}
            >
                <h2 className="text-xl md:text-2xl text-neutral-400 font-bold tracking-tight mb-6">
                    Get the beta access
                </h2>
                <PlaceholdersAndVanishInput
                    placeholders={["Enter your email id"]}
                    onSubmit={(e) => console.log("submitted", e)}
                />
            </div>
        </div>
    );
};

const SparklesSection = () => {
    const isMobile = useIsMobile();
    return (
        <div id="sparkles-section" className="min-h-[70rem] md:min-h-[60rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden mb-[55vh] md:mb-[80vh]">
            <h1 className="md:text-[12rem] text-6xl lg:text-[15rem] font-bold text-center text-white relative z-20 tracking-tighter">
                VERZ<span className="-ml-[0.05em]">Z</span>
            </h1>
            <div className="w-full max-w-[60rem] relative md:-mt-4 mt-1">
                {/* Gradients */}
                <div className="absolute inset-x-20 top-2 md:top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                <div className="absolute inset-x-20 top-2 md:top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                <div className="absolute inset-x-60 top-2 md:top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                <div className="absolute inset-x-60 top-2 md:top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                <div className="flex flex-col items-center">
                    {/* Sparkles Effect Container */}
                    <div className="w-full h-[200px] relative">
                        <SparklesCore
                            id="tsparticlesfullpage"
                            background="transparent"
                            minSize={0.4}
                            maxSize={1.5}
                            particleDensity={isMobile ? 600 : 1500}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />
                        {/* Radial Gradient to prevent sharp edges */}
                        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(500px_200px_at_top,transparent_20%,white)]"></div>
                    </div>

                    {/* Content Section - Now after the sparkles effect */}
                    <div className="flex flex-col items-center justify-center relative z-20 px-4 mt-8">
                        <p className="text-white text-xl md:text-3xl font mb-16 max-w-4xl text-center leading-relaxed tracking-tight">
                            The platform smart investors wish they had years ago.
                        </p>

                        <BetaAccessSection />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SparklesSection;
