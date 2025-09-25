import React, { useState, useMemo, useRef } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Product } from "@/types/bestsellers/bestseller-nav";
import ProductCard from "./product-card";

type ProductGridProps = {
  products: Product[];
  onViewDetails: (product: Product) => void;
};

const ITEMS_PER_PAGE = 8;

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onViewDetails,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All Products",
    "Hemp Item",
    "Felt Item",
    "Shilajit",
    "Wildhoney",
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;
    // Filter by category
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }
    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "popular":
          return b.reviews - a.reviews;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

    return sorted;
  }, [products, selectedCategory, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / ITEMS_PER_PAGE
  );
  const paginatedProducts = filteredAndSortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setTimeout(() => {
      gridRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center", // center of screen
      });
    }, 100); // slight delay ensures layout is updated
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6] space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>

        <div className="flex flex-wrap gap-4 items-center">
          {/* Category Buttons */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Categories:</span>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1); // reset page
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedCategory === category
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1); // reset page
              }}
              className="appearance-none bg-white border text-black border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-gray-900"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedCategory !== "All Products" && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <span className="text-sm">{selectedCategory}</span>
            <button
              onClick={() => setSelectedCategory("All Products")}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => {
              setSelectedCategory("All Products");
              setSortBy("newest");
              setCurrentPage(1);
            }}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear
          </button>
        </div>
      )}

      {/* Product Count */}
      <div className="text-sm text-gray-600">
        Showing {paginatedProducts.length} of {filteredAndSortedProducts.length}{" "}
        products
      </div>

      {/* Product Cards */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === i + 1
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("All Products");
              setSortBy("newest");
              setCurrentPage(1);
            }}
            className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
