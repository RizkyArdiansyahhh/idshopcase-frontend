"use client";
import { LoadingDialog } from "@/components/shared/loading-dialog";
import { UserAvatar } from "@/components/shared/user-avatar";
import { Badge } from "@/components/ui/badge";
import { useGetCarts } from "@/features/cart/api/get-carts";
import { CartDetail } from "@/features/cart/components/cart-detail";
import { CartList } from "@/features/cart/components/cart-list";
import { useAuthStore } from "@/store/profile-store";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState<number[]>([]);
  const { data: cartItems, isLoading: fetchCartsLoading } = useGetCarts();
  const profileUser = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!cartItems) return;

    setSelectedCartItems((prev) =>
      prev.filter((id) => cartItems.some((item) => item.id === id)),
    );
  }, [cartItems]);

  return (
    <div className="h-screen flex flex-col ">
      {/* optional header space */}
      <div className=" w-full shrink-0 flex flex-row justify-between items-center pt-3">
        <div className="flex flex-row gap-2 items-center">
          <Link href="/">
            <ChevronLeft />
          </Link>
          <span className="text-base text-foreground font-medium">Beranda</span>
        </div>
        <div className="flex flex-row gap-4">
          <Badge variant={"outline"} className="px-3 font-semibold">
            {cartItems?.length != 0 ? cartItems?.length : 0} Barang
          </Badge>
          <Link href={"account/profile"}>
            <UserAvatar
              name="Guest"
              className="h-8 w-8 md:h-10 md:w-10"
              image={profileUser?.profile_picture ?? ""}
            ></UserAvatar>
          </Link>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 min-h-0">
        <h1 className="text-foreground font-bold text-base md:text-lg lg:text-2xl shrink-0">
          Keranjang Saya
        </h1>

        <div className="flex flex-1 gap-6 min-h-0">
          {/* LEFT SIDE (CART LIST) */}
          <div className="w-full lg:w-4/6 flex flex-col min-h-0">
            {/* table header */}
            <div className="hidden w-full border rounded-sm py-3 px-14 md:flex justify-around shrink-0">
              {["Produk", "Harga Satuan", "Total Harga"].map((item, index) => (
                <p
                  key={index}
                  className={`${
                    index === 0
                      ? "md:w-[65%] lg:w-8/12"
                      : "md:w-[17.5%] lg:w-2/12 text-center"
                  } text-xs md:text-base font-semibold text-foreground/50`}
                >
                  {item}
                </p>
              ))}
            </div>
            <div className="hidden md:block w-full h-1 bg-transparent"></div>

            {/*  SCROLL AREA */}
            <div className="flex-1 min-h-0 overflow-y-auto pb-40 md:pb-48 lg:pb-0">
              <CartList
                selectedCartItems={selectedCartItems}
                setSelectedCartItems={setSelectedCartItems}
                cartItems={cartItems || []}
                fetchCartsLoading={fetchCartsLoading}
              ></CartList>
            </div>
            <div className="w-full h-8 bg-transparent"></div>
          </div>

          {/* RIGHT SIDE (SUMMARY) */}
          <div
            className="  w-full
      fixed bottom-0 left-0 z-50
      lg:sticky lg:top-24 lg:w-[28%] lg:self-start "
          >
            <CartDetail
              selectedCartItems={selectedCartItems}
              cartItems={cartItems || []}
            ></CartDetail>
          </div>
        </div>
      </div>
    </div>
  );
};
