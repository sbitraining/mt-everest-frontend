"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Search, Mail, Phone } from "lucide-react";
import { FAQItem } from "@/types/faqs/faqs-nav";
import { faqData, categories } from "@/constants/faqs/faqs-nav";
import Image from "next/image";
import SupportCard from "./_components/contact-section";
import { AnimatedPageWrapper } from "@/components/shared/animated-page-wrapper";

const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(
    "Product Quality & Sourcing"
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [filteredFAQs, setFilteredFAQs] = useState<FAQItem[]>(faqData);

  // Filter FAQs based on category and search term
  useEffect(() => {
    let filtered = faqData;

    filtered = faqData.filter((faq) => faq.category === activeCategory);

    if (searchTerm) {
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredFAQs(filtered);
  }, [activeCategory, searchTerm]);

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const categoryColors: { [key: string]: string } = {
    "Product Quality & Sourcing":
      "bg-green-100 text-green-800 border-green-200",
    "Usage & Benefits": "bg-blue-100 text-blue-800 border-blue-200",
    "Shipping & Returns": "bg-purple-100 text-purple-800 border-purple-200",
    "Certifications & Safety": "bg-red-100 text-red-800 border-red-200",
    "Company & Values": "bg-amber-100 text-amber-800 border-amber-200",
  };

  return (
    <AnimatedPageWrapper>
      <div className="min-h-screen bg-secondary mt-10">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-r from-white/70 to-black/70 text-white relative overflow-hidden">
          {/* Background Image */}
          <Image
            src="/assets/images/faqs-banner.png"
            alt="FAQ Background"
            fill
            className="object-cover opacity-20 z-0"
            priority
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Everything You Need to Know
              </h2>
              <p className="text-xl text-green-100 mb-8 leading-relaxed">
                Get answers to common questions about our natural products,
                quality standards, shipping, and more. Can't find what you're
                looking for? Contact our support team.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-lg text-gray-900 bg-white rounded-2xl shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <main className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {filteredFAQs.length > 0 ? (
                <div className="space-y-6">
                  {filteredFAQs.map((faq) => (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                    >
                      <button
                        onMouseEnter={() => setOpenItems(new Set([faq.id]))}
                        className="w-full px-8 py-6 text-left focus:outline-none focus:ring-4 focus:ring-green-100 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {faq.icon}
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {faq.question}
                              </h3>
                              <span
                                className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${
                                  categoryColors[faq.category] ||
                                  "bg-gray-100 text-gray-800 border-gray-200"
                                }`}
                              >
                                {faq.category}
                              </span>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                              openItems.has(faq.id) ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {openItems.has(faq.id) && (
                        <div className="px-8 pb-6">
                          <div className="border-t border-gray-100 pt-6">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    No results found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search term or category filter
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Contact Section */}
        <SupportCard />
      </div>
    </AnimatedPageWrapper>
  );
};

export default FAQPage;
