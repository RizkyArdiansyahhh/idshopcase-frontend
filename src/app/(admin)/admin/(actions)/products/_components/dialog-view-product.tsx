"use client";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Product } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import React from "react";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

export default function DialogViewProduct({ product, open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl w-[90%] h-5/6 overflow-scroll">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <p className="text-sm text-gray-500 mb-4">
          Category: {product.category}
        </p>

        <div className="flex h-40 gap-2 mb-4 overflow-x-auto">
          {product.ProductImages.map((img) => (
            <div
              key={img.id}
              className="relative w-32 h-32 rounded-md overflow-hidden flex-shrink-0 border"
            >
              <Image
                src={cleanImageUrl(img.imageUrl) ?? ""}
                alt={product.name}
                fill
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Description:</h3>
          <p className="text-sm whitespace-pre-wrap">{product.description}</p>
        </div>

        {/* Variants */}
        {product.Variants && product.Variants.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Variants:</h3>
            <table className="w-full table-auto border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-2 py-1 border">Name</th>
                  <th className="px-2 py-1 border">Price</th>
                  <th className="px-2 py-1 border">Stock</th>
                  <th className="px-2 py-1 border">Max Images</th>
                </tr>
              </thead>
              <tbody>
                {product.Variants.map((v) => (
                  <tr key={v.id} className="text-sm text-gray-700">
                    <td className="px-2 py-1 border">{v.name}</td>
                    <td className="px-2 py-1 border">
                      {Number(v.price).toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </td>
                    <td className="px-2 py-1 border">{v.stock}</td>
                    <td className="px-2 py-1 border">{v.max_images}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Phone Types */}
        {product.PhoneTypes && product.PhoneTypes.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Supported Phone Types:</h3>
            <div className="flex flex-wrap gap-2 text-sm">
              {product.PhoneTypes.map((pt) => (
                <Badge variant={"outline"} key={pt.id}>
                  {pt.brand + " " + pt.model}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
