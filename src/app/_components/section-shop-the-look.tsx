"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { formatCurrency } from "@/lib/format-currency";
import { cleanImageUrl } from "@/utils/image-utils";
import { Variant } from "@/types/api";

export type HotspotItem = {
  id: string;
  name: string;
  category: string;
  priceFormatted: string;
  image: string;
  productLink: string;
  top: string; // Percentage e.g. "47.5%"
  left: string; // Percentage e.g. "48.2%"
};

export const SectionShopTheLook = () => {
  const t = useTranslations("home.shopTheLook");
  const { data: products } = useGetProducts();
  const [activeHotspotId, setActiveHotspotId] = useState<string>("hs-custom-case");

  // Helper to format single price or min-max range
  const formatProductPrice = (variants?: Variant[]) => {
    const priceObj = getMinMaxVariantPrice(variants);
    if (!priceObj) return "Rp 95.000";
    if (priceObj.min === priceObj.max) {
      return formatCurrency(priceObj.min);
    }
    return `${formatCurrency(priceObj.min)} – ${formatCurrency(priceObj.max)}`;
  };

  // 1. Resolve Products Dynamically from Database
  const customCaseProduct =
    products?.find((p) => p.category === "custom_case") || products?.[0];
  const phoneCharmProduct =
    products?.find((p) => p.category === "phone_charm") || products?.[2] || products?.[1];

  // Case Metadata
  const caseImage =
    customCaseProduct?.ProductImages?.find((i) => i.isPrimary)?.imageUrl ||
    customCaseProduct?.ProductImages?.[0]?.imageUrl ||
    "/uploads/products/CS_1.jpg";
  const casePriceFormatted = formatProductPrice(customCaseProduct?.Variants);

  // Phone Charm Metadata
  const charmImage =
    phoneCharmProduct?.ProductImages?.find((i) => i.isPrimary)?.imageUrl ||
    phoneCharmProduct?.ProductImages?.[0]?.imageUrl ||
    "/uploads/products/PC_1.jpg";
  const charmPriceFormatted = formatProductPrice(phoneCharmProduct?.Variants);

  // 2. Build Dynamic Hotspots Array Bound to Real DB Products
  const hotspots: HotspotItem[] = [
    {
      id: "hs-custom-case",
      name: customCaseProduct?.name || "Custom Case",
      category: "Custom Case",
      priceFormatted: casePriceFormatted,
      image: caseImage,
      productLink: customCaseProduct
        ? `/products/detail/${customCaseProduct.id}`
        : "/products",
      top: "47.5%",
      left: "48.5%",
    },
    {
      id: "hs-phone-charm",
      name: phoneCharmProduct?.name || "Phone Charm",
      category: "Phone Charm",
      priceFormatted: charmPriceFormatted,
      image: charmImage,
      productLink: phoneCharmProduct
        ? `/products/detail/${phoneCharmProduct.id}`
        : "/products",
      top: "60.5%",
      left: "57.5%",
    },
  ];

  const activeHotspot =
    hotspots.find((h) => h.id === activeHotspotId) || hotspots[0];

  // Helper untuk developer melihat koordinat saat mengklik gambar
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    if (process.env.NODE_ENV === "development") {
      console.log(`📍 Hotspot Coordinates -> top: "${y}%", left: "${x}%"`);
    }
  };

  return (
    <section className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 pt-4 pb-12 sm:pt-6 sm:pb-16 font-[family-name:var(--font-fustat)] text-neutral-900 select-none">
      <div className="space-y-6 sm:space-y-8">
        {/* =========================================================================
            HEADER: Centered Minimalist Editorial Title & Paragraph
           ========================================================================= */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight uppercase text-neutral-900">
            {t("title")}
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-neutral-500 font-normal max-w-xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* =========================================================================
            MAIN 2-COLUMN DISPLAY (Larger Lookbook Photo + Dynamic DB Product Card)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN: High-Fashion Lookbook Photo with Single-Color Radar Hotspots
             ========================================================================= */}
          <div className="md:col-span-8 flex justify-center">
            <div
              onClick={handleImageClick}
              className="relative w-full max-w-[560px] aspect-[4/5] overflow-hidden bg-neutral-100 shadow-sm border border-neutral-200/80 cursor-crosshair"
            >
              {/* Main Model/Scene Photo */}
              <Image
                src="/images/shopbylook/look-1.jpg"
                alt="Shop The Look Idshopcase"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover object-center"
              />

              {/* Render Pure Solid White Radar Hotspot Dots */}
              {hotspots.map((hs) => {
                const isActive = hs.id === activeHotspotId;

                return (
                  <div
                    key={hs.id}
                    style={{ top: hs.top, left: hs.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspotId(hs.id);
                      }}
                      className="relative flex items-center justify-center p-3 cursor-pointer"
                      title={hs.name}
                    >
                      {/* Pure White Radar Ring */}
                      <span
                        className={`absolute w-8 h-8 rounded-full bg-white transition-opacity ${
                          isActive
                            ? "animate-ping opacity-75"
                            : "animate-ping opacity-45"
                        }`}
                      />

                      {/* Main Pure White Solid Dot */}
                      <span
                        className={`relative w-4.5 h-4.5 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] ${
                          isActive ? "ring-3 ring-white/60" : "opacity-95 hover:opacity-100"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Sleek & Compact Full-Bleed Product Card
             ========================================================================= */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="w-full max-w-[240px] sm:max-w-[260px] flex flex-col space-y-3.5">
              {/* 1. Full-bleed Vertical Image (object-cover, no padding) */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-neutral-100 border border-neutral-200/80 overflow-hidden shadow-2xs">
                <Image
                  src={cleanImageUrl(activeHotspot.image)}
                  alt={activeHotspot.name}
                  fill
                  sizes="260px"
                  className="object-cover object-center"
                />
              </div>

              {/* 2. Centered Typography & Dynamic Price Range / Single Price */}
              <div className="space-y-1 text-center">
                <h3 className="text-xs sm:text-sm font-medium text-neutral-800 line-clamp-1">
                  {activeHotspot.name}
                </h3>

                <p className="text-xs font-bold text-neutral-900 font-mono">
                  {activeHotspot.priceFormatted}
                </p>
              </div>

              {/* 3. Full-width Black Action Button in Fustat */}
              <div>
                <Link
                  href={activeHotspot.productLink}
                  className="w-full h-9 sm:h-10 font-bold text-[11px] uppercase tracking-[0.14em] bg-black hover:bg-neutral-800 text-white rounded-none flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                >
                  {t("viewProduct")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
