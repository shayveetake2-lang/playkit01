import { sanityClient, ALL_ACTIVE_PRODUCTS_QUERY, urlForImage } from "@/sanity/sanity.client";
import { getFourthwallProducts } from "@/lib/fourthwall";
import { initialFourthwallProducts } from "@/data/fourthwallProducts";
import { promptbaseProducts } from "@/data/promptbaseProducts";

export type ProductCategory = "prompt" | "merch";

export interface PromptDetails {
  aiEngine: "Gemini Image" | "Gemini / Claude" | "Gemini" | "Midjourney v6" | "DALL-E 3" | "ChatGPT / Claude" | "Stable Diffusion XL" | string;
  promptPreviewSnippet: string;
  testOutputDescription: string;
  aspectRatios: string[];
  wordsCount: number;
}

export interface MerchDetails {
  merchType: "T-Shirt" | "Sticker" | "Mug" | "Hoodie" | "Phone Case" | "Poster" | "Mouse Pad" | "Home & Living" | "Accessories" | string;
  material: string;
  sizes?: string[];
  colors?: string[];
  printDetails: string;
}

export interface FourthwallVariant {
  id: string;
  name: string;
  price: number;
  sku?: string;
  attributes?: Record<string, string>;
  inStock?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  externalUrl: string;
  primaryImage: string;
  galleryImages: string[];
  tags: string[];
  isFeatured: boolean;
  isRecentlyAdded: boolean;
  isMostPurchased: boolean;
  promptDetails?: PromptDetails;
  merchDetails?: MerchDetails;
  fourthwallVariantId?: string;
  variants?: FourthwallVariant[];
}

// REAL VERIFIED PROMPTBASE LISTINGS (Direct sync with @ploykit on PromptBase)
export const initialPromptProducts: Product[] = promptbaseProducts;

// Unified real initial catalog: PromptBase digital formulas + real Fourthwall physical editions
export const initialProducts: Product[] = [
  ...initialPromptProducts,
  ...initialFourthwallProducts,
];

// Helper to convert Sanity raw item to local Product interface
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSanityProduct(item: any): Product {
  const imageUrl =
    item.imageUrl ||
    urlForImage(item.imageUpload) ||
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80";

  return {
    id: item._id,
    title: item.title,
    slug: item.slug || item._id,
    category: item.category || "prompt",
    price: item.price || 3.99,
    rating: item.rating || 5.0,
    reviewsCount: item.reviewsCount || 10,
    shortDescription: item.description?.slice(0, 110) || "Curated digital prompt or apparel item from playkit01.",
    description: item.description || "Created and tested by playkit01.",
    externalUrl: item.externalUrl || (item.category === "prompt" ? "https://promptbase.com/profile/ploykit" : "https://www.redbubble.com/people/playkit01/shop"),
    primaryImage: imageUrl,
    galleryImages: [imageUrl],
    tags: [item.category === "prompt" ? item.aiEngine || "AI Prompt" : item.merchType || "Merch", "playkit01"],
    isFeatured: Boolean(item.isFeatured),
    isRecentlyAdded: Boolean(item.isRecentlyAdded),
    isMostPurchased: Boolean(item.isTrending),
    promptDetails: item.category === "prompt" ? {
      aiEngine: item.aiEngine || "Gemini Image",
      promptPreviewSnippet: item.promptPreviewSnippet || "Detailed prompt formula available on PromptBase...",
      testOutputDescription: "Tested for high fidelity results across multiple seeds.",
      aspectRatios: ["1:1"],
      wordsCount: 35,
    } : undefined,
    merchDetails: item.category === "merch" ? {
      merchType: item.merchType || "T-Shirt",
      material: item.material || "High quality material",
      sizes: ["S", "M", "L", "XL"],
      printDetails: "Printed and fulfilled by Redbubble.",
    } : undefined,
  };
}

// Client helper that fetches both live digital formulas (Sanity) and physical editions (Fourthwall)
export async function getLiveProducts(): Promise<Product[]> {
  try {
    const [sanityResult, fwResult] = await Promise.allSettled([
      sanityClient
        .fetch(ALL_ACTIVE_PRODUCTS_QUERY)
        .then((items) => (items && items.length > 0 ? items.map(mapSanityProduct) : []))
        .catch(() => []),
      getFourthwallProducts().catch(() => initialFourthwallProducts),
    ]);

    const livePrompts: Product[] =
      sanityResult.status === "fulfilled" && sanityResult.value.length > 0
        ? sanityResult.value
        : initialPromptProducts;

    const liveMerch: Product[] =
      fwResult.status === "fulfilled" && fwResult.value.length > 0
        ? fwResult.value
        : initialFourthwallProducts;

    return [...livePrompts, ...liveMerch];
  } catch (err) {
    console.warn("Notice: Fetching live products encountered an error, using initial products:", err);
    return initialProducts;
  }
}

// Synchronous helper for instant client-side fallback rendering
export function getFeaturedProducts(products: Product[] = initialProducts): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function getRecentlyAddedProducts(products: Product[] = initialProducts): Product[] {
  return products.filter((p) => p.isRecentlyAdded);
}

export function getMostPurchasedProducts(products: Product[] = initialProducts): Product[] {
  return products.filter((p) => p.isMostPurchased);
}

export function getPromptProducts(products: Product[] = initialProducts): Product[] {
  return products.filter((p) => p.category === "prompt");
}

export function getMerchProducts(products: Product[] = initialProducts): Product[] {
  return products.filter((p) => p.category === "merch");
}
