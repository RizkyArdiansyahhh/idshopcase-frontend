"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageUp, SquaresSubtract } from "lucide-react";
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

  /** --------------------------
   *  GENERATE POLA TILE BERGANTIAN
   * --------------------------- */
  const generatePatternGrid = () => {
    if (designImages.length === 0) return null;

    const items: JSX.Element[] = [];
    const size = 60;
    const rows = 8;
    const cols = 2;

    let imgIndex = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const currentImage = designImages[imgIndex];

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

        imgIndex = (imgIndex + 1) % designImages.length;
      }
    }

    return items;
  };

  /** --------------------------
   *  DRAG, ZOOM, RESET
   * --------------------------- */
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
    <div className="h-[80vh] w-full flex flex-col md:flex-row gap-10 py-7">
      {/* === LEFT: STEPS === */}
      <div className="h-full w-2/5 flex flex-col gap-5">
        <div className="border rounded-[12px] h-fit flex flex-row gap-4 pr-5 items-center">
          <div className="h-30 w-28 relative">
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
              Unggah 1–3 gambar untuk membuat pola casing
            </p>
          </div>
        </div>

        <div className="border rounded-[12px] h-fit flex flex-row gap-4 pr-5 items-center">
          <div className="h-30 w-28 flex justify-center items-center">
            <div className="h-16 w-16 rounded-full bg-teal-800" />
          </div>
          <div>
            <p className="text-lg font-semibold">Step 2 : Pilih Warna</p>
            <p className="text-sm font-medium text-foreground/70">
              Anda dapat memilih warna casing
            </p>
          </div>
        </div>

        <div className="border rounded-[12px] h-fit flex flex-row gap-4 pr-5 items-center">
          <div className="h-30 w-28 flex justify-center items-center">
            <SquaresSubtract size={52} className="text-foreground/80" />
          </div>
          <div>
            <p className="text-lg font-semibold">Step 3 : Atur Pola</p>
            <p className="text-sm font-medium text-foreground/70">
              Geser & atur zoom pola sesuai keinginan
            </p>
          </div>
        </div>
      </div>

      {/* === RIGHT: PREVIEW === */}
      <div className="h-full flex gap-7 p-6 font-sans flex-row">
        <div
          className={`relative w-[17rem] h-[30.5rem] bg-black rounded-[2.4rem] overflow-hidden shadow-2xl ${colorSelected}`}
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
            className="absolute -top-0.5 -left-0.5 z-10"
          />

          {/* === PATTERN GRID === */}
          {designImages.length > 0 && (
            <div
              className="absolute inset-0 grid grid-cols-2 gap-x-2"
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
            <span className="absolute text-gray-500 text-center px-3 bg-white/70 rounded-md">
              Unggah hingga 3 gambar
            </span>
          )}
        </div>

        {/* === CONTROLS === */}
        <div className="mt-6 w-full max-w-xs space-y-3">
          <div className="flex flex-row gap-3 items-center p-5">
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setColorSelected(color)}
                className={`h-10 w-10 rounded-full border transform transition-all duration-300 ease-in-out ${color} ${
                  colorSelected === color
                    ? "border-2 border-foreground scale-110"
                    : ""
                }`}
              ></div>
            ))}
          </div>

          {/* UPLOAD */}
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
              <div className="h-20 border-dotted border p-5 rounded-sm flex flex-col items-center justify-center text-foreground/50 cursor-pointer hover:bg-foreground/5 transition-all ease-in duration-100 hover:border-foreground/40">
                <ImageUp size={36} />
                <p>Unggah 1–3 gambar</p>
              </div>
            </FieldLabel>
          </Field>

          {/* ZOOM */}
          <div className="flex gap-3 mt-4">
            <Button variant={"default"} onClick={handleZoomOut}>
              −
            </Button>
            <Button variant={"outline"} onClick={handleZoomIn}>
              +
            </Button>
          </div>

          {/* RESET */}
          <Button variant={"destructive"} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
