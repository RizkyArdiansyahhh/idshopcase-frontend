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
  Layers,
  Move,
  Check,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export const PopstandStudio = () => {
  const router = useRouter();

  // View Angle: "front" (Tampak Depan - Custom) | "side" (Tampak Samping)
  const [activeView, setActiveView] = useState<"front" | "side">("front");

  // Custom Image State
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Grid / Collage Layout Mode: "single" | "grid-2" | "grid-4"
  const [layoutMode, setLayoutMode] = useState<"single" | "grid-2" | "grid-4">("single");

  // Popstand Variant Body Color: "clear" | "white" | "black"
  const [variantColor, setVariantColor] = useState<"clear" | "white" | "black">("clear");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image Upload Handler
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
        toast.success("Foto berhasil diunggah ke Popstand!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag to Reposition
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!uploadedImage || activeView !== "front") return;
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

  // Add to Cart / Order Action
  const handleAddToCart = () => {
    if (!uploadedImage) {
      toast.error("Silakan unggah foto Anda terlebih dahulu sebelum memesan!");
      fileInputRef.current?.click();
      return;
    }
    toast.success("Popstand custom berhasil ditambahkan ke pesanan!");
    router.push("/products/detail/1");
  };

  return (
    <div className="flex-1 w-full h-full flex flex-col lg:flex-row items-center justify-between px-4 sm:px-10 pb-4 sm:pb-8 gap-8 relative overflow-hidden select-none font-sans">
      {/* Hidden File Picker */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* =========================================================================
          LEFT / CENTER: 3D PHOTOREALISTIC POPSTAND MOCKUP CANVAS
         ========================================================================= */}
      <div className="flex-1 w-full h-full flex flex-col items-center justify-center relative select-none">
        {/* View Switcher Pill (Tampak Depan vs Tampak Samping) */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-full mb-6 border border-neutral-200 shadow-xs z-20">
          <button
            type="button"
            onClick={() => setActiveView("front")}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
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
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === "side"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Tampak Samping (3D)
          </button>
        </div>

        {/* The 3D Mockup Container Frame */}
        <div className="relative h-[65vh] sm:h-[72vh] max-h-[640px] aspect-square flex items-center justify-center p-4">
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
                  className="object-contain drop-shadow-xl select-none"
                />
              </div>

              {/* LAYER 2: USER CUSTOM PHOTO DISC (Nested on Phone Popstand Disc) */}
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
                  /* Placeholder Upload Trigger */
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full flex flex-col items-center justify-center text-center p-4 cursor-pointer hover:bg-neutral-200/50 transition-colors"
                  >
                    <ImageUp className="w-9 h-9 text-neutral-400 mb-2 stroke-[1.5]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
                      Upload Foto
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">
                      Piringan Popstand
                    </span>
                  </div>
                )}
              </div>

              {/* LAYER 3: 3D ACRYLIC SPECULAR SHEEN (Glossy Real Reflection Overlay) */}
              <div
                className="absolute z-20 pointer-events-none flex items-center justify-center"
                style={{
                  width: "58%",
                  height: "58%",
                  top: "21%",
                  left: "21%",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 42%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.25) 100%)",
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
                className="object-contain drop-shadow-2xl select-none"
              />
              <div className="absolute bottom-4 left-6 bg-white/95 backdrop-blur-xs px-3.5 py-2 rounded-lg border border-neutral-200 text-[10px] uppercase tracking-widest text-neutral-800 font-bold shadow-sm">
                Idshopcase Accordion Popstand
              </div>
            </div>
          )}
        </div>

        {/* Drag Position Hint */}
        {activeView === "front" && uploadedImage && (
          <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-neutral-400" />
            Klik & geser foto di dalam lingkaran untuk mengatur posisi
          </p>
        )}
      </div>

      {/* =========================================================================
          RIGHT: SLEEK CUSTOMIZER CONTROL PANEL
         ========================================================================= */}
      <div className="w-full lg:w-[380px] xl:w-[420px] max-h-[82vh] overflow-y-auto bg-white p-6 sm:p-7 rounded-2xl border border-neutral-200/90 shadow-md space-y-6 flex-shrink-0">
        {/* Title & Price Header */}
        <div className="border-b border-neutral-100 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              Acrylic Custom
            </span>
            <span className="text-sm font-black text-neutral-900">
              Rp 35.000
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-neutral-900 uppercase tracking-tight mt-1">
            Universal Phone Popstand
          </h2>
          <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
            Pegangan HP akrilik bening dengan piringan cetak foto resolusi tinggi & dudukan lipat 360°.
          </p>
        </div>

        {/* Upload Button */}
        <div>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-12 bg-black hover:bg-neutral-800 text-white rounded-none uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2.5 cursor-pointer transition-all shadow-sm"
          >
            <ImageUp className="w-4 h-4" />
            {uploadedImage ? "Ganti Foto Popstand" : "Unggah Foto Anda"}
          </Button>
        </div>

        {/* Adjustments (Visible when photo is uploaded) */}
        {uploadedImage && (
          <div className="space-y-5 pt-2 border-t border-neutral-100">
            {/* Layout Style Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                Pilihan Layout Foto
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setLayoutMode("single")}
                  className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all cursor-pointer ${
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
                  className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all cursor-pointer ${
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
                  className={`py-2 px-3 text-xs font-semibold border rounded-lg transition-all cursor-pointer ${
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
                <span className="font-bold uppercase tracking-wider text-neutral-800">
                  Perbesar / Zoom
                </span>
                <span className="text-neutral-500 font-mono font-medium">{Math.round(scale * 100)}%</span>
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
                <span className="font-bold uppercase tracking-wider text-neutral-800">
                  Rotasi Sudut
                </span>
                <span className="text-neutral-500 font-mono font-medium">{rotation}°</span>
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
            <div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-600 hover:text-black flex items-center gap-1.5 cursor-pointer font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Posisi & Rotasi
              </button>
            </div>
          </div>
        )}

        {/* Quality Badges */}
        <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neutral-900 shrink-0" />
            <span>High-Gloss Acrylic Coating (Anti Gores & Mengkilap)</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-neutral-900 shrink-0" />
            <span>Perekat 3M Super Kuat & Dapat Digunakan Kembali</span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <div className="pt-2">
          <Button
            type="button"
            onClick={handleAddToCart}
            className="w-full h-13 bg-neutral-900 hover:bg-black text-white rounded-none uppercase tracking-widest text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Beli Popstand Custom
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopstandStudio;
