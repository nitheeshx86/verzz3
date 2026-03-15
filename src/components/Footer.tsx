import React from 'react';
import { Link } from 'react-router-dom';

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
                    <div className="flex flex-col gap-y-6 text-[13px] font-bold uppercase tracking-[0.25em] opacity-90 mb-4">
                        <Link to="/privacy-policy" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Cookies</Link>
                        <Link to="/privacy-policy" className="hover:opacity-100 hover:translate-x-1 transition-all duration-300">Privacy Policy</Link>
                    </div>
                </div>

                {/* Bottom Disclaimer */}
                <div className="border-t border-white/20 pt-16">
                    <p className="text-[11px] md:text-xs leading-relaxed opacity-50 max-w-6xl uppercase tracking-widest text-justify">
                        Disclaimer: Advisory or portfolio management services available through the VERZZ platform are provided solely by SEBI-registered investment advisers, portfolio managers, or other licensed financial professionals listed on the platform. VERZZ itself does not provide investment advice, portfolio management services, or stock recommendations.
VERZZ operates as a discovery, education, and connection platform designed to help users explore verified financial professionals, learn about investing, and request consultations. Any advisory services, investment recommendations, or financial strategies are provided directly by the respective SEBI-registered professionals, who are solely responsible for their advice and services.
VERZZ does not act as a broker, custodian, clearing member, or execution platform for securities transactions. Any investment accounts, trade executions, or financial transactions may occur through third-party regulated institutions chosen by the investor or the respective financial professional.
The presence of any adviser, portfolio manager, or financial professional on the VERZZ platform does not constitute an endorsement, guarantee, or recommendation by VERZZ. Users are encouraged to conduct their own due diligence before engaging with any financial professional.
Investments in securities, mutual funds, derivatives, or other financial instruments are subject to market risks. Past performance is not indicative of future results, and returns are not guaranteed. Investment values may fluctuate, and loss of capital is possible.
The content, educational modules, simulations, and information available on the VERZZ platform are provided for informational and educational purposes only and should not be considered investment, legal, tax, or financial advice. Users should consult with a qualified financial, legal, or tax advisor before making investment decisions.
By using the VERZZ platform, you acknowledge that you are solely responsible for your investment decisions and that VERZZ shall not be liable for any financial losses or damages resulting from actions taken based on information available on the platform.
                    </p>

                    <div className="mt-16 flex justify-between items-center opacity-30 text-[10px] uppercase tracking-[0.6em] font-black">
                        <span>© 2026 VERZZ / GLOBAL</span>
                        <span>Est. 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
