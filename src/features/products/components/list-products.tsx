"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useGetProducts } from "../api/get-ptoducts";
import { useEffect, useState } from "react";
import { SkeletonProduct } from "@/components/shared/skeleton-product";
import { ProductRecomandationCard } from "@/app/(customer)/products/detail/[id]/components/product-recomandation-card";
import { Button } from "@/components/ui/button";
import { ProductCardHomePage } from "@/app/_components/product-card-home-page";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
  const { data: products, isLoading: fetchProductsIsLoading } =
    useGetProducts();
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
      {/* Slider */}
      <div className="overflow-hidden w-full">
        <div
          className="flex gap-4 transition-transform duration-500 h-[61vh]"
          style={{
            transform: `translateX(-${activeIndex * (cardWidthPx + gapPx)}px)`,
          }}
        >
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              style={{ minWidth: cardWidth, height: cardHeight }}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCardHomePage
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                images={product.ProductImages}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-row items-center justify-between w-full gap-4 pr-5 md:pr-10 lg:pr-16">
        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: dotCount }).map((_, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
                idx === activeIndex
                  ? "w-14 bg-foreground"
                  : "w-3 bg-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <div className="flex flex-row items-center gap-4">
          <Button
            size="icon-lg"
            onClick={prevSlide}
            variant="outline"
            className="rounded-full"
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
export const ListProductsDetail = () => {
  const { data: products = [], isLoading: fetchProductsIsLoading } =
    useGetProducts();
  const isMobile = useIsMobile();
  const INITIAL_COUNT = isMobile ? 4 : 5;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [INITIAL_COUNT]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const allPrices = products.flatMap(
    (p) => p.Variants?.map((v) => parseFloat(v.price)) || [],
  );

  const minPrice = allPrices.length > 0 ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length > 0 ? Math.max(...allPrices) : 0;

  return (
    <div className="w-full mb-15">
      <h1 className="text-lg md:text-xl lg:text-3xl xl:text-4xl font-semibold my-7 text-center">
        Produk Yang Mungkin Anda Suka
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {fetchProductsIsLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonProduct key={index} />
          ))}

        {!fetchProductsIsLoading && visibleProducts.length > 0 ? (
          visibleProducts.map((product) => {
            return (
              <ProductRecomandationCard
                key={product.id}
                product={product}
                minPrice={minPrice}
                maxPrice={maxPrice}
              />
            );
          })
        ) : (
          <p className="text-center text-lg">Tidak ada Produk yang tersedia</p>
        )}
      </div>
      {!fetchProductsIsLoading && products.length > INITIAL_COUNT && (
        <div className="flex justify-center mt-10">
          <Button
            disabled={!hasMore}
            variant={"outline"}
            onClick={() => setVisibleCount((prev) => prev + INITIAL_COUNT)}
          >
            {hasMore ? "Lihat lainnya" : "Semua produk ditampilkan"}
          </Button>
        </div>
      )}
    </div>
  );
};
