"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../bestsellers/_components/cart-context";

export default function SuccessPage() {
  const { clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // clear cart in frontend
    clearCart();

    // clear cart in backend
    const token = localStorage.getItem("jwtToken");
    if (token) {
      fetch("http://localhost:8000/api/cart/clear/", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    // Redirect after 1.5s
    const timeout = setTimeout(() => {
      router.push("/");
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md transition-opacity z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center animate-fadeIn scale-95">
        {/* Animated check circle */}
        <div className="w-24 h-24 rounded-full border-4 border-green-500 flex items-center justify-center mb-6 relative animate-pop">
          <svg
            className="w-12 h-12 text-green-500 animate-draw"
            fill="none"
            stroke="currentColor"
            strokeWidth={4}
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Thank you for your order!
        </h1>
        <p className="text-gray-600 text-center max-w-sm">
          Your payment was successful and your order has been placed.
          <br /> You’ll receive a confirmation email shortly.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Redirecting you to homepage...
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease forwards;
        }
        .animate-pop {
          animation: popIn 0.3s ease forwards;
        }
        .animate-draw {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: draw 0.6s forwards 0.2s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes popIn {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          70% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
