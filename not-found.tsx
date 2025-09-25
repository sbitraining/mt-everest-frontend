"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import stock from "@/public/assets/images/404-error.png";

const NotFound = () => {
  const messages = [
    "It might have moved",
    "Or been deleted",
    "Or never existed",
    "But don’t worry",
    "We’re here to help",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % messages.length);
    }, 2000); // every 2 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="mb-14 bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
            Oops! <span className="text-teal-950">Are you lost?</span>
          </h1>
          <div className="mb-6 text-2xl font-extrabold text-gray-600 md:text-3xl">
            We couldn&apos;t find the page you&apos;re looking for.{" "}
            <span className="block h-8 text-indigo-500 transition-all duration-500">
              {messages[activeIndex]}
            </span>
          </div>
          <div className="pt-5">
            <Link
              href="/"
              className="inline-block rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-teal-600"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <div className="w-full max-w-md md:w-1/2">
          <Image src={stock} alt="Not found illustration" priority />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
