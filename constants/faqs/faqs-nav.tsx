import { FAQItem } from "@/types/faqs/faqs-nav";
import { Shield, Leaf, Mountain, Heart } from "lucide-react";

export const faqData: FAQItem[] = [
  // Product Quality & Sourcing
  {
    id: "hemp-legal",
    question: "Are your hemp products legal and safe?",
    answer:
      "Yes, all our hemp products are derived from industrial hemp containing less than 0.3% THC, making them federally legal. They are third-party tested for purity and potency, ensuring they meet all safety standards.",
    category: "Product Quality & Sourcing",
    icon: <Leaf className="w-5 h-5 text-green-600" />,
  },
  {
    id: "honey-source",
    question: "Where do you source your wild honey?",
    answer:
      "Our wild honey is sourced from remote mountain apiaries in pristine environments, far from industrial pollution. We work directly with beekeepers who practice sustainable harvesting methods that don't harm the bee colonies.",
    category: "Product Quality & Sourcing",
    icon: <Heart className="w-5 h-5 text-amber-600" />,
  },
  {
    id: "shilajit-authenticity",
    question: "How do you ensure shilajit authenticity?",
    answer:
      "Our shilajit is sourced directly from the Himalayas at altitudes above 16,000 feet. Each batch undergoes rigorous testing for heavy metals, microorganisms, and authenticity markers. We provide certificates of analysis with every purchase.",
    category: "Product Quality & Sourcing",
    icon: <Mountain className="w-5 h-5 text-blue-600" />,
  },
  {
    id: "felt-special",
    question: "What makes your felt products special?",
    answer:
      "Our felt products are handcrafted by skilled artisans using traditional wet-felting techniques. We use only high-grade wool from ethically raised sheep, and each piece is unique, reflecting the artisan's individual craftsmanship.",
    category: "Product Quality & Sourcing",
    icon: <Shield className="w-5 h-5 text-purple-600" />,
  },

  // Usage & Benefits
  {
    id: "hemp-usage",
    question: "How should I use hemp products?",
    answer:
      "Hemp products can be used in various ways depending on the type. Hemp seeds can be added to smoothies or salads, hemp oil can be used topically or added to food, and hemp fiber products are great for sustainable living. Start with small amounts and adjust as needed.",
    category: "Usage & Benefits",
  },
  {
    id: "shilajit-dosage",
    question: "What is the recommended dosage for shilajit?",
    answer:
      "We recommend starting with a rice grain-sized amount (about 300-500mg) once daily, dissolved in warm water or milk. Gradually increase if needed. Always consult with a healthcare provider before starting any new supplement regimen.",
    category: "Usage & Benefits",
  },
  {
    id: "honey-allergies",
    question: "Can I use wild honey if I have allergies?",
    answer:
      "While our honey is pure and unprocessed, it may contain pollen that could trigger allergies. If you have known pollen allergies, consult your healthcare provider before consuming. Start with small amounts to test your tolerance.",
    category: "Usage & Benefits",
  },
  {
    id: "felt-care",
    question: "How do I care for felt products?",
    answer:
      "Hand wash felt items in cool water with mild soap. Avoid wringing or twisting. Lay flat to dry away from direct heat or sunlight. For maintenance, use a fabric shaver to remove pilling and steam to refresh the fibers.",
    category: "Usage & Benefits",
  },

  // Shipping & Returns
  {
    id: "shipping-options",
    question: "What are your shipping options?",
    answer:
      "We offer standard shipping (5-7 business days) and expedited shipping (2-3 business days). All orders over $75 qualify for free standard shipping. We use eco-friendly packaging materials whenever possible.",
    category: "Shipping & Returns",
  },
  {
    id: "international-shipping",
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship to the United States and Canada. International shipping to other countries is available for select products. Shipping costs and delivery times vary by destination and local customs requirements.",
    category: "Shipping & Returns",
  },
  {
    id: "return-policy",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return unopened items for a full refund. Opened food products can be returned if there's a quality issue.",
    category: "Shipping & Returns",
  },
  {
    id: "packaging",
    question: "How do you package products?",
    answer:
      "We use sustainable packaging materials including recycled cardboard, biodegradable packing peanuts, and minimal plastic. Temperature-sensitive items like honey and shilajit are protected with insulated packaging when necessary.",
    category: "Shipping & Returns",
  },

  // Certifications & Safety
  {
    id: "organic-certification",
    question: "Are your products organic?",
    answer:
      "Most of our products are certified organic where applicable. Our hemp products carry USDA Organic certification, and our honey is wild-harvested from pesticide-free environments. Shilajit is naturally occurring and tested for purity.",
    category: "Certifications & Safety",
  },
  {
    id: "third-party-testing",
    question: "Do you have third-party testing?",
    answer:
      "Yes, all our consumable products undergo rigorous third-party testing for contaminants, heavy metals, pesticides, and microorganisms. We provide Certificates of Analysis (COAs) upon request for full transparency.",
    category: "Certifications & Safety",
  },
  {
    id: "pregnancy-safety",
    question: "Are your products safe during pregnancy?",
    answer:
      "While our products are natural, we recommend consulting with your healthcare provider before using any supplements or new products during pregnancy or while breastfeeding. Your doctor can provide personalized advice based on your specific situation.",
    category: "Certifications & Safety",
  },
  {
    id: "quality-standards",
    question: "What quality standards do you follow?",
    answer:
      "We adhere to Good Manufacturing Practices (GMP), maintain FDA facility registration where required, and follow organic certification standards. Our products are manufactured in facilities that meet stringent quality and safety requirements.",
    category: "Certifications & Safety",
  },

  // Company & Values
  {
    id: "fair-trade",
    question: "How do you ensure fair trade practices?",
    answer:
      "We work directly with farmers and artisans, ensuring they receive fair compensation for their work. We maintain long-term partnerships, provide advance payments when needed, and support community development projects in source regions.",
    category: "Company & Values",
  },
  {
    id: "environmental-impact",
    question: "What is your environmental impact?",
    answer:
      "We're committed to sustainable practices including minimal packaging, carbon-neutral shipping options, supporting regenerative agriculture, and partnering with suppliers who prioritize environmental stewardship.",
    category: "Company & Values",
  },
  {
    id: "bulk-pricing",
    question: "Do you offer bulk or wholesale pricing?",
    answer:
      "Yes, we offer volume discounts for bulk orders and have a wholesale program for retailers and practitioners. Contact our sales team for pricing information and minimum order requirements.",
    category: "Company & Values",
  },
  {
    id: "order-tracking",
    question: "How can I track my order?",
    answer:
      "Once your order ships, you'll receive a tracking number via email. You can track your package through our website or directly with the shipping carrier. We also send notifications for key delivery milestones.",
    category: "Company & Values",
  },
];

export const categories = [
  "Product Quality & Sourcing",
  "Usage & Benefits",
  "Shipping & Returns",
  "Certifications & Safety",
  "Company & Values",
];
