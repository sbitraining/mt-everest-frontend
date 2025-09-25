"use client";
import React, { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import Ctasection from "./_components/cta-section";
import { products } from "@/constants/services/servicesnav";
import Servicesection from "./_components/service-section";
import { AnimatedPageWrapper } from "@/components/shared/animated-page-wrapper";

const ServicesPage: React.FC = () => {
  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-secondary">
        {/* Hero Section */}
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl font-bold text-black mb-6">
                Our Natural Products & Services
              </h1>
              <p className="text-xl mb-8" style={{ color: "#00986e" }}>
                Discover our carefully curated selection of premium natural
                products, sourced directly from nature to support your wellness
                journey.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <ShoppingBag className="w-6 h-6" style={{ color: "#00986e" }} />
                <span className="text-lg font-semibold text-black">
                  Premium Natural Products Since 2020
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-green-200/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-emerald-200/30 to-transparent rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-5xl font-bold text-black mb-4 relative">
                  Our Product Categories
                  <div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #00986e, #00b37d)",
                    }}
                  ></div>
                </h2>
              </div>
              <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
                Each product is carefully selected for its quality, purity, and
                natural benefits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden border border-gray-100/50 flex flex-col"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: "fadeInUp 0.8s ease-out forwards",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-100/50 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative p-8 flex flex-col flex-grow">
                    <div
                      className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, #00986e, #00b37d)`,
                        boxShadow: "0 10px 30px rgba(0, 152, 110, 0.2)",
                      }}
                    >
                      <div className="text-white transform group-hover:rotate-12 transition-transform duration-300">
                        {product.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-black mb-4 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-600 group-hover:bg-clip-text transition-all duration-300">
                      {product.name}
                    </h3>

                    <p className="text-gray-600 mb-6 text-center leading-relaxed">
                      {product.description}
                    </p>

                    <div className="space-y-3 mb-8 flex-grow">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <div
                          key={benefitIndex}
                          className="flex items-center space-x-3 group-hover:translate-x-2 transition-transform duration-300"
                          style={{ transitionDelay: `${benefitIndex * 0.1}s` }}
                        >
                          <div
                            className="w-3 h-3 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                            style={{
                              background: `linear-gradient(135deg, #00986e, #00b37d)`,
                              boxShadow: "0 0 10px rgba(0, 152, 110, 0.3)",
                            }}
                          ></div>
                          <span className="text-sm text-gray-700 group-hover:text-black transition-colors duration-300">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      className="w-full text-white py-4 px-8 rounded-2xl font-semibold relative overflow-hidden group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 mt-auto"
                      style={{
                        background: `linear-gradient(135deg, #00986e, #00b37d)`,
                        boxShadow: "0 8px 25px rgba(0, 152, 110, 0.3)",
                      }}
                      onClick={() =>
                        (window.location.href = `/Navigation/bestsellers/`)
                      }
                    >
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>Explore {product.name}</span>
                        <div className="w-0 group-hover:w-5 transition-all duration-300 overflow-hidden">
                          <span className="text-lg">→</span>
                        </div>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </section>

        {/* Services Section */}
        <Servicesection />

        {/* Call to Action */}
        <Ctasection />
      </div>
    </AnimatedPageWrapper>
  );
};

export default ServicesPage;
