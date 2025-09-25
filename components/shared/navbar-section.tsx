"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ShoppingBag, User, Menu, X } from "lucide-react";
import { navigationItems } from "@/constants/navbar/navbar";
import { useCart } from "@/app/bestsellers/_components/cart-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-notification";
import { useAuth } from "./auth-context";

const Navbar: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { clearCart, fetchCartItems, getCartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const { showToast } = useToast();

  // ✅ from auth context
  const { isLoggedIn, firstName, lastName, logout, loading } = useAuth();
  const displayName = `${firstName} ${lastName}`.trim();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ NEW: Scroll state management for tge navar sticking
  const [isSticky, setIsSticky] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const SECTIONS_TO_SHOW = 4; // Number of sections (adjust as needed: 3-5)
  const SECTION_HEIGHT = 800; // Approximate height per section (adjust based on your layout)
  const SCROLL_THRESHOLD = SECTIONS_TO_SHOW * SECTION_HEIGHT;

  //This is stich the navbar for 5 seconds
  // ✅ Scroll handler for sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsSticky(true);
      }
      // Hide navbar when scrolling down past the threshold
      else if (
        currentScrollY > SCROLL_THRESHOLD &&
        currentScrollY > lastScrollY
      ) {
        setIsSticky(false);
      }
      // Keep navbar visible within the first few sections
      else if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsSticky(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, [lastScrollY]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout via context
  const handleLogout = () => {
    // clear backend session / jwt
    logout();

    // ✅ clear cart state immediately
    clearCart();

    // close dropdown & show toast
    setIsDropdownOpen(false);
    showToast("Logout successfully!", "success");

    // redirect to login
    router.push("/authentication/login");
  };

  // ✅ Refresh cart whenever login status becomes true
  useEffect(() => {
    if (isLoggedIn) {
      // silently fetch cart items for this loggedgit-in user
      fetchCartItems();
    }
  }, [isLoggedIn]);

  const isActivePage = (href: string) => pathname === href;
  const isDropdownActive = () =>
    [
      "/products/category-1",
      "/products/category-2",
      "/products/category-3",
      "/products/category-4",
    ].includes(pathname);

  // 👉 handle search submit
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Option 1: Redirect to a search results page with query param
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);

    // Option 2 (optional): Directly fetch and show dropdown results here
    // const res = await fetch(`http://127.0.0.1:8000/api/products/search/?q=${searchQuery.trim()}`);
    // const products = await res.json();
    // console.log(products);
  };

  return (
    <nav
      className={`bg-primary shadow-sm fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isSticky ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">MT</span>
              </div>
              <span className="text-xl font-bold text-white">Mt Everest.</span>
            </div>
          </div>

          {/*Mobile Navigation Menu */}
          <div
            className={`${
              isMobileMenuOpen ? "block" : "hidden"
            } md:block absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-primary md:bg-transparent border-t md:border-t-0 border-gray-200 z-50 text-white/90 hover:text-white
`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 px-4 py-4 md:px-0 md:py-0">
              {/* Search bar for mobile */}
              <form onSubmit={handleSearch} className="relative mt-3 md:hidden">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm text-black"
                />
              </form>
              {navigationItems.map((item) => (
                <div key={item.label} className="relative mb-2 md:mb-0">
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProductsOpen(!isProductsOpen)}
                        className={`flex items-center w-full md:w-auto text-left px-4 py-2 text-sm font-semibold transition-all duration-300 relative group ${
                          isDropdownActive()
                            ? "text-white"
                            : "text-white/90 hover:text-white"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                            isProductsOpen ? "rotate-180" : ""
                          }`}
                        />
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                            isDropdownActive()
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        ></span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block px-4 py-2 text-sm font-medium transition-all duration-300 relative group ${
                        isActivePage(item.href)
                          ? "text-white"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                          isActivePage(item.href)
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  )}
                  {/* Dropdown for Products */}
                  {item.hasDropdown && isProductsOpen && (
                    <div className="md:absolute relative left-0 mt-2 w-full md:w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden">
                      <div className="py-2">
                        <a
                          href="/products/category-1"
                          className={`block px-4 py-3 text-sm ${
                            pathname === "/products/category-1"
                              ? "text-primary bg-gradient-to-r from-green-50 to-emerald-50 font-medium border-r-4 border-[#00986e]"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }`}
                        >
                          Shilajit
                        </a>
                        <a
                          href="/products/category-2"
                          className={`block px-4 py-3 text-sm ${
                            pathname === "/products/category-2"
                              ? "text-primary bg-gradient-to-r from-green-50 to-emerald-50 font-medium border-r-4 border-[#00986e]"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }`}
                        >
                          Hamp items
                        </a>
                        <a
                          href="/products/category-3"
                          className={`block px-4 py-3 text-sm ${
                            pathname === "/products/category-3"
                              ? "text-primary bg-gradient-to-r from-green-50 to-emerald-50 font-medium border-r-4 border-primary"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }`}
                        >
                          Felt items
                        </a>
                        <a
                          href="/products/category-4"
                          className={`block px-4 py-3 text-sm ${
                            pathname === "/products/category-4"
                              ? "text-primary bg-gradient-to-r from-green-50 to-emerald-50 font-medium border-r-4 border-primary"
                              : "text-gray-700 hover:text-primary hover:bg-gray-50"
                          }`}
                        >
                          Wild honey
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <form onSubmit={handleSearch} className="relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-white focus:border-white text-sm"
              />
            </form>
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 text-white hover:text-black relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* ✅ User / Login Dropdown */}
            <div className="relative flex items-center" ref={menuRef}>
              {loading ? (
                <span className="text-white text-sm animate-pulse px-2">
                  Loading...
                </span>
              ) : !isLoggedIn ? (
                <button
                  onClick={() => router.push("/authentication/login")}
                  className="p-2 text-white hover:text-black transition-colors"
                  aria-label="Login"
                >
                  <User className="h-5 w-5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="p-2 text-white hover:text-black flex items-center gap-1 transition-colors"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">
                      {displayName || "User"}
                    </span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                      <div className="px-4 py-2 text-gray-800 font-semibold border-b text-sm">
                        {displayName || "User"}
                      </div>
                      <button
                        onClick={() => {
                          router.push("/profile");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        View Details
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-black"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
