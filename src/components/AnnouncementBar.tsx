"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X } from "lucide-react";

export default function AnnouncementBar() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="relative w-full bg-[#121212] text-[#FAF9F5] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] py-2 px-4 border-b border-[#262626]">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <span className="hidden md:inline font-mono text-[#7A6A5C]">
          VOL. 01 • 2026 ARCHIVE
        </span>

        {/* Center Ticker / Message */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center truncate">
          <Sparkles className="h-3 w-3 text-[#D4AF37] shrink-0 hidden sm:inline" />
          <span className="truncate">
            WORLDWIDE TRACKED LOGISTICS VIA FOURTHWALL • INSTANT PROMPTBASE DIGITAL REVEAL
          </span>
          <Link
            href="/prompts"
            className="hidden sm:inline-flex items-center gap-0.5 text-[#D4AF37] hover:underline underline-offset-2 shrink-0 font-semibold"
          >
            <span>Explore</span>
            <ArrowRight className="h-2.5 w-2.5" />
          </Link>
        </div>

        {/* Dismiss Button */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden lg:inline font-mono text-[#7A6A5C]">
            GLOBAL DISPATCH
          </span>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-0.5 hover:text-[#7A6A5C] transition-colors cursor-pointer text-[#666662]"
            aria-label="Dismiss banner"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}

