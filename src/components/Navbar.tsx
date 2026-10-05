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
    { href: "/prompts", label: "The Archive (Prompts)" },
    { href: "/merch", label: "Physical Editions (Merch)" },
  ];

  return (
    <>
      {/* Top Utility Masthead Bar */}
      <div className="w-full bg-[#121212] text-[#FAF9F5] text-[10px] uppercase tracking-[0.25em] py-2 px-4 text-center border-b border-[#262626]">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="hidden sm:inline">Collection 2026 • Vol. 01</span>
          <span className="mx-auto sm:mx-0">
            Independent Studio • Verified PromptBase & Redbubble Dispatch
          </span>
          <span className="hidden sm:inline">Global Fulfillment</span>
        </div>
      </div>

      {/* Main Sticky Masthead */}
      <header
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out border-b border-[#E7E5E0] bg-[#FAF9F5]/90 backdrop-blur-md ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Left: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-[#121212]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative py-1 hover:text-[#7A6A5C] transition-colors ${
                    isActive ? "text-[#121212] font-semibold" : "text-[#666662]"
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#121212] hover:text-[#7A6A5C] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 stroke-[1.5]" />
              ) : (
                <Menu className="h-6 w-6 stroke-[1.5]" />
              )}
            </button>
          </div>

          {/* Center: Brand Masthead */}
          <div className="absolute left-1/2 -translate-x-1/2 text-center">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.15em] text-[#121212] block">
                PLAYKIT 01
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block -mt-0.5">
                Studio Archive
              </span>
            </Link>
          </div>

          {/* Right: Cart Bag & Dispatch Link */}
          <div className="flex items-center gap-4 sm:gap-6">
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
              className="inline-flex items-center gap-2 px-3.5 py-2 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors"
              aria-label="Open Archive Bag"
            >
              <ShoppingBag className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Bag</span>
              <span className="font-mono text-[11px]">({itemsCount})</span>
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E5E0] bg-[#FAF9F5] px-6 py-8 space-y-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-4 text-sm uppercase tracking-[0.2em]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-1 text-[#121212] ${
                    pathname === link.href ? "font-semibold" : "text-[#666662]"
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
                <span>PromptBase Profile (@ploykit)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <a
                href={brandConfig.socials.redbubble}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between"
              >
                <span>Redbubble Merch Store (@playkit01)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
