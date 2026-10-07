import React from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Sparkles, Layers, ArrowUpRight } from "lucide-react";
import { brandConfig } from "@/data/socials";

export const metadata = {
  title: "Studio Monograph",
  description:
    "An editorial profile piece on PLAYKIT 01 — exploring generative prompt architecture, automatic AI agents, and physical editions.",
};

export default function StudioPage() {
  return (
    <div className="bg-[#FAF9F5] text-[#121212] min-h-screen">
      {/* 1. Header / Chapter Identifier */}
      <section className="border-b border-[#E7E5E0] pt-12 sm:pt-20 pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b border-[#E7E5E0] pb-3 mb-10 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7A6A5C]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[#121212] font-semibold">[CHAPTER NO. 00]</span>
              <span>•</span>
              <span>STUDIO MONOGRAPH</span>
            </div>
            <span className="font-mono text-[9px]">VOL. 01 • ATELIER PROFILE</span>
          </div>

          {/* High-fashion gradient logo & Title */}
          <div className="space-y-6">
            <div>
              <span className="font-serif text-4xl sm:text-6xl tracking-tight bg-gradient-to-r from-[#121212] via-[#4A423A] to-[#8C7A6B] bg-clip-text text-transparent inline-block font-normal">
                {"{ Play }"}
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block mt-2">
                PLAYKIT 01 • ARCHIVAL FOUNDATION
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl text-[#121212] font-normal leading-snug tracking-tight">
              Bridging deterministic computational blueprints with archival physical streetwear.
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Editorial Profile Body */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 space-y-12">
          {/* Main Museum Matting Profile Card */}
          <div className="p-6 sm:p-10 bg-white border border-[#E7E5E0] shadow-[0_2px_14px_rgba(18,18,18,0.04)] space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block">
              Founder Profile & Studio Vision
            </span>

            {/* Exact Required Bio */}
            <p className="font-serif text-lg sm:text-xl text-[#121212] leading-relaxed font-normal">
              Playkit 01 is founded by a full-stack software engineer specializing in custom web apps, automatic AI agents, and high-performance prompts that streamline business workflows.
            </p>

            <div className="pt-4 border-t border-[#E7E5E0] space-y-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
              <p>
                Rooted at the convergence of software craftsmanship and generative model research, the studio develops deterministic prompt formulas designed to eliminate AI hallucination and prompt pollution across Gemini Image, Claude, and Midjourney.
              </p>
              <p>
                Simultaneously, the physical arm of PLAYKIT 01 translates this cyber-aesthetic discipline into tangible heavyweight cotton streetwear and archival editions—fabricated to exacting 220–380 GSM standards and fulfilled globally via Fourthwall.
              </p>
            </div>
          </div>

          {/* Core Studio Disciplines */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#E7E5E0] pb-2 text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              <Layers className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Studio Disciplines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white border border-[#E7E5E0] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
                <span className="font-mono text-[10px] uppercase text-[#7A6A5C] tracking-widest block">[01]</span>
                <h3 className="font-serif text-base text-[#121212] font-normal">Automated AI Agents</h3>
                <p className="text-xs text-[#666662] font-light leading-relaxed">
                  Autonomous agents and orchestration systems engineered to automate complex enterprise workflows and data transformations.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5E0] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
                <span className="font-mono text-[10px] uppercase text-[#7A6A5C] tracking-widest block">[02]</span>
                <h3 className="font-serif text-base text-[#121212] font-normal">Calibrated Prompt Formulas</h3>
                <p className="text-xs text-[#666662] font-light leading-relaxed">
                  Deterministic blueprints stress-tested across image and LLM foundation models with verified seed parameters.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5E0] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
                <span className="font-mono text-[10px] uppercase text-[#7A6A5C] tracking-widest block">[03]</span>
                <h3 className="font-serif text-base text-[#121212] font-normal">Custom Web Applications</h3>
                <p className="text-xs text-[#666662] font-light leading-relaxed">
                  Modern, performant web architectures built on Next.js, TypeScript, and headless API platforms.
                </p>
              </div>

              <div className="p-5 bg-white border border-[#E7E5E0] shadow-[0_2px_10px_rgba(0,0,0,0.03)] space-y-2">
                <span className="font-mono text-[10px] uppercase text-[#7A6A5C] tracking-widest block">[04]</span>
                <h3 className="font-serif text-base text-[#121212] font-normal">Archival Streetwear</h3>
                <p className="text-xs text-[#666662] font-light leading-relaxed">
                  Heavyweight standard cotton apparel, die-cut vinyl stickers, and ceramic editions dispatched worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Architectural Telemetry Table */}
          <div className="border border-[#E7E5E0] bg-[#FFFFFF] p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E7E5E0] pb-2 text-[10px] uppercase tracking-[0.25em] text-[#121212] font-semibold">
              <Terminal className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Studio Specifications & Baselines</span>
            </div>

            <div className="divide-y divide-[#E7E5E0] text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#666662]">Foundation</span>
                <span className="font-medium text-[#121212]">Independent Atelier • 2026</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#666662]">Digital Dispatch</span>
                <span className="font-medium text-[#121212]">PromptBase Verified Archive</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#666662]">Physical Logistics</span>
                <span className="font-medium text-[#121212]">Fourthwall Global Fulfillment</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#666662]">Fabric Baseline</span>
                <span className="font-medium text-[#121212]">100% Combed Ringspun Cotton (220 GSM)</span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#666662]">Seed Reliability</span>
                <span className="font-medium text-[#121212]">Zero Hallucination / Deterministic Output</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <Link
              href="/prompts"
              className="px-6 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
            >
              <Sparkles className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Browse Prompt Archive</span>
            </Link>

            <Link
              href="/merch"
              className="px-6 py-3.5 border border-[#121212] text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
            >
              <span>Explore Garments</span>
              <ArrowRight className="h-3.5 w-3.5 stroke-[1.5]" />
            </Link>

            <a
              href={brandConfig.socials.linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-[#E7E5E0] bg-[#FAF9F5] text-[#121212] hover:bg-[#F5F3EE] transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium"
            >
              <span>Linktree Hub</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
