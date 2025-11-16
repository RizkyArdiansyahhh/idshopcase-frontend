import {
  MaterialInput,
  PhoneTypeInput,
  QuantityInput,
  VariantInput,
} from "@/app/(customer)/products/detail/[id]/components/input-form-detail-product";
import { Form } from "@/components/ui/form";
import { ValidateFormDetailProduct } from "@/app/(customer)/products/detail/[id]/components/validate-form-detail-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Product } from "@/types/api";
import { InputsFormProduct } from "@/app/(customer)/products/detail/[id]/components/inputs-form-product";

type FormDetailProductProps = {
  productDetail: Product;
  image: string;
};

export const FormDetailProduct = (props: FormDetailProductProps) => {
  const { productDetail, image } = props;

  const phoneTypeOptions = productDetail.phoneTypes?.length
    ? productDetail.phoneTypes.map((p) => p.model)
    : [];

  const materialOptions = productDetail.materials?.length
    ? productDetail.materials.map((m) => m.name)
    : [];

  const variantOptions = productDetail.variants?.length
    ? productDetail.variants.map((v) => v.name)
    : [];

  const formDetailProductSchema = z.object({
    phone_type:
      phoneTypeOptions.length > 0
        ? z.enum(phoneTypeOptions as [string, ...string[]], {
            message: "Pilih tipe ponsel terlebih dahulu",
          })
        : z.string().optional(),

    material:
      materialOptions.length > 0
        ? z.enum(materialOptions as [string, ...string[]], {
            message: "Pilih material terlebih dahulu",
          })
        : z.string().optional(),

    variant:
      variantOptions.length > 0
        ? z.enum(variantOptions as [string, ...string[]], {
            message: "Pilih varian terlebih dahulu",
          })
        : z.string().optional(),
    quantity: z
      .number({
        message: "Jumlah harus berupa angka",
      })
      .min(1, "Minimal 1 item"),
  });

  type FormDetailProductType = z.infer<typeof formDetailProductSchema>;
  const form = useForm<FormDetailProductType>({
    resolver: zodResolver(formDetailProductSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  const formValues = form.watch();
  return (
    <div className="h-full">
      <Form {...form}>
        <div className="flex flex-col gap-6 h-full">
          <QuantityInput
            stockProduct={productDetail.stock}
            control={form.control}
          />
        </div>
        <InputsFormProduct
          control={form.control}
          variantOptions={variantOptions}
          materialOptions={materialOptions}
          phoneTypeOptions={phoneTypeOptions}
        />
        <div className="flex-1 flex flex-row gap-3  items-end">
          <ValidateFormDetailProduct
            productId={productDetail.id}
            nameProduct={productDetail.name}
            priceProduct={Number(productDetail.price)}
            imageProduct={image}
            quantityProduct={productDetail.stock}
            variant="outline"
            data={formValues}
            productTypeOptions={phoneTypeOptions}
            variantOptions={variantOptions}
            materialOptions={materialOptions}
          >
            <ShoppingCart />
            <span className="mx-2">Masukkan Keranjang</span>
          </ValidateFormDetailProduct>
          <ValidateFormDetailProduct
            nameProduct={productDetail.name}
            priceProduct={Number(productDetail.price)}
            imageProduct={image}
            quantityProduct={productDetail.stock}
            variant="default"
            data={formValues}
            isCheckout={true}
            productId={productDetail.id}
            productTypeOptions={phoneTypeOptions}
            variantOptions={variantOptions}
            materialOptions={materialOptions}
          >
            <span className="mx-2">Beli Sekarang</span>
          </ValidateFormDetailProduct>
        </div>
      </Form>
    </div>
  );
};
