"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-14 font-[family-name:var(--font-fustat)] text-neutral-900 select-none">
      {/* Header Section */}
      <div className="space-y-3 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
          {t("badge")}
        </p>
        <h1 className="font-[family-name:var(--font-fustat)] text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 uppercase">
          {t("title")}
        </h1>
        <p className="text-base sm:text-lg text-neutral-500 font-normal leading-relaxed">
          {t("subtitle")}
        </p>
      </div>

      <Separator className="my-8 sm:my-10 border-neutral-200" />

      {/* Editorial Story Section with Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="space-y-5 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
          <h2 className="font-[family-name:var(--font-fustat)] text-2xl sm:text-3xl font-extrabold text-neutral-900 uppercase tracking-tight">
            {t("storyTitle")}
          </h2>
          <p>{t("storyP1")}</p>
          <p>{t("storyP2")}</p>
        </div>

        <div className="relative aspect-[4/3] rounded-none overflow-hidden border border-neutral-200 shadow-2xs">
          <Image
            src="/images/katalog-instagram/4.jpg"
            alt="IDSHOPCASE Studio"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <Separator className="my-10 sm:my-14 border-neutral-200" />

      {/* 3 Core Values */}
      <div className="space-y-8">
        <div className="space-y-1">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            {t("philosophyBadge")}
          </p>
          <h2 className="font-[family-name:var(--font-fustat)] text-2xl sm:text-3xl font-extrabold text-neutral-900 uppercase tracking-tight">
            {t("principlesTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">
              01
            </span>
            <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight font-[family-name:var(--font-fustat)]">
              {t("val1Title")}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              {t("val1Desc")}
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">
              02
            </span>
            <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight font-[family-name:var(--font-fustat)]">
              {t("val2Title")}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              {t("val2Desc")}
            </p>
          </div>

          <div className="space-y-2.5">
            <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider">
              03
            </span>
            <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight font-[family-name:var(--font-fustat)]">
              {t("val3Title")}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal">
              {t("val3Desc")}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-10 sm:my-14 border-neutral-200" />

      {/* Minimalist CTA Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 py-4">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 uppercase font-[family-name:var(--font-fustat)]">
            {t("ctaTitle")}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            {t("ctaSubtitle")}
          </p>
        </div>

        <Link
          href="/customizer"
          className="px-8 py-3 rounded-none bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-black hover:bg-transparent hover:text-black transition-all cursor-pointer shrink-0"
        >
          {t("ctaButton")}
        </Link>
      </div>
    </div>
  );
}
