"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const BannerVideoHomePage = () => {
  const t = useTranslations("home.bannerVideo");

  return (
    <section className="relative w-full h-[55vh] sm:h-[62vh] md:h-[68vh] max-h-[640px] min-h-[420px] overflow-hidden bg-black flex items-center justify-center select-none">
      {/* Background Full Width Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src="/videos/video-1.mp4" type="video/mp4" />
      </video>

      {/* Subtle Cinematic Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 backdrop-brightness-90" />

      {/* Centered Editorial Brand Content */}
      <div className="relative z-10 text-center text-white px-4 flex flex-col items-center justify-center space-y-2.5 sm:space-y-3.5">
        {/* Established Year */}
        <p className="text-[10px] sm:text-xs font-mono tracking-[0.3em] uppercase text-white/80 font-medium">
          {t("est")}
        </p>

        {/* Brand Title */}
        <h2 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.16em] uppercase text-white leading-none">
          IDSHOPCASE
        </h2>

        {/* Location / Brand Subtitle */}
        <p className="text-xs sm:text-lg font-bold tracking-[0.25em] uppercase text-white/90">
          {t("city")}
        </p>

        {/* Action Button */}
        <div className="pt-3 sm:pt-4 mt-8">
          <Link
            href="/about"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white text-black border border-white hover:bg-transparent hover:text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {t("ourStory")}
          </Link>
        </div>
      </div>
    </section>
  );
};
