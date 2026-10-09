"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ShoppingBag, HelpCircle, Mail } from "lucide-react";
import { brandConfig } from "@/data/socials";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { itemsCount, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [logoAvailable, setLogoAvailable] = useState(true);

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
    { href: "/", label: "Home" },
    { href: "/prompts", label: "AI Prompts" },
    { href: "/merch", label: "Merch" },
    { href: "/studio", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Top Utility Masthead Bar */}
      <div className="w-full bg-[#121212] text-[#FAF9F5] text-[10px] uppercase tracking-[0.25em] py-2 px-4 border-b border-[#262626]">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <span className="hidden md:inline font-mono">VOL. 01 • 2026 ARCHIVE</span>
          <span className="mx-auto md:mx-0 truncate">
            INDEPENDENT STUDIO • VERIFIED DISPATCH (PROMPTBASE & FOURTHWALL)
          </span>
          <span className="hidden md:inline font-mono">GLOBAL FULFILLMENT</span>
        </div>
      </div>

      {/* Main Sticky Masthead */}
      <header
        className={`sticky top-0 z-40 w-full transition-transform duration-300 ease-in-out border-b border-[#E7E5E0] bg-[#FAF9F5]/90 backdrop-blur-md ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20">
          <div className="h-full flex items-center justify-between gap-4">
            {/* Left: Brand Logo */}
            <div className="flex items-center">
              <Link href="/" className="inline-flex flex-col items-start group">
                {logoAvailable ? (
                  <Image
                    src="/logo.png"
                    alt="PLAYKIT 01"
                    width={130}
                    height={32}
                    onError={() => setLogoAvailable(false)}
                    className="h-6 sm:h-7 w-auto object-contain"
                    priority
                  />
                ) : (
                  <>
                    <span className="font-serif text-xl sm:text-2xl font-normal tracking-[0.16em] text-[#121212] block">
                      PLAYKIT 01
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block -mt-0.5">
                      Studio Archive
                    </span>
                  </>
                )}
              </Link>
            </div>

            {/* Center: Clean Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group relative py-1.5 flex items-center hover:text-[#7A6A5C] transition-colors"
                  >
                    <span
                      className={`text-xs uppercase tracking-[0.18em] font-medium transition-colors ${
                        isActive
                          ? "text-[#121212] font-semibold"
                          : "text-[#666662] hover:text-[#121212]"
                      }`}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#121212]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Quick Action Suite (Help, PromptBase, Bag & Mobile Toggle) */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Help / FAQ Link */}
              <Link
                href="/help"
                className={`hidden sm:inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                  pathname === "/help" ? "text-[#121212] font-semibold" : "text-[#666662] hover:text-[#121212]"
                }`}
                title="Atelier FAQ & Help"
              >
                <HelpCircle className="h-3.5 w-3.5 stroke-[1.5]" />
                <span className="hidden lg:inline">Help</span>
              </Link>

              {/* PromptBase External Link */}
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.15em] text-[#666662] hover:text-[#121212] transition-colors"
              >
                <span>PromptBase</span>
                <ArrowUpRight className="h-3 w-3 stroke-[1.5]" />
              </a>

              {/* Shopping Bag Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors cursor-pointer"
                aria-label="Open Archive Bag"
              >
                <ShoppingBag className="h-3.5 w-3.5 stroke-[1.5]" />
                <span className="hidden sm:inline">Bag</span>
                <span className="font-mono text-[11px]">({itemsCount})</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-[#121212] hover:text-[#7A6A5C] transition-colors cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 stroke-[1.5]" />
                ) : (
                  <Menu className="h-6 w-6 stroke-[1.5]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E7E5E0] bg-[#FAF9F5] px-6 py-8 space-y-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-2 border-b border-[#E7E5E0]/60 ${
                    pathname === link.href
                      ? "text-[#121212] font-semibold"
                      : "text-[#666662]"
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.25em]">
                    {link.label}
                  </span>
                  {pathname === link.href && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
                  )}
                </Link>
              ))}

              <Link
                href="/help"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between py-2 border-b border-[#E7E5E0]/60 ${
                  pathname === "/help"
                    ? "text-[#121212] font-semibold"
                    : "text-[#666662]"
                }`}
              >
                <span className="text-xs uppercase tracking-[0.25em]">
                  Help & FAQ
                </span>
                <HelpCircle className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="pt-4 flex flex-col space-y-2.5 text-xs tracking-wider text-[#666662]">
              <a
                href={brandConfig.socials.promptbase}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-1"
              >
                <span>PromptBase Store (@ploykit)</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
              <Link
                href="/merch"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#121212]"
              >
                <span>Fourthwall Physical Editions</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-1 text-[#121212] font-medium"
              >
                <span className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3" />
                  <span>Contact Atelier</span>
                </span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
