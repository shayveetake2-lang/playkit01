import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://playkit01.store"),
  title: {
    default: "PLAYKIT 01 — Archival Formulas & Physical Editions",
    template: "%s | PLAYKIT 01",
  },
  description:
    "An independent creative studio exploring the intersection of generative prompt architecture and physical editions. Curated computational formulas and garments.",
  keywords: [
    "playkit01",
    "Generative AI Prompts",
    "Prompt Architecture",
    "Editorial Streetwear",
    "Limited Editions",
    "PromptBase",
    "Redbubble",
  ],
  authors: [{ name: "playkit01", url: "https://playkit01.store" }],
  creator: "playkit01",
  alternates: {
    canonical: "https://playkit01.store",
  },
  openGraph: {
    title: "PLAYKIT 01 — Archival Formulas & Physical Editions",
    description:
      "An independent creative studio exploring the intersection of generative prompt architecture and physical editions.",
    url: "https://playkit01.store",
    siteName: "PLAYKIT 01",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PLAYKIT 01 — Archival Formulas & Physical Editions",
    description:
      "Curated computational formulas and physical editions by playkit01.",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#121212] antialiased selection:bg-[#E8E4DC] selection:text-[#121212] overflow-x-hidden">
        <CartProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
