import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, CheckCircle2, AlertOctagon, Scale, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "PLAYKIT 01 Terms of Service — Digital prompt formula licensing, commercial reproduction rights, and physical edition terms.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
          <Link href="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="font-semibold text-[#121212]">Terms of Service</span>
        </nav>

        {/* Masthead */}
        <div className="border-b border-[#E7E5E0] pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              Legal Codex • Policy 02
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#666662] font-mono">
              EFFECTIVE DATE: OCTOBER 2026
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight">
            Terms of Service
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
            These Terms of Service govern your access to PLAYKIT 01, the acquisition and commercial licensing of our generative AI prompt architectures, and the purchase of physical garments and archival editions.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          {/* Section 1: Digital Formulas IP License */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <FileText className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                1. Digital Prompt Blueprint License & Intellectual Property
              </h2>
            </div>
            <p>
              When you acquire a computational prompt blueprint from PLAYKIT 01 via PromptBase, you are granted a non-exclusive, perpetual, worldwide license to execute the prompt syntax and incorporate its generated outputs:
            </p>
            <div className="space-y-2 pt-1 text-[#121212]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Commercial Output Rights:</strong> You own and may freely commercialize all raw image, text, and asset outputs generated using the prompt formulas (e.g., client artwork, commercial branding, website visuals, editorial publications, print-on-demand products).
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertOctagon className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Strict No-Resale Clause on Raw Prompt Syntax:</strong> You may <em>not</em> redistribute, resell, sub-license, scrape, package into a competing prompt database, or publicize the verbatim prompt formula text, seeds, bracket parameters, or proprietary testing syntax as a standalone digital asset.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: AI Model Nondeterminism Disclaimer */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <ShieldAlert className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                2. Model Determinism & Third-Party AI Engine Notice
              </h2>
            </div>
            <p>
              Our prompt formulas are meticulously calibrated and benchmarked on specific engine iterations (such as Gemini Image, Claude 3.5 Sonnet, Midjourney v6, or DALL-E 3). However, because underlying foundation models are maintained by independent third parties (Google, Anthropic, Midjourney Inc., OpenAI), changes or updates made to those remote models may influence seed consistency or syntax interpretation over time. PLAYKIT 01 provides recommended seeds and test outputs as baselines and offers direct messaging guidance for adaptation.
            </p>
          </section>

          {/* Section 3: Physical Goods Terms */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <Scale className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                3. Physical Merchandise Orders & Contract Formation
              </h2>
            </div>
            <p>
              All physical streetwear, apparel, stickers, and tech accessories are printed-on-demand and fulfilled globally in partnership with Fourthwall:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li><strong>Pricing & Availability:</strong> Prices are displayed in USD. We reserve the right to correct typographical errors or discontinue editions without prior notice.</li>
              <li><strong>Order Confirmation:</strong> An order confirmation email indicates receipt of your purchase request. Formal fulfillment commences once Fourthwall schedules the garment for fabrication.</li>
              <li><strong>Customs & Import Duties:</strong> For international orders delivered outside the United States, destination customs fees, import duties, and VAT may be assessed by local authorities upon arrival and are the responsibility of the purchaser.</li>
            </ul>
          </section>

          {/* Section 4: Limitation of Liability */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <AlertOctagon className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                4. Limitation of Liability
              </h2>
            </div>
            <p>
              To the fullest extent permitted by law, PLAYKIT 01 shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from your use of the website, prompt formulas, or physical garments. Our total aggregate liability for any claim arising hereunder is strictly limited to the amount paid by you for the specific item or service in dispute.
            </p>
          </section>

          {/* Section 5: Governing Law & Inquiries */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <h2 className="font-serif text-base text-[#121212] font-normal">
              5. Governing Law & Atelier Inquiries
            </h2>
            <p>
              These Terms are governed by and construed in accordance with applicable commercial and intellectual property laws. For legal inquiries or commercial enterprise licensing requests, please email <a href="mailto:contact@playkit01.store" className="underline hover:text-[#7A6A5C]">contact@playkit01.store</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

