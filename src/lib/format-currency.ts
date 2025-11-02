export function formatCurrency(value: number) {
  return value.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

export function formatNumber(value: number | undefined) {
  if (!value) return "";
  return value.toLocaleString("id-ID");
}
