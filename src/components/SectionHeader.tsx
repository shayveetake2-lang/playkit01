import React from "react";
import Link from "next/link";
import { ChevronRight, LucideIcon } from "lucide-react";

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
  icon: Icon,
  badge,
  viewAllHref,
  viewAllText = "View all",
}: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-violet-950/70 text-violet-300 border border-violet-800/40 mb-2">
            {Icon && <Icon className="h-3 w-3 text-violet-400" />}
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-xl">
          {subtitle}
        </p>
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors group flex-shrink-0"
        >
          <span>{viewAllText}</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      )}
    </div>
  );
}
