import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { useGetCarts } from "../api/get-carts";

export const CartButton = () => {
  const { data: cartItems } = useGetCarts();
  const count = cartItems?.length ?? 0;

  return (
    <div className="relative">
      <Link href={"/cart"}>
        <FaCartArrowDown size={24} color="white" />
      </Link>
      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full min-w-[18px] min-h-[18px]">
          {count}
        </span>
      )}
    </div>
  );
};
