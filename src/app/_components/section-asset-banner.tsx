"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const SectionAssetBanner = () => {
  const t = useTranslations("home");

  return (
    <section className="w-full max-w-[1440px] mx-auto px-1.5 sm:px-3 lg:px-4 py-4 sm:py-6 select-none font-[family-name:var(--font-fustat)]">
      <Link
        href="/customizer"
        className="block relative w-full aspect-[2/1] sm:aspect-[2.3/1] md:aspect-[2.5/1] rounded-none overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-2xs group cursor-pointer"
      >
        {/* Main Banner Image */}
        <Image
          src="/images/main-assets/asset.jpg"
          alt="IDSHOPCASE Custom Combo Collection"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1440px"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.01]"
        />

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Call to Action Pill on Hover */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-black/90 backdrop-blur-md text-white font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-lg">
            <span>{t("exploreCollections") || "Customize Combo"}</span>
            <span>→</span>
          </span>
        </div>
      </Link>
    </section>
  );
};
