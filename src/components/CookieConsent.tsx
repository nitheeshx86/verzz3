import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "./ui/button";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("verzz_cookie_consent");
    if (!consent) {
      // Show consent popup after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }

    // Listen for custom event to open the consent modal manually
    const handleOpenConsent = () => {
      setIsVisible(true);
    };

    window.addEventListener("openCookieConsent", handleOpenConsent);

    return () => {
      window.removeEventListener("openCookieConsent", handleOpenConsent);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem("verzz_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDeny = () => {
    localStorage.setItem("verzz_cookie_consent", "denied");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 z-50 w-[calc(100vw-2rem)] md:w-full max-w-4xl pointer-events-auto"
        >
          <div className="bg-black/60 backdrop-blur-2xl text-white rounded-3xl shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] p-5 md:p-6 relative overflow-hidden border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-8">
            {/* Elegant glowing background effects */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#0055FF]/20 rounded-full blur-[50px] pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
            <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/15 rounded-full blur-[40px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
            
            {/* Glossy top edge highlight */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />

            <div className="relative z-10 flex flex-row items-center gap-4 flex-1">
              <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0055FF]/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Cookie className="w-6 h-6 text-white/90 relative z-10" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-0.5">
                  <h3 className="text-lg font-bold tracking-tight text-white">Privacy & Cookies</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#0055FF]/20 text-[9px] font-bold tracking-widest uppercase text-[#0055FF] border border-[#0055FF]/30 hidden sm:inline-block">VERZZ PLATFORM</span>
                </div>
                <p className="text-[13px] text-white/60 leading-relaxed font-medium max-w-xl">
                  We use strictly necessary cookies to ensure proper functionality. We <strong className="text-white">do not</strong> track you. Cleared after 7 days!
                </p>
              </div>
            </div>

            <div className="relative z-10 flex gap-3 w-full md:w-auto flex-shrink-0">
              <Button 
                onClick={handleAccept} 
                className="flex-1 md:flex-none md:px-6 bg-white text-black hover:bg-[#0055FF] hover:text-white rounded-xl h-11 font-semibold transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,85,255,0.4)] border-none relative overflow-hidden group"
              >
                <span className="relative z-10">Accept Essentials</span>
              </Button>
              <Button 
                onClick={handleDeny} 
                variant="outline"
                className="flex-1 md:flex-none md:px-6 bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white rounded-xl h-11 font-medium transition-all duration-300 backdrop-blur-sm"
              >
                Deny
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
