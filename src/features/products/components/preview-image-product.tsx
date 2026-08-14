"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";

type PreviewImageProductProps = {
  images: ProductImage[];
  isLoading?: boolean;
};

export const PreviewImageProduct = (props: PreviewImageProductProps) => {
  const { images, isLoading } = props;

  const cleanedImages = useMemo(() => {
    if (!images || images.length === 0) return ["/images/product-1.jpeg"];
    return images.map((img) => cleanImageUrl(img.imageUrl));
  }, [images]);

  const [previewImage, setPreviewImage] = useState<string>(cleanedImages[0]);

  useEffect(() => {
    if (cleanedImages.length > 0) {
      setPreviewImage(cleanedImages[0]);
    }
  }, [cleanedImages]);

  const handlePreviewImage = (image: string) => {
    setPreviewImage(image);
  };

  if (isLoading) {
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

  const activeSrc = previewImage || cleanedImages[0];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      {/* Gambar utama */}
      <div className="w-full lg:w-4/6 h-[320px] sm:h-[400px] lg:h-[500px] relative rounded-xl overflow-hidden bg-muted shadow-xs">
        <Image
          key={activeSrc}
          src={activeSrc}
          alt="preview-product"
          fill
          className="object-center object-cover transition-all duration-300"
        />
      </div>

      {/* Thumbnail list */}
      <div className="w-full lg:w-2/6 flex flex-row lg:flex-col gap-2.5 overflow-x-auto py-1 lg:px-3 shrink-0 no-scrollbar">
        {cleanedImages.map((image, index) => (
          <div
            key={index}
            onClick={() => handlePreviewImage(image)}
            className={`relative w-16 h-16 sm:w-20 sm:h-20 lg:w-full lg:h-28 shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 bg-muted ${
              activeSrc === image
                ? "border-foreground ring-2 ring-foreground/20"
                : "border-transparent hover:border-foreground/40 opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
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
