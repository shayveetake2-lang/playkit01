"use client";

import React, { useState, useMemo } from "react";
import {
  Shirt,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Truck,
  ShieldCheck,
  CheckCircle,
  Tag,
} from "lucide-react";
import { getMerch, Product } from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

export default function MerchPage() {
  const allMerch = useMemo(() => getMerch(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const merchTypes = [
    "All",
    "T-Shirt",
    "Sticker",
    "Mug",
    "Hoodie",
    "Phone Case",
    "Poster",
  ];

  const filteredMerch = useMemo(() => {
    return allMerch
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesType =
          selectedType === "All" ||
          item.merchDetails?.merchType === selectedType;

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.salesCount - a.salesCount;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [allMerch, searchQuery, selectedType, sortBy]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="relative rounded-3xl border border-rose-900/40 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 p-8 sm:p-12 mb-10 overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/50 mb-4">
              <Shirt className="h-3.5 w-3.5 text-rose-400" />
              <span>Redbubble Official Collection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              T-Shirts, Stickers, Mugs & Studio Gear
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Streetwear aesthetic meets cybernetic tech art. Heavyweight 220 GSM cotton tees, holographic UV-coated vinyl stickers, and glossy ceramic drinkware printed on-demand and shipped worldwide via Redbubble.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <Truck className="h-4 w-4 text-rose-400" /> Global Tracked Shipping
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> 30-Day Money-Back Guarantee
              </span>
              <a
                href={brandConfig.socials.redbubble}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold"
              >
                <span>Visit Redbubble Shop</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by apparel type, sticker name, or artwork theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
            />
          </div>

          {/* Product Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {merchTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedType === type
                    ? "bg-rose-600 text-white shadow-md shadow-rose-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-xs text-slate-300 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-rose-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredMerch.length}</strong> physical merchandise items
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-rose-400 hover:underline"
            >
              Clear search &quot;{searchQuery}&quot;
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredMerch.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMerch.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
            <Shirt className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Merch Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or selecting &quot;All&quot; types.
            </p>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
