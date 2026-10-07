"use client";

import React, { useState } from "react";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";
import { brandConfig } from "@/data/socials";

interface FaqItem {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  details: React.ReactNode;
}

export default function HelpPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "digital-fulfillment": true,
    "physical-dispatch": true,
    "care-instructions": true,
  });

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const faqItems: FaqItem[] = [
    {
      id: "digital-fulfillment",
      chapter: "NO. 01",
      title: "Digital Fulfillment",
      summary: "Prompts are instantly accessible via PromptBase upon completed checkout.",
      details: (
        <div className="space-y-3 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          <p>
            All generative prompt formulas are delivered automatically through PromptBase. Upon acquisition, you receive immediate access to the full blueprint documentation:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#121212] font-normal">
            <li>Raw deterministic prompt syntax and variable bracket placeholders.</li>
            <li>Recommended seed numbers, aspect ratios, and model version benchmarks.</li>
            <li>High-resolution reference generation plate samples.</li>
            <li>Direct creator messaging assistance for custom parameter adaptations.</li>
          </ul>
          <p className="text-[11px] text-[#7A6A5C] pt-1">
            *No wait time. Digital assets are tethered to your PromptBase user dashboard for lifetime archival retrieval.
          </p>
        </div>
      ),
    },
    {
      id: "physical-dispatch",
      chapter: "NO. 02",
      title: "Physical Dispatch",
      summary: "Apparel and physical editions are printed and shipped globally via Fourthwall.",
      details: (
        <div className="space-y-3 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          <p>
            Physical streetwear, vinyl sticker packs, ceramics, and garments are fulfilled via Fourthwall&apos;s verified global logistics network.
          </p>
          <div className="p-3.5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] font-semibold block">
              Logistics & Fulfillment Baselines
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[#666662] block">Standard Production:</span>
                <span className="font-medium text-[#121212]">2–5 business days</span>
              </div>
              <div>
                <span className="text-[#666662] block">Global Tracked Transit:</span>
                <span className="font-medium text-[#121212]">5–12 business days (Worldwide)</span>
              </div>
            </div>
          </div>
          <p>
            Automated courier tracking numbers are dispatched directly to your purchase email the instant the package clears the fulfillment facility. All transactions process securely through checkout.playkit01.store.
          </p>
        </div>
      ),
    },
    {
      id: "care-instructions",
      chapter: "NO. 03",
      title: "Care Instructions",
      summary: "Wash heavyweight standard cotton cold to preserve the textured screen-print aesthetic.",
      details: (
        <div className="space-y-3 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          <p>
            To preserve the high-density pigment screen-prints and archival fabric texture across all 220–380 GSM cotton garments:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#121212] font-normal">
            <li>
              <strong>Cold Wash Only:</strong> Machine wash cold (30°C / 86°F) inside-out with like colors.
            </li>
            <li>
              <strong>Mild Detergent:</strong> Use gentle detergents without bleach or optical brighteners to avoid distressing the dark garment dye.
            </li>
            <li>
              <strong>Drying:</strong> Air dry flat or tumble dry on lowest temperature setting. Never iron directly over screen-printed monograms or graphics.
            </li>
          </ul>
          <p className="text-[11px] text-[#7A6A5C] pt-1">
            *Proper treatment ensures the textured feel of the garment matures into an authentic vintage wash over decades of wear.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#FAF9F5] text-[#121212] min-h-screen">
      {/* 1. Atelier Header */}
      <section className="border-b border-[#E7E5E0] pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[#E7E5E0] pb-3 mb-10 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[#121212] font-semibold">[ATELIER PROTOCOLS]</span>
              <span>•</span>
              <span>CLIENT INQUIRIES & FAQ</span>
            </div>
            <span className="font-mono text-[9px]">DOCUMENTATION</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight mb-4">
            Atelier Protocols & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
            Standards for digital blueprint access on PromptBase, Fourthwall physical manufacturing, and garment maintenance.
          </p>
        </div>
      </section>

      {/* 2. Editorial Light Accordion Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-6">
          {faqItems.map((item) => {
            const isOpen = Boolean(openItems[item.id]);

            return (
              <div
                key={item.id}
                className="bg-white border border-[#E7E5E0] shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-200"
              >
                {/* Accordion Trigger Header */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-[#FAF9F5] transition-colors cursor-pointer group"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#8C7A6B] font-semibold">
                        {item.chapter}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-[#666662]">
                        • Protocol Specification
                      </span>
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl text-[#121212] font-normal group-hover:text-[#7A6A5C] transition-colors">
                      {item.title}
                    </h2>
                    <p className="font-sans text-xs text-[#666662] font-light mt-1">
                      {item.summary}
                    </p>
                  </div>

                  <div className="p-2 border border-[#E7E5E0] bg-[#FAF9F5] group-hover:border-[#121212] group-hover:bg-[#121212] group-hover:text-[#FAF9F5] transition-colors shrink-0 mt-1">
                    {isOpen ? (
                      <Minus className="h-4 w-4 stroke-[1.5]" />
                    ) : (
                      <Plus className="h-4 w-4 stroke-[1.5]" />
                    )}
                  </div>
                </button>

                {/* Accordion Expandable Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#E7E5E0]/60 animate-in fade-in duration-200">
                    {item.details}
                  </div>
                )}
              </div>
            );
          })}

          {/* Direct Atelier Contact Block */}
          <div className="mt-12 p-6 sm:p-8 border border-[#E7E5E0] bg-[#FAF9F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
                <HelpCircle className="h-3.5 w-3.5 stroke-[1.5]" />
                <span>Further Inquiries</span>
              </span>
              <h3 className="font-serif text-lg text-[#121212] font-normal">
                Need specialized assistance with an edition?
              </h3>
              <p className="text-xs text-[#666662] font-light">
                Reach out directly via our verified social outlets or the official Linktree portal.
              </p>
            </div>

            <a
              href={brandConfig.socials.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 border border-[#121212] bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors text-xs uppercase tracking-[0.2em] font-medium flex items-center gap-2 shrink-0"
            >
              <span>Connect on Linktree</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
