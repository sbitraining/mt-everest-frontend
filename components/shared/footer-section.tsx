import {
  Heart,
  MessageCircle,
  Facebook,
  Instagram,
  Linkedin,
  Shield,
  Truck,
  RotateCcw,
  Award,
} from "lucide-react";
import React from "react";

// Updated navigation structure for ecommerce
const navigationSections = {
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Sustainability", href: "#" },
    { label: "Investor Relations", href: "#" },
    { label: "Gift Cards", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Size Guide", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Order Status", href: "#" },
  ],
  shop: [
    { label: "New Arrivals", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Brands", href: "#" },
    { label: "Wishlist", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Accessibility", href: "#" },
    { label: "California Privacy", href: "#" },
    { label: "Do Not Sell My Info", href: "#" },
  ],
};

const socialLinks = [
  { name: "Discord", href: "#", icon: MessageCircle },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "LinkedIn", href: "#", icon: Linkedin },
];

const trustFeatures = [
  { icon: Shield, text: "Secure Checkout" },
  { icon: Truck, text: "Free Shipping" },
  { icon: RotateCcw, text: "Easy Returns" },
  { icon: Award, text: "Quality Guarantee" },
];

const Footer = () => {
  return (
    <footer className="bg-primary py-12 px-6">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8 text-center md:text-left items-center">

        {/* Left Section - Logo and Description */}
        <div className="lg:col-span-1">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">MT</span>
            </div>
            <span className="text-xl font-bold text-black">Mt Everest</span>
          </div>
          <p className="text-white font-semibold text-sm mb-4">
            Your trusted online shopping destination for quality products and
            exceptional service.
          </p>
          {/* Social Media Icons */}
         <div className="flex justify-center md:justify-start space-x-3 mb-4">
  {socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.href}
      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
      aria-label={social.name}
    >
      <span className="text-sm">
        <social.icon size={18} />
      </span>
    </a>
  ))}
</div>

        </div>

        {/* Company Section */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-black mb-4">Company</h3>
          <ul className="space-y-2">
            {navigationSections.company.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white font-semibold hover:text-gray-900 transition-colors text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-black mb-4">Customer Care</h3>
          <ul className="space-y-2">
            {navigationSections.support.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white font-bold hover:text-gray-900 transition-colors text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop Section */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-black mb-4">Shop</h3>
          <ul className="space-y-2">
            {navigationSections.shop.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white font-semibold hover:text-gray-900 transition-colors text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal & Payment Section */}
        <div className="lg:col-span-1">
          <h3 className="font-bold text-black mb-4">Legal & Payment</h3>
          <ul className="space-y-2 mb-4">
            {navigationSections.legal.slice(0, 4).map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-white font-semibold hover:text-gray-900 transition-colors text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Payment Methods */}
        <div className="mt-4 text-center">
  <h4 className="font-semibold text-white mb-2">We Accept</h4>
  <div className="flex justify-center space-x-2">
    <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
      VISA
    </div>
    <div className="w-10 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
      MC
    </div>
    <div className="w-10 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
      AMEX
    </div>
    <div className="w-10 h-6 bg-yellow-400 rounded text-black text-xs flex items-center justify-center font-bold">
      PP
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Bottom Section - Copyright and Legal Links */}
      <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center text-center">
  <div className="text-white font-semibold text-sm mb-4 md:mb-0">
    ©Copyright All rights reserved. 2025 Nep World Technology
  </div>
  <div className="flex space-x-6 text-sm justify-center">
    <a
      href="#"
      className="text-white font-semibold hover:text-gray-900 transition-colors"
    >
      Terms & Conditions
    </a>
    <span className="text-white">|</span>
    <a
      href="#"
      className="text-white font-semibold hover:text-gray-900 transition-colors"
    >
      Accessibility
    </a>
  </div>
</div>

    </footer>
  );
};

export default Footer;
