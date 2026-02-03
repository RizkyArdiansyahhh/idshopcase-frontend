"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";
import { formatCurrency } from "@/lib/format-currency";
import { UploadCardDynamic } from "./UploadCard";
import { FaInfo } from "react-icons/fa";
import { useIsMobile } from "@/hooks/use-mobile";
import { AlertMessage } from "@/components/shared/alert-message";

export type DetailProduct = {
  image: string;
  productName: string;
  price: number;
  variant: string | null;
  phoneType: string | null;
  quantity: number;
  category: string;
  slotImage: number;
};

type OrderSummaryCardProps = {
  detailProduct: DetailProduct[];
  previewImages: (string | null)[][];
  onFilesSelect: (productIdx: number, slotIdx: number, file: File) => void;
  onRemove: (productIdx: number, slotIdx: number) => void;
  isImageValid: (productIdx: number) => boolean;
};

export const OrderSummaryCard = ({
  detailProduct,
  previewImages,
  onFilesSelect,
  onRemove,
  isImageValid,
}: OrderSummaryCardProps) => {
  const isMobile = useIsMobile();
  return (
    <div>
      <div className="p-3 bg-foreground rounded-tl-md rounded-tr-md flex flex-row gap-3 items-start">
        <div className="p-4 md:p-6 rounded-md bg-background">
          <FaInfo />
        </div>
        <div className="text-background flex flex-col gap-1 text-xs lg:text-sm">
          <p className="font-semibold">Informasi Produk</p>
          <p className="font-medium text-background/70 text-xs ">
            {isMobile
              ? " Beberapa produk memerlukan gambar pendukung. Jika diperlukan, silakan unggah minimal satu gambar agar pesanan dapat diproses."
              : "Beberapa produk mungkin memerlukan gambar pendukung untuk proses penyesuaian. Jika produk yang Anda pilih membutuhkannya, silakan unggah minimal satu gambar dari opsi yang tersedia agar pesanan dapat diproses dengan baik."}
          </p>
        </div>
      </div>
      <Card className="p-4 rounded-br-md rounded-bl-md rounded-tr-none rounded-tl-none ">
        <CardHeader className="pl-1 ">
          <h3 className="text-sm md:text-base lg:text-lg font-semibold">
            Ringkasan Pesanan
          </h3>
        </CardHeader>

        {detailProduct.map((item, productIdx) => {
          const slotCount = item.slotImage;
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

                  <div className="flex-1  ">
                    <p className="font-semibold text-xs md:text-sm">
                      {item.productName}
                    </p>
                    <div className="flex flex-row gap-1 items-center text-xs md:text-sm text-foreground/60">
                      {item.phoneType && <p>{item.phoneType}</p>}
                    </div>
                    <p className="text-xs md:text-sm text-foreground/60 ">
                      Quantity : {item.quantity}
                    </p>
                    <p className="font-bold mt-2 text-xs md:text-sm">
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
                isImageValid={isImageValid(productIdx)}
              />
            </div>
          );
        })}
      </Card>
    </div>
  );
};
