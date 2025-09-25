"use client";

import React from "react";
import { ShoppingBag, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

const Ctasection: React.FC = () => {
  const router = useRouter();
  
  const handleBrowseProducts = () => {
    router.push("/Navigation/bestsellers");
  }
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-black mb-6">
            Ready to Start Your Natural Wellness Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Browse our complete collection and discover the power of natural
            products
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handleBrowseProducts}
              className="flex items-center justify-center space-x-3 bg-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2"
              style={{ color: "#00986e", borderColor: "#00986e" }}
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Browse Products</span>
            </button>
            <button
              onClick={() => router.push("/cta")}
              className="flex items-center justify-center space-x-3 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:opacity-90"
              style={{ backgroundColor: "#00986e" }}
            >
              <Phone className="w-5 h-5" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ctasection;
