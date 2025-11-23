"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useGetProduct } from "@/features/products/api/get-productById";
import { Skeleton } from "@/components/ui/skeleton";
import { useUpdateCartItem } from "../api/update-cart";
import { useDeleteCartItem } from "../api/delete-cart";
import { CardQuantity } from "@/components/shared/card-quantity";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "@/lib/format-currency";
import { useEffect } from "react";
import { imageUrlPrimary } from "@/utils/image-utils";

type CartCardProps = {
  cartId: number;
  productId: number;
  quantity: number;
  isSelected: boolean;
  setSelectedCartItems: React.Dispatch<React.SetStateAction<number[]>>;
  material: string | null;
  variant: string | null;
  phoneType: string | null;
};

export const CartCard = (props: CartCardProps) => {
  const {
    productId,
    quantity,
    cartId,
    isSelected,
    setSelectedCartItems,
    material,
    variant,
    phoneType,
  } = props;

  console.log(quantity);

  const { data: product, isLoading: fetchProductLoading } = useGetProduct({
    id: productId,
  });

  const quantitySchema = z.object({
    quantity,
  });
  type QuantityType = z.infer<typeof quantitySchema>;
  const form = useForm<QuantityType>({
    resolver: zodResolver(quantitySchema),
    defaultValues: {
      quantity,
    },
  });

  const {
    mutate: updateCartItemMutation,
    isPending: updateCartItemMutationLoading,
  } = useUpdateCartItem({
    mutationOptions: {
      onSuccess: () => {
        console.log("success");
      },
    },
  });

  const quantityVariable = form.watch("quantity");
  useEffect(() => {
    const handler = setTimeout(() => {
      if (quantity !== undefined && cartId) {
        updateCartItemMutation({
          id: cartId,
          quantity: quantityVariable as number,
        });
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [quantityVariable, cartId, updateCartItemMutation]);

  const {
    mutate: deleteCartItemMutation,
    isPending: deleteCartItemMutationLoading,
  } = useDeleteCartItem();

  return (
    <div className="w-full border rounded-sm py-3  flex flex-row justify-around ">
      <div className="w-6/12 flex flex-row items-center gap-2 ">
        <Checkbox
          id={cartId.toString()}
          value={cartId.toString()}
          checked={isSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedCartItems((prev) => [...prev, cartId]);
            } else {
              setSelectedCartItems((prev) =>
                prev.filter((id) => id !== cartId)
              );
            }
          }}
        />
        <div className="w-full flex flex-row gap-2 ">
          <div className="w-1/4 h-28 relative rounded-md overflow-hidden">
            {fetchProductLoading ? (
              <Skeleton />
            ) : (
              <Image
                src={imageUrlPrimary(product?.ProductImages) || ""}
                alt={product?.name || `product=${product?.id}`}
                fill
                className="object-cover"
              ></Image>
            )}
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <Link href={"#"} className="text-md font-semibold">
              {product?.name}
            </Link>
            <div className="text-sm font-light text-foreground/60 flex flex-col gap-0.5">
              {phoneType && <span className="font-semibold">{phoneType}</span>}
              {material && <span>{material}</span>}
              {variant && <span>{variant}</span>}
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/12  flex flex-col items-center gap-2 ">
        <div className="w-full h-2/3 flex flex-row ">
          <p className="w-1/2 self-center text-center text-md font-medium text-foreground/70">
            {formatCurrency(Number(product?.price))}
          </p>

          <p className="w-1/2 self-center text-center text-md font-semibold">
            {formatCurrency(Number(product?.price) * quantity)}
          </p>
        </div>
        <div className="w-full h-1/3 justify-end flex flex-row gap-2">
          <div className="w-4/5 flex flex-row justify-end    ">
            <Controller
              name="quantity"
              control={form.control}
              defaultValue={1}
              render={({ field }) => (
                <CardQuantity field={field} stock={product?.stock ?? 0} />
              )}
            />
          </div>
          <div
            className="w-1/5 flex-row-center"
            onClick={() => deleteCartItemMutation({ cartId })}
          >
            <FaTrash
              size={24}
              className="hover:cursor-pointer text-foreground/70"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
