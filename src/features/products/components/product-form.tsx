"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { IoMdClose } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { CustomInputImage } from "@/components/shared/custom-input-image";
import { useForm } from "react-hook-form";
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
import { z } from "zod";
import { useGetProduct } from "../api/get-productById";
import { Product } from "@/types/api";
import { useCreateProduct } from "../api/create-product";
import { useUpdateProduct } from "../api/update-product";
import { product } from "@/mocks/products";

// NOTE: Replace these hooks with your existing API hooks if you have them
// e.g. useGetProduct, useCreateProduct, useUpdateProduct, useGetPhoneTypes, etc.
// For now they are stubbed and you should replace with real calls.

// ---------- Schema ----------
const formProductSchema = z.object({
  name: z.string().min(1, "Nama produk wajib diisi"),
  description: z.string().optional().nullable(),
  category: z.string().min(1, "Kategori wajib dipilih"),
  productImages: z.array(z.any()).optional(),
  price: z.number().min(0, "Harga tidak boleh negatif"),
  stock: z.number().int().min(0, "Stok tidak boleh negatif"),
  // optional ids (nullable)
  phoneTypeId: z.string().nullable().optional(),
  materialId: z.string().nullable().optional(),
  variantId: z.string().nullable().optional(),
});

export type FormProductType = z.infer<typeof formProductSchema>;

// Example option lists. Replace with API calls (useQuery) to fetch real lists.
const examplePhoneTypes = [
  { id: "1", brand: "Xiaomi", model: "Redmi Note 13 Pro" },
  { id: "2", brand: "Samsung", model: "Galaxy S23" },
];
const exampleMaterials = [
  { id: "1", name: "Magsafe Diamond Impact X2++" },
  { id: "2", name: "Soft TPU" },
];
const exampleVariants = [
  { id: "1", name: "Holographic" },
  { id: "2", name: "Matte" },
];

// ---------- Component ----------
export const ProductFormRefactor: React.FC = () => {
  const params = useParams();
  const productId = params?.id;
  const router = useRouter();
  const inputImageRef = useRef<HTMLInputElement | null>(null);

  const { data: product } = useGetProduct({
    id: Number(productId),
    queryConfig: { enabled: !!productId },
  });
  const { mutate: createProductMutate, isPending: createProductIsLoading } =
    useCreateProduct();
  const { mutate: updateProductMutate, isPending: updateProductIsLoading } =
    useUpdateProduct();

  // checkbox states control if attribute is used
  const [usePhoneType, setUsePhoneType] = useState(false);
  const [useMaterial, setUseMaterial] = useState(false);
  const [useVariant, setUseVariant] = useState(false);

  // options (replace with fetch hooks)
  const [phoneTypes] = useState(examplePhoneTypes);
  const [materials] = useState(exampleMaterials);
  const [variants] = useState(exampleVariants);

  const form = useForm<FormProductType>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      productImages: product?.ProductImages ?? [],
      price: 0,
      stock: 0,
      phoneTypeId: null,
      materialId: null,
      variantId: null,
    },
  });

  useEffect(() => {
    if (!product) return;
    // product shape here must be adapted to your API response
    form.reset({
      name: product.name,
      description: product.description,
      category: product.category,
      productImages: product.ProductImages ?? [],
      price: Number(product.price) ?? 0,
      stock: product.stock ?? 0,
      phoneTypeId: product.phoneTypeId?.toString() ?? null,
      materialId: product.materialId?.toString() ?? null,
      variantId: product.variantId?.toString() ?? null,
    });

    setUsePhoneType(!!product.phoneTypeId);
    setUseMaterial(!!product.materialId);
    setUseVariant(!!product.variantId);
  }, [product]);

  const handleSubmit = (data: FormProductType) => {
    // enforce null for unused attributes
    const payload = {
      ...data,
      phoneTypeId: usePhoneType ? data.phoneTypeId : null,
      materialId: useMaterial ? data.materialId : null,
      variantId: useVariant ? data.variantId : null,
    };

    if (product) {
      updateProductMutate({ id: product.id, data: payload });
    } else {
      createProductMutate(payload);
    }

    form.reset();
    router.replace("/admin/products");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            {product ? "Edit Produk" : "Tambah Produk"}
          </h1>
          <Button type="submit" className="w-fit">
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
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground font-medium">
                Produk
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Produk</FormLabel>
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Nama Produk"
                      />
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full rounded-sm py-3">
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Kategori</SelectLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="mt-3">
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
                  <FormItem className="mt-3">
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
                    />
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

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground font-medium">
                Detil Produk
              </p>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Harga</FormLabel>
                      <Input type="number" {...field} placeholder="50000" />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="stock"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stok</FormLabel>
                      <Input type="number" {...field} placeholder="100" />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground font-medium mb-2">
                Atribut Opsional
              </p>

              <div className="flex items-center justify-between mb-2">
                <FormLabel className="m-0">Gunakan Phone Type</FormLabel>
                <Checkbox
                  checked={usePhoneType}
                  onCheckedChange={(v: boolean) => setUsePhoneType(v)}
                />
              </div>

              {usePhoneType && (
                <FormField
                  name="phoneTypeId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Phone Type</FormLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Tipe HP" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Phone Types</SelectLabel>
                            {phoneTypes.map((pt) => (
                              <SelectItem key={pt.id} value={pt.id}>
                                {pt.brand} — {pt.model}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Separator className="my-3" />

              <div className="flex items-center justify-between mb-2">
                <FormLabel className="m-0">Gunakan Material</FormLabel>
                <Checkbox
                  checked={useMaterial}
                  onCheckedChange={(v: boolean) => setUseMaterial(v)}
                />
              </div>

              {useMaterial && (
                <FormField
                  name="materialId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Material</FormLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Materials</SelectLabel>
                            {materials.map((m) => (
                              <SelectItem key={m.id} value={m.id}>
                                {m.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <Separator className="my-3" />

              <div className="flex items-center justify-between mb-2">
                <FormLabel className="m-0">Gunakan Variant</FormLabel>
                <Checkbox
                  checked={useVariant}
                  onCheckedChange={(v: boolean) => setUseVariant(v)}
                />
              </div>

              {useVariant && (
                <FormField
                  name="variantId"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pilih Variant</FormLabel>
                      <Select
                        value={field.value ?? ""}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Variant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Variants</SelectLabel>
                            {variants.map((v) => (
                              <SelectItem key={v.id} value={v.id}>
                                {v.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="border rounded-md p-4">
              <p className="text-sm text-muted-foreground font-medium">
                Preview & Actions
              </p>

              <div className="mt-3 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    // simple preview: you can open modal or new page to preview
                    const vals = form.getValues();
                    console.log("Preview values", vals);
                    alert("Preview logged to console");
                  }}
                >
                  Preview
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    form.reset();
                    setUsePhoneType(false);
                    setUseMaterial(false);
                    setUseVariant(false);
                  }}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default ProductFormRefactor;
