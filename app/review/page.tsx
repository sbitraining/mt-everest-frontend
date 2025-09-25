"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Quote,
  Verified,
  ThumbsUp,
  Calendar,
  Award,
  Heart,
  Shield,
} from "lucide-react";
import { reviews } from "@/constants/reviews/review";

const ModernReview: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [likedReviews, setLikedReviews] = useState<Set<number>>(new Set());
  const [imageLoadStates, setImageLoadStates] = useState<
    Record<number, string>
  >({});

  const itemsPerPage = 3;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  const currentItems = reviews.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, totalPages]);

  const handleNext = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setIsAutoPlay(false);
  }, [totalPages]);

  const handlePrev = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setIsAutoPlay(false);
  }, [totalPages]);

  const handleLike = useCallback((reviewId: number) => {
    setLikedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  }, []);

  const handleImageLoad = useCallback((reviewId: number) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [reviewId]: "loaded",
    }));
  }, []);

  const handleImageError = useCallback((reviewId: number) => {
    setImageLoadStates((prev) => ({
      ...prev,
      [reviewId]: "error",
    }));
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`transition-all duration-300 ${
          i < rating
            ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getAvatarFallback = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6]`}
    >
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 rounded-full mb-6">
            <Shield className="w-5 h-5 text-[#00986e]" />
            <span className="text-sm font-bold text-[#00986e]">
              VERIFIED REVIEWS
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black bg-[#00986e] bg-clip-text text-transparent mb-6">
            What Our Customers Say
          </h1>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who have experienced our
            exceptional service and quality products.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="group p-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6 text-slate-700 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>

            <button
              onClick={handleNext}
              className="group p-4 bg-white/80 backdrop-blur-sm hover:bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <ArrowRight className="w-6 h-6 text-slate-700 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  setIsAutoPlay(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? "bg-blue-600 w-8"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              isAutoPlay
                ? "bg-[#00986e] text-white shadow-lg"
                : "bg-white/80 text-slate-700 border border-slate-200"
            }`}
          >
            {isAutoPlay ? "Auto-play ON" : "Auto-play OFF"}
          </button>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((review) => (
            <div
              key={review.id}
              className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  {imageLoadStates[review.id] === "error" ? (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {getAvatarFallback(review.name)}
                    </div>
                  ) : (
                    <>
                      {imageLoadStates[review.id] !== "loaded" && (
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-slate-200 to-slate-300 animate-pulse"></div>
                      )}
                      <img
                        src={review.image}
                        alt={`${review.name} profile`}
                        className={`w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg transition-opacity duration-300 ${
                          imageLoadStates[review.id] === "loaded"
                            ? "opacity-100"
                            : "opacity-0 absolute"
                        }`}
                        onLoad={() => handleImageLoad(review.id)}
                        onError={() => handleImageError(review.id)}
                      />
                    </>
                  )}

                  {review.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                      <Verified className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-900 text-lg">
                    {review.name}
                  </h3>
                  <p className="text-slate-500 text-sm">{review.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span className="text-xs text-slate-400">
                      {review.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">{renderStars(review.rating)}</div>
                <span className="text-sm font-bold text-slate-700">
                  {review.rating}.0
                </span>
              </div>

              {/* Purchase Type */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full mb-4">
                <Award className="w-3 h-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">
                  {review.purchaseType}
                </span>
              </div>

              {/* Feedback */}
              <p className="text-slate-600 leading-relaxed mb-6 italic">
                "{review.feedback}"
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  onClick={() => handleLike(review.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    likedReviews.has(review.id)
                      ? "bg-red-100 text-red-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-300 ${
                      likedReviews.has(review.id)
                        ? "fill-current scale-110"
                        : ""
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-slate-600">
                    Helpful
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernReview;
