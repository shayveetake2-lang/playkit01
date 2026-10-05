import React from "react";
import Link from "next/link";
import {
  Layers,
  Sparkles,
  Shirt,
  ExternalLink,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { brandConfig } from "@/data/socials";
import { InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/90 text-slate-400">
      {/* Value Badges Banner */}
      <div className="border-b border-slate-900 bg-slate-900/40 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-xl bg-violet-950/60 text-violet-400 border border-violet-800/40">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Battle-Tested Prompts</h4>
              <p className="text-xs text-slate-400">Verified outputs for Midjourney, DALL-E & Claude</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-xl bg-rose-950/60 text-rose-400 border border-rose-800/40">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Global Shipping</h4>
              <p className="text-xs text-slate-400">Fulfilled and printed worldwide via Redbubble</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="p-2 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/40">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Secure Direct Checkout</h4>
              <p className="text-xs text-slate-400">Protected buyer transactions on verified platforms</p>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                playkit<span className="text-fuchsia-400">01</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {brandConfig.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={brandConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-pink-400 hover:bg-slate-800 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={brandConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-blue-400 hover:bg-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Catalog Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Explore Catalog
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-violet-400 transition-colors">
                  Home / Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/prompts"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>AI Prompts Hub</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/merch"
                  className="flex items-center gap-1.5 hover:text-rose-400 transition-colors"
                >
                  <Shirt className="h-3.5 w-3.5 text-rose-400" />
                  <span>T-Shirts & Merch</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* External Platforms */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Storefronts
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-300 transition-colors"
                >
                  <span>PromptBase Store</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.redbubble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-rose-300 transition-colors"
                >
                  <span>Redbubble Shop</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-pink-300 transition-colors"
                >
                  <span>Instagram @playkit01</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={brandConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-blue-300 transition-colors"
                >
                  <span>LinkedIn Page</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Fulfillment Disclaimer */}
          <div className="text-xs space-y-2">
            <h3 className="font-semibold text-slate-200 uppercase tracking-wider mb-3">
              Purchase Information
            </h3>
            <p className="text-slate-400 leading-relaxed">
              All digital prompts are processed and downloaded instantly via{" "}
              <strong className="text-slate-200">PromptBase</strong>. Physical garments, stickers, and drinkware are printed on-demand and shipped via{" "}
              <strong className="text-slate-200">Redbubble</strong>.
            </p>
            <p className="text-slate-500 pt-1">
              Guaranteed customer support and return policies are backed by respective platform terms.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} playkit01. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with <span className="text-violet-400">♥</span> for creators, prompters & streetwear enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
}
