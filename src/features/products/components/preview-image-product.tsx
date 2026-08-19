"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ProductImage } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type PreviewImageProductProps = {
  images: ProductImage[];
  isLoading?: boolean;
};

// Native High-Precision Bamboo Blonde (+) Cursor (Zero Lag, 100% Native Fluidity)
const PLUS_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='16' fill='white' stroke='%23e5e5e5' stroke-width='1.5'/%3E%3Cpath d='M18 11v14M11 18h14' stroke='%23171717' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E") 18 18, zoom-in`;

// Clickable & Hoverable Image Card with Native (+) Cursor
function InteractiveImageCard({
  src,
  alt,
  priority = false,
  aspectClass = "aspect-square",
  onClick,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  aspectClass?: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{ cursor: PLUS_CURSOR }}
      className={`w-full ${aspectClass} relative rounded-none overflow-hidden bg-neutral-50 border border-neutral-200/70 shadow-2xs group select-none transition-all`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
        className="object-cover object-center pointer-events-none"
      />
    </div>
  );
}

export const PreviewImageProduct = (props: PreviewImageProductProps) => {
  const { images, isLoading } = props;

  const cleanedImages = useMemo(() => {
    if (!images || images.length === 0) return ["/images/product-1.jpeg"];
    return images.map((img) => cleanImageUrl(img.imageUrl));
  }, [images]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalIndex, setModalIndex] = useState<number>(0);

  // Handle keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
      if (e.key === "ArrowLeft") {
        setModalIndex((prev) => (prev > 0 ? prev - 1 : cleanedImages.length - 1));
      }
      if (e.key === "ArrowRight") {
        setModalIndex((prev) => (prev < cleanedImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, cleanedImages.length]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="w-full flex flex-col gap-3 sm:gap-4">
        <Skeleton className="w-full aspect-[3/4] max-h-[640px] rounded-none" />
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Skeleton className="w-full aspect-[3/4] rounded-none" />
          <Skeleton className="w-full aspect-[4/5] rounded-none" />
        </div>
      </div>
    );
  }

  // 1. Single Image Case
  if (cleanedImages.length === 1) {
    return (
      <>
        <div className="w-full">
          <InteractiveImageCard
            src={cleanedImages[0]}
            alt="product-hero"
            priority={true}
            aspectClass="aspect-[3/4] max-h-[640px]"
            onClick={() => openModal(0)}
          />
        </div>

        {/* Modal */}
        {isModalOpen && (
          <ModalLightbox
            images={cleanedImages}
            index={modalIndex}
            setIndex={setModalIndex}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </>
    );
  }

  // 2. Multi-Image Vertical Masonry Stack
  const heroImage = cleanedImages[0];
  const secondaryImages = cleanedImages.slice(1);

  // Divide into Left and Right Columns for seamless, tight masonry flow
  const leftCol = secondaryImages.filter((_, idx) => idx % 2 === 0);
  const rightCol = secondaryImages.filter((_, idx) => idx % 2 === 1);

  return (
    <>
      <div className="w-full flex flex-col gap-3 sm:gap-4 select-none">
        {/* Primary Tall Hero Image (aspect-[3/4] memanjang) */}
        <InteractiveImageCard
          src={heroImage}
          alt="product-hero-primary"
          priority={true}
          aspectClass="aspect-[3/4] max-h-[660px]"
          onClick={() => openModal(0)}
        />

        {/* Continuous 2-Column Vertical Gallery Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {leftCol.map((src, idx) => {
              const originalIndex = idx * 2 + 1;
              const isTall = idx % 2 === 0;
              return (
                <InteractiveImageCard
                  key={`left-img-${idx}`}
                  src={src}
                  alt={`product-detail-left-${idx + 1}`}
                  priority={false}
                  aspectClass={isTall ? "aspect-[3/4]" : "aspect-[4/5]"}
                  onClick={() => openModal(originalIndex)}
                />
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {rightCol.map((src, idx) => {
              const originalIndex = idx * 2 + 2;
              const isTall = idx % 2 === 1;
              return (
                <InteractiveImageCard
                  key={`right-img-${idx}`}
                  src={src}
                  alt={`product-detail-right-${idx + 1}`}
                  priority={false}
                  aspectClass={isTall ? "aspect-[3/4]" : "aspect-[4/5]"}
                  onClick={() => openModal(originalIndex)}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Foto Fullscreen Modal (< X >) */}
      {isModalOpen && (
        <ModalLightbox
          images={cleanedImages}
          index={modalIndex}
          setIndex={setModalIndex}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

function ModalLightbox({
  images,
  index,
  setIndex,
  onClose,
}: {
  images: string[];
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200 select-none">
      {/* Main Large Image Container */}
      <div className="relative w-full max-w-4xl h-[78vh] sm:h-[84vh] flex items-center justify-center">
        <Image
          src={images[index]}
          alt={`product-full-${index}`}
          fill
          sizes="100vw"
          className="object-contain pointer-events-none"
        />
      </div>

      {/* Bottom Floating Control Pill (< X >) */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-white/95 px-3 py-2 rounded-full border border-neutral-200 shadow-2xl backdrop-blur-md">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() =>
            setIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
          }
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
          title="Foto Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-900 transition-colors cursor-pointer"
          title="Tutup (Esc)"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Next Button */}
        <button
          type="button"
          onClick={() =>
            setIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
          }
          className="w-9 h-9 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-800 transition-colors cursor-pointer"
          title="Foto Selanjutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PreviewImageProduct;
