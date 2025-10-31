export function generateCombinations(
  options: { nameVariant: string; valueVariant: string[] }[]
): { [key: string]: string }[] {
  if (options.length === 0) return [];
  const [first, ...rest] = options;

  const restComb = generateCombinations(rest);
  if (restComb.length === 0) {
    return first.valueVariant.map((v) => ({ [first.nameVariant]: v }));
  }

  const combos = [];
  for (const v of first.valueVariant) {
    for (const c of restComb) {
      combos.push({ [first.nameVariant]: v, ...c });
    }
  }
  return combos;
}
