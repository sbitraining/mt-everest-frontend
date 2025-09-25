import { Leaf, Droplets, Award, Users, Shield } from "lucide-react";

// Color theme configurations
export const COLOR_THEMES = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    icon: "text-emerald-600",
    iconBg: "bg-emerald-100",
    title: "text-emerald-900",
    hover: "hover:bg-emerald-100",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "text-blue-600",
    iconBg: "bg-blue-100",
    title: "text-blue-900",
    hover: "hover:bg-blue-100",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    iconBg: "bg-purple-100",
    title: "text-purple-900",
    hover: "hover:bg-purple-100",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    icon: "text-orange-600",
    iconBg: "bg-orange-100",
    title: "text-orange-900",
    hover: "hover:bg-orange-100",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "text-green-600",
    iconBg: "bg-green-100",
    title: "text-green-900",
    hover: "hover:bg-green-100",
  },
} as const;

export type ColorThemeKey = keyof typeof COLOR_THEMES;

export interface Certification {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: ColorThemeKey;
}

export interface AboutContentType {
  hero: {
    badge: string;
    title: string;
    description: string;
    buttonText: string;
  };
  collection: {
    title: string;
    description: string;
  };
  values: {
    title: string;
    description: string;
    items: {
      icon: React.ComponentType<any>;
      title: string;
      description: string;
      color: ColorThemeKey;
    }[];
  };
  journey: {
    title: string;
    paragraphs: string[];
  };
  certifications: Certification[];
}

export const ABOUT_CONTENT: AboutContentType = {
  hero: {
    badge: "Naturally Crafted Since 2018",
    title: "Nature's Finest Treasures",
    description:
      "Discover the power of traditional wellness through our carefully curated collection of hemp products, artisan felt crafts, wild honey, and authentic Himalayan shilajit.",
    buttonText: "Explore Our Story",
  },
  collection: {
    title: "Our Natural Collection",
    description:
      "Each product in our collection represents a connection to nature's wisdom, crafted with care and respect for traditional methods.",
  },

  values: {
    title: "Our Values",
    description:
      "These principles guide everything we do, from sourcing to crafting to delivering nature's finest products to your doorstep.",
    items: [
      {
        icon: Leaf,
        title: "Sustainable Sourcing",
        description:
          "We work directly with farmers and artisans who practice sustainable, eco-friendly methods.",
        color: "emerald",
      },
      {
        icon: Award,
        title: "Quality First",
        description:
          "Every product is carefully selected and tested to meet our high standards for purity and quality.",
        color: "blue",
      },
      {
        icon: Droplets,
        title: "Traditional Methods",
        description:
          "We honor time-tested techniques that preserve the natural integrity of our products.",
        color: "purple",
      },
    ],
  },

  journey: {
    title: "Our Journey",
    paragraphs: [
      "Founded in 2018 by a group of wellness enthusiasts and traditional craft advocates, our company began with a simple mission: to bring authentic, natural products directly from their sources to conscious consumers.",
      "We travel to remote mountain regions, work with indigenous farmers, and partner with skilled artisans who have perfected their crafts over generations. Every product tells a story of tradition, sustainability, and respect for nature.",
      "Today, we're proud to serve thousands of customers worldwide while maintaining our commitment to quality, authenticity, and fair trade practices that benefit both our partners and our planet.",
    ],
  },

  certifications: [
    {
      icon: Award,
      title: "Certified Organic",
      description: "USDA & EU Organic Certification",
      color: "orange",
    },
    {
      icon: Users,
      title: "Fair Trade Certified",
      description: "Supporting local communities",
      color: "green",
    },
    {
      icon: Shield,
      title: "Eco-Friendly",
      description: "Sustainable packaging & practices",
      color: "blue",
    },
  ],
};
