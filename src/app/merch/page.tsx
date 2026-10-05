"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  Shirt,
} from "lucide-react";
import {
  Product,
  initialProducts,
  getLiveProducts,
  getMerchProducts,
} from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

export default function MerchPage() {
  const [products, setProducts] = useState<Product[]>(
    getMerchProducts(initialProducts)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    getLiveProducts().then((live) => {
      if (live && live.length > 0) {
        setProducts(getMerchProducts(live));
      }
    });
  }, []);

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
    return products
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some((t) =>
            t.toLowerCase().includes(searchQuery.toLowerCase())
          );

        const matchesType =
          selectedType === "All" ||
          item.merchDetails?.merchType === selectedType;

        return matchesSearch && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [products, searchQuery, selectedType, sortBy]);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Masthead */}
        <div className="border-b border-[#E7E5E0] pb-10 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              Directory 02 • Physical Garments & Objects
            </span>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#666662]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
              <span>Redbubble Verified Fulfilled Edition</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#121212] font-normal tracking-tight">
            Physical Editions
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] max-w-2xl leading-relaxed font-light">
            Heavyweight 220 GSM ringspun cotton tees, waterproof UV-coated vinyl sticker packs, and glossy ceramic drinkware printed on-demand and dispatched worldwide via Redbubble with tracked delivery.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-[#666662]">
            <a
              href={brandConfig.socials.redbubble}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1 font-semibold"
            >
              <span>Redbubble Store @playkit01</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
            </a>
            <span>•</span>
            <span>Global Tracked Dispatch</span>
            <span>•</span>
            <span>30-Day Guarantee</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E7E5E0]">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#666662] stroke-[1.5]" />
            <input
              type="text"
              placeholder="Search garments by keyword or format..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#FFFFFF] border border-[#E7E5E0] text-[#121212] placeholder-[#666662] focus:outline-none focus:border-[#121212] transition-colors"
            />
          </div>

          {/* Type Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {merchTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setSelectedType(type)}
                className={`px-3.5 py-2 text-xs uppercase tracking-widest whitespace-nowrap transition-colors border ${
                  selectedType === type
                    ? "bg-[#121212] text-[#FAF9F5] border-[#121212]"
                    : "bg-[#FFFFFF] text-[#666662] border-[#E7E5E0] hover:text-[#121212] hover:border-[#121212]"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#666662] stroke-[1.5]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FFFFFF] text-xs text-[#121212] uppercase tracking-wider border border-[#E7E5E0] px-3 py-2.5 focus:outline-none focus:border-[#121212]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-[#666662] uppercase tracking-wider mb-8">
          <span>
            Physical Catalog: <strong className="text-[#121212] font-semibold">{filteredMerch.length}</strong> Editions
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#121212] hover:text-[#7A6A5C] underline underline-offset-4"
            >
              Reset filter &ldquo;{searchQuery}&rdquo;
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredMerch.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredMerch.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 border border-[#E7E5E0] bg-[#FFFFFF]">
            <Shirt className="h-8 w-8 text-[#7A6A5C] mx-auto mb-3 stroke-[1.5]" />
            <h3 className="font-serif text-lg text-[#121212]">
              No Physical Editions Found in This Category
            </h3>
            <p className="text-xs text-[#666662] mt-1 max-w-sm mx-auto font-light">
              Try adjusting your query or resetting category filters to inspect all garments and objects.
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
