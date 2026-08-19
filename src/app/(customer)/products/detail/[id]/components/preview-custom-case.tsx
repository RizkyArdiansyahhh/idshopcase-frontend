"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ImageUp,
  SquaresSubtract,
  Scissors,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Smartphone,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import React, { useState, useRef, JSX } from "react";

interface PhoneColorVariant {
  id: string;
  name: string;
  badge: string;
  bodyImage: string;
  cameraOverlay: string;
  bgClass: string;
  borderClass: string;
}

const COLOR_VARIANTS: PhoneColorVariant[] = [
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
];

export default function CasePreview() {
  const [selectedColorId, setSelectedColorId] = useState("navy");
  const [designImages, setDesignImages] = useState<string[]>([]);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const activeColor =
    COLOR_VARIANTS.find((c) => c.id === selectedColorId) || COLOR_VARIANTS[0];

  const designInputRef = useRef<HTMLInputElement | null>(null);

  /** --------------------------
   *  UPLOAD MAX 3 GAMBAR
   * --------------------------- */
  const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 3) {
      alert("Maksimal upload 3 gambar!");
      return;
    }

    const readers = files.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((results) => {
      setDesignImages(results);
      setScale(1);
      setTranslate({ x: 0, y: 0 });
    });
  };

  const generatePatternGrid = () => {
    if (designImages.length === 0) return null;

    const rows = 5;
    const rowElements: JSX.Element[] = [];
    let imgCounter = 0;

    for (let r = 0; r < rows; r++) {
      const isOdd = r % 2 === 1;
      const itemsInRow: JSX.Element[] = [];

      for (let c = 0; c < 3; c++) {
        const currentImage = designImages[imgCounter % designImages.length];
        imgCounter++;

        itemsInRow.push(
          <img
            key={`face-${r}-${c}`}
            src={currentImage}
            alt="custom-face"
            className="object-contain drop-shadow-md shrink-0"
            style={{
              width: 48,
              height: 48,
            }}
          />
        );
      }

      rowElements.push(
        <div
          key={`row-${r}`}
          className="flex items-center justify-between w-full"
          style={{
            transform: isOdd ? "translateX(-22px)" : "translateX(0px)",
            paddingLeft: isOdd ? "0px" : "3px",
            paddingRight: isOdd ? "0px" : "3px",
          }}
        >
          {itemsInRow}
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col justify-between pt-1 pb-0">
        {rowElements}
      </div>
    );
  };

  const handleReset = () => {
    setDesignImages([]);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    if (designInputRef.current) designInputRef.current.value = "";
  };

  const handleZoomIn = () => setScale((prev) => Math.min(prev * 1.2, 2.5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev / 1.2, 0.6));

  const getEventCoords = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if ("touches" in e && e.touches.length > 0)
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if ("clientX" in e) return { x: e.clientX, y: e.clientY };
    return { x: 0, y: 0 };
  };

  const onDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (designImages.length === 0) return;
    e.preventDefault();
    setIsDragging(true);
    const coords = getEventCoords(e);
    setStartPos({
      x: coords.x - translate.x,
      y: coords.y - translate.y,
    });
  };

  const onDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isDragging) return;
    e.preventDefault();
    const coords = getEventCoords(e);
    setTranslate({
      x: coords.x - startPos.x,
      y: coords.y - startPos.y,
    });
  };

  const onDragEnd = () => setIsDragging(false);

  return (
    <div className="h-fit w-full flex flex-col lg:flex-row gap-10 py-7">
      {/* === LEFT: STEPS === */}
      <div className="h-full w-full lg:w-2/5 flex flex-col gap-5">
        {/* Step 1 */}
        <div className="border rounded-[12px] p-4 flex flex-col gap-3">
          <div className="flex flex-row gap-4 items-center">
            <div className="h-24 w-24 relative flex-shrink-0">
              <Image
                src={"/images/steps-1.png"}
                alt="step-1"
                fill
                className="object-cover scale-75"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Step 1 : Tambahkan Gambar</p>
              <p className="text-sm font-medium text-foreground/70">
                Silakan unggah foto wajah Anda dengan format PNG
              </p>
            </div>
          </div>
          <div className="p-3 bg-muted/60 border rounded-lg text-xs flex items-start gap-2.5">
            <Scissors className="w-4 h-4 text-foreground shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground">Format Preview Custom Case</p>
              <p className="text-muted-foreground leading-relaxed">
                Gunakan foto <strong>PNG transparan (tanpa background)</strong> agar hasil cetak menyatu rapi. Anda bisa menghapus background foto secara gratis di{" "}
                <a
                  href="https://www.remove.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-foreground hover:opacity-80"
                >
                  remove.bg
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="border rounded-[12px] h-fit flex flex-row gap-4 p-4 items-center">
          <div className="h-20 w-20 flex justify-center items-center flex-shrink-0">
            <SquaresSubtract size={44} className="text-foreground/80" />
          </div>
          <div>
            <p className="text-lg font-semibold">Step 2: Gabungkan Foto</p>
            <p className="text-sm font-medium text-foreground/70">
              Pilih 1 hingga 3 foto diri Anda untuk digabungkan dengan gambar
              utama. Pastikan foto yang dipilih jelas dan sesuai format.
            </p>
          </div>
        </div>

        {/* Fullscreen Studio Banner Link */}
        <div className="p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-[12px] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Kustomisasi Lengkap</span>
          </div>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Ingin kanvas studio pure-white yang luas dengan pilihan tata letak stiker yang leluasa?
          </p>
          <div className="pt-1">
            <Link href="/customizer">
              <Button size="sm" className="text-xs font-semibold gap-1.5 shadow-sm">
                <span>Buka Custom Studio (Fullscreen)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* === RIGHT: PREVIEW & CONTROLS === */}
      <div className="h-full flex gap-7 p-2 sm:p-6 font-sans flex-col lg:flex-row items-center lg:items-start justify-center">
        {/* Mockup Canvas: Pure White Studio Look */}
        <div className="relative w-[280px] sm:w-[320px] aspect-[1024/1536] flex items-center justify-center select-none cursor-default group bg-white rounded-3xl border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] p-4">
          {/* LAYER 1: Full Phone Body (Authentic Color Mockup) */}
          <img
            src={activeColor.bodyImage}
            alt={activeColor.name}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-xl transition-all duration-300"
          />

          {/* LAYER 2: User Pattern Grid (Strictly inside inner case backplate) */}
          {designImages.length > 0 && (
            <div
              className="absolute left-[22.8%] right-[22.8%] top-[33.5%] bottom-[11.8%] rounded-b-[2.6rem] overflow-hidden [clip-path:inset(0_round_0_0_2.6rem_2.6rem)] [transform:translateZ(0)] flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full flex items-center justify-center">
                {generatePatternGrid()}
              </div>
            </div>
          )}

          {/* LAYER 3: Camera Plateau Overlay (Authentic Color Camera Top) */}
          <img
            src={activeColor.cameraOverlay}
            alt="Camera Module"
            className="absolute top-0 left-0 w-full h-full object-contain object-top pointer-events-none z-20 transition-all duration-300"
          />

          {/* Placeholder Notice */}
          {designImages.length === 0 && (
            <div className="absolute left-[21.5%] right-[21.5%] top-[55%] flex items-center justify-center z-10 pointer-events-none">
              <span className="text-slate-800 text-xs text-center px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-lg shadow-md font-medium border border-gray-200">
                Unggah 1–3 foto PNG (No BG)
              </span>
            </div>
          )}
        </div>

        {/* Controls Column */}
        <div className="mt-2 lg:mt-0 w-full max-w-xs space-y-4">
          {/* Active Device Badge & Color Selector */}
          <div className="p-3 bg-muted/30 border rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-foreground">iPhone 17 Pro Max</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                {activeColor.badge}
              </span>
            </div>

            {/* Color Switcher Buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-border/50">
              <span className="text-[11px] text-muted-foreground">Warna:</span>
              <div className="flex items-center gap-1.5">
                {COLOR_VARIANTS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedColorId(c.id)}
                    className={`w-6 h-6 rounded-full ${c.bgClass} ${c.borderClass} border transition-transform ${
                      selectedColorId === c.id
                        ? "ring-2 ring-primary ring-offset-2 scale-110"
                        : "hover:scale-105 opacity-80"
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Zoom Controls */}
          {designImages.length > 0 && (
            <div className="flex items-center justify-between gap-2 p-2 bg-muted/30 border rounded-xl">
              <span className="text-xs font-medium text-foreground/70 pl-2">Zoom Desain:</span>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleZoomOut}
                  className="h-8 w-8 p-0"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </Button>
                <span className="text-xs font-semibold min-w-[3rem] text-center">
                  {Math.round(scale * 100)}%
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={handleZoomIn}
                  className="h-8 w-8 p-0"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          )}

          {/* Upload Input Field */}
          <Field>
            <Input
              id="imageUploadCustomCase"
              ref={designInputRef}
              type="file"
              accept="image/png"
              multiple
              className="hidden"
              onChange={handleDesignUpload}
            />
            <FieldLabel htmlFor="imageUploadCustomCase">
              <div className="h-24 w-full border-2 border-dashed border-foreground/30 p-4 rounded-xl flex flex-col items-center justify-center text-foreground/60 cursor-pointer hover:bg-foreground/5 transition-all ease-in duration-100 hover:border-foreground/60 gap-1 text-center">
                <ImageUp size={28} />
                <p className="font-semibold text-xs sm:text-sm">Unggah 1–3 foto (PNG)</p>
                <p className="text-[11px] text-foreground/50">Hapus background di remove.bg</p>
              </div>
            </FieldLabel>
          </Field>

          {/* Reset Button */}
          <Button
            className="w-full flex items-center justify-center gap-2"
            variant={"outline"}
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Foto & Posisi</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
