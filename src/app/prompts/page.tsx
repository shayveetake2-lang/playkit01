"use client";

import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Search,
  SlidersHorizontal,
  ExternalLink,
  Zap,
  CheckCircle,
} from "lucide-react";
import { getPrompts, Product } from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

export default function PromptsPage() {
  const allPrompts = useMemo(() => getPrompts(), []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEngine, setSelectedEngine] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const engines = [
    "All",
    "Midjourney v6",
    "DALL-E 3",
    "ChatGPT / Claude",
    "Stable Diffusion XL",
  ];

  const filteredPrompts = useMemo(() => {
    return allPrompts
      .filter((prompt) => {
        const matchesSearch =
          prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          prompt.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesEngine =
          selectedEngine === "All" ||
          prompt.promptDetails?.aiEngine === selectedEngine;

        return matchesSearch && matchesEngine;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.salesCount - a.salesCount;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        return 0;
      });
  }, [allPrompts, searchQuery, selectedEngine, sortBy]);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="relative rounded-3xl border border-cyan-900/40 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 p-8 sm:p-12 mb-10 overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 mb-4">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span>PromptBase Curated Collection</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              AI Prompts & Generator Blueprints
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore battle-tested prompt architectures designed to generate consistent commercial-grade imagery, UI assets, and high-converting marketing copy. Fulfilled instantly via PromptBase.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-200">
                <CheckCircle className="h-4 w-4 text-cyan-400" /> Tested on 50+ Seeds
              </span>
              <span className="flex items-center gap-1.5 text-slate-200">
                <Zap className="h-4 w-4 text-amber-400" /> Instant Variable Reveal
              </span>
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Visit PromptBase Profile</span>
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
              placeholder="Search prompts by keyword, aesthetic, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Engine Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {engines.map((engine) => (
              <button
                key={engine}
                type="button"
                onClick={() => setSelectedEngine(engine)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedEngine === engine
                    ? "bg-cyan-600 text-white shadow-md shadow-cyan-950"
                    : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
                }`}
              >
                {engine}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-950 text-xs text-slate-300 border border-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500"
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
            Showing <strong className="text-white">{filteredPrompts.length}</strong> AI prompt blueprints
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-cyan-400 hover:underline"
            >
              Clear search &quot;{searchQuery}&quot;
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredPrompts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPrompts.map((prompt) => (
              <ProductCard
                key={prompt.id}
                product={prompt}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-800 rounded-2xl bg-slate-950/40">
            <Sparkles className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">No Prompts Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or selecting &quot;All&quot; engines.
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
