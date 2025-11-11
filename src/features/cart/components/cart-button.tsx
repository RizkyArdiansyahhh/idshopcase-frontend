import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { useGetCarts } from "../api/get-carts";

export const CartButton = () => {
  const { data: cartItems } = useGetCarts();
  console.log(cartItems);
  return (
    <>
      <div className="relative">
        <Link href={"/cart"}>
          <FaCartArrowDown size={24} color="white" />
        </Link>
        {cartItems?.length != 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {cartItems?.length}
          </span>
        )}
      </div>
    </>
  );
};
