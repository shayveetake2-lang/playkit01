"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Shirt,
  Clock,
  Star,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  Product,
  getFeaturedProducts,
  getRecentlyAddedProducts,
  getMostPurchasedProducts,
} from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import SectionHeader from "@/components/SectionHeader";
import { InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const featured = getFeaturedProducts();
  const recentlyAdded = getRecentlyAddedProducts();
  const mostPurchased = getMostPurchasedProducts();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-900 bg-gradient-to-b from-violet-950/20 via-slate-950 to-slate-950 py-16 sm:py-24">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[250px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[350px] h-[250px] bg-rose-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-300 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Storefront Live on PromptBase & Redbubble</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-4xl mx-auto leading-none">
            Next-Gen AI Prompts. <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              Streetwear & Gear.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong className="text-white">playkit01</strong> — the creative hub for verified Midjourney, DALL-E & Claude prompts, plus high-density graphic tees, stickers, and mugs.
          </p>

          {/* Quick Hub Navigation CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/prompts"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg shadow-cyan-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore AI Prompts Hub</span>
            </Link>

            <Link
              href="/merch"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white shadow-lg shadow-rose-950/40 transition-all hover:scale-105 active:scale-95"
            >
              <Shirt className="h-4 w-4" />
              <span>Shop T-Shirts, Stickers & Mugs</span>
            </Link>
          </div>

          {/* Socials Connection Row */}
          <div className="mt-10 pt-6 border-t border-slate-900/80 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="text-slate-500 font-medium">Follow & Connect:</span>
            <a
              href={brandConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-pink-400 transition-colors"
            >
              <InstagramIcon className="h-4 w-4 text-pink-400" />
              <span>@playkit01 on Instagram</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <span className="text-slate-700">•</span>
            <a
              href={brandConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4 text-blue-400" />
              <span>playkit01 on LinkedIn</span>
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. DASHBOARD CATEGORY QUICK-SWITCH BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Prompts Hub Banner */}
          <Link
            href="/prompts"
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/40 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    Dedicated Prompts Page
                  </h3>
                  <p className="text-xs text-slate-400">
                    Midjourney, DALL-E 3, SDXL & Claude formulas
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>

          {/* Merch Hub Banner */}
          <Link
            href="/merch"
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-sm transition-all hover:border-rose-500/50 hover:bg-slate-900"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-950 text-rose-400 border border-rose-800/40 group-hover:scale-110 transition-transform">
                  <Shirt className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                    Dedicated Merch & Apparel Page
                  </h3>
                  <p className="text-xs text-slate-400">
                    Heavyweight tees, vinyl stickers, mugs & cases
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. FEATURED SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeader
          title="Featured Showcase"
          subtitle="Top hand-curated releases across prompts and merch, optimized for maximum impact."
          badge="Curated Picks"
          icon={Star}
          viewAllHref="/prompts"
          viewAllText="Browse all prompts"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 4. MOST PURCHASED / BEST SELLERS SECTION */}
      <section className="border-y border-slate-900 bg-slate-950/60 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Most Purchased & Popular"
            subtitle="The highest-rated community favorites with verified purchases on PromptBase & Redbubble."
            badge="Top Trending"
            icon={TrendingUp}
            viewAllHref="/merch"
            viewAllText="Browse all merch"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mostPurchased.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. RECENTLY ADDED SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <SectionHeader
          title="Recently Added Drops"
          subtitle="Fresh off the studio: newest tested prompt blueprints and freshly published merch designs."
          badge="Fresh Drops"
          icon={Clock}
          viewAllHref="/prompts"
          viewAllText="See new releases"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recentlyAdded.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 6. TRUST & STORE PLATFORM HIGHLIGHT BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-violet-950/30 p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-950/80 text-violet-300 border border-violet-800/50 mb-3">
                <ShieldCheck className="h-3.5 w-3.5 text-violet-400" />
                <span>Verified Fulfillment</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                How playkit01 Fulfills Your Orders
              </h2>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                We focus on high quality generative research and apparel design, while partnering with the world&apos;s leading specialized marketplaces to handle fulfillment safely:
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">PromptBase:</strong> Instant digital prompt reveals, copy-paste variables, prompt parameters, and seller support.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    <strong className="text-white">Redbubble:</strong> Premium garment printing, secure worldwide tracked shipping, 30-day returns, and multiple sizing options.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/80 border border-cyan-800/40 hover:border-cyan-500/80 transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                    Digital Prompts Profile
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-cyan-300">
                    PromptBase @playkit01
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">Explore 4.9★ rated prompt blueprints</p>
                </div>
                <ExternalLink className="h-5 w-5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href={brandConfig.socials.redbubble}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-slate-950/80 border border-rose-800/40 hover:border-rose-500/80 transition-all group"
              >
                <div>
                  <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider block">
                    Physical Apparel & Merch
                  </span>
                  <span className="text-base font-bold text-white group-hover:text-rose-300">
                    Redbubble Shop @playkit01
                  </span>
                  <p className="text-xs text-slate-400 mt-0.5">T-Shirts, Stickers, Mugs & Posters</p>
                </div>
                <ExternalLink className="h-5 w-5 text-rose-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </main>
  );
}
