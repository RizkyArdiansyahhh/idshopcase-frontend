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
import { FloatingQuickBuyBar } from "./floating-quick-buy-bar";
import { ProductAccordionInfo } from "./product-accordion-info";

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

  const filteredVariants = rawVariantOptions.filter(
    (v) => v.name !== "-" && v.name.trim() !== "",
  );
  const variantOptions = Array.from(
    new Map(filteredVariants.map((v) => [v.name.trim(), v])).values()
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

  const handleSyncParent = (values: { variant?: string; phone_type?: string; quantity?: number }) => {
    if (values.variant !== undefined) form.setValue("variant", values.variant);
    if (values.phone_type !== undefined) form.setValue("phone_type", values.phone_type);
    if (values.quantity !== undefined) form.setValue("quantity", values.quantity);
  };

  const formValues = form.watch();
  const selectedVariant = hasVariant
    ? variantOptions.find((v) => v.id === formValues.variant)
    : baseVariant;

  const priceDisplay = selectedVariant?.price;
  const minMaxPrice = getMinMaxVariantPrice(variantOptions);
  const stockProduct =
    selectedVariant?.stock ?? getTotalStock(productDetail.Variants);

  return (
    <div className="w-full flex flex-col space-y-5 pt-0">
      {/* Title & Price Header */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-neutral-900 leading-snug mt-0 pt-0 uppercase">
          {productDetail.name}
        </h1>
        <div className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight pt-1">
          {priceDisplay !== undefined
            ? formatCurrency(Number(priceDisplay))
            : `${formatCurrency(Number(minMaxPrice?.min))} - ${formatCurrency(Number(minMaxPrice?.max))}`}
        </div>
      </div>

      <Separator className="my-1" />

      <Form {...form}>
        <div className="flex flex-col space-y-5">
          <InputsFormProduct
            control={form.control}
            variants={variantOptions}
            phone_type={phoneTypeOptions}
          />
          <QuantityInput stockProduct={stockProduct} control={form.control} />
        </div>

        <div id="main-buy-buttons-target" className="flex flex-col sm:flex-row gap-3 pt-4 w-full items-stretch sm:items-center">
          <ValidateFormDetailProduct
            productId={productDetail.id}
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay)}
            imageProduct={productDetail.ProductImages?.[0]?.imageUrl || image}
            variant="outline"
            data={{
              ...formValues,
              variant: selectedVariant?.id,
            }}
            onSyncParent={handleSyncParent}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={rawVariantOptions}
            totalStock={stockProduct}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="mx-1.5 font-medium">Masukkan Keranjang</span>
          </ValidateFormDetailProduct>

          <ValidateFormDetailProduct
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay)}
            imageProduct={productDetail.ProductImages?.[0]?.imageUrl || image}
            variant="default"
            data={{
              ...formValues,
              variant: selectedVariant?.id,
            }}
            onSyncParent={handleSyncParent}
            isCheckout
            productId={productDetail.id}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={rawVariantOptions}
            totalStock={stockProduct}
          >
            <span className="mx-1.5 font-medium">Beli Sekarang</span>
          </ValidateFormDetailProduct>
        </div>
      </Form>

      {/* Luxury Collapsible Accordions: Product Description, Shipping, Warranty (Bamboo Blonde Style) */}
      <ProductAccordionInfo description={productDetail.description} />

      {/* Floating Quick Buy Pill (Bamboo Blonde Style when scrolled past form) */}
      <FloatingQuickBuyBar
        productId={productDetail.id}
        name={productDetail.name}
        image={productDetail.ProductImages?.[0]?.imageUrl || image}
        price={Number(priceDisplay || minMaxPrice?.min || 0)}
        stock={stockProduct}
        selectedVariantName={selectedVariant?.name !== "-" ? selectedVariant?.name : undefined}
        selectedPhoneTypeName={
          phoneTypeOptions.find((p) => p.id === formValues.phone_type)?.model
        }
        formValues={{
          ...formValues,
          variant: selectedVariant?.id,
        }}
        onQuantityChange={(qty) => form.setValue("quantity", qty)}
        onSyncParent={handleSyncParent}
        phoneTypeOptions={phoneTypeOptions}
        variantOptions={rawVariantOptions}
      />
    </div>
  );
};
