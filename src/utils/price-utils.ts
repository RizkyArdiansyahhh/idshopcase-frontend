type Variant = {
  price: string | number | null | undefined;
};

export function getMinMaxVariantPrice(
  variants?: Variant[] | null,
): { min: number; max: number } | null {
  if (!variants || variants.length === 0) return null;

  const prices = variants
    .map((v) => Number(v.price))
    .filter((price) => Number.isFinite(price));

  if (prices.length === 0) return null;

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}
