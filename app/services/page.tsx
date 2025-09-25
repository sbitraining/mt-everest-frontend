"use client";

import React, { FC } from "react";
import { Truck, RotateCcw, BadgeCheck } from "lucide-react";

type ServiceItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const services: ServiceItem[] = [
  {
    icon: <Truck size={24} />,
    title: "Free Shipping",
    description: "On Order Above $200",
  },
  {
    icon: <RotateCcw size={24} />,
    title: "Easy Returns",
    description: "15 - Day Return Policy",
  },
  {
    icon: <BadgeCheck size={24} />,
    title: "100% Authentic",
    description: "Products Sourced Directly",
  },
];

const ServiceBenefits: FC = () => {
  return (
    <section
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6]`}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 bg-white shadow-md rounded-full py-4 px-6 w-full md:w-auto"
          >
            <div className="bg-[#f1efe7] rounded-full p-3 text-[#00986e] font-semibold">
              {service.icon}
            </div>
            <div>
              <p className="font-semibold text-lg text-gray-800">
                {service.title}
              </p>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceBenefits;
