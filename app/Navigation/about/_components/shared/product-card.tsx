import React from "react";

interface ProductCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  tags: string[];
  isSelected: boolean;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  icon,
  description,
  tags,
  isSelected,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`group flex items-start gap-4 border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
      isSelected
        ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/20"
        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
    }`}
  >
    <div
      className={`p-3 rounded-xl transition-all duration-300 ${
        isSelected
          ? "bg-green-600 scale-110"
          : "bg-green-700 group-hover:bg-green-600"
      }`}
    >
      {icon}
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-3 leading-relaxed">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string, index: number) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full border font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ProductCard;
