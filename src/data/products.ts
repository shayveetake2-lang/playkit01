export type ProductCategory = "prompt" | "merch";

export interface PromptDetails {
  aiEngine: "Midjourney v6" | "DALL-E 3" | "ChatGPT / Claude" | "Stable Diffusion XL";
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

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ProductCategory;
  subCategory: string;
  price: number;
  originalPrice?: number;
  currency: string;
  image: string;
  secondaryImage?: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  tags: string[];
  featured: boolean;
  recentlyAdded: boolean;
  mostPurchased: boolean;
  externalPlatform: "promptbase" | "redbubble";
  externalUrl: string;
  promptDetails?: PromptDetails;
  merchDetails?: MerchDetails;
}

export const products: Product[] = [
  // --- AI PROMPTS (PromptBase) ---
  {
    id: "prompt-01",
    slug: "cyberpunk-tokyo-neon-streetscapes",
    title: "Cyberpunk Tokyo Neon Streetscapes",
    description:
      "Generate cinematic, hyper-detailed cyberpunk street photography with rainy reflections, holographic signage, and moody volumetric lighting.",
    category: "prompt",
    subCategory: "Midjourney v6",
    price: 4.99,
    originalPrice: 6.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 88,
    salesCount: 420,
    tags: ["Cyberpunk", "Tokyo", "Cinematic", "Lighting", "Midjourney"],
    featured: true,
    recentlyAdded: false,
    mostPurchased: true,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/cyberpunk-tokyo-neon-streetscapes",
    promptDetails: {
      aiEngine: "Midjourney v6",
      promptPreviewSnippet: "Candid 35mm street photo, neon-drenched Shinjuku alleyway after rain, holographic ad banners glowing in cyan and magenta...",
      testOutputDescription: "Consistent 8K atmospheric realism with authentic camera bokeh and reflections.",
      aspectRatios: ["16:9", "4:5", "1:1", "9:16"],
      wordsCount: 42,
    },
  },
  {
    id: "prompt-02",
    slug: "minimalist-3d-isometric-ui-clay",
    title: "Minimalist 3D Isometric UI Clay Icons",
    description:
      "Craft smooth pastel claymorphism 3D iconography perfect for SaaS landing pages, fintech apps, and mobile user interfaces.",
    category: "prompt",
    subCategory: "DALL-E 3",
    price: 3.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 54,
    salesCount: 310,
    tags: ["3D Icon", "Isometric", "SaaS", "Claymorphism", "DALL-E"],
    featured: true,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/minimalist-3d-isometric-ui-clay",
    promptDetails: {
      aiEngine: "DALL-E 3",
      promptPreviewSnippet: "Smooth matte clay 3D render of a futuristic dashboard widget, floating isometric perspective, studio softbox lighting...",
      testOutputDescription: "Clean isolated transparent/solid backdrops with subtle drop shadows.",
      aspectRatios: ["1:1", "16:9"],
      wordsCount: 35,
    },
  },
  {
    id: "prompt-03",
    slug: "retro-90s-synthwave-anime-wallpaper",
    title: "Retro 90s Synthwave Anime Aesthetics",
    description:
      "Vintage cel-shaded retro anime vibes with purple sunsets, vintage sports cars, and nostalgic lo-fi vaporwave palettes.",
    category: "prompt",
    subCategory: "Midjourney v6",
    price: 4.49,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80",
    rating: 5.0,
    reviewsCount: 62,
    salesCount: 295,
    tags: ["Anime", "Synthwave", "90s Retro", "Vaporwave", "Midjourney"],
    featured: false,
    recentlyAdded: true,
    mostPurchased: true,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/retro-90s-synthwave-anime-wallpaper",
    promptDetails: {
      aiEngine: "Midjourney v6",
      promptPreviewSnippet: "1995 vintage anime screencap, cassette futurism, glowing grid skyline at twilight, grainy VHS texture...",
      testOutputDescription: "Authentic retro animation feel with hand-drawn aesthetic contours.",
      aspectRatios: ["16:9", "21:9", "9:16"],
      wordsCount: 38,
    },
  },
  {
    id: "prompt-04",
    slug: "viral-ecom-copywriting-framework-matrix",
    title: "High-Converting Viral Ecom Prompt Matrix",
    description:
      "A comprehensive multi-step prompt blueprint that outputs high-converting TikTok/Reels ad hooks, email sequences, and product descriptions.",
    category: "prompt",
    subCategory: "ChatGPT / Claude",
    price: 6.99,
    originalPrice: 9.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 112,
    salesCount: 580,
    tags: ["Copywriting", "Marketing", "E-commerce", "Conversion", "Claude"],
    featured: true,
    recentlyAdded: false,
    mostPurchased: true,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/viral-ecom-copywriting-framework-matrix",
    promptDetails: {
      aiEngine: "ChatGPT / Claude",
      promptPreviewSnippet: "Act as an elite direct-response marketer. Analyze the product USP and construct a 5-pillar Hook-Story-Offer campaign with 10 viral hooks...",
      testOutputDescription: "Battle-tested frameworks based on top-performing $10M+ DTC ad accounts.",
      aspectRatios: ["Text Output"],
      wordsCount: 120,
    },
  },
  {
    id: "prompt-05",
    slug: "bioluminescent-alien-flora-and-fauna",
    title: "Bioluminescent Deep Sea & Alien Ecology",
    description:
      "Explore mesmerizing luminous organisms, deep oceanic phosphorescence, and surreal alien botanical gardens.",
    category: "prompt",
    subCategory: "Stable Diffusion XL",
    price: 3.49,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 31,
    salesCount: 145,
    tags: ["Fantasy", "Bioluminescence", "Sci-Fi", "Nature", "SDXL"],
    featured: false,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/bioluminescent-alien-flora-and-fauna",
    promptDetails: {
      aiEngine: "Stable Diffusion XL",
      promptPreviewSnippet: "Macro underwater photography, glowing crystalline jellyfish interwoven with deep indigo coral blooms, glowing ambient particles...",
      testOutputDescription: "Deep dynamic range and vivid neon glow effects on pitch black backgrounds.",
      aspectRatios: ["1:1", "4:5", "16:9"],
      wordsCount: 29,
    },
  },
  {
    id: "prompt-06",
    slug: "holographic-sticker-character-art-generator",
    title: "Holographic Die-Cut Mascot Stickers",
    description:
      "Creates adorable yet edgy vector character designs formatted with white sticker borders and rainbow sheen overlays.",
    category: "prompt",
    subCategory: "Midjourney v6",
    price: 4.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 47,
    salesCount: 260,
    tags: ["Sticker Art", "Mascot", "Vector", "Merch Prep", "Midjourney"],
    featured: true,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "promptbase",
    externalUrl: "https://promptbase.com/prompt/holographic-sticker-character-art-generator",
    promptDetails: {
      aiEngine: "Midjourney v6",
      promptPreviewSnippet: "Die-cut sticker illustration, cyberpunk robot kitten wearing VR goggles, bold line art, iridescent foil sheen, pure white background...",
      testOutputDescription: "Easy background removal ready for print-on-demand sticker production.",
      aspectRatios: ["1:1"],
      wordsCount: 32,
    },
  },

  // --- MERCHANDISE (Redbubble) ---
  {
    id: "merch-01",
    slug: "playkit01-glitch-terminal-graphic-tee",
    title: "playkit01 Glitch Terminal Graphic Tee",
    description:
      "Premium heavyweight streetwear tee featuring our signature cybernetic code matrix and playkit01 emblem print.",
    category: "merch",
    subCategory: "Heavyweight T-Shirt",
    price: 28.50,
    originalPrice: 34.00,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 76,
    salesCount: 380,
    tags: ["T-Shirt", "Streetwear", "Cyberpunk", "Heavyweight", "Apparel"],
    featured: true,
    recentlyAdded: false,
    mostPurchased: true,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/t-shirt/playkit01-glitch-terminal",
    merchDetails: {
      merchType: "T-Shirt",
      material: "100% Combed Ring-Spun Cotton (220 GSM)",
      sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
      colors: ["Midnight Black", "Washed Charcoal", "Off-White"],
      printDetails: "High-durability direct-to-garment (DTG) print, pre-shrunk for zero shrinkage.",
    },
  },
  {
    id: "merch-02",
    slug: "neural-network-holographic-sticker-pack",
    title: "Neural Matrix Holographic Sticker Pack",
    description:
      "A pack of 5 weatherproof, glossy holographic vinyl stickers for laptops, skateboards, water bottles, and notebooks.",
    category: "merch",
    subCategory: "Vinyl Sticker",
    price: 6.25,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1589384267710-7a170981ca78?auto=format&fit=crop&w=900&q=80",
    rating: 5.0,
    reviewsCount: 142,
    salesCount: 650,
    tags: ["Sticker", "Holographic", "Waterproof", "Laptop Decal", "Vinyl"],
    featured: true,
    recentlyAdded: true,
    mostPurchased: true,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/sticker/neural-network-holographic-pack",
    merchDetails: {
      merchType: "Sticker",
      material: "Premium UV & Water Resistant Holographic Vinyl",
      sizes: ["Small (2x2 in)", "Medium (3x3 in)", "Large (5x5 in)"],
      printDetails: "Precision die-cut with iridescent light reflection and residue-free peel.",
    },
  },
  {
    id: "merch-03",
    slug: "cybernetic-caffeine-ceramic-mug",
    title: "Cybernetic Caffeine Ceramic Mug",
    description:
      "Start your morning prompt engineering sessions with our ceramic mug emblazoned with cyberpunk debug code.",
    category: "merch",
    subCategory: "Ceramic Coffee Mug",
    price: 16.00,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
    rating: 4.8,
    reviewsCount: 39,
    salesCount: 210,
    tags: ["Mug", "Coffee", "Desk Setup", "Ceramic", "Drinkware"],
    featured: false,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/mug/cybernetic-caffeine-mug",
    merchDetails: {
      merchType: "Mug",
      material: "Grade-A White Glossy Ceramic",
      sizes: ["11 oz Standard", "15 oz Tall"],
      colors: ["Black Gloss", "Two-Tone Black/White"],
      printDetails: "Dishwasher and microwave safe, scratch-resistant wrap-around print.",
    },
  },
  {
    id: "merch-04",
    slug: "synthetic-dreams-oversized-hoodie",
    title: "Synthetic Dreams Oversized Pullover Hoodie",
    description:
      "Ultra-soft fleece-lined pullover featuring minimal cyber typography on the chest and expansive artwork on the back.",
    category: "merch",
    subCategory: "Fleece Hoodie",
    price: 49.99,
    originalPrice: 59.99,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 52,
    salesCount: 190,
    tags: ["Hoodie", "Streetwear", "Winter", "Fleece", "Apparel"],
    featured: true,
    recentlyAdded: false,
    mostPurchased: true,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/hoodie/synthetic-dreams-oversized",
    merchDetails: {
      merchType: "Hoodie",
      material: "80% Organic Cotton / 20% Recycled Polyester Fleece (350 GSM)",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Jet Black", "Heather Grey", "Deep Navy"],
      printDetails: "High-density screen printed chest crest and full-back art piece.",
    },
  },
  {
    id: "merch-05",
    slug: "vector-distortion-tough-phone-case",
    title: "Vector Distortion Impact Phone Case",
    description:
      "Dual-layer shock-absorbing tough case engineered to protect against 10ft drops while showcasing vibrant abstract art.",
    category: "merch",
    subCategory: "Impact Phone Case",
    price: 24.50,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=80",
    rating: 4.7,
    reviewsCount: 29,
    salesCount: 135,
    tags: ["Phone Case", "Accessories", "Tough Case", "iPhone", "Samsung"],
    featured: false,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/phone-case/vector-distortion-tough-case",
    merchDetails: {
      merchType: "Phone Case",
      material: "Polycarbonate Shell with Shock-Absorbent TPU Silicone Liner",
      sizes: ["iPhone 16 / Pro / Max", "iPhone 15 Series", "Samsung Galaxy S24"],
      printDetails: "3D full-wrap sublimation print with glossy anti-scratch finish.",
    },
  },
  {
    id: "merch-06",
    slug: "hyper-tokyo-archival-matte-poster",
    title: "Hyper Tokyo Neon Archival Art Print",
    description:
      "Museum-quality poster printed on thick archival matte paper, ideal for framing in creative studios and gaming setups.",
    category: "merch",
    subCategory: "Archival Art Print",
    price: 19.00,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
    rating: 4.9,
    reviewsCount: 44,
    salesCount: 175,
    tags: ["Poster", "Wall Art", "Matte Print", "Desk Decor", "Cyberpunk"],
    featured: false,
    recentlyAdded: true,
    mostPurchased: false,
    externalPlatform: "redbubble",
    externalUrl: "https://www.redbubble.com/i/poster/hyper-tokyo-archival-matte",
    merchDetails: {
      merchType: "Poster",
      material: "200 GSM Enhanced Matte Art Paper",
      sizes: ["12x18 in", "18x24 in", "24x36 in"],
      printDetails: "Giclée printing with vivid pigment inks that resist fading for 100+ years.",
    },
  },
];

// Helper functions for sections
export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRecentlyAddedProducts(): Product[] {
  return products.filter((p) => p.recentlyAdded);
}

export function getMostPurchasedProducts(): Product[] {
  return products.filter((p) => p.mostPurchased);
}

export function getPrompts(): Product[] {
  return products.filter((p) => p.category === "prompt");
}

export function getMerch(): Product[] {
  return products.filter((p) => p.category === "merch");
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
