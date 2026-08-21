"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCurrency } from "@/lib/format-currency";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { LuEye } from "react-icons/lu";

type ProductCardCollectionProps = {
  product: Product;
  onQuickView: (product: Product) => void;
};

export const ProductCardCollection = ({
  product,
  onQuickView,
}: ProductCardCollectionProps) => {
  const images = product.ProductImages || [];
  const primaryImage =
    images.find((image) => image.isPrimary)?.imageUrl ??
    images[0]?.imageUrl ??
    "/images/preview-case-2.png";

  const secondaryImage = images[1]?.imageUrl ?? null;

  const price = getMinMaxVariantPrice(product.Variants);
  const formattedPrice = price
    ? price.min === price.max
      ? formatCurrency(price.min)
      : `${formatCurrency(price.min)} – ${formatCurrency(price.max)}`
    : "Rp 85.000";

  return (
    <div className="group flex flex-col space-y-3 select-none font-[family-name:var(--font-fustat)]">
      {/* 1. Large Portrait Photo Frame with Bamboo Blonde Top-Right Quick View & Bottom Detail Product Button */}
      <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/4] bg-[#f8f8f8] overflow-hidden">
        <Link href={`/products/detail/${product.id}`} className="block w-full h-full">
          {/* Primary Image */}
          <Image
            src={cleanImageUrl(primaryImage)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover object-center transition-all duration-700 ease-out ${
              secondaryImage
                ? "group-hover:opacity-0 group-hover:scale-104"
                : "group-hover:scale-104"
            }`}
          />

          {/* Secondary Image on Hover (Smooth Cross-fade) */}
          {secondaryImage && (
            <Image
              src={cleanImageUrl(secondaryImage)}
              alt={`${product.name} preview`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-104 transition-all duration-700 ease-out"
            />
          )}
        </Link>

        {/* Top-Left Category Badge (Flush at Corner) */}
        {product.category && (
          <div className="absolute top-0 left-0 z-20 pointer-events-none">
            <span className="bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 inline-block">
              {product.category.replace("_", " ")}
            </span>
          </div>
        )}

        {/* Top-Right Quick View Icon Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(product);
          }}
          title="Quick View"
          className="absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full bg-white/95 hover:bg-black text-neutral-800 hover:text-white border border-neutral-200/90 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer sm:opacity-0 sm:group-hover:opacity-100"
        >
          <LuEye className="w-4 h-4" />
        </button>

        {/* Bottom Slide-up DETAIL PRODUCT Button */}
        <div className="absolute inset-x-3 bottom-3 z-20 transition-all duration-300 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/products/detail/${product.id}`}
            className="w-full h-9 sm:h-10 bg-white/95 hover:bg-black text-neutral-900 hover:text-white text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] border border-neutral-300 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>DETAIL PRODUCT</span>
          </Link>
        </div>
      </div>

      {/* 2. Left-Aligned Minimalist Typography (Bamboo Blonde Style) */}
      <Link href={`/products/detail/${product.id}`} className="flex flex-col space-y-1 text-left pt-0.5">
        <h3 className="text-xs sm:text-[14px] font-medium tracking-[0.06em] uppercase text-neutral-900 group-hover:text-neutral-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs sm:text-[13px] font-normal text-neutral-600">
          {formattedPrice}
        </p>
      </Link>
    </div>
  );
};
