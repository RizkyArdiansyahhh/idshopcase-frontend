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
import { VillageSelector } from "./village-selector";
import { useEffect } from "react";
import { useGetAddressById } from "../api/get-addressById";
import { useCreateAddress } from "../api/create-address";
import { UseUpdateAddress } from "../api/update-address";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const formAddressSchema = z.object({
  recipient_name: z
    .string()
    .min(8, { message: "Name must be at least 8 characters" })
    .nonempty("Name is required"),
  phone: z.string().min(12, {
    message: "Phone number must be at least 12 characters",
  }),
  province: z.object(
    {
      id: z.string(),
      name: z.string(),
    },
    {
      message: "Province is required",
    }
  ),
  city: z.object(
    {
      id: z.string(),
      name: z.string(),
    },
    {
      message: "City is required",
    }
  ),
  district: z.object(
    {
      id: z.string(),
      name: z.string(),
    },
    {
      message: "District is required",
    }
  ),
  sub_district: z.object(
    {
      id: z.string(),
      name: z.string(),
    },
    {
      message: "Sub district is required",
    }
  ),
  postal_code: z.string().length(5, "Postal code must be 5 characters"),
  detail: z.string().optional(),
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
    // defaultValues: {
    //   recipient_name: address?.recipient_name,
    //   phone: address?.phone,
    //   province: {
    //     name: address?.province,
    //   },
    //   city: {
    //     name: address?.city,
    //   },
    //   district: {
    //     name: address?.district,
    //   },
    //   sub_district: {
    //     name: address?.sub_district,
    //   },
    //   postal_code: address?.postal_code,
    //   detail: address?.details,
    //   is_primary: !!address?.is_primary || false,
    // },
  });

  useEffect(() => {
    if (address) {
      form.reset({
        recipient_name: address.recipient_name,
        phone: address.phone,
        province: {
          // id: address.province_id,
          name: address.province,
        },
        city: {
          // id: address.city_id,
          name: address.city,
        },
        district: {
          // id: address.district_id,
          name: address.district,
        },
        sub_district: {
          // id: address.sub_district_id,
          name: address.sub_district,
        },
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
    if (addressId) {
      updateAddress({ id: addressId, data });
    } else {
      const payload = {
        recipient_name: data.recipient_name,
        phone: data.phone,
        province: data.province.name,
        city: data.city.name,
        district: data.district.name,
        sub_district: data.sub_district.name,
        postal_code: data.postal_code,
        details: data.detail || "",
        is_primary: data.is_primary || false,
      };
      console.log(payload);
      createAddress(payload);
    }
  };

  return (
    <div>
      <FieldLegend className="font-semibold">
        {addressId ? "Ubah Alamat" : "Tambah Alamat"}
      </FieldLegend>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((values) => handleSubmit(values))}>
          <div className="grid grid-cols-2 gap-4">
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
                    value={field.value?.id || ""}
                    onValueChange={({
                      id,
                      name,
                    }: {
                      id: string;
                      name: string;
                    }) => {
                      field.onChange({ id, name });
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
                    codeProvince={form.watch("province")?.id}
                    value={field.value?.id || ""}
                    onValueChange={({
                      id,
                      name,
                    }: {
                      id: string;
                      name: string;
                    }) => {
                      field.onChange({ id, name });
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
                    codeRegency={form.watch("city")?.id}
                    value={field.value?.id || ""}
                    onValueChange={({
                      id,
                      name,
                    }: {
                      id: string;
                      name: string;
                    }) => {
                      field.onChange({ id, name });
                    }}
                  />
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sub_district"
              render={({ field }) => (
                <FormItem>
                  <VillageSelector
                    codeDistrict={form.watch("district")?.id}
                    value={field.value?.id || ""}
                    onValueChange={({
                      id,
                      name,
                    }: {
                      id: string;
                      name: string;
                    }) => {
                      field.onChange({ id, name });
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
                    placeholder="Detail Lainnya (nama Jalan, Blok/Unit no., Patokan"
                  ></Input>
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
          <Field orientation="horizontal" className="justify-end">
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
