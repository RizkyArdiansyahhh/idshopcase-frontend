import { VariantOption } from "@/types/api";

export function generateCombinations(
  options: VariantOption[]
): { [key: string]: string }[] {
  if (options.length === 0) return [];
  const [first, ...rest] = options;

  const restComb = generateCombinations(rest);
  if (restComb.length === 0) {
    return (
      first.valueVariants?.map((v) => ({ [first.nameVariant]: v.label })) || []
    );
  }

  const combos: { [key: string]: string }[] = [];
  for (const v of first.valueVariants || []) {
    for (const c of restComb) {
      combos.push({ [first.nameVariant]: v.label, ...c });
    }
  }
  return combos;
}
