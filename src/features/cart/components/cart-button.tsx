import Link from "next/link";
import { useGetCarts } from "../api/get-carts";
import { ShoppingBag } from "lucide-react";

export const CartButton = ({ className = "" }: { className?: string }) => {
  const { data: cartItems } = useGetCarts();
  const count = cartItems?.length ?? 0;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Link href={"/cart"} className="text-current hover:opacity-75 transition-opacity flex items-center justify-center p-0.5">
        <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
      </Link>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-2 inline-flex items-center justify-center px-1 text-[9px] font-bold leading-none text-white bg-black dark:bg-white dark:text-black rounded-full min-w-[15px] h-[15px] border border-white dark:border-black">
          {count}
        </span>
      )}
    </div>
  );
};
