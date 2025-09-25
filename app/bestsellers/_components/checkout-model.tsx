import React, { useState, ChangeEvent } from "react";
import { X, CreditCard, Truck, Shield, Check, ArrowLeft } from "lucide-react";
import { useCart } from "./cart-context";
import { useToast } from "@/components/ui/toast-notification";
import QRModal from "@/components/ui/qr-modal";
import PaymentConfirmationModal from "@/components/ui/qr-confirm-modal";

// Props for CheckoutModal
interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Form field structure
interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, getCartSubtotal, getShippingCost, getTax, clearCart } =
    useCart();
  const { showToast } = useToast();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<string>("stripe");
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const subtotal = getCartSubtotal();
  const shipping = getShippingCost();
  const tax = getTax();
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number): string => `$${price.toFixed(2)}`;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNextStep = (): void => {
    if (checkoutStep < 3) setCheckoutStep((step) => step + 1);
  };

  const handlePreviousStep = (): void => {
    if (checkoutStep > 1) setCheckoutStep((step) => step - 1);
  };

  // This will handle the place order
  const handlePlaceOrder = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

    if (!token) {
      showToast("Please login first", "error");
      window.location.href = "/authentication/login";
      return;
    }

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      };

      if (paymentMethod === "stripe") {
        const res = await fetch("http://localhost:8000/api/checkout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.checkout_url) {
          // clear cart in frontend state
          clearCart();
          // optionally clear cart in backend immediately
          await fetch("http://localhost:8000/api/cart/clear/", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // redirect to Stripe
          window.location.href = data.checkout_url;
        } else {
          showToast("Stripe checkout failed", "error");
        }
      }

      if (paymentMethod === "paypal") {
        const res = await fetch("http://localhost:8000/api/paypal/checkout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (res.ok && data.checkout_url) {
          // clear cart in frontend state
          clearCart();
          // optionally clear cart in backend immediately
          await fetch("http://localhost:8000/api/cart/clear/", {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // redirect to PayPal
          window.location.href = data.checkout_url;
        } else {
          showToast("PayPal checkout failed", "error");
        }
      }

      if (paymentMethod === "qr") {
        setIsQRModalOpen(true);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-transparent backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b px-4 sm:px-6 py-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              {orderPlaced ? "Order Confirmed!" : "Checkout"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Order Success */}
          {orderPlaced ? (
            <div className="p-6 sm:p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Thank you for your order!
              </h3>
              <p className="text-gray-600 mb-4">
                Your order has been placed successfully. You'll receive a
                confirmation email shortly.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Order Total:{" "}
                  <span className="font-semibold">{formatPrice(total)}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row">
              {/* Left Form */}
              <div className="flex-1 p-4 sm:p-6 order-2 lg:order-1">
                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  {["Shipping", "Payment", "Review"].map((label, i) => {
                    const step = i + 1;
                    return (
                      <React.Fragment key={label}>
                        <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
                          <div
                            className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                              checkoutStep >= step
                                ? "bg-black text-white"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {step}
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-center">
                            {label}
                          </span>
                        </div>
                        {step < 3 && (
                          <div className="hidden sm:flex flex-1 h-px bg-gray-200 mx-4" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Step 1 - Shipping */}
                {checkoutStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                      Shipping Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <input
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    />
                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    />
                    <input
                      name="address"
                      placeholder="Street name & House no."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <input
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base"
                      />
                      <input
                        name="zipCode"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm sm:text-base sm:col-span-2 lg:col-span-1"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 - Payment */}
                {checkoutStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                      Payment Information
                    </h3>

                    {/* Payment method selection */}
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="stripe"
                          checked={paymentMethod === "stripe"}
                          onChange={() => setPaymentMethod("stripe")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm sm:text-base">
                          Stripe (Card)
                        </span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm sm:text-base">PayPal</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="qr"
                          checked={paymentMethod === "qr"}
                          onChange={() => setPaymentMethod("qr")}
                          className="w-4 h-4"
                        />
                        <span className="text-sm sm:text-base">QR Payment</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Step 3 - Review */}
                {checkoutStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                      Review Your Order
                    </h3>
                    <div className="border rounded-lg p-4 space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm sm:text-base">
                          Shipping Address
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 mt-1">
                          {formData.firstName} {formData.lastName}
                          <br />
                          {formData.address}
                          <br />
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-3 sm:space-x-4 p-3 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="sticky bottom-0 bg-white pt-4 sm:pt-6 border-t mt-6">
                  <div className="flex justify-between items-center">
                    {checkoutStep > 1 && (
                      <button
                        onClick={handlePreviousStep}
                        className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Previous</span>
                      </button>
                    )}
                    <div className="ml-auto">
                      {checkoutStep < 3 ? (
                        <button
                          onClick={handleNextStep}
                          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base font-medium"
                        >
                          Continue
                        </button>
                      ) : (
                        <button
                          onClick={handlePlaceOrder}
                          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-sm sm:text-base font-medium"
                        >
                          Place Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side – Order Summary */}
              <div className="w-full lg:w-80 bg-gray-50 p-4 sm:p-6 border-b lg:border-b-0 lg:border-l order-1 lg:order-2">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3 sm:space-y-4 max-h-40 lg:max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 sm:mt-6 pt-4 border-t space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm sm:text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Free shipping over $100
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Secure checkout
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                    <span className="text-xs sm:text-sm text-gray-600">
                      Cards accepted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onConfirmPayment={() => {
          setIsQRModalOpen(false);
          setIsPaymentModalOpen(true);
        }}
      />
      <PaymentConfirmationModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onCancel={() => setIsPaymentModalOpen(false)}
        onConfirm={async () => {
          const token =
            typeof window !== "undefined"
              ? localStorage.getItem("jwtToken")
              : null;

          const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
            country: formData.country,
            paymentMethod: "qr",
          };

          const res = await fetch("http://localhost:8000/api/checkout/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            // Clear cart in frontend
            clearCart();

            // Clear cart in backend
            await fetch("http://localhost:8000/api/cart/clear/", {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            // Close the modal
            setIsPaymentModalOpen(false);

            // Redirect to your success page
            window.location.href = "/success"; // <--- route for your SuccessPage
          } else {
            // If you want no toast, you can handle silently or add some UI later
            console.error("Failed to save order");
          }
        }}
      />
    </div>
  );
};

export default CheckoutModal;
