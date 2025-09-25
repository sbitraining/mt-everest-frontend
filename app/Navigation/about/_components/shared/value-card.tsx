import React from "react";
import { COLOR_THEMES } from "@/constants/about/content";

interface ValueCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: keyof typeof COLOR_THEMES;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
}) => {
  const theme = COLOR_THEMES[color];

  return (
    <div
      className={`group ${theme.bg} ${theme.border} border-2 rounded-2xl p-8 transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:shadow-xl max-w-sm`}
    >
      <div
        className={`w-16 h-16 ${theme.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:scale-110`}
      >
        <Icon className={`${theme.icon} w-8 h-8`} />
      </div>
      <h3 className={`text-xl font-bold ${theme.title} mb-4 text-center`}>
        {title}
      </h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  );
};

export default ValueCard;
