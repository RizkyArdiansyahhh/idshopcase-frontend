"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageUp, SquaresSubtract, Scissors } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, JSX } from "react";

export default function CasePreview() {
  const [designImages, setDesignImages] = useState<string[]>([]);
  const [colorSelected, setColorSelected] = useState<string>("bg-background");
  const colors = [
    "bg-background",
    "bg-teal-900",
    "bg-amber-900",
    "bg-rose-900",
    "bg-emerald-900",
  ];

  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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

    const items: JSX.Element[] = [];
    const size = 60;
    const rows = 8;
    const cols = 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let currentImage = "";

        if (designImages.length === 2) {
          currentImage = r % 2 === 0 ? designImages[c] : designImages[1 - c];
        } else {
          const index = (r * cols + c) % designImages.length;
          currentImage = designImages[index];
        }

        items.push(
          <img
            key={`${r}-${c}`}
            src={currentImage}
            className="object-cover"
            style={{
              width: size,
              height: size,
              transform: r % 2 === 1 ? "translateX(55px)" : "none",
            }}
          />
        );
      }
    }

    return items;
  };

  const handleReset = () => {
    setDesignImages([]);
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    if (designInputRef.current) designInputRef.current.value = "";
  };

  const handleZoomIn = () => setScale((prev) => prev * 1.2);
  const handleZoomOut = () => setScale((prev) => prev / 1.2);

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
                Gunakan foto <strong>PNG transparan (tanpa background)</strong> agar hasil cetak menyatu rapi. Anda bisa menghapus background foto secara gratis (misal di{" "}
                <a
                  href="https://www.remove.bg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-semibold text-foreground hover:opacity-80"
                >
                  remove.bg
                </a>
                ).
              </p>
            </div>
          </div>
        </div>

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
      </div>

      {/* === RIGHT: PREVIEW === */}
      <div className="h-full flex gap-7 p-2 sm:p-6 font-sans flex-col lg:flex-row items-center lg:items-start justify-center">
        <div
          className={`relative w-[15rem] lg:w-[17rem] h-[30.5rem] lg:h-[35rem] bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl ${colorSelected} flex-shrink-0 flex items-center justify-center border-4 border-foreground/10`}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          onTouchCancel={onDragEnd}
        >
          <img
            src="/images/preview-case-2.png"
            alt="Mockup HP"
            className="w-full h-full object-cover"
          />
          <img
            src="/images/preview-case-camera.png"
            alt=""
            className="absolute top-0 left-0 z-10 w-full h-auto object-contain pointer-events-none"
          />

          {/* === PATTERN GRID === */}
          {designImages.length > 0 && (
            <div
              className="absolute inset-0 grid grid-cols-2 gap-x-2 items-center justify-center overflow-hidden"
              style={{
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
                pointerEvents: "none",
              }}
            >
              {generatePatternGrid()}
            </div>
          )}

          {/* === PLACEHOLDER === */}
          {designImages.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center p-4 z-20 pointer-events-none">
              <span className="text-gray-800 text-xs sm:text-sm text-center px-4 py-2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg font-medium border border-gray-200">
                Unggah 1–3 foto PNG (No BG)
              </span>
            </div>
          )}
        </div>

        {/* === CONTROLS === */}
        <div className="mt-2 lg:mt-6 w-full max-w-xs space-y-3">
          <Field className="">
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
                <ImageUp size={32} />
                <p className="font-semibold text-sm">Unggah 1–3 foto (PNG)</p>
                <p className="text-[11px] text-foreground/50">Hapus background foto dahulu di remove.bg</p>
              </div>
            </FieldLabel>
          </Field>

          {/* RESET */}
          <Button className="w-full" variant={"default"} onClick={handleReset}>
            Reset Foto
          </Button>
        </div>
      </div>
    </div>
  );
}
