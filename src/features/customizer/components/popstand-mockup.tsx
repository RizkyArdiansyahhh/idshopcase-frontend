"use client";

import React from "react";

interface PopstandMockupProps {
  popstandImage: string | null;
}

export const PopstandMockup = ({ popstandImage }: PopstandMockupProps) => {
  return (
    <div className="relative w-full max-w-4xl h-full max-h-[35vh] sm:max-h-[42vh] md:max-h-[46vh] lg:max-h-[760px] lg:h-[82vh] flex flex-col items-center justify-center cursor-default shrink-0">
      {/* DUO DISPLAY: Side View (Base Mockup Only) & Phone Front View (With Custom Photo) */}
      <div className="w-full h-full grid grid-cols-2 gap-2 sm:gap-4 items-center justify-items-center py-1">
        {/* VIEW 1: PERSPECTIVE 3D SIDE VIEW (Left - Pure Base Mockup, No Custom Overlay) */}
        <div className="w-full h-full flex flex-col items-center justify-center relative group">
          <div className="relative w-full h-full max-h-[32vh] sm:max-h-[40vh] md:max-h-[44vh] lg:max-h-[520px] flex items-center justify-center">
            {/* Pure Base Samping Mockup PNG without custom photo */}
            <img
              src="/images/mockup/popstand/samping_transparent.png"
              alt="Popstand Side View"
              className="w-full h-full object-contain pointer-events-none drop-shadow-md scale-105"
            />
          </div>
        </div>

        {/* VIEW 2: PHONE MOCKUP FRONT VIEW (Right - With Interactive Custom Photo Overlay) */}
        <div className="w-full h-full flex flex-col items-center justify-center relative group">
          <div className="relative w-full h-full max-h-[32vh] sm:max-h-[40vh] md:max-h-[44vh] lg:max-h-[520px] flex items-center justify-center">
            {/* Phone with Popstand Base Mockup Layer */}
            <img
              src="/images/mockup/popstand/depan_phone.png"
              alt="Popstand Phone Front Base"
              className="w-full h-full object-contain pointer-events-none drop-shadow-md scale-105"
            />

            {/* Realistic Die-Cut Clear Acrylic Photo Overlay Centered on Phone Popstand */}
            {popstandImage && (
              <div
                className="absolute pointer-events-none flex items-center justify-center"
                style={{
                  top: "52%",
                  left: "50%",
                  transform: "translate(-50%, -50%) scale(1.05)",
                  width: "25%",
                  height: "25%",
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Clear Acrylic Border Layer 1: Soft Outer Shadow */}
                  <img
                    src={popstandImage}
                    alt="Acrylic Cast Shadow"
                    className="absolute max-w-[88%] max-h-[88%] object-contain pointer-events-none opacity-35 blur-[2px] scale-108 translate-y-1"
                    style={{ filter: "brightness(0) blur(3px)" }}
                  />

                  {/* Clear Acrylic Border Layer 2: Clear Transparent Border */}
                  <img
                    src={popstandImage}
                    alt="Acrylic Clear Border Edge"
                    className="absolute max-w-[88%] max-h-[88%] object-contain pointer-events-none scale-108"
                    style={{
                      filter:
                        "drop-shadow(0 0 3px rgba(255,255,255,0.95)) drop-shadow(0 0 1px rgba(0,0,0,0.25)) drop-shadow(0 1px 3px rgba(0,0,0,0.15))",
                      opacity: 0.85,
                    }}
                  />

                  {/* Clear Acrylic Border Layer 3: Inner Glass Highlight Accent */}
                  <img
                    src={popstandImage}
                    alt="Acrylic Edge Highlight"
                    className="absolute max-w-[88%] max-h-[88%] object-contain pointer-events-none scale-104 brightness-150 contrast-125 opacity-60 mix-blend-overlay"
                  />

                  {/* Main Cutout User Photo */}
                  <img
                    src={popstandImage}
                    alt="Popstand Custom Cutout"
                    className="relative z-10 max-w-[86%] max-h-[86%] object-contain pointer-events-none brightness-102 contrast-102"
                  />

                  {/* Subtle Specular Reflection Sweep */}
                  <div
                    className="absolute inset-1 z-20 pointer-events-none rounded-full overflow-hidden opacity-30 mix-blend-screen"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 60%)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
