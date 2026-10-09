import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical Editions & Merch | PLAYKIT 01",
  description:
    "Archival heavyweight streetwear garments, impact cases, and objects fulfilled globally via Fourthwall.",
  openGraph: {
    title: "Physical Editions & Merch | PLAYKIT 01",
    description:
      "Archival heavyweight streetwear garments, impact cases, and objects fulfilled globally via Fourthwall.",
    type: "website",
  },
};

export default function MerchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

