import { ProductImage } from "@/types/api";

export const cleanImageUrl = (imageUrl: string) => {
  if (!imageUrl) return null;

  const cleanPath = imageUrl.split("/uploads/")[1];
  if (!cleanPath) return null;

  return `${process.env.NEXT_PUBLIC_API_URL}/images/${cleanPath}`;
};

export const imageUrlPrimary = (imagesUrl: ProductImage[] = []) => {
  if (!imagesUrl.length) return null;
  const imagePrimary = imagesUrl.find((image) => image.isPrimary);
  return cleanImageUrl(imagePrimary?.imageUrl ?? "");
};

export const imageUrlList = (imagesUrl: ProductImage[] = []) => {
  return imagesUrl
    .map((img) => cleanImageUrl(img.imageUrl))
    .filter((url): url is string => url !== null);
};
