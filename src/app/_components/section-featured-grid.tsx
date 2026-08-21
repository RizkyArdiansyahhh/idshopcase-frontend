"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCurrency } from "@/lib/format-currency";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { formatCategoryName } from "@/utils/category-utils";
import GlareHover from "@/components/ui/GlareHover";
import { SkeletonProduct } from "@/components/shared/skeleton-product";
import { Product } from "@/types/api";

export const SectionFeaturedGrid = () => {
  const t = useTranslations("home");
  const { data: products, isLoading } = useGetProducts();

  if (isLoading) {
    return (
      <section className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 py-10 sm:py-14 font-[family-name:var(--font-fustat)]">
        <div className="text-center mb-6">
          <div className="h-6 w-48 bg-neutral-200 mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <SkeletonProduct key={idx} />
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) return null;

  // We display 4 or 8 products (4 per row)
  const displayProducts = products.slice(0, 8);

  return (
    <section className="w-full py-10 sm:py-14 font-[family-name:var(--font-fustat)] text-neutral-900 select-none bg-white">
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* =========================================================================
            CENTERED SECTION TITLE in Fustat
           ========================================================================= */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-neutral-900 font-[family-name:var(--font-fustat)]">
            {t("featuredProducts")}
          </h2>
        </div>

        {/* =========================================================================
            4-COLUMN PRODUCT GRID
           ========================================================================= */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayProducts.map((product) => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </div>

        {/* =========================================================================
            BOTTOM CENTERED "VIEW ALL PRODUCTS" BUTTON
           ========================================================================= */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/products/collections"
            className="inline-flex items-center justify-center px-10 sm:px-14 py-3 sm:py-3.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm tracking-[0.18em] uppercase rounded-none transition-all shadow-md active:scale-98 cursor-pointer font-[family-name:var(--font-fustat)]"
          >
            {t("viewAllProducts")}
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// Single Product Card with Taller Vertical Aspect Ratio & Active GlareHover
// ============================================================================
const ProductCardItem = ({ product }: { product: Product }) => {
  const images = product.ProductImages || [];
  const mainImage =
    images.find((image) => image.isPrimary)?.imageUrl ??
    images[0]?.imageUrl ??
    "/images/preview-case-2.png";

  const [activeImage, setActiveImage] = useState(mainImage);
  const price = getMinMaxVariantPrice(product.Variants);
  const categoryLabel = formatCategoryName(product.category) || "Custom";

  const formattedPrice = price
    ? price.min === price.max
      ? formatCurrency(price.min)
      : `${formatCurrency(price.min)} – ${formatCurrency(price.max)}`
    : "Rp 95.000";

  return (
    <div className="group flex flex-col space-y-2.5 bg-white font-[family-name:var(--font-fustat)] select-none">
      {/* Clickable Card Link */}
      <Link
        href={`/products/detail/${product.id}`}
        className="block space-y-2 cursor-pointer"
      >
        {/* Taller Vertical Full-bleed Image Container (aspect-[3/4]) */}
        <div className="relative w-full aspect-[3/4.2] sm:aspect-[3/4] bg-neutral-100/60 overflow-hidden">
          {/* Category Badge Top-Left in Fustat (Flush) */}
          <span className="absolute top-0 left-0 z-20 px-3 py-1.5 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-black text-white font-[family-name:var(--font-fustat)] pointer-events-none">
            {categoryLabel}
          </span>

          {/* Product Image */}
          <Image
            key={activeImage}
            src={cleanImageUrl(activeImage)}
            alt={product.name || "Product"}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover object-center transition-all duration-300 pointer-events-none"
          />

          {/* GlareHover Effect */}
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

          {/* Multiple Thumbnail Switcher: Floats at the Top on Hover (Sliding from Top) */}
          {images.length > 1 && (
            <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1.5 -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-xs p-1 rounded-xs border border-neutral-200/90 shadow-xs pointer-events-auto">
              {images.slice(0, 4).map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImage(img.imageUrl);
                  }}
                  onMouseEnter={() => setActiveImage(img.imageUrl)}
                  onMouseLeave={() => setActiveImage(mainImage)}
                  className={`relative w-6 h-6 border transition-all cursor-pointer overflow-hidden ${
                    activeImage === img.imageUrl
                      ? "border-black ring-1 ring-black"
                      : "border-neutral-200 hover:border-neutral-700"
                  }`}
                >
                  <Image
                    src={cleanImageUrl(img.imageUrl)}
                    alt="variant"
                    fill
                    sizes="24px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Minimalist Centered Typography & Price in Fustat */}
        <div className="text-center space-y-0.5 px-1 pt-0.5">
          <h3 className="text-xs sm:text-[14px] font-medium text-neutral-800 line-clamp-1 group-hover:text-neutral-500 transition-colors font-[family-name:var(--font-fustat)]">
            {product.name}
          </h3>

          <p className="text-xs sm:text-[13px] font-normal text-neutral-500 font-[family-name:var(--font-fustat)]">
            {formattedPrice}
          </p>
        </div>
      </Link>
    </div>
  );
};
