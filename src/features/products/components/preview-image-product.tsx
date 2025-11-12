"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/types/api";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

type PreviewImageProductProps = {
  images: ProductImage[];
  isLoading?: boolean;
};

export const PreviewImageProduct = (props: PreviewImageProductProps) => {
  const { images, isLoading } = props;
  const [previewImage, setPreviewImage] = useState<string>("");

  // 🧹 Clean path ke format `/images/...`
  const cleanedImages = useMemo(() => {
    if (!images || images.length === 0) return [];
    return images
      .map((img) => {
        const cleanPath = img.imageUrl?.split("/uploads/")[1] ?? null;
        return cleanPath ? `/images/${cleanPath}` : "";
      })
      .filter(Boolean); // buang string kosong
  }, [images]);

  console.log(cleanedImages, "cleanedImages");
  // 🖼️ Set gambar pertama sebagai default preview
  useEffect(() => {
    if (cleanedImages.length > 0) {
      setPreviewImage(cleanedImages[0]);
    }
  }, [cleanedImages]);

  const handlePreviewImage = (image: string) => {
    setPreviewImage(image);
  };

  // ⏳ Skeleton loading
  if (isLoading || cleanedImages.length === 0) {
    return (
      <div className="h-2/3 lg:h-full w-full flex flex-col lg:flex-row gap-4">
        <Skeleton className="w-full lg:w-4/6 h-64 lg:h-full rounded-md" />
        <div className="h-1/3 lg:h-full w-full lg:w-2/6 flex flex-row lg:flex-col gap-2 px-7">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="w-24 h-24 lg:w-full lg:h-32 rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  // 🧩 Tampilan utama
  return (
    <div className="h-[300px] lg:h-[500px] w-full flex flex-col lg:flex-row">
      {/* Gambar utama */}
      <div className="w-full lg:w-4/6 h-full relative rounded-[12px] overflow-hidden">
        {previewImage && (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${previewImage}`}
            alt="preview-product"
            fill
            className="object-center object-cover transition-all duration-300"
          />
        )}
      </div>

      {/* Thumbnail list */}
      <div className="h-1/3 lg:h-full w-full lg:w-2/6 flex flex-row lg:flex-col gap-2 px-7">
        {cleanedImages.map((image, index) => (
          <div
            key={index}
            onClick={() => handlePreviewImage(image)}
            className={`relative w-24 h-24 lg:w-full lg:h-32 cursor-pointer rounded-[12px] overflow-hidden border-2 transition-all duration-200 ${
              previewImage === image
                ? "border-foreground"
                : "border-transparent hover:border-foreground/40"
            }`}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
              alt={`thumbnail-${index}`}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
