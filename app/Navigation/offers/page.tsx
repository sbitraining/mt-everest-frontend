"use client";
import React, { useState, useEffect } from "react";
import {
  Ticket,
  TimerReset,
  Heart,
  ShoppingBag,
  Star,
  Filter,
  Search,
  ArrowRight,
  Zap,
  TrendingUp,
  Gift,
} from "lucide-react";

// Type definitions
interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

const Offer: React.FC = () => {
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories: string[] = [
    "All",
    "Silajit",
    "Hemp Items",
    "Footwear",
    "Wildhoney",
    "Home Decor",
    "Accessories",
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Latest Bag",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      category: "Accessories",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Premium Bag",
      price: 899,
      originalPrice: 1499,
      discount: 40,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
      category: "Accessories",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Decorative Vase",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      category: "Home Decor",
      rating: 4.7,
      reviews: 67,
    },
    {
      id: 4,
      name: "Premium Case",
      price: 899,
      originalPrice: 1399,
      discount: 36,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
      category: "Accessories",
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 5,
      name: "Premium Hat",
      price: 899,
      originalPrice: 1099,
      discount: 18,
      image:
        "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop",
      category: "Accessories",
      rating: 4.8,
      reviews: 201,
    },
    {
      id: 6,
      name: "Premium Carpet",
      price: 899,
      originalPrice: 1799,
      discount: 50,
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      category: "Home Decor",
      rating: 4.9,
      reviews: 94,
    },
    {
      id: 7,
      name: "Yoga Mat",
      price: 899,
      originalPrice: 1299,
      discount: 31,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
      category: "Home Decor",
      rating: 4.7,
      reviews: 178,
    },
    {
      id: 8,
      name: "Premium Woolen",
      price: 899,
      originalPrice: 1399,
      discount: 36,
      image:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=300&fit=crop",
      category: "Accessories",
      rating: 4.8,
      reviews: 143,
    },
    {
      id: 9,
      name: "Wild Honey",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      image:
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=300&fit=crop",
      category: "Wildhoney",
      rating: 4.9,
      reviews: 267,
    },
  ];

  // Timer countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleDropdown = (): void => {
    setDropDown(!dropDown);
  };

  const toggleFavorite = (productId: number): void => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleCategorySelect = (category: string): void => {
    setSelectedCategory(category);
    setDropDown(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 px-8 py-12">
          <div className="flex-1 text-white">
            <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl mb-6 w-fit shadow-lg">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-semibold">Flash Sale Live Now</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              Unbeatable Deals
              <br />
              Up to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">
                70% Off
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Discover incredible offers on top-rated products. Limited time
              deals you don't want to miss!
            </p>

            <div className="flex flex-wrap gap-4 md:gap-6 mb-8 items-center">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <TimerReset className="w-5 h-5 text-red-400" />
                <span className="font-mono text-base md:text-lg">
                  {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-sm md:text-base">4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-sm md:text-base">1000+ Customers</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Shop All Deals
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl border border-white/20 transition-all duration-300">
                View Categories
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=500&fit=crop"
                alt="Featured Product"
                className="relative h-80 w-64 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-2xl text-lg font-bold shadow-lg">
                70% Off
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg">
                <Gift className="w-4 h-4 inline mr-1" />
                Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Deals Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Featured <span className="text-teal-600">Deals</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Don't miss out on these limited-time offers. Prices this low won't
          last long!
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white rounded-2xl p-6 shadow-lg">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300"
          >
            <Filter className="w-5 h-5" />
            {selectedCategory}
          </button>

          {dropDown && (
            <div className="absolute top-14 right-0 w-48 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden">
              <ul>
                {categories.map((category, index) => (
                  <li
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    className="px-4 py-3 hover:bg-gradient-to-r hover:from-teal-50 hover:to-emerald-50 hover:text-teal-800 transition-all duration-200 cursor-pointer text-sm font-medium border-b border-gray-100 last:border-b-0"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <div className="relative mb-4">
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                aria-label={`${
                  favorites.has(product.id) ? "Remove from" : "Add to"
                } favorites`}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    favorites.has(product.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                />
              </button>
              <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                -{product.discount}%
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-lg text-gray-800">
                {product.name}
              </h3>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-800">
                  ${product.price}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-medium px-4 py-2 rounded-xl transition-all duration-300">
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button className="bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-xl text-gray-500 mb-2">No products found</p>
          <p className="text-gray-400">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Offer;
