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
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
              <PackageCheck className="h-3 w-3 stroke-[1.5]" />
              <span>Material Integrity</span>
            </span>
            <h4 className="font-serif text-base text-[#121212] font-normal">
              Heavyweight Garments & Editions
            </h4>
            <p className="text-xs text-[#666662] leading-relaxed">
              Physical merchandise is fabricated on premium ringspun cotton and archival vinyl, fulfilled worldwide via Redbubble with tracked delivery.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 stroke-[1.5]" />
              <span>Verified Fulfillment</span>
            </span>
            <h4 className="font-serif text-base text-[#121212] font-normal">
              Guaranteed Buyer Protection
            </h4>
            <p className="text-xs text-[#666662] leading-relaxed">
              Digital purchases are verified instantly on PromptBase; physical pieces carry Redbubble&apos;s 30-day global guarantee and secure checkout.
            </p>
          </div>
        </div>
      </div>

      {/* Main Colophon Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand Manifesto */}
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
              An independent creative studio dedicated to the intersection of generative artificial intelligence blueprints and physical apparel.
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

          {/* Directory Column 1 */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
              The Archive
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#121212]">
              <li>
                <Link href="/prompts" className="hover:text-[#7A6A5C] transition-colors">
                  All Prompt Formulas
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-[#7A6A5C] transition-colors">
                  Gemini Image Blueprints
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-[#7A6A5C] transition-colors">
                  Claude & Midjourney Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold block">
              Physical Editions
            </span>
            <ul className="space-y-2 text-xs uppercase tracking-wider text-[#121212]">
              <li>
                <Link href="/merch" className="hover:text-[#7A6A5C] transition-colors">
                  Apparel & T-Shirts
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-[#7A6A5C] transition-colors">
                  Die-Cut Vinyl Stickers
                </Link>
              </li>
              <li>
                <Link href="/merch" className="hover:text-[#7A6A5C] transition-colors">
                  Ceramic Objects & Mugs
                </Link>
              </li>
            </ul>
          </div>

          {/* Directory Column 3 */}
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
                  href={brandConfig.socials.redbubble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7A6A5C] transition-colors flex items-center justify-between"
                >
                  <span>Redbubble</span>
                  <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="mt-16 pt-8 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666662] tracking-wider">
          <p>© {new Date().getFullYear()} PLAYKIT 01 Studio. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 uppercase tracking-widest text-[10px] text-[#7A6A5C]">
            Volume 01 • Printed in Digital Space
          </p>
        </div>
      </div>
    </footer>
  );
}
