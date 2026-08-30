"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

// Types & Data
import { PatternMode } from "../types/customizer.types";
import { SUPPORTED_DEVICES, PRODUCT_TYPES } from "../constants/customizer-data";

// Sub-components
import { StudioHeader } from "./studio-header";
import { PhoneCaseMockup } from "./phone-case-mockup";
import { PopstandMockup } from "./popstand-mockup";
import { FloatingActionBar } from "./floating-action-bar";
import { CustomizerAccordion } from "./customizer-accordion";
import { TutorialModal } from "./tutorial-modal";

export const CustomStudio = () => {
  const router = useRouter();

  // Onboarding Tutorial Modal State
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(true);

  // Accordion Step State (0 = closed steps 2-5, only Step 1 visible by default)
  const [activeStep, setActiveStep] = useState<number>(0);

  // Product Category State (Phone Case vs Popstand)
  const [productCategory, setProductCategory] = useState<"phone-case" | "popstand">("phone-case");

  // Device & Color State
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("iphone-17-pro-max");
  const activeDevice =
    SUPPORTED_DEVICES.find((d) => d.id === selectedDeviceId) || SUPPORTED_DEVICES[0];

  const [selectedColorId, setSelectedColorId] = useState<string>(activeDevice.colors[0].id);
  const activeColor =
    activeDevice.colors.find((c) => c.id === selectedColorId) || activeDevice.colors[0];

  // Pattern Configuration
  const [patternMode, setPatternMode] = useState<PatternMode>("grid-staggered");

  // User Uploaded Design Images (Phone Case - Multiple)
  const [designImages, setDesignImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // User Uploaded Popstand Image (Single Photo)
  const [popstandImage, setPopstandImage] = useState<string | null>(null);
  const popstandFileRef = useRef<HTMLInputElement>(null);

  // Handlers
  const handleDeviceChange = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    const newDev = SUPPORTED_DEVICES.find((d) => d.id === deviceId);
    if (newDev && newDev.colors.length > 0) {
      setSelectedColorId(newDev.colors[0].id);
    }
  };

  const toggleStep = (stepNumber: number) => {
    setActiveStep((prev) => (prev === stepNumber ? 0 : stepNumber));
  };

  const handleNextStep = () => {
    setActiveStep((prev) => (prev < 5 ? prev + 1 : 1));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev > 1 ? prev - 1 : 5));
  };

  // Upload Handlers
  const handleCaseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 3 - designImages.length;
    if (remainingSlots <= 0) {
      toast.error("Maksimal 3 foto untuk casing custom.");
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    const newImages: string[] = [];

    filesToUpload.forEach((file) => {
      if (file.type !== "image/png") {
        toast.error("Gunakan format gambar PNG transparan.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newImages.push(event.target.result as string);
          if (newImages.length === filesToUpload.length) {
            setDesignImages((prev) => [...prev, ...newImages]);
            toast.success(`${newImages.length} foto berhasil diunggah!`);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePopstandUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (file.type !== "image/png") {
      toast.error("Gunakan format gambar PNG transparan untuk Popstand.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPopstandImage(event.target.result as string);
        toast.success("Foto Popstand berhasil diunggah!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCaseReset = () => {
    setDesignImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success("Foto desain direset");
  };

  const handlePopstandReset = () => {
    setPopstandImage(null);
    if (popstandFileRef.current) popstandFileRef.current.value = "";
    toast.success("Foto popstand dihapus");
  };


  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-neutral-100/50 flex flex-col font-sans select-none">
      {/* Hidden File Inputs */}
      <input
        id="casetifyUpload"
        ref={fileInputRef}
        type="file"
        accept="image/png"
        multiple
        className="hidden"
        onChange={handleCaseUpload}
      />
      <input
        id="popstandUpload"
        ref={popstandFileRef}
        type="file"
        accept="image/png"
        className="hidden"
        onChange={handlePopstandUpload}
      />

      {/* Top Header Bar */}
      <StudioHeader />

      {/* Main Body: Mockup Canvas + Floating Actions + Options Panel */}
      <div className="flex-1 w-full min-h-0 flex flex-col lg:flex-row items-center justify-between px-2 sm:px-6 lg:px-8 pb-0 lg:pb-6 gap-2 sm:gap-4 lg:gap-6 relative overflow-hidden">
        {/* Center Canvas: Mockup View */}
        <div className="h-[36vh] sm:h-[42vh] md:h-[46vh] lg:h-full lg:flex-1 w-full flex items-center justify-center relative select-none overflow-hidden shrink-0 lg:shrink">
          {productCategory === "phone-case" ? (
            <PhoneCaseMockup
              activeDevice={activeDevice}
              activeColor={activeColor}
              designImages={designImages}
              patternMode={patternMode}
            />
          ) : (
            <PopstandMockup popstandImage={popstandImage} />
          )}

          {/* Floating Actions on Mobile (Floating over mockup preview canvas) */}
          <div className="absolute right-3 bottom-2 sm:right-4 sm:bottom-3 lg:hidden z-30">
            <FloatingActionBar
              productCategory={productCategory}
              designImagesCount={designImages.length}
              hasPopstandImage={!!popstandImage}
              onUploadClick={() => {
                if (productCategory === "phone-case") {
                  fileInputRef.current?.click();
                } else {
                  popstandFileRef.current?.click();
                }
              }}
              onResetClick={
                productCategory === "phone-case" ? handleCaseReset : handlePopstandReset
              }
              onOpenTutorial={() => setIsTutorialOpen(true)}
            />
          </div>
        </div>

        {/* Desktop Side Panel / Mobile Bottom Sheet */}
        <div className="flex-1 lg:flex-none w-full lg:w-auto h-full lg:h-[85vh] lg:max-h-[780px] min-h-0 flex items-end gap-3 sm:gap-4 z-30 overflow-hidden bg-white lg:bg-transparent rounded-t-3xl lg:rounded-3xl border-t lg:border-none border-neutral-200/90 shadow-2xl lg:shadow-none">
          {/* Floating Actions on Desktop (Left of Accordion) */}
          <div className="hidden lg:flex items-end pb-2">
            <FloatingActionBar
              productCategory={productCategory}
              designImagesCount={designImages.length}
              hasPopstandImage={!!popstandImage}
              onUploadClick={() => {
                if (productCategory === "phone-case") {
                  fileInputRef.current?.click();
                } else {
                  popstandFileRef.current?.click();
                }
              }}
              onResetClick={
                productCategory === "phone-case" ? handleCaseReset : handlePopstandReset
              }
              onOpenTutorial={() => setIsTutorialOpen(true)}
            />
          </div>

          {/* Accordion Box */}
          <div className="w-full h-full lg:w-[380px] xl:w-[420px] bg-white rounded-t-3xl lg:rounded-3xl lg:border border-neutral-200/90 lg:shadow-xl overflow-hidden flex flex-col justify-between pointer-events-auto">
            <CustomizerAccordion
              productCategory={productCategory}
              setProductCategory={setProductCategory}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              toggleStep={toggleStep}
              productTypes={PRODUCT_TYPES}
              supportedDevices={SUPPORTED_DEVICES}
              selectedDeviceId={selectedDeviceId}
              onDeviceChange={handleDeviceChange}
              activeDevice={activeDevice}
              selectedColorId={selectedColorId}
              setSelectedColorId={setSelectedColorId}
              activeColor={activeColor}
              patternMode={patternMode}
              setPatternMode={setPatternMode}
              onPrevStep={handlePrevStep}
              onNextStep={handleNextStep}
            />
          </div>
        </div>
      </div>

      {/* Tutorial & Guidance Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};

export default CustomStudio;
