"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useGetProducts } from "../api/get-ptoducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatCurrency } from "@/lib/format-currency";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/types/api";

export const ListProducts = () => {
  const { push } = useRouter();
  const { data: products, isLoading: fetchProductsIsLoading } =
    useGetProducts();

  console.log(products);

  if (fetchProductsIsLoading) {
    return (
      <Carousel opts={{ align: "start" }} className="w-5/6 mx-auto">
        <CarouselContent>
          {[...Array(3)].map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <div className="w-full h-fit p-2.5 rounded-[12px] border bg-background">
                <Skeleton className="w-full h-52 rounded-[12px]" />
                <div className="mt-3 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <div className="flex justify-between items-center pt-10">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-9 w-28 rounded-md" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-5/6 mx-auto"
      >
        <CarouselContent>
          {products?.map((product) => {
            const price = product.price ?? 0;
            return (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div
                  key={product.id}
                  className="w-full h-fit p-2.5 rounded-[12px] border bg-background group hover:bg-foreground hover:text-background transition-all ease-in-out duration-400 hover:cursor-pointer"
                >
                  <div className="w-full h-52 relative rounded-[12px] overflow-hidden">
                    {!product.ProductImages ? (
                      <div className="absolute top-0 right-0 flex justify-center items-center w-full h-full">
                        <p>No Image</p>
                      </div>
                    ) : (
                      product.ProductImages.map((image) => {
                        if (image.isPrimary) {
                          const cleanPath =
                            image.imageUrl?.split("/uploads/")[1] ?? null;
                          const imageUrl = cleanPath
                            ? `/images/${cleanPath}`
                            : null;
                          return (
                            <Image
                              key={image.id}
                              src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                              alt="phone-charm"
                              fill
                              className="object-cover object-center"
                            ></Image>
                          );
                        }
                      })
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold wrap-break-word my-2">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background"
                    >
                      {product.category.replace("_", " ")}
                    </Badge>
                  </div>
                  <div className="flex flex-row pt-10 justify-between items-center">
                    <p className="text-lg font-semibold wrap-break-word">
                      {formatCurrency(Number(price))}
                    </p>
                    <Button
                      variant={"default"}
                      type="button"
                      onClick={() => push(`/products/detail/${product.id}`)}
                      className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background hover:bg-background"
                    >
                      Beli sekarang
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export const ListProductsDetail = () => {
  const { data: products, isLoading: fetchProductsIsLoading } =
    useGetProducts();
  const { push } = useRouter();
  return (
    <div className="w-full mb-15">
      <h1 className="text-4xl font-semibold my-7 text-center">
        Produk Yang Mungkin Anda Suka
      </h1>
      <div className="flex flex-row flex-wrap justify-center gap-8">
        {products?.map((product, index) => {
          const price = product.price ?? 0;
          return (
            <div
              key={product.id}
              className="w-60 h-[25rem] flex flex-col p-2.5 rounded-[12px] border bg-background group hover:bg-foreground hover:text-background transition-all ease-in-out duration-400 hover:cursor-pointer"
            >
              <div className="w-full h-52 relative rounded-[12px] overflow-hidden">
                {!product.ProductImages ? (
                  <div className="absolute top-0 right-0 flex justify-center items-center w-full h-full">
                    <p>No Image</p>
                  </div>
                ) : (
                  product.ProductImages.map((image) => {
                    if (image.isPrimary) {
                      const cleanPath =
                        image.imageUrl?.split("/uploads/")[1] ?? null;
                      const imageUrl = cleanPath
                        ? `/images/${cleanPath}`
                        : null;
                      return (
                        <Image
                          key={image.id}
                          src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                          alt="phone-charm"
                          fill
                          className="object-cover object-center"
                        ></Image>
                      );
                    }
                  })
                )}
              </div>
              <div className="flex-1 flex justify-between flex-col">
                <div>
                  <div>
                    <p className="text-lg font-semibold wrap-break-word my-2">
                      {product.name}
                    </p>
                  </div>
                  <div>
                    <Badge
                      variant="outline"
                      className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background"
                    >
                      {product.category.replace("_", " ")}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-row pt-10 justify-between items-center">
                  <p className="text-lg font-semibold wrap-break-word">
                    {formatCurrency(Number(price))}
                  </p>
                  <Button
                    variant={"default"}
                    type="button"
                    onClick={() => push(`/products/detail/${product.id}`)}
                    className="transition-all duration-200 group-hover:bg-background group-hover:text-foreground group-hover:border-background hover:bg-background"
                  >
                    Beli sekarang
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
