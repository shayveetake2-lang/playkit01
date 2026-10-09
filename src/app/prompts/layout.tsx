import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Archive | PLAYKIT 01",
  description:
    "Deterministic prompt architectures calibrated for Gemini Image, Claude, and Midjourney. Instant digital reveal via PromptBase.",
  openGraph: {
    title: "AI Prompt Archive | PLAYKIT 01",
    description:
      "Deterministic prompt architectures calibrated for Gemini Image, Claude, and Midjourney. Instant digital reveal via PromptBase.",
    type: "website",
  },
};

export default function PromptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

