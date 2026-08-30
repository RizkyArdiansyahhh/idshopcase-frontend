"use client";

import React, { JSX } from "react";
import { DeviceConfig, PatternMode, PhoneColorVariant } from "../types/customizer.types";

interface PhoneCaseMockupProps {
  activeDevice: DeviceConfig;
  activeColor: PhoneColorVariant;
  designImages: string[];
  patternMode: PatternMode;
  stickerSize?: number;
}

export const PhoneCaseMockup = ({
  activeDevice,
  activeColor,
  designImages,
  patternMode,
}: PhoneCaseMockupProps) => {
  // Generate Pattern for Case
  const generatePattern = () => {
    if (designImages.length === 0) return null;

    if (patternMode === "single-center") {
      const currentImage = designImages[0];
      return (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={currentImage}
            alt="center-custom-face"
            className="w-[55%] aspect-square object-contain drop-shadow-xl"
          />
        </div>
      );
    }

    const isIPhone16 = activeDevice.id === "iphone-16-basic";
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
            className={`${
              isIPhone16 ? "w-[40%]" : "w-[27%]"
            } aspect-square object-contain drop-shadow-md shrink-0`}
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
                  transform: isOdd ? "translateX(-20%)" : "translateX(0px)",
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
    <div className="relative h-full max-h-[35vh] sm:max-h-[42vh] md:max-h-[46vh] lg:max-h-[760px] lg:h-[82vh] aspect-[1024/1536] flex items-center justify-center cursor-default shrink-0">
      {/* LAYER 1: BASE BODY */}
      <img
        src={activeColor.bodyImage}
        alt={activeColor.name}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-all duration-300"
      />

      {/* LAYER 2: USER PATTERN STICKERS */}
      {designImages.length > 0 && (
        <div
          className={`${activeDevice.pattern.containerClass} flex items-center justify-center pointer-events-none`}
        >
          <div className="w-full h-full flex items-center justify-center">
            {generatePattern()}
          </div>
        </div>
      )}

      {/* LAYER 3: CAMERA OVERLAY */}
      <img
        src={activeColor.cameraOverlay}
        alt="Camera Module"
        className="absolute top-0 left-0 w-full h-full object-contain object-top pointer-events-none z-20 transition-all duration-300"
      />
    </div>
  );
};
