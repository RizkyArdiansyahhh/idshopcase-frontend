import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useEffect, useState } from "react";

type PreviewImageProductProps = {
  images: string[];
  isLoading?: boolean;
};
export const PreviewImageProduct = (props: PreviewImageProductProps) => {
  const { images, isLoading } = props;
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    setPreviewImage(images[0]);
  }, [images]);

  const handlePreviewImage = (image: string) => {
    console.log(previewImage);
    setPreviewImage(image);
  };
  if (isLoading || !images || images.length === 0) {
    return (
      <div className="h-2/3 lg:h-full w-full flex flex-col lg:flex-row gap-4">
        <Skeleton className="w-full lg:w-4/6 h-64 lg:h-full rounded-md" />

        <div className="h-1/3 lg:h-full w-full lg:w-2/6 flex flex-row lg:flex-col gap-2 px-7">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton
              key={i}
              className="w-24 h-24 lg:w-full lg:h-32 rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[300px] lg:h-[500px]  w-full flex flex-col lg:flex-row">
      <div className="w-full lg:w-4/6 h-full  relative rounded-[12px] overflow-hidden">
        {previewImage && (
          <Image
            src={previewImage}
            alt="banner-detail-product"
            fill
            className="object-center object-cover"
          ></Image>
        )}
      </div>
      <div className="h-1/3 lg:h-full w-full lg:w-2/6 flex flex-row lg:flex-col gap-2 px-7">
        {images.map((image, index) => (
          <div
            onClick={() => handlePreviewImage(image)}
            key={index}
            className="relative w-24 h-24 lg:w-full lg:h-32 cursor-pointer hover:border-foreground border-2 border-transparent transition-all duration-200 rounded-[12px] overflow-hidden"
          >
            <Image
              src={image}
              alt={`preview-${index}`}
              fill
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
