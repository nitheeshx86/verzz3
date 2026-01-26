import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FinanceSection from '@/components/FinanceSection';
import AuraSection from '@/components/AuraSection';
import VerzzSection from '@/components/VerzzSection';
import BlackSection from '@/components/BlackSection';
import BlankSection from '@/components/BlankSection';
import SparklesSection from '@/components/SparklesSection';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';


const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className={`hide-scrollbar relative flex flex-col transition-opacity duration-1000 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <div className="relative z-10 bg-black shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
          <Navbar />
          <HeroSection />
          <FinanceSection />
          <AuraSection />
          <VerzzSection />
          <BlackSection />
          <BlankSection />
          <SparklesSection />
        </div>

        {/* Footer is revealed from beneath on desktop, normal scroll on mobile */}
        <div className="relative md:sticky md:bottom-0 left-0 w-full z-0 md:-z-10 h-auto">
          <Footer />
        </div>
      </main>
    </>
  );
};

export default Index;
