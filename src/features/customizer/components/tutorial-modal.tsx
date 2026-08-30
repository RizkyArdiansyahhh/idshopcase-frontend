"use client";

import React from "react";
import Image from "next/image";
import { X, Scissors, SquaresSubtract, ExternalLink } from "lucide-react";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";
import { useTranslations } from "next-intl";

interface TutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialModal = ({ isOpen, onClose }: TutorialModalProps) => {
  const t = useTranslations("customizer.tutorial");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 font-sans select-none">
      <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 max-w-xl sm:max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-neutral-100 relative space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-neutral-100 shrink-0">
          <div className="space-y-0.5">
            <h3 className="text-base sm:text-lg font-bold text-neutral-900">
              {t("title")}
            </h3>
            <p className="text-xs text-neutral-500">
              {t("subtitle")}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors cursor-pointer"
            title={t("close")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content for Mobile */}
        <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 pr-1 min-h-0">

        {/* Step 1 Card: Tahapan Pilihan Tipe, Model & Warna */}
        <div className="border border-neutral-200/80 rounded-2xl flex flex-row gap-4 p-4 sm:p-5 items-center bg-neutral-50/50">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-neutral-200/60 flex justify-center items-center flex-shrink-0">
            <HiMiniDevicePhoneMobile className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
          </div>
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-semibold text-neutral-900">
              {t("step1Title")}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              {t("step1Desc")}
            </p>
          </div>
        </div>

        {/* Step 2 Card: Tambahkan Gambar & Format Transparan */}
        <div className="border border-neutral-200/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 bg-neutral-50/50">
          <div className="flex flex-row gap-4 items-center">
            <div className="h-16 w-16 sm:h-20 sm:w-20 relative flex-shrink-0 bg-white rounded-xl border border-neutral-200/60 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/steps-1.jpg"
                alt="step-2"
                fill
                className="object-cover scale-75"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-semibold text-neutral-900">
                {t("step2Title")}
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {t("step2Desc")}
              </p>
            </div>
          </div>

          {/* Format Box with Scissors */}
          <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl text-xs flex items-start gap-3 shadow-2xs">
            <Scissors className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-neutral-900">
                {t("step2FormatTitle")}
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {t("step2FormatDesc")}{" "}
                <a
                  href="https://www.remove.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-neutral-900 hover:opacity-80 inline-flex items-center gap-0.5"
                >
                  <span>remove.bg</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Step 3 Card: Pola & Gabungkan Desain */}
        <div className="border border-neutral-200/80 rounded-2xl flex flex-row gap-4 p-4 sm:p-5 items-center bg-neutral-50/50">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-neutral-200/60 flex justify-center items-center flex-shrink-0">
            <SquaresSubtract className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
          </div>
          <div className="space-y-1">
            <p className="text-sm sm:text-base font-semibold text-neutral-900">
              {t("step3Title")}
            </p>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              {t("step3Desc")}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
