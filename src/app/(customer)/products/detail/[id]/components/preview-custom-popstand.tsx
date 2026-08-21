"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ImageUp,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  Eye,
  Layers,
  Move,
} from "lucide-react";

interface PreviewCustomPopstandProps {
  onCustomImageChange?: (imageDataUrl: string | null) => void;
}

export const PreviewCustomPopstand: React.FC<PreviewCustomPopstandProps> = ({
  onCustomImageChange,
}) => {
  // View State: "front" (Tampak Depan) | "side" (Tampak Samping)
  const [activeView, setActiveView] = useState<"front" | "side">("front");

  // Custom Image State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Grid Collage Layout Mode: "single" | "grid-2" | "grid-4"
  const [layoutMode, setLayoutMode] = useState<"single" | "grid-2" | "grid-4">("single");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Image Upload
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUploadedImage(result);
        setScale(1);
        setRotation(0);
        setPosition({ x: 0, y: 0 });
        onCustomImageChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Reset Adjustments
  const handleReset = () => {
    setScale(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 items-start select-none font-sans">
      {/* 1. MOCKUP CANVAS PREVIEW AREA */}
      <div className="w-full lg:w-7/12 flex flex-col items-center">
        {/* View Switcher Tabs (Tampak Depan vs Tampak Samping) */}
        <div className="flex items-center gap-2 p-1 bg-neutral-100 rounded-full mb-6 border border-neutral-200">
          <button
            type="button"
            onClick={() => setActiveView("front")}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === "front"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Tampak Depan (Custom)
          </button>
          <button
            type="button"
            onClick={() => setActiveView("side")}
            className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === "side"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Tampak Samping
          </button>
        </div>

        {/* The 3D Mockup Container */}
        <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center p-4 bg-gradient-to-b from-neutral-50 to-neutral-100/80 rounded-2xl border border-neutral-200/80 shadow-xs overflow-hidden">
          {activeView === "front" ? (
            /* FRONT VIEW: INTERACTIVE CIRCULAR CUSTOM POPSTAND */
            <div
              className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* LAYER 1: BASE POPSTAND ON PHONE BODY */}
              <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
                <Image
                  src="/images/mockup/popstand/depan_phone.png"
                  alt="Popstand Phone Front Base"
                  fill
                  priority
                  className="object-contain drop-shadow-md select-none"
                />
              </div>

              {/* LAYER 2: USER CUSTOM PHOTO DISC (Placed on Phone Popstand Disc) */}
              <div
                className="absolute z-0 rounded-full overflow-hidden flex items-center justify-center bg-neutral-100"
                style={{
                  width: "25%",
                  height: "25%",
                  top: "52%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  clipPath: "circle(50% at 50% 50%)",
                }}
              >
                {uploadedImage ? (
                  <div
                    className="relative w-full h-full flex items-center justify-center"
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
                      transition: isDragging ? "none" : "transform 0.1s ease-out",
                    }}
                  >
                    {layoutMode === "single" && (
                      <Image
                        src={uploadedImage}
                        alt="Custom Photo"
                        fill
                        className="object-cover pointer-events-none select-none"
                      />
                    )}

                    {layoutMode === "grid-2" && (
                      <div className="grid grid-cols-2 w-full h-full gap-0.5">
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 1" fill className="object-cover" />
                        </div>
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 2" fill className="object-cover" />
                        </div>
                      </div>
                    )}

                    {layoutMode === "grid-4" && (
                      <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5">
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 1" fill className="object-cover" />
                        </div>
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 2" fill className="object-cover" />
                        </div>
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 3" fill className="object-cover" />
                        </div>
                        <div className="relative w-full h-full overflow-hidden">
                          <Image src={uploadedImage} alt="Photo 4" fill className="object-cover" />
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Placeholder when no image is uploaded */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-neutral-200/50 transition-colors"
                  >
                    <ImageUp className="w-8 h-8 text-neutral-400 mb-2 stroke-[1.5]" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-600">
                      Klik / Upload Foto
                    </span>
                    <span className="text-[9px] text-neutral-400 mt-0.5">
                      Lingkaran Popstand
                    </span>
                  </div>
                )}
              </div>

              {/* LAYER 3: 3D ACRYLIC GLASS SPECULAR SHEEN (Highlights on Top of Photo) */}
              <div
                className="absolute z-20 pointer-events-none flex items-center justify-center"
                style={{
                  width: "58%",
                  height: "58%",
                  top: "21%",
                  left: "21%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.2) 100%)",
                }}
              />
            </div>
          ) : (
            /* SIDE VIEW: 3D ACCORDION EXPANDED PERSPECTIVE */
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src="/images/mockup/popstand/samping_transparent.png"
                alt="Popstand Side View"
                fill
                priority
                className="object-contain drop-shadow-md select-none"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-md border border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-700 font-semibold shadow-xs">
                Idshopcase Accordion Popstand
              </div>
            </div>
          )}
        </div>

        {/* Drag Hint Notice */}
        {activeView === "front" && uploadedImage && (
          <p className="text-[11px] text-neutral-500 mt-3 flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-neutral-400" />
            Klik & geser foto di dalam lingkaran untuk mengatur posisi
          </p>
        )}
      </div>

      {/* 2. CUSTOMIZER CONTROLS PANEL */}
      <div className="w-full lg:w-5/12 space-y-6 bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-tight">
            Custom Phone Popstand
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Unggah foto kenangan atau desain favorit Anda untuk dicetak langsung pada piringan akrilik popstand.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-12 bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <ImageUp className="w-4 h-4" />
            {uploadedImage ? "Ganti Foto Popstand" : "Unggah Foto Anda"}
          </Button>
        </div>

        {/* Adjustments (Only visible when image uploaded and in front view) */}
        {uploadedImage && (
          <div className="space-y-5 pt-2 border-t border-neutral-100">
            {/* Layout Style Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
                Pilihan Layout Foto
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutMode("single")}
                  className={`py-2 px-3 text-xs font-medium border rounded-md transition-all cursor-pointer ${
                    layoutMode === "single"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  1 Foto Penuh
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode("grid-2")}
                  className={`py-2 px-3 text-xs font-medium border rounded-md transition-all cursor-pointer ${
                    layoutMode === "grid-2"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  2 Foto Split
                </button>
                <button
                  type="button"
                  onClick={() => setLayoutMode("grid-4")}
                  className={`py-2 px-3 text-xs font-medium border rounded-md transition-all cursor-pointer ${
                    layoutMode === "grid-4"
                      ? "border-black bg-black text-white"
                      : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  4 Foto Grid
                </button>
              </div>
            </div>

            {/* Zoom Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-neutral-700">
                  Perbesar / Zoom
                </span>
                <span className="text-neutral-500 font-mono">{Math.round(scale * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <ZoomOut className="w-4 h-4 text-neutral-400" />
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                />
                <ZoomIn className="w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {/* Rotation Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-neutral-700">
                  Rotasi Foto
                </span>
                <span className="text-neutral-500 font-mono">{rotation}°</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="5"
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
            </div>

            {/* Reset Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Posisi & Skala
              </button>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-900 shrink-0" />
            <span>High-Gloss Acrylic Coating (Anti Gores & Mengkilap)</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-900 shrink-0" />
            <span>Universal Grip Stand (Bisa diputar 360° & dilipat)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCustomPopstand;
