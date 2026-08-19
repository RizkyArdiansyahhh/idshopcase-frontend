"use client";

import { useGetCarts } from "@/features/cart/api/get-carts";
import { CartDetail } from "@/features/cart/components/cart-detail";
import { CartList } from "@/features/cart/components/cart-list";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState<string[]>([]);
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCarts();

  // Select all items by default on initial load
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) return;

    setSelectedCartItems((prev) => {
      if (prev.length === 0) {
        return cartItems.map((item) => item.id);
      }
      return prev.filter((id) => cartItems.some((item) => item.id === id));
    });
  }, [cartItems]);

  return (
    <div className="w-full max-w-7xl mx-auto pt-0 pb-8 px-0 font-sans select-none min-h-[60vh]">
      {/* Top Back Navigation Link (Matching Screenshot) */}
      <div className="mb-2 sm:mb-3">
        <Link
          href="/products/collections"
          className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2]" />
          Back
        </Link>
      </div>

      {/* Main Page Title: YOUR CART */}
      <div className="mb-5 sm:mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-neutral-900 uppercase font-sans">
          YOUR CART
        </h1>
      </div>

      {/* 2-Column Luxury Cart Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        {/* LEFT COLUMN: Cart Items Table + Coupon Section */}
        <div className="w-full lg:w-[62%] min-w-0">
          <CartList
            selectedCartItems={selectedCartItems}
            setSelectedCartItems={setSelectedCartItems}
            cartItems={cartItems || []}
            fetchCartsLoading={fetchCartsLoading}
          />
        </div>

        {/* RIGHT COLUMN: Cart Totals Summary (With Vertical Left Border) */}
        <div className="w-full lg:w-[38%] min-w-0 lg:border-l lg:border-neutral-200 lg:pl-8 lg:sticky lg:top-24 self-start">
          <CartDetail
            selectedCartItems={selectedCartItems}
            cartItems={cartItems || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
