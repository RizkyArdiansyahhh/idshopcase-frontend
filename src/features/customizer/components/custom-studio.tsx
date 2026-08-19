"use client";

import React, { useState, useRef, JSX } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import Image from "next/image";
import {
  X,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  ImageUp,
  Trash2,
  Check,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  Scissors,
  SquaresSubtract,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";

// Mockup Setup - Multi-Device and Real Color Variants
export interface PhoneColorVariant {
  id: string;
  name: string;
  badge: string;
  bodyImage: string;
  cameraOverlay: string;
  bgClass: string;
  borderClass: string;
}

export interface DeviceConfig {
  id: string;
  name: string;
  badge: string;
  caseType: string;
  price: string;
  pattern: {
    containerClass: string;
    rows: number;
    paddingClass: string;
  };
  colors: PhoneColorVariant[];
}

export const SUPPORTED_DEVICES: DeviceConfig[] = [
  {
    id: "iphone-17-pro-max",
    name: "iPhone 17 Pro Max",
    badge: "17 Pro Max",
    caseType: "Clear Case Shockproof",
    price: "Rp 45.000",
    pattern: {
      containerClass:
        "absolute left-[22.8%] right-[22.8%] top-[33.5%] bottom-[11.8%] rounded-b-[2.6rem] overflow-hidden [clip-path:inset(0_round_0_0_2.6rem_2.6rem)] [transform:translateZ(0)]",
      rows: 5,
      paddingClass: "w-full h-full flex flex-col justify-between pt-1 pb-1",
    },
    colors: [
      {
        id: "navy",
        name: "Titanium Navy",
        badge: "Navy",
        bodyImage: "/images/mockup/iphone-17-pro-max/navy_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/navy_camera_top.png",
        bgClass: "bg-[#1b2838]",
        borderClass: "border-slate-800",
      },
      {
        id: "orange",
        name: "Sunset Orange",
        badge: "Orange",
        bodyImage: "/images/mockup/iphone-17-pro-max/orange_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/orange_camera_top.png",
        bgClass: "bg-[#e8601c]",
        borderClass: "border-orange-600",
      },
      {
        id: "silver",
        name: "Titanium Silver",
        badge: "Silver",
        bodyImage: "/images/mockup/iphone-17-pro-max/silver_full.png",
        cameraOverlay: "/images/mockup/iphone-17-pro-max/silver_camera_top.png",
        bgClass: "bg-[#e2e8f0]",
        borderClass: "border-gray-400",
      },
    ],
  },
  {
    id: "iphone-16-basic",
    name: "iPhone 16",
    badge: "16 Basic",
    caseType: "Clear Case Shockproof",
    price: "Rp 45.000",
    pattern: {
      containerClass:
        "absolute left-[22.8%] right-[22.8%] top-[11.8%] bottom-[11.8%] rounded-[2.6rem] overflow-hidden [clip-path:inset(0_round_2.6rem_2.6rem_2.6rem_2.6rem)] [transform:translateZ(0)]",
      rows: 6,
      paddingClass: "w-full h-full flex flex-col justify-between pt-1 pb-1",
    },
    colors: [
      {
        id: "pink",
        name: "Pastel Pink",
        badge: "Pink",
        bodyImage: "/images/mockup/iphone-16-basic/pink_full.png",
        cameraOverlay: "/images/mockup/iphone-16-basic/pink_camera_top.png",
        bgClass: "bg-[#f298c4]",
        borderClass: "border-pink-400",
      },
      {
        id: "teal",
        name: "Fresh Teal",
        badge: "Teal",
        bodyImage: "/images/mockup/iphone-16-basic/teal_full.png",
        cameraOverlay: "/images/mockup/iphone-16-basic/teal_camera_top.png",
        bgClass: "bg-[#a3d4cb]",
        borderClass: "border-teal-400",
      },
    ],
  },
];

type PatternMode = "grid-staggered" | "grid-straight" | "single-center";

export const CustomStudio = () => {
  const router = useRouter();

  // Onboarding Tutorial Modal State (Auto-open on initial visit)
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(true);

  // Accordion Step State (1 to 5) - Default active on 02 (Device Model)
  const [activeStep, setActiveStep] = useState<number>(2);

  // Device & Customization States
  const [selectedDeviceId, setSelectedDeviceId] =
    useState<string>("iphone-17-pro-max");
  const [selectedColorId, setSelectedColorId] = useState<string>("navy");
  const [patternMode, setPatternMode] = useState<PatternMode>("grid-staggered");
  const stickerSize = 66;
  const [designImages, setDesignImages] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeDevice =
    SUPPORTED_DEVICES.find((d) => d.id === selectedDeviceId) ||
    SUPPORTED_DEVICES[0];

  const activeColor =
    activeDevice.colors.find((c) => c.id === selectedColorId) ||
    activeDevice.colors[0];

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    const targetDevice = SUPPORTED_DEVICES.find((d) => d.id === deviceId);
    if (targetDevice && targetDevice.colors.length > 0) {
      setSelectedColorId(targetDevice.colors[0].id);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? 0 : stepNumber));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : 5));
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < 5 ? prev + 1 : 1));
  };

  /** --------------------------
   *  UPLOAD HANDLER (MAX 3)
   * --------------------------- */
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (designImages.length + files.length > 3) {
      alert("Maksimal total 3 gambar stiker wajah!");
      return;
    }

    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        }),
    );

    Promise.all(readers).then((newImgs) => {
      setDesignImages((prev) => [...prev, ...newImgs].slice(0, 3));
    });
  };

  const removeImage = (indexToRemove: number) => {
    setDesignImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleReset = () => {
    setDesignImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /** --------------------------
   *  PATTERN GENERATOR (Dynamic Layout per Device)
   * --------------------------- */
  const generatePattern = () => {
    if (designImages.length === 0) return null;

    if (patternMode === "single-center") {
      return (
        <div className="flex items-center justify-center w-full h-full">
          <img
            src={designImages[0]}
            alt="custom-face"
            className="object-contain drop-shadow-xl"
            style={{
              width: stickerSize * 2,
              height: stickerSize * 2,
            }}
          />
        </div>
      );
    }

    const isIPhone16 = selectedDeviceId === "iphone-16-basic";
    const rows = activeDevice.pattern.rows;
    const cols = isIPhone16 ? 2 : 3;
    const rowElements: JSX.Element[] = [];
    let imgCounter = 0;

    for (let r = 0; r < rows; r++) {
      const isOdd = patternMode === "grid-staggered" && r % 2 === 1;
      const itemsInRow: JSX.Element[] = [];

      for (let c = 0; c < cols; c++) {
        const currentImage = designImages[imgCounter % designImages.length];
        imgCounter++;

        itemsInRow.push(
          <img
            key={`face-${r}-${c}`}
            src={currentImage}
            alt="custom-face"
            className="object-contain drop-shadow-md shrink-0"
            style={{
              width: stickerSize,
              height: stickerSize,
            }}
          />,
        );
      }

      rowElements.push(
        <div
          key={`row-${r}`}
          className="flex items-center justify-between w-full"
          style={
            isIPhone16
              ? {
                  paddingLeft: isOdd ? "22%" : "2%",
                  paddingRight: isOdd ? "2%" : "22%",
                }
              : {
                  transform: isOdd ? "translateX(-25px)" : "translateX(0px)",
                  paddingLeft: isOdd ? "0px" : "3px",
                  paddingRight: isOdd ? "0px" : "3px",
                }
          }
        >
          {itemsInRow}
        </div>,
      );
    }

    return (
      <div className={activeDevice.pattern.paddingClass}>{rowElements}</div>
    );
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white flex flex-col font-sans select-none touch-none">
      {/* Hidden File Input */}
      <input
        id="casetifyUpload"
        ref={fileInputRef}
        type="file"
        accept="image/png"
        multiple
        className="hidden"
        onChange={handleUpload}
      />

      {/* Top Header Bar: Close Button (Left) <-> IDSHOPCASE STUDIO Brand (Right) */}
      <header className="w-full flex items-center justify-between px-6 sm:px-10 pt-4 sm:pt-6 pb-2 flex-shrink-0 z-40">
        {/* Floating Close (X) Circle Button */}
        <Link
          href="/products/detail/1"
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-black/15 bg-white hover:bg-black hover:text-white flex items-center justify-center text-neutral-800 transition-all shadow-sm group"
          title="Tutup & Kembali"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200" />
        </Link>

        {/* Pure Clean Text in Poppins (No box, no border, no shadow) */}
        <h2 className="font-[family-name:var(--font-poppins)] text-base sm:text-lg font-bold tracking-wider text-neutral-900 uppercase select-none">
          IDSHOPCASE STUDIO
        </h2>
      </header>

      {/* =========================================================================
          MAIN BODY: CENTER CANVAS + RIGHT FLOATING SIDEBAR (WITH UPLOAD & INFO BUTTONS)
         ========================================================================= */}
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 pb-4 sm:pb-6 gap-6 relative overflow-hidden">
        {/* =========================================================================
            CENTER/LEFT: LARGE FULLSCREEN PHONE MOCKUP CANVAS
           ========================================================================= */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative select-none overflow-hidden">
          {/* Main Mockup Phone Frame (Maximized Size & Clean Static State) */}
          <div className="relative h-[85vh] max-h-[800px] aspect-[1024/1536] flex items-center justify-center cursor-default">
            {/* LAYER 1: BASE BODY (Authentic Color Mockup - Crystal Clear, No Drop Shadow) */}
            <img
              src={activeColor.bodyImage}
              alt={activeColor.name}
              className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-300"
            />

            {/* LAYER 2: USER PATTERN STICKERS (Strictly inside inner case backplate) */}
            {designImages.length > 0 && (
              <div
                className={`${activeDevice.pattern.containerClass} flex items-center justify-center pointer-events-none`}
              >
                <div className="w-full h-full flex items-center justify-center">
                  {generatePattern()}
                </div>
              </div>
            )}

            {/* LAYER 3: CAMERA OVERLAY (Authentic Color Camera Top) */}
            <img
              src={activeColor.cameraOverlay}
              alt="Camera Module"
              className="absolute top-0 left-0 w-full h-full object-contain object-top pointer-events-none z-20 transition-all duration-300"
            />
          </div>
        </div>

        {/* =========================================================================
            RIGHT: FLOATING CIRCULAR BUTTONS (UPLOAD + INFO) + CLEAN 5-STEP ACCORDION
           ========================================================================= */}
        <div className="flex items-end gap-3 sm:gap-4 h-[85vh] max-h-[800px] flex-shrink-0 z-30">
          {/* Floating Action Buttons Column (Beside modal, at bottom left) */}
          <div className="flex flex-col items-center gap-2 pb-2">
            {/* 1. Circular Upload Button (Top) */}
            <div className="flex flex-col items-center relative group">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white text-neutral-800 border border-neutral-200/90 hover:border-black hover:bg-black hover:text-white shadow-sm flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 relative"
                title="Unggah Foto Wajah"
              >
                <ImageUp className="w-6 h-6 sm:w-7 sm:h-7 transition-transform" />

                {/* Red counter badge if uploaded */}
                {designImages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-medium flex items-center justify-center border-2 border-white shadow-xs">
                    {designImages.length}
                  </span>
                )}
              </button>

              {/* Hover Tooltip (Appears to the left on hover) */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-normal text-neutral-600 bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 whitespace-nowrap pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2">
                Upload Foto
              </span>

              {/* Quick Reset button if files exist */}
              {designImages.length > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[10px] text-red-500 hover:text-red-700 font-normal flex items-center gap-0.5 hover:underline transition-all mt-0.5"
                  title="Hapus semua foto"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* 2. Circular Info / Tutorial Button (Below Upload) */}
            <div className="flex flex-col items-center relative group">
              <button
                type="button"
                onClick={() => setIsTutorialOpen(true)}
                className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-white text-neutral-700 border border-neutral-200/90 hover:border-black hover:bg-black hover:text-white shadow-sm flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
                title="Panduan Kustomisasi"
              >
                <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 transition-transform" />
              </button>
              {/* Hover Tooltip (Appears to the left on hover) */}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[11px] font-normal text-neutral-600 bg-white/95 px-2 py-0.5 rounded-full shadow-sm border border-neutral-200 whitespace-nowrap pointer-events-none absolute -left-18 top-1/2 -translate-y-1/2">
                Panduan
              </span>
            </div>
          </div>

          {/* Clean 5-Step Accordion Modal (Minimalist & Non-bold) */}
          <aside className="w-full lg:w-[360px] xl:w-[390px] h-full bg-white rounded-3xl border border-neutral-200/80 shadow-sm flex flex-col justify-between overflow-hidden">
            {/* Accordion Steps List */}
            <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 p-2 sm:p-3">
              {/* STEP 1: Device Type */}
              <div className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleStep(1)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <span>01. Device Type</span>
                  {activeStep === 1 ? (
                    <Minus className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {activeStep === 1 && (
                  <div className="pt-2.5 pb-1 flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full border border-black bg-black text-white text-xs font-normal flex items-center gap-1.5 shadow-sm">
                      <Check className="w-3.5 h-3.5" /> Apple
                    </span>
                  </div>
                )}
              </div>

              {/* STEP 2: Device Model (Default Active - Circular/Round Option Chips) */}
              <div className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleStep(2)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>02. Device Model</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                      {activeDevice.name}
                    </span>
                  </div>
                  {activeStep === 2 ? (
                    <Minus className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {activeStep === 2 && (
                  <div className="pt-2.5 pb-1 flex flex-wrap gap-2">
                    {SUPPORTED_DEVICES.map((device) => {
                      const isSelected = selectedDeviceId === device.id;
                      return (
                        <button
                          key={device.id}
                          type="button"
                          onClick={() => handleDeviceChange(device.id)}
                          className={`px-3.5 py-2 rounded-full border text-xs font-normal flex items-center gap-1.5 transition-all ${
                            isSelected
                              ? "bg-black text-white border-black shadow-sm"
                              : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200"
                          }`}
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          <span>{device.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* STEP 3: Case Type */}
              <div className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleStep(3)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <span>03. Case Type</span>
                  {activeStep === 3 ? (
                    <Minus className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {activeStep === 3 && (
                  <div className="pt-2.5 pb-1 flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full border border-neutral-200 bg-neutral-50 text-neutral-700 text-xs font-normal flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {activeDevice.caseType}
                    </span>
                  </div>
                )}
              </div>

              {/* STEP 4: Layout Pola (Circular / Round Option Chips) */}
              <div className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleStep(4)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <span>04. Layout Pola</span>
                  {activeStep === 4 ? (
                    <Minus className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {activeStep === 4 && (
                  <div className="pt-2.5 pb-1 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPatternMode("grid-staggered")}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-normal transition-all ${
                        patternMode === "grid-staggered"
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      Zigzag Tangga
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatternMode("grid-straight")}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-normal transition-all ${
                        patternMode === "grid-straight"
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      Grid Rata
                    </button>
                    <button
                      type="button"
                      onClick={() => setPatternMode("single-center")}
                      className={`px-3.5 py-1.5 rounded-full border text-xs font-normal transition-all ${
                        patternMode === "single-center"
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:bg-neutral-100"
                      }`}
                    >
                      1 Foto Tengah
                    </button>
                  </div>
                )}
              </div>

              {/* STEP 5: Warna Device (Pure Circular Swatches) */}
              <div className="py-2.5 px-3">
                <button
                  type="button"
                  onClick={() => toggleStep(5)}
                  className="w-full flex items-center justify-between text-left font-medium text-xs sm:text-sm text-neutral-800 hover:text-black transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span>05. Warna Device</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-normal">
                      {activeColor.name}
                    </span>
                  </div>
                  {activeStep === 5 ? (
                    <Minus className="w-4 h-4 text-neutral-500" />
                  ) : (
                    <Plus className="w-4 h-4 text-neutral-400" />
                  )}
                </button>
                {activeStep === 5 && (
                  <div className="pt-2.5 pb-1 flex items-center gap-3">
                    {activeDevice.colors.map((color) => {
                      const isSelected = selectedColorId === color.id;
                      return (
                        <button
                          key={color.id}
                          type="button"
                          onClick={() => setSelectedColorId(color.id)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full ${color.bgClass} ${color.borderClass} border transition-all relative flex items-center justify-center cursor-pointer ${
                            isSelected
                              ? "ring-2 ring-offset-2 ring-black scale-110 shadow-sm"
                              : "opacity-80 hover:opacity-100 hover:scale-105"
                          }`}
                          title={color.name}
                        >
                          {isSelected && (
                            <Check
                              className={`w-4 h-4 ${
                                color.id === "silver"
                                  ? "text-black"
                                  : "text-white"
                              }`}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Stepper Pill Navigation */}
            <div className="p-3 border-t border-neutral-100 flex items-center justify-between bg-white">
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:bg-black hover:text-white flex items-center justify-center transition-all text-neutral-700"
                title="Langkah Sebelumnya"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <span className="text-xs font-medium tracking-widest text-neutral-500">
                0{activeStep}/05
              </span>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 hover:bg-black hover:text-white flex items-center justify-center transition-all text-neutral-700"
                title="Langkah Selanjutnya"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* =========================================================================
          ONBOARDING TUTORIAL & INFO POPUP MODAL (Spacious & Clean, No CTA)
         ========================================================================= */}
      {isTutorialOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl sm:max-w-2xl w-full shadow-2xl border border-neutral-100 relative space-y-5 animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
              <div className="space-y-0.5">
                <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                  Panduan Preview Custom Case
                </h3>
                <p className="text-xs text-neutral-500">
                  Ikuti petunjuk di bawah ini untuk hasil kustomisasi terbaik
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsTutorialOpen(false)}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-600 transition-colors"
                title="Tutup Panduan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1 Card: Tahapan Pilihan Tipe, Model & Warna */}
            <div className="border border-neutral-200/80 rounded-2xl flex flex-row gap-4 p-4 sm:p-5 items-center bg-neutral-50/50">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-white border border-neutral-200/60 flex justify-center items-center flex-shrink-0">
                <HiMiniDevicePhoneMobile className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
              </div>
              <div className="space-y-1">
                <p className="text-sm sm:text-base font-semibold text-neutral-900">
                  Step 1 : Pilih Tipe, Model & Warna Handphone
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Anda dapat memilih jenis tipe handphone, pilihan device model (seperti iPhone 17 Pro Max atau iPhone 16), hingga varian warna favorit pada panel studio sebelah kanan.
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
                    Step 2 : Tambahkan Foto Wajah
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    Silakan unggah 1 hingga 3 foto wajah Anda dengan format PNG transparan melalui tombol upload bulat di samping kiri.
                  </p>
                </div>
              </div>

              {/* Format Box with Scissors */}
              <div className="p-3.5 bg-white border border-neutral-200/80 rounded-xl text-xs flex items-start gap-3 shadow-2xs">
                <Scissors className="w-4 h-4 text-neutral-800 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-semibold text-neutral-900">
                    Format Preview Custom Case
                  </p>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Gunakan foto{" "}
                    <strong>PNG transparan (tanpa background)</strong> agar
                    hasil cetak menyatu rapi. Anda bisa menghapus background
                    foto secara gratis di{" "}
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
                  Step 3 : Pilih Pola Tata Letak Stiker
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  Tentukan formasi susunan pola stiker favorit Anda (seperti Zigzag Tangga, Grid Rata, atau 1 Foto Tengah) untuk digabungkan secara presisi pada bodi casing.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomStudio;
