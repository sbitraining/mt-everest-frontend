"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
  useRef,
} from "react";
import { CheckCircle, X, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (
    message: string,
    type: ToastType = "success",
    duration: number = 4000
  ) => {
    const id = crypto.randomUUID();
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed top-25 left-4 z-[9999] space-y-3 pointer-events-none">
        <div className="space-y-3 pointer-events-auto">
          {toasts.map((toast, index) => (
            <div key={toast.id} style={{ animationDelay: `${index * 100}ms` }}>
              <ToastItem
                key={toast.id}
                toast={toast}
                onClose={() => removeToast(toast.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

// ----------------------
// ToastItem Component (OUTSIDE)
// ----------------------

interface ToastItemProps {
  toast: Toast;
  onClose: () => void;
}

const ToastItem: FC<ToastItemProps> = React.memo(({ toast, onClose }) => {
  const [progress, setProgress] = useState(100);
  const startTimeRef = useRef<number>(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!toast.duration) return;

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 100 - (elapsed / toast.duration!) * 100);
      setProgress(remaining);

      if (remaining <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [toast.duration, toast.id]);

  const getToastIcon = (type: ToastType) => {
    const iconClass = "w-5 h-5 flex-shrink-0";
    switch (type) {
      case "success":
        return <CheckCircle className={`${iconClass} text-emerald-600`} />;
      case "error":
        return <AlertCircle className={`${iconClass} text-red-600`} />;
      case "warning":
        return <AlertTriangle className={`${iconClass} text-amber-600`} />;
      case "info":
        return <Info className={`${iconClass} text-blue-600`} />;
      default:
        return <CheckCircle className={`${iconClass} text-emerald-600`} />;
    }
  };

  const getToastStyles = (type: ToastType) => {
    const baseStyles = "backdrop-blur-sm border shadow-lg";
    switch (type) {
      case "success":
        return `${baseStyles} bg-white/95 border-emerald-200/50 text-gray-800`;
      case "error":
        return `${baseStyles} bg-white/95 border-red-200/50 text-gray-800`;
      case "warning":
        return `${baseStyles} bg-white/95 border-amber-200/50 text-gray-800`;
      case "info":
        return `${baseStyles} bg-white/95 border-blue-200/50 text-gray-800`;
      default:
        return `${baseStyles} bg-white/95 border-emerald-200/50 text-gray-800`;
    }
  };

  const getProgressBarColor = (type: ToastType) => {
    switch (type) {
      case "success":
        return "bg-emerald-500";
      case "error":
        return "bg-red-500";
      case "warning":
        return "bg-amber-500";
      case "info":
        return "bg-blue-500";
      default:
        return "bg-emerald-500";
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden
        flex items-start gap-3 px-5 py-4 rounded-xl
        min-w-[320px] max-w-[420px]
        transform transition-all duration-500 ease-out
        animate-in slide-in-from-left-full fade-in
        hover:shadow-xl hover:scale-[1.02]
        ${getToastStyles(toast.type)}
      `}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-gray-200/30 w-full">
        <div
          className={`h-full transition-all duration-100 ease-linear ${getProgressBarColor(
            toast.type
          )}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Icon */}
      <div className="mt-0.5">{getToastIcon(toast.type)}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-relaxed text-gray-800">
          {toast.message}
        </p>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="
          flex-shrink-0 p-1.5 mt-0.5
          hover:bg-gray-200/60 active:bg-gray-300/60
          rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-gray-400/50
        "
        aria-label="Close notification"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
});
ToastItem.displayName = "ToastItem";
