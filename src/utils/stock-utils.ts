import { Product } from "@/types/api";

export const getTotalStock = (variants: Product["Variants"]): number => {
  if (!variants || variants.length === 0) return 0;

  return variants.reduce((total, v) => total + Number(v.stock), 0);
};
