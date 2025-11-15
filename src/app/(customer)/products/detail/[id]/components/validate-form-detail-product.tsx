import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { formDetailProductShema } from "@/features/products/components/form-detail-product";
import { formatCurrency } from "@/lib/format-currency";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  MaterialInput,
  PhoneTypeInput,
  QuantityInput,
} from "./input-form-detail-product";
import { Form } from "@/components/ui/form";
import { product } from "@/mocks/products";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCreateCart } from "@/features/cart/api/create-cart";
import { toast } from "sonner";

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
  } = props;
  type FormDetailProductType = z.infer<typeof formDetailProductShema>;
  const form = useForm<FormDetailProductType>({
    resolver: zodResolver(formDetailProductShema),
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
                  <MaterialInput
                    product={product}
                    control={form.control}
                  ></MaterialInput>
                  <Separator
                    orientation="horizontal"
                    className="my-2"
                  ></Separator>
                  <PhoneTypeInput
                    product={product}
                    control={form.control}
                  ></PhoneTypeInput>
                  <Separator
                    orientation="horizontal"
                    className="mb-2"
                  ></Separator>
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
