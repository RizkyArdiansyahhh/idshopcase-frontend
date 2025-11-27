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

  const variantOptions =
    productDetail.Variants?.map((v) => ({
      id: String(v.id),
      name: v.name,
      price: v.price,
      stock: Number(v.stock),
      max_images: Number(v.max_images),
    })) || [];

  const formSchema = z.object({
    variant: variantOptions.length
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

  // Hitung harga min-max dari semua varian
  const prices = variantOptions.map((v) => v.price);
  const minPrice = prices.length ? Math.min(...prices.map(Number)) : 0;
  const maxPrice = prices.length ? Math.max(...prices.map(Number)) : 0;

  // Tentukan harga yang ditampilkan
  const priceDisplay = formValues.variant
    ? variantOptions.find((v) => v.id === formValues.variant)?.price ?? 0
    : minPrice === maxPrice
    ? minPrice
    : undefined;

  // Ambil stok sesuai varian yang dipilih
  const selectedVariant =
    variantOptions.find((v) => v.id === formValues.variant) ||
    variantOptions[0];

  const stockProduct = selectedVariant?.stock ?? 0;

  return (
    <div className="w-full px-8 flex flex-col gap-2.5">
      <div>
        <h1 className="text-4xl font-semibold text-foreground">
          {productDetail.name}
        </h1>
        <h3 className="text-2xl font-semibold text-foreground/70 my-2">
          {priceDisplay !== undefined
            ? formatCurrency(Number(priceDisplay))
            : `${formatCurrency(minPrice)} - ${formatCurrency(maxPrice)}`}
        </h3>
        <Separator />
      </div>

      <Form {...form}>
        <div className="flex flex-col gap-6 h-full">
          <InputsFormProduct
            control={form.control}
            variants={variantOptions}
            phone_type={phoneTypeOptions}
          />
          <QuantityInput stockProduct={stockProduct} control={form.control} />
        </div>

        <div className="flex-1 flex flex-row gap-3 items-end mt-4">
          <ValidateFormDetailProduct
            productId={productDetail.id}
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay) ?? Number(minPrice)}
            imageProduct={image}
            quantityProduct={formValues.quantity}
            variant="outline"
            data={formValues}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={variantOptions}
          >
            <ShoppingCart />
            <span className="mx-2">Masukkan Keranjang</span>
          </ValidateFormDetailProduct>

          <ValidateFormDetailProduct
            nameProduct={productDetail.name}
            priceProduct={Number(priceDisplay) ?? Number(minPrice)}
            imageProduct={image}
            quantityProduct={formValues.quantity}
            variant="default"
            data={formValues}
            isCheckout
            productId={productDetail.id}
            phoneTypeOptions={phoneTypeOptions}
            variantOptions={variantOptions}
          >
            <span className="mx-2">Beli Sekarang</span>
          </ValidateFormDetailProduct>
        </div>
      </Form>
    </div>
  );
};
