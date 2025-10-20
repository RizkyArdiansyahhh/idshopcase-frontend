"use client";
import { Field, FieldLabel, FieldLegend } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ProvinceSelector } from "./province-selector";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { RegencieSelector } from "./regencie-selector";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DistrictSelector } from "./district-selector";
import { VillageSelector } from "./village-selector";

export const Address = () => {
  const formAddressSchema = z.object({
    fullName: z.string(),
    phoneNumber: z.string(),
    provinceId: z.string(),
    regencyId: z.string(),
    districtId: z.string(),
    villageId: z.string(),
    postalCode: z.string(),
    detailAddress: z.string(),
    isDefault: z.boolean(),
  });

  type FormAddressSchemaType = z.infer<typeof formAddressSchema>;

  const form = useForm<FormAddressSchemaType>({
    resolver: zodResolver(formAddressSchema),
  });

  return (
    <div>
      <FieldLegend className="font-semibold">Alamat Baru</FieldLegend>
      <Form {...form}>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Nama Lengkap"
                      required
                      type="text"
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="No. Handphone"
                      required
                      type="tel"
                    ></Input>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="provinceId"
              render={({ field }) => (
                <ProvinceSelector
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="regencyId"
              render={({ field }) => (
                <RegencieSelector
                  codeProvince={form.watch("provinceId")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="districtId"
              render={({ field }) => (
                <DistrictSelector
                  codeRegency={form.watch("regencyId")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="villageId"
              render={({ field }) => (
                <VillageSelector
                  codeDistrict={form.watch("districtId")}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Kode Pos" required type="text"></Input>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 my-4">
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <Input placeholder="Detail Lainnya (nama Jalan, Blok/Unit no., Patokan"></Input>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="isDefault"
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
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button" className="text-foreground">
              Cancel
            </Button>
          </Field>
        </form>
      </Form>
    </div>
  );
};
