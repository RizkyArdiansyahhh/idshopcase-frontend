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
import { useParams, useRouter } from "next/navigation";
import { CustomInputImage } from "@/components/shared/custom-input-image";
import { formProductSchema, FormProductType } from "@/lib/schemas/product";
import { useForm } from "react-hook-form";
import { VariantsForm } from "@/app/(admin)/admin/(actions)/products/new/components/variants-form";
import { useGetProduct } from "../api/get-productById";
import { useCreateProduct } from "../api/create-product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useUpdateProduct } from "../api/update-product";
import { formatNumber } from "@/lib/format-currency";
import { imageUrlList } from "@/utils/image-utils";
import { ImageUploader } from "./image-uploader";
import { PhoneTypeSelector } from "./phone-type-selector";
import { FieldCheckbox } from "./field-checkbox";
import { MaterialOptions, PhoneTypeOptions } from "./type-options";

export const ProductForm = () => {
  console.log("saya render product form");

  const params = useParams();
  const productId = params.id;
  const { replace } = useRouter();
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
      images: [],
      toggleIsMaterial: false,
      toggleIsVariant: false,
      toggleIsPhoneType: false,
    },
  });
  // useEffect(() => {
  //   if (!product) return;

  //   const imagesProduct = imageUrlList(product.ProductImages);
  //   form.reset({
  //     name: product.name,
  //     description: product.description,
  //     price: product.price,
  //     stock: product.stock,
  //     images: imagesProduct,
  //   });
  // }, [product, form]);

  const isVariant = form.watch("toggleIsVariant");
  const isMaterial = form.watch("toggleIsMaterial");
  const isPhoneType = form.watch("toggleIsPhoneType");

  const handleSubmit = (data: FormProductType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price);

    data.images.forEach((file) => {
      console.log(file);
      formData.append("images", file);
    });

    formData.append("stock", data.stock.toString());
    data.phone_type?.forEach((id) => {
      formData.append("phoneTypes[]", String(id));
    });
    data.material?.forEach((id) => {
      formData.append("materials[]", String(id));
    });

    if (product) {
      // updateProductMutate({
      //   id: product.id,
      //   data,
      // });
    } else {
      // console.log(typeof data);
      createProductMutate(formData);
    }
    // form.reset();
    // replace("/admin/products");
  };

  const { mutate: createProductMutate, isPending: createProductIsLoading } =
    useCreateProduct();

  const { mutate: updateProductMutate, isPending: updateProductIsLoading } =
    useUpdateProduct();

  const phoneTypes = form.watch("phone_type");
  console.log(phoneTypes);

  return (
    <>
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={form.handleSubmit((value) => handleSubmit(value))}
        >
          <div className="w-full flex  flex-col md:flex-row justify-between gap-2">
            <h1 className="text-foreground font-semibold text-lg md:text-xl lg:text-2xl">
              {product ? "Edit Produk" : "Tambah Produk"}
            </h1>
            {product ? (
              <Button variant={"outline"} className="w-fit">
                {updateProductIsLoading ? <Spinner></Spinner> : "Update Produk"}
              </Button>
            ) : (
              <Button className="w-fit">
                {createProductIsLoading ? <Spinner></Spinner> : "Tambah Produk"}{" "}
              </Button>
            )}
          </div>
          <div className="w-full flex flex-col gap-3 lg:flex-row">
            <div className="w-full lg:w-1/2  flex-col">
              <div className="w-full border rounded-md p-4 flex flex-col gap-3 mb-3">
                <p className="text-foreground/40 font-medium">Produk</p>

                <div className="grid grid-cols-2 gap-2">
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
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kategori</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full rounded-sm py-5">
                            <SelectValue placeholder="Pilih Kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Karegori</SelectLabel>
                              <SelectItem value="custom_case">
                                Custom Case
                              </SelectItem>
                              <SelectItem value="keychain">Keychain</SelectItem>
                              <SelectItem value="phone_charm">
                                Phone Charm
                              </SelectItem>
                              <SelectItem value="pop_socket">
                                Pop Socket
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

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
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gambar Produk</FormLabel>

                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full border rounded-md p-4">
                <div className="grid grid-cols-2 gap-2">
                  <FormField
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Harga</FormLabel>
                        <div className="relative">
                          <Input
                            disabled={isVariant}
                            type="text"
                            {...field}
                            value={formatNumber(Number(field.value || "0"))}
                            onChange={(e) => {
                              const raw = e.target.value.replace(/\D/g, "");
                              field.onChange(raw);
                            }}
                            placeholder={
                              isVariant
                                ? "Masukkan harga di variasi"
                                : "Harga Produk"
                            }
                          />

                          <span className="absolute top-1/2 right-2 -translate-y-1/2 font-medium text-foreground/50">
                            IDR
                          </span>
                        </div>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="stock"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stok</FormLabel>
                        <div className="relative">
                          <Input
                            disabled={isVariant}
                            type="text"
                            {...field}
                            value={formatNumber(field.value)}
                            onChange={(e) =>
                              field.onChange(
                                Number(e.target.value.replace(/\D/g, ""))
                              )
                            }
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
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 border rounded-md p-4 relative pb-20 flex flex-col gap-4">
              <p className="text-foreground/40 font-medium mb-2">Variasi</p>
              <div>
                <FieldCheckbox
                  control={form.control}
                  name="toggleIsPhoneType"
                  label="Tipe Handphone"
                />
                {isPhoneType && (
                  <FormField
                    name="phone_type"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <PhoneTypeOptions
                          value={field.value}
                          onChange={field.onChange}
                        ></PhoneTypeOptions>
                      </FormItem>
                    )}
                  />
                )}
              </div>
              <div>
                <FieldCheckbox
                  control={form.control}
                  name="toggleIsMaterial"
                  label="Material"
                />
                {isMaterial && (
                  <FormField
                    name="material"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <MaterialOptions
                          value={field.value}
                          onChange={field.onChange}
                        ></MaterialOptions>
                      </FormItem>
                    )}
                  />
                )}
              </div>

              {/* <div className="h-full flex flex-col gap-2">
                <VariantsForm
                  form={form}
                  isVariant={isVariant}
                  isAddedCombination={isAddedCombination}
                  isEditCombination={isEditCombination}
                  setIsEditCombination={setIsEditCombination}
                  setIsAddedCombination={setIsAddedCombination}
                ></VariantsForm>
              </div> */}
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
