import { ProductImage } from "@/types/api";

const getApiOrigin = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    (typeof window !== "undefined" &&
    window.location.hostname !== "localhost" &&
    window.location.hostname !== "127.0.0.1"
      ? "https://api.idshopcase.com/api"
      : "http://localhost:5001/api");
  return baseUrl.replace(/\/api\/?$/, "");
};

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

  // If blob or data URL
  if (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  // If frontend public asset (e.g. /images/...)
  if (imageUrl.startsWith("/images/")) {
    return imageUrl;
  }

  const apiOrigin = getApiOrigin();

  // If localhost was saved in DB, replace with current environment API origin
  if (imageUrl.includes("localhost:") || imageUrl.includes("127.0.0.1:")) {
    const cleanPath = imageUrl.replace(/^https?:\/\/[^/]+/, "");
    return `${apiOrigin}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
  }

  // If external absolute URL (Cloudinary, Shopee, Tokopedia, etc.)
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const cleanPath = imageUrl.replace(/^\/?uploads\/?/, "");
  if (!cleanPath || cleanPath === "null" || cleanPath === "undefined") {
    return "/images/product-1.jpeg";
  }

  return `${apiOrigin}/uploads/${cleanPath}`;
};

export const cleanProfileImageUrl = (imageUrl?: string | null): string | null => {
  if (
    !imageUrl ||
    typeof imageUrl !== "string" ||
    imageUrl.trim() === "" ||
    imageUrl === "null" ||
    imageUrl === "undefined" ||
    imageUrl.includes("product-1.jpeg")
  ) {
    return null;
  }

  if (imageUrl.startsWith("blob:") || imageUrl.startsWith("data:")) {
    return imageUrl;
  }

  if (imageUrl.startsWith("/images/")) {
    return imageUrl;
  }

  const apiOrigin = getApiOrigin();

  // If localhost was saved in DB, replace with current environment API origin
  if (imageUrl.includes("localhost:") || imageUrl.includes("127.0.0.1:")) {
    const cleanPath = imageUrl.replace(/^https?:\/\/[^/]+/, "");
    return `${apiOrigin}${cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`}`;
  }

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  const normalized = imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`;
  if (normalized.startsWith("/uploads/")) {
    return `${apiOrigin}${normalized}`;
  }

  if (normalized.startsWith("/profile_pictures/")) {
    return `${apiOrigin}/uploads${normalized}`;
  }

  if (imageUrl.startsWith("profile_")) {
    return `${apiOrigin}/uploads/profile_pictures/${imageUrl}`;
  }

  return `${apiOrigin}/uploads/${imageUrl.replace(/^\/+/, "")}`;
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
