"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Client Error Boundary caught exception:", error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-24 text-center bg-[#FAF9F5] text-[#121212]">
      <div className="max-w-md mx-auto space-y-6">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center justify-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
          <span>Atelier Exception • Archive Alert</span>
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#121212] font-normal leading-tight">
          An Unexpected Interruption Occurred.
        </h1>

        <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
          We encountered an unexpected rendering interruption while loading this archival record. Our systems have logged this event for investigation.
        </p>

        {error.digest && (
          <p className="font-mono text-[10px] text-[#7A6A5C] bg-white border border-[#E7E5E0] px-2 py-1 inline-block">
            REF: {error.digest}
          </p>
        )}

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs uppercase tracking-widest font-medium">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reload Record</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 border border-[#121212] text-[#121212] hover:bg-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

