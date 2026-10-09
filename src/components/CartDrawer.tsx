"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { useCart, getItemKey } from "@/context/CartContext";
import { createFourthwallCheckoutSession } from "@/lib/fourthwall";

export default function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    itemsCount,
    subtotal,
    isCheckingOut,
    setIsCheckingOut,
  } = useCart();

  const [checkoutError, setCheckoutError] = useState<string | null>(null);

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

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const lineItems = items.map((item) => ({
        variantId: item.variantId || item.product.fourthwallVariantId || item.product.id,
        quantity: item.quantity,
      }));

      const { checkoutUrl } = await createFourthwallCheckoutSession(lineItems);
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL returned.");
      }
    } catch (err) {
      console.error("Fourthwall checkout session error:", err);
      setCheckoutError("Failed to initiate checkout session. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => !isCheckingOut && setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-[#FAF9F5] text-[#121212] shadow-2xl border-l border-[#E7E5E0] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-[#E7E5E0] flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="font-serif text-xl font-normal tracking-tight text-[#121212]">
                Your Archive
              </h2>
              <span className="text-xs tracking-widest uppercase text-[#8C7A6B] font-medium">
                ({itemsCount} {itemsCount === 1 ? "Edition" : "Editions"})
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              disabled={isCheckingOut}
              className="p-2 text-[#666662] hover:text-[#121212] transition-colors disabled:opacity-50 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
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
                <p className="text-xs text-[#666662] max-w-xs mb-8 leading-relaxed font-light">
                  Explore physical garments and objects to assemble your personal collection.
                </p>
                <Link
                  href="/merch"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors duration-200"
                >
                  Explore Physical Editions
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#E7E5E0]">
                {items.map((item) => {
                  const { product, quantity, variantId } = item;
                  const itemKey = getItemKey(item);
                  const matchedVariant = product.variants?.find((v) => v.id === variantId);

                  return (
                    <div key={itemKey} className="py-5 flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-20 h-24 overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0] shrink-0">
                        <Image
                          src={product.primaryImage || ""}
                          alt={product.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif text-sm text-[#121212] leading-snug line-clamp-1 break-words">
                              {product.title}
                            </h3>
                            <button
                              onClick={() => removeItem(itemKey)}
                              disabled={isCheckingOut}
                              className="text-[#666662] hover:text-[#121212] transition-colors p-1 disabled:opacity-50 shrink-0"
                              title="Remove item"
                            >
                              <Trash2 className="h-3.5 w-3.5 stroke-[1.5]" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium">
                              {product.merchDetails?.merchType || "Physical Edition"}
                            </span>
                            {matchedVariant && (
                              <span className="text-[10px] text-[#666662] font-mono">
                                • {matchedVariant.name}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Counter */}
                          <div className="inline-flex items-center border border-[#E7E5E0] bg-[#FFFFFF]">
                            <button
                              onClick={() => updateQuantity(itemKey, quantity - 1)}
                              disabled={isCheckingOut}
                              className="p-1.5 hover:bg-[#F5F3EE] text-[#121212] transition-colors disabled:opacity-50"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3 stroke-[1.5]" />
                            </button>
                            <span className="px-3 text-xs font-mono text-[#121212]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemKey, quantity + 1)}
                              disabled={isCheckingOut}
                              className="p-1.5 hover:bg-[#F5F3EE] text-[#121212] transition-colors disabled:opacity-50"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3 stroke-[1.5]" />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="font-serif text-sm font-medium text-[#121212]">
                            ${((matchedVariant?.price || product.price) * quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              <p className="text-[11px] text-[#8C7A6B] flex items-center gap-1.5 mb-5">
                <ShieldCheck className="h-3.5 w-3.5 stroke-[1.5]" />
                <span>Verified fulfillment via Fourthwall • Tracked Worldwide</span>
              </p>

              {checkoutError && (
                <div className="mb-4 p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs">
                  {checkoutError}
                </div>
              )}

              {/* Minimalist Single Checkout Action Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors text-xs uppercase tracking-[0.2em] font-medium disabled:opacity-75 group cursor-pointer"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Generating Archival Checkout...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
