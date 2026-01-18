import { useState, useEffect, useRef, memo } from 'react';
import FallingText from './FallingText';

// Isolated Spotlight component to prevent re-renders of the main FinanceSection
const ComicSpotlight = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const comicsRow1 = ['/comics/comic1.png', '/comics/comic2.png', '/comics/comic3.png'];
  const comicsRow2 = ['/comics/comic2.png', '/comics/comic3.png', '/comics/comic1.png']; // Different order

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setOpacity(1);

      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setOpacity(0);
      }, 400);
    };

    const handleMouseLeave = () => setOpacity(0);

    const container = containerRef.current;
    if (container) {
      window.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (container) container.removeEventListener('mouseleave', handleMouseLeave);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, []);

  const renderGrid = (isSpotlight: boolean) => (
    <div
      className={`absolute inset-0 grid grid-cols-3 grid-rows-2 gap-8 p-12 md:p-20 ${!isSpotlight ? 'opacity-[0.04]' : 'transition-opacity duration-700 ease-out'}`}
      style={isSpotlight ? {
        opacity: opacity * 0.85,
        maskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 70%)`,
      } : {}}
    >
      {/* Row 1 */}
      {comicsRow1.map((src, i) => (
        <div key={`row1-${i}`} className="relative w-full h-[35vh] overflow-hidden">
          <img src={src} className="w-full h-full object-contain" alt="" />
        </div>
      ))}
      {/* Row 2 */}
      {comicsRow2.map((src, i) => (
        <div key={`row2-${i}`} className="relative w-full h-[35vh] overflow-hidden">
          <img src={src} className="w-full h-full object-contain" alt="" />
        </div>
      ))}
    </div>
  );

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
      {renderGrid(false)}
      {renderGrid(true)}
    </div>
  );
};

const MemoizedFallingText = memo(FallingText);

const FinanceSection = () => {
  const phrases = [
    "WhatsApp\u00A0tips",
    "Unverified\u00A0finfluencers",
    "Fake\u00A0screenshots",
    "Pump\u00A0&\u00A0dump",
    "Telegram\u00A0groups",
    "Sharmaji\u00A0ka\u00A0beta's\u00A0advice",
    "Losses\u00A0blamed\u00A0on\u00A0“market”",
    "Relative’s\u00A0stock\u00A0tip",
    "Office\u00A0lunch\u00A0advice",
    "Twitter\u00A0threads",
    "YouTube\u00A0gurus",
    "IPO\u00A0hype",
    "Smallcap\u00A0frenzy",
    "Operator\u00A0rumours",
    "Market\u00A0uncle\u00A0gyaan"
  ];

  const fallingWords = phrases.join(" ");

  return (
    <section
      className="relative w-full min-h-[700px] md:min-h-[900px] bg-white flex flex-col items-center justify-center py-20 overflow-hidden"
      id="trust-gap-section"
    >
      {/* Background Comic Spotlight (Isolated from re-renders) */}
      <ComicSpotlight />


      {/* Falling Text Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none text-black/30 font-medium">
        <MemoizedFallingText
          text={fallingWords}
          trigger="scroll"
          backgroundColor="transparent"
          fontSize="clamp(1.25rem, 3.5vw, 2.5rem)"
          gravity={1.8}
        />
      </div>

      {/* Main Headline Layer */}
      <div className="section-container relative z-40 pointer-events-none select-none mb-12">
        <h2 className="section-heading text-black text-center max-w-4xl mx-auto leading-[1.1] tracking-tight">
          Investing in India is broken by{" "}
          <span className="text-blue-600">trust</span>.
        </h2>
      </div>
    </section>
  );
};

export default FinanceSection;
