import React from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/components/ui/toast-notification";

interface CartSidebarProps {
  onCheckout: () => void;
}

const formatPrice = (price: any): string => {
  const value = typeof price === "string" ? parseFloat(price) : price;
  return `$${value.toFixed(2)}`;
};

const CartSidebar: React.FC<CartSidebarProps> = ({ onCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setCartItems,
    getCartCount,
    getCartSubtotal,
    getShippingCost,
    getTax,
  } = useCart();

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const tax = getTax();
  const total = subtotal + shipping + tax;

  //get token
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

  // handle quantity update with backend
  const handleUpdateQuantity = async (
    itemId: number | string,
    newQty: number
  ) => {
    if (!token) return;
    if (newQty < 1) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/cart/${itemId}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity: newQty }),
        }
      );

      if (res.ok) {
        const updatedCart = await res.json();
        // merge with previous cart to preserve image
        setCartItems((prevCart) =>
          updatedCart.map((updatedItem: any) => {
            const oldItem = prevCart.find((p) => p.id === updatedItem.id);
            return {
              ...updatedItem,
              image: oldItem?.image || "",
            };
          })
        );
      } else {
        console.error("Failed to update quantity");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  // handle remove item with backend
  const { showToast } = useToast();
  const handleRemoveItem = async (itemId: number | string) => {
    if (!token) return;

    try {
      const res = await fetch(
        `http://localhost:8000/api/cart/${itemId}/remove/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setCartItems((prevCart) =>
          data.map((updatedItem: any) => {
            const oldItem = prevCart.find((p) => p.id === updatedItem.id);
            return {
              ...updatedItem,
              image: oldItem?.image || "",
            };
          })
        );
        showToast("Item removed from cart", "success");
      } else {
        console.error(data);
        showToast("Failed to remove item", "error");
      }
    } catch (err) {
      console.error("Error removing item:", err);
      showToast("Error removing item", "error");
    }
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Background Overlay */}
      <div
        className="fixed inset-0 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Sidebar */}
      <div className="ml-auto h-full w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({getCartCount()})
            </h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <ShoppingBag className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-lg font-medium">Your cart is empty</p>
                <p className="text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {formatPrice(item.price)} each
                      </p>

                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 py-1 bg-white rounded-md text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="border-t px-6 py-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t pt-2">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full mt-4 bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full mt-2 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
