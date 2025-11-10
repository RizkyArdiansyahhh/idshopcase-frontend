export function formatDate(
  dateInput: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!dateInput) return "-";

  const date = new Date(dateInput);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString("id-ID", options || defaultOptions);
}
