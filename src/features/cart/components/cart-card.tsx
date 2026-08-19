"use client";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import { useUpdateCartItem } from "../api/update-cart";
import { useDeleteCartItem } from "../api/delete-cart";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "@/lib/format-currency";
import { useEffect, useRef } from "react";
import { cleanImageUrl, imageUrlPrimary } from "@/utils/image-utils";
import { ProductImage } from "@/types/api";
import { X, Minus, Plus } from "lucide-react";
import { LoadingDialog } from "@/components/shared/loading-dialog";

type CartCardProps = {
  cartId: number;
  productId: number;
  quantity: number;
  isSelected: boolean;
  setSelectedCartItems: React.Dispatch<React.SetStateAction<number[]>>;
  variant: string | null;
  phoneType: string | null;
  productImages: ProductImage[];
  price: string;
  productName: string;
  stok: number;
  unitPrice: string;
};

export const CartCard = (props: CartCardProps) => {
  const {
    quantity,
    cartId,
    productId,
    isSelected,
    setSelectedCartItems,
    variant,
    phoneType,
    productImages,
    price,
    productName,
    stok,
    unitPrice,
  } = props;

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const quantitySchema = z.object({
    quantity: z.number().min(1),
  });
  type QuantityType = z.infer<typeof quantitySchema>;

  const form = useForm<QuantityType>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity,
    },
  });

  const {
    mutate: updateCartItemMutation,
    isPending: updateCartItemMutationLoading,
  } = useUpdateCartItem();

  const {
    mutate: deleteCartItemMutation,
    isPending: deleteCartItemMutationLoading,
  } = useDeleteCartItem();

  const quantityVariable = form.watch("quantity");

  useEffect(() => {
    form.setValue("quantity", quantity, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [quantity, form]);

  useEffect(() => {
    if (deleteCartItemMutationLoading || updateCartItemMutationLoading) return;
    if (quantityVariable === quantity) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateCartItemMutation({
        id: cartId,
        quantity: quantityVariable as number,
      });
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    quantityVariable,
    quantity,
    cartId,
    deleteCartItemMutationLoading,
    updateCartItemMutationLoading,
    updateCartItemMutation,
  ]);

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantityVariable > 1) {
      form.setValue("quantity", quantityVariable - 1);
    }
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantityVariable < (stok || 99)) {
      form.setValue("quantity", quantityVariable + 1);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteCartItemMutation({ cartId });
  };

  const rawImg = imageUrlPrimary(productImages) || "";
  const validImage = cleanImageUrl(rawImg || "/images/product-1.jpeg");
  const subtotalItem = Number(unitPrice || price || 0) * quantityVariable;

  return (
    <div className="w-full py-3.5 sm:py-4 border-b border-neutral-200/80 flex items-center justify-between gap-3 sm:gap-4 font-sans select-none group">
      <LoadingDialog loading={deleteCartItemMutationLoading} />

      {/* Left Section: Delete Button (X) + Checkbox + Image + Details */}
      <div className="flex items-center gap-2.5 sm:gap-4 flex-1 min-w-0">
        {/* Delete (X) Button (Bamboo Blonde Minimalist Style) */}
        <button
          type="button"
          onClick={handleDelete}
          className="text-neutral-400 hover:text-neutral-900 transition-colors p-1 cursor-pointer shrink-0"
          title="Hapus Produk"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Checkbox */}
        <Checkbox
          id={cartId.toString()}
          value={cartId.toString()}
          checked={isSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedCartItems((prev) => [...prev, cartId]);
            } else {
              setSelectedCartItems((prev) =>
                prev.filter((id) => id !== cartId)
              );
            }
          }}
          className="rounded-none border-neutral-300 data-[state=checked]:bg-black data-[state=checked]:border-black shrink-0"
        />

        {/* Product Thumbnail (Portrait Aspect) */}
        <Link
          href={`/products/detail/${productId}`}
          className="relative w-16 h-20 sm:w-20 sm:h-24 bg-neutral-50 rounded-none overflow-hidden shrink-0 border border-neutral-200/80"
        >
          <Image
            src={validImage}
            alt={productName}
            fill
            sizes="80px"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-200"
          />
        </Link>

        {/* Product Text Details */}
        <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 pr-1">
          <Link
            href={`/products/detail/${productId}`}
            className="text-xs sm:text-sm font-semibold text-neutral-900 hover:underline uppercase tracking-tight truncate leading-tight"
            title={productName}
          >
            {productName}
          </Link>
          <p className="text-[11px] sm:text-xs text-neutral-500 font-normal truncate">
            {[variant !== "-" ? variant : null, phoneType].filter(Boolean).join(" • ") ||
              "Custom Case"}
          </p>
          <p className="text-xs font-medium text-neutral-800 sm:hidden mt-0.5">
            {formatCurrency(Number(unitPrice || price || 0))}
          </p>
        </div>
      </div>

      {/* Right Section: Unit Price + Stepper (- 1 +) + Subtotal */}
      <div className="flex items-center gap-3 sm:gap-6 shrink-0">
        {/* Unit Price (Desktop Only) */}
        <div className="hidden md:flex items-center text-xs sm:text-sm font-medium text-neutral-700">
          {formatCurrency(Number(unitPrice || price || 0))}
        </div>

        {/* Quantity Stepper (Exact Bamboo Blonde Minimalist Box) */}
        <div className="flex items-center border border-neutral-200 rounded-none bg-white h-8 sm:h-9 shrink-0">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantityVariable <= 1}
            className="w-7 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-7 text-center text-xs font-semibold text-neutral-900">
            {quantityVariable}
          </span>
          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantityVariable >= (stok || 99)}
            className="w-7 h-full flex items-center justify-center text-neutral-600 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        {/* Subtotal Item Price */}
        <div className="text-right min-w-[75px] sm:min-w-[90px]">
          <span className="text-xs sm:text-sm font-bold text-neutral-900">
            {formatCurrency(subtotalItem)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
