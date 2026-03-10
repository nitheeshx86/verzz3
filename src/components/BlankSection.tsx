import { useEffect, useRef, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion, useSpring } from 'motion/react';

const FRAME_COUNT = 421;
const IMAGES = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNumber = (i + 1).toString().padStart(4, '0');
    return `/frames2/frame_${frameNumber}.png`;
});

const content = [
    {
        title: "Welcome to Verzz",
        description: "Your journey into a new era of exploring and building begins here.",
        startFrame: 44,
        endFrame: 90,
    },
    {
        title: "Learn",
        description: "Build the foundations that others skip. Understand the why behind every concept, not just the steps to finish it.",
        startFrame: 160,
        endFrame: 210,
    },
    {
        title: "Discover",
        description: "Explore paths you didn’t know existed. Find tools, ideas, and opportunities beyond the syllabus.",
        startFrame: 280,
        endFrame: 330,
    },
    {
        title: "Connect",
        description: "Connect with people, mentors, and ideas that push you forward.",
        startFrame: 390,
        endFrame: 420,
    },
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

    // 1. Use useSpring on the frame index (most impactful)
    const smoothIndex = useSpring(currentIndex, {
        stiffness: 120,   // higher = snappier, less drift
        damping: 30,      // higher = less overshoot/ghosting  
        restDelta: 0.5    // stop when within half a frame
    });

    // Update active text card based on smoothIndex index
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

        // 4. Avoid requestAnimationFrame inside a motion event
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
        <section
            ref={containerRef}
            className="relative h-[600vh] w-full bg-black"
        >
            {/* Sticky Wrapper holding Canvas and Text together */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center">
                <canvas
                    ref={canvasRef}
                    style={{ willChange: 'contents' }}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Fixed Text Container - no longer scrolling upwards */}
                <div className="relative z-10 w-full max-w-7xl mx-auto pointer-events-none h-0">
                    {content.map((item, index) => (
                        <motion.div
                            key={item.title + index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{
                                opacity: activeCard === index ? 1 : 0,
                                y: activeCard === index ? 0 : 30,
                                pointerEvents: activeCard === index ? "auto" : "none"
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeOut"
                            }}
                            className="absolute top-1/2 -translate-y-1/2 left-10 md:left-20 max-w-xl md:max-w-2xl w-full"
                        >
                            <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-xl">
                                {item.title}
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-100 leading-relaxed font-light drop-shadow-lg">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlankSection;
