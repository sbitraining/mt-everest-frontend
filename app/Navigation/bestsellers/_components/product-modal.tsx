import React, { useState, useEffect } from "react";
import {
  X,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
} from "lucide-react";
import { Product } from "@/types/bestsellers/bestseller-nav";
import StarRating from "./star-rating";
import { useToast } from "@/components/ui/toast-notification";
import { useCart } from "@/app/bestsellers/_components/cart-context";

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<
    "description" | "features" | "reviews"
  >("description");

  const { addToCart, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleAddToCart = async () => {
    if (!product) return;

    if (product.stock === 0) {
      showToast("Product is out of stock", "error");
      return;
    }

    // ✅ This will handle the backend
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
      addToCart({
        id: data.id, // ✅ Use backend-generated CartItem ID
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      showToast(`Added ${product.name} to cart`, "success");
      // setIsCartOpen(true); // optional
    } catch (err) {
      console.error(err);
      showToast("Something went wrong", "error");
    }
  };

  const handleSaveProduct = () => {
    showToast("Product saved to wishlist!", "success");
  };

  const handleShareProduct = () => {
    showToast("Product link copied to clipboard!", "info");
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-transparent backdrop-blur-md transition-opacity flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-black"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Images */}
            <div className="space-y-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 cursor-pointer hover:border-gray-400"
                  />
                ))}
              </div>
            </div>

            {/* Right: Info */}
            <div className="space-y-6">
              <div>
                <StarRating
                  rating={product.rating}
                  reviews={product.reviews}
                  size="lg"
                />
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-700">{product.description}</p>

              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm text-gray-600">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
                <div className="flex gap-3 text-black">
                  <button
                    onClick={handleSaveProduct}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Heart className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleShareProduct}
                    className="flex-1 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                </div>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">
                    {product.shipping}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">
                    30-day return policy
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-primary" />
                  <span className="text-sm text-gray-600">1-year warranty</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex gap-6 border-b">
              {["description", "features", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as typeof activeTab)}
                  className={`pb-2 px-1 capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-gray-900 text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-6">
              {activeTab === "description" && (
                <p className="text-gray-700">{product.description}</p>
              )}
              {activeTab === "features" && (
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Customer Reviews</h3>
                    <StarRating
                      rating={product.rating}
                      reviews={product.reviews}
                    />
                  </div>
                  <p className="text-gray-600">Reviews coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
