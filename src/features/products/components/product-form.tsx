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
import { PhoneTypeOptions } from "./type-options";

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
import { CreatePhoneType } from "./create-phone-type";
import { FormVariant } from "./form-variant";

export const ProductForm = () => {
  const params = useParams();
  const { replace } = useRouter();
  const productId = params.id;

  const { data: product } = useGetProduct({
    id: Number(productId),
    queryConfig: { enabled: !!productId },
  });

  const form = useForm<FormProductType>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      images: [],
      toggleIsPhoneType: false,
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
      toggleIsPhoneType: (product.PhoneTypes?.length ?? 0) > 0,
      variant: product.Variants?.map((v) => v.id) ?? [],
      phone_type: product.PhoneTypes?.map((pt) => pt.id) ?? [],
    });
  }, [product, form]);

  const isPhoneType = form.watch("toggleIsPhoneType");
  const isCreatePhoneType = form.watch("toggleIsCreatePhoneType");

  const { mutate: createProductMutate, isPending: createProductIsLoading } =
    useCreateProduct({
      mutationConfig: { onSuccess: () => replace("/admin/products") },
    });

  const { mutate: updateProductMutate, isPending: updateProductIsLoading } =
    useUpdateProduct({
      mutationConfig: { onSuccess: () => replace("/admin/products") },
    });

  const handleCreateProduct = (data: FormProductType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    data.images.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("variants", JSON.stringify(data.variant ?? []));
    formData.append("phoneTypes", JSON.stringify(data.phone_type ?? []));
    createProductMutate(formData);
  };

  const handleUpdateProduct = (data: FormProductType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    data.images?.forEach((file) => {
      if (file instanceof File) {
        formData.append("images", file);
      }
    });
    formData.append("variants", JSON.stringify(data.variant ?? []));
    formData.append("phoneTypes", JSON.stringify(data.phone_type ?? []));
    updateProductMutate({
      id: product!.id,
      data: formData,
    });
  };

  const handleSubmit = (data: FormProductType) => {
    if (product) {
      handleUpdateProduct(data);
    } else {
      handleCreateProduct(data);
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
            <div className="grid grid-cols-2 gap-4">
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
            </div>

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
                  <FormLabel>Gambar Produk (maks 5)</FormLabel>
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
              <>
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
                <FieldCheckbox
                  control={form.control}
                  name="toggleIsCreatePhoneType"
                  label="Apakah anda ingin menambahkan Tipe Handphone"
                />
                {isCreatePhoneType && <CreatePhoneType form={form} />}
              </>
            )}
          </div>

          {/* Kanan: Variants */}
          <FormVariant form={form} />
        </div>
      </form>
    </Form>
  );
};
