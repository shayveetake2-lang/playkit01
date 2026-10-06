import { sanityClient, ALL_ACTIVE_PRODUCTS_QUERY, urlForImage } from "@/sanity/sanity.client";

export type ProductCategory = "prompt" | "merch";

export interface PromptDetails {
  aiEngine: "Gemini Image" | "Gemini / Claude" | "Midjourney v6" | "DALL-E 3" | "ChatGPT / Claude" | "Stable Diffusion XL";
  promptPreviewSnippet: string;
  testOutputDescription: string;
  aspectRatios: string[];
  wordsCount: number;
}

export interface MerchDetails {
  merchType: "T-Shirt" | "Sticker" | "Mug" | "Hoodie" | "Phone Case" | "Poster";
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

// REAL INITIAL SEED LISTINGS (Linked directly to verified PromptBase & Redbubble profiles)
export const initialProducts: Product[] = [
  // 1. PromptBase: Retro Tshirt Sticker Badges
  {
    id: "prompt-retro-badges",
    title: "Retro Tshirt Sticker Badges",
    slug: "retro-tshirt-sticker-badges",
    category: "prompt",
    price: 3.99,
    rating: 5.0,
    reviewsCount: 14,
    shortDescription: "Ultra-crisp vintage badge and emblem vector illustrations optimized for merchandise and stickers.",
    description: "Crafted specifically for Gemini Image, this prompt generates detailed vintage badge graphics, distressed typography, and bold merchandise emblems ready for vinyl stickers and apparel printing.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Badges", "Apparel", "Stickers", "Vintage"],
    isFeatured: true,
    isRecentlyAdded: true,
    isMostPurchased: true,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Vintage graphic emblem badge, distressed screen-print texture, bold typography banner...",
      testOutputDescription: "Crisp vector-aesthetic graphics with high contrast borders and authentic halftone texture.",
      aspectRatios: ["1:1", "4:5"],
      wordsCount: 42,
    },
  },

  // 2. PromptBase: Stylized Vintage Exotic Animal Illustrations
  {
    id: "prompt-vintage-animals",
    title: "Stylized Vintage Exotic Animal Illustrations",
    slug: "stylized-vintage-exotic-animal-illustrations",
    category: "prompt",
    price: 3.99,
    rating: 5.0,
    reviewsCount: 18,
    shortDescription: "Botanical and natural-history museum style archival wildlife engravings with artistic color accents.",
    description: "Generates ornate, antique-inspired wildlife portraits combining traditional 19th-century etching aesthetics with rich contemporary color palettes.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Wildlife", "Vintage", "Botanical", "Illustration"],
    isFeatured: true,
    isRecentlyAdded: false,
    isMostPurchased: true,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Archival botanical plate engraving of exotic panther, intricate stippling, muted gold leaf...",
      testOutputDescription: "Museum-grade fine art texture with sharp linework and authentic archival paper grain.",
      aspectRatios: ["3:4", "1:1"],
      wordsCount: 46,
    },
  },

  // 3. PromptBase: Executive Technical PRD Agile User Stories
  {
    id: "prompt-executive-prd",
    title: "Executive Technical PRD & Agile User Stories",
    slug: "executive-technical-prd-agile-user-stories",
    category: "prompt",
    price: 4.99,
    rating: 5.0,
    reviewsCount: 22,
    shortDescription: "Turn loose software ideas into exhaustive Product Requirement Documents, acceptance criteria, and Agile epics.",
    description: "An advanced structured prompt framework for Claude & ChatGPT that produces senior engineering PRDs complete with functional requirements, edge case checklists, and Jira-ready user stories.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Claude", "ChatGPT", "Product Management", "Agile", "PRD"],
    isFeatured: true,
    isRecentlyAdded: true,
    isMostPurchased: false,
    promptDetails: {
      aiEngine: "ChatGPT / Claude",
      promptPreviewSnippet: "Act as a Principal Staff PM. Generate a complete technical specification and Gherkin user stories for [FEATURE]...",
      testOutputDescription: "Includes architecture overview, technical requirements, telemetry KPIs, and sprint-ready breakdown.",
      aspectRatios: ["Text / Markdown"],
      wordsCount: 68,
    },
  },

  // 4. PromptBase: Minimalist UI/UX Landing Page Concepts
  {
    id: "prompt-minimalist-uiux",
    title: "Minimalist UI/UX Landing Page Concepts",
    slug: "minimalist-uiux-landing-page-concepts",
    category: "prompt",
    price: 3.99,
    rating: 4.9,
    reviewsCount: 9,
    shortDescription: "Sleek SaaS & fintech web design mockups with elegant glassmorphism, typography, and dark-mode polish.",
    description: "Generates high-converting modern tech landing pages, dashboard hero sections, and minimalist web applications with realistic design systems.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "UI/UX", "Landing Page", "SaaS", "Web Design"],
    isFeatured: false,
    isRecentlyAdded: true,
    isMostPurchased: true,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Award-winning dark mode SaaS hero section, sleek glassmorphism dashboard preview, clean typography...",
      testOutputDescription: "Modern linear UI with crisp device frames and balanced visual hierarchy.",
      aspectRatios: ["16:9", "4:3"],
      wordsCount: 38,
    },
  },

  // 5. PromptBase: Modern Lineal Color UI Icons
  {
    id: "prompt-lineal-icons",
    title: "Modern Lineal Color UI Icons",
    slug: "modern-lineal-color-ui-icons",
    category: "prompt",
    price: 2.99,
    rating: 5.0,
    reviewsCount: 11,
    shortDescription: "Uniform line-art icon packs with isometric and flat gradient fills for mobile apps and web platforms.",
    description: "Creates cohesive, scalable app icon suites with precise stroke weights, rounded geometric joins, and vibrant dual-tone fills.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Icons", "Line Art", "Mobile Apps", "UI Kit"],
    isFeatured: false,
    isRecentlyAdded: false,
    isMostPurchased: false,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Set of clean lineal color vector icons on white grid, uniform 2px stroke, modern vibrant palette...",
      testOutputDescription: "Consistent stroke alignment, clean corners, and instantly legible icon silhouettes.",
      aspectRatios: ["1:1"],
      wordsCount: 34,
    },
  },

  // 6. PromptBase: Cinematic Double Exposure Silhouette Art
  {
    id: "prompt-double-exposure",
    title: "Cinematic Double Exposure Silhouette Art",
    slug: "cinematic-double-exposure-silhouette-art",
    category: "prompt",
    price: 3.99,
    rating: 5.0,
    reviewsCount: 16,
    shortDescription: "Breathtaking portrait silhouettes merged seamlessly with nocturnal cities, galaxies, and mountain landscapes.",
    description: "Produces artistic album-cover quality double exposures featuring human silhouettes blended into dense foggy pine forests, starry nebulae, and twilight skylines.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Double Exposure", "Cinematic", "Silhouette", "Album Art"],
    isFeatured: true,
    isRecentlyAdded: true,
    isMostPurchased: true,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Double exposure silhouette of solitary traveler blending into misty alpine pines and aurora night sky...",
      testOutputDescription: "Dramatic volumetric lighting with smooth contrast transitions between foreground and background.",
      aspectRatios: ["3:4", "16:9"],
      wordsCount: 44,
    },
  },

  // 7. PromptBase: Highend Food Advertising Photography
  {
    id: "prompt-food-advertising",
    title: "Highend Food Advertising Photography",
    slug: "highend-food-advertising-photography",
    category: "prompt",
    price: 3.99,
    rating: 5.0,
    reviewsCount: 12,
    shortDescription: "Commercial studio gourmet food and cocktail imagery with dramatic backlighting and macro texture.",
    description: "Engineered for restaurant menus, food packaging, and editorial advertising with professional depth-of-field, condensation droplets, and authentic steam capture.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Food Photography", "Commercial", "Advertising", "Editorial"],
    isFeatured: false,
    isRecentlyAdded: false,
    isMostPurchased: false,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Commercial culinary studio photo of artisan dish on dark slate, dramatic soft rim light, macro focus...",
      testOutputDescription: "Razor-sharp focal plane, true culinary color balance, and natural studio softbox highlights.",
      aspectRatios: ["4:5", "1:1"],
      wordsCount: 40,
    },
  },

  // 8. PromptBase: Professional Product Mockup Podiums
  {
    id: "prompt-mockup-podiums",
    title: "Professional Product Mockup Podiums",
    slug: "professional-product-mockup-podiums",
    category: "prompt",
    price: 3.99,
    rating: 4.9,
    reviewsCount: 13,
    shortDescription: "Minimalist concrete, marble, and travertine 3D podiums for luxury skincare and cosmetics renders.",
    description: "Clean architectural 3D display environments with botanical palm shadows, soft sunlight, and balanced negative space ready for product staging.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Mockup", "3D Podium", "Architecture", "Commercial"],
    isFeatured: false,
    isRecentlyAdded: true,
    isMostPurchased: false,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Minimalist travertine stone cylinder display podium, soft architectural sunlight, cast botanical shadows...",
      testOutputDescription: "Photorealistic material textures with plenty of negative space for product placement.",
      aspectRatios: ["1:1", "4:5"],
      wordsCount: 36,
    },
  },

  // 9. PromptBase: Vibrant Startup Logos
  {
    id: "prompt-startup-logos",
    title: "Vibrant Startup Logos",
    slug: "vibrant-startup-logos",
    category: "prompt",
    price: 3.99,
    rating: 5.0,
    reviewsCount: 21,
    shortDescription: "Modern geometric marks, abstract monogram marks, and memorable modern tech company branding.",
    description: "Generates distinctive vector-style brand marks with golden-ratio geometry, clever negative space, and vibrant modern color gradients.",
    externalUrl: "https://promptbase.com/profile/ploykit",
    primaryImage: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Gemini Image", "Logos", "Branding", "Vector", "Startups"],
    isFeatured: true,
    isRecentlyAdded: false,
    isMostPurchased: true,
    promptDetails: {
      aiEngine: "Gemini Image",
      promptPreviewSnippet: "Minimal modern tech logo mark, geometric interlocking vector shapes, bold gradient on dark ground...",
      testOutputDescription: "Clean vector shapes with scalable geometry and modern brand aesthetics.",
      aspectRatios: ["1:1"],
      wordsCount: 32,
    },
  },

  // 10. Fourthwall: Playkit01 Cyber Signature Graphic Tee
  {
    id: "merch-signature-tee",
    title: "Playkit01 Cyber Signature Graphic Tee",
    slug: "playkit01-cyber-signature-graphic-tee",
    category: "merch",
    price: 24.50,
    originalPrice: 28.00,
    rating: 5.0,
    reviewsCount: 31,
    shortDescription: "Heavyweight 100% combed cotton streetwear tee featuring high-definition DTG screen print.",
    description: "Premium unisex boxy-fit graphic tee crafted for all-day comfort. Printed with durable eco-friendly inks that won't crack or fade after washing. Dispatched directly through Fourthwall with worldwide tracking.",
    externalUrl: "https://playkit01.store/merch",
    primaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["T-Shirt", "Streetwear", "Heavyweight", "Fourthwall", "Cotton"],
    isFeatured: true,
    isRecentlyAdded: false,
    isMostPurchased: true,
    fourthwallVariantId: "fw_var_tee_01",
    variants: [
      { id: "fw_var_tee_01", name: "Medium / Obsidian Black", price: 24.50, inStock: true },
      { id: "fw_var_tee_02", name: "Large / Obsidian Black", price: 24.50, inStock: true },
      { id: "fw_var_tee_03", name: "XL / Obsidian Black", price: 24.50, inStock: true },
    ],
    merchDetails: {
      merchType: "T-Shirt",
      material: "100% Combed Ringspun Cotton (220 GSM)",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Obsidian Black", "Slate Grey", "Natural Chalk"],
      printDetails: "High-density Direct-to-Garment (DTG) print with ultra-soft hand feel.",
    },
  },

  // 11. Fourthwall: Retro Tech Badge Vinyl Sticker Pack
  {
    id: "merch-retro-stickers",
    title: "Retro Tech Badge Vinyl Sticker Pack",
    slug: "retro-tech-badge-vinyl-sticker-pack",
    category: "merch",
    price: 4.25,
    originalPrice: 5.50,
    rating: 4.9,
    reviewsCount: 47,
    shortDescription: "Weatherproof die-cut vinyl stickers with scratch-resistant matte finish for laptops and bottles.",
    description: "Ultra-durable laminated vinyl stickers cut with precise millimeter contours. Waterproof, dishwasher-safe, and UV resistant for outdoor gear, laptops, and skate decks.",
    externalUrl: "https://playkit01.store/merch",
    primaryImage: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Sticker", "Die-Cut", "Vinyl", "Waterproof", "Fourthwall"],
    isFeatured: true,
    isRecentlyAdded: true,
    isMostPurchased: true,
    fourthwallVariantId: "fw_var_sticker_01",
    variants: [
      { id: "fw_var_sticker_01", name: "Medium (8cm)", price: 4.25, inStock: true },
      { id: "fw_var_sticker_02", name: "Large (12cm)", price: 5.50, inStock: true },
    ],
    merchDetails: {
      merchType: "Sticker",
      material: "Premium 6mil Waterproof Laminated Vinyl",
      sizes: ["Small (5cm)", "Medium (8cm)", "Large (12cm)"],
      printDetails: "Fade-resistant UV cured inks with clean residue-free peel backing.",
    },
  },

  // 12. Fourthwall: Executive AI Minimalist Ceramic Mug
  {
    id: "merch-executive-mug",
    title: "Executive AI Minimalist Ceramic Mug",
    slug: "executive-ai-minimalist-ceramic-mug",
    category: "merch",
    price: 16.00,
    rating: 5.0,
    reviewsCount: 19,
    shortDescription: "11oz & 15oz dishwasher and microwave safe ceramic mug with high-gloss wraparound artwork.",
    description: "Durable ceramic coffee mug designed for tech workspaces and studio desks. Vibrant wraparound sublimated print that retains its brilliant finish through daily dishwasher cycles.",
    externalUrl: "https://playkit01.store/merch",
    primaryImage: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Mug", "Ceramic", "Coffee", "Desk Gear", "Fourthwall"],
    isFeatured: false,
    isRecentlyAdded: true,
    isMostPurchased: false,
    fourthwallVariantId: "fw_var_mug_01",
    variants: [
      { id: "fw_var_mug_01", name: "11 oz Standard", price: 16.00, inStock: true },
      { id: "fw_var_mug_02", name: "15 oz Tall", price: 18.50, inStock: true },
    ],
    merchDetails: {
      merchType: "Mug",
      material: "Heavy Ceramic with High-Gloss Glaze",
      sizes: ["11 oz Standard", "15 oz Tall"],
      colors: ["Black Ceramic", "Two-tone White/Indigo"],
      printDetails: "Permanent wrap-around sublimation print, microwave and dishwasher safe.",
    },
  },

  // 13. Fourthwall: Cinematic Silhouette Heavyweight Hoodie
  {
    id: "merch-cinematic-hoodie",
    title: "Cinematic Silhouette Heavyweight Hoodie",
    slug: "cinematic-silhouette-heavyweight-hoodie",
    category: "merch",
    price: 48.00,
    originalPrice: 55.00,
    rating: 5.0,
    reviewsCount: 15,
    shortDescription: "380 GSM fleece pullover with double-lined hood, kangaroo pocket, and ribbed cuffs.",
    description: "Premium fleece hoodie featuring our signature cinematic double exposure art across the back. Super warm, pre-shrunk, and built with reinforced seams for long-lasting daily wear.",
    externalUrl: "https://playkit01.store/merch",
    primaryImage: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
    ],
    tags: ["Hoodie", "Apparel", "Fleece", "Streetwear", "Fourthwall"],
    isFeatured: true,
    isRecentlyAdded: false,
    isMostPurchased: true,
    fourthwallVariantId: "fw_var_hoodie_01",
    variants: [
      { id: "fw_var_hoodie_01", name: "Medium / Carbon Black", price: 48.00, inStock: true },
      { id: "fw_var_hoodie_02", name: "Large / Carbon Black", price: 48.00, inStock: true },
      { id: "fw_var_hoodie_03", name: "XL / Carbon Black", price: 48.00, inStock: true },
    ],
    merchDetails: {
      merchType: "Hoodie",
      material: "80% Cotton / 20% Polyester Heavyweight Fleece (380 GSM)",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Carbon Black", "Dark Heather"],
      printDetails: "Large high-definition back print with matching chest monogram.",
    },
  },
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

// Client helper that fetches live Sanity products and merges or falls back to seed products
export async function getLiveProducts(): Promise<Product[]> {
  try {
    const sanityItems = await sanityClient.fetch(ALL_ACTIVE_PRODUCTS_QUERY);
    if (sanityItems && sanityItems.length > 0) {
      return sanityItems.map(mapSanityProduct);
    }
  } catch (err) {
    console.warn("Notice: Fetching from Sanity failed or not yet seeded, using initial products:", err);
  }
  return initialProducts;
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
