// components/about/ProductCollectionSection.tsx
import React, { useState } from "react";
import { ABOUT_CONTENT } from "@/constants/about/content";
import { features } from "@/constants/about/about";
import { SectionHeader } from "./shared/section-header";
import ProductCard from "./shared/product-card";

const ProductCollectionSection = () => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  return (
    <div className="bg-secondary py-16">
      <SectionHeader
        title={ABOUT_CONTENT.collection.title}
        description={ABOUT_CONTENT.collection.description}
        className="mb-16"
      />

      <div className="flex flex-col lg:flex-row px-6 md:px-16 gap-12 min-h-[70vh]">
        <div className="lg:w-1/2 space-y-4">
          {features.map((item, idx) => (
            <ProductCard
              key={idx}
              {...item}
              isSelected={selectedIndex === idx}
              onClick={() => setSelectedIndex(idx)}
            />
          ))}
        </div>

        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="w-full h-full max-h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={features[selectedIndex].image}
              alt={features[selectedIndex].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCollectionSection;
