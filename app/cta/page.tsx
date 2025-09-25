"use client";
import { useToast } from "@/components/ui/toast-notification";
import { useState, ChangeEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type ServiceType =
  | "web-design"
  | "marketing"
  | "consulting"
  | "development"
  | "other"
  | "";

const CTAFormPage: React.FC = () => {
  const {showToast} = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prevData: FormData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //This will save the DB In the Django Admin
  const handleSubmit = async (): Promise<void> => {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/quote-request/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      showToast("Thank you! We'll get back to you soon.", "success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } else {
      const err = await res.json();
      console.error(err);
      showToast("Failed to submit. Please try again.", "error");
    }
  } catch (error) {
    console.error(error);
    showToast("An error occurred. Please try again.", "error");
  }
};


  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-[#fffff6]`}
    >
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-16 text-[#00986e]">
          <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
            Ready to Get Started?
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who trust our services
          </p>
        </div>

        {/* CTA Form Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Get Your Free Quote
            </h2>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll contact you within 24 hours
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00986e] focus:outline-none transition-colors placeholder-gray-400"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00986e] focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00986e] focus:outline-none transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Interest
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00986e] focus:outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="web-design">Shilajit</option>
                  <option value="marketing">Hemp</option>
                  <option value="consulting">Felt Items</option>
                  <option value="development">Wild Honey</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#00986e] focus:outline-none transition-colors"
                placeholder="Tell us about your queries..."
              />
            </div>

            <div
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-[#00986e] to-[#007552] text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-[#007552] hover:to-[#005c3d] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer text-center"
            >
              Get Started Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTAFormPage;
