"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Category {
  id: number;
  title: string;
  description: string;
  image: string;
}
const Mainsection: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [heroData, setHeroData] = useState<any>(null);
  const router = useRouter();

  {
    /* Fetching Datas from the Homebanner APis'*/
  }
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/hero-banner/");
        if (res.ok) {
          const data = await res.json();
          setHeroData(data);
        } else {
          console.warn("No hero banner data found");
        }
      } catch (error) {
        console.error("Failed to fetch hero banner:", error);
      }
    };

    fetchHeroData();
  }, []);

  {
    /* Fetching Datas from the Homebanner APis'*/
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/categories/"); // 👈 your endpoint
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
          console.log("Fetched categories:", data);
        } else {
          console.warn("No categories found");
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleClick = (cat: Category) => {
    console.log("Clicked category:", cat.title);
    router.push("/Navigation/bestsellers");
  };

  const handleLearnMore = () => {
    router.push("/Navigation/services");
  };
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6]`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Text Content */}
          <div className="flex flex-col space-y-8 max-w-2xl text-center lg:text-left">
            <div className="space-y-4">
              {heroData?.title &&
                (() => {
                  const words = heroData.title.split(" ");
                  const first = words[0];
                  const middle = words[1] || "";
                  const rest = words.slice(2).join(" ");
                  return (
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                      {first}{" "}
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {middle}
                      </span>{" "}
                      {rest}
                    </h1>
                  );
                })()}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-gray-700 italic">
                {heroData?.subtitle}
              </h2>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              {heroData?.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start">
              <button
                onClick={() => router.push("/Navigation/bestsellers")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-semibold rounded-full px-8 py-4 hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Now
              </button>
              <button
                onClick={handleLearnMore}
                className="border-2 border-emerald-600 text-emerald-600 text-lg font-semibold rounded-full px-8 py-4 hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex-1 max-w-lg">
            <div className="relative">
              <img
                src={`http://127.0.0.1:8000${heroData?.thumbnail_image}`}
                alt="Premium Shilajit from Nepal"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <img
                  src={`http://127.0.0.1:8000${heroData?.hero_image}`}
                  alt="Pure Shilajit"
                  className="w-24 h-24 object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white rounded-full p-3 shadow-lg">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative h-80">
                <img
                  src={`http://127.0.0.1:8000${cat.image}`}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-2xl font-bold mb-2">
                    {cat.title
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">
                    {cat.description}
                  </p>
                  <button
                    onClick={() => handleClick(cat)}
                    className="bg-white text-gray-900 font-semibold rounded-full px-6 py-3 hover:bg-gray-100 transition-all duration-300 shadow-md"
                  >
                    Explore{" "}
                    {cat.title
                      .replace(/_/g, " ")
                      .replace(/\b\w/g, (c: string) => c.toUpperCase())}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-800 rounded-full"></div>
              <span className="text-sm font-medium">100% Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
              <span className="text-sm font-medium">Sourced from Nepal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-800 rounded-full"></div>
              <span className="text-sm font-medium">
                Trusted for Generations
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-800 rounded-full"></div>
              <span className="text-sm font-medium">Handcrafted Quality</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mainsection;
