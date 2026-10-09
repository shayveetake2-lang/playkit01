import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Atelier | PLAYKIT 01",
  description:
    "Direct contact portal for PLAYKIT 01. Inquire about custom prompt architecture, physical streetwear editions, or studio collaborations.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

