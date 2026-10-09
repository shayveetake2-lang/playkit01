import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Cpu,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  initialPromptProducts,
  getPromptProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialPromptProducts.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getPromptProductBySlug(slug);

  if (!product) {
    return {
      title: "Prompt Formula Not Found | PLAYKIT 01",
    };
  }

  const url = `https://playkit01.store/prompts/${product.slug}`;

  return {
    title: `${product.title} — AI Prompt Blueprint`,
    description: product.shortDescription || product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.title} | PLAYKIT 01`,
      description: product.description,
      url,
      images: [
        {
          url: product.primaryImage.startsWith("http")
            ? product.primaryImage
            : `https://playkit01.store${product.primaryImage}`,
          width: 1200,
          height: 900,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.shortDescription,
      images: [
        product.primaryImage.startsWith("http")
          ? product.primaryImage
          : `https://playkit01.store${product.primaryImage}`,
      ],
    },
  };
}

export default async function PromptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getPromptProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  // Structured Data Schema for Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.primaryImage.startsWith("http")
      ? product.primaryImage
      : `https://playkit01.store${product.primaryImage}`,
    category: "AI Prompt Architecture",
    brand: {
      "@type": "Brand",
      name: "PLAYKIT 01",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://playkit01.store/prompts/${product.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
            <Link href="/" className="hover:text-[#121212] transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
            <Link href="/prompts" className="hover:text-[#121212] transition-colors">
              The Prompt Archive
            </Link>
            <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
            <span className="font-semibold text-[#121212] truncate max-w-[200px] sm:max-w-none">
              {product.title}
            </span>
          </nav>

          {/* Product Detail Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Visual Showcase Frame */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F3EE] border border-[#E7E5E0] shadow-sm">
                <Image
                  src={product.primaryImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#FAF9F5]/95 backdrop-blur-xs text-[#121212] border border-[#E7E5E0]">
                    {product.promptDetails?.aiEngine || "Prompt Formula"}
                  </span>
                  <span className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold bg-[#121212] text-[#FAF9F5]">
                    Verified PromptBase Blueprint
                  </span>
                </div>
              </div>

              {/* Museum Footnote */}
              <div className="p-4 bg-white border border-[#E7E5E0] flex items-center justify-between text-xs text-[#666662]">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
                  <span>Tested Across Model Seeds & Aspect Ratios</span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-[#121212]">
                  {product.promptDetails?.aspectRatios?.join(" • ") || "Multi-Ratio"}
                </span>
              </div>
            </div>

            {/* Right Column: Editorial Specifications & Acquire CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
                    Directory 01 • Computational Formula
                  </span>
                  <span className="font-serif text-3xl text-[#121212] font-normal">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <h1 className="font-serif text-2xl sm:text-4xl text-[#121212] font-normal tracking-tight">
                  {product.title}
                </h1>

                {/* Rating & Engine Meta */}
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className="font-medium text-[#121212]">
                    ★ {product.rating.toFixed(1)} ({product.reviewsCount} verified {product.reviewsCount === 1 ? "review" : "reviews"})
                  </span>
                  <span className="text-[#E7E5E0]">•</span>
                  <span className="text-[#666662] uppercase tracking-wider font-mono text-[11px]">
                    {product.promptDetails?.wordsCount} Words Syntax
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                {product.description}
              </p>

              {/* Prompt Syntax Preview Box */}
              {product.promptDetails?.promptPreviewSnippet && (
                <div className="p-4 bg-[#F5F3EE] border border-[#E7E5E0] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5C] font-semibold">
                      Prompt Preview Extract
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-[#666662] font-mono">
                      Full Formula Unlocked on PromptBase
                    </span>
                  </div>
                  <div className="font-mono text-xs text-[#121212] bg-white p-3 border border-[#E7E5E0] break-words select-all">
                    &ldquo;{product.promptDetails.promptPreviewSnippet}&rdquo;
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              <div className="border border-[#E7E5E0] bg-white p-5 space-y-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#121212] font-semibold block border-b border-[#E7E5E0] pb-2">
                  Formula Specifications
                </span>

                <div className="divide-y divide-[#E7E5E0] text-xs">
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-[#666662]">AI Foundation Model</span>
                    <span className="font-medium text-[#121212]">
                      {product.promptDetails?.aiEngine}
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-[#666662]">Calibrated Aspect Ratios</span>
                    <span className="font-mono text-[#121212]">
                      {product.promptDetails?.aspectRatios?.join(", ")}
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-[#666662]">Syntax Complexity</span>
                    <span className="font-medium text-[#121212]">
                      Deterministic bracket variables & seeds
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-[#666662]">Output Fidelity</span>
                    <span className="font-medium text-[#121212]">
                      {product.promptDetails?.testOutputDescription}
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="text-[#666662]">Fulfillment Type</span>
                    <span className="font-medium text-[#121212]">
                      Instant Digital Reveal via PromptBase
                    </span>
                  </div>
                </div>
              </div>

              {/* Acquisition CTAs */}
              <div className="space-y-3 pt-2">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-all text-xs uppercase tracking-[0.2em] font-medium shadow-xs group cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  <span>Acquire on PromptBase (${product.price.toFixed(2)})</span>
                  <ArrowUpRight className="h-4 w-4 stroke-[1.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wider">
                  <Link
                    href="/contact"
                    className="px-4 py-3 border border-[#E7E5E0] bg-white text-[#121212] hover:border-[#121212] transition-colors flex items-center justify-center gap-1.5 text-center font-medium"
                  >
                    <span>Request Tuning</span>
                  </Link>

                  <Link
                    href="/help"
                    className="px-4 py-3 border border-[#E7E5E0] bg-white text-[#121212] hover:border-[#121212] transition-colors flex items-center justify-center gap-1.5 text-center font-medium"
                  >
                    <span>FAQ & Support</span>
                  </Link>
                </div>
              </div>

              {/* Buyer Confidence Guarantees */}
              <div className="pt-2 flex flex-col gap-2 text-xs text-[#666662]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Verified 5.0★ creator rating across all active prompt formulas</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#121212] shrink-0" />
                  <span>Instant lifetime access tethered to your PromptBase account</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-[#7A6A5C] shrink-0" />
                  <span>Commercial rights included for client & publication artwork</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Formulas Section */}
          {related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-[#E7E5E0]">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
                    Curated Complements
                  </span>
                  <h3 className="font-serif text-2xl text-[#121212] font-normal">
                    Related Prompt Formulas
                  </h3>
                </div>
                <Link
                  href="/prompts"
                  className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors"
                >
                  View all formulas →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
