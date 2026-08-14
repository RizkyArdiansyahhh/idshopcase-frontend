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
    .string()
    .trim()
    .min(2, { message: "Nama penerima minimal 2 karakter" })
    .max(100, { message: "Nama penerima maksimal 100 karakter" }),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{8,20}$/, {
      message: "Nomor handphone harus 8–20 digit angka",
    }),
  province: z
    .string()
    .trim()
    .min(2, { message: "Provinsi wajib dipilih" })
    .max(100),
  city: z
    .string()
    .trim()
    .min(2, { message: "Kota/Kabupaten wajib dipilih" })
    .max(100),
  district: z
    .string()
    .trim()
    .min(2, { message: "Kecamatan wajib dipilih" })
    .max(100),
  postal_code: z
    .string()
    .trim()
    .regex(/^\d{5}$/, {
      message: "Kode pos harus 5 digit angka",
    }),
  detail: z
    .string()
    .trim()
    .min(5, { message: "Detail alamat minimal 5 karakter" })
    .max(100, { message: "Detail alamat maksimal 100 karakter" }),
  is_primary: z.boolean().optional(),
});

export type FormAddressSchemaType = z.infer<typeof formAddressSchema>;
export const Address = ({ addressId }: { addressId?: number }) => {
  const router = useRouter();

  const { data: address, isLoading: fetchAddressLoading } = useGetAddressById({
    id: Number(addressId),
    queryConfig: {
      enabled: !!addressId,
    },
  });
  console.log(address);

  const form = useForm<FormAddressSchemaType>({
    resolver: zodResolver(formAddressSchema),
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
      <FieldLegend className="font-semibold">
        {addressId ? "Ubah Alamat" : "Tambah Alamat"}
      </FieldLegend>
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
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="Detail Lainnya (nama Jalan, Blok/Unit no., Patokan)"
                  ></Input>
                  <FormMessage></FormMessage>
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
            <Button type="submit">
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
