"use client";

import React from "react";
import Image from "next/image";
import { Eye, Plus, ArrowUpRight } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  priority?: boolean;
}

export default function ProductCard({
  product,
  onQuickView,
  priority = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const isPrompt = product.category === "prompt";
  const imageSrc =
    product.primaryImage ||
    (product as unknown as { image?: string }).image ||
    "";
  const categoryLabel = isPrompt
    ? product.promptDetails?.aiEngine || "Prompt Formula"
    : product.merchDetails?.merchType || "Physical Edition";

  return (
    <article className="group relative flex flex-col p-3 bg-white border border-[#E7E5E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(18,18,18,0.08)] transition-all duration-300">
      {/* Museum Passe-Partout Framed Art Container */}
      <div
        onClick={() => onQuickView(product)}
        className={`relative w-full overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0]/60 cursor-pointer ${
          isPrompt ? "aspect-[4/3]" : "aspect-[3/4]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />

        {/* Embossed Archival Seal */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.2em] bg-[#FAF9F5]/95 backdrop-blur-xs text-[#121212] border border-[#E7E5E0] shadow-2xs">
            {categoryLabel}
          </span>
          {product.isMostPurchased && (
            <span className="px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest bg-[#121212] text-[#FAF9F5]">
              Edition 01
            </span>
          )}
        </div>

        {/* Hover Action Indicator */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/15 pointer-events-none">
          <div className="w-20 h-20 rounded-full border border-white/90 bg-white/40 backdrop-blur-xs flex items-center justify-center text-white shadow-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white drop-shadow-xs">
              Discover
            </span>
          </div>
        </div>
      </div>

      {/* Editorial Content Suite */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
              {isPrompt ? "Computational Formula" : "Physical Edition"}
            </span>
            <span className="font-serif text-sm text-[#121212] font-medium">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-base text-[#121212] font-normal tracking-tight line-clamp-1 hover:text-[#7A6A5C] cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          <p className="mt-1 text-xs text-[#666662] line-clamp-2 leading-relaxed font-light">
            {product.shortDescription || product.description}
          </p>
        </div>

        {/* Action Row */}
        <div className="mt-4 pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="text-xs uppercase tracking-widest text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1"
            >
              <Eye className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Inspect</span>
            </button>

            {/* Prompts bypass cart; Merch adds to bag */}
            {!isPrompt ? (
              <button
                type="button"
                onClick={() => addItem(product, 1, product.fourthwallVariantId)}
                className="text-xs uppercase tracking-widest text-[#7A6A5C] hover:text-[#121212] transition-colors flex items-center gap-1"
              >
                <Plus className="h-3.5 w-3.5 stroke-[1.5]" />
                <span>Add to Bag</span>
              </button>
            ) : (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-widest text-[#7A6A5C] hover:text-[#121212] transition-colors flex items-center gap-1"
              >
                <span>Acquire</span>
                <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
              </a>
            )}
          </div>

          <a
            href={product.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-wider text-[#666662] hover:text-[#121212] transition-colors flex items-center gap-0.5"
            title={isPrompt ? "View on PromptBase" : "Fourthwall Edition"}
          >
            <span>{isPrompt ? "PromptBase" : "Fourthwall"}</span>
            <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
          </a>
        </div>
      </div>
    </article>
  );
}
