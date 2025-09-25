"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { ABOUT_CONTENT } from "@/constants/about/content";
import CertificationCard from "./shared/certification-card";

const JourneySection = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-secondary">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Journey Title */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {ABOUT_CONTENT.journey.title}
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            {ABOUT_CONTENT.journey.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center space-x-2 group cursor-pointer">
          <span className="text-green-700 font-semibold text-lg">
            Learn More
          </span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 text-green-700" />
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Our Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ABOUT_CONTENT.certifications.map((cert, index) => (
              <CertificationCard
                key={index}
                icon={cert.icon}
                title={cert.title}
                description={cert.description}
                color={cert.color}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
