"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";
import { cleanImageUrl } from "@/utils/image-utils";
import { ValidateFormDetailProduct } from "@/app/(customer)/products/detail/[id]/components/validate-form-detail-product";

interface FloatingQuickBuyBarProps {
  productId: string | number;
  name: string;
  image: string;
  price: number;
  stock: number;
  selectedVariantName?: string;
  selectedPhoneTypeName?: string;
  formValues: {
    variant?: string;
    phone_type?: string;
    quantity: number;
  };
  onQuantityChange: (qty: number) => void;
  onSyncParent: (values: { variant?: string; phone_type?: string; quantity?: number }) => void;
  phoneTypeOptions: Array<{ id: string; model: string }>;
  variantOptions: Array<{
    id: string;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  }>;
}

export const FloatingQuickBuyBar: React.FC<FloatingQuickBuyBarProps> = ({
  productId,
  name,
  image,
  price,
  stock,
  selectedVariantName,
  selectedPhoneTypeName,
  formValues,
  onQuantityChange,
  onSyncParent,
  phoneTypeOptions,
  variantOptions,
}) => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const validImageUrl = cleanImageUrl(image || "/images/product-1.jpeg");

  useEffect(() => {
    setMounted(true);
    const target = document.getElementById("main-buy-buttons-target");

    if (!target) {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 600);
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show ONLY when main buy buttons have scrolled completely past the top of the viewport
        const isPastTarget = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        setIsVisible(isPastTarget);
      },
      {
        threshold: 0,
        rootMargin: "-20px 0px 0px 0px",
      }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const currentQty = formValues.quantity || 1;

  const handleDecrease = () => {
    if (currentQty > 1) {
      onQuantityChange(currentQty - 1);
    }
  };

  const handleIncrease = () => {
    if (currentQty < (stock || 99)) {
      onQuantityChange(currentQty + 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[9999] select-none pointer-events-auto"
        >
          <div className="bg-white rounded-none border border-neutral-200 shadow-2xl p-3.5 flex items-center gap-4 min-w-[340px] max-w-[420px]">
            {/* Thumbnail Image (Bamboo Blonde Portrait Style) */}
            <div
              onClick={scrollToTop}
              className="relative w-14 h-16 sm:w-16 sm:h-20 shrink-0 bg-neutral-50 border border-neutral-200 cursor-pointer overflow-hidden group"
              title="Klik untuk kembali ke atas"
            >
              <Image
                src={validImageUrl}
                alt={name}
                fill
                sizes="64px"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0 pr-1">
              <h4
                onClick={scrollToTop}
                className="text-xs sm:text-sm font-semibold text-neutral-900 leading-snug line-clamp-1 cursor-pointer hover:underline uppercase tracking-tight"
                title={name}
              >
                {name}
              </h4>
              <p className="text-xs sm:text-sm font-bold text-neutral-900 mt-1">
                {formatCurrency(price)}
              </p>
              {(selectedVariantName || selectedPhoneTypeName) && (
                <p className="text-[11px] text-neutral-500 font-normal mt-0.5 line-clamp-1">
                  {[selectedVariantName, selectedPhoneTypeName].filter(Boolean).join(" • ")}
                </p>
              )}
            </div>

            {/* Stepper + Bag Button Group (Identical Height & Matching Solid Pure Black) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Quantity Controls (Exact h-10) */}
              <div className="flex items-center border border-neutral-200 rounded-none bg-white h-10">
                <button
                  type="button"
                  onClick={handleDecrease}
                  disabled={currentQty <= 1}
                  className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-7 text-center text-xs font-bold text-neutral-900">
                  {currentQty}
                </span>
                <button
                  type="button"
                  onClick={handleIncrease}
                  disabled={currentQty >= stock}
                  className="w-8 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart / Buy Button (Pure Single Black Square, Zero Two-Tone, Exact h-10 w-10) */}
              <ValidateFormDetailProduct
                productId={productId}
                nameProduct={name}
                priceProduct={price}
                imageProduct={validImageUrl}
                variant="default"
                className="w-10 h-10 bg-black hover:bg-neutral-800 text-white rounded-none p-0 flex items-center justify-center shrink-0 border-0 cursor-pointer transition-colors shadow-none"
                data={{
                  ...formValues,
                }}
                onSyncParent={onSyncParent}
                isCheckout={false}
                phoneTypeOptions={phoneTypeOptions}
                variantOptions={variantOptions}
                totalStock={stock}
              >
                <ShoppingBag className="w-4 h-4 text-white" />
              </ValidateFormDetailProduct>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default FloatingQuickBuyBar;
