"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GlareHover from "@/components/ui/GlareHover";
import { formatCurrency } from "@/lib/format-currency";
import { ProductImage } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCategoryName } from "@/utils/category-utils";

type ProductCardProps = {
  id: string | number;
  name: string;
  category: string;
  images: ProductImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  price: any;
};

export const ProductCardHomePage = (props: ProductCardProps) => {
  const { id, name, category, images, price } = props;
  const mainImage =
    images?.find((image) => image.isPrimary)?.imageUrl ??
    images?.[0]?.imageUrl ??
    "/images/product-1.jpeg";
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <div className="h-fit w-full flex flex-col group cursor-pointer select-none font-[family-name:var(--font-fustat)]">
      <Link href={`/products/detail/${id}`} className="block space-y-2">
        {/* Photo Container */}
        <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/4] bg-neutral-100/60 overflow-hidden">
          {/* Flush Category Badge */}
          {category && (
            <span className="absolute top-0 left-0 z-20 px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-black text-white pointer-events-none">
              {formatCategoryName(category)}
            </span>
          )}

          <Image
            key={activeImage}
            src={cleanImageUrl(activeImage)}
            fill
            alt={name || "Product"}
            className="object-cover object-center transition-all duration-300"
          />

          <GlareHover
            width="100%"
            height="100%"
            glareColor="#ffffff"
            glareOpacity={0.8}
            glareAngle={-45}
            glareSize={300}
            transitionDuration={800}
            playOnce={false}
            className="absolute inset-0 w-full h-full z-10"
          />

          {/* Thumbnails Appearing from Top on Hover */}
          {images && images.length > 1 && (
            <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-xs p-1 rounded-xs border border-neutral-200/90 shadow-xs pointer-events-auto">
              {images.slice(0, 4).map((image) => (
                <button
                  type="button"
                  key={image.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImage(image.imageUrl);
                  }}
                  onMouseEnter={() => setActiveImage(image.imageUrl)}
                  onMouseLeave={() => setActiveImage(mainImage)}
                  className={`relative w-6 h-6 border transition-all cursor-pointer overflow-hidden ${
                    activeImage === image.imageUrl
                      ? "border-black ring-1 ring-black"
                      : "border-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  <Image
                    src={cleanImageUrl(image.imageUrl)}
                    fill
                    alt={name || "Thumbnail"}
                    className="object-cover object-center"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Below */}
        <div className="text-center space-y-0.5 px-1 pt-0.5">
          <h3 className="font-medium text-xs sm:text-[14px] text-neutral-800 line-clamp-1 group-hover:text-neutral-500 transition-colors">
            {name}
          </h3>
          <p className="text-xs sm:text-[13px] font-normal text-neutral-500">
            {price
              ? price.min === price.max
                ? formatCurrency(price.min)
                : `${formatCurrency(price.min)} – ${formatCurrency(price.max)}`
              : "Harga tidak tersedia"}
          </p>
        </div>
      </Link>
    </div>
  );
};
