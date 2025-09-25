"use client";
import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  ArrowUpRight,
  Star,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { getBadgeColor } from "@/constants/trending/trending";
import { Product } from "@/types/trending/trending";
import { useCart } from "../bestsellers/_components/cart-context";
import CheckoutModal from "../bestsellers/_components/checkout-model";
import CartSidebar from "../bestsellers/_components/cart-sidebar";
import { useToast } from "@/components/ui/toast-notification";

// Extended Product interface to match cart requirements
interface CartProduct {
  id: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Trending: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const { showToast } = useToast();

  // Cart functionality
  const { addToCart, setIsCartOpen, getCartCount } = useCart();

  const currentItems = products.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const handleNext = (): void => {
    if (currentPage < totalPages - 1 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handlePrev = (): void => {
    if (currentPage > 0 && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const toggleFavorite = (index: string): void => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(index)) {
      newFavorites.delete(index);
    } else {
      newFavorites.add(index);
    }
    setFavorites(newFavorites);
  };

  {
    /* This Will handle At to card from the backend */
  }
  const handleAddToCart = async (product: Product, index: number) => {
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
          price: product.discountedPrice,
          quantity: 1,
          image: product.src,
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
      // ✅ use backend CartItem ID so context merges instead of duplicating
      addToCart({
        id: data.id,
        name: product.name,
        price: product.discountedPrice,
        image: product.src,
        quantity: 1,
      });

      showToast(`Added ${product.name} to cart`, "success");
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
  };

  {
    /* This will fetch the data from the trending products models */
  }
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/trending-products/");
        if (!res.ok) throw new Error("Failed to fetch trending products");
        const data = await res.json();

        // Map backend fields to your Product type
        const mapped: Product[] = data.map((p: any) => ({
          id: p.id,
          src: `http://localhost:8000${p.src}`,
          alt: p.alt,
          name: p.name,
          originalPrice: parseFloat(p.original_price),
          discountedPrice: parseFloat(p.discounted_price),
          rating: p.rating,
          reviews: p.reviews,
          badge: p.badge,
        }));
        setProducts(mapped);
      } catch (err) {
        console.error("Error fetching trending products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const handleCheckout = (): void => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <div
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6]`}
      >
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Header */}
        <div className="relative mb-12 text-center">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent text-sm font-semibold tracking-wide uppercase">
              Discover Amazing Products
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-900 to-black bg-clip-text text-transparent mb-4 leading-tight">
            Trending Now
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover the most popular items of this year, carefully curated for
            our valued customers with exclusive offers.
          </p>
        </div>

        {/* Navigation and Page Indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "bg-gradient-to-r from-green-500 to-blue-500 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3 items-center">
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

            <button
              onClick={handlePrev}
              disabled={currentPage === 0 || isAnimating}
              className={`group relative overflow-hidden border-2 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                currentPage === 0
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-800 bg-white text-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages - 1 || isAnimating}
              className={`group relative overflow-hidden border-2 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                currentPage === totalPages - 1
                  ? "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                  : "border-gray-800 bg-white text-gray-800 hover:bg-gray-800 hover:text-white hover:shadow-lg hover:scale-105"
              }`}
            >
              <span className="font-medium">Next</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Trending Items */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ${
            isAnimating
              ? "opacity-0 transform translate-y-8"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          {currentItems.map((item: Product, index: number) => (
            <div
              key={`${currentPage}-${index}`}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 border border-gray-100"
            >
              {/* Badge */}
              <div
                className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(
                  item.badge
                )} shadow-lg`}
              >
                {item.badge}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(`${currentPage}-${index}`)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-110"
              >
                {/* <Heart
                  className={`w-5 h-5 transition-all duration-300 ${
                    favorites.has(`${currentPage}-${index}`)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                /> */}
              </button>

              {/* Product Image */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-56 h-56 mx-auto mt-8 mb-6 overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-full"></div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({item.reviews} reviews)
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.name}
                </h3>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ${item.discountedPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${item.originalPrice}
                  </span>
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    {Math.round(
                      (1 - item.discountedPrice / item.originalPrice) * 100
                    )}
                    % OFF
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleAddToCart(item, index)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                  <button className="p-3 border-2 border-gray-200 hover:border-gray-400 rounded-xl transition-all duration-300 hover:scale-105">
                    <ArrowUpRight className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default Trending;
