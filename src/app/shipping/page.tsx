import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Globe, Clock, PackageCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Shipping & Logistics Policy",
  description:
    "PLAYKIT 01 Shipping Policy — Fourthwall verified global fulfillment, production timelines, international delivery windows, and parcel tracking.",
};

export default function ShippingPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
          <Link href="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="font-semibold text-[#121212]">Shipping & Logistics</span>
        </nav>

        {/* Masthead */}
        <div className="border-b border-[#E7E5E0] pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              Logistics Codex • Protocol 03
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#666662] font-mono">
              GLOBAL FULFILLMENT NETWORK
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight">
            Shipping & Logistics Policy
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
            Every physical garment, impact-resistant phone case, stitched neoprene mouse pad, and ceramic edition is fabricated on-demand and dispatched worldwide via Fourthwall&apos;s verified logistics infrastructure.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          {/* Key Timelines Table */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm border-b border-[#E7E5E0] pb-3">
              <Clock className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                Estimated Production & Transit Times
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                  Stage 1: Atelier Fabrication
                </span>
                <span className="font-serif text-lg text-[#121212] block">
                  2 – 5 Business Days
                </span>
                <p className="text-xs text-[#666662]">
                  High-density pigment screen printing, UV-coating, quality inspection, and custom packaging.
                </p>
              </div>

              <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                  Stage 2: Courier Transit
                </span>
                <span className="font-serif text-lg text-[#121212] block">
                  5 – 12 Business Days
                </span>
                <p className="text-xs text-[#666662]">
                  Tracked air express and ground delivery via USPS, FedEx, DHL, and national postal services.
                </p>
              </div>
            </div>

            <div className="pt-2 divide-y divide-[#E7E5E0] border-t border-[#E7E5E0]">
              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#121212] font-medium">United States & Canada</span>
                <span className="font-mono text-[#666662]">4–8 business days</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#121212] font-medium">United Kingdom & European Union</span>
                <span className="font-mono text-[#666662]">5–9 business days</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#121212] font-medium">Australia, New Zealand & East Asia</span>
                <span className="font-mono text-[#666662]">7–14 business days</span>
              </div>
              <div className="py-2.5 flex items-center justify-between text-xs">
                <span className="text-[#121212] font-medium">Rest of the World</span>
                <span className="font-mono text-[#666662]">8–18 business days</span>
              </div>
            </div>
          </section>

          {/* Section 2: Tracking */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <PackageCheck className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                Parcel Tracking & Courier Dispatch
              </h2>
            </div>
            <p>
              The moment your package clears the production facility, an automated shipping confirmation email is dispatched to the email provided at checkout. This email includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li>A direct courier tracking link (USPS, DHL, FedEx, or regional carriers).</li>
              <li>Complete itemized manifest of editions contained in the parcel.</li>
              <li>Real-time transit updates accessible 24/7.</li>
            </ul>
          </section>

          {/* Section 3: Customs & Duties */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <Globe className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                International Customs, Duties & VAT
              </h2>
            </div>
            <p>
              Fourthwall routes production through international regional fulfillment hubs (including US and EU facilities) to minimize transit times and reduce import taxes. However, shipments delivered outside primary trade zones may occasionally incur local customs fees or import VAT upon border clearance. These regulatory charges are determined by destination customs authorities and remain the responsibility of the recipient.
            </p>
          </section>

          {/* Section 4: Address Verification */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <AlertCircle className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                Lost or Delayed Parcels
              </h2>
            </div>
            <p>
              If your tracking status has not updated for more than 7 consecutive business days or your parcel is marked as delivered but cannot be located, please contact our support team at <a href="mailto:contact@playkit01.store" className="underline hover:text-[#7A6A5C]">contact@playkit01.store</a> with your Fourthwall order reference number. We will immediately initiate an investigation with the courier to dispatch a replacement or issue a resolution.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
