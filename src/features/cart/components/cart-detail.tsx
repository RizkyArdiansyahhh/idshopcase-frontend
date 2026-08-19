"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/format-currency";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout-store";
import { CartItem } from "@/types/api";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type CartDetailProps = {
  selectedCartItems: string[];
  cartItems: CartItem[];
};

export const CartDetail = (props: CartDetailProps) => {
  const { selectedCartItems, cartItems } = props;
  const router = useRouter();

  // If items are selected, use selected; otherwise calculate total of all items
  const activeItems =
    selectedCartItems.length > 0
      ? cartItems.filter((item) => selectedCartItems.includes(item.id))
      : cartItems;

  const subtotal = activeItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),
    0
  );

  const setDataCheckout = useCheckoutStore((state) => state.setSelectedCartIds);

  const handleSubmit = () => {
    if (!activeItems || activeItems.length === 0) return;

    const checkoutPayload = activeItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      materialName: null,
      phoneTypeId: item.PhoneType?.id ?? null,
      phoneTypeName: null,
      variant: {
        id: item.Variant?.id ?? null,
        name: item.Variant?.name ?? null,
        price: item.Variant?.price ?? null,
        stock: item.Variant?.stock ?? null,
        max_images: item.Variant?.max_images ?? null,
      },
      cartId: item.id,
    }));

    setDataCheckout(checkoutPayload);
    router.push("/order");
  };

  return (
    <div className="w-full font-sans select-none space-y-4">
      {/* Title */}
      <div>
        <h3 className="text-base sm:text-lg font-bold tracking-wider text-neutral-900 uppercase">
          CART TOTALS
        </h3>
        <div className="w-full h-px bg-neutral-200 mt-2" />
      </div>

      {/* Breakdown Items */}
      <div className="space-y-3 text-xs sm:text-sm">
        <div className="flex justify-between items-center text-neutral-600">
          <span>Subtotal</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="flex justify-between items-center text-neutral-600">
          <span>Pengiriman (3-5 Hari Kerja)</span>
          <span className="text-neutral-500 font-normal">
            Dihitung saat checkout
          </span>
        </div>

        <div className="flex justify-between items-center text-neutral-600">
          <span>Pajak & Biaya Layanan</span>
          <span className="font-semibold text-neutral-900">Rp 0</span>
        </div>
      </div>

      <div className="w-full h-px bg-neutral-200" />

      {/* Grand Total */}
      <div className="flex justify-between items-center text-sm sm:text-base font-bold text-neutral-900">
        <span className="uppercase tracking-wider">TOTAL</span>
        <span className="text-lg sm:text-xl font-bold tracking-tight">
          {formatCurrency(subtotal)}
        </span>
      </div>

      {/* Checkout Button (Bamboo Blonde Style Solid Black Button) */}
      <div className="space-y-3 pt-2">
        <button
          type="button"
          disabled={!activeItems || activeItems.length === 0}
          onClick={handleSubmit}
          className="w-full h-12 bg-black hover:bg-neutral-800 disabled:bg-neutral-300 disabled:cursor-not-allowed text-white rounded-none text-xs sm:text-sm font-semibold uppercase tracking-widest transition-colors cursor-pointer shadow-xs flex items-center justify-center"
        >
          {activeItems?.length
            ? "PROCEED TO CHECKOUT"
            : "PILIH PRODUK TERLEBIH DAHULU"}
        </button>

        {/* Continue Shopping Link */}
        <div className="flex justify-center pt-1">
          <Link
            href="/products/collections"
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-neutral-500 hover:text-neutral-900 uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
