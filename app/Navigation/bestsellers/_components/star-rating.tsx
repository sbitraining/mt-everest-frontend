import React from "react";
import { Star } from "lucide-react";
import { Product } from "@/types/bestsellers/bestseller-nav";

type StarRatingProps = Pick<Product, "rating" | "reviews"> & {
  size?: "sm" | "lg";
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  reviews,
  size = "sm",
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "lg" ? "w-5 h-5" : "w-4 h-4"
          } fill-yellow-400 text-yellow-400`}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <Star
          key={i}
          className={`${
            size === "lg" ? "w-5 h-5" : "w-4 h-4"
          } fill-yellow-400 text-yellow-400`}
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          className={`${size === "lg" ? "w-5 h-5" : "w-4 h-4"} text-gray-300`}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-1 bg-[#fffff6]">
      <div className="flex">{stars}</div>
      <span
        className={`text-gray-600 ${size === "lg" ? "text-base" : "text-sm"}`}
      >
        ({reviews})
      </span>
    </div>
  );
};

export default StarRating;
