"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Shirt,
  CheckCircle,
  Binary,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import {
  Product,
  initialProducts,
  getLiveProducts,
  getFeaturedProducts,
} from "@/data/products";
import { brandConfig } from "@/data/socials";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";
import SectionHeader from "@/components/SectionHeader";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<"all" | "prompts" | "merch">("all");
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  // Balanced hybrid for Selected Works: 4 top prompts + 4 top Fourthwall physical items
  const selectedWorksItems =
    selectedCategoryTab === "all"
      ? [
          ...(featuredPrompts.length > 0 ? featuredPrompts.slice(0, 4) : promptProducts.slice(0, 4)),
          ...(featuredMerch.length > 0 ? featuredMerch.slice(0, 4) : merchProducts.slice(0, 4)),
        ]
      : selectedCategoryTab === "prompts"
      ? (featuredPrompts.length > 0 ? featuredPrompts.slice(0, 8) : promptProducts.slice(0, 8))
      : (featuredMerch.length > 0 ? featuredMerch.slice(0, 8) : merchProducts.slice(0, 8));

  // Curated hero spotlight piece
  const heroMerchProduct =
    merchProducts.find((p) => p.isFeatured) || merchProducts[0] || products[0];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@playkit01.store");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="bg-[#FAF9F5] text-[#121212]">
      {/* 1. CLEAN EDITORIAL HERO */}
      <section className="border-b border-[#E7E5E0] pt-8 sm:pt-12 pb-10 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Subline Masthead */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E5E0] pb-3 mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[#121212]">INDEPENDENT STUDIO</span>
              <span>•</span>
              <span>ISSUE NO. 01 ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212]" />
              <span className="truncate">
                VERIFIED DISPATCH • PROMPTBASE & FOURTHWALL
              </span>
            </div>
          </div>

          {/* Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headline, Clear CTAs & Studio Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block">
                  Studio Atelier • Issue 01
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#121212] font-normal leading-[1.16] tracking-tight">
                  Deterministic AI Prompt Blueprints & Archival Physical Editions.
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-[#666662] max-w-xl leading-relaxed font-light">
                PLAYKIT 01 is an independent creative studio engineering battle-tested prompt formulas for Gemini Image, Claude, and Midjourney alongside heavyweight standard cotton streetwear fulfilled globally via Fourthwall.
              </p>

              {/* Minimal Key Metrics */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-8 border-y border-[#E7E5E0] py-3.5 text-xs">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    14+
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Prompt Blueprints
                  </span>
                </div>
                <span className="text-[#E7E5E0] hidden sm:inline">•</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    31+
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Physical Editions
                  </span>
                </div>
                <span className="text-[#E7E5E0] hidden sm:inline">•</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif font-medium text-base text-[#121212]">
                    5.0★
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    Storefront Rating
                  </span>
                </div>
              </div>

              {/* Intuitive Action CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1 text-xs uppercase tracking-[0.16em]">
                <Link
                  href="/prompts"
                  className="px-5 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-all flex items-center justify-center gap-2 font-medium shadow-xs group"
                >
                  <Sparkles className="h-3.5 w-3.5 stroke-[1.5] text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0" />
                  <span>Explore AI Prompts</span>
                </Link>

                <Link
                  href="/merch"
                  className="px-5 py-3.5 border-2 border-[#121212] bg-white text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-all flex items-center justify-center gap-2 font-medium shadow-xs group"
                >
                  <Shirt className="h-3.5 w-3.5 stroke-[1.5] group-hover:scale-110 transition-transform shrink-0" />
                  <span>Shop Physical Merch</span>
                </Link>

                <Link
                  href="/contact"
                  className="px-5 py-3.5 border border-[#D4D0C8] bg-[#F5F3EE] text-[#121212] hover:bg-[#EBE7DE] hover:border-[#121212] transition-all flex items-center justify-center gap-2 font-medium shadow-xs"
                >
                  <Mail className="h-3.5 w-3.5 stroke-[1.5] text-[#7A6A5C] shrink-0" />
                  <span>Contact Atelier</span>
                </Link>
              </div>

              {/* Verified Channels Footnote */}
              <div className="pt-2 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-[#666662]">
                <span className="text-[#121212] font-semibold">Official Channels:</span>
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
                  href="https://checkout.playkit01.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#121212] transition-colors flex items-center gap-1 font-medium text-[#121212]"
                >
                  <span>Fourthwall Storefront</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </div>
            </div>

            {/* Right Column: Hero Spotlight Plate */}
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
                      Curated Spotlight Edition
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

                <div className="mt-3 pt-3 border-t border-[#E7E5E0] flex items-center justify-between text-[11px] text-[#666662]">
                  <div className="flex items-center gap-1.5">
                    <Binary className="h-3 w-3 text-[#7A6A5C] stroke-[1.5]" />
                    <span>Global Tracked Logistics</span>
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

      {/* 2. UNIFIED STOREFRONT SHOWCASE: SELECTED WORKS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <SectionHeader
          chapter="CATALOG"
          title="Selected Works"
          subtitle="Top releases across computational blueprints and physical apparel, hand-curated for aesthetic precision."
          badge="Collection Issue 01"
          viewAllHref={selectedCategoryTab === "merch" ? "/merch" : "/prompts"}
          viewAllText={selectedCategoryTab === "merch" ? "Explore all physical editions →" : "Explore all prompt blueprints →"}
        />

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-[#E7E5E0] pb-3 text-xs uppercase tracking-wider">
          <button
            type="button"
            onClick={() => setSelectedCategoryTab("all")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedCategoryTab === "all"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            All Works ({promptProducts.length + merchProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategoryTab("prompts")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedCategoryTab === "prompts"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            AI Prompt Blueprints ({promptProducts.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategoryTab("merch")}
            className={`px-4 py-2 transition-all font-medium cursor-pointer ${
              selectedCategoryTab === "merch"
                ? "bg-[#121212] text-[#FAF9F5]"
                : "bg-white border border-[#E7E5E0] text-[#666662] hover:text-[#121212]"
            }`}
          >
            Physical Editions ({merchProducts.length})
          </button>
        </div>

        {/* Unified Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {selectedWorksItems.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
              priority={idx < 2}
            />
          ))}
        </div>

        {/* Quick Discovery Navigation Bar */}
        <div className="mt-12 p-6 bg-white border border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-serif text-base text-[#121212]">
              Looking for something specific?
            </h4>
            <p className="text-xs text-[#666662] font-light mt-0.5">
              Browse our complete catalog with search, filtering by engine, and material categories.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-wider font-medium">
            <Link
              href="/prompts"
              className="px-4 py-2.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors"
            >
              All 14+ Prompts
            </Link>
            <Link
              href="/merch"
              className="px-4 py-2.5 border border-[#121212] text-[#121212] hover:bg-[#FAF9F5] transition-colors"
            >
              All 31+ Physical Goods
            </Link>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS / TWO ATELIER DISCIPLINES */}
      <section className="border-y border-[#E7E5E0] bg-[#F5F3EE] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5E0] pb-3 mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#121212]">ATELIER ARCHITECTURE</span>
              <span>•</span>
              <span>TWO CREATIVE DISCIPLINES</span>
            </div>
            <span className="font-mono text-[9px]">METHODOLOGY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Digital Formulas */}
            <div className="p-6 bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [01] DIGITAL
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                    Instant Access
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#121212] mb-2 font-normal">
                  Deterministic AI Prompts
                </h3>
                <p className="text-xs text-[#666662] leading-relaxed font-light">
                  Mathematical prompt formulas calibrated across Gemini Image, Claude, and Midjourney with verified seeds, eliminating hallucination and token drift.
                </p>
              </div>
              <Link
                href="/prompts"
                className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1 font-medium pt-2 border-t border-[#E7E5E0]"
              >
                <span>Browse prompt archive</span>
                <ArrowRight className="h-3 w-3 stroke-[1.5]" />
              </Link>
            </div>

            {/* Box 2: Physical Streetwear */}
            <div className="p-6 bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [02] PHYSICAL
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                    Tracked Dispatch
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#121212] mb-2 font-normal">
                  Archival Streetwear & Goods
                </h3>
                <p className="text-xs text-[#666662] leading-relaxed font-light">
                  Heavyweight 220 GSM ringspun cotton tees, impact-resistant cases, and ceramic editions dispatched globally via Fourthwall&apos;s verified logistics.
                </p>
              </div>
              <Link
                href="/merch"
                className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1 font-medium pt-2 border-t border-[#E7E5E0]"
              >
                <span>Shop physical editions</span>
                <ArrowRight className="h-3 w-3 stroke-[1.5]" />
              </Link>
            </div>

            {/* Box 3: Custom Commissions */}
            <div className="p-6 bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3 border-b border-[#E7E5E0] pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    [03] BESPOKE
                  </span>
                  <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#121212] text-[#FAF9F5]">
                    Direct Direct
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#121212] mb-2 font-normal">
                  Commissions & Inquiries
                </h3>
                <p className="text-xs text-[#666662] leading-relaxed font-light">
                  Bespoke prompt architecture, autonomous enterprise AI agents, full-stack Next.js web applications, or custom physical merchandise requests.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1 font-medium pt-2 border-t border-[#E7E5E0]"
              >
                <span>Initiate an inquiry</span>
                <ArrowRight className="h-3 w-3 stroke-[1.5]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT THE CREATOR & STUDIO PROFILE */}
      <section id="creator" className="scroll-mt-24 border-b border-[#E7E5E0] bg-[#FAF9F5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-8 sm:p-12 shadow-[0_4px_24px_rgba(18,18,18,0.04)]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E5E0] pb-4 mb-8 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-semibold text-[#121212]">[ATELIER DOSSIER]</span>
                <span>•</span>
                <span>ABOUT THE CREATOR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#121212]" />
                <span>FOUNDER & STUDIO MONOGRAPH</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Bio */}
              <div className="lg:col-span-7 space-y-5">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121212] font-normal tracking-tight leading-tight">
                  Bridging software craftsmanship, generative model research, and tangible goods.
                </h2>

                <p className="font-serif text-base sm:text-lg text-[#121212] leading-relaxed font-normal">
                  PLAYKIT 01 is founded by a full-stack software engineer specializing in custom web applications, autonomous AI agents, and high-performance prompts that streamline business workflows.
                </p>

                <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                  Rooted at the convergence of software engineering and model research, the studio develops deterministic prompt formulas designed to eliminate hallucination across Gemini Image, Claude, and Midjourney. Simultaneously, the physical arm translates this aesthetic into heavyweight cotton streetwear fulfilled globally via Fourthwall.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
                  <Link
                    href="/studio"
                    className="px-5 py-3 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center gap-2 font-medium"
                  >
                    <span>Read Studio Monograph</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </Link>

                  <a
                    href={brandConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 border border-[#121212] text-[#121212] hover:bg-[#FAF9F5] transition-colors flex items-center gap-2 font-medium"
                  >
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </a>
                </div>
              </div>

              {/* Right Column: Disciplines Grid */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                  <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[01] AUTONOMOUS</span>
                  <h3 className="font-serif text-sm text-[#121212] font-medium">Automated AI Agents</h3>
                  <p className="text-xs text-[#666662] font-light">
                    Custom AI agents, LLM pipelines, and orchestration layers to automate repetitive enterprise workflows.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                  <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[02] DETERMINISTIC</span>
                  <h3 className="font-serif text-sm text-[#121212] font-medium">Calibrated Prompt Formulas</h3>
                  <p className="text-xs text-[#666662] font-light">
                    Reproducible, battle-tested prompt architectures for Gemini Image, Claude, and Midjourney on PromptBase.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                  <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[03] FULL-STACK</span>
                  <h3 className="font-serif text-sm text-[#121212] font-medium">Custom Web Applications</h3>
                  <p className="text-xs text-[#666662] font-light">
                    High-performance Next.js architectures, TypeScript, headless commerce APIs, and microservice backends.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                  <span className="font-mono text-[10px] text-[#7A6A5C] font-semibold tracking-widest">[04] PHYSICAL LOGISTICS</span>
                  <h3 className="font-serif text-sm text-[#121212] font-medium">Archival Physical Streetwear</h3>
                  <p className="text-xs text-[#666662] font-light">
                    Heavyweight apparel, tech cases, and vinyl stickers fulfilled by Fourthwall.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NEW: CONTACT & COMMISSIONS SECTION ON DASHBOARD */}
      <section id="inquiries" className="scroll-mt-24 border-b border-[#E7E5E0] bg-[#FAF9F5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-8 sm:p-12 shadow-[0_4px_24px_rgba(18,18,18,0.04)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Inquiry Invitation */}
              <div className="lg:col-span-7 space-y-5">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 stroke-[1.5]" />
                  <span>Direct Atelier Dispatch</span>
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl text-[#121212] font-normal tracking-tight">
                  Initiate a Custom Prompt Commission or Atelier Inquiry
                </h2>

                <p className="text-xs sm:text-sm text-[#666662] leading-relaxed max-w-xl font-light">
                  Need a bespoke prompt formula tuned to your enterprise design system, an autonomous agent pipeline, or bulk physical apparel? Send an inquiry directly to the studio.
                </p>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#121212] shrink-0 mt-0.5 stroke-[1.5]" />
                    <p className="text-xs text-[#666662]">
                      <strong className="text-[#121212] font-medium">Bespoke Prompt Engineering:</strong> Custom calibrated seeds, brackets, and negative prompts for Gemini, Midjourney & Claude.
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-[#121212] shrink-0 mt-0.5 stroke-[1.5]" />
                    <p className="text-xs text-[#666662]">
                      <strong className="text-[#121212] font-medium">Direct Founder Review:</strong> All dispatches reviewed with a guaranteed 24–48 hour response window.
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.18em]">
                  <Link
                    href="/contact"
                    className="px-6 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center gap-2 font-medium shadow-xs"
                  >
                    <span>Open Full Contact Portal</span>
                    <ArrowRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-5 py-3.5 border border-[#121212] text-[#121212] hover:bg-[#FAF9F5] transition-colors flex items-center gap-2 font-medium cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Email Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Studio Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Direct Channels Card */}
              <div className="lg:col-span-5 space-y-3">
                <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                    Direct Email
                  </span>
                  <span className="font-mono text-xs text-[#121212] font-medium block">
                    contact@playkit01.store
                  </span>
                  <span className="text-[11px] text-[#666662] block">
                    General inquiries, collaborations & commissions
                  </span>
                </div>

                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] hover:border-[#121212] transition-colors flex items-center justify-between group block"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                      PromptBase Store
                    </span>
                    <span className="font-serif text-sm text-[#121212] group-hover:text-[#7A6A5C] transition-colors block">
                      @ploykit
                    </span>
                    <span className="text-[11px] text-[#666662] block">
                      Direct prompt formula support & parameter advice
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://checkout.playkit01.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] hover:border-[#121212] transition-colors flex items-center justify-between group block"
                >
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                      Fourthwall Storefront
                    </span>
                    <span className="font-serif text-sm text-[#121212] group-hover:text-[#7A6A5C] transition-colors block">
                      checkout.playkit01.store
                    </span>
                    <span className="text-[11px] text-[#666662] block">
                      Physical order tracking & shipping logistics
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
