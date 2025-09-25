import { ReactNode } from "react";

export type BadgeType =
  | "Best Seller"
  | "New"
  | "Popular"
  | "Premium"
  | "Limited"
  | "Trending";

export interface Product {
  id: string | number;
  src: string;
  alt: string;
  name: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviews: number;
  badge: BadgeType;
}
