"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import { formatCurrency } from "@/lib/format-currency";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { useCreateCart } from "@/features/cart/api/create-cart";
import { useGetUser } from "@/features/auth/api/get-user";
import { useAuthModalStore } from "@/stores/auth-modal-store";
import { toast } from "sonner";
import {
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuX,
} from "react-icons/lu";

type QuickViewModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

type AnimationPhase =
  | "idle"
  | "line"
  | "photo"
  | "details"
  | "closing_details"
  | "closing_photo"
  | "closing_line";

export const QuickViewModal = ({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) => {
  const { data: user } = useGetUser();
  const openAuthModal = useAuthModalStore((s) => s.openModal);
  const createCart = useCreateCart();

  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const images = product?.ProductImages || [];
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedPhoneTypeId, setSelectedPhoneTypeId] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  // Sync state when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);

      const firstVariant = product.Variants?.find((v) => v.name !== "-") || product.Variants?.[0];
      setSelectedVariantId(firstVariant ? String(firstVariant.id) : "");

      const firstPhone = product.PhoneTypes?.[0];
      setSelectedPhoneTypeId(firstPhone ? String(firstPhone.id) : "");
      setQuantity(1);
    }
  }, [product]);

  // =========================================================================
  // CONTROLLED OPENING SEQUENCE (LINE -> PHOTO -> DETAILS)
  // =========================================================================
  useEffect(() => {
    if (isOpen && product) {
      clearAllTimers();
      // Step 1: Pure white line
      setPhase("line");

      // Step 2: Photo unfolds vertically
      const t1 = setTimeout(() => {
        setPhase("photo");
      }, 300);

      // Step 3: Right details expand to the right
      const t2 = setTimeout(() => {
        setPhase("details");
      }, 800);

      timersRef.current = [t1, t2];
    } else if (!isOpen) {
      setPhase("idle");
      clearAllTimers();
    }
    return () => clearAllTimers();
  }, [isOpen, product]);

  // =========================================================================
  // CONTROLLED CLOSING SEQUENCE (DETAILS -> PHOTO -> LINE)
  // =========================================================================
  const handleInitiateClose = () => {
    if (
      phase === "closing_details" ||
      phase === "closing_photo" ||
      phase === "closing_line" ||
      phase === "idle"
    ) {
      return;
    }

    clearAllTimers();
    // Step 1: Close details panel to the left
    setPhase("closing_details");

    // Step 2: Close photo panel vertically
    const t1 = setTimeout(() => {
      setPhase("closing_photo");
    }, 400);

    // Step 3: Close horizontal line
    const t2 = setTimeout(() => {
      setPhase("closing_line");
    }, 850);

    // Step 4: Complete unmount
    const t3 = setTimeout(() => {
      setPhase("idle");
      onClose();
    }, 1150);

    timersRef.current = [t1, t2, t3];
  };

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleInitiateClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, phase]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!product && phase === "idle") return null;

  const validVariants = (product?.Variants || []).filter(
    (v) => v.name !== "-" && v.name.trim() !== ""
  );

  const selectedVariant = product?.Variants?.find(
    (v) => String(v.id) === selectedVariantId
  );

  const activeImage =
    images[currentImageIndex]?.imageUrl ??
    product?.ProductImages?.[0]?.imageUrl ??
    "/images/preview-case-2.png";

  const nextImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const priceObj = getMinMaxVariantPrice(product?.Variants);
  const activePrice = selectedVariant?.price
    ? formatCurrency(Number(selectedVariant.price))
    : priceObj
      ? priceObj.min === priceObj.max
        ? formatCurrency(priceObj.min)
        : `${formatCurrency(priceObj.min)} – ${formatCurrency(priceObj.max)}`
      : "Rp 85.000";

  const handleAddToCart = async () => {
    if (!product) return;

    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk menambah ke keranjang");
      openAuthModal({ reason: "login_required" });
      return;
    }

    if (validVariants.length > 0 && !selectedVariantId) {
      toast.error("Silakan pilih varian produk");
      return;
    }

    const payload = {
      productId: String(product.id),
      variantId: selectedVariantId || null,
      phoneTypeId: selectedPhoneTypeId || null,
      quantity,
    };

    createCart.mutate(payload, {
      onSuccess: () => {
        toast.success(`${product.name} berhasil ditambahkan ke keranjang!`);
        handleInitiateClose();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Gagal menambahkan ke keranjang");
      },
    });
  };

  const isModalActive = phase !== "idle";
  const isBackdropVisible = phase !== "idle" && phase !== "closing_line";
  const isLineVisible = phase === "line" || phase === "closing_line";
  const isPhotoUnfolded = phase === "photo" || phase === "details" || phase === "closing_details";
  const isDetailsOpen = phase === "details";

  return (
    <AnimatePresence>
      {isModalActive && product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none font-[family-name:var(--font-fustat)]">
          {/* =========================================================================
              1. DARK BACKDROP (CLEAN FLAT DARK)
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isBackdropVisible ? 1 : 0 }}
            transition={{ duration: 0.25, ease: "linear" }}
            onClick={handleInitiateClose}
            className="fixed inset-0 bg-black/80 cursor-pointer"
          />

          {/* =========================================================================
              2. STEP 1: CLEAN PURE SOLID WHITE HORIZONTAL SEAM LINE
             ========================================================================= */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: isLineVisible ? 1 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute z-15 w-[88vw] sm:w-[380px] md:w-[420px] h-[2px] bg-white pointer-events-none origin-center"
          />

          {/* =========================================================================
              3. COMPACT MODAL CONTAINER (BAMBOO BLONDE PROPORTIONS)
             ========================================================================= */}
          <div className="relative z-20 flex items-stretch max-h-[520px] overflow-visible">
            {/* Top Close Button (Exact Bamboo Blonde placement) */}
            {isDetailsOpen && (
              <button
                type="button"
                onClick={handleInitiateClose}
                className="absolute top-3.5 right-3.5 z-30 w-7 h-7 rounded-full bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Quick View"
              >
                <LuX className="w-3.5 h-3.5" />
              </button>
            )}

            {/* =========================================================================
                STEP 2: LEFT PHOTO PANEL (CLEAN PORTRAIT FRAME WITH DISCRETE ARROWS)
               ========================================================================= */}
            <motion.div
              initial={{
                clipPath: "inset(50% 0% 50% 0%)",
              }}
              animate={{
                clipPath: isPhotoUnfolded ? "inset(0% 0% 0% 0%)" : "inset(50% 0% 50% 0%)",
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative w-[88vw] sm:w-[380px] md:w-[420px] h-[480px] sm:h-[520px] shrink-0 bg-[#f9f9f9] border border-neutral-200 origin-center overflow-hidden flex items-center justify-center"
            >
              {/* Main Preview Image */}
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={cleanImageUrl(activeImage)}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover object-center"
                />
              </div>

              {/* Discrete Carousel Navigation (Arrows) */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevImage}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Previous Image"
                  >
                    <LuChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={nextImage}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 hover:bg-white text-neutral-900 border border-neutral-200 flex items-center justify-center transition-colors cursor-pointer"
                    title="Next Image"
                  >
                    <LuChevronRight className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </motion.div>

            {/* =========================================================================
                STEP 3: RIGHT DETAILS PANEL (EXACT BAMBOO BLONDE SCREENSHOT LAYOUT)
               ========================================================================= */}
            <motion.div
              initial={{
                width: 0,
                clipPath: "inset(0% 100% 0% 0%)",
              }}
              animate={{
                width: isDetailsOpen ? "420px" : 0,
                clipPath: isDetailsOpen ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden md:flex shrink-0 bg-white border-y border-r border-neutral-200 p-7 h-[480px] sm:h-[520px] flex-col justify-between overflow-y-auto origin-left"
            >
              {/* Top Information Block */}
              <motion.div
                initial={{ x: -25 }}
                animate={{
                  x: isDetailsOpen ? 0 : -25,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-4"
              >
                {/* Product Title */}
                <div className="space-y-1 text-left">
                  <h2 className="text-2xl font-normal tracking-tight text-neutral-900 leading-snug">
                    {product.name}
                  </h2>
                  <p className="text-xs text-neutral-500 font-normal">
                    By <span className="underline cursor-pointer">IDSHOPCASE</span>
                  </p>
                  <p className="text-lg font-normal text-neutral-900 pt-1">
                    {activePrice}
                  </p>
                </div>

                {/* Subtle Divider */}
                <div className="border-b border-neutral-100" />

                {/* Variant Selector (SIZE: S / M style) */}
                {validVariants.length > 0 && (
                  <div className="space-y-2 text-left">
                    <label className="text-xs uppercase font-normal tracking-wider text-neutral-700">
                      SIZE:{" "}
                      <span className="font-semibold text-neutral-900">
                        {selectedVariant?.name || ""}
                      </span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {validVariants.map((v) => {
                        const isSelected = selectedVariantId === String(v.id);
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariantId(String(v.id))}
                            className={`min-w-[40px] h-8 px-2.5 text-xs uppercase font-normal tracking-wider transition-all cursor-pointer border ${
                              isSelected
                                ? "bg-black text-white border-black"
                                : "bg-white text-neutral-700 border-neutral-300 hover:border-black"
                            }`}
                          >
                            {v.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Phone Type Selector if applicable */}
                {product.PhoneTypes && product.PhoneTypes.length > 0 && (
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs uppercase font-normal tracking-wider text-neutral-700">
                      MODEL:
                    </label>
                    <select
                      value={selectedPhoneTypeId}
                      onChange={(e) => setSelectedPhoneTypeId(e.target.value)}
                      className="w-full h-9 px-2.5 text-xs uppercase font-normal bg-white border border-neutral-300 focus:outline-none focus:border-black cursor-pointer"
                    >
                      {product.PhoneTypes.map((pt) => (
                        <option key={pt.id} value={pt.id}>
                          {pt.brand} {pt.model}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* In Stock (Bamboo Blonde clean checkmark style) */}
                <div className="flex items-center gap-1.5 text-xs text-neutral-700 font-normal pt-1">
                  <LuCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In stock</span>
                </div>
              </motion.div>

              {/* Bottom Action Bar: Quantity + Big Black ADD TO CART */}
              <motion.div
                initial={{ x: -20 }}
                animate={{
                  x: isDetailsOpen ? 0 : -20,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-2.5 pt-4"
              >
                {/* Quantity Dropdown */}
                <div className="w-16 border border-neutral-300 bg-white h-10 flex items-center justify-center">
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full h-full text-center text-xs font-normal bg-transparent border-0 focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ADD TO CART Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={createCart.isPending}
                  className="flex-1 h-10 bg-black text-white text-xs font-semibold uppercase tracking-[0.14em] hover:bg-neutral-800 transition-colors flex items-center justify-center cursor-pointer"
                >
                  <span>{createCart.isPending ? "Adding..." : "ADD TO CART"}</span>
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
