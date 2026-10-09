"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Shirt,
  ShieldCheck,
  CheckCircle,
  Binary,
  Layers,
} from "lucide-react";
import {
  Product,
  initialProducts,
  getLiveProducts,
  getFeaturedProducts,
  getRecentlyAddedProducts,
  getMostPurchasedProducts,
} from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import SectionHeader from "@/components/SectionHeader";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedChapterTab, setSelectedChapterTab] = useState<"all" | "prompts" | "merch">("all");

  useEffect(() => {
    getLiveProducts().then((live) => {
      if (live && live.length > 0) {
        setProducts(live);
      }
    });
  }, []);

  const promptProducts = products.filter((p) => p.category === "prompt");
  const merchProducts = products.filter((p) => p.category === "merch");

  const featured = getFeaturedProducts(products);
  const featuredPrompts = featured.filter((p) => p.category === "prompt");
  const featuredMerch = featured.filter((p) => p.category === "merch");
  const recentlyAdded = getRecentlyAddedProducts(products);
  const mostPurchased = getMostPurchasedProducts(products);

  // Balanced hybrid for Selected Works: 4 top prompts + 4 top Fourthwall physical items
  const selectedWorksItems =
    selectedChapterTab === "all"
      ? [
          ...(featuredPrompts.length > 0 ? featuredPrompts.slice(0, 4) : promptProducts.slice(0, 4)),
          ...(featuredMerch.length > 0 ? featuredMerch.slice(0, 4) : merchProducts.slice(0, 4)),
        ]
      : selectedChapterTab === "prompts"
      ? (featuredPrompts.length > 0 ? featuredPrompts.slice(0, 8) : promptProducts.slice(0, 8))
      : (featuredMerch.length > 0 ? featuredMerch.slice(0, 8) : merchProducts.slice(0, 8));

  // Real Fourthwall item for the hero curated specimen
  const heroMerchProduct =
    merchProducts.find((p) => p.isFeatured) || merchProducts[0] || products[0];

  return (
    <div className="bg-[#FAF9F5] text-[#121212]">
      {/* 1. COMPACT EDITORIAL HERO SPREAD */}
      <section className="border-b border-[#E7E5E0] pt-6 sm:pt-8 pb-8 sm:pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Masthead Subline */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E0] pb-3 mb-6 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#121212]">ISSUE NO. 01</span>
              <span>•</span>
              <span>AUTUMN / WINTER ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212]" />
              <span className="truncate">
                OFFICIAL DISPATCH • PROMPTBASE & FOURTHWALL VERIFIED
              </span>
            </div>
          </div>

          {/* Hero Editorial Asymmetrical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Locked Manifesto, 3-Section Buttons & Inline Telemetry */}
            <div className="lg:col-span-7 space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block">
                  Studio Manifesto • Vol. 01
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-[40px] text-[#121212] font-normal leading-[1.16] tracking-tight">
                  PLAYKIT 01 — An independent creative studio exploring the intersection of{" "}
                  <span className="italic font-normal">generative prompt architecture</span> and{" "}
                  <span className="italic font-normal">physical editions.</span>
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-[#666662] max-w-xl leading-relaxed font-light">
                Engineering deterministic prompt formulas for Gemini Image, Claude, and Midjourney alongside heavyweight streetwear and archival physical goods fulfilled globally via Fourthwall.
              </p>

              {/* Compact Inline Studio Metrics Counter Bar */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-6 border-y border-[#E7E5E0] py-3 text-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    14+
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Blueprints
                  </span>
                </div>
                <span className="text-[#E7E5E0] hidden sm:inline">•</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    31+
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Fourthwall Editions
                  </span>
                </div>
                <span className="text-[#E7E5E0] hidden sm:inline">•</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    5.0★
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Store Rating
                  </span>
                </div>
                <span className="text-[#E7E5E0] hidden sm:inline">•</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    220 GSM
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Cotton Standard
                  </span>
                </div>
              </div>

              {/* 3 Core Section Quick Navigation Buttons */}
              <div className="space-y-2 pt-1">
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
                  Quick Navigation • 3 Core Sections
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs uppercase tracking-[0.16em]">
                  <Link
                    href="/prompts"
                    className="px-4 py-3 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-all flex items-center justify-center gap-2 font-medium shadow-xs group"
                  >
                    <Sparkles className="h-3.5 w-3.5 stroke-[1.5] text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate">The Prompt Archive</span>
                  </Link>

                  <Link
                    href="/merch"
                    className="px-4 py-3 border-2 border-[#121212] bg-white text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-all flex items-center justify-center gap-2 font-medium shadow-xs group"
                  >
                    <Shirt className="h-3.5 w-3.5 stroke-[1.5] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate">Physical Editions</span>
                  </Link>

                  <a
                    href="#creator"
                    className="px-4 py-3 border border-[#D4D0C8] bg-[#F5F3EE] text-[#121212] hover:bg-[#EBE7DE] hover:border-[#121212] transition-all flex items-center justify-center gap-2 font-medium shadow-xs group"
                  >
                    <Layers className="h-3.5 w-3.5 stroke-[1.5] text-[#7A6A5C] group-hover:scale-110 transition-transform shrink-0" />
                    <span className="truncate">About Creator</span>
                  </a>
                </div>
              </div>

              {/* Verified Outlets Footnote */}
              <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-wider text-[#666662]">
                <span className="text-[#121212] font-semibold">Verified Channels:</span>
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121212] transition-colors flex items-center gap-1"
                >
                  <span>PromptBase @ploykit</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
                <span>•</span>
                <Link
                  href="/merch"
                  className="hover:text-[#121212] transition-colors flex items-center gap-1 font-medium text-[#121212]"
                >
                  <span>Fourthwall Storefront</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Real Fourthwall Product Spotlight Plate */}
            <div className="lg:col-span-5 relative">
              <div
                onClick={() => heroMerchProduct && setSelectedProduct(heroMerchProduct)}
                className="group relative p-3 sm:p-4 bg-white border border-[#E7E5E0] shadow-[0_4px_24px_rgba(18,18,18,0.06),0_1px_4px_rgba(18,18,18,0.03)] cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0]/60">
                  <Image
                    src={heroMerchProduct.primaryImage || "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=90"}
                    alt={heroMerchProduct.title}
                    fill
                    priority={true}
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />

                  {/* Archival Stamp */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold bg-[#FAF9F5]/95 backdrop-blur-xs text-[#121212] border border-[#E7E5E0] shadow-2xs">
                      Curated Edition • Fourthwall
                    </span>
                  </div>

                  {/* Hover Action Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/15 pointer-events-none">
                    <div className="w-20 h-20 rounded-full border border-white/90 bg-white/40 backdrop-blur-xs flex items-center justify-center text-white shadow-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white drop-shadow-xs">
                        Inspect
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtitle Caption */}
                <div className="pt-3 flex items-center justify-between text-xs">
                  <span className="font-serif italic text-[#121212] truncate max-w-[220px]">
                    {heroMerchProduct.title}
                  </span>
                  <span className="font-mono text-[11px] text-[#121212] font-semibold">
                    ${heroMerchProduct.price.toFixed(2)}
                  </span>
                </div>

                {/* Archival Specimen Swatch Card (z-20 stacking tier) */}
                <div className="mt-3 pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-[11px] text-[#666662]">
                  <div className="flex items-center gap-1.5">
                    <Binary className="h-3 w-3 text-[#7A6A5C] stroke-[1.5]" />
                    <span>Fourthwall Tracked Logistics</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#7A6A5C] uppercase tracking-wider">
                    {heroMerchProduct.merchDetails?.merchType || "Physical Edition"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. HOW IT WORKS EDITORIAL GUIDE */}
      <section className="border-b border-[#E7E5E0] bg-[#FAF9F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[#E7E5E0] pb-3 mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-[#121212]">METHODOLOGY</span>
              <span>•</span>
              <span>THREE-STEP ACQUISITION WORKFLOW</span>
            </div>
            <span className="font-mono text-[9px] hidden sm:inline">PROTOCOL 01</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 divide-y md:divide-y-0 divide-[#E7E5E0] border border-[#E7E5E0] md:border-0">
            {/* Step 1: Discover */}
            <div className="p-5 sm:p-6 bg-white border-0 md:border md:border-[#E7E5E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [01]
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                    Exploration
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal mb-2">
                  Discover
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                  Browse digital formulas or physical artifacts. Hand-curated blueprints stress-tested across premier AI engines alongside archival heavyweight apparel.
                </p>
              </div>
            </div>

            {/* Step 2: Acquire */}
            <div className="p-5 sm:p-6 bg-white border-0 md:border md:border-[#E7E5E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [02]
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                    Fulfillment
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal mb-2">
                  Acquire
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                  Instant digital delivery or verified Fourthwall physical dispatch. Direct access to prompt variables and parameters, or worldwide tracked apparel logistics.
                </p>
              </div>
            </div>

            {/* Step 3: Create */}
            <div className="p-5 sm:p-6 bg-white border-0 md:border md:border-[#E7E5E0] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [03]
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                    Execution
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal mb-2">
                  Create
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                  Apply prompts to your workflow or wear your gear. Seamlessly integrate calibrated outputs into production pipelines or represent the studio in standard cotton.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTINUOUS EDITORIAL MARQUEE TICKER (35s Majestic Pace with Hover-to-Pause) */}
      <section className="border-b border-[#E7E5E0] bg-[#F5F3EE] overflow-hidden py-3">
        <div className="animate-marquee items-center gap-8 text-[11px] uppercase tracking-[0.25em] text-[#121212] font-medium whitespace-nowrap">
          <span>ISSUE 01 • COMPUTATIONAL FORMULAS</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>VERIFIED ON PROMPTBASE ARCHIVE</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>FOURTHWALL ARCHIVAL APPAREL</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>100% COMBED COTTON APPAREL</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>DETERMINISTIC SEED ARCHITECTURE</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>ZERO PLACEHOLDERS</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>GEMINI IMAGE & CLAUDE CALIBRATED</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>LIMITED VOLUME EDITIONS</span>
          <span className="text-[#7A6A5C]">•</span>
          {/* Loop repeat duplicate */}
          <span>ISSUE 01 • COMPUTATIONAL FORMULAS</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>VERIFIED ON PROMPTBASE ARCHIVE</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>FOURTHWALL ARCHIVAL APPAREL</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>100% COMBED COTTON APPAREL</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>DETERMINISTIC SEED ARCHITECTURE</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>ZERO PLACEHOLDERS</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>GEMINI IMAGE & CLAUDE CALIBRATED</span>
          <span className="text-[#7A6A5C]">•</span>
          <span>LIMITED VOLUME EDITIONS</span>
        </div>
      </section>

      {/* 3. TABLE OF CONTENTS / 3-SECTION DIRECTORY INDEX */}
      <section className="border-b border-[#E7E5E0] bg-[#FAF9F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E7E5E0]">
            {/* Section 01: Prompt Archive */}
            <Link
              href="/prompts"
              className="group py-6 sm:py-8 px-0 md:px-6 first:pl-0 last:pr-0 flex items-center justify-between hover:bg-[#F5F3EE] transition-colors duration-200"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [01] Directory
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-white border border-[#E7E5E0] text-[#121212]">
                    14+ Blueprints
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                  The Prompt Archive
                </h3>
                <p className="text-xs text-[#666662] mt-1 font-light line-clamp-1">
                  Deterministic formulas for Gemini, Claude & Midjourney
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#666662] group-hover:text-[#121212] group-hover:translate-x-1.5 transition-all stroke-[1.5] shrink-0 ml-3" />
            </Link>

            {/* Section 02: Physical Editions */}
            <Link
              href="/merch"
              className="group py-6 sm:py-8 px-0 md:px-6 flex items-center justify-between hover:bg-[#F5F3EE] transition-colors duration-200"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [02] Directory
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-[#121212] text-[#FAF9F5]">
                    31+ Editions
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                  Physical Editions & Garments
                </h3>
                <p className="text-xs text-[#666662] mt-1 font-light line-clamp-1">
                  Heavyweight tees, hoodies, phone cases & objects via Fourthwall
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#666662] group-hover:text-[#121212] group-hover:translate-x-1.5 transition-all stroke-[1.5] shrink-0 ml-3" />
            </Link>

            {/* Section 03: Creator Dossier */}
            <a
              href="#creator"
              className="group py-6 sm:py-8 px-0 md:px-6 last:pr-0 flex items-center justify-between hover:bg-[#F5F3EE] transition-colors duration-200"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [03] Directory
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-white border border-[#E7E5E0] text-[#7A6A5C]">
                    Atelier Dossier
                  </span>
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                  About the Creator
                </h3>
                <p className="text-xs text-[#666662] mt-1 font-light line-clamp-1">
                  Full-stack engineer, AI prompt research & studio monograph
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#666662] group-hover:text-[#121212] group-hover:translate-x-1.5 transition-all stroke-[1.5] shrink-0 ml-3" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CHAPTER I: SELECTED WORKS (FEATURED SPREAD WITH CATEGORY TABS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <SectionHeader
          chapter="NO. I"
          title="Selected Works"
          subtitle="Top releases across computational blueprints and physical apparel, hand-curated for aesthetic precision."
          badge="Collection Issue 01"
          viewAllHref={selectedChapterTab === "merch" ? "/merch" : "/prompts"}
          viewAllText={selectedChapterTab === "merch" ? "Explore physical archive" : "Explore all blueprints"}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E7E5E0] pb-3 text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setSelectedChapterTab("all")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedChapterTab === "all"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            All Releases ({promptProducts.length + merchProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedChapterTab("prompts")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedChapterTab === "prompts"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            AI Prompt Blueprints ({promptProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedChapterTab("merch")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedChapterTab === "merch"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            Physical Editions ({merchProducts.length})
          </button>
        </div>

        {/* Museum Matting Product Grid with Single-Column Mobile Stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedWorksItems.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
              priority={idx < 2}
            />
          ))}
        </div>
      </section>

      {/* 4.2. CHAPTER II: PHYSICAL EDITIONS ARCHIVE (FOURTHWALL SHOWCASE) */}
      <section className="bg-[#F5F3EE] border-y border-[#E7E5E0] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            chapter="NO. II"
            title="Physical Editions Archive"
            subtitle="Archival heavyweight streetwear garments, impact-resistant cases, candles, and accessories fulfilled globally via Fourthwall."
            badge="Fourthwall Verified"
            viewAllHref="/merch"
            viewAllText="Explore all 31 physical editions"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {merchProducts.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4.5. ABOUT THE CREATOR (ARCHIVAL FOUNDER PROFILE) */}
      <section id="creator" className="scroll-mt-24 border-t border-[#E7E5E0] bg-[#FAF9F5] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-8 sm:p-14 lg:p-16 shadow-[0_4px_24px_rgba(18,18,18,0.04)]">
            {/* Dossier Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5E0] pb-6 mb-10 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-[#121212]">[CHAPTER NO. 00]</span>
                <span>•</span>
                <span>CREATOR DOSSIER</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212]" />
                <span>FOUNDER & ATELIER PROFILE</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Creator Bio & Studio Vision */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
                    About the Creator
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121212] font-normal leading-[1.15] tracking-tight">
                    Engineering deterministic AI intelligence & archival physical streetwear.
                  </h2>
                </div>

                <p className="font-serif text-lg sm:text-xl text-[#121212] leading-relaxed font-normal pt-2">
                  PLAYKIT 01 is founded by a full-stack software engineer specializing in custom web applications, autonomous AI agents, and high-performance prompts that streamline business workflows.
                </p>

                <div className="space-y-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light pt-2 border-t border-[#E7E5E0]">
                  <p>
                    Rooted at the convergence of software craftsmanship and generative model research, the studio develops deterministic prompt formulas designed to eliminate AI hallucination and prompt pollution across Gemini Image, Claude, and Midjourney.
                  </p>
                  <p>
                    Simultaneously, the physical arm of PLAYKIT 01 translates this cyber-aesthetic discipline into tangible heavyweight cotton streetwear, impact-resistant cases, and archival editions—fabricated to exacting standards and fulfilled globally via Fourthwall.
                  </p>
                </div>

                {/* Creator Metrics */}
                <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[#E7E5E0]">
                  <div>
                    <span className="font-serif text-2xl text-[#121212] block">31+</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#7A6A5C] font-semibold block mt-0.5">
                      Fourthwall Editions
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl text-[#121212] block">14+</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#7A6A5C] font-semibold block mt-0.5">
                      Prompt Blueprints
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl text-[#121212] block">5.0★</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#7A6A5C] font-semibold block mt-0.5">
                      Store Rating
                    </span>
                  </div>
                  <div>
                    <span className="font-serif text-2xl text-[#121212] block">220 GSM</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#7A6A5C] font-semibold block mt-0.5">
                      Cotton Baseline
                    </span>
                  </div>
                </div>

                {/* Creator Links & Channels */}
                <div className="pt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
                  <Link
                    href="/studio"
                    className="px-6 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center gap-2 font-medium"
                  >
                    <span>Read Studio Monograph</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </Link>

                  <a
                    href={brandConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors flex items-center gap-2 font-medium"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Key Engineering Disciplines */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#E7E5E0] text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                  <Layers className="h-3.5 w-3.5 stroke-[1.5]" />
                  <span>Core Technical Disciplines</span>
                </div>

                <div className="space-y-3">
                  <div className="p-5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1.5 transition-colors hover:border-[#121212]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[01]</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] font-mono">AUTONOMOUS</span>
                    </div>
                    <h3 className="font-serif text-base text-[#121212] font-normal">Automated AI Agents</h3>
                    <p className="text-xs text-[#666662] font-light leading-relaxed">
                      Custom AI agents, LLM pipelines, and orchestration layers built to automate repetitive enterprise workflows.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1.5 transition-colors hover:border-[#121212]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[02]</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] font-mono">DETERMINISTIC</span>
                    </div>
                    <h3 className="font-serif text-base text-[#121212] font-normal">Calibrated Prompt Formulas</h3>
                    <p className="text-xs text-[#666662] font-light leading-relaxed">
                      Reproducible, battle-tested prompt architectures for Gemini Image, Claude, and Midjourney on PromptBase.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1.5 transition-colors hover:border-[#121212]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[03]</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] font-mono">FULL-STACK</span>
                    </div>
                    <h3 className="font-serif text-base text-[#121212] font-normal">Custom Web Applications</h3>
                    <p className="text-xs text-[#666662] font-light leading-relaxed">
                      High-performance Next.js architectures, TypeScript, headless commerce APIs, and microservice backends.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1.5 transition-colors hover:border-[#121212]">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[04]</span>
                      <span className="text-[9px] uppercase tracking-wider text-[#8C7A6B] font-mono">PHYSICAL LOGISTICS</span>
                    </div>
                    <h3 className="font-serif text-base text-[#121212] font-normal">Archival Physical Streetwear</h3>
                    <p className="text-xs text-[#666662] font-light leading-relaxed">
                      Translating cyber-aesthetic linework into heavyweight apparel, tech sleeves, and vinyl stickers fulfilled by Fourthwall.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL-WIDTH STUDIO PULL-QUOTE MANIFESTO BANNER */}
      <section className="border-y border-[#E7E5E0] bg-[#121212] text-[#FAF9F5] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block">
            Archival Philosophy
          </span>
          <blockquote className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal leading-snug tracking-tight">
            &ldquo;We do not build generic prompts. We engineer reproducible aesthetic frameworks — calibrated down to the seed token and printed on heavyweight garments.&rdquo;
          </blockquote>
          <div className="pt-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E7E5E0]/70 font-mono">
              — PLAYKIT 01 Studio Atelier
            </span>
          </div>
        </div>
      </section>

      {/* 6. CHAPTER III: PERMANENT COLLECTION (MOST PURCHASED) */}
      <section className="bg-[#F5F3EE] border-b border-[#E7E5E0] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            chapter="NO. III"
            title="The Permanent Collection"
            subtitle="The highest-rated community editions with verified acquisitions on PromptBase and Fourthwall."
            badge="Archival Standards"
            viewAllHref="/merch"
            viewAllText="Explore all editions"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mostPurchased.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. CHAPTER IV: FRESH EDITIONS (RECENTLY ADDED DROPS) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionHeader
          chapter="NO. IV"
          title="Recent Additions"
          subtitle="Fresh off the studio: newly calibrated prompt blueprints and newly fabricated apparel editions."
          badge="Fresh Releases"
          viewAllHref="/prompts"
          viewAllText="Browse new releases"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {recentlyAdded.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 8. ATELIER & VERIFIED FULFILLMENT PROTOCOL */}
      <section className="border-t border-[#E7E5E0] bg-[#FAF9F5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-8 sm:p-14 shadow-[0_4px_24px_rgba(18,18,18,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 stroke-[1.5]" />
                  <span>Atelier Protocol & Fulfillment</span>
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal tracking-tight">
                  How PLAYKIT 01 Dispatches Your Editions
                </h2>

                <p className="text-sm text-[#666662] leading-relaxed max-w-xl font-light">
                  We engineer artificial intelligence prompt formulas and streetwear designs in-house, partnering exclusively with global verification platforms for seamless acquisition and delivery:
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#121212] shrink-0 mt-0.5 stroke-[1.5]" />
                    <p className="text-xs text-[#666662] leading-relaxed">
                      <strong className="text-[#121212] font-medium">PromptBase Fulfillment:</strong> Instant access to formulas, copy-paste variable parameters, seed settings, and verified creator assistance.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-[#121212] shrink-0 mt-0.5 stroke-[1.5]" />
                    <p className="text-xs text-[#666662] leading-relaxed">
                      <strong className="text-[#121212] font-medium">Fourthwall Headless Commerce:</strong> Premium ringspun cotton screen prints, tracked worldwide logistics, and secure checkout on checkout.playkit01.store.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-[#E7E5E0] bg-[#FAF9F5] hover:bg-[#F5F3EE] transition-colors flex items-center justify-between group block shadow-2xs"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5C] font-semibold block">
                      Digital Blueprint Archive
                    </span>
                    <span className="font-serif text-lg text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors mt-0.5 block">
                      PromptBase @ploykit
                    </span>
                    <p className="text-xs text-[#666662] mt-1 font-light">
                      5.0★ verified prompt formulas
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#121212] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[1.5]" />
                </a>

                <Link
                  href="/merch"
                  className="p-6 border border-[#E7E5E0] bg-[#FAF9F5] hover:bg-[#F5F3EE] transition-colors flex items-center justify-between group block shadow-2xs"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5C] font-semibold block">
                      Physical Garments & Goods
                    </span>
                    <span className="font-serif text-lg text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors mt-0.5 block">
                      Fourthwall Physical Editions
                    </span>
                    <p className="text-xs text-[#666662] mt-1 font-light">
                      Heavyweight tees, vinyl stickers & mugs
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#121212] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[1.5]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW EDITORIAL MODAL (Strict z-60) */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
