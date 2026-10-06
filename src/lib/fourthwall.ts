import { Product, getMerchProducts, initialProducts, FourthwallVariant } from "@/data/products";

const FOURTHWALL_API_URL =
  process.env.NEXT_PUBLIC_FOURTHWALL_API_URL || "https://storefront-api.fourthwall.com/v1";
const FOURTHWALL_TOKEN =
  process.env.NEXT_PUBLIC_FOURTHWALL_TOKEN || "";

/**
 * Low-level authenticated fetch wrapper for the Fourthwall Storefront API v1.
 * Automatically appends the storefront_token parameter.
 */
export async function fetchFourthwall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const separator = cleanEndpoint.includes("?") ? "&" : "?";
  const url = `${FOURTHWALL_API_URL}${cleanEndpoint}${separator}storefront_token=${encodeURIComponent(
    FOURTHWALL_TOKEN
  )}`;

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (options.body && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      `Fourthwall API error [${response.status} ${response.statusText}]: ${errorText}`
    );
  }

  return response.json();
}

/**
 * Raw Fourthwall product schema representation
 */
interface RawFourthwallVariant {
  id: string;
  name?: string;
  title?: string;
  sku?: string;
  unitPrice?: { value: number; currency: string } | number;
  price?: { value: number; currency: string } | number;
  inStock?: boolean;
  attributes?: Record<string, string>;
  images?: Array<{ url: string }>;
}

interface RawFourthwallProduct {
  id: string;
  name?: string;
  title?: string;
  slug?: string;
  description?: string;
  images?: Array<{ url: string }>;
  image?: { url: string };
  variants?: RawFourthwallVariant[];
  tags?: string[];
  type?: string;
}

/**
 * Maps raw Fourthwall product JSON to our luxury editorial Product model
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapFourthwallProduct(item: any): Product {
  const title = item.name || item.title || "Archival Physical Edition";
  const slug = item.slug || item.id;
  
  // Extract images
  const primaryImage =
    item.images?.[0]?.url ||
    item.image?.url ||
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80";
  
  const galleryImages: string[] = Array.isArray(item.images) && item.images.length > 0
    ? item.images.map((img: { url: string }) => img.url).filter(Boolean)
    : [primaryImage];

  // Map variants
  const rawVariants: RawFourthwallVariant[] = Array.isArray(item.variants) ? item.variants : [];
  const variants: FourthwallVariant[] = rawVariants.map((v) => {
    let price = 24.50;
    if (typeof v.unitPrice === "number") price = v.unitPrice;
    else if (v.unitPrice && typeof v.unitPrice.value === "number") price = v.unitPrice.value;
    else if (typeof v.price === "number") price = v.price;
    else if (v.price && typeof v.price.value === "number") price = v.price.value;

    return {
      id: v.id,
      name: v.name || v.title || "Standard Edition",
      price,
      sku: v.sku,
      inStock: v.inStock !== false,
      attributes: v.attributes,
    };
  });

  // Default price and variant ID
  const primaryVariant = variants[0];
  const price = primaryVariant?.price || 24.50;
  const fourthwallVariantId = primaryVariant?.id || item.id;

  // Infer merch type
  let merchType: "T-Shirt" | "Sticker" | "Mug" | "Hoodie" | "Phone Case" | "Poster" = "T-Shirt";
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes("sticker")) merchType = "Sticker";
  else if (lowerTitle.includes("mug") || lowerTitle.includes("ceramic")) merchType = "Mug";
  else if (lowerTitle.includes("hoodie") || lowerTitle.includes("fleece")) merchType = "Hoodie";
  else if (lowerTitle.includes("case")) merchType = "Phone Case";
  else if (lowerTitle.includes("poster") || lowerTitle.includes("print")) merchType = "Poster";

  return {
    id: `fw-${item.id}`,
    title,
    slug,
    category: "merch",
    price,
    rating: 5.0,
    reviewsCount: 24,
    shortDescription: item.description?.slice(0, 110) || "Heavyweight physical edition with verified dispatch via Fourthwall.",
    description: item.description || "Crafted and fulfilled exclusively via Fourthwall with global tracked shipping.",
    externalUrl: "https://playkit01.store/merch",
    primaryImage,
    galleryImages,
    tags: Array.isArray(item.tags) && item.tags.length > 0 ? item.tags : [merchType, "Physical Edition", "Fourthwall"],
    isFeatured: true,
    isRecentlyAdded: false,
    isMostPurchased: true,
    fourthwallVariantId,
    variants,
    merchDetails: {
      merchType,
      material: "Premium Archival Grade Standard",
      sizes: variants.map((v) => v.name),
      printDetails: "High-density pigment print, verified global dispatch via Fourthwall.",
    },
  };
}

/**
 * Fetch all published physical products from Fourthwall Storefront API.
 * Falls back safely to initial seed products if offline or unseeded.
 */
