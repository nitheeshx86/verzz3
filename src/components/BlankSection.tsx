import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react';

const FRAME_COUNT = 161;
const IMAGES = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNumber = (i + 1).toString().padStart(3, '0');
    return `/phoneui/ezgif-frame-${frameNumber}.jpg`;
});

const content = [
    {
        title: "Learn",
        description: "Build the foundations that others skip. Understand the why behind every concept, not just the steps to finish it.",
    },
    {
        title: "Discover",
        description: "Explore paths you didn’t know existed. Find tools, ideas, and opportunities beyond the syllabus.",
    },
    {
        title: "Connect",
        description: "Connect with people, mentors, and ideas that push you forward.",
    },
];

const BlankSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [activeCard, setActiveCard] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Update active text card based on scroll progress
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardLength = content.length;
        // Adjust breakpoints to be more responsive to the center of each section
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - (breakpoint + 1 / (cardLength * 2))); // midpoint of each segment
                const currentMinDistance = Math.abs(latest - (cardsBreakpoints[acc] + 1 / (cardLength * 2)));
                if (distance < currentMinDistance) {
                    return index;
                }
                return acc;
            },
            0,
        );
        setActiveCard(closestBreakpointIndex);
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

    const render = (index: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = imagesRef.current[index];

        if (canvas && ctx && img) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = img.width * (canvas.height / img.height);
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = 0;
            } else {
                drawWidth = canvas.width;
                drawHeight = img.height * (canvas.width / img.width);
                offsetX = 0;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    useEffect(() => {
        if (!imagesLoaded) return;
        render(0);
        const unsubscribe = currentIndex.on("change", (latest) => {
            const index = Math.min(Math.max(Math.floor(latest), 0), FRAME_COUNT - 1);
            requestAnimationFrame(() => render(index));
        });

        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                render(currentIndex.get());
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [imagesLoaded, currentIndex]);

    return (
        <section
            ref={containerRef}
            className="relative h-[400vh] w-full bg-black"
        >
            {/* Sticky Background Canvas */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover opacity-50 contrast-125 saturate-50"
                />
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
            </div>

            {/* Scrolling Text Content Overlay */}
            <div className="relative -mt-[100vh] z-10 pointer-events-none">
                <div className="max-w-7xl mx-auto px-10 md:px-20">
                    {content.map((item, index) => (
                        <div
                            key={item.title + index}
                            className="h-screen flex flex-col justify-center"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{
                                    opacity: activeCard === index ? 1 : 0.2,
                                    y: activeCard === index ? 0 : 30,
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut"
                                }}
                                className="max-w-xl md:max-w-2xl"
                            >
                                <h2 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
                                    {item.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </motion.div>
                        </div>
                    ))}
                    {/* Buffer space at the bottom */}
                    <div className="h-[50vh]" />
                </div>
            </div>
        </section>
    );
};

export default BlankSection;
