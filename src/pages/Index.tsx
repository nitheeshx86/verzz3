import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FinanceSection from '@/components/FinanceSection';
import AuraSection from '@/components/AuraSection';
import VerzzSection from '@/components/VerzzSection';
import BlackSection from '@/components/BlackSection';
import BlankSection from '@/components/BlankSection';


const Index = () => {
  return (
    <main className="hide-scrollbar">
      <Navbar />
      <HeroSection />
      <FinanceSection />
      <AuraSection />
      <VerzzSection />
      <BlackSection />
      <BlankSection />
    </main>
  );
};

export default Index;
