"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/lib/format-currency";
import { UploadCardDynamic } from "./UploadCard";

export type DetailProduct = {
  image: string;
  productName: string;
  price: number;
  material: string | null;
  variant: string | null;
  phoneType: string | null;
  quantity: number;
  category: string;
};
const SLOT_MAP: Record<string, number> = {
  custom_case: 3,
  keychain: 1,
  pop_socket: 1,
};

type OrderSummaryCardProps = {
  detailProduct: DetailProduct[];
  // setiap produk punya slot preview image
  previewImages: (string | null)[][];
  onFilesSelect: (productIdx: number, slotIdx: number, file: File) => void;
  onRemove: (productIdx: number, slotIdx: number) => void;
};

export const OrderSummaryCard = ({
  detailProduct,
  previewImages,
  onFilesSelect,
  onRemove,
}: OrderSummaryCardProps) => {
  console.log(detailProduct, "detailProduct");

  return (
    <Card className="p-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">Ringkasan Pesanan</h3>
      </CardHeader>

      {detailProduct.map((item, productIdx) => {
        const slotCount = SLOT_MAP[item.category];
        return (
          <div key={productIdx} className="flex flex-col gap-3">
            {/* Produk Card */}
            <Card>
              <CardContent className="flex flex-row gap-4 items-center">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{item.productName}</p>
                  <div className="flex flex-row gap-1 items-center text-sm text-foreground/60">
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

            {/* Upload Dinamis per produk */}
            <UploadCardDynamic
              slotCount={slotCount}
              previewImages={
                previewImages[productIdx] || Array(slotCount).fill(null)
              }
              onFilesSelect={(slotIdx, file) =>
                onFilesSelect(productIdx, slotIdx, file)
              }
              onRemove={(slotIdx) => onRemove(productIdx, slotIdx)}
            />
          </div>
        );
      })}
    </Card>
  );
};
