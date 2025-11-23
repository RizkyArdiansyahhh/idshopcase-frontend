// features/checkout/components/OrderSummaryCard.tsx
"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { Product } from "@/types/api";
import Image from "next/image";
import { imageUrlPrimary } from "@/utils/image-utils";
import { useCheckoutStore } from "@/store/checkout-store";
import { UploadCard } from "./UploadCard";

export type DetailProduct = {
  image: string;
  productName: string;
  price: number;
  material: string | null;
  variant: string | null;
  phoneType: string | null;
  quantity: number;
};
type OrderSummaryCardProps = {
  detailProduct: DetailProduct[];
  previewImage: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setPreviewImage: React.Dispatch<React.SetStateAction<string | null>>;
};

export const OrderSummaryCard = (props: OrderSummaryCardProps) => {
  const { detailProduct, previewImage, handleImageChange, setPreviewImage } =
    props;
  return (
    <Card className="p-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
      </CardHeader>
      {detailProduct.map((item, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Card>
            <CardContent className="flex flex-row gap-4 items-center">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.image ?? ""}
                  alt={item.productName}
                  fill
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <p className="font-semibold">{item.productName}</p>
                <div className="flex flex-row gap-1 items-center text-sm text-foreground/60 ">
                  {item.phoneType && <p>{item.phoneType}</p>}
                  <span>|</span>
                  {item.material && <p>{item.material}</p>}
                </div>

                <p className="text-sm text-foreground/60">
                  Quantity : {item.quantity}
                </p>
                <p className="font-bold mt-2">
                  {formatCurrency(Number(item.price))}
                </p>
              </div>
            </CardContent>
          </Card>
          <UploadCard
            previewImage={previewImage}
            onImageChange={handleImageChange}
            onRemove={() => setPreviewImage(null)}
          />
          ;
        </div>
      ))}
    </Card>
  );
};
