import { PreviewImage } from "@/components/shared/preview-image";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import { useState } from "react";

export default function CustomImages({
  images,
}: {
  images: { id: number; image_url: string }[];
}) {
  const [loadingImages, setLoadingImages] = useState<{
    [key: number]: boolean;
  }>(() =>
    images.reduce((acc, img) => {
      acc[img.id] = true;
      return acc;
    }, {} as { [key: number]: boolean })
  );

  return (
    <div className="p-3 flex flex-row gap-2">
      {images.map((image) => (
        <PreviewImage
          key={image.id}
          imageId={image.id}
          imageUrl={cleanImageUrl(image.image_url) ?? ""}
        >
          <div className="w-16 h-16 border rounded-md overflow-hidden relative hover:cursor-zoom-in bg-gray-200">
            {loadingImages[image.id] && (
              <div className="absolute inset-0 bg-foreground/5 animate-pulse" />
            )}
            <Image
              src={cleanImageUrl(image.image_url) ?? ""}
              alt="custom-case"
              fill
              className={`object-cover object-center transition-opacity duration-500 ${
                loadingImages[image.id] ? "opacity-0" : "opacity-100"
              }`}
              onLoadingComplete={() =>
                setLoadingImages((prev) => ({ ...prev, [image.id]: false }))
              }
            />
          </div>
        </PreviewImage>
      ))}
    </div>
  );
}
