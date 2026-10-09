import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  initialFourthwallProducts,
  getMerchProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import MerchDetailClient from "@/components/MerchDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return initialFourthwallProducts.map((product: { slug: string }) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getMerchProductBySlug(slug);

  if (!product) {
    return {
      title: "Physical Edition Not Found | PLAYKIT 01",
    };
  }

  const url = `https://playkit01.store/merch/${product.slug}`;

  return {
    title: `${product.title} — Physical Edition`,
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
          url: product.primaryImage,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.shortDescription,
      images: [product.primaryImage],
    },
  };
}

export default async function MerchDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getMerchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(product, 4);

  // Structured Data Schema for Google Product Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description || product.shortDescription,
    image: product.primaryImage,
    category: product.merchDetails?.merchType || "Streetwear",
    brand: {
      "@type": "Brand",
      name: "PLAYKIT 01",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://playkit01.store/merch/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "PLAYKIT 01",
      },
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
      <MerchDetailClient product={product} related={related} />
    </>
  );
}
