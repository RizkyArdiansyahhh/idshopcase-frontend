"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
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
import { cleanImageUrl } from "@/utils/image-utils";
import { useGetUser } from "@/features/auth/api/get-user";
import { useAuthModalStore } from "@/stores/auth-modal-store";

type ValidateFormDetailProductProps = {
  productId: string | number;
  children: React.ReactNode;
  variant: "default" | "outline";
  imageProduct: string;
  nameProduct: string;
  priceProduct: number;
  data?: {
    variant?: string;
    phone_type?: string;
    quantity?: number;
  };
  onSyncParent?: (values: { variant?: string; phone_type?: string; quantity?: number }) => void;
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
    onSyncParent,
    isCheckout,
    phoneTypeOptions = [],
    variantOptions = [],
    totalStock,
  } = props;

  const [open, setOpen] = useState(false);

  const baseVariant =
    variantOptions.find((v) => v.name === "-") ?? variantOptions[0];

  const hasVariantsToPick = variantOptions.length > 0 && baseVariant?.name !== "-";
  const hasPhoneTypesToPick = phoneTypeOptions.length > 0;

  const formDetailProductSchema = z.object({
    variant: hasVariantsToPick
      ? z.enum(variantOptions.map((v) => v.id) as [string, ...string[]], {
          message: "Pilih varian terlebih dahulu",
        })
      : z.string().optional(),
    phone_type: hasPhoneTypesToPick
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
      quantity: data?.quantity ?? 1,
      phone_type: data?.phone_type ?? "",
      variant: data?.variant ?? "",
    },
  });

  const { push } = useRouter();
  const setDataCheckout = useCheckoutStore((state) => state.setCheckoutData);
  const { data: user } = useGetUser();

  // Keep drawer form in sync whenever parent data changes or drawer opens
  useEffect(() => {
    if (data) {
      form.reset({
        quantity: data.quantity ?? 1,
        phone_type: data.phone_type ?? "",
        variant: data.variant ?? "",
      });
    }
  }, [data, form, open]);

  // Sync back to parent when form changes inside the drawer
  useEffect(() => {
    const subscription = form.watch((values) => {
      if (open && onSyncParent) {
        onSyncParent({
          variant: values.variant || undefined,
          phone_type: values.phone_type || undefined,
          quantity: values.quantity || 1,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form, open, onSyncParent]);

  const { mutate: createCartItem, isPending: createCartIsLoading } =
    useCreateCart({
      mutationConfig: {
        onSuccess: () => {
          toast.success("Produk berhasil ditambahkan ke keranjang");
          setOpen(false);
        },
      },
    });

  const handleAddCart = (formData: FormDetailProductType) => {
    if (!user) {
      setOpen(false);
      useAuthModalStore.getState().openModal({
        reason: "login_required",
        redirectUrl: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      return;
    }

    const selectedVariant =
      variantOptions.find((v) => v.id === formData.variant) ?? baseVariant;

    if (!selectedVariant || !selectedVariant.id) {
      toast.error("Varian produk tidak valid atau belum dipilih");
      return;
    }

    const cartData = {
      productId: String(productId),
      quantity: Number(formData.quantity || 1),
      phoneTypeId: formData.phone_type ? String(formData.phone_type) : null,
      variantId: String(selectedVariant.id),
    };
    createCartItem(cartData);
  };

  const handleCheckout = (formData: FormDetailProductType) => {
    if (!user) {
      setOpen(false);
      useAuthModalStore.getState().openModal({
        reason: "login_required",
        redirectUrl: "/order",
      });
      return;
    }

    const selectedVariant =
      variantOptions.find((v) => v.id === formData.variant) ?? baseVariant;

    const selectedPhoneType = phoneTypeOptions.find(
      (p) => p.id === formData.phone_type,
    );

    setDataCheckout({
      productId: String(productId),
      quantity: Number(formData.quantity || 1),
      variant: {
        id: String(selectedVariant.id),
        name: selectedVariant.name,
        price: selectedVariant.price,
        stock: selectedVariant.stock,
        max_images: selectedVariant.max_images,
      },
      phoneTypeId: formData.phone_type ? String(formData.phone_type) : null,
      phoneTypeName: selectedPhoneType?.model || null,
    });

    setOpen(false);
    push("/order");
  };

  // Smart Click Handler on Main Button Trigger
  const handleMainTriggerClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. If not logged in -> Prompt Auth Modal immediately
    if (!user) {
      useAuthModalStore.getState().openModal({
        reason: "login_required",
        redirectUrl: isCheckout ? "/order" : (typeof window !== "undefined" ? window.location.pathname : undefined),
      });
      return;
    }

    // 2. Check if all required options are already selected on the main page
    const isVariantValid = !hasVariantsToPick || Boolean(data?.variant);
    const isPhoneTypeValid = !hasPhoneTypesToPick || Boolean(data?.phone_type);

    if (isVariantValid && isPhoneTypeValid) {
      // Direct Execution without drawer!
      const currentValues: FormDetailProductType = {
        variant: data?.variant,
        phone_type: data?.phone_type,
        quantity: data?.quantity ?? 1,
      };

      if (isCheckout) {
        handleCheckout(currentValues);
      } else {
        handleAddCart(currentValues);
      }
    } else {
      // Incomplete selections -> Open Drawer to complete selection
      setOpen(true);
    }
  };

  const selectedVariant = variantOptions.find(
    (v) => v.id === form.watch("variant"),
  );
  const stockAvailable = selectedVariant?.stock ?? totalStock;
  const price = selectedVariant?.price ?? priceProduct;

  return (
    <>
      {/* Trigger Button on Page */}
      <Button
        variant={variant}
        onClick={handleMainTriggerClick}
        className="w-full sm:w-auto flex-1 h-11 sm:h-12 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs"
      >
        {children}
      </Button>

      {/* Drawer Validation Sheet */}
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen && data) {
            // Reset to current parent data on drawer close
            form.reset({
              quantity: data.quantity ?? 1,
              phone_type: data.phone_type ?? "",
              variant: data.variant ?? "",
            });
          }
        }}
      >
        <DrawerContent>
          <DialogHeader className="flex flex-col items-center my-3">
            <DialogTitle className="text-lg md:text-xl lg:text-3xl">
              Pilih Varian & Tipe HP
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((formData) => {
                if (isCheckout) {
                  handleCheckout(formData);
                } else {
                  handleAddCart(formData);
                }
              })}
            >
              <div className="mx-auto w-full max-w-4xl px-2 lg:px-0">
                <div className="w-full h-[25rem] flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-full flex flex-row gap-1">
                    <div className="w-1/2 md:w-full h-full relative">
                      {imageProduct && (
                        <Image
                          src={cleanImageUrl(imageProduct)}
                          alt="banner-detail-product"
                          fill
                          className="object-center object-cover scale-90 rounded-sm"
                        />
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
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-2/3 h-full flex flex-col">
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
                    />
                    <div className="flex-1 min-h-0 overflow-y-auto">
                      <InputsFormProduct
                        control={form.control}
                        variants={Array.from(
                          new Map(
                            variantOptions
                              .filter((v) => v.name !== "-" && v.name.trim() !== "")
                              .map((v) => [v.name.trim(), v])
                          ).values()
                        )}
                        phone_type={phoneTypeOptions}
                        isValidate={true}
                      />
                    </div>

                    <QuantityInput
                      stockProduct={stockAvailable}
                      control={form.control}
                    />
                  </div>
                </div>

                <DrawerFooter className="flex flex-row-reverse md:flex-col">
                  <Button
                    className="w-1/2 md:w-full"
                    type="submit"
                    disabled={!isCheckout && createCartIsLoading}
                  >
                    {!isCheckout && createCartIsLoading
                      ? "Menambahkan..."
                      : isCheckout
                        ? "Lanjut ke Checkout"
                        : "Tambah ke Keranjang"}
                  </Button>
                  <DrawerClose asChild>
                    <Button className="w-1/2 md:w-full" variant="outline">
                      Batal
                    </Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </form>
          </Form>
        </DrawerContent>
      </Drawer>
    </>
  );
};
