"use client";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import z from "zod";
import { CustomInputImage } from "../_components/custom-input-image";

const CreateProductPage = () => {
  const inputImageRef = useRef<HTMLInputElement>(null);
  const formCreateproductSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    basePrice: z.number().min(0, "Harga tidak boleh negatif"),
    baseStock: z.number().min(0, "Stok tidak boleh negatif"),
    images: z.array(z.string()),
    // variantOptions: z.array(
    //   z.object({
    //     // Contoh field variant
    //     name: z.string(),
    //     price: z.coerce.number().min(0),
    //     stock: z.coerce.number().min(0),
    //   })
    // ),
  });

  type CreateProductType = z.infer<typeof formCreateproductSchema>;

  const form = useForm<CreateProductType>({
    resolver: zodResolver(formCreateproductSchema),
  });

  return (
    <>
      <Form {...form}>
        <form className="w-full flex flex-row gap-3">
          <div className="w-2/3 flex-col">
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
                    ></Input>
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
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full border rounded-md p-4 grid grid-cols-2 gap-2">
              <FormField
                name="basePrice"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Harga</FormLabel>
                    <div className="relative">
                      <Input
                        type="string"
                        {...field}
                        placeholder="Harga Produk"
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
                        type="string"
                        {...field}
                        placeholder="Stok Produk"
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

          <div className="w-1/3 border rounded-md p-4">
            <p className="text-foreground/40 font-medium">Variasi</p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CreateProductPage;
