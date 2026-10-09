"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingBag,
  ArrowRight,
  Ruler,
  Truck,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Share2,
  Check,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import SizeGuideModal from "@/components/SizeGuideModal";

interface MerchDetailClientProps {
  product: Product;
  related: Product[];
}

export default function MerchDetailClient({ product, related }: MerchDetailClientProps) {
  const { addItem, setIsCartOpen } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.fourthwallVariantId || product.variants?.[0]?.id || ""
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const images = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage];

  const activeVariant = product.variants?.find((v) => v.id === selectedVariantId) || product.variants?.[0];
  const displayPrice = activeVariant?.price || product.price;

  const handleAddToBag = () => {
    setIsAdding(true);
    addItem(product, 1, selectedVariantId);
    setTimeout(() => {
      setIsAdding(false);
      setIsCartOpen(true);
    }, 200);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const merchType = product.merchDetails?.merchType || "Physical Edition";

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center justify-between text-xs uppercase tracking-wider text-[#7A6A5C]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#121212] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
            <Link href="/merch" className="hover:text-[#121212] transition-colors">
              Physical Editions
            </Link>
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
            <span className="font-semibold text-[#121212] truncate max-w-[180px] sm:max-w-none">
              {product.title}
            </span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#666662] hover:text-[#121212] transition-colors cursor-pointer"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Share</span>
              </>
            )}
          </button>
        </nav>

        {/* Product Detail Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Multi-view Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0] shadow-sm">
              <Image
                src={images[selectedImageIndex] || product.primaryImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />

              {/* Archival Seal */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#FAF9F5]/95 backdrop-blur-xs text-[#121212] border border-[#E7E5E0]">
                  {merchType}
                </span>
                <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#121212] text-[#FAF9F5]">
                  Fourthwall Tracked Edition
                </span>
              </div>
            </div>

            {/* Thumbnail Row if multiple images */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 shrink-0 overflow-hidden border transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-[#121212] ring-1 ring-[#121212]"
                        : "border-[#E7E5E0] opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Production Footnote */}
            <div className="p-4 bg-white border border-[#E7E5E0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#666662]">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
                <span>Verified Global Dispatch • Handled via Fourthwall Logistics</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#121212]">
                Tracked Courier Delivery
              </span>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                  Directory 02 • Physical Edition
                </span>
                <span className="font-serif text-3xl text-[#121212] font-normal">
                  ${displayPrice.toFixed(2)}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl text-[#121212] font-normal tracking-tight">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="font-medium text-[#121212]">
                  ★ {product.rating.toFixed(1)} ({product.reviewsCount} verified reviews)
                </span>
                <span className="text-[#E7E5E0]">•</span>
                <span className="text-emerald-700 font-medium">In Stock & Ready for Print</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
              {product.description || product.shortDescription}
            </p>

            {/* Variant Selector (Sizes or Device Models) */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#E7E5E0]">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#121212] font-semibold">
                    Select Specimen / Dimension
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[11px] uppercase tracking-wider text-[#7A6A5C] hover:text-[#121212] transition-colors flex items-center gap-1 font-medium cursor-pointer"
                  >
                    <Ruler className="h-3 w-3 stroke-[1.5]" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantId(v.id)}
                      className={`px-3.5 py-2 text-xs uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedVariantId === v.id
                          ? "bg-[#121212] text-[#FAF9F5] border-[#121212] font-medium"
                          : "bg-white text-[#666662] border-[#E7E5E0] hover:text-[#121212] hover:border-[#121212]"
                      }`}
                    >
                      <span>{v.name}</span>
                      {v.price !== product.price && (
                        <span className="ml-1 opacity-75 font-mono">(${v.price.toFixed(2)})</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Action Suite */}
            <div className="space-y-3 pt-4 border-t border-[#E7E5E0]">
              <button
                type="button"
                onClick={handleAddToBag}
                disabled={isAdding}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-xs group cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 stroke-[1.5]" />
                <span>{isAdding ? "Adding to Bag..." : `Add to Archive Bag • $${displayPrice.toFixed(2)}`}</span>
              </button>

              <a
                href={`https://checkout.playkit01.store/cart/checkout?products=${encodeURIComponent(
                  `${selectedVariantId || product.fourthwallVariantId || product.id}:1`
                )}&currency=USD`}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 border border-[#121212] bg-white text-[#121212] hover:bg-[#FAF9F5] transition-all text-xs uppercase tracking-[0.2em] font-medium group cursor-pointer"
              >
                <span>Instant Checkout on Fourthwall</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Specifications Accordion */}
            <div className="border border-[#E7E5E0] bg-white divide-y divide-[#E7E5E0] text-xs">
              <div className="p-4 space-y-1">
                <span className="font-semibold text-[#121212] block uppercase tracking-wider text-[10px]">
                  Material & Fabric Integrity
                </span>
                <p className="text-[#666662] leading-relaxed">
                  {product.merchDetails?.material || "Heavyweight standard cotton and archival pigment printing."}
                </p>
              </div>

              <div className="p-4 space-y-1">
                <span className="font-semibold text-[#121212] block uppercase tracking-wider text-[10px]">
                  Production & Shipping Timeline
                </span>
                <p className="text-[#666662] leading-relaxed">
                  Fabricated in 2–5 business days. Dispatched globally with tracked air courier (US/EU: 4–8 business days; International: 7–14 days).
                </p>
              </div>

              <div className="p-4 space-y-1">
                <span className="font-semibold text-[#121212] block uppercase tracking-wider text-[10px]">
                  30-Day Buyer Guarantee
                </span>
                <p className="text-[#666662] leading-relaxed">
                  Covered by our 30-day replacement policy for manufacturing flaws, misprints, or courier damage.
                </p>
              </div>
            </div>

            {/* Assurance Badges */}
            <div className="pt-2 flex flex-col gap-2 text-xs text-[#666662]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-[#121212] shrink-0" />
                <span>Verified SSL 256-bit encrypted checkout via Fourthwall</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Tracked courier notification sent immediately upon facility dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 text-[#7A6A5C] shrink-0" />
                <span>Complimentary replacement reprint on damaged or misprinted orders</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Editions Grid */}
        {related.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E7E5E0]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
                  Archive Cohesion
                </span>
                <h3 className="font-serif text-2xl text-[#121212] font-normal">
                  Related Physical Editions
                </h3>
              </div>
              <Link
                href="/merch"
                className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors"
              >
                View all physical editions →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                  onQuickView={() => {}}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={merchType}
      />
    </main>
  );
}

