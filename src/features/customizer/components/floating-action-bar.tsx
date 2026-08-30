"use client";

import React from "react";
import { VscCloudUpload } from "react-icons/vsc";
import { Trash2, HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface FloatingActionBarProps {
  productCategory: "phone-case" | "popstand";
  designImagesCount: number;
  hasPopstandImage: boolean;
  onUploadClick: () => void;
  onResetClick: () => void;
  onOpenTutorial: () => void;
}

export const FloatingActionBar = ({
  productCategory,
  designImagesCount,
  hasPopstandImage,
  onUploadClick,
  onResetClick,
  onOpenTutorial,
}: FloatingActionBarProps) => {
  const t = useTranslations("customizer.actions");

  const hasUploadedPhotos =
    (productCategory === "phone-case" && designImagesCount > 0) ||
    (productCategory === "popstand" && hasPopstandImage);

  return (
    <div className="flex flex-row lg:flex-col items-center gap-2 sm:gap-2.5 font-sans select-none pointer-events-auto">
      {/* 1. Circular Upload Button */}
      <div className="flex flex-col items-center relative group">
        <button
          type="button"
          onClick={onUploadClick}
          className="w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-neutral-800 border border-neutral-200/90 hover:border-black hover:bg-black hover:text-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 relative"
          title={t("uploadPhoto")}
        >
          <VscCloudUpload className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform" />
          {hasUploadedPhotos && (
            <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black text-white text-[9px] sm:text-[10px] font-bold flex items-center justify-center border-2 border-white shadow-xs">
              {productCategory === "phone-case" ? designImagesCount : "1"}
            </span>
          )}
        </button>

        <span className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-normal text-neutral-600 bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 whitespace-nowrap pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2">
          {t("uploadPhoto")}
        </span>
      </div>

      {/* 2. Circular Reset Button (Sleek button, only appears when photos exist) */}
      {hasUploadedPhotos && (
        <div className="flex flex-col items-center relative group animate-in fade-in zoom-in-75 duration-200">
          <button
            type="button"
            onClick={onResetClick}
            className="w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-neutral-600 border border-neutral-200/90 hover:border-red-500 hover:bg-red-500 hover:text-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            title={t("resetPhoto")}
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-transform" />
          </button>
          <span className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-normal text-neutral-600 bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 whitespace-nowrap pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2">
            {t("resetPhoto")}
          </span>
        </div>
      )}

      {/* 3. Circular Info / Tutorial Button */}
      <div className="flex flex-col items-center relative group">
        <button
          type="button"
          onClick={onOpenTutorial}
          className="w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 rounded-full bg-white text-neutral-700 border border-neutral-200/90 hover:border-black hover:bg-black hover:text-white shadow-md flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
          title={t("guide")}
        >
          <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 transition-transform" />
        </button>
        <span className="hidden lg:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-normal text-neutral-600 bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 whitespace-nowrap pointer-events-none absolute -left-18 top-1/2 -translate-y-1/2">
          {t("guide")}
        </span>
      </div>
    </div>
  );
};
