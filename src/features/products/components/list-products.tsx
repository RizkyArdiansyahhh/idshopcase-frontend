"use client";

import { useGetProducts } from "../api/get-ptoducts";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCurrency } from "@/lib/format-currency";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { SkeletonProduct } from "@/components/shared/skeleton-product";
import { ProductCardHomePage } from "@/app/_components/product-card-home-page";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { formatCategoryName } from "@/utils/category-utils";

interface ListProductsHomePageProps {
  visibleSlides?: number;
  cardWidth?: string;
  cardHeight?: string;
}

export const ListProductsHomePage: React.FC<ListProductsHomePageProps> = ({
  visibleSlides = 2,
  cardWidth = "18rem",
  cardHeight = "40vh",
}) => {
  const { data: products, isLoading: fetchProductsIsLoading } = useGetProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  if (fetchProductsIsLoading)
    return (
      <div className="grid grid-cols-4 gap-4 pr-5 md:pr-10 lg:pr-16">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonProduct key={idx} />
        ))}
      </div>
    );

  if (!products || products.length === 0) return <div>No products found.</div>;

  const slides = products.length;
  const cardWidthPx = cardWidth.includes("rem")
    ? parseFloat(cardWidth) * 16
    : parseInt(cardWidth);
  const gapPx = 16;

  const nextSlide = () => {
    setActiveIndex((prev) => Math.min(prev + 1, slides - visibleSlides));
  };
  const prevSlide = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const dotCount = Math.max(slides - visibleSlides + 1, 1);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-4 transition-transform duration-500 h-[61vh]"
          style={{
            transform: `translateX(-${activeIndex * (cardWidthPx + gapPx)}px)`,
          }}
        >
          {products.map((product, idx) => {
            const price = getMinMaxVariantPrice(product.Variants);
            return (
              <motion.div
                key={product.id}
                style={{ minWidth: cardWidth, height: cardHeight }}
                className="flex-shrink-0"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <ProductCardHomePage
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  images={product.ProductImages}
                  price={price}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between w-full gap-4 pr-5 md:pr-10 lg:pr-16">
        <div className="flex gap-2">
          {Array.from({ length: dotCount }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                idx === activeIndex ? "bg-primary w-6" : "bg-muted-foreground w-3"
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            size="icon-lg"
            onClick={prevSlide}
            variant="outline"
            className="rounded-full bg-foreground text-background"
          >
            <ChevronLeft />
          </Button>
          <Button
            size="icon-lg"
            onClick={nextSlide}
            variant="outline"
            className="rounded-full bg-foreground text-background"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

interface RelatedProductCardProps {
  product: Product;
  index?: number;
}

const RelatedProductCard: React.FC<RelatedProductCardProps> = ({ product }) => {
  const router = useRouter();

  const primaryImage =
    product.ProductImages?.find((img) => img.isPrimary)?.imageUrl ??
    product.ProductImages?.[0]?.imageUrl ??
    "/images/product-1.jpeg";

  const priceObj = getMinMaxVariantPrice(product.Variants);
  const minPrice = priceObj?.min ?? 129000;
  const isRange = priceObj && priceObj.min !== priceObj.max;

  return (
    <div
      onClick={() => router.push(`/products/detail/${product.id}`)}
      className="flex flex-col shrink-0 w-[260px] sm:w-[300px] md:w-[330px] lg:w-[350px] cursor-pointer group select-none font-[family-name:var(--font-fustat)]"
    >
      {/* 1. Image Container with Black Flush Category Badge */}
      <div className="relative w-full aspect-[3/4] bg-neutral-100 rounded-none overflow-hidden border border-neutral-200/80">
        <Image
          src={cleanImageUrl(primaryImage)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 260px"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />

        {/* Flush Black Category Badge (No Red Color) */}
        <span className="absolute top-0 left-0 bg-black text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-none uppercase tracking-wider">
          {formatCategoryName(product.category) || "Custom"}
        </span>
      </div>

      {/* 2. Product Info */}
      <div className="space-y-0.5 pt-3 text-left">
        <h4 className="text-xs sm:text-sm font-semibold text-neutral-900 truncate uppercase tracking-tight group-hover:underline">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 pt-0.5 text-xs font-semibold text-neutral-900">
          <span>
            {isRange ? `from ${formatCurrency(minPrice)}` : formatCurrency(minPrice)}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ListProductsDetail = () => {
  const t = useTranslations("product");
  const { data: products = [], isLoading } = useGetProducts();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

  const handleScrollUpdate = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;

    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < maxScroll - 10);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScrollUpdate, { passive: true });
    handleScrollUpdate();
    return () => el.removeEventListener("scroll", handleScrollUpdate);
  }, [products]);

  const scrollBy = (offset: number) => {
    if (!scrollContainerRef.current) return;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="w-full py-8 space-y-6 font-[family-name:var(--font-fustat)]">
        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 uppercase">
          {t("relatedTitle")}
        </h3>
        <div className="flex gap-4 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-[330px] aspect-[3/4] bg-neutral-100 animate-pulse rounded-none shrink-0" />
          ))}
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-6 md:py-8 space-y-5 font-[family-name:var(--font-fustat)] select-none">
      {/* Header Title in Fustat */}
      <div className="flex items-center justify-between">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 uppercase font-[family-name:var(--font-fustat)]">
          {t("relatedTitle")}
        </h3>
      </div>

      {/* Carousel Wrapper with Floating Controls */}
      <div className="relative group/carousel">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollBy(-360)}
            className="absolute -left-3 sm:-left-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center text-neutral-800 hover:bg-neutral-50 hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            type="button"
            onClick={() => scrollBy(360)}
            className="absolute -right-3 sm:-right-5 top-1/3 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border border-neutral-200 shadow-md flex items-center justify-center text-neutral-800 hover:bg-neutral-50 hover:scale-105 transition-all cursor-pointer"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 sm:gap-5 overflow-x-auto pb-4 scrollbar-none no-scrollbar scroll-smooth"
        >
          {products.map((product, idx) => (
            <RelatedProductCard
              key={product.id}
              product={product}
              index={idx}
            />
          ))}
        </div>
      </div>

      {/* Minimalist Bottom Scrollbar / Indicator Line (Exact Reference Style) */}
      <div className="w-full max-w-xs sm:max-w-sm mx-auto h-[3px] bg-neutral-200 rounded-full overflow-hidden mt-4">
        <div
          className="h-full bg-neutral-900 rounded-full transition-all duration-150 ease-out"
          style={{
            width: "35%",
            transform: `translateX(${scrollProgress * 1.85}%)`,
          }}
        />
      </div>
    </section>
  );
};

export default ListProductsDetail;
