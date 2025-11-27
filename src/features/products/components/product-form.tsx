"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { formProductSchema, FormProductType } from "@/lib/schemas/product";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

import { ImageUploader } from "./image-uploader";
import { FieldCheckbox } from "./field-checkbox";
import { PhoneTypeOptions, VariantOptions } from "./type-options";
import { CreateVariant } from "./create-variant";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetProduct } from "../api/get-productById";
import { useCreateProduct } from "../api/create-product";
import { useUpdateProduct } from "../api/update-product";

// Helper untuk mengambil imageUrl dari product (edit mode)
function imageUrlList(images: { imageUrl: string }[]) {
  return images.map((img) => img.imageUrl);
}

export const ProductForm = () => {
  const params = useParams();
  const { replace } = useRouter();
  const productId = params.id;

  const { data: product } = useGetProduct({
    id: Number(productId),
    queryConfig: { enabled: !!productId },
  });

  console.log(product, "product");

  const form = useForm<FormProductType>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      toggleIsVariant: false,
      toggleIsPhoneType: false,
      toggleIsCreateVariant: false,
      variant: [],
      phone_type: [],
      nameVariant: "",
      priceVariant: "",
      stockVariant: "",
      maxImagesVariant: "",
    },
  });

  useEffect(() => {
    if (!product) return;

    form.reset({
      name: product.name,
      category: product.category as
        | "custom_case"
        | "keychain"
        | "phone_charm"
        | "pop_socket",
      description: product.description,
      images: [],
      toggleIsVariant: (product.Variants?.length ?? 0) > 0,
      toggleIsPhoneType: (product.PhoneTypes?.length ?? 0) > 0,
      variant: product.Variants?.map((v) => v.id) ?? [],
      phone_type: product.PhoneTypes?.map((pt) => pt.id) ?? [],
      toggleIsCreateVariant: false,
    });
  }, [product, form]);

  const isVariant = form.watch("toggleIsVariant");
  const isPhoneType = form.watch("toggleIsPhoneType");
  const isCreateVariant = form.watch("toggleIsCreateVariant");

  const { mutate: createProductMutate, isPending: createProductIsLoading } =
    useCreateProduct({
      mutationConfig: { onSuccess: () => replace("/admin/products") },
    });

  const { mutate: updateProductMutate, isPending: updateProductIsLoading } =
    useUpdateProduct();

  const handleSubmit = (data: FormProductType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);

    if (data.images && data.images.length > 0) {
      data.images.forEach((file) => formData.append("images", file));
    }

    formData.append("phoneTypes", JSON.stringify(data.phone_type ?? []));
    formData.append("variants", JSON.stringify(data.variant ?? []));

    if (product) {
      updateProductMutate({ id: product.id, data: formData });
    } else {
      createProductMutate(formData);
    }
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            {product ? "Edit Produk" : "Tambah Produk"}
          </h1>
          <Button type="submit">
            {(product ? updateProductIsLoading : createProductIsLoading) ? (
              <Spinner />
            ) : product ? (
              "Update Produk"
            ) : (
              "Tambah Produk"
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border p-4 rounded-md flex flex-col gap-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Produk</FormLabel>
                  <Input {...field} placeholder="Nama produk" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom_case">Custom Case</SelectItem>
                      <SelectItem value="keychain">Keychain</SelectItem>
                      <SelectItem value="phone_charm">Phone Charm</SelectItem>
                      <SelectItem value="pop_socket">Pop Socket</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deskripsi</FormLabel>
                  <Textarea {...field} placeholder="Deskripsi produk" />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="images"
              control={form.control}
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

            <FieldCheckbox
              control={form.control}
              name="toggleIsPhoneType"
              label="Apakah produk memiliki tipe handphone?"
            />
            {isPhoneType && (
              <FormField
                name="phone_type"
                control={form.control}
                render={({ field }) => (
                  <PhoneTypeOptions
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            )}
          </div>

          {/* Kanan: Variants */}
          <div className="border p-4 rounded-md flex flex-col gap-3">
            <FieldCheckbox
              control={form.control}
              name="toggleIsVariant"
              label="Apakah produk memiliki variant?"
            />
            {isVariant && (
              <>
                <FormField
                  name="variant"
                  control={form.control}
                  render={({ field }) => (
                    <VariantOptions
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <FieldCheckbox
                  control={form.control}
                  name="toggleIsCreateVariant"
                  label="Tambah variant baru"
                />
                {isCreateVariant && <CreateVariant form={form} />}
              </>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};
