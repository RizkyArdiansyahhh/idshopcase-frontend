"use client";

import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import Image from "next/image";
import { useTranslations } from "next-intl";

type CardProductDetailProps = {
  imageUrl: string;
  productName: string;
  price: string | number;
  totalPrice?: string | number;
  variant?: string | null;
  phoneType?: string | null;
  quantity: number;
};

export const CardProductDetail = (props: CardProductDetailProps) => {
  const { imageUrl, productName, price, variant, phoneType, quantity } = props;
  const t = useTranslations("account.orders.orderDetail");

  const itemPrice = Number(price || 0);
  const totalItemPrice = itemPrice * Number(quantity || 1);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex flex-row gap-3 border border-foreground/10 rounded-md p-2.5 items-center">
        <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-md relative overflow-hidden shrink-0 border border-foreground/5 bg-foreground/5">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="flex-1 flex flex-row justify-between items-center gap-3 min-w-0">
          <div className="flex-1 min-w-0">
            <span className="block font-semibold text-xs sm:text-sm text-foreground break-words leading-tight">
              {productName}
            </span>
            <div className="text-foreground/50 text-[11px] flex flex-wrap gap-x-2 gap-y-0.5 mt-0.5">
              {variant && <span>{variant}</span>}
              {phoneType && <span>{phoneType}</span>}
            </div>
            <p className="text-[11px] text-foreground/50 mt-1 sm:hidden">
              {quantity} × {formatCurrency(itemPrice)}
            </p>
          </div>

          <div className="hidden sm:flex flex-col items-end justify-center text-right shrink-0">
            <span className="text-[11px] text-foreground/50">
              {quantity} × {formatCurrency(itemPrice)}
            </span>
            <span className="font-semibold text-xs sm:text-sm text-foreground mt-0.5">
              {formatCurrency(totalItemPrice)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full block sm:hidden">
        <Separator />
        <div className="w-full h-fit py-1.5 px-2 flex justify-end">
          <div className="w-full sm:w-2/4 space-y-1">
            <div className="w-full flex flex-row justify-between text-[11px]">
              <span className="font-medium text-foreground/60">
                {t("quantity")} :
              </span>
              <span className="font-semibold text-foreground">
                {quantity}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between text-xs">
              <span className="font-semibold text-foreground/70">
                {t("total")} :
              </span>
              <span className="font-bold text-foreground">
                {formatCurrency(totalItemPrice)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
