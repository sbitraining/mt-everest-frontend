import { label } from "framer-motion/client";

export const navigationItems = [
  { label: "Home", hasDropdown: false, href: "/" },
  //{ label: "Products", hasDropdown: true, href: "/products" }, Next Release
  //{ label: "Offers", hasDropdown: false, href: "/Navigation/offers" }, Next Release
  {
    label: "Products",
    hasDropdown: false,
    href: "/Navigation/bestsellers",
  },
  { label: "Services", hasDropdown: false, href: "/Navigation/services" },
  { label: "Faqs", hasDropdown: false, href: "/Navigation/faqs" },
  { label: "About", hasDropdown: false, href: "/Navigation/about" },
  { label: "Orders", hasDropdown: false, href: "/Navigation/orders" },
];
