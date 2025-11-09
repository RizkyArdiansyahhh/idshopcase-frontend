"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ImageUp, SquaresSubtract } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef } from "react";

export default function CasePreview() {
  const [designImage, setDesignImage] = useState<string | null>(null);
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

  const handleDesignUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setDesignImage(reader.result as string);
        setScale(1);
        setTranslate({ x: 0, y: 0 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setDesignImage(null);
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
    if (!designImage) return;
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
      {/* === KIRI: Step Info === */}
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
              Pastikan Gambar yang anda upload berformat .png atau .jpg
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
            <p className="text-lg font-semibold">Step 3 : Jalankan Aksi</p>
            <p className="text-sm font-medium text-foreground/70">
              Anda dapat mengatur posisi dan ukuran pola
            </p>
          </div>
        </div>
      </div>

      {/* === KANAN: Preview Area === */}
      <div className="h-full flex gap-7 p-6 font-sans flex-row">
        <div
          className={`relative w-[17rem] h-[30.5rem] rounded-[2.4rem] overflow-hidden shadow-lg ${colorSelected}`}
          onMouseDown={onDragStart}
          onMouseMove={onDragMove}
          onMouseUp={onDragEnd}
          onMouseLeave={onDragEnd}
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
          onTouchCancel={onDragEnd}
        >
          {/* Mockup HP */}
          <Image
            src="/images/phone-template.png"
            alt="Mockup HP"
            fill
            className="object-contain pointer-events-none select-none"
            priority
          />

          {/* Pattern Background */}
          {designImage && (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${designImage})`,
                backgroundRepeat: "repeat",
                backgroundSize: "80px auto", // ubah ukuran pola di sini
                backgroundPosition: "center",
                transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                transition: isDragging ? "none" : "transform 0.1s ease-out",
              }}
            ></div>
          )}

          {/* Placeholder */}
          {!designImage && (
            <span className="absolute text-gray-500 text-center px-3 bg-white/70 rounded-md">
              Unggah desain casing Anda
            </span>
          )}
        </div>

        {/* === Kontrol === */}
        <div className="mt-6 w-full max-w-xs space-y-3">
          {/* Pilih warna */}
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

          {/* Upload Gambar */}
          <Field>
            <Input
              id="imageUploadCustomCase"
              ref={designInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDesignUpload}
            />
            <FieldLabel htmlFor="imageUploadCustomCase">
              <div className="h-20 border-dotted border p-5 rounded-sm flex flex-col items-center justify-center text-foreground/50 cursor-pointer hover:bg-foreground/5 transition-all ease-in duration-100 hover:border-foreground/40">
                <ImageUp size={36} />
                <p>Unggah desain casing</p>
              </div>
            </FieldLabel>
          </Field>

          {/* Zoom */}
          <div className="flex gap-3 mt-4">
            <Button variant={"default"} onClick={handleZoomOut}>
              −
            </Button>
            <Button variant={"outline"} onClick={handleZoomIn}>
              +
            </Button>
          </div>

          {/* Reset */}
          <Button variant={"destructive"} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
