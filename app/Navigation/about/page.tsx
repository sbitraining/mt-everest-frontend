"use client";

import SupportCard from "../faqs/_components/contact-section";
import HeroSection from "./_components/hero-section";
import ProductCollectionSection from "./_components/product-collection";
import ValuesSection from "./_components/value-section";
import JourneySection from "./_components/journey-section";
import { AnimatedPageWrapper } from "@/components/shared/animated-page-wrapper";

const AboutPage = () => {
  return (
    <>
      <AnimatedPageWrapper>
        <HeroSection />
        <ProductCollectionSection />
        <ValuesSection />
        <JourneySection />
        <SupportCard />
      </AnimatedPageWrapper>
    </>
  );
};

export default AboutPage;
