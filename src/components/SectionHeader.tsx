import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon;
  badge?: string;
  viewAllHref?: string;
  viewAllText?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  viewAllHref,
  viewAllText = "Explore Collection",
}: SectionHeaderProps) {
  return (
    <div className="border-b border-[#E7E5E0] pb-5 mb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          {badge && (
            <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#7A6A5C] mb-2">
              {badge}
            </span>
          )}
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121212] font-normal tracking-tight">
            {title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#666662] max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#121212] hover:text-[#7A6A5C] transition-colors group self-start md:self-end pb-1"
          >
            <span className="relative">
              {viewAllText}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#121212] transition-all duration-300 group-hover:w-full" />
            </span>
            <ArrowRight className="h-3.5 w-3.5 stroke-[1.5] group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
