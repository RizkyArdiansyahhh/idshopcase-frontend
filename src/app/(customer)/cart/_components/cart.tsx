"use client";
import { useGetCarts } from "@/features/cart/api/get-carts";
import { CartDetail } from "@/features/cart/components/cart-detail";
import { CartList } from "@/features/cart/components/cart-list";
import { useEffect, useState } from "react";

export const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState<number[]>([]);
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCarts();

  useEffect(() => {
    if (cartItems) {
      setSelectedCartItems(cartItems.map((item) => item.id));
    }
  }, [cartItems]);
  return (
    <div className="w-full h-full flex flex-row py-10 gap-5">
      <div className="w-4/6 h-full ">
        <div className="w-full border rounded-sm py-3 px-14 flex flex-row justify-around">
          {["Produk", "Harga Satuan", , "Total Harga"].map((item, index) => {
            return (
              <p
                key={index}
                className={`${
                  index === 0 ? "w-8/12" : "w-2/12 text-center "
                }   font-semibold text-foreground/50`}
              >
                {item}
              </p>
            );
          })}
        </div>
        <CartList
          selectedCartItems={selectedCartItems}
          setSelectedCartItems={setSelectedCartItems}
          cartItems={cartItems || []}
          fetchCartsLoading={fetchCartsLoading}
        ></CartList>
      </div>
      <div className="fixed top-24 right-16 w-[28%] h-fit">
        <CartDetail selectedCartItems={selectedCartItems}></CartDetail>
      </div>
    </div>
  );
};
