"use client";

import React from "react";
import { services } from "@/constants/services/servicesnav";

const Servicesection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-black mb-4">Why Choose Us</h2>
          <p className="text-lg text-gray-600">
            We're committed to providing exceptional service and premium natural
            products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.id}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div
                className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
                style={{ backgroundColor: "#00986e", color: "white" }}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Servicesection;
