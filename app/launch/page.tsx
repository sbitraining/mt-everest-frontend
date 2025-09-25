"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Play,
  Lock,
  Eye,
} from "lucide-react";
import { features, stats } from "@/constants/launch/launch";
import { useRouter } from "next/navigation";

const ModernLaunch: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [scrollY, setScrollY] = useState<number>(0);
  const [durations, setDurations] = useState<number[]>([]);
  const router = useRouter();
  const [launchProducts, setLaunchProducts] = useState<
    { id: number; image: string; price: number }[]
  >([]);
  const [loadingLaunch, setLoadingLaunch] = useState(true);

  // Fetch data from the launch model
  useEffect(() => {
    const fetchLaunchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/launch-products/");
        if (!res.ok) throw new Error("Failed to fetch launch products");
        const data = await res.json();
        const mapped = data.map((p: any) => ({
          id: p.id,
          image: `http://localhost:8000${p.image}`,
          price: parseFloat(p.price),
        }));
        setLaunchProducts(mapped);
      } catch (err) {
        console.error("Error fetching launch products:", err);
      } finally {
        setLoadingLaunch(false);
      }
    };

    fetchLaunchProducts();
  }, []);

  // Secure scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (Math.abs(currentScrollY - scrollY) > 5) {
      setScrollY(currentScrollY);
    }
  }, [scrollY]);

  useEffect(() => {
    // Generate random durations only after component mounts on client
    const generated = Array.from({ length: 8 }, () => 3 + Math.random() * 2);
    setDurations(generated);

    const timer = setTimeout(() => setIsVisible(true), 150);

    // Throttled scroll listener for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollListener, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", scrollListener);
    };
  }, [handleScroll]);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSecureNavigation = useCallback((): void => {
    router.push("/Navigation/about");
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fffff6] relative overflow-x-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${
              1 + scrollY * 0.0005
            })`,
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-l from-orange-500/5 to-pink-500/5 rounded-full blur-3xl"
          style={{
            transform: `translateY(${-scrollY * 0.3}px) scale(${
              1 + scrollY * 0.0003
            })`,
          }}
        />
      </div>

      {/* Floating Elements - Hidden on small screens to prevent overflow */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${durations[i] || 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="flex flex-col xl:flex-row items-center justify-center xl:justify-between gap-8 xl:gap-16 min-h-screen">
          {/* Enhanced Content Section */}
          <div
            className={`w-full xl:w-1/2 transition-all duration-1000 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative">
              {/* Security Badge */}
              <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl sm:rounded-2xl mb-6 sm:mb-8 border border-blue-500/20">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#00986e]" />
                <span className="text-xs sm:text-sm font-bold text-[#00986e] tracking-wide">
                  SECURE LAUNCH 2025
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6 sm:mb-8">
                <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Next-Gen
                </span>
                <br />
                <span className="relative">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Collection
                  </span>
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-30"></div>
                </span>
              </h1>

              {/* Enhanced Description */}
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <p className="text-slate-600 text-lg sm:text-xl md:text-2xl leading-relaxed">
                  Experience the future of premium products with our
                  <span className="font-bold text-blue-600">
                    {" "}
                    security-first
                  </span>{" "}
                  approach.
                </p>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
                  Built with enterprise-grade security, modern design, and
                  uncompromising quality.
                </p>
              </div>

              {/* Interactive Features */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-10">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                      activeFeature === index
                        ? "bg-white border-blue-500 shadow-lg scale-105"
                        : "bg-white/50 border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <feature.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${feature.color}`}
                    />
                    <span className="font-semibold text-slate-700 text-sm sm:text-base">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8 sm:mb-10">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex justify-center mb-1 sm:mb-2">
                      <stat.icon className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
                    </div>
                    <div className="text-lg sm:text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={handleSecureNavigation}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl text-white font-bold text-base sm:text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                  aria-label="Explore secure collection"
                >
                  <div className="absolute inset-0 bg-[#00986e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                    <span>Explore Securely</span>
                    <ArrowRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </button>

                <button
                  className="group flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-xl sm:rounded-2xl text-slate-700 font-semibold text-base sm:text-lg border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-slate-200"
                  aria-label="Watch secure demo"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                  <span>Watch Demo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div
            className={`w-full xl:w-1/2 transition-all duration-1000 delay-300 transform ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <div className="relative group max-w-lg mx-auto xl:max-w-none">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border-2 sm:border-4 border-white/80 backdrop-blur-sm">
                {loadingLaunch ? (
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
                    <p className="text-center text-gray-500">
                      Loading product…
                    </p>
                  </div>
                ) : launchProducts.length > 0 ? (
                  <img
                    src={launchProducts[0].image}
                    alt={`Launch Product ${launchProducts[0].id}`}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-2xl sm:rounded-3xl"
                  />
                ) : (
                  <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] flex items-center justify-center">
                    <p className="text-center text-gray-500">
                      No product found
                    </p>
                  </div>
                )}
                {/* Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Enhanced Price Tag - Positioned better on mobile */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border-2 sm:border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-xs font-medium opacity-90">
                    Starting from
                  </div>
                  <div className="text-base sm:text-xl font-black">
                    {loadingLaunch
                      ? "…"
                      : launchProducts.length > 0
                      ? `$${launchProducts[0].price}`
                      : "N/A"}
                  </div>
                  <div className="text-xs opacity-90 hidden sm:block">
                    Secure checkout
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#00986e] backdrop-blur-sm text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl flex items-center gap-1 sm:gap-2 shadow-lg">
                <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-bold">Secure</span>
              </div>

              {/* Floating Elements - Better positioned for mobile */}
              <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full opacity-80 animate-pulse flex items-center justify-center">
                <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="absolute top-1/4 -right-3 sm:-right-6 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full opacity-80 animate-ping"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernLaunch;
