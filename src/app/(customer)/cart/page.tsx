import { Metadata } from "next";
import { Cart } from "./_components/cart";
export const metadata: Metadata = {
  title: "Keranjang",
};

const CartPage = () => {
  return (
    <div className="h-full w-full">
      <Cart></Cart>
    </div>
  );
};
export default CartPage;
