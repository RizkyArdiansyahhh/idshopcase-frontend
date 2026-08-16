"use client";

import { DetailProduct } from "@/features/products/components/detail-product";
import { useParams } from "next/navigation";

export const ProductDetail = () => {
  const params = useParams();
  const productId = String(params.id ?? "");
  return (
    <>
      <DetailProduct id={productId}></DetailProduct>
    </>
  );
};
