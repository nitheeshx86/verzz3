import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if scrolling up, hide if scrolling down
            if (currentScrollY < lastScrollY || currentScrollY <= 0) {
                setIsVisible(true);
                // Clear any existing timer to hide it
                if (timeoutId) clearTimeout(timeoutId);

                // If not at the very top, set a timer to hide it after some time
                if (currentScrollY > 50) {
                    timeoutId = setTimeout(() => {
                        setIsVisible(false);
                    }, 3000); // 3 seconds
                }
            } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
                if (timeoutId) clearTimeout(timeoutId);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId) clearTimeout(timeoutId);
        };
    }, [lastScrollY]);

    return (
        <motion.nav
            initial={{ y: -120, opacity: 0 }}
            animate={{
                y: isVisible ? 0 : -120,
                opacity: isVisible ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-4 left-0 right-0 z-[100] px-6 md:px-12 flex justify-center pointer-events-none"
        >
            <div
                className={`
          w-full max-w-[800px] 
          bg-white
          rounded-[16px] md:rounded-[22px]
          transition-all duration-500 ease-in-out
          flex items-center justify-between
          px-6 py-3 md:px-8 md:py-4
          pointer-events-auto
          mix-blend-difference
        `}
            >
                {/* Left Section: Logo */}
                <div className="flex items-center">
                    <a
                        href="/"
                        className="text-black text-xl md:text-2xl font-black tracking-[-0.05em] hover:opacity-60 transition-all duration-300"
                    >
                        VERZ<span className="-ml-[0.05em]">Z</span>
                    </a>
                </div>

                {/* Right Section: Navigation Links */}
                <div className="hidden md:flex items-center space-x-10">
                    <a
                        href="#story"
                        className="text-black text-[11px] md:text-[12px] font-medium tracking-widest uppercase hover:text-[#4A6FFF] transition-all duration-300"
                    >
                        Our Story
                    </a>
                    <a
                        href="#sparkles-section"
                        className="text-black text-[11px] md:text-[12px] font-medium tracking-widest uppercase hover:text-[#4A6FFF] transition-all duration-300"
                    >
                        Build with us
                    </a>
                    <a
                        href="#sparkles-section"
                        className="px-6 py-2.5 bg-black text-white rounded-[10px] text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] hover:scale-[1.03] active:scale-95 transition-all duration-300 min-w-[140px] text-center shadow-xl"
                    >
                        Join Waitlist
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center">
                    <button className="text-black p-2 focus:outline-none">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
