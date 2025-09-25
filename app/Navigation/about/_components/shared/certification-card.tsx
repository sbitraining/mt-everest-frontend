import React from "react";
import { COLOR_THEMES } from "@/constants/about/content";

interface CertificationCardProps {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: keyof typeof COLOR_THEMES;
}

const CertificationCard: React.FC<CertificationCardProps> = ({
  icon: Icon,
  title,
  description,
  color,
}) => {
  const theme = COLOR_THEMES[color];

  return (
    <div
      className={`flex items-start gap-4 ${theme.bg} ${theme.border} border-2 p-6 rounded-2xl transition-all duration-300 ${theme.hover} cursor-pointer`}
    >
      <div className={`${theme.iconBg} p-3 rounded-xl`}>
        <Icon className={`${theme.icon} w-6 h-6`} />
      </div>
      <div>
        <h3 className={`font-bold ${theme.title} mb-1`}>{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default CertificationCard;
