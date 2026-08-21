export function formatCurrency(value?: number | string | null) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num) || value === undefined || value === null) {
    return "Rp 0";
  }
  return num.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
}

export function formatNumber(value?: number | string | null) {
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num) || value === undefined || value === null) return "";
  return num.toLocaleString("id-ID");
}
