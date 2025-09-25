import React, { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types/bestsellers/bestseller-nav";
import StarRating from "./star-rating";
import { useCart } from "@/app/bestsellers/_components/cart-context";
import { useToast } from "@/components/ui/toast-notification";

type ProductCardProps = {
  product: Product;
  onViewDetails: (product: Product) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  {
    /* This will handle add to cart*/
  }
  // ✅ Updated handleAddToCart to merge with backend CartItem ID
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    if (!token) {
      showToast("Please login first", "error");
      window.location.href = "/authentication/login";
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        }),
      });

      if (res.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("jwtToken");
        window.location.href = "/authentication/login";
        return;
      }

      if (!res.ok) {
        showToast("Failed to add to cart", "error");
        return;
      }

      const data = await res.json();
      // ✅ Use backend CartItem ID for merging in context
      addToCart({
        id: data.id, // backend CartItem id
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      showToast(`Added ${product.name} to cart`, "success");
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
  };

  const handleWishlist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger onViewDetails if the click is not on a button
    const target = e.target as HTMLElement;
    if (!target.closest("button")) {
      onViewDetails(product);
    }
  };

  return (
    <div
      className="bg-[#fffff6] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        {/*}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        */}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
          {product.name}
        </h3>
        <StarRating rating={product.rating} reviews={product.reviews} />

        <div className="flex items-center gap-2 mt-3 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          onMouseDown={(e) => e.stopPropagation()}
          disabled={isAdded}
          className={`w-full py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium ${
            isAdded
              ? "bg-green-600 text-white cursor-not-allowed"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
