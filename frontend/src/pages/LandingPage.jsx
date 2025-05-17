import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowitWorks';
import UseCases from '../components/UseCases';
import DemoSection from '../components/DemoSection';
import CTASection from '../components/CTASection';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <DemoSection />
      <UseCases />
      <CTASection />
      <Footer />
    </>
  );
};

export default LandingPage;