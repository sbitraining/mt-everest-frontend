import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className = "",
}) => (
  <div className={`text-center ${className}`}>
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
      {title}
    </h2>
    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
      {description}
    </p>
  </div>
);
