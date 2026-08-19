"use client";

import React from "react";
import { Link } from "@/i18n/navigation";
import { PenTool, ArrowRight } from "lucide-react";

export const FloatingCustomizerButton = () => {
  return (
    <aside
      aria-label="Studio Customizer"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 select-none group"
    >
      <Link
        href="/customizer"
        className="flex items-center bg-black hover:bg-black text-white rounded-l-full group-hover:rounded-full border-l-2 border-t-2 border-b-2 border-white group-hover:border-2 group-hover:border-white shadow-[-4px_4px_25px_rgba(0,0,0,0.2)] group-hover:shadow-[-8px_8px_35px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out group-hover:-translate-x-3 sm:group-hover:-translate-x-5 py-2.5 pl-3 pr-2.5 sm:py-3 sm:pl-3.5 sm:pr-3"
      >
        {/* Left: Professional PenTool / Edit Icon */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
          <PenTool className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white stroke-[2.2]" />
        </div>

        {/* Expandable Text & Arrow (Hidden by default, expands on hover) */}
        <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 overflow-hidden flex items-center whitespace-nowrap transition-all duration-300 ease-out pl-0 group-hover:pl-2.5 group-hover:pr-1">
          <div className="flex flex-col text-left leading-none pr-2">
            <span className="text-xs sm:text-sm font-black tracking-tight text-white">
              Preview Custom Produk
            </span>
            <span className="text-[10px] text-gray-300 font-medium mt-0.5">
              Kreasikan Desain Sendiri
            </span>
          </div>

          <div className="text-white/80 group-hover:translate-x-0.5 transition-transform duration-200">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Link>
    </aside>
  );
};

export default FloatingCustomizerButton;
