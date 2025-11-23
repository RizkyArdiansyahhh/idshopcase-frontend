"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetCarts } from "../api/get-carts";
import { formatCurrency } from "@/lib/format-currency";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useCheckoutStore } from "@/store/checkout-store";

type CartDetailProps = {
  selectedCartItems: number[];
};
export const CartDetail = (props: CartDetailProps) => {
  const { selectedCartItems } = props;
  const { data: cartItem } = useGetCarts();
  const cartItemsSelected = cartItem?.filter((item) =>
    selectedCartItems.includes(item.id)
  );
  console.log(cartItem, "cartItem");
  const { push } = useRouter();
  const setDataCheckout = useCheckoutStore((state) => state.setSelectedCartIds);
  const handleSubmit = () => {
    if (!cartItemsSelected) return;

    const checkoutPayload = cartItemsSelected.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      materialId: item.Material?.id ?? null,
      materialName: null,
      phoneTypeId: item.PhoneType?.id ?? null,
      phoneTypeName: null,
      variantId: item.Variant?.id ?? null,
      variantName: null,
      cartId: item.id,
    }));

    setDataCheckout(checkoutPayload);

    push("/order");
  };
  return (
    <div className="w-full border rounded-[12px] p-5 shadow-md bg-white">
      <p className="text-lg font-semibold mb-3">Ringkasan Belanja</p>
      <Separator className="my-2"></Separator>

      <div className="flex justify-between mb-2">
        <span>Total Produk</span>
        <span>{cartItemsSelected?.length || "-"}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span>Total Harga</span>
        {cartItemsSelected && cartItemsSelected?.length > 0 ? (
          <span>
            {formatCurrency(
              cartItemsSelected?.reduce(
                (a: number, b) => a + Number(b.price),
                0
              ) ?? 0
            )}
          </span>
        ) : (
          "-"
        )}
      </div>
      <Separator className="mt-3 mb-8"></Separator>

      <Button
        disabled={!cartItemsSelected?.length}
        className="w-full"
        onClick={handleSubmit}
      >
        Beli Sekarang
      </Button>
    </div>
  );
};
