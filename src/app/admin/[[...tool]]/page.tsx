"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity/sanity.config";

export default function AdminStudioPage() {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-950">
      <NextStudio config={config} />
    </div>
  );
}
