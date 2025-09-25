"use client";
import { useState, useEffect } from "react";
import Mainsection from "../mainsection/page";
import Bestsellers from "../bestsellers/page";
import ServiceBenefits from "../services/page";
import Trending from "../trending/page";
import Launch from "../launch/page";
import Review from "../review/page";
import CTAFormPage from "../cta/page";
import { AnimatedPageWrapper } from "@/components/shared/animated-page-wrapper";
import Loading from "@/components/ui/loading-component";

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("visitedHome");
    if (visited) {
      // Already visited before
      setShowLoading(false);
    } else {
      // First visit
      sessionStorage.setItem("visitedHome", "true");
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 1500); // show loading for 1.5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoading) {
    return <Loading />;
  }
  return (
    <AnimatedPageWrapper>
      <div className="font-[family-name:var(--font-geist-sans)] bg-[#fffff6] min-h-screen w-full py-2 sm:p-2">
        <Mainsection />
        <Bestsellers />
        <Trending />
        <Launch />
        <ServiceBenefits />
        <Review />
        <CTAFormPage />
      </div>
    </AnimatedPageWrapper>
  );
}
