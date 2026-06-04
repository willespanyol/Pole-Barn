import PageLayout from '../components/layout/PageLayout';
import HeroSection from '../components/home/HeroSection';
import ContractorFocusSection from '../components/home/ContractorFocusSection';
import WhatWeDesignSection from '../components/home/WhatWeDesignSection';
import CoreServicesSection from '../components/home/CoreServicesSection';
import ProcessSection from '../components/home/ProcessSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import HomePortfolioSection from '../components/home/HomePortfolioSection';
import PricingPreviewSection from '../components/home/PricingPreviewSection';
import ContractorCtaSection from '../components/home/ContractorCtaSection';
import CtaSection from '../components/home/CtaSection';

export default function Home() {
  return (
    <PageLayout>
      <HeroSection />
      <ContractorFocusSection />
      <WhatWeDesignSection />
      <CoreServicesSection />
      <ProcessSection />
      <PricingPreviewSection />
      <HomePortfolioSection />
      <ContractorCtaSection />
      <WhyChooseSection />
      <CtaSection />
    </PageLayout>
  );
}