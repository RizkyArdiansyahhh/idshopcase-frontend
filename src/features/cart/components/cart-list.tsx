"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCartItems } from "../api/get-cart-items";
import { CartDetail } from "./cart-detail";

export const CartList = () => {
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCartItems({});
  console.log(cartItems);
  return (
    <>
      {fetchCartsLoading ? (
        Array.from({ length: 3 }).map((_, index) => {
          return (
            <Skeleton
              key={index}
              className="w-full h-[20%]  rounded-sm py-3 px-7 bg-accent/50"
            />
          );
        })
      ) : cartItems?.length === 0 ? (
        <p className="text-center text-foreground/50">
          Keranjang Belanja Kosong
        </p>
      ) : (
        cartItems?.map((item) => {
          return (
            <CartDetail
              key={item.id}
              id={item.productId}
              quantity={item.quantity}
              price={item.price}
            />
          );
        })
      )}
    </>
  );
};
