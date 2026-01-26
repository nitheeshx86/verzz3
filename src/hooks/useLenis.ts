import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { setupAnchors } from "../utils/anchors";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // @ts-ignore - smoothTouch might not be in the typings of the deprecated package
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // More natural exponential easing
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        lenisRef.current = lenis;

        // Connect Lenis to ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update);

        // Synchronize GSAP ticker with Lenis
        // Important: Use lenis.raf(time) directly in the ticker
        const gsapTicker = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(gsapTicker);
        gsap.ticker.lagSmoothing(0);

        // Setup anchors
        const cleanupAnchors = setupAnchors(lenisRef);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(gsapTicker);
            cleanupAnchors();
        };
    }, []);

    return lenisRef;
}
