"use client";
import { CartCard } from "./cart-card";
import { useGetCarts } from "../api/get-carts";

export const CartList = () => {
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCarts();

  return (
    <div className="flex flex-col gap-3 mt-4">
      {cartItems?.map((cartItem, index) => {
        return (
          <CartCard
            key={index}
            cartId={cartItem.id}
            productId={cartItem.Product.id}
            quantity={cartItem.quantity}
          />
        );
      })}
    </div>
  );
};
