"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  ExternalLink,
  Sparkles,
  Shirt,
  Star,
  Layers,
  Ratio,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({
  product,
  onClose,
}: ProductQuickViewModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const isPrompt = product.category === "prompt";
  const platformColor =
    product.externalPlatform === "promptbase"
      ? "bg-cyan-950/80 text-cyan-300 border-cyan-800/60"
      : "bg-rose-950/80 text-rose-300 border-rose-800/60";

  const handleCopyPrompt = () => {
    if (!product.promptDetails?.promptPreviewSnippet) return;
    navigator.clipboard.writeText(product.promptDetails.promptPreviewSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-slate-950/70 p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Media Preview Column */}
        <div className="relative h-64 md:h-auto md:w-5/12 bg-slate-950 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent md:hidden" />

          {/* Badges on image */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border ${platformColor}`}
            >
              {isPrompt ? (
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              ) : (
                <Shirt className="h-3.5 w-3.5 text-rose-400" />
              )}
              <span>{isPrompt ? "PromptBase Exclusive" : "Redbubble Merch"}</span>
            </span>

            {product.mostPurchased && (
              <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-950/90 text-amber-300 border border-amber-800/50">
                ★ Best Seller
              </span>
            )}
          </div>
        </div>

        {/* Content Column */}
        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between overflow-y-auto max-h-[calc(90vh-16rem)] md:max-h-[90vh]">
          <div>
            {/* Category / Subtitle */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400 mb-1.5">
              <span>{product.subCategory}</span>
              <span>•</span>
              <span className="flex items-center text-amber-400 gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400" />
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">
              {product.title}
            </h2>

            {/* Price Tag */}
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-2xl sm:text-3xl font-black text-slate-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm line-through text-slate-500">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
                Verified Seller
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Specific Prompt Details */}
            {isPrompt && product.promptDetails && (
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Sparkles className="h-4 w-4" /> Engine: {product.promptDetails.aiEngine}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <FileText className="h-3.5 w-3.5" /> ~{product.promptDetails.wordsCount} words
                  </span>
                </div>

                <div className="text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-slate-400 font-medium">Prompt Sample Preview:</p>
                    <button
                      type="button"
                      onClick={handleCopyPrompt}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-850 hover:bg-slate-800 text-cyan-300 border border-slate-700/60 transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Copy Preview</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-[11px] p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300/90 italic">
                    &quot;{product.promptDetails.promptPreviewSnippet}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <Ratio className="h-3.5 w-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400">Supported aspect ratios:</span>
                  <div className="flex gap-1.5">
                    {product.promptDetails.aspectRatios.map((ratio) => (
                      <span
                        key={ratio}
                        className="text-[10px] font-mono bg-slate-850 px-1.5 py-0.5 rounded text-slate-300 border border-slate-700/50"
                      >
                        {ratio}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Specific Merch Details */}
            {!isPrompt && product.merchDetails && (
              <div className="space-y-3 mb-6 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs space-y-2">
                  <div className="flex items-start gap-2">
                    <Layers className="h-4 w-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-300">Material & Quality: </span>
                      <span className="text-slate-400">{product.merchDetails.material}</span>
                    </div>
                  </div>

                  {product.merchDetails.sizes && (
                    <div className="pt-1">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                        Available Sizes:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.merchDetails.sizes.map((size) => (
                          <span
                            key={size}
                            className="text-xs font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.merchDetails.colors && (
                    <div className="pt-1">
                      <span className="text-[11px] text-slate-400 uppercase tracking-wider block mb-1">
                        Color Options:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.merchDetails.colors.map((color) => (
                          <span
                            key={color}
                            className="text-xs font-medium px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-[11px] text-slate-400 italic pt-1">
                    {product.merchDetails.printDetails}
                  </p>
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="pt-2 border-t border-slate-800/80">
            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2.5 w-full py-3.5 px-6 rounded-xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                isPrompt
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-950/50"
                  : "bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-950/50"
              }`}
            >
              <span>
                {isPrompt
                  ? `Get Prompt on PromptBase ($${product.price.toFixed(2)})`
                  : `Order on Redbubble ($${product.price.toFixed(2)})`}
              </span>
              <ExternalLink className="h-4 w-4" />
            </a>
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Opens product page securely on {isPrompt ? "PromptBase" : "Redbubble"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
