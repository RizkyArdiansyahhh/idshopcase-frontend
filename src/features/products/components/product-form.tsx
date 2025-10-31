"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { CustomInputImage } from "@/components/shared/custom-input-image";
import { formProductSchema, FormProductType } from "@/lib/schemas/product";
import { useForm } from "react-hook-form";
import { VariantsForm } from "@/app/(admin)/admin/(actions)/products/new/components/variants-form";
import { useGetProduct } from "../api/get-productById";

export const ProductForm = () => {
  const [isEditCombination, setIsEditCombination] = useState(false);
  const [isAddedCombination, setIsAddedCombination] = useState(false);
  console.log("saya render product form");

  const params = useParams();
  const productId = params.id;
  const { back } = useRouter();
  const inputImageRef = useRef<HTMLInputElement>(null);

  const { data: product } = useGetProduct({
    id: Number(productId),
    queryConfig: {
      enabled: !!productId,
    },
  });

  console.log(product);

  const form = useForm<FormProductType>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      toggleIsVariant: false,
      variantOptions: [],
      variantCombinations: [],
    },
  });
  useEffect(() => {
    if (!product) return;
    const hasVariants =
      Array.isArray(product.variantOptions) &&
      product.variantOptions.length > 0;

    form.reset({
      name: product.name,
      description: product.description,
      basePrice: product.basePrice,
      baseStock: product.baseStock,
      images: product.images,
      toggleIsVariant: hasVariants,
      variantOptions: hasVariants ? product.variantOptions : [],
      variantCombinations: hasVariants ? product.variantCombinations ?? [] : [],
    });
    if (hasVariants) {
      setIsAddedCombination(hasVariants);
      setIsEditCombination(!hasVariants);
    }
  }, [product, form]);

  const isVariant = form.watch("toggleIsVariant");

  const handleSubmit = (data: FormProductType) => {
    console.log(data);
    toast.success("Produk berhasil ditambahkan");
    form.reset();
    back();
  };

  return (
    <>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={form.handleSubmit((value) => handleSubmit(value))}
        >
          <div className="w-full flex  flex-col md:flex-row justify-between gap-2">
            <h1 className="text-foreground font-semibold text-lg md:text-xl lg:text-2xl">
              Tambah Produk
            </h1>
            <Button className="w-fit">Tambah Produk</Button>
          </div>
          <div className="w-full flex flex-col gap-3 lg:flex-row">
            <div className="w-full lg:w-1/2 xl:w-2/3 flex-col">
              <div className="w-full border rounded-md p-4 flex flex-col gap-3 mb-3">
                <p className="text-foreground/40 font-medium">Produk</p>
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80">
                        Nama Produk
                      </FormLabel>
                      <Input
                        type="text"
                        placeholder="Nama Produk anda"
                        {...field}
                        value={field.value || ""}
                      ></Input>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="description"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deskripsi</FormLabel>
                      <Textarea
                        {...field}
                        placeholder="Masukkan Deskripsi Produk anda"
                      ></Textarea>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  name="images"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gambar Produk</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        ref={inputImageRef}
                        className="hidden"
                        multiple
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            const fileUrls = Array.from(files).map((file) =>
                              URL.createObjectURL(file)
                            );
                            field.onChange(fileUrls);
                          }
                        }}
                      ></Input>
                      <CustomInputImage inputRef={inputImageRef} />
                      <div className="flex gap-2 mt-2 flex-wrap relative">
                        {field.value?.map((url, i) => (
                          <div key={i} className="relative w-20 h-20">
                            <div className="w-20 h-20 overflow-hidden rounded-md border relative">
                              <Image
                                src={url}
                                alt={`create-product-image-${i}`}
                                fill
                                className="object-center object-cover rounded-md"
                              />
                              {i === 0 && (
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center hover:opacity-0 transition-all ease-in-out duration-100 cursor-pointer">
                                  <span className="text-white font-semibold text-sm">
                                    Default
                                  </span>
                                </div>
                              )}
                            </div>
                            <div
                              className="absolute -top-2 -right-2 p-1 rounded-full bg-white cursor-pointer border"
                              onClick={() => {
                                const newImages = field.value?.filter(
                                  (_, index) => index !== i
                                );
                                field.onChange(newImages);
                              }}
                            >
                              <IoMdClose />
                            </div>
                          </div>
                        ))}
                      </div>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full border rounded-md p-4">
                <FormField
                  name="toggleIsVariant"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-row justify-between">
                      <FormLabel>Apakah produk memiliki variasi ?</FormLabel>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      ></Checkbox>
                    </FormItem>
                  )}
                />
                <Separator className="mb-3 mt-1.5"></Separator>
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    name="basePrice"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga</FormLabel>
                        <div className="relative">
                          <Input
                            disabled={isVariant}
                            type="text"
                            {...field}
                            value={field.value || ""}
                            placeholder={
                              isVariant
                                ? "Masukkan harga di variasi"
                                : "Harga Produk"
                            }
                          ></Input>
                          <span className="absolute top-1/2 right-2 -translate-y-1/2 font-medium text-foreground/50">
                            IDR
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="baseStock"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stok</FormLabel>
                        <div className="relative">
                          <Input
                            disabled={isVariant}
                            type="text"
                            {...field}
                            value={field.value || ""}
                            placeholder={
                              isVariant
                                ? "Masukkan stok di variasi"
                                : "Stok Produk"
                            }
                          ></Input>
                          <span className="absolute top-1/2 right-2 -translate-y-1/2 font-medium text-foreground/50">
                            pcs
                          </span>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 xl:w-1/3 border rounded-md p-4 relative pb-20">
              <p className="text-foreground/40 font-medium mb-2">Variasi</p>
              <div className="h-full flex flex-col gap-2">
                <VariantsForm
                  form={form}
                  isVariant={isVariant}
                  isAddedCombination={isAddedCombination}
                  isEditCombination={isEditCombination}
                  setIsEditCombination={setIsEditCombination}
                  setIsAddedCombination={setIsAddedCombination}
                ></VariantsForm>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
