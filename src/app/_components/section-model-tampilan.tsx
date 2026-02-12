"use client";

import { useGetProducts } from "@/features/products/api/get-ptoducts";
import { ProductCardByModel } from "@/components/shared/product-card-by-model";
import { imageUrlList } from "@/utils/image-utils";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export const SectionModelTampilan = () => {
  const { data: products } = useGetProducts();
  const [activeIndex, setActiveIndex] = useState(0);

  const modelProducts = useMemo(() => {
    if (!products) return [];

    return [
      products.find((p) => p.category === "custom_case"),
      products.find((p) => p.category === "phone_charm"),
    ].filter((p): p is NonNullable<typeof p> => Boolean(p));
  }, [products]);

  if (modelProducts.length === 0) return null;

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? modelProducts.length - 1 : i - 1));
  };

  const next = () => {
    setActiveIndex((i) => (i === modelProducts.length - 1 ? 0 : i + 1));
  };
  const isPrevDisabled = activeIndex === 0;
  const isNextDisabled = activeIndex === modelProducts.length - 1;

  const product = modelProducts[activeIndex];

  return (
    <section className="w-full py-12">
      <h1 className="text-5xl font-semibold text-center mb-10">
        Belanja Dengan{" "}
        <span className="text-foreground/40 border-b-4 border-b-foreground/40">
          Tampilan
        </span>{" "}
        Ini
      </h1>

      <div className="relative w-[90%] h-[600px] mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            className="absolute inset-0 flex justify-center gap-20"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-[40%] aspect-[3/5] rounded overflow-hidden"
            >
              <Image
                src={
                  activeIndex === 0
                    ? "/images/testimoni/testi-1.jpg"
                    : "/images/testimoni/testi-2.jpg"
                }
                fill
                alt="testimoni"
                className="object-cover"
              />

              {/* HOTSPOT */}
              <div
                className={`
                  absolute
                  ${
                    activeIndex === 0
                      ? "top-[35%] left-[38%]"
                      : "top-[18%] left-[46%]"
                  }
                  -translate-x-1/2
                  -translate-y-1/2
                  z-20
                `}
              >
                <span className="absolute inset-0 rounded-full bg-foreground/40 animate-ping" />
                <span className="relative block w-6 h-6 rounded-full bg-foreground" />
              </div>
            </motion.div>

            {/* CARD — SLIDE UP */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="w-[20%]"
            >
              <ProductCardByModel
                id={product.id}
                name={product.name}
                image={imageUrlList(product.ProductImages)}
                price={getMinMaxVariantPrice(product.Variants)}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* BUTTONS */}
        <Button
          onClick={prev}
          disabled={isPrevDisabled}
          className={`
    absolute left-4 top-1/2 -translate-y-1/2 z-30
    p-3 rounded-full transition
    ${
      isPrevDisabled
        ? "bg-black/30 text-white/40 cursor-not-allowed"
        : "bg-black/70 text-white hover:bg-black"
    }
  `}
        >
          <ChevronLeft />
        </Button>

        <Button
          onClick={next}
          disabled={isNextDisabled}
          className={`
    absolute right-4 top-1/2 -translate-y-1/2 z-30
    p-3 rounded-full transition
    ${
      isNextDisabled
        ? "bg-black/30 text-white/40 cursor-not-allowed"
        : "bg-black/70 text-white hover:bg-black"
    }
  `}
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
};
