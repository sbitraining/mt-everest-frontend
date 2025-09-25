import { Product, Service } from "@/types/services/services";
import { Leaf, Mountain, Droplets, Shield, Truck, Star } from "lucide-react";
export const services: Service[] = [
  {
    id: "quality",
    title: "Premium Quality",
    description:
      "We source only the finest natural products, ensuring authenticity and purity in every item.",
    icon: <Shield className="w-6 h-6" />,
  },
  {
    id: "shipping",
    title: "Fast Shipping",
    description:
      "Quick and secure delivery to your doorstep with tracking information provided.",
    icon: <Truck className="w-6 h-6" />,
  },
  {
    id: "support",
    title: "Expert Support",
    description:
      "Our knowledgeable team is here to help you choose the right products for your needs.",
    icon: <Star className="w-6 h-6" />,
  },
];

export const products: Product[] = [
  {
    id: "shilajit",
    name: "Pure Shilajit",
    description:
      "Authentic Himalayan Shilajit sourced from high-altitude regions, rich in minerals and fulvic acid for enhanced vitality and wellness.",
    icon: <Mountain className="w-8 h-8" />,
    benefits: [
      "Boosts energy & stamina",
      "Rich in minerals",
      "Supports immune system",
      "Anti-aging properties",
    ],
  },
  {
    id: "hempfelt",
    name: "Hemp/Felt Products",
    description:
      "Premium hemp-derived products including oils, seeds, and wellness supplements for natural health support.",
    icon: <Leaf className="w-8 h-8" />,
    benefits: [
      "Natural wellness support",
      "Rich in omega fatty acids",
      "Stress relief",
      "Sleep improvement",
    ],
  },
  {
    id: "honey",
    name: "Wild Honey",
    description:
      "Raw, unprocessed wild honey harvested from pristine natural environments, preserving all natural enzymes and nutrients.",
    icon: <Droplets className="w-8 h-8" />,
    benefits: [
      "Raw & unprocessed",
      "Natural antioxidants",
      "Antibacterial properties",
      "Pure & organic",
    ],
  },
];