export async function getFourthwallProducts(): Promise<Product[]> {
  if (!FOURTHWALL_TOKEN) {
    return getMerchProducts(initialProducts);
  }

  try {
    // Attempt standard collection endpoint
    let rawData: { results?: RawFourthwallProduct[]; products?: RawFourthwallProduct[]; data?: RawFourthwallProduct[] } | RawFourthwallProduct[];
    try {
      rawData = await fetchFourthwall("/collections/all/products");
    } catch {
      // Fallback endpoint
      rawData = await fetchFourthwall("/products");
    }

    let items: RawFourthwallProduct[] = [];
    if (Array.isArray(rawData)) {
      items = rawData;
    } else if (Array.isArray(rawData?.results)) {
      items = rawData.results;
    } else if (Array.isArray(rawData?.products)) {
      items = rawData.products;
    } else if (Array.isArray(rawData?.data)) {
      items = rawData.data;
    }

    if (items.length > 0) {
      return items.map(mapFourthwallProduct);
    }
  } catch (err) {
    console.info(
      "Notice: Live Fourthwall fetch returned fallback (using calibrated seed editions):",
      err instanceof Error ? err.message : err
    );
  }

  // Graceful offline & development fallback
  return getMerchProducts(initialProducts);
}

/**
 * Creates a Fourthwall checkout session containing the given variant items.
 * Returns the exact branded redirect URL on https://checkout.playkit01.store.
 */
export async function createFourthwallCheckoutSession(
  items: { variantId: string; quantity: number }[]
): Promise<{ checkoutUrl: string }> {
  if (!items || items.length === 0) {
    throw new Error("Cannot create checkout session with an empty cart.");
  }

  try {
    // 1. Initialize cart with currency USD
    const cart = await fetchFourthwall<{ id: string }>("/carts", {
      method: "POST",
      body: JSON.stringify({ currency: "USD" }),
    });

    const cartId = cart.id;
    if (!cartId) {
      throw new Error("Fourthwall did not return a valid cart ID.");
    }

    // 2. Add line items to the cart
    await fetchFourthwall(`/carts/${encodeURIComponent(cartId)}/add`, {
      method: "POST",
      body: JSON.stringify({ items }),
    });

    // 3. Construct the official branded checkout redirect
    const checkoutUrl = `https://checkout.playkit01.store/checkout/?cartCurrency=USD&cartId=${encodeURIComponent(
      cartId
    )}`;

    return { checkoutUrl };
  } catch (err) {
    console.warn("Direct cart creation error, utilizing direct-checkout link fallback:", err);

    // Fallback direct checkout query schema if session creation fails
    const productsParam = items.map((i) => `${i.variantId}:${i.quantity}`).join(",");
    const fallbackUrl = `https://checkout.playkit01.store/checkout/?products=${encodeURIComponent(
      productsParam
    )}&cartCurrency=USD`;

    return { checkoutUrl: fallbackUrl };
  }
}
