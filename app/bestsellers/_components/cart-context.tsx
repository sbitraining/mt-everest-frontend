"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";

// Define the shape of a product/item
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  [key: string]: any;
}

// Define the context value type
interface CartContextType {
  cart: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, newQuantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  getCartSubtotal: () => number;
  getShippingCost: () => number;
  getTax: () => number;
  fetchCartItems: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cart, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const fetchCartItems = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    if (!token) {
      console.log("No token, skip fetching cart items.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/cart/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        console.warn("Session expired. Clearing token.");
        localStorage.removeItem("jwtToken");
        return;
      }

      if (!res.ok) {
        console.error("Failed to fetch cart items");
        return;
      }

      const data: CartItem[] = await res.json();
      setCartItems(data);
      console.log("✅ Cart items loaded:", data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "jwtToken") {
        fetchCartItems();
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // ✅ FIXED: Now respects product.quantity when merging
  const addToCart = (product: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity } // 👈 add the incoming quantity
            : item
        );
      }
      return [...prevCart, { ...product, quantity: product.quantity }];
    });
  };

  const updateQuantity = (productId: string | number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId: string | number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const getCartSubtotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getShippingCost = () => (getCartSubtotal() > 100 ? 0 : 10);

  const getTax = () => getCartSubtotal() * 0.08;

  const getCartTotal = () => getCartSubtotal() + getShippingCost() + getTax();

  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);

  const value: CartContextType = {
    cart,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    getCartSubtotal,
    getShippingCost,
    getTax,
    fetchCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
