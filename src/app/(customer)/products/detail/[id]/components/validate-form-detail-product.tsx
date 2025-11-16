import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format-currency";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { QuantityInput } from "./input-form-detail-product";
import { Form } from "@/components/ui/form";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateCart } from "@/features/cart/api/create-cart";
import { toast } from "sonner";
import { InputsFormProduct } from "./inputs-form-product";

type ValidateFormDetailProductProps = {
  productId: number;
  children: React.ReactNode;
  variant: "default" | "outline";
  imageProduct: string;
  nameProduct: string;
  priceProduct: number;
  quantityProduct: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isCheckout?: boolean;
  productTypeOptions?: string[];
  materialOptions?: string[];
  variantOptions?: string[];
};
export const ValidateFormDetailProduct = (
  props: ValidateFormDetailProductProps
) => {
  const {
    productId,
    children,
    variant,
    imageProduct,
    nameProduct,
    priceProduct,
    quantityProduct,
    data,
    isCheckout,
    productTypeOptions = [],
    materialOptions = [],
    variantOptions = [],
  } = props;

  const formDetailProductSchema = z.object({
    phone_type:
      productTypeOptions.length > 0
        ? z.enum(productTypeOptions as [string, ...string[]], {
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
      quantity: data?.quantity,
      material: data?.material,
      phone_type: data?.phone_type,
    },
  });
  const { push } = useRouter();
  useEffect(() => {
    if (data) {
      form.reset({
        quantity: data.quantity ?? 1,
        material: data.material ?? "",
        phone_type: data.phone_type ?? "",
      });
    }
  }, [data, form]);

  const { mutate: createCartItem } = useCreateCart({
    mutationConfig: {
      onSuccess: () => {
        toast.success("Produk berhasil ditambahkan ke keranjang");
        form.reset();
      },
    },
  });

  const handleAddCart = (data: FormDetailProductType) => {
    createCartItem({
      productId: productId,
      quantity: data.quantity,
    });
  };

  const handleCheckout = (data: FormDetailProductType) => {
    console.log("Form submitted:", data);
    push(`/checkout?order=${encodeURIComponent(JSON.stringify(data))}`);
  };

  console.log(imageProduct, "imageProduct");
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={variant} className="p-7 rounded-none">
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogHeader className="flex flex-col items-center my-3">
          <DialogTitle className="text-3xl">Validasi Produk</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log(data);
            })}
          >
            <div className="mx-auto w-full max-w-4xl">
              <div className="w-full h-[25rem] flex flex-row">
                <div className="w-1/3 h-full relative p-2">
                  {imageProduct && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${imageProduct}`}
                      alt="banner-detail-product"
                      fill
                      className="object-center object-cover scale-90"
                    ></Image>
                  )}
                </div>
                <div className="w-2/3 h-full ">
                  <h3 className="text-xl font-medium">{nameProduct}</h3>
                  <p className="font-semibold mb-2">
                    <span className="text-lg">
                      {formatCurrency(Number(priceProduct))}
                    </span>
                  </p>
                  <p className="text-md text-foreground/50 font-medium">
                    Stok : {quantityProduct}
                  </p>
                  <Separator
                    orientation="horizontal"
                    className="my-2"
                  ></Separator>
                  <InputsFormProduct
                    control={form.control}
                    variantOptions={variantOptions}
                    materialOptions={materialOptions}
                    phoneTypeOptions={productTypeOptions}
                    isValidate={true}
                  />
                  <QuantityInput
                    stockProduct={quantityProduct}
                    control={form.control}
                  ></QuantityInput>
                </div>
              </div>

              <DrawerFooter>
                <Button
                  type="submit"
                  onClick={() => {
                    if (isCheckout) {
                      handleCheckout(form.getValues());
                    } else {
                      handleAddCart(form.getValues());
                    }
                  }}
                >{` ${
                  isCheckout ? "Lanjut ke Checkout" : "Tambah ke Keranjang"
                }`}</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
