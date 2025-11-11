"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetCarts } from "../api/get-carts";
import { formatCurrency } from "@/lib/format-currency";

export const CartDetail = () => {
  const { data: cartItem } = useGetCarts();
  return (
    <div className="w-full border rounded-[12px] p-5 shadow-md bg-white">
      <p className="text-lg font-semibold mb-3">Ringkasan Belanja</p>
      <Separator className="my-2"></Separator>

      <div className="flex justify-between mb-2">
        <span>Total Produk</span>
        <span>{cartItem?.length || "-"}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Total Harga</span>
        {cartItem?.length != 0 ? (
          <span>
            {formatCurrency(
              cartItem?.reduce((a: number, b) => a + Number(b.price), 0) ?? 0
            )}
          </span>
        ) : (
          "-"
        )}
      </div>
      <Separator className="mt-3 mb-8"></Separator>

      <Button disabled={!cartItem?.length} className="w-full">
        Beli Sekarang
      </Button>
    </div>
  );
};
