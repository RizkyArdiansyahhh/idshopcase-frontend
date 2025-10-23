import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { IoMdRemove } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useGetProduct } from "@/features/product/api/get-product";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateCartItem } from "../api/update-cart";
import { useDeleteCartItem } from "../api/delete-cart";

type CartCardProps = {
  id: number;
  quantity: number;
  price: number;
};

export const CartDetail = (props: CartCardProps) => {
  const { id, quantity, price } = props;

  const { data: product, isLoading: fetchProductLoading } = useGetProduct({
    id,
  });

  const {
    mutate: updateCartItemMutation,
    isPending: updateCartItemMutationLoading,
  } = useUpdateCartItem({});

  const {
    mutate: deleteCartItemMutation,
    isPending: deleteCartItemMutationLoading,
  } = useDeleteCartItem();

  return (
    <div className="w-full border rounded-sm py-3 px-7 flex flex-row justify-around">
      <div className="w-4/12 flex flex-row items-center gap-2">
        <Checkbox id={id.toString()} />
        <div className="w-full flex flex-row gap-2">
          <div className="w-1/4 h-28 relative">
            {fetchProductLoading ? (
              <Skeleton />
            ) : (
              <Image
                src={product?.image || ""}
                alt={product?.name || `product=${product?.id}`}
                fill
                className="object-cover"
              ></Image>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Link href={"#"} className="text-app-semibold-xl">
              {product?.name}
            </Link>
            <p className="text-sm font-light text-foreground/60">
              {product?.material}
            </p>
          </div>
        </div>
      </div>
      <p className="w-2/12 self-center text-center text-app-semibold-lg">
        Rp. {product?.price}
      </p>
      <div className="w-2/12 flex-row-center  px-10">
        <div className="grid grid-cols-4">
          <Button
            disabled={updateCartItemMutationLoading || quantity <= 1}
            onClick={() =>
              updateCartItemMutation({
                id: id,
                quantity: quantity - 1,
              })
            }
            variant={"outline"}
            className="col-span-1 text-foreground rounded-none cursor-pointer"
          >
            <IoMdRemove />
          </Button>
          <div className="col-span-2 border flex-row-center ">
            <p>{quantity}</p>
          </div>
          <Button
            disabled={updateCartItemMutationLoading}
            onClick={() =>
              updateCartItemMutation({
                id: id,
                quantity: quantity + 1,
              })
            }
            variant={"outline"}
            className="col-span-1 text-foreground rounded-none cursor-pointer"
          >
            <IoMdAdd />
          </Button>
        </div>
      </div>
      <p className="w-2/12 self-center text-center text-app-semibold-lg">
        Rp. {quantity * price}
      </p>
      <div
        className="w-2/12 flex-row-center"
        onClick={() => deleteCartItemMutation(id)}
      >
        <FaTrash size={24} color="red" className="hover:cursor-pointer" />
      </div>
    </div>
  );
};
