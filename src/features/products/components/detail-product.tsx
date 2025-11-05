import { useMemo } from "react";
import { useGetProduct } from "../api/get-productById";
import { FormDetailProduct } from "./form-detail-product";
import { PreviewImageProduct } from "./preview-image-product";
import { formatCurrency } from "@/lib/format-currency";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbCustom } from "@/components/shared/breadCrumbCustom";
import { Footer } from "@/app/_components/footer";
import { ListProducts, ListProductsDetail } from "./list-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewCustomCase from "@/app/(customer)/products/detail/[id]/components/preview-custom-case";

type DetailProductProps = {
  id: number;
  isCustomCase?: boolean;
};
export const DetailProduct = (props: DetailProductProps) => {
  const { id, isCustomCase } = props;

  console.log(id);
  const { data: product, isLoading: fetchProductLoading } = useGetProduct({
    id,
    queryConfig: {
      enabled: !!id,
    },
  });
  const { minPrice, maxPrice } = useMemo(() => {
    if (product?.variantOptions && product.variantOptions.length > 0) {
      const prices = product.variantCombinations!.map((v) => v.price);
      return {
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
      };
    }
    return {
      minPrice: product?.basePrice ?? 0,
      maxPrice: product?.basePrice ?? 0,
    };
  }, [product]);

  if (!product) return null;

  console.log(product);

  return (
    <>
      <div className="w-full my-2">
        <BreadcrumbCustom></BreadcrumbCustom>
      </div>
      <div className="w-full h-full flex md:flex-row flex-col ">
        <div className="w-full lg:w-[50%] h-full ">
          <div className="w-full h-full lg:h-5/6 flex flex-col">
            <PreviewImageProduct
              isLoading={fetchProductLoading}
              images={product?.images || []}
            ></PreviewImageProduct>
          </div>
        </div>
        <div className="w-full lg:w-[50%]  px-8 flex flex-col gap-2.5 ">
          <div>
            <h1 className="text-4xl font-semibold text-foreground">
              {product.name}
            </h1>
            <h3 className="text-2xl font-semibold text-foreground/70 my-2">
              {minPrice === maxPrice
                ? formatCurrency(minPrice)
                : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}
            </h3>
            <Separator></Separator>
          </div>
          <FormDetailProduct product={product}></FormDetailProduct>
        </div>
      </div>
      <div className="w-full mt-20 flex">
        <Tabs defaultValue="detailProduct" className="w-full">
          <TabsList>
            <TabsTrigger className="font-bol" value="detailProduct">
              Detail
            </TabsTrigger>
            <TabsTrigger value="previewProduct">Preview</TabsTrigger>
          </TabsList>
          <Separator className="w-full"></Separator>

          <TabsContent value="detailProduct" className=" w-full">
            <div className="py-5 w-full  whitespace-pre-line">
              {product.description}
            </div>
          </TabsContent>
          <TabsContent value="previewProduct">
            <PreviewCustomCase></PreviewCustomCase>
          </TabsContent>
        </Tabs>
      </div>

      <Separator></Separator>
      <ListProductsDetail></ListProductsDetail>
    </>
  );
};
