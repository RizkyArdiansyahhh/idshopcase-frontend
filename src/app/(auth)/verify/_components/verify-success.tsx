"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const VerifySuccess = () => {
  const { replace } = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      replace("/");
    }, 2200);

    return () => clearTimeout(timer);
  }, [replace]);

  return (
    <div className="flex flex-col items-center text-center space-y-6 sm:space-y-7 w-full font-sans select-none animate-fade-in py-2">
      {/* 1. Header Typography (Pure Minimalist, No Graphics/Icons) */}
      <div className="space-y-2.5 w-full">
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-neutral-400 font-semibold">
          Account Verified
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
          Welcome to Idshopcase
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal leading-relaxed max-w-xs mx-auto">
          Email Anda berhasil diverifikasi. Anda akan dialihkan secara otomatis ke beranda...
        </p>
      </div>

      {/* 2. Direct Action Button (Sharp Luxury CTA) */}
      <div className="w-full pt-2">
        <Button
          variant="default"
          className="w-full h-12 bg-neutral-900 hover:bg-black text-white rounded-none uppercase tracking-widest text-xs font-semibold cursor-pointer transition-all shadow-none"
          type="button"
          onClick={() => replace("/")}
        >
          Mulai Belanja Sekarang
        </Button>
      </div>
    </div>
  );
};

export default VerifySuccess;
