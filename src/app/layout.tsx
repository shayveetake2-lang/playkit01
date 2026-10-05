import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://playkit01.store"),
  title: {
    default: "playkit01 | Next-Gen AI Prompts & Creator Merch",
    template: "%s | playkit01",
  },
  description:
    "Curated Midjourney, DALL-E and Claude prompts, plus cyberpunk streetwear t-shirts, holographic stickers, and ceramic mugs by playkit01.",
  keywords: [
    "playkit01",
    "playkit01.store",
    "AI Prompts",
    "PromptBase",
    "Redbubble",
    "Midjourney Prompts",
    "Cyberpunk T-Shirt",
    "Graphic Tees",
    "Stickers",
    "Mugs",
  ],
  authors: [{ name: "playkit01", url: "https://playkit01.store" }],
  creator: "playkit01",
  alternates: {
    canonical: "https://playkit01.store",
  },
  openGraph: {
    title: "playkit01 | Curated AI Prompts & Creator Streetwear",
    description:
      "Explore battle-tested generative AI prompts and high-density street merch. Fulfilled safely via PromptBase and Redbubble.",
    url: "https://playkit01.store",
    siteName: "playkit01",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "playkit01 | Next-Gen AI Prompts & Creator Merch",
    description:
      "Curated AI prompts, streetwear tees, stickers, and mugs by playkit01.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-violet-500 selection:text-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
