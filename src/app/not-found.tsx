import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
          Error 404 • Index Missing
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal leading-tight">
          Page 404 — Edition Not Found.
        </h1>

        <p className="text-sm text-[#666662] leading-relaxed">
          The requested archival record or garment does not exist in this current volume. It may have been archived or relocated.
        </p>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#121212] text-xs uppercase tracking-widest text-[#121212] hover:bg-[#121212] hover:text-[#FAF9F5] transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 stroke-[1.5]" />
            <span>Return to the Permanent Collection</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
