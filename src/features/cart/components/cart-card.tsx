"use client";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useUpdateCartItem } from "../api/update-cart";
import { useDeleteCartItem } from "../api/delete-cart";
import { CardQuantity } from "@/components/shared/card-quantity";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatCurrency } from "@/lib/format-currency";
import { useEffect, useRef } from "react";
import { imageUrlPrimary } from "@/utils/image-utils";
import { ProductImage } from "@/types/api";
import { useIsMobile } from "@/hooks/use-mobile";
import { IoCloseOutline } from "react-icons/io5";
import { LoadingDialog } from "@/components/shared/loading-dialog";

type CartCardProps = {
  cartId: number;
  productId: number;
  quantity: number;
  isSelected: boolean;
  setSelectedCartItems: React.Dispatch<React.SetStateAction<number[]>>;
  variant: string | null;
  phoneType: string | null;
  productImages: ProductImage[];
  price: string;
  productName: string;
  stok: number;
  unitPrice: string;
};

export const CartCard = (props: CartCardProps) => {
  const {
    quantity,
    cartId,
    isSelected,
    setSelectedCartItems,
    variant,
    phoneType,
    productImages,
    price,
    productName,
    stok,
    unitPrice,
  } = props;

  console.log(quantity);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const isMobile = useIsMobile();

  const quantitySchema = z.object({
    quantity: z.number().min(1),
  });
  type QuantityType = z.infer<typeof quantitySchema>;

  // FORM
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
  const {
    mutate: deleteCartItemMutation,
    isPending: deleteCartItemMutationLoading,
  } = useDeleteCartItem();

  const quantityVariable = form.watch("quantity");

  useEffect(() => {
    form.setValue("quantity", quantity, {
      shouldDirty: false,
      shouldTouch: false,
      shouldValidate: false,
    });
  }, [quantity]);

  useEffect(() => {
    if (deleteCartItemMutationLoading) return;
    if (updateCartItemMutationLoading) return;
    if (quantityVariable === quantity) return;

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      updateCartItemMutation({
        id: cartId,
        quantity: quantityVariable as number,
      });
    }, 400);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [
    quantityVariable,
    quantity,
    cartId,
    deleteCartItemMutationLoading,
    updateCartItemMutation,
  ]);

  return (
    <div className="w-full border rounded-sm py-3  flex flex-row justify-around ">
      <LoadingDialog loading={deleteCartItemMutationLoading}></LoadingDialog>
      <div className="w-full md:w-6/12 flex flex-row items-center gap-2 ">
        <Checkbox
          id={cartId.toString()}
          value={cartId.toString()}
          checked={isSelected}
          onCheckedChange={(checked) => {
            if (checked) {
              setSelectedCartItems((prev) => [...prev, cartId]);
            } else {
              setSelectedCartItems((prev) =>
                prev.filter((id) => id !== cartId),
              );
            }
          }}
        />
        <div className="w-full flex flex-row gap-2 ">
          <div className="w-1/4 h-20 md:h-24 lg:h-28 relative rounded-md overflow-hidden">
            <Image
              src={imageUrlPrimary(productImages) || ""}
              alt="Image Product"
              fill
              className="object-cover"
            ></Image>
          </div>
          <div className="flex-1 flex flex-col gap-1 ">
            <div className="flex flex-row gap-2 justify-between items-center">
              <Link
                href={"#"}
                className="block flex-1 text-xs md:text-base font-semibold break-words"
              >
                {productName}
              </Link>

              <div
                className="block md:hidden mr-1 p-.5 bg-foreground rounded-full"
                onClick={() => {
                  if (debounceRef.current) clearTimeout(debounceRef.current);
                  deleteCartItemMutation({ cartId });
                }}
              >
                <IoCloseOutline className="cursor-pointer text-background text-base" />
              </div>
            </div>

            <div className="text-xs md:text-sm font-light text-foreground/60 flex flex-col md:gap-0.5">
              {phoneType && <span className="font-semibold">{phoneType}</span>}
              {variant && <span>{variant}</span>}
            </div>
            <div className="flex md:hidden justify-between items-center flex-row">
              <p className=" text-xs md:text-base font-semibold text-foreground/70">
                {formatCurrency(Number(unitPrice ?? 0))}
              </p>
              <div className="pr-1">
                <Controller
                  name="quantity"
                  control={form.control}
                  render={({ field }) => (
                    <CardQuantity
                      field={field}
                      stock={stok ?? 0}
                      size={isMobile ? "5" : "10"}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden  w-4/12 md:flex flex-col items-center gap-2 ">
        <div className="hidden  w-full h-2/3 md:flex flex-row ">
          <p className="w-1/2 self-center text-center text-xs md:text-base font-medium text-foreground/70">
            {formatCurrency(Number(unitPrice ?? 0))}
          </p>

          <p className="w-1/2 self-center text-center text-xs md:text-base font-semibold">
            {formatCurrency(Number(price ?? 0))}
          </p>
        </div>
        <div className="w-full h-1/3 justify-end flex flex-row gap-2">
          <div className="w-4/5 flex flex-row justify-end    ">
            <Controller
              name="quantity"
              control={form.control}
              render={({ field }) => (
                <CardQuantity
                  field={field}
                  stock={stok ?? 0}
                  size={isMobile ? "5" : "10"}
                />
              )}
            />
          </div>
          <div
            className="w-1/5 flex-row-center"
            onClick={() => {
              if (debounceRef.current) {
                clearTimeout(debounceRef.current);
              }
              deleteCartItemMutation({ cartId });
            }}
          >
            <FaTrash
              // size={24}
              className="cursor-pointer text-foreground/70 text-sm md:text-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
