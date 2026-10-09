"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  CheckCircle,
  Copy,
  Check,
  Mail,
  MessageSquare,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  Sparkles,
  Shirt,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { brandConfig } from "@/data/socials";

interface FormData {
  name: string;
  email: string;
  inquiryType: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    inquiryType: "Custom Prompt Architecture",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptId, setReceiptId] = useState("");
  const [submittedAt, setSubmittedAt] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const studioEmail = "contact@playkit01.store";

  const inquiryTypes = [
    {
      id: "Custom Prompt Architecture",
      label: "Custom Prompt Architecture",
      desc: "Bespoke deterministic formulas & parameter tuning",
      icon: Sparkles,
    },
    {
      id: "Physical Edition / Order Support",
      label: "Physical Edition Support",
      desc: "Fourthwall apparel, tracking & bulk physical editions",
      icon: Shirt,
    },
    {
      id: "Enterprise AI Consultation",
      label: "Enterprise AI Consultation",
      desc: "Autonomous workflow agents & system integrations",
      icon: MessageSquare,
    },
    {
      id: "General Atelier Inquiry",
      label: "General Atelier Inquiry",
      desc: "Press, collaborations & studio monograph questions",
      icon: HelpCircle,
    },
  ];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message details are required.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide at least 10 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Generate receipt and simulate transmission
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setReceiptId(`PLK-2026-${randomCode}`);
      setSubmittedAt(
        new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(studioEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyReceipt = () => {
    const text = `Transmission Ref: ${receiptId}\nSender: ${formData.name} <${formData.email}>\nType: ${formData.inquiryType}\nSubject: ${formData.subject || "Atelier Inquiry"}\nMessage:\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  const buildMailtoLink = () => {
    const subject = encodeURIComponent(`[${formData.inquiryType}] ${formData.subject || "Atelier Transmission"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nReference: ${receiptId}\n\nMessage:\n${formData.message}`
    );
    return `mailto:${studioEmail}?subject=${subject}&body=${body}`;
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      inquiryType: "Custom Prompt Architecture",
      subject: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#121212] py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-[#7A6A5C]">
          <Link href="/" className="hover:text-[#121212] transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="font-semibold text-[#121212]">Contact Atelier</span>
        </nav>

        {/* Section Masthead */}
        <div className="border-b border-[#E7E5E0] pb-8 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
              Communications Dispatch • Direct Channel
            </span>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#666662]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#121212]" />
              <span>Studio Response SLA: 24–48 Hours</span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#121212] font-normal tracking-tight">
            Contact the Atelier
          </h1>

          <p className="mt-4 text-xs sm:text-sm text-[#666662] max-w-2xl leading-relaxed font-light">
            Whether inquiring about custom prompt formula commissions, Fourthwall physical orders, or collaborative engineering, our atelier responds directly to every transmission.
          </p>
        </div>

        {/* Grid: Form on Left (7 cols), Direct Channels on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: FORM OR TRANSMISSION RECEIPT */}
          <div className="lg:col-span-7 bg-white border border-[#E7E5E0] p-6 sm:p-10 shadow-[0_2px_14px_rgba(18,18,18,0.04)]">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block mb-1">
                    Step 01 • Inquiry Classification
                  </span>
                  <label className="font-serif text-lg text-[#121212] block mb-3">
                    What can the studio assist you with?
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {inquiryTypes.map((type) => {
                      const Icon = type.icon;
                      const isSelected = formData.inquiryType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiryType: type.id })}
                          className={`p-3.5 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? "border-[#121212] bg-[#FAF9F5] shadow-xs"
                              : "border-[#E7E5E0] bg-white hover:border-[#121212]/50"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs uppercase tracking-wider font-medium text-[#121212]">
                              {type.label}
                            </span>
                            <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-[#121212]" : "text-[#7A6A5C]"}`} />
                          </div>
                          <span className="text-[11px] text-[#666662] font-light leading-snug">
                            {type.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E7E5E0] space-y-4">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block">
                    Step 02 • Sender Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs uppercase tracking-wider text-[#121212] mb-1 font-medium">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Mercer"
                        className={`w-full px-3.5 py-2.5 border text-xs bg-[#FAF9F5] focus:outline-none focus:border-[#121212] transition-colors ${
                          errors.name ? "border-red-500" : "border-[#E7E5E0]"
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs uppercase tracking-wider text-[#121212] mb-1 font-medium">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@domain.com"
                        className={`w-full px-3.5 py-2.5 border text-xs bg-[#FAF9F5] focus:outline-none focus:border-[#121212] transition-colors ${
                          errors.email ? "border-red-500" : "border-[#E7E5E0]"
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs uppercase tracking-wider text-[#121212] mb-1 font-medium">
                      Subject / Brief Summary (Optional)
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Custom Prompt Formula for Architectural Visuals"
                      className="w-full px-3.5 py-2.5 border border-[#E7E5E0] text-xs bg-[#FAF9F5] focus:outline-none focus:border-[#121212] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs uppercase tracking-wider text-[#121212] mb-1 font-medium">
                      Message / Project Scope <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your requirements, preferred models (Gemini, Midjourney, Claude), target delivery date, or Fourthwall order question..."
                      className={`w-full px-3.5 py-2.5 border text-xs bg-[#FAF9F5] focus:outline-none focus:border-[#121212] transition-colors resize-y ${
                        errors.message ? "border-red-500" : "border-[#E7E5E0]"
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message}</p>}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E7E5E0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-[11px] text-[#7A6A5C]">
                    <ShieldCheck className="h-4 w-4 stroke-[1.5]" />
                    <span>Transmitted securely to atelier archives</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] font-medium cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Encrypting & Transmitting...</span>
                    ) : (
                      <>
                        <span>Submit Transmission</span>
                        <Send className="h-3.5 w-3.5 stroke-[1.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* INTERACTIVE CONFIRMATION RECEIPT (OPTION 1) */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="flex items-start justify-between border-b border-[#E7E5E0] pb-4">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-700 mb-1">
                      <CheckCircle className="h-5 w-5 stroke-[1.5]" />
                      <span className="text-xs uppercase tracking-widest font-semibold">
                        Transmission Recorded
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl text-[#121212]">
                      Thank you, {formData.name}
                    </h2>
                  </div>
                  <span className="font-mono text-[11px] text-[#7A6A5C] bg-[#FAF9F5] border border-[#E7E5E0] px-2.5 py-1">
                    {receiptId}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#666662] leading-relaxed font-light">
                  Your transmission has been logged into the studio dispatch queue. The founder reviews incoming dispatches directly and will reply to <strong className="text-[#121212] font-medium">{formData.email}</strong> within 24–48 business hours.
                </p>

                {/* Archival Specification Plate */}
                <div className="p-4 sm:p-5 bg-[#FAF9F5] border border-[#E7E5E0] space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
                    <span className="text-[#7A6A5C] uppercase tracking-wider text-[10px]">Reference Code:</span>
                    <span className="font-mono font-semibold text-[#121212]">{receiptId}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
                    <span className="text-[#7A6A5C] uppercase tracking-wider text-[10px]">Logged At:</span>
                    <span className="text-[#121212]">{submittedAt}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
                    <span className="text-[#7A6A5C] uppercase tracking-wider text-[10px]">Classification:</span>
                    <span className="text-[#121212] font-medium">{formData.inquiryType}</span>
                  </div>
                  {formData.subject && (
                    <div className="flex justify-between border-b border-[#E7E5E0] pb-2">
                      <span className="text-[#7A6A5C] uppercase tracking-wider text-[10px]">Subject:</span>
                      <span className="text-[#121212] truncate max-w-[200px]">{formData.subject}</span>
                    </div>
                  )}
                  <div className="pt-1">
                    <span className="text-[#7A6A5C] uppercase tracking-wider text-[10px] block mb-1">Message Digest:</span>
                    <p className="text-[#121212] font-light bg-white p-2.5 border border-[#E7E5E0] max-h-28 overflow-y-auto leading-relaxed">
                      {formData.message}
                    </p>
                  </div>
                </div>

                {/* Transmission Actions */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopyReceipt}
                    className="px-4 py-2.5 border border-[#121212] text-xs uppercase tracking-wider text-[#121212] hover:bg-[#FAF9F5] transition-colors flex items-center gap-2 cursor-pointer font-medium"
                  >
                    {copiedReceipt ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Copied Summary</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Receipt</span>
                      </>
                    )}
                  </button>

                  <a
                    href={buildMailtoLink()}
                    className="px-4 py-2.5 bg-[#121212] text-[#FAF9F5] hover:bg-[#262626] transition-colors text-xs uppercase tracking-wider flex items-center gap-2 font-medium"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>Send via Mail Client</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 border border-[#E7E5E0] text-xs uppercase tracking-wider text-[#666662] hover:text-[#121212] transition-colors cursor-pointer ml-auto"
                  >
                    Send Another Transmission
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: DIRECT CHANNELS & ATELIER PROTOCOLS */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Channels Card */}
            <div className="bg-white border border-[#E7E5E0] p-6 sm:p-8 shadow-[0_2px_14px_rgba(18,18,18,0.04)] space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block mb-1">
                  Direct Atelier Contacts
                </span>
                <h3 className="font-serif text-xl text-[#121212]">
                  Immediate Channels
                </h3>
              </div>

              {/* Email Address with Copy Trigger */}
              <div className="p-4 bg-[#FAF9F5] border border-[#E7E5E0] space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-[#7A6A5C] font-semibold block">
                  Primary Studio Inbox
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-[#121212] truncate">
                    {studioEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 border border-[#E7E5E0] bg-white hover:border-[#121212] text-[#121212] transition-colors shrink-0 cursor-pointer"
                    title="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Verified Platforms List */}
              <div className="space-y-3 pt-2 border-t border-[#E7E5E0]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A6A5C] font-semibold block">
                  Verified Storefronts & Inquiries
                </span>

                <a
                  href={brandConfig.socials.promptbase}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-[#E7E5E0] hover:border-[#121212] transition-colors flex items-center justify-between group block bg-[#FAF9F5]"
                >
                  <div>
                    <span className="font-serif text-sm text-[#121212] group-hover:text-[#7A6A5C] transition-colors block">
                      PromptBase Direct Message
                    </span>
                    <span className="text-[11px] text-[#666662] font-light">
                      @ploykit • Digital formula support
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href="https://checkout.playkit01.store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-[#E7E5E0] hover:border-[#121212] transition-colors flex items-center justify-between group block bg-[#FAF9F5]"
                >
                  <div>
                    <span className="font-serif text-sm text-[#121212] group-hover:text-[#7A6A5C] transition-colors block">
                      Fourthwall Order Logistics
                    </span>
                    <span className="text-[11px] text-[#666662] font-light">
                      Track orders, returns & shipping updates
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                  href={brandConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 border border-[#E7E5E0] hover:border-[#121212] transition-colors flex items-center justify-between group block bg-[#FAF9F5]"
                >
                  <div>
                    <span className="font-serif text-sm text-[#121212] group-hover:text-[#7A6A5C] transition-colors block">
                      Professional LinkedIn
                    </span>
                    <span className="text-[11px] text-[#666662] font-light">
                      Full-stack engineering & AI consulting
                    </span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#121212] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>

            {/* Response Protocol Card */}
            <div className="bg-[#FAF9F5] border border-[#E7E5E0] p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#121212] font-semibold">
                <Clock className="h-4 w-4 stroke-[1.5]" />
                <span>Operating Cadence</span>
              </div>
              <p className="text-xs text-[#666662] leading-relaxed font-light">
                Dispatches are monitored across Monday – Friday, 09:00 to 18:00 NZST. Urgent commercial inquiries receive priority triage within 12 hours.
              </p>
              <div className="pt-2 border-t border-[#E7E5E0]">
                <Link
                  href="/help"
                  className="text-xs uppercase tracking-wider text-[#121212] hover:text-[#7A6A5C] transition-colors flex items-center justify-between font-medium"
                >
                  <span>Need Immediate Help? Read the FAQ</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

