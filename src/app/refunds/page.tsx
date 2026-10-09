import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, RefreshCw, CheckCircle2, XCircle, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Refund & Return Policy",
  description:
    "PLAYKIT 01 Refund & Return Policy — 30-day replacement guarantee for physical garments and clear guidelines on digital computational prompt formulas.",
};

export default function RefundsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
          <Link href="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="font-semibold text-[#121212]">Refund & Return Policy</span>
        </nav>

        {/* Masthead */}
        <div className="border-b border-[#E7E5E0] pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              Consumer Protection Codex • Protocol 04
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#666662] font-mono">
              30-DAY BUYER PROTECTION
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight">
            Refund & Return Policy
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
            Our atelier upholds uncompromising standards for computational prompt fidelity and physical garment construction. Please review our specific policies below regarding digital versus physical editions.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          {/* Dual Standard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: Digital */}
            <div className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
                <XCircle className="h-4 w-4 text-[#7A6A5C]" />
                <h2 className="font-serif text-base text-[#121212] font-normal">
                  Digital Prompt Formulas
                </h2>
              </div>
              <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-[#FAF9F5] border border-[#E7E5E0] text-[#121212]">
                Final Sale Upon Reveal
              </span>
              <p>
                Due to the intangible and irreversible nature of digital intellectual property, all computational prompt blueprints acquired via PromptBase are <strong>final sale and non-refundable</strong> once accessed or unlocked.
              </p>
              <p className="text-xs text-[#7A6A5C] pt-2 border-t border-[#E7E5E0]">
                *If you encounter technical parameter questions or unexpected results with your model version, our studio provides direct assistance to help calibrate your generation seeds.
              </p>
            </div>

            {/* Box 2: Physical */}
            <div className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
              <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <h2 className="font-serif text-base text-[#121212] font-normal">
                  Physical Editions & Merch
                </h2>
              </div>
              <span className="inline-block px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800">
                30-Day Guarantee
              </span>
              <p>
                All physical apparel, tech cases, mouse pads, and decals carry a <strong>30-day replacement or refund guarantee</strong> if the item arrives defective, damaged in transit, or with a printing irregularity.
              </p>
              <p className="text-xs text-[#7A6A5C] pt-2 border-t border-[#E7E5E0]">
                *Fulfilled via Fourthwall buyer protection with expedited complimentary re-prints.
              </p>
            </div>
          </div>

          {/* Detailed Physical Claims Process */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm border-b border-[#E7E5E0] pb-3">
              <RefreshCw className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                How to Initiate a Physical Replacement Claim
              </h2>
            </div>
            <p>
              If your physical edition arrives with any manufacturing flaw, incorrect variant, or transit damage, follow these simple steps within 30 days of receipt:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-[#121212]">
              <li>
                <strong>Capture Photographic Evidence:</strong> Take 2–3 clear photographs highlighting the defect, misprint, or courier box damage, along with the garment&apos;s sewn-in tag or packaging.
              </li>
              <li>
                <strong>Send Dispatch to Atelier:</strong> Email <a href="mailto:contact@playkit01.store" className="underline hover:text-[#7A6A5C] font-semibold">contact@playkit01.store</a> with the subject line <code className="font-mono text-xs bg-[#F5F3EE] px-1 py-0.5 border border-[#E7E5E0]">Replacement Claim: [Order #]</code>.
              </li>
              <li>
                <strong>Immediate Resolution:</strong> Our team in coordination with Fourthwall logistics will review within 24–48 hours and promptly issue either a <strong>free replacement reprint with tracked priority shipping</strong> or a full refund to your original payment method.
              </li>
            </ol>
          </section>

          {/* Sizing & Exchanges Disclaimer */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <ShieldCheck className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                Apparel Sizing & Exchange Guidelines
              </h2>
            </div>
            <p>
              Because every piece is fabricated specifically for you on-demand, we cannot automatically accept returns for customer ordering errors (such as selecting the wrong size). We strongly encourage consulting our detailed interactive <strong>Size Guide</strong> (available on every garment page) before completing checkout to ensure your desired fit across standard 220–380 GSM streetwear cuts.
            </p>
          </section>

          {/* Inquiries */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <HelpCircle className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                Questions or Order Inquiries?
              </h2>
            </div>
            <p>
              For any questions regarding order status or returns, contact us anytime at <a href="mailto:contact@playkit01.store" className="underline hover:text-[#7A6A5C]">contact@playkit01.store</a> or open an inquiry on our <Link href="/contact" className="underline hover:text-[#7A6A5C]">Contact Portal</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

