"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    itemsCount,
    subtotal,
  } = useCart();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F5] text-[#121212] shadow-2xl border-l border-[#E7E5E0] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E5E0] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl font-normal tracking-tight text-[#121212]">
                Your Archive
              </h2>
              <span className="text-xs tracking-widest uppercase text-[#7A6A5C] font-medium">
                ({itemsCount} {itemsCount === 1 ? "Edition" : "Editions"})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#666662] hover:text-[#121212] transition-colors"
              aria-label="Close archive bag"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 rounded-full border border-[#E7E5E0] flex items-center justify-center text-[#7A6A5C] mb-4">
                  <span className="font-serif italic text-base">00</span>
                </div>
                <p className="font-serif italic text-lg text-[#121212] max-w-xs mb-2">
                  Your archive is currently empty.
                </p>
                <p className="text-xs text-[#666662] max-w-xs mb-8 leading-relaxed">
                  Select digital prompt blueprints or physical garments to assemble your personal collection.
                </p>
                <Link
                  href="/prompts"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors duration-200"
                >
                  Explore the Permanent Collection
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#E7E5E0]">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="py-5 flex gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-20 h-24 overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0] shrink-0">
                      <Image
                        src={product.primaryImage || (product as unknown as { image?: string }).image || ""}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif text-sm text-[#121212] leading-snug line-clamp-1">
                            {product.title}
                          </h3>
                          <button
                            onClick={() => removeItem(product.id)}
                            className="text-[#666662] hover:text-[#121212] transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" />
                          </button>
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-medium mt-1">
                          {product.category === "prompt"
                            ? product.promptDetails?.aiEngine || "Prompt Blueprint"
                            : product.merchDetails?.merchType || "Garment Piece"}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="inline-flex items-center border border-[#E7E5E0] bg-[#FFFFFF]">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1.5 hover:bg-[#F5F3EE] text-[#121212] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 stroke-[1.5]" />
                          </button>
                          <span className="px-3 text-xs font-mono text-[#121212]">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1.5 hover:bg-[#F5F3EE] text-[#121212] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 stroke-[1.5]" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif text-sm font-medium text-[#121212]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E5E0] bg-[#FFFFFF]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-widest text-[#666662]">
                  Archive Subtotal
                </span>
                <span className="font-serif text-lg text-[#121212] font-normal">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <p className="text-[11px] text-[#7A6A5C] flex items-center gap-1.5 mb-5">
                <ShieldCheck className="h-3.5 w-3.5 stroke-[1.5]" />
                <span>Verified fulfillment directly via PromptBase & Redbubble</span>
              </p>

              <div className="space-y-2">
                {items.map(({ product }) => (
                  <a
                    key={product.id}
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-between px-4 py-3 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors text-xs uppercase tracking-widest group"
                  >
                    <span className="truncate max-w-[260px]">
                      Acquire &ldquo;{product.title}&rdquo;
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
