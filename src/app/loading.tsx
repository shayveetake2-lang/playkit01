import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-24 bg-[#FAF9F5] text-[#121212]">
      <div className="flex flex-col items-center space-y-4">
        {/* Editorial pulse seal */}
        <div className="w-12 h-12 rounded-full border border-[#E7E5E0] bg-white flex items-center justify-center animate-pulse">
          <span className="font-serif italic text-base text-[#7A6A5C]">01</span>
        </div>

        <div className="space-y-1.5 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#7A6A5C] font-semibold block animate-pulse">
            Loading Archive
          </span>
          <p className="font-serif text-sm text-[#666662] font-light">
            Retrieving computational blueprints & physical editions...
          </p>
        </div>
      </div>
    </div>
  );
}

