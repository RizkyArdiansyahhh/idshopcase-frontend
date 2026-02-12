import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/api";

import { formatCurrency } from "@/lib/format-currency";
import { InputsFormProduct } from "@/app/(customer)/products/detail/[id]/components/inputs-form-product";
import { QuantityInput } from "@/app/(customer)/products/detail/[id]/components/input-form-detail-product";
import { ValidateFormDetailProduct } from "@/app/(customer)/products/detail/[id]/components/validate-form-detail-product";
import { getMinMaxVariantPrice } from "@/utils/price-utils";
import { getTotalStock } from "@/utils/stock-utils";

type FormDetailProductProps = {
  productDetail: Product;
  image: string;
};

export const FormDetailProduct = ({
  productDetail,
  image,
}: FormDetailProductProps) => {
  const phoneTypeOptions =
    productDetail.PhoneTypes?.map((p) => ({
      id: String(p.id),
      model: p.model,
    })) || [];

  const rawVariantOptions =
    productDetail.Variants?.map((v) => ({
      id: String(v.id),
      name: v.name,
      price: v.price,
      stock: Number(v.stock),
      max_images: Number(v.max_images),
    })) || [];

  const variantOptions = rawVariantOptions.filter(
    (v) => v.name !== "-" && v.name.trim() !== "",
  );
  const baseVariant = rawVariantOptions.find((v) => v.name === "-");
  const hasVariant = variantOptions.length > 0;

  const formSchema = z.object({
    variant:
      variantOptions.length > 0
        ? z.enum(variantOptions.map((v) => v.id) as [string, ...string[]], {
            message: "Pilih varian terlebih dahulu",
          })
        : z.string().optional(),

    phone_type: phoneTypeOptions.length
      ? z.enum(phoneTypeOptions.map((p) => p.id) as [string, ...string[]], {
          message: "Pilih tipe ponsel terlebih dahulu",
        })
      : z.string().optional(),

    quantity: z.number().min(1, "Minimal 1 item"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const formValues = form.watch();
  const selectedVariant = hasVariant
    ? variantOptions.find((v) => v.id === formValues.variant)
    : baseVariant;

  const priceDisplay = selectedVariant?.price;
  const minMaxPrice = getMinMaxVariantPrice(variantOptions);
  const stockProduct =
    selectedVariant?.stock ?? getTotalStock(productDetail.Variants);

  return (
    <div className="w-full px-1.5 md:px-4 lg:px-6 flex flex-col gap-2.5 lg:h-full">
      <div>
        <h1 className="text-xl md:text-3xl lg:text-4xl font-semibold text-foreground">
          {productDetail.name}
        </h1>
        <h3 className="text-base md:text-xl lg:text-2xl font-semibold text-foreground/70 my-2">
          {priceDisplay !== undefined
            ? formatCurrency(Number(priceDisplay))
            : `${formatCurrency(Number(minMaxPrice?.min))} - ${formatCurrency(Number(minMaxPrice?.max))}`}
        </h3>
        <Separator />
      </div>

      <Form {...form}>
        <div className="flex flex-col gap-6 h-full justify-between ">
          <InputsFormProduct
            control={form.control}
            variants={variantOptions}
            phone_type={phoneTypeOptions}
          />
          <QuantityInput stockProduct={stockProduct} control={form.control} />
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-end mt-4 ">
          <ValidateFormDetailProduct
            productId={productDetail.id}
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay)}
            imageProduct={image}
            variant="outline"
            data={{
              ...formValues,
              variant: selectedVariant?.id,
            }}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={rawVariantOptions}
            totalStock={stockProduct}
          >
            <ShoppingCart />
            <span className="mx-2">Masukkan Keranjang</span>
          </ValidateFormDetailProduct>

          <ValidateFormDetailProduct
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay)}
            imageProduct={image}
            variant="default"
            data={{
              ...formValues,
              variant: selectedVariant?.id,
            }}
            isCheckout
            productId={productDetail.id}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={rawVariantOptions}
            totalStock={stockProduct}
          >
            <span className="mx-2">Beli Sekarang</span>
          </ValidateFormDetailProduct>
        </div>
      </Form>
    </div>
  );
};
