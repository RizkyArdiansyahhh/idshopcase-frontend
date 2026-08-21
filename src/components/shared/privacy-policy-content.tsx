"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface PrivacyPolicyContentProps {
  isModal?: boolean;
}

export const PrivacyPolicyContent: React.FC<PrivacyPolicyContentProps> = ({ isModal = false }) => {
  const t = useTranslations("privacy");

  return (
    <div className={`w-full font-sans text-neutral-900 ${isModal ? "py-1 px-1" : "max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6"}`}>
      {/* Top Decorative Rule */}
      <div className="w-full flex justify-center mb-5">
        <div className="w-14 sm:w-20 h-[1px] bg-neutral-300" />
      </div>

      {/* Main Header */}
      <div className="text-center space-y-1.5 mb-8 sm:mb-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[0.14em] uppercase text-neutral-900 leading-tight">
          {t("title")}
        </h1>
        <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-neutral-500 font-medium max-w-sm mx-auto leading-relaxed">
          {t("subtitle")}
        </p>
        <p className="text-[10px] text-neutral-400 font-normal pt-0.5">
          {t("lastUpdated")}
        </p>
      </div>

      {/* 2-Column Editorial Grid (Compact & Perfectly Balanced) */}
      <div className="space-y-6 sm:space-y-8 w-full">
        {/* SECTION 1: GENERAL INFORMATION */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.general.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.general.p1")}</p>
            <p>{t("sections.general.p2")}</p>
          </div>
        </div>

        {/* SECTION 2: CUSTOM IMAGES & DESIGN PRIVACY */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.customImages.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.customImages.p1")}</p>
            <p className="font-semibold text-neutral-900">{t("sections.customImages.p2")}</p>
            <p>{t("sections.customImages.p3")}</p>
          </div>
        </div>

        {/* SECTION 3: RIGHT TO ACCESS, CORRECT AND DELETE */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.rights.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.rights.p1")}</p>
            <p>{t("sections.rights.p2")}</p>
          </div>
        </div>

        {/* SECTION 4: MANAGEMENT OF PERSONAL DATA */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.management.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.management.intro")}</p>
            <ul className="space-y-1.5 pt-0.5">
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 select-none">-</span>
                <span>{t("sections.management.items.0")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 select-none">-</span>
                <span>{t("sections.management.items.1")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 select-none">-</span>
                <span>{t("sections.management.items.2")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 select-none">-</span>
                <span>{t("sections.management.items.3")}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-neutral-400 select-none">-</span>
                <span>{t("sections.management.items.4")}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 5: PAYMENT & SECURITY */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.securityPayment.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.securityPayment.p1")}</p>
            <p>{t("sections.securityPayment.p2")}</p>
          </div>
        </div>

        {/* SECTION 6: THIRD-PARTY LOGISTICS */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.thirdParty.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.thirdParty.p1")}</p>
            <p>{t("sections.thirdParty.p2")}</p>
          </div>
        </div>

        {/* SECTION 7: COOKIES & SESSIONS */}
        <div className="flex flex-col md:flex-row gap-2.5 md:gap-6 items-start w-full border-b border-neutral-100 pb-6 last:border-b-0">
          <div className="w-full md:w-[180px] shrink-0 md:text-right">
            <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-900 leading-snug">
              {t("sections.cookies.title")}
            </h2>
          </div>
          <div className="w-full md:flex-1 space-y-2.5 text-xs sm:text-[13px] text-neutral-700 leading-relaxed font-normal md:pl-6 md:border-l md:border-dashed md:border-neutral-200">
            <p>{t("sections.cookies.p1")}</p>
            <p>{t("sections.cookies.p2")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyContent;
