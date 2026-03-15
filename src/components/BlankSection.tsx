import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring } from 'framer-motion';
import { ScatterBackground } from './ui/scatter-background';

const FRAME_COUNT = 421;
const IMAGES = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNumber = (i + 1).toString().padStart(4, '0');
    return `/frames2_webp/frame_${frameNumber}.webp`;
});

const content = [
    {
        title: "Welcome to Verzz",
        description: "Your journey into a new era of exploring and building begins here.",
        startFrame: 0,
        endFrame: 110,
        kind: null,
    },
    {
        title: "Learn",
        description: "Build the foundations that others skip. Understand the why behind every concept, not just the steps to finish it.",
        startFrame: 160,
        endFrame: 230,
        kind: "learn" as const,
    },
    {
        title: "Discover",
        description: "Explore paths you didn’t know existed. Find tools, ideas, and opportunities beyond the syllabus.",
        startFrame: 280,
        endFrame: 350,
        kind: "discover" as const,
    },
    {
        title: "Connect",
        description: "Connect with people, mentors, and ideas that push you forward.",
        startFrame: 390,
        endFrame: 420,
        kind: "connect" as const,
    },
];

const mobileContent = [
    {
        title: "Welcome to Verzz",
        description: "Your journey into a new era of exploring and building begins here.",
        image: "/portraitphone/welcome.png",
        kind: null,
    },
    {
        title: "Learn",
        description: "Build the foundations that others skip. Understand the why behind every concept, not just the steps to finish it.",
        image: "/portraitphone/learn.png",
        kind: "learn" as const,
    },
    {
        title: "Discover",
        description: "Explore paths you didn’t know existed. Find tools, ideas, and opportunities beyond the syllabus.",
        image: "/portraitphone/discover.png",
        kind: "discover" as const,
    },
    {
        title: "Connect",
        description: "Connect with people, mentors, and ideas that push you forward.",
        image: "/portraitphone/connect.png",
        kind: "connect" as const,
    }
];

const BlankSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [activeCard, setActiveCard] = useState(-1);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const smoothIndex = useSpring(currentIndex, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.5
    });

    useMotionValueEvent(smoothIndex, "change", (latest) => {
        const frameIndex = Math.round(latest);

        let matchingIndex = -1;
        content.forEach((item, index) => {
            if (frameIndex >= item.startFrame && frameIndex <= item.endFrame) {
                matchingIndex = index;
            }
        });

        setActiveCard(matchingIndex);
    });

    useEffect(() => {
        const loadImages = async () => {
            const orderedImages = new Array(FRAME_COUNT);
            const promises = IMAGES.map((src, index) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        orderedImages[index] = img;
                        resolve();
                    };
                    img.onerror = reject;
                });
            });

            await Promise.all(promises);
            imagesRef.current = orderedImages;
            setImagesLoaded(true);
        };

        loadImages();
    }, []);

    const render = useCallback((exactIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!canvas || !ctx || imagesRef.current.length < FRAME_COUNT) return;

        const index = Math.min(Math.max(Math.round(exactIndex), 0), FRAME_COUNT - 1);
        const img = imagesRef.current[index];

        if (!img) return;

        const { width, height } = canvas;
        const canvasRatio = width / height;
        const imgRatio = img.width / img.height;

        let drawWidth, drawHeight, offsetX, offsetY;

        if (imgRatio > canvasRatio) {
            drawHeight = height;
            drawWidth = img.width * (height / img.height);
            offsetX = (width - drawWidth) / 2;
            offsetY = 0;
        } else {
            drawWidth = width;
            drawHeight = img.height * (width / img.width);
            offsetX = 0;
            offsetY = (height - drawHeight) / 2;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }, []);

    useEffect(() => {
        if (!imagesLoaded) return;

        render(0);

        const unsubscribe = smoothIndex.on("change", (latest) => {
            render(latest);
        });

        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;

                render(smoothIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [imagesLoaded, smoothIndex, render]);

    return (
        <>
            <section
                ref={containerRef}
                className="hidden xl:block relative h-[600vh] w-full bg-black"
            >
                <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                    <canvas
                        ref={canvasRef}
                        style={{ willChange: 'contents' }}
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="relative z-10 w-full h-full pointer-events-none">
                        {content.map((item, index) => (
                            <motion.div
                                key={item.title + index}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0,
                                    pointerEvents: activeCard === index ? "auto" : "none"
                                }}
                                transition={{ duration: 0.8 }}
                                className="absolute inset-0 w-full h-full"
                            >
                                {item.kind && <ScatterBackground kind={item.kind} />}

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0,
                                        y: activeCard === index ? 0 : 30,
                                    }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="absolute top-1/2 -translate-y-1/2 left-10 xl:left-20 max-w-xl xl:max-w-2xl w-full z-20 pointer-events-none"
                                >
                                    <h2 className="text-6xl xl:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
                                        {item.title}
                                    </h2>
                                    <p className="text-xl xl:text-2xl text-slate-100 leading-relaxed font-light drop-shadow-lg">
                                        {item.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="xl:hidden w-full bg-black">
                {mobileContent.map((item, index) => (
                    <motion.div
                        key={item.title + index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 0.8 }}
                        className="min-h-[100svh] w-full flex flex-col items-center justify-start relative px-0"
                    >
                        <div className="flex flex-col items-center justify-start px-6 pt-24 pb-12 w-full h-full pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                                className="w-full text-center z-10 mb-8 mt-10 pointer-events-none"
                            >
                                <h2 className="text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
                                    {item.title}
                                </h2>
                                <p className="text-lg text-slate-200 leading-relaxed font-light drop-shadow-md px-2">
                                    {item.description}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                                className="w-full flex-1 flex items-center justify-center relative p-4 mt-auto pointer-events-none"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-auto max-h-[55vh] object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </section>
        </>
    );
};

export default BlankSection;
