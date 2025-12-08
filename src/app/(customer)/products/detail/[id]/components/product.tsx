"use client";

import { DetailProduct } from "@/features/products/components/detail-product";
import { useParams } from "next/navigation";

export const ProductDetail = () => {
  const params = useParams();
  const productId = Number(params.id ?? 0);
  console.log(productId);
  return (
    <>
      <DetailProduct id={productId}></DetailProduct>
    </>
  );
};
