import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atelier FAQ",
  description:
    "Digital fulfillment via PromptBase, physical dispatch via Fourthwall, and garment care instructions for PLAYKIT 01 editions.",
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

