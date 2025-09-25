import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footersection from "@/components/shared/footer-section";
import Navbarsection from "@/components/shared/navbar-section";
import { CartProvider } from "./bestsellers/_components/cart-context";
import { ToastProvider } from "@/components/ui/toast-notification";
import { AuthProvider } from "@/components/shared/auth-context";

// 👉 import ClerkProvider
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mount Everest Store",
  description: "Mount Everest E-commerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="overflow-x-hidden">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-full`}
        >
          <AuthProvider>
            <ToastProvider>
              <CartProvider>
                <Navbarsection />
                <main className="w-full max-w-full overflow-x-hidden min-h-screen pt-24">
                  {children}
                </main>
                <Footersection />
              </CartProvider>
            </ToastProvider>
          </AuthProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
