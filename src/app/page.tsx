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

  useEffect(() => {
    getLiveProducts().then((live) => {
      if (live && live.length > 0) {
        setProducts(live);
      }
    });
  }, []);

  const featured = getFeaturedProducts(products);
  const recentlyAdded = getRecentlyAddedProducts(products);
  const mostPurchased = getMostPurchasedProducts(products);

  // Pick lead product for the hero editorial visual
  const heroProduct = featured[0] || products[0];

  return (
    <div className="bg-[#FAF9F5] text-[#121212]">
      {/* 1. EDITORIAL HERO SPREAD */}
      <section className="border-b border-[#E7E5E0] pt-12 sm:pt-20 pb-16 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Masthead Sub-bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5E0] pb-4 mb-10 text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#121212]">ISSUE NO. 01</span>
              <span>•</span>
              <span>AUTUMN / WINTER ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212]" />
              <span>OFFICIAL DISPATCH • PROMPTBASE & REDBUBBLE VERIFIED</span>
            </div>
          </div>

          {/* Hero Editorial Asymmetrical Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Locked Manifesto */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block">
                  Studio Manifesto • Vol. 01
                </span>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#121212] font-normal leading-[1.12] tracking-tight">
                  PLAYKIT 01 — An independent creative studio exploring the intersection of generative prompt architecture and physical editions.
                </h1>
              </div>

              <p className="text-sm sm:text-base text-[#666662] max-w-xl leading-relaxed font-light">
                We design deterministic prompt formulas for Gemini, Claude, and Midjourney, alongside heavyweight streetwear garments and archival objects. Every release is verified and fulfilled globally.
              </p>

              {/* Editorial Action Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs uppercase tracking-[0.2em]">
                <Link
                  href="/prompts"
                  className="px-8 py-4 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Sparkles className="h-3.5 w-3.5 stroke-[1.5]" />
                  <span>The Prompt Archive</span>
                </Link>

                <Link
                  href="/merch"
                  className="px-8 py-4 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Shirt className="h-3.5 w-3.5 stroke-[1.5]" />
                  <span>Physical Garments</span>
                </Link>
              </div>

              {/* Colophon Social Footnote */}
              <div className="pt-6 border-t border-[#E7E5E0] flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-wider text-[#666662]">
                <span className="text-[#121212] font-semibold">Verified Outlets:</span>
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
                <a
                  href={brandConfig.socials.redbubble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121212] transition-colors flex items-center gap-1"
                >
                  <span>Redbubble @playkit01</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset (Priority & Quality 90) */}
            <div className="lg:col-span-5">
              <div
                onClick={() => heroProduct && setSelectedProduct(heroProduct)}
                className="group relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0] cursor-pointer"
              >
                <Image
                  src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1200&auto=format&fit=crop&q=90"
                  alt="Playkit01 Editorial Feature"
                  fill
                  priority={true}
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Corner Archival Stamp */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#FAF9F5]/90 backdrop-blur-xs text-[#121212] border border-[#E7E5E0]">
                    Featured Edition
                  </span>
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-stone-300 block">
                    Curated Release 01
                  </span>
                  <p className="font-serif text-lg text-white font-normal mt-0.5">
                    Retro Emblem & Graphic Blueprints
                  </p>
                </div>

                {/* Custom Hover Action Indicator - strictly pointer-events-none */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/15 pointer-events-none">
                  <div className="w-24 h-24 rounded-full border border-white/90 bg-white/30 backdrop-blur-xs flex items-center justify-center text-white shadow-sm transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-white drop-shadow-xs">
                      Discover
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE OF CONTENTS / CATEGORY INDEX */}
      <section className="border-b border-[#E7E5E0] bg-[#F5F3EE]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E7E5E0]">
            <Link
              href="/prompts"
              className="group py-8 sm:py-10 pr-0 md:pr-8 flex items-center justify-between hover:bg-[#FAF9F5] transition-colors duration-200"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block mb-1">
                  Directory 01
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                  The Prompt Archive
                </h3>
                <p className="text-xs text-[#666662] mt-1 font-light">
                  Formulas for Gemini Image, Claude, DALL-E & Midjourney
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#666662] group-hover:text-[#121212] group-hover:translate-x-1.5 transition-all stroke-[1.5]" />
            </Link>

            <Link
              href="/merch"
              className="group py-8 sm:py-10 pl-0 md:pl-8 flex items-center justify-between hover:bg-[#FAF9F5] transition-colors duration-200"
            >
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block mb-1">
                  Directory 02
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                  Physical Editions & Garments
                </h3>
                <p className="text-xs text-[#666662] mt-1 font-light">
                  Heavyweight tees, vinyl sticker packs, ceramics & hoodies
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-[#666662] group-hover:text-[#121212] group-hover:translate-x-1.5 transition-all stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SELECTED WORKS (FEATURED SPREAD) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionHeader
          title="Selected Works"
          subtitle="Top releases across computational blueprints and physical apparel, hand-curated for aesthetic precision."
          badge="Collection Issue 01"
          viewAllHref="/prompts"
          viewAllText="Explore all blueprints"
        />

        {/* Mobile Stacking (<768px collapses into single-column full-bleed with hairlines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {featured.slice(0, 4).map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
              priority={idx < 2}
            />
          ))}
        </div>
      </section>

      {/* 4. PERMANENT COLLECTION (MOST PURCHASED) */}
      <section className="border-t border-[#E7E5E0] bg-[#F5F3EE] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="The Permanent Collection"
            subtitle="The highest-rated editions with verified acquisitions on PromptBase and Redbubble."
            badge="Archival Standards"
            viewAllHref="/merch"
            viewAllText="Explore all editions"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
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

      {/* 5. FRESH EDITIONS (RECENTLY ADDED DROPS) */}
      <section className="border-t border-[#E7E5E0] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <SectionHeader
          title="Recent Additions"
          subtitle="Fresh off the studio: newly calibrated prompt blueprints and newly fabricated apparel editions."
          badge="Fresh Releases"
          viewAllHref="/prompts"
          viewAllText="Browse new releases"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {recentlyAdded.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. ATELIER & VERIFIED FULFILLMENT PROTOCOL */}
      <section className="border-t border-[#E7E5E0] bg-[#FAF9F5] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-8 sm:p-14">
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
                      <strong className="text-[#121212] font-medium">Redbubble Garment Production:</strong> Direct-to-garment digital screen printing on 100% ringspun cotton, worldwide tracked logistics, and 30-day returns.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-[#E7E5E0] bg-[#FAF9F5] hover:bg-[#F5F3EE] transition-colors flex items-center justify-between group block"
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

                <a
                  href={brandConfig.socials.redbubble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 border border-[#E7E5E0] bg-[#FAF9F5] hover:bg-[#F5F3EE] transition-colors flex items-center justify-between group block"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5C] font-semibold block">
                      Physical Garments & Goods
                    </span>
                    <span className="font-serif text-lg text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors mt-0.5 block">
                      Redbubble Shop @playkit01
                    </span>
                    <p className="text-xs text-[#666662] mt-1 font-light">
                      Heavyweight tees, vinyl stickers & mugs
                    </p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-[#121212] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform stroke-[1.5]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW EDITORIAL MODAL */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
