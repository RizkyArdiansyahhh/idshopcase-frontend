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
import { CheckoutData } from "@/types/api";
import { useCheckoutStore } from "@/store/checkout-store";

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
  phoneTypeOptions?: Array<{ id: string; model: string }>;
  materialOptions?: Array<{ id: string; name: string }>;
  variantOptions?: Array<{ id: string; name: string }>;
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
    phoneTypeOptions = [],
    materialOptions = [],
    variantOptions = [],
  } = props;

  const formDetailProductSchema = z.object({
    variant:
      variantOptions.length > 0
        ? z.enum(variantOptions.map((v) => v.id) as [string, ...string[]], {
            message: "Pilih varian terlebih dahulu",
          })
        : z.string().optional(),

    material:
      materialOptions.length > 0
        ? z.enum(materialOptions.map((m) => m.id) as [string, ...string[]], {
            message: "Pilih material terlebih dahulu",
          })
        : z.string().optional(),

    phone_type:
      phoneTypeOptions.length > 0
        ? z.enum(phoneTypeOptions.map((p) => p.id) as [string, ...string[]], {
            message: "Pilih tipe ponsel terlebih dahulu",
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
      variant: data?.variant,
    },
  });
  const { push } = useRouter();
  const setDataCheckout = useCheckoutStore((state) => state.setCheckoutData);
  useEffect(() => {
    if (data) {
      form.reset({
        quantity: data.quantity ?? 1,
        material: data.material ?? "",
        phone_type: data.phone_type ?? "",
        variant: data.variant ?? "",
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
    const cartData = {
      productId: productId,
      quantity: Number(data.quantity),
      materialId: Number(data.material) || null,
      phoneTypeId: Number(data.phone_type) || null,
      variantId: Number(data.variant) || null,
    };
    createCartItem(cartData);
  };

  const handleCheckout = (data: FormDetailProductType) => {
    const selectedVariant = variantOptions.find((v) => v.id === data.variant);
    const selectedMaterial = materialOptions.find(
      (m) => m.id === data.material
    );
    const selectedPhoneType = phoneTypeOptions.find(
      (p) => p.id === data.phone_type
    );

    setDataCheckout({
      productId,
      quantity: Number(data.quantity),
      variantId: data.variant ? Number(data.variant) : null,
      variantName: selectedVariant?.name || null,
      materialId: data.material ? Number(data.material) : null,
      materialName: selectedMaterial?.name || null,
      phoneTypeId: data.phone_type ? Number(data.phone_type) : null,
      phoneTypeName: selectedPhoneType?.model || null,
    });

    push("/order");
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
              if (isCheckout) {
                handleCheckout(data);
              } else {
                handleAddCart(data);
              }
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
                    variants={variantOptions}
                    materials={materialOptions}
                    phone_type={phoneTypeOptions}
                    isValidate={true}
                  />
                  <QuantityInput
                    stockProduct={quantityProduct}
                    control={form.control}
                  ></QuantityInput>
                </div>
              </div>

              <DrawerFooter>
                <Button type="submit">{` ${
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
