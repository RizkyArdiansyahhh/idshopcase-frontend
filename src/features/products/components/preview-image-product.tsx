"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { ZoomIn } from "lucide-react";

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
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomOrigin, setZoomOrigin] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cleanedImages.length > 0) {
      setPreviewImage(cleanedImages[0]);
    }
  }, [cleanedImages]);

  const handlePreviewImage = (image: string) => {
    setPreviewImage(image);
  };

  // Hover Zoom Coordinates Calculation (Tokopedia Style)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomOrigin({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  }, []);

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => {
    setIsZoomed(false);
    setZoomOrigin({ x: 50, y: 50 });
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full aspect-square max-h-[500px] rounded-2xl" />
        <div className="w-full flex flex-row gap-3.5 overflow-hidden py-1">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  const activeSrc = previewImage || cleanedImages[0];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Gambar Utama (Hero Image) - Tokopedia-style Hover Zoom */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full aspect-square max-h-[460px] sm:max-h-[500px] lg:max-h-[540px] relative rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm cursor-zoom-in group select-none"
      >
        <div
          className="w-full h-full relative transition-transform duration-150 ease-out will-change-transform"
          style={{
            transform: isZoomed ? "scale(2.2)" : "scale(1)",
            transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
          }}
        >
          <Image
            key={activeSrc}
            src={activeSrc}
            alt="preview-product"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center pointer-events-none"
          />
        </div>

        {/* Subtle Zoom Hint Badge (Disappears on hover) */}
        <div
          className={`absolute bottom-3 right-3 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-border/40 text-[11px] font-medium text-foreground/80 flex items-center gap-1.5 shadow-sm transition-opacity duration-200 pointer-events-none ${
            isZoomed ? "opacity-0" : "opacity-90 group-hover:opacity-0"
          }`}
        >
          <ZoomIn className="w-3.5 h-3.5 text-primary" />
          <span>Arahkan kursor untuk zoom</span>
        </div>
      </div>

      {/* Thumbnail List */}
      {cleanedImages.length > 1 && (
        <div className="w-full flex flex-row gap-3.5 overflow-x-auto py-1 no-scrollbar items-center">
          {cleanedImages.map((image, index) => {
            const isActive = activeSrc === image;
            return (
              <button
                type="button"
                key={index}
                onClick={() => handlePreviewImage(image)}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 shrink-0 cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-200 bg-muted ${
                  isActive
                    ? "border-primary ring-2 ring-primary/20 shadow-md scale-105 opacity-100"
                    : "border-border/60 hover:border-foreground/40 opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={image}
                  alt={`thumbnail-${index}`}
                  fill
                  sizes="120px"
                  className="object-cover object-center"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
