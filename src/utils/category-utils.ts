/**
 * Enum for official Product Categories in Idshopcase
 */
export enum ProductCategory {
  CUSTOM_CASE = "custom_case",
  POP_SOCKET = "pop_socket",
  KEYCHAIN = "keychain",
  PHONE_CHARM = "phone_charm",
}

/**
 * Clean human-readable display label mapping for each category
 */
export const ProductCategoryLabels: Record<string, string> = {
  [ProductCategory.CUSTOM_CASE]: "Custom Case",
  [ProductCategory.POP_SOCKET]: "Pop Socket",
  [ProductCategory.KEYCHAIN]: "Keychain",
  [ProductCategory.PHONE_CHARM]: "Phone Charm",
  // Variations support (uppercase, dash, space)
  CUSTOM_CASE: "Custom Case",
  POP_SOCKET: "Pop Socket",
  KEYCHAIN: "Keychain",
  PHONE_CHARM: "Phone Charm",
  "custom-case": "Custom Case",
  "pop-socket": "Pop Socket",
  "phone-charm": "Phone Charm",
};

/**
 * Converts a raw category string (e.g. "custom_case", "pop_socket") into a clean display label (e.g. "Custom Case", "Pop Socket").
 * Replaces underscores/dashes and properly capitalizes any unmapped categories.
 */
export function formatCategoryName(category?: string | null): string {
  if (!category) return "";

  const trimmed = category.trim();
  const normalizedKey = trimmed.toLowerCase();

  if (ProductCategoryLabels[normalizedKey]) {
    return ProductCategoryLabels[normalizedKey];
  }

  if (ProductCategoryLabels[trimmed]) {
    return ProductCategoryLabels[trimmed];
  }

  // Fallback: replace underscores/dashes with spaces and capitalize each word
  return trimmed
    .replace(/[_-]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
