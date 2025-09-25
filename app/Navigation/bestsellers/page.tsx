"use client";

import { useEffect, useState } from "react";
import Topsellersection from "./_components/topic-section";
import { AnimatedPageWrapper } from "@/components/shared/animated-page-wrapper";
import ProductsPage from "./_components";
import CartSidebar from "@/app/bestsellers/_components/cart-sidebar";
import CheckoutModal from "@/app/bestsellers/_components/checkout-model";

export default function Home() {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <AnimatedPageWrapper>
      <div className="font-[family-name:var(--font-geist-sans)] bg-[#fffff6] min-h-screen w-full py-2 sm:p-2">
        <Topsellersection />
        <ProductsPage />

        {/* Side Panels */}
        <CartSidebar onCheckout={handleCheckout} />
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </AnimatedPageWrapper>
  );
}
