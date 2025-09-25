// components/about/ValuesSection.tsx
import React from "react";
import { ABOUT_CONTENT } from "@/constants/about/content";
import { SectionHeader } from "./shared/section-header";
import ValueCard from "./shared/value-card";

const ValuesSection = () => {
  return (
    <div className="bg-secondary py-16">
      <SectionHeader
        title={ABOUT_CONTENT.values.title}
        description={ABOUT_CONTENT.values.description}
        className="mb-16"
      />

      <div className="flex flex-wrap justify-center gap-8 px-6">
        {ABOUT_CONTENT.values.items.map((value, index) => (
          <ValueCard key={index} {...value} />
        ))}
      </div>
    </div>
  );
};

export default ValuesSection;
