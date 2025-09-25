import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { ABOUT_CONTENT } from "@/constants/about/content";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-[90vh] bg-cover bg-center flex flex-col items-center justify-center text-center px-4 bg-secondary"
      style={{ backgroundImage: "url('/assets/images/about.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      <div className="relative z-10 text-white space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          {ABOUT_CONTENT.hero.badge}
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          {ABOUT_CONTENT.hero.title}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed text-gray-200">
          {ABOUT_CONTENT.hero.description}
        </p>
        <button className="group mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black rounded-full font-semibold shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:-translate-y-1">
          <span className="flex items-center gap-2">
            {ABOUT_CONTENT.hero.buttonText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
