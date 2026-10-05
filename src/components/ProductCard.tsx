"use client";

import React from "react";
import {
  Sparkles,
  Shirt,
  Star,
  ExternalLink,
  Eye,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const isPrompt = product.category === "prompt";

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-3.5 transition-all duration-300 hover:border-violet-500/50 hover:bg-slate-900 hover:shadow-xl hover:shadow-violet-950/20">
      {/* Thumbnail Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-950">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-semibold rounded-md backdrop-blur-md border ${
              isPrompt
                ? "bg-cyan-950/80 text-cyan-300 border-cyan-800/60"
                : "bg-rose-950/80 text-rose-300 border-rose-800/60"
            }`}
          >
            {isPrompt ? (
              <Sparkles className="h-3 w-3 text-cyan-400" />
            ) : (
              <Shirt className="h-3 w-3 text-rose-400" />
            )}
            <span>{isPrompt ? "PromptBase" : "Redbubble"}</span>
          </span>

          {product.mostPurchased && (
            <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-amber-500/90 text-slate-950 shadow-sm">
              Best Seller
            </span>
          )}
          {!product.mostPurchased && product.recentlyAdded && (
            <span className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-black uppercase rounded bg-emerald-500/90 text-slate-950 shadow-sm">
              New
            </span>
          )}
        </div>

        {/* Hover Quick View Overlay button */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onQuickView(product)}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900/95 px-3.5 py-2 text-xs font-semibold text-white shadow-xl hover:bg-violet-600 transition-colors border border-slate-700 hover:border-violet-500"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Info Content */}
      <div className="flex flex-1 flex-col justify-between pt-3.5">
        <div>
          {/* Sub-category & Rating */}
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1">
            <span className="text-violet-400 font-semibold">{product.subCategory}</span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="h-3 w-3 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-500">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-100 text-sm line-clamp-1 hover:text-violet-400 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          {/* Snippet / Description */}
          <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Footer: Price & Direct External Action */}
        <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-black text-white">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-slate-500">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Quick preview"
            >
              <Eye className="h-4 w-4" />
            </button>

            <a
              href={product.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 ${
                isPrompt
                  ? "bg-cyan-600 hover:bg-cyan-500"
                  : "bg-rose-600 hover:bg-rose-500"
              }`}
              title={`Buy on ${isPrompt ? "PromptBase" : "Redbubble"}`}
            >
              <span>{isPrompt ? "Prompt" : "Merch"}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
