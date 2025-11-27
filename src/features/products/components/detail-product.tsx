import { useMemo } from "react";
import { useGetProduct } from "../api/get-productById";
import { FormDetailProduct } from "./form-detail-product";
import { PreviewImageProduct } from "./preview-image-product";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbCustom } from "@/components/shared/breadCrumbCustom";
import { ListProductsDetail } from "./list-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewCustomCase from "@/app/(customer)/products/detail/[id]/components/preview-custom-case";

type DetailProductProps = {
  id: number;
};
export const DetailProduct = (props: DetailProductProps) => {
  const { id } = props;

  console.log(id);
  const { data: product, isLoading: fetchProductLoading } = useGetProduct({
    id,
    queryConfig: {
      enabled: !!id,
    },
  });
  console.log(product, "product");

  const image = useMemo(() => {
    if (!product?.ProductImages) return null;
    const defaultImage = product.ProductImages.find((image) => image.isPrimary);
    const cleanPath = defaultImage?.imageUrl?.split("/uploads/")[1] ?? null;
    return cleanPath ? `/images/${cleanPath}` : null;
  }, [product?.ProductImages]);

  if (!product) return null;

  const isCustomCase = product.category === "custom_case";

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
              images={product.ProductImages}
            ></PreviewImageProduct>
          </div>
        </div>
        <div className="w-full lg:w-[50%]  px-8 flex flex-col gap-2.5 ">
          <FormDetailProduct
            productDetail={product}
            image={image ?? ""}
          ></FormDetailProduct>
        </div>
      </div>
      <div className="w-full mt-20 flex">
        <Tabs defaultValue="detailProduct" className="w-full">
          <TabsList>
            <TabsTrigger className="font-bol" value="detailProduct">
              Detail
            </TabsTrigger>
            {isCustomCase && (
              <TabsTrigger value="previewProduct">Preview</TabsTrigger>
            )}
          </TabsList>
          <Separator className="w-full"></Separator>

          <TabsContent value="detailProduct" className=" w-full">
            <div className="py-5 w-full  whitespace-pre-line">
              {product.description}
            </div>
          </TabsContent>
          {isCustomCase && (
            <TabsContent value="previewProduct">
              <PreviewCustomCase></PreviewCustomCase>
            </TabsContent>
          )}
        </Tabs>
      </div>

      <Separator></Separator>
      <ListProductsDetail></ListProductsDetail>
    </>
  );
};
