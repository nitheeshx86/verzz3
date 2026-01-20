import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FinanceSection from '@/components/FinanceSection';
import AuraSection from '@/components/AuraSection';
import VerzzSection from '@/components/VerzzSection';
import BlackSection from '@/components/BlackSection';
import LearnSwipSection from '@/components/LearnSwipSection';
import LearnSection from '@/components/LearnSection';
//import DailyQuizzesSection from '@/components/DailyQuizzesSection';
//import LevelProgressSection from '@/components/LevelProgressSection';


const Index = () => {
  return (
    <main className="hide-scrollbar">
      <Navbar />
      <HeroSection />
      <FinanceSection />
      <AuraSection />
      <VerzzSection />
      <BlackSection />
      <LearnSwipSection />
      <LearnSection />
      {/* <DailyQuizzesSection />
      <LevelProgressSection /> */}
    </main>
  );
};

export default Index;
