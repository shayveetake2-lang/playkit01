import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import { projectId, dataset, apiVersion } from "./env";

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(sanityClient);

export function urlForImage(source: any) {
  if (!source) return null;
  return builder.image(source).auto("format").fit("max").url();
}

// GROQ Query for all active products
export const ALL_ACTIVE_PRODUCTS_QUERY = `
  *[_type == "product" && isActive == true] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    price,
    externalUrl,
    imageUrl,
    imageUpload,
    description,
    rating,
    reviewsCount,
    aiEngine,
    promptPreviewSnippet,
    merchType,
    material,
    isFeatured,
    isTrending,
    isRecentlyAdded
  }
`;
