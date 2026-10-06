"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { X, ArrowUpRight, Copy, Check, Plus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  const [copied, setCopied] = useState(false);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleClose = useCallback(() => {
    setSelectedVariantId(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, handleClose]);

  if (!product) return null;

  const defaultVariantId = product.fourthwallVariantId || product.variants?.[0]?.id || "";
  const activeVariantId = selectedVariantId || defaultVariantId;

  const isPrompt = product.category === "prompt";
  const imageSrc =
    product.primaryImage ||
    (product as unknown as { image?: string }).image ||
    "";

  const handleCopyPrompt = () => {
    if (!product.promptDetails?.promptPreviewSnippet) return;
    navigator.clipboard.writeText(product.promptDetails.promptPreviewSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToBag = () => {
    addItem(product, 1, activeVariantId);
    handleClose();
  };

  const activeVariant = product.variants?.find((v) => v.id === activeVariantId);
  const displayPrice = activeVariant?.price || product.price;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] border border-[#E7E5E0] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Dismiss Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#666662] hover:text-[#121212] transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5 stroke-[1.5]" />
        </button>

        {/* Visual Frame */}
        <div
          className={`relative w-full md:w-1/2 bg-[#F5F3EE] shrink-0 border-b md:border-b-0 md:border-r border-[#E7E5E0] ${
            isPrompt ? "aspect-[4/3] md:aspect-auto" : "aspect-[3/4] md:aspect-auto"
          } min-h-[300px] md:min-h-[500px]`}
        >
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          <div className="absolute top-4 left-4">
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#FAF9F5]/90 backdrop-blur-xs text-[#121212] border border-[#E7E5E0]">
              {isPrompt
                ? product.promptDetails?.aiEngine || "Prompt Formula"
                : product.merchDetails?.merchType || "Garment Edition"}
            </span>
          </div>
        </div>

        {/* Content Column */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
                Archival Record • Vol. 01
              </span>
              <span className="font-serif text-2xl text-[#121212] font-normal">
                ${displayPrice.toFixed(2)}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal tracking-tight">
              {product.title}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
              {product.description || product.shortDescription}
            </p>

            {/* Fourthwall Variant Selector for Merch */}
            {!isPrompt && product.variants && product.variants.length > 1 && (
              <div className="mt-6 pt-4 border-t border-[#E7E5E0]">
                <label className="text-[10px] uppercase tracking-[0.2em] text-[#121212] font-semibold block mb-2">
                  Select Dimension / Specimen
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariantId(variant.id)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-colors ${
                        activeVariantId === variant.id
                          ? "bg-[#121212] text-[#FAF9F5] border-[#121212]"
                          : "bg-white text-[#666662] border-[#E7E5E0] hover:text-[#121212] hover:border-[#121212]"
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specifications Grid */}
            <div className="mt-6 pt-6 border-t border-[#E7E5E0] space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#121212] font-semibold block">
                Archival Specifications
              </span>

              {isPrompt && product.promptDetails && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 border border-[#E7E5E0] bg-[#FFFFFF]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Target Engine
                    </span>
                    <span className="font-medium text-[#121212] mt-0.5 block">
                      {product.promptDetails.aiEngine}
                    </span>
                  </div>
                  <div className="p-2.5 border border-[#E7E5E0] bg-[#FFFFFF]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Aspect Formats
                    </span>
                    <span className="font-medium text-[#121212] mt-0.5 block">
                      {product.promptDetails.aspectRatios.join(", ")}
                    </span>
                  </div>
                </div>
              )}

              {!isPrompt && product.merchDetails && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 border border-[#E7E5E0] bg-[#FFFFFF]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Material Quality
                    </span>
                    <span className="font-medium text-[#121212] mt-0.5 block truncate">
                      {product.merchDetails.material}
                    </span>
                  </div>
                  <div className="p-2.5 border border-[#E7E5E0] bg-[#FFFFFF]">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Print Specification
                    </span>
                    <span className="font-medium text-[#121212] mt-0.5 block truncate">
                      {product.merchDetails.printDetails}
                    </span>
                  </div>
                </div>
              )}

              {/* Prompt Snippet if available */}
              {isPrompt && product.promptDetails?.promptPreviewSnippet && (
                <div className="mt-3 p-3 bg-[#F5F3EE] border border-[#E7E5E0]">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-medium">
                      Formula Blueprint Preview
                    </span>
                    <button
                      onClick={handleCopyPrompt}
                      className="text-[10px] uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] flex items-center gap-1 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 stroke-[2]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3 stroke-[1.5]" />
                          <span>Copy Formula</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-[11px] text-[#242424] leading-relaxed break-all">
                    {product.promptDetails.promptPreviewSnippet}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-8 pt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {!isPrompt ? (
              <button
                onClick={handleAddToBag}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#121212] text-xs uppercase tracking-[0.2em] font-medium text-[#FAF9F5] hover:bg-[#262626] transition-colors"
              >
                <Plus className="h-3.5 w-3.5 stroke-[1.5]" />
                <span>Add to Archive Bag</span>
              </button>
            ) : (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#121212] text-xs uppercase tracking-[0.2em] font-medium text-[#FAF9F5] hover:bg-[#262626] transition-colors"
              >
                <span>Acquire Blueprint on PromptBase</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
