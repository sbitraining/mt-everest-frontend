"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  ShoppingBag,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "./_components/cart-context";
import CheckoutModal from "./_components/checkout-model";
import CartSidebar from "./_components/cart-sidebar";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-notification";

// Product Type
interface Product {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
}

// Props - Removed all props for Next.js page component compatibility
const BestSellers: React.FC = () => {
  // Set default values directly since this is now a page component
  const products: Product[] = [];
  const title = "Best Sellers";
  const showViewAllButton = true;
  const onViewAll = undefined;
  const onToggleFavorite = undefined;
  const className = "";
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [itemsPerView, setItemsPerView] = useState<number>(3);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { showToast } = useToast();

  const { addToCart, setIsCartOpen, getCartCount } = useCart();

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1280) setItemsPerView(4);
      else if (window.innerWidth >= 1024) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(
    0,
    (fetchedProducts.length > 0 ? fetchedProducts : products).length -
      itemsPerView
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleToggleFavorite = (productId: string | number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    // onToggleFavorite is now always undefined for page component
  };

  {
    /* Login JWT login check for to add to cart  */
  }
  // ✅ Updated handleAddToCart to work with backend id merging
  const handleAddToCart = async (product: Product) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    if (!token) {
      showToast("Please login first", "error");
      router.push("/authentication/login");
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
          quantity: 1,
          image: product.image,
        }),
      });

      if (res.status === 401) {
        showToast("Session expired. Please login again.", "error");
        localStorage.removeItem("jwtToken");
        router.push("/authentication/login");
        return;
      }

      if (!res.ok) {
        showToast("Failed to add to cart", "error");
        return;
      }

      const data = await res.json();
      // ✅ use backend CartItem ID here so context merges correctly
      addToCart({
        id: data.id, // backend cart item id (stable after backend fix)
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      showToast(`Added ${product.name} to cart`, "success");
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
  };

  {
    /*Fetching the data from the backend in the bestproduct sellers*/
  }
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/bestproducts/");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();

        const mapped: Product[] = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: parseFloat(p.price),
          originalPrice: p.original_price
            ? parseFloat(p.original_price)
            : undefined,
          image: `http://localhost:8000${p.image}`,
          rating: p.rating,
          reviewCount: p.review_count,
        }));

        setFetchedProducts(mapped);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAll = () => {
    router.push("Navigation/bestsellers");
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;
  const formatRating = (rating: number): string => rating.toFixed(1);

  return (
    <>
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className} bg-[#fffff6]`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {title}
          </h2>
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 bg-white border border-gray-300 hover:border-gray-400 rounded-full transition-all duration-300 hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* View All */}
            {showViewAllButton && (
              <button
                onClick={handleViewAll}
                className="flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md group"
              >
                View All Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            )}
          </div>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden" ref={carouselRef}>
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {(fetchedProducts.length > 0 ? fetchedProducts : products).map(
              (product) => (
                <div
                  key={product.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                    <div className="relative">
                      <div
                        className={`${"bg-gray-100"} rounded-full mx-auto mt-6 mb-4 w-48 h-48 flex items-center justify-center relative overflow-hidden`}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-full"
                        />

                        <button
                          onClick={() => handleToggleFavorite(product.id)}
                          className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 border-2 border-gray-100"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${
                              favorites.has(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="px-6 pb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-bold text-red-500">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-gray-700">
                            {formatRating(product.rating)}
                          </span>
                          <span className="text-xs text-gray-500">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-md hover:bg-gray-50"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                          <ShoppingBag className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-gray-900"
                    : "w-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Side Panels */}
      <CartSidebar onCheckout={handleCheckout} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </>
  );
};

export default BestSellers;
