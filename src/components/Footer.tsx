"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Layers,
  Sparkles,
  Shirt,
  ExternalLink,
  ShieldCheck,
  Truck,
  Zap,
  Lock,
} from "lucide-react";
import { brandConfig } from "@/data/socials";
import { InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on /admin studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="border-t border-white/[0.08] bg-slate-950 text-slate-400">
      {/* Value Badges Banner */}
      <div className="border-b border-white/[0.06] bg-slate-900/30 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-400 border border-indigo-800/40">
              <Zap className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Battle-Tested Prompts</h4>
              <p className="text-xs text-slate-400">Curated formulas for Gemini Image, Claude & Midjourney</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-700/60">
              <Truck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Global Tracked Shipping</h4>
              <p className="text-xs text-slate-400">Printed on-demand and dispatched worldwide via Redbubble</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Buyer Protection</h4>
              <p className="text-xs text-slate-400">Secure checkout handled directly on PromptBase & Redbubble</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-500 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                playkit<span className="text-indigo-400">01</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {brandConfig.description}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/[0.05] text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-colors"
                aria-label="Instagram"
                title="@playkit01 on Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={brandConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-white/[0.05] text-slate-400 hover:text-indigo-300 hover:border-indigo-500/30 transition-colors"
                aria-label="LinkedIn"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Catalog Navigation
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-300 transition-colors">
                  Storefront Home
                </Link>
              </li>
              <li>
                <Link
                  href="/prompts"
                  className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
                >
                  <Sparkles className="h-3 w-3 text-indigo-400" />
                  <span>AI Prompts Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="flex items-center gap-1.5 hover:text-indigo-300 transition-colors"
                >
                  <Shirt className="h-3 w-3 text-slate-400" />
                  <span>T-Shirts & Apparel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* External Marketplaces */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Official Channels
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-200 transition-colors"
                >
                  <span>PromptBase @ploykit</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.redbubble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-200 transition-colors"
                >
                  <span>Redbubble Shop @playkit01</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-200 transition-colors"
                >
                  <span>Instagram @playkit01</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-indigo-200 transition-colors"
                >
                  <span>LinkedIn Network</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Fulfillment & Admin */}
          <div className="text-xs space-y-2">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Fulfillment & Admin
            </h3>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Prompt formulas are delivered digitally via <strong className="text-slate-300">PromptBase</strong>. Physical items are fulfilled with worldwide tracked postage by <strong className="text-slate-300">Redbubble</strong>.
            </p>
            <div className="pt-3">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/[0.08] text-amber-400 hover:text-amber-300 hover:border-amber-500/40 text-[11px] font-semibold transition-all shadow-sm"
              >
                <Lock className="h-3 w-3" />
                <span>Admin Studio Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} playkit01. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with modern AI precision for creators & collectors.
          </p>
        </div>
      </div>
    </footer>
  );
}
