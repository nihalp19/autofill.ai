import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowitWorks';
import UseCases from '../components/UseCases';
import DemoSection from '../components/DemoSection';
import CTASection from '../components/CTASection';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <DemoSection />
      <UseCases />
      <CTASection />
    </>
  );
};

export default LandingPage;