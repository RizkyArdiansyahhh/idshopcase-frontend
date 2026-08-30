"use client";

import React from "react";
import { Plus, Minus, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useTranslations } from "next-intl";
import { DeviceConfig, PatternMode, PhoneColorVariant, ProductTypeItem } from "../types/customizer.types";

interface CustomizerAccordionProps {
  productCategory: "phone-case" | "popstand";
  setProductCategory: (category: "phone-case" | "popstand") => void;
  activeStep: number;
  setActiveStep: (step: number) => void;
  toggleStep: (step: number) => void;
  productTypes: ProductTypeItem[];
  supportedDevices: DeviceConfig[];
  selectedDeviceId: string;
  onDeviceChange: (id: string) => void;
  activeDevice: DeviceConfig;
  selectedColorId: string;
  setSelectedColorId: (id: string) => void;
  activeColor: PhoneColorVariant;
  patternMode: PatternMode;
  setPatternMode: (mode: PatternMode) => void;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const CustomizerAccordion = ({
  productCategory,
  setProductCategory,
  activeStep,
  setActiveStep,
  toggleStep,
  productTypes,
  supportedDevices,
  selectedDeviceId,
  onDeviceChange,
  activeDevice,
  selectedColorId,
  setSelectedColorId,
  activeColor,
  patternMode,
  setPatternMode,
  onPrevStep,
  onNextStep,
}: CustomizerAccordionProps) => {
  const t = useTranslations("customizer");

  return (
    <aside className="w-full h-full flex flex-col justify-between overflow-hidden">
      {/* Mobile Handle Indicator */}
      <div className="pt-2.5 pb-0.5 lg:hidden flex justify-center items-center shrink-0">
        <div className="w-10 h-1 bg-neutral-300/80 rounded-full" />
      </div>

      {/* Upper Accordion Options List */}
      <div className="flex-1 overflow-y-auto overscroll-contain min-h-0 p-2 sm:p-3 divide-y divide-neutral-100">
        {/* STEP 1: Device / Product Type (ALWAYS OPEN) */}
        <div className="py-2.5 px-3">
          <div className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800">
            <div className="flex items-center gap-2">
              <span className="font-bold">01. Device Type</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                {productCategory === "phone-case" ? "Phone Cases" : "Grip Stand"}
              </span>
            </div>
          </div>
          <div className="pt-3 pb-1 grid grid-cols-2 gap-3 p-1">
            {productTypes.map((pt) => {
              const isSelected = productCategory === pt.id;
              return (
                <button
                  key={pt.id}
                  type="button"
                  onClick={() => {
                    setProductCategory(pt.id);
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer group ${
                    isSelected
                      ? "border-2 border-black bg-neutral-50/80 shadow-xs"
                      : "border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full border flex items-center justify-center p-2 mb-2 transition-transform duration-200 group-hover:scale-105 ${
                      isSelected
                        ? "border-black bg-white shadow-xs"
                        : "border-neutral-200 bg-white"
                    }`}
                  >
                    <img
                      src={pt.image}
                      alt={pt.title}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                  </div>
                  <span className="text-xs font-bold text-neutral-900 text-center leading-tight">
                    {pt.title}
                  </span>
                  <span className="text-[10px] text-neutral-500 text-center mt-0.5">
                    {pt.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================
            PHONE CASE SPECIFIC STEPS (SMOOTH ACCORDION TRANSITIONS)
           ========================================================= */}
        {productCategory === "phone-case" && (
          <>
            {/* STEP 2: Device Model */}
            <div className="py-2.5 px-3">
              <button
                type="button"
                onClick={() => toggleStep(2)}
                className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>02. Device Model</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                    {activeDevice.name}
                  </span>
                </div>
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Plus
                    className={`w-4 h-4 text-neutral-400 absolute transition-all duration-300 ${
                      activeStep === 2
                        ? "rotate-90 opacity-0 scale-50"
                        : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <Minus
                    className={`w-4 h-4 text-neutral-800 absolute transition-all duration-300 ${
                      activeStep === 2
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  activeStep === 2
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-2.5 pb-1 grid grid-cols-2 gap-2.5 p-1">
                    {supportedDevices.map((device) => {
                      const isSelected = selectedDeviceId === device.id;
                      const previewImage =
                        device.colors[0]?.bodyImage ||
                        "/images/mockup/iphone-17-pro-max/navy_full.png";
                      return (
                        <button
                          key={device.id}
                          type="button"
                          onClick={() => onDeviceChange(device.id)}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all cursor-pointer group ${
                            isSelected
                              ? "border-2 border-black bg-neutral-50/80 shadow-xs"
                              : "border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                          }`}
                        >
                          <div
                            className={`w-16 h-16 rounded-full border flex items-center justify-center p-2 mb-2 transition-transform duration-200 group-hover:scale-105 ${
                              isSelected
                                ? "border-black bg-white shadow-xs"
                                : "border-neutral-200 bg-white"
                            }`}
                          >
                            <img
                              src={previewImage}
                              alt={device.name}
                              className="w-full h-full object-contain pointer-events-none"
                            />
                          </div>
                          <span className="text-xs font-bold text-neutral-900 text-center leading-tight">
                            {device.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 3: Case Type */}
            <div className="py-2.5 px-3">
              <button
                type="button"
                onClick={() => toggleStep(3)}
                className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>03. Case Type</span>
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Plus
                    className={`w-4 h-4 text-neutral-400 absolute transition-all duration-300 ${
                      activeStep === 3
                        ? "rotate-90 opacity-0 scale-50"
                        : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <Minus
                    className={`w-4 h-4 text-neutral-800 absolute transition-all duration-300 ${
                      activeStep === 3
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  activeStep === 3
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-2.5 pb-1 p-1">
                    <div className="p-3 rounded-2xl border border-neutral-200 bg-neutral-50/60 flex items-center justify-center text-center">
                      <span className="text-xs font-bold text-neutral-900 leading-tight">
                        Clear Case
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: Layout Pola */}
            <div className="py-2.5 px-3">
              <button
                type="button"
                onClick={() => toggleStep(4)}
                className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>04. Layout Pola</span>
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Plus
                    className={`w-4 h-4 text-neutral-400 absolute transition-all duration-300 ${
                      activeStep === 4
                        ? "rotate-90 opacity-0 scale-50"
                        : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <Minus
                    className={`w-4 h-4 text-neutral-800 absolute transition-all duration-300 ${
                      activeStep === 4
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  activeStep === 4
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-2.5 pb-1 grid grid-cols-3 gap-2.5 p-1">
                    <button
                      type="button"
                      onClick={() => setPatternMode("grid-staggered")}
                      className="flex flex-col items-center justify-center p-2.5 rounded-2xl border-2 border-black bg-neutral-50/80 shadow-xs cursor-pointer text-center"
                    >
                      <span className="text-xs font-bold text-neutral-900 leading-tight">
                        Zigzag
                      </span>
                      <span className="text-[10px] text-neutral-500 mt-0.5">
                        Tangga
                      </span>
                    </button>
                    <div
                      className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-neutral-200/60 bg-neutral-100/40 text-center opacity-40 cursor-not-allowed select-none"
                      title="Nonaktif"
                    >
                      <span className="text-xs font-medium text-neutral-500 leading-tight">
                        Grid
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">
                        Rata
                      </span>
                    </div>
                    <div
                      className="flex flex-col items-center justify-center p-2.5 rounded-2xl border border-neutral-200/60 bg-neutral-100/40 text-center opacity-40 cursor-not-allowed select-none"
                      title="Nonaktif"
                    >
                      <span className="text-xs font-medium text-neutral-500 leading-tight">
                        1 Foto
                      </span>
                      <span className="text-[10px] text-neutral-400 mt-0.5">
                        Tengah
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 5: Phone Color */}
            <div className="py-2.5 px-3">
              <button
                type="button"
                onClick={() => toggleStep(5)}
                className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>05. Phone Color</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                    {activeColor.name}
                  </span>
                </div>
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <Plus
                    className={`w-4 h-4 text-neutral-400 absolute transition-all duration-300 ${
                      activeStep === 5
                        ? "rotate-90 opacity-0 scale-50"
                        : "rotate-0 opacity-100 scale-100"
                    }`}
                  />
                  <Minus
                    className={`w-4 h-4 text-neutral-800 absolute transition-all duration-300 ${
                      activeStep === 5
                        ? "rotate-0 opacity-100 scale-100"
                        : "-rotate-90 opacity-0 scale-50"
                    }`}
                  />
                </div>
              </button>
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                  activeStep === 5
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pt-2.5 pb-1 grid grid-cols-4 gap-2.5 p-1">
                    {activeDevice.colors.map((color) => {
                      const isSelected = selectedColorId === color.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColorId(color.id)}
                          title={color.name}
                          className={`flex items-center justify-center p-3 aspect-square rounded-2xl transition-all cursor-pointer ${
                            isSelected
                              ? "border-2 border-black bg-neutral-50/80 shadow-xs"
                              : "border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50/50"
                          }`}
                        >
                          <span
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color.bgClass} border border-black/15 shadow-2xs`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Clean Minimal Disclaimer Notice */}
      <div className="p-3 sm:p-3.5 bg-neutral-50/80 border-t border-neutral-100 text-xs shrink-0">
        <div className="flex items-start gap-2 sm:gap-2.5 text-neutral-600">
          <Info className="w-3.5 h-3.5 text-neutral-500 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-[11px] font-semibold text-neutral-800 tracking-tight">
              {t("disclaimer.title")}
            </p>
            <p className="text-[10px] text-neutral-500 leading-relaxed font-normal">
              {t("disclaimer.desc")}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stepper Bar (Desktop Only for Phone Case) */}
      {productCategory === "phone-case" && (
        <div className="hidden lg:flex p-3 sm:p-4 bg-white border-t border-neutral-100 items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onPrevStep}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:bg-black hover:text-white flex items-center justify-center transition-all text-neutral-700 cursor-pointer"
            title="Langkah Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <span className="text-xs font-medium tracking-widest text-neutral-500">
            0{activeStep}/05
          </span>

          <button
            type="button"
            onClick={onNextStep}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:bg-black hover:text-white flex items-center justify-center transition-all text-neutral-700 cursor-pointer"
            title="Langkah Selanjutnya"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      )}
    </aside>
  );
};
