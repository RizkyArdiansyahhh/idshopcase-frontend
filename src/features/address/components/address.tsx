"use client";
import { Field, FieldLabel, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProvinceSelector } from "./province-selector";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RegencieSelector } from "./regencie-selector";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DistrictSelector } from "./district-selector";
import { useEffect } from "react";
import { useGetAddressById } from "../api/get-addressById";
import { useCreateAddress } from "../api/create-address";
import { UseUpdateAddress } from "../api/update-address";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const formAddressSchema = z.object({
  recipient_name: z
    .string({ message: "Nama penerima wajib diisi" })
    .min(3, { message: "Nama penerima minimal 3 karakter (contoh: Budi Santoso)" })
    .max(100, { message: "Nama penerima maksimal 100 karakter" }),
  phone: z
    .string({ message: "Nomor telepon wajib diisi" })
    .min(10, { message: "Nomor telepon minimal 10 digit (contoh: 08123456789)" })
    .max(15, { message: "Nomor telepon maksimal 15 digit" })
    .regex(/^[0-9+]+$/, { message: "Nomor telepon hanya boleh berisi angka" }),
  province: z
    .string({ message: "Mohon pilih provinsi pengiriman" })
    .min(1, { message: "Mohon pilih provinsi pengiriman" }),
  city: z
    .string({ message: "Mohon pilih kota/kabupaten pengiriman" })
    .min(1, { message: "Mohon pilih kota/kabupaten pengiriman" }),
  district: z
    .string({ message: "Mohon pilih kecamatan pengiriman" })
    .min(1, { message: "Mohon pilih kecamatan pengiriman" }),
  postal_code: z
    .string({ message: "Kode pos wajib diisi (5 digit)" })
    .regex(/^[0-9]{5}$/, { message: "Kode pos harus 5 digit angka (misal: 12345)" }),
  detail: z
    .string({ message: "Alamat lengkap (nama jalan, RT/RW, nomor rumah) wajib diisi" })
    .min(5, { message: "Alamat lengkap minimal 5 karakter (contoh: Jl. Mawar No. 12, RT 01/RW 02)" }),
  is_primary: z.boolean().optional(),
});

import { useGetAddresses } from "../api/get-address";
import { AlertCircle } from "lucide-react";

export type FormAddressSchemaType = z.infer<typeof formAddressSchema>;
export const Address = ({ addressId }: { addressId?: string | number }) => {
  const router = useRouter();
  const { data: addresses } = useGetAddresses();
  const isMaxReached = !addressId && (addresses?.length || 0) >= 5;

  const { data: address, isLoading: fetchAddressLoading } = useGetAddressById({
    id: addressId!,
    queryConfig: {
      enabled: !!addressId,
    },
  });
  console.log(address);

  const form = useForm<FormAddressSchemaType>({
    resolver: zodResolver(formAddressSchema),
    defaultValues: {
      recipient_name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      postal_code: "",
      detail: "",
      is_primary: false,
    },
  });

  useEffect(() => {
    if (address) {
      form.reset({
        recipient_name: address.recipient_name,
        phone: address.phone,
        province: address.province,
        city: address.city,
        district: address.district,
        postal_code: address.postal_code,
        detail: address.details,
        is_primary: !!address.is_primary,
      });
    }
  }, [address, form]);

  const { mutate: createAddress, isPending: createAddressMutationLoading } =
    useCreateAddress({
      mutationConfig: {
        onSuccess: () => {
          router.back();
        },
      },
    });

  const { mutate: updateAddress, isPending: updateAddressMutationLoading } =
    UseUpdateAddress({
      mutationConfig: {
        onSuccess: () => {
          router.back();
        },
      },
    });
  const handleSubmit = (data: FormAddressSchemaType) => {
    const payload = {
      recipient_name: data.recipient_name,
      phone: data.phone,
      province: data.province,
      city: data.city,
      district: data.district,
      postal_code: data.postal_code,
      details: data.detail,
      is_primary: data.is_primary || false,
    };
    if (addressId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      updateAddress({ id: addressId, data: payload as any });
    } else {
      createAddress(payload);
    }
  };

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-2">
        <FieldLegend className="font-semibold">
          {addressId ? "Ubah Alamat" : "Tambah Alamat"}
        </FieldLegend>
        {!addressId && (
          <span className="text-xs text-muted-foreground font-medium">
            Jumlah Alamat: {addresses?.length || 0}/5
          </span>
        )}
      </div>

      {isMaxReached && (
        <div className="mb-5 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2.5 text-amber-800 dark:text-amber-300">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <p className="font-semibold">Batas Maksimal Alamat Tercapai</p>
            <p className="text-amber-700 dark:text-amber-400 mt-0.5">
              Anda telah memiliki 5 alamat pengiriman. Silakan hapus atau ubah salah satu alamat yang ada untuk menambahkan alamat baru.
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => handleSubmit(values))}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="recipient_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nama Lengkap"
                      type="text"
                      {...field}
                      value={field.value || ""}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="No. Handphone"
                      type="tel"
                      {...field}
                      value={field.value || ""}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <ProvinceSelector
                    value={field.value || ""}
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      form.setValue("city", "");
                      form.setValue("district", "");
                    }}
                  />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <RegencieSelector
                    province={form.watch("province")}
                    value={field.value || ""}
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      form.setValue("district", "");
                    }}
                  />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <DistrictSelector
                    regency={form.watch("city")}
                    value={field.value || ""}
                    onValueChange={(value: string) => {
                      field.onChange(value);
                    }}
                  />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Kode Pos"
                      {...field}
                      value={field.value || ""}
                      type="text"
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 my-4">
            <FormField
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Detail Lainnya (Nama Jalan, RT/RW, No. Rumah, Patokan)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="is_primary"
            render={({ field }) => (
              <FormItem>
                <Field orientation="horizontal">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="default-address"
                      data-slot="field-content"
                    />
                  </FormControl>
                  <FieldLabel
                    htmlFor="default-address"
                    className="font-normal text-muted-foreground/70  "
                  >
                    Atur Sebagai Alamat Utama
                  </FieldLabel>
                </Field>
              </FormItem>
            )}
          />
          <Field orientation="horizontal" className="justify-end mt-1">
            <Button type="submit" disabled={isMaxReached}>
              {addressId ? (
                updateAddressMutationLoading ? (
                  <Spinner className="text-background size-6"></Spinner>
                ) : (
                  "Ubah"
                )
              ) : createAddressMutationLoading ? (
                <Spinner className="text-background size-6"></Spinner>
              ) : (
                "Tambah"
              )}
            </Button>
            <Button
              variant="outline"
              type="button"
              className="text-foreground"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Field>
        </form>
      </Form>
    </div>
  );
};
