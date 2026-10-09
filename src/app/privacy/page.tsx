import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Lock, Eye, Server, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "PLAYKIT 01 Privacy Policy — Transparent data handling, cookies, Fourthwall fulfillment processing, and client data protection.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
          <Link href="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="font-semibold text-[#121212]">Privacy Policy</span>
        </nav>

        {/* Masthead */}
        <div className="border-b border-[#E7E5E0] pb-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
              Legal Codex • Policy 01
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#666662] font-mono">
              EFFECTIVE DATE: OCTOBER 2026
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#121212] font-normal tracking-tight">
            Privacy Policy
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
            This Privacy Policy describes how PLAYKIT 01 (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;studio&rdquo;) collects, uses, and protects your information when you visit playkit01.store, inspect computational prompt blueprints, subscribe to drop lists, or acquire physical editions fulfilled via Fourthwall.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          {/* Section 1 */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <Eye className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                1. Information We Collect
              </h2>
            </div>
            <p>
              We collect information you directly provide when interacting with our studio:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li>
                <strong>Atelier Transmissions & Support:</strong> When submitting an inquiry through our contact portal, we collect your full name, email address, inquiry category, and message contents.
              </li>
              <li>
                <strong>VIP Drop List / Newsletter:</strong> When you subscribe to our Issue notifications or drop waitlists, we record your email address and timestamp of enrollment.
              </li>
              <li>
                <strong>Client-Side Storage:</strong> We store your active shopping bag contents in your browser&apos;s local storage (<code className="font-mono text-xs bg-[#F5F3EE] px-1 py-0.5 border border-[#E7E5E0]">playkit01_archive_bag_v1</code>) so your selected items persist across page navigation. This data remains on your device.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <Server className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                2. Third-Party Fulfillment & Payment Processing
              </h2>
            </div>
            <p>
              PLAYKIT 01 does not store payment card numbers or process credit card payments directly on our primary web server. Transactions are facilitated securely through verified partners:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li>
                <strong>Physical Editions & Merchandise (Fourthwall):</strong> When checking out with garments, tech cases, or ceramics, your order is processed securely through Fourthwall (<code className="font-mono text-xs bg-[#F5F3EE] px-1 py-0.5 border border-[#E7E5E0]">checkout.playkit01.store</code>). Fourthwall handles PCI-compliant payment billing, address verification, global shipping logistics, and courier dispatch.
              </li>
              <li>
                <strong>Digital Prompt Blueprints (PromptBase):</strong> Digital formulas are acquired directly through PromptBase (<code className="font-mono text-xs bg-[#F5F3EE] px-1 py-0.5 border border-[#E7E5E0]">promptbase.com/profile/ploykit</code>), which securely manages prompt licensing, token generation, and account ownership.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <Lock className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                3. How We Use Your Information
              </h2>
            </div>
            <p>
              Your personal information is used exclusively to operate our studio services:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li>Responding directly to bespoke prompt commissions, web application inquiries, or enterprise consultation requests.</li>
              <li>Dispatching release notifications for new prompt formulas or physical edition drops.</li>
              <li>Preventing malicious bot submissions and securing our web infrastructure with honeypot validation.</li>
              <li>Ensuring compliance with international commercial regulations.</li>
            </ul>
            <p className="font-medium text-[#121212]">
              We will never sell, rent, or trade your personal email address or client correspondence to third-party data brokers.
            </p>
          </section>

          {/* Section 4 */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <RefreshCw className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                4. Your Privacy Rights (GDPR & CCPA)
              </h2>
            </div>
            <p>
              Depending on your location, you hold statutory rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#121212]">
              <li><strong>Right to Access:</strong> You may request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Erasure:</strong> You may request immediate deletion of your inquiry records or drop list subscription.</li>
              <li><strong>Right to Opt-Out:</strong> You may unsubscribe from any studio dispatch at any time via the link provided in the communication or by emailing us directly.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="p-6 bg-white border border-[#E7E5E0] shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-[#121212] font-semibold text-sm">
              <ShieldCheck className="h-4 w-4 stroke-[1.5] text-[#7A6A5C]" />
              <h2 className="font-serif text-base text-[#121212] font-normal">
                5. Contact the Atelier Data Officer
              </h2>
            </div>
            <p>
              For any questions, data deletion requests, or privacy inquiries, contact the studio directly:
            </p>
            <div className="pt-2 font-mono text-xs text-[#121212]">
              Email: <a href="mailto:contact@playkit01.store" className="underline hover:text-[#7A6A5C]">contact@playkit01.store</a>
              <br />
              Studio: PLAYKIT 01 Archive Atelier • Independent Digital & Physical Editions
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

