import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform } from 'framer-motion';

const FRAME_COUNT = 161;
const IMAGES = Array.from({ length: FRAME_COUNT }, (_, i) => {
    const frameNumber = (i + 1).toString().padStart(3, '0');
    return `/phoneui/ezgif-frame-${frameNumber}.jpg`;
});

const BlankSection = () => {
    const containerRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const imagesRef = useRef<HTMLImageElement[]>([]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises = IMAGES.map((src) => {
                return new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => {
                        loadedImages.push(img);
                        resolve();
                    };
                    img.onerror = reject;
                });
            });

            await Promise.all(promises);
            // Sort to ensure order because Promise.all doesn't guarantee order of push
            loadedImages.sort((a, b) => {
                 const getNum = (str: string) => parseInt(str.match(/frame-(\d+)/)?.[1] || "0");
                 return getNum(a.src) - getNum(b.src);
            });
            
            // Actually, pushing to a local array in onload callback might be unordered. 
            // Better to assign by index.
            const orderedImages = new Array(FRAME_COUNT);
            const betterPromises = IMAGES.map((src, index) => {
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
            
            await Promise.all(betterPromises);
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
            // Set smoothing to high quality
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

             // Calculate cover scaling
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

        // Render initial frame
        render(0);

        const unsubscribe = currentIndex.on("change", (latest) => {
            const index = Math.min(Math.max(Math.floor(latest), 0), FRAME_COUNT - 1);
            requestAnimationFrame(() => render(index));
        });

        const handleResize = () => {
             if (canvasRef.current) {
                // Handle High DPI screens
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Force re-render immediately
                render(currentIndex.get());
             }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Init size

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [imagesLoaded, currentIndex]);

    return (
        <section
            ref={containerRef}
            className="relative h-[500vh] w-full bg-[#0d0d0d]"
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                
                {/* Optional overlay content if the user wants text over it */}
                {/* <div className="relative z-10 flex h-full items-center justify-center pointer-events-none">
                     <h2 className="text-white text-4xl font-light tracking-widest uppercase mix-blend-difference">
                        Phone UI
                    </h2>
                </div> */}
            </div>
        </section>
    );
};

export default BlankSection;
