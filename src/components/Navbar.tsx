"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShoppingBag } from "lucide-react";
import { brandConfig } from "@/data/socials";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide Navbar when on /admin studio
  const isAdmin = pathname?.startsWith("/admin");

  // Smart Hide on Scroll Down, Reveal on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at very top
      if (currentScrollY < 40) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 120) {
        // Scrolling down -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> reveal
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isAdmin) {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Index" },
    { href: "/prompts", label: "Archive" },
    { href: "/merch", label: "Editions" },
  ];

  return (
    <>
      {/* Top Utility Masthead Bar */}
      <div className="w-full bg-[#121212] text-[#FAF9F5] text-[10px] uppercase tracking-[0.25em] py-2 px-4 border-b border-[#262626]">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="hidden md:inline font-mono">VOL. 01 • 2026 ARCHIVE</span>
          <span className="mx-auto md:mx-0 truncate">
            INDEPENDENT STUDIO • VERIFIED DISPATCH (PROMPTBASE & REDBUBBLE)
          </span>
          <span className="hidden md:inline font-mono">GLOBAL FULFILLMENT</span>
        </div>
      </div>

      {/* Main Sticky Masthead (z-40 in stacking hierarchy) */}
      <header
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out border-b border-[#E7E5E0] bg-[#FAF9F5]/90 backdrop-blur-md ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20">
          {/* Bulletproof 3-Column Layout: Left Nav | Center Brand | Right Bag */}
          <div className="h-full grid grid-cols-2 md:grid-cols-3 items-center">
            {/* Column 1: Left Navigation Links (Desktop) / Mobile Menu Trigger */}
            <div className="flex items-center">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#121212] hover:text-[#7A6A5C] transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 stroke-[1.5]" />
                ) : (
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                )}
              </button>

              {/* Desktop Concise Links */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#121212]">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative py-1 hover:text-[#7A6A5C] transition-colors ${
                        isActive
                          ? "text-[#121212] font-semibold"
                          : "text-[#666662]"
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#121212]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Column 2: Center Brand Masthead (Natural centering without absolute collision) */}
            <div className="hidden md:flex flex-col items-center justify-center text-center">
              <Link href="/" className="inline-block group text-center">
                <span className="font-serif text-2xl lg:text-3xl font-normal tracking-[0.18em] text-[#121212] block">
                  PLAYKIT 01
                </span>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block -mt-0.5">
                  Studio Archive
                </span>
              </Link>
            </div>

            {/* Mobile Brand Title (When screen < md) */}
            <div className="md:hidden flex items-center justify-center">
              <Link href="/" className="inline-block text-center">
                <span className="font-serif text-xl font-normal tracking-[0.15em] text-[#121212] block">
                  PLAYKIT 01
                </span>
              </Link>
            </div>

            {/* Column 3: Right Action Suite (Bag + Verified Profile) */}
            <div className="flex items-center justify-end gap-3 sm:gap-6">
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-[#666662] hover:text-[#121212] transition-colors"
              >
                <span>PromptBase</span>
                <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
              </a>

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors"
                aria-label="Open Archive Bag"
              >
                <ShoppingBag className="h-3.5 w-3.5 stroke-[1.5]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="font-mono text-[11px]">({itemsCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E5E0] bg-[#FAF9F5] px-6 py-8 space-y-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4 text-xs uppercase tracking-[0.25em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 text-[#121212] ${
                    pathname === link.href
                      ? "font-semibold underline underline-offset-4"
                      : "text-[#666662]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-6 border-t border-[#E7E5E0] flex flex-col space-y-3 text-xs tracking-wider text-[#666662]">
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <span>PromptBase Archive (@ploykit)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={brandConfig.socials.redbubble}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <span>Redbubble Merch (@playkit01)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
