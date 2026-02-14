import React from 'react';

const Footer = () => {
    return (
        <footer className="relative w-full bg-[#0055FF] text-white pt-64 md:pt-48 pb-12 overflow-hidden min-h-[70vh] flex flex-col justify-start md:justify-end mb-[-1px]">
            {/* Top Bars - Zebra style */}
            <div className="absolute top-0 left-0 w-full flex flex-col">
                <div className="h-6 w-full bg-[#0055FF]" />
                <div className="h-4 w-full bg-black/10" />
                <div className="h-6 w-full bg-[#0055FF]" />
                <div className="h-4 w-full bg-black/10" />
                <div className="h-6 w-full bg-[#0055FF]" />
                <div className="h-4 w-full bg-black/10" />
                <div className="h-6 w-full bg-[#0055FF]" />
                <div className="h-4 w-full bg-black/10" />
                <div className="h-6 w-full bg-[#0055FF]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24">
                    {/* Left Side: Logo */}
                    <div className="mb-16 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
                        <h2 className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-4">
                            VERZ<span className="-ml-[0.05em]">Z</span>
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-[0.5em] opacity-40 md:ml-2">
                            FORWARD FINANCE
                        </p>
                    </div>

                    {/* Right Side: Links */}
                    <div className="grid grid-cols-2 gap-x-20 gap-y-6 text-[13px] font-bold uppercase tracking-[0.25em] opacity-90 mb-4">
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Legal Policy</a>
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Privacy Policy</a>
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Cookies</a>
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Terms of Use</a>
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Security</a>
                        <a href="#" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Risk Disclosure</a>
                    </div>
                </div>

                {/* Bottom Disclaimer */}
                <div className="border-t border-white/20 pt-16">
                    <p className="text-[11px] md:text-xs leading-relaxed opacity-50 max-w-6xl uppercase tracking-widest text-justify">
                        Disclaimer: Investing in the securities market is subject to market risks. Read all the related documents carefully before investing.
                        The securities quoted are for illustration only and are not recommendatory. Registration granted by SEBI and certification from NISM in no way
                        guarantee performance of the intermediary or provide any assurance of returns to investors. VERZZ is a platform to facilitate the discovery
                        of SEBI-registered professionals and does not provide investment advice itself. Past performance is not indicative of future results.
                        Digital wealth management involves risks and may not be suitable for all investors. Please consult your financial advisor before making
                        any investment decisions. All brand names and logos used on this platform are for identification purposes only.
                    </p>

                    <div className="mt-16 flex justify-between items-center opacity-30 text-[10px] uppercase tracking-[0.6em] font-black">
                        <span>© 2026 VERZZ HQ / GLOBAL</span>
                        <span>Est. 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
