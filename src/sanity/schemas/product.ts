import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product (Prompt / Merch)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "AI Prompt (Digital)", value: "prompt" },
          { title: "Merch & Apparel (Physical)", value: "merch" },
        ],
        layout: "radio",
      },
      initialValue: "prompt",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price (USD)",
      type: "number",
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: "externalUrl",
      title: "Marketplace Checkout URL (PromptBase / Redbubble)",
      type: "url",
      description: "Direct link to purchase this listing on PromptBase or Redbubble",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "imageUpload",
      title: "Product Image (Direct Upload)",
      type: "image",
      options: { hotspot: true },
      description: "Upload an image directly into Sanity",
    }),
    defineField({
      name: "imageUrl",
      title: "Or External Image URL",
      type: "url",
      description: "Paste a direct image URL from PromptBase or Redbubble",
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rating",
      title: "Rating (e.g. 4.9)",
      type: "number",
      initialValue: 5.0,
    }),
    defineField({
      name: "reviewsCount",
      title: "Reviews Count",
      type: "number",
      initialValue: 12,
    }),

    // Prompt Specific Details
    defineField({
      name: "aiEngine",
      title: "AI Engine (Prompts Only)",
      type: "string",
      options: {
        list: [
          { title: "Gemini Image", value: "Gemini Image" },
          { title: "Gemini / Claude", value: "Gemini / Claude" },
          { title: "Midjourney v6", value: "Midjourney v6" },
          { title: "DALL-E 3", value: "DALL-E 3" },
          { title: "ChatGPT / Claude", value: "ChatGPT / Claude" },
          { title: "Stable Diffusion XL", value: "Stable Diffusion XL" },
        ],
      },
      hidden: ({ parent }) => parent?.category !== "prompt",
    }),
    defineField({
      name: "promptPreviewSnippet",
      title: "Prompt Preview / Snippet (Prompts Only)",
      type: "string",
      description: "Preview snippet shown with copy button",
      hidden: ({ parent }) => parent?.category !== "prompt",
    }),

    // Merch Specific Details
    defineField({
      name: "merchType",
      title: "Merch Item Type (Merch Only)",
      type: "string",
      options: {
        list: [
          { title: "T-Shirt", value: "T-Shirt" },
          { title: "Sticker", value: "Sticker" },
          { title: "Mug", value: "Mug" },
          { title: "Hoodie", value: "Hoodie" },
          { title: "Phone Case", value: "Phone Case" },
          { title: "Poster", value: "Poster" },
        ],
      },
      hidden: ({ parent }) => parent?.category !== "merch",
    }),
    defineField({
      name: "material",
      title: "Material (Merch Only)",
      type: "string",
      description: "e.g. 100% Combed Ringspun Cotton or High-gloss vinyl",
      hidden: ({ parent }) => parent?.category !== "merch",
    }),

    // Visibility and Placement toggles
    defineField({
      name: "isActive",
      title: "Active on Storefront",
      type: "boolean",
      description: "Uncheck this to instantly hide/take down this item from the site",
      initialValue: true,
    }),
    defineField({
      name: "isFeatured",
      title: "Feature on Homepage Showcase",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "isTrending",
      title: "Show in Most Purchased / Trending",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isRecentlyAdded",
      title: "Show in Recently Added",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      category: "category",
      price: "price",
      media: "imageUpload",
      isActive: "isActive",
    },
    prepare({ title, category, price, media, isActive }) {
      return {
        title,
        subtitle: `${category === "prompt" ? "Prompt" : "Merch"} • $${price ?? 0} ${isActive ? "• Active" : "• Hidden"}`,
        media,
      };
    },
  },
});
