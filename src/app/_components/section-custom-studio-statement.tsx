"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const SectionCustomStudioStatement = () => {
  const t = useTranslations("home.customStudioStatement");

  return (
    <section className="w-full py-14 sm:py-18 md:py-24 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-white text-left select-none font-[family-name:var(--font-fustat)]">
      <div className="w-full max-w-[1360px] mx-auto space-y-3 sm:space-y-4">
        {/* Massive Bold Headline - Left Aligned */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-neutral-900 uppercase leading-[1.08] max-w-2xl">
          {t("title")}
        </h2>

        {/* Editorial Subtitle - Left Aligned */}
        <p className="text-xs sm:text-sm md:text-base text-neutral-600 font-normal max-w-2xl leading-relaxed">
          {t("subtitle")}
        </p>

        {/* Black Capsule/Pill Button - Left Aligned */}
        <div className="pt-2">
          <Link
            href="/customizer"
            className="inline-flex items-center justify-center px-8 sm:px-10 py-3 rounded-none bg-black text-white border border-black hover:bg-transparent hover:text-black font-bold text-xs sm:text-sm tracking-widest uppercase transition-all shadow-sm cursor-pointer"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};
