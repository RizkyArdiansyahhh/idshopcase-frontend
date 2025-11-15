import {
  MaterialInput,
  PhoneTypeInput,
  QuantityInput,
} from "@/app/(customer)/products/detail/[id]/components/input-form-detail-product";
import { Form } from "@/components/ui/form";
import { ValidateFormDetailProduct } from "@/app/(customer)/products/detail/[id]/components/validate-form-detail-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { product } from "@/mocks/products";
import { Product } from "@/types/api";

type FormDetailProductProps = {
  productId: number;
  productDetail: Product;
  image: string;
};
export const formDetailProductShema = z.object({
  phone_type: z.enum(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product.phone_type.map((item: any) => item.value),
    {
      message: "Pilih tipe ponsel terlebih dahulu",
    }
  ),
  material: z.enum(product.material, {
    message: "Pilih bahan case yang tersedia",
  }),
  quantity: z
    .number({
      message: "Jumlah harus berupa angka",
    })
    .min(1, "Minimal 1 item"),
});
export const FormDetailProduct = (props: FormDetailProductProps) => {
  const { productId, productDetail, image } = props;

  type FormDetailProductType = z.infer<typeof formDetailProductShema>;
  const form = useForm<FormDetailProductType>({
    resolver: zodResolver(formDetailProductShema),
    defaultValues: {
      quantity: 1,
    },
  });

  const formValues = form.watch();
  return (
    <div className="h-full">
      <Form {...form}>
        <div className="flex flex-col gap-6 h-full">
          <MaterialInput
            product={product}
            control={form.control}
          ></MaterialInput>
          <PhoneTypeInput
            product={product}
            control={form.control}
          ></PhoneTypeInput>
          <QuantityInput
            stockProduct={productDetail.stock}
            control={form.control}
          ></QuantityInput>
        </div>

        <div className="flex-1 flex flex-row gap-3  items-end">
          <ValidateFormDetailProduct
            productId={productId}
            nameProduct={productDetail.name}
            priceProduct={Number(productDetail.price)}
            imageProduct={image}
            quantityProduct={productDetail.stock}
            variant="outline"
            data={formValues}
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
            productId={productId}
          >
            <span className="mx-2">Beli Sekarang</span>
          </ValidateFormDetailProduct>
        </div>
      </Form>
    </div>
  );
};

// import { Combobox } from "@/app/(customer)/products/detail/[id]/components/combo-box";
// import { Field, FieldLabel, FieldTitle } from "@/components/ui/field";
// import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Separator } from "@/components/ui/separator";
// import { FormCheckout } from "@/features/checkout/components/form-checkout";
// import { formatCurrency } from "@/lib/format-currency";
// import { Product } from "@/types/api";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ShoppingCart, Upload } from "lucide-react";
// import { useMemo, useState } from "react";
// import { useForm } from "react-hook-form";
// import z from "zod";

// type FormDetailProductProps = {
//   product?: Product;
// };

// export const buildFormDetailProductSchema = (product: Product) => {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const schemaShape: Record<string, any> = {
//     quantity: z.number().min(1, "Minimal 1 item"),
//     image: z.string().optional(),
//   };

//   if (product.variantOptions && product.variantOptions.length > 0) {
//     product.variantOptions.forEach((variant) => {
//       schemaShape[variant.nameVariant] = z
//         .string({
//           message: `${variant.nameVariant} harus dipilih`,
//         })
//         .min(1);
//     });
//   }

//   return z.object(schemaShape);
// };

// export const FormDetailProduct = ({ product }: FormDetailProductProps) => {
//   const formSchema = useMemo(
//     () => buildFormDetailProductSchema(product),
//     [product]
//   );

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       quantity: 1,
//     },
//   });

//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const onSubmit = (values: any) => {
//     console.log("🧾 Form values:", values);
//   };

//   return (
//     <div className="flex-1">
//       <Form {...form}>
//         <form className="h-full flex flex-col justify-between">
//           <div>
//             {product.variantOptions &&
//               product.variantOptions.length > 0 &&
//               product.variantOptions.map((variant, index) => {
//                 return (
//                   <div
//                     key={`${variant.nameVariant}-${index}`}
//                     className="w-2/3 my-2 mb-5 "
//                   >
//                     <FormField
//                       control={form.control}
//                       name={variant.nameVariant}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>{variant.nameVariant}</FormLabel>
//                           <RadioGroup
//                             onValueChange={field.onChange}
//                             value={(field.value as string) || undefined}
//                             className={"flex flex-row"}
//                           >
//                             {variant.valueVariant?.map((value, index) => (
//                               <FieldLabel
//                                 key={`${value.label}-${index}`}
//                                 htmlFor={value.label}
//                               >
//                                 <Field
//                                   orientation="horizontal"
//                                   className="w-fit"
//                                 >
//                                   <FieldTitle>{value.label}</FieldTitle>
//                                   <RadioGroupItem
//                                     value={value.label}
//                                     id={value.label}
//                                     className="sr-only"
//                                   />
//                                 </Field>
//                               </FieldLabel>
//                             ))}
//                           </RadioGroup>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                 );
//               })}
//           </div>

//           <div className="flex flex-row gap-3">
//             <FormCheckout variant="outline">
//               <ShoppingCart />
//               <span className="mx-2">Masukkan Keranjang</span>
//             </FormCheckout>
//             <FormCheckout variant="default">
//               <span className="mx-2">Beli Sekarang</span>
//             </FormCheckout>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// // export const FormDetailProduct = (props: FormDetailProductProps) => {
// //   const { product } = props;

// //   return (
// //     <>
// //       {/* FORM */}
// //       {/* <div className="flex flex-col gap-7">
// //           <div>
// //             <Separator orientation="horizontal" className="my-2"></Separator>

// //             <p className="text-app-semibold-sm mb-2">Material</p>
// //             <RadioGroup className="grid-cols-3">
// //               {materials.map((material, index) => {
// //                 return (
// //                   <FieldLabel key={index} className="relative">
// //                     <Field orientation={"horizontal"}>
// //                       <FieldTitle className="text-xs">{material}</FieldTitle>
// //                       <RadioGroupItem
// //                         className="opacity-0 absolute"
// //                         value={material}
// //                         id={material.trim()}
// //                       ></RadioGroupItem>
// //                     </Field>
// //                   </FieldLabel>
// //                 );
// //               })}
// //             </RadioGroup>
// //           </div>
// //           {/* COMBO BOX */}
// //       {/* <Combobox className="mb-0"></Combobox>
// //         <div className="max-w-1/3  border border-foreground flex flex-row justify-between items-center">
// //           <div className="px-5  font-semibold text-xs">Custom Your Image</div>
// //           <div className="bg-foreground p-1.5">
// //             <Upload color="white" />
// //           </div>
// //         </div>
// //         <Separator orientation="horizontal" className="my-2"></Separator> */}
// //       {/* BUTTON */}
// //       {/* <div className="flex flex-row gap-3">
// //           <FormCheckout materials={materials} variant="outline">
// //             <ShoppingCart />
// //             <span className="mx-2">Masukkan Keranjang</span>
// //           </FormCheckout>
// //           <FormCheckout materials={materials} variant="default">
// //             <span className="mx-2">Beli Sekarang</span>
// //           </FormCheckout>
// //         </div> */}
// //       {/* </div> */}
// //     </>
// //   );
// // };
