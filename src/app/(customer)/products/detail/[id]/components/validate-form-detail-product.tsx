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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateCart } from "@/features/cart/api/create-cart";
import { toast } from "sonner";
import { InputsFormProduct } from "./inputs-form-product";
import { useCheckoutStore } from "@/store/checkout-store";

type ValidateFormDetailProductProps = {
  productId: number;
  children: React.ReactNode;
  variant: "default" | "outline";
  imageProduct: string;
  nameProduct: string;
  priceProduct: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  isCheckout?: boolean;
  phoneTypeOptions?: Array<{ id: string; model: string }>;
  variantOptions?: Array<{
    id: string;
    name: string;
    price: string;
    stock: number;
    max_images: number;
  }>;
  totalStock?: number;
};
export const ValidateFormDetailProduct = (
  props: ValidateFormDetailProductProps,
) => {
  const {
    productId,
    children,
    variant,
    imageProduct,
    nameProduct,
    priceProduct,
    data,
    isCheckout,
    phoneTypeOptions = [],
    variantOptions = [],
    totalStock,
  } = props;

  const [open, setOpen] = useState(false);

  const baseVariant =
    variantOptions.find((v) => v.name === "-") ?? variantOptions[0];

  const formDetailProductSchema = z.object({
    variant:
      variantOptions.length && baseVariant.name !== "-"
        ? z.enum(variantOptions.map((v) => v.id) as [string, ...string[]], {
            message: "Pilih varian terlebih dahulu",
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
        setOpen(false);
      },
    },
  });

  const handleAddCart = (data: FormDetailProductType) => {
    const selectedVariant =
      variantOptions.find((v) => v.id === data.variant) ?? baseVariant;

    const cartData = {
      productId: productId,
      quantity: Number(data.quantity),
      phoneTypeId: Number(data.phone_type) || null,
      variantId: Number(selectedVariant.id),
    };
    createCartItem(cartData);
  };

  const handleCheckout = (data: FormDetailProductType) => {
    const selectedVariant =
      variantOptions.find((v) => v.id === data.variant) ?? baseVariant;

    const selectedPhoneType = phoneTypeOptions.find(
      (p) => p.id === data.phone_type,
    );

    setDataCheckout({
      productId,
      quantity: Number(data.quantity),
      variant: {
        id: Number(selectedVariant.id),
        name: selectedVariant.name,
        price: selectedVariant.price,
        stock: selectedVariant.stock,
        max_images: selectedVariant.max_images,
      },
      phoneTypeId: data.phone_type ? Number(data.phone_type) : null,
      phoneTypeName: selectedPhoneType?.model || null,
    });

    push("/order");
  };

  const selectedVariant = variantOptions.find(
    (v) => v.id === form.watch("variant"),
  );
  const stockAvailable = selectedVariant?.stock ?? totalStock;
  const price = selectedVariant?.price ?? priceProduct;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={variant}
          className="p-3 lg:p-7 rounded-none w-[60%] md:w-fit text-xs md:text-sm"
        >
          {children}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DialogHeader className="flex flex-col items-center my-3">
          <DialogTitle className="text-lg md:text-xl lg:text-3xl">
            Validasi Produk
          </DialogTitle>
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
            <div className="mx-auto w-full max-w-4xl px-2 lg:px-0">
              <div className="w-full h-[25rem] flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 h-full flex flex-row gap-1">
                  <div className="w-1/2 md:w-full h-full relative">
                    {imageProduct && (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${imageProduct}`}
                        alt="banner-detail-product"
                        fill
                        className="object-center object-cover scale-90 rounded-sm"
                      ></Image>
                    )}
                  </div>
                  <div className="md:hidden w-1/2 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base md:text-lg lg:text-xl font-medium">
                        {nameProduct}
                      </h3>
                      <p className="font-semibold mb-1">
                        <span className="text-sm">
                          {formatCurrency(Number(price || 0))}
                        </span>
                      </p>
                      <p className="text-sm text-foreground/50 font-medium">
                        Stok : {stockAvailable}
                      </p>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className="my-2"
                    ></Separator>
                  </div>
                </div>

                <div className="w-full md:w-2/3 h-full  flex flex-col">
                  <h3 className="hidden md:block text-base md:text-lg lg:text-xl font-medium">
                    {nameProduct}
                  </h3>
                  <p className="hidden md:block font-semibold mb-2">
                    <span className="text-lg">
                      {formatCurrency(Number(price || 0))}
                    </span>
                  </p>
                  <p className="hidden md:block text-md text-foreground/50 font-medium">
                    Stok : {stockAvailable}
                  </p>
                  <Separator
                    orientation="horizontal"
                    className="my-2 hidden md:block"
                  ></Separator>
                  <div className="flex-1 min-h-0 overflow-y-auto">
                    <InputsFormProduct
                      control={form.control}
                      variants={variantOptions.filter((v) => v.name !== "-")}
                      phone_type={phoneTypeOptions}
                      isValidate={true}
                    />
                  </div>

                  <QuantityInput
                    stockProduct={stockAvailable}
                    control={form.control}
                  ></QuantityInput>
                </div>
              </div>

              <DrawerFooter className="flex flex-row-reverse md:flex-col">
                <Button className="w-1/2 md:w-full" type="submit">{` ${
                  isCheckout ? "Lanjut ke Checkout" : "Tambah ke Keranjang"
                }`}</Button>
                <DrawerClose asChild>
                  <Button className="w-1/2 md:w-full" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  );
};
