import { ProductImage } from "@/types/api";

export const cleanImageUrl = (imageUrl?: string | null): string => {
  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    imageUrl.trim() === "" ||
    imageUrl === "null" ||
    imageUrl === "undefined"
  ) {
    return "/images/product-1.jpeg";
  }

  // If already a full URL with protocol
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  // If it's a frontend public asset (e.g. /images/...)
  if (imageUrl.startsWith("/images/")) {
    return imageUrl;
  }

  // Clean /uploads/ or uploads/ prefix
  const cleanPath = imageUrl.replace(/^\/?uploads\/?/, "");

  if (!cleanPath || cleanPath === "null" || cleanPath === "undefined") {
    return "/images/product-1.jpeg";
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
  const apiOrigin = baseUrl.replace(/\/api\/?$/, "");
  return `${apiOrigin}/uploads/${cleanPath}`;
};

export const imageUrlPrimary = (imagesUrl: ProductImage[] = []): string => {
  if (!imagesUrl || !imagesUrl.length) return "/images/product-1.jpeg";
  const imagePrimary = imagesUrl.find((image) => image.isPrimary);
  return cleanImageUrl(imagePrimary?.imageUrl || imagesUrl[0]?.imageUrl);
};

export const imageUrlList = (imagesUrl: ProductImage[] = []) => {
  return imagesUrl
    .map((img) => cleanImageUrl(img.imageUrl))
    .filter((url): url is string => url !== null);
};

export function imageOpenGraph(images?: ProductImage[]) {
  if (!images || images.length === 0) {
    return [{ url: "/images/login-cover.jpg" }];
  }

  return images.map((img) => ({
    url: cleanImageUrl(img.imageUrl) ?? "",
  }));
}
