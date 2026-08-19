import { useMemo } from "react";
import { useGetProduct } from "../api/get-productById";
import { FormDetailProduct } from "./form-detail-product";
import { PreviewImageProduct } from "./preview-image-product";
import { Separator } from "@/components/ui/separator";
import { BreadcrumbCustom } from "@/components/shared/breadCrumbCustom";
import { ListProductsDetail } from "./list-products";
import { ProductReviewsSection } from "@/features/reviews/components/product-reviews-section";
import { FloatingCustomizerButton } from "./floating-customizer-button";
import Loader from "@/components/shared/loaders";

type DetailProductProps = {
  id: string | number;
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

  return (
    <div className="w-full max-w-7xl mx-auto relative py-2">
      {/* Right-Middle Floating Custom Studio Widget (Always accessible for all products) */}
      <FloatingCustomizerButton />

      <div className="w-full my-2">
        <BreadcrumbCustom></BreadcrumbCustom>
      </div>
      <div className="w-full h-full flex lg:flex-row flex-col gap-8 lg:gap-10 min-w-0 items-start">
        {/* Left Column: Longines-Style Luxury Photo Gallery */}
        <div className="w-full lg:w-[58%] min-w-0">
          <PreviewImageProduct
            isLoading={fetchProductLoading}
            images={product.ProductImages}
          ></PreviewImageProduct>
        </div>

        {/* Right Column: Sticky Purchasing Options & Buy Box */}
        <div className="w-full lg:w-[42%] min-w-0 lg:sticky lg:top-20 self-start">
          <FormDetailProduct
            productDetail={product}
            image={image ?? ""}
          ></FormDetailProduct>
        </div>
      </div>

      <Separator className="my-6 md:my-8" />

      {/* Dedicated Full-Width Customer Reviews Section with Photo Testimonials */}
      <ProductReviewsSection />

      <Separator className="my-6 md:my-8" />
      <ListProductsDetail />
    </div>
  );
};
