"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Shirt,
  Compass,
  ExternalLink,
  Menu,
  X,
  Layers,
  Shield,
} from "lucide-react";
import { brandConfig } from "@/data/socials";
import { InstagramIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide Navbar when on /admin studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Compass },
    { href: "/prompts", label: "AI Prompts", icon: Sparkles, badge: "Digital" },
    { href: "/merch", label: "T-Shirts & Merch", icon: Shirt, badge: "Physical" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Layers className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              playkit<span className="text-indigo-400">01</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
              Studio & Store
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/15 text-indigo-300 border border-indigo-500/30 shadow-sm shadow-indigo-950/50"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      link.badge === "Digital"
                        ? "bg-indigo-950/80 text-indigo-300 border border-indigo-800/40"
                        : "bg-slate-900 text-slate-300 border border-slate-700/60"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* External Social & Marketplace Links */}
        <div className="hidden lg:flex items-center gap-2.5 border-l border-white/[0.08] pl-4">
          <a
            href={brandConfig.socials.promptbase}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-950/50 text-indigo-200 border border-indigo-800/40 hover:bg-indigo-900/60 hover:text-white transition-all shadow-sm"
            title="PromptBase Profile @ploykit"
          >
            <span>PromptBase</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>

          <a
            href={brandConfig.socials.redbubble}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-slate-200 border border-slate-700/60 hover:bg-slate-800 hover:text-white transition-all shadow-sm"
            title="Redbubble Shop @playkit01"
          >
            <span>Redbubble</span>
            <ExternalLink className="h-3 w-3 opacity-70" />
          </a>

          <div className="flex items-center gap-1 pl-1 text-slate-400">
            <a
              href={brandConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-indigo-300 hover:bg-slate-900 transition-colors"
              aria-label="Instagram Profile @playkit01"
              title="@playkit01 on Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href={brandConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-indigo-300 hover:bg-slate-900 transition-colors"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>
            <Link
              href="/admin"
              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-400 hover:bg-slate-900 transition-colors ml-1"
              title="Admin CMS Studio"
            >
              <Shield className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-slate-950/95 px-4 pt-3 pb-5 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/30"
                      : "text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-indigo-400" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase bg-slate-800 text-slate-300">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/[0.08] flex flex-col gap-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              External Marketplaces
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-800/50"
              >
                PromptBase <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={brandConfig.socials.redbubble}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg bg-slate-900 text-slate-200 border border-slate-700/60"
              >
                Redbubble <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="flex items-center justify-between pt-2 px-1 text-slate-400">
              <div className="flex items-center gap-4">
                <a
                  href={brandConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-indigo-300"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
                <a
                  href={brandConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs hover:text-indigo-300"
                >
                  <LinkedinIcon className="h-4 w-4" /> LinkedIn
                </a>
              </div>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-amber-400 font-semibold flex items-center gap-1 hover:underline"
              >
                <Shield className="h-3.5 w-3.5" /> Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
