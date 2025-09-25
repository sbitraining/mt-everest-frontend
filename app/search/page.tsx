"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";
import ProductModal from "../Navigation/bestsellers/_components/product-modal";
import type { Product } from "@/types/bestsellers/bestseller-nav";
import CartSidebar from "../bestsellers/_components/cart-sidebar";
import CheckoutModal from "../bestsellers/_components/checkout-model";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  useEffect(() => {
    if (!query) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/api/products/search/?q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Search fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          <p className="text-gray-600">
            Found results for{" "}
            <span className="font-semibold text-gray-900">"{query}"</span>
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Searching...</span>
          </div>
        )}

        {/* No Results */}
        {!loading && products.length === 0 && query && (
          <div className="text-center py-12">
            <div className="mb-4 flex justify-center">
              <HiOutlineSearch className="text-gray-300 w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">Try adjusting your search terms</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && products.length > 0 && (
          <>
            <div className="mb-4">
              <span className="text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                found
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-8 h-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}

                    {/* Quick Action Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                        className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-gray-200 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-white hover:shadow-xl"
                      >
                        View
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3">
                    <h3 className="font-medium text-primary text-sm leading-tight mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* Side Panels */}
      <CartSidebar onCheckout={handleCheckout} />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-primary">Loading search...</span>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
