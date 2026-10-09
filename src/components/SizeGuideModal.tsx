"use client";

import React, { useState, useEffect } from "react";
import { X, Ruler, Check } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: string;
}

export default function SizeGuideModal({
  isOpen,
  onClose,
  category = "T-Shirt",
}: SizeGuideModalProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isHoodie = category.toLowerCase().includes("hoodie");
  const isCase = category.toLowerCase().includes("case") || category.toLowerCase().includes("phone");

  const teeSizes = [
    { size: "S", chestIn: "36 - 38", chestCm: "91 - 96", lengthIn: "28.0", lengthCm: "71.1", sleeveIn: "8.5", sleeveCm: "21.6" },
    { size: "M", chestIn: "39 - 41", chestCm: "99 - 104", lengthIn: "29.0", lengthCm: "73.7", sleeveIn: "9.0", sleeveCm: "22.9" },
    { size: "L", chestIn: "42 - 44", chestCm: "107 - 112", lengthIn: "30.0", lengthCm: "76.2", sleeveIn: "9.5", sleeveCm: "24.1" },
    { size: "XL", chestIn: "45 - 47", chestCm: "114 - 119", lengthIn: "31.0", lengthCm: "78.7", sleeveIn: "10.0", sleeveCm: "25.4" },
    { size: "2XL", chestIn: "48 - 50", chestCm: "122 - 127", lengthIn: "32.0", lengthCm: "81.3", sleeveIn: "10.5", sleeveCm: "26.7" },
  ];

  const hoodieSizes = [
    { size: "S", chestIn: "38 - 40", chestCm: "96 - 102", lengthIn: "27.0", lengthCm: "68.6", sleeveIn: "33.5", sleeveCm: "85.1" },
    { size: "M", chestIn: "41 - 43", chestCm: "104 - 109", lengthIn: "28.0", lengthCm: "71.1", sleeveIn: "34.5", sleeveCm: "87.6" },
    { size: "L", chestIn: "44 - 46", chestCm: "112 - 117", lengthIn: "29.0", lengthCm: "73.7", sleeveIn: "35.5", sleeveCm: "90.2" },
    { size: "XL", chestIn: "47 - 49", chestCm: "119 - 124", lengthIn: "30.0", lengthCm: "76.2", sleeveIn: "36.5", sleeveCm: "92.7" },
    { size: "2XL", chestIn: "50 - 52", chestCm: "127 - 132", lengthIn: "31.0", lengthCm: "78.7", sleeveIn: "37.5", sleeveCm: "95.3" },
  ];

  const activeApparelSizes = isHoodie ? hoodieSizes : teeSizes;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] border border-[#E7E5E0] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#E7E5E0] pb-4 mb-6">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#7A6A5C] font-semibold flex items-center gap-1.5">
              <Ruler className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>Atelier Garment Metrics</span>
            </span>
            <h3 className="font-serif text-2xl text-[#121212] font-normal mt-1">
              {isCase ? "Case Compatibility Chart" : isHoodie ? "Heavyweight Fleece Sizing Guide" : "Standard Ringspun Tee Sizing Guide"}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#666662] hover:text-[#121212] transition-colors cursor-pointer"
            aria-label="Close size guide"
          >
            <X className="h-5 w-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {!isCase ? (
            <>
              {/* Unit Switcher */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#666662]">
                  Select preferred unit of measurement:
                </span>
                <div className="inline-flex border border-[#E7E5E0] bg-white p-0.5">
                  <button
                    type="button"
                    onClick={() => setUnit("in")}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium transition-colors ${
                      unit === "in" ? "bg-[#121212] text-[#FAF9F5]" : "text-[#666662] hover:text-[#121212]"
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit("cm")}
                    className={`px-3 py-1 text-xs uppercase tracking-wider font-medium transition-colors ${
                      unit === "cm" ? "bg-[#121212] text-[#FAF9F5]" : "text-[#666662] hover:text-[#121212]"
                    }`}
                  >
                    Centimeters
                  </button>
                </div>
              </div>

              {/* Sizing Table */}
              <div className="border border-[#E7E5E0] bg-white overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F5F3EE] border-b border-[#E7E5E0] text-[10px] uppercase tracking-wider text-[#7A6A5C]">
                    <tr>
                      <th className="py-2.5 px-4 font-semibold">Size</th>
                      <th className="py-2.5 px-4 font-semibold">Chest ({unit})</th>
                      <th className="py-2.5 px-4 font-semibold">Body Length ({unit})</th>
                      <th className="py-2.5 px-4 font-semibold">Sleeve Length ({unit})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7E5E0] text-[#121212]">
                    {activeApparelSizes.map((row) => (
                      <tr key={row.size} className="hover:bg-[#FAF9F5]/80 transition-colors">
                        <td className="py-2.5 px-4 font-serif font-medium">{row.size}</td>
                        <td className="py-2.5 px-4 font-mono">{unit === "in" ? row.chestIn : row.chestCm}</td>
                        <td className="py-2.5 px-4 font-mono">{unit === "in" ? row.lengthIn : row.lengthCm}</td>
                        <td className="py-2.5 px-4 font-mono">{unit === "in" ? row.sleeveIn : row.sleeveCm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fit Tips */}
              <div className="p-4 bg-[#F5F3EE] border border-[#E7E5E0] space-y-2 text-xs text-[#666662]">
                <span className="font-semibold text-[#121212] block">
                  Atelier Silhouette Recommendation:
                </span>
                <p>
                  Fabricated with a structured, boxy drape and standard armhole depth. For an authentic relaxed oversized streetwear look, order <strong>one size up</strong> from your standard fit.
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-4 text-xs text-[#666662]">
              <p>
                Our impact-resistant dual-layer cases are custom-engineered for exact bezel clearance, MagSafe magnet alignment, and tactile button responsiveness.
              </p>
              <div className="p-4 bg-white border border-[#E7E5E0] space-y-2">
                <span className="font-semibold text-[#121212] block">Supported Device Models:</span>
                <ul className="grid grid-cols-2 gap-2 text-[#121212] font-mono text-xs">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> iPhone 16 / 16 Pro / Pro Max</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> iPhone 15 / 15 Pro / Pro Max</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> iPhone 14 / 14 Pro / Pro Max</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> iPhone 13 / 13 Pro / Pro Max</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Samsung Galaxy S24 / S24 Ultra</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-600" /> Samsung Galaxy S23 / S23 Ultra</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 mt-6 border-t border-[#E7E5E0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#121212] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#262626] transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}

