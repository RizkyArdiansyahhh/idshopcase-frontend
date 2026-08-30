"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { X } from "lucide-react";

export const StudioHeader = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 lg:px-10 pt-3 sm:pt-5 pb-2 flex-shrink-0 z-40">
      {/* Left: Floating Close (X) Circle Button -> Home */}
      <Link
        href="/"
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white hover:bg-black hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-xs group shrink-0"
        title="Tutup & Kembali ke Beranda"
      >
        <X className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-90 transition-transform duration-200" />
      </Link>

      {/* Right: IDSHOPCASE STUDIO in top right corner */}
      <Link
        href="/"
        className="font-[family-name:var(--font-poppins)] text-sm sm:text-lg lg:text-2xl font-bold tracking-wider uppercase hover:opacity-85 transition-opacity text-neutral-900 select-none"
      >
        IDSHOPCASE STUDIO
      </Link>
    </header>
  );
};
