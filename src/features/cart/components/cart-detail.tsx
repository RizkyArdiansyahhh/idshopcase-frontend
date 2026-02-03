"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { useRouter } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout-store";
import { CartItem } from "@/types/api";

type CartDetailProps = {
  selectedCartItems: number[];
  cartItems: CartItem[];
};
export const CartDetail = (props: CartDetailProps) => {
  const { selectedCartItems, cartItems } = props;
  const cartItemsSelected = cartItems?.filter((item) =>
    selectedCartItems.includes(item.id),
  );
  console.log(cartItems, "cartItem");
  const { push } = useRouter();
  const setDataCheckout = useCheckoutStore((state) => state.setSelectedCartIds);
  const handleSubmit = () => {
    if (!cartItemsSelected) return;

    const checkoutPayload = cartItemsSelected.map((item) => ({
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

    push("/order");
  };
  return (
    <div className="w-full border rounded-[12px] p-5  bg-white shadow-[0_-1px_8px_rgba(0,0,0,0.1)] lg:shadow-md">
      <p className="text-sm md:text-base lg:text-lg font-semibold mb-3">
        Ringkasan Belanja
      </p>
      <Separator className="my-2"></Separator>

      <div className="flex justify-between mb-2 text-xs md:text-sm lg:text-base">
        <span className="">Total Produk</span>
        <span>{cartItemsSelected?.length || "-"}</span>
      </div>

      <div className="flex justify-between mb-2 text-xs md:text-sm lg:text-base">
        <span>Total Harga</span>
        {cartItemsSelected && cartItemsSelected?.length > 0 ? (
          <span className="font-semibold">
            {formatCurrency(
              cartItemsSelected.reduce(
                (total, item) =>
                  total + Number(item.price) * Number(item.quantity),
                0,
              ),
            )}
          </span>
        ) : (
          "-"
        )}
      </div>
      <Separator className="mt-3 mb-2 md:mb-4 lg:mb-8"></Separator>

      <Button
        disabled={!cartItemsSelected?.length}
        className="w-full"
        onClick={handleSubmit}
      >
        {cartItemsSelected?.length
          ? "Lanjutkan Pembayaran"
          : "Silahkan Pilih Produk"}
      </Button>
    </div>
  );
};
