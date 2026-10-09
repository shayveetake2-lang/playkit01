"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ShieldCheck, Terminal, PackageCheck } from "lucide-react";
import { brandConfig } from "@/data/socials";
import { InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on /admin studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-[#E7E5E0] bg-[#F5F3EE] text-[#121212]">
      {/* Editorial Standards Triad */}
      <div className="border-b border-[#E7E5E0] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
              <Terminal className="h-3 w-3 stroke-[1.5]" />
              <span>Computational Standard</span>
            </span>
            <h4 className="font-serif text-base text-[#121212] font-normal">
              Engineered Prompt Formulas
            </h4>
            <p className="text-xs text-[#666662] leading-relaxed">
              Every formula is stress-tested across Gemini Image, Claude, and Midjourney to ensure coherent, deterministic output without prompt pollution.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold flex items-center gap-1.5">
              <PackageCheck className="h-3 w-3 stroke-[1.5]" />
              <span>Material Integrity</span>
            </span>
            <h4 className="font-serif text-base text-[#121212] font-normal">
              Heavyweight Garments & Editions
            </h4>
            <p className="text-xs text-[#666662] leading-relaxed">
              Physical merchandise is fabricated on premium ringspun cotton and archival vinyl, fulfilled worldwide via Fourthwall with direct tracked checkout.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 stroke-[1.5]" />
              <span>Verified Fulfillment</span>
            </span>
            <h4 className="font-serif text-base text-[#121212] font-normal">
              Guaranteed Buyer Protection
            </h4>
            <p className="text-xs text-[#666662] leading-relaxed">
              Digital purchases are verified instantly on PromptBase; physical pieces carry Fourthwall&apos;s verified global logistics and secure branded checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Colophon */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-normal tracking-[0.15em] text-[#121212] block">
                PLAYKIT 01
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block">
                Atelier & Archive
              </span>
            </Link>
            <p className="text-xs text-[#666662] leading-relaxed max-w-sm">
              An independent creative studio exploring generative artificial intelligence prompt architecture and archival physical editions.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
                <span>Instagram</span>
              </a>
              <span className="text-[#E7E5E0]">•</span>
              <a
                href={brandConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="h-3.5 w-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Directory Column 1: Storefront */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
              Storefront
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#121212]">
              <li>
                <Link href="/prompts" className="hover:text-[#7A6A5C] transition-colors">
                  AI Prompt Formulas
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-[#7A6A5C] transition-colors">
                  Physical Merch & Editions
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#7A6A5C] transition-colors">
                  Selected Works Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 2: Studio & Support */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
              The Studio
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#121212]">
              <li>
                <Link href="/studio" className="hover:text-[#7A6A5C] transition-colors">
                  About & Monograph
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#7A6A5C] transition-colors font-medium text-[#121212]">
                  Contact Atelier
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-[#7A6A5C] transition-colors">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 3: Outlets */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
              Verified Outlets
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#121212]">
              <li>
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A6A5C] transition-colors flex items-center justify-between"
                >
                  <span>PromptBase</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </li>
              <li>
                <a
                  href="https://checkout.playkit01.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A6A5C] transition-colors flex items-center justify-between"
                >
                  <span>Fourthwall</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A6A5C] transition-colors flex items-center justify-between"
                >
                  <span>Linktree</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-16 pt-8 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666662] tracking-wider">
          <p>© {new Date().getFullYear()} PLAYKIT 01 Studio. All rights reserved.</p>
          <div className="mt-2 sm:mt-0 flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#7A6A5C]">
            <Link href="/contact" className="hover:text-[#121212] transition-colors">
              Contact
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-[#121212] transition-colors">
              FAQ
            </Link>
            <span>•</span>
            <span>Printed in Digital Space</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
