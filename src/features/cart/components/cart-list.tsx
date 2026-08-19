"use client";

import React, { useState } from "react";
import { CartCard } from "./cart-card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { CartItem } from "@/types/api";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { ShoppingBag, ArrowRight } from "lucide-react";

type CartListProps = {
  selectedCartItems: string[];
  setSelectedCartItems: React.Dispatch<React.SetStateAction<string[]>>;
  cartItems: CartItem[];
  fetchCartsLoading: boolean;
};

export const CartList = (props: CartListProps) => {
  const {
    selectedCartItems,
    setSelectedCartItems,
    cartItems,
    fetchCartsLoading,
  } = props;

  const [couponCode, setCouponCode] = useState<string>("");

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCartItems(cartItems.map((item) => item.id));
    } else {
      setSelectedCartItems([]);
    }
  };

  const isAllSelected =
    cartItems.length > 0 && selectedCartItems.length === cartItems.length;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Masukkan kode kupon terlebih dahulu");
      return;
    }
    toast.info(`Kupon "${couponCode.toUpperCase()}" tidak ditemukan atau sudah kedaluwarsa.`);
  };

  if (fetchCartsLoading) {
    return (
      <div className="flex flex-col divide-y divide-neutral-200">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="py-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              <Skeleton className="w-4 h-4 rounded-none" />
              <Skeleton className="h-20 w-16 rounded-none" />
              <div className="space-y-2 flex-1 max-w-xs">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-none" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="w-full py-16 sm:py-24 border border-dashed border-neutral-200 flex flex-col items-center justify-center text-center p-6 space-y-4 font-sans select-none">
        <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold uppercase tracking-wider text-neutral-900">
            Keranjang Belanja Kosong
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm">
            Anda belum menambahkan casing atau aksesoris ke dalam keranjang.
          </p>
        </div>
        <Link
          href="/products/collections"
          className="inline-flex items-center gap-2 px-6 h-11 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-neutral-800 transition-colors shadow-xs"
        >
          Mulai Belanja
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col font-sans select-none">
      {/* Table Header Row: Select All Toggle + Headers */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-300 text-xs font-bold text-neutral-900 uppercase tracking-wider">
        <div className="flex items-center gap-3">
          <Checkbox
            id="select-all"
            checked={isAllSelected}
            onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
            className="rounded-none border-neutral-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
          />
          <label htmlFor="select-all" className="cursor-pointer">
            PILIH SEMUA ({cartItems.length})
          </label>
        </div>

        <div className="hidden md:flex items-center gap-12 text-neutral-500 font-semibold text-[11px]">
          <span>HARGA</span>
          <span className="w-20 text-center">JUMLAH</span>
          <span className="w-20 text-right">TOTAL</span>
        </div>
      </div>

      {/* Cart Items List */}
      <div className="divide-y divide-neutral-200/80">
        {cartItems
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((cartItem) => {
            const isSelected = selectedCartItems.includes(cartItem.id);
            return (
              <CartCard
                key={cartItem.id}
                setSelectedCartItems={setSelectedCartItems}
                isSelected={isSelected}
                cartId={cartItem.id}
                productId={cartItem.Product.id}
                quantity={cartItem.quantity}
                phoneType={cartItem.PhoneType?.model || null}
                variant={cartItem.Variant?.name || null}
                unitPrice={cartItem.Variant.price}
                productImages={cartItem.Product.ProductImages}
                price={cartItem.price}
                productName={cartItem.Product.name}
                stok={cartItem.Variant?.stock || 0}
              />
            );
          })}
      </div>

      {/* Bottom Row: Coupon Code Input + Action Buttons (Exact Reference Screenshot) */}
      <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Coupon Code Form */}
        <form
          onSubmit={handleApplyCoupon}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <span className="text-[11px] text-neutral-500 font-normal">
              Have a coupon? Enter your code.
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="h-9 px-3 text-xs border border-neutral-300 rounded-none bg-white text-neutral-900 focus:outline-none focus:border-black w-full sm:w-48 transition-colors uppercase tracking-wider"
              />
              <button
                type="submit"
                className="h-9 px-4 border border-black bg-white hover:bg-black hover:text-white text-neutral-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0"
              >
                APPLY
              </button>
            </div>
          </div>
        </form>

        {/* Clear Selection / Continue Link */}
        {selectedCartItems.length > 0 && selectedCartItems.length < cartItems.length && (
          <button
            type="button"
            onClick={() => setSelectedCartItems([])}
            className="text-xs text-neutral-500 hover:text-neutral-900 underline transition-colors cursor-pointer"
          >
            Batalkan Pilihan ({selectedCartItems.length})
          </button>
        )}
      </div>
    </div>
  );
};

export default CartList;
