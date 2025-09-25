import { BadgeType, Product } from "@/types/trending/trending";

export const products: Product[] = [
  {
    src: "assets/images/wildhoney.jpg",
    alt: "honey",
    name: "Wild Honey",
    originalPrice: 899,
    discountedPrice: 719,
    rating: 4.8,
    reviews: 245,
    badge: "Best Seller",
    id: "",
  },
  {
    src: "assets/images/jit.jpg",
    alt: "Jit",
    name: "Organic Jit",
    originalPrice: 650,
    discountedPrice: 520,
    rating: 4.6,
    reviews: 189,
    badge: "New",
    id: "",
  },
  {
    src: "assets/images/hemp.jpg",
    alt: "hemp",
    name: "hemp Extract",
    originalPrice: 750,
    discountedPrice: 600,
    rating: 4.7,
    reviews: 156,
    badge: "Popular",
    id: "",
  },
  {
    src: "assets/images/honey.jpg",
    alt: "honey",
    name: "Wild Honey",
    originalPrice: 950,
    discountedPrice: 760,
    rating: 4.9,
    reviews: 312,
    badge: "Premium",
    id: "",
  },
  {
    src: "assets/images/red.jpg",
    alt: "Hemp",
    name: "Hemp Sandelwood",
    originalPrice: 800,
    discountedPrice: 640,
    rating: 4.5,
    reviews: 98,
    badge: "Limited",
    id: "",
  },
  {
    src: "assets/images/sila.jpg",
    alt: "Sila Duplicate",
    name: "Pure Sila",
    originalPrice: 700,
    discountedPrice: 560,
    rating: 4.8,
    reviews: 203,
    badge: "Trending",
    id: "",
  },
];

export const getBadgeColor = (badge: BadgeType): string => {
  switch (badge) {
    case "Best Seller":
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    case "New":
      return "bg-gradient-to-r from-green-400 to-blue-500";
    case "Popular":
      return "bg-gradient-to-r from-purple-400 to-pink-500";
    case "Premium":
      return "bg-gradient-to-r from-gray-700 to-gray-900";
    case "Limited":
      return "bg-gradient-to-r from-red-400 to-red-600";
    case "Trending":
      return "bg-gradient-to-r from-indigo-400 to-purple-600";
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-600";
  }
};
