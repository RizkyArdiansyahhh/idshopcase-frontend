import { useMemo } from "react";
import { useGetProduct } from "../api/get-productById";
import { FormDetailProduct } from "./form-detail-product";
import { PreviewImageProduct } from "./preview-image-product";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbCustom } from "@/components/shared/breadCrumbCustom";
import { ListProductsDetail } from "./list-products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PreviewCustomCase from "@/app/(customer)/products/detail/[id]/components/preview-custom-case";
import Loader from "@/components/shared/loaders";

type DetailProductProps = {
  id: number;
};
export const DetailProduct = (props: DetailProductProps) => {
  const { id } = props;

  const { data: product, isLoading: fetchProductLoading } = useGetProduct({
    id,
    queryConfig: {
      enabled: !!id,
    },
  });

  const image = useMemo(() => {
    if (!product?.ProductImages || product.ProductImages.length === 0) return null;
    const defaultImage =
      product.ProductImages.find((img) => img.isPrimary) ??
      product.ProductImages[0];
    return defaultImage?.imageUrl ?? null;
  }, [product?.ProductImages]);

  if (fetchProductLoading) {
    return (
      <div className="w-full flex justify-center items-center h-[50vh]">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
        <h2 className="text-xl font-semibold text-foreground">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-muted-foreground">Produk ini mungkin telah dihapus atau tidak tersedia.</p>
      </div>
    );
  }

  const isCustomCase = product.category === "custom_case";

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="w-full my-2">
        <BreadcrumbCustom></BreadcrumbCustom>
      </div>
      <div className="w-full h-full flex lg:flex-row flex-col gap-6 min-w-0">
        <div className="w-full lg:w-[50%] h-full min-w-0">
          <div className="w-full h-full lg:h-5/6 flex flex-col min-w-0">
            <PreviewImageProduct
              isLoading={fetchProductLoading}
              images={product.ProductImages}
            ></PreviewImageProduct>
          </div>
        </div>
        <div className="w-full lg:w-[50%] lg:px-8 flex flex-col gap-2.5 min-w-0">
          <FormDetailProduct
            productDetail={product}
            image={image ?? ""}
          ></FormDetailProduct>
        </div>
      </div>
      <div className="w-full mt-5 md:mt-10 lg:mt-16 flex">
        <Tabs defaultValue="detailProduct" className="w-full">
          <TabsList>
            <TabsTrigger value="detailProduct">Detail</TabsTrigger>
            {isCustomCase && (
              <TabsTrigger value="previewProduct">Preview</TabsTrigger>
            )}
          </TabsList>
          <Separator className="w-full"></Separator>

          <TabsContent value="detailProduct" className="w-full">
            <div className="py-5 w-full  whitespace-pre-line text-xs md:text-sm">
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
    </div>
  );
};
