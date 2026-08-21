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
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white flex flex-col font-sans select-none touch-none">
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
      <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 pb-4 sm:pb-6 gap-6 relative overflow-hidden">
        {/* Center Canvas: Mockup View */}
        <div className="flex-1 w-full h-full flex items-center justify-center relative select-none overflow-hidden">
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
        </div>

        {/* Floating Actions (Upload, Reset, Panduan) + Accordion Panel */}
        <div className="flex items-end gap-3 sm:gap-4 h-[85vh] max-h-[780px] flex-shrink-0 z-30">
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

      {/* Tutorial & Guidance Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};

export default CustomStudio;
