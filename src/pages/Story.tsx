import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import TiltedCard from '@/components/ui/tilted-card';
import ProfileCard from '@/components/ui/profile-card';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const Story = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const storySteps = [
        {
            title: "The Vision",
            description: "Verzz was born out of a simple realization: the world of finance is unnecessarily opaque. We set out to build a platform where transparency isn't just a feature, but the foundation.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
            caption: "Concept Phase"
        },
        {
            title: "Building the Core",
            description: "We spent months defining what 'verified' truly means. Connecting with SEBI registered managers and building the technical infrastructure to bridge the trust gap.",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
            caption: "Development"
        },
        {
            title: "The Community",
            description: "Finance is personal. Our story is as much about our users as it is about us. We're growing a community of smart investors who demand better from the industry.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
            caption: "Growth"
        }
    ];

    const team = [
        {
            name: "Alex Rivera",
            role: "Lead Designer",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop",
        },
        {
            name: "Sarah Chen",
            role: "Product Strategy",
            image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop",
        },
        {
            name: "Jordan Smith",
            role: "Engineering",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
        }
    ];

    return (
        <div className="bg-[#FAF8F2] min-h-screen text-black font-sans overflow-x-hidden relative">
            <Navbar />

            {/* Massive Background Text (The 'Watermark' Effect) */}
            <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
                <h1 className="text-[25vw] font-black text-[#0055FF]/[0.04] whitespace-nowrap leading-none select-none uppercase">
                    VERZZ
                </h1>
            </div>

            <main className="relative pt-40 pb-20 z-10 w-full px-4 md:px-10 lg:px-20">
                {/* Grain texture overlay */}
                <div className="fixed inset-0 pointer-events-none z-[1] opacity-[0.035]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px'
                }} />

                {/* Ambient blue glow - top */}
                <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none z-0"
                    style={{ background: 'radial-gradient(ellipse at center, rgba(0,85,255,0.06) 0%, transparent 70%)' }} />

                {/* Ambient blue glow - mid */}
                <div className="fixed top-1/2 right-0 w-[600px] h-[600px] pointer-events-none z-0"
                    style={{ background: 'radial-gradient(ellipse at right, rgba(0,85,255,0.04) 0%, transparent 70%)' }} />
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-32 text-center max-w-7xl mx-auto"
                >
                    <h1 className="text-8xl md:text-[12rem] font-black tracking-tighter mb-8 leading-[0.8] drop-shadow-sm uppercase">
                        OUR <span className="text-[#0055FF] tracking-[-0.15em]">STORY</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-black/40 max-w-2xl mx-auto leading-tight font-medium">
                        Moving from misinformation to verification, one trade at a time.
                    </p>
                </motion.div>

                {/* Timeline Sections */}
                <div className="space-y-60 max-w-7xl mx-auto">
                    {storySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32 rounded-3xl p-10 -mx-10 ${index === 1 ? 'bg-[#0055FF]/[0.03] ring-1 ring-[#0055FF]/10' : ''
                                }`}
                        >
                            <div className="flex-1 w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]">
                                <TiltedCard
                                    imageSrc={step.image}
                                    altText={step.title}
                                    captionText={step.caption}
                                    containerHeight="500px"
                                    containerWidth="100%"
                                    imageHeight="450px"
                                    imageWidth="100%"
                                    rotateAmplitude={8}
                                    scaleOnHover={1.05}
                                    showMobileWarning={false}
                                    showTooltip
                                    displayOverlayContent
                                    overlayContent={
                                        <div className="p-6 bg-white/60 backdrop-blur-xl border border-white/40 rounded-2xl m-8 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-xl translate-y-4 group-hover:translate-y-0 text-black">
                                            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-[#0055FF] mb-2 text-black">Phase 0{index + 1}</p>
                                            <h3 className="text-2xl font-black italic tracking-tighter text-black uppercase">{step.title}</h3>
                                        </div>
                                    }
                                />
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="inline-block px-4 py-1 bg-black text-[#FFFFF0] text-[10px] font-black uppercase tracking-[0.5em] rounded-full">
                                    Step 0{index + 1}
                                </div>
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
                                    {step.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-black/50 leading-tight font-medium">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Founders Section - WIDER CONTAINER */}
                <section
                    className="mt-80 bg-[#F0F4FF] p-10 md:p-20 xl:p-24 rounded-[60px] shadow-[0_120px_100px_rgba(0,0,0,0.12)] border border-black/5 relative overflow-hidden mx-auto w-full max-w-[1600px]"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")` }}
                >
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0055FF]/10 blur-[150px] -mr-64 -mt-64" />
                    <div className="flex flex-col lg:flex-row gap-16 xl:gap-24 items-start relative z-10">
                        {/* Founder Card */}
                        <div className="w-full max-w-[400px] md:max-w-[450px] mx-auto lg:mx-0 shrink-0 drop-shadow-[0_60px_60px_rgba(0,0,0,0.25)]">
                            <ProfileCard
                                name="Pranay V. Jain"
                                title="Founder @ Verzz"
                                handle="pranay"
                                status="Building"
                                contactText="Schedule Call"
                                avatarUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                                showUserInfo={false}
                                enableTilt={true}
                                behindGlowColor="rgba(0, 85, 255, 0.4)"
                                innerGradient="linear-gradient(145deg, rgba(0,85,255,0.1) 0%, rgba(255,255,240,0.1) 100%)"
                            />
                        </div>

                        {/* Letter Content */}
                        <div className="flex-1 min-w-0 space-y-10 py-4">
                            <div className="space-y-4">
                                <span className="text-[#0055FF] text-sm font-black uppercase tracking-[0.8em] bg-[#0055FF]/5 px-6 py-2 rounded-full w-fit block">Visionary</span>
                                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] py-2 uppercase">
                                    A LETTER <br /> FROM THE <br /> <span className="text-[#0055FF]">FOUNDER.</span>
                                </h2>
                            </div>

                            <div className="space-y-8 text-lg md:text-xl xl:text-2xl text-black/80 leading-snug font-medium italic">
                                <p className="relative pl-4">
                                    <span className="absolute -left-6 -top-8 text-[8rem] text-[#0055FF]/10 font-serif pointer-events-none leading-none">"</span>
                                    Verzz wasn't built in a boardroom. It was built in the trenches of the retail market.
                                </p>
                                <p>We saw thousands of everyday people losing their life savings to 'fin-fluencers' and unverified promises. We decided that enough was enough. Trust shouldn't be a luxury—it should be the default.</p>
                                <p>We are building more than an app; we're building a standard. A place where every claim is backed by data, and every manager is verified by truth.</p>
                            </div>

                            <div className="flex items-center gap-6 pt-10 border-t border-black/5 w-fit">
                                <div className="h-[4px] w-16 bg-black" />
                                <div className="flex flex-col">
                                    <span className="text-2xl xl:text-4xl font-black uppercase tracking-tighter text-black">Pranay</span>
                                    <span className="text-[10px] font-bold text-[#0055FF] uppercase tracking-[0.5em] mt-1">Chief Executive Officer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mt-60 max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">The Squad.</h2>
                        <p className="text-xl text-black/40 font-bold tracking-widest uppercase italic">Creators of the New Standard</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {team.map((person, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="group drop-shadow-[0_25px_25px_rgba(0,0,0,0.08)]"
                            >
                                <TiltedCard
                                    imageSrc={person.image}
                                    altText={person.name}
                                    captionText={person.role}
                                    containerHeight="350px"
                                    containerWidth="100%"
                                    imageHeight="320px"
                                    imageWidth="100%"
                                    rotateAmplitude={15}
                                    showTooltip={false}
                                />
                                <div className="mt-8 text-center space-y-1">
                                    <h3 className="text-2xl font-black tracking-tighter uppercase italic">{person.name}</h3>
                                    <p className="text-xs font-black text-[#0055FF] uppercase tracking-[0.4em]">{person.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-60 text-center py-20 border-t-2 border-black/5 max-w-7xl mx-auto"
                >
                    <h2 className="text-4xl md:text-8xl font-black mb-16 tracking-tighter leading-none uppercase">
                        WANT TO BE PART <br /> OF THE <span className="text-[#0055FF]">LEGACY?</span>
                    </h2>
                    <a
                        href="/#sparkles-section"
                        className="waitlist-btn mx-auto scale-110 shadow-[0_30px_60px_rgba(0,85,255,0.4)]"
                    >
                        <span className="text">Join the Crew</span>
                        <span className="arrow">›</span>
                    </a>
                </motion.div>
            </main>

            <div className="bg-[#0055FF] mt-20 relative z-10 border-t border-white/10">
                <Footer />
            </div>
        </div>
    );
};

export default Story;
