import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier Help & FAQ | PLAYKIT 01",
  description:
    "Frequently asked questions regarding prompt formula digital reveal, Fourthwall physical garment fulfillment, sizing, and archival care.",
  openGraph: {
    title: "Atelier Help & FAQ | PLAYKIT 01",
    description:
      "Frequently asked questions regarding prompt formula digital reveal, Fourthwall physical garment fulfillment, sizing, and archival care.",
    type: "website",
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
