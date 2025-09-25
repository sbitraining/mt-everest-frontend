import React, { useState } from "react";
import Image from "next/image";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
  amount?: string;
}

const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  onConfirmPayment,
  amount,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmPayment();
      setIsProcessing(false);
    }, 1000);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full mx-4 p-6">
        {/* Header */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Scan QR to Pay
          </h2>
          {amount && (
            <p className="text-indigo-600 font-medium mt-1">{amount}</p>
          )}
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-lg border border-gray-200">
            <Image
              src="/assets/images/QR.png"
              alt="QR Code for Payment"
              width={180}
              height={180}
              className="rounded"
              priority
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirmPayment}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 flex items-center justify-center"
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  ></circle>
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    className="opacity-75"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "I Have Paid"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRModal;
