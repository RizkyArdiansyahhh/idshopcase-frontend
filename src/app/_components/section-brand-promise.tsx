"use client";

import React from "react";
import { useTranslations } from "next-intl";
import {
  LuRotateCcw,
  LuLayers,
  LuClock3,
  LuSmartphone,
  LuTruck,
} from "react-icons/lu";

export const SectionBrandPromise = () => {
  const t = useTranslations("home.brandPromise");

  const promiseItems = [
    {
      icon: LuRotateCcw,
      title: t("item1Title"),
      desc: t("item1Desc"),
    },
    {
      icon: LuLayers,
      title: t("item2Title"),
      desc: t("item2Desc"),
    },
    {
      icon: LuClock3,
      title: t("item3Title"),
      desc: t("item3Desc"),
    },
    {
      icon: LuSmartphone,
      title: t("item4Title"),
      desc: t("item4Desc"),
    },
    {
      icon: LuTruck,
      title: t("item5Title"),
      desc: t("item5Desc"),
    },
  ];

  return (
    <section className="w-full bg-neutral-950 text-white py-16 sm:py-20 lg:py-24 font-[family-name:var(--font-fustat)] select-none">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN: Title & Subtitle (Clean & Borderless)
             ========================================================================= */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-3 sm:space-y-4 lg:pr-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
              {t("title")}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-400 font-normal leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Clean Line Art Rows (No Box Borders, Pure Editorial Icons)
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col space-y-7 sm:space-y-8">
            {promiseItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-5 sm:gap-6"
                >
                  {/* Clean Line Icon (Direct on background, no bounding box) */}
                  <div className="pt-0.5 shrink-0 text-neutral-300">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.4]" />
                  </div>

                  {/* Item Content */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider uppercase text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-neutral-400 font-normal leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
