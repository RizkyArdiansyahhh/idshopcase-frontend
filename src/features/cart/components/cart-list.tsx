"use client";
import { CartCard } from "./cart-card";
import { useGetCarts } from "../api/get-carts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CartList = () => {
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCarts();

  if (fetchCartsLoading) {
    return (
      <div className="flex flex-col gap-3 mt-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="border rounded-[12px] w-full p-4 flex flex-row gap-4"
          >
            <Skeleton className="h-24 w-24 rounded-md" />
            <div className="flex flex-col flex-1 gap-3">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex flex-row gap-3">
                <Skeleton className="h-10 w-10 rounded-md" />
                <Skeleton className="h-10 w-16 rounded-md" />
                <Skeleton className="h-10 w-10 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {cartItems?.length === 0 ? (
        <div className="border rounded-[12px] w-full p-10 flex justify-center items-center">
          <div className="flex flex-row gap-6 items-center">
            <Image
              src={"/images/main-assets/empty-shopping-basket.svg"}
              alt="empty-shopping-basket"
              width={120}
              height={120}
            ></Image>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-lg">
                Wah, keranjang belanjamu kosong
              </h3>
              <p className="font-light text-md text-foreground/50">
                Yuk, isi dengan barang-barang impianmu!
              </p>
              <Button>Mulai Belanja</Button>
            </div>
          </div>
        </div>
      ) : (
        cartItems?.map((cartItem, index) => {
          return (
            <CartCard
              key={index}
              cartId={cartItem.id}
              productId={cartItem.Product.id}
              quantity={cartItem.quantity}
            />
          );
        })
      )}
    </div>
  );
};
