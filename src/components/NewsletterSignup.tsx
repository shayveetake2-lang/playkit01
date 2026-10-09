"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Loader2, Sparkles, Mail } from "lucide-react";
import { useToast } from "@/components/Toast";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
}

export default function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to subscribe.");
      }

      setIsSuccess(true);
      setEmail("");
      showToast("Added to Issue No. 02 Drop List", "success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Subscription error.";
      setErrorMsg(message);
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "card") {
    return (
      <div className="p-8 sm:p-12 bg-white border border-[#E7E5E0] shadow-sm max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
          <Sparkles className="h-3.5 w-3.5 stroke-[1.5]" />
          <span>Atelier Dispatch • VIP Drop Access</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#121212] font-normal tracking-tight">
          Join the Issue No. 02 Drop List
        </h3>

        <p className="text-xs text-[#666662] leading-relaxed font-light">
          Receive priority early access to limited-edition heavyweight streetwear capsules, calibrated prompt blueprints, and private atelier drops. No spam; only verified dispatches.
        </p>

        {isSuccess ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Check className="h-4 w-4 stroke-[2]" />
            <span>You have been inscribed onto the VIP drop list. Priority access granted.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-2 space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-[#FAF9F5] border border-[#E7E5E0] text-xs text-[#121212] focus:outline-none focus:border-[#121212] transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors text-xs uppercase tracking-widest font-medium flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <>
                    <span>Enroll</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
            {errorMsg && <p className="text-[11px] text-red-500">{errorMsg}</p>}
          </form>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold">
        <Mail className="h-3 w-3 stroke-[1.5]" />
        <span>Drop List Dispatch</span>
      </div>

      <p className="text-xs text-[#666662] leading-relaxed max-w-sm">
        Sign up for exclusive releases, deterministic prompt updates, and limited physical edition runs.
      </p>

      {isSuccess ? (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <Check className="h-3.5 w-3.5 stroke-[2]" />
          <span>Inscribed to Drop List.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-1.5">
          <div className="flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address..."
              disabled={isSubmitting}
              className="px-3 py-2 bg-white border border-[#E7E5E0] text-xs text-[#121212] focus:outline-none focus:border-[#121212] w-full min-w-0"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-3.5 py-2 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] text-xs uppercase tracking-wider font-medium shrink-0 cursor-pointer disabled:opacity-50"
              aria-label="Subscribe to drop list"
            >
              {isSubmitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          {errorMsg && <p className="text-[10px] text-red-500">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}

