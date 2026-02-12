"use client";
import GlareHover from "@/components/ui/GlareHover";
import { formatCurrency } from "@/lib/format-currency";
import { ProductImage } from "@/types/api";
import { cleanImageUrl } from "@/utils/image-utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ProductCardProps = {
  id: number;
  name: string;
  category: string;
  images: ProductImage[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  price: any;
};

export const ProductCardHomePage = (props: ProductCardProps) => {
  const { id, name, category, images, price } = props;
  const mainImage =
    images.find((image) => image.isPrimary)?.imageUrl ??
    images[0]?.imageUrl ??
    "";
  const [activeImage, setActiveImage] = useState(mainImage);

  return (
    <>
      <div className="h-fit w-[18rem] flex flex-col group cursor-pointer">
        <div className="relative w-[18rem] h-[40vh] rounded-xs overflow-hidden cursor-pointer">
          <Image
            key={activeImage}
            src={cleanImageUrl(activeImage) ?? ""}
            fill
            alt=""
            className="object-cover object-center"
          />
          <GlareHover
            glareColor="#ffffff"
            glareOpacity={6}
            glareAngle={-45}
            glareSize={300}
            transitionDuration={900}
            playOnce={false}
          />
        </div>

        <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <div className="overflow-hidden">
            <div className="grid grid-cols-5 gap-1.5 py-1.5 h-16">
              {images.map((image) => (
                <div
                  onMouseEnter={() => setActiveImage(image.imageUrl)}
                  onMouseLeave={() => setActiveImage(mainImage)}
                  key={image.id}
                  className={`h-full rounded-xs overflow-hidden relative border-[1px] ${
                    activeImage === image.imageUrl
                      ? "border-foreground"
                      : "border-transparent"
                  } hover:border-foreground transition-all`}
                >
                  <Image
                    src={cleanImageUrl(image.imageUrl) ?? ""}
                    fill
                    alt=""
                    className="object-cover animate-fade object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full h-fit">
          <div className="cursor-pointer mt-1 mb-3">
            <p className="font-semibold text-base break-words leading-4 mb-1.5">
              {name}
            </p>

            <p className="text-sm font-medium text-foreground/80">{category}</p>
            <p className="text-sm font-medium text-foreground/60">
              {price
                ? price.min === price.max
                  ? formatCurrency(price.min)
                  : `${formatCurrency(price.min)} – ${formatCurrency(
                      price.max,
                    )}`
                : "Harga tidak tersedia"}
            </p>
          </div>
          <Link
            href={`/products/detail/${id}`}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out hover:bg-foreground hover:text-background rounded-sm mt-1 px-2 py-2 text-center bg-background text-foreground font-medium border text-sm"
          >
            Beli sekarang
          </Link>
        </div>
      </div>
    </>
  );
};
