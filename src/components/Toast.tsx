"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Check, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div
        className="fixed bottom-5 right-5 z-80 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4"
        aria-live="polite"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 border shadow-xl text-xs uppercase tracking-wider backdrop-blur-md animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === "success"
                ? "bg-[#121212]/95 text-[#FAF9F5] border-[#262626]"
                : toast.type === "error"
                ? "bg-rose-950/95 text-rose-100 border-rose-800"
                : "bg-white/95 text-[#121212] border-[#E7E5E0]"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {toast.type === "success" && (
                <Check className="h-4 w-4 text-emerald-400 shrink-0 stroke-[2]" />
              )}
              {toast.type === "error" && (
                <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 stroke-[2]" />
              )}
              {toast.type === "info" && (
                <Info className="h-4 w-4 text-[#7A6A5C] shrink-0 stroke-[2]" />
              )}
              <span className="truncate font-medium">{toast.message}</span>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 hover:opacity-75 transition-opacity cursor-pointer shrink-0"
              aria-label="Dismiss notification"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

